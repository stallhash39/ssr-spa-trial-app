import { PageContextBuiltIn } from "vite-plugin-ssr";
import { PageContext } from "./types";
import { createSSRApp, createApp, h } from "vue";

import LayoutComponent from "/components/Layout.vue";
import PageShell from './PageShell.vue'

import { usePageContext, setPageContext } from './usePageContext';

// TIMESTAMP LOG
import { scaffold } from '../../utils/scaffold';

// Import VUEX-STORE
import { store } from '../../store/ideaNft/index';

// Define Create Function for SSR or SPA
export function createPageApp(pageContext: PageContextBuiltIn & PageContext, clientOnly: boolean) {

  const { Page: PageComponent, pageProps } = pageContext;
  const PageDuplicate = PageComponent;

  const createAppFunc = clientOnly ? createApp : createSSRApp;

  const AppComponent = {
    render() {
      return h(
        PageShell, 
        {}, 
        {
          default() {
            return h(PageDuplicate, pageProps || {})
          }
        }
      );
    }
  };

  // Shared the Page Context from Server Side to Front-end Side 
  const page = createAppFunc(AppComponent);
  // page.provide("pageContext", pageContext);
  // return page;

  scaffold(page);
  page.use(store);

  setPageContext(page, pageContext);
  return page; 
}

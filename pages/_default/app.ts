import { PageContextBuiltIn } from "vite-plugin-ssr";
import { PageContext } from "./types";
import { createSSRApp, createApp, h } from "vue";

import LayoutComponent from "/components/Layout.vue";
import PageShell from './PageShell.vue'

// usePageContext - Starts Here

import { inject } from 'vue'

export { usePageContext }
export { setPageContext }

const key = Symbol()

function usePageContext() {
  const pageContext = inject(key)
  return pageContext
}
function setPageContext(app:any, pageContext:any) {
  app.provide(key, pageContext)
}

// usePageContext - Ends Here


// Define Create Function for SSR or SPA
export function createPageApp(pageContext: PageContextBuiltIn & PageContext, clientOnly: boolean) {

  const { Page: PageComponent, pageProps } = pageContext;
  const PageDuplicate = PageComponent;

  const createAppFunc = clientOnly ? createApp : createSSRApp;

  const AppComponent = {
    render() {
      const renderLayoutSlot = () => h(PageComponent, pageProps || {});
      console.log("renderLayoutSlot", renderLayoutSlot);

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
  page.provide("pageContext", pageContext);
  // return page;

  setPageContext(page, pageContext)

  return page; 
}

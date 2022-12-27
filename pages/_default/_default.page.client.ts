import { PageContextBuiltIn } from "vite-plugin-ssr";
import { PageContext } from "./types";
import { createPageApp } from "./app";

// TIMESTAMP LOG
// import { scaffold } from '../../utils/scaffold';


export async function render(pageContext: PageContextBuiltIn & PageContext) {

  console.log(
    "Current _default-client-side Client:Boolean", 
    document.getElementById("app")?.innerHTML === "");

  const page = createPageApp(pageContext, document.getElementById("app")?.innerHTML === "");

  // scaffold(page);
  page.mount("#app");
}


declare global {
  // See https://robkendal.co.uk/blog/how-to-fix-property-does-not-exist-on-window-type-in-typescript
  interface Window {
    default_sign_in_tab: string;
  }
}
const default_sign_in_tab:string = window.default_sign_in_tab;
export default { default_sign_in_tab, document };

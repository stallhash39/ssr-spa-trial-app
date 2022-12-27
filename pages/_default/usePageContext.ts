
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

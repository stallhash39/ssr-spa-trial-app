// This file is used to provide global functions to the app
//
import { App } from 'vue'
import { timestampLog } from './consolelog'
import { signout } from './signinsignout'

const scaffold = (app:App<Element>) => {
  app.provide('$timestampLog', timestampLog)
  app.provide('$signOut', signout)
}
export { scaffold }

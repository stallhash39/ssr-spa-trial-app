import format from 'date-fns/format'
declare global {
  interface Window { dsdebug: boolean; }
}
const inDev = import.meta.env.DEV
const logdateformat = 'dd-MMM-yy HH:mm:ss.SSS'

const timestampLog = (...args: any[]) => {
  if (inDev || window.dsdebug) {
    // eslint-disable-next-line
    console.log(format(new Date(), logdateformat), { ...args })
  }
}
const timestampLogError = (...args: any[]) => {
  if (inDev || window.dsdebug) {
    // eslint-disable-next-line
    console.error(format(new Date(), logdateformat), { ...args })
  }
}
const timestampTableLog = function (logObject: any) {
  if (inDev || window.dsdebug) {
    // eslint-disable-next-line
    console.log(format(new Date(), logdateformat))
    // eslint-disable-next-line
    console.table(logObject)
  }
}
export { timestampLog, timestampLogError, timestampTableLog }

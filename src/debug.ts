/* eslint-disable no-console */
import debug from 'debug'

export const info = debug('december')
export const warn = debug('december')
export const error = debug('december')

// info.log = console.log.bind(console)
// warn.log = console.warn.bind(console)
// error.log = console.error.bind(console)

export const not = info.extend('notification')
export const routes = info.extend('routes')

export default {
  info,
  warn,
  error,
  not,
  routes,
}

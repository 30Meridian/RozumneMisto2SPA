import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

import config from './config'

const createHistory = config.host ? createHashHistory : createBrowserHistory
const history = createHistory()

export default history;

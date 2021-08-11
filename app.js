import { App, Router } from './continuum/index'
import { appConfig } from './config/app.config'
import { routerConfig } from './config/router.config'

const router = new Router(routerConfig)
const app = new App(router)
app.run(appConfig)

require('dotenv').config()
/**
 * @import semua module yang di perlukan
 */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
//
// import Redis from 'ioredis'
// import session from 'express-session'
// import connectRedis from 'connect-redis'
// import { REDIS_OPTION, APP_PORT } from './config'
// import { SESSION_OPTION } from './config/session'
//
import AuthRoute from './routes/auth.route'
import ErrorHandle from './middlewares/error.middleware'
/**
 * 
 */
// const RedisStore = connectRedis(session)
// let client = new Redis(REDIS_OPTION)
// client.on("error", function(err){
//   console.log(err);
// });
/**
 * @function app => inisialisasi semua paket yang ada
 */
const app:express.Application = express()
const PORT:any = process.env.PORT || 5000
/**
 * @property env => untuk cek app jalan di mode ? 
 */
process.env.NODE_ENV == "development" ? (
  app.use(morgan('dev'))
) : []
  app.use(cors())
  app.use(compression())
  app.use(helmet({
    hidePoweredBy: true,
    frameguard: true
  }))
  app.use(express.json())
// => session  
  // app.use(session({
  //   ...SESSION_OPTION, 
  //   store: new RedisStore({client})
  // }))
/**
 * @function app => inisialisasi semua paket yang ada
 */
  app.use("/", (req: express.Request, res: express.Response) => {
    res.send("Well done ==========================")
  })
  app.use('/api/auth', AuthRoute.router)
  app.use(ErrorHandle)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})


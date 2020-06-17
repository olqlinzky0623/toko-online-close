import Route from './route'
import * as e from 'express'
import db from '../config/firestore.db'
import Auth from '../controllers/auth.controller'

export default new class AuthRoute extends Route{
  myRoutes(){
    this.router.get('/', (req: e.Request, res: e.Response) => {
      db.collection('pesanan').get().then(data => {
        if(data){
          return res.status(200).json("ok")
        }
        res.status(400).json("OK")
        return
      })
    })
    this.router.post("/login", Auth.login)
    this.router.post("/register", Auth.register)
  }
}
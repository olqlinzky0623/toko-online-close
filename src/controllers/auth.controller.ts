/**
 * @import semua module yang di perlukan
 */
import Controller from './controller'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import IError from '../middlewares/interface/interface.error'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class Auth {
  public static readonly collection:string = "users"

  public static login(req: Request, res:Response, next: NextFunction):void{
    const controller:Controller = new Controller(Auth.collection)
    const { username, password } = req.body
    // cek user 
    controller.readAll().then(value => {
      // jika user
        User(req).then(async() => {
          const check = value.find(e => e.data.username == username)
          if(check){
              const pass = await bcrypt.compare(password, value[0].data.password)
            // jika password
              if(pass){
                const token = await jwt.sign({username, password} , "secret", {expiresIn: '1h'})
                return res.status(200).send(token)
              }
              const err:IError = new Error("Password Salah") as IError
              err.status = 400
              return next(err)
          }
          return res.status(404).json({
            message: "user tidak di temukan !!",
            status: 404
          })
      }).catch(() => {
          const err:IError = new Error("Format Data Invalid") as IError
          err.status = 400
          return next(err)
      })      
    }).catch(error => {
      return next(error)
    })
  }

  public static register(req: Request, res:Response, next: NextFunction):void{
    const controller:Controller = new Controller(Auth.collection)
    User(req).then(async() => {
        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash
        controller.create(req).then(() => {
          res.status(200).json("created !")
        }).catch(() => {
          const err:IError = new Error("Format Data Invalid") as IError
          err.status = 400
          return next(err)
        })
    }).catch(() => {
      const err:IError = new Error("Format Data Invalid") as IError
      err.status = 400
      return next(err)
    })
  }
}
import {IsString, IsNotEmpty, validate} from 'class-validator'
import { Request } from 'express'

class UserSchema {
  /**
   * @username cek
   */
  @IsNotEmpty()
  @IsString()
  username?:string
  /**
   * @password cek
   */
  @IsNotEmpty()
  @IsString()
  password?:string
}

export default async function User(req: Request):Promise<any>{
  let user:UserSchema = new UserSchema()
  user.username = req.body.username
  user.password = req.body.password
  return await validate(user).then(erros => {
    if(erros.length > 0){
      return Promise.reject("not valid")
    }
    return Promise.resolve("valid")
  })
}
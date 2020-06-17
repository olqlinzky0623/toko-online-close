import * as e from 'express'

export default interface IController{
  readOne(req: e.Request): Promise<FirebaseFirestore.DocumentData|void>
  readAll(): Promise<FirebaseFirestore.DocumentData[]|void>
  create(req: e.Request): Promise<FirebaseFirestore.DocumentData|void>
  update(req: e.Request): Promise<FirebaseFirestore.DocumentData|void>
  delete(req: e.Request): Promise<FirebaseFirestore.DocumentData|void>
}
/**
 * @import semua module yang di perlukan
 */
import * as e from 'express'
import IController from './interface/controller.interface'
import FirestoreRepo from '../repo/firestore.repo'
import db from '../config/firestore.db'
import IError from '../middlewares/interface/interface.error'

export default class Controller implements IController{
  private firestore:FirestoreRepo
  /**
   * @param collectionName => Berisi Nama collection yang berbentuk string
   */
  constructor(collectionName:string){
    this.firestore = new FirestoreRepo(db,collectionName)
  }
  /**
   * @param req => Menerima Request yang di Minta oleh Client
   * @param next => Meneruskan Request yang di Minta oleh Client 
   */
  async readOne(req: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>): Promise<FirebaseFirestore.DocumentData> {
    if(req.params.id == null){
      console.log(true)
      const err:IError = new Error("Request ID Invalid ") as IError
      err.status = 400 // bad request
      return Promise.reject(err)
    }
    return await this.firestore.readOne(req.params.id)
      .then(data => {
        return data.get().then(docs => {
            if(!docs.exists){
              const err:IError = new Error("Data Kosong") as IError
              err.status = 200 
              return Promise.reject(err)
            }
           return {
             id: docs.id,
             data: docs.data(),
             createdAt: docs.createTime?.toDate(),
             updatedAt: docs.updateTime?.toDate()
           }
        })
      }).catch(error => { 
        return error
      })
  }
    /**
   * @param req => Menerima Request yang di Minta oleh Client
   * @param next => Meneruskan Request yang di Minta oleh Client 
   */
  async readAll(): Promise<FirebaseFirestore.DocumentData[]> {
    return await this.firestore.readAll().then(async list => {
        if(list.empty){
          const err:IError = new Error("Data Kosong") as IError
          err.status = 200
          return Promise.reject(err)
        }
        return await list.docs.map(data => {
            return {
              id: data.id,
              data: data.data(),
              createdAt: data.createTime.toDate(),
              updatedAt: data.updateTime.toDate()
            }
        })
    }).catch(error => {
        return error
    })
  }
    /**
   * @param req => Menerima Request yang di Minta oleh Client
   * @param next => Meneruskan Request yang di Minta oleh Client 
   */
  create(req: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>):  Promise<void> {
      if(req.body == null){
        const err:IError = new Error("Request Invalid") as IError
        err.status = 400
        return Promise.reject(err)
      }
      return this.firestore.create(req.body).then(() => {
        Promise.resolve("Data Berhasil di Buat !!")
      }).catch(error => {
        return error
      })
  }
    /**
   * @param req => Menerima Request yang di Minta oleh Client
   * @param next => Meneruskan Request yang di Minta oleh Client 
   */
  update(req: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>):  Promise<void> {
      if(req.body && req.params.id == null){
        const err:IError = new Error("Request Invalid") as IError
        err.status = 400
        return Promise.reject(err)
      }
      return this.firestore.update(req.params.id, req.body).then(() => {
        Promise.resolve("Data Berhasil Di Update !!")
      }).catch(error => {
        return error
      })
  }
    /**
   * @param req => Menerima Request yang di Minta oleh Client
   * @param next => Meneruskan Request yang di Minta oleh Client 
   */
  delete(req: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>):  Promise<FirebaseFirestore.DocumentData|void> {
    if(req.params.id == null){
      const err:IError = new Error("Request Invalid") as IError
        err.status = 400
        return Promise.reject(err)
    }
    return this.firestore.delete(req.params.id).then(doc => {
        Promise.resolve("Data Berhasil Di Hapus !!")
    }).catch(error => {
      return error
    })
  }

}
import IError from './interface/interface.error'
import * as e from 'express'

const ErrorHandle = (err: Error, req:e.Request, res:e.Response, next:e.NextFunction) => {
  const error:IError = err as IError
  res.status(error.status || 500).json({
    msg: error.message,
    status: error.status
  })
}
export default ErrorHandle
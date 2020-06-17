import { SessionOptions } from 'express-session'
import { IN_PROD } from './app'
const {
  SESSION_SECRET = `cattt hell`,
  SESSION_NAME = `sid`,
  SESSION_IDLE_TIMEOUT = `HALF_HOUR`,
} = process.env

export const SESSION_OPTION:SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT, 
    secure: IN_PROD,
    sameSite: true
  },
  rolling: true, 
  saveUninitialized: false,
  resave: false
}
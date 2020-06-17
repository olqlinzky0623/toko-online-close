import {RedisOptions} from 'ioredis' 

const {
  REDIS_PORT = 6379,
  REDIS_HOST = 'localhost',
  REDIS_PASSWORD = 'secret'
} = process.env

export const REDIS_OPTION:RedisOptions = {
  port: +REDIS_PORT, // rubah ke interger karena env itu semuanya string
  host: REDIS_HOST,
  password: REDIS_PASSWORD
}
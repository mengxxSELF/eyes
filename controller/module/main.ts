import { Controller, Render, Get, HeaderParam } from "routing-controllers"
import fs from 'fs'
import path from 'path'
import query from '../config/sql'

@Controller()
export default class {
  @Get('/')
  async index (
    @HeaderParam('device') device: string
  ) {
    const body = fs.readFileSync(path.resolve('dist', 'index.html'))
    return body
  }

  @Get('/login')
  async user() {
    const sql = `select * from eyes_users`
    const end = await query(sql)
    console.log(end)
    return {
      code: 200
    }
  }
}
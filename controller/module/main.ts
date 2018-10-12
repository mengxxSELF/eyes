import { Controller, Render, Get, HeaderParam } from "routing-controllers"
import fs from 'fs'
import path from 'path'

@Controller()
export default class {
  @Get('/')
  async index (
    @HeaderParam('device') device: string
  ) {
    const body = fs.readFileSync(path.resolve('dist', 'index.html'))
    return body
  }

  @Get('/user')
  async user() {
    return {
      code: 200
    }
  }
}
import { Controller, Render, Get, HeaderParam } from "routing-controllers"

@Controller()
export default class {
  @Get('/')
  async index (
    @HeaderParam('device') device: string
  ) {
    console.log('device')
    return {
      title: 'i am title'
    }
  }

  @Get('/user')
  async user() {
    return {
      code: 200
    }
  }
}
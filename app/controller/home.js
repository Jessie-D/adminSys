'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hi, ' + JSON.stringify(this.app.plugins.eureka);
    this.ctx.body = 'hi, egg';
  }
  async render() {
    await this.ctx.render('index.html');
  }
}

module.exports = HomeController;

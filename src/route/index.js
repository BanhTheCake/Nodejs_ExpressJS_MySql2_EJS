const express = require('express')
const homeRouter = require('./homeRouter')

const routerInit = (app) => {
    app.use('/', homeRouter)
}
module.exports = routerInit;
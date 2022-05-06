const express = require('express')
const viewEngine = require('./ViewEngine/Engine');
const routerInit = require('./route/index')
const methodOverride = require('method-override')
const appRoot = require('app-root-path');
const app = express()
const port = 4000

app.use(methodOverride('_method'))
app.use(express.static(appRoot + '/src/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// View Engine
viewEngine(app)

// Route Init
routerInit(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
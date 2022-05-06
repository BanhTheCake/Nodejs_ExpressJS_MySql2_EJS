const express = require('express');
const appRoot = require('app-root-path');

const viewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', appRoot + '/src/resources/views')
}

module.exports = viewEngine;
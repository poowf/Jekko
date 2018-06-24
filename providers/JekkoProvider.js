'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class JekkoProvider extends ServiceProvider {
    register () {
        this.app.bind('Poowf/Middleware/Jekko', (app) => {
            const Jekko = require('../src/Jekko')
            return new Jekko()
        })
    }
}

module.exports = JekkoProvider
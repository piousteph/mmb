'use strict'

const console = require('./console')
const validatorConfig = require('./validatorConfig')

function checkConfig(params) {
    return params.every(param => param.in !== undefined && param.name !== undefined && param.shouldBe.type !== undefined)
}

function fillDefaultConfig(params) {
    params.forEach(param => {
        if (param.require === undefined) {
            param.require = false
        }
        if (param.shouldBe === undefined) {
            param.shouldBe = {}
        }
        if (param.shouldBe.canBeEmpty === undefined) {
            param.shouldBe.canBeEmpty = true
        }
        if (param.shouldBe.in === undefined) {
            param.shouldBe.in = []
        }
        if (param.shouldBe.minValue === undefined) {
            param.shouldBe.minValue = null
        }
        if (param.shouldBe.maxValue === undefined) {
            param.shouldBe.maxValue = null
        }
        if (param.shouldBe.minLength === undefined) {
            param.shouldBe.minLength = null
        }
        if (param.shouldBe.maxLength === undefined) {
            param.shouldBe.maxLength = null
        }
        if (param.shouldBe.regexp === undefined) {
            param.shouldBe.regexp = null
        }
        if (param.shouldBe.asProperties === undefined) {
            param.shouldBe.asProperties = []
        }
    })
    return params
}

function checkInt(value, param) {
    let result = true

    if (param.shouldBe.minValue !== null) {
        if (value < param.shouldBe.minValue) {
            console.log('[Validator]', param.name, 'value < param.shouldBe.minValue')
            result = false
        }
    }

    if (param.shouldBe.maxValue !== null) {
        if (value > param.shouldBe.maxValue) {
            console.log('[Validator]', param.name, 'value > param.shouldBe.maxValue')
            result = false
        }
    }

    if (param.shouldBe.in.length !== 0) {
        if (param.shouldBe.in.includes(value) !== true) {
            console.log('[Validator]', param.name, 'param.shouldBe.in')
            result = false
        }
    }

    return result
}

function checkString(value, param) {
    let result = true

    if (param.shouldBe.minLength !== null) {
        if (value.length < param.shouldBe.minLength) {
            console.log('[Validator]', param.name, 'value < param.shouldBe.minLength')
            result = false
        }
    }

    if (param.shouldBe.maxLength !== null) {
        if (value.length > param.shouldBe.maxLength) {
            console.log('[Validator]', param.name, 'value > param.shouldBe.maxLength')
            result = false
        }
    }

    if (param.shouldBe.in.length !== 0) {
        if (param.shouldBe.in.includes(value) !== true) {
            console.log('[Validator]', param.name, 'param.shouldBe.in')
            result = false
        }
    }

    return result
}

function checkJSON(obj, properties) {
    let res = true

    properties.forEach(element => {
        if (element.require === true && !obj.hasOwnProperty(element.name)) {
            console.log('[Validator]', element.name, 'is undefined')
            res = false
        }
    })
    return res
}

function checkRegexp(value, regexp) {
    if (regexp === null) {
        return false
    } else {
        return regexp.test(value)
    }
}

function checkExtraParameters(req, parameters) {
    for (const key of Object.keys(req.params)) {
        if (parameters.filter(param => param.in === 'params' && param.name === key).length === 0) {
            console.log('Extra', key)
            return true
        }
    }
    for (const key of Object.keys(req.query)) {
        if (parameters.filter(param => param.in === 'query' && param.name === key).length === 0) {
            console.log('Extra', key)
            return true
        }
    }
    for (const key of Object.keys(req.body)) {
        if (parameters.filter(param => param.in === 'body' && param.name === key).length === 0) {
            console.log('Extra', key)
            return true
        }
    }
    return false
}

module.exports = function validator(checkParam) {
    return (req, res, next) => {
        let parameters = null
        let result = true
        let route = ''

        if (checkParam === undefined) {
            route = req.method + ' ' + req.baseUrl
            if (req.route.path !== '/') {
                route = route + req.route.path
            }

            parameters = validatorConfig[route]
            if (parameters === undefined) {
                console.log('[Validator]', 'no validator config found for', route)
                return res.status(500).json({ message: '[Validator] Internal issue' })
            }
        } else {
            parameters = checkParam
        }
        if (Array.isArray(parameters) === false) {
            parameters = [parameters]
        }

        console.log("Route:", route)
        let addConfig = false
        parameters.forEach((parameter) => {
            if (parameter.appendConfig !== undefined) {
                parameter.appendConfig.forEach((config) => {
                    if (validatorConfig[config] !== undefined) {
                        parameters = [...parameters, ...validatorConfig[config]]
                    } else {
                        throw new Error('[Validator] configuration error ' + config + ' not found')
                    }
                    addConfig = true
                })
            }
        })

        if (addConfig === true) {
            if (parameters[0].name === undefined) {
                parameters.shift()
            }
        }

        parameters = fillDefaultConfig(parameters)

        if (!checkConfig(parameters)) {
            return res.status(500).json({ message: '[Validator] Internal issue' })
        }

        if (checkExtraParameters(req, parameters)) {
            return res.status(400).json({ message: '[Validator] Extra parameters' })
        }

        parameters.forEach((parameter) => {
            let value = req[parameter.in][parameter.name]
            if (value !== undefined) {
                switch (parameter.shouldBe.type) {
                    case 'number':
                        if (value === '') {
                            value = null
                        }
                        if (!isNaN(+value) && value !== null) {
                            value = +value
                            result = result === false ? false : checkInt(value, parameter)
                        } else if (parameter.shouldBe.canBeEmpty === false || value !== null) {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'msg:', 'Cannot be empty or not a number')
                            result = false
                        }
                        break
                    case 'int':
                        if (value === '') {
                            value = null
                        }
                        if (!isNaN(+value) && value !== null && +value === Math.trunc(+value) && value.toString().indexOf('.') === -1) {
                            value = +value
                            result = result === false ? false : checkInt(value, parameter)
                        } else if (parameter.shouldBe.canBeEmpty === false || value !== null) {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'msg:', 'Cannot be empty or not an integer')
                            result = false
                        }
                        break
                    case 'string':

                        let isString = true
                        if (value === '') {
                            value = null
                            isString = false
                        }

                        if (isString === true) {
                            result = result === false ? false : checkString(value, parameter)
                        } else if (parameter.shouldBe.canBeEmpty === false || value !== null) {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'msg:', 'Cannot be empty')
                            result = false
                        }
                        break

                    case 'arrayofint':
                        let aValue
                        if (Array.isArray(value) === false) {
                            aValue = value.split(',')
                        } else {
                            aValue = value
                        }
                        aValue.forEach((val) => {
                            if (!(!isNaN(+val) && val !== null && +val === Math.trunc(+val) && val.toString().indexOf('.') === -1)) {
                                console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'value:', val, 'msg:', 'Member of array should be integer')
                                result = false
                            }
                        })
                        break

                    case 'array':
                        if (Array.isArray(value) === false && Array.isArray(value.split(',')) === false) {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'value:', value, 'msg:', 'Should be an array')
                            result = false
                        }
                        break

                    case 'boolean':
                        if (typeof value !== 'boolean' && value !== 'on' && value !== 'off' && value !== 'true' && value !== 'false') {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'value:', value, 'msg:', 'Should be a boolean')
                            result = false
                        }
                        break
                    case 'json':
                        if (checkJSON(value, parameter.shouldBe.hasProperties) === false) {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'value:', value, 'msg:', 'Should be a valid JSON')
                            result = false
                        }
                        break
                    case 'regexp':
                        if (checkRegexp(value, parameter.shouldBe.regexp) === false) {
                            console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'value:', value, 'msg:', 'Should be match regexp')
                            result = false
                        }
                        break
                }
            } else {
                if (parameter.require === true) {
                    console.log('[Validator]', 'route:', route, 'name:', parameter.name, 'msg:', 'Required parameter')
                    result = false
                }
            }
        })
        if (result === true) {
            return next()
        } else {
            return res.status(400).json({ message: '[Validator] Bad parameters' })
        }
    }
}
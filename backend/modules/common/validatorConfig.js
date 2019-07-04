/*

Full declaration for parameter

'route definition':             // should be Method and route, except for reusable configuration should include method
[{
    name: '',                   // name of parameter                                            mandatory
    in: '',                     // where the parameter is passed, params, query, body, file     mandatory
    require: true/false,        // define if the parameter is require or not,                   optional, default is false
    shouldBe: {
        type: '',               // the type of parameter, can be
                                // int, string, arrayofint, array, boolean, json, regexp        mandatory
        canBeEmpty: true/false, // define if the parameter can passed with no value,            optional, default is true
        in: [],                 // array of values where is parameter should be in,             optional, default []
        minValue: null,         // minimum value,                                               optional, default value null
        maxValue: null,         // maximum value,                                               optional, default value null
        minLength: null,        // minimum size,                                                optional, default value null
        maxLength: null,        // maximum size,                                                optional, default value null
        regexp: null            // regexp for testing parameter when type = regexp              optional, default value null
        hasProperties: [{       // for JSON string, array of properties in the json             optional, default value []
            name: ''            // name of property                                             madatory
            require: true/false // define if the property is require or not,                    madatory
        }]
    },
    appendConfig: []            // array of other config definition to import them,             optional, default value []
                                // This parameter can be alone
}]

*/

const paramConfigValidator = {
    shelfid: [{
        name: 'shelfid',
        in: 'params',
        require: true,
        shouldBe: {
            type: 'int',
            canBeEmpty: false,
            minValue: 1
        }
    }],
    userid: [{
        name: 'userid',
        in: 'params',
        require: true,
        shouldBe: {
            type: 'int',
            canBeEmpty: false,
            minValue: 1
        }
    }],
    providerid: [{
        name: 'providerid',
        in: 'params',
        require: true,
        shouldBe: {
            type: 'int',
            canBeEmpty: false,
            minValue: 1,
            maxValue: 3
        }
    }]
}

const userRouteValidator = {
    'POST /user/login': [{
        name: 'email',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'regexp',
            regexp: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
            canBeEmpty: false
        }
    }, {
        name: 'password',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }],
    'GET /user': [],
    'GET /user/:userid': [{
        appendConfig: ['userid']
    }],
    'POST /user': [{
        name: 'user',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }, {
        name: 'email',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'regexp',
            regexp: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
            canBeEmpty: false
        }
    }, {
        name: 'password',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }, {
        name: 'id_profile',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }],
    'PUT /user/:userid': [{
        appendConfig: ['userid']
    }, {
        name: 'user',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }, {
        name: 'email',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'regexp',
            regexp: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
            canBeEmpty: false
        }
    }, {
        name: 'password',
        in: 'body',
        require: false,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }, {
        name: 'id_profile',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }],
    'DELETE /user/:userid': [{
        appendConfig: ['userid']
    }]
}

const metaRouteValidator = {
    'GET /meta': []
}

const shelfRouteValidator = {
    'GET /shelf': [],
    'POST /shelf': [{
        name: 'icon',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }, {
        name: 'provider',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'number',
            canBeEmpty: false
        }
    }, {
        name: 'shelf',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }],
    'PUT /shelf/:shelfid': [{
        appendConfig: ['shelfid']
    }, {
        name: 'icon',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }, {
        name: 'provider',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'number',
            canBeEmpty: false
        }
    }, {
        name: 'shelf',
        in: 'body',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false
        }
    }],
    'DELETE /shelf/:shelfid': [{
        appendConfig: ['shelfid']
    }]
}

const mediaRouteValidator = {
    'GET /media/:shelfid': [{
        appendConfig: ['shelfid']
    }]
}

const providerRouteValidator = {
    'GET /provider/:providerid': [{
        appendConfig: ['providerid']
    }, {
        name: 'title',
        in: 'query',
        require: true,
        shouldBe: {
            type: 'string',
            canBeEmpty: false,
            maxLength: 32
        }
    }]
}

module.exports = Object.assign({},
    paramConfigValidator,
    userRouteValidator,
    metaRouteValidator,
    shelfRouteValidator,
    mediaRouteValidator,
    providerRouteValidator
)

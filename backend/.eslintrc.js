module.exports = {
    "plugins": [
        "security"
    ],
    "extends": [
        "standard",
        "plugin:security/recommended"
    ],
    "rules": {
        "eol-last": 0,
        "space-before-function-paren": 0,
        "indent": ['error', 4, {
            'SwitchCase': 1
        }],
        "no-multi-str": 0
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    }
};

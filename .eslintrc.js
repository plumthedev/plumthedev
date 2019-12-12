module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    rules: {
        indent: ['error', 4]
    },
    "overrides": [
        {
            "files": ["src/js/**/*.js", 'tests/**/*.js'],
            "excludedFiles": "*.spec.js",
        }
    ]
};

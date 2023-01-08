/*const globalHelper = require('globalHelper');
const axios = require('axios');
const url = 'http://checkip.amazonaws.com/';
const querystring = require('querystring');
*/
//let response;

/**
 Auth
 */
exports.lambdaHandler = async (event, context) => {
    
    
    let response = {
        "isAuthorized": false,
        "context": {
            "stringKey": "value",
            "numberKey": 1,
            "booleanKey": true,
            "arrayKey": ["value1", "value2"],
            "mapKey": {"value1": "value2"}
        }
    };
    
    if (event.headers.authorization === "secretToken") {
        response = {
            "isAuthorized": true,
            "context": {
                "stringKey": "value",
                "numberKey": 1,
                "booleanKey": true,
                "arrayKey": ["value1", "value2"],
                "mapKey": {"value1": "value2"}
            }
        };
    }

    return response;

  

};

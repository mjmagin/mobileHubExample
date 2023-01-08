const globalHelper = require('globalHelper');
const axios = require('axios');
const url = 'http://checkip.amazonaws.com/';
const querystring = require('querystring');

let response;

/**
 Register User 
 */
exports.lambdaHandler = async (event, context) => {
    
    const headers = {
            "Content-Type": "application/json",
          };
          
    try {
        //throw new Error(`My Error Test: "${event.routeKey}"`);
        const ret = await axios(url);
        const sum = globalHelper.add(1,2);
        
        let buff = Buffer.from(event.body, "base64");
        let eventBodyStr = buff.toString('UTF-8');
        const params = querystring.parse(eventBodyStr);
        const jwt = params['params[jwt]'];
        const clientId = params['params[clientId]'];
        
        
        
        //console.log('params: '+ params);
        
       
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                responseCode: 1,
                responseMessage: 'Success',
                payload: {
                    message: 'hello from umregisterEmailUser',
                    location: ret.data.trim(),
                    sum: sum,
                    event: JSON.stringify(event),
                    jwt: jwt,
                    clientId: clientId,
                    context: JSON.stringify(context)
                }
            }),
            'headers': headers
        }
    } catch (err) {
        response = {
            'statusCode': 200,
            'headers': headers,
            'body': JSON.stringify({
                responseCode: 2,
                responseMessage: err.message,
                payload: {}
            }),
            
        }
    }

    return response
};

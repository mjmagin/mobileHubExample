const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const url = 'http://checkip.amazonaws.com/';

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();


const usersTable = process.env.USERS_TABLE;
let response;

const headers = {
            "Content-Type": "application/json",
          };

/**
 Register User 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        
        let id = uuidv4();
        
        var params = {
            TableName : usersTable,
            Item: { id : id, name: 'myUser'}
        };

        const result = await docClient.put(params).promise();
        
        const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello from umUpdateUser',
                location: ret.data.trim(),
                event: JSON.stringify(event),
                tableName: usersTable,
                dynamoResult: JSON.stringify(result)
            }),
            'headers': headers
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "someRandomPasswordHere";
const examplehashfromk = "$2y$10$DEYpKElmXlQFN2pvN3Pyius0MjCcwEicges0LG1EhuwVZ2/9JGQi2";
const passwordfromk = "password";

let response;
let myhash;

const headers = {
            "Content-Type": "application/json",
          };

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiAZu";

/**
 Register User 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        
        var token = jwt.sign({ 
            email: 'james@cothamtechnologies.com',
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, 
        JWT_SECRET);
        
        myhash = bcrypt.hashSync(yourPassword, 5);
        //let result = bcrypt.compareSync(yourPassword, myhash);
        //let result = bcrypt.compareSync(passwordfromk, examplehashfromk);
        let result = bcrypt.compareSync(passwordfromk, examplehashfromk.replace('$2y$', '$2b$'));
        
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello from umNewLogin',
                event: JSON.stringify(event),
                token: token,
                myhash: myhash,
                result: result
            }),
            'headers': headers
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

var InvalidTokenDataError  = require('../util/InvalidTokenDataError.js');
var InvalidTokenError  = require('../util/InvalidTokenError.js');

var buffer = require('buffer');
var crypto = require('crypto');

var generateToken = function (tokenDataObj, cryptoSecretKey, hmacSecretKey) {

    var isUserValid = typeof tokenDataObj.userId == "string" ? true : false;
    var isScopeValid = typeof tokenDataObj.scope == "object" ? true : false;
    var isExpired = tokenDataObj.expiry <= (new Date() + 30000) ? true :false;

    if(!(isScopeValid && isUserValid && isExpired))  new InvalidTokenDataError(tokenDataObj);


    var dJSON  = JSON.stringify(tokenDataObj);

    var payloadHMAC = crypto.createHmac('sha1', hmacSecretKey).update(dJSON).digest('hex');
    var payload = payloadHMAC + "|||" + dJSON;
    var payload64 =  new Buffer(payload).toString("base64");

    var cipher = crypto.createCipher('aes-192-cbc', cryptoSecretKey);
    var cryptext = cipher.update(payload64, 'utf8', 'base64');
    cryptext += cipher.final('base64');



    var cHmac = crypto.createHmac('sha1', hmacSecretKey).update(cryptext).digest('hex');

    var rawToken = cryptext + '.'  + tokenDataObj.userId + '.' + cHmac;

    var token =  new Buffer(rawToken).toString('base64');

    return token;
}


var parseToken = function (tokenString, cryptoSecretKey, hmacSecretKey) {
    var dStringToken = new Buffer(tokenString, "base64").toString('utf8');

    var crypotext = dStringToken.split('.')[0];

    var dCHMAC = dStringToken.split('.')[2];

    var cHMAC = crypto.createCipher('aes192', cryptoSecretKey);
    if(!(cHMAC == dCHMAC)) new InvalidTokenError();


    var decipher = crypto.createDecipher('aes-192-cbc', cryptoSecretKey);
    var payload64 = decipher.update(crypotext, 'base64', 'utf8');
    payload64 += decipher.final('utf8');

    var dJSON = new Buffer(payload64, "base64").toString('utf8');
    var decoded = dJSON.split('|||')[1];
//    console.log(decoded);
    return decoded;}


module.exports.generateToken = generateToken;
module.exports.parseToken =  parseToken;
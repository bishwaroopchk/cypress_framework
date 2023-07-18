const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const { httpsAgentPreProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson = require('../data/apiConfig.json');
const expect = require('chai').expect;

const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport');
const { cleansCode } = require('../utils/cleanData.js');


const cheerio = require('cheerio');
const qs = require('qs');
var formurlencoded = require('form-urlencoded');
const querystring = require('querystring');
const { error } = require('console');
const loginuser  = require("./loginUser");

//const myData = login();


var cookieSession = require('cookie-session')
var express = require('express')
var app = express()


var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var response2 = null;
var randomUser = null;
var statusCode = null;
var statusText = null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);
let headersConfig = null;


describe('BSS Sanity Suite', () => {

    it('Login User', async function () {
        this.timeout(0);

        let secret = null;

        secret = await loginuser.login('ci.pp.sqd04.ts018@ci-opus-stg.com', 'Telus@1234');
        console.log('SECRET KEY -- > ', secret );
        //array.push(secret);

       // secret = await loginuser.login('ci.pp.sqd04.ts016@ci-opus-stg.com', 'Telus@1234');
       // console.log('SECRET KEY -- > ', secret );
        //array.push(secret);
        //let x = await getCookies.cookieData;

        // console.log('SECRET ->>> ',secret.secret);
        // console.log('COOKIES ->>> ',secret.cookiesAll);

        // const userprofile = {
        //     'method': 'GET',
        //     'url': 'https://telus.preprod.n.svc.tv.telus.net/TELUS/T2.2/R/ENG/ANDROID_TV_STB/OPTIK/USER/PROFILE',
        //     //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
        //     'maxBodyLength': Infinity,
        //     'headers': {
        //         'restful': 'yes',
        //         'Cookie': secret.cookiesAll,
        //         //'Content-Type': 'application/x-www-form-urlencoded',
        //         'Host': 'telus.preprod.n.svc.tv.telus.net',
        //         'Connection': 'keep-alive',
        //        // 'User-Agent': 'PostmanRuntime/7.32.2',
        //        // 'Accept': '*/*',
        //         //'Origin': 'https://telusidentity-pp.telus.com',
        //         // 'Referer': formAction,
        //         //'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2',
        //         //'t-optik-tvos': '1.0.0',
        //         //'telusScripts': 'myTelusE2E'
    
        //     },
        //     //'data': userCreds,
        //     'httpsAgent': httpsAgentPreProd
        }

      //   response = await axios(userprofile).then((response) => {
      //      console.log('Response Body 1:===>>> ', response.data);
      // }
      )


    //   response = await axios(userprofile).then((response) => {
    //     console.log('RESPONSE FOR LOGIN ----->>> ', response.data);
    // }).catch((error) => { // error is handled in catch block
    //     if (error.response) { // status code out of the range of 2xx
    //         console.log('REASON --> ', error.response);
    //     }
    // });


});




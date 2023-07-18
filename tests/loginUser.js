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

var cookieSession = require('cookie-session')
var express = require('express')
var app = express()
const cheerio = require('cheerio');
const qs = require('qs');
var formurlencoded = require('form-urlencoded');
const querystring = require('querystring');
const { error } = require('console');


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


let cookieData = null;

async function login(username, password){
    let samlRequestValue = null;
    let relayStateValue = null;
    let formAction = null;
    let cookie = null;
    let html = null;
    let $ = null;
    let actionURL = null;
    let secretCode = null;



    const config = {
        'method': 'GET',
        'url': "https://oauth.cto.tv.telus.net/as/authorization.oauth2?response_type=code&scope=opuscisso&client_id=opus&state=STBUSER02&redirect_uri=http://localhost",
        'maxBodyLength': Infinity,
        'headers': {
            'Content-Type': 'application/json',
            'Host': 'oauth.cto.tv.telus.net',
            'User-Agent': 'PostmanRuntime/7.32.2',
            'Accept': '*/*',
            'Connection': 'keep-alive'

        },
        'httpsAgent': httpsAgentPreProd
    }

    response = await axios(config).then((response) => {
        // console.log('Response Body 1:===>>> ', response.data);
        // console.log('HEADERS -------'+response.headers);

        cookie = response.headers['set-cookie'];

        //  console.log('COOKIE FROM 1 -------'+cookie);


        html = response.data;
        $ = cheerio.load(html);


        // const mytext2 = $('[name="SAMLRequest"][value]');
        formAction = $('form').attr('action');
        samlRequestValue = $('input[name="SAMLRequest"]').val();
        relayStateValue = $('input[name="RelayState"]').val();

        // console.log('MY TEXT -- ', formAction);
        //  console.log('MY TEXT -- ', samlRequestValue);
        //console.log('MY TEXT -- ', relayStateValue);
    })

    //var data = JSON.stringify({ "RelayState": relayStateValue, "SAMLRequest": samlRequestValue });
    const formData = new URLSearchParams();
    formData.append('RelayState', relayStateValue);
    formData.append('SAMLRequest', samlRequestValue);



    const config2 = {
        'method': 'POST',
        'url': formAction,
        'maxBodyLength': Infinity,
        'headers': {
            //'Cookie': 'TS01b2e300=018051be83be2f411e6f9a85b524b49c5dacb5ad314d10513b4ac14a650f47f1c8fd72166fb8a1c43cbe8c8571ad855e8f08fe6c0932f33ea5f460fbce86e16412f74b79a7047340d1fad8330e2f54772b602005195108baed9d7ab95c3448fb0acec497f1c0445029f2b861dd849b41a3c2e21a32c898c6b5aa9c0593a10eb2677cdfa7bc3ae7ab8cd3c700753af71a9b18daf82a06771327c622b65bd1e034bca8b20a53; VSzeb0FX=A2wwbICIAQAAZnSIi-M9QrW5cvs_DwI5we9Ojlt-OLy9MUCEQx4eoIM8z2KJAc5sHyIAAAAAAAAAAAAAAAAAAA|1|0|5d8a8ede18853cdaab490acb5b83c2432c84be11; pf_sessionid=25d32039-5ba0-4141-945e-ad3787c2b57c; BIGipServercii_east_https_pool=3558085548.18211.0000; PF=2zEQf9KH62jh48Nm2n0rod1Z5n4cf2baiUpgJ6zXZhmy; PersistanceCookie=4019217954.47873.0000; TS0157dc05=015c320ccf8f24b64c3ff90aff46d3ca8c0b6f328f2bb5cc2cfb66aeec8a72641364a07a294f0a4aff4c407b920f78ee3c831e5cb44a6ff5a036c339ad8d4cdde13daf77754ad60f18bb79ddf423d84724415415c310b3dd47d47b82442e01e5beb2d32ba9',
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'telusidentity-pp.telus.com',
            'User-Agent': 'PostmanRuntime/7.32.2',
            'Accept': '*/*',
            'Origin': 'https://oauth.cto.tv.telus.net',
            'Referer': 'https://oauth.cto.tv.telus.net'

        },
        'data': formData.toString(),
        'httpsAgent': httpsAgentPreProd
    }

    response = await axios(config2).then((response) => {
        // console.log('Response Body 2:===>>> ', response.data);
        // console.log('RESPONSE PF COOKIE - '+ response.headers);
        html = response.data;
        $ = cheerio.load(html);
        actionURL = $('input[name="actionURL"]').attr('value');
    })

    let IDToken1 = username
    let IDToken2 = password

    const userCreds = new URLSearchParams();
    userCreds.append('IDToken1', IDToken1);
    userCreds.append('IDToken2', IDToken2);
    userCreds.append('UserLanguage', 'en');
    //   console.log('ACTION URL ---------- '+actionURL)

    //  let actualParams = userCreds.toString().replace(/%40/g, '');
    //  console.log('USER CREDS -------- ', actualParams);

    const config3 = {
        'method': 'POST',
        'url': 'https://telusidentity-pp.telus.com' + actionURL,
        //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
        'maxBodyLength': Infinity,
        'headers': {
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'telusidentity-pp.telus.com',
            'User-Agent': 'PostmanRuntime/7.32.2',
            'Accept': '*/*',
            'Origin': 'https://telusidentity-pp.telus.com',
            // 'Referer': formAction,
            'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2',
            't-optik-tvos': '1.0.0',
            'telusScripts': 'myTelusE2E'

        },
        'data': userCreds,
        'httpsAgent': httpsAgentPreProd
    }

    response = await axios(config3).then((response) => {
        //console.log('Response Body 3:===>>> '+ response.data);
        html = response.data;
        $ = cheerio.load(html);

        relayStateValue = $('input[name="RelayState"]').val();
        samlRequestValue = $('input[name="SAMLResponse"]').val();
        formAction = $('form').attr('action');
    });

    let referer = 'https://telusidentity-pp.telus.com' + actionURL;
    let pingURL = null;
    let secretcode = null;

    let datafinal = qs.stringify({
        'RelayState': relayStateValue,
        'SAMLResponse': samlRequestValue
    });

    const config4 = {
        'method': 'POST',
        //'url': formAction,
        'url': 'https://oauth.cto.tv.telus.net/sp/ACS.saml2',
        //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
        'maxBodyLength': Infinity,
        'maxRedirects': 0,
        'headers': {
            'Cookie': cookie,
            'Cache-Control': 'no-cache;no-store',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'oauth.cto.tv.telus.net',   //CHANGE THIS TO FETCH FROM ACTION URL OF FORM
            'Origin': 'https://telusidentity-pp.telus.com',
            'Referer': referer,
            //'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2'

        },
        'data': datafinal,
        'httpsAgent': httpsAgentPreProd

    }
    await axios(config4).then((err, response) => {


        //console.log('Response Body 4:===>>> ' + response);
        // html =  response.data;
        // $ = cheerio.load(html);

    }).catch((error) => { // error is handled in catch block
        if (error.response) { // status code out of the range of 2xx
            pingURL = error.response.headers['location'];
        }
    });

    // console.log("PING URL >>>>>>  :" , pingURL);

    const config5 = {
        'method': 'GET',
        //'url': formAction,
        'url': pingURL,
        //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
        'maxBodyLength': Infinity,
        'maxRedirects': 0,
        'headers': {
            'Cookie': cookie,
            'Cache-Control': 'no-cache;no-store',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'oauth.cto.tv.telus.net',   //CHANGE THIS TO FETCH FROM ACTION URL OF FORM
            'Origin': 'https://telusidentity-pp.telus.com'
            // 'Referer': referer,
            //'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2'

        },
        //'data': datafinal,
        'httpsAgent': httpsAgentPreProd

    }
    response = await axios(config5).then((response) => {
    }).catch((error) => { // error is handled in catch block
        if (error.response) { // status code out of the range of 2xx
            secretcode = error.response.headers['location'];
        }
    });




    //console.log("Secret >>>>>>  :" , secretcode);

    const start = secretcode.indexOf("code=") + 5; // Adding 5 to skip "code="
    const end = secretcode.indexOf("&", start) !== -1 ? secretcode.indexOf("&", start) : secretcode.length;
    const code = secretcode.substring(start, end);
   // console.log('SECRET CODE ->>>>>> ', code);


    let avs_cookie = 'eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoiOFQ5SHl1QTYrSWVtTjhkblh2aHNyKzh6QWlhaXpCSG9mT2lSUnZtYzQvUEdzNFhCZ0p0N005MVRFVjA1ZjNOWFp2dFhqeUx6QnNqbUN2WUNQSXltbE5RbDZMUVRiL0JQcVBpeGxraTMzV3h3STdHcnRXT1pQYm5oR01iczg2aW1qMW5iazZuanY2a1BDL2xwZmhXNUttOGw5Y29zM05iM0Z0OGxLdVFUT1pJQVBvb0JYMjJ0R2o3OXFNRWRISy9nV0VoTWROeFVkZCtnNlR2KzN4U3kvS3V4bUtYUTF5bUVKRTdlSUk0VXh4V0RWRHh2ZjNKekxLNi9jclYvdU5nZ3p0MVF4RVhoakN5aHBBRGMwQTNOZk5hcS9leEV4SzFRQml3OUloTnBCa1RpSzB3MTR5NnhhNHpVV0J4TkNFYmRFWjNBTkc2WHlWZFRQbEgxdVlXWlRMRXUzY1RFQm15NnRCcndmY2ZHY2RZTzdoNTFWd0lVYkVWc2ZRdUwwaE5RVUVZRzBqSzJ1TFA5U0grVmpBeGhyTjJXMzV5bmdnPT0iLCJub25jZSI6IjZOMDlQb3NBUlErWnRteCsiLCJpc3MiOiJBVlMiLCJleHAiOjE2ODY4NDU0MDd9.vOXL2zWe68hPYS_c1KCOV2du-gvXa_wHf7Yw9ThUY1o';
    let up = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzMjMxNDIsInVzZXJuYW1lIjoib3B1cy5xYS50c3FhMDYwIiwidXNlclBDTGV2ZWxFcGciOjAsInVzZXJQY0V4dGVuZGVkUmF0aW5ncyI6IiIsInVzZXJQYXJlbnRhbENvbnRyb2wiOiJOIiwicHJvcGVydHkiOlt7InByb3BlcnR5TmFtZSI6Ik9QVElLIn1dLCJpc091dE9mSG9tZSI6Ik4iLCJpYXQiOjE2ODU1Mjg0MjIsImV4cCI6MTY5MzMwNDQyMn0.HBWohW9FxLOPwkbTi5NPNULwgahi-aq3cYG0hH6tN_k';
    let telus_user_profile = '583a2b4532b703db4e88d1b0393b330ba5538415a44d13fd70669cb2d0070b551b195a4aab164f7b152f9eefbaf2a1232feb9f72d33bdf8e84e27361c98e0f08a7664340570f657fdd58fdd25b7f9ac821f82f73897fcd617c96446bdf36679712f1f58a9daca82b5002cad983abf2369209ac007c90b9712a51061749821536';
    let sessionId = '3158a76f-6173-038b-84d8-b4e4a9262c6e';
    let telus_refresh_cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWx1c19yZWZyZXNoX2Nvb2tpZSI6Ijc0NTY2Mjg0Y2IyOTM4YTVmZjRhZjEyNzJkZjg1Njc4MmFmZWYzYjlkZmEzODFhYTdlMTcwZjQzYzU1YjBjYWE5OWU4MjhmYzhkNjkzYjg4Y2NhNzgxNmI0MWEwMDlkNiIsImV4cCI6MTcxODM2NzAwNiwiaXNzIjoiQVZTIn0.VsERIOk7KoVnNog6o9zpnSNfvuFyWPopcoDFUJHjqYo';
    let telus_access_cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWx1c19hY2Nlc3NfY29va2llIjoiZjA2ZDVhNTQ3ODBjMDFkZGQ5OWQxYzIwZjcyNTdkODNhOTBjYzMyOWQzMWM3MDMxODNjMzQyODhlY2VmNWM5NSIsImV4cCI6MTY4Njg0NTQwNSwiaXNzIjoiQVZTIn0.wEBMUC9IvNcX5v6ubKXDCMu-oVZA9wVQUGqiw9lv100';



    cookieData = 'avs_cookie=' + avs_cookie + ';up=' + up + ';telus_user_profile=' + telus_user_profile
        + ';sessionId=' + sessionId
        + ';telus_refresh_cookie=' + telus_refresh_cookie + ';telus_access_cookie=' + telus_access_cookie

    
        updatedRequestBody = dataJson.testData.USER_LOGIN_Copy;
        updatedRequestBody.credentialsExtAuth.credentials.secret = code;


          const configLogin = {
    'method': 'POST',
    //'url': formAction,
    'url': 'https://telus.preprod.n.svc.tv.telus.net/TELUS/T2.1/R/ENG/ANDROID_TV_STB/OPTIK/USER/SESSIONS',
    //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
    'maxBodyLength': Infinity,
    'maxRedirects': 0,
    'headers': {
        'Cookie': cookieData,
        // 'Cache-Control': 'no-cache;no-store',
         'Content-Type': 'application/json',
        //  'Host': 'oauth.cto.tv.telus.net',   //CHANGE THIS TO FETCH FROM ACTION URL OF FORM
        // 'Origin': 'https://telusidentity-pp.telus.com'
        // 'Referer': referer,
        //'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2'

    },
    'data': JSON.stringify(updatedRequestBody),
    'httpsAgent': httpsAgentPreProd

}
response = await axios(configLogin).then((response) => {
    //console.log('RESPONSE FOR LOGIN ----->>> ', response.data);
}).catch((error) => { // error is handled in catch block
    if (error.response) { // status code out of the range of 2xx
        console.log('REASON --> ', err.response);
    }
});

//return code;
return {
    secret: code,
    cookiesAll: cookieData
  };


}

module.exports = {login};




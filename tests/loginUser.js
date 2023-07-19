const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const { httpsAgentPreProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson= require('../data/apiConfig.json');

const formData = new URLSearchParams();
var updatedRequestBody = null;
var response = null;
let cookieData = null;
let samlRequestValue = null;
let relayStateValue = null;
let formAction = null;
let cookie = null;
let html = null;
let $ = null;
let actionURL = null;
let pingURL = null;
let secretcode = null;

async function login(username, password){

    const initiate = {
        'method': 'GET',
        'url': apiConfigJson.login.initiateUrl,
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

    response = await axios(initiate).then((res) => {
        cookie = res.headers['set-cookie'];
        html = res.data;
        $ = cheerio.load(html);
        formAction = $('form').attr('action');
        samlRequestValue = $('input[name="SAMLRequest"]').val();
        relayStateValue = $('input[name="RelayState"]').val();

    });

    //const formData = new URLSearchParams();
    formData.append('RelayState', relayStateValue);
    formData.append('SAMLRequest', samlRequestValue);


    const getLoginPage = {
        'method': 'POST',
        'url': formAction,
        'maxBodyLength': Infinity,
        'headers': {
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

    response = await axios(getLoginPage).then((res) => {
        html = res.data;
        $ = cheerio.load(html);
        actionURL = $('input[name="actionURL"]').attr('value');
    })

    let IDToken1 = username
    let IDToken2 = password

    formData.delete('RelayState');
    formData.delete('SAMLRequest');


    formData.append('IDToken1', IDToken1);
    formData.append('IDToken2', IDToken2);
    formData.append('UserLanguage', 'en');

    const submitCredentials = {
        'method': 'POST',
        'url': 'https://telusidentity-pp.telus.com' + actionURL,
        'maxBodyLength': Infinity,
        'headers': {
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'telusidentity-pp.telus.com',
            'User-Agent': 'PostmanRuntime/7.32.2',
            'Accept': '*/*',
            'Origin': 'https://telusidentity-pp.telus.com',
            'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2',
            't-optik-tvos': '1.0.0',
            'telusScripts': 'myTelusE2E'

        },
        'data': formData,
        'httpsAgent': httpsAgentPreProd
    }

    response = await axios(submitCredentials).then((res) => {
        html = res.data;
        $ = cheerio.load(html);
        relayStateValue = $('input[name="RelayState"]').val();
        samlRequestValue = $('input[name="SAMLResponse"]').val();
        formAction = $('form').attr('action');
    });

    let referer = 'https://telusidentity-pp.telus.com' + actionURL;
    

    let submitLoginResponseData = qs.stringify({
        'RelayState': relayStateValue,
        'SAMLResponse': samlRequestValue
    });

    const submitLoginResponse = {
        'method': 'POST',
        'url': 'https://oauth.cto.tv.telus.net/sp/ACS.saml2',
        'maxBodyLength': Infinity,
        'maxRedirects': 0,
        'headers': {
            'Cookie': cookie,
            'Cache-Control': 'no-cache;no-store',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'oauth.cto.tv.telus.net',
            'Origin': 'https://telusidentity-pp.telus.com',
            'Referer': 'https://telusidentity-pp.telus.com' + actionURL
        },
        'data': submitLoginResponseData,
        'httpsAgent': httpsAgentPreProd

    }
    await axios(submitLoginResponse).then((err, res) => {
    }).catch((error) => {
        if (error.response) {
            pingURL = error.response.headers['location'];
        }
    });

    const getAuthorizationCode = {
        'method': 'GET',
        'url': pingURL,
        'maxBodyLength': Infinity,
        'maxRedirects': 0,
        'headers': {
            'Cookie': cookie,
            'Cache-Control': 'no-cache;no-store',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'oauth.cto.tv.telus.net',
            'Origin': 'https://telusidentity-pp.telus.com'
        },
        'httpsAgent': httpsAgentPreProd

    }
    response = await axios(getAuthorizationCode).then((response) => {
    }).catch((error) => {
        if (error.response) {
            secretcode = error.response.headers['location'];
        }
    });

    const start = secretcode.indexOf("code=") + 5;
    const end = secretcode.indexOf("&", start) !== -1 ? secretcode.indexOf("&", start) : secretcode.length;
    const code = secretcode.substring(start, end);

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
    'url': 'https://telus.preprod.n.svc.tv.telus.net/TELUS/T2.1/R/ENG/ANDROID_TV_STB/OPTIK/USER/SESSIONS',
    'maxBodyLength': Infinity,
    'maxRedirects': 0,
    'headers': {
        'Cookie': cookieData,
         'Content-Type': 'application/json'
    },
    'data': JSON.stringify(updatedRequestBody),
    'httpsAgent': httpsAgentPreProd
    }
    response = await axios(configLogin).then((res) => {
    }).catch((error) => {
        if (error.response) {
            console.log('REASON --> ', err.response);
        }
    });

    
    return {
        secret: code,
        cookiesAll: cookieData
    };
}



module.exports = {login};




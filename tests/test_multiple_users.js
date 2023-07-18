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


var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var randomUser = null;
var statusCode = null;
var statusText = null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);
let headersConfig = null;


describe('BSS Sanity Suite', () => {

    it('Create User - CRM Account List', async function () {
        try {

            app.set('trust proxy', 1) 
            /**
             * var secrets = []
             */
            app.use(cookieSession({
                name: 'session',
                keys: [],
              
                // Cookie Options
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
              }))

              app.use(function (req, next) {
                req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
                next()
              })

            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_LOGIN_URI;
            environementUrl = url + "/" + uri;
            console.log('URL', environementUrl);
            updatedRequestBody = dataJson.testData.USER_LOGIN_Copy;

           const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }

            headersConfig = await axios(config).then((response) => {
            statusCode = response.status;
            console.log('Response Body :===>>> ', response.data);
    
           
           const headers = cleansCode(String(response.headers['set-cookie']))
          //  console.log("COOKIE  HEADERS- ", headers);
            // const headerConfig = {
            //     telus_access_cookie : response.headers['set-cookie']['telus_access_cookie'],
            //     telus_refresh_cookie: response.headers['set-cookie']['telus_refresh_cookie']
            // }

            return headers;
            })  

            uri = apiConfigJson.preprod.USER_PROFILE_URI;
            environementUrl = url + "/" + uri;
            // const postmanToken = '_cfuvid=Jg.sizRTqUGab_3DC9sEaL84K3ZTgX_HJaA_l8NyTC8-1685382328448-0-604800000; Path=/; Domain=postman.com; Secure; HttpOnly;'
            // const pfData = 'PF=ZkKwiVvVsVjMKBkBvrEM89; Path=/; Secure; HttpOnly;'
            // const cookieData = headersConfig + postmanToken + pfData
            // console.log('MY COOKIE DATA - '+cookieData);
            const cookieData = 'avs_cookie=' + headersConfig.avs_cookie + ';up=' + headersConfig.up + ';telus_user_profile=' + headersConfig.telus_user_profile 
              +';sessionId=' + headersConfig.sessionId
              + ';telus_refresh_cookie=' +  headersConfig.telus_refresh_cookie + ';telus_access_cookie=' + headersConfig.telus_access_cookie

           // const cookieData = 'avs_cookie=eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoiU3drVmNNeFFSWlUrV3lPSlozRzBVd01WSEM3MzlWdXZ5eXdJRUtzL00rNDZPUGRKYmQ0QUZpWnVLWVBaZUpqUk5oT3lyQm5BNGcwMlVCMkE4UExKdjBITVBjNTd5Z0JXVXZ2NklTY1o2eHNNdWppOUg4UWhMbWYvWGs5aGdXcVJvNWZGSXl0SzJEQU1LcERJbUM3SVNpUXhiT0tpUDhOOHZPUEFWYytJZ08zMW5JK2FEYm94cjBUZlFmbTFMcEUvayt4NUZETDN5ajNUSHMwbCtwRUM3cVpZZE9lSjZGUkk1OFprREY5KzE1VHR3b0JpTUUxemdwVTRtcks4bGpYU2szZGN3cDFkZFc5em9zL1pGdTBQclU4eHh5ZFVPSVE3NHBRVldaQ1RiQkNhVzNMUFNSdHFoQldkSjFuRVhsaVYzVjFPYWswbjY0eUgzZW9aS29wcFlVQUJFY2s0RmN6YVYxRlFod1hFNWRaTFE4NFBlUVYzOWRkZ1AxdW0xWHNydXdUbVdmejFieGNsYkxDTzJrTkZ0VFBNcWorZllvbGRadkkvMy9vMEpsZmhGNWZhbHgrSWNROXB4MkRhOG80ZlR5MGt4Zz09Iiwibm9uY2UiOiIvalVZOERzMVdjblczUEp5IiwiaXNzIjoiQVZTIiwiZXhwIjoxNjg1OTgxOTgzfQ.CKDxfcin7TUD1r_qgFBEgJAyzZiV2B8ZP9-uHjk04WY;up=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg5MCwidXNlcm5hbWUiOiJvcHVzLnNxZDA0LnRzMDE2IiwidXNlclBDTGV2ZWxFcGciOjYwLCJ1c2VyUGNFeHRlbmRlZFJhdGluZ3MiOiIiLCJ1c2VyUGFyZW50YWxDb250cm9sIjoiTiIsInByb3BlcnR5IjpbeyJwcm9wZXJ0eU5hbWUiOiJPUFRJSyJ9XSwiaXNPdXRPZkhvbWUiOiJOIiwiaWF0IjoxNjg1OTY3NTgzLCJleHAiOjE2OTM3NDM1ODN9.o9uZag-AgFb03bZSpqfwKU7jY6skV5FQzvoSGguNdys;telus_user_profile=df7d3ef66f5f96453ee4a52a486dcf8a4d000f44fc1bf30102c8fad173507b33e9f1e9bbe3f1e7d8da0a5feceab4fda122bacb9642ffdd05c921be1a14ec9b256ff7d74b30ae9214865fceb1418e0845930b337fe9a98e6c0091510fe479ac0f172dd86152566f6d6d117958561bedeb22810ebd674900c826a2f70e26ad3db0;sessionId=7dc74fa2-2537-f10c-ebfd-811763e91654;telus_refresh_cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWx1c19yZWZyZXNoX2Nvb2tpZSI6ImJhYWIwNjhlNWI5NjNhMGU4MWE5NDdkNTIyZjJjMDllZTQxM2Q1NjZjOTFlM2QyYWFlMWY0MTFlOTU3NjViYmY5MjNmNDgzOThjNzBhZjc2NTk5MTVkYzk2MWYyNDRkMiIsImV4cCI6MTcxNzUwMzU4MywiaXNzIjoiQVZTIn0.iaXVfUbURwa7GFoeAGfh2V5QlGylgDK-shoO4hY64Ts;telus_access_cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWx1c19hY2Nlc3NfY29va2llIjoiYzliNzI2NjhlZWY0YWYwZGY1MGM2MWZmMzI0NzQ4NzI2ZDhlNTBhOWRhOWRlM2ZlZjBiNWJmMDlhZThmMzY0MSIsImV4cCI6MTY4NTk4MTk4MiwiaXNzIjoiQVZTIn0.NuPN-oHrvdqZHpagWbm3-LTapoVuXCWLKukAt04WRiQ';

            console.log("cookieData : - ", cookieData);
            console.log('ENV URL ', environementUrl)

            const config2 = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'Cache-Control': 'no-cache',
                'headers': {
                    'restful':'yes',
                    'Content-Type': 'application/json',
                    'User-Agent': 'PostmanRuntime/7.32.2',
                    'Accept': '*/*',
                    'Host': 'telus.preprod.n.svc.tv.telus.net',
                   // 'Postman-Token': 'c73b4226-17b3-414e-a0e0-f2067df7752d',
                    'Cookie':cookieData,
                    'Cache-Control': 'no-cache',
                    // 'avs_cookie': headersConfig.avs_cookie,
                    // 'sessionId': headersConfig.sessionId,
                    // 'telus_access_cookie': headersConfig.telus_access_cookie,
                    // 'telus_refresh_cookie': headersConfig.telus_refresh_cookie,
                    // 'telus_user_profile': headersConfig.telus_user_profile

                },
                'httpsAgent': httpsAgentPreProd
            }

            response = await axios(config2).then((response) => {
                statusCode = response.status;
                console.log('Response Body for 2 :===>>> ', response.data);
                console.log('RESPONSE 2 HEADERS - '+response);
                return response;
                })



                // const config3 = {
                //     'method': 'POST',
                //     'url': environementUrl,
                //     'maxBodyLength': Infinity,
                //     'Cache-Control': 'no-cache',
                //     'headers': {
                //         'restful':'yes',
                //         'Content-Type': 'application/json',
                //         'User-Agent': 'PostmanRuntime/7.32.2',
                //         'Accept': '*/*',
                //         'Host': 'telus.preprod.n.svc.tv.telus.net',
                //        // 'Postman-Token': 'c73b4226-17b3-414e-a0e0-f2067df7752d',
                //         'Cookie':cookieData,
                //         'Cache-Control': 'no-cache',
                //         // 'avs_cookie': headersConfig.avs_cookie,
                //         // 'sessionId': headersConfig.sessionId,
                //         // 'telus_access_cookie': headersConfig.telus_access_cookie,
                //         // 'telus_refresh_cookie': headersConfig.telus_refresh_cookie,
                //         // 'telus_user_profile': headersConfig.telus_user_profile
    
                //     },
                //     'httpsAgent': httpsAgentPreProd
                // }
    
                // response = await axios(config3).then((response) => {
                //     statusCode = response.status;
                //     console.log('Response Body for 3 :===>>> ', response.data);
                //     console.log('RESPONSE 2 HEADERS - '+response.headers);
                //     return response;
                //     })
    

        } catch (err) {
            console.log(err);
        }
    });

})



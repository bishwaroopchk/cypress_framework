const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const { httpsAgentPreProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson = require('../data/apiConfig.json');

let url = null;
let uri = null;
let environementUrl = null;
let updatedRequestBody = null;
var response=null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);
var randomUser;

//------------------
var secretKey = "UouWav16RmtTdmd2k2wNYqxz92FTmKtyylEAAABm";
let platformName="ANDROID_TV_STB";
let propertyName='OPTIK';
const avatarID='avatarID';
let userID=5159425;
var zipPin=1111;
//------------------

describe('BSS Sanity Suite', () => {
    it('USER/Login API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_LOGIN_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.USER_LOGIN;
            updatedRequestBody.credentialsExtAuth.credentials.secret = secretKey;

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
        let response;
        try {
            response = await axios(config);
        } catch (error) {
            if (error.response) {
                console.log('Error Response Code :===>>> ', error.response.status);
                console.log('Response Body :===>>> ', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
            return;
        }
        let statusCode = response.status;
        if (response.data.message === 'Authorization code is invalid or expired.') {
            statusCode = 500;
        }
        console.log('Response Body :===>>> ', response.data);
        console.log('Response Code :===>>> ', statusCode);
    } catch (err) {
        console.log(err);
    }
    });
    it('USER Profile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_PROFILE_GET_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            let response;
            try {
                response = await axios(config);
            } catch (error) {
                if (error.response) {
                    console.log('Error Response Code :===>>> ', error.response.status);
                    console.log('Response Body :===>>> ', error.response.data);
                } else {
                    console.log('Error:', error.message);
                }
              //  return;
            }
            let statusCode = response.status;
            if (response.data.message === 'User not logged in') {
                statusCode = 401;
            }
            console.log('Response Body :===>>> ', response.data);
            console.log('Response Code :===>>> ', statusCode);
        } catch (err) {
            console.log(err);
        }
    });
    it('User Accounts SubAccounts', async function () {
        this.timeout(0);
        try {
            randomUser = "Squad4User" + randomNumber;
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_ACCOUNTS_SUBACCOUNTS_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.USER_ACCOUNTS_SUBACCOUNTS;
            updatedRequestBody.profileName=randomUser;
            updatedRequestBody.email=randomUser+'@Gaoling.com';
            updatedRequestBody.avatarId=avatarID+randomNumber;
    
            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
    it('SubAccounts Login Standard', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.SubAccount_Login_Standard_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.SubAccount_LoginStandard;
            updatedRequestBody.userId=userID;
    
            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
    it('User Accounts Api', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_ACCOUNTS_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);
    
            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
    it('User Avatar Api', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_AVATARS_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);
    
            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('USER Profile API PUT', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_PROFILE_PUT_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.USER_PROFILE_PUT;
            updatedRequestBody.profileName=randomUser;
    
            const config = {
                'method': 'PUT',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
       
    });
    it('CONTENT USER DATA with Region SubProfile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_withRegion_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
    it('CONTENT USER DATA SubProfile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT USER DATA LIVE SubProfile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_LIVE_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT USER DATA ENTITLEMENT Sub Profile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_ENTITLEMENT_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT VIDEOURL VOD Sub Profile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_VIDEOURL_VOD_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('USER DEVICE SESSIONS Sub Profile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_DEVICESESSIONS_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.USER_DEVICESESSIONS_SubProfile;
            updatedRequestBody.geoZipCode=zipPin;

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
   
    it('STOP CONTENT Sub Profile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.STOP_CONTENT_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.STOP_CONTENT_SubProfile;
            updatedRequestBody.deviceId='DEVICEID';

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT VIDEOURL LIVE channel Sub Profile API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_VIDEOURL_VOD_SubProfile_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
       
            let response;
            try {
                response = await axios(config);
            } catch (error) {
                if (error.response) {
                    console.log('Error Response Code :===>>> ', error.response.status);
                    console.log('Response Body :===>>> ', error.response.data);
                } else {
                    console.log('Error:', error.message);
                }
                return;
            }
    
            let statusCode = response.status;
            if (response.data.message === 'Content not found') {
                statusCode = 404;
            }
            
            console.log('Response Body :===>>> ', response.data);
            console.log('Response Code :===>>> ', statusCode);
        } catch (err) {
            console.log(err);
        }
    });
    it('STOP CONTENT LIVE COPY API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.STOP_CONTENT_LIVE_COPY_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.STOP_CONTENT_LIVE_COPY;
            updatedRequestBody.deviceId='DEVICEID';

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
        it('SubAccount Logout Standard API', async function () {
            this.timeout(0);
            try {
                url = apiConfigJson.preprod.url;
                uri = apiConfigJson.preprod.SubAccount_Logout_Standard_URI;
                uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
                environementUrl = url + "/" + uri;
                console.log('ENV URL :===>>> ',environementUrl);

                const config = {
                    'method': 'DELETE',
                    'url': environementUrl,
                    'maxBodyLength': Infinity,
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'data': JSON.stringify(),
                    'httpsAgent': httpsAgentPreProd
                }
                response = await axios(config).then((response) => {
                    statusCode = response.status;
                    console.log('Response Body :===>>> ', response.data);
                    console.log('Response Code :===>>> ', statusCode);
                    return response;
                })
            } catch (err) {
                console.log(err);
            }
        });
    it('USER PROFILE Standard Copy API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_PROFILE_StandardCopy_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName).replace('{{userId}}',randomUser);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'DELETE',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
        
    });
    it('CONTENT DETAIL API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_DETAIL_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName).replace('{{vodContentID}}',1795628793);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT USERDATA with Region API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_withRegion_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

   it('CONTENT USER DATA API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT USERDATA LIVE API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_LIVE_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
        });


    it('USER PURCHASES API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_PURCHASES_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.USER_PURCHASES;
            updatedRequestBody.pin=zipPin;

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('GET USER PURCHASES  API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_PURCHASES_GET_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT USERDATA ENTITLEMENT API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_USERDATA_ENTITLEMENT_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT VIDEO URL VOD API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_VIDEOURL_VOD_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('USER DEVICE SESSIONS API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_DEVICESESSIONS_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.USER_DEVICESESSIONS;
            updatedRequestBody.geoZipCode=zipPin;

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('STOP CONTENT API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.STOP_CONTENT_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.STOP_CONTENT;
            updatedRequestBody.deviceId='DEVICEID';

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('CONTENT VIDEO URL LIVE channel API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.CONTENT_VIDEOURL_LIVEchannel_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('STOP CONTENT LIVE API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.STOP_CONTENT_LIVE_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            updatedRequestBody = dataJson.testData.STOP_CONTENT_LIVE;
            updatedRequestBody.deviceId='DEVICEID';

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('USER SESSIONS API', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_SESSIONS_URI;
            uri=uri.replace('{{platform}}', platformName).replace('{{property}}', propertyName);
            environementUrl = url + "/" + uri;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'DELETE',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentPreProd
            }
            response = await axios(config).then((response) => {
                statusCode = response.status;
                console.log('Response Body :===>>> ', response.data);
                console.log('Response Code :===>>> ', statusCode);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });
    
})
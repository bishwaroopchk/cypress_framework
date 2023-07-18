const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const { httpsAgentPreProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson = require('../data/apiConfig.json');
const expect = require('chai').expect;
//import * as responses from '../responsecodes/responseCode'
//const parses = require('../responsecodes/responseCode');

var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var randomUser = null;
var statusCode = null;
var statusText = null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);

//--------------------------------------------------------------
//solutionOfferExternalID==>>Alacarte-BBC_World_CP
// var solutionOfferExternalID = 'Alacarte-AE_CP';
// var solutionOfferID = '5872';
// var propertyName = 'OPTIK';
// var pinSet=1111;
//-------------------------------------------------

describe('BSS Sanity Suite', () => {

    it('Create User - CRM Account List', async function () {
        this.timeout(0);
        try {
            randomUser = "TestUser" + randomNumber;
            url = apiConfigJson.ams_preprod.url;
            uri = apiConfigJson.ams_preprod.CreateUser_CRMAccountListMgmt_URI;
            environementUrl = url + "/" + uri;

            updatedRequestBody = dataJson.testData.CreateUser_CRMAccountListMgmt;
            updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
            updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;

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
                //expect(response.data.subscriber[0].resultCode).to.equal('ACN_200');
                // if(response.data.subscriber[0].resultCode == parses.RESPONSE_CODE_200){
                //     console.log('HI');
                // }else{
                //     console.log('BYE');
                // }
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    });

    it('Cancel Subscription Update CRM Account List Commercial Profile', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.ams_preprod.url;
            uri = apiConfigJson.ams_preprod.CancelSubscription_UpdateCrmAccountListCommercialProfile_URI;
            environementUrl = url + "/" + uri;

            updatedRequestBody = dataJson.testData.CancelSubscription_UpdateCrmAccountListCommercialProfile;
            updatedRequestBody.subscriberPackageList[0].userName = randomUser;
            updatedRequestBody.subscriberPackageList[0].crmAccountId = randomUser;

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
                return response;

            })
        } catch (err) {
            console.log(err);
        }
    });

    // it('Update Profile', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.userSearch_URI;
    //         uri = uri.replace("{{username_new}}", randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Env URL := ' + environementUrl);

    //         const config = {
    //             'method': 'GET',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })

    //     } catch (err) {
    //         console.log(err);

    //     }
    // });

    // it('Update User CRM Account List Mgmt', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.UpdateUser_CRMAccountListMgmt_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Env URL :===>> ' + environementUrl);

    //         updatedRequestBody = dataJson.testData.UpdateUser_CRMAccountListMgmt;
    //         updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
    //         updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;
    //         updatedRequestBody.subscriberList[0].commProfileList[0].solutionOfferExternalID = solutionOfferExternalID;
    //         updatedRequestBody.subscriberList[0].commProfileList[0].solutionOfferID = solutionOfferID;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('FIPS Code Pin', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.FIPS_Code_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Env URL := ' + environementUrl);

    //         updatedRequestBody = dataJson.testData.FIPS_Code;
    //         updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
    //         updatedRequestBody.subscriberList[0].properties[0].propertyName = propertyName;
    //         updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Cancel Subscription Update Crm Account List Commercial Profile Copy Check', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.CancelSubscription_UpdateCrmAccountListCommercialProfile_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.CancelSubscription_UpdateCrmAccountListCommercialProfile_Copy;
    //         updatedRequestBody.subscriberPackageList[0].userName = randomUser;
    //         updatedRequestBody.subscriberPackageList[0].crmAccountId = randomUser;
    //         updatedRequestBody.subscriberPackageList[0].commProfileList[0].solutionOfferExternalID = solutionOfferExternalID;
    //         updatedRequestBody.subscriberPackageList[0].commProfileList[0].solutionOfferID = solutionOfferID;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Update Crm Account List Commercial Profile', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.UpdateCrmAccountListCommercialProfile_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.UpdateCrmAccountListCommercialProfile;
    //         updatedRequestBody.subscriberPackageList[0].userName = randomUser;
    //         updatedRequestBody.subscriberPackageList[0].crmAccountId = randomUser;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('CRM Account Device List Mgmt Service', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.CRMAccountDeviceListMgmtService_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.CRMAccountDeviceListMgmtService;
    //         updatedRequestBody.subscriberList[0].userName = randomUser;
    //         updatedRequestBody.subscriberList[0].crmAccountId = randomUser;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Get Subscriber ', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.Get_Subscriber_URI;
    //         uri=uri.replace("{{username_new}}",randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         const config = {
    //             'method': 'GET',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {    
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Get Assigned Packages', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.getAssignedPackages_URI;
    //         uri=uri.replace("{{username_new}}",randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         const config = {
    //             'method': 'GET',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;

    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Set Pins', async function () {
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.setPins_URI;
    //          uri = uri.replace("{{crmAccountId01}}", randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.setPins;
    //         updatedRequestBody.parentalControlPin = 1111;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;

    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
    // it('check Purchase Pin', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.checkPurchasePin_URI;
    //         uri=uri.replace("{{crmAccountId01}}",randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.checkPurchasePin;
    //         updatedRequestBody.purchasePin = 1111;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;

    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('check Parental Control Pin', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.checkParentalControlPin_URI;
    //         uri=uri.replace("{{crmAccountId01}}",randomUser)
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.checkParentalControlPin;
    //         updatedRequestBody.parentalControlPin = 1111;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;

    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });


    // it('User Refresh Token', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.UserRefreshToken_URI;
    //         uri=uri.replace("{{crmAccountId01}}",randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Env URL :===>>> ' + environementUrl);

    //         const config = {
    //             'method': 'GET',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });


    // it('delete User Refresh Token', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.deleteUserRefreshToken_URI;
    //         uri=uri.replace("{{crmAccountId01}}",randomUser);
    //         environementUrl = url + "/" + uri;
    //         console.log('Env URL :===>>> ' + environementUrl);

    //         const config = {
    //             'method': 'DELETE',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Created user Deactivation ', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.Created_User_Deactivation_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.Created_User_Deactivation;
    //         updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
    //         updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // it('Created User Deletion ', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.ams_preprod.url;
    //         uri = apiConfigJson.ams_preprod.Created_User_Deletion_URI;
    //         environementUrl = url + "/" + uri;
    //         console.log('Environement URL :===>> ', environementUrl);

    //         updatedRequestBody = dataJson.testData.Created_User_Deletion;
    //         updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
    //         updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;

    //         const config = {
    //             'method': 'POST',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(updatedRequestBody),
    //             'httpsAgent': httpsAgentPreProd
    //         }
    //         response = await axios(config).then((response) => {
    //             statusCode = response.status;
    //             console.log('Response Body :===>>> ', response.data);
    //             console.log('Response Code :===>>> ', statusCode);
    //             return response;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
})



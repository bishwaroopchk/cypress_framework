const https = require('https');
const fs = require('fs');
const certificates = require('../data/certificates.json');

  

  const httpsAgent_preprod = new https.Agent({
    rejectUnauthorizded: false,
    cert: fs.readFileSync(certificates.ams_preprod.certificate_path, {encoding: 'utf-8', 'flag': 'r'}),
    key: fs.readFileSync(certificates.ams_preprod.certificate_key_path, {encoding: 'utf-8', 'flag': 'r'}),
    passphrase: 'YYY'
});



module.exports =  { 
    httpsAgentPreProd: httpsAgent_preprod
} 
const request = require('request');

module.exports = {
    aadhar_okyc_send_otp: (aadhar) => {
        return new Promise((resolve, reject) => {
            var options = {
                'method': 'POST',
                'url': `${process.env.KYC_END_POINT}/offline-aadhaar/otp`,
                'headers': {
                  'x-client-id': process.env.KYC_CLIENT_ID,
                  'x-client-secret': process.env.KYC_CLIENT_SECRET,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "aadhaar_number": aadhar
                })
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                resolve(JSON.parse(response.body))
            });
        })
        
    },
    aadhar_okyc_verify: (ref_id, otp) => {
        return new Promise((resolve, reject) => {
            var options = {
                'method': 'POST',
                'url': `${process.env.KYC_END_POINT}/offline-aadhaar/verify`,
                'headers': {
                'x-client-id': process.env.KYC_CLIENT_ID,
                'x-client-secret': process.env.KYC_CLIENT_SECRET,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "otp": otp,
                  "ref_id": ref_id
                })
              
              };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                resolve(JSON.parse(response.body))
            });
        })
    },

    pan_okyc_verify: (pan) => {
        return new Promise((resolve, reject) => {
            var request = require('request');
            var options = {
              'method': 'POST',
              'url': `${process.env.KYC_END_POINT}/pan`,
              'headers': {
                'x-client-id': process.env.KYC_CLIENT_ID,
                'x-client-secret': process.env.KYC_CLIENT_SECRET,
                'x-api-version': '2022-10-26',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "pan": pan
              })
            
            };
            // console.log(options);
            request(options, function (error, response) {
              if (error) {
                console.log(error);
                resolve({suc:0, msg: error})
                // throw new Error(error);
              }else{
                // console.log(response.body);
                resolve({suc: 1, msg: JSON.parse(response.body)})
              }
            });
        })
    }   

}
const axios = require('axios');
const qs = require('querystring');
const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
let accessToken = null;

const body = qs.stringify({
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'demouser',
    password: '*Safb02da42Demo$'
});

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    }
};

const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
if (res.data.error){
    throw Error(res.data.error);
}

/*
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
 */

accessToken = res.data['access_token'];
console.log(accessToken);


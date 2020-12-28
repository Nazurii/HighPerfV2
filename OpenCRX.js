const axios = require('axios').default;
const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
const credentials = { username:'guest', password:'guest'};
const config = {
    headers: {
        'Accept': 'application/json'
    },
    auth: credentials,
};


const contacts = axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);

contacts.then(
    function(value) {

        var objekte = value.data.objects;

        console.log(test["fullName"]);

    },
    function(error) { console.log(error);}
)



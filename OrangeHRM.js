const axios = require('axios');
const qs = require('querystring');
const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
let accessToken = null;

const body = qs.stringify({
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'Becker',
    password: 'Ga,wieKp!20'
});

function Employee(fullName, code, employeeId, unit, jobTitle){
    return{
        fullName:fullName,
        code:code,
        employeeId:employeeId,
        unit:unit,
        jobTitle:jobTitle,
    }
}

let config = {};
config.headers = {'Content-Type':'application/x-www-form-urlencoded', 'Accept': 'application/json'};

async function getOrangeHRMToken(){

    const response = axios.post(`${baseUrl}/oauth/issueToken`,  body, config)
        .then(res => {
            accessToken = res.data['access_token'];
            config.headers.Authorization = `Bearer ${accessToken}`;
        })
        // CATCH as https://github.com/axios/axios#handling-errors states
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

    return await response;
}

console.log("TOKEN: " + getOrangeHRMToken());


async function getAllEmployees(){
    let res = await axios.get(`${baseUrl}/api/v1/employee/search`, config);
    if(res.data.error){
        console.log(res.data.error);
    }
    let employees = [];
    let obj = res.data.data;

    for(let i in obj){
        if(obj[i].jobTitle != null && obj[i].code !== "") {
            let e = new Employee(obj[i].fullName, obj[i].code, obj[i].employeeId, obj[i].unit, obj[i].jobTitle);
            employees[i] = e;
        }
    }
    return employees.filter(function(el) {return el != null;});
}

async function getEmployeeById(id){
    console.log("OrangeHRM.js - getEmployeeById()");
    let res = await axios.get(`${baseUrl}/api/v1/employee/search?code=${id}`, config);
    if(res.data.error){
        console.log(res.data.error);
    }
    let obj = res.data.data;
    let emp = new Employee(obj[0].fullName, obj[0].code, obj[0].employeeId, obj[0].unit, obj[0].jobTitle);
    console.log(emp);
    return emp;
}

async function getSalesmen(){
    let res = await axios.get(`${baseUrl}/api/v1/employee/search`, config);
    if(res.data.error){
        console.log(res.data.error);
    }
    let salesmen = [];
    let obj = res.data.data;

    for(let i in obj){
        if(obj[i].jobTitle === "Senior Salesman" && obj[i].code !== ""){
            console.log("jobTitle: " + obj[i].jobTitle);
            let e = new Employee(obj[i].fullName, obj[i].code, obj[i].employeeId, obj[i].unit, obj[i].jobTitle)
            salesmen[i] = e;
        }
    }
    return salesmen.filter(function(el) {return el != null;});

}

async function postBonusSalary(employeeId, year, bonus){
    let body2 = {
        year:year,
        value:bonus
    }

    const resp = axios.post(`${baseUrl}/api/v1/employee/${employeeId}/bonussalary`, qs.stringify(body2), config)
        .then(r => {
            console.log(r.data);
        })
        .catch(function(error){
            console.log(error);
        });
    return await resp.data;
}

exports.getAllEmployees = getAllEmployees;
exports.getOrangeHRMToken = getOrangeHRMToken;
exports.postBonusSalary = postBonusSalary;
exports.getEmployeeById = getEmployeeById;
exports.getSalesmen = getSalesmen;


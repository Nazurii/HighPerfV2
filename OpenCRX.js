const axios = require('axios').default;
const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
const credentials = { username:'guest', password:'guest'};
const config = {
    headers: {
        'Accept': 'application/json'
    },
    auth: credentials,
};

function Sales(name, totalAmount, totalTaxAmount, totalAmountIncludingTax, contractNumber){
    return{
        name:name,
        totalAmount:totalAmount,
        totalTaxAmount: totalTaxAmount,
        totalAmountIncludingTax: totalAmountIncludingTax,
        contractNumber:contractNumber
    }
}

function Product(name, descr, nr){
    return{
        name:name,
        description:descr,
        productNumber: nr
    }
}

function Person(fullname, department, jobtitle, income){
    return {
        fullName: fullname,
        department: department,
        jobTitle: jobtitle,
        annualIncome: income
    }
}

function Company(fullName, accRating){
    return {
        fullName: fullName,
        accountRating: mapRating(accRating)
    }
}

function mapRating(number){
    switch(number){
        case 1:
            return "excellent";
        case 2:
            return "very good";
        case 3:
            return "good";
        default:
            return "no rating";
    }
}

let objekte = null;
let products = null;
let sales = null;
let rep = null;


const contacts = axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config)
    .then(function(value){
        objekte = value.data.objects;
    })
    .catch(function(error){
        console.log(error);
    });


const produkte = axios.get(`${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product`, config)
    .then(function(value){
        products = value.data.objects;
    })
    .catch(function(error){
        console.log(error);
    });

const soldproducts = axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config)
    .then(function(value){
        sales = value.data.objects;
    })
    .catch(function(error){
        console.log(error);
    });

function getRep(url){
    const representative = axios.get(url, config)
        .then(function(value){
            rep = value.data;
            //console.log(rep[0])
        })
        .catch(function(error){
            console.log(error);
        })
    console.log(rep)
    //console.log(rep[0].fullName)
    //console.log(rep.fullName)
}

const getAllProducts = () => {
    console.log("Get all products");
    let liste = [];
    for(let i in products){
        let p = new Product(products[i].name, products[i].description, products[i].productNumber);
        liste[i] = p;
    }
    return liste;
}

const getAllSales = () => {
    console.log("Get all sales");
    let liste = [];
    for(let i in sales){
        let s = new Sales(sales[i].name, sales[i].totalAmount, sales[i].totalTaxAmount, sales[i].totalAmountIncludingTax, sales[i].contractNumber);
        liste[i] = s;
        console.log(getRep(sales[i].salesRep['@href']));
        //console.log(sales[i].salesRep['@href']);
    }
    return liste;
}

const getAllCustomers = () => {
    console.log("Get all customers from OpenCRX");
    let liste = []
    for (let o in objekte) {
        if (objekte[o].hasOwnProperty("jobTitle")) {
            let p = new Person(objekte[o].fullName, objekte[o].department, objekte[o].jobTitle, objekte[o].annualIncomeCurrency)
            console.log(p)
            liste[o] = p;
        }
    }
    return liste;
}

const getAllCompanies = () => {
    let liste = []
    for (let o in objekte) {
        if (objekte[o].hasOwnProperty("industry")) {
            let p = new Company(objekte[o].fullName, objekte[o].accountRating);
            console.log(p)
            liste[o] = p;
        }
    }
    return liste;
}



exports.getAllCustomers = getAllCustomers;
exports.getAllCompanies = getAllCompanies;
exports.getAllProducts = getAllProducts;
exports.getAllSales = getAllSales;




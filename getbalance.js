const config = require('./config');
const axios = require('axios');

const getBalance = async () => {
var balance = await axios({
    url: config.url.getBalance,
    headers: config.header,
    data: {
        address: "0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61"
    },
    method: 'post'
})

var ether = axios({
    url: config.url.convert,
    headers: config.header,
    data: {
        number: balance.data.values,
        unit: "ether"
    },
    method: 'post'
})

console.log(balance.data);
console.log("ether: ",ether.data.values +"ETH");

}

getBalance()
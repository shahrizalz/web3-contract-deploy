var Web3 = require('web3');
var web3 = new Web3('http://localhost:8546');
let abi = require('./abi.json')

var myContract = new web3.eth.Contract(abi, '0x19e50a578484d12efaf75ec3b080b82992a45283');

const callget = () => {
    myContract.methods.get().call({
        from: '0x8e94f1e44a3219a02520bc15e1f2a11c6fb5738a'
    })
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log("Error callget: "+err);

        })
}

callget()
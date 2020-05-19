var Web3 = require('web3');
var web3 = new Web3('http://localhost:8546');
let abi = require('./abi.json')
let bytecode = require('./bytecode.json')

var myContract = new web3.eth.Contract(abi, '0xBf7035bE32D03F49EA13092A5dB201fE14beD877', {
    from: '0x8e94f1e44a3219a02520bc15e1f2a11c6fb5738a', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});



const deploymycontract = () => {
    myContract.deploy({
        data: "0x" + bytecode.object,
        // arguments: [123, 'My String']
    })
        .send({
            from: '0x8e94f1e44a3219a02520bc15e1f2a11c6fb5738a',
            gas: 1500000,
            gasPrice: '0'//'30000000000000' 
        })
        .then(function (newContractInstance) {
            console.log(newContractInstance.options.address) // instance with the new contract address
        }).catch(err => {
            console.log("Caught error: " + err);
        })

}

const callget = () => {
    myContract.methods.get().call({
        from: '0x8e94f1e44a3219a02520bc15e1f2a11c6fb5738as'
    })
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log("Error callget: "+err);

        })
}

const sendset = () => {
    myContract.methods.set(46).send({
        from: '0x8e94f1e44a3219a02520bc15e1f2a11c6fb5738a',
        gas: 1500000,
        gasPrice: '0'//'30000000000000' 
    }).then(res => {
        console.log(res);

    })
}

//read get method
callget()
// sendset()
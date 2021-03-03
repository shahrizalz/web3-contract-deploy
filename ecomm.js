var Web3 = require('web3');
// var web3 = new Web3('https://mainnet.infura.io/v3/fc3763a3d64c4ca191a04aab5b340f15');
var abi = require('./stdEscAbi.json')
// var web3 = new Web3('https://ropsten.infura.io/v3/03956f5e62124526ade1eda76f8c0fb1');

// var web3 = new Web3('https://kovan.infura.io/v3/03956f5e62124526ade1eda76f8c0fb1');

// var web3 = new Web3('https://goerli.infura.io/v3/03956f5e62124526ade1eda76f8c0fb1');

var web3 = new Web3('https://rinkeby.infura.io/v3/03956f5e62124526ade1eda76f8c0fb1');
try {
    var myCon = new web3.eth.Contract(abi, "0xfa7eDEda3c55EF1C235D80D0dD459E3E335D32A3")
    myCon.methods.addPayment('6035fb9971a40b35bf47194a',
        '0x4Cf6adFdE591d210898C009A142BADe1f0FC89a1',
        '0x10F2AaD2a3A473996ecf7567D0fe3326700b8ad2',
        '100',
        '1614236961').estimateGas(function (err,res) {
            if(err)
                console.log(err);
            else
                console.log(res);
        })
        // console.log(enc);


} catch (error) {
    console.log(error);
}

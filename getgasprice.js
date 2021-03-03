var Web3 = require('web3');
var web3 = new Web3("https://rinkeby.infura.io/v3/fc3763a3d64c4ca191a04aab5b340f15");

web3.eth.getHashrate().then(console.log)
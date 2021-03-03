var Web3 = require('web3');
var web3 = new Web3("https://rinkeby.infura.io/v3/fc3763a3d64c4ca191a04aab5b340f15");

var address = "0x640d29e499c4114128FFc3db750a2e60d10D4248";

try {
    web3.eth.getCode(address, function (err,res) {
        try {

            // throw 'Parameter is not a number!';

            if (err) {
                console.log("Err is: "+err);
                // throw "Invalid Address"
            } else {
                console.log(res);
            }
            
        } catch (error) {
            console.log(error);
            // throw "Invalid Address"
        }
        
        
    })
} catch (error) {
    console.log("Err is: dfsdfs"+error);
}

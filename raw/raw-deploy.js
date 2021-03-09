var Web3 = require('web3');
var web3 = new Web3('http://18.141.95.89:8546');
let abi = require('../abi.json')
let bytecode = require('../bytecode.json')

const { Transaction } = require('@ethereumjs/tx');
const Common = require('@ethereumjs/common').default;
var myContract = new web3.eth.Contract(abi);
var data = myContract.deploy({ //no
    data: "0x" + bytecode.object
}).encodeABI()

async function createtxhex() {
    const nonce = await web3.eth.getTransactionCount('0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61'); //yes
    const gaslimit = await web3.eth.estimateGas({ //yes
        nonce: web3.utils.toHex(nonce),
        data: data
    })

    console.log("gas limit: ", gaslimit);
    console.log("gas limit utiled: " + web3.utils.toHex(gaslimit));
    console.log(typeof web3.utils.toHex(gaslimit))
    console.log("0x" + gaslimit.toString(16));




    const gasPrice = await web3.eth.getGasPrice() //yes
    const txParams = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gaslimit),
        data: data
    }
    const customChainParams = { name: 'custom', chainId: 5234 }
    const customChainCommon = Common.forCustomChain('mainnet', customChainParams)

    const tx = Transaction.fromTxData(txParams, { common: customChainCommon });
    const privateKey = Buffer.from(
        '20b51b9fba49f1756b61bc431155cffa4d95edcf0dc827ac8772159ffe121f73',
        'hex',
    )

    const signedTx = tx.sign(privateKey)

    const serializedTx = signedTx.serialize().toString('hex')

    console.log(serializedTx);

    return '0x' + serializedTx

}



const deploymycontract = async () => {
    var a = await createtxhex()
    web3.eth.sendSignedTransaction(a)
        .on('receipt', console.log);
}


deploymycontract()
// createtxhex()



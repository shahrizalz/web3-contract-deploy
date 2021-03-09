var Web3 = require('web3');
var web3 = new Web3('http://18.141.95.89:8546');
let abi = require('../abi.json')
const { Transaction } = require('@ethereumjs/tx');
const Common = require('@ethereumjs/common').default;

var myContract = new web3.eth.Contract(abi, '0xc2f5d26333e578280129f6870b1C0A0a46C70Ece');

var data = myContract.methods.set(4380).encodeABI() //ih


async function createtxhex() {
    const nonce = await web3.eth.getTransactionCount('0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61'); //yes
    const gaslimit = await web3.eth.estimateGas({ //yes
        nonce: web3.utils.toHex(nonce),
        data: data,
        to: "0xc2f5d26333e578280129f6870b1C0A0a46C70Ece"
    })
    const gasPrice = await web3.eth.getGasPrice() //yes
    const txParams = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gaslimit),
        data: data,
        to: "0xc2f5d26333e578280129f6870b1C0A0a46C70Ece"
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

    return '0x'+serializedTx

}

const sendContract = async() => {
    var a = await createtxhex()
    web3.eth.sendSignedTransaction(a)
.on('receipt', console.log);
}

sendContract()

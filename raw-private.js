var Web3 = require('web3');
var web3 = new Web3('http://localhost:8550');
let abi = require('./abi.json')
let bytecode = require('./bytecode.json')

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


// deploymycontract()
// createtxhex()

try {
    
var wallet1 = require('./UTC--2021-02-25T01-46-34.809640900Z--58a721bbd652a1b26bd82676e6e0347a3fe5cb12.json')

web3.eth.accounts.decrypt({
    "address": "58a721bbd652a1b26bd82676e6e0347a3fe5cb12",
    "crypto": {
        "cipher": "aes-128-ctr",
        "ciphertext": "e56e8b521050edb7d6e3993eb4d078e78a153b3787edc44c7b34be223c9d43ae",
        "cipherparams": {
            "iv": "cb8e0f32aab33f5d6bd3404751dc4820"
        },
        "kdf": "scrypt",
        "kdfparams": {
            "dklen": 32,
            "n": 262144,
            "p": 1,
            "r": 8,
            "salt": "2aca7ec99f100387ad30a4961ce40da1c8a60a4b7c5206e5e9b3b242dba190d0"
        },
        "mac": "937478df7767c801e423871732521ef43378b1aa09f560ad1daf0093666b0b22"
    },
    "id": "2bce9ed8-a7f5-4c21-bf2b-7370deb7128e",
    "version": 3
}, '123456789mmm0');
} catch (error) {
    console.log("Throw: ",error);
}
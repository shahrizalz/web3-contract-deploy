var receiver = "0x768a044d531F6bd8E4AB7902Aa52109671C17F3B";
var value = "0x38D7EA4C68000"
const config = require('./config');
const { Transaction } = require('@ethereumjs/tx');
const Common = require('@ethereumjs/common').default;
const axios = require('axios');

try {
    async function transfer() {

        var count = await axios({
            url: config.url.txCount,
            headers: config.header,
            data: {
                address: "0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61"
            },
            method: 'post'
        })

        var gasLimit = 21000;

        var gasPrice = await axios({
            url: config.url.gasPrice,
            headers: config.header,
            method: 'get'
        })

        const txParams = {
            nonce: "0x" + count.data.values.toString(16),
            gasPrice: "0x" + gasPrice.data.values.toString(16),
            gasLimit: "0x" + gasLimit.toString(16),
            to: receiver,
            value: value
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

        var receipt = await axios({
            url: config.url.sendSignedTx,
            headers: config.header,
            data: {
                serializedTx: "0x"+serializedTx
            },
            method: 'post'

        })

        console.log("Transaction response: ", receipt.data.values);

    }

    transfer()
} catch (error) {
    console.log(error);
}

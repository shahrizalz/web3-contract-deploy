let abi = require('./abi.json')
let bytecode = require('./bytecode.json')
const config = require('./config')
const axios = require('axios');
const { Transaction } = require('@ethereumjs/tx');
const Common = require('@ethereumjs/common').default;

try {
    async function deployContract() {

        var count = await axios({
            url: config.url.txCount,
            headers: config.header,
            data: {
                address: "0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61"
            },
            method: 'post'
        })

        var deployHex = await axios({
            url: config.url.encodeDeploy,
            headers: config.header,
            data: {
                abi: abi,
                bytecode: bytecode.object,
                arguments: []
            },
            method: 'post'
        })

        var gasLimit = await axios({
            url: config.url.estimateGas,
            headers: config.header,
            data: {
                nonce: count.data.values,
                data: deployHex.data.values,
            },
            method: 'post'
        })

        var netID = await axios({
            url: config.url.netID,
            headers: config.header,
            method: 'get'
        })

        var gasPrice = 0;
        const txParams = {
            nonce: "0x" + count.data.values.toString(16),
            gasPrice: "0x" + gasPrice.toString(16),
            gasLimit: "0x" + gasLimit.data.values.toString(16),
            data: deployHex.data.values
        }

        const customChainParams = { name: 'custom', chainId: netID.data.values }
        const customChainCommon = Common.forCustomChain('mainnet', customChainParams)

        const tx = Transaction.fromTxData(txParams, { common: customChainCommon });
        const privateKey = Buffer.from(
            '20b51b9fba49f1756b61bc431155cffa4d95edcf0dc827ac8772159ffe121f73',
            'hex',
        )

        const signedTx = tx.sign(privateKey)

        const serializedTx = signedTx.serialize().toString('hex')

        var receipt = await axios({
            url: config.url.deploySC,
            headers: config.header,
            data: {
                txHashOnly: false,
                serializedTx: serializedTx
            },
            method: 'post'

        })

        console.log("Deploy response: ", receipt.data);

    }

    deployContract()

} catch (error) {
    console.log(error);
}
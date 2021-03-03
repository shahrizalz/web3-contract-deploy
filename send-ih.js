let abi = require('./abi.json');
const config = require('./config');
const { Transaction } = require('@ethereumjs/tx');
const Common = require('@ethereumjs/common').default;
const axios = require('axios');

try {
    async function sendContract() {

        var count = await axios({
            url: config.url.txCount,
            headers: config.header,
            data: {
                address: "0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61"
            },
            method: 'post'
        })

        var encodedFx = await axios({
            url: config.url.encodeFx,
            headers: config.header,
            data: {
                contractAddress: "0x19e50a578484d12efaF75Ec3b080B82992A45283",
                method: "set",
                param: [940715065167],
                abi: abi,
            },
            method: 'post'
        })

        var gasLimit = await axios({
            url: config.url.estimateGas,
            headers: config.header,
            data: {
                from:"0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61",
                data: encodedFx.data.values,
                to: "0x19e50a578484d12efaF75Ec3b080B82992A45283",
            },
            method: 'post'
        })

        var gasPrice = await axios({
            url: config.url.gasPrice,
            headers: config.header,
            method: 'get'
        })

        const txParams = {
            nonce: "0x" + count.data.values.toString(16),
            gasPrice: "0x" + gasPrice.data.values.toString(16),
            gasLimit: "0x" + gasLimit.data.values.toString(16),
            data: encodedFx.data.values,
            to: "0x19e50a578484d12efaF75Ec3b080B82992A45283",
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
            url: config.url.deploySC,
            headers: config.header,
            data: {
                txHashOnly: false,
                serializedTx: serializedTx
            },
            method: 'post'

        })

        console.log("Deploy response: ", receipt.data.values);

    }

    sendContract()
} catch (error) {
    console.log(error);
}
async function send() {

    var count = await axios({
        url: config.url.txCount,
        headers: config.header,
        data: {
            address: "0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61"
        },
        method: 'post'
    })

    var gasLimit = await axios({
        url: config.url.estimateGas,
        headers: config.header,
        data: {
            nonce: count.data.values,
            data: deployHex.data.values,
            to: "0x7A0D5258E4FBb8fAb905D275F875d29841DF09D7"
        },
        method: 'post'
    })

    var encodedFx = await axios({
        url: config.url.encodeFx,
        headers: config.header,
        data: {
            contractAddress: "0x7A0D5258E4FBb8fAb905D275F875d29841DF09D7",

            method: "set",
            arguments: [940715065167],
            abi: abi,
        },
        method: 'post'
    })

    var gasPrice = 0
    const txParams = {
        nonce: "0x" + count.data.values.toString(16),
        gasPrice: "0x" + gasPrice.toString(16),
        gasLimit: "0x" + gasLimit.data.values.toString(16),
        data: encodedFx.data.values,
        to: "0x7A0D5258E4FBb8fAb905D275F875d29841DF09D7"
    }


    const customChainParams = { name: 'custom', chainId: 5234, networkId: 5234 }
    const customChainCommon = Common.forCustomChain('mainnet', customChainParams)
    const tx = Transaction.fromTxData(txParams, { common: customChainCommon });
    const privateKey = Buffer.from(
        '20b51b9fba49f1756b61bc431155cffa4d95edcf0dc827ac8772159ffe121f73',
        'hex',
    )

    const signedTx = tx.sign(privateKey)

    const serializedTx = signedTx.serialize().toString('hex')

    console.log(serializedTx);

    // return '0x'+serializedTx
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



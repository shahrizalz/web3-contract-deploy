exports.url = {
    txCount: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.eth/getTransactionCount",
    estimateGas: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.eth/estimateGas",
    encodeDeploy: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/contract/encodeABISC",
    netID: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.*.net/getId",
    deploySC: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/contract/deploySCHex",
    encodeFx:"http://integrationhub.okwave.asia:3333/api/v2/thorhammer/contract/encodeABIFunctionSC",
    getBalance: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.eth/getBalance",
    convert: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.utils/fromWei",
    gasPrice: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.eth/getGasPrice",
    sendSignedTx: "http://integrationhub.okwave.asia:3333/api/v2/thorhammer/web3.eth/sendSignedTransaction"

}

exports.header = {
    'Authorization': "OBC eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2JjIiwiaWF0IjoxNjEzNDM5ODAzfQ.3h2MOghcvnm0kMVvR5ApJxUIqggitdQWjjFiRZ5ZMko",
    'Content-Type': "application/json"
}
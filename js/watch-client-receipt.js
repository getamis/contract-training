var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = [{"constant":false,"inputs":[{"name":"_id","type":"bytes32"}],"name":"deposit","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"}];
var ClientReceipt = web3.eth.contract(abi);
var clientReceipt = ClientReceipt.at("0x4d9E6D999E113b52Ce96AEE86A42F3279C115a73");

var event = clientReceipt.Deposit();

// watch for changes
event.watch(function(error, result){
    // result will contain various information
    // including the argumets given to the Deposit
    // call.
    if (!error)
        console.log(result);
});

// Or pass a callback to start watching immediately
var event = clientReceipt.Deposit(function(error, result) {
    if (!error) {
        console.log(result);
    }
    process.exit(0);
});

//Create transaction
var addr = web3.eth.accounts[0];
web3.personal.unlockAccount(addr, 'test1234', function(e, r){
    if(e != null){
        console.log("Error:", e);
    }else {
        var txid = clientReceipt.deposit.sendTransaction(123, {from:addr, gas: 50000});
        console.log("txid:", txid);
    }
});

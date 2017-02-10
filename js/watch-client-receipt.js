var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = [{"constant":false,"inputs":[{"name":"_id","type":"bytes32"}],"name":"deposit","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"}];
var ClientReceipt = web3.eth.contract(abi);
var clientReceipt = ClientReceipt.at("0x74e88c1ad4b66cd76bacf7165da056a87e483e87");

var event = clientReceipt.Deposit();

var eventPrint = function(result){
    if(result.event == 'Deposit') {
        console.log("Deposit " + result.args._value +
            " from " +  result.args._from +
            " to " + result.args._id);
    }
}

// watch for changes
event.watch(function(error, result){
    // result will contain various information
    // including the argumets given to the Deposit
    // call.
    console.log("Received event from all filter");
    if (!error) {
        eventPrint(result);
    }
});

// Or pass a callback to start watching immediately
var event = clientReceipt.Deposit(function(error, result) {
    console.log("Received event from 'Deposit' filter");
    if (!error) {
        eventPrint(result);
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

var Web3 = require('web3');
var TestRPC = require("ethereumjs-testrpc");
// var web3 = new Web3(TestRPC.provider());
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi  = [{"constant":false,"inputs":[{"name":"_id","type":"bytes32"}],"name":"deposit","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"}];
var evmCode = "0x6060604052341561000c57fe5b5b60de8061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063b214faa514603a575bfe5b3415604157fe5b6059600480803560001916906020019091905050605b565b005b80600019163373ffffffffffffffffffffffffffffffffffffffff167f19dacbf83c5de6658e14cbf7bcae5c15eca2eedecf1c66fbca928e4d351bea0f346040518082815260200191505060405180910390a35b505600a165627a7a72305820528673a40eadb3be75f92326e0664ef276b182a65164702f0d7c104f291b9c680029";

var ClientReceiptContract = web3.eth.contract(abi);
var callback = function(e, contract){
	if(e == null) {
		console.log("Contract transaction: TransactionHash: " + contract.transactionHash);
		if(typeof contract.address !== 'undefined'){
			console.log("Contract mined! Address: " + contract.address);
		}
    } else {
		console.log(e);
	}
};
var addr = web3.eth.accounts[0];
web3.personal.unlockAccount(addr, 'test1234', function(e, r){
    if(e != null){
        console.log("Error:", e);
    }else {
        var oneValue = ClientReceiptContract.new({from:addr, data: evmCode, gas: 200000}, callback);
    }
});

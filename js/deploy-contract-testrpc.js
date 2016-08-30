var Web3 = require('web3');
var TestRPC = require("ethereumjs-testrpc");
var web3 = new Web3(TestRPC.provider());
// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8547"));

var abi  = [{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"v","type":"uint256"}],"name":"setValue","outputs":[],"type":"function"},{"inputs":[{"name":"initValue","type":"uint256"}],"type":"constructor"}]
var evmCode = "606060405260405160208060cf833981016040528080519060200190919050505b806000600050819055505b5060978060386000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063209652551460415780635524107714606257603f565b005b604c60048050506078565b6040518082815260200191505060405180910390f35b607660048080359060200190919050506089565b005b600060006000505490506086565b90565b806000600050819055505b5056";

var OneValueContract = web3.eth.contract(abi);
var callback = function(e, contract){
	if(e == null) {
		console.log("Contract transaction: TransactionHash: " + contract.transactionHash);
		if(typeof contract.address !== 'undefined'){
			console.log("Contract mined! Address: " + contract.address);
            var oneValueInst = OneValueContract.at(contract.address);
            oneValueInst.getValue(function(e, r){
                console.log("Value:", parseInt(r));
                process.exit(0);
            });
		}
    } else {
		console(e);
	}
};
var initValue = 123;
web3.eth.getAccounts(function(e, accts){
    var addr = accts[0];
    //Unlock account
    var oneValue = OneValueContract.new(initValue, {from:addr, data: evmCode, gas: 200000}, callback);
});

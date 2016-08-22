var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi  = [{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"v","type":"uint256"}],"name":"setValue","outputs":[],"type":"function"},{"inputs":[{"name":"initValue","type":"uint256"}],"type":"constructor"}];
var OneValueContract = web3.eth.contract(abi);
var contractAddress = '0x36274a6286c9cf3c8e09c85c5bfa572a8827fddc';
var oneValue = OneValueContract.at(contractAddress);

var addr = web3.eth.accounts[0];
web3.personal.unlockAccount(addr, 'test1234', function(e, r){
    oneValue.setValue.sendTransaction(1234, {from: addr}, function(error, txid){
        console.log("Error: ", e);
        console.log("Txid: ", txid);
    });
});

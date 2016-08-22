var express = require('express');
var app = express();
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi  = [{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"v","type":"uint256"}],"name":"setValue","outputs":[],"type":"function"},{"inputs":[{"name":"initValue","type":"uint256"}],"type":"constructor"}];
var OneValueContract = web3.eth.contract(abi);
var contractAddress = '0x36274a6286c9cf3c8e09c85c5bfa572a8827fddc';
var oneValue = OneValueContract.at(contractAddress);

app.get('/', function (req, res) {
  res.send(
      'OneValue Instance: ' + contractAddress + "\n" +
      'Value: '+ oneValue.getValue() + "\n");
});

app.listen(3000)

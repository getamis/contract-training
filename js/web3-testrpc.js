var Web3 = require('web3');
var TestRPC = require("ethereumjs-testrpc");
var web3 = new Web3(TestRPC.provider());
web3.eth.getAccounts(function(e, accts){
    console.log("error:", e);
    console.log("accounts:", accts);
    process.exit(0);
});

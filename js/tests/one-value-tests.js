'use strict'

describe('OneValueContract', function(){
    var assert = require('assert');
    var Web3 = require('web3');
    var web3 = new Web3();
    var TestRPC = require("ethereumjs-testrpc");
    var primaryAddress;
    var oneValue;
    var initValue = 123;
    var gas = 200000;
    web3.setProvider(TestRPC.provider());
    this.timeout(60000); //1 minute

    // 1. Deploy OneValueContract
    before(function(done) {
        var tool = require('./tools');
        var abi = tool.loadAbi('OneValue');
        var bin = tool.loadBin('OneValue');
        var OneValueContract = web3.eth.contract(abi);
        //2. Get accounts
        web3.eth.getAccounts(function(error, result){
            //3. Deploy
            primaryAddress = result[0]; //Blockchain Admin
            oneValue = OneValueContract.new(initValue, {from:primaryAddress, data: bin, gas: gas}, function(error, contract){
                assert.equal(error, null);
                if(error == null && contract.address != null){
                    //Mined
                    done();
                }
            });
        });
    });

    it("initValue should be 123", function(done){
        oneValue.getValue(function(error, result){
            assert.equal(error, null);
            assert.equal(initValue, result);
            done();
        });
    });

    it("setValue should store value", function(done){
        var newValue = 456;
        oneValue.setValue.sendTransaction(456, {from:primaryAddress, gas: gas}, function(error, txid){
            oneValue.getValue(function(error, result){
                assert.equal(error, null);
                assert.equal(newValue, result);
                done();
            });
        });
    });
});

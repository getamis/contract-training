import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
_ = lodash;

import './main.html';

// Template - blockInfo
Template.blockInfo.onCreated(function blockInfoOnCreated(){
    EthBlocks.init();
});

Template.blockInfo.helpers({
    currentBlock(){
        return EthBlocks.latest.number;
    },
});

// Template - OneValue
Template.oneValue.onCreated(function oneValueOnCreated(){
    var abi = [{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"v","type":"uint256"}],"name":"setValue","outputs":[],"type":"function"},{"inputs":[{"name":"initValue","type":"uint256"}],"type":"constructor"}];;
    var OneValueContract = web3.eth.contract(abi);
    this.contractAddress = '0xe07438274839E9793baEAaa757F695CfED4A9e26';
    var oneValue = this.oneValue = OneValueContract.at(this.contractAddress);
    var currentValue = this.currentValue = new ReactiveVar(0);
    var message = this.message = new ReactiveVar("");
    setInterval(function(){
        oneValue.getValue(function(err, res){
            if(!_.isEqual(res.toNumber(), currentValue.get())){
                currentValue.set(res.toNumber());
                message.set("Update value to: " + res.toNumber());
            }
        });
    }, 1000);

});

Template.oneValue.helpers({
    oneValueAddress(){
        return Template.instance().contractAddress;
    },
    currentValue(){
        return Template.instance().currentValue.get();
    },
    getMessage(){
        return Template.instance().message.get();
    }
});

Template.oneValue.events({
    'click button'(event, instance) {
        // increment the counter when button is clicked
        //instance.counter.set(instance.counter.get() + 1);
        var newValue = $('#new-value').val();
        var oneValue = Template.instance().oneValue;
        var message = Template.instance().message;
        oneValue.setValue.sendTransaction(_.toNumber(newValue), function(err, res){
            message.set("Transaction hash: " + res);
        });
    },
});

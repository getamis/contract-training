'use strict'

var fs = require('fs');

var self = module.exports = {
    loadAbi: function(name) {
        var abi = JSON.parse(fs.readFileSync( __dirname + '/../../contracts/build/'+name+'.abi').toString());
        return abi;
    },
    loadBin: function(name) {
        var bin = fs.readFileSync( __dirname + '/../../contracts/build/'+name+'.bin').toString();
        return bin;
    }
};

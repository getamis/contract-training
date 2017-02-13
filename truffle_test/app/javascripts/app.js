var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
    return MetaCoin.deployed().then(function(meta) {
        return meta.getBalance.call(account);
    }).then(function(outCoinBalance) {
          var metaCoinBalance = outCoinBalance.toNumber();
          var balance_element = document.getElementById("balance");
          balance_element.innerHTML = metaCoinBalance.valueOf();
    });
};

function sendCoin() {
    var meta;
    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    return MetaCoin.deployed().then(function(instance) {
        meta = instance;
        setStatus("Initiating transaction... (please wait)");
        return meta.sendCoin(receiver, amount, {from: account});
    }).then(function(tx) {
        console.log(tx, tx.tx);
        setStatus("Transaction complete! </br> txid: " + tx.tx);
        return refreshBalance();
    }).catch(function(e){
        console.log(e);
        setStatus("Error sending coin; see log.");
    });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}

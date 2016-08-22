class: center, middle

# Solidity testing

---

## Tools:

- Testrpc: https://github.com/ethereumjs/testrpc
    ```bash
    testrpc -p 8600 -a 10
    ```

- Mocha:  https://mochajs.org/

---
## Mocha
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. Hosted on GitHub.

---
## Test case example
one-value-tests.js

```JavaScript
describe('OneValueContract', function(){
    // 1. Deploy OneValueContract
    before(function(done) {
        web3.eth.getAccounts(function(error, result){
            //3. Deploy
            primaryAddress = result[0]; //Blockchain Admin
            oneValue = OneValueContract.new(initValue, {from:primaryAddress, data: bin}, function(error, contract){
                if(error == null && contract.address != null){
                    //Mined
                    done();
                }
            });
        });
    });

    it("initValue should be 123", function(done){
        oneValue.getValue(function(error, result){
            assert.equal(initValue, result);
            done();
        });
    });
});

```

---
## Run tests
Add test script in package.json
```Javascript
{
  "dependencies": {
    "mocha": "2.4.5"
  },
  "scripts": {
     "test": "find tests -name '*tests.js' -not -path './node_modules/*' | xargs ./node_modules/mocha/bin/_mocha -R spec"
  }
}
```

Run: `npm test`

---
## Test with truffle
https://truffle.readthedocs.io/en/latest/getting_started/testing/

```Javascript
contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    // Get a reference to the deployed MetaCoin contract, as a JS object.
    var meta = MetaCoin.deployed();

    // Get the MetaCoin balance of the first account and assert that it's 10000.
    return meta.getBalance.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
});
```

Run: `truffle test`

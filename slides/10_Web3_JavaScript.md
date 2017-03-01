class: center, middle

# Web3 JavaScript Ðapp API

---

## Reference

https://github.com/ethereum/wiki/wiki/JavaScript-API

---

## Web3

- Github: https://github.com/ethereum/web3.js

- JavaScript library

- 透過 RPC 與 Ethereum 溝通

- web3: 一般工具函式
	- web3.eth: Ethereum blockchain 函式
	- web3.net: 網路狀態
	- web3.ssh: Whisper 函式 (略過)

---

## 安裝 Web3 

- npm: `npm install web3`

- meteor: `meteor add ethereum:web3`
	- Ðapp 開發介紹將使用meteor

---

## 啟用 RPC

選擇其中一種方式：

- Geth 指令：啟用時帶入下列參數：

	`--rpc --rpccorsdomain "*" --rpcapi "eth,net,web3"`

- Geth console: 
	
    `admin.startRPC("0.0.0.0", 8545, "*","eth,net,web3")`
    
- 直接使用 Mist browser
	
    Develop -> Toggle Develop Tools -> Mist UI -> `web3.currentProvider`
	
- 直接使用 MetaMask
 	
    View -> Developer -> JavaScript Console -> `web3.currentPovider`

- Web3 library supported RPC APIs: `eth, db, net, net, personal`
	
    https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console

---


## Web3 連線


```Javascript
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
```

---

## 同步呼叫

```Javascript
var block = web3.eth.getBlock(48);
console.log(block);
```

---

## 非同步呼叫 - 使用 callbacks

```Javascript
web3.eth.getBlock(48, function(error, result){
    if(!error)
        console.log(result)
    else
        console.error(error);
});

```

---

## 批次呼叫

__Note__: 批次處理不會比較快，但能確保執行順序。

```Javascript
var callback = function(error, result){
	if(!error)
    	console.log(result);
    else
    	console.error(error);
};
var batch = web3.createBatch();
batch.add(web3.eth.getBlock.request(48, callback));
batch.add(web3.eth.getBalance.request('0x4121074B75481f0fD6f75aeE48890CA2f74f377F', 'latest', callback));
batch.execute();
```

---

## BigNumber (1/2)

JavaScript 無法處理 big number
```JavaScript
Number.MAX_SAFE_INTEGER
9007199254740991
```

Ethereum 中最大的數字 uint256: 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

Web3 回傳的數值都使用 bignumber.js
https://github.com/MikeMcl/bignumber.js/

---

## BigNumber (2/2)

```Javascript
var balance = new BigNumber('131242344353464564564574574567456');
balance.plus(21).toString(10); // toString(10) converts it to a number string
// "131242344353464564564574574567477"
```

__Note__: 浮點數只支援到20位，所以盡量都使用Wei(Ethereum貨幣中最小的單位)
```Javascript
var balance = new BigNumber('13124.234435346456466666457455567456');
balance.plus(21).toString(10); // toString(10) converts it to a number string, but can only show max 20 floating points 
// "13145.23443534645646666646" // you number would be cut after the 20 floating point
```

---

## Web3 所有函式列表

https://github.com/ethereum/wiki/wiki/JavaScript-API#web3js-api-reference

---

## Web3 常用工具函式

- 單位轉換:

```Javascript
var weiValue = web3.toWei('12', 'ether');
var value = web3.fromWei(weiValue, 'ether');
```

- 編碼：

```Javascript:
var str = web3.toHex({test: 'test'});
console.log(str); // '0x7b22746573742
web3.toAscii(str);
web3.sha3(str);
```

---

## Web3 常用 eth 函式 - 區塊鏈資訊

```Javascript
var callback = function(error, result){
	if(!error)
    	console.log(result);
    else
    	console.error(error);
};
web3.eth.getBlockNumber(callback);
web3.eth.getBlock(10, callback);
web3.eth.getBlock("0xda882aeff30f59eda9da2b3ace3023366ab9d4219b5a83cdd589347baae8678e", callback);
```

---

## Web3 常用 eth 函式 - 交易函式

```Javascript
web3.eth.sendTransaction({value: 123, to: "0x764248D16C713Cb168ddfB5a5456fBC9F9e7357b", gas: 40000}, callback);
web3.eth.getTransaction('0xcc82f65ac8c62c1bc0337aeee5b5b7db33b1eacfe9706af178d9113c5827cd42', callback);
web3.eth.getTransactionReceipt('0xcc82f65ac8c62c1bc0337aeee5b5b7db33b1eacfe9706af178d9113c5827cd42', callback);

```

---

## Web3 常用 eth 函式 - 合約函式

參考: ClientReceipt.sol, watch-client-receipt.js

``` Javascript
web3.eth.contract(abiArray)
web3.eth.contract.myMethod()
web3.eth.contract.myEvent()
```

```Javascript
var abi = [{"constant":false,"inputs":[{"name":"_id","type":"bytes32"}],"name":"deposit","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"}];
var ClientReceipt = web3.eth.contract(abi);
var clientReceipt = ClientReceipt.at("0x32cb389a408cb79ab1e2d23bf1a454f4420f80b2");
var event = clientReceipt.Deposit();
event.watch(function(error, result){
    console.log(error, result);
	console.log("Deposit id: " + result.args._id);
    event.stopWatching();
});
clientReceipt.deposit.sendTransaction(123, {gas: 50000},callback);

```

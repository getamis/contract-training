## 以太坊開發工具
- __結點 / 錢包__
- 智能合約開發工具，函式庫

---

## 圖形化錢包 / 節點：Mist/Ethereum wallet
- 錢包
- Ðapps 瀏覽器
- 本地節點
- Github: https://github.com/ethereum/mist
- Installable binaries: https://github.com/ethereum/mist/releases

---

## Ethereum wallet demo
- Network: mainnet and testnet
- Mining: testnet only (can still enable it via console)
- Wallets
- Send
- Contracts

---

## 雲端錢包: MetaMask
- 雲端節點: 不須等待資料同步
- MetaMask: https://metamask.io/
![alt text](images/metamask.png "MetaMask")

---

## Geth 節點
- 以太坊 Golang 實作節點
- Mist 預設使用節點
- Ethstats 上大部分是 `Geth` 和 `Parity`
    - https://ethstats.net/

---

## 利用 geth 連上 mainnet
```bash
geth --fast  \
    --datadir "~/.eth/mainnet"  \
    --rpc --rpccorsdomain "*"  \
    --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"  \
    --rpcapi "db,eth,net,web3,personal"  \
    --rpcport "8547"  \
    --port "30305" \
    console
```

---

## 利用 geth 連上 testnet
```bash
geth --fast \
    --datadir "~/.eth/testnet"  \
    --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"  \
    --rpc --rpccorsdomain "*"  \
    --rpcapi "db,eth,net,web3,personal"  \
    --rpcport "8546" \
    --port "30304" \
    --testnet \
    console
```

---

## 利用 geth 跑私有鏈
- 使用 `networkid`

```bash
geth --fast \
    --datadir "~/.eth/privnet"  \
    --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"  \
    --rpc --rpccorsdomain "*"  \
    --rpcapi "db,eth,net,web3,personal"  \
    --rpcport "8545" \
    --port "30303" \
    --networkid "12345" \
    --nodiscover \
    console
```

---

## 利用 geth 跑私有鏈
- 使用 `networkid`及`genesis.json`

```JavaScript
{
  "nonce": "0x0000000000000042",
  "timestamp": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "extraData": "Any extra data 134ADFAD",
  "gasLimit": "0x47e7c4",
  "difficulty": "0x9c40",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x3333333333333333333333333333333333333333",
  "alloc": {
    "0x60cafee22ae353ac9de07852a682558c9bb84e61": {
      "balance": "999999999999999999999999999999999"
    }
  }
}
```

---

## 利用 geth 跑私有鏈
- 使用 `networkid`及`genesis.json`

Init blockchain:
```bash
geth --datadir "~/.eth/privnet2"  \
    init "/PATH/TO/genesis.json"
```

Run:
```bash
geth --fast \
    --datadir "~/.eth/privnet2"  \
    --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"  \
    --rpc --rpccorsdomain "*"  \
    --rpcapi "db,eth,net,web3,personal"  \
    --rpcport "8545" \
    --port "30303" \
    --networkid "12345" \
    --nodiscover \
    console
```

---

## 以太坊節點
- 同步區塊鏈網路資料：建立本地端資料備份
- 錢包：發送交易
- 提供 API 接口：RPC, IPC, WebSocket

---

## 以太坊開發工具
- 結點 / 錢包
- __智能合約開發工具，函式庫__

---

## Simple contract: OneValueContract
```Javascript
contract OneValue {
    uint256 value;

    function OneValue(uint256 initValue) {
        value = initValue;
    }

    function setValue(uint256 v) {
        value = v;
    }

    function getValue() constant returns (uint256 result){
        return value;
    }
}
```

---

## Solidity compiler: solc
- solcjs
```bash
npm install solc -g
```

- solc: https://github.com/ethereum/solidity
```bash
git clone --recursive https://github.com/ethereum/solidity.git
cd solidity
mkdir build
cd build
cmake .. && make && make install
```

---

## Compile contract
- Browser-Solidity (Remix IDE):
    https://ethereum.github.io/browser-solidity/
- solc
    ```bash
    solc --abi --bin --gas -o ./build OneValue.sol
    ```

---

## Web3
- Web3: ethereum compatible [JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API) which implements the [Generic JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec

- 安裝: `npm install web3`  

---

## Web3 使用方式
- Enable rpc in console:
    ```Javascript
    admin.startRPC("0.0.0.0", 8545, "*","db,eth,net,web3,personal")
    ```
- Example code: `node web3-test.js`
    ```Javascript
    var Web3 = require('web3');
    var web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545"));

    web3.eth.getBlock(48, function(error, result){
        if(!error)
            console.log(result)
        else
            console.error(error);
    });
    ```

---
## Contract deployment
- Mist
- Web3

---
## Deploy contract with Mist
- Contracts → Deploy new contract → Paste code and deploy
- Remix IDE → Create

---

## Deploy contract with Web3
- Deploy to testnet:
    ```Javascript
    node deploy-contract-test.js
    ```

---

## Deploy contract with Web3 程式碼節錄    
- Example code (partial):
    ```Javascript
    var abi  = ...
    var evmCode = ...
    var OneValueContract = web3.eth.contract(abi);
    var oneValue = OneValueContract.new(initValue,
        {from:addr, data: evmCode, gas: 4700000},
        function(error, contract){
            ...
        }
    );
    ```
---

## Testrpc

- Fast Ethereum RPC client for testing and development. (RPC mock)
- 安裝：
    ```bash
    npm install -g ethereumjs-testrpc
    ```
- 使用：
    ```bash
    testrpc -p 8547
    ```

---

## Web3 連線到 Testrpc
- Connect with Web3:
    ```bash
    node web3-testrpc.js
    ```

    ```Javascript
    var Web3 = require('web3');
    var TestRPC = require("ethereumjs-testrpc");
    var web3 = new Web3(TestRPC.provider());
    web3.eth.getAccounts(function(e, accts){
        console.log("error:", e);
        console.log("accounts:", accts);
        process.exit(0);
    });
    ```

---

## Deploy contract with Web3
- Deploy to testrpc:
    ```Javascript
    node deploy-contract-testrpc.js
    ```

---

## 與智能合約互動 (Express + Web3)

- Example (partial):

```Javascript
var abi  = ... var OneValueContract = web3.eth.contract(abi);
var contractAddress = '0x36274a6286c9cf3c8e09c85c5bfa572a8827fddc'; //Testnet
var oneValue = OneValueContract.at(contractAddress);

app.get('/', function (req, res) {
  res.send(
      'OneValue Instance: ' + contractAddress + "\n" +
      'Value: '+ oneValue.getValue() + "\n");
});

app.listen(3000)
```

- Run: `node express-example.js`
- Test: `curl http://localhost:3000`

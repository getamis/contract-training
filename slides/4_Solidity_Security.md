class: middle, center

# Solidity Security

---
## Private information and randomness

- Everything you use in a smart contract is publicly visible, even local variables and state variables marked `private`.

- Using random numbers in smart contracts is quite tricky if you do not want miners to be able to cheat.
    Reference: https://github.com/randao/randao

---
## Re-entrancy

Any interaction from a contract (A) with another contract (B) and any transfer of Ether hands over control to that contract (B). This makes it possible for B to call back into A before this interaction is completed.

```Javascript
// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() {
        if (msg.sender.send(shares[msg.sender]))
            shares[msg.sender] = 0;
    }
}
```

---
## Checks-Effects-Interactions pattern

```Javascript
function auctionEnd() {
    // 1. checking conditions
    // 2. performing actions (potentially changing conditions)
    // 3. interacting with other contracts

    // 1. Conditions
    if (now <= auctionStart + biddingTime)
        throw; // auction did not yet end
    if (ended)
        throw; // this function has already been called

    // 2. Effects
    ended = true;
    AuctionEnded(highestBidder, highestBid);

    // 3. Interaction
    if (!beneficiary.send(highestBid))
        throw;
}
```

---
## Gas limit and loops
- Be careful for loops that do not have a fixed number of iterations.

- Most fallback function (called by `send`) rely on the "gas stipend" (2300 gas)

- There is a way to forward more gas to the receiving contract using addr.call.value(x)(). Be careful for malicious actors.

- If you are using address.send.

    - If the recipient is a contact, you will call its fallback function

    - Sending Ether can fail due to the call depth going above 1024.

---
## tx.origin
Never use tx.origin for authorization. Let’s say you have a wallet contract like this:
``` Javascript
contract TxUserWallet {
    address owner;

    function TxUserWallet() {
        owner = msg.sender;
    }

    function transfer(address dest, uint amount) {
        if (tx.origin != owner) { throw; }
        if (!dest.call.value(amount)()) throw;
    }
}
```
---
## tx.origin
Now someone tricks you into sending ether to the address of this attack wallet:
```Javascript
contract TxAttackWallet {
    address owner;

    function TxAttackWallet() {
        owner = msg.sender;
    }

    function() {
        TxUserWallet(msg.sender).transfer(owner, msg.sender.balance);
    }
}
```

---
## Recommendations

- Restrict the Amount of Ether

- Keep it Small and Modular

- Use the Checks-Effects-Interactions Pattern

- Include a Fail-Safe Mode

---
## DAO attack

Fix: https://github.com/slockit/DAO/pull/242

ManagedAccount.sol
```Javascript
function payOut(address _recipient, uint _amount) returns (bool) {
    if (msg.sender != owner || msg.value > 0 || (payOwnerOnly && _recipient != owner))
        throw;
    if (_recipient.call.value(_amount)()) {
        PayOut(_recipient, _amount);
        return true;
    } else {
        return false;
    }
}
```

---
## DAO attack
DAO.sol

```Javascript
function withdrawRewardFor(address _account) noEther internal returns (bool _success) {
    if ((balanceOf(_account) * rewardAccount.accumulatedInput()) / totalSupply < paidOut[_account])
        throw;

    uint reward =
        (balanceOf(_account) * rewardAccount.accumulatedInput()) / totalSupply - paidOut[_account];

    reward = rewardAccount.balance < reward ? rewardAccount.balance : reward;

+   paidOut[_account] += reward;

    if (!rewardAccount.payOut(_account, reward))
        throw;

-   paidOut[_account] += reward;

    return true;
}
```

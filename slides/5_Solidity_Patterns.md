class: center, middle
# Solidity - Patterns

---
## Withdrawal from contracts
withdraw-contract.sol

Let users withdraw themselves (rather than sending fund directly)

```Javascript
contract WithdrawalContract {
    ...

    function withdraw() returns (bool) {
        uint amount = pendingWithdrawals[msg.sender];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        if (msg.sender.send(amount)) {
            return true;
        }
        else {
            pendingWithdrawals[msg.sender] = amount;
            return false;
        }
    }
}
```

---
## Restricting access
You can make it a bit harder by using encryption, but if your contract is supposed to read the data, so will everyone else.

access-restriction.sol

---
## State machine
state-machine.sol

```Javascript
contract StateMachine {
    enum Stages {
        AcceptingBlindedBids,
        RevealBids,
        AnotherStage,
        AreWeDoneYet,
        Finished
    }

    Stages public stage = Stages.AcceptingBlindedBids;

    modifier atStage(Stages _stage) {
        if (stage != _stage) throw;
        _
    }

    function bid() atStage(Stages.AcceptingBlindedBids) {
        //To implement
    }

    function reveal() atStage(Stages.RevealBids) {
        //To implement
    }
}
```

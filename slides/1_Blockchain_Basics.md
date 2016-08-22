class: center, middle

# Blockchain Basics

---

## Blockchain 1.0 - Bitcoin and Alt coins (Dogecoin, Litecoin, etc)
- P2P payment system

- Blockchain

    - Immutable: create and read. no update and delete.

    - Non-repudiable: digital signatures, sign & verify

    - Fault-tolerant: censorship resistant, partially-connected mesh resilience

---

## Blockchain 1.1 - Colored Coins, Decoration protocols
- Colored coins – leverage additional 40 bytes scripting size in Bitcoin

- Mastercoin, Bitshares and Counterparty

    - financial derivatives

    - savings wallets

    - decentralized exchange

---
## Blockchain 2.0 - Ethereum, Tendermint
- General purpose blockchain

- Ethereum: TCP/IP = Bitcoin: SMTP

---
## Ethereum
- Turing-complete

- Universal scripting language

- Mining algorithm - specialized hardware resistant. (Dagger)

- Fee system

- GHOST (fast block confirmation time, 3 ~ 30 sec)

---
## Ethereum Virtual Machine vs. Bitcoin Scripting
| Ethereum | Bitcoin |
| -- | -- |
| Turing-completeness | Turing-incomplete - no loop |
| State-awareness | Lack of state - single stage |
| Value-awareness | Value-blindness - all or nothing |
| Blockchain-awareness | Blockchain-blindness - no blockchain reference |

---
## Accounts vs UTXO
- Accounts

    - Large space savings

    - Greater fungibility

    - Simplicity

    - Constant light client reference

- UTXO

    - Higher degree of privacy

    - Potential scalability paradigms

---
## Why not UTXO - State
- UTXOs are unnecessarily complicated

- UTXOs are stateless, and so are not well-suited to dapps

---
## Bitcoin Script: pay-to-pubkey-hash
| Stack | Script | Description |
| -- | -- | -- |
| Empty. | `<sig> <pubKey> OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG` |scriptSig and scriptPubKey are combined. |
| `<sig> <pubKey>` | `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG` | Constants are added to the stack. |
| `<sig> <pubKey> <pubKey>` | `OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`|Top stack item is duplicated. |
| `<sig> <pubKey> <pubHashA>` | `<pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG` | Top stack item is hashed. |
| `<sig> <pubKey> <pubHashA> <pubKeyHash>` | `OP_EQUALVERIFY OP_CHECKSIG` | Constant added. |
| `<sig> <pubKey>` | `OP_CHECKSIG` |Equality is checked between the top two stack items. |
| `true` | Empty. | Signature is checked for top two stack items.|

---
## Ethereum Virtual Machine v.s. Bitcoin Scripting (2)
- Bitcoin script is primarily about expressing ownership conditions.

- Ethereum script is more suited to describing business logic (though it can express ownership conditions too)

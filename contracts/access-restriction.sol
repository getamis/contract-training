contract AccessRestriction {
    // These will be assigned at the construction
    // phase, where `msg.sender` is the account
    // creating this contract.
    address public owner = msg.sender;
    uint public creationTime = now;

    // Modifiers can be used to change
    // the body of a function.
    // If this modifier is used, it will
    // prepend a check that only passes
    // if the function is called from
    // a certain address.
    modifier onlyBy(address _account)
    {
        if (msg.sender != _account)
            throw;
        // Do not forget the "_"! It will
        // be replaced by the actual function
        // body when the modifier is invoked.
        _
    }

    /// Make `_newOwner` the new owner of this
    /// contract.
    function changeOwner(address _newOwner)
        onlyBy(owner)
    {
        owner = _newOwner;
    }

    modifier onlyAfter(uint _time) {
        if (now < _time) throw;
        _
    }

    /// Erase ownership information.
    /// May only be called 6 weeks after
    /// the contract has been created.
    function disown()
        onlyBy(owner)
        onlyAfter(creationTime + 6 weeks)
    {
        delete owner;
    }

    // This modifier requires a certain
    // fee being associated with a function call.
    // If the caller sent too much, he or she is
    // refunded, but only after the function body.
    // This is dangerous, because if the function
    // uses `return` explicitly, this will not be
    // done! This behavior will be fixed in Version 0.4.0.
    modifier costs(uint _amount) {
        if (msg.value < _amount)
            throw;
        _
        if (msg.value _amount)
            msg.sender.send(msg.value - _amount);
    }

    function forceOwnerChange(address _newOwner)
        costs(200 ether)
    {
        owner = _newOwner;
        // just some example condition
        if (uint(owner) & 0 == 1)
            // in this case, overpaid fees will not
            // be refunded
            return;
        // otherwise, refund overpaid fees
    }
}

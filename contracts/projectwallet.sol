// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract wallet {
    address owner;
    // deposit money
    mapping(address => uint) balanceof;

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value >= 1, "Mininum deposit is 1 wei");
        balanceof[msg.sender] += msg.value;
    }

    function myBalance() public view returns (uint) {
        return balanceof[msg.sender];
    }
    function TotalWalletBalance() public view returns (uint) {
        require(msg.sender == owner);
        return address(this).balance;
    }

    function transferTo(uint _amt, address _to) public {
        require(_amt <= balanceof[msg.sender], "Insufficient balance");
        require(_to != address(0), "invalid address");

        balanceof[msg.sender] -= _amt;
        balanceof[_to] += _amt;
    }

    function withdraw(uint _amount) public {
        require(_amount <= balanceof[msg.sender], "Insufficient balance");
        balanceof[msg.sender] -= _amount;
        (payable(msg.sender)).transfer(_amount);
    }


    //staking functionality 
}

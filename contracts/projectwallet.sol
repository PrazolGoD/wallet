// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


import "hardhat/console.sol";


contract wallet{
        // deposit money



        function deposit() external  {
            require(msg.value>=1,"Mininum deposit is 1 wei");

        }


}


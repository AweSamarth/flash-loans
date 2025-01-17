//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanExample is FlashLoanSimpleReceiverBase{
    event Log(address asset, uint256 val);

    constructor(IPoolAddressesProvider provider) FlashLoanSimpleReceiverBase(provider){

    }



    function createFlashLoan(address asset, uint256 amount) external {

        address receiver = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(receiver, asset, amount, params, referralCode);
    }

    function executeOperation (address asset, uint256 amount, uint256 premium, address initiator, bytes calldata params) external returns (bool){

        uint256 amountOwing = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwing);
        emit Log(asset, amountOwing);
        return true;
    }





}
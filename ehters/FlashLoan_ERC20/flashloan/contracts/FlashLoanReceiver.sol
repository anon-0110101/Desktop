// SPDX-License-Identifier: Unlicense

//contract inspired by Damn Vulnerable DeFi
//Original Contract
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./FlashLoan.sol";
import "./Token.sol";

contract FlashLoanReceiver {
    FlashLoan private pool;
    address private owner;

    event LoanReceived(address token, uint256 amount);
    constructor(address _poolAddress) {
        pool = FlashLoan(_poolAddress);
        owner = msg.sender;
    }

    function receiveTokens(address _tokenAddress, uint256 _amount) external {
        require(msg.sender == address(pool), 'sender must be pool');

        //Require funds received
        require(Token(_tokenAddress).balanceOf(address(this)) == _amount, 'failed to get loan');

        //emit event
        emit LoanReceived(_tokenAddress, _amount);

        // Do stuff with the money...

        // Return funds to pool
        require(Token(_tokenAddress).transfer(msg.sender, _amount), "Transfer of tokens failed");
    }

    function executeFlashLoan(uint _amount) external {
        require(msg.sender == owner, 'only the owner can execute flash loan');
        pool.flashLoan(_amount);
    }
}
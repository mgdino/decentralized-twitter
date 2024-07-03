// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract DXToken is ERC20, ERC20Burnable {
    address payable public owner;

    constructor() ERC20("DXToken", "DXT")  {
        owner = payable(msg.sender);
        _mint(owner, 100);
    }

    function mint(address account, uint256 amount) internal virtual {
        super._mint(account, amount);
    }

    function interacted(address account) public  {
        mint(account, 1);
    }

    function burn(address account, uint256 value) public {
        super.burnFrom(account, value);
    }

}
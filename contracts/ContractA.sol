// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ContractA is Ownable {
// [][x] 1. User sould be able to depost tokens in contract A
// [][x] 2. contact A should be able to call contract B to update the data in contract B
// [][x] 3. users of contract A should NOT have access to call
//    contract B directly, this write functionality should be safeguarded
// [][x] 4. there should be a function in contract A that allows the
//     admin (deployer) to update contract B to a new address

    function addTokenToB(ContractB _contractBAddress, bytes32 ticker, address tokenAddress) external onlyOwner {
        _contractBAddress.addToken(ticker, tokenAddress);
    }

    function deposit(ContractB _contractAddress, address user, uint _amount, bytes32 ticker) external payable {
      _contractAddress.depositToContractB(user, _amount, ticker);
    }

    function setAddress(ContractB _contractBAddress, address updateAddress) external onlyOwner {
        _contractBAddress.setAddressB(updateAddress);
    }
}


contract ContractB is Ownable, ContractA {


    using SafeMath for uint256;

    address public admin;
    address public  contractAddress;

    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }
    mapping(bytes32 => Token) public tokenMapping;
    mapping(address => mapping(bytes32 => uint256)) public balances;

    bytes32[] public tokenList;

    constructor(){
        admin = msg.sender;
        contractAddress = address(this);
    }


    function addToken(bytes32 ticker, address tokenAddress) external{
        tokenMapping[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    function depositToContractB(address userAddress, uint256 amount, bytes32 ticker) external payable {
        IERC20(tokenMapping[ticker].tokenAddress).transferFrom(userAddress, contractAddress, amount);
        balances[userAddress][ticker] = balances[userAddress][ticker].add(amount);
    }

    function getUserInfo(bytes32 ticker) external view onlyOwner returns (uint) {
        return balances[msg.sender][ticker];
    }

    function getCurrentAddress() external view returns(address) {
        return contractAddress;
    }

    function setAddressB(address newAddress) external {
        contractAddress = newAddress;
    }

    function getNewAddress() external view onlyOwner returns(address) {
        return contractAddress;
    }


}


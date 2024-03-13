// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Lease{

    // Lease Agreement
    address landlord;
    bytes32 leaseHash;
    uint256 rentAmt;
    bytes32 doc1Hash;
    bytes32 doc2Hash;

    constructor(address _landlord, bytes32 _leaseHash, uint256 _rentAmt, bytes32 _doc1Hash, bytes32 _doc2Hash){
        console.log("Deploying a new lease contract under: ", _landlord);
        landlord = _landlord;
        leaseHash = _leaseHash;
        rentAmt = _rentAmt;
        doc1Hash = _doc1Hash;
        doc2Hash = _doc2Hash;
    }

    function verifyLease() public view returns(bytes32) {
        return leaseHash;
    }

    // Payment (Tenant)
    bytes32 paymentHash;
    uint256 nextPayment;
    event rentSent(uint256 timestamp, address indexed payer, uint256 months);
    function payRent(bytes32 _paymentHash, uint256 _months) public {
        require(msg.sender != landlord, "Only the tenant can pay rent.");
        require(_months <= 0, "You need to pay for 1 or more months.");
        paymentHash = _paymentHash;
        nextPayment = block.timestamp + (_months*30);
        emit rentSent(block.timestamp, msg.sender, _months);
    }

    function getNextPayment() public view returns(bytes32) {
        return leaseHash;
    }

    // Payment (Landlord)
    event rentReceived(uint256 timestamp, address indexed payer, uint256 months);
    event rentNotReceived(uint256 timestamp, address indexed payer, uint256 months);
    function confirmRent(bool _choice, address _tenant, uint256 _months) public{
        require(msg.sender == landlord, "Only the landlord can confrim rent.");
        require(_months <= 0, "You need to pay for 1 or more months.");
        if(_choice == true){
            emit rentReceived(block.timestamp, _tenant, _months);
        }
        else{
            emit rentNotReceived(block.timestamp, _tenant, _months);
        }
    }
}
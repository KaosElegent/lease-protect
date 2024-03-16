var landlordAddress = "0xb4c2871f9542e2ae525d94Bd8D5D83468342Df74";
var leaseHash = "0x3fd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab" ;
var rentAmt = 500;
var doc1Hash = "0x3fd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab" ;
var doc2Hash = "0x3fd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab" ;
var leaseid = "65f51845185aeb9bac2fc1c8"

var Lease = artifacts.require("Lease"); 
module.exports = function(deployer) {        
  deployer.deploy(Lease, landlordAddress, leaseHash, rentAmt, doc1Hash, doc2Hash, leaseid); 
};
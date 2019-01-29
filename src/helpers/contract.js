import Web3 from "web3";
import ABI from "./contractAbi";

export const web3 = new Web3("http://localhost:8545"); // "https://ropsten.infura.io"

let contractInstance;

// Using https://etherscan.io/apis https://github.com/sebs/etherscan-api
// const etherscanApi = etherscan.init("P1MSRTK127N49UT3HAFY3FZX7PR2MV8FM3", "ropsten", "3000");

/**
 * @description getEtherValue produce the ether value of an input
 * @param {Number} inputEther
 * @returns {Number}
 */
export function getEtherValue(inputEther) {
  return Web3.toWei(inputEther, "ether"); // result <BN: 3e733628714200000>
}

/**
 * @description function contractAddress returns the instances of a contract
 * given a vendor contractAddress.
 * @param {String} contractAddress Smart Contract Address of a Vendor
 */
export function getContractInstance(contractAddress) {
  return new web3.eth.Contract(ABI, contractAddress);
}


/**
 * @description pay handles purchase of products by customers
 * @param {String} contractAddress smart-contract physicalAddress
 * @param {String} vendorAddress Vendor's physicalAddress (metamask)
 * @param {String} customerAddress Customer's physicalAddress (metamask)
 * @param {String} productHash Cart's 32 Bytes hash string
 * @param {String} currencyAddress currency physicalAddress
 * @param {String} valueTotal Customer's total payable amount to vendor
 * @param {Boolean} buyerProtection default false
*/
export function pay(contractAddress, vendorAddress, customerAddress, productHash,
  currencyAddress, valueTotal, buyerProtection) {
  return new Promise((resolve, reject) => {
    contractInstance = getContractInstance(contractAddress);
    return contractInstance.methods.purchase(vendorAddress, customerAddress, productHash,
      currencyAddress, valueTotal, buyerProtection)
      .send({ from: customerAddress }, (err, result) => {
        if (err) reject(err);
        return resolve(result);
      });
  });
}


/**
 * @description setVendorContract activates vendor payment after approval
 * @param {String} vendorAddress Vendor's physical address
 * @param {String} contractAddress Vendor's contract address
 */
export function setVendorContract(vendorAddress, contractAddress) {
  return new Promise((resolve, reject) => {
    contractInstance = getContractInstance(contractAddress);
    return contractInstance.methods.setVendor(vendorAddress)
      .send({ from: vendorAddress }, (err, result) => {
        if (err) reject(err);
        return resolve(result);
      });
  });
}


/**
 * @description vendorStatus verifies vendor status
 * @required {Object} contractObject smart-contract instance
 * @param {String} contractAddress Vendor's contract Address
 */
export function vendorStatus(contractAddress) {
  return new Promise((resolve, reject) => {
    contractInstance = getContractInstance(contractAddress);
    contractInstance.methods.verifyVendorStatus().call((err, result) => {
      if (err) reject(err);
      return resolve(result);
    });
  });
}

/**
 * @description function vendorWithdraw vendor withdraw's from smart-contract
 * @param {String} currencyAddress currency's address
 * @param {String} vendorAddress Vendor's Address
 */
export function vendorWithdraw(vendorAddress, contractAddress, currencyAddress) {
  getContractInstance(contractAddress);
  contractAddress.methods.withdraw(currencyAddress).send({ from: vendorAddress }, (err, result) => {
    if (!err) return `Success at vendorWithdraw: ${result}`;
    throw new Error(`Error occurred at vendorWithdraw: ${err}`);
  });
}

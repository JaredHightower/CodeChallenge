require('dotenv').config();
const ContractA = artifacts.require("ContractA");
const ContractB = artifacts.require("ContractB");
const TechToken = artifacts.require("TechToken");
const truffleAssert = require('truffle-assertions');

contract("Contract Tests", accounts => {

    it("Contract A: Only the owner can add new tokens", async () => {
        let contractA = await ContractA.deployed();
        let contractB = await ContractB.deployed();
        let techToken = await TechToken.deployed();


        await truffleAssert.passes(
            contractA.addTokenToB(contractB.address, web3.utils.fromUtf8("TECH"), techToken.address, { from: accounts[0] })
        )

        await truffleAssert.reverts(
            contractA.addTokenToB(contractB.address, web3.utils.fromUtf8("DAI"), techToken.address, { from: accounts[1] })
        )

    })

    it("Contract A: Should handle deposits correctly", async () => {
        let contractA = await ContractA.deployed();
        let contractB = await ContractB.deployed();
        let techToken = await TechToken.deployed();

        await techToken.approve(contractB.address, 500);
        await contractA.deposit(contractB.address, accounts[0], 200, web3.utils.fromUtf8("TECH"))
        let balance = await contractB.balances(accounts[0], web3.utils.fromUtf8("TECH"))
        assert.equal(balance.toNumber(), 200);
    })

    it("Contract A: Should update address of contractB", async () => {
        let contractA = await ContractA.deployed();
        let contractB = await ContractB.deployed();

        // await contractA.setAddress(contractB.address, "0x53e65F9a5097309ED3B5a49e707a300E506BCe9B");
    })

    // -------------B-------------

    it("Contract B: Should return the balance of the user", async () => {
        let contractB = await ContractB.deployed();

        let getBalance = await contractB.getUserInfo(web3.utils.fromUtf8("TECH"))
        // console.log(getBalance);
    })

    it("Contract B: Should return the balance of the user", async () => {
        let contractB = await ContractB.deployed();

        let getBalance = await contractB.getUserInfo(web3.utils.fromUtf8("TECH"))
        // console.log(getBalance);
    })

    it("Contract B: should show me current and updated contract address", async () => {
        let contractA = await ContractB.deployed();
        let contractB = await ContractB.deployed();

        let currentAddress = await contractB.getCurrentAddress()
        // console.log("Current Address: ", currentAddress);

        // let currentAdmin = await contractB.testAdmin()
        // console.log("Current Admin: ", currentAdmin);

        let setNewAddrr = await contractA.setAddressB("0x53e65F9a5097309ED3B5a49e707a300E506BCe9B");
        // console.log(setNewAddrr)

        let getNewAddress = await contractB.getNewAddress();
        // console.log("New Address: ", getNewAddress)
    })





    // --------------------------

    //Create test that checks for balance amount before deposit
    //create test for admin approvals

    /*
        *Code Below works
     */
    // it("Should handle deposits correctly", async () => {
    //     let contractA = await ContractA.deployed();
    //     let contractB = await ContractB.deployed();
    //     let techToken = await TechToken.deployed();

    //     await techToken.approve(contractB.address, 500);
    //     await contractB.depositToContractB(200, web3.utils.fromUtf8("TECH"))
    //     let balance = await contractB.balances(accounts[0], web3.utils.fromUtf8("TECH"))
    //     assert.equal(balance.toNumber(), 200);
    // })
})

// contract("ContractB", accounts => {

//     it("Error: Only the owner can add new tokens", async () => {
//         let contractB = await ContractB.deployed();
//         let techToken = await TechToken.deployed();

//         await truffleAssert.passes(
//             contractB.addToken(web3.utils.fromUtf8("TECH"), techToken.address, { from: accounts[0] })
//         )

//         await truffleAssert.reverts(
//             contractB.addToken(web3.utils.fromUtf8("DAI"), techToken.address, { from: accounts[1] })
//         )

//     })

//     it("Should return the balance of the user", async () => {
//         let contractB = await ContractB.deployed();

//         let getBalance = await contractB.getUserInfo(web3.utils.fromUtf8("TECH"))
//         console.log(getBalance);
//     })

//     it("Should return the balance of the user", async () => {
//         let contractB = await ContractB.deployed();

//         let getBalance = await contractB.getUserInfo(web3.utils.fromUtf8("TECH"))
//         console.log(getBalance);
//     })

//     it("should show me current and updated contract address", async () => {
//         let contractA = await ContractB.deployed();
//         let contractB = await ContractB.deployed();

//         let currentAddress = await contractB.getCurrentAddress()
//         // console.log("Current Address: ", currentAddress);

//         // let currentAdmin = await contractB.testAdmin()
//         // console.log("Current Admin: ", currentAdmin);

//         let setNewAddrr = await contractA.setAddressB("0x53e65F9a5097309ED3B5a49e707a300E506BCe9B");
//         // console.log(setNewAddrr)

//         let getNewAddress = await contractB.getNewAddress();
//         // console.log("New Address: ", getNewAddress)
//     })
// })
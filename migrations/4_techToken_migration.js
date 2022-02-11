const TechToken = artifacts.require("TechToken");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(TechToken);
};
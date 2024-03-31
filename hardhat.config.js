require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const RPC_URL = process.env.RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: RPC_URL
      },
    },
  },
};


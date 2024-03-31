const {expect, assert} = require("chai")
const hre = require("hardhat")


const {DAI, DAI_WHALE, POOL_ADDRESS_PROVIDER} = require("../config")

describe("Flash Loans", function(){

  it("Should take a flash loan and be able to return it", async function (){

    const FlashLoanExample = await hre.ethers.getContractFactory("FlashLoanExample")

    const flashLoanExample = await FlashLoanExample.deploy(POOL_ADDRESS_PROVIDER)
    await flashLoanExample.waitForDeployment()
    const token = await hre.ethers.getContractAt("IERC20", DAI)

    const BALANCE_AMOUNT_DAI = hre.ethers.parseEther("2000")
    const signer = await ethers.getImpersonatedSigner(DAI_WHALE)
    await token.connect(signer).transfer(flashLoanExample.target, BALANCE_AMOUNT_DAI)

    const txn = await flashLoanExample.createFlashLoan(DAI, 10000)
    await txn.wait()
    const remainingBalance = await token.balanceOf(flashLoanExample.target)

    expect (remainingBalance).to.lessThan(BALANCE_AMOUNT_DAI)
  })
})
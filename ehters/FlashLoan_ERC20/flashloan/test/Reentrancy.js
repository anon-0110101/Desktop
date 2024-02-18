const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Reentrancy", () => {
  let deployer
  let bank, attackerContract


  beforeEach(async () => {
    [deployer, user, attacker] = await ethers.getSigners()

    const Bank = await ethers.getContractFactory('Bank', deployer)
    bank = await Bank.deploy()

    await bank.deposit({ value: tokens('100') })
    await bank.connect(user).deposit({ value: tokens('50') })

    const Attacker = await ethers.getContractFactory("Attacker", attacker)
    attackerContract = await Attacker.deploy(bank.address)
  })

  describe('facilitates depsits and withdraws', () => {
    it('accepts deposits', async () => {
      //check deposit balance
      const deployerBalance = await bank.balanceOf(deployer.address)
      expect(deployerBalance).to.equal(tokens('100'))

      const userBalance = await bank.balanceOf(user.address)
      expect(userBalance).to.equal(tokens('50'))
    })
    it('accepts withdraws', async () => {
      await bank.withdraw()

      const deployerBalance = await bank.balanceOf(deployer.address)
      const userBalance = await bank.balanceOf(user.address)

      expect(deployerBalance).to.equal(0)
      expect(userBalance).to.equal(tokens('50'))
    })

    it('allows attacker to drain funds from withdraw()', async () => {
      console.log('**** before *****')
      console.log(`Bank's balance: ${tokens(await ethers.provider.getBalance(bank.address))}`)
      console.log(`Attacker's balance: ${tokens(await ethers.provider.getBalance(attacker.address))}`)

      //Perform Attack
      await attackerContract.attack( { value: tokens('10') })
      console.log('**** before *****')
      console.log(`Bank's balance: ${tokens(await ethers.provider.getBalance(bank.address))}`)
      console.log(`Attacker's balance: ${tokens(await ethers.provider.getBalance(attacker.address))}`)

      //Check bank balance has been drained
      expect(await ethers.provider.getBalance(bank.address)).to.equal(0)
    })
  })
})
// test/Brainies.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Brainies", function(){
    var Brainies: any;
    var brainies: any;
    var accounts: any;
    var account: any;
    
    before(async function() {
        accounts = await ethers.getSigners();
        account = await accounts[0].getAddress();

        Brainies = await ethers.getContractFactory('Brainies');
        brainies = await Brainies.deploy();

        //const contractAddress = "0x68106f17e9c30ae9E64cE2f6397E6024E2A3cBEb";
        //brainies = await ethers.getContractAt("Brainies", contractAddress);
        
        await brainies.deployed();
    });

    it('Deployed well', async function () {
        expect((await brainies.name())).to.equal('Brainies');
    })

    it('mint', async function() {
        await brainies.mintNFT();
        console.log(await brainies.balanceOf(account));
        expect((await brainies.balanceOf(account))).to.equal("1");
    })

    it('get NFT Infos', async function () {
        const res = await brainies.getNFTsByOwner(account);
        console.log(res);
        expect('test').to.equal('test');
    })
})
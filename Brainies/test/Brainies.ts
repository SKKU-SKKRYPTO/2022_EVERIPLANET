// test/Brainies.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Brainies", function(){
    var Brainies: any;
    var brainies: any;
    var accounts: any;
    
    before(async function() {
        //Brainies = await ethers.getContractFactory('Brainies');
        const contractAddress = "0xD3C28Bb1A227e1c994583540B6FC572170207622";
        const accounts = await ethers.getSigners();

        brainies = await ethers.getContractAt("Brainies", contractAddress);
        //brainies = await Brainies.deploy();
        await brainies.deployed();
    });

    it('Deployed well', async function () {
        expect((await brainies.name())).to.equal('Brainies');
    })
})
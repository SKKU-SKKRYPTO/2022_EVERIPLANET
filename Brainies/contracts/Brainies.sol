// contracts/Brainies.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Brainies is  ERC721
{
    event Mint(address indexed to, uint256 id, uint256 dna);

    mapping(uint256 => uint256) private _dnaOf;
    mapping(uint256 => uint8) private _abrasionOf;

    // Exclusive for getNFTsByOwner
    struct Brainy {
        uint256 id;
        uint256 dna;
        uint8 abrasion;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Brainies", "BRN") { }

    function getNFTsByOwner(address _owner) external view returns (Brainy[] memory){
        Brainy[] memory result = new Brainy[](balanceOf(_owner));
        uint index = 0;
        for(uint i = 0; i < _tokenIds.current(); i++) {
            if(ownerOf(i) == _owner) {
                result[index].id = i;
                result[index].dna = _dnaOf[i];
                result[index].abrasion = _abrasionOf[i];
                index++;
            }
        }
        return result;
    }

    function mixNFT(uint256 _tokenId_1, uint256 _tokenId_2) public returns (uint256)
    {
        require(_exists(_tokenId_1) && _exists(_tokenId_2), "");

        uint256 _mask = 0xff;
        uint256 newHash = 0x0;
        uint256 _hash1 = _dnaOf[_tokenId_1];
        uint256 _hash2 = _dnaOf[_tokenId_2];


        for (uint256 i = 0; i < 32; i ++)
        {
            uint256 tempRand = uint256(keccak256(abi.encode(block.timestamp)));

            if (tempRand % 2 == 0)
            {
                newHash |= _hash1 & (_mask << (i * 8));
            }
            else
            {
                newHash |= _hash2 & (_mask << (i * 8));
            }
        }

        uint256 newItemId = mintNFT();
        _addNFTInfo(newItemId, newHash);

        _abrasionOf[_tokenId_1] += 1;
        _abrasionOf[_tokenId_2] += 1;

        return newItemId;
    }

    function _addNFTInfo(uint256 _tokenId, uint256 _hash) private
    {
        require(_exists(_tokenId), "not exist");

        _dnaOf[_tokenId] = _hash;
        _abrasionOf[_tokenId] = 0;
    }

    function mintNFT() public returns(uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();
        _mint(msg.sender, newItemId);

        uint256 hash = uint256(keccak256(abi.encode(block.timestamp)));
        _addNFTInfo(newItemId, hash);

        emit Mint(msg.sender, newItemId, hash);

        return newItemId;
    }

    function burnNFT(uint256 _tokenId) private
    {
        require(_exists(_tokenId), "not exist");
        
        delete _dnaOf[_tokenId];
        delete _abrasionOf[_tokenId];

        _burn(_tokenId);
    }
}
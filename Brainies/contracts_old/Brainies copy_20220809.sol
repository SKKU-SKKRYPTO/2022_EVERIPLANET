// contracts/Brainies.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Brainies is  ERC721URIStorage, Ownable
{
    address private _owner;
    string private baseURI;
    string private defaultImage = "https://s2.coinmarketcap.com/static/img/coins/200x200/2930.png";

    uint8 private constant DEFALT_MAX_ABRASION = 5;

    mapping(uint256 => string) private _tokenImages;
    mapping(uint256 => uint256) private _hashs;
    mapping(uint256 => uint8) private _abrasions;

    struct NFTInfo
    {
        uint256 hash;
        string imageURL;
        uint8 abrasion;

        //uint8[] attributes;
        // mapping(uint8 => uint8) attributes;
    }

    mapping(uint256 => NFTInfo) _nftInfo;


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint16 private constant MAX_SUPPLY = 8000;
    uint16 private constant MIX_PRICE = 100;
    uint16 private constant MINT_PRICE = 100;
    uint16 private total_supply = 0;


    constructor() ERC721("Brainies", "BRN")
    {
        _owner = msg.sender;
    }


    function getTotalSupply() public view returns (uint16) { return total_supply; }

    function setBaseURI(string memory _uri) public 
    {
        baseURI = _uri;
    }

    // function getTokenURI(uint256 _tokenId) public view returns (string memory)
    // {
    //     require(_exists(_tokenId), "Token is not exist");

    //     return _tokenURIs[_tokenId];
    // }

    // function setTokenURI(uint256 _tokenId, string memory _uri) public
    // {
    //     require(_exists(_tokenId), "Token is not exist");
    //     require(bytes(_tokenURIs[_tokenId]).length == 0, "");

    //     _tokenURIs[_tokenId] = _uri;
    // }

    function setTokenImage(uint256 _tokenId, string memory _imageURL) public 
    {
        require(_exists(_tokenId), "Token is not exist");

        _nftInfo[_tokenId].imageURL = _imageURL;
    }

    function getTokenImageURL(uint256 _tokenId) public view returns (string memory)
    {
        require(_exists(_tokenId), "Token is not exist");

        return _nftInfo[_tokenId].imageURL;
    }


    function mixNFT(uint256 _tokenId_1, uint256 _tokenId_2) public returns (uint256)
    {
        require(_exists(_tokenId_1) && _exists(_tokenId_2), "");
        // require(_userEnergy[msg.sender] >= MIX_PRICE, "");


        uint256 _mask = 0xff;
        uint256 newHash = 0x0;
        uint256 _hash1 = _nftInfo[_tokenId_1].hash;
        uint256 _hash2 = _nftInfo[_tokenId_2].hash;


        for (uint256 i = 0; i < 32; i ++) // 1byte마다 하나씩 번갈아서
        {
            if (i % 2 == 0)
            {
                newHash |= _hash1 & (_mask << (i * 8));
            }
            else
            {
                newHash |= _hash2 & (_mask << (i * 8));
            }
        }

        // prototype
        uint256 newItemId = mintNFT(msg.sender, baseURI, defaultImage); // 이미지 URL 바꾸기
        addNFTInfo(newItemId, newHash, defaultImage);
        // _userEnergy[msg.sender] -= MIX_PRICE;


        // _hashs[newItemId] = new_hash;
        // _abrasions[newItemId] = 0;

        _abrasions[_tokenId_1] += 1;
        _abrasions[_tokenId_2] += 1;
        if (_abrasions[_tokenId_1] >= DEFALT_MAX_ABRASION)
        {
            burnNFT(_tokenId_1);
        }
        if (_abrasions[_tokenId_2] >= DEFALT_MAX_ABRASION)
        {
            burnNFT(_tokenId_2);
        }

        return newItemId;
    }



    function addNFTInfo(uint256 _tokenId, uint256 _hash, string memory _imageURL) private
    {
        require(_exists(_tokenId), "not exist");

        _nftInfo[_tokenId] = NFTInfo(
            _hash,
            _imageURL,
            0);
    }

    function mintNFT(address recipient, string memory _tokenURI, string memory _tokenImage) public returns(uint256)
    {
        require(total_supply < MAX_SUPPLY, "Full supplied");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        total_supply ++;

        _setTokenURI(newItemId, _tokenURI);
        setTokenImage(newItemId, _tokenImage);


        uint256 hash = uint256(keccak256(abi.encode(block.timestamp)));
        // _abrasions[newItemId] = 0;
        addNFTInfo(newItemId, hash, defaultImage);

        return newItemId;
    }

    function burnNFT(uint256 _tokenId) private
    {
        require(_exists(_tokenId), "not exist");

        // delete _tokenImages[_tokenId];
        // delete _hashs[_tokenId];
        // delete _abrasions[_tokenId];
        delete _nftInfo[_tokenId];

        _burn(_tokenId);
    }
}
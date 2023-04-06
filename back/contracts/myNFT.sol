// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // for minting
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // for setting uri
import "@openzeppelin/contracts/access/Ownable.sol"; // check if owner

contract myNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private tokenCounter;

    string private cid_meta_data;
    string private cid_img;

    constructor(
        string memory metaDataCID,
        string memory imgCID
    ) ERC721("SmileyFace", "SF") {
        cid_meta_data = metaDataCID;
        cid_img = imgCID;
        tokenCounter = 0;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    // keep track of all minted tokens
    mapping(string => bool) private mintedTokens;

    // keep track of which users owns which tokens
    mapping(address => string[]) private ownedTokens;

    // allows any user to be able to mint a token with proper payment
    function payMint(string memory uri) public payable {
        require(msg.value >= 0.01 ether, "Not enough ETH");
        // must not be minted already
        require(mintedTokens[uri] == false, "Token URI already minted");
        // add token to user's owned tokens
        ownedTokens[msg.sender].push(uri);
        mintedTokens[uri] = true;
        uint256 tokenId = tokenCounter;
        tokenCounter += 1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // allows owner to mint new tokens
    function safeMint(address to, string memory uri) public onlyOwner {
        require(mintedTokens[uri] == false, "Token URI already minted");
        uint256 tokenId = tokenCounter;
        tokenCounter += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // allows the (owner/artist of nft) to withdraw funds
    function withdraw() public onlyOwner {
        // transfer all funds from contract to owner
        payable(msg.sender).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity.
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getMintedCount() public view returns (uint256) {
        return tokenCounter;
    }

    function getMinted() public view returns (bool[] memory) {
        bool[] memory minted = new bool[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            minted[i] = mintedTokens[tokenURI(i)];
        }
        return minted;
    }

    function getTokens() public view returns (string[] memory) {
        return ownedTokens[msg.sender];
    }

    function getMetaData() public view returns (string memory) {
        return cid_meta_data;
    }

    function getImgData() public view returns (string memory) {
        return cid_img;
    }
}

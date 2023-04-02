// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SmileyFace is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SmileyFace", "SF") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    mapping(string => bool) private mintedTokens;

    // allows any user to be able to mint a token with proper payment
    function payMint(string memory uri) public payable {
        require(msg.value >= 0.001 ether, "Not enough ETH");
        require(mintedTokens[uri] == true, "Token URI already minted");
        mintedTokens[uri] = true;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // allows owner to mint new tokens
    function safeMint(address to, string memory uri) public onlyOwner {
        require(mintedTokens[uri] == true, "Token URI already minted");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
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
        return _tokenIdCounter.current() - 1;
    }
}

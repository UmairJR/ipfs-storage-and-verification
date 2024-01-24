pragma solidity ^0.8.0;

contract Og {
    struct File {
        string fileName;
        string ipfsHash;
    }

    mapping (string => File) private files;
    mapping (string => string) private hashToIpfsHash;

    function upload(string memory fileName, string memory ipfsHash) public {
        require(bytes(files[fileName].ipfsHash).length == 0, "File already exists");
        files[fileName] = File(fileName, ipfsHash);
        hashToIpfsHash[ipfsHash] = fileName; // Store the mapping from hash to fileName
    }

    function getIpfsHash(string memory fileName) public view returns (string memory){
        require(bytes(files[fileName].ipfsHash).length > 0, "File not exists");
        return files[fileName].ipfsHash;
    }

    function getIpfsHashByHash(string memory ipfsHash) public view returns (string memory){
        require(bytes(hashToIpfsHash[ipfsHash]).length > 0, "File not exists");
        return files[hashToIpfsHash[ipfsHash]].ipfsHash;
    }

    function isFileStored(string memory fileName) public view returns (bool) {
        return bytes(files[fileName].ipfsHash).length > 0;
    }

    function isFileStoredByHash(string memory ipfsHash) public view returns (bool) {
        return bytes(hashToIpfsHash[ipfsHash]).length > 0;
    }
    
}
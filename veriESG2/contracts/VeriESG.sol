// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VeriESG is ERC721, Ownable {
    using Strings for uint256;

    struct ESGRecord {
        address company;
        string dataType;
        address auditor;
        uint256 timestamp;
        bool verified;
    }

    mapping(bytes32 => ESGRecord) private records;
    mapping(bytes32 => uint256) private certificateTokenIds;
    mapping(address => bool) public verifiers;

    uint256 private _nextTokenId = 1;
    string private _baseTokenURI;

    event DataRecorded(
        address indexed company,
        bytes32 indexed dataHash,
        string dataType,
        address indexed auditor,
        uint256 timestamp
    );
    event DataVerified(bytes32 indexed dataHash, address indexed verifier);
    event CertificateIssued(
        address indexed company,
        uint256 indexed tokenId,
        bytes32 indexed dataHash,
        string dataType
    );

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {}

    modifier onlyVerifier() {
        require(verifiers[msg.sender], "VerifierOnly");
        _;
    }

    function addVerifier(address verifier_) external onlyOwner {
        require(verifier_ != address(0), "InvalidAddress");
        verifiers[verifier_] = true;
    }

    function removeVerifier(address verifier_) external onlyOwner {
        verifiers[verifier_] = false;
    }

    /// Example (frontend): veriESG.recordDataHash("carbon", hash, auditor);
    function recordDataHash(
        string calldata dataType,
        bytes32 dataHash,
        address auditor
    ) external {
        require(dataHash != bytes32(0), "InvalidHash");
        require(auditor != address(0), "InvalidAuditor");
        require(verifiers[auditor], "AuditorUnauthorized");
        ESGRecord storage record = records[dataHash];
        require(record.company == address(0), "AlreadyRecorded");

        records[dataHash] = ESGRecord({
            company: msg.sender,
            dataType: dataType,
            auditor: auditor,
            timestamp: block.timestamp,
            verified: false
        });

        emit DataRecorded(
            msg.sender,
            dataHash,
            dataType,
            auditor,
            block.timestamp
        );
    }

    function verifyDataHash(bytes32 dataHash) external onlyVerifier {
        ESGRecord storage record = records[dataHash];
        require(record.company != address(0), "RecordMissing");
        require(record.auditor == msg.sender, "NotAssignedAuditor");
        require(!record.verified, "AlreadyVerified");

        record.verified = true;

        emit DataVerified(dataHash, msg.sender);
    }

    /// Example (frontend): veriESG.issueCertificate(hash);
    function issueCertificate(
        bytes32 dataHash
    ) external onlyVerifier returns (uint256) {
        ESGRecord storage record = records[dataHash];
        require(record.company != address(0), "RecordMissing");
        require(record.verified, "NotVerified");
        require(record.auditor == msg.sender, "NotAssignedAuditor");
        require(certificateTokenIds[dataHash] == 0, "CertificateExists");

        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        certificateTokenIds[dataHash] = tokenId;

        _safeMint(record.company, tokenId);

        emit CertificateIssued(
            record.company,
            tokenId,
            dataHash,
            record.dataType
        );

        return tokenId;
    }

    function getRecord(
        bytes32 dataHash
    )
        external
        view
        returns (
            address company,
            string memory dataType,
            address auditor,
            uint256 timestamp,
            bool verified
        )
    {
        ESGRecord storage record = records[dataHash];
        require(record.company != address(0), "RecordMissing");
        return (
            record.company,
            record.dataType,
            record.auditor,
            record.timestamp,
            record.verified
        );
    }

    function certificateTokenId(
        bytes32 dataHash
    ) external view returns (uint256) {
        return certificateTokenIds[dataHash];
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        _baseTokenURI = baseURI_;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "TokenMissing");
        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenId.toString())
                : "";
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}

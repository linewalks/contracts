pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;


contract Provider {
    // 의료행위 주체
    address public owner;
    string public facilityName;

    struct IssuedClaim {
        string _type; // 의료행위, 주성분
        uint cost; // 금액
        string description;
        address patientAddr;
        uint createdAt;
        bool isValidated; // by auditor
    }

    struct ClaimItem {
        string _type;
        uint cost;
        string description;
    }

    IssuedClaim[] public claims;

    constructor(address _owner, string _facilityName) public {
        owner = _owner;
        facilityName = _facilityName;
    }

    function renderClaimForPatient(address patient, ClaimItem _claim) public {
        claims.push(IssuedClaim({
            patientAddr: patient,
            createdAt: now,
            isValidated: false,
            _type: _claim._type,
            cost: _claim.cost,
            description: _claim.description
        }));
    }
}
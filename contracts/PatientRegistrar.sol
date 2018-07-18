pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract PatientRegistrar {
    struct Patient {
        uint yearOfBirth;
        bytes32 gender;
        bool isInitialized;
    }

    address public admin;
    
    mapping(address => Patient) public patients;
    Patient[] public patientList;

    constructor() public {
        admin = msg.sender;
    }

    function registerPatientToRegistrar(address patient, bytes32 gender, uint yearOfBirth) public {
        require(
            msg.sender == admin,
            "Only admin can add patient to network"
        );
        require(
            patients[patient].isInitialized,
            "Patient already exists"
        );
        patients[patient].gender = gender;
        patients[patient].yearOfBirth = yearOfBirth;
        patients[patient].isInitialized = true;
        patientList.push(Patient({
            gender: gender,
            yearOfBirth: yearOfBirth,
            isInitialized: true
        }));
    }

    function viewPatientsList() public view returns (Patient[] _patients) {
        _patients = patientList;
    }
}
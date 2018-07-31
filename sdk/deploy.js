const SDK = require("./index.js")
const sdk = new SDK()

// Initialize PatientRegistrar Contract
// const PatientRegistrarContract = sdk.deployContract(
//   "./build/contracts/PatientRegistrar.json",
//   ethAddress
// )

module.exports = {
  patientRegistrar: adminAddr => {
    // Deploy patientRegistrar contracts
    return sdk.deployContract(
      "./build/contracts/PatientRegistrar.json",
      adminAddr
    )
  },
  provider: (providerAddr, facilityName) => {
    // Deploy provider contracts
    return sdk.deployContract(
      "./build/contracts/Provider.json",
      providerAddr,
      [providerAddr, facilityName] // arguments for constructor
    )
  },
  claim: () => {
    // Deploy claim contracts
  }
}

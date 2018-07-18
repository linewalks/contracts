const PatientRegistrar = artifacts.require("./PatientRegistrar")

module.exports = deployer => {
  deployer.deploy(PatientRegistrar)
}

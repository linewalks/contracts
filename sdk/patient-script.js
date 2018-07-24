const PatientSDK = require("./patient")
const deploy = require("./deploy")

const psdk = new PatientSDK()

// Check if network is up and running

// Default config to use the network
// Should be replaced with actual addresses
const ethAddress = "0xe77541c7fe95e525120e5dad3bdb430a803b5ef4"
const gas = 1500000
const gasPrice = "20000000000"
// Deploy all related contracts

async function script() {
  const contractAddr = await deploy.patientRegistrar(ethAddress)

  // Connect to the network as PatientRegistrar
  psdk.connect({
    networkConfig: {
      host: "http://localhost",
      port: 8545,
      networkId: "*"
    },
    patientRegistrarContractTx: contractAddr
  })

  psdk.createPatient({ yearOfBirth: 1986, gender: "male" })
  psdk.createPatient({ yearOfBirth: 1952, gender: "female" })
  psdk.createPatient({ yearOfBirth: 1945, gender: "female" })
  psdk.createPatient({ yearOfBirth: 1966, gender: "male" })
  psdk.createPatient({ yearOfBirth: 2001, gender: "female" })

  psdk.getAllPatients()
}

script()

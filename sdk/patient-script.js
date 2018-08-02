const Web3 = require("web3")

const PatientSDK = require("./patient")
const deploy = require("./deploy")
const config = require("../config")

const { adminAddress, httpProvider } = config

const psdk = new PatientSDK()

// Check if network is up and running
// Deploy all related contracts

async function script() {
  const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
  let contractAddr
  try {
    contractAddr = await deploy.patientRegistrar(adminAddress)
  } catch (e) {
    console.log(e)
  }

  // Connect to the network as PatientRegistrar
  psdk.connect({
    networkConfig: {
      host: "http://localhost",
      port: 8545,
      networkId: "*"
    },
    connectAs: adminAddress,
    patientRegistrarContractTx: contractAddr
  })
  // console.log(web3.eth.accounts)
  // console.log(
  //   web3.utils.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), "ether")
  // )

  // web3.fromWei(eth.getBalance(e), "ether")
  await psdk.createPatient({
    address: "0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc",
    yearOfBirth: 1988,
    gender: "female"
  })
  await psdk.createPatient({
    address: "0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e",
    yearOfBirth: 1952,
    gender: "female"
  })
  await psdk.createPatient({
    address: "0x28a8746e75304c0780e011bed21c72cd78cd535e",
    yearOfBirth: 1945,
    gender: "female"
  })
  await psdk.createPatient({
    address: "0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9",
    yearOfBirth: 1966,
    gender: "male"
  })
  await psdk.createPatient({
    address: "0x1df62f291b2e969fb0849d99d9ce41e2f137006e",
    yearOfBirth: 2001,
    gender: "female"
  })

  try {
    await psdk.getAllPatients()
  } catch (e) {
    console.log(e)
  }
}

// // Create Providers
// const a = providerSDK.createProvider("피부과", address)
// const b = providerSDK.createProvider("소아청소년과", address)
// const c = providerSDK.createProvider("정형외과", address)
// const d = providerSDK.createProvider("산부인과", address)

// // Issue claims for patients
// const claims = [
//   { type: "medical_procedure", cost: 44300, name: "C101" },
//   { type: "medical_procedure", cost: 14300, name: "D101" },
//   { type: "component", cost: 24300, name: "A10133432" }
// ]

// a.issueClaim(patientAddr1, claims)
// a.issueClaim(patientAddr2, claims)
// a.issueClaim(patientAddr3, claims)
// a.issueClaim(patientAddr4, claims)

script()

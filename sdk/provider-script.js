const Web3 = require("web3")
const ProviderSDK = require("./provider")
const deploy = require("./deploy")
const config = require("../config")

const { adminAddress, httpProvider } = config

const testAddr = adminAddress

async function deployProviderContract(
  address,
  name,
  typeOfHospital,
  clinicalSpecialty
) {
  const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
  let contractAddr
  try {
    contractAddr = await deploy.provider(
      address,
      name,
      typeOfHospital,
      clinicalSpecialty
    )
  } catch (e) {
    console.log(e)
  }
  return contractAddr
}

async function testScript() {
  const providerSDK = new ProviderSDK()

  const contractAddr = await deployProviderContract(
    adminAddress,
    "ABC 외과",
    "의원",
    "외과"
  )

  console.log(`Provider Contract deployed: ${contractAddr}`)

  const asanHospital = new ProviderSDK()

  asanHospital.connect({
    networkConfig: {
      host: "http://localhost",
      port: 8545,
      networkId: "*"
    }
  })

  const asanContractHash = await asanHospital.createProviderIdentity({
    name: "Asan Hospital",
    typeOfHospital: "대형병원",
    clinicalSpecialty: "종합",
    address: adminAddress
  })

  // providerSDK.connect({
  //   networkConfig: {
  //     host: "http://localhost",
  //     port: 8545,
  //     networkId: "*"
  //   }
  // })

  providerSDK.connectAsProvider({
    networkConfig: {
      host: "http://localhost",
      port: 8545,
      networkId: "*"
    },
    contractHash: contractAddr,
    providerAccountAddr: adminAddress
  })

  await asanHospital.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 99999,
    description: "DDDDDDDDDD"
  })

  await providerSDK.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 5430,
    description: "A0010101"
  })

  await providerSDK.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 12430,
    description: "B0021141"
  })

  await providerSDK.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 42430,
    description: "C0021141"
  })

  const claims = await providerSDK.getAllIssuedClaims()
  console.log(claims)
  const asanClaims = await asanHospital.getAllIssuedClaims()
  console.log(asanClaims)
}

testScript()

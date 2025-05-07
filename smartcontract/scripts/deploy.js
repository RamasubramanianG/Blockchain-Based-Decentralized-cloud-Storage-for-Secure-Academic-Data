const hre = require("hardhat");

async function main() {
  // Get the ContractFactory
  const SDMS = await hre.ethers.getContractFactory("SDMS");

  // Deploy it properly with `await`
  const sdms = await SDMS.deploy();

  // Wait for it to be deployed (note: this is a Promise!)
  await sdms.waitForDeployment();

  // Get deployed address
  const address = await sdms.getAddress();

  console.log(`✅ SDMS Contract deployed to: ${address}`);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});

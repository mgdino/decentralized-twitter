const main = async () => {
    const minting = await hre.ethers.getContractFactory(
      'DXT'
    )
    const DXContract = await minting.deploy()
  
    await DXContract.deployed()
  
    console.log('DX Minter deployed to:', DXContract.address)
  }
  
  ;(async () => {
    try {
      await main()
      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })()
require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

const { MUMBAI_URL, META_MASK_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	defaultNetwork: 'hardhat',
	networks: {
		mumbai: {
			url: MUMBAI_URL,
			accounts: [META_MASK_KEY]
		}
	}
};

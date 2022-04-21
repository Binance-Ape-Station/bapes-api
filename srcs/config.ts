import { ENV, loadConfig } from 'config-decorators'
import * as dotenv from 'dotenv'
import 'reflect-metadata'

export class Config {

	@ENV('ETH_NODE', true)
	public EthereumNode: string
	@ENV('ETH_CHAIN', true)
	public EthereumChain: string

	@ENV('UNISWAP_BAPES_TOKEN', true)
	public UniswapPeetToken: string

	@ENV('ETH_ASSET_ID', true)
	public EthereumAsset: string

	@ENV('UNISWAP_ETH_TOKEN', true)
	public UniswapWrappedEthToken: string

	@ENV('ETH_USDT_CONTRACT', true)
	public EthUsdtContract: string

	@ENV('ETH_WETH_CONTRACT', true)
	public EthWethContract: string
}

const loadConfigFromEnv = (): Config => {
	dotenv.config()
	return loadConfig(Config)
}

export let config = loadConfigFromEnv();

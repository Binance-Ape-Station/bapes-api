import { etherScan } from "./worker/etherScanInfos";
import { coinPriceCache } from "./worker/coinsPriceCache"
import { factory } from "./logger"
import { HttpServer } from "./api/server"

const log = factory.getLogger("oracle");

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(-1)
  });

(async () => {

    
    try { 
        const httpPort = 1337

        log.info(`Starting the BAPES Api...`)

        
        // init cache price
        await coinPriceCache.refreshPrices()

        // fetching token info
        await etherScan.doFetchTokenInfos()

        // // starting api server
        const api: HttpServer = new HttpServer(httpPort);
        await api.StartServer()

        log.info(`Api successfully listening on port ${httpPort}`)
    } catch (e) {
        console.error(e)
    }
})()
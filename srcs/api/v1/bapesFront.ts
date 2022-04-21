const router = require('express').Router();
const request = require('request');

import { factory } from "../../logger"
import { etherScan } from "../../worker/etherScanInfos";
import { coinPriceCache } from "../../worker/coinsPriceCache";

router.get('/token', async (_: any, result: any) => {
    try {
        const datas: any = {}
        datas.ethPrice = coinPriceCache.prices.find(x => x.coin === "WBNB")?.price
        const bapes = coinPriceCache.prices.find(x => x.coin === "BAPES")?.price
        datas.loccPrice = datas.ethPrice / bapes

        return result.send({result: true, uni: datas, etherscan: {price: etherScan.price, supply: etherScan.supply, addresses: etherScan.addresses}});
    } catch(e) {
        console.error(e)
    }
});

router.get('/chain/supply', async (_: any, result: any) => {
    result.type('text/plain');
    result.send("800") 
})

router.get('/logs/:block/:contract', async (r: any, result: any) => {
    var url = `https://api-testnet.bscscan.com/api?module=logs&action=getLogs&fromBlock=${r.params.block}&toBlock=latest&address=${r.params.contract}&topic0=0x0248d0dcf024fa2b50a516e1413e4df7c09837b69a6084b889552117ddeb6324&apikey=JCA22CUE838VE4H8MNVCJ23U95T2V9NTFZ`;

    request(url, (error: any, response: any, body: any) => {
        try {
            if (error != null || response.statusCode !== 200) { throw error }
          result.send(body)
        } catch(e) { console.error(e); result.send({}) }
    });
})

module.exports = router;
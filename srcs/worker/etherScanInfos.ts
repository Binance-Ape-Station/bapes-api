import { factory } from "../logger"

const request = require('request');
const log = factory.getLogger("oracle");
class EtherScanInfos
{
    url: string = "https://etherscan.io/token/0x556938621C19e5eae58C94a806da9d237b969bd8"
    public price: number = 0.00
    public supply: number = 0.00

    public addresses: number = 0
    constructor()
    {
        this.loopRequest()
    }


    doFetchTokenInfos(): Promise<void>
    {
        return new Promise((res, rej) => {
            request(this.url, (error: any, response: any, body: any) => {
                try {
                    if (error != null || response.statusCode !== 200) { throw error }
                    const lines: string[] = body.match(/[^\r\n]+/g);
                    lines.forEach((x: string, i:number) => {
                        if (x.includes("small text-secondary text-nowrap")) {
                            const matches = x.match(/(\d+(?:[\.,](?![\.,])\d+)*)/)
                            this.price = Number(matches ? matches[0] : 0)
                        } else if(x.includes("Circulating Supply MarketCap")) {
                            const supply = lines[i+1] 
                            const matches = supply.match(/(\d+(?:[\.,](?![\.,])\d+)*)/)
                            this.supply = Number(matches ? matches[0].replace(/,/g,'') : 0)
                            
                        } else if(x.includes("olders:")) {
                            const line = lines[i+4] 

                            const matches = line.replace(',', '').match(/^[0-9]*/)
                            this.addresses = Number(matches ? matches[0] : 0)
                        }
                    })
                    log.info(`Eth BAPES Updated: Price: ${etherScan.price}$, Mcap: ${etherScan.supply}$, Hodlers: ${etherScan.addresses} addresses`)
                    res()
                } catch(e) { console.error(e); rej() }
            });
        })
    }

    loopRequest()
    {
        setInterval(async () => {
            await this.doFetchTokenInfos()
        }, (3 * 1000) * 60) // 3mins
    }
}

export let etherScan = new EtherScanInfos();
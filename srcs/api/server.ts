import express from "express";
import bodyParser from "body-parser";
const cors = require('cors')

class HttpServer {
    private app: express.Express
    private listenPort: number

    constructor(listenPort: number) {
        this.listenPort = listenPort
    }

    StartServer(): Promise<boolean>
    {
        return new Promise<boolean>((result, reject) => {
            try {
                this.app = express()
                this.app.use(cors())
                this.app.use(bodyParser.json())
                this.app.use(bodyParser.urlencoded({ extended: true }))
                this.addApiRoutes()
                
                this.app.listen(this.listenPort, () => {
                    result(true)
                })
            } catch (e) { reject(e) }
        })
    }

    addApiRoutes()
    {
        this.app.use('/front', require('./v1/bapesFront'))
    }
}

export { HttpServer }
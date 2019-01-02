

export class Client {

    private  key = "D1DAHDZOJSM1VEC8"
    public clientType: string

    constructor(clientType:string) 
    {
        this.clientType = clientType
    }
    public getData(from:string, to:string) {
        return this.request(from, to)
           .then((data:any)=>data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
    }

    private  request(from:string, to:string) {
        const url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="
        + from + "&to_currency=" + to + "&apikey=" + this.key

        const axios = require('axios');
		return axios.create({
		    responseType: 'json',
			timeout: 15000
		}).get(url).then((r:any)=>r.data)
    }

}
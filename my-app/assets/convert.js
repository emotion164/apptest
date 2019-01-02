
const fs = require('fs');
const csvtojsonV2=require("csvtojson");

function processSymList() {
    let jsonpath =__dirname+"/../public/"
    if (!fs.existsSync(jsonpath)) {fs.mkdirSync(jsonpath)}
    
    let fileInputName = "physical_currency_list.csv";
    let jsonfile = jsonpath+ "forexSymbols.json"
    csvtojsonV2().fromFile(fileInputName).then((jsonObj)=>{
        fs.writeFileSync(jsonfile, JSON.stringify(jsonObj,null,4))
    })

    let fileInputName2 = "digital_currency_list.csv";
    let jsonfile2 = jsonpath+ "digitalSymbols.json"
    csvtojsonV2().fromFile(fileInputName2).then((jsonObj)=>{
        fs.writeFileSync(jsonfile2, JSON.stringify(jsonObj,null,4))
    })

}

processSymList();
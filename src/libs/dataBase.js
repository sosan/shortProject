const shortSchema = require('../models/shorts');
const utilsUrl = require('../utils/url');
const shortCodeGenerator = require('../libs/shortCodeGenerator');


async function createNewShort(url) {
    //ToDo
    //1- Is URL (improve)
    return new Promise(async (resolve, reject) => {
        let isUrl = utilsUrl.checkIfIsUrl(url)
        if (isUrl) {
            let codeGenerated = shortCodeGenerator.generateShortCode();
            let checkIfCodeIsInDbAndRegenerateIfNot = await checkShortCodeInDb(codeGenerated)
            let newUrlShot = new shortSchema({ url: url, shortCode: checkIfCodeIsInDbAndRegenerateIfNot, clicks: [] });
            let dataSaved = await newUrlShot.save()
            resolve(dataSaved)
        } else {
            reject({ error: "notUrl" });
        }
    });
}

async function someOneClickedOnLink(code, ip) {
    return new Promise(async(resolve, reject) => {
        let findShortedUrl = await shortSchema.findOne({ shortCode: code })

        resolve(findShortedUrl.url)
    });
}


async function checkShortCodeInDb(shortCode) {
    let valueShort = await shortSchema.findOne({ 'shortCode': shortCode });
    if (valueShort != null) {
        console.log("Llamada recursiva")
        //Call this same function recursively until we get
        //A shotCode that is not in DataBase
        await checkShortCodeInDb(shortCodeGenerator.generateShortCode())
    } else {
        console.log("Solucion encontrada")
        return shortCode
    }
}

module.exports = { createNewShort, someOneClickedOnLink }
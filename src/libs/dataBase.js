const shortSchema = require('../models/shorts');
const utilsUrl = require('../utils/url');
const shortCodeGenerator = require('../libs/shortCodeGenerator');


async function createNewShort(url) {
    //ToDo
    //- Is URL (improve)
    return new Promise(async (resolve, reject) => {
        let isUrl = utilsUrl.checkIfIsUrl(url)
        console.log(isUrl)
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

async function checkShortCodeInDb(shortCode) {
    let valueShort = await shortSchema.findOne({ 'shortCode': shortCode });
    if (valueShort != null) {
        //Call this same function recursively until we get
        //A shotCode that is not in DataBase
        await checkShortCodeInDb(shortCodeGenerator.generateShortCode())
    } else {
        return shortCode
    }
}

module.exports = { createNewShort }
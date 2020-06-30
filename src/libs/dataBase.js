const shortSchema = require('../models/shorts');
const utilsUrl = require('../utils/url');
const shortCodeGenerator = require('./shortCodeGenerator');
const htmlGrabber = require('./htmlGrabber');


async function createNewShort(url) {
    //ToDo
    //1- Is URL (improve)
    return new Promise(async (resolve, reject) => 
    {
        //jl. 30-6. ya esta chequeado de antes
        // let isUrl = utilsUrl.checkIfIsUrl(url)
        let checkIsInDB = await checkIfUrlExistInDb(url)
        if (checkIsInDB.existUrl === true) 
        {
            return resolve({
                created: false,
                urlShort: checkIsInDB.data.shortCode, // quizas quitarlo
                saved: new shortSchema({
                    url: checkIsInDB.data.url,
                    shortCode: checkIsInDB.data.shortCode,
                    clicks: checkIsInDB.data.clicks
                })
            })
        
        }
            
        // let codeGeneratedToShow = shortCodeGenerator.generateShortCode().objectToShow
        let codeGenerated = shortCodeGenerator.generateShortCode().objectStored;
        let checkIfCodeIsInDbAndRegenerateIfNot = await checkShortCodeInDb(codeGenerated)
        let newUrlShot = new shortSchema({ url: url, shortCode: checkIfCodeIsInDbAndRegenerateIfNot, clicks: [] });
        let dataSaved = await newUrlShot.save()
        return resolve(
            {
                created: true, 
                urlShort : dataSaved.shortCode,
                saved: new shortSchema({
                    url: dataSaved.url,
                    shortCode: dataSaved.shortCode,
                    clicks: dataSaved.clicks
                })})


    });
}

async function someOneClickedOnLink(code, country, sO, browser) {
    return new Promise(async (resolve, reject) => {
        let findShortedUrl = await shortSchema.findOne({ shortCode: code })
        let fullHTML = await htmlGrabber.grabHtml(findShortedUrl.url)
        let pushNewClickData = await shortSchema.updateOne({ shortCode: code }, {
            $push: {
                clicks: {
                    country: country,
                    sO: sO,
                    html: fullHTML,
                    browser: browser
                }
            }
        });
        resolve(findShortedUrl.url)
    });
}

async function checkDataFromCode(code) {
    return new Promise(async (resolve, reject) => {
        let findShorted = await shortSchema.findOne({ shortCode: code })
/*
        let allCountries = findShorted.clicks.map((item) => {
            let allValues = Object.values(item.toObject())
            
            return allValues
        })
        console.log(allCountries)
*/
        resolve(findShorted)
    });
}


async function checkShortCodeInDb(shortCode) {
    let valueShort = await shortSchema.findOne({ 'shortCode': shortCode });
    if (valueShort != null) {
        await checkShortCodeInDb(shortCodeGenerator.generateShortCode().objectStored)
    } else {
        return shortCode
    }
}

async function checkIfUrlExistInDb(url) {

    //jl. TODO: control de errores de conexion, etc...
    let checkedUrl = await shortSchema.findOne({
        'url': url
    });

    if (checkedUrl != null) {
        console.log("Url exist in DB")
        return {
            existUrl: true,
            data: checkedUrl
        };
    
    } else {
        console.log("Url Not Exist in DB")
        return {
            existUrl: false,
            data: checkedUrl
        };
    }
}

module.exports = { createNewShort, someOneClickedOnLink, checkDataFromCode }
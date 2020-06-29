const axios = require('axios');

async function grabHtml(url) {
    return new Promise(async (resolve, reject) => {
        let getDataHtml = await axios.get(url);
        resolve(getDataHtml.data.toString().replace(/\n/g, ""))
    });
}


module.exports = { grabHtml }

//TODO: si pones espacio al principio o en la url da problemas.
function checkIfIsUrl(url) {
    url = url.replace(/ /g, "");
    console.log(url)
    let urlPattern = new RegExp("(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?");
    let urlNewPattern = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
    return urlNewPattern.test(url);
}

module.exports = { checkIfIsUrl }
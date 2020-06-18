function checkIfIsUrl(url) {
    let urlPattern = new RegExp("(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?")
    return urlPattern.test(url)
}

module.exports = { checkIfIsUrl }
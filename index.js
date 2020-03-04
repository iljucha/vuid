function getRandomIntInclusive(min, max) {
    min = Math.ceil(min), max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

function VUID() {
    let length = 32
    let charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    let variety = charset.length
    let datetime = new Date().toISOString("de-DE").replace(/T|Z/gmi, " ").trim()
    let timestamp = "", date = datetime.replace(/\D/g, " ").split(" ")
    let i = 0, dlength = date.length, random = "", rest = 0
    function encode(int) {
        let s = []
        if (int === 0) {
            return 0
        }
        while (int > 0) {
            s = [charset[int % variety], ...s]
            int = Math.floor(int / variety)
        }
        return s.join("")
    }
    for (i; i < dlength; i++) {
        timestamp += encode(date[i])
    }
    rest = length - timestamp.length
    if (rest > 0) {
        random = encode(getRandomIntInclusive(0, Math.pow(variety, rest) - 1)).padStart(rest, "0")
    }
    return timestamp + random
}

module.exports = VUID

const length = 32
const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const variety = charset.length

/**
 * Creates an Unique ID
 */
export default function VUID() {
    const datetime = new Date().toISOString("de-DE").replace(/T|Z/gmi, " ").trim()
    let timestamp = "", date = datetime.replace(/\D/g, " ").split(" ")
    let i = 0, random = "", rest = 0
    const dLength = date.length
    for (i; i < dLength; i++) {
        timestamp += encode(date[i])
    }
    rest = length - timestamp.length
    if (rest > 0) {
        random = encode(randomInteger(0, Math.pow(variety, rest) - 1)).padStart(rest, "0")
    }
    return timestamp + random
}

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

function randomInteger(min, max) {
    min = Math.ceil(min), max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

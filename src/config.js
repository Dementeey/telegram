const GIT_LAB_TOKEN = 'министерство_не_ваших_собачих_дел';
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL || '-1001325374489';
const TELEGRAM_TOKEN =
    process.env.TELEGRAM_TOKEN || '628940363:AAFidkqan-HYJpJyvjKpDVcVHtX3OxT6w6s';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const API = {
    SEND_MESSAGE: `${TELEGRAM_API}/sendMessage`,
    SEND_STICKER: `${TELEGRAM_API}/sendSticker`
}

module.exports = {
    GIT_LAB_TOKEN,
    TELEGRAM_CHANNEL,
    TELEGRAM_TOKEN,
    TELEGRAM_API,
    API
}
const healthz = async (req, res, next) => {
    return res.send('OK');
}

module.exports = { healthz }
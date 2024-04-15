module.exports = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const crypto = require ("crypto")
const key = crypto.randomBytes(32).toString("hex").toUpperCase()
console.log(key);
//21BEA172476790C83DC2A2F50A410915E9D6F5FB995B61A396BE03A59215F651
//DABBE15CF40CC5076A5EA9BB43A88A03B2A2517C0936F52F0666C93D247E4E10
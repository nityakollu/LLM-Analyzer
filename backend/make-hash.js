const bcrypt = require('bcryptjs');
const [,, pwd] = process.argv;
if(!pwd){ console.error('Usage: node make-hash.js <password>'); process.exit(1); }
bcrypt.hash(pwd, 10).then(h => {
  console.log('HASH:', h);
}).catch(e => { console.error(e); process.exit(1); });

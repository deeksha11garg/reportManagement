exports.ActiveDirectory = require('activedirectory');
exports.config = { url: 'ldap://dcmjpl.ds.indianoil.in',
               baseDN: 'DC=DS,DC=INDIANOIL,DC=IN',
               username: 'IOC\\00512768',
               password: 'Php@1995' }
exports.ad = new exports.ActiveDirectory(exports.config); 
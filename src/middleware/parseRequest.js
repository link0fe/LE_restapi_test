// middleware/parseRequest.js
const xml2js = require('xml2js');

const parseRequest = (req, res, next) => {
  const contentType = req.headers['content-type'];

  if (contentType && contentType.includes('application/xml')) {
    const xmlParser = new xml2js.Parser({ explicitArray: false });
    let xmlData = '';

    req.on('data', (chunk) => {
      xmlData += chunk;
    });

    req.on('end', () => {
      xmlParser.parseString(xmlData, (err, result) => {
        if (err) {
          return res.status(400).json({ error: 'Invalid XML format' });
        }

        req.body = result;
        next();
      });
    });
  } else {
    next();
  }
};

module.exports = parseRequest;
const xml2js = require('xml2js')

const serializeResponse = (req, res, next) => {
    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes('application/xml')) {
        if (res.locals.data) {
            const xmlBuilder = new xml2js.Builder({
                rootName: 'response'
            });
            const xmlData = xmlBuilder.buildObject(res.locals.data);
            
            res.set('Content-Type', 'application/xml');
            res.send(xmlData);
        } else {
            // Handle the case where res.locals.data is undefined or null
            res.status(500).json({ error: 'Internal Server Error: Response data is missing.' });
        }
    } else {
     res.json(res.locals.data);
    }
};

module.exports = serializeResponse ;
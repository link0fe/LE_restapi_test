// As well I didnt know it is allowed to use any lib, such as 
// winston/morgan , so I create custom 
// request logger
const reqLogger = (req, res, next) => {
    console.log(`Inc Requests: ${req.method} ${req.url}`);
    console.log('Req Headers:', req.headers);
    console.log('Req Body', req.body);
    next();
};

// response logger
const resLogger = (req, res, next) => {
    res.on('finish', () => {
        console.log(`Outgoing Res:  ${res.statusCode}`);
        console.log('Res Headers: ', res.getHeaders());
        console.log('Res Body: ', res.locals.data);
    });
    next();
};

module.exports = {
    reqLogger,
    resLogger
};

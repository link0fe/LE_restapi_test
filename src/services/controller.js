const Model = require('./model');

const controller = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.body;
    const response = await Model.getProducts(query, page);
    // for logging (res)
    res.locals.data = response.data;
    res.status(response.code).json(response);
    next();
  } catch (error) { 
    next(error);
  }
};

module.exports = controller;
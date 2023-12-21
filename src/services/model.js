const axios = require('axios');

const validateReqBody = (query, page) => {
    if (
        typeof query !== 'string' ||
        query.length < 3 ||
        query.length > 10 ||
        typeof page !== 'number' ||
        page < 1
    ) {
      throw new Error('Request failed with status code 400 - Bad Request');
    }
};

const getProducts = async (query, page) => {
    try {
        // req.body validation
        validateReqBody(query, page);
    
        const apiUrl = `https://dummyjson.com/products/search?q=${query}&limit=2&skip=${(page - 1) * 2}`;
        // const apiUrl = `${process.env.API_URL}?q=${query}&limit=2&skip=${(page - 1)* 2}`
        const apiResponse = await axios.get(apiUrl);

        // prepare response
        const products = apiResponse.data.products.map(product => ({
            title: product.title,
            description: product.description,
            final_price: (product.price * (1 - product.discountPercentage / 100)).toFixed(2),
        }));

        // success 
        return {
            status: 'S',
            code: 200,
            message: 'Request successful',
            data: products,
      };
    } catch (error) {
        // Error response
        return {
            status: 'E',
            code: 400, 
            message: `${error.message}`,
        };
    }
  };

module.exports = {
    getProducts,
};
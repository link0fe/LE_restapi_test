const request = require('supertest');
const express = require('express');
const controller = require('./services/controller');

jest.mock('axios');

const app = express();
app.use(express.json());

app.post('/api/search-product', controller);

describe('Integration Test: /api/search-product', () => {
  it('should return a successful response for valid input', async () => {
    const validRequestBody = {
      query: 'phone',
      page: 1,
    };

    const mockApiResponse = {
      data: {
        products: [
          { title: 'Product 1', description: 'Description 1', price: 20, discountPercentage: 10 },
          { title: 'Product 2', description: 'Description 2', price: 30, discountPercentage: 5 },
        ],
      },
    };

    require('axios').get.mockResolvedValueOnce(mockApiResponse);

    const response = await request(app)
      .post('/api/search-product')
      .send(validRequestBody);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('S');
    expect(response.body.data).toHaveLength(2);
  });

  it('should return an error response for invalid input', async () => {
    const invalidRequestBody = {
      query: 'invalid', // Invalid query
      page: 0, // Invalid page
    };

    const response = await request(app)
      .post('/api/search-product')
      .send(invalidRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('E');
  });
});
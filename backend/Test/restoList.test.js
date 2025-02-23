const axios = require('axios');
const app = require('../elena_server'); // Import your Express app
const request = require('supertest');

// Mock Axios
jest.mock('axios');

describe('POST /restoList', () => {
    it('should return addresses for valid locations', async () => {
        // Mock Axios response
        axios.get.mockResolvedValueOnce({
            data: { display_name: "New York, NY, USA" }
        }).mockResolvedValueOnce({
            data: { display_name: "Los Angeles, CA, USA" }
        });

        const response = await request(app)
            .post('/restoList')
            .send({
                locations: [
                    { lat: 40.7128, lon: -74.0060 },
                    { lat: 34.0522, lon: -118.2437 }
                ]
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            success: true,
            results: [
                { lat: 40.7128, lon: -74.0060, address: "New York, NY, USA" },
                { lat: 34.0522, lon: -118.2437, address: "Los Angeles, CA, USA" }
            ]
        });
    });

    it('should return 400 for empty locations array', async () => {
        const response = await request(app)
            .post('/restoList')
            .send({ locations: [] });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: "Invalid locations data: Expected a non-empty array of locations."
        });
    });

    it('should return 400 for invalid lat/lon values', async () => {
        const response = await request(app)
            .post('/restoList')
            .send({
                locations: [
                    { lat: "invalid", lon: -74.0060 },
                    { lat: 34.0522, lon: "invalid" }
                ]
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: "Invalid locations data: Latitude and longitude must be valid numbers."
        });
    });

    it('should handle errors in external API calls', async () => {
        // Mock Axios error
        axios.get.mockRejectedValueOnce(new Error("Network Error"));

        const response = await request(app)
            .post('/restoList')
            .send({
                locations: [
                    { lat: 999, lon: 999 }
                ]
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            success: true,
            results: [
                { lat: 999, lon: 999, address: "Error fetching address" }
            ]
        });
    });
});
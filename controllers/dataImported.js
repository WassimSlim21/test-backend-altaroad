// Import the dataImportedModel module, which contains functions for interacting with imported data.
const dataImportedModel = require('../models/dataImportedModel');

/**
 * Handles the request to get imported data from the specified table and columns.
 * 
 * @param {Object} req - The request object, containing information about the HTTP request.
 * @param {Object} res - The response object, used to send a response back to the client.
 * @param {Function} next - The next middleware function in the stack.
 */
async function getImportedData(req, res, next) {
    // Destructure Table_name and Columns from the request body.
    const { Table_name, Columns } = req.body;

    // Check if Table_name or Columns are not provided in the request body.
    if (!Table_name || !Columns) {
        // Send a 400 Bad Request response with an error message.
        return res.status(400).send('Table_name and Columns are required.');
    }

    try {
        // Call the getImportedData method from dataImportedModel to fetch the data.
        const data = await dataImportedModel.getImportedData(Table_name, Columns);
        // Send the fetched data as a JSON response.
        console.log(data);
        res.json(data);
    } catch (err) {
        // Pass any errors to the next middleware function (error handler).
        next(err);
    }
}

// Export the getImportedData function to be used in other parts of the application.
module.exports = {
    getImportedData
};
// Import the sql module and poolPromise from the database configuration file.
const { sql, poolPromise } = require('../config/db');

/**
 * Retrieves data from the specified table and columns.
 * 
 * @param {string} tableName - The name of the table to query.
 * @param {Object} columns - An object representing the columns to retrieve.
 * @returns {Promise<Array>} - A promise that resolves to the retrieved data.
 * @throws {Error} - Throws an error if the query fails.
 */
async function getImportedData(tableName, columns) {
    try {
        // Await the resolved pool promise to get the connection pool.
        const pool = await poolPromise;

        // Construct the SQL query dynamically based on the provided columns.
        const columnNames = Object.keys(columns).join(', ');
        const query = `SELECT ${columnNames} FROM ${tableName}`;

        // Execute the SQL query.
        const result = await pool.request().query(query);

        // Return the result set from the query.
        return result.recordset;
    } catch (err) {
        // Throw an error if the query or connection fails.
        throw new Error(err);
    }
}

// Export the getImportedData function for use in other parts of the application.
module.exports = {
    getImportedData
};
const { google } = require("googleapis");
const keys = require("../key.json");

// Import the dataImportedModel module, which contains functions for interacting with imported data.
const dataImportedModel = require("../models/dataImportedModel");

/**
 * Handles the request to get imported data from the specified table and columns.
 *
 * @param {Object} req - The request object, containing information about the HTTP request.
 * @param {Object} res - The response object, used to send a response back to the client.
 * @param {Function} next - The next middleware function in the stack.
 */
async function getImportedData(req, res, next) {
  // Destructure Table_name and Columns from the request body.
  var { Table_name, Columns } = req.body;
  console.log(req.body.Columns)
  var spreadsheetId = req.body.spreadsheetId;
  var range = req.body.range;
  // Check if Table_name or Columns are not provided in the request body.
  if (!Table_name || !Columns) {
    // Send a 400 Bad Request response with an error message.
    return res.status(400).send("Table_name and Columns are required.");
  }

  try {
// Call the getImportedData method from dataImportedModel to fetch the data.
const data = await dataImportedModel.getImportedData(Table_name, Columns);

    // Update Google Sheets with the fetched data
    // Update Google Sheets with the fetched data
await updateGoogleSheet(data, spreadsheetId, range, req.authClient, Columns);
    // Send a success message
    res.send("Data has been exported to Google Sheets successfully.");
  } catch (err) {
    // Pass any errors to the next middleware function (error handler).
    next(err);
  }
}

/**
 * Updates the specified Google Sheets with the provided data.
 *
 * @param {Array} data - The data to be updated in the Google Sheets.
 * @param {string} spreadsheetId - The ID of the Google Sheets spreadsheet.
 * @param {string} range - The range to update in the spreadsheet.
 * @param {Object} auth - The authentication object for Google Sheets API.
 * @param {Object} columns - An object representing the columns to retrieve.
 */
async function updateGoogleSheet(data, spreadsheetId, range, auth, columns) {
    try {
      const sheets = google.sheets({ version: "v4", auth });
  
      // Construct the range for the header
      const headerRange = `${range}!A1`;
  
      // Extract column names from the columns object
      const headerValues = Object.keys(columns);
  
      // Update the header in Google Sheets
      const headerUpdateRes = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: "RAW",
        requestBody: {
          values: [headerValues],
        },
      });
  
      console.log("Header updated successfully:", headerUpdateRes.data);
  
      // Construct the range for the data
      const dataRange = `${range}!A2`;
  
      // Clear the existing data in the sheet
      await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: dataRange,
      });
  
      // Update the sheet with new data starting from A2
      const updateRes = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: dataRange,
        valueInputOption: "RAW",
        requestBody: {
          values: data.map((row) => Object.values(row)),
        },
      });
  
      console.log("Data updated successfully:", updateRes.data);
    } catch (error) {
      console.error("Error updating Google Sheets:", error);
      // You might want to handle this error appropriately
      throw error; // Rethrow the error for the caller to handle
    }
  }
// Export the getImportedData function to be used in other parts of the application.
module.exports = {
  getImportedData,
};

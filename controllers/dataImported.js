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
  const { Table_name, Columns, spreadsheetId, range } = req.body;
  
  console.log("Request body:", req.body);
  
  // Check if Table_name or Columns are not provided in the request body.
  if (!Table_name || !Columns) {
    // Send a 400 Bad Request response with an error message.
    const errorMessage = "Table_name and Columns are required.";
    console.error(errorMessage);
    return res.status(400).json({ success: false, message: errorMessage });
  }

  try {
    // Call the getImportedData method from dataImportedModel to fetch the data.
    const data = await dataImportedModel.getImportedData(Table_name, Columns);

    // Update Google Sheets with the fetched data
    await updateGoogleSheet(data, spreadsheetId, range, req.authClient, Columns);

    // Log success message and send a success response
    const successMessage = "Data has been exported to Google Sheets successfully.";
    console.log(successMessage);
    res.status(200).json({ success: true, message: successMessage });
  } catch (err) {
    // Log the error and send an error response
    console.error("Error in getImportedData:", err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
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
    throw error; // Rethrow the error for the caller to handle
  }
}

// Export the getImportedData function to be used in other parts of the application.
module.exports = {
  getImportedData,
};
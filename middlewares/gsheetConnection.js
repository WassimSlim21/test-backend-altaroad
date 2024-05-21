const { google } = require('googleapis');
const keys = require("../key.json");

async function connectToGsheet(req, res, next) {
    try {
        const auth = new google.auth.JWT(
            keys.client_email,
            null,
            keys.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        await auth.authorize();
        console.log('Connected to Google Sheets');
        
        // You can do further operations with the authorized client here

        // Pass the authenticated client to the next middleware or route handler
        req.authClient = auth;
        next();
    } catch (error) {
        console.error('Error connecting to Google Sheets:', error);
        res.status(500).json({ error: 'Failed to connect to Google Sheets' });
    }
}

module.exports = connectToGsheet;
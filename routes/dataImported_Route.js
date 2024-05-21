// Import the express module to create a router.
const express = require('express');
// Create a new router instance.
const router = express.Router();
// Import the dataImportedController module, which contains the getImportedData function.
const dataImportedController = require('../controllers/dataImported');

// Define a POST route at the root path, which uses the getImportedData function from the controller.
router.post('/', dataImportedController.getImportedData);

// Export the router to be used in other parts of the application.
module.exports = router;
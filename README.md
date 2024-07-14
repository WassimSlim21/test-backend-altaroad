# File Upload Service

This project is a simple file upload service built with Node.js, Express, and Multer. It allows users to upload image files to the server, with a file size limit of 2MB.

## Features

- Upload image files (JPEG, JPG, PNG, GIF)
- File size limit of 2MB
- Promisified middleware for handling file uploads
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v20.11.1)
- npm (v10.2.4)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/file-upload-service.git
   cd file-upload-service

2. Install the dependencies:

npm install
## Running the Server
1. Start the server:

npm start || nodemon
#### The server will start on http://localhost:3000

## API Endpoints: POST /api/upload

#### Endpoint for uploading a file.

Request:

- file: The file to be uploaded (must be an image file - JPEG, JPG, PNG, GIF)

Response:

- message: Confirmation message
- filePath: Path to the uploaded file
Example using curl: curl -F "file=@/path/to/your/image.jpg" http://localhost:3000/api/upload

## Project Structure

- **`file-upload-service/`**
  - **`controllers/`**
    - `upload.js`: Upload controller.
  - **`middleware/`**
    - `uploadMiddleware.js`: Promisified upload middleware.
  - **`routes/`**
    - `uploadRoute.js`: Upload route.
  - **`public/`**
    - `uploads/`: Directory for uploaded files.
  - **`views/`**
    - `error.jade`: Error view.
  - `app.js`: Main application file.
  - `package.json`: Project metadata and dependencies.
  - `README.md`: Project documentation.

## Detailed Code Explanation
- Controller : upload.js
This file contains the controller for handling file uploads. It uses Multer to handle the file upload process.

- Middleware : uploadMiddleware.js
This file contains a promisified version of the Multer middleware for handling file uploads.

- Routes : uploadRoute.js
This file defines the route for uploading files. It uses the upload controller to handle the upload logic.

- Main Application : app.js
This file sets up the Express application, including middleware for logging, parsing requests, handling CORS, and serving static files. It also defines the routes and error handling middleware.

## Error Handling : 
The application includes error handling for the following scenarios:

- File size exceeds the 2MB limit
- Unsupported file type
- No file selected
- 404 Not Found
- General server errors


## Acknowledgments

- Node.js
- Express.js
- Multer
Created by Wassim SLIM
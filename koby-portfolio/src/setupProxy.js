// 1. Create a setupProxy.js file in the src directory
// This will customize how the development server handles certain paths

// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

module.exports = function(app) {
  // Special handling for the resume.pdf route
  app.get('/resume.pdf', function(req, res) {
    // Path to the PDF in the public folder
    const pdfPath = path.join(__dirname, '../public/resume.pdf');
    
    // Check if the file exists
    if (fs.existsSync(pdfPath)) {
      // Set the content type and serve the file
      res.setHeader('Content-Type', 'application/pdf');
      res.sendFile(pdfPath);
    } else {
      res.status(404).send('Resume file not found');
    }
  });
};
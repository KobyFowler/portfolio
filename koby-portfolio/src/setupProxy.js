// src/setupProxy.js
const path = require('path');
const express = require('express');

module.exports = function(app) {
  // Serve the resume.pdf file directly from the public directory
  app.use('/resume.pdf', (req, res, next) => {
    // Path to the PDF in the public folder
    const pdfPath = path.join(__dirname, '../public/resume.pdf');
    
    // Set the content type for PDFs
    res.set('Content-Type', 'application/pdf');
    
    // Use Express's static middleware to serve the file
    express.static(path.dirname(pdfPath))(req, res, next);
  });
};
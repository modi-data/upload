# MODI Metadata Generator

A web-based tool for generating metadata files based on the FOT-Net Data Sharing Framework (DSF) for the MODI project. This tool helps users create standardized metadata descriptions for their datasets, ensuring consistency and completeness of dataset documentation.

## Overview

The MODI Metadata Generator is a form-based web application that guides users through the process of creating metadata files in YAML format. The metadata structure follows the FOT-Net Data Sharing Framework, covering various aspects of dataset documentation including administrative, structural, and descriptive metadata.

## Features

- Interactive web form with multiple sections
- Real-time form validation
- Auto-saving functionality using localStorage
- Progress tracking
- Support for downloading metadata as YAML files
- Direct upload capability to GitHub repository
- Responsive design

## Technical Stack

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
- Backend:
  - Docker-based JavaScript server
  - GitHub OAuth integration for repository uploads

## File Structure

- `index.html` - Main entry point and form interface
- `form.js` - Form handling and dynamic content management
- `generate.js` - YAML generation functionality
- `updownload.js` - File upload and download handling
- `main.css` - Custom styling
- Assets directory containing images including:
  - `Micon.png` - Favicon
  - `MODIicon.png` - MODI project logo
- `Modi Data Upload.zip` - The Docker based JavaScript Server.

### Backend Server Setup

The backend server is required for GitHub integration and file uploads. Please contact the server administrator for access and configuration details.

**Server Administrator:**
Das, Anwesha

## Usage

1. Access the web interface through your browser
2. Fill out the required metadata fields across all sections:
   - Summary information
   - Administrative metadata
   - Process information
   - Structural metadata
   - Descriptive metadata
3. Choose to either:
   - Download the generated YAML file locally
   - Upload directly to the MODI Metadata platform

## Features In Detail

### Auto-save
- Form data is automatically saved in the browser's localStorage
- Recovery of form data on page reload
- Clear all stored data option available

### Validation
- Required field checking
- Format validation
- Error highlighting
- Helpful error messages

### Progress Tracking
- Visual progress bar
- Section completion indicators
- Easy navigation between sections

## Resources

- [FOT-Net Data Sharing Framework Documentation](https://www.connectedautomateddriving.eu/wp-content/uploads/2021/09/Data-Sharing-Framework-v1.1-final.pdf)
- [MODI Metadata Platform](https://modi-data.github.io/)
- [MODI Project Website](https://modiproject.eu/)

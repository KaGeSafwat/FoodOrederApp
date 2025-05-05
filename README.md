# Dashboard Application

A React dashboard application for managing posts with Firebase integration.

## Prerequisites

- Node.js 18.0.0 or higher (current project uses Node.js v10.6.0 which is incompatible)
- npm 8.0.0 or higher

## Node.js Version Issue

This project requires a modern version of Node.js. You are currently using Node.js v10.6.0, which is too old to support the ES modules syntax used by Vite and other dependencies.

### How to Update Node.js

#### Windows:

1. Download the latest LTS version from [Node.js official website](https://nodejs.org/)
2. Run the installer and follow the instructions
3. Restart your computer after installation
4. Verify the installation by running `node -v` in your terminal

#### Using NVM (Node Version Manager) - Recommended:

1. Install NVM for Windows from [here](https://github.com/coreybutler/nvm-windows/releases)
2. Open a new terminal and run:
   ```
   nvm install 18.17.0
   nvm use 18.17.0
   ```
3. Verify with `node -v`

## Getting Started

After updating Node.js:

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

- Post management (create, read, update, delete)
- Image upload via file or URL
- Firebase integration for data storage
- Responsive design with dark mode support
- Authentication with Firebase

## Troubleshooting

If you encounter issues with data fetching:

1. Check your Firebase database rules
2. Verify your internet connection
3. Check the browser console for specific error messages
4. Make sure your Firebase project is active and properly configured

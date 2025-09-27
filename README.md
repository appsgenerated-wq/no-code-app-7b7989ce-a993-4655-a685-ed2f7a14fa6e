# GorillaHub

Welcome to GorillaHub, a web application for researchers to catalog and track information about gorillas. This project is built with React on the frontend and uses Manifest for a complete, auto-generated backend solution.

## Features

- **User Authentication**: Researchers can sign up and log in to manage their data.
- **Gorilla Cataloging**: Create, read, and delete profiles for individual gorillas.
- **Ownership**: Each gorilla profile is owned by the researcher who created it.
- **Secure**: Access policies ensure that users can only modify their own data.
- **Admin Panel**: A built-in admin interface (at `/admin`) for managing all users and data.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Frontend Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure environment variables:**
    Create a `.env` file in the root directory and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=your-manifest-backend-url
    VITE_APP_ID=your-manifest-app-id
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Demo Credentials

- **Researcher**: `researcher@example.com` / `password`
- **Admin**: Access the admin panel at `{BACKEND_URL}/admin` with `admin@manifest.build` / `admin`.
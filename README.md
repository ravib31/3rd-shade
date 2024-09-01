1. Introduction
The Channel Partner Lead Management System is a web-based application designed to streamline the process of lead submission and management for a marketing agency. The system provides a front-end panel for channel partners to submit leads and a back-end panel for the internal team to manage, analyze, and visualize the submitted data.

2. Project Overview
Front-End Panel
Purpose: The front-end panel is intended for channel partners to submit lead information through a form. This panel ensures that all necessary lead data is collected and validated before being submitted to the back-end system.

Key Features:

Form-based lead submission
Input validation for mandatory fields, email, and phone number formats
Confirmation message upon successful form submission


Back-End Panel
Purpose: The back-end panel is designed for the internal team to manage and analyze the data submitted by channel partners. This panel includes data visualization, filtering options, and a dashboard to monitor overall performance.

Key Features:

Data visualization in tabular and graphical formats.
Data filtering based on channel partner, timeframe, lead source, and lead interest.
Summary dashboard with performance metrics.
Data export functionality in CSV or Excel format.


3. System Architecture
The system is divided into two main components: the front-end and the back-end. The architecture follows a client-server model where the front-end communicates with the back-end through RESTful APIs.

High-Level Architecture:
Client-Side (Front-End): HTML, CSS, JavaScript (React.js), React Toastify
Server-Side (Back-End): Node.js, Express.js
Database: MongoDB for data storage
Authentication: JSON Web Tokens (JWT) for secure access.


4. Technologies Used

Front-End:
React.js: For building the user interface
Tailwind CSS: For styling and responsive design
Axios: For making HTTP requests to the back-end API

Back-End:
Node.js: Server-side runtime environment
Express.js: Web framework for building the back-end API
MongoDB: NoSQL database for storing lead and user data
Mongoose: ODM (Object Data Modeling) library for MongoDB
JSON Web Tokens (JWT): For secure authentication

5. Features and Functionality
Front-End Panel Features

Lead Submission Form:
Channel Partner Code: Unique identifier for the channel partner.
Lead Name: Full name of the potential lead.
Contact Number: Validated phone number of the lead.
Email ID: Validated email address of the lead.
Lead Source: Dropdown to select the origin of the lead (e.g., Social Media, Referral, Website).
Lead Interest: Description or selection of the lead's interest in specific services or products.
Additional Notes: A text area for any additional information.

Form Validation:
All fields are mandatory except for "Additional Notes."
Email and Contact Number are validated for correct format.

Submission:
On submission, data is sent via POST request to the back-end.
A confirmation message is displayed on successful submission.

Back-End Panel Features
Data Visualization:
Display all submitted leads in a tabular format with pagination.
Ability to sort data by columns (e.g., Channel Partner Code, Lead Source).

Filtering Options:
Filter leads by Channel Partner Code.
Filter leads by timeframes (daily, weekly, monthly).
Filter leads by Lead Source and Lead Interest.

Dashboard:
Overview: Displays the total number of leads submitted.
Categorization: Breaks down leads by channel partner, lead source, and time period.
Channel Partner Performance: Visual representation of each channel partner's performance over a selected time period.

Export Data:
Option to export filtered data as a CSV or Excel file for offline analysis.

Security & Authentication:
Only authorized channel partners can access the front-end.
Only authorized internal users can access the back-end.
Data is securely stored in MongoDB and transmitted over HTTPS.

6. Database Design
The system uses MongoDB to store data. The database consists of the following collections:

Collections:
Users: Stores user information, including username, password (hashed), and role (channel partner or internal user).
Leads: Stores all submitted lead information, including Channel Partner Code, Lead Name, Contact Number, Email ID, Lead Source, Lead Interest, Additional Notes, and timestamps.
Sample Schemas:

7. Security and Authentication
Authentication:
The system uses JWT (JSON Web Tokens) for secure authentication.
Channel partners and internal users must log in to access their respective panels.
Each API request requires a valid JWT token in the Authorization header.
Data Security:
Passwords are hashed before being stored in the database.
Data transmission between the client and server is secured using HTTPS.


8. API Documentation
The back-end system exposes a set of RESTful APIs to handle lead submissions, user authentication, data retrieval, and data export.

Example Endpoints:
POST /api/auth/login: Authenticate users and return a JWT.
POST /api/leads: Submit a new lead (Authenticated).
GET /api/leads: Retrieve all leads (Authenticated).
GET /api/leads/summary: Get a summary of leads for the dashboard (Authenticated).
GET /api/leads/export: Export lead data as CSV (Authenticated).


9. Deployment
Deployment Steps:
Server Configuration: Set up a Node.js environment on the server.
Database Setup: Install MongoDB and configure it to store application data.
Environment Variables: Configure environment variables for database connection, JWT secret key, and server port.
SSL Configuration: Configure SSL certificates for HTTPS to secure data transmission.
Continuous Integration/Continuous Deployment (CI/CD):
Implement CI/CD pipelines using tools like Jenkins, GitHub Actions, or CircleCI to automate testing and deployment.

10. Appendix
Tools and Libraries:
React.js: Front-end library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for styling.
Node.js: JavaScript runtime for server-side development.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for data storage.
Mongoose: ODM for MongoDB.
JWT: Standard for creating JSON-based access tokens.


10. Process to Set Up the Channel Partner Lead Management System on a Local System
This guide will walk you through the process of setting up the Channel Partner Lead Management System on your local machine. The setup includes the installation of necessary software, configuration of environment variables, and running both the front-end and back-end servers.

Prerequisites
Before you start, ensure you have the following installed on your local machine:

Node.js (version 14.x or higher)
npm (Node Package Manager, usually comes with Node.js)
MongoDB (version 4.x or higher)
Git (to clone the repository)
Step 1: Clone the Repository
First, clone the project repository to your local machine using Git. Open your terminal or command prompt and run the following command:
git clone https://github.com/ravib31/3rd-shade.git


Step 2: Install Dependencies
Navigate to the project directory and install the necessary dependencies for both the front-end and back-end.
cd channel-partner-lead-management

Back-End Dependencies
Navigate to the backend directory and install the back-end dependencies:
cd backend
npm install

Front-End Dependencies
Navigate to the frontend directory and install the front-end dependencies:
cd ../frontend
npm install

Step 3: Set Up Environment Variables
You need to create environment variable files for both the front-end and back-end to configure the application.

Back-End Environment Variables
In the backend directory, create a .env file:
cd ../backend
touch .env

Add the following environment variables to the .env file:
PORT=8000
MONGODB_URI=mongodb://localhost:27017/channelPartners
JWT_SECRET_KEY=your_secret_key
Replace your_secret_key with a secure string of your choice.

Front-End Environment Variables
In the frontend directory, create a .env file:cd ../frontend
touch .env

Add the following environment variable to the .env file:
REACT_APP_API_URL=http://localhost:8000/api

Step 5: Run the Back-End Server
cd backend
npm start

Step 6: Run the Front-End Server
cd frontend
npm start









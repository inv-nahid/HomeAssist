HomeAssist

Overview:
HomeAssist is a full-stack web application designed to connect users with trusted home service professionals. Whether you need deep cleaning, electrical repairs, or plumbing, HomeAssist makes it easy to find, book, and manage services in your local area. Built with a modern tech stack, this project features a responsive React frontend and a secure Spring Boot backend with MySQL.

Features:
Service Search: Browse and search for service providers by location and service type.
Booking System: Book appointments and manage requests directly through the platform.
User Dashboard: View booking history, submit reviews, and manage your profile.
Authentication: Secure user login and registration with JWT-based authentication (in progress).
Responsive Design: Fully responsive UI for seamless use on desktop and mobile devices.
Featured Services: Highlighted services with ratings and pricing on the homepage.

Tech Stack:

Frontend:
React: JavaScript library for building the user interface.
Vite: Fast frontend build tool for development and production.
React Router: For client-side routing.
Tailwind CSS: Utility-first CSS framework for styling.
React Icons: For adding icons to the UI.

Backend:
Spring Boot: Java framework for building RESTful APIs.
MySQL: Relational database for storing user, booking, and service data.
Spring Data JPA: For database operations.
Spring Security: For JWT-based authentication.

Project Structure:

![image](https://github.com/user-attachments/assets/ef4effbc-3e56-4f8f-9393-1a5e69eb6730)

Prerequisites:
Node.js (v16 or higher): For the frontend.
Java (v17 or higher): For the backend.
Maven: For building the Spring Boot backend.
MySQL: For the database.
Git: For version control.

Setup Instructions:
1. Clone the Repository
   git clone https://github.com/yourusername/homeassist.git
   cd homeassist
   
2.  Backend Setup:
    Navigate to the backend directory
    cd backend
    
    Set up MySQL:
    Create a database named homeassist_db
    CREATE DATABASE homeassist_db;
    
    Update backend/src/main/resources/application.properties with your MySQL credentials:
    spring.datasource.url=jdbc:mysql://localhost:3306/homeassist_db
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    
    Install dependencies and run the backend:
    mvn clean install
    mvn spring-boot:run

3. Frontend Setup:
   Navigate to the frontend directory
   cd frontend

   Install dependencies
   npm install

   Run the frontend
   npm run dev
   The frontend will run on http://localhost:5173.

4. Access the Application:
   Open http://localhost:5173 in your browser.
   Register or log in to explore features like booking services and viewing your dashboard.

API Endpoints:
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in and receive a user object (JWT to be implemented).
GET /api/services: Search for service providers.
POST /api/bookings: Create a new booking.
GET /api/bookings: Get user bookings.
POST /api/reviews: Submit a review for a provider.
GET /api/reviews: Get reviews for a provider.

Future Improvements:
JWT Authentication: Fully implement JWT for secure user sessions.
Admin Panel: Add functionality for managing service providers.
Notifications: Email/SMS notifications for booking confirmations.

Contributing:
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.


    

# VitalSync AI

VitalSync AI is a full-stack health and productivity dashboard that combines user authentication, personalized health metrics, and Gemini AI-powered insights. The platform helps users track wellness trends, monitor daily progress, and receive intelligent recommendations.

## Features

- Secure user registration and login with JWT authentication
- Password hashing using bcrypt
- MongoDB-based user storage
- Protected routes for authenticated dashboard access
- Personal health dashboard with:
  - Heart Rate (bpm)
  - Daily Steps
  - Focus Hours
  - Calories Burned
  - AI Health Score
  - Productivity Percentage
- Interactive weekly health trend chart using Recharts
- Gemini AI-powered health recommendations using Google Gemini API
- Responsive and modern UI built with React and Tailwind CSS

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## Project Structure

```bash
VitalSync_AI/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB running locally or remotely

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd VitalSync_AI
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder with the following variables:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/vitalsync
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file inside the frontend folder if needed:

```env
VITE_API_URL=http://localhost:5001/api
```

## Running the Project

### Start the backend

```bash
cd backend
npm run dev
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Usage

1. Register a new account
2. Log in securely
3. View your personalized dashboard
4. Monitor health metrics and weekly trends
5. Receive AI-generated wellness recommendations

## How It Works

1. Users first register or log in through the authentication system.
2. The backend verifies the credentials and issues a JWT token.
3. The frontend stores the token and uses it to access protected routes.
4. Once logged in, the user sees a personal dashboard with health metrics and charts.
5. The Gemini AI analyzes the user’s health data and generates personalized suggestions.
6. All user data is stored securely in MongoDB.

## Future Enhancements

- BMI Calculator
- Sleep Tracking
- Water Intake Monitoring
- Wearable Device Integration
- Advanced Health Analytics
- Mood and Stress Tracking

## License

This project is open-source and available under the MIT License.

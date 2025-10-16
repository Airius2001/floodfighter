# FloodFighter
FloodFighter is a modern web application designed to educate, inform, and empower communities in flood-prone areas.
It combines interactive learning, real-time flood information, and data-driven insights to help users better understand flood risks and preparedness strategies.

This repository contains the frontend (Next.js) source code.

The backend API is available at https://github.com/Airius2001/floodfighterBackend.git 

Public data and datasets are available at https://github.com/TrNgyn/FloodFighter_public_data.git 


## Project structure

```
.
├── app/                      # Next.js app router pages and layout
├── components/               # Reusable UI components
├── public/                   # Static assets (images, icons, favicon, etc.)
├── src/                      # Business logic, hooks, and utilities
├── dockerfile.dockerfile     # Docker build configuration
├── nginx.conf                # Nginx reverse proxy for production
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Features
 *  Interactive Flood Awareness Tools – Educational resources and visualizations to promote flood preparedness.
 *  Quiz & Learning Section – Engaging quizzes to test users’ flood safety knowledge.
 *  QR code - Users can scan QR code to get guidelines without internet.
 *  Chat bot - Users can have communication with our chat bot to get a deeper information about flood in Australia
 *  Postcode - Users can enter their postcode to check the flood conditions.
 *  Personalized emergency kit checklist - Users can input the credientials to get their own personalized checklist based on their family suitations.

## Tech stack
```
Layer	             Technology
Frontend	         Next.js (React + TypeScript)
Styling	             Tailwind CSS, Material UI
Backend	             Nest.js (in floodfighterBackend)
Database	         PostgreSQL (accessed via backend)
Deployment	         Docker, Nginx, Vercel
Version Control	     Git + GitHub

```

## Getting Started
1. Clone the Repository
```
git clone https://github.com/Airius2001/floodfighter.git
cd floodfighter

```
2. Install Dependencies
```bash
npm install
# or
yarn install
```

3. Start the Development Server
```bash
npm run dev
# or
yarn dev
```
Your app will be available at:
http://localhost:3000 

4. Connect to the Backend
Ensure the backend service is running locally or online.
Default API base URL:

```bash
https://floodfighterbackend.onrender.com
```

## Deploy on Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing
You can run the built-in tests using:

```bash
npm test
```

## Acknowledgments
 * Developed by Yun Xin, Patrick, and Rahul as part of the FloodFighter project.
 * Special thanks to open-source communities and frameworks that made this possible:
     * Next.js
     * Tailwind CSS
     * Material UI
     * React Bit
     * Nest.js
     * PostgreSQL



# Hire The Helper

Built a full-stack service marketplace using React, Node.js, Express, and MongoDB with role-based dashboards for users and helpers, integrated ZEGOCLOUD video calling and Razorpay payment gateway for real-time communication and secure transactions.

## 📌 Project Overview

Hire The Helper is a full-stack web application that connects users with local helpers for different services. 

The platform supports role-based access where both users and helpers can sign up and log in. Each role has its own dashboard to manage activities. Users can browse helpers, hire them, make secure payments using Razorpay, and communicate through video calls powered by ZEGOCLOUD.

Helpers receive instant updates when they are hired and can manage their work through their dashboard.

## 🛠 Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Tokens)

### Third-Party Integrations
- ZEGOCLOUD Prebuilt Video Call UI (for real-time video communication)
- Razorpay Payment Gateway (for secure online payments)

### Tools & Platforms
- Git
- GitHub
- Postman (API Testing)
- 
  
  ## ✨ Features

- User and Helper authentication (Signup/Login)
- Role-based access for Users and Helpers
- Separate dashboards for Users and Helpers
- Users can browse helpers and hire them for services
- Helpers receive instant activity updates when they are hired
- Real-time video calling between user and helper using ZEGOCLOUD
- Secure online payments using Razorpay Payment Gateway
- RESTful API integration
- Responsive and user-friendly UI
## Folder Structure
Hire-Helper/
├── backend/                # Enterprise-ready Node.js server logic
│   ├── middleware/         # Security & Auth validation filters
│   ├── models/             # Schema definitions (User, Helper, History, Present)
│   ├── routes/             # Versioned REST API endpoints
│   ├── zegoToken.js        # Server-side signaling for WebRTC
│   └── db.js               # Database connection abstraction
├── src/                    # Frontend React Architecture
│   ├── components/         # Modular UI views and pages
│   ├── context/            # Global state providers (Auth & Helper states)
│   └── App.js              # Centralized routing logic
└── public/                 # Static asset management

##Screenshots
<img width="1072" height="534" alt="image" src="https://github.com/user-attachments/assets/1c9b6dd6-b321-42a4-b5d2-7ff520cdb7c3" />
<img width="1080" height="438" alt="image" src="https://github.com/user-attachments/assets/b8047511-e252-4e36-be18-f6c19268245d" />
<img width="1080" height="556" alt="image" src="https://github.com/user-attachments/assets/3b60288a-7f3f-4c05-a20e-f77fa96b7aef" />
<img width="1053" height="484" alt="image" src="https://github.com/user-attachments/assets/1e2c738a-eb53-4677-89c9-049a4604d07f" />


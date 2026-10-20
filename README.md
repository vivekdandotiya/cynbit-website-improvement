# Cynbit Technologies — Guided Project Inquiry & Scope Configurator

> **Full Stack Developer Intern Technical Assessment**  
> **Candidate:** Vivek Dandotiya  
> **Target Company:** Cynbit Technologies ([cynbit.in](https://www.cynbit.in))  
> **Role:** Full Stack Developer Intern  

---

## 1. Executive Summary

This project delivers an end-to-end, full-stack website improvement for **Cynbit Technologies** (`https://www.cynbit.in/`). 

Following a detailed architectural and UX audit of Cynbit's live website, the primary conversion barrier identified was an **unstructured, generic single-step contact form** on `/contact` and `/services`. Prospective enterprise clients interested in cutting-edge AI automation, LLM workflows, custom cloud platforms, or technical SEO are asked to type their complex technical needs into a blank text box without guidance on budget tiers, target timelines, or capability selection.

To resolve this, we engineered the **Next-Gen Guided Project Inquiry & Scope Configurator**: a high-fidelity 5-step interactive wizard backed by a production-ready Node.js/Express REST API, automated qualification scoring, resilient persistence with MongoDB Atlas and in-memory demo fallback, and complete test suites.

---

## 2. Key Features

- **Interactive 5-Step Scoping Wizard:**
  - **Step 1: Service Architecture & Capabilities:** Interactive selection across Cynbit's 3 core pillars (*AI Automation Suite*, *Custom IT Services*, *Digital Marketing & Growth*) with capability toggles.
  - **Step 2: Operational Phase, Velocity & Budget:** Configure project stage (Greenfield, Scaling, Migration, Consulting), delivery timeline (< 1 mo, 1-3 mo, 3-6 mo, 6+ mo), and budget brackets with dynamic **INR (₹) / USD ($)** currency conversion.
  - **Step 3: Technical Blueprint & Integrations:** Multi-select target platforms (Web, Mobile, Cloud, API, Autonomous AI Agent), list third-party integrations (OpenAI, Stripe, AWS, Slack), and provide functional requirements with real-time character counting.
  - **Step 4: Organization & Point of Contact:** Qualified contact intake (Full Name, Business Email, Organization, Industry, Phone, Preferred Channel: Email, Phone, Video Call).
  - **Step 5: Blueprint Verification & Review:** Comprehensive real-time summary card with quick edit shortcuts to any step before final transmission.
- **Instant Inquiry Tracking & Transparency:**
  - Generates an official tracking reference ID (e.g., `CYN-2026-SACCA`) upon submission.
  - Real-time **Track Inquiry Modal** allowing prospects or evaluators to query status by reference code with masked client email for privacy.
  - Live **Pipeline Analytics Drawer** displaying aggregated scope distribution and system operational mode.
  - One-click **Download Blueprint (JSON)** for client recordkeeping.
- **Enterprise-Grade Backend API:**
  - `GET /api/health`: Uptime, system health, and database connection status.
  - `GET /api/services`: Dynamic taxonomy of services, capabilities, budget tiers, and timelines.
  - `POST /api/inquiries`: Independent server-side validation, sanitization against XSS/injection, qualification score calculation, and dispatch.
  - `GET /api/inquiries`: Evaluator/admin listing of recent blueprints.
  - `GET /api/inquiries/:referenceId`: Sanitized public inquiry lookup.
  - `GET /api/inquiries/stats`: Aggregation analytics.
- **Resilient Dual-Mode Persistence:**
  - Seamlessly connects to MongoDB Atlas when `MONGODB_URI` is provided.
  - Transparently falls back to an in-memory demo repository with pre-seeded demo inquiries when running offline or without credentials, clearly declaring demo status without pretending temporary storage is permanent.
- **Security & Abuse Protection:**
  - Helmet security headers and strict CORS configuration.
  - Request size limits (`64kb`) to thwart payload denial-of-service.
  - Express rate limiting on general API calls and dedicated strict rate limiting on inquiry submissions.

---

## 3. Technology Stack

| Layer | Technologies | Justification |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, Lucide React | High-performance build tooling, sub-second HMR, modern CSS utilities matching Cynbit's dark aesthetic |
| **Backend** | Node.js (v22), Express.js (v4), Mongoose | Industry-standard lightweight REST API with modular controllers and middleware |
| **Database** | MongoDB Atlas / In-Memory Demo Store | Dual-mode persistence enabling zero-friction evaluation and production cloud storage |
| **Security** | Helmet, CORS, Express-Rate-Limit, Crypto | Enterprise API hygiene, rate limiting, and input sanitization |
| **Testing** | Node Native Test Runner, Supertest, Vitest, React Testing Library | Full test coverage across backend endpoints and frontend component interactions |

---

## 4. Project Directory Structure

```
cynbit-website-improvement/
├── client/                     # Frontend Application (React + Vite + Tailwind)
│   ├── public/                 # Static assets and favicon
│   ├── src/
│   │   ├── api/
│   │   │   └── inquiryApi.js   # Centralized API client with fallback resilience
│   │   ├── components/
│   │   │   ├── Header.jsx              # Brand header, status indicator, action triggers
│   │   │   ├── HeroSection.jsx         # Hero banner with value props & quick filters
│   │   │   ├── InquiryConfigurator.jsx # 5-step wizard state orchestrator
│   │   │   ├── StepProgress.jsx        # Animated progress bar & clickable step nodes
│   │   │   ├── Step1Services.jsx       # Pillars & specialized capabilities selector
│   │   │   ├── Step2Scope.jsx          # Stage, timeline, and INR/USD budget selector
│   │   │   ├── Step3Details.jsx        # Platforms, integrations & requirements
│   │   │   ├── Step4Contact.jsx        # Contact & organization intake with validation
│   │   │   ├── Step5Review.jsx         # Real-time summary verification before submit
│   │   │   ├── SubmissionSuccess.jsx   # Reference ID confirmation & JSON export
│   │   │   ├── InquiryLookupModal.jsx  # Status tracking modal by Reference ID
│   │   │   ├── InquiryStatsDrawer.jsx  # Live pipeline analytics drawer
│   │   │   └── Footer.jsx              # Official contact info and assessment notice
│   │   ├── tests/
│   │   │   ├── setup.js                # JSDOM test setup & mocks
│   │   │   └── InquiryConfigurator.test.jsx # Component unit & interaction tests
│   │   ├── App.jsx             # Main application container
│   │   ├── index.css           # Tailwind directives & glassmorphism utilities
│   │   └── main.jsx            # React root mount
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend Application (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   │   ├── constants.js    # Cynbit service taxonomy & company constants
│   │   │   └── db.js           # MongoDB connection & demo mode fallback handler
│   │   ├── controllers/
│   │   │   ├── healthController.js   # Health check controller
│   │   │   ├── inquiryController.js  # Blueprint submission & inquiry lookup
│   │   │   └── serviceController.js  # Taxonomy catalog controller
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Centralized 404 & 500 error handlers
│   │   │   ├── rateLimiter.js        # API & submission rate limiters
│   │   │   └── validation.js         # Payload validation & input sanitization
│   │   ├── models/
│   │   │   └── inquiryModel.js       # Mongoose Schema & In-Memory repository
│   │   ├── routes/
│   │   │   ├── healthRoutes.js
│   │   │   ├── inquiryRoutes.js
│   │   │   └── serviceRoutes.js
│   │   ├── tests/
│   │   │   └── inquiry.test.js       # Backend integration test suite (Supertest)
│   │   ├── app.js              # Express application setup
│   │   └── index.js            # Server bootstrap & graceful shutdown listener
│   ├── package.json
│   └── .env.example
├── .env.example                # Root environment template
├── .gitignore
├── package.json                # Root workspace orchestration
├── render.yaml                 # Render cloud backend deployment config
├── vercel.json                 # Vercel cloud frontend deployment config
├── TECHNICAL_REPORT.md         # Comprehensive Assessment Technical Report
└── README.md                   # Project documentation
```

---

## 5. Prerequisites

- **Node.js**: v18.0.0 or higher (v22 recommended)
- **npm**: v9.0.0 or higher
- **Git**

---

## 6. Installation & Local Setup

### Step 1: Clone or navigate to the repository
```bash
git clone https://github.com/Vivek-Dandotiya/cynbit-website-improvement.git
cd cynbit-website-improvement
```

### Step 2: Install dependencies
Install root, client, and server dependencies with:
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Step 3: Configure Environment Variables
Copy the example environment templates:
```bash
cp .env.example .env
cp server/.env.example server/.env
```

*(Note: If you leave `MONGODB_URI` blank, the application automatically runs in In-Memory Demo Mode with pre-seeded test inquiries).*

---

## 7. Running the Application

### Option A: Run Both Frontend & Backend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

### Option B: Run Services Separately

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# or: npm start
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

---

## 8. Running Automated Tests

### Run All Tests Across Entire Project:
```bash
npm run test
```

### Run Backend API Integration Tests (Node Test Runner + Supertest):
```bash
npm run test:server
```
*Outputs: 10 automated test cases verifying health, validation rejections, valid submission, reference ID lookup, masked email privacy, and 404 handling.*

### Run Frontend Component Tests (Vitest + React Testing Library):
```bash
npm run test:client
```
*Outputs: 4 automated test cases verifying multi-step rendering, form navigation, backward state preservation, and inline field validation.*

---

## 9. Production Build

To test the production client bundle:
```bash
npm run build
```
The optimized assets will be emitted to `client/dist/`.

---

## 10. API Documentation & Sample Payloads

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Response:**
```json
{
  "status": "healthy",
  "service": "Cynbit Guided Inquiry API",
  "version": "1.0.0",
  "timestamp": "2026-10-20T10:00:00.000Z",
  "uptimeSeconds": 120,
  "database": {
    "connected": false,
    "mode": "Demo In-Memory Mode (No external database required)",
    "isDemoMode": true
  }
}
```

### 2. Submit Qualified Inquiry
- **Endpoint:** `POST /api/inquiries`
- **Sample Request:**
```json
{
  "services": ["ai-automation", "custom-software"],
  "capabilities": ["autonomous-agents", "fullstack-web-mobile"],
  "projectStage": "greenfield",
  "timeline": "urgent",
  "budgetTier": "tier-3",
  "currency": "INR",
  "targetPlatforms": ["web", "cloud", "ai-agent"],
  "integrations": "OpenAI API, Slack, AWS RDS",
  "projectDescription": "We are architecting an enterprise multi-agent customer support automation platform with real-time analytics.",
  "contact": {
    "fullName": "Vivek Dandotiya",
    "email": "vivek@example.com",
    "company": "Dandotiya Tech",
    "industry": "Artificial Intelligence",
    "phone": "+91 89479 62667",
    "preferredContactMethod": "video-call"
  }
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Inquiry received successfully! Cynbit engineering architects will review your blueprint.",
  "data": {
    "referenceId": "CYN-2026-SACCA",
    "status": "RECEIVED",
    "priority": "HIGH",
    "qualificationScore": 95,
    "estimatedResponseHours": 24,
    "submittedAt": "2026-10-20T10:05:00.000Z"
  }
}
```

### 3. Track Inquiry Status
- **Endpoint:** `GET /api/inquiries/:referenceId`
- **Example:** `GET /api/inquiries/CYN-2026-DEMO1`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "referenceId": "CYN-2026-DEMO1",
    "status": "UNDER_REVIEW",
    "priority": "HIGH",
    "estimatedResponseHours": 24,
    "clientName": "Arjun Mehta",
    "maskedEmail": "a***a@example.com"
  }
}
```

---

## 11. Deployment Guide

- **Frontend Deployment (Vercel):**
  - Configured with `vercel.json` for SPA rewrites and production asset bundling.
  - Set Environment Variable in Vercel: `VITE_API_URL` -> URL of deployed backend.
- **Backend Deployment (Render):**
  - Configured with `render.yaml`.
  - Set Environment Variables: `CLIENT_URL` (deployed frontend URL), `NODE_ENV=production`.

---

## 12. Candidate Submission Details

- **Candidate Name:** Vivek Dandotiya
- **Email:** vivekdandotiya772@gmail.com
- **Role:** Full Stack Developer Intern
- **Company:** Cynbit Technologies
- **GitHub Repository:** [https://github.com/Vivek-Dandotiya/cynbit-website-improvement](https://github.com/Vivek-Dandotiya/cynbit-website-improvement)
- **Technical Report:** [TECHNICAL_REPORT.md](./TECHNICAL_REPORT.md)

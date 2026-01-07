# InstaviZ – AI Powered Data Visualization (Frontend)

InstaviZ is an AI-powered data visualization platform that allows users to upload CSV datasets, explore them interactively, chat with their data using AI, and generate charts dynamically — all through a clean and intuitive web interface.

This repository contains the **frontend** of InstaviZ, built with **Next.js** and **React**, designed to work seamlessly with the InstaviZ backend and AI services.

---

##  Features

-  **CSV Upload Interface**
  - Upload large CSV files
  - Upload state persists across refresh using backend checks

-  **Dynamic Chart Rendering**
  - Bar charts, pie charts, and more
  - Charts generated dynamically from backend responses

-  **AI Chat with Data**
  - Ask questions about your dataset
  - Request custom aggregations and charts via chat
  - Natural language → chart conversion

-  **Guest & Authenticated User Support**
  - Guest users supported via cookies
  - Logged-in users via JWT authentication

-  **Refresh-Safe UI**
  - Dataset state restored on page reload
  - No need to re-upload data after refresh

-  **Responsive UI**
  - Optimized for desktop and mobile
  - Chat panel adapts to screen size

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, Tailwind CSS
- **State Management**: React Context
- **HTTP Client**: Axios
- **Charts**: Dynamic chart components (via backend data)
- **Authentication**: JWT & guest cookies (via backend)
- **AI Integration**: Gemini-powered backend (not in this repo)

---

##  Project Structure (Simplified)

```txt
src/
 ├─ app/                # Next.js app router pages
 ├─ components/         # Reusable UI components
 ├─ context/            # Global state (charts, analysis, upload status)
 ├─ lib/                # Axios instance & helpers
 ├─ hooks/              # Custom hooks
 └─ styles/             # Global styles

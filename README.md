# Expense Tracker

A single-page web application for tracking employee expenses with search, sort, and reporting features.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

Check if installed:
```bash
node --version
npm --version
git --version
```

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jarltordrcilla32/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application
```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

## Features

- Add, edit, and delete expenses
- Search by description, category, date, or amount
- Sort expenses by any column
- View weekly, monthly, quarterly, and yearly reports
- Data persists in browser localStorage

## Technologies

- React
- Tailwind CSS
- Lucide React (icons)
- localStorage

## Project Structure
```
src/
├── utils/          # Helper functions (storage, formatters, date calculations)
├── data/           # Constants and sample data
└── App.js          # Main application
```

---

Built with React and Tailwind CSS
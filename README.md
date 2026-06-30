# Spur AI Chat

An AI-powered customer support chatbot built as part of the Spur Founding Full-Stack Engineer Take-Home Assignment.

## Live Demo

Frontend: https://spur-ai-chatbot-coral.vercel.app

## Repository

https://github.com/Ishaaa30/spur-ai-chatbot

---

# Features

- AI-powered customer support chatbot
- Session-based conversations
- Conversation history persistence
- Markdown-formatted AI responses
- Responsive chat interface
- Auto-scroll to latest messages
- "AI is typing..." indicator
- Disabled send button during requests
- Environment variable based configuration
- Graceful error handling

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Markdown

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- OpenRouter API (LLM)

## Deployment

- Frontend: Vercel
- Backend: Render

---

# Project Structure

```
spur-ai-chatbot/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
└── backend/
    ├── prisma/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   └── ...
    └── ...
```

---

# How to Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/Ishaaa30/spur-ai-chatbot.git
cd spur-ai-chatbot
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
OPENROUTER_API_KEY=your_api_key
```

Generate Prisma Client

```bash
npx prisma generate
```

Start backend

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend

```bash
npm run dev
```

---

# Database

The project uses SQLite with Prisma ORM.

Tables:

- Conversations
- Messages

Every conversation is associated with a unique session ID and stores:

- User messages
- AI responses
- Timestamps

---

# API

### POST

```
/chat/message
```

Request

```json
{
  "message": "What is your return policy?",
  "sessionId": "optional"
}
```

Response

```json
{
  "reply": "...",
  "sessionId": "..."
}
```

---

### GET

```
/chat/history/:sessionId
```

Returns complete conversation history.

---

# LLM

Provider

- OpenRouter API

System Prompt

The assistant acts as a helpful customer support agent for a fictional e-commerce store and answers questions based on the provided store policies.

Knowledge Included

- Return Policy
- Shipping Policy
- Refund Policy
- Support Hours
- Payment Methods
- Delivery Information
- Student Discounts
- Warranty Information

---

# Architecture

The backend follows a layered architecture.

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Database / LLM
```

This separation keeps the code modular and makes it easier to extend with additional channels, tools, or knowledge sources.

---

# Error Handling

The application gracefully handles:

- Empty messages
- API failures
- Invalid API keys
- Network errors
- Unexpected server errors

---

# Future Improvements

Given more time, I would add:

- Streaming AI responses
- Authentication
- Redis caching
- Vector database / RAG
- Admin dashboard
- Multiple AI model selection
- Better mobile responsiveness
- Unit and integration tests

---

# Notes

The backend is deployed on Render's free tier, so the first request may take a few seconds due to cold starts. Subsequent requests are significantly faster.

---

Thank you for reviewing my submission!

# 🤖 JARVIS — Job Application & Response Via Intelligent System

An AI-powered autonomous job application platform designed to scale job search efforts, optimize conversion rates, and continuously improve using reinforcement learning.

---

## 🚀 Overview

JARVIS is a full-stack intelligent system that automates the end-to-end job search pipeline:

* 🔍 Discover jobs across multiple platforms
* 🧠 Analyze and score job descriptions using AI
* ✍️ Generate tailored resumes and answers
* 🤖 Automatically apply to jobs via browser automation
* 📊 Track outcomes and optimize using reinforcement learning
* 📬 Perform recruiter outreach and follow-ups

> Goal: Achieve **200+ applications/day** with **10–15% interview conversion rate**

---

## 🧩 Core Features

### 1. Intelligent Job Discovery

* Multi-platform crawling (Naukri, LinkedIn, Indeed, etc.)
* Deduplication and structured storage
* Priority scoring using AI

### 2. AI Decision Engine (Brain)

* Job match scoring (0–100)
* Resume variant selection
* Screening question answering
* Red flag detection
* Company fit analysis

### 3. Automated Application Engine

* Playwright-based browser automation
* Multi-step form handling
* Human-like typing and delays
* Resume upload + dynamic answers

### 4. Reinforcement Learning System

* Learns from outcomes:

  * Interview → +10 reward
  * Rejection → negative reward
* Optimizes:

  * Platform selection
  * Resume variants
  * Apply timing
  * Score thresholds

### 5. Dynamic Resume Optimization

* Tailors resume per job description
* Improves ATS score (80–90% target)

### 6. Outreach Engine

* LinkedIn connection automation
* Cold email system
* Recruiter database tracking

### 7. Interview Intelligence

* Auto-generated interview prep kits
* Likely questions + answers
* Salary negotiation insights

---

## 🏗️ Architecture

### Monorepo Structure

```
jarvis/
│
├── apps/
│   ├── brain/        # AI reasoning + RL engine
│   ├── engine/       # crawlers + apply automation
│   ├── dashboard/    # Next.js monitoring UI
│   ├── direct/       # ATS + AI vision agents
│
├── packages/
│   ├── db/           # Prisma schema + migrations
│   ├── ai/           # LLM integrations (Ollama, Kimi)
│   ├── shared/       # types, utils
│   ├── config/       # env validation
│
├── scripts/          # setup + utilities
├── docker/           # container configs
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Runtime          | Node.js (TypeScript)    |
| Automation       | Playwright + stealth    |
| AI (Local)       | Ollama (Llama 3.x)      |
| AI (Cloud)       | Kimi / Claude APIs      |
| Database         | PostgreSQL + Prisma ORM |
| Queue System     | BullMQ + Redis          |
| Dashboard        | Next.js                 |
| Scheduler        | node-cron               |
| Logging          | Winston                 |
| Containerization | Docker                  |

---

## 🧠 Brain API (Core Engine)

```ts
scoreJob(jdText) → { score, variant, reason }

generateCoverLetter(jd, company) → string

answerQuestion(question) → string

detectRedFlags(jd) → string[]

researchCompany(name) → report

logOutcome(jobId, outcome) → RL update

decide(job) → apply / skip / apply_with_cover_letter
```

---

## 🔄 Reinforcement Learning Model

### State

```
{ score_bucket, platform, role_type, company_size }
```

### Actions

* apply
* skip
* apply_with_cover_letter

### Rewards

| Outcome     | Reward |
| ----------- | ------ |
| Offer       | +20    |
| Interview   | +10    |
| Viewed      | +1     |
| No response | -1     |
| Rejected    | -2     |

---

## 📊 Expected Performance

| Metric           | Without JARVIS | With JARVIS |
| ---------------- | -------------- | ----------- |
| Applications/day | 10–20          | 200+        |
| ATS Score        | ~60%           | 80–90%      |
| Interview Rate   | ~1%            | 10–15%      |
| Outreach         | None           | Automated   |

---

## 🧪 Setup & Installation

### 1. Clone Repo

```bash
git clone https://github.com/your-username/jarvis-ai-system.git
cd jarvis-ai-system
```

---

### 2. Install Dependencies

```bash
npm install -g pnpm
pnpm install
```

---

### 3. Environment Setup

```bash
cp .env.example .env
```

Fill required values:

* PostgreSQL URL
* Redis URL
* API keys (Kimi / OpenAI)
* Gmail OAuth
* Platform credentials

---

### 4. Start Infrastructure

```bash
docker-compose up -d
```

---

### 5. Run Brain (Phase 0)

```bash
pnpm --filter brain dev
```

---

## 🚦 Development Phases

| Phase  | Description                          |
| ------ | ------------------------------------ |
| P0     | Brain + RL engine                    |
| P1     | Job discovery                        |
| P2     | First apply agent                    |
| P3     | Multi-platform scaling               |
| P4     | Dashboard + orchestration            |
| P5     | Direct company applications          |
| P6–P10 | Optimization + outreach + interviews |

---

## 📅 Daily Workflow

* Morning: Job discovery + scoring
* Midday: Automated applications
* Afternoon: Direct company applications
* Evening: Outcome tracking + RL updates

---

## 🛡️ Safety & Controls

* Platform rate limiting
* CAPTCHA handling
* Deduplication system
* Blacklist filtering
* Emergency stop switch
* Human-like automation behavior

---

## ⚠️ Disclaimer

This project uses automation for job applications. Ensure compliance with:

* Platform terms of service
* Ethical usage guidelines
* Personal accountability for actions taken

---

## 📈 Future Enhancements

* Multi-user SaaS version
* Advanced analytics dashboard
* Resume marketplace integration
* AI career coaching agent

---

## 👨‍💻 Author

**DK**
AI Engineer | Backend + AI Systems
Focused on LLMs, RAG systems, and intelligent automation

---

## ⭐ Final Note

JARVIS is not just a tool — it's a **self-improving career system**.

Build it step-by-step. Optimize continuously. Let the system learn.

---

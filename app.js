const iconMap = {
  dashboard: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5"></rect>
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5"></rect>
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5"></rect>
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5"></rect>
    </svg>
  `,
  queue: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5h6M4 12h6M4 17.5h6"></path>
      <path d="M14 6.5h6M14 12h6M14 17.5h6"></path>
      <circle cx="11" cy="6.5" r="1"></circle>
      <circle cx="11" cy="12" r="1"></circle>
      <circle cx="11" cy="17.5" r="1"></circle>
    </svg>
  `,
  logs: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h14M5 18h14"></path>
      <path d="M8 8.5 4.5 12 8 15.5"></path>
      <path d="M13.5 8.5 17 12l-3.5 3.5"></path>
    </svg>
  `,
  settings: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.25"></circle>
      <path d="M19 12a7 7 0 0 0-.08-1l2.12-1.64-2-3.46-2.5 1a7.3 7.3 0 0 0-1.73-1L12.5 2h-4l-.3 2.9a7.3 7.3 0 0 0-1.73 1l-2.5-1-2 3.46L4.1 11a7 7 0 0 0 0 2l-2.12 1.64 2 3.46 2.5-1a7.3 7.3 0 0 0 1.73 1L8.5 22h4l.3-2.9a7.3 7.3 0 0 0 1.73-1l2.5 1 2-3.46L18.92 13c.05-.33.08-.66.08-1Z"></path>
    </svg>
  `,
  growth: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 16.5 10 11l3 3 6-6"></path>
      <path d="M15 8h4v4"></path>
    </svg>
  `,
  check: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"></circle>
      <path d="m8.5 12.2 2.4 2.4 4.6-4.9"></path>
    </svg>
  `,
  x: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"></circle>
      <path d="m9.5 9.5 5 5M14.5 9.5l-5 5"></path>
    </svg>
  `,
  stack: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 4 7 3.5-7 3.5-7-3.5L12 4Z"></path>
      <path d="m5 12 7 3.5 7-3.5"></path>
      <path d="m5 16 7 3.5 7-3.5"></path>
    </svg>
  `,
  pulse: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 12h4l2.2-5 3.4 10 2.2-5H20.5"></path>
    </svg>
  `,
  search: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5"></circle>
      <path d="m16 16 4.5 4.5"></path>
    </svg>
  `,
  copy: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="10.5" height="10.5" rx="2"></rect>
      <path d="M6 15H5a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 2 2v1"></path>
    </svg>
  `,
  plus: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14"></path>
    </svg>
  `,
  queued: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"></circle>
      <path d="M12 7.5v5l3 1.75"></path>
    </svg>
  `,
  skipped: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"></circle>
      <path d="M8.5 12h7"></path>
    </svg>
  `
};

const dashboardMetrics = [
  {
    key: "applications",
    title: "Applications Today",
    value: "24",
    meta: "of 50 limit",
    icon: "growth",
    tone: ""
  },
  {
    key: "successful",
    title: "Successful",
    value: "18",
    meta: "82% rate",
    icon: "check",
    tone: "is-success"
  },
  {
    key: "failed",
    title: "Failed",
    value: "4",
    meta: "retrying",
    icon: "x",
    tone: "is-danger"
  },
  {
    key: "queueSize",
    title: "Queue Size",
    value: "47",
    meta: "pending",
    icon: "stack",
    tone: "is-warning"
  }
];

const activityItems = [
  {
    status: "success",
    title: "Applied to Razorpay",
    meta: "Senior Frontend Engineer · Score 87",
    time: "2m ago"
  },
  {
    status: "danger",
    title: "Failed — CAPTCHA detected",
    meta: "Swiggy · SDE-II",
    time: "5m ago"
  },
  {
    status: "neutral",
    title: "Skipped — low match",
    meta: "CRED · DevOps (Score 54)",
    time: "7m ago"
  },
  {
    status: "success",
    title: "Applied to Zomato",
    meta: "Full Stack · Score 82",
    time: "12m ago"
  },
  {
    status: "success",
    title: "Applied to Meesho",
    meta: "Backend Engineer · Score 76",
    time: "18m ago"
  },
  {
    status: "danger",
    title: "Failed — timeout",
    meta: "PhonePe · Platform Engineer",
    time: "24m ago"
  },
  {
    status: "success",
    title: "Applied to PhonePe",
    meta: "React Developer · Score 84",
    time: "25m ago"
  },
  {
    status: "success",
    title: "Applied to Chargebee",
    meta: "Python Backend · Score 87",
    time: "29m ago"
  }
];

const dashboardSummary = [
  { label: "Applied", value: 18, total: 24, tone: "success" },
  { label: "Failed", value: 4, total: 24, tone: "danger" },
  { label: "Skipped", value: 2, total: 24, tone: "neutral" }
];

const queueJobs = [
  { id: 1014, title: "ML Engineer", meta: "Hyderabad · 2-4 yrs", company: "Zerodha", score: 98, status: "Skipped", time: "4h ago" },
  { id: 1019, title: "React Developer", meta: "Delhi NCR · 6-10 yrs", company: "BrowserStack", score: 98, status: "Failed", time: "3h ago" },
  { id: 1005, title: "Software Development Engineer", meta: "Pune · 3-5 yrs", company: "Freshworks", score: 88, status: "Queued", time: "4h ago" },
  { id: 1009, title: "Platform Engineer", meta: "Bengaluru · 6-10 yrs", company: "Razorpay", score: 88, status: "Failed", time: "5h ago" },
  { id: 1008, title: "Python Backend Engineer", meta: "Remote · 2-4 yrs", company: "Chargebee", score: 87, status: "Applied", time: "5h ago" },
  { id: 1013, title: "SDE-II", meta: "Mumbai · 2-4 yrs", company: "Flipkart", score: 87, status: "Skipped", time: "4h ago" },
  { id: 1002, title: "React Developer", meta: "Hyderabad · 2-4 yrs", company: "PhonePe", score: 84, status: "Queued", time: "41m ago" },
  { id: 1016, title: "Senior Frontend Engineer", meta: "Hyderabad · 5-8 yrs", company: "Razorpay", score: 84, status: "Queued", time: "4h ago" },
  { id: 1012, title: "Backend Engineer", meta: "Bengaluru · 3-5 yrs", company: "Meesho", score: 82, status: "Applied", time: "2h ago" },
  { id: 1011, title: "Full Stack Developer", meta: "Remote · 2-5 yrs", company: "Zomato", score: 82, status: "Applied", time: "2h ago" },
  { id: 1007, title: "DevOps Engineer", meta: "Bengaluru · 4-6 yrs", company: "CRED", score: 54, status: "Skipped", time: "1h ago" },
  { id: 1020, title: "Frontend Engineer", meta: "Pune · 3-5 yrs", company: "Swiggy", score: 71, status: "Failed", time: "48m ago" },
  { id: 1021, title: "Node.js Engineer", meta: "Remote · 5-7 yrs", company: "Postman", score: 92, status: "Queued", time: "29m ago" },
  { id: 1022, title: "SRE Engineer", meta: "Bengaluru · 4-7 yrs", company: "Atlassian", score: 91, status: "Queued", time: "51m ago" },
  { id: 1023, title: "Principal Engineer", meta: "Remote · 10-14 yrs", company: "Nutanix", score: 96, status: "Queued", time: "6h ago" },
  { id: 1024, title: "TypeScript Engineer", meta: "Chennai · 3-6 yrs", company: "Kissflow", score: 86, status: "Applied", time: "1h ago" },
  { id: 1025, title: "AI Product Engineer", meta: "Remote · 2-4 yrs", company: "Glean", score: 94, status: "Queued", time: "20m ago" },
  { id: 1026, title: "QA Automation Engineer", meta: "Hyderabad · 3-6 yrs", company: "ServiceNow", score: 78, status: "Queued", time: "2h ago" },
  { id: 1027, title: "Staff Frontend Engineer", meta: "Bengaluru · 8-12 yrs", company: "Myntra", score: 93, status: "Failed", time: "3h ago" },
  { id: 1028, title: "Data Platform Engineer", meta: "Pune · 5-8 yrs", company: "PhonePe", score: 89, status: "Failed", time: "5h ago" },
  { id: 1029, title: "Senior Backend Engineer", meta: "Remote · 6-9 yrs", company: "Razorpay", score: 91, status: "Queued", time: "35m ago" },
  { id: 1030, title: "AI Engineer", meta: "Bengaluru · 2-5 yrs", company: "Sarvam", score: 90, status: "Applied", time: "58m ago" },
  { id: 1031, title: "Growth Engineer", meta: "Mumbai · 3-6 yrs", company: "CRED", score: 72, status: "Skipped", time: "4h ago" },
  { id: 1032, title: "Platform Architect", meta: "Remote · 9-12 yrs", company: "Nagarro", score: 95, status: "Failed", time: "7h ago" }
];

const logEntries = [
  { time: "10:02:14", level: "info", text: "JARVIS started — engine v1.2.0" },
  { time: "10:02:15", level: "info", text: "Loaded profile: engineer@jarvis" },
  { time: "10:02:15", level: "info", text: "Connecting to Naukri session..." },
  { time: "10:02:18", level: "success", text: "Session restored (cookie valid 6h)" },
  { time: "10:02:19", level: "info", text: "Fetching jobs: keywords=['react','node'], location='Remote'" },
  { time: "10:02:24", level: "info", text: "Fetched 47 jobs from page 1" },
  { time: "10:02:25", level: "info", text: "Scoring job-1004 — Senior Frontend Engineer @ Razorpay" },
  { time: "10:02:26", level: "info", text: "Score = 87" },
  { time: "10:02:27", level: "info", text: "Decision: APPLY (threshold 65)" },
  { time: "10:02:31", level: "success", text: "Applied to Razorpay — confirmation #NK-8812" },
  { time: "10:03:02", level: "info", text: "Scoring job-1005 — SDE-II @ Swiggy" },
  { time: "10:03:03", level: "info", text: "Score = 71" },
  { time: "10:03:04", level: "info", text: "Decision: APPLY" },
  { time: "10:03:09", level: "error", text: "CAPTCHA detected on Swiggy application form" },
  { time: "10:03:10", level: "info", text: "Marking job as failed — will retry in 60m" },
  { time: "10:03:22", level: "info", text: "Scoring job-1006 — DevOps Engineer @ CRED" },
  { time: "10:03:23", level: "info", text: "Score = 54" },
  { time: "10:03:23", level: "warning", text: "Skipped (score below threshold 65)" },
  { time: "10:04:01", level: "info", text: "Scoring job-1007 — Full Stack Developer @ Zomato" },
  { time: "10:04:02", level: "info", text: "Score = 82" },
  { time: "10:04:02", level: "success", text: "LLM answers ready (3 screening questions)" },
  { time: "10:04:07", level: "info", text: "Decision: APPLY" },
  { time: "10:04:12", level: "success", text: "Applied to Zomato — confirmation #NK-8819" },
  { time: "10:04:20", level: "info", text: "Queue depth now 47" },
  { time: "10:04:29", level: "info", text: "Scoring job-1008 — Backend Engineer @ Meesho" },
  { time: "10:04:30", level: "info", text: "Score = 76" },
  { time: "10:04:31", level: "info", text: "Decision: APPLY" },
  { time: "10:04:39", level: "success", text: "Applied to Meesho — confirmation #NK-8826" },
  { time: "10:04:46", level: "info", text: "Scoring job-1009 — Platform Engineer @ PhonePe" },
  { time: "10:04:47", level: "info", text: "Score = 88" },
  { time: "10:04:52", level: "error", text: "Timeout while submitting PhonePe application form" }
].reverse();

const defaultSettings = {
  keywords: ["react", "node.js", "typescript", "python"],
  location: "Bengaluru, Remote",
  dailyLimit: 50,
  threshold: 65,
  autoApply: true,
  retryOnFailure: true,
  preferredResume: "ATS Optimized",
  cadence: "Balanced"
};

const storageKey = "jarvis-control-panel-state";

const state = loadState();

const pageRoot = document.getElementById("pageRoot");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebarBackdrop");
const menuButton = document.getElementById("menuButton");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const statusPill = document.getElementById("engineStatusPill");
const statusLabel = document.getElementById("engineStatusLabel");
const clockText = document.getElementById("clockText");
const navItems = Array.from(document.querySelectorAll(".nav-item"));

document.querySelectorAll(".nav-icon").forEach((element) => {
  element.innerHTML = iconMap[element.dataset.icon] || "";
});

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    setRoute(button.dataset.route);
    closeSidebar();
  });
});

menuButton.addEventListener("click", () => {
  sidebar.classList.add("is-open");
  backdrop.classList.add("is-visible");
});

backdrop.addEventListener("click", closeSidebar);

startButton.addEventListener("click", () => {
  if (state.engineStatus === "running") {
    return;
  }
  state.engineStatus = "running";
  prependLog({
    time: formatTimeForLog(new Date()),
    level: "success",
    text: "Run resumed manually from control panel"
  });
  persistState();
  render();
});

stopButton.addEventListener("click", () => {
  if (state.engineStatus === "stopped") {
    return;
  }
  state.engineStatus = "stopped";
  prependLog({
    time: formatTimeForLog(new Date()),
    level: "warning",
    text: "Engine paused manually from control panel"
  });
  persistState();
  render();
});

window.addEventListener("hashchange", () => {
  state.route = getRouteFromHash();
  render();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    closeSidebar();
  }
});

updateClock();
setInterval(updateClock, 1000);
render();

function loadState() {
  const saved = safeParse(localStorage.getItem(storageKey));
  return {
    route: getRouteFromHash(),
    engineStatus: saved?.engineStatus === "running" ? "running" : "stopped",
    queueFilter: saved?.queueFilter || "All",
    queueSearch: saved?.queueSearch || "",
    logFilter: saved?.logFilter || "All",
    logSearch: saved?.logSearch || "",
    settings: {
      ...defaultSettings,
      ...(saved?.settings || {})
    },
    lastSavedAt: saved?.lastSavedAt || Date.now()
  };
}

function persistState() {
  state.lastSavedAt = Date.now();
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      engineStatus: state.engineStatus,
      queueFilter: state.queueFilter,
      queueSearch: state.queueSearch,
      logFilter: state.logFilter,
      logSearch: state.logSearch,
      settings: state.settings,
      lastSavedAt: state.lastSavedAt
    })
  );
}

function safeParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
}

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "").trim();
  return ["dashboard", "queue", "logs", "settings"].includes(route) ? route : "dashboard";
}

function setRoute(route) {
  if (state.route === route) {
    render();
    return;
  }
  state.route = route;
  window.location.hash = route;
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  backdrop.classList.remove("is-visible");
}

function render() {
  updateTopbar();
  updateNav();

  if (state.route === "dashboard") {
    pageRoot.innerHTML = renderDashboard();
  } else if (state.route === "queue") {
    pageRoot.innerHTML = renderQueue();
  } else if (state.route === "logs") {
    pageRoot.innerHTML = renderLogs();
  } else {
    pageRoot.innerHTML = renderSettings();
  }

  bindPageEvents();
}

function updateTopbar() {
  const running = state.engineStatus === "running";
  statusPill.classList.toggle("is-running", running);
  statusLabel.textContent = running ? "Running" : "Stopped";
  startButton.classList.toggle("is-disabled", running);
  stopButton.classList.toggle("is-disabled", !running);
}

function updateClock() {
  const now = new Date();
  clockText.textContent = formatHeaderClock(now);
  const dashboardDate = document.getElementById("dashboardDate");
  if (dashboardDate) {
    dashboardDate.textContent = formatDashboardDate(now);
  }
}

function updateNav() {
  navItems.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === state.route);
  });
}

function renderDashboard() {
  const systemCard = {
    key: "system",
    title: "System",
    value: state.engineStatus === "running" ? "Active" : "Idle",
    meta: state.engineStatus,
    icon: "pulse",
    tone: "is-neutral"
  };

  const stats = [...dashboardMetrics, systemCard]
    .map((metric) => {
      const iconClass = metric.tone ? `card-icon ${metric.tone}` : "card-icon";
      return `
        <article class="stat-card">
          <div class="card-head">
            <p class="card-kicker">${escapeHtml(metric.title)}</p>
            <span class="${iconClass}">${iconMap[metric.icon]}</span>
          </div>
          <div class="card-body">
            <h3 class="card-value">${escapeHtml(metric.value)}</h3>
            <p class="card-meta">${escapeHtml(metric.meta)}</p>
          </div>
        </article>
      `;
    })
    .join("");

  const activity = activityItems
    .map((item) => {
      return `
        <div class="activity-row">
          <span class="status-icon is-${escapeHtml(item.status)}">${iconMap[getStatusIcon(item.status)]}</span>
          <div>
            <p class="activity-title">${escapeHtml(item.title)}</p>
            <p class="activity-meta">${escapeHtml(item.meta)}</p>
          </div>
          <span class="activity-time">${escapeHtml(item.time)}</span>
        </div>
      `;
    })
    .join("");

  const summary = dashboardSummary
    .map((item) => {
      const width = Math.round((item.value / item.total) * 100);
      return `
        <div class="summary-row">
          <div class="summary-head">
            <span>${escapeHtml(item.label)}</span>
            <strong>${item.value} / ${item.total}</strong>
          </div>
          <div class="progress-track">
            <div class="progress-bar is-${escapeHtml(item.tone)}" style="width:${width}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="page-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">Overview</p>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Real-time snapshot of JARVIS engine activity on Naukri.</p>
        </div>
        <div class="page-date">
          <p class="eyebrow">Today</p>
          <strong id="dashboardDate">${formatDashboardDate(new Date())}</strong>
        </div>
      </header>

      <section class="stat-grid">${stats}</section>

      <section class="dashboard-grid">
        <article class="panel-card">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">Recent Activity</h2>
              <p class="panel-subtitle">Last 30 minutes · live</p>
            </div>
            <span class="panel-meta">${activityItems.length} events</span>
          </div>
          <div class="activity-list">${activity}</div>
        </article>

        <article class="panel-card">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">Today's Summary</h2>
              <p class="panel-subtitle">Apply / Skip / Fail breakdown</p>
            </div>
          </div>
          <div class="summary-list">${summary}</div>
          <a class="summary-link" href="#queue">
            <span>View full queue</span>
            <span aria-hidden="true">${iconMap.growth}</span>
          </a>
        </article>
      </section>
    </section>
  `;
}

function renderQueue() {
  const counts = getQueueCounts();
  const filters = ["All", "Queued", "Applied", "Failed", "Skipped"];
  const filtered = getFilteredJobs();

  const controls = filters
    .map((filter) => {
      const count = filter === "All" ? queueJobs.length : counts[filter] || 0;
      return `
        <button class="segment ${state.queueFilter === filter ? "is-active" : ""}" type="button" data-queue-filter="${filter}">
          ${filter} ${count}
        </button>
      `;
    })
    .join("");

  const rows = filtered
    .map((job) => {
      return `
        <tr>
          <td><span class="job-id">#${job.id}</span></td>
          <td>
            <p class="job-title">${escapeHtml(job.title)}</p>
            <p class="job-meta">${escapeHtml(job.meta)}</p>
          </td>
          <td><span class="company-name">${escapeHtml(job.company)}</span></td>
          <td><span class="score-pill">${job.score}</span></td>
          <td>${renderStatusBadge(job.status)}</td>
          <td><span class="timestamp">${escapeHtml(job.time)}</span></td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="page-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">Pipeline</p>
          <h1 class="page-title">Job Queue</h1>
          <p class="page-subtitle">Jobs fetched by the engine with scoring and decisions.</p>
        </div>
      </header>

      <div class="toolbar">
        <div class="segmented-control">${controls}</div>
        <label class="search-shell">
          <span class="search-icon">${iconMap.search}</span>
          <input
            id="queueSearch"
            type="search"
            value="${escapeAttribute(state.queueSearch)}"
            placeholder="Search title, company, ID..."
          />
        </label>
      </div>

      <section class="table-card">
        <div class="table-wrapper">
          <table class="queue-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Score</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderLogs() {
  const counts = getLogCounts();
  const filters = ["All", "Info", "Success", "Warning", "Error"];
  const filtered = getFilteredLogs();

  const controls = filters
    .map((filter) => {
      const count = filter === "All" ? logEntries.length : counts[filter.toLowerCase()] || 0;
      return `
        <button class="segment ${state.logFilter === filter ? "is-active" : ""}" type="button" data-log-filter="${filter}">
          ${filter} ${count}
        </button>
      `;
    })
    .join("");

  const lines = filtered
    .map((entry, index) => {
      return `
        <div class="log-line">
          <span class="log-index">${String(index + 1).padStart(3, "0")}</span>
          <span class="log-time">${escapeHtml(entry.time)}</span>
          <div class="log-text">
            <span class="level-tag is-${escapeHtml(entry.level)}">${entry.level.toUpperCase()}</span>
            <span>${escapeHtml(entry.text)}</span>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="page-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">Diagnostics</p>
          <h1 class="page-title">Logs</h1>
          <p class="page-subtitle">Engine output · newest first · ${logEntries.length} lines</p>
        </div>
      </header>

      <div class="toolbar logs-toolbar">
        <div class="segmented-control">${controls}</div>
        <div class="topbar-actions">
          <label class="search-shell">
            <span class="search-icon">${iconMap.search}</span>
            <input
              id="logSearch"
              type="search"
              value="${escapeAttribute(state.logSearch)}"
              placeholder="grep logs..."
            />
          </label>
          <button class="copy-button" id="copyLogsButton" type="button">
            <span class="copy-icon">${iconMap.copy}</span>
            <span>Copy</span>
          </button>
        </div>
      </div>

      <section class="terminal">
        <div class="terminal-head">
          <div class="terminal-title">
            <div class="terminal-controls" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>jarvis-engine · live</span>
          </div>
          <span class="terminal-stream">streaming</span>
        </div>
        <div class="terminal-body" id="terminalBody">${lines}</div>
      </section>
    </section>
  `;
}

function renderSettings() {
  const settings = state.settings;

  return `
    <section class="page-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">Configuration</p>
          <h1 class="page-title">Settings</h1>
          <p class="page-subtitle">Tune engine behavior. Changes apply immediately and persist locally.</p>
        </div>
      </header>

      <section class="settings-layout">
        <article class="settings-card">
          <h2 class="settings-title">Target Keywords</h2>
          <p class="settings-subtitle">Used by the Naukri scraper to filter jobs.</p>
          <div class="field-row">
            <input
              class="field-input"
              id="keywordInput"
              type="text"
              placeholder="Add keyword (press Enter)"
            />
            <button class="inline-button" id="addKeywordButton" type="button">
              <span aria-hidden="true">${iconMap.plus}</span>
              <span>Add</span>
            </button>
          </div>
          <div class="chips">
            ${settings.keywords.map((keyword) => renderKeywordChip(keyword)).join("")}
          </div>
        </article>

        <div class="settings-grid">
          <article class="settings-card">
            <h2 class="settings-title">Location</h2>
            <p class="settings-subtitle">Comma-separated locations or 'Remote'.</p>
            <div class="field-stack">
              <input
                class="field-input"
                id="locationInput"
                type="text"
                value="${escapeAttribute(settings.location)}"
              />
            </div>
          </article>

          <article class="settings-card">
            <h2 class="settings-title">Daily Application Limit</h2>
            <p class="settings-subtitle">Maximum applications per 24 hours. Resets at midnight IST.</p>
            <div class="field-stack">
              <input
                class="field-input"
                id="limitInput"
                type="number"
                min="1"
                max="500"
                value="${settings.dailyLimit}"
              />
            </div>
          </article>
        </div>

        <article class="settings-card">
          <h2 class="settings-title">Match Score Threshold</h2>
          <p class="settings-subtitle">Jobs below this score will be skipped.</p>
          <div class="slider-row">
            <input
              id="thresholdRange"
              type="range"
              min="0"
              max="100"
              value="${settings.threshold}"
              style="--slider-progress:${settings.threshold}%"
            />
            <span class="slider-value" id="thresholdValue">${settings.threshold}</span>
          </div>
        </article>

        <div class="settings-grid">
          <article class="settings-card">
            <h2 class="settings-title">Auto Apply</h2>
            <p class="settings-subtitle">Master switch. When off, JARVIS only scores jobs but does not submit.</p>
            <div class="toggle-row">
              <div>
                <p class="switch-label">${settings.autoApply ? "Enabled" : "Disabled"}</p>
                <p>${settings.autoApply ? "Applications will submit automatically." : "Only scoring and queueing are active."}</p>
              </div>
              <button class="switch ${settings.autoApply ? "is-on" : ""}" type="button" id="autoApplySwitch" aria-pressed="${settings.autoApply}"></button>
            </div>
          </article>

          <article class="settings-card">
            <h2 class="settings-title">Retry on Failure</h2>
            <p class="settings-subtitle">Retry transient submission errors after cooldown.</p>
            <div class="toggle-row">
              <div>
                <p class="switch-label">${settings.retryOnFailure ? "Enabled" : "Disabled"}</p>
                <p>${settings.retryOnFailure ? "Timeout and network failures will be re-queued." : "Failures stay final until manual review."}</p>
              </div>
              <button class="switch ${settings.retryOnFailure ? "is-on" : ""}" type="button" id="retrySwitch" aria-pressed="${settings.retryOnFailure}"></button>
            </div>
          </article>
        </div>

        <div class="settings-grid">
          <article class="settings-card">
            <h2 class="settings-title">Resume Strategy</h2>
            <p class="settings-subtitle">Choose which resume variant the engine prefers first.</p>
            <div class="field-stack">
              <select class="field-select" id="resumeSelect">
                ${["ATS Optimized", "Product Focused", "Backend Heavy", "Full Stack Hybrid"]
                  .map((option) => `<option ${settings.preferredResume === option ? "selected" : ""}>${option}</option>`)
                  .join("")}
              </select>
            </div>
          </article>

          <article class="settings-card">
            <h2 class="settings-title">Application Cadence</h2>
            <p class="settings-subtitle">Controls how aggressive the engine feels during active runs.</p>
            <div class="field-stack">
              <select class="field-select" id="cadenceSelect">
                ${["Conservative", "Balanced", "Aggressive"]
                  .map((option) => `<option ${settings.cadence === option ? "selected" : ""}>${option}</option>`)
                  .join("")}
              </select>
            </div>
          </article>
        </div>

        <article class="surface-card settings-footer">
          <span class="save-state">Last saved ${formatRelativeSave(state.lastSavedAt)}</span>
          <div class="topbar-actions">
            <button class="action-button action-button-secondary" type="button" id="resetSettingsButton">Reset Defaults</button>
            <button class="action-button action-button-primary" type="button" id="jumpQueueButton">Open Queue</button>
          </div>
        </article>
      </section>
    </section>
  `;
}

function bindPageEvents() {
  if (state.route === "queue") {
    pageRoot.querySelectorAll("[data-queue-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.queueFilter = button.dataset.queueFilter;
        persistState();
        render();
      });
    });

    const search = document.getElementById("queueSearch");
    search.addEventListener("input", (event) => {
      state.queueSearch = event.target.value;
      persistState();
      render();
    });
  }

  if (state.route === "logs") {
    pageRoot.querySelectorAll("[data-log-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.logFilter = button.dataset.logFilter;
        persistState();
        render();
      });
    });

    const search = document.getElementById("logSearch");
    search.addEventListener("input", (event) => {
      state.logSearch = event.target.value;
      persistState();
      render();
    });

    const copyButton = document.getElementById("copyLogsButton");
    copyButton.addEventListener("click", async () => {
      const text = getFilteredLogs()
        .map((entry) => `[${entry.time}] ${entry.level.toUpperCase()} ${entry.text}`)
        .join("\n");

      try {
        await navigator.clipboard.writeText(text);
        copyButton.querySelector("span:last-child").textContent = "Copied";
        setTimeout(() => {
          const label = copyButton.querySelector("span:last-child");
          if (label) {
            label.textContent = "Copy";
          }
        }, 1200);
      } catch (error) {
        copyButton.querySelector("span:last-child").textContent = "Unavailable";
      }
    });

    const terminalBody = document.getElementById("terminalBody");
    terminalBody.scrollTop = 0;
  }

  if (state.route === "settings") {
    const keywordInput = document.getElementById("keywordInput");
    const addKeywordButton = document.getElementById("addKeywordButton");
    const locationInput = document.getElementById("locationInput");
    const limitInput = document.getElementById("limitInput");
    const thresholdRange = document.getElementById("thresholdRange");
    const autoApplySwitch = document.getElementById("autoApplySwitch");
    const retrySwitch = document.getElementById("retrySwitch");
    const resumeSelect = document.getElementById("resumeSelect");
    const cadenceSelect = document.getElementById("cadenceSelect");
    const resetButton = document.getElementById("resetSettingsButton");
    const jumpQueueButton = document.getElementById("jumpQueueButton");

    const addKeyword = () => {
      const next = keywordInput.value.trim().toLowerCase();
      if (!next || state.settings.keywords.includes(next)) {
        keywordInput.value = "";
        return;
      }
      state.settings.keywords = [...state.settings.keywords, next];
      keywordInput.value = "";
      persistState();
      render();
    };

    addKeywordButton.addEventListener("click", addKeyword);
    keywordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addKeyword();
      }
    });

    pageRoot.querySelectorAll("[data-remove-keyword]").forEach((button) => {
      button.addEventListener("click", () => {
        state.settings.keywords = state.settings.keywords.filter(
          (keyword) => keyword !== button.dataset.removeKeyword
        );
        persistState();
        render();
      });
    });

    locationInput.addEventListener("input", (event) => {
      state.settings.location = event.target.value;
      persistState();
      updateSaveTimestamp();
    });

    limitInput.addEventListener("input", (event) => {
      const value = Math.max(1, Math.min(500, Number(event.target.value) || 1));
      state.settings.dailyLimit = value;
      persistState();
      updateSaveTimestamp();
    });

    thresholdRange.addEventListener("input", (event) => {
      state.settings.threshold = Number(event.target.value);
      persistState();
      render();
    });

    autoApplySwitch.addEventListener("click", () => {
      state.settings.autoApply = !state.settings.autoApply;
      persistState();
      render();
    });

    retrySwitch.addEventListener("click", () => {
      state.settings.retryOnFailure = !state.settings.retryOnFailure;
      persistState();
      render();
    });

    resumeSelect.addEventListener("change", (event) => {
      state.settings.preferredResume = event.target.value;
      persistState();
      updateSaveTimestamp();
    });

    cadenceSelect.addEventListener("change", (event) => {
      state.settings.cadence = event.target.value;
      persistState();
      updateSaveTimestamp();
    });

    resetButton.addEventListener("click", () => {
      state.settings = { ...defaultSettings };
      persistState();
      render();
    });

    jumpQueueButton.addEventListener("click", () => setRoute("queue"));
  }

  pageRoot.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      setRoute(anchor.getAttribute("href").replace("#", ""));
    });
  });
}

function updateSaveTimestamp() {
  const label = pageRoot.querySelector(".save-state");
  if (label) {
    label.textContent = `Last saved ${formatRelativeSave(state.lastSavedAt)}`;
  }
}

function getQueueCounts() {
  return queueJobs.reduce(
    (counts, job) => {
      counts[job.status] = (counts[job.status] || 0) + 1;
      return counts;
    },
    {}
  );
}

function getFilteredJobs() {
  const search = state.queueSearch.trim().toLowerCase();
  return queueJobs.filter((job) => {
    const matchesFilter = state.queueFilter === "All" || job.status === state.queueFilter;
    if (!matchesFilter) {
      return false;
    }
    if (!search) {
      return true;
    }
    return [job.title, job.company, job.meta, `#${job.id}`]
      .join(" ")
      .toLowerCase()
      .includes(search);
  });
}

function getLogCounts() {
  return logEntries.reduce(
    (counts, entry) => {
      counts[entry.level] = (counts[entry.level] || 0) + 1;
      return counts;
    },
    { info: 0, success: 0, warning: 0, error: 0 }
  );
}

function getFilteredLogs() {
  const filter = state.logFilter.toLowerCase();
  const search = state.logSearch.trim().toLowerCase();
  return logEntries.filter((entry) => {
    const matchesFilter = filter === "all" || entry.level === filter;
    if (!matchesFilter) {
      return false;
    }
    if (!search) {
      return true;
    }
    return `${entry.time} ${entry.level} ${entry.text}`.toLowerCase().includes(search);
  });
}

function prependLog(entry) {
  logEntries.unshift(entry);
  if (logEntries.length > 60) {
    logEntries.pop();
  }
}

function renderStatusBadge(status) {
  const tone = status.toLowerCase();
  const icon = tone === "applied" ? "check" : tone === "failed" ? "x" : tone === "queued" ? "queued" : "skipped";
  return `<span class="badge is-${tone}">${iconMap[icon]}${escapeHtml(status)}</span>`;
}

function renderKeywordChip(keyword) {
  return `
    <span class="chip">
      ${escapeHtml(keyword)}
      <button type="button" aria-label="Remove ${escapeHtml(keyword)}" data-remove-keyword="${escapeAttribute(keyword)}">×</button>
    </span>
  `;
}

function getStatusIcon(status) {
  if (status === "success") {
    return "check";
  }
  if (status === "danger") {
    return "x";
  }
  return "skipped";
}

function formatHeaderClock(date) {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const dayNumber = date.getDate();
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
  return `${day}, ${month} ${String(dayNumber).padStart(2, "0")} ${time}`;
}

function formatDashboardDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit"
  }).format(date);
}

function formatTimeForLog(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

function formatRelativeSave(timestamp) {
  const diff = Date.now() - timestamp;
  if (diff < 5000) {
    return "just now";
  }
  const minutes = Math.round(diff / 60000);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

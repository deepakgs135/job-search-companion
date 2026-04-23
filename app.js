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
  refresh: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11a8 8 0 1 0 2 5.5"></path>
      <path d="M20 4v7h-7"></path>
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
  location: "Bangalore, Chennai, Hyderabad",
  dailyLimit: 50,
  threshold: 65,
  autoApply: true,
  retryOnFailure: true,
  preferredResume: "ATS Optimized",
  cadence: "Balanced"
};

const storageKey = "jarvis-control-panel-state";
const backendOrigin = window.location.protocol === "file:"
  ? "http://127.0.0.1:5000"
  : window.location.origin;

const state = loadState();
let runtimeRequest = null;

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
  startDiscovery();
});

stopButton.addEventListener("click", () => {
  setRoute("queue");
});

window.addEventListener("hashchange", () => {
  state.route = getRouteFromHash();
  fetchRuntimeData();
  render();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    closeSidebar();
  }
});

updateClock();
setInterval(updateClock, 1000);
setInterval(() => {
  fetchRuntimeData();
}, 4000);
fetchRuntimeData();
render();

function loadState() {
  const saved = safeParse(localStorage.getItem(storageKey));
  return {
    route: getRouteFromHash(),
    queueFilter: saved?.queueFilter || "All",
    queueSearch: saved?.queueSearch || "",
    logFilter: saved?.logFilter || "All",
    logSearch: saved?.logSearch || "",
    settings: {
      ...defaultSettings,
      ...(saved?.settings || {})
    },
    lastSavedAt: saved?.lastSavedAt || Date.now(),
    backendStatus: "loading",
    runtimeError: "",
    runtime: createEmptyRuntime()
  };
}

function persistState() {
  state.lastSavedAt = Date.now();
  localStorage.setItem(
    storageKey,
    JSON.stringify({
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

function createEmptyRuntime() {
  return {
    generatedAt: null,
    jobs: [],
    jobsCount: 0,
    discovery: {
      running: false,
      startedAt: null,
      finishedAt: null,
      lastResult: null,
      lastError: "",
      locations: [],
      progress: {
        currentLocation: null,
        currentPage: 0,
        jobsFound: 0,
        jobsSaved: 0,
        lastMessage: "",
        updatedAt: null
      }
    },
    logs: [],
    session: {
      connected: false,
      authenticated: false,
      hasState: false,
      cookieCount: 0,
      originCount: 0
    },
    files: {
      jobs: {
        path: "app/data/jobs.json",
        exists: false,
        updatedAt: null,
        size: 0
      },
      state: {
        path: "state.json",
        exists: false,
        updatedAt: null,
        size: 0
      }
    }
  };
}

function buildApiUrl(path) {
  return `${backendOrigin}${path}`;
}

async function fetchRuntimeData() {
  if (runtimeRequest) {
    return runtimeRequest;
  }

  runtimeRequest = (async () => {
    try {
      const response = await fetch(buildApiUrl("/api/runtime"), {
        cache: "no-store",
        mode: "cors"
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      state.runtime = {
        ...createEmptyRuntime(),
        ...data,
        discovery: {
          ...createEmptyRuntime().discovery,
          ...(data.discovery || {}),
          progress: {
            ...createEmptyRuntime().discovery.progress,
            ...((data.discovery || {}).progress || {})
          }
        },
        session: {
          ...createEmptyRuntime().session,
          ...(data.session || {})
        },
        files: {
          ...createEmptyRuntime().files,
          ...(data.files || {})
        },
        logs: Array.isArray(data.logs) ? data.logs : []
      };
      state.backendStatus = "connected";
      state.runtimeError = "";
      render();
    } catch (error) {
      state.backendStatus = "disconnected";
      state.runtimeError = window.location.protocol === "file:"
        ? `Unable to reach Flask backend at ${backendOrigin}. Start it with "python main.py" and keep it running.`
        : error.message;
      render();
    }
  })();

  try {
    await runtimeRequest;
  } finally {
    runtimeRequest = null;
  }
}

function parseConfiguredLocations() {
  return stringOrEmpty(state.settings.location)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function isDiscoveryRunning() {
  return Boolean(state.runtime?.discovery?.running);
}

async function startDiscovery() {
  if (isDiscoveryRunning()) {
    setRoute("queue");
    return;
  }

  try {
    const response = await fetch(buildApiUrl("/api/discovery/start"), {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        locations: parseConfiguredLocations()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    await fetchRuntimeData();
    setRoute("queue");
  } catch (error) {
    state.runtimeError = error.message;
    render();
  }
}

function stringOrEmpty(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseDate(value) {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeStatus(value) {
  const normalized = stringOrEmpty(value).toLowerCase();
  if (!normalized) {
    return "Discovered";
  }
  if (["queued", "pending"].includes(normalized)) {
    return "Queued";
  }
  if (["applied", "submitted", "success"].includes(normalized)) {
    return "Applied";
  }
  if (["failed", "error"].includes(normalized)) {
    return "Failed";
  }
  if (["skipped", "ignored", "ignore"].includes(normalized)) {
    return "Skipped";
  }
  if (["discovered", "scraped", "fetched"].includes(normalized)) {
    return "Discovered";
  }
  return normalized
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function getJobs() {
  return (Array.isArray(state.runtime?.jobs) ? state.runtime.jobs : [])
    .map((job, index) => normalizeJob(job, index))
    .sort((left, right) => {
      const leftValue = left.scrapedAt ? left.scrapedAt.getTime() : 0;
      const rightValue = right.scrapedAt ? right.scrapedAt.getTime() : 0;
      return rightValue - leftValue;
    });
}

function normalizeJob(job, index) {
  const scoreCandidate = Number(job.score ?? job.match_score ?? job.relevance_score);
  const score = Number.isFinite(scoreCandidate) ? Math.round(scoreCandidate) : null;
  const scrapedAt = parseDate(job.scraped_at || job.updated_at);
  const postedDate = stringOrEmpty(job.posted_date);
  const location = stringOrEmpty(job.location);
  const experience = stringOrEmpty(job.experience);
  const meta = [location, experience, postedDate].filter(Boolean).join(" | ");

  return {
    raw: job,
    id: String(job.job_id || job.id || index + 1),
    title: stringOrEmpty(job.title) || "Untitled role",
    company: stringOrEmpty(job.company || job.companyName) || "Unknown company",
    location,
    experience,
    meta: meta || "Location and experience unavailable",
    score,
    scoreLabel: score === null ? "--" : String(score),
    status: normalizeStatus(job.status || job.pipeline_status || job.apply_status),
    skills: Array.isArray(job.skills) ? job.skills.filter(Boolean) : [],
    scrapedAt,
    time: scrapedAt ? formatRelativeTime(scrapedAt) : (postedDate || "Unknown"),
    scrapedStamp: scrapedAt ? scrapedAt.toISOString() : "",
    postedDate,
    jobUrl: stringOrEmpty(job.job_url)
  };
}

function formatRelativeTime(value) {
  const date = value instanceof Date ? value : parseDate(value);
  if (!date) {
    return "Unknown";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 1) {
    return "just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function getStatusCounts(jobs) {
  return jobs.reduce((counts, job) => {
    counts[job.status] = (counts[job.status] || 0) + 1;
    return counts;
  }, {});
}

function getStatusFilters(jobs) {
  const priority = ["Queued", "Discovered", "Applied", "Failed", "Skipped"];
  const statuses = [...new Set(jobs.map((job) => job.status))];
  return statuses.sort((left, right) => {
    const leftIndex = priority.indexOf(left);
    const rightIndex = priority.indexOf(right);
    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }
    if (leftIndex === -1) {
      return 1;
    }
    if (rightIndex === -1) {
      return -1;
    }
    return leftIndex - rightIndex;
  });
}

function getFilteredJobs(jobs = getJobs()) {
  const search = state.queueSearch.trim().toLowerCase();
  return jobs.filter((job) => {
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

function buildDashboardMetrics(jobs) {
  const uniqueCompanies = new Set(jobs.map((job) => job.company).filter(Boolean));
  const uniqueLocations = new Set(jobs.map((job) => job.location).filter(Boolean));
  const sessionConnected = Boolean(state.runtime?.session?.authenticated || state.runtime?.session?.connected);

  return [
    {
      title: "Jobs Discovered",
      value: String(jobs.length),
      meta: state.runtime?.files?.jobs?.exists ? "live jobs file" : "jobs file missing",
      icon: "stack",
      tone: jobs.length ? "is-success" : ""
    },
    {
      title: "Companies",
      value: String(uniqueCompanies.size),
      meta: "unique employers",
      icon: "growth",
      tone: ""
    },
    {
      title: "Locations",
      value: String(uniqueLocations.size),
      meta: "active markets",
      icon: "pulse",
      tone: "is-warning"
    },
    {
      title: "Naukri Session",
      value: sessionConnected ? "Connected" : "Disconnected",
      meta: `${state.runtime?.session?.cookieCount || 0} cookies`,
      icon: sessionConnected ? "check" : "x",
      tone: sessionConnected ? "is-success" : "is-danger"
    }
  ];
}

function buildActivityItems(jobs) {
  const items = [];
  const sessionConnected = Boolean(state.runtime?.session?.authenticated || state.runtime?.session?.connected);
  const discovery = state.runtime?.discovery || createEmptyRuntime().discovery;
  const progress = discovery.progress || createEmptyRuntime().discovery.progress;

  items.push({
    status: state.backendStatus === "connected" ? "success" : "danger",
    title: state.backendStatus === "connected" ? "Runtime endpoint reachable" : "Runtime endpoint unavailable",
    meta: state.runtimeError || "Frontend is synced with the local backend payload.",
    time: state.runtime?.generatedAt ? formatRelativeTime(state.runtime.generatedAt) : "now"
  });

  items.push({
    status: sessionConnected ? "success" : "danger",
    title: sessionConnected ? "Naukri session is authenticated" : "Naukri session is not authenticated",
    meta: sessionConnected
      ? `${state.runtime?.session?.cookieCount || 0} auth cookies available`
      : "Login again to restore the saved session.",
    time: state.runtime?.files?.state?.updatedAt ? formatRelativeTime(state.runtime.files.state.updatedAt) : "now"
  });

  if (discovery.running) {
    items.push({
      status: "neutral",
      title: "Discovery run in progress",
      meta: progress.lastMessage
        || (
          discovery.locations?.length
            ? `Collecting jobs for ${discovery.locations.join(", ")}`
            : "Collecting jobs from configured locations."
        ),
      time: progress.updatedAt
        ? formatRelativeTime(progress.updatedAt)
        : (discovery.startedAt ? formatRelativeTime(discovery.startedAt) : "now")
    });
    items.push({
      status: "success",
      title: `${progress.jobsSaved || 0} jobs saved live to queue`,
      meta: progress.currentLocation
        ? `${progress.currentLocation} | page ${progress.currentPage || 0} | ${progress.jobsFound || 0} discovered`
        : `${progress.jobsFound || 0} discovered so far`,
      time: progress.updatedAt
        ? formatRelativeTime(progress.updatedAt)
        : "now"
    });
  } else if (discovery.lastResult || discovery.lastError) {
    items.push({
      status: discovery.lastError ? "danger" : "success",
      title: discovery.lastError ? "Last discovery run failed" : "Last discovery run completed",
      meta: discovery.lastError
        ? discovery.lastError
        : `${discovery.lastResult?.total_jobs_saved || 0} jobs saved from ${discovery.lastResult?.total_jobs_found || 0} discovered`,
      time: discovery.finishedAt ? formatRelativeTime(discovery.finishedAt) : "now"
    });
  }

  if (state.runtime?.files?.jobs?.exists) {
    items.push({
      status: "neutral",
      title: "Jobs file detected",
      meta: `${jobs.length} jobs loaded from ${state.runtime.files.jobs.path}`,
      time: state.runtime.files.jobs.updatedAt ? formatRelativeTime(state.runtime.files.jobs.updatedAt) : "now"
    });
  }

  jobs.slice(0, 5).forEach((job) => {
    items.push({
      status: "success",
      title: `Discovered ${job.title}`,
      meta: `${job.company} | ${job.meta}`,
      time: job.time
    });
  });

  return items.slice(0, 8);
}

function buildSummaryItems(jobs) {
  const counts = getStatusCounts(jobs);
  const total = jobs.length || 1;
  const entries = getStatusFilters(jobs).map((status) => ({
    label: status,
    value: counts[status] || 0,
    total,
    tone: status === "Applied" ? "success" : status === "Failed" ? "danger" : "neutral"
  }));

  return entries.length
    ? entries
    : [{ label: "Discovered", value: 0, total: 1, tone: "neutral" }];
}

function buildRuntimeLogs() {
  const runtimeLogs = Array.isArray(state.runtime?.logs) ? state.runtime.logs : [];
  if (runtimeLogs.length) {
    return runtimeLogs.map((entry) => ({
      time: entry.time ? formatTimeForLog(new Date(entry.time)) : "--:--:--",
      level: stringOrEmpty(entry.level).toLowerCase() || "info",
      text: stringOrEmpty(entry.text) || "Runtime event"
    }));
  }

  const jobs = getJobs();
  const logs = [];
  const sessionConnected = Boolean(state.runtime?.session?.authenticated || state.runtime?.session?.connected);

  logs.push({
    time: state.runtime?.generatedAt ? formatTimeForLog(new Date(state.runtime.generatedAt)) : "--:--:--",
    level: state.backendStatus === "connected" ? "success" : "error",
    text: state.backendStatus === "connected"
      ? "Runtime payload loaded from /api/runtime"
      : `Runtime payload unavailable: ${state.runtimeError || "unknown error"}`
  });

  logs.push({
    time: state.runtime?.files?.jobs?.updatedAt ? formatTimeForLog(new Date(state.runtime.files.jobs.updatedAt)) : "--:--:--",
    level: state.runtime?.files?.jobs?.exists ? "success" : "warning",
    text: state.runtime?.files?.jobs?.exists
      ? `Loaded ${jobs.length} jobs from ${state.runtime.files.jobs.path}`
      : "app/data/jobs.json is missing or empty"
  });

  logs.push({
    time: state.runtime?.files?.state?.updatedAt ? formatTimeForLog(new Date(state.runtime.files.state.updatedAt)) : "--:--:--",
    level: sessionConnected ? "success" : "warning",
    text: sessionConnected
      ? `Authenticated Naukri session detected (${state.runtime?.session?.cookieCount || 0} cookies)`
      : "No authenticated Naukri session found"
  });

  jobs.slice(0, 12).forEach((job) => {
    logs.push({
      time: job.scrapedAt ? formatTimeForLog(job.scrapedAt) : "--:--:--",
      level: "info",
      text: `Discovered ${job.title} @ ${job.company}`
    });
  });

  return logs;
}

function getLogCounts(logs = buildRuntimeLogs()) {
  return logs.reduce(
    (counts, entry) => {
      counts[entry.level] = (counts[entry.level] || 0) + 1;
      return counts;
    },
    { info: 0, success: 0, warning: 0, error: 0 }
  );
}

function getFilteredLogs(logs = buildRuntimeLogs()) {
  const filter = state.logFilter.toLowerCase();
  const search = state.logSearch.trim().toLowerCase();
  return logs.filter((entry) => {
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

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "").trim();
  return ["dashboard", "queue", "logs", "settings"].includes(route) ? route : "dashboard";
}

function setRoute(route) {
  if (state.route === route) {
    fetchRuntimeData();
    render();
    return;
  }
  state.route = route;
  fetchRuntimeData();
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
  const sessionConnected = Boolean(state.runtime?.session?.authenticated || state.runtime?.session?.connected);
  const backendConnected = state.backendStatus === "connected";
  const discoveryRunning = Boolean(state.runtime?.discovery?.running);
  const progress = state.runtime?.discovery?.progress || createEmptyRuntime().discovery.progress;
  const statusText = !backendConnected
    ? "Offline"
    : discoveryRunning
      ? "Running"
      : sessionConnected
        ? "Ready"
        : "Disconnected";
  const startLabel = startButton.querySelector("span:last-child");
  const stopLabel = stopButton.querySelector("span:last-child");
  const startIcon = startButton.querySelector(".action-icon");
  const stopIcon = stopButton.querySelector(".action-icon");
  const platformStats = document.querySelectorAll(".platform-stats span");

  statusPill.classList.toggle("is-running", discoveryRunning || sessionConnected);
  statusLabel.textContent = statusText;
  startButton.classList.toggle("is-disabled", discoveryRunning || !backendConnected);
  stopButton.classList.remove("is-disabled");
  startButton.disabled = discoveryRunning || !backendConnected;
  stopButton.disabled = false;

  if (startLabel) {
    startLabel.textContent = discoveryRunning ? "Discovery Running" : "Start Discovery";
  }
  if (stopLabel) {
    stopLabel.textContent = "Open Queue";
  }
  if (startIcon) {
    startIcon.innerHTML = discoveryRunning ? iconMap.queued : iconMap.refresh;
  }
  if (stopIcon) {
    stopIcon.innerHTML = iconMap.queue;
  }
  if (platformStats[0]) {
    platformStats[0].textContent = `${state.runtime?.jobsCount || 0} jobs`;
  }
  if (platformStats[1]) {
    platformStats[1].textContent = discoveryRunning
      ? `${progress.jobsSaved || 0} saved`
      : statusText;
  }
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
  const jobs = getJobs();
  const metrics = buildDashboardMetrics(jobs);
  const activityItems = buildActivityItems(jobs);
  const summaryItems = buildSummaryItems(jobs);

  const stats = metrics
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

  const summary = summaryItems
    .map((item) => {
      const width = item.total ? Math.round((item.value / item.total) * 100) : 0;
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
              <p class="panel-subtitle">Live runtime signals and latest discovered jobs</p>
            </div>
            <span class="panel-meta">${activityItems.length} events</span>
          </div>
          <div class="activity-list">${activity || `
            <div class="activity-row">
              <span class="status-icon is-neutral">${iconMap.skipped}</span>
              <div>
                <p class="activity-title">No runtime activity yet</p>
                <p class="activity-meta">Once jobs are discovered, recent events will appear here.</p>
              </div>
              <span class="activity-time">now</span>
            </div>
          `}</div>
        </article>

        <article class="panel-card">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">Queue Summary</h2>
              <p class="panel-subtitle">Breakdown from the current real job queue</p>
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
  const jobs = getJobs();
  const counts = getStatusCounts(jobs);
  const filters = ["All", ...getStatusFilters(jobs)];

  if (!filters.includes(state.queueFilter)) {
    state.queueFilter = "All";
  }

  const filtered = getFilteredJobs(jobs);

  const controls = filters
    .map((filter) => {
      const count = filter === "All" ? jobs.length : counts[filter] || 0;
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
            <p class="job-title">${job.jobUrl ? `<a href="${escapeAttribute(job.jobUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(job.title)}</a>` : escapeHtml(job.title)}</p>
            <p class="job-meta">${escapeHtml(job.meta)}</p>
          </td>
          <td><span class="company-name">${escapeHtml(job.company)}</span></td>
          <td><span class="score-pill ${job.score === null ? "is-empty" : ""}">${job.scoreLabel}</span></td>
          <td>${renderStatusBadge(job.status)}</td>
          <td><span class="timestamp">${escapeHtml(job.time)}</span></td>
        </tr>
      `;
    })
    .join("") || `
      <tr>
        <td colspan="6" style="padding: 28px 24px; text-align: center; color: #6f7b94;">
          No real jobs found yet. Run discovery so the queue can populate from backend data.
        </td>
      </tr>
    `;

  return `
    <section class="page-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">Pipeline</p>
          <h1 class="page-title">Job Queue</h1>
          <p class="page-subtitle">Jobs loaded from the current runtime payload, without any sample rows.</p>
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
  const logs = buildRuntimeLogs();
  const logEntries = logs;
  const counts = getLogCounts(logs);
  const filters = ["All", "Info", "Success", "Warning", "Error"];
  const filtered = getFilteredLogs(logs);

  const controls = filters
    .map((filter) => {
      const count = filter === "All" ? logs.length : counts[filter.toLowerCase()] || 0;
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
    .join("") || `
      <div class="log-line">
        <span class="log-index">001</span>
        <span class="log-time">--:--:--</span>
        <div class="log-text">
          <span class="level-tag is-warning">WARNING</span>
          <span>No real runtime events are available yet.</span>
        </div>
      </div>
    `;

  return `
    <section class="page-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">Diagnostics</p>
          <h1 class="page-title">Logs</h1>
          <p class="page-subtitle">Runtime-derived diagnostics | newest first | ${logEntries.length} lines</p>
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
            <span>jarvis-engine | live</span>
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
  const runtime = state.runtime || createEmptyRuntime();
  const discovery = runtime.discovery || createEmptyRuntime().discovery;
  const backendConnected = state.backendStatus === "connected";
  const naukriConnected = Boolean(runtime.session?.connected || runtime.session?.authenticated);
  const backendLabel = state.backendStatus === "loading" ? "Checking" : backendConnected ? "Connected" : "Disconnected";
  const naukriLabel = naukriConnected ? "Connected" : "Disconnected";
  const discoveryLabel = discovery.running
    ? "Running"
    : discovery.lastError
      ? "Failed"
      : discovery.lastResult
        ? "Completed"
        : "Idle";

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
        <div class="settings-grid">
          <article class="settings-card">
            <h2 class="settings-title">Backend Connection</h2>
            <p class="settings-subtitle">Live runtime state from the local server.</p>
            <div class="connection-stack">
              <div class="connection-row">
                <span class="connection-label">Frontend -> Backend</span>
                ${renderConnectionBadge(backendLabel)}
              </div>
              <div class="connection-meta">
                <span>Last sync</span>
                <strong>${runtime.generatedAt ? formatRuntimeTimestamp(runtime.generatedAt) : "Waiting for first sync"}</strong>
              </div>
              <div class="connection-meta">
                <span>Jobs file</span>
                <strong>${runtime.files?.jobs?.exists ? `${runtime.jobsCount} loaded` : "Missing"}</strong>
              </div>
              <div class="connection-meta">
                <span>Discovery</span>
                <strong>${discoveryLabel}</strong>
              </div>
              <div class="connection-meta">
                <span>Locations</span>
                <strong>${discovery.locations?.length ? escapeHtml(discovery.locations.join(", ")) : "Default scope"}</strong>
              </div>
              ${state.runtimeError ? `<p class="connection-hint">Runtime endpoint error: ${escapeHtml(state.runtimeError)}</p>` : ""}
            </div>
          </article>

          <article class="settings-card">
            <h2 class="settings-title">Naukri Session</h2>
            <p class="settings-subtitle">Derived from the saved browser session and auth cookies.</p>
            <div class="connection-stack">
              <div class="connection-row">
                <span class="connection-label">Naukri</span>
                ${renderConnectionBadge(naukriLabel)}
              </div>
              <div class="connection-meta">
                <span>Authenticated cookies</span>
                <strong>${runtime.session?.cookieCount || 0}</strong>
              </div>
              <div class="connection-meta">
                <span>Storage state</span>
                <strong>${runtime.session?.hasState ? "Available" : "Missing"}</strong>
              </div>
              <div class="connection-meta">
                <span>Origin snapshots</span>
                <strong>${runtime.session?.originCount || 0}</strong>
              </div>
            </div>
          </article>
        </div>

        <article class="settings-card">
          <h2 class="settings-title">Scoring Keywords</h2>
          <p class="settings-subtitle">Stored locally for future AI scoring. Discovery itself does not filter by keyword.</p>
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
            <p class="settings-subtitle">Comma-separated locations used for broad Naukri discovery.</p>
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

function renderStatusBadge(status) {
  const tone = status.toLowerCase();
  const icon = tone === "applied"
    ? "check"
    : tone === "failed"
      ? "x"
      : tone === "queued"
        ? "queued"
        : tone === "discovered"
          ? "stack"
          : "skipped";
  return `<span class="badge is-${tone}">${iconMap[icon]}${escapeHtml(status)}</span>`;
}

function renderConnectionBadge(status) {
  const normalized = status.toLowerCase();
  const tone = normalized === "connected" ? "applied" : normalized === "checking" ? "queued" : "failed";
  const icon = tone === "applied" ? "check" : tone === "queued" ? "queued" : "x";
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

function formatRuntimeTimestamp(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) {
    return "Unknown";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
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

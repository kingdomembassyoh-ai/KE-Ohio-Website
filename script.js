// Nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  // Close nav when a link is clicked (mobile)
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });
}

// Dropdown menu
const dropdown = document.querySelector(".nav-dropdown");
if (dropdown) {
  const toggleBtn = dropdown.querySelector(".nav-dropdown-toggle");
  const menu = dropdown.querySelector(".nav-dropdown-menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// =========
// Live Strip Logic
// =========
//
// Shows the "Watch Live on YouTube" strip only during:
// - Sunday Worship Encounter:    Sunday, 3:00 PM – 7:00 PM
// - Tuesday Bible Study:         Tuesday, 6:00 PM – 9:30 PM
// - Thursday Prophetic Service:  Thursday, 6:00 PM – 9:30 PM

(function () {
  const liveStrip = document.getElementById("liveStrip");
  if (!liveStrip) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ... 6 = Sat
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();

  const services = [
    // Sunday Worship Encounter: 3:00 PM – 7:00 PM
    { day: 0, start: 15 * 60, end: 19 * 60 },

    // Tuesday Bible Study: 6:00 PM – 9:30 PM
    { day: 2, start: 18 * 60, end: 21 * 60 + 30 },

    // Thursday Prophetic Service: 6:00 PM – 9:30 PM
    { day: 4, start: 18 * 60, end: 21 * 60 + 30 },
  ];

  const isLive = services.some(
    (s) => s.day === day && minutesSinceMidnight >= s.start && minutesSinceMidnight <= s.end
  );

  if (isLive) {
    liveStrip.classList.add("live-strip--active");
  }
})();

// =========
// Next Service Countdown
// =========
//
// Shows the next upcoming service and a "Starts in Xd Xh Xm" countdown.

(function () {
  const bar = document.getElementById("nextServiceBar");
  const nameEl = document.getElementById("nextServiceName");
  const countdownEl = document.getElementById("nextServiceCountdown");

  if (!bar || !nameEl || !countdownEl) return;

  const services = [
    { day: 0, hour: 15, minute: 0, name: "Sunday Worship Encounter" },   // Sun 3:00 PM
    { day: 2, hour: 18, minute: 0, name: "Tuesday Bible Study" },         // Tue 6:00 PM
    { day: 4, hour: 18, minute: 0, name: "Thursday Prophetic Service" },  // Thu 6:00 PM
  ];

  function getNextService(fromDate) {
    let nextService = null;

    services.forEach((svc) => {
      const candidate = new Date(fromDate);
      const currentDay = candidate.getDay();
      const diffDays = (svc.day - currentDay + 7) % 7;

      candidate.setDate(candidate.getDate() + diffDays);
      candidate.setHours(svc.hour, svc.minute, 0, 0);

      // If this time is in the past for today, push to next week
      if (candidate <= fromDate) {
        candidate.setDate(candidate.getDate() + 7);
      }

      if (!nextService || candidate < nextService.date) {
        nextService = { ...svc, date: candidate };
      }
    });

    return nextService;
  }

  function formatDiff(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    if (totalSeconds <= 0) return "starting now";

    const days = Math.floor(totalSeconds / (24 * 3600));
    let remainder = totalSeconds % (24 * 3600);
    const hours = Math.floor(remainder / 3600);
    remainder = remainder % 3600;
    const minutes = Math.floor(remainder / 60);

    const parts = [];
    if (days > 0) parts.push(days + "d");
    if (hours > 0) parts.push(hours + "h");
    parts.push(minutes + "m");

    return parts.join(" ");
  }

  function updateCountdown() {
    const now = new Date();
    const upcoming = getNextService(now);

    if (!upcoming) {
      bar.style.display = "none";
      return;
    }

    const diff = upcoming.date - now;
    bar.style.display = "inline-flex";
    nameEl.textContent = upcoming.name;
    countdownEl.textContent = "· Starts in " + formatDiff(diff);
  }

  updateCountdown();
  // Update every 30 seconds
  setInterval(updateCountdown, 30000);
})();

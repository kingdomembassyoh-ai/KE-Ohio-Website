// Simple site scripts: mobile nav, dropdown, dynamic year

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const body = document.body;

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      body.classList.toggle("nav-open");
    });
  }

  // Close nav when clicking a link (on mobile)
  const navLinks = document.querySelectorAll(".nav a, .nav-dropdown-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
    });
  });

  // Dropdown menu
  document.querySelectorAll(".nav-dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".nav-dropdown");
      parent.classList.toggle("open");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    const dropdowns = document.querySelectorAll(".nav-dropdown");
    dropdowns.forEach((dd) => {
      if (!dd.contains(event.target)) {
        dd.classList.remove("open");
      }
    });
  });

  // Dynamic year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

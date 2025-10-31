const THEME_KEY = "theme-mode"; // "system" | "dark" | "light"
const themeSelect = document.getElementById("themeSelect");
const media = window.matchMedia("(prefers-color-scheme: dark)");

const getSavedMode = () => {
  return localStorage.getItem(THEME_KEY) || "system";
};

const setSavedMode = (mode) => {
  localStorage.setItem(THEME_KEY, mode);
};

const applyMode = (mode) => {
  document.body.classList.remove("dark", "light");
  if (mode === "dark") {
    document.body.classList.add("dark");
  } else if (mode === "light") {
    document.body.classList.add("light");
  }
};

const syncUI = (mode) => {
  themeSelect.value = mode;
};

// Initialize
let mode = getSavedMode();
applyMode(mode);
syncUI(mode);

// handle select change
themeSelect.addEventListener("change", (e) => {
  mode = e.target.value;
  setSavedMode(mode);
  applyMode(mode);
});

// react to system changes if mode === system
media.addEventListener("change", () => {
  if (getSavedMode() === "system") {
    applyMode("system");
  }
});

// Back to top button
const topBtn = document.querySelector("#topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 100 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

topBtn.style.position = "fixed";
topBtn.style.bottom = "1rem";
topBtn.style.right = "1rem";

// Scroll animations
const targets = document.querySelectorAll(
  "footer, hr, img, #table1, header, section, .reveal"
);

targets.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(16px)";
  el.style.transition = "opacity 900ms ease, transform 900ms ease";
});

const reveal = (entry) => {
  const el = entry.target;
  if (entry.isIntersecting) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  } else {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
  }
};

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => entries.forEach(reveal), {
    threshold: 0.15,
  });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
}

// Typing effect
window.onload = () => {
  document.querySelectorAll("body *").forEach((el) => {
    const text = el.textContent.trim();
    if (text && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      el.textContent = "";
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text[i++];
          setTimeout(type, 70);
        }
      };
      type();
    }
  });
};

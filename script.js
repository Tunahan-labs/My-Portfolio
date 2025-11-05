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

//submit form
document.querySelector("form").addEventListener("submit", function (e) {
  const form = e.target;

  // Check if form is valid using built-in browser validation
  if (form.checkValidity()) {
    e.preventDefault(); // Prevent actual submission
    alert("✅ Your message has been submitted successfully!");
    form.reset(); // Optional: clear the form
  }
});

//Showcase my projects on the projects section
const projects = [
  {
    name: "To-Do List",
    description: "A simple to-do list application to manage daily tasks.",
    category: "web",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Stack Game",
    description: "A fun and interactive stack game built with JavaScript.",
    category: "game",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Image editor",
    description:
      "An image editing application with various filters and effects.",
    category: "web",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Maze Game",
    description: "A maze navigation game where players find their way out.",
    category: "game",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Pong Game",
    description: "A classic Pong game built with HTML5 Canvas.",
    category: "game",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Calculator",
    description: "A simple calculator application built with JavaScript.",
    category: "web",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Notes",
    description:
      "A note-taking app that allows users to create and manage notes.",
    category: "web",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Tic-Tac-Toe",
    description: "A classic Tic-Tac-Toe game with a two-player mode.",
    category: "game",
    link: "https://github.com/Tunahan-labs",
  },
  {
    name: "Hangman Game",
    description: "A classic Hangman game built with HTML5 Canvas.",
    category: "game",
    link: "https://github.com/Tunahan-labs",
  },
];

const gallery = document.getElementById("projectGallery");
const buttons = document.querySelectorAll("#projectFilters button");

function renderProjects(filter = "all") {
  gallery.innerHTML = "";
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  filtered.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">View Project</a>
    `;
    gallery.appendChild(card);
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    renderProjects(btn.dataset.filter);
  });
});

renderProjects();

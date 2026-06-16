# DevFolio — Premium Developer Portfolio

Welcome to **DevFolio**, my professional developer portfolio website designed to showcase my academic accomplishments, software internships, technical credentials, and engineering projects in a sleek, highly interactive single-page application.

Live Site: *(Configure your GitHub Pages link here once deployed!)*

---

## 🚀 The AI-Powered Learning Journey

This project was built as a core hands-on exercise in mastering modern AI-native developer tooling, version control, and collaborative coding.

* **Powered by Antigravity:** Developed in collaboration with **Antigravity**, Google DeepMind's agentic coding assistant. 
* **AI IDE & "Vibe Coding":** The architecture, responsive styling layouts, performance optimizations (such as shifting from scroll stutters to the `IntersectionObserver` API), and bug debugging were completed using modern prompt-driven iteration ("Vibe Coding") inside an AI-assisted IDE.
* **Git & GitHub Integration:** This repository builds upon my recent [Git & GitHub Learning Journey](https://github.com/SKSingh655/Git-Learning-Journey) to establish automated deployments directly from code workspace to live web hosting.

---

## 🛠️ Tech Stack & Architecture

To prioritize speed, clean accessibility, and master engineering fundamentals, this website relies on zero frameworks or heavy libraries:

* **Structure:** Semantic HTML5.
* **Styling:** Vanilla CSS3 utilizing CSS Custom Properties (variables) for theme tokens, Flexbox/Grid for responsive structural alignment, and hardware-accelerated transitions.
* **Logic:** Modern Vanilla JavaScript (ES6) for DOM manipulations.
* **Data Layer:** A clean, decoupled `projects.json` file acting as a static API, allowing projects to be updated or expanded without altering core HTML structures.
* **Aesthetics:** Sleek dark-mode aesthetic by default (with a light-mode toggle), glassmorphic card overlays, neon glowing active states, and custom animated scrollbars.

---

## ✨ Key Features

1. **Buttery-Smooth Animations (60 FPS):** Powered by the native browser `IntersectionObserver` API. Elements fade and translate upwards asynchronously without causing main-thread layout thrashing during scrolls.
2. **Decoupled Project Loading:** Project cards are fetched asynchronously and injected dynamically into a filterable grid.
3. **Light/Dark Mode Toggler:** Seamless theme swapping that automatically persists your choice in the browser's `localStorage`.
4. **Dynamic Typing Effect:** An interactive typing animation in the hero banner cycling through core specializations.
5. **Serverless Contact Form:** Fully integrated with **Web3Forms** using async fetch submissions, input validation, and user feedback indicators.
6. **Responsive Web Design (RWD):** Fluid layout breakpoints optimized across mobile, tablet, and wide desktop screens.

---

## 💻 Running Locally

You can run a lightweight local server to test and preview updates. Since the website fetches `projects.json` dynamically, running it through a local server is required to bypass CORS restrictions.

1. Ensure you have **Python** installed.
2. Open your terminal in the project directory.
3. Start the built-in HTTP server:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and navigate to: **`http://localhost:8000`**

---

## 🌐 Deploying to GitHub Pages

Since this portfolio is built with pure static files, it can be hosted for **free** on GitHub Pages:

1. Stage, commit, and push your files:
   ```bash
   git add .
   git commit -m "Initial commit: Premium developer portfolio"
   git push origin main
   ```
2. Navigate to your repository on GitHub.
3. Go to **Settings** -> **Pages** (under Code and automation).
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Set the branch to `main` (or `master`) and folder to `/ (root)`, then click **Save**.
6. Your portfolio will be live at `https://<your-username>.github.io/DevFolio/` within a couple of minutes!

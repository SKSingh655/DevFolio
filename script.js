document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        const isMenuOpen = navMenu.classList.contains('active');
        icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
        lucide.createIcons();
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  // ==========================================================================
  // LIGHT / DARK THEME TOGGLER
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ==========================================================================
  // SCROLL-REVEAL ON SCROLL ANIMATION (OPTIMIZED USING INTERSECTION OBSERVER)
  // ==========================================================================
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, revealOptions);

  const reveals = document.querySelectorAll('.card, .section-header, .about-bio, .about-education');
  reveals.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================================================
  // TYPING ANIMATION (HERO SECTION)
  // ==========================================================================
  const typingTextSpan = document.getElementById('typing-text');
  const roles = [
    "AI Chatbots & Agents",
    "Automation Workflows",
    "Data Analysis Scripts",
    "Modern Web Apps"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!typingTextSpan) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Speed up when deleting
    } else {
      typingTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Default typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeRole, typingSpeed);
  }

  // Start the typing animation
  if (typingTextSpan) {
    setTimeout(typeRole, 1000);
  }

  // ==========================================================================
  // ABOUT SECTION TABS (EDUCATION vs CERTIFICATIONS)
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Deactivate all buttons & panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Activate clicked button & corresponding panel
      button.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // DYNAMIC PROJECTS LOADING & FILTERING
  // ==========================================================================
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let projectsData = [];

  // Fallback data in case json fetch fails (e.g. locally opened file:// protocol)
  const localProjectsFallback = [
    {
      "title": "IBM EduGuide Campus Assistant",
      "subtitle": "AI Research Project",
      "category": "ai",
      "tags": ["IBM Watsonx", "NLP", "IBM Cloud", "Python"],
      "description": "Researched and deployed an intelligent campus chatbot using IBM Watsonx Assistant. Designed conversational flows handling 15+ query categories, serving 500+ students with a 60% reduction in response time.",
      "github": "#",
      "live": "#",
      "status": "Completed"
    },
    {
      "title": "Git & GitHub Learning Journey",
      "subtitle": "Version Control Mastery",
      "category": "tools",
      "tags": ["Git", "GitHub", "Collaboration", "Markdown"],
      "description": "A comprehensive repository documenting my path to mastering version control systems. Details branching strategies, merging, pull requests, and standard developer workflows.",
      "github": "https://github.com/SKSingh655/Git-Learning-Journey",
      "live": "https://github.com/SKSingh655/Git-Learning-Journey",
      "status": "Completed"
    },
    {
      "title": "GlobalPlus AI (GlobePulse)",
      "subtitle": "AI-Powered News Platform",
      "category": "ai",
      "tags": ["Flask", "Generative AI", "Vector DB", "NLP"],
      "description": "An intelligent global news platform designed to aggregate worldwide news, generate AI-powered summaries, translate content dynamically, and deliver personalized feeds based on user interests.",
      "github": "https://github.com/SKSingh655/GlobePulse-flask",
      "live": "#",
      "status": "Upcoming"
    }
  ];

  function renderProjects(projectsToRender) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    if (projectsToRender.length === 0) {
      projectsGrid.innerHTML = `<p class="no-projects">No projects found in this category.</p>`;
      return;
    }

    projectsToRender.forEach(proj => {
      const card = document.createElement('div');
      card.className = `project-card card reveal-item`;
      card.setAttribute('data-category', proj.category);

      const statusBadge = proj.status.toLowerCase() === 'upcoming' 
        ? `<span class="badge project-status upcoming"><span class="pulse-dot"></span> In Progress</span>`
        : `<span class="badge project-status"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Completed</span>`;

      const githubLink = proj.github && proj.github !== '#' 
        ? `<a href="${proj.github}" target="_blank" rel="noopener" class="project-link"><i data-lucide="github" class="project-link-icon"></i> Code</a>`
        : `<span class="project-link disabled" title="Repository not yet published"><i data-lucide="lock" class="project-link-icon"></i> Code</span>`;

      const liveLink = proj.live && proj.live !== '#'
        ? `<a href="${proj.live}" target="_blank" rel="noopener" class="project-link"><i data-lucide="external-link" class="project-link-icon"></i> Demo</a>`
        : ``;

      const tagsHtml = proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

      card.innerHTML = `
        ${statusBadge}
        <h3 class="project-title">${proj.title}</h3>
        <span class="project-subtitle">${proj.subtitle}</span>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-links">
          ${githubLink}
          ${liveLink}
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Observe newly rendered dynamic project cards
    const newCards = projectsGrid.querySelectorAll('.card');
    newCards.forEach(card => {
      revealObserver.observe(card);
    });

    // Re-initialize Lucide icons for dynamically added elements
    lucide.createIcons();
  }

  // Load projects from JSON file
  fetch('projects.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      projectsData = data;
      renderProjects(projectsData);
    })
    .catch(err => {
      console.warn('Failed to fetch projects.json, loading fallback projects:', err);
      projectsData = localProjectsFallback;
      renderProjects(projectsData);
    });

  // Filter project cards
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      
      if (filterValue === 'all') {
        renderProjects(projectsData);
      } else {
        const filtered = projectsData.filter(p => p.category === filterValue);
        renderProjects(filtered);
      }
    });
  });



  // ==========================================================================
  // CONTACT FORM AJAX SUBMISSION (WEB3FORMS)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formResult = document.getElementById('form-result');

  if (contactForm && formResult) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      formResult.textContent = "Sending message...";
      formResult.className = "form-result"; // Reset classes

      const formData = new FormData(contactForm);
      const json = JSON.stringify(Object.fromEntries(formData));

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
          formResult.textContent = "Thank you! Your message was sent successfully.";
          formResult.classList.add('success');
          contactForm.reset();
        } else {
          console.log(response);
          formResult.textContent = res.message || "Something went wrong. Please try again.";
          formResult.classList.add('error');
        }
      })
      .catch(error => {
        console.error(error);
        formResult.textContent = "Form submission failed. Please check your internet connection.";
        formResult.classList.add('error');
      })
      .then(() => {
        // Clear message after 5 seconds
        setTimeout(() => {
          formResult.textContent = "";
          formResult.className = "form-result";
        }, 5000);
      });
    });
  }
});

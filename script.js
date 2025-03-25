document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initializeApp();
});

/**
 * Initialize all app features
 */
function initializeApp() {
  // Remove loading overlay
  const loadingOverlay = document.querySelector('.loading-overlay');
  setTimeout(() => {
    loadingOverlay.classList.add('hidden');
  }, 1000);

  // Setup all features
  setupCardHoverEffects();
  setupCTAButtons();
  setupQuestionItems();
  setupThemeToggle();
  setupNavigation();
  setupChatInterface();
  setupIntersectionObserver();
  setupKeyboardNavigation();
  setupPerformanceOptimizations();
}

/**
 * Setup intersection observer for animations
 */
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Observe cards and features
  document.querySelectorAll('.card, .feature').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
  // Handle escape key for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open modals or dropdowns
      document.querySelectorAll('.modal, .dropdown').forEach(el => {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
        }
      });
    }
  });

  // Handle tab key for focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
}

/**
 * Setup performance optimizations
 */
function setupPerformanceOptimizations() {
  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      // Handle scroll events here
      updateScrollProgress();
    });
  });
}

/**
 * Update scroll progress indicator
 */
function updateScrollProgress() {
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.style.width = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`;
  
  let existingProgress = document.querySelector('.scroll-progress');
  if (existingProgress) {
    existingProgress.remove();
  }
  
  document.body.appendChild(scrollProgress);
}

/**
 * Add enhanced hover effects to the cards
 */
function setupCardHoverEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add a slight glow effect to the card's icon on hover
      const cardIcon = card.querySelector('.card-icon');
      if (cardIcon) {
        cardIcon.style.transform = 'scale(1.05)';
        cardIcon.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove the glow effect when mouse leaves
      const cardIcon = card.querySelector('.card-icon');
      if (cardIcon) {
        cardIcon.style.transform = '';
        cardIcon.style.boxShadow = '';
      }
    });
  });
}

/**
 * Setup the CTA buttons interactions
 */
function setupCTAButtons() {
  const primaryButtons = document.querySelectorAll('.primary-btn');
  const secondaryButtons = document.querySelectorAll('.secondary-btn');
  const cardButtons = document.querySelectorAll('.card-btn');
  
  // Add click effect to primary buttons
  primaryButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
      
      // For demo purposes, you can add an actual action here
      console.log('Primary button clicked');
    });
  });
  
  // Add click effect to secondary buttons
  secondaryButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
      
      // Add scroll to features section when "Learn More" is clicked
      if (button.textContent.includes('Learn More')) {
        const featuresSection = document.querySelector('.features');
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Add click effect to card buttons
  cardButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
      
      // Get the card title to know which bot was selected
      const card = button.closest('.card');
      const cardTitle = card.querySelector('.card-title').textContent;
      console.log(`Signing in to chat with: ${cardTitle}`);
    });
  });
}

/**
 * Setup question items interaction
 */
function setupQuestionItems() {
  const questionItems = document.querySelectorAll('.question-item');
  
  questionItems.forEach(item => {
    item.addEventListener('click', () => {
      // Add a brief highlight effect
      item.style.backgroundColor = 'rgba(98, 0, 234, 0.2)';
      setTimeout(() => {
        item.style.backgroundColor = '';
      }, 300);
      
      // Get the question text
      const questionText = item.textContent;
      console.log(`Question selected: ${questionText}`);
      
      // In a real application, this would open a chat with the selected question
    });
  });
}

/**
 * Setup theme toggle functionality
 */
function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    themeToggle.setAttribute('aria-pressed', savedTheme === 'light');
  } else {
    document.body.classList.toggle('light-mode', !prefersDarkScheme.matches);
    themeToggle.setAttribute('aria-pressed', !prefersDarkScheme.matches);
  }
  
  // Handle theme toggle click
  themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    themeToggle.setAttribute('aria-pressed', isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  });
  
  // Listen for system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.body.classList.toggle('light-mode', !e.matches);
      themeToggle.setAttribute('aria-pressed', !e.matches);
    }
  });
}

/**
 * Setup navigation with smooth scroll and active state
 */
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');
  
  // Update active state on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Smooth scroll for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Setup chat interface connection
 */
function setupChatInterface() {
  const cardButtons = document.querySelectorAll('.card-btn');
  const questionItems = document.querySelectorAll('.question-item');
  
  const handleChatRedirect = (data) => {
    // Store the data
    localStorage.setItem('chatData', JSON.stringify(data));
    
    // Show loading state
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.classList.remove('hidden');
    
    // Redirect after a short delay
    setTimeout(() => {
      const button = event.target;
      const href = button.closest('a').getAttribute('href');
      window.location.href = href;
    }, 500);
  };
  
  cardButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      const cardTitle = card.querySelector('.card-title').textContent;
      const cardSubtitle = card.querySelector('.card-subtitle').textContent;
      
      handleChatRedirect({
        type: 'bot',
        title: cardTitle,
        subtitle: cardSubtitle,
        timestamp: new Date().toISOString()
      });
    });
  });
  
  questionItems.forEach(item => {
    item.addEventListener('click', () => {
      const questionText = item.textContent;
      
      handleChatRedirect({
        type: 'question',
        text: questionText,
        timestamp: new Date().toISOString()
      });
    });
  });
}

// Button ripple effect
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.card-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => ripple.remove(), 600);
      
      // Add loading state
      this.classList.add('loading');
      
      // Simulate loading (remove this in production and handle with actual API calls)
      setTimeout(() => {
        this.classList.remove('loading');
        // Handle navigation or other actions here
        const href = this.closest('a').getAttribute('href');
        window.location.href = href;
      }, 1000);
    });
  });
});

// Handle iframe interaction
document.addEventListener('DOMContentLoaded', () => {
  const iframeContainer = document.querySelector('.iframe-container');
  const body = document.body;

  if (iframeContainer) {
    iframeContainer.addEventListener('click', () => {
      if (!iframeContainer.classList.contains('maximized')) {
        iframeContainer.classList.add('maximized');
        body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
      }
    });
  }
});

// Handle escape key press
function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    const iframeContainer = document.querySelector('.iframe-container');
    
    if (iframeContainer.classList.contains('maximized')) {
      iframeContainer.classList.remove('maximized');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }
}

// Auth Modal Functionality
const authModal = document.querySelector('.auth-modal');
const loginBtn = document.querySelector('.login-btn');
const closeModal = document.querySelector('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const welcomeMessage = document.querySelector('.welcome-message');

// Modal Toggle
loginBtn.addEventListener('click', () => {
  authModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
  authModal.classList.remove('active');
  document.body.style.overflow = '';
});

authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Tab Switch
authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    authTabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Show corresponding form
    if (tab.dataset.form === 'login') {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    } else {
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    }
  });
});

// Password Toggle
togglePasswordBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    const type = input.getAttribute('type');
    input.setAttribute('type', type === 'password' ? 'text' : 'password');
    btn.innerHTML = type === 'password' ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
  });
});

// Show Welcome Message
function showWelcomeMessage(firstName) {
  document.getElementById('welcomeFirstName').textContent = firstName;
  welcomeMessage.classList.add('active');
  setTimeout(() => {
    welcomeMessage.classList.remove('active');
    document.body.style.overflow = '';
  }, 3000);
}

// Update Hero Name
function updateHeroName(firstName) {
  document.getElementById('heroFirstName').textContent = firstName;
}

// Form Submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = loginForm.querySelector('input[type="text"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;
  const submitBtn = loginForm.querySelector('.auth-submit');
  
  try {
    submitBtn.classList.add('loading');
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      
      setTimeout(() => {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
        showWelcomeMessage(user.firstName);
        updateHeroName(user.firstName);
        updateLoginButton(user.firstName);
      }, 1000);
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    submitBtn.classList.remove('loading');
    showError(loginForm, error.message);
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = registerForm.querySelector('.auth-submit');
  
  try {
    submitBtn.classList.add('loading');
    
    // Get form data
    const formData = {
      firstName: registerForm.querySelector('input[placeholder="First Name"]').value,
      lastName: registerForm.querySelector('input[placeholder="Last Name"]').value,
      username: registerForm.querySelector('input[placeholder="Username"]').value,
      email: registerForm.querySelector('input[type="email"]').value,
      password: registerForm.querySelector('input[type="password"]').value,
      yearOfStudy: registerForm.querySelector('input[placeholder="Year of Study"]').value,
      college: registerForm.querySelector('input[placeholder="College"]').value
    };
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username exists
    if (users.some(u => u.username === formData.username)) {
      throw new Error('Username already exists');
    }
    
    // Add new user
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    setTimeout(() => {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
      showWelcomeMessage(formData.firstName);
      updateHeroName(formData.firstName);
      updateLoginButton(formData.firstName);
    }, 1000);
  } catch (error) {
    submitBtn.classList.remove('loading');
    showError(registerForm, error.message);
  }
});

// Show Error Message
function showError(form, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'auth-error';
  errorDiv.textContent = message;
  
  // Remove any existing error message
  const existingError = form.querySelector('.auth-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  form.insertBefore(errorDiv, form.querySelector('button'));
  
  // Add shake animation
  form.classList.add('error');
  setTimeout(() => form.classList.remove('error'), 500);
  
  // Remove error message after 3 seconds
  setTimeout(() => errorDiv.remove(), 3000);
}

// Update Login Button
function updateLoginButton(name) {
  const loginBtn = document.querySelector('.login-btn');
  loginBtn.textContent = name;
  loginBtn.onclick = () => {
    if (confirm('Do you want to log out?')) {
      localStorage.removeItem('currentUser');
      loginBtn.textContent = 'Login';
      loginBtn.onclick = () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      updateHeroName('there');
    }
  };
}

// Check for existing user on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateHeroName(currentUser.firstName);
    updateLoginButton(currentUser.firstName);
  }
});
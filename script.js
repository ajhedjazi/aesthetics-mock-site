/* ============================================
   Lumière Aesthetics Clinic - JavaScript
   Premium Aesthetics & Permanent Makeup Clinic
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  /* ============================================
     1. STICKY NAVIGATION ON SCROLL
     ============================================ */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Trigger initial check
  window.dispatchEvent(new Event('scroll'));
  
  
  /* ============================================
     2. MOBILE MENU TOGGLE
     ============================================ */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');
  
  mobileToggle.addEventListener('click', function() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  
  /* ============================================
     3. SMOOTH SCROLLING FOR ANCHOR LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  
  /* ============================================
     4. FAQ ACCORDION
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  
  /* ============================================
     5. BACK TO TOP FUNCTIONALITY
     ============================================ */
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  
  /* ============================================
     6. SCROLL REVEAL ANIMATIONS
     ============================================ */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('visible');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Listen for scroll
  window.addEventListener('scroll', revealOnScroll);
  
  
  /* ============================================
     7. CONTACT FORM HANDLING
     ============================================ */
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // Simple validation
      if (!data.name || !data.email || !data.treatment) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Show success message (in production, this would send to a server)
      alert('Thank you for your enquiry! We will be in touch within 24 hours.\n\nTreatment: ' + data.treatment + '\nName: ' + data.name);
      
      // Reset form
      this.reset();
    });
  }
  
  /* ============================================
   8. ACTIVE NAV LINK HIGHLIGHTING
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', function() {
  const scrollY = window.pageYOffset;

  navLinks.forEach(link => link.classList.remove('active'));

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 140;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
    }
  });
});
  
  /* ============================================
     9. PARALLAX EFFECT FOR HERO (SUBTLE)
     ============================================ */
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroVisual = document.querySelector('.hero-visual');
      
      if (heroVisual && scrolled < heroSection.offsetHeight) {
        heroVisual.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
      }
    });
  }
  
  
  /* ============================================
     10. TREATMENT CARD HOVER ENHANCEMENT
     ============================================ */
  const treatmentCards = document.querySelectorAll('.treatment-card');
  
  treatmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  
  /* ============================================
     11. MOBILE SCROLL TO TOP ON LOAD
     ============================================ */
  // Reset scroll position on page load
  window.scrollTo(0, 0);
  
  
  /* ============================================
     12. ACCESSIBILITY - KEYBOARD NAVIGATION
     ============================================ */
  // Ensure focus states are visible
  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--brown-warm)';
      this.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
  
  
  /* ============================================
     13. LAZY LOADING FOR IMAGES (IF ADDED)
     ============================================ */
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  
  /* ============================================
     14. SMOOTH PAGE TRANSITION (OPTIONAL)
     ============================================ */
  // Add fade-in effect on page load
  document.body.style.opacity = '0';
  window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
  
  
  /* ============================================
     15. WINDOW RESIZE HANDLER
     ============================================ */
  let resizeTimer;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Recalculate any dynamic elements
      window.dispatchEvent(new Event('scroll'));
    }, 250);
  });
  
  
  /* ============================================
     16. PRINT STYLES (FOR BROCHURE MODE)
     ============================================ */
  window.addEventListener('beforeprint', function() {
    // Hide non-essential elements for printing
    document.querySelectorAll('.mobile-floating-cta, .back-to-top, .mobile-menu').forEach(el => {
      el.style.display = 'none';
    });
  });
  
  window.addEventListener('afterprint', function() {
    // Restore elements after printing
    document.querySelectorAll('.mobile-floating-cta, .back-to-top, .mobile-menu').forEach(el => {
      el.style.display = '';
    });
  });
  
  
  /* ============================================
     CONSOLE BRANDING
     ============================================ */
  console.log('%c✨ Lumière Aesthetics Clinic', 'font-size: 20px; font-weight: bold; color: #4A3422;');
  console.log('%cPremium Aesthetics & Permanent Makeup in Hull, UK', 'font-size: 14px; color: #875D3B;');
  console.log('%cWebsite ready for video walkthrough 📹', 'font-size: 12px; color: #2B2B2B;');
  
});
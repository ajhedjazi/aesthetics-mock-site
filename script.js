/* ============================================
   Aesthetic Flow Demo - JavaScript
   Premium clinic-style sales demo for beauty brands
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const demoBanner = document.querySelector('.demo-banner');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');
  const contactForm = document.getElementById('contactForm');
  const heroSection = document.querySelector('.hero');
  const revealElements = document.querySelectorAll('.reveal');
  const faqItems = document.querySelectorAll('.faq-item');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function getStickyOffset() {
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const bannerHeight = demoBanner ? demoBanner.offsetHeight : 0;
    return navHeight + bannerHeight;
  }

  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  window.dispatchEvent(new Event('scroll'));

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      const isOpen = dropdown.classList.contains('open');

      dropdowns.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Desktop hover support for dropdowns
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth >= 992) {
        dropdowns.forEach(other => {
          other.classList.remove('open');
          other.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
        dropdown.classList.add('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'true');
      }
    });

    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth >= 992) {
        // Small delay to allow moving to dropdown menu
        setTimeout(() => {
          if (!dropdown.matches(':hover')) {
            dropdown.classList.remove('open');
            dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
          }
        }, 150);
      }
    });
  });

  // Keep dropdown open when hovering the menu itself
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');
  if (dropdownMenu) {
    dropdownMenu.addEventListener('mouseenter', function() {
      const dropdown = this.closest('.nav-dropdown');
      if (dropdown && window.innerWidth >= 992) {
        dropdown.classList.add('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'true');
      }
    });

    dropdownMenu.addEventListener('mouseleave', function() {
      const dropdown = this.closest('.nav-dropdown');
      if (dropdown && window.innerWidth >= 992) {
        dropdown.classList.remove('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  mobileGroups.forEach(group => {
    const toggle = group.querySelector('.mobile-nav-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function() {
      const isOpen = group.classList.contains('open');

      mobileGroups.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.mobile-nav-toggle')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        group.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      e.preventDefault();
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - getStickyOffset();

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) {
      return;
    }

    question.addEventListener('click', function() {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      item.classList.toggle('active');
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

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

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      if (!data.name || !data.email || !data.treatment) {
        alert('Please fill in all required fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const generalEmail = this.dataset.generalEmail || 'hello@aestheticflow.co.uk';
      const reviewEmail = this.dataset.reviewEmail || 'reviews@aestheticflow.co.uk';
      const targetEmail = data.treatment === 'website-review' ? reviewEmail : generalEmail;
      const subject = data.treatment === 'website-review' ? 'Website Review Request' : 'Website Enquiry';
      const body = [
        'Name: ' + data.name,
        'Email: ' + data.email,
        'Request type: ' + data.treatment,
        '',
        'Message:',
        data.message || 'No message provided.'
      ].join('\n');

      window.location.href = 'mailto:' + encodeURIComponent(targetEmail)
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      alert('Your email app should open with your message addressed to ' + targetEmail + '.');
      this.reset();
    });
  }

  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;

    navLinks.forEach(link => link.classList.remove('active'));

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - getStickyOffset() - 40;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
      }
    });
  });

  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroVisual = document.querySelector('.hero-visual');

      if (heroVisual && scrolled < heroSection.offsetHeight) {
        heroVisual.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
      }
    });
  }

  document.querySelectorAll('.treatment-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  window.scrollTo(0, 0);

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

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
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

  document.body.style.opacity = '0';
  window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      window.dispatchEvent(new Event('scroll'));
      revealOnScroll();
    }, 250);
  });

  window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.mobile-floating-cta, .back-to-top, .mobile-menu').forEach(el => {
      el.style.display = 'none';
    });
  });

  window.addEventListener('afterprint', function() {
    document.querySelectorAll('.mobile-floating-cta, .back-to-top, .mobile-menu').forEach(el => {
      el.style.display = '';
    });
  });

  console.log('%cAesthetic Flow Demo Website', 'font-size: 20px; font-weight: bold; color: #4A3422;');
  console.log('%cPremium clinic-style sales demo for aesthetics and beauty businesses', 'font-size: 14px; color: #875D3B;');
  console.log('%cBuilt to show how better structure can drive more enquiries', 'font-size: 12px; color: #2B2B2B;');
});

document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  document.documentElement.classList.remove('no-js');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');
  const faqItems = document.querySelectorAll('.faq-item');
  const revealItems = document.querySelectorAll('.reveal');
  const pageAnchors = document.querySelectorAll('a[href^="#"]');
  const forms = document.querySelectorAll('form[data-mail-target], form[data-general-email]');

  function updateNavbarState() {
    if (!navbar) {
      return;
    }
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateBackToTopState() {
    if (!backToTop) {
      return;
    }
    backToTop.classList.toggle('visible', window.scrollY > 300);
  }

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('open');
      dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMobileMenu() {
    if (!mobileToggle || !mobileMenu) {
      return;
    }
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
  }

  updateNavbarState();
  updateBackToTopState();
  window.addEventListener('scroll', updateNavbarState);
  window.addEventListener('scroll', updateBackToTopState);

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(function(item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function(item) {
      item.classList.add('visible');
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      const isOpen = dropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeAllDropdowns();
      closeMobileMenu();
    }
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      body.classList.toggle('menu-open', mobileMenu.classList.contains('active'));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
  }

  mobileGroups.forEach((group) => {
    const toggle = group.querySelector('.mobile-nav-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function() {
      const isOpen = group.classList.contains('open');
      mobileGroups.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.mobile-nav-toggle')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        group.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  pageAnchors.forEach((anchor) => {
    anchor.addEventListener('click', function(event) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#') === false) {
        return;
      }
      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      closeMobileMenu();

      const offset = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 18;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) {
      return;
    }

    question.addEventListener('click', function() {
      const wasOpen = item.classList.contains('active');
      faqItems.forEach((other) => other.classList.remove('active'));
      if (!wasOpen) {
        item.classList.add('active');
      }
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const generalEmail = form.dataset.generalEmail || form.dataset.mailTarget || 'hello@aestheticflow.co.uk';
      const reviewEmail = form.dataset.reviewEmail || 'reviews@aestheticflow.co.uk';
      const routeValue = form.dataset.routeField ? data[form.dataset.routeField] : form.dataset.route || '';
      const targetEmail = routeValue === 'website-review' ? reviewEmail : generalEmail;
      const subject = routeValue === 'website-review'
        ? 'Website Review Request'
        : (form.dataset.subject || 'Website Enquiry');

      const lines = [];
      Object.entries(data).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const label = key.replace(/[-_]/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
        lines.push(label + ': ' + value);
      });

      const body = encodeURIComponent(lines.join('\n'));
      const mailto = 'mailto:' + encodeURIComponent(targetEmail)
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + body;

      window.location.href = mailto;
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

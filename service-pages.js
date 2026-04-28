document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');
  const faqItems = document.querySelectorAll('.faq-item');

  window.addEventListener('scroll', function() {
    if (!navbar) {
      return;
    }

    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  window.dispatchEvent(new Event('scroll'));

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      const isOpen = dropdown.classList.contains('open');

      dropdowns.forEach((other) => {
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

    // Desktop hover support for dropdowns
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth >= 992) {
        dropdowns.forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
        dropdown.classList.add('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'true');
      }
    });

    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth >= 992) {
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
      dropdowns.forEach((dropdown) => {
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

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
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
      } else {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) {
      return;
    }

    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');

      faqItems.forEach((other) => {
        other.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
});

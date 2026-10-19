(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  /* Sticky nav background on scroll */
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Mobile menu toggle */
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  /* Close mobile menu on link click */
  navAnchors.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  /* Active nav link highlighting */
  function setActiveLink() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* Fade-in on scroll */
  var fadeElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-grid, .skills-grid, ' +
    '.project-card, .timeline-item, .edu-grid, .certs, .contact-grid, .hero-content > *'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
})();

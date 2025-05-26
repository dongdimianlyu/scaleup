document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  function showSection(hash) {
    sections.forEach(section => {
      section.classList.remove('active');
    });
    const target = document.querySelector(hash);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      showSection(this.getAttribute('href'));
      history.replaceState(null, '', this.getAttribute('href'));
    });
  });

  // On page load, show section based on hash
  if (window.location.hash) {
    const hash = window.location.hash;
    const link = document.querySelector(`.nav-link[href='${hash}']`);
    if (link) {
      link.classList.add('active');
      showSection(hash);
    }
  }

  // Scroll-triggered fade-in/slide-up for sections
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.page-section').forEach(section => {
    observer.observe(section);
  });

  // Cool scroll transition for hero section
  const hero = document.querySelector('.hero');
  function onScroll() {
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < window.innerHeight * 0.4) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});

/* =============================================
   ARPIT THAKUR — RESUME SITE
   script.js — Fixed & Cleaned
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ─────────────────────────
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing) {
    // Raw mouse position (dot snaps here immediately)
    let mouseX = -100, mouseY = -100;
    // Ring lags behind with lerp
    let ringX  = -100, ringY  = -100;

    // Snap dot instantly; ring follows via rAF lerp
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot: instant snap — use style directly (no transition on position)
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });

    // Ring smooth follow via requestAnimationFrame
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover grow on interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .skill-card, .project-card, .cert-item, .aside-card, .edu-item, .contact-row, .nav-logo, .download-btn'
    );
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('is-hovering');
        cursorRing.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('is-hovering');
        cursorRing.classList.remove('is-hovering');
      });
    });

    // Hide when mouse exits browser window
    document.addEventListener('mouseleave', () => {
      cursorDot.classList.add('is-hidden');
      cursorRing.classList.add('is-hidden');
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.classList.remove('is-hidden');
      cursorRing.classList.remove('is-hidden');
    });
  }


  // ─── NAVBAR SCROLL ───────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  // ─── HAMBURGER / MOBILE MENU ─────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const closeMenu = () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }


  // ─── SMOOTH SCROLL ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ─── SCROLL REVEAL ───────────────────────────
  const allReveal = document.querySelectorAll('.reveal-up, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    allReveal.forEach(el => revealObs.observe(el));
  } else {
    allReveal.forEach(el => el.classList.add('visible'));
  }

  // Hard fallback after 3s
  setTimeout(() => {
    allReveal.forEach(el => el.classList.add('visible'));
  }, 3000);


  // ─── HERO ENTRANCE ───────────────────────────
  const heroEls = document.querySelectorAll('#hero .reveal-up, #hero .reveal-right');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 110);
  });


  // ─── ACTIVE NAV HIGHLIGHT ────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const activeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            a.style.color = (a.getAttribute('href') === '#' + id) ? 'var(--accent)' : '';
          });
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(s => activeObs.observe(s));
  }


  // ─── PARALLAX — HERO BG TEXT ─────────────────
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      heroBgText.style.transform =
        'translate(-50%, calc(-50% + ' + (window.scrollY * 0.18) + 'px))';
    }, { passive: true });
  }


  // ─── 3D TILT — SKILL CARDS ───────────────────
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      card.style.transform = 'translateY(-5px) rotateX(' + (-y * 0.05).toFixed(2) + 'deg) rotateY(' + (x * 0.05).toFixed(2) + 'deg)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });


  // ─── 3D TILT — PROJECT CARDS ─────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      card.style.transform = 'translateY(-6px) rotateX(' + (-y * 0.025).toFixed(2) + 'deg) rotateY(' + (x * 0.025).toFixed(2) + 'deg)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });


  // ─── COUNTER ANIMATION ───────────────────────
  function animateCounter(el, target, suffix) {
    const duration = 1500;
    const isFloat  = String(target).includes('.');
    const decimals = isFloat ? String(target).split('.')[1].length : 0;
    const start    = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = target * eased;
      el.textContent = (isFloat ? value.toFixed(decimals) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const asideObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const spanEl = el.querySelector('span');
      const spanTx = spanEl ? spanEl.textContent : '';
      const raw    = el.textContent.replace(spanTx, '').trim();
      const num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '') + spanTx;
      if (!isNaN(num)) animateCounter(el, num, suffix);
      asideObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.aside-val').forEach(el => asideObs.observe(el));

  const scoreObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace('%', ''));
      const sfx = raw.includes('%') ? '%' : '';
      if (!isNaN(num)) animateCounter(el, num, sfx);
      scoreObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.score-val').forEach(el => scoreObs.observe(el));


  // ─── SECTION LABEL TYPING ────────────────────
  const labelObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const full = el.dataset.full || el.textContent.trim();
      el.dataset.full = full;
      el.textContent  = '';
      let i = 0;
      const iv = setInterval(() => {
        el.textContent += full[i++];
        if (i >= full.length) clearInterval(iv);
      }, 30);
      labelObs.unobserve(el);
    });
  }, { threshold: 0.9 });
  document.querySelectorAll('.section-label').forEach(el => labelObs.observe(el));


  // ─── CONTACT ROWS STAGGER ────────────────────
  const contactRows    = document.querySelectorAll('.contact-row');
  const contactSection = document.getElementById('contact');

  if (contactRows.length && contactSection) {
    contactRows.forEach(row => {
      row.style.opacity    = '0';
      row.style.transform  = 'translateX(24px)';
      row.style.transition = 'opacity 0.55s ease, transform 0.55s ease, padding 0.3s ease';
    });

    const contactObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        contactRows.forEach((row, i) => {
          setTimeout(() => {
            row.style.opacity   = '1';
            row.style.transform = 'translateX(0)';
          }, i * 90);
        });
        contactObs.disconnect();
      }
    }, { threshold: 0.15 });
    contactObs.observe(contactSection);
  }


  // ─── HERO ROLE TYPEWRITER ────────────────────
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    const roles = [
      'AI & Data Science Engineer',
      'Full-Stack Developer',
      'NLP Enthusiast',
      'Problem Solver',
    ];
    let ri = 0, ci = 0, deleting = false;

    function tick() {
      const current = roles[ri];
      if (!deleting) {
        roleEl.textContent = current.slice(0, ++ci);
        if (ci === current.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        roleEl.textContent = current.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? 40 : 68);
    }
    setTimeout(tick, 1000);
  }


  // ─── NOISE OVERLAY ───────────────────────────
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200;
    Object.assign(canvas.style, {
      position: 'fixed', inset: '0', width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: '9990', opacity: '0.025', mixBlendMode: 'overlay',
    });
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(200, 200);
    for (let k = 0; k < img.data.length; k += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[k] = img.data[k+1] = img.data[k+2] = v;
      img.data[k+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    document.body.appendChild(canvas);
  } catch (e) {}

}); // end DOMContentLoaded
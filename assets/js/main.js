/* ==========================================================================
   WSL // Portfolio — main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- loader ---------------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hide'), 500);
  });

  /* ---------------- AOS ---------------- */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------------- theme toggle (dark / light) ---------------- */
  const root = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = sessionStorage.getItem('wsl-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fa-solid fa-sun text-sm' : 'fa-solid fa-moon text-sm';
  }
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current === 'dark' ? '' : 'light');
    if (current === 'dark') root.removeAttribute('data-theme');
    themeIcon.className = current === 'light' ? 'fa-solid fa-sun text-sm' : 'fa-solid fa-moon text-sm';
    sessionStorage.setItem('wsl-theme', current);
  });

  /* ---------------- mobile menu ---------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  }));

  /* ---------------- navbar scroll state + active link + progress bar ---------------- */
  const navbar = document.getElementById('navbar');
  const progress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section[id]')];

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);
    backToTop.classList.toggle('show', y > 500);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = docH > 0 ? `${(y / docH) * 100}%` : '0%';

    let currentId = sections[0]?.id;
    for (const sec of sections) {
      if (y >= sec.offsetTop - 140) currentId = sec.id;
    }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${currentId}`));
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- typed.js rotating titles ---------------- */
  if (window.Typed) {
    new Typed('#typed', {
      strings: ['IT Infrastructure Engineer', 'Network Administrator', 'System Administrator', 'Cybersecurity Enthusiast'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      smartBackspace: true
    });
  }

  /* ---------------- animated counters ---------------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(p * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- skill progress bars fill on view ---------------- */
  const skillRows = document.querySelectorAll('.skill-row');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = parseInt(entry.target.dataset.percent, 10) || 0;
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) requestAnimationFrame(() => { fill.style.width = `${percent}%`; });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillRows.forEach(r => skillObserver.observe(r));

  /* ---------------- project detail modal ---------------- */
  const projectsData = {
    p1: {
      title: 'Data Network, CCTV & PABX System',
      client: 'Engineers Office, Mathugama',
      status: 'COMPLETED',
      image: 'https://picsum.photos/seed/wslproj1/900/500',
      desc: 'Full-scope data network deployment integrated with a CCTV surveillance system and PABX telephony for a government engineers office.',
      challenge: 'Aging cable infrastructure and no centralised surveillance or internal calling system across the office.',
      solution: 'Designed and installed a structured LAN, mounted a CCTV network with centralised recording, and deployed a PABX system for internal extensions.',
      outcome: 'Unified network, surveillance and telephony under one maintainable system with documented configurations.',
      tech: ['LAN/WLAN', 'CCTV', 'PABX']
    },
    p2: {
      title: 'Multi-Site CCTV Installation',
      client: 'Craft Lanka — 10 Shops & Stores',
      status: 'COMPLETED',
      image: 'https://picsum.photos/seed/wslproj2/900/500',
      desc: 'Coordinated a CCTV rollout across 10 retail locations, standardising camera placement, cabling and remote monitoring access.',
      challenge: 'Multiple independent sites with no consistent surveillance standard or centralised remote access.',
      solution: 'Rolled out a standardised camera layout and cabling approach per store, with remote monitoring configured for head-office oversight.',
      outcome: 'Consistent surveillance coverage across all 10 sites with centralised remote access.',
      tech: ['Multi-site', 'CCTV', 'Remote Monitoring']
    },
    p3: {
      title: 'Data Network & PABX Integration',
      client: 'Department of Revenue, Kalutara',
      status: 'COMPLETED',
      image: 'https://picsum.photos/seed/wslproj3/900/500',
      desc: 'Integrated structured data cabling with a unified PABX telephony system for a government revenue office.',
      challenge: 'Disconnected data and voice infrastructure causing inefficient internal communication.',
      solution: 'Deployed structured cabling alongside a unified PABX system, mapping extensions across departments.',
      outcome: 'Single maintainable network carrying both data and voice traffic for the office.',
      tech: ['Structured Cabling', 'PABX']
    },
    p4: {
      title: 'PABX System Deployment',
      client: 'COOP Head Office (Colombo) & Waste Management Authority, Karadiyana',
      status: 'COMPLETED',
      image: 'https://picsum.photos/seed/wslproj4/900/500',
      desc: 'Deployed enterprise PABX telephony systems across two organisations, covering configuration, extension mapping and staff handover.',
      challenge: 'Two separate organisations needing reliable internal telephony with minimal disruption during rollout.',
      solution: 'Configured and deployed PABX systems at both sites, mapped extensions, and ran staff handover training.',
      outcome: 'Both organisations operating on a stable, fully documented PABX system.',
      tech: ['PABX', 'Telephony']
    }
  };

  window.openProject = function (id) {
    const p = projectsData[id];
    if (!p) return;
    document.getElementById('pm-image').src = p.image;
    document.getElementById('pm-image').alt = p.title;
    document.getElementById('pm-status').textContent = p.status;
    document.getElementById('pm-title').textContent = p.title;
    document.getElementById('pm-client').textContent = p.client;
    document.getElementById('pm-desc').textContent = p.desc;
    document.getElementById('pm-challenge').textContent = p.challenge;
    document.getElementById('pm-solution').textContent = p.solution;
    document.getElementById('pm-outcome').textContent = p.outcome;
    const techWrap = document.getElementById('pm-tech');
    techWrap.innerHTML = '';
    p.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'font-mono text-[.65rem] px-2 py-1 rounded';
      span.style.background = 'var(--panel-2)';
      span.style.color = 'var(--text-muted)';
      span.textContent = t;
      techWrap.appendChild(span);
    });
    const modal = document.getElementById('project-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeProject = function () {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeProject();
  });

  /* ---------------- certification filter + "see more" collapse ---------------- */
  const certFilters = document.querySelectorAll('#cert-filters .filter-pill');
  const certCardsArr = Array.from(document.querySelectorAll('#cert-grid .cert-card'));
  const certSeeMoreBtn = document.getElementById('cert-see-more');
  const CERT_VISIBLE_LIMIT = 6; // 2 rows on the 3-column layout
  let certCollapsed = true;
  let certActiveFilter = 'all';

  const renderCerts = () => {
    certCardsArr.forEach((card, i) => {
      const matchesFilter = certActiveFilter === 'all' || card.dataset.cat === certActiveFilter;
      const withinLimit = certCollapsed ? i < CERT_VISIBLE_LIMIT : true;
      card.style.display = (matchesFilter && withinLimit) ? '' : 'none';
    });
    if (certSeeMoreBtn) {
      certSeeMoreBtn.style.display = (certCollapsed && certActiveFilter === 'all') ? 'inline-flex' : 'none';
    }
  };
  renderCerts();

  certFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      certFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      certActiveFilter = pill.dataset.filter;
      if (certActiveFilter !== 'all') certCollapsed = false;
      renderCerts();
    });
  });

  certSeeMoreBtn?.addEventListener('click', () => {
    certCollapsed = false;
    renderCerts();
  });

  /* ---------------- gallery filter ---------------- */
  const galFilters = document.querySelectorAll('#gallery-filters .filter-pill');
  const galItems = document.querySelectorAll('#gallery-grid .gallery-item');
  galFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      galFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      galItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---------------- contact form (static site — no backend) ---------------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry: ${data.get('subject')}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:wslakmal@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = '✓ Opening your email client…';
    status.classList.remove('hidden');
    status.style.color = 'var(--signal)';
  });

  /* ---------------- footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

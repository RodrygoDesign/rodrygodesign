/* =========================================
   RODRYGO DESIGN - script.js
   ========================================= */

const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

const burger = document.getElementById('navBurger');
const fmenu = document.getElementById('mobMenu');
const previews = fmenu ? fmenu.querySelectorAll('.fmenu__preview') : [];

function openMenu() {
  burger.classList.add('open');
  fmenu.classList.add('open');
  fmenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burger.classList.remove('open');
  fmenu.classList.remove('open');
  fmenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (burger && fmenu) {
  burger.addEventListener('click', () => {
    fmenu.classList.contains('open') ? closeMenu() : openMenu();
  });
}

fmenu?.querySelectorAll('.fmenu__link').forEach(link => {
  link.addEventListener('click', closeMenu);

  link.addEventListener('mouseenter', () => {
    const idx = link.dataset.preview;
    previews.forEach(p => p.classList.remove('is-active'));
    const target = fmenu.querySelector(`.fmenu__preview--${idx}`);
    if (target) target.classList.add('is-active');
  });
});

fmenu?.querySelector('.fmenu__nav')?.addEventListener('mouseleave', () => {
  previews.forEach(p => p.classList.remove('is-active'));
  previews[0].classList.add('is-active');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && fmenu.classList.contains('open')) closeMenu();
});

const accPanels = document.querySelectorAll('.acc-panel');

if (accPanels.length) {
  const isMobile = () => window.matchMedia('(max-width: 720px)').matches;

  accPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      if (isMobile()) return;
      accPanels.forEach(p => p.classList.remove('is-active'));
      panel.classList.add('is-active');
    });

    panel.addEventListener('click', e => {
      if (!isMobile()) return;
      if (!panel.classList.contains('is-open') && !panel.classList.contains('is-active')) {
        e.preventDefault();
        accPanels.forEach(p => { p.classList.remove('is-open'); p.classList.remove('is-active'); });
        panel.classList.add('is-open');
      }
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach(el => revealObs.observe(el));

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__link');

const sectionObs = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = '#3b82f6';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObs.observe(s));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ambientVideos = document.querySelectorAll('video[autoplay]');
const projectPreviewVideos = document.querySelectorAll('.proj-media video:not([autoplay])');

if (reduceMotion) {
  ambientVideos.forEach(video => {
    video.removeAttribute('autoplay');
    video.pause();
  });
} else if ('IntersectionObserver' in window) {
  const videoObs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.18 }
  );

  ambientVideos.forEach(video => videoObs.observe(video));
}

projectPreviewVideos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play().catch(() => {});
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });

  video.addEventListener('touchstart', () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     SIDEBAR / HAMBURGER / OVERLAY
  =============================== */
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (hamburger && sidebar && overlay) {

    const openSidebar = () => {
      hamburger.classList.add('active');
      sidebar.classList.add('active');
      overlay.classList.add('active');
      sidebar.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
    };

    const closeSidebar = () => {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
    };

    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) closeSidebar();
    });

    hamburger.setAttribute('aria-expanded', sidebar.classList.contains('active'));
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
      }
    });
  }

  /* ==============================
     HERO PARALLAX H3
  =============================== */
  const heroH3 = document.querySelector('.hero-text1 h3');
  if (heroH3) {
    let rafId;
    document.addEventListener('mousemove', e => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        heroH3.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
    document.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      heroH3.style.transform = '';
    });
  }

  /* ==============================
     SCROLL REVEAL
  =============================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    revealElements.forEach(el => observer.observe(el));
  }

  /* ==============================
     CAROUSEL INFINITO
  =============================== */
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack && !carouselTrack.dataset.cloned) {
    Array.from(carouselTrack.children).forEach(item => {
      carouselTrack.appendChild(item.cloneNode(true));
    });
    carouselTrack.dataset.cloned = 'true';
  }

  /* ==============================
     SLIDER AUTOMÁTICO
  =============================== */
  const sliderTrack = document.querySelector('.slider-track');
  if (sliderTrack) {
    const slides = Array.from(sliderTrack.children);
    let index = 0;
    const showSlide = i => sliderTrack.style.transform = `translateX(-${i * 100}%)`;
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 5000);
  }

  /* ==============================
     CAMBIO DE IDIOMA
  =============================== */
  const currentFlag = document.getElementById('current-flag');
  let lang = 'es';

  const translatePage = lang => {
    document.querySelectorAll('[data-es]').forEach(el => {
      if (el.dataset && el.dataset[lang] !== undefined) {
        el.textContent = el.dataset[lang];
      }
    });
  };

  if (currentFlag) {
    currentFlag.addEventListener('click', () => {
      lang = lang === 'es' ? 'en' : 'es';
      currentFlag.src = lang === 'es' ? 'bandera-es.svg' : 'bandera-en.svg';
      translatePage(lang);
    });
  }

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lbClose = document.getElementById('lb-close');
let currentMedia = null;

const openLightboxForImage = (src, alt = '') => {
  lightboxContent.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy">`;
  currentMedia = lightboxContent.querySelector('img');
  showLightbox();
};

const openLightboxForVideo = (src, ariaLabel = '') => {
  const video = document.createElement('video');
  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('aria-label', ariaLabel);
  video.style.maxHeight = '80vh';
  lightboxContent.innerHTML = '';
  lightboxContent.appendChild(video);
  currentMedia = video;
  showLightbox();
};

const showLightbox = () => {
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // evita scroll del fondo
};

const closeLightbox = () => {
  if (currentMedia?.tagName === 'VIDEO') currentMedia.pause();
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxContent.innerHTML = '';
  currentMedia = null;
  document.body.style.overflow = ''; // restablece scroll
};

lbClose.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const vid = item.querySelector('video');

    if (img) openLightboxForImage(img.src, img.alt || '');
    else if (vid) openLightboxForVideo(vid.currentSrc || vid.src, vid.getAttribute('aria-label') || '');
  });
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

  /* ==============================
     LAZY LOADING DE VIDEOS
  =============================== */
videos.forEach(video => {
  // Reproducir en desktop con hover
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  // Reproducir o pausar al tocar/clickar
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
});


  /* ==============================
     ANIMACIÓN DE TEXTO
  =============================== */
  const animateBlurText = (selector, delay = 150) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const words = element.textContent.split(' ');
    element.textContent = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.classList.add('blur-word');
      element.appendChild(span);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.querySelectorAll('.blur-word').forEach((span, i) => {
            setTimeout(() => span.classList.add('visible'), i * delay);
          });
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  };
  animateBlurText('.blur-text');

  /* ==============================
     SPLIT TEXT GSAP
  =============================== */
  const splitText = el => {
    const text = el.textContent;
    el.textContent = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.classList.add('char');
      el.appendChild(span);
    });
  };

  const textEl = document.getElementById('split-text');
  if (textEl) {
    splitText(textEl);
    gsap.fromTo('.char', { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      duration: 0.6,
      stagger: 0.05
    });
  }


/* ==============================
   TRAIL DEL RATÓN EN HERO
============================== */
const hero = document.getElementById('hero');
const canvas = document.getElementById('mouse-line-trail');

if (hero && canvas) {
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return console.warn('Canvas 2D no disponible');

  let mousePositions = [];
  let isInsideHero = false;
  let rafId = null;

  const resizeCanvas = () => {
    const rect = hero.getBoundingClientRect();
    canvas.width = Math.round(rect.width * devicePixelRatio);
    canvas.height = Math.round(rect.height * devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  hero.addEventListener('mouseenter', () => isInsideHero = true);
  hero.addEventListener('mouseleave', () => { isInsideHero = false; mousePositions = []; });

  hero.addEventListener('mousemove', e => {
    if (!isInsideHero) return;
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePositions.push({ x, y, t: Date.now() });
    if (mousePositions.length > 10) mousePositions.shift();
  });

  const drawTrail = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mousePositions.length < 2) {
      rafId = requestAnimationFrame(drawTrail);
      return;
    }

    for (let i = 1; i < mousePositions.length; i++) {
      const p0 = mousePositions[i - 1];
      const p1 = mousePositions[i];
      const alpha = (i / mousePositions.length) * 5;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
      grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.8})`);
      grad.addColorStop(1, `rgba(255,200,150,${alpha * 0.0})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(255,255,255,${alpha * 0.6})`;
      ctx.stroke();
    }

    rafId = requestAnimationFrame(drawTrail);
  };

  if (rafId === null) drawTrail();
}
});






document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------
     Sidebar / Hamburger / Overlay
  ---------------------------- */
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (hamburger && sidebar && overlay) {
    function closeSidebar() {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
    }
    function openSidebar() {
      hamburger.classList.add('active');
      sidebar.classList.add('active');
      overlay.classList.add('active');
      sidebar.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('active')) closeSidebar(); else openSidebar();
    });

    overlay.addEventListener('click', () => closeSidebar());

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) closeSidebar();
    });
  }

  /* ----------------------------
     Hero movimiento solo h3 delante del modelo (parallax ligero)
  ---------------------------- */
  const heroH3 = document.querySelector('.hero-text1 h3'); // solo DESIGN
  let rafId;
  if (heroH3) {
    document.addEventListener('mousemove', (e) => {
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

  /* ----------------------------
     Scroll reveal
  ---------------------------- */
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

  /* ----------------------------
     Carousel infinito suave (clonamos)
  ---------------------------- */
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack && !carouselTrack.dataset.cloned) {
    const originalItems = Array.from(carouselTrack.children);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      carouselTrack.appendChild(clone);
    });
    carouselTrack.dataset.cloned = 'true';
  }

  /* ----------------------------
     Slider automático (si existe)
  ---------------------------- */
  const track = document.querySelector('.slider-track');
  if (track) {
    const slides = Array.from(track.children);
    let index = 0;
    function showSlide(i) { track.style.transform = `translateX(-${i * 100}%)`; }
    setInterval(() => {
      index = (index < slides.length - 1) ? index + 1 : 0;
      showSlide(index);
    }, 5000);
  }

  /* ----------------------------
     Botón "Ver Proyectos"
  ---------------------------- */
  const btnVerProyectos = document.getElementById('btn-ver-proyectos');
  if (btnVerProyectos) {
    btnVerProyectos.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('sections');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ----------------------------
     Cambio de idioma / bandera
  ---------------------------- */
  const currentFlag = document.getElementById('current-flag');
  let lang = 'es';
  if (currentFlag) {
    currentFlag.addEventListener('click', () => {
      lang = (lang === 'es') ? 'en' : 'es';
      currentFlag.src = (lang === 'es') ? 'bandera-es.svg' : 'bandera-en.svg';
      translatePage(lang);
    });
  }

  function translatePage(lang) {
    document.querySelectorAll('[data-es]').forEach(el => {
      if (el.dataset && el.dataset[lang] !== undefined) {
        el.textContent = el.dataset[lang];
      }
    });
  }

  /* ============================
     LIGHTBOX (Galería simplificada)
     - clic en imagen/video -> lightbox grande
     - solo botón cerrar
     - soporta video con controles
     ============================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lbClose = document.getElementById('lb-close');

  let currentMedia = null;

  function openLightboxForImage(src, alt = '') {
    lightboxContent.innerHTML = `<img src="${src}" alt="${alt}">`;
    currentMedia = lightboxContent.querySelector('img');
    showLightbox();
  }

  function openLightboxForVideo(src, ariaLabel = '') {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute('aria-label', ariaLabel || '');
    video.style.maxHeight = '70vh';
    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(video);
    currentMedia = video;
    showLightbox();
  }

  function showLightbox() {
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    setTimeout(() => lightboxContent.focus(), 120);
  }

  function closeLightbox() {
    if (currentMedia && currentMedia.tagName === 'VIDEO') {
      try { currentMedia.pause(); } catch(e){}
    }
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxContent.innerHTML = '';
    currentMedia = null;
  }

  lbClose.addEventListener('click', closeLightbox);

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open') && e.key === 'Escape') {
      closeLightbox();
    }
  });

  // click listeners on gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const img = item.querySelector('img');
      const vid = item.querySelector('video');
      if (img) {
        openLightboxForImage(img.src, img.alt || '');
      } else if (vid) {
        openLightboxForVideo(vid.currentSrc || vid.src, vid.getAttribute('aria-label') || '');
      } else {
        const iframe = item.querySelector('iframe');
        if (iframe) {
          window.open(iframe.src, '_blank');
        }
      }
    });
  });

  // close lightbox by clicking outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ----------------------------
     Accessibility: keyboard focus for hamburger and sidebar
  ---------------------------- */
  if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
      }
    });
  }

});

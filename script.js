/* ========================================
   DELACROIX PRODUCER - Main Script
   ======================================== */

// ========================================
// Data
// ========================================

const servicesData = [
    {
        icon: '🎵',
        title: 'Producción Musical',
        description: 'Beats, mezcla, mastering y bandas sonoras. Equipo analógico + digital.',
        features: ['Beats', 'Mezcla', 'Mastering', 'Bandas Sonoras']
    },
    {
        icon: '✂️',
        title: 'Postproducción Video',
        description: 'Edición, color grading, motion graphics, render multi-plataforma.',
        features: ['Edición', 'Color Grading', 'Motion Graphics', 'Render']
    },
    {
        icon: '💡',
        title: 'Ideas & Concepto',
        description: 'Storytelling, guiones, storyboards, dirección de arte.',
        features: ['Concepto', 'Guión', 'Storyboard', 'Art Direction']
    },
    {
        icon: '📱',
        title: 'Marketing Redes',
        description: 'Reels, Shorts, TikTok, estrategia, calendario, analytics.',
        features: ['Estrategia', 'Formatos Nativos', 'Calendario', 'Analytics']
    }
];

// ========================================
// State
// ========================================

let isScrolling = false;

// ========================================
// DOM Elements Cache
// ========================================

const elements = {};

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initNavigation();
    initHero();
    initServices();
    initAbout();
    initContact();
    initModal();
    initBackgroundCanvas();
    initCursorGlow();
    initScrollReveal();
    initRingProgress();
    initAudioPlayer();
    initMusicReleases();
    initHeroWaveform();
});

// ========================================
// Element Caching
// ========================================

function cacheElements() {
    elements.nav = document.getElementById('nav');
    elements.navLinks = document.getElementById('navLinks');
    elements.navToggle = document.getElementById('navToggle');
    elements.hero = document.getElementById('inicio');
    elements.servicesGrid = document.getElementById('servicesGrid');
    elements.aboutImage = document.getElementById('aboutImage');
    elements.statsRing = document.getElementById('statsRing');
    elements.contactForm = document.getElementById('contactForm');
    elements.projectModal = document.getElementById('projectModal');
    elements.modalClose = document.getElementById('modalClose');
    elements.modalBody = document.getElementById('modalBody');
    elements.bgCanvas = document.getElementById('bgCanvas');
    elements.cursorGlow = document.getElementById('cursorGlow');
    elements.heroWaveformCanvas = document.getElementById('heroWaveformCanvas');
    elements.heroWaveformProgress = document.getElementById('heroWaveformProgress');
    elements.heroWaveformTime = document.getElementById('heroWaveformTime');
}

// ========================================
// Navigation
// ========================================

function initNavigation() {
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.nav.classList.add('scrolled');
        } else {
            elements.nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile toggle
    elements.navToggle.addEventListener('click', () => {
        elements.navToggle.classList.toggle('active');
        elements.navLinks.classList.toggle('active');
        document.body.style.overflow = elements.navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Close mobile menu
            elements.navToggle.classList.remove('active');
            elements.navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

// ========================================
// Hero Animations
// ========================================

function initHero() {
    // Parallax on scroll for hero visual (orbs only)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }, { passive: true });

    // Animate orbs continuously
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
        const duration = 8 + i * 2;
        orb.style.animation = `float ${duration}s ease-in-out infinite`;
        if (i === 1) orb.style.animationDirection = 'reverse';
        if (i === 2) orb.style.animation = `pulse-orb 4s ease-in-out infinite`;
    });
}

// ========================================
// Services
// ========================================

function initServices() {
    elements.servicesGrid.innerHTML = servicesData.map((service, index) => `
        <article class="service-card" style="transition-delay: ${index * 100}ms">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="service-features">
                ${service.features.map(f => `<span>${f}</span>`).join('')}
            </div>
        </article>
    `).join('');
}

// ========================================
// About
// ========================================

function initAbout() {
    // Add reveal classes
    document.querySelectorAll('.about-content > *').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 100}ms`;
    });

    document.querySelectorAll('.value').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${300 + i * 100}ms`;
    });
}

// ========================================
// Contact Form
// ========================================

function initContact() {
    elements.contactForm.addEventListener('submit', handleFormSubmit);

    // Floating label effect
    elements.contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) input.parentElement.classList.remove('focused');
        });

        // Check initial state
        if (input.value) input.parentElement.classList.add('focused');
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Validate
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.nombre || !data.email || !data.tipo || !data.mensaje) {
        showToast('Por favor completa todos los campos obligatorios', 'error');
        return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showToast('Email inválido', 'error');
        return;
    }

    // Loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        showToast('¡Proyecto enviado! Te contactaremos en menos de 24h.', 'success');
        form.reset();
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('focused'));

    } catch (error) {
        showToast('Error al enviar. Inténtalo de nuevo o escríbenos directamente.', 'error');
    } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

// ========================================
// Modal
// ========================================

function initModal() {
    elements.modalClose.addEventListener('click', closeModal);
    elements.projectModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openProjectModal(id) {
    const project = portfolioData.find(p => p.id === id);
    if (!project) return;

    elements.modalBody.innerHTML = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <div class="modal-project-info">
                <span class="modal-project-category">${filterLabels(project.category)}</span>
                <h2 class="modal-project-title">${project.title}</h2>
                <p class="modal-project-description">${project.description}</p>
                <div class="modal-project-meta">
                    <div class="meta-item">
                        <span class="meta-label">Cliente</span>
                        <span class="meta-value">${project.client}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Año</span>
                        <span class="meta-value">${project.year}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Servicios</span>
                        <span class="meta-value">${project.tags.join(', ')}</span>
                    </div>
                </div>
                <a href="${project.link}" class="btn btn-primary" style="margin-top: var(--space-md); width: 100%;">
                    Ver caso completo
                </a>
            </div>
        </div>
    `;

    elements.projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap
    const focusable = elements.modalBody.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
}

function closeModal() {
    elements.projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Background Canvas (Particles)
// ========================================

function initBackgroundCanvas() {
    const canvas = elements.bgCanvas;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let mouseX = -1000;
    let mouseY = -1000;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                targetOpacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(232, 180, 64, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            // Mouse interaction
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                const force = (1 - dist / 200) * 0.5;
                p.vx -= dx * force * 0.01;
                p.vy -= dy * force * 0.01;
                p.targetOpacity = 0.6;
            } else {
                p.targetOpacity = Math.random() * 0.3 + 0.1;
            }

            // Update position
            p.x += p.vx;
            p.y += p.vy;
            p.opacity += (p.targetOpacity - p.opacity) * 0.05;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Dampen velocity
            p.vx *= 0.99;
            p.vy *= 0.99;

            // Draw
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232, 180, 64, ${p.opacity})`;
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Resize
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    resize();
    createParticles();
    animate();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ========================================
// Cursor Glow
// ========================================

function initCursorGlow() {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let isMoving = false;
    let moveTimeout;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        elements.cursorGlow.classList.add('active');
        isMoving = true;

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
            elements.cursorGlow.classList.remove('active');
        }, 2000);
    });

    function animateGlow() {
        if (isMoving) {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;
            elements.cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
        } else {
            // Fade out
            const opacity = parseFloat(getComputedStyle(elements.cursorGlow).opacity);
            if (opacity > 0) {
                elements.cursorGlow.style.opacity = Math.max(0, opacity - 0.02);
            }
        }
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// ========================================
// Scroll Reveal
// ========================================

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // For stagger children
                if (entry.target.classList.contains('stagger-children')) {
                    entry.target.querySelectorAll('*').forEach((child, i) => {
                        setTimeout(() => child.style.opacity = '1', i * 80);
                    });
                }
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================================
// ========================================
// Ring Progress (About Section)
// ========================================

function initRingProgress() {
    const ring = document.querySelector('.ring-progress');
    if (!ring) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circumference = 2 * Math.PI * 54; // r=54
                ring.style.strokeDasharray = circumference;
                ring.style.strokeDashoffset = circumference * (1 - 0.98); // 98%
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('statsRing'));
}

// ========================================
// Toast Notifications
// ========================================

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));

    setTimeout(() => removeToast(toast), 5000);
}

function removeToast(toast) {
    toast.style.animation = 'slideIn 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
}

// ========================================
// Music Releases Data
// ========================================

const musicData = [
    {
        id: 1,
        title: 'DROG',
        genre: 'TRAP',
        cover: 'https://files.catbox.moe/4qd5ol.jpg',
        audio: 'https://files.catbox.moe/lqym12.mp3',
        duration: '2:45',
        price: 30
    },
    {
        id: 2,
        title: 'REAL GANG',
        genre: 'TRAP',
        cover: 'https://files.catbox.moe/o3vxev.jpg',
        audio: 'https://files.catbox.moe/uayc5m.mp3',
        duration: '2:30',
        price: 30
    },
    {
        id: 3,
        title: 'PULSO',
        genre: 'TRAP',
        cover: 'https://files.catbox.moe/ibxgbl.jpg',
        audio: 'https://files.catbox.moe/emfqgn.mp3',
        duration: '2:45',
        price: 30
    },
    {
        id: 4,
        title: 'SANTO',
        genre: 'TRAP',
        cover: 'https://files.catbox.moe/0cv29k.jpg',
        audio: 'https://files.catbox.moe/cjx0qo.mp3',
        duration: '2:50',
        price: 30
    }
];

// WhatsApp configuration
const WHATSAPP_NUMBER = '5511933599356'; // +55 11 93359 9356

// ========================================
// Music Releases
// ========================================

let currentMusicCard = null;
// musicAudio REMOVIDO - usamos solo el hero player para evitar doble audio

function initMusicReleases() {
    const musicGrid = document.getElementById('musicGrid');

    if (!musicGrid) return;

    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'music-backdrop';
    document.body.appendChild(backdrop);

    musicGrid.innerHTML = musicData.map((track, index) => `
        <article class="music-card" style="transition-delay: ${index * 100}ms" data-id="${track.id}">
            <img class="music-cover" src="${track.cover}" alt="${track.title}" loading="lazy">
            <span class="music-genre-label">${track.genre}</span>
            <div class="music-overlay">
                <h3 class="music-title">${track.title}</h3>
                <span class="music-duration">${track.duration}</span>
                <div class="play-indicator" aria-hidden="true">
                    <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                </div>
            </div>
            <!-- Price & Buy Button -->
            <div class="music-footer">
                <span class="music-price">$${track.price}</span>
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero comprar el beat "${track.title}" por $${track.price}`)}"
                   target="_blank" rel="noopener" class="music-buy-btn" aria-label="Comprar ${track.title} por WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.466-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15z"/></svg>
                    Comprar
                </a>
            </div>
            <!-- Waveform container (hidden until expanded) -->
            <div class="music-waveform" style="display:none;">
                <canvas class="waveform-canvas"></canvas>
                <div class="waveform-progress"></div>
                <span class="waveform-time">0:00 / ${track.duration}</span>
                <!-- Pitch & Tempo Controls (visible when expanded) -->
                <div class="audio-controls-expanded">
                    <div class="control-group">
                        <label class="control-label">
                            <span class="control-icon">🎵</span>
                            <span>Pitch</span>
                            <span class="control-value" id="pitchValue">0</span>
                        </label>
                        <input type="range" class="control-slider" id="pitchSlider" min="-12" max="12" value="0" step="1" aria-label="Pitch shift (semitones)">
                    </div>
                    <div class="control-group">
                        <label class="control-label">
                            <span class="control-icon">⏱</span>
                            <span>Tempo</span>
                            <span class="control-value" id="tempoValue">100%</span>
                        </label>
                        <input type="range" class="control-slider" id="tempoSlider" min="50" max="200" value="100" step="1" aria-label="Tempo percentage">
                    </div>
                    <button class="control-reset" id="resetControls" aria-label="Reset pitch and tempo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M21 12a9 9 0 1 1-9 9c2.52 0 4.93-1 6.74-2.74L21 8"/>
                        </svg>
                        Reset
                    </button>
                </div>
            </div>
            <button class="music-close-btn" style="display:none;" aria-label="Cerrar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </article>
    `).join('');

    // Add click handlers
    musicGrid.querySelectorAll('.music-card').forEach(card => {
        const closeBtn = card.querySelector('.music-close-btn');
        const cover = card.querySelector('.music-cover');
        const waveform = card.querySelector('.music-waveform');
        const canvas = waveform.querySelector('.waveform-canvas');
        const progressBar = waveform.querySelector('.waveform-progress');
        const timeDisplay = waveform.querySelector('.waveform-time');

        // Click card to play/pause (but not on interactive elements)
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking interactive elements
            if (e.target.closest('.music-buy-btn') ||
                e.target.closest('.music-close-btn') ||
                e.target.closest('.music-waveform') ||
                e.target.closest('.control-slider') ||
                e.target.closest('.control-reset') ||
                e.target.closest('.music-waveform canvas') ||
                card.classList.contains('expanded')) {
                return;
            }

            e.stopPropagation();
            const trackId = parseInt(card.dataset.id);
            const track = musicData.find(t => t.id === trackId);
            if (track) playMusicTrack(card, track);
        });

        // Click cover/image to expand (only when not playing)
        cover.addEventListener('click', (e) => {
            e.stopPropagation();
            expandCard(card, waveform, canvas, progressBar, timeDisplay, backdrop);
        });

        // Close button
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            collapseCard(card, waveform, backdrop);
        });

        // Waveform click to seek
        waveform.addEventListener('click', (e) => {
            const heroAudio = window.audioPlayer?.audio;
            if (!heroAudio || isNaN(heroAudio.duration)) return;

            const rect = waveform.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            heroAudio.currentTime = percent * heroAudio.duration;

            // Update visual immediately
            const progressBar = waveform.querySelector('.waveform-progress');
            const timeDisplay = waveform.querySelector('.waveform-time');
            progressBar.style.width = `${percent * 100}%`;
            timeDisplay.textContent = `${formatTime(heroAudio.currentTime)} / ${formatTime(heroAudio.duration)}`;

            // Update waveform canvas
            const canvas = waveform.querySelector('.waveform-canvas');
            if (waveformData) drawWaveformProgress(canvas, waveformData, percent);
        });
    });

    // Backdrop click to close (single listener, not per card)
    backdrop.addEventListener('click', () => {
        if (expandedCard) {
            const waveform = expandedCard.querySelector('.music-waveform');
            collapseCard(expandedCard, waveform, backdrop);
        }
    });
}

let expandedCard = null;
let waveformData = null;

function expandCard(card, waveform, canvas, progressBar, timeDisplay, backdrop) {
    if (expandedCard) collapseCard(expandedCard, expandedCard.querySelector('.music-waveform'), backdrop);

    card.classList.add('expanded');
    card.querySelector('.music-close-btn').style.display = 'flex';
    card.querySelector('.music-genre-label').style.display = 'block';
    waveform.style.display = 'block';
    backdrop.classList.add('visible');

    // Generate waveform if not cached
    const trackId = parseInt(card.dataset.id);
    const track = musicData.find(t => t.id === trackId);

    if (!waveformData) {
        generateWaveform(track.audio, canvas).then(data => {
            waveformData = data;
            drawWaveform(canvas, data, 0, track.duration);
        });
    } else {
        drawWaveform(canvas, waveformData, 0, track.duration);
    }

    // Pitch & Tempo Controls
    const heroAudio = window.audioPlayer?.audio;
    const pitchSlider = waveform.querySelector('#pitchSlider');
    const pitchValue = waveform.querySelector('#pitchValue');
    const tempoSlider = waveform.querySelector('#tempoSlider');
    const tempoValue = waveform.querySelector('#tempoValue');
    const resetBtn = waveform.querySelector('#resetControls');

    let currentPitch = 0; // semitones
    let currentTempo = 1.0; // multiplier

    // Note: playbackRate changes BOTH tempo and pitch together
    // For independent control, AudioWorklet phase vocoder is needed
    function applyPlaybackRate() {
        if (heroAudio) {
            heroAudio.playbackRate = currentTempo * Math.pow(2, currentPitch / 12);
        }
    }

    pitchSlider?.addEventListener('input', (e) => {
        currentPitch = parseInt(e.target.value);
        pitchValue.textContent = currentPitch === 0 ? '0' : (currentPitch > 0 ? `+${currentPitch}` : currentPitch);
        applyPlaybackRate();
    });

    tempoSlider?.addEventListener('input', (e) => {
        currentTempo = parseInt(e.target.value) / 100;
        tempoValue.textContent = `${Math.round(currentTempo * 100)}%`;
        applyPlaybackRate();
    });

    resetBtn?.addEventListener('click', () => {
        currentPitch = 0;
        currentTempo = 1.0;
        pitchSlider.value = 0;
        tempoSlider.value = 100;
        pitchValue.textContent = '0';
        tempoValue.textContent = '100%';
        applyPlaybackRate();
    });

    // Reset on collapse
    card.dataset.pitchReset = 'true';
    card.dataset.tempoReset = 'true';

    expandedCard = card;

    // Update waveform during playback - perfectly synced with audio
    const updateWaveform = () => {
        const heroAudio = window.audioPlayer?.audio;
        if (heroAudio && !isNaN(heroAudio.duration) && card.classList.contains('expanded')) {
            const percent = heroAudio.currentTime / heroAudio.duration;
            progressBar.style.width = `${percent * 100}%`;
            timeDisplay.textContent = `${formatTime(heroAudio.currentTime)} / ${formatTime(heroAudio.duration)}`;

            // Also update the visual waveform - redraw progress portion
            if (waveformData) {
                drawWaveformProgress(canvas, waveformData, percent);
            }

            requestAnimationFrame(updateWaveform);
        }
    };
    updateWaveform();
}

function collapseCard(card, waveform, backdrop) {
    // Reset pitch/tempo on collapse
    const heroAudio = window.audioPlayer?.audio;
    if (heroAudio) {
        heroAudio.playbackRate = 1.0;
    }
    const pitchSlider = waveform.querySelector('#pitchSlider');
    const tempoSlider = waveform.querySelector('#tempoSlider');
    const pitchValue = waveform.querySelector('#pitchValue');
    const tempoValue = waveform.querySelector('#tempoValue');
    if (pitchSlider) { pitchSlider.value = 0; pitchValue.textContent = '0'; }
    if (tempoSlider) { tempoSlider.value = 100; tempoValue.textContent = '100%'; }

    card.classList.remove('expanded');
    card.querySelector('.music-close-btn').style.display = 'none';
    card.querySelector('.music-genre-label').style.display = 'none';
    waveform.style.display = 'none';
    backdrop.classList.remove('visible');
    if (expandedCard === card) expandedCard = null;
}

function generateWaveform(audioUrl, canvas) {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.src = audioUrl;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();

        audio.addEventListener('canplaythrough', async () => {
            try {
                const arrayBuffer = await fetch(audioUrl).then(r => r.arrayBuffer());
                const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

                const channelData = audioBuffer.getChannelData(0);
                const samples = 2000; // Number of bars in waveform
                const blockSize = Math.floor(channelData.length / samples);
                const data = [];

                for (let i = 0; i < samples; i++) {
                    const start = i * blockSize;
                    const end = start + blockSize;
                    let max = 0;
                    for (let j = start; j < end; j++) {
                        max = Math.max(max, Math.abs(channelData[j]));
                    }
                    data.push(max);
                }

                ctx.close();
                resolve(data);
            } catch (e) {
                console.warn('Waveform generation failed:', e);
                ctx.close();
                resolve(new Array(2000).fill(0.1)); // Fallback
            }
        });

        audio.load();
    });
}

function drawWaveform(canvas, data, progress, duration) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const barWidth = width / data.length;
    const centerY = height / 2;

    // Draw all bars - progress in gold, remaining in muted gold
    data.forEach((value, i) => {
        const barHeight = value * height * 0.85;
        const x = i * barWidth;
        const y = centerY - barHeight / 2;

        const isProgress = (i / data.length) <= progress;
        ctx.fillStyle = isProgress ? 'rgba(232, 180, 64, 0.9)' : 'rgba(232, 180, 64, 0.15)';
        ctx.fillRect(x, y, barWidth * 0.75, barHeight);
    });
}

// Efficiently update only the progress portion of waveform
function drawWaveformProgress(canvas, data, progress) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const barWidth = width / data.length;
    const centerY = height / 2;
    const progressIndex = Math.floor(data.length * progress);

    // Only redraw the transition area (a few bars around progress point)
    const startIdx = Math.max(0, progressIndex - 3);
    const endIdx = Math.min(data.length - 1, progressIndex + 3);

    for (let i = startIdx; i <= endIdx; i++) {
        const barHeight = data[i] * height * 0.85;
        const x = i * barWidth;
        const y = centerY - barHeight / 2;

        const isProgress = i <= progressIndex;
        ctx.fillStyle = isProgress ? 'rgba(232, 180, 64, 0.9)' : 'rgba(232, 180, 64, 0.15)';
        ctx.fillRect(x, y, barWidth * 0.75, barHeight);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function playMusicTrack(card, track) {
    const heroAudio = window.audioPlayer?.audio;
    if (!heroAudio) {
        showToast('Reproductor principal no listo', 'error');
        return;
    }

    // Stop any currently playing card
    if (currentMusicCard && currentMusicCard !== card) {
        currentMusicCard.classList.remove('playing');
        const otherBtn = currentMusicCard.querySelector('.music-play-btn');
        otherBtn.querySelector('.icon-play').style.display = 'block';
        otherBtn.querySelector('.icon-pause').style.display = 'none';
    }

    // Toggle play/pause on same card
    if (currentMusicCard === card && !heroAudio.paused && heroAudio.src.includes(track.audio.split('/').pop())) {
        heroAudio.pause();
        card.classList.remove('playing');
        const btn = card.querySelector('.music-play-btn');
        btn.querySelector('.icon-play').style.display = 'block';
        btn.querySelector('.icon-pause').style.display = 'none';
        currentMusicCard = null;
        return;
    }

    // Load new track into HERO PLAYER ONLY
    if (track.audio && track.audio !== '#') {
        console.log('🎵 Loading track into hero:', track.title, track.audio);

        heroAudio.src = track.audio;
        heroAudio.load();

        // Update hero UI
        const audioInfo = document.getElementById('audioInfo');
        const audioTitle = audioInfo.querySelector('.audio-title');
        const audioFormat = audioInfo.querySelector('.audio-format');
        audioTitle.textContent = track.title;
        audioFormat.textContent = track.genre;
        audioInfo.classList.add('has-file');

        // Wait for audio to be ready before playing (fixes "interrupted by new load request")
        const playWhenReady = () => {
            heroAudio.removeEventListener('canplaythrough', playWhenReady);
            heroAudio.play().then(() => {
                console.log('🎵 Hero player playing:', track.title);
                card.classList.add('playing');
                const btn = card.querySelector('.music-play-btn');
                btn.querySelector('.icon-play').style.display = 'none';
                btn.querySelector('.icon-pause').style.display = 'block';
                currentMusicCard = card;
            }).catch(err => {
                console.warn('Hero player autoplay blocked:', err);
                showToast('Click en Play del hero para activar audio', 'info');
            });
        };
        heroAudio.addEventListener('canplaythrough', playWhenReady, { once: true });
    } else {
        showToast('URL de audio no configurada para este track', 'info');
    }
}

// Sync card UI with hero player events (if same track)
if (window.audioPlayer && window.audioPlayer.audio) {
    const heroAudio = window.audioPlayer.audio;

    heroAudio.addEventListener('ended', () => {
        if (currentMusicCard) {
            currentMusicCard.classList.remove('playing');
            const btn = currentMusicCard.querySelector('.music-play-btn');
            btn.querySelector('.icon-play').style.display = 'block';
            btn.querySelector('.icon-pause').style.display = 'none';
            currentMusicCard = null;
        }
    });

    heroAudio.addEventListener('pause', () => {
        if (currentMusicCard) {
            currentMusicCard.classList.remove('playing');
            const btn = currentMusicCard.querySelector('.music-play-btn');
            btn.querySelector('.icon-play').style.display = 'block';
            btn.querySelector('.icon-pause').style.display = 'none';
        }
    });

    heroAudio.addEventListener('play', () => {
        if (currentMusicCard) {
            currentMusicCard.classList.add('playing');
            const btn = currentMusicCard.querySelector('.music-play-btn');
            btn.querySelector('.icon-play').style.display = 'none';
            btn.querySelector('.icon-pause').style.display = 'block';
        }
    });
}

// ========================================
// Audio Player
// ========================================

function initAudioPlayer() {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous'; // Fix CORS for Web Audio API
    const player = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar'); // May not exist (new waveform UI)
    const audioTime = document.getElementById('audioTime');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const audioUpload = document.getElementById('audioUpload');
    const audioInfo = document.getElementById('audioInfo');
    const audioTitle = audioInfo?.querySelector('.audio-title');
    const audioFormat = audioInfo?.querySelector('.audio-format');
    const visualizer = document.getElementById('audioVisualizer');
    const bars = visualizer?.querySelectorAll('.bar') || [];

    let audioContext = null;
    let analyser = null;
    let source = null;
    let animationId = null;
    let isPlaying = false;
    let isMuted = false;
    let lastVolume = 0.7;

    // Format file size
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Initialize Web Audio API for visualizer
    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }

    // Visualizer animation
    function animateVisualizer() {
        if (!analyser || !isPlaying || !bars.length) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        bars.forEach((bar, i) => {
            const value = dataArray[i * 2] || 0;
            const height = Math.max(5, (value / 255) * 60);
            bar.style.height = `${height}px`;
            bar.style.opacity = 0.3 + (value / 255) * 0.7;
        });

        animationId = requestAnimationFrame(animateVisualizer);
    }

    function stopVisualizer() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        if (bars.length) {
            bars.forEach(bar => {
                bar.style.height = '5px';
                bar.style.opacity = '0.3';
            });
        }
    }

    // Play/Pause toggle
    function togglePlay() {
        if (audio.src) {
            initAudioContext();
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        } else {
            showToast('Primero sube un archivo de audio', 'info');
        }
    }

    // Update play button UI
    function updatePlayButton() {
        const playIcon = playBtn.querySelector('.icon-play');
        const pauseIcon = playBtn.querySelector('.icon-pause');
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Update progress bar
    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100 || 0;
        if (progressBar) progressBar.value = percent;
        audioTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    }

    // Seek
    function seek(e) {
        if (!progressBar) return;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    }

    // Volume toggle
    function toggleMute() {
        isMuted = !isMuted;
        audio.muted = isMuted;
        updateVolumeUI();
    }

    // Volume change
    function changeVolume(value) {
        audio.volume = value;
        lastVolume = value;
        isMuted = value === 0;
        audio.muted = isMuted;
        updateVolumeUI();
    }

    // Update volume UI
    function updateVolumeUI() {
        const volumeIcon = volumeBtn.querySelector('.icon-volume');
        const muteIcon = volumeBtn.querySelector('.icon-mute');
        if (isMuted || audio.volume === 0) {
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
        volumeSlider.value = audio.volume;
    }

    // Toggle volume slider visibility
    function toggleVolumeSlider() {
        const isVisible = volumeSlider.style.display !== 'none';
        volumeSlider.style.display = isVisible ? 'none' : 'block';
    }

    // Handle file upload
    function handleFile(file) {
        if (!file.type.startsWith('audio/')) {
            showToast('El archivo debe ser de audio', 'error');
            return;
        }

        const url = URL.createObjectURL(file);
        audio.src = url;
        audio.load();

        // Update UI
        audioTitle.textContent = file.name.replace(/\.[^/.]+$/, '');
        audioFormat.textContent = `${file.type.split('/')[1].toUpperCase()} · ${formatBytes(file.size)}`;
        audioInfo.classList.add('has-file');

        // Reset progress
        if (progressBar) progressBar.value = 0;
        audioTime.textContent = '0:00 / 0:00';

        showToast(`Cargado: ${file.name}`, 'success');
    }

    // Drag and drop
    function setupDragDrop() {
        const dropZone = player;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        dropZone.addEventListener('drop', handleDrop, false);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight(e) {
            player.classList.add('drag-over');
        }

        function unhighlight(e) {
            player.classList.remove('drag-over');
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length) handleFile(files[0]);
        }
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);

    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayButton();
        animateVisualizer();
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayButton();
        stopVisualizer();
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButton();
        stopVisualizer();
        audio.currentTime = 0;
        updateProgress();
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    if (progressBar) {
        progressBar.addEventListener('mousedown', (e) => {
            seek(e);
            const onMouseMove = (e) => seek(e);
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        progressBar.addEventListener('click', seek);
    }

    volumeBtn.addEventListener('click', (e) => {
        if (!e.target.closest('.volume-slider')) {
            toggleVolumeSlider();
        }
    });

    volumeBtn.addEventListener('dblclick', toggleMute);

    volumeSlider.addEventListener('input', (e) => {
        changeVolume(parseFloat(e.target.value));
    });

    audioUpload.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.code === 'Space' && audio.src) {
            e.preventDefault();
            togglePlay();
        }
        if (e.code === 'ArrowRight' && audio.src) {
            audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
        }
        if (e.code === 'ArrowLeft' && audio.src) {
            audio.currentTime = Math.max(audio.currentTime - 10, 0);
        }
        if (e.code === 'ArrowUp' && audio.src) {
            changeVolume(Math.min(audio.volume + 0.1, 1));
        }
        if (e.code === 'ArrowDown' && audio.src) {
            changeVolume(Math.max(audio.volume - 0.1, 0));
        }
        if (e.code === 'KeyM') {
            toggleMute();
        }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (audioContext) audioContext.close();
        URL.revokeObjectURL(audio.src);
    });

    // Initialize
    audio.volume = 0.5;
    updateVolumeUI();
    setupDragDrop();

    // Initialize Playlist
    initPlaylist(audio);

    // Make player globally accessible for debugging
    window.audioPlayer = { audio, play: () => audio.play(), pause: () => audio.pause() };
}

// ========================================
// Playlist Functions
// ========================================

function initPlaylist(audio) {
    const playlistToggle = document.getElementById('playlistToggle');
    const playlistContent = document.getElementById('playlistContent');
    const playlistTracks = document.getElementById('playlistTracks');
    const playlistCount = document.getElementById('playlistCount');
    const playlistClear = document.getElementById('playlistClear');

    if (!playlistToggle || !playlistTracks) return;

    // Filter tracks with valid audio
    const validTracks = musicData.filter(t => t.audio && t.audio !== '#');

    // Render playlist
    playlistTracks.innerHTML = validTracks.map((track, index) => `
        <li class="playlist-track" data-id="${track.id}">
            <img class="playlist-track-cover" src="${track.cover}" alt="${track.title}" loading="lazy">
            <div class="playlist-track-info">
                <div class="playlist-track-title">${track.title}</div>
                <div class="playlist-track-meta">
                    <span class="playlist-track-genre">${track.genre}</span>
                    <span class="playlist-track-duration">${track.duration}</span>
                </div>
            </div>
            <span class="playlist-track-price">$${track.price}</span>
            <button class="playlist-track-play" aria-label="Reproducir ${track.title}">
                <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            </button>
        </li>
    `).join('');

    // Update count
    playlistCount.textContent = validTracks.length;

    // Toggle playlist
    playlistToggle.addEventListener('click', () => {
        const isOpen = playlistContent.classList.toggle('open');
        playlistToggle.setAttribute('aria-expanded', isOpen);
    });

    // Clear playlist (just visual, keeps tracks)
    playlistClear?.addEventListener('click', (e) => {
        e.stopPropagation();
        // Could add clear functionality if needed
    });

    // Track click - load and play
    playlistTracks.querySelectorAll('.playlist-track').forEach(trackEl => {
        trackEl.addEventListener('click', (e) => {
            // Don't trigger if clicking the play button specifically (handled by button)
            if (e.target.closest('.playlist-track-play')) return;

            const trackId = parseInt(trackEl.dataset.id);
            const track = musicData.find(t => t.id === trackId);
            if (track) loadTrackFromPlaylist(track, trackEl);
        });

        // Play button in playlist
        const playBtn = trackEl.querySelector('.playlist-track-play');
        playBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackId = parseInt(trackEl.dataset.id);
            const track = musicData.find(t => t.id === trackId);
            if (track) loadTrackFromPlaylist(track, trackEl);
        });
    });

    function loadTrackFromPlaylist(track, trackEl) {
        if (!track.audio || track.audio === '#') {
            showToast('Este beat no tiene audio disponible', 'info');
            return;
        }

        // Update active state
        playlistTracks.querySelectorAll('.playlist-track').forEach(el => el.classList.remove('active'));
        playlistTracks.querySelectorAll('.playlist-track-play .icon-play').forEach(el => el.style.display = 'block');
        playlistTracks.querySelectorAll('.playlist-track-play .icon-pause').forEach(el => el.style.display = 'none');

        trackEl.classList.add('active');
        const playBtn = trackEl.querySelector('.playlist-track-play');
        playBtn.querySelector('.icon-play').style.display = 'none';
        playBtn.querySelector('.icon-pause').style.display = 'block';

        // Load into hero player
        audio.src = track.audio;
        audio.load();

        // Update hero UI
        const audioInfo = document.getElementById('audioInfo');
        const audioTitle = audioInfo?.querySelector('.audio-title');
        const audioFormat = audioInfo?.querySelector('.audio-format');
        audioTitle.textContent = track.title;
        audioFormat.textContent = `${track.genre} · $${track.price}`;
        audioInfo.classList.add('has-file');

        // Generate hero waveform
        const canvas = document.getElementById('heroWaveformCanvas');
        if (canvas) {
            generateWaveform(track.audio, canvas).then(data => {
                heroWaveformData = data;
                drawWaveform(canvas, data, 0);
            });
        }

        // Wait for audio to be ready before playing (fixes "interrupted by new load request")
        const playWhenReady = () => {
            audio.removeEventListener('canplaythrough', playWhenReady);
            audio.play().catch(err => {
                console.warn('Autoplay blocked:', err);
                showToast('Click en Play para activar audio', 'info');
            });
        };
        audio.addEventListener('canplaythrough', playWhenReady, { once: true });
    }

    // Sync playlist UI with audio events
    audio.addEventListener('play', () => {
        const activeTrack = playlistTracks.querySelector('.playlist-track.active');
        if (activeTrack) {
            const playBtn = activeTrack.querySelector('.playlist-track-play');
            playBtn.querySelector('.icon-play').style.display = 'none';
            playBtn.querySelector('.icon-pause').style.display = 'block';
        }
    });

    audio.addEventListener('pause', () => {
        const activeTrack = playlistTracks.querySelector('.playlist-track.active');
        if (activeTrack) {
            const playBtn = activeTrack.querySelector('.playlist-track-play');
            playBtn.querySelector('.icon-play').style.display = 'block';
            playBtn.querySelector('.icon-pause').style.display = 'none';
        }
    });

    audio.addEventListener('ended', () => {
        const activeTrack = playlistTracks.querySelector('.playlist-track.active');
        if (activeTrack) {
            const playBtn = activeTrack.querySelector('.playlist-track-play');
            playBtn.querySelector('.icon-play').style.display = 'block';
            playBtn.querySelector('.icon-pause').style.display = 'none';
        }
    });
}

// ========================================
// Performance: Debounce
// ========================================

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// ========================================
// Video Embed Handlers
// ========================================

// ========================================
// Accessibility: Skip Link
// ========================================

// Add skip link for keyboard navigation
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = 'Saltar al contenido principal';
skipLink.style.cssText = `
    position: absolute; top: -100%; left: 50%; transform: translateX(-50%);
    background: var(--accent); color: var(--bg); padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md); z-index: 9999; font-weight: 600;
    transition: top 0.3s ease;
`;
skipLink.addEventListener('focus', () => skipLink.style.top = 'var(--space-md)');
skipLink.addEventListener('blur', () => skipLink.style.top = '-100%');
document.body.insertBefore(skipLink, document.body.firstChild);

// Add main content id
const hero = document.getElementById('inicio');
if (hero) hero.id = 'main-content';

// ========================================
// Hero Waveform
// ========================================

let heroWaveformData = null;

function initHeroWaveform() {
    const canvas = elements.heroWaveformCanvas;
    const progressBar = elements.heroWaveformProgress;
    const timeDisplay = elements.heroWaveformTime;
    const waveformContainer = document.getElementById('heroWaveform');
    const audio = window.audioPlayer?.audio;

    if (!canvas || !audio) return;

    // Generate waveform for default track (DROG)
    generateWaveform(musicData[0]?.audio || audio.src, canvas).then(data => {
        heroWaveformData = data;
        drawWaveform(canvas, data, 0);
    });

    // Click to seek
    waveformContainer?.addEventListener('click', (e) => {
        if (!audio || isNaN(audio.duration)) return;

        const rect = waveformContainer.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.currentTime = percent * audio.duration;

        // Update visual immediately
        progressBar.style.width = `${percent * 100}%`;
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        if (heroWaveformData) drawWaveformProgress(canvas, heroWaveformData, percent);
    });

    // Update waveform during playback
    const updateHeroWaveform = () => {
        if (audio && !isNaN(audio.duration) && heroWaveformData) {
            const percent = audio.currentTime / audio.duration;
            progressBar.style.width = `${percent * 100}%`;
            timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            drawWaveformProgress(canvas, heroWaveformData, percent);
            requestAnimationFrame(updateHeroWaveform);
        }
    };
    updateHeroWaveform();
}

function drawWaveformProgress(canvas, data, progress) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const barWidth = width / data.length;
    const centerY = height / 2;
    const progressIndex = Math.floor(data.length * progress);

    // Only redraw transition area
    const startIdx = Math.max(0, progressIndex - 3);
    const endIdx = Math.min(data.length - 1, progressIndex + 3);

    for (let i = startIdx; i <= endIdx; i++) {
        const barHeight = data[i] * height * 0.85;
        const x = i * barWidth;
        const y = centerY - barHeight / 2;

        const isProgress = i <= progressIndex;
        ctx.fillStyle = isProgress ? 'rgba(232, 180, 64, 0.9)' : 'rgba(232, 180, 64, 0.15)';
        ctx.fillRect(x, y, barWidth * 0.75, barHeight);
    }
}

console.log('%c🎬 DELACROIX PRODUCER', 'font-size: 20px; font-weight: 700; color: #e8b440;');
console.log('%cSitio web cargado correctamente', 'color: #a1a1aa;');
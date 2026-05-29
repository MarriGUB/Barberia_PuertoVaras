// ANIMACIÓN DE ENTRADA (2 segundos, sin click)
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 2000);
});

// PANEL DE AJUSTES
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('open');
    
    let overlay = document.querySelector('.settings-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'settings-overlay';
        overlay.onclick = toggleSettings;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('show');
}

// TEMA CLARO/OSCURO
function setTheme(theme) {
    const body = document.body;
    const btnDark = document.getElementById('btnDark');
    const btnLight = document.getElementById('btnLight');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// TAMAÑO DE LETRA
function setFontSize(size) {
    const body = document.body;
    const btnSmall = document.getElementById('btnSmall');
    const btnNormal = document.getElementById('btnNormal');
    const btnLarge = document.getElementById('btnLarge');
    
    body.classList.remove('font-small', 'font-normal', 'font-large');
    btnSmall.classList.remove('active');
    btnNormal.classList.remove('active');
    btnLarge.classList.remove('active');
    
    if (size === 'small') {
        body.classList.add('font-small');
        btnSmall.classList.add('active');
        localStorage.setItem('fontSize', 'small');
    } else if (size === 'large') {
        body.classList.add('font-large');
        btnLarge.classList.add('active');
        localStorage.setItem('fontSize', 'large');
    } else {
        body.classList.add('font-normal');
        btnNormal.classList.add('active');
        localStorage.setItem('fontSize', 'normal');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    setFontSize(savedFontSize);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .info-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Menú responsive
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        if (navbar) navbar.style.transform = 'translateY(-100%)';
    } else {
        if (navbar) navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// GALERÍA: FLECHAS SOLO EN MÓVIL
// ============================================
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slider = document.querySelector('.gallery-slider');

function checkAndToggleArrows() {
    if (!prevBtn || !nextBtn || !slider) return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // En móvil: mostrar flechas y habilitarlas para deslizar
        prevBtn.classList.remove('hidden-btn');
        nextBtn.classList.remove('hidden-btn');
        
        // Configurar flechas para scroll
        prevBtn.onclick = () => {
            slider.scrollBy({ left: -260, behavior: 'smooth' });
        };
        nextBtn.onclick = () => {
            slider.scrollBy({ left: 260, behavior: 'smooth' });
        };
    } else {
        // En PC: ocultar flechas
        prevBtn.classList.add('hidden-btn');
        nextBtn.classList.add('hidden-btn');
        prevBtn.onclick = null;
        nextBtn.onclick = null;
    }
}

// Ejecutar al cargar y al redimensionar
checkAndToggleArrows();
window.addEventListener('resize', checkAndToggleArrows);
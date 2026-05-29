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
// GALERÍA CON FLECHAS CONDICIONALES
// ============================================
const track = document.getElementById('galleryTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slider = document.querySelector('.gallery-slider');
let currentIndex = 0;
let itemsPerView = 1;

function getItemsPerView() {
    if (!slider) return 1;
    const sliderWidth = slider.clientWidth;
    const itemWidth = 260; // ancho fijo de cada imagen
    const gap = 24; // 1.5rem en px aprox
    const totalItemWidth = itemWidth + gap;
    const possibleItems = Math.floor(sliderWidth / totalItemWidth);
    return Math.max(1, possibleItems);
}

function updateArrowsVisibility() {
    if (!track || !prevBtn || !nextBtn) return;
    
    const totalItems = document.querySelectorAll('.gallery-item').length;
    const itemsVisible = getItemsPerView();
    
    // Si todas las imágenes caben sin scroll, ocultamos flechas
    if (totalItems <= itemsVisible) {
        prevBtn.classList.add('hidden-btn');
        nextBtn.classList.add('hidden-btn');
    } else {
        prevBtn.classList.remove('hidden-btn');
        nextBtn.classList.remove('hidden-btn');
    }
}

function updateGallery() {
    if (!track) return;
    const totalItems = document.querySelectorAll('.gallery-item').length;
    const itemsVisible = getItemsPerView();
    const itemWidth = 260;
    const gap = 24;
    const totalItemWidth = itemWidth + gap;
    
    // Limitar currentIndex
    const maxIndex = Math.max(0, totalItems - itemsVisible);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const newPosition = -currentIndex * totalItemWidth;
    track.style.transform = `translateX(${newPosition}px)`;
}

function nextSlide() {
    const totalItems = document.querySelectorAll('.gallery-item').length;
    const itemsVisible = getItemsPerView();
    const maxIndex = Math.max(0, totalItems - itemsVisible);
    
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateGallery();
}

function prevSlide() {
    const totalItems = document.querySelectorAll('.gallery-item').length;
    const itemsVisible = getItemsPerView();
    const maxIndex = Math.max(0, totalItems - itemsVisible);
    
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateGallery();
}

// Event listeners
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// Actualizar al redimensionar
window.addEventListener('resize', () => {
    updateArrowsVisibility();
    updateGallery();
});

// Inicializar
setTimeout(() => {
    updateArrowsVisibility();
    updateGallery();
}, 100);

// También observar cambios en el slider
if (slider) {
    const resizeObserver = new ResizeObserver(() => {
        updateArrowsVisibility();
        updateGallery();
    });
    resizeObserver.observe(slider);
}
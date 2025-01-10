const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const slideInterval = 5000; // Cambia cada 5 segundos

// Cambia a una diapositiva específica
function goToSlide(index) {
    currentIndex = index;
    const offset = -index * 100; // Desplaza el carrusel
    carousel.style.transform = `translateX(${offset}%)`;

    // Actualiza los puntos activos
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Cambia a la siguiente diapositiva
function nextSlide() {
    currentIndex = (currentIndex + 1) % dots.length; // Ciclo infinito
    goToSlide(currentIndex);
}

// Configura los puntos para la navegación manual
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Cambia automáticamente cada 5 segundos
let autoSlide = setInterval(nextSlide, slideInterval);

// Pausa el carrusel si el mouse está encima
carousel.addEventListener('mouseover', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
});

// Inicia con el primer punto activo
goToSlide(currentIndex);

const slides = document.querySelectorAll('.slide img');

document.querySelector('.carousel-container').addEventListener('mousemove', (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 5; // Reduce el rango de movimiento (antes era 10 o más)
    const y = ((e.clientY - top) / height - 0.5) * 5;

    slides.forEach((img) => {
        img.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
});

// Restaurar la posición y escala de las imágenes
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    slides.forEach((img) => {
        img.style.transform = 'translate(0, 0) scale(1)'; // Sin ampliación
    });
});

const imageWrapper = document.querySelector('.image-wrapper');
const image = imageWrapper.querySelector('img');

// Detecta el movimiento del cursor
imageWrapper.addEventListener('mousemove', (event) => {
    const { left, top, width, height } = imageWrapper.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * 20; // Ajusta el rango de movimiento (20px)
    const y = ((event.clientY - top) / height - 0.5) * 20;

    // Aplica la transformación
    image.style.transform = `translate(${x}px, ${y}px) scale(1.05)`; // Escala ligera para resaltar
});

// Restaura la posición de la imagen cuando el cursor sale
imageWrapper.addEventListener('mouseleave', () => {
    image.style.transform = 'translate(0, 0) scale(1)';
});

// Carrossel
document.addEventListener('DOMContentLoaded', function() {
    // Configuração do carrossel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos
    let slideTimer;

    // Função para mostrar slide
    function showSlide(n) {
        // Esconde todos os slides
        carouselSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = 0;
        });
        
        // Remove a classe active de todos os dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajusta o índice do slide se for além dos limites
        currentSlide = (n + carouselSlides.length) % carouselSlides.length;
        
        // Mostra o slide atual
        carouselSlides[currentSlide].classList.add('active');
        setTimeout(() => {
            carouselSlides[currentSlide].style.opacity = 1;
        }, 10);
        
        // Ativa o dot correspondente
        dots[currentSlide].classList.add('active');
    }

    // Função para próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Função para slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Inicia o carrossel
    function startCarousel() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Para o carrossel
    function stopCarousel() {
        clearInterval(slideTimer);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopCarousel();
        nextSlide();
        startCarousel();
    });

    prevBtn.addEventListener('click', () => {
        stopCarousel();
        prevSlide();
        startCarousel();
    });

    // Adiciona event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });

    // Pausa o carrossel quando o mouse está sobre ele
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    // Inicia o carrossel
    showSlide(currentSlide);
    startCarousel();

    // Carrinho de compras
    const cartButtons = document.querySelectorAll('.destaque-item .btn, .galeria-overlay .btn');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            count++;
            cartCount.textContent = count;
            
            // Efeito visual
            this.textContent = 'Adicionado!';
            setTimeout(() => {
                this.textContent = 'Adicionar ao Carrinho';
            }, 1000);
        });
    });

    // Menu mobile (para telas pequenas)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const nav = document.querySelector('nav');
    
    if (window.innerWidth <= 768) {
        document.querySelector('header').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            if (document.querySelector('.menu-toggle')) {
                document.querySelector('.menu-toggle').remove();
            }
        } else {
            if (!document.querySelector('.menu-toggle')) {
                document.querySelector('header').appendChild(menuToggle);
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Depoimentos Slider
    const depoimentos = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showDepoimento(index) {
        depoimentos.forEach(depoimento => {
            depoimento.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        depoimentos[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextDepoimento() {
        currentIndex = (currentIndex + 1) % depoimentos.length;
        showDepoimento(currentIndex);
    }

    function prevDepoimento() {
        currentIndex = (currentIndex - 1 + depoimentos.length) % depoimentos.length;
        showDepoimento(currentIndex);
    }

    nextBtn.addEventListener('click', nextDepoimento);
    prevBtn.addEventListener('click', prevDepoimento);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showDepoimento(index);
        });
    });

    // Auto slide para depoimentos
    let slideInterval = setInterval(nextDepoimento, 5000);

    const depoimentosSlider = document.querySelector('.depoimentos-slider');
    
    depoimentosSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    depoimentosSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextDepoimento, 5000);
    });

    // Contador de Estatísticas
    const estatisticas = document.querySelectorAll('.estatistica .numero');
    let counted = false;

    function startCounting() {
        if (counted) return;
        
        estatisticas.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 20); // Incremento a cada 20ms
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                }
            }, 20);
        });
        
        counted = true;
    }

    // Iniciar contagem quando a seção estiver visível
    function checkIfInView() {
        const estatisticasSection = document.querySelector('.estatisticas');
        if (!estatisticasSection) return;
        
        const elementTop = estatisticasSection.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            startCounting();
        }
    }

    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Verificar na carga inicial

    // Formulário de Contato
    const formContato = document.getElementById('form-contato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (!nome || !email || !telefone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de envio
            alert(`Obrigado ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            formContato.reset();
        });
    }

    // Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Destacar link do menu ativo durante o scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.getElementById('header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animação de entrada para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.servico-card, .beneficio-card, .blog-card, .contato-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar com opacidade 0
    const animatedElements = document.querySelectorAll('.servico-card, .beneficio-card, .blog-card, .contato-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Chamar a função no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
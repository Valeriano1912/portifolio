document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = "258850724566";
    const EMAIL_CONFIG = "valtermangasse@gmail.com";

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const savedTheme = localStorage.getItem('jvj_theme');
    if (savedTheme) {
        htmlElement.className = savedTheme;
        updateThemeIcon(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                htmlElement.classList.add('light');
                localStorage.setItem('jvj_theme', 'light');
                updateThemeIcon('light');
            } else {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                localStorage.setItem('jvj_theme', 'dark');
                updateThemeIcon('dark');
            }
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projecto-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    const contactoForm = document.getElementById('contactoForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactoForm) {
        contactoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !assunto || !mensagem) {
                showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Por favor, insira um endereço de e-mail válido.', 'error');
                return;
            }

            const textoWhatsApp = `Olá João, meu nome é *${nome}* (${email}).%0AAssunto: *${assunto}*%0A%0AMensagem:%0A${mensagem}`;
            const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${textoWhatsApp}`;

            showFeedback('A redirecionar para o WhatsApp com a sua mensagem...', 'success');

            setTimeout(() => {
                window.open(urlWhatsApp, '_blank');
                contactoForm.reset();
            }, 1500);
        });
    }

    function showFeedback(message, type) {
        if (!formFeedback) return;
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        setTimeout(() => {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
        }, 5000);
    }

    const backToTopBtn = document.getElementById('backToTop');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if (backToTopBtn) backToTopBtn.classList.add('show');
            if (header) header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('show');
            if (header) header.style.boxShadow = 'none';
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------------------
    // Navegação Responsiva (Menu Toggle)
    // -------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('main-menu');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active'); // Adiciona/remove a classe 'active' para mostrar/esconder
            // Gerencia o foco para acessibilidade, se desejar focar no primeiro link ao abrir
            if (!isExpanded) {
                // Pequeno timeout para garantir que o elemento esteja visível antes de tentar focar
                setTimeout(() => {
                    const firstLink = navLinks.querySelector('a');
                    if (firstLink) {
                        firstLink.focus();
                    }
                }, 50); 
            }
        });

        // Fechar menu ao clicar em um link (opcional, dependendo do UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) { // Apenas em telas pequenas
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    menuToggle.focus(); // Retorna o foco para o botão do menu após fechar
                }
            });
        });

        // Fechar menu se redimensionar para desktop enquanto ele estiver aberto
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            }
        });
    }

    // -------------------------------------------
    // Controles de Acessibilidade
    // -------------------------------------------

    // Alto Contraste
    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            // Salvar preferência no localStorage
            if (document.body.classList.contains('high-contrast')) {
                localStorage.setItem('accessibility-contrast', 'on');
            } else {
                localStorage.removeItem('accessibility-contrast');
            }
        });
        // Carregar preferência ao carregar a página
        if (localStorage.getItem('accessibility-contrast') === 'on') {
            document.body.classList.add('high-contrast');
        }
    }

    // Aumento/Diminuição de Fonte
    const fontSizeIncreaseBtn = document.getElementById('font-size-increase');
    const fontSizeDecreaseBtn = document.getElementById('font-size-decrease');
    const body = document.body;

    function adjustFontSize(action) {
        let currentSize = localStorage.getItem('accessibility-font-size') || 'base';

        if (action === 'increase') {
            if (currentSize === 'base') {
                body.classList.remove('font-larger'); // Garante que não há conflito
                body.classList.add('font-large');
                currentSize = 'large';
            } else if (currentSize === 'large') {
                body.classList.remove('font-large'); // Garante que não há conflito
                body.classList.add('font-larger');
                currentSize = 'larger';
            }
        } else if (action === 'decrease') {
            if (currentSize === 'larger') {
                body.classList.remove('font-larger');
                body.classList.add('font-large');
                currentSize = 'large';
            } else if (currentSize === 'large') {
                body.classList.remove('font-large');
                body.classList.remove('font-larger'); // Garante que nenhuma esteja ativa
                currentSize = 'base';
            }
        }
        localStorage.setItem('accessibility-font-size', currentSize);
    }

    if (fontSizeIncreaseBtn) {
        fontSizeIncreaseBtn.addEventListener('click', () => adjustFontSize('increase'));
    }
    if (fontSizeDecreaseBtn) {
        fontSizeDecreaseBtn.addEventListener('click', () => adjustFontSize('decrease'));
    }

    // Carregar preferência de fonte ao carregar a página
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    if (savedFontSize === 'large') {
        body.classList.add('font-large');
    } else if (savedFontSize === 'larger') {
        body.classList.add('font-larger');
    }

    // -------------------------------------------
    // Outras Funcionalidades (Ex: Favoritos)
    // -------------------------------------------
    const favoriteButtons = document.querySelectorAll('.button-icon[aria-label*="favoritos"]');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Lógica para adicionar/remover dos favoritos
            // Por exemplo, mudar a cor do coração ou enviar para um backend
            console.log('Funcionalidade de favoritos ativada!');
            // Exemplo visual simples: muda a cor do ícone
            const heartIcon = this.querySelector('img');
            // Você precisará de duas versões do ícone (vazia e preenchida)
            // ex: icons/heart.svg (vazio) e icons/heart-filled.svg (preenchido)
            if (heartIcon.src.includes('heart-filled.svg')) {
                heartIcon.src = 'icons/heart.svg'; // Ícone vazio
                this.setAttribute('aria-label', 'Adicionar aos favoritos');
            } else {
                heartIcon.src = 'icons/heart-filled.svg'; // Ícone preenchido
                this.setAttribute('aria-label', 'Remover dos favoritos');
            }
        });
    });

    // -------------------------------------------
    // Exemplo: Simulação de carregamento de animais via JS (se fosse dinâmico)
    // -------------------------------------------
    // Esta função seria usada se você estivesse buscando dados de uma API, por exemplo.
    // Atualmente, os animais estão direto no HTML.
    /*
    function loadAnimalsDynamically() {
        const animalGrid = document.querySelector('.animal-grid');
        // Simular um fetch de dados (isso viria de um backend real)
        const animalsData = [
            { id: 'toto', name: 'Totó', age: '3 anos', breed: 'Poodle', desc: 'Energético e amigável.', img: 'images/animal-toto.jpg' },
            { id: 'luna', name: 'Luna', age: '1 ano', breed: 'SRD', desc: 'Sociável e muito carinhosa.', img: 'images/animal-luna.jpg' },
            // Adicione mais dados conforme necessário
        ];

        // Limpa o grid antes de adicionar novos
        if (animalGrid) animalGrid.innerHTML = ''; 

        animalsData.forEach(animal => {
            const card = document.createElement('article');
            card.className = 'animal-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `${animal.name}, idade: ${animal.age}, raça: ${animal.breed}`);
            card.innerHTML = `
                <img src="${animal.img}" alt="Foto do ${animal.name}">
                <h3>${animal.name}</h3>
                <p>Idade: ${animal.age}</p>
                <p>Raça: ${animal.breed}</p>
                <p>${animal.desc}</p>
                <div class="card-actions">
                    <a href="animal-detalhe.html?id=${animal.id}" class="button button-small" aria-label="Ver mais detalhes sobre ${animal.name}">Detalhes</a>
                    <button class="button button-icon" aria-label="Adicionar ${animal.name} aos favoritos">
                        <img src="icons/heart.svg" alt="Ícone de coração">
                        <span class="sr-only">Adicionar aos favoritos</span>
                    </button>
                </div>
            `;
            if (animalGrid) animalGrid.appendChild(card);
        });
    }
    // Para usar essa função, você descomentaria a linha abaixo:
    // loadAnimalsDynamically(); 
    */
});
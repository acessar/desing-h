/* =========================================
   STYLE MEN - SCRIPT COMPLETO COM ONDAS AVANÇADAS
   ========================================= */

// --- 1. LOADER ---
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 800);
});

// --- 2. ANIMAÇÕES FADE-IN NO SCROLL ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in-element').forEach(el => {
        observer.observe(el);
    });
    
    // Carregar imagens de fundo dos cards
    loadCardBackgroundImages();
    
    // Inicializar ondas avançadas
    initAdvancedWaves();
});

// --- 3. ONDAS AVANÇADAS COM CANVAS E GSAP ---
function initAdvancedWaves() {
    const canvas = document.getElementById('waves-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    // Configurações das ondas
    const waves = [
        {
            amplitude: 40,
            frequency: 0.015,
            speed: 0.008,
            color: { r: 255, g: 229, b: 241 }, // Rosa Quartz
            opacity: 0.6,
            offset: 0,
            blur: 2
        },
        {
            amplitude: 50,
            frequency: 0.012,
            speed: 0.01,
            color: { r: 255, g: 133, b: 184 }, // Rosa Pastel
            opacity: 0.7,
            offset: Math.PI / 3,
            blur: 1.5
        },
        {
            amplitude: 45,
            frequency: 0.018,
            speed: 0.012,
            color: { r: 255, g: 77, b: 148 }, // Rosa Vibrante
            opacity: 0.65,
            offset: Math.PI / 2,
            blur: 1
        },
        {
            amplitude: 35,
            frequency: 0.02,
            speed: 0.009,
            color: { r: 255, g: 107, b: 168 }, // Rosa Neon
            opacity: 0.5,
            offset: Math.PI / 4,
            blur: 0.8
        },
        {
            amplitude: 30,
            frequency: 0.025,
            speed: 0.007,
            color: { r: 255, g: 255, b: 255 }, // Highlight Branco
            opacity: 0.3,
            offset: Math.PI / 6,
            blur: 1.2
        }
    ];
    
    // Função para redimensionar canvas
    function resizeCanvas() {
        const header = document.querySelector('.animated-waves-header');
        if (header) {
            canvas.width = window.innerWidth;
            canvas.height = header.offsetHeight;
        }
    }
    
    // Função para desenhar uma onda
    function drawWave(wave, yOffset = 0) {
        ctx.save();
        ctx.globalAlpha = wave.opacity;
        ctx.filter = `blur(${wave.blur}px)`;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + yOffset);
        
        for (let x = 0; x <= canvas.width; x += 2) {
            const y = canvas.height / 2 + yOffset + 
                Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
                Math.cos(x * wave.frequency * 0.7 + time * wave.speed * 1.3) * wave.amplitude * 0.5;
            
            ctx.lineTo(x, y);
        }
        
        // Gradiente para cada onda
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity})`);
        gradient.addColorStop(0.5, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    // Função de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar cada onda com offset vertical
        waves.forEach((wave, index) => {
            const yOffset = (index - 2) * 30; // Espaçamento vertical entre ondas
            drawWave(wave, yOffset);
        });
        
        // Incrementar tempo para animação contínua
        time += 0.02;
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Inicializar
    resizeCanvas();
    animate();
    
    // Redimensionar ao mudar tamanho da janela
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    // Parallax suave com GSAP ScrollTrigger (se disponível)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to(canvas, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: canvas,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }
}

// --- 4. EFEITO PARALLAX SUAVE ---
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.animated-waves-header');
    
    if (header) {
        const rate = scrolled * -0.2;
        header.style.transform = `translateY(${rate}px)`;
    }
});

// --- 5. CARREGAR IMAGENS DE FUNDO DOS CARDS ---
function loadCardBackgroundImages() {
    const cardBackgrounds = document.querySelectorAll('.service-card-background');
    
    cardBackgrounds.forEach(cardBg => {
        const imageName = cardBg.getAttribute('data-bg-image');
        
        if (imageName) {
            // Define a imagem de fundo imediatamente
            cardBg.style.backgroundImage = `url('${imageName}')`;
            
            // Pré-carrega a imagem para garantir que está disponível
            const img = new Image();
            
            img.onload = function() {
                // Imagem carregada com sucesso, aumenta opacidade
                cardBg.style.opacity = '0.6';
            };
            
            // Em caso de erro, mantém fundo escuro padrão
            img.onerror = function() {
                console.log(`Imagem ${imageName} não encontrada. Usando fundo padrão.`);
                cardBg.style.backgroundImage = 'none';
                cardBg.style.opacity = '0';
            };
            
            // Tenta carregar a imagem
            img.src = imageName;
        }
    });
}

// --- 6. REDIRECIONAR PARA WHATSAPP ---
function redirectWhatsApp() {
    const phoneNumber = '5583991816152';
    const message = 'Olá! Gostaria de conhecer mais sobre os produtos Style Men.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

// --- 7. MODAL E FORMULÁRIO ---
function openModal() {
    const modal = document.getElementById('formModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('formModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Resetar formulário
        const form = document.getElementById('whatsappForm');
        if (form) form.reset();
        
        // Resetar mensagens e botões
        const successMsg = document.getElementById('successMessage');
        if (successMsg) successMsg.classList.remove('show');
        
        const submitButton = document.querySelector('.submit-button');
        if (submitButton) {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }
}

// Fechar modal ao clicar fora (Overlay)
const modalOverlay = document.getElementById('formModal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// --- 8. MÁSCARA E VALIDAÇÃO DE TELEFONE ---
const inputTelefone = document.getElementById('telefone');
if (inputTelefone) {
    inputTelefone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = '(' + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 11);
        }
        
        e.target.value = formattedValue;
    });
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
}

// --- 9. ENVIO PARA WHATSAPP ---
const formWhatsapp = document.getElementById('whatsappForm');
if (formWhatsapp) {
    formWhatsapp.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = document.querySelector('.submit-button');
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Coletar dados
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const tamanho = document.getElementById('tamanho').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validações
        if (!nome || !telefone) {
            alert('Por favor, preencha seu nome e telefone.');
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            return;
        }
        
        if (!isValidPhone(telefone)) {
            alert('Por favor, digite um telefone válido.');
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            return;
        }
        
        // Montar mensagem
        let whatsappMessage = `👔 *Style Men - Interesse em Nossos Produtos*\n\n`;
        whatsappMessage += `👤 *Nome:* ${nome}\n`;
        whatsappMessage += `📱 *Telefone:* ${telefone}\n`;
        
        if (endereco) whatsappMessage += `📍 *Endereço:* ${endereco}\n`;
        if (tamanho) whatsappMessage += `👕 *Categoria:* ${tamanho}\n`;
        if (mensagem) whatsappMessage += `💬 *Detalhes:* ${mensagem}\n`;
        
        whatsappMessage += `\n_Gostaria de conhecer nossos produtos e receber ofertas! 🛍_`;
        
        const whatsappNumber = '5583991816152';
        
        // Processar e redirecionar
        setTimeout(() => {
            const successMsg = document.getElementById('successMessage');
            if (successMsg) successMsg.classList.add('show');
            
            setTimeout(() => {
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                
                try {
                    const newWindow = window.open(whatsappURL, '_blank');
                    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                        window.location.href = whatsappURL;
                    }
                } catch (error) {
                    window.location.href = whatsappURL;
                }
                
                setTimeout(closeModal, 500);
            }, 1000);
        }, 600);
    });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Detecção de Touch Device
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

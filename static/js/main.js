// Main JavaScript for romantic website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page-specific functionality
    initializePage();
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add touch feedback for mobile
    addTouchFeedback();
    
    // Initialize animations
    initializeAnimations();
});

function initializePage() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'gallery':
            initializeGalleryPage();
            break;
        case 'proposal':
            initializeProposalPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.includes('gallery')) return 'gallery';
    if (path.includes('proposal')) return 'proposal';
    return 'home';
}

function initializeHomePage() {
    // Add sparkle effect to selected message
    const messageOptions = document.querySelectorAll('.message-option');
    
    messageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selections
            messageOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.style.animation = '';
            });
            
            // Add selection effect
            this.classList.add('selected');
            this.style.animation = 'sparkle 0.8s ease-in-out';
            
            // Enable ready button with enhanced animation
            const readyBtn = document.querySelector('.ready-btn');
            if (readyBtn) {
                readyBtn.style.animation = 'pulse 1s infinite, glow 2s ease-in-out infinite';
            }
        });
        
        // Add hover effect for better mobile interaction
        option.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        option.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initializeGalleryPage() {
    // Enhanced photo navigation with keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changePhoto(-1);
        } else if (e.key === 'ArrowRight') {
            changePhoto(1);
        } else if (e.key === 'Escape') {
            window.location.href = '/';
        }
    });
    
    // Add double-tap to zoom on mobile (basic implementation)
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Double tap detected - could add zoom functionality here
            const activeSlide = document.querySelector('.photo-slide.active');
            if (activeSlide) {
                activeSlide.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    activeSlide.style.transform = 'scale(1)';
                }, 300);
            }
        }
        lastTap = currentTime;
    });
}

function initializeProposalPage() {
    // Add typewriter effect to proposal text
    const proposalLines = document.querySelectorAll('.proposal-line');
    
    proposalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 1000);
    });
    
    // Add heartbeat effect to WhatsApp button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 150);
        }, 3000);
    }
}

function typeText(element, text, speed) {
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    typeChar();
}

function addTouchFeedback() {
    // Add haptic feedback for touch devices (if supported)
    const interactiveElements = document.querySelectorAll('button, .message-option, .nav-btn, a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            // Add visual feedback
            this.style.opacity = '0.8';
            
            // Add haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.opacity = '1';
        });
    });
}

function initializeAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Utility functions for enhanced user experience
function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.background = 'radial-gradient(circle, #ff6b6b, transparent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.opacity = '0';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = Math.random() * rect.width + 'px';
    sparkle.style.top = Math.random() * rect.height + 'px';
    
    element.appendChild(sparkle);
    
    // Animate sparkle
    sparkle.animate([
        { opacity: 0, transform: 'scale(0) translateY(0px)' },
        { opacity: 1, transform: 'scale(1) translateY(-20px)' },
        { opacity: 0, transform: 'scale(0) translateY(-40px)' }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => sparkle.remove();
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% { box-shadow: 0 0 0 rgba(255, 107, 107, 0); }
        50% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
        100% { box-shadow: 0 0 0 rgba(255, 107, 107, 0); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3); }
        50% { box-shadow: 0 15px 50px rgba(255, 107, 107, 0.6); }
    }
`;
document.head.appendChild(style);

// Error handling for navigation
window.addEventListener('error', function(e) {
    console.error('Navigation error:', e.error);
    // Graceful fallback - redirect to home
    if (window.location.pathname !== '/') {
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }
});

// Performance optimization - lazy load images in gallery
function lazyLoadImages() {
    const images = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

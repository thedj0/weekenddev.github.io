// ===========================
// ELITE WEB STUDIO
// Main JavaScript File
// ===========================

// Load pricing dynamically from JSON
async function loadPricing() {
    try {
        const response = await fetch('pricing-config.json');
        const pricingData = await response.json();
        
        const pricingGrid = document.getElementById('pricingGrid');
        if (!pricingGrid) return;
        
        pricingGrid.innerHTML = '';
        
        pricingData.packages.forEach(pkg => {
            const card = document.createElement('div');
            card.className = `pricing-card ${pkg.featured ? 'featured' : ''}`;
            
            let badgeHTML = '';
            if (pkg.featured) {
                badgeHTML = '<div class="pricing-badge">Most Popular</div>';
            }
            
            // Format price display
            let priceHTML = '';
            if (pkg.priceMin) {
                priceHTML = `
                    <div class="price">₹${pkg.price.toLocaleString('en-IN')}</div>
                    <div class="price-usd">($${pkg.priceUSD} USD)</div>
                    <div class="price-label">Starting Price</div>
                    <div class="price-note">Flexible pricing from ₹${pkg.priceMin.toLocaleString('en-IN')} ($${pkg.priceMinUSD} USD)</div>
                `;
            } else {
                priceHTML = `
                    ${pkg.originalPrice ? `<div class="price-original">₹${pkg.originalPrice.toLocaleString('en-IN')}</div>` : ''}
                    <div class="price">₹${pkg.price.toLocaleString('en-IN')}</div>
                    <div class="price-usd">($${pkg.priceUSD} USD)</div>
                    <div class="price-label">${pkg.priceLabel || 'One-time Payment'}</div>
                `;
            }
            
            let featuresHTML = '';
            if (pkg.features && pkg.features.length > 0) {
                featuresHTML = '<ul class="pricing-features">';
                pkg.features.forEach(feature => {
                    featuresHTML += `<li>${feature}</li>`;
                });
                featuresHTML += '</ul>';
            }
            
            card.innerHTML = `
                ${badgeHTML}
                <h3>${pkg.name}</h3>
                ${priceHTML}
                <p>${pkg.description}</p>
                ${featuresHTML}
                <a href="#contact" class="btn-primary">Get Started</a>
            `;
            
            pricingGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading pricing:', error);
        // Fallback pricing display
        displayFallbackPricing();
    }
}

// Fallback pricing if JSON fails to load
function displayFallbackPricing() {
    const pricingGrid = document.getElementById('pricingGrid');
    if (!pricingGrid) return;
    
    const fallbackPricing = [
        {
            name: 'Portfolio Starter',
            price: 499,
            description: 'Perfect for individuals and professionals',
            features: ['5 Pages', 'Responsive Design', 'Contact Form', 'SEO Optimization', 'Free GitHub Hosting Setup']
        },
        {
            name: 'Business Premium',
            price: 1299,
            description: 'Ideal for cafes, restaurants & small businesses',
            features: ['Up to 15 Pages', 'Custom Design', 'Booking Integration', 'Google Maps', 'Social Media Links', 'Blog System'],
            featured: true
        },
        {
            name: 'E-Commerce Pro',
            price: 2499,
            description: 'Full-featured online store',
            features: ['Product Management', 'Secure Checkout', 'Payment Gateway', 'Inventory System', 'Customer Accounts', 'Analytics Dashboard']
        }
    ];
    
    pricingGrid.innerHTML = '';
    fallbackPricing.forEach(pkg => {
        const card = document.createElement('div');
        card.className = `pricing-card ${pkg.featured ? 'featured' : ''}`;
        
        let badgeHTML = pkg.featured ? '<div class="pricing-badge">Most Popular</div>' : '';
        let featuresHTML = '<ul class="pricing-features">';
        pkg.features.forEach(feature => {
            featuresHTML += `<li>${feature}</li>`;
        });
        featuresHTML += '</ul>';
        
        card.innerHTML = `
            ${badgeHTML}
            <h3>${pkg.name}</h3>
            <div class="price">$${pkg.price.toLocaleString()}</div>
            <div class="price-label">Starting Price</div>
            <p>${pkg.description}</p>
            ${featuresHTML}
            <a href="#contact" class="btn-primary">Get Started</a>
        `;
        
        pricingGrid.appendChild(card);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Premium Navbar scroll effect with class toggle
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Add premium parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual backend endpoint)
        setTimeout(() => {
            alert('Thank you for your interest! We will contact you within 24 hours to schedule your free consultation.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // In production, replace the above with:
        /*
        try {
            const response = await fetch('YOUR_BACKEND_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Thank you for your interest! We will contact you within 24 hours.');
                contactForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Sorry, there was an error. Please email us directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
        */
    });
}

// Intersection Observer for fade-in animations
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

// Observe all service cards, pricing cards, etc.
document.querySelectorAll('.service-card, .pricing-card, .process-step, .demo-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
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

// Lazy loading for images (if you add images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPricing();
    
    // Add smooth reveal to hero section
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 100);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent code here
}));

// Add dynamic year to footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}

// ===========================
// CONTACT FORM SCHEDULING
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const urgencyRadios = document.querySelectorAll('input[name="urgency"]');
    const scheduleFields = document.querySelector('.schedule-fields');
    const dateInput = document.querySelector('input[name="preferred_date"]');
    const timeSelect = document.querySelector('select[name="preferred_time"]');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (urgencyRadios.length > 0 && scheduleFields) {
        urgencyRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'Contact me ASAP') {
                    scheduleFields.classList.add('hidden');
                    // Remove required attribute when hidden
                    if (dateInput) dateInput.removeAttribute('required');
                    if (timeSelect) timeSelect.removeAttribute('required');
                } else {
                    scheduleFields.classList.remove('hidden');
                    // Add required attribute when visible
                    if (dateInput) dateInput.setAttribute('required', '');
                    if (timeSelect) timeSelect.setAttribute('required', '');
                }
            });
        });
    }
    
    // Set minimum date to tomorrow
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
    
    // Handle form submission with AJAX
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Disable submit button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    formStatus.style.display = 'block';
                    formStatus.style.backgroundColor = '#d4edda';
                    formStatus.style.color = '#155724';
                    formStatus.style.border = '1px solid #c3e6cb';
                    formStatus.innerHTML = '✅ <strong>Success!</strong> We received your consultation request. Check your email for confirmation.';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 10 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 10000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.style.display = 'block';
                formStatus.style.backgroundColor = '#f8d7da';
                formStatus.style.color = '#721c24';
                formStatus.style.border = '1px solid #f5c6cb';
                formStatus.innerHTML = '❌ <strong>Error!</strong> Something went wrong. Please try again or email us directly.';
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});

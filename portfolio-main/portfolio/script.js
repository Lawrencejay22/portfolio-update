// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Menu Toggle
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
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
        // Close mobile menu after clicking
        navbar.classList.remove('active');
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Full Name"]').value;
        const email = this.querySelector('input[placeholder="Email Address"]').value;
        const subject = this.querySelector('input[placeholder="Email Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:gabionzalawrencejay@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Thank you for your message! Your email client should open now.');
    });
}

// Typing Animation Enhancement
const typingText = document.querySelector('.typing-text span');
if (typingText) {
    const words = ['Web Developer', 'UI/UX Designer', 'Graphic Designer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

// Enhanced Skill Bar Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.progress .bar span');
            const progressItems = entry.target.querySelectorAll('.progress');
            
            skillBars.forEach((bar, index) => {
                // Reset animation
                bar.style.width = '0%';
                bar.style.animation = 'none';
                
                // Get target width from CSS
                const targetWidth = getComputedStyle(bar).getPropertyValue('width');
                const percentage = parseInt(targetWidth);
                
                // Animate with delay
                setTimeout(() => {
                    bar.style.animation = 'animate-bar 2.5s ease-out forwards';
                    bar.style.boxShadow = `0 0 20px ${getSkillBarGlow(percentage)}`;
                    
                    // Add shimmer effect
                    bar.classList.add('shimmer-effect');
                    
                    // Animate percentage counter
                    const progressH3 = progressItems[index]?.querySelector('h3 span');
                    if (progressH3) {
                        animateSkillCounter(progressH3, percentage);
                    }
                }, index * 200);
            });
            
            // Add stagger animation to progress items
            progressItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 150);
            });
        }
    });
}, observerOptions);

// Function to get glow color based on percentage
const getSkillBarGlow = (percentage) => {
    if (percentage >= 85) return 'rgba(0, 255, 127, 0.6)'; // Green
    if (percentage >= 70) return 'rgba(75, 136, 183, 0.6)'; // Blue
    if (percentage >= 50) return 'rgba(255, 193, 7, 0.6)'; // Yellow
    return 'rgba(255, 87, 34, 0.6)'; // Orange
};

// Function to animate skill percentage counter
const animateSkillCounter = (element, target) => {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, 25);
};

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add dynamic CSS for shimmer effect
const skillsStyle = document.createElement('style');
skillsStyle.textContent = `
    .shimmer-effect::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: skillShimmer 2s ease-in-out 0.5s;
    }
    
    @keyframes skillShimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .progress {
        position: relative;
        overflow: hidden;
    }
    
    .progress .bar span {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(skillsStyle);

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.footer-iconTop a');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImg = document.querySelector('.home-img');
    if (homeImg) {
        homeImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to service boxes
document.querySelectorAll('.service-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Console welcome message
console.log('%c Welcome to Lawrence Jay\'s Portfolio! ', 'background: #4b88b7cd; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Feel free to explore the code and reach out if you have any questions! ', 'color: #4b88b7cd; font-size: 14px;');
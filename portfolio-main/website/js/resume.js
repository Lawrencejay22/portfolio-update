/* ===============================
    PORTFOLIO MAIN JAVASCRIPT (script.js)
==================================*/

// 1. DOM Element Declarations (Global Scope) 🧱
// These variables must successfully select the elements from the HTML
const header = document.querySelector('.header');
const nav = document.querySelector('.nav'); 
const talkBtn = document.querySelector('.btn-primary');
// Assuming the typing element is inside a container with class 'typing-text'
const typingElement = document.querySelector('.intro-text h2 span'); 

// Create the mobile menu button element, as it's not in the initial HTML
const menuBtn = document.createElement('button'); 

// Configure the Menu Button for Mobile Toggle
if (menuBtn) {
    menuBtn.classList.add('menu-toggle');
    // Using Font Awesome icon for the hamburger bar
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>'; 
}

// ---

// 2. Mobile Menu Logic (Global Scope) 📱
if (header && menuBtn && nav) {
    // Insert menu button into header
    header.prepend(menuBtn);
    
    // Toggle the mobile menu visibility when the button is clicked
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        menuBtn.classList.toggle('active');
    });
}

// ---

// 3. Smooth Scrolling Effect for Internal Links (Global Scope) 🖱️
// Target all internal links (starting with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Scroll to the target element's position, adjusting for fixed header height (-60px offset)
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });

            // Close the mobile menu after clicking an anchor link
            if (nav && menuBtn) {
                nav.classList.remove('show-menu');
                menuBtn.classList.remove('active');
            }
        }
    });
});

// ---

// 4. "LET’S TALK" Button Action (Mailto) (Global Scope) 📧
if (talkBtn) {
    talkBtn.addEventListener('click', () => {
        // Opens the default mail client
        window.location.href = 'mailto:gabionzalawrencejay@gmail.com?subject=Project Inquiry&body=Hi Lawrence, I’d like to discuss...';
    });
}

// ---

// 5. DOM Ready Functions (Typing Effect & Contact Form) ✍️ 📥
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 5A. Typing Effect Animation
    // ===================================
    if (typingElement) {
        // Configuration and State Variables
        const roles = ["UI/UX Designer", "Graphic Designer", "Web Designer", "Creative Thinker"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const TYPE_SPEED = 150;     
        const DELETE_SPEED = 75;    
        const PAUSE_TIME = 1500;    
        const START_NEXT_PAUSE = 500;

        function animateText() {
            const currentRole = roles[roleIndex];
            let delay = TYPE_SPEED;

            if (isDeleting) {
                // DELETING: Remove a character
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                delay = DELETE_SPEED;

                if (charIndex === 0) {
                    // Deletion complete: switch to typing
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length; // Cycle to the next role
                    delay = START_NEXT_PAUSE; 
                }

            } else {
                // TYPING: Add a character
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentRole.length) {
                    // Typing complete: switch to deleting
                    isDeleting = true;
                    delay = PAUSE_TIME;
                }
            }
            
            // Schedule the next animation step
            setTimeout(animateText, delay);
        }

        // Start the animation
        animateText();
    }
});
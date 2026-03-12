// This file can be used for dynamic content, event handling, or other interactive features.

// Example: Add a class to the header when the user scrolls
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Example: Add a click event to a button
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', () => {
        alert('Button was clicked!');
    });
}
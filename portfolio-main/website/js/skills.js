// ===== Animated Skill Graph Script =====

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Skills script loaded");

  const bars = document.querySelectorAll(".fill");
  console.log(`Found ${bars.length} skill bars`);

  // Function to set color based on percentage
  const setBarColor = (bar, percent) => {
    // Remove existing color classes
    bar.classList.remove("red", "orange", "lightgreen", "green");

    if (percent <= 30) {
      bar.classList.add("red");
    } else if (percent <= 50) {
      bar.classList.add("orange");
    } else if (percent <= 70) {
      bar.classList.add("lightgreen");
    } else {
      bar.classList.add("green");
    }
  };

  // Function to animate counter
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.round(current) + "%";
    }, 20);
  };

  // Function to get glow color based on percentage
  const getGlowColor = (percent) => {
    if (percent <= 30) return "rgba(255, 75, 75, 0.6)";
    if (percent <= 50) return "rgba(255, 179, 71, 0.6)";
    if (percent <= 70) return "rgba(178, 255, 89, 0.6)";
    return "rgba(0, 200, 83, 0.6)";
  };

  // Function to animate a single bar
  const animateBar = (bar, delay = 0) => {
    const percentText = bar.parentElement.parentElement.querySelector(".percent");
    let percent = parseInt(bar.getAttribute('data-percent'));

    // Fallback to get percentage from text
    if (!percent && percentText) {
      percent = parseInt(percentText.textContent) || 0;
    }

    console.log(`Animating bar with ${percent}%`);

    setTimeout(() => {
      // Reset bar
      bar.style.width = "0%";

      // Set color
      setBarColor(bar, percent);

      // Animate bar width with important to override CSS
      setTimeout(() => {
        bar.style.setProperty('width', percent + "%", 'important');
        bar.style.boxShadow = `0 0 20px ${getGlowColor(percent)}`;
      }, 100);

      // Animate counter
      if (percentText) {
        percentText.textContent = "0%";
        setTimeout(() => {
          animateCounter(percentText, percent);
        }, 200);
      }
    }, delay);
  };

  // Intersection Observer for animation trigger
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const index = Array.from(bars).indexOf(bar);
          animateBar(bar, index * 200);
          observer.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Initialize all bars
  bars.forEach((bar, index) => {
    // Get percentage from data attribute or text
    let percent = parseInt(bar.getAttribute('data-percent'));
    const percentText = bar.parentElement.parentElement.querySelector(".percent");

    if (!percent && percentText) {
      percent = parseInt(percentText.textContent) || 0;
      bar.setAttribute('data-percent', percent);
    }

    // Set initial state
    bar.style.width = "0%";
    bar.style.transition = "width 2.5s ease-out, box-shadow 0.5s ease";
    setBarColor(bar, percent);

    // Observe for intersection
    observer.observe(bar);
  });

  // Add animation to skill cards
  const skillCards = document.querySelectorAll(".graph-card");
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Immediate trigger for testing - animate all bars after a short delay
  setTimeout(() => {
    console.log("Immediate animation trigger");
    bars.forEach((bar, index) => {
      const percent = parseInt(bar.getAttribute('data-percent')) || 0;
      setBarColor(bar, percent);
      setTimeout(() => {
        bar.style.setProperty('width', percent + "%", 'important');
        bar.style.boxShadow = `0 0 20px ${getGlowColor(percent)}`;

        const percentText = bar.parentElement.parentElement.querySelector(".percent");
        if (percentText) {
          animateCounter(percentText, percent);
        }
      }, index * 300);
    });
  }, 500);

  // Fallback: animate immediately if already visible
  setTimeout(() => {
    bars.forEach((bar, index) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible && bar.style.width === "0%") {
        console.log("Fallback animation triggered");
        const percent = parseInt(bar.getAttribute('data-percent')) || 0;
        setBarColor(bar, percent);
        bar.style.setProperty('width', percent + "%", 'important');
        bar.style.boxShadow = `0 0 20px ${getGlowColor(percent)}`;

        const percentText = bar.parentElement.parentElement.querySelector(".percent");
        if (percentText) {
          animateCounter(percentText, percent);
        }
      }
    });
  }, 1000);
});

// Add CSS for better animations
const style = document.createElement('style');
style.textContent = `
  .graph-card {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .graph-card:nth-child(1) { animation-delay: 0.1s; }
  .graph-card:nth-child(2) { animation-delay: 0.3s; }
  .graph-card:nth-child(3) { animation-delay: 0.5s; }
  .graph-card:nth-child(4) { animation-delay: 0.7s; }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2.5s ease-in-out 0.5s;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;
document.head.appendChild(style);

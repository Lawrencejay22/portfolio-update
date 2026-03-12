// ===== Animated Skill Graph Script =====

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".fill");

  // Function to set color based on percentage
  const setBarColor = (bar, percent) => {
    if (percent <= 20) {
      bar.classList.add("red");
    } else if (percent <= 50) {
      bar.classList.add("orange");
    } else if (percent <= 70) {
      bar.classList.add("lightgreen");
    }  else if(percent <=90) {
      bar.classList.add("green");
    }
  };

  // Animate bars when visible
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute("data-percent");
          bar.style.width = percent + "%";
          setBarColor(bar, percent);
          observer.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% visible
    }
  );

  // Initialize all bars
  bars.forEach(bar => {
    const percent = bar.getAttribute("data-percent");
    bar.style.width = "0%"; // start empty
    setBarColor(bar, percent);
    observer.observe(bar);
  });
});

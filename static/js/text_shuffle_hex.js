//https://github.com/RiSec/text_slide_animation/blob/main/text_shuffle_hex.js
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".shuffle_text_hex");
    
    elements.forEach((element) => {
        element.style.opacity = "0";
    })
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
  
    const startAnimation = (element) => {
      const originalText = element.textContent;
      const hexArray = Array.from(originalText).map((char) => char.charCodeAt(0).toString(16).toUpperCase());
      element.textContent = "";
      element.style.opacity = "1";
  
      let currentIndex = 0;
  
      const animateHex = () => {
        if (currentIndex >= hexArray.length) {
          element.textContent = originalText;
          return;
        }
  
        const currentCharHex = hexArray[currentIndex];
        let displayIndex = 0;
        const hexInterval = setInterval(() => {
          if (displayIndex <= currentCharHex.length) {
            element.textContent =
              originalText.slice(0, currentIndex) + 
              "" +
              currentCharHex.slice(0, displayIndex) +
              "".padEnd(originalText.length - currentIndex - 1, " ");
            displayIndex+=2;
          } else {
            clearInterval(hexInterval);
            element.textContent =
              originalText.slice(0, currentIndex) +
              originalText[currentIndex] +
              "".padEnd(originalText.length - currentIndex - 1, " ");
            currentIndex++;
            animateHex();
          }
        }, 6);
      };
  
      animateHex();
    };
  
    const handleScroll = () => {
      elements.forEach((element) => {
        if (!element.dataset.animated && isInViewport(element)) {
          element.dataset.animated = "true";
          startAnimation(element);
        }
      });
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
  
    handleScroll();
  });
  

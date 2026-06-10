document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("servicesCarouselTrack");
  const btnPrev = document.getElementById("carouselBtnPrev");
  const btnNext = document.getElementById("carouselBtnNext");
  const cards = document.querySelectorAll(".services-carousel-card");
  
  let currentIndex = 0;
  const totalCards = cards.length; // Always equal to 10
  const autoIntervalDuration = 4000;
  let autoSlideTimer;

  // Evaluates device window width to figure out layout density rules
  function getVisibleCardsCount() {
    if (window.innerWidth > 1199) return 5; // Desktop
    if (window.innerWidth > 600) return 2;  // Tablet
    return 1;                               // Mobile Phone
  }

  function updateSliderPosition() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = totalCards - visibleCards;

    // Boundary containment check guard
    if (currentIndex > maxIndex) {
      currentIndex = 0; // Wrap back around to card 1
    }

    if (cards.length > 0) {
      // Pull exact width layout boundaries of a standard card item active on screen
      const cardWidth = cards[0].offsetWidth;
      const gapWidth = 16; // Coordinates directly with track CSS grid rules
      
      // Calculate translate width displacement
      const moveDistance = currentIndex * (cardWidth + gapWidth);
      track.style.transform = `translateX(-${moveDistance}px)`;
    }
  }

  function nextSlide() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = totalCards - visibleCards;

    if (currentIndex >= maxIndex) {
      currentIndex = 0; // Continuous loop safety resets back to first card
    } else {
      // Moves step-by-step on mobile/tablet, shifts by full blocks on desktop
      currentIndex += (visibleCards === 5) ? 5 : 1;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
    }
    updateSliderPosition();
  }

  function prevSlide() {
    const visibleCards = getVisibleCardsCount();
    
    if (currentIndex <= 0) {
      const maxIndex = totalCards - visibleCards;
      currentIndex = maxIndex; // Jump straight to the absolute end batch layout
    } else {
      currentIndex -= (visibleCards === 5) ? 5 : 1;
      if (currentIndex < 0) currentIndex = 0;
    }
    updateSliderPosition();
  }

  // Automator Loop Control Engine
  function startAutoSlide() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, autoIntervalDuration);
  }

  function resetTimeout() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  // Active Device Interface Listeners
  btnNext.addEventListener("click", () => { nextSlide(); resetTimeout(); });
  btnPrev.addEventListener("click", () => { prevSlide(); resetTimeout(); });
  
  // Track viewport adjustment shifts smoothly
  window.addEventListener("resize", () => {
    updateSliderPosition();
  });

  // Kickstart Execution On Page Render completion routines
  setTimeout(updateSliderPosition, 150); // Small timeout allows render sizes to finalize perfectly
  startAutoSlide();
});
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     VETS SLIDER (2 DOTS ONLY)
  ========================= */

  const track = document.querySelector('.vets-track');
  const cards = document.querySelectorAll('.vet-card');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (track && cards.length && prev && next && dotsContainer) {

    let index = 0;

    const isMobile = window.innerWidth < 768;
    const visible = isMobile ? 1 : 3;
    const cardWidth = isMobile ? 260 : 290;

    /* CLEAR dots */
    dotsContainer.innerHTML = "";

    /* TWO DOTS LOGIC */
    const pages = Math.floor(cards.length / visible); // ✅ ALWAYS 2 DOTS

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.slider-dots span');

    function updateSlider() {
      track.style.transform = `translateX(-${index * cardWidth}px)`;

      dots.forEach(d => d.classList.remove('active'));
      dots[Math.floor(index / visible)].classList.add('active');
    }

    next.addEventListener("click", () => {
      index += visible;
      if (index > cards.length - visible) {
        index = cards.length - visible;
      }
      updateSlider();
    });

    prev.addEventListener("click", () => {
      index -= visible;
      if (index < 0) index = 0;
      updateSlider();
    });
  }

  /* =========================
     CTA BUTTONS
  ========================= */

  /* ALL "View Our Services" buttons → Clinic */
  const ctas = document.querySelectorAll(".cta");
  ctas.forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "/clinic";
    });
  });

  /* Book Appointment */
  const bookAppointmentBtn = document.querySelector(".cta2");
  if (bookAppointmentBtn) {
    bookAppointmentBtn.addEventListener("click", () => {
      window.location.href = "/account";
    });
  }

});

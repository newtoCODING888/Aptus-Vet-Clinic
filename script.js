document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     VETS SLIDER (FIXED)
  ========================= */
  const track = document.querySelector(".vets-track");
  const cards = document.querySelectorAll(".vet-card");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (track && cards.length && prev && next && dotsContainer) {
    let pageIndex = 0;

    const isMobile = window.innerWidth < 768;
    const visible = isMobile ? 1 : 3;

    const cardWidth = isMobile ? 260 : 290;
    const gap = 30; // MUST match your CSS: .vets-track { gap: 30px; }
    const step = (cardWidth + gap) * visible;

    const pages = Math.ceil(cards.length / visible);

    dotsContainer.innerHTML = "";

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll("span");

    function updateSlider() {
      track.style.transform = `translateX(-${pageIndex * step}px)`;

      dots.forEach((d) => d.classList.remove("active"));
      if (dots[pageIndex]) dots[pageIndex].classList.add("active");
    }

    next.addEventListener("click", () => {
      pageIndex += 1;
      if (pageIndex > pages - 1) pageIndex = pages - 1;
      updateSlider();
    });

    prev.addEventListener("click", () => {
      pageIndex -= 1;
      if (pageIndex < 0) pageIndex = 0;
      updateSlider();
    });

    // Optional: click dots to jump
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        pageIndex = i;
        updateSlider();
      });
    });

    updateSlider();
  }

  /* =========================
     CTA BUTTONS (FIXED LINKS)
  ========================= */

  // ALL "View Our Services" buttons → clinic.html
  const ctas = document.querySelectorAll(".cta");
  ctas.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "clinic.html";
    });
  });

  // Book Appointment → account.html
  const bookAppointmentBtn = document.querySelector(".cta2");
  if (bookAppointmentBtn) {
    bookAppointmentBtn.addEventListener("click", () => {
      window.location.href = "account.html";
    });
  }

  /* =========================
     ACCOUNT DROPDOWN (FIXED)
  ========================= */
  const accountBtn = document.querySelector(".nav-account");
  const dropdown = document.querySelector(".nav-item-dropdown");

  if (accountBtn && dropdown) {
    accountBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("open");
      accountBtn.setAttribute(
        "aria-expanded",
        dropdown.classList.contains("open")
      );
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ACCOUNT DROPDOWN
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

    // click outside closes dropdown
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        accountBtn.setAttribute("aria-expanded", "false");
      }
    });
  }


  /* =========================
     CTA BUTTON LINKS
  ========================= */

  // All primary CTA buttons → clinic page
  document.querySelectorAll(".cta").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "clinic.html";
    });
  });

  // Book appointment button → auth/account page
  const cta2 = document.querySelector(".cta2");
  if (cta2) {
    cta2.addEventListener("click", () => {
      window.location.href = "auth.html";
    });
  }


  /* =========================
     VETS SLIDER (FULL FIX)
  ========================= */

  const track = document.querySelector(".vets-track");
  const cards = document.querySelectorAll(".vet-card");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (track && cards.length && prev && next && dotsContainer) {

    let pageIndex = 0;

    function setupSlider() {

      const isMobile = window.innerWidth < 768;
      const visible = isMobile ? 1 : 3;

      const cardWidth = isMobile ? 260 : 290;
      const gap = 30;
      const step = (cardWidth + gap) * visible;

      const pages = Math.ceil(cards.length / visible);

      dotsContainer.innerHTML = "";

      for (let i = 0; i < pages; i++) {
        const dot = document.createElement("span");
        if (i === pageIndex) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      }

      const dots = dotsContainer.querySelectorAll("span");

      function updateSlider() {
        track.style.transform = `translateX(-${pageIndex * step}px)`;

        dots.forEach(d => d.classList.remove("active"));
        if (dots[pageIndex]) dots[pageIndex].classList.add("active");
      }

      next.onclick = () => {
        pageIndex++;
        if (pageIndex > pages - 1) pageIndex = pages - 1;
        updateSlider();
      };

      prev.onclick = () => {
        pageIndex--;
        if (pageIndex < 0) pageIndex = 0;
        updateSlider();
      };

      dots.forEach((dot, i) => {
        dot.onclick = () => {
          pageIndex = i;
          updateSlider();
        };
      });

      updateSlider();
    }

    setupSlider();

    // recompute on resize
    window.addEventListener("resize", () => {
      pageIndex = 0;
      setupSlider();
    });
  }


  /* =========================
     SHOP FILTER (SAFE — ONLY RUNS IF SHOP EXISTS)
  ========================= */

  const categoryButtons = document.querySelectorAll(".categories button");
  const products = document.querySelectorAll(".product-card");
  const searchInput = document.querySelector(".shop-section input");

  if (categoryButtons.length && products.length && searchInput) {

    let currentCategory = "all";

    function filterProducts() {
      const query = searchInput.value.toLowerCase();

      products.forEach(product => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        const category = product.dataset.category;

        const matchCategory =
          currentCategory === "all" || category === currentCategory;

        const matchSearch = title.includes(query);

        product.style.display =
          (matchCategory && matchSearch) ? "flex" : "none";
      });
    }

    categoryButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentCategory = btn.dataset.category;
        filterProducts();
      });
    });

    searchInput.addEventListener("input", filterProducts);
  }

});

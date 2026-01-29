const track = document.querySelector('.vets-track');
const cards = document.querySelectorAll('.vet-card');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');

let index = 0;
const visible = 3;
const cardWidth = 290;

/* Create dots */
const pages = Math.floor(cards.length / visible);

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

next.onclick = () => {
  index += visible;
  if (index > cards.length - visible) index = 0;
  updateSlider();
};

prev.onclick = () => {
  index -= visible;
  if (index < 0) index = cards.length - visible;
  updateSlider();
};

document.addEventListener("DOMContentLoaded", () => {

  /* ALL View Services / clinic buttons */
  const ctas = document.querySelectorAll(".cta");

  ctas.forEach(cta => {
    cta.addEventListener("click", () => {
      window.location.href = "/clinic";
    });
  });

  /* Book Appointment button */
  const bookAppointmentBtn = document.querySelector(".cta2");
  if (bookAppointmentBtn) {
    bookAppointmentBtn.addEventListener("click", () => {
      window.location.href = "/account";
    });
  }

});

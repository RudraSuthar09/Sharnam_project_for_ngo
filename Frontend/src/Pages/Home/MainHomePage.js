const slides = document.querySelectorAll(".box");
let counter = 0;

slides.forEach((slide, index) => {
  slide.style.left = `${index * 50}%`;
});

const goPrev = () => {
  counter--;
  slideBox();
};

const goNext = () => {
  counter++;
  slideBox();
};

const slideBox = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

function ShowSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}

function HideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}
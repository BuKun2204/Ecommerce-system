// Change main image
const thumbs = document.querySelectorAll('.thumb');
const mainImg = document.getElementById('mainImg');
thumbs.forEach(img => {
  img.addEventListener('click', () => {
    mainImg.src = img.src;
  });
});

// Size selection
const sizeOptions = document.querySelectorAll('.sizeOption');
sizeOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeOptions.forEach(b => b.classList.remove('bg-red-500', 'text-white'));
    btn.classList.add('bg-red-500', 'text-white');
  });
});

// Color selection
const colorOptions = document.querySelectorAll('.colorOption');
colorOptions.forEach(c => {
  c.addEventListener('click', () => {
    colorOptions.forEach(cl => cl.classList.remove('ring-2', 'ring-black'));
    c.classList.add('ring-2', 'ring-black');
  });
});

// Quantity controls
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const qty = document.getElementById('qty');
let count = 1;

minusBtn.addEventListener('click', () => {
  if (count > 1) count--;
  qty.textContent = count;
});

plusBtn.addEventListener('click', () => {
  count++;
  qty.textContent = count;
});

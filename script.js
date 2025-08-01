const nameInput = document.getElementById('nameInput');
const enterBtn = document.getElementById('enterBtn');
const pages = {
  home: document.getElementById('home-page'),
  special: document.getElementById('special-page'),
  sorry: document.getElementById('sorry-page'),
};

function showPage(name) {
  Object.values(pages).forEach(page => page.classList.add('hidden'));
  pages[name].classList.remove('hidden');
}

function createSmokeAt(x, y, callback) {
  const container = document.getElementById('smoke-container');
  const smoke = document.createElement('div');
  smoke.classList.add('smoke');
  smoke.style.left = `${x}px`;
  smoke.style.top = `${y}px`;
  container.appendChild(smoke);

  setTimeout(() => {
    callback();
    setTimeout(() => {
      smoke.remove();
    }, 1000);
  }, 900);
}

enterBtn.addEventListener('click', e => {
  const name = nameInput.value.toLowerCase();
  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  createSmokeAt(x, y, () => {
    if (name.includes('special')) {
      showPage('special');
    } else {
      showPage('sorry');
    }
  });
});

document.querySelectorAll('.back').forEach(btn => {
  btn.addEventListener('click', e => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createSmokeAt(x, y, () => showPage('home'));
  });
});

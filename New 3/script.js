// ===== THEME TOGGLE =====
function toggleTheme(themeName) {
  const isLight = document.body.classList.toggle('light-mode');
  const darkIcon = document.querySelector('.theme-icon-dark');
  const lightIcon = document.querySelector('.theme-icon-light');
  const darkLogo = document.querySelector('.nav-logo-dark');
  const lightLogo = document.querySelector('.nav-logo-light');
  
  if (isLight) {
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
    darkLogo.style.display = 'none';
    lightLogo.style.display = 'block';
  } else {
    darkIcon.style.display = 'block';
    lightIcon.style.display = 'none';
    darkLogo.style.display = 'block';
    lightLogo.style.display = 'none';
  }
  
  localStorage.setItem('solmonetaire-theme', isLight ? 'light' : 'dark');
}

function initTheme() {
  const saved = localStorage.getItem('solmonetaire-theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    const darkIcon = document.querySelector('.theme-icon-dark');
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkLogo = document.querySelector('.nav-logo-dark');
    const lightLogo = document.querySelector('.nav-logo-light');
    if (darkIcon && lightIcon && darkLogo && lightLogo) {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
      darkLogo.style.display = 'none';
      lightLogo.style.display = 'block';
    }
  }
}

document.addEventListener('DOMContentLoaded', initTheme);

// ===== LANGUAGE TOGGLE =====
function setLang(lang) {
  document.body.className = lang;
  document.documentElement.lang = lang;

  // تفعيل زرار اللغة
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');

  // إظهار/إخفاء العناصر حسب اللغة
  document.querySelectorAll('[data-lang]').forEach(el =>
    el.classList.toggle('active', el.dataset.lang === lang)
  );
  document.querySelectorAll('[data-lang-i]').forEach(el =>
    el.classList.toggle('active', el.dataset.langI === lang)
  );

  // اتجاه السهم
  document.querySelectorAll('.arrow').forEach(a =>
    a.textContent = lang === 'ar' ? ' ←' : ' →'
  );
}

// ===== NAV BLUR ON SCROLL =====
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ===== WHATSAPP FORM SENDER =====
function sendWhatsApp() {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
  const name   = inputs[0].value || '-';
  const clinic = inputs[1].value || '-';
  const email  = inputs[2].value || '-';
  const spec   = inputs[3].value || '-';
  const msg    = inputs[4].value || '-';

  const text = `مرحباً Sol-Montaire 👋\n\nالاسم: ${name}\nالعيادة: ${clinic}\nالبريد: ${email}\nالتخصص: ${spec}\n\nالرسالة:\n${msg}`;
  window.open(`https://wa.me/201000000000?text=${encodeURIComponent(text)}`, '_blank');
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); // بيوقف المراقبة بعد ما العنصر ظهر
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.12}s`;
  observer.observe(el);
});

/* ===== Месть Престола — лендинг: интерактив ===== */
(function () {
  'use strict';

  /* --- Шапка: заливка при прокрутке --- */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    header.classList.toggle('solid', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Мобильное меню --- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Появление блоков при прокрутке --- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- Лайтбокс для галереи --- */
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var idx = 0;

  function show(i) {
    idx = (i + shots.length) % shots.length;
    var full = shots[idx].getAttribute('data-full');
    lbImg.src = full;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function hide() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  shots.forEach(function (s, i) {
    s.addEventListener('click', function () { show(i); });
  });
  if (lb) {
    document.getElementById('lbClose').addEventListener('click', hide);
    document.getElementById('lbPrev').addEventListener('click', function () { show(idx - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) hide(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* --- Заглушки ссылок (заполнить после релиза) --- */
  var toastTimer;
  function toast(text) {
    var t = document.getElementById('ph-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'ph-toast';
      t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);' +
        'background:rgba(20,17,16,.96);border:1px solid rgba(201,162,75,.4);color:#e7c976;' +
        'padding:12px 20px;border-radius:10px;z-index:200;font-size:15px;' +
        'box-shadow:0 20px 50px -20px #000;transition:opacity .3s;max-width:90vw;text-align:center';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.style.opacity = '0'; }, 2600);
  }

  document.querySelectorAll('[data-placeholder]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      toast('Ссылка появится после выхода игры — релиз совсем скоро.');
    });
  });
})();

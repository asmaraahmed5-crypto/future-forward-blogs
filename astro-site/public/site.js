(function () {
  var figs = document.querySelectorAll('[data-fig],[data-check],[data-ex]');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.25 });
    figs.forEach(function (f) { io.observe(f); });
  } else figs.forEach(function (f) { f.classList.add('in'); });

  function toggle(el) {
    var on = !el.classList.contains('sel');
    el.classList.toggle('sel', on);
    el.setAttribute('aria-pressed', on);
  }
  document.querySelectorAll('[data-select],.chip').forEach(function (el) {
    el.addEventListener('click', function () { toggle(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(el); } });
  });

  document.querySelectorAll('[data-check]').forEach(function (c) {
    var boxes = c.querySelectorAll('input'), bar = c.querySelector('.cl-bar i'), count = c.querySelector('.cl-count');
    function upd() {
      var d = c.querySelectorAll('input:checked').length;
      count.textContent = d + ' of ' + boxes.length + ' done' + (d === boxes.length ? ' ✓' : '');
      bar.style.transform = 'scaleX(' + d / boxes.length + ')';
    }
    boxes.forEach(function (b) { b.addEventListener('change', upd); });
  });

  document.querySelectorAll('[data-ex]').forEach(function (f) {
    var tabs = [].slice.call(f.querySelectorAll('[role=tab]')), panels = [].slice.call(f.querySelectorAll('[role=tabpanel]'));
    function show(i, focus) {
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; panels[k].hidden = k !== i; });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); show((i + d + tabs.length) % tabs.length, true); }
      });
    });
  });

  var nav = document.getElementById('menu'), tg = document.querySelector('.nav-toggle');
  if (nav && tg) {
    tg.addEventListener('click', function () { var o = nav.classList.toggle('open'); tg.setAttribute('aria-expanded', o); });
    document.querySelectorAll('.sub-toggle').forEach(function (b) {
      b.addEventListener('click', function () {
        var li = b.parentNode, o = !li.classList.contains('open');
        document.querySelectorAll('.has-sub.open').forEach(function (x) { x.classList.remove('open'); x.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false'); });
        li.classList.toggle('open', o); b.setAttribute('aria-expanded', o);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { document.querySelectorAll('.has-sub.open').forEach(function (x) { x.classList.remove('open'); x.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false'); }); nav.classList.remove('open'); tg.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.bar')) { document.querySelectorAll('.has-sub.open').forEach(function (x) { x.classList.remove('open'); }); } });
  }

  // table of contents: highlight the section being read
  var links = document.querySelectorAll('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          map[e.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) spy.observe(h); });
  }
})();
(function(){var b=document.querySelector(".progress i");if(!b||!document.querySelector(".article"))return;var t=false;function u(){var h=document.documentElement;var m=h.scrollHeight-h.clientHeight;b.style.transform="scaleX("+(m>0?Math.min(1,h.scrollTop/m):0)+")";t=false}addEventListener("scroll",function(){if(!t){t=true;requestAnimationFrame(u)}},{passive:true});u()})();

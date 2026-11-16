(function () {
  document.documentElement.classList.add('js');
  var rev = document.querySelectorAll('[data-rev]');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { threshold: 0.12 });
    rev.forEach(function (r, i) { r.style.transitionDelay = (i % 5) * 60 + 'ms'; ro.observe(r); });
  } else rev.forEach(function (r) { r.classList.add('in'); });
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

  var nb = document.getElementById('nb');
  if (nb) {
    var items = [].slice.call(nb.querySelectorAll('.nb-item')), megas = [].slice.call(nb.querySelectorAll('.nb-mega')), panel = document.getElementById('nb-panel');
    var burger = nb.querySelector('.nb-burger'), mob = document.getElementById('nb-mobile');
    function closeAll() {
      items.forEach(function (i) { i.setAttribute('aria-expanded', 'false'); });
      nb.classList.remove('open'); panel.classList.remove('show');
      megas.forEach(function (m) { m.hidden = true; });
    }
    items.forEach(function (it) {
      it.addEventListener('click', function () {
        var was = it.getAttribute('aria-expanded') === 'true';
        closeAll();
        if (was) return;
        it.setAttribute('aria-expanded', 'true');
        megas.forEach(function (m) { m.hidden = m.getAttribute('data-for') !== it.getAttribute('data-nb'); });
        nb.classList.add('open'); panel.classList.add('show');
      });
    });
    burger.addEventListener('click', function () {
      var o = mob.hidden; mob.hidden = !o; burger.setAttribute('aria-expanded', o); nb.classList.toggle('mob-open', o); closeAll();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); mob.hidden = true; burger.setAttribute('aria-expanded', 'false'); nb.classList.remove('mob-open'); } });
    document.addEventListener('click', function (e) { if (!e.target.closest('#nb')) closeAll(); });
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

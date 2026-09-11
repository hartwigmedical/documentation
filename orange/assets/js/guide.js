/* =============================================================================
   ORANGE Report User Guide — behaviour
   No dependencies, no build step. Five independent modules:
     buildNav()   sidebar table of contents, generated from the headings
     scrollSpy()  highlights the current section in the sidebar
     drawer()     mobile sidebar toggle
     lightbox()   click a figure to enlarge
     search()     filter sections and highlight matches
     deepLinks()  open <details> when linked to directly, and for printing
   Add a chapter by adding a <section class="sect" id="..."> with an <h2>;
   the nav picks it up automatically. Sub-entries come from <h3 id="...">.
   ============================================================================= */
(function () {
  'use strict';

  var main = document.getElementById('main');
  var nav = document.getElementById('nav');
  var sidebar = document.getElementById('sidebar');
  var sections = Array.prototype.slice.call(main.querySelectorAll('section.sect'));

  /* ------------------------------------------------------------------ nav --- */
  function buildNav() {
    var html = '';
    sections.forEach(function (section) {
      var h2 = section.querySelector('h2');
      if (!h2) return;
      var num = h2.querySelector('.sect-n');
      var label = h2.textContent.replace(num ? num.textContent : '', '').trim();

      html += '<div class="grp"><a href="#' + section.id + '" data-t="' + section.id + '">' + label + '</a>';

      var subs = Array.prototype.slice.call(section.querySelectorAll('h3[id]'));
      if (subs.length) {
        html += '<ul>';
        subs.forEach(function (h3) {
          html += '<li><a href="#' + h3.id + '" data-t="' + h3.id + '">' +
                  h3.textContent.replace(/\s+/g, ' ').trim() + '</a></li>';
        });
        html += '</ul>';
      }
      html += '</div>';
    });
    nav.innerHTML = html;
  }

  /* ----------------------------------------------------------- scroll spy --- */
  function scrollSpy() {
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[data-t]'));
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute('data-t')); });
    var queued = false;

    function update() {
      queued = false;
      var best = -1, bestY = -1e9;
      for (var i = 0; i < targets.length; i++) {
        if (!targets[i]) continue;
        var y = targets[i].getBoundingClientRect().top - 90;
        if (y <= 0 && y > bestY) { bestY = y; best = i; }
      }
      links.forEach(function (a, i) { a.classList.toggle('on', i === best); });

      if (best > -1) {
        var el = links[best];
        var r = el.getBoundingClientRect(), sb = sidebar.getBoundingClientRect();
        if (r.top < sb.top + 40 || r.bottom > sb.bottom - 40) {
          el.scrollIntoView({ block: 'nearest' });
        }
      }
    }

    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* --------------------------------------------------------------- drawer --- */
  function drawer() {
    var burger = document.getElementById('burger');
    function toggle() { sidebar.classList.toggle('open'); }
    burger.addEventListener('click', toggle);
    burger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 1000) sidebar.classList.remove('open');
    });
  }

  /* ------------------------------------------------------------- lightbox --- */
  function lightbox() {
    var lb = document.getElementById('lb');
    var img = lb.querySelector('img');

    function close() { lb.classList.remove('on'); img.src = ''; }

    main.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG' && e.target.closest('figure')) {
        img.src = e.target.currentSrc || e.target.src;
        img.alt = e.target.alt || '';
        lb.classList.add('on');
      }
    });
    lb.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('on')) close();
    });
  }

  /* --------------------------------------------------------------- search --- */
  function search() {
    var input = document.getElementById('q');
    var body = document.body;
    var debounce = null;
    var index = sections.map(function (s) { return { el: s, text: s.textContent.toLowerCase() }; });

    function clearMarks(root) {
      var marks = root.querySelectorAll('mark');
      for (var i = marks.length - 1; i >= 0; i--) {
        marks[i].replaceWith(document.createTextNode(marks[i].textContent));
      }
      root.normalize();
    }

    function highlight(root, term) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          var parent = node.parentNode.nodeName;
          if (parent === 'SCRIPT' || parent === 'STYLE' || parent === 'MARK') return NodeFilter.FILTER_REJECT;
          return node.nodeValue.toLowerCase().indexOf(term) > -1
            ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);

      nodes.slice(0, 400).forEach(function (node) {
        var text = node.nodeValue, lower = text.toLowerCase();
        var frag = document.createDocumentFragment(), i = 0, j;
        while ((j = lower.indexOf(term, i)) > -1) {
          if (j > i) frag.appendChild(document.createTextNode(text.slice(i, j)));
          var mark = document.createElement('mark');
          mark.textContent = text.substr(j, term.length);
          frag.appendChild(mark);
          i = j + term.length;
        }
        if (i < text.length) frag.appendChild(document.createTextNode(text.slice(i)));
        node.parentNode.replaceChild(frag, node);
      });
    }

    function run() {
      var term = input.value.trim().toLowerCase();
      clearMarks(main);

      if (term.length < 2) {
        body.classList.remove('searching', 'empty');
        index.forEach(function (o) { o.el.classList.remove('match'); });
        nav.querySelectorAll('.grp').forEach(function (g) { g.classList.remove('hide'); });
        return;
      }

      body.classList.add('searching');
      var hits = 0;
      index.forEach(function (o) {
        var match = o.text.indexOf(term) > -1;
        o.el.classList.toggle('match', match);
        if (match) { hits++; highlight(o.el, term); }
        var link = nav.querySelector('.grp a[data-t="' + o.el.id + '"]');
        if (link) link.parentNode.classList.toggle('hide', !match);
      });
      body.classList.toggle('empty', hits === 0);

      // reveal any collapsed box that contains a hit
      main.querySelectorAll('.match details').forEach(function (d) {
        if (d.querySelector('mark')) d.open = true;
      });
    }

    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(run, 160);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; run(); }
    });
  }

  /* ------------------------------------------------------------ deepLinks --- */
  function deepLinks() {
    function openTarget() {
      var id = location.hash.slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      var d = el.closest('details');
      while (d) {
        d.open = true;
        d = d.parentElement ? d.parentElement.closest('details') : null;
      }
    }
    window.addEventListener('hashchange', openTarget);
    openTarget();

    // print with every box expanded, then restore
    window.addEventListener('beforeprint', function () {
      document.querySelectorAll('details').forEach(function (d) {
        d.dataset.wasOpen = d.open ? '1' : '0';
        d.open = true;
      });
    });
    window.addEventListener('afterprint', function () {
      document.querySelectorAll('details').forEach(function (d) {
        if (d.dataset.wasOpen === '0') d.open = false;
      });
    });
  }

  buildNav();
  scrollSpy();
  drawer();
  lightbox();
  search();
  deepLinks();
})();

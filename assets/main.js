// 共用版面與各頁內容渲染（一般不需要修改，內容請改 data.js）
(function () {
  "use strict";
  var L = window.LAB;
  var page = document.body.getAttribute("data-page");

  var NAV = [
    ["home", "首頁", "Home", "index.html"],
    ["research", "研究", "Research", "research.html"],
    ["members", "成員", "Members", "members.html"],
    ["publications", "論文", "Publications", "publications.html"],
    ["courses", "課程", "Courses", "courses.html"],
    ["contact", "聯絡", "Contact", "contact.html"],
  ];

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function zh(t) { return '<span lang="zh-Hant">' + esc(t) + "</span>"; }
  function en(t) { return '<span lang="en" class="en">' + esc(t) + "</span>"; }
  function bi(o) { return '<span class="bi">' + zh(o.zh) + en(o.en) + "</span>"; }
  function para(o) {
    return '<div class="para"><p lang="zh-Hant">' + esc(o.zh) + '</p><p lang="en" class="en">' + esc(o.en) + "</p></div>";
  }
  function secTitle(z, e, tag) {
    tag = tag || "h2";
    return "<" + tag + ' class="sec-title">' + zh(z) + en(e) + "</" + tag + ">";
  }
  function subTitle(z, e) { return '<h3 class="sub-title">' + zh(z) + en(e) + "</h3>"; }
  function bullets(items) {
    return '<ul class="bullets">' + items.map(function (it) {
      return "<li>" + (it.year ? '<span class="yr">' + esc(it.year) + "</span>" : "") + zh(it.zh) + en(it.en) + "</li>";
    }).join("") + "</ul>";
  }
  function pageHead(intro) {
    var n = NAV.filter(function (x) { return x[0] === page; })[0];
    return '<section class="page-head"><div class="container"><h1>' + zh(n[1]) + en(n[2]) + "</h1>" +
      (intro ? para(intro) : "") + "</div></section>";
  }
  function section(inner, id) {
    return '<section class="section"' + (id ? ' id="' + id + '"' : "") + '><div class="container">' + inner + "</div></section>";
  }

  // ---------- 泡孔截面圖（首頁背景） ----------
  // 固定亂數種子做圓形堆積，模擬微孔泡材的顯微截面；每次載入長得一樣。
  function foamSVG(w, h, count, seed) {
    var t = seed >>> 0;
    function rnd() {
      t = (t + 0x6d2b79f5) >>> 0;
      var x = Math.imul(t ^ (t >>> 15), 1 | t);
      x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    }
    var cells = [];
    for (var i = 0; i < 9000 && cells.length < count; i++) {
      var r = 6 + 58 * Math.pow(rnd(), 2.2), x = rnd() * w, y = rnd() * h;
      var ok = cells.every(function (c) { return Math.hypot(c.x - x, c.y - y) > c.r + r + 3; });
      if (ok) cells.push({ x: x, y: y, r: r });
    }
    return '<svg class="hero-foam" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">' +
      cells.map(function (c, k) {
        return '<circle cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) + '" r="' + c.r.toFixed(1) + '"' + (k % 11 === 0 ? ' class="hot"' : "") + "/>";
      }).join("") + "</svg>";
  }

  // ---------- Header / Footer ----------
  document.getElementById("site-header").innerHTML =
    '<div class="container header-inner">' +
    '<a class="brand" href="index.html"><span class="brand-mark">' + esc(L.short) + '</span><span class="brand-name">' + esc(L.name.zh) + "</span></a>" +
    '<button class="nav-toggle" type="button" aria-label="選單 Menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button>' +
    '<nav class="nav" id="site-nav" aria-label="主選單 Main">' +
    NAV.map(function (n) {
      return '<a href="' + n[3] + '"' + (n[0] === page ? ' aria-current="page"' : "") + "><span>" + n[1] + "</span><small>" + n[2] + "</small></a>";
    }).join("") + "</nav></div>";

  var toggle = document.querySelector(".nav-toggle");
  var navEl = document.getElementById("site-nav");
  function setNav(open) { navEl.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open ? "true" : "false"); }
  toggle.addEventListener("click", function () { setNav(!navEl.classList.contains("open")); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navEl.classList.contains("open")) { setNav(false); toggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (navEl.classList.contains("open") && !navEl.contains(e.target) && !toggle.contains(e.target)) setNav(false);
  });

  document.getElementById("site-footer").innerHTML =
    '<div class="container footer-inner">' +
    "<div>" + bi(L.name) + "</div>" +
    "<div>" + bi(L.unit) + '<a href="mailto:' + esc(L.contact.email) + '">' + esc(L.contact.email) + "</a></div>" +
    "<div>© " + new Date().getFullYear() + " " + esc(L.short) + "</div></div>";

  // ---------- Pages ----------
  var main = document.getElementById("main");

  if (page === "home") {
    var topics = L.research.filter(function (r) { return !r.planned; });
    main.innerHTML =
      '<section class="hero">' + foamSVG(1400, 900, 170, 20240611) +
      '<div class="container">' +
      '<p class="hero-unit bi">' + zh(L.unit.zh) + en(L.unit.en) + "</p>" +
      '<h1 class="hero-name"><span lang="zh-Hant">' + (L.heroLines || [L.name.zh]).map(esc).join("<br>") + "</span>" + en(L.name.en) + "</h1>" +
      '<div class="hero-tag bi">' + zh(L.tagline.zh) + en(L.tagline.en) + "</div>" +
      '<p class="hero-scroll"><a href="#about">' + zh("認識實驗室") + en("About the lab") + "</a></p>" +
      "</div>" +
      "</section>" +
      section(secTitle("關於實驗室", "About") + para(L.intro), "about") +
      section(secTitle("研究主題", "Research") +
        '<ul class="topic-list">' + topics.map(function (r) {
          return '<li><a href="research.html#topic-' + L.research.indexOf(r) + '">' + bi(r.title) + "</a></li>";
        }).join("") + "</ul>" +
        '<a class="more" href="research.html">' + zh("各主題說明") + en("Read about each topic") + "</a>") +
      section(secTitle("近期榮譽", "Recent honors") + bullets(L.honors.slice(0, 5)) +
        '<a class="more" href="publications.html#honors">' + zh("全部榮譽") + en("All honors") + "</a>") +
      section(secTitle("加入我們", "Join us") + para(L.contact.join) +
        '<a class="more" href="contact.html">' + zh("聯絡方式") + en("How to reach us") + "</a>");
  }

  if (page === "research") {
    main.innerHTML = pageHead(L.intro) + section(L.research.map(function (r, i) {
      return '<article class="topic" id="topic-' + i + '"><h2>' + zh(r.title.zh) + en(r.title.en) + "</h2>" +
        (r.planned ? '<p class="flag">' + zh("發展中") + en("Developing direction") + "</p>" : "") +
        para(r.desc) +
        '<ul class="tags" aria-label="關鍵字 Keywords">' + r.tags.map(function (t) { return "<li>" + zh(t.zh) + en(t.en) + "</li>"; }).join("") + "</ul>" +
        "</article>";
    }).join(""));
  }

  if (page === "members") {
    var p = L.pi;
    var groups = L.members.filter(function (g) { return g.people.length; });
    var students = groups.length
      ? groups.map(function (g) {
          return subTitle(g.group.zh, g.group.en) + '<ul class="people">' + g.people.map(function (m) {
            var av = m.photo
              ? '<img class="avatar" src="' + esc(m.photo) + '" alt="" width="56" height="56" loading="lazy">'
              : '<span class="avatar avatar-text" aria-hidden="true">' + esc(m.name.zh.charAt(0)) + "</span>";
            return '<li class="person">' + av + "<div>" + bi(m.name) + (m.role ? bi(m.role) : "") + (m.topic ? bi(m.topic) : "") + "</div></li>";
          }).join("") + "</ul>";
        }).join("")
      : '<p class="empty">' + zh("學生名單整理中。對研究主題有興趣的同學，歡迎與我們聯絡。") +
        en("The student list is being updated. If our research interests you, get in touch.") + "</p>" +
        '<a class="more" href="contact.html">' + zh("聯絡方式") + en("How to reach us") + "</a>";

    main.innerHTML = pageHead() +
      section(
        '<div class="pi-head">' +
        '<img class="pi-photo" src="' + esc(p.photo) + '" alt="葉樹開教授 Prof. Shu-Kai Yeh" width="200" height="250" fetchpriority="high">' +
        "<div><h2 class=\"pi-name\">" + zh(p.name.zh) + '<span class="title" lang="zh-Hant">' + esc(p.title.zh) + "</span>" + en(p.name.en + ", " + p.title.en) + "</h2>" +
        '<ul class="pi-contact">' +
        '<li><span class="k">Email</span><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a></li>" +
        '<li><span class="k">電話 Phone</span><a href="tel:+886-2-2737-6518">' + esc(p.phone) + "</a></li>" +
        '<li><span class="k">辦公室 Office</span>' + esc(L.contact.office.zh) + "</li></ul></div></div>" +
        '<div class="pi-expertise">' + subTitle("專長", "Expertise") + para(p.expertise) + "</div>" +
        subTitle("學歷", "Education") + bullets(p.education) +
        subTitle("經歷", "Experience") + bullets(p.experience) +
        subTitle("學術服務", "Service") + bullets(p.service)
      ) +
      section(secTitle("學生", "Students") + students);
  }

  if (page === "publications") {
    var pubs = L.publications.slice().sort(function (a, b) { return b.year - a.year; });
    main.innerHTML = pageHead() +
      section(secTitle("論文與發表", "Papers and presentations") +
        '<ol class="pubs" reversed>' + pubs.map(function (x) {
          var t = x.link ? '<a href="' + esc(x.link) + '" rel="noopener">' + esc(x.title) + "</a>" : esc(x.title);
          return '<li><div class="pub-title" lang="en">' + t + "</div>" +
            '<div class="pub-meta">' + esc(x.authors) + (x.venue ? " — <em>" + esc(x.venue) + "</em>" : "") + ", " + esc(x.year) + "</div>" +
            (x.note ? '<div class="pub-note">' + zh(x.note.zh) + en(x.note.en) + "</div>" : "") + "</li>";
        }).join("") + "</ol>") +
      section(secTitle("榮譽與獎項", "Honors and awards") + bullets(L.honors), "honors");
  }

  if (page === "courses") {
    main.innerHTML = pageHead({
      zh: "葉樹開教授於材料系開設的課程。",
      en: "Courses taught by Prof. Yeh in the Department of Materials Science and Engineering.",
    }) + section(L.courses.map(function (c) {
      return '<article class="course"><h2>' + zh(c.name.zh) + en(c.name.en) + "</h2>" + para(c.desc) +
        (c.term ? '<p class="term">' + bi(c.term) + "</p>" : "") + "</article>";
    }).join(""));
  }

  if (page === "contact") {
    var c = L.contact;
    function line(kz, ke, val) { return '<li><span class="k">' + zh(kz) + en(ke) + "</span>" + val + "</li>"; }
    main.innerHTML = pageHead() + section(
      '<ul class="contact-lines">' +
      line("實驗室", "Lab", bi(c.lab)) +
      line("教授辦公室", "Professor's office", bi(c.office)) +
      line("地址", "Address", bi(c.address)) +
      line("電子郵件", "Email", '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>") +
      line("電話", "Phone", '<a href="tel:+886-2-2737-6518">' + esc(c.phone) + "</a>") +
      line("材料系辦", "Department office", esc(c.deptPhone)) +
      "</ul>" +
      '<div class="join"><h2>' + zh("加入我們") + en("Join us") + "</h2>" + para(c.join) +
      '<a class="btn" href="mailto:' + esc(c.email) + "?subject=" + encodeURIComponent("加入實驗室 Joining the lab") + '">' +
      zh("寄信給葉老師") + en("Email Prof. Yeh") + "</a></div>" +
      '<iframe class="map" src="' + esc(c.mapEmbed) + '" loading="lazy" title="臺科大工程一館位置地圖 Map of NTUST Engineering Building 1" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    );
  }
})();

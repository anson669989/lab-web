// 版面與渲染邏輯 —— 內容請改 data.js
(function () {
  "use strict";
  var L = window.LAB;
  var page = document.body.getAttribute("data-page");

  var NAV = [
    { href: "index.html", id: "home", zh: "首頁", en: "Home" },
    { href: "research.html", id: "research", zh: "研究", en: "Research" },
    { href: "members.html", id: "members", zh: "成員", en: "Members" },
    { href: "publications.html", id: "publications", zh: "論文", en: "Publications" },
    { href: "courses.html", id: "courses", zh: "課程", en: "Courses" },
    { href: "contact.html", id: "contact", zh: "聯絡", en: "Contact" },
  ];

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function zh(t) { return '<span lang="zh-Hant">' + esc(t) + "</span>"; }
  function en(t) { return '<span lang="en" class="en">' + esc(t) + "</span>"; }
  // 中英並排的行內元素
  function bi(o, tag, cls) {
    tag = tag || "span";
    return "<" + tag + ' class="bi' + (cls ? " " + cls : "") + '">' + zh(o.zh) + en(o.en) + "</" + tag + ">";
  }
  // 中英並排的段落（寬螢幕左右兩欄）
  function pair(o, split) {
    return '<div class="pair' + (split ? " split" : "") + '"><p lang="zh-Hant">' + esc(o.zh) +
      '</p><p lang="en" class="en">' + esc(o.en) + "</p></div>";
  }
  function sectionHead(o, sub) {
    return '<div class="section-head"><h2>' + zh(o.zh) + en(o.en) + "</h2>" + (sub ? pair(sub) : "") + "</div>";
  }
  function pageHead(item, sub) {
    return '<section class="page-head"><div class="wrap"><h1>' + zh(item.zh) + en(item.en) + "</h1>" +
      (sub ? '<div class="sub">' + pair(sub) + "</div>" : "") + "</div></section>";
  }
  function current() {
    for (var i = 0; i < NAV.length; i++) if (NAV[i].id === page) return NAV[i];
    return NAV[0];
  }
  var LOGO =
    '<svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="6" fill="#132B52"/>' +
    '<rect x="6" y="20" width="20" height="4" fill="#16A3C9"/><rect x="9" y="11" width="14" height="6" fill="#E7EEF9"/>' +
    '<circle cx="12" cy="18.5" r="1.4" fill="#16A3C9"/><circle cx="16" cy="18.5" r="1.4" fill="#16A3C9"/><circle cx="20" cy="18.5" r="1.4" fill="#16A3C9"/></svg>';

  // ---------- header / footer ----------
  function renderHeader() {
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" +
        zh(n.zh) + en(n.en) + "</a></li>";
    }).join("");
    document.getElementById("site-header").innerHTML =
      '<div class="wrap bar"><a class="brand" href="index.html">' + LOGO + bi(L.name) + "</a>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">' + zh("選單") + en("Menu") + "</button>" +
      '<nav class="nav" id="site-nav" aria-label="主選單 Main"><ul>' + links + "</ul></nav></div>";

    var btn = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus();
      }
    });
  }

  function renderFooter() {
    var c = L.contact;
    document.getElementById("site-footer").innerHTML =
      '<div class="wrap foot"><div>' + bi(L.name) + bi(L.unit) + "</div>" +
      "<div>" + bi({ zh: c.building.zh + " " + c.lab, en: c.building.en + ", " + c.lab }) +
      '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></div>" +
      "<div>© " + new Date().getFullYear() + " " + esc(L.name.en) + "</div></div>";
  }

  // ---------- hero figure: flip-chip cross-section ----------
  function rng(seed) {
    return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  }
  function foamCells(cx, cy, r) {
    var rand = rng(7), out = "";
    for (var y = cy - r; y < cy + r + 12; y += 17) {
      for (var x = cx - r; x < cx + r + 12; x += 19) {
        var ox = x + (rand() - 0.5) * 8 + ((y / 17) % 2 ? 9 : 0);
        var oy = y + (rand() - 0.5) * 6;
        var cr = 5 + rand() * 4.5;
        out += '<circle cx="' + ox.toFixed(1) + '" cy="' + oy.toFixed(1) + '" r="' + cr.toFixed(1) + '"/>';
      }
    }
    return out;
  }
  function packageFigure() {
    var bumps = "", balls = "";
    for (var i = 0; i < 9; i++) bumps += '<circle cx="' + (218 + i * 28) + '" cy="218" r="8"/>';
    for (var j = 0; j < 10; j++) balls += '<circle cx="' + (135 + j * 45) + '" cy="285" r="10"/>';
    function label(x, y, z, e, anchor) {
      var a = anchor ? ' text-anchor="' + anchor + '"' : "";
      return '<text x="' + x + '" y="' + y + '"' + a + ' class="lbl-zh">' + z + "</text>" +
        '<text x="' + x + '" y="' + (y + 17) + '"' + a + ' class="lbl-en">' + e + "</text>";
    }
    return (
      '<figure class="hero-fig" style="margin:0">' +
      '<svg class="pkg" viewBox="0 78 680 352" role="img" aria-labelledby="pkg-t pkg-d">' +
      '<title id="pkg-t">覆晶封裝剖面示意圖 Flip-chip package cross-section</title>' +
      '<desc id="pkg-d">由上而下：封裝膠體、晶片、錫凸塊與底部填充膠、載板與錫球；放大圖顯示多孔低介電層的泡孔結構。From top: molding compound, silicon die, solder bumps with underfill, substrate and solder balls; the inset shows the cell structure of a porous low-k dielectric.</desc>' +
      "<defs>" +
      '<pattern id="filler" width="26" height="22" patternUnits="userSpaceOnUse">' +
      '<circle cx="5" cy="6" r="2.4" fill="#2A4E86"/><circle cx="17" cy="4" r="1.4" fill="#2A4E86"/>' +
      '<circle cx="13" cy="15" r="3" fill="#2A4E86"/><circle cx="23" cy="17" r="1.6" fill="#2A4E86"/><circle cx="3" cy="18" r="1.2" fill="#2A4E86"/></pattern>' +
      '<clipPath id="lens"><circle cx="600" cy="360" r="60"/></clipPath>' +
      "</defs>" +
      // molding compound
      '<rect x="150" y="128" width="360" height="100" rx="6" fill="#16335F"/>' +
      '<rect x="150" y="128" width="360" height="100" rx="6" fill="url(#filler)"/>' +
      // die
      '<rect x="200" y="176" width="260" height="32" fill="#8EA6CB"/>' +
      '<rect x="200" y="176" width="260" height="4" fill="#B8CAE4"/>' +
      // gap before underfill + underfill flow
      '<rect x="200" y="208" width="260" height="20" fill="#06101F"/>' +
      '<path class="uf-flow" style="transform-box:fill-box;transform-origin:left center" d="M188 228 L200 208 L460 208 L472 228 Z" fill="#16A3C9"/>' +
      '<rect class="uf-front" x="196" y="208" width="4" height="20" fill="#BFF1FF" style="transform-box:fill-box"/>' +
      '<g fill="#D5DEEB">' + bumps + "</g>" +
      // substrate
      '<rect x="110" y="228" width="440" height="12" fill="#2B5CB0"/>' +
      '<rect x="110" y="240" width="440" height="22" fill="#1C3F7C"/>' +
      '<rect x="110" y="262" width="440" height="12" fill="#2B5CB0"/>' +
      '<g fill="#7FB0F0"><rect x="130" y="233" width="60" height="3"/><rect x="240" y="233" width="90" height="3"/><rect x="380" y="233" width="70" height="3"/>' +
      '<rect x="160" y="267" width="80" height="3"/><rect x="300" y="267" width="110" height="3"/><rect x="470" y="267" width="50" height="3"/>' +
      '<rect x="214" y="236" width="4" height="34"/><rect x="438" y="236" width="4" height="34"/></g>' +
      '<g fill="#C3CFE0">' + balls + "</g>" +
      // magnifier inset: porous dielectric
      '<circle cx="520" cy="234" r="9" fill="none" stroke="#16A3C9" stroke-width="1.5"/>' +
      '<path d="M526 241 L560 309 M512 241 L548 330" stroke="#16A3C9" stroke-width="1" fill="none" opacity=".7"/>' +
      '<g clip-path="url(#lens)"><rect x="530" y="290" width="140" height="140" fill="#2B5CB0"/>' +
      '<g fill="#0A1A33" stroke="#6E9BE0" stroke-width="1">' + foamCells(600, 360, 60) + "</g></g>" +
      '<circle cx="600" cy="360" r="60" fill="none" stroke="#16A3C9" stroke-width="2"/>' +
      // leaders + labels
      '<g class="lead"><polyline points="495,145 530,104 534,104"/><polyline points="232,190 200,108 180,108"/>' +
      '<polyline points="194,224 84,332"/><polyline points="114,251 104,251"/><polyline points="315,295 315,332"/></g>' +
      label(538, 100, "封裝膠體", "Molding compound") +
      label(174, 103, "晶片", "Silicon die", "end") +
      label(20, 350, "底部填充膠", "Capillary underfill") +
      label(100, 246, "載板", "Substrate", "end") +
      label(322, 350, "錫凸塊與錫球", "Solder bumps & balls") +
      label(525, 402, "多孔低介電層", "Porous low-k dielectric", "end") +
      "</svg>" +
      '<figcaption class="fig-cap">' + zh("覆晶封裝剖面示意：底部填充膠以毛細作用流入晶片下方；放大處為多孔低介電層的泡孔結構。") +
      en("Flip-chip cross-section (schematic). Underfill wicks under the die by capillary action; the inset shows cells in a porous low-k dielectric.") +
      "</figcaption></figure>"
    );
  }

  // ---------- pages ----------
  function home() {
    var h = L.home;
    var bridges = h.bridges.map(function (b) {
      return '<li class="bridge"><div class="from">' + bi(b.from) + "</div>" +
        '<span class="link-line" aria-hidden="true"></span>' +
        '<div><div class="to">' + bi(b.to) + "</div>" +
        '<div class="why"><p lang="zh-Hant">' + esc(b.why.zh) + '</p><p lang="en" class="en">' + esc(b.why.en) + "</p></div></div></li>";
    }).join("");
    var p = L.pi;
    return (
      '<section class="hero"><div class="wrap hero-grid"><div>' +
      "<h1>" + zh(h.headline.zh) + en(h.headline.en) + "</h1>" +
      '<div class="lede">' + pair(h.lede) + "</div>" +
      '<div class="status">' + pair(h.status) + "</div></div>" +
      packageFigure() + "</div></section>" +
      '<section class="section"><div class="wrap">' +
      sectionHead({ zh: "從現有專長到封裝材料", en: "From our expertise to packaging materials" },
        { zh: "左欄是實驗室已累積的研究，右欄是我們計畫投入的封裝應用。", en: "Left: work the lab has built up. Right: the packaging problems we plan to apply it to." }) +
      '<ul class="bridges">' + bridges + "</ul></div></section>" +
      '<section class="section"><div class="wrap home-pi">' +
      '<img src="' + esc(p.photo) + '" alt="葉樹開教授 Prof. Shu-Kai Yeh" width="180" height="225" loading="lazy">' +
      '<div><p class="pi-name">' + zh(p.name.zh + " " + p.title.zh) + en("Prof. " + p.name.en) + "</p>" +
      '<p class="pi-role">' + bi({ zh: "實驗室主持人｜" + L.unit.zh, en: "Principal Investigator, " + L.unit.en }) + "</p>" +
      '<div style="margin-top:1rem">' + pair({
        zh: "專長為高分子奈米複合泡材、天然纖維複合材料與剪切增稠流體複合材料，現任 Cellular Polymers 期刊副主編。",
        en: "Specializes in polymer nanocomposite foams, natural fiber composites and shear-thickening fluid composites; Associate Editor of Cellular Polymers.",
      }) + "</div>" +
      '<div class="jump"><a class="btn primary" href="research.html">' + zh("看研究方向") + en("See research") + "</a>" +
      '<a class="btn" href="contact.html">' + zh("加入實驗室") + en("Join the lab") + "</a></div></div></div></section>"
    );
  }

  function research() {
    var items = L.research.map(function (r) {
      var tags = r.tags.map(function (t) { return "<li>" + zh(t.zh) + en(t.en) + "</li>"; }).join("");
      return '<article class="topic' + (r.planned ? " planned" : "") + '"><div><h2>' + zh(r.title.zh) + en(r.title.en) + "</h2>" +
        (r.planned ? '<p class="flag">' + zh("發展中") + en("Planned direction") + "</p>" : "") + "</div>" +
        "<div>" + pair(r.desc) + '<ul class="tags" aria-label="關鍵字 Keywords">' + tags + "</ul></div></article>";
    }).join("");
    return pageHead(current(), {
      zh: "以高分子加工與複合材料為核心，用流變學連結材料結構、加工條件與最終性能。",
      en: "Polymer processing and composites at the core, with rheology linking structure, processing and performance.",
    }) + '<section class="section"><div class="wrap"><div class="topics">' + items + "</div></div></section>";
  }

  function timeline(list) {
    return '<ol class="timeline">' + list.map(function (e) {
      return '<li><span class="yr">' + esc(e.year) + "</span>" + bi(e) + "</li>";
    }).join("") + "</ol>";
  }

  function members() {
    var p = L.pi;
    var service = '<ul class="plain">' + p.service.map(function (s) { return "<li>" + bi(s) + "</li>"; }).join("") + "</ul>";
    var groups = L.members.map(function (g) {
      var body = g.people.length
        ? '<ul class="people">' + g.people.map(function (m) {
            var img = m.photo
              ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name.zh + " " + m.name.en) + '" width="150" height="150" loading="lazy">'
              : '<span class="ph" aria-hidden="true">' + esc(m.name.zh.charAt(0)) + "</span>";
            return '<li class="person">' + img + bi(m.name) + (m.role ? bi(m.role) : "") + (m.topic ? bi(m.topic) : "") + "</li>";
          }).join("") + "</ul>"
        : '<p class="empty">' + zh("名單更新中。對研究有興趣嗎？歡迎來信。") +
          en("List being updated. Interested in joining? Send us an email.") + "</p>";
      return '<div class="members-group"><h3>' + zh(g.group.zh) + en(g.group.en) + "</h3>" + body + "</div>";
    }).join("");
    return pageHead(current()) +
      '<section class="section"><div class="wrap"><div class="profile">' +
      '<img src="' + esc(p.photo) + '" alt="葉樹開教授 Prof. Shu-Kai Yeh" width="240" height="300">' +
      '<div><h2 class="pi-name">' + zh(p.name.zh + " " + p.title.zh) + en(p.name.en + ", " + p.title.en) + "</h2>" +
      '<p class="pi-role">' + bi({ zh: "實驗室主持人", en: "Principal Investigator" }) + "</p>" +
      '<dl class="facts">' +
      "<div><dt>" + bi({ zh: "電子郵件", en: "Email" }) + '</dt><dd><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a></dd></div>" +
      "<div><dt>" + bi({ zh: "電話", en: "Phone" }) + '</dt><dd><a href="tel:+886-2-2737-6518">' + esc(p.phone) + "</a></dd></div>" +
      "<div><dt>" + bi({ zh: "辦公室", en: "Office" }) + "</dt><dd>" + bi({ zh: "工程一館 " + p.office, en: "Engineering Bldg. 1, " + p.office }) + "</dd></div></dl>" +
      '<div class="cv"><div><h3>' + zh("學歷") + en("Education") + "</h3>" + timeline(p.education) + "</div>" +
      "<div><h3>" + zh("經歷") + en("Experience") + "</h3>" + timeline(p.experience) + "</div>" +
      "<div><h3>" + zh("學術服務") + en("Service") + "</h3>" + service + "</div>" +
      "<div><h3>" + zh("榮譽") + en("Honors") + "</h3>" + timeline(L.honors) + "</div></div>" +
      "</div></div></div></section>" +
      '<section class="section"><div class="wrap">' + sectionHead({ zh: "實驗室成員", en: "Lab members" }) +
      '<div class="members-groups">' + groups + "</div></div></section>";
  }

  function publications() {
    var items = L.publications.slice().sort(function (a, b) { return b.year - a.year; }).map(function (x) {
      var title = x.link ? '<a href="' + esc(x.link) + '">' + esc(x.title) + "</a>" : esc(x.title);
      return '<li class="pub"><span class="yr">' + esc(x.year) + "</span><div>" +
        '<p class="t" lang="en">' + title + "</p>" +
        '<p class="a">' + esc(x.authors) + "</p>" +
        (x.venue ? '<p class="v" lang="en">' + esc(x.venue) + "</p>" : "") +
        (x.note ? '<p class="flag">' + zh(x.note.zh) + en(x.note.en) + "</p>" : "") + "</div></li>";
    }).join("");
    return pageHead(current()) +
      '<section class="section"><div class="wrap">' +
      '<div class="notice">' + zh("完整著作列表整理中。電子封裝方向為規劃中研究，尚無相關發表。") +
      en("The full publication list is being compiled. Electronic packaging is a planned direction with no publications yet.") +
      '<a href="' + esc(L.scholar) + '" rel="noopener">' + zh("在 Google Scholar 查詢") + " " + en("Search on Google Scholar") + "</a></div>" +
      '<ol class="pubs">' + items + "</ol></div></section>";
  }

  function courses() {
    var items = L.courses.map(function (c) {
      return '<article class="course"><div><h2>' + zh(c.name.zh) + en(c.name.en) + "</h2>" +
        (c.term ? '<p class="term">' + bi(c.term) + "</p>" : "") + "</div><div>" + pair(c.desc) + "</div></article>";
    }).join("");
    return pageHead(current(), {
      zh: "葉樹開教授於材料系開設的課程。開課學期與大綱請見臺科大課程查詢系統。",
      en: "Courses taught by Prof. Yeh in the MSE department. See the NTUST course system for terms and syllabi.",
    }) + '<section class="section"><div class="wrap"><div class="courses">' + items + "</div>" +
      '<div class="jump"><a class="btn" href="' + esc(L.courseQuery) + '" rel="noopener">' + zh("前往課程查詢系統") + en("Open NTUST course search") + "</a></div></div></section>";
  }

  function contact() {
    var c = L.contact;
    function row(label, val) { return "<div><dt>" + bi(label) + "</dt><dd>" + val + "</dd></div>"; }
    return pageHead(current()) +
      '<section class="section"><div class="wrap contact-grid"><div>' +
      '<dl class="contact-list">' +
      row({ zh: "實驗室", en: "Lab" }, bi({ zh: c.building.zh + " " + c.lab, en: c.building.en + ", Room " + c.lab })) +
      row({ zh: "教授辦公室", en: "PI office" }, bi({ zh: c.building.zh + " " + c.office, en: c.building.en + ", Room " + c.office })) +
      row({ zh: "電子郵件", en: "Email" }, '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>") +
      row({ zh: "電話", en: "Phone" }, '<a href="tel:+886-2-2737-6518">' + esc(c.phone) + "</a>") +
      row({ zh: "材料系辦", en: "Dept. office" }, esc(c.deptPhone)) +
      row({ zh: "地址", en: "Address" }, bi(c.address)) +
      "</dl>" +
      '<div class="join"><h2 class="bi" style="font-size:var(--t-lg)">' + zh("加入我們") + en("Join us") + "</h2>" + pair(c.join) +
      '<p><a class="btn primary" href="mailto:' + esc(c.email) + '?subject=' + encodeURIComponent("加入實驗室 Joining the lab") + '">' +
      zh("寄信給葉老師") + en("Email Prof. Yeh") + "</a></p></div></div>" +
      '<iframe class="map" title="臺科大工程一館地圖 Map of NTUST Engineering Building 1" src="' + esc(c.mapEmbed) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
      "</div></section>";
  }

  var PAGES = { home: home, research: research, members: members, publications: publications, courses: courses, contact: contact };

  renderHeader();
  document.getElementById("main").innerHTML = (PAGES[page] || home)();
  renderFooter();
})();

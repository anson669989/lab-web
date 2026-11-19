// 共用版面與各頁內容渲染（一般不需要修改，內容請改 data.js）
(function () {
  const L = window.LAB;
  const page = document.body.dataset.page;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  // ---------- 泡孔截面圖（首頁主視覺、頁首裝飾） ----------
  // 用固定亂數種子做圓形堆積，模擬微孔泡材的 SEM 截面；每次載入長得一樣。
  function foamSVG(w, h, count, seed, cls) {
    let t = seed >>> 0;
    const rnd = () => {
      t = (t + 0x6d2b79f5) >>> 0;
      let x = Math.imul(t ^ (t >>> 15), 1 | t);
      x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
    const cells = [];
    for (let i = 0; i < 6000 && cells.length < count; i++) {
      const r = 5 + 42 * rnd() ** 2.2;
      const x = rnd() * w, y = rnd() * h;
      if (cells.every((c) => Math.hypot(c.x - x, c.y - y) > c.r + r + 2.5)) cells.push({ x, y, r });
    }
    const circles = cells
      .map((c, i) => `<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${c.r.toFixed(1)}"${i % 9 === 0 ? ' class="hot"' : ""}/>`)
      .join("");
    return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${circles}</svg>`;
  }

  // ---------- Header / Footer ----------
  const nav = [
    ["index", "首頁", "index.html"],
    ["research", "研究", "research.html"],
    ["members", "成員", "members.html"],
    ["publications", "成果", "publications.html"],
    ["contact", "聯絡", "contact.html"],
  ];
  set("site-header", `
    <div class="container header-inner">
      <a class="brand" href="index.html">
        <span class="brand-mark">${esc(L.short)}</span>
        <span class="brand-name">${esc(L.name)}</span>
      </a>
      <button class="nav-toggle" aria-label="選單" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button>
      <nav class="nav" id="site-nav" aria-label="主選單">${nav
        .map(([id, label, href], i) =>
          `<a href="${href}"${id === page ? ' class="active" aria-current="page"' : ""}><small>0${i}</small>${label}</a>`)
        .join("")}</nav>
    </div>`);
  const toggle = document.querySelector(".nav-toggle");
  const navEl = document.getElementById("site-nav");
  const setNav = (open) => {
    navEl.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  toggle.addEventListener("click", () => setNav(!navEl.classList.contains("open")));
  // Esc 或點選單外面時關閉手機選單
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navEl.classList.contains("open")) {
      setNav(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (navEl.classList.contains("open") && !navEl.contains(e.target) && !toggle.contains(e.target)) setNav(false);
  });

  set("site-footer", `
    <div class="container footer-inner">
      <div><strong>${esc(L.name)}</strong><br><span class="mono">${esc(L.nameEn)}</span></div>
      <div>${esc(L.university)}<br>${esc(L.contact.lab)} · <a href="mailto:${esc(L.contact.email)}">${esc(L.contact.email)}</a></div>
      <div class="mono muted">© ${new Date().getFullYear()} ${esc(L.short)}</div>
    </div>`);

  document.title = (document.title ? document.title + " | " : "") + L.name;

  // 子頁頁首加上一條泡孔紋理
  const head = document.querySelector(".page-head");
  if (head) head.insertAdjacentHTML("afterbegin", foamSVG(1200, 220, 90, page.length * 97, "page-foam"));

  // ---------- Helpers ----------
  const researchRows = (items) =>
    items
      .map((r) => `
        <article class="r-row">
          <div class="r-code mono">${esc(r.code)}</div>
          <div class="r-head"><h2>${esc(r.title)}</h2><p class="r-en mono">${esc(r.en)}</p></div>
          <div class="r-body"><p>${esc(r.desc)}</p>
            <ul class="tags">${(r.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
        </article>`)
      .join("");
  const pubItem = (p) =>
    `<li><div class="pub-title">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}<span class="sr-only">（另開新視窗）</span></a>` : esc(p.title)}</div>
      <div class="pub-meta">${esc(p.authors)} — <em>${esc(p.venue)}</em>, ${esc(p.year)}</div></li>`;
  const timeline = (items) =>
    `<ol class="timeline">${items.map((e) => `<li><span class="mono">${esc(e.year)}</span><span>${esc(e.text)}</span></li>`).join("")}</ol>`;
  // 頭像旁已有姓名標題，因此圖片 alt="" 、文字頭像 aria-hidden，避免螢幕閱讀器重複念
  // lead=true 用於頁面最上方的教授照片：不延遲載入、提高優先權
  const avatar = (m, lead = false) =>
    m.photo
      ? lead
        ? `<img class="avatar" src="${esc(m.photo)}" alt="" width="300" height="400" fetchpriority="high">`
        : `<img class="avatar" src="${esc(m.photo)}" alt="" width="64" height="64" loading="lazy">`
      : `<div class="avatar avatar-text" aria-hidden="true">${esc(m.name.slice(0, 1))}</div>`;

  // ---------- Pages ----------
  if (page === "index") {
    set("hero", `
      <div class="container hero-grid">
        <div class="hero-text">
          <p class="eyebrow mono">${esc(L.universityEn)}</p>
          <h1>${esc(L.name)}</h1>
          <p class="hero-en mono">${esc(L.nameEn)}</p>
          <p class="hero-tag">${esc(L.tagline)}</p>
          <div class="hero-actions"><a class="btn" href="research.html">研究主題 <span aria-hidden="true">→</span></a><a class="btn btn-ghost" href="contact.html">加入我們</a></div>
        </div>
        <figure class="hero-fig">
          ${foamSVG(560, 420, 150, 20240611, "hero-foam")}
          <figcaption class="mono"><span class="scale"></span>Fig. 0 — 微孔泡材截面示意</figcaption>
        </figure>
      </div>`);
    set("intro", esc(L.intro));
    set("research-preview", L.research
      .map((r) => `<li><span class="mono">${esc(r.code)}</span>${esc(r.title)}</li>`).join(""));
    set("honor-preview", timeline(L.honors.slice(0, 5)));
    set("facts", `
      <div><b class="mono">${L.research.length}</b><span>研究主題</span></div>
      <div><b class="mono">${esc(L.contact.lab.replace(/^.*\s/, ""))}</b><span>實驗室位置</span></div>
      <div><b class="mono">${esc(L.pi.courses.length)}</b><span>開授課程</span></div>`);
  }

  if (page === "research") set("research-list", researchRows(L.research));

  if (page === "members") {
    const p = L.pi;
    set("pi", `
      <article class="pi">
        <div class="pi-side">
          ${avatar(p, true)}
          <h2>${esc(p.name)} <span class="muted">${esc(p.title)}</span></h2>
          <p class="mono muted">${esc(p.nameEn)}</p>
          <dl class="kv">
            <dt>Email</dt><dd><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></dd>
            <dt>電話</dt><dd>${esc(p.phone)}</dd>
            <dt>辦公室</dt><dd>${esc(p.office)}</dd>
          </dl>
        </div>
        <div class="pi-main">
          <section><h3 class="label">學歷 Education</h3>${timeline(p.education)}</section>
          <section><h3 class="label">經歷 Experience</h3>${timeline(p.experience)}</section>
          <section class="pi-cols">
            <div><h3 class="label">學術服務</h3><ul class="plain">${p.service.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
            <div><h3 class="label">授課</h3><ul class="tags">${p.courses.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
          </section>
        </div>
      </article>`);
    const groups = Object.entries(L.members).filter(([, list]) => list.length);
    set("member-groups", groups.length
      ? groups.map(([group, list]) => `
          <section class="section-block"><h2 class="label">${esc(group)}</h2>
            <div class="members">${list.map((m) => `
              <article class="member">${avatar(m)}
                <div><h3>${esc(m.name)}</h3><p class="mono muted">${esc(m.nameEn)}</p><p>${esc(m.role)}</p>
                ${m.topic ? `<p class="muted">${esc(m.topic)}</p>` : ""}</div>
              </article>`).join("")}
            </div></section>`).join("")
      : `<p class="empty">學生名單整理中。對研究主題有興趣的同學，歡迎 <a href="contact.html">與我們聯絡</a>。</p>`);
  }

  if (page === "publications") {
    const years = [...new Set(L.publications.map((p) => p.year))].sort((a, b) => b - a);
    set("pub-list", years
      .map((y) => `<section class="year-block"><h3 class="mono">${y}</h3><ul class="pubs">${L.publications.filter((p) => p.year === y).map(pubItem).join("")}</ul></section>`)
      .join(""));
    set("honor-list", timeline(L.honors));
  }

  if (page === "contact") {
    const c = L.contact;
    set("contact-info", `
      <dl class="kv kv-lg">
        <dt>實驗室</dt><dd>${esc(c.lab)}</dd>
        <dt>辦公室</dt><dd>${esc(c.office)}</dd>
        <dt>地址</dt><dd>${esc(c.address)}</dd>
        <dt>Email</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd>
        <dt>電話</dt><dd>${esc(c.phone)}</dd>
        <dt>系辦</dt><dd>${esc(c.deptPhone)}</dd>
      </dl>
      <div class="note">
        <h2>招生</h2>
        <p>歡迎化學、材料、化工、機械、物理背景的碩士生、博士生與大學部專題生，也歡迎國際學生。請來信附上簡歷、成績單與有興趣的研究主題。</p>
      </div>`);
    set("map", c.mapEmbed ? `<iframe src="${esc(c.mapEmbed)}" loading="lazy" title="臺科大工程一館位置地圖" referrerpolicy="no-referrer-when-downgrade"></iframe>` : "");
  }
})();

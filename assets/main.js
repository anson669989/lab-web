// 共用版面與各頁內容渲染（一般不需要修改，內容請改 data.js）
(function () {
  const L = window.LAB;
  const page = document.body.dataset.page;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Header / Footer ----------
  const nav = [
    ["index", "首頁", "index.html"],
    ["research", "研究方向", "research.html"],
    ["members", "成員", "members.html"],
    ["publications", "論文發表", "publications.html"],
    ["contact", "聯絡我們", "contact.html"],
  ];
  document.getElementById("site-header").innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="index.html"><span class="brand-mark">${esc(L.short)}</span><span>${esc(L.name)}</span></a>
      <button class="nav-toggle" aria-label="選單" aria-expanded="false">☰</button>
      <nav class="nav">${nav
        .map(([id, label, href]) => `<a href="${href}"${id === page ? ' class="active" aria-current="page"' : ""}>${label}</a>`)
        .join("")}</nav>
    </div>`;
  const toggle = document.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = document.querySelector(".nav").classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-inner">
      <div><strong>${esc(L.name)}</strong><br>${esc(L.nameEn)} · ${esc(L.university)}</div>
      <div>${esc(L.contact.address)}<br><a href="mailto:${esc(L.contact.email)}">${esc(L.contact.email)}</a></div>
      <div class="muted">© ${new Date().getFullYear()} ${esc(L.nameEn)}</div>
    </div>`;

  document.title = (document.title ? document.title + " | " : "") + L.name;

  // ---------- Helpers ----------
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  const researchCards = (items) =>
    items
      .map((r) => `<article class="card"><div class="card-icon">${r.icon}</div><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p></article>`)
      .join("");
  const newsList = (items) =>
    `<ul class="news">${items.map((n) => `<li><time>${esc(n.date)}</time><span>${esc(n.text)}</span></li>`).join("")}</ul>`;
  const avatar = (m) =>
    m.photo
      ? `<img class="avatar" src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">`
      : `<div class="avatar avatar-text">${esc(m.name.slice(0, 1))}</div>`;
  const pubItem = (p) =>
    `<li><div class="pub-title">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</div>
      <div class="pub-meta">${esc(p.authors)} — <em>${esc(p.venue)}</em>, ${p.year}</div></li>`;

  // ---------- Pages ----------
  if (page === "index") {
    set("hero", `
      <div class="container">
        <p class="eyebrow">${esc(L.university)}</p>
        <h1>${esc(L.name)}</h1>
        <p class="hero-en">${esc(L.nameEn)}</p>
        <p class="hero-tag">${esc(L.tagline)}</p>
        <div class="hero-actions"><a class="btn" href="research.html">研究方向</a><a class="btn btn-ghost" href="contact.html">加入我們</a></div>
      </div>`);
    set("intro", esc(L.intro));
    set("research-preview", researchCards(L.research));
    set("news", newsList(L.news.slice(0, 5)));
    set("pub-preview", `<ul class="pubs">${L.publications.slice(0, 3).map(pubItem).join("")}</ul>`);
  }

  if (page === "research") set("research-list", researchCards(L.research));

  if (page === "members") {
    set("member-groups", Object.entries(L.members)
      .map(([group, list]) => `
        <section class="section-block"><h2>${esc(group)}</h2>
          <div class="members ${list.length === 1 && list[0].bio ? "members-featured" : ""}">
            ${list.map((m) => `
              <article class="member">${avatar(m)}
                <div><h3>${esc(m.name)}</h3><p class="muted">${esc(m.nameEn)}</p><p>${esc(m.role)}</p>
                ${m.bio ? `<p class="bio">${esc(m.bio)}</p>` : ""}
                ${m.email ? `<p><a href="mailto:${esc(m.email)}">${esc(m.email)}</a></p>` : ""}</div>
              </article>`).join("")}
          </div></section>`)
      .join(""));
  }

  if (page === "publications") {
    const years = [...new Set(L.publications.map((p) => p.year))].sort((a, b) => b - a);
    set("pub-list", years
      .map((y) => `<section class="section-block"><h2>${y}</h2><ul class="pubs">${L.publications.filter((p) => p.year === y).map(pubItem).join("")}</ul></section>`)
      .join(""));
  }

  if (page === "contact") {
    const c = L.contact;
    set("contact-info", `
      <dl class="contact-list">
        <dt>地址</dt><dd>${esc(c.address)}</dd>
        <dt>Email</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd>
        <dt>電話</dt><dd>${esc(c.phone)}</dd>
      </dl>
      <p>對本實驗室研究有興趣的同學，歡迎來信附上簡歷與成績單。</p>`);
    set("map", c.mapEmbed ? `<iframe src="${esc(c.mapEmbed)}" loading="lazy" title="地圖" referrerpolicy="no-referrer-when-downgrade"></iframe>` : "");
  }
})();

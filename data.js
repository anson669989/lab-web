// =============================================================
//  實驗室網站資料檔 —— 平常更新內容只需要改這個檔案
//  Lab website data — edit this file to update the site.
//
//  資料來源 Source：臺科大材料系師資頁（葉樹開教授）
//  所有文字都有 zh（中文）與 en（英文）兩欄，網站會中英並排顯示。
//  標示 TODO 的欄位是系網沒有提供、需要老師或同學補上的內容。
// =============================================================
window.LAB = {
  // TODO：系網未列出正式實驗室名稱，請改成老師使用的名稱
  name: { zh: "葉樹開教授實驗室", en: "Polymer Foam & Composites Lab" },
  // 首頁大標的分行方式
  heroLines: ["葉樹開教授", "實驗室"],
  short: "YEH LAB",
  unit: {
    zh: "國立臺灣科技大學 材料科學與工程系",
    en: "Department of Materials Science and Engineering, NTUST",
  },
  tagline: {
    zh: "從微孔結構到纖維界面，設計更輕、更強、更耐衝擊的高分子材料。",
    en: "From cell structure to fiber interfaces, we design lighter, stronger and tougher polymer materials.",
  },
  intro: {
    zh: "本實驗室由葉樹開教授主持，研究主軸為高分子加工與複合材料：以超臨界流體發泡製備微孔與奈米孔泡材，結合石墨烯等奈米填料調控泡孔結構與性質；同時發展天然纖維複合材料與剪切增稠流體複合材料，並以流變學連結材料結構、加工條件與最終性能。",
    en: "Led by Prof. Shu-Kai Yeh, the lab works on polymer processing and composites. We make micro- and nanocellular foams with supercritical fluids and tune their structure with nanofillers such as graphene. We also develop natural fiber and shear-thickening fluid composites, using rheology to link structure, processing and performance.",
  },

  // ---------- 研究 ----------
  // planned: true 表示規劃中的方向
  research: [
    {
      title: { zh: "高分子／石墨烯奈米複合材料與泡材", en: "Polymer–Graphene Nanocomposites and Their Foams" },
      desc: {
        zh: "將石墨烯等奈米填料分散於高分子基材，探討填料對結晶、流變與成核行為的影響，製備兼具輕量化與導電、阻隔或補強特性的奈米複合泡材。",
        en: "We disperse graphene and other nanofillers in polymers to study their effect on crystallization, rheology and nucleation, and make lightweight foams with conductive, barrier or reinforcing properties.",
      },
      tags: [{ zh: "石墨烯", en: "Graphene" }, { zh: "填料分散", en: "Filler dispersion" }, { zh: "異質成核", en: "Heterogeneous nucleation" }],
    },
    {
      title: { zh: "微孔與奈米孔發泡", en: "Microcellular and Nanocellular Foam" },
      desc: {
        zh: "以超臨界二氧化碳等物理發泡劑製備微孔與奈米孔泡材，研究壓力、溫度與釋壓速率對泡孔密度與尺寸的控制，並發展珠粒發泡等加工技術。",
        en: "We use supercritical CO₂ and other physical blowing agents to make micro- and nanocellular foams, study how pressure, temperature and depressurization rate control cell density and size, and develop bead-foaming processes.",
      },
      tags: [{ zh: "超臨界流體", en: "Supercritical fluid" }, { zh: "泡孔結構", en: "Cell morphology" }, { zh: "珠粒發泡", en: "Bead foam" }],
    },
    {
      title: { zh: "天然纖維複合材料", en: "Natural Fiber Composites" },
      desc: {
        zh: "以天然纖維補強高分子基材，研究纖維與基材的界面相容性及加工方法，開發輕量且環境友善的複合材料。",
        en: "We reinforce polymers with natural fibers, studying fiber–matrix compatibility and processing to develop lightweight, environmentally friendly composites.",
      },
      tags: [{ zh: "界面改質", en: "Interface modification" }, { zh: "永續材料", en: "Sustainable materials" }],
    },
    {
      title: { zh: "剪切增稠流體複合材料", en: "Shear-Thickening Fluid Composites" },
      desc: {
        zh: "研究剪切增稠流體的流變機制，並與纖維織物等基材結合，探索其在防護與吸能材料上的應用。",
        en: "We study the rheology of shear-thickening fluids and combine them with fabrics for protective and energy-absorbing materials.",
      },
      tags: [{ zh: "衝擊吸收", en: "Impact absorption" }, { zh: "防護材料", en: "Protective materials" }],
    },
    {
      title: { zh: "高分子與複合材料流變學", en: "Polymer and Composite Rheology" },
      desc: {
        zh: "以剪切與拉伸流變量測分析高分子熔體與複合材料的流動行為，作為發泡與成型加工條件設計的依據。",
        en: "We measure the shear and extensional rheology of polymer melts and composites to guide the design of foaming and molding conditions.",
      },
      tags: [{ zh: "拉伸流變", en: "Extensional rheology" }, { zh: "熔體強度", en: "Melt strength" }],
    },
    {
      title: { zh: "電子封裝高分子材料", en: "Polymers for Electronic Packaging" },
      planned: true,
      desc: {
        zh: "晶片愈做愈密，封裝中的高分子需同時處理散熱、訊號損耗、應力與翹曲。本實驗室規劃以發泡、流變與奈米複合材料的經驗投入此領域：以多孔結構降低介電常數、以流變分析掌握底部填充膠與模封材料的流動，並以填料網絡建立導熱路徑。此為發展中的方向，目前尚無相關發表。",
        en: "As chips get denser, packaging polymers must manage heat, signal loss, stress and warpage at once. We plan to bring our work in foaming, rheology and nanocomposites to this field: porous structures for lower dielectric constant, rheology for underfill and molding-compound flow, and filler networks for heat conduction. This is a developing direction with no publications yet.",
      },
      tags: [{ zh: "低介電", en: "Low-k" }, { zh: "底部填充膠", en: "Underfill" }, { zh: "熱管理", en: "Thermal management" }],
    },
  ],

  // ---------- 成員 ----------
  pi: {
    name: { zh: "葉樹開", en: "Shu-Kai Yeh" },
    title: { zh: "教授", en: "Professor" },
    photo: "images/members/yeh.jpg",
    email: "skyeh@mail.ntust.edu.tw",
    phone: "02-2737-6518",
    office: "E1-240-1",
    expertise: {
      zh: "高分子奈米複合泡材、天然纖維複合材料、剪切增稠流體複合材料",
      en: "Polymer nanocomposite foams, natural fiber composites, shear-thickening fluid composites",
    },
    education: [
      { year: "2007", zh: "美國西維吉尼亞大學 化學工程 博士", en: "Ph.D., Chemical Engineering, West Virginia University, USA" },
      { year: "2003", zh: "美國西維吉尼亞大學 化學工程 碩士", en: "M.S., Chemical Engineering, West Virginia University, USA" },
      { year: "1999", zh: "國立臺灣大學 化學工程 學士", en: "B.S., Chemical Engineering, National Taiwan University" },
    ],
    experience: [
      { year: "2016 –", zh: "國立臺灣科技大學 材料科學與工程系（副教授起，現任教授）", en: "Dept. of Materials Science and Engineering, NTUST (Associate Professor, now Professor)" },
      { year: "2014 – 2016", zh: "國立臺灣科技大學 材料科學與工程系 助理教授", en: "Assistant Professor, Materials Science and Engineering, NTUST" },
      { year: "2009 – 2014", zh: "國立臺北科技大學 化學工程與生物科技系 助理教授", en: "Assistant Professor, Chemical Engineering and Biotechnology, Taipei Tech" },
      { year: "2009", zh: "國立高雄應用科技大學 模具工程系 助理教授", en: "Assistant Professor, Mold and Die Engineering, KUAS" },
      { year: "2007 – 2009", zh: "美國俄亥俄州立大學 化學與生醫工程系 博士後研究", en: "Postdoctoral Researcher, Chemical and Biomolecular Engineering, The Ohio State University" },
    ],
    service: [
      { zh: "Cellular Polymers（SCI 期刊）編輯委員暨副主編", en: "Editorial Board and Associate Editor, Cellular Polymers" },
      { zh: "Polymers 期刊 Topic Content Editor", en: "Topic Content Editor, Polymers" },
      { zh: "SPE ANTEC 2016 TPMF／IMD 聯合場次主持人", en: "Session Moderator, SPE ANTEC 2016, TPMF and IMD Joint Division" },
    ],
  },

  // 學生名單：系網未提供，請依實際狀況填入。格式範例：
  // { name: { zh: "王小明", en: "Hsiao-Ming Wang" }, role: { zh: "碩士班二年級", en: "M.S. student, 2nd year" }, topic: { zh: "PP 珠粒發泡", en: "PP bead foam" }, photo: "" }
  members: [
    { group: { zh: "博士生", en: "Ph.D. Students" }, people: [] },
    { group: { zh: "碩士生", en: "M.S. Students" }, people: [] },
    { group: { zh: "大學部專題生", en: "Undergraduate Researchers" }, people: [] },
    { group: { zh: "畢業校友", en: "Alumni" }, people: [] },
  ],

  honors: [
    { year: "2018", zh: "PPS-34（臺北）最佳壁報獎（學生：劉威翔、黃彥銘）", en: "Best Poster Award, PPS-34, Taipei" },
    { year: "2017", zh: "國立臺灣科技大學 年輕學者研究獎", en: "Outstanding Young Scholar Award, NTUST" },
    { year: "2017", zh: "科技部產學成果發表會 應用型口頭發表優等獎", en: "Excellent Oral Presentation Award (applied), MOST University–Industry Symposium" },
    { year: "2017", zh: "高分子學會年會 高分子加工組 壁報佳作（指導教授）", en: "Honorable Mention Poster, Polymer Processing Division, Polymer Society Annual Meeting (advisor)" },
    { year: "2016", zh: "Polymer（英國）審稿傑出貢獻", en: "Outstanding Contribution in Reviewing, Polymer (UK)" },
    { year: "2016", zh: "SPE 臺灣分會第十屆論文競賽 佳作（指導教授）", en: "Honorable Mention, 10th SPE Taiwan Section Paper Competition (advisor)" },
    { year: "2016", zh: "高分子學會年會 高分子加工組 壁報佳作（指導教授）", en: "Honorable Mention Poster, Polymer Processing Division, Polymer Society Annual Meeting (advisor)" },
    { year: "2015", zh: "高分子學會年會 高分子加工組 優秀壁報第一名、第二名（指導教授）", en: "1st and 2nd Place Posters, Polymer Processing Division, Polymer Society Annual Meeting (advisor)" },
    { year: "2015", zh: "科技部產學成果發表會 化工與材料領域 優秀壁報獎", en: "Outstanding Poster Award, MOST University–Industry Symposium" },
    { year: "2011", zh: "高分子學會年會 學生口頭發表佳作（指導教授）", en: "Honorable Mention, Student Oral Competition, Polymer Society Annual Meeting (advisor)" },
    { year: "2007", zh: "國科會 96 年度補助博士後研究人員赴國外研究", en: "NSC Postdoctoral Research Abroad Program" },
    { year: "2005 – 2007", zh: "駐美國臺北經濟文化代表處 學術會議旅費補助", en: "Academic Conference Travel Grant, TECRO in the U.S." },
  ],

  // ---------- 論文 ----------
  // TODO：系網沒有列出論文，請補上完整清單。格式：
  // { year: 2024, authors: "…", title: "…", venue: "期刊名稱, 卷(期), 頁碼", link: "https://doi.org/…" }
  publications: [
    {
      year: 2018,
      authors: "劉威翔、黃彥銘、葉樹開",
      title: "Thermal Properties of Polyamide 6 Blends and Its Potential for Bead Foam Applications",
      venue: "34th International Conference of the Polymer Processing Society (PPS-34), Taipei",
      note: { zh: "最佳壁報獎", en: "Best Poster Award" },
      link: "",
    },
    {
      year: 2007,
      authors: "S.-K. Yeh et al.",
      title: "Synergistic Effect of PP-g-MA and SEBS-g-MA on Polypropylene Based Wood Plastic Composites Reinforced with Nanoclay",
      venue: "", // TODO：補上期刊名稱
      link: "",
    },
  ],

  // ---------- 課程 ----------
  // TODO：可在 term 補上開課學期，例如 { zh: "每學年上學期", en: "Fall semester" }
  courses: [
    {
      name: { zh: "高分子加工", en: "Polymer Processing" },
      desc: {
        zh: "擠出、射出、吹膜與發泡等成型方法，以及加工條件與產品結構、性質之間的關係。",
        en: "Extrusion, injection molding, film blowing and foaming, and how processing conditions shape structure and properties.",
      },
      term: null,
    },
    {
      name: { zh: "高分子與複合材料流變學", en: "Polymer and Composite Rheology" },
      desc: {
        zh: "黏彈性、剪切與拉伸流變量測，以及填料、纖維對熔體流動行為的影響。",
        en: "Viscoelasticity, shear and extensional measurements, and how fillers and fibers change melt flow.",
      },
      term: null,
    },
    {
      name: { zh: "材料加工輸送現象", en: "Transport Phenomena in Material Processing" },
      desc: {
        zh: "動量、熱量與質量傳輸在材料加工中的應用，例如模具充填、冷卻與氣體擴散。",
        en: "Momentum, heat and mass transfer applied to processing, such as mold filling, cooling and gas diffusion.",
      },
      term: null,
    },
    {
      name: { zh: "普通化學", en: "General Chemistry" },
      desc: {
        zh: "原子結構、化學鍵、熱力學與反應動力學等基礎化學概念。",
        en: "Foundations of chemistry: atomic structure, bonding, thermodynamics and kinetics.",
      },
      term: null,
    },
  ],

  // ---------- 聯絡 ----------
  contact: {
    lab: { zh: "工程一館 E1-242-1", en: "Engineering Building 1, Room E1-242-1" },
    office: { zh: "工程一館 E1-240-1", en: "Engineering Building 1, Room E1-240-1" },
    address: {
      zh: "106335 臺北市大安區基隆路四段 43 號 國立臺灣科技大學",
      en: "No. 43, Sec. 4, Keelung Rd., Da'an Dist., Taipei 106335, Taiwan",
    },
    email: "skyeh@mail.ntust.edu.tw",
    phone: "02-2737-6518",
    deptPhone: "02-2733-3141 #5222",
    mapEmbed:
      "https://www.google.com/maps?q=%E5%9C%8B%E7%AB%8B%E8%87%BA%E7%81%A3%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%B8%E5%B7%A5%E7%A8%8B%E4%B8%80%E9%A4%A8&output=embed",
    join: {
      zh: "歡迎化學、材料、化工、機械與物理背景的碩士生、博士生與大學部專題生加入，也歡迎國際學生。請來信附上簡歷、成績單與有興趣的研究主題。",
      en: "We welcome M.S., Ph.D. and undergraduate students from chemistry, materials, chemical engineering, mechanical engineering and physics, including international students. Email a CV, transcript and the topic you'd like to work on.",
    },
  },
};

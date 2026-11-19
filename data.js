// =============================================================
//  實驗室網站資料檔 —— 平常更新內容只需要改這個檔案
//  修改後 commit + push，GitHub Pages 約 1 分鐘內自動更新
//
//  資料來源：臺科大材料系師資頁（葉樹開教授）
//  https://mse-r.ntust.edu.tw/p/426-1019-12.php?Lang=zh-tw
//  標示「TODO」的欄位是系網沒有提供、需要老師或同學補上的內容。
// =============================================================
window.LAB = {
  // TODO：系網未列出正式實驗室名稱，請改成老師使用的名稱
  name: "葉樹開教授實驗室",
  nameEn: "Polymer Foam & Composites Lab",
  short: "YEH LAB",
  university: "國立臺灣科技大學 材料科學與工程系",
  universityEn: "Dept. of Materials Science and Engineering, NTUST",
  tagline: "從微孔結構到纖維界面，設計更輕、更強、更耐衝擊的高分子材料。",
  intro:
    "本實驗室由葉樹開教授主持，研究主軸為高分子加工與複合材料：以超臨界流體發泡製備微孔與奈米孔泡材，結合石墨烯等奈米填料調控泡孔結構與性質；同時發展天然纖維複合材料與剪切增稠流體（STF）複合材料，並以流變學連結材料結構、加工條件與最終性能。歡迎化學、材料、化工、機械與物理背景的同學（含國際學生）加入。",

  contact: {
    lab: "工程一館 E1-242-1",
    office: "工程一館 E1-240-1（教授辦公室）",
    address: "106335 臺北市大安區基隆路四段 43 號 國立臺灣科技大學",
    email: "skyeh@mail.ntust.edu.tw",
    phone: "02-2737-6518",
    deptPhone: "02-2733-3141 #5222（材料系辦）",
    mapEmbed: "https://www.google.com/maps?q=%E5%9C%8B%E7%AB%8B%E8%87%BA%E7%81%A3%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%B8%E5%B7%A5%E7%A8%8B%E4%B8%80%E9%A4%A8&output=embed",
  },

  // 研究方向：code 是左側的短代號，tags 是關鍵字
  research: [
    {
      code: "R1",
      title: "高分子／石墨烯奈米複合材料與泡材",
      en: "Polymer–Graphene Nanocomposites & Their Foams",
      desc: "將石墨烯等奈米填料分散於高分子基材，探討填料對結晶、流變與成核行為的影響，進而製備兼具輕量化與導電、阻隔或機械補強特性的奈米複合泡材。",
      tags: ["石墨烯", "奈米填料分散", "異質成核"],
    },
    {
      code: "R2",
      title: "微孔與奈米孔發泡",
      en: "Microcellular & Nanocellular Foam",
      desc: "以超臨界 CO₂ 等物理發泡劑製備微孔與奈米孔泡材，研究壓力、溫度與釋壓速率對泡孔密度與尺寸的控制，並發展珠粒發泡等加工技術。",
      tags: ["超臨界流體", "泡孔結構", "珠粒發泡"],
    },
    {
      code: "R3",
      title: "天然纖維複合材料",
      en: "Natural Fiber Composites",
      desc: "以天然纖維補強高分子基材，研究纖維—基材界面相容性與加工方法，開發輕量且環境友善的複合材料。",
      tags: ["界面改質", "永續材料", "輕量化"],
    },
    {
      code: "R4",
      title: "剪切增稠流體複合材料",
      en: "Shear-Thickening Fluid Composites",
      desc: "研究剪切增稠流體（STF）的流變機制，並與纖維織物等基材結合，探索其在防護與吸能材料上的應用。",
      tags: ["STF", "衝擊吸收", "防護材料"],
    },
    {
      code: "R5",
      title: "高分子與複合材料流變學",
      en: "Polymer & Composite Rheology",
      desc: "以剪切與拉伸流變量測分析高分子熔體與複合材料的流動行為，作為發泡與成型加工條件設計的依據。",
      tags: ["拉伸流變", "熔體強度", "加工窗口"],
    },
  ],

  pi: {
    name: "葉樹開",
    nameEn: "Shu-Kai Yeh",
    title: "教授",
    photo: "images/members/yeh.jpg",
    email: "skyeh@mail.ntust.edu.tw",
    phone: "02-2737-6518",
    office: "E1-240-1",
    education: [
      { year: "2007", text: "Ph.D. 化學工程，West Virginia University（美國）" },
      { year: "2003", text: "M.S. 化學工程，West Virginia University（美國）" },
      { year: "1999", text: "B.S. 化學工程，國立臺灣大學" },
    ],
    experience: [
      { year: "2016 –", text: "國立臺灣科技大學 材料科學與工程系（副教授起，現任教授）" },
      { year: "2014 – 2016", text: "國立臺灣科技大學 材料科學與工程系 助理教授" },
      { year: "2009 – 2014", text: "國立臺北科技大學 化學工程與生物科技系 助理教授" },
      { year: "2009", text: "國立高雄應用科技大學 模具工程系 助理教授" },
      { year: "2007 – 2009", text: "The Ohio State University 化學與生醫工程系 博士後研究" },
    ],
    service: [
      "Cellular Polymers（SCI 期刊）編輯委員暨副主編",
      "Polymers 期刊 Topic Content Editor",
      "SPE ANTEC 2016 Session Moderator",
    ],
    courses: ["高分子加工", "高分子與複合材料流變學", "材料加工輸送現象", "普通化學"],
  },

  // 學生名單：系網未提供，請依實際狀況填入。格式範例：
  // { name: "王小明", nameEn: "Hsiao-Ming Wang", role: "碩士班二年級", topic: "PP 珠粒發泡", photo: "" }
  members: {
    "博士生": [],
    "碩士生": [],
    "大學部專題生": [],
    "畢業校友": [],
  },

  honors: [
    { year: 2018, text: "PPS-34（台北）Best Poster Award —〈Thermal Properties of Polyamide 6 Blends and Its Potential for Bead Foam Applications〉（學生：劉威翔、黃彥銘）" },
    { year: 2017, text: "國立臺灣科技大學 年輕學者研究獎" },
    { year: 2017, text: "科技部產學成果發表會 應用型口頭發表優等獎" },
    { year: 2017, text: "高分子學會年會 高分子加工組 壁報佳作（指導教授）" },
    { year: 2016, text: "Polymer（英國）Outstanding Contribution in Reviewing" },
    { year: 2016, text: "高分子學會年會 高分子加工組 壁報佳作（指導教授）" },
    { year: 2015, text: "高分子學會年會 高分子加工組 優秀壁報第一名、第二名（指導教授）" },
    { year: 2015, text: "科技部產學成果發表會 優秀壁報獎" },
    { year: 2011, text: "高分子學會年會 口頭發表佳作（指導教授）" },
    { year: 2007, text: "國科會 96 年度補助博士後研究人員赴國外研究" },
  ],

  // TODO：系網沒有列出論文，請從 Google Scholar / ORCID 補上
  publications: [
    {
      year: 2018,
      authors: "劉威翔、黃彥銘、葉樹開",
      title: "Thermal Properties of Polyamide 6 Blends and Its Potential for Bead Foam Applications",
      venue: "34th International Conference of the Polymer Processing Society (PPS-34), Taipei — Best Poster Award",
      link: "",
    },
  ],
};

// =============================================================
//  實驗室網站資料檔 —— 平常更新內容只需要改這個檔案
//  修改後 commit + push，GitHub Pages 約 1 分鐘內自動更新
// =============================================================
window.LAB = {
  name: "○○ 智慧系統實驗室",
  nameEn: "Intelligent Systems Lab",
  short: "ISL",
  university: "○○大學 ○○學系",
  tagline: "以資料與演算法，解決真實世界的問題。",
  intro:
    "本實驗室致力於機器學習、電腦視覺與嵌入式智慧系統之研究，結合理論與實作，與產業及國際團隊合作，培養具備獨立研究能力的研究人才。",

  contact: {
    address: "○○市○○區○○路 1 號 ○○館 501 室",
    email: "lab@example.edu.tw",
    phone: "(0X) 1234-5678 #5501",
    // Google 地圖嵌入網址：Google Maps → 分享 → 嵌入地圖 → 複製 src
    mapEmbed: "https://www.google.com/maps?q=Taipei&output=embed",
  },

  news: [
    { date: "2026-11-01", text: "歡迎 115 學年度碩士班新生加入實驗室！" },
    { date: "2026-09-15", text: "本實驗室論文獲 ○○ 國際研討會接受發表。" },
    { date: "2026-07-20", text: "王小明同學獲得 ○○ 競賽第一名。" },
    { date: "2026-05-02", text: "實驗室招收碩士班、專題生，歡迎來信洽詢。" },
  ],

  research: [
    {
      icon: "🧠",
      title: "機器學習",
      desc: "研究深度學習模型的可解釋性、穩健性與高效訓練方法。",
    },
    {
      icon: "👁️",
      title: "電腦視覺",
      desc: "影像辨識、物件偵測與三維重建，應用於醫療與智慧製造。",
    },
    {
      icon: "🔌",
      title: "嵌入式 AI",
      desc: "將 AI 模型部署於邊緣裝置，兼顧效能與功耗。",
    },
  ],

  // photo 可放圖片路徑，例如 "images/members/pi.jpg"；留空會顯示姓名縮寫
  members: {
    "指導教授": [
      {
        name: "陳大文",
        nameEn: "Prof. Da-Wen Chen",
        role: "教授 / 實驗室主持人",
        email: "dwchen@example.edu.tw",
        photo: "",
        bio: "美國 ○○ 大學電機博士，研究專長為機器學習與電腦視覺。",
      },
    ],
    "博士生": [
      { name: "林小華", nameEn: "Hsiao-Hua Lin", role: "博士班三年級", photo: "" },
    ],
    "碩士生": [
      { name: "王小明", nameEn: "Hsiao-Ming Wang", role: "碩士班二年級", photo: "" },
      { name: "張雅婷", nameEn: "Ya-Ting Chang", role: "碩士班二年級", photo: "" },
      { name: "李志豪", nameEn: "Chih-Hao Lee", role: "碩士班一年級", photo: "" },
    ],
    "畢業校友": [
      { name: "黃建國", nameEn: "Chien-Kuo Huang", role: "2025 碩士畢業 · 現職 ○○科技", photo: "" },
    ],
  },

  publications: [
    {
      year: 2026,
      authors: "H.-M. Wang, Y.-T. Chang, D.-W. Chen",
      title: "Efficient Vision Transformers for Edge Devices",
      venue: "Proceedings of ○○ Conference",
      link: "",
    },
    {
      year: 2025,
      authors: "H.-H. Lin, D.-W. Chen",
      title: "Robust Defect Detection via Self-Supervised Learning",
      venue: "IEEE Transactions on ○○",
      link: "",
    },
    {
      year: 2024,
      authors: "C.-K. Huang, D.-W. Chen",
      title: "A Lightweight Framework for Medical Image Segmentation",
      venue: "Journal of ○○",
      link: "",
    },
  ],
};

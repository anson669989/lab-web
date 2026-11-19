# 葉樹開教授實驗室網站 Yeh Polymer Lab

純靜態網站（HTML／CSS／JS），不需建置工具，部署於 GitHub Pages，並以 `CNAME` 轉至私人網域 `lab.ahiruper.com`。

## 頁面
首頁 `index.html`｜研究 `research.html`｜成員 `members.html`｜論文 `publications.html`｜課程 `courses.html`｜聯絡 `contact.html`

## 更新內容
所有文字都在 **`data.js`**，每段都有 `zh`（中文）與 `en`（英文）兩欄，網站會並排顯示。標示 `TODO` 的欄位需補上（實驗室正式名稱、學生名單、論文列表、開課學期）。

1. 編輯 `data.js`；成員照片放到 `images/members/`，在 `photo` 填路徑
2. `git add . && git commit -m "更新內容" && git push`
3. 約 1 分鐘後網站更新

## 網域設定（GitHub Pages → 私人網域）
1. GitHub repo → Settings → Pages → Source 選 `main` 分支根目錄
2. Custom domain 填 `lab.ahiruper.com`（與 `CNAME` 檔一致），勾選 Enforce HTTPS
3. 在網域 DNS 加一筆 CNAME：`lab` → `anson669989.github.io`

## 本機預覽
直接用瀏覽器開 `index.html`。

## 檔案
```
*.html            各頁面外殼
data.js           網站內容（主要編輯這個）
assets/style.css  樣式；顏色與字體在最上方 :root
assets/main.js    版面與渲染；首頁封裝剖面圖也在這裡
images/           圖片
```

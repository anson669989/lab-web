# 實驗室網站

純靜態網站（HTML / CSS / JS），不需要任何建置工具，直接部署在 GitHub Pages。

## 如何更新內容

**幾乎所有內容都在 `data.js`**：實驗室名稱、簡介、最新消息、研究方向、成員、論文、聯絡資訊。

1. 編輯 `data.js`
2. 成員照片放到 `images/members/`，並在 `data.js` 的 `photo` 填入路徑（例如 `images/members/chen.jpg`）
3. 提交並推送：
   ```bash
   git add .
   git commit -m "更新內容"
   git push
   ```
4. 約 1 分鐘後網站自動更新

## 本機預覽

直接用瀏覽器打開 `index.html` 即可。

## 檔案結構

```
index.html / research.html / members.html / publications.html / contact.html  各頁面
data.js           網站內容（主要編輯這個）
assets/style.css  樣式（顏色在最上方 :root 變數）
assets/main.js    版面與渲染邏輯
images/           圖片
```

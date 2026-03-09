# 💀 FAAKK — LeetCode Fail Sound Extension

> *Because your compiler should judge you too.*

---

```
███████╗ █████╗  █████╗ ██╗  ██╗██╗  ██╗
██╔════╝██╔══██╗██╔══██╗██║ ██╔╝██║ ██╔╝
█████╗  ███████║███████║█████╔╝ █████╔╝ 
██╔══╝  ██╔══██║██╔══██║██╔═██╗ ██╔═██╗ 
██║     ██║  ██║██║  ██║██║  ██╗██║  ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
```

**A Chrome / Edge extension that plays a meme sound every time your LeetCode submission fails.**
No mercy. No silence. Just vibes and shame.

---

## 📦 What's Inside

```
faakk-final/
├── manifest.json     ← Extension config (Manifest V3)
├── content.js        ← The brain — watches for fail results
└── faakk.wav         ← The sound of your suffering
```

---

## 🖥️ Installation — Any PC (Windows / Mac / Linux)

### ✅ Works on: Google Chrome · Microsoft Edge · Brave · Any Chromium browser

---

### Step 1 — Download & Extract

Download the ZIP file and extract it somewhere you won't accidentally delete it.

```
faakk-final/          ← Keep this folder somewhere permanent
  ├── manifest.json
  ├── content.js
  └── faakk.wav
```

> ⚠️ **Don't delete the folder after installing.** The browser loads the extension directly from it.

---

### Step 2 — Open Extensions Page

| Browser | URL to open |
|--------|-------------|
| Chrome | `chrome://extensions` |
| Edge   | `edge://extensions`   |
| Brave  | `brave://extensions`  |

Paste the URL directly into your address bar and hit Enter.

---

### Step 3 — Enable Developer Mode

Look for the **"Developer mode"** toggle:

- **Chrome / Brave** → top-right corner of the extensions page
- **Edge** → bottom-left corner of the extensions page

**Flip it ON** 🔛

---

### Step 4 — Load the Extension

1. Click **"Load unpacked"** (appears after enabling Developer Mode)
2. Navigate to and select the `faakk-final` folder
3. Click **"Select Folder"**

The extension will appear in your list with a 💀 icon.

---

### Step 5 — Pin It (Optional but Recommended)

Click the **puzzle piece icon** 🧩 in your browser toolbar → find **Faakk LeetCode Extension** → click the **pin** 📌 icon.

---

## ⚙️ How It Works

```
You submit code
      │
      ▼
LeetCode navigates to:
  leetcode.com/problems/.../submissions/XXXXXXX/
      │
      ▼
Extension wakes up on the new page
      │
      ▼
Scans page text for fail keywords:
  ┌─────────────────────────────┐
  │ ✗ Wrong Answer              │
  │ ✗ Runtime Error             │
  │ ✗ Time Limit Exceeded       │
  │ ✗ Memory Limit Exceeded     │
  │ ✗ Compile Error             │
  │ ✗ Output Limit Exceeded     │
  └─────────────────────────────┘
      │
   Found?
   /    \
 YES     NO
  │       │
  ▼       ▼
💀 FAAKK  😮‍💨 Silence
  sound   (Accepted or still loading)
```

### Key Behaviours

| Scenario | Result |
|----------|--------|
| Wrong Answer | 💀 Sound plays |
| Runtime Error | 💀 Sound plays |
| Time Limit Exceeded | 💀 Sound plays |
| Memory Limit Exceeded | 💀 Sound plays |
| Compile Error | 💀 Sound plays |
| Accepted ✅ | 🔇 No sound |
| Typing code | 🔇 No sound |
| Clicking around | 🔇 No sound |
| Resubmitting same problem | 💀 Sound plays again |
| Refreshing the result page | 💀 Sound plays |
| Switching to another problem | 🔄 State resets, ready for next submission |

---

## 🔧 Technical Details

The extension uses a **DOM text scanning** approach combined with **URL change detection**:

1. **`run_at: document_idle`** — script loads after the page DOM is ready
2. **`setInterval` URL polling** — detects when LeetCode SPA-navigates to the submission result page (`.../submissions/XXXXXXX/`)
3. **`MutationObserver`** — watches for DOM mutations in real-time so the result is caught as soon as it renders
4. **Staggered timeouts** — checks at 1.5s, 3s, and 5s after navigation to handle slow connections
5. **`triggered` flag** — resets on every URL change so every new submission is independently detected
6. **Sound URL resolved at load time** — `chrome.runtime.getURL()` is called once when the script first boots, avoiding the `Extension context invalidated` error

---

## 🔇 How to Temporarily Disable

Go to `chrome://extensions` (or `edge://extensions`) and toggle the extension **OFF**. Toggle back **ON** whenever you want the shame back.

---

## 🗑️ How to Uninstall

1. Go to `chrome://extensions`
2. Find **Faakk LeetCode Extension**
3. Click **"Remove"**
4. Optionally delete the `faakk-final` folder from your PC

---

## 🎵 Custom Sound

Want a different sound? Replace `faakk.wav` with any `.wav` file of your choice — just keep the filename exactly as `faakk.wav`.

> ⚠️ After replacing the file, go to `chrome://extensions` and click the **↺ refresh** button on the extension card.

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| No sound on first submission | Make sure you clicked anywhere on the page first (browser autoplay policy) |
| Sound stopped working | Go to `chrome://extensions` → click ↺ to reload the extension |
| Extension disappeared | Re-add it via "Load unpacked" — the folder may have moved |
| Sound plays on every click | You have an old version installed — remove it and load this one fresh |

---

## 📋 Permissions Used

| Permission | Why |
|-----------|-----|
| `scripting` | Required to run content scripts on LeetCode pages |
| `https://leetcode.com/*` | Only runs on LeetCode — nowhere else |

> 🔒 This extension collects **zero data**. It reads nothing, sends nothing, stores nothing. It just listens for fail text and plays a sound.

---

## 💀 Made with suffering, for the suffering.

*Happy grinding. You'll need it.*

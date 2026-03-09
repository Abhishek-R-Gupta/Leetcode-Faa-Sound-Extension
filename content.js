// Faakk LeetCode Extension
// Works by watching the DOM on the submission result page.
// LeetCode navigates to /submissions/XXXXXXX/ after submitting —
// we detect the result text on THAT page.

const SOUND_URL = chrome.runtime.getURL("faakk.wav");

const FAIL_KEYWORDS = [
  "Wrong Answer",
  "Runtime Error",
  "Time Limit Exceeded",
  "Memory Limit Exceeded",
  "Compile Error",
  "Output Limit Exceeded",
];

let triggered = false;

function playFaakk() {
  try {
    const audio = new Audio(SOUND_URL);
    audio.volume = 1.0;
    audio.play().catch((e) => console.warn("[Faakk] play failed:", e));
    console.log("[Faakk] 💀 FAAKK!");
  } catch (e) {
    console.warn("[Faakk] error:", e);
  }
}

function checkPage() {
  if (triggered) return;
  const text = document.body ? document.body.innerText : "";
  const hit = FAIL_KEYWORDS.find((kw) => text.includes(kw));
  if (hit) {
    triggered = true;
    console.log("[Faakk] Found on page:", hit);
    playFaakk();
  }
}

// Every time URL changes (SPA nav), reset and re-check
let lastUrl = location.href;

function onUrlChange() {
  if (location.href === lastUrl) return;
  lastUrl = location.href;
  triggered = false;
  console.log("[Faakk] URL changed to:", location.href);
  // Wait for DOM to populate with result, then check
  setTimeout(checkPage, 1500);
  setTimeout(checkPage, 3000);
  setTimeout(checkPage, 5000);
}

// Watch for SPA navigation via MutationObserver on <title> changes
// (LeetCode updates <title> when navigating)
const titleObserver = new MutationObserver(onUrlChange);
if (document.querySelector("title")) {
  titleObserver.observe(document.querySelector("title"), { childList: true });
}

// Also poll for URL changes (belt + suspenders)
setInterval(onUrlChange, 500);

// Also watch DOM mutations for result text appearing
const bodyObserver = new MutationObserver(() => {
  if (!triggered) checkPage();
});
bodyObserver.observe(document.body, { childList: true, subtree: true });

// Check immediately on load (handles page refresh on submission page)
checkPage();
setTimeout(checkPage, 1000);
setTimeout(checkPage, 2500);

console.log("[Faakk] Loaded on:", location.href);

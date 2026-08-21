"use strict";

const CWS_CONSENT_KEY = "cws_cookie_consent_v1";
const CWS_CONSENT_VERSION = 1;

const DEFAULT_CONSENT = {
  essential: true,
  analytics: false,
  media: false,
  marketing: false,
  version: CWS_CONSENT_VERSION,
  decidedAt: null
};

function loadConsent() {
  try {
    const raw = localStorage.getItem(CWS_CONSENT_KEY);
    if (!raw) return { ...DEFAULT_CONSENT };
    const data = JSON.parse(raw);
    if (!data || data.version !== CWS_CONSENT_VERSION) return { ...DEFAULT_CONSENT };
    return {
      essential: true,
      analytics: data.analytics === true,
      media: data.media === true,
      marketing: data.marketing === true,
      version: CWS_CONSENT_VERSION,
      decidedAt: data.decidedAt || null
    };
  } catch {
    return { ...DEFAULT_CONSENT };
  }
}

let currentConsent = loadConsent();

function saveConsent(next) {
  currentConsent = {
    essential: true,
    analytics: next.analytics === true,
    media: next.media === true,
    marketing: next.marketing === true,
    version: CWS_CONSENT_VERSION,
    decidedAt: new Date().toISOString()
  };

  localStorage.setItem(CWS_CONSENT_KEY, JSON.stringify(currentConsent));

  window.dispatchEvent(new CustomEvent("cws:consent-changed", {
    detail: { ...currentConsent }
  }));

  return { ...currentConsent };
}

function allowed(category) {
  if (category === "essential") return true;
  return currentConsent[String(category || "").toLowerCase()] === true;
}

function pagePath(file) {
  const p = window.location.pathname;
  if (p.includes("/student/")) return `../pages/${file}`;
  if (p.includes("/pages/")) return file;
  return `pages/${file}`;
}

function prefRow(key, title, copy) {
  return `<label class="cws-cookie-category selectable">
    <div><h3>${title}</h3><p>${copy}</p></div>
    <span class="cws-cookie-switch">
      <input type="checkbox" data-cookie-category="${key}">
      <span aria-hidden="true"></span>
    </span>
  </label>`;
}

function createUi() {
  if (document.getElementById("cwsCookieConsent")) return;

  const root = document.createElement("div");
  root.id = "cwsCookieConsent";
  root.className = "cws-cookie-root";
  root.innerHTML = `
    <aside id="cwsCookieBanner" class="cws-cookie-banner" hidden>
      <div class="cws-cookie-banner-icon"><i class="fa-solid fa-shield-halved"></i></div>
      <div class="cws-cookie-banner-copy">
        <span>PRIVACY & COOKIE SETTINGS</span>
        <h2>Your privacy choices matter</h2>
        <p>CWS Academy uses essential browser storage to operate the platform. Optional analytics, embedded media and marketing technologies are used only when you allow them.</p>
        <div class="cws-cookie-policy-links">
          <a href="${pagePath("privacy-policy.html")}">Privacy Policy</a>
          <a href="${pagePath("cookie-policy.html")}">Cookie Policy</a>
        </div>
      </div>
      <div class="cws-cookie-banner-actions">
        <button class="cws-cookie-btn primary" data-cookie-action="accept-all">Accept All</button>
        <button class="cws-cookie-btn secondary" data-cookie-action="essential-only">Essential Only</button>
        <button class="cws-cookie-btn text" data-cookie-action="manage">Manage Cookies</button>
      </div>
    </aside>

    <div id="cwsCookieModal" class="cws-cookie-modal" hidden>
      <div class="cws-cookie-modal-backdrop" data-cookie-action="close"></div>
      <section class="cws-cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cwsCookieDialogTitle">
        <header class="cws-cookie-dialog-header">
          <div><span>CWS ACADEMY PRIVACY</span><h2 id="cwsCookieDialogTitle">Manage Cookie Preferences</h2></div>
          <button class="cws-cookie-close" data-cookie-action="close" aria-label="Close cookie settings"><i class="fa-solid fa-xmark"></i></button>
        </header>

        <div class="cws-cookie-category">
          <div><h3>Essential</h3><p>Required for authentication, security, navigation and remembering your privacy preferences.</p></div>
          <span class="cws-cookie-always-on">Always On</span>
        </div>

        ${prefRow("analytics", "Analytics", "Helps CWS Academy understand page and learning-feature usage so the platform can be improved.")}
        ${prefRow("media", "Embedded Media", "Allows third-party media such as YouTube lesson videos to load inside CWS Academy.")}
        ${prefRow("marketing", "Marketing", "Allows optional advertising, campaign measurement or remarketing technologies if introduced later.")}

        <footer class="cws-cookie-dialog-footer">
          <button class="cws-cookie-btn secondary" data-cookie-action="essential-only">Essential Only</button>
          <button class="cws-cookie-btn primary" data-cookie-action="save">Save Preferences</button>
        </footer>
      </section>
    </div>`;

  document.body.appendChild(root);
  syncControls();
  if (!currentConsent.decidedAt) document.getElementById("cwsCookieBanner").hidden = false;
}

function syncControls() {
  document.querySelectorAll("[data-cookie-category]").forEach(input => {
    input.checked = allowed(input.dataset.cookieCategory);
  });
}

function openSettings() {
  syncControls();
  const modal = document.getElementById("cwsCookieModal");
  if (modal) modal.hidden = false;
  document.body.classList.add("cws-cookie-modal-open");
}

function closeSettings() {
  const modal = document.getElementById("cwsCookieModal");
  if (modal) modal.hidden = true;
  document.body.classList.remove("cws-cookie-modal-open");
}

function applyConsent(choice) {
  saveConsent(choice);
  const banner = document.getElementById("cwsCookieBanner");
  if (banner) banner.hidden = true;
  closeSettings();
  syncControls();
}

document.addEventListener("click", event => {
  const settings = event.target.closest("[data-cws-cookie-settings]");
  if (settings) {
    event.preventDefault();
    openSettings();
    return;
  }

  const control = event.target.closest("[data-cookie-action]");
  if (!control) return;
  const action = control.dataset.cookieAction;

  if (action === "accept-all") applyConsent({ analytics: true, media: true, marketing: true });
  if (action === "essential-only") applyConsent({ analytics: false, media: false, marketing: false });
  if (action === "manage") openSettings();
  if (action === "close") closeSettings();
  if (action === "save") {
    const values = { analytics: false, media: false, marketing: false };
    document.querySelectorAll("[data-cookie-category]").forEach(input => {
      values[input.dataset.cookieCategory] = input.checked === true;
    });
    applyConsent(values);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeSettings();
});

window.CWSConsent = {
  get: () => ({ ...currentConsent }),
  allowed,
  hasDecision: () => Boolean(currentConsent.decidedAt),
  openSettings
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createUi, { once: true });
} else {
  createUi();
}

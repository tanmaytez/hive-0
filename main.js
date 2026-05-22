/* ═══════════════════════════════════════════════════════
   FORAGE MEDIA — main.js
   Sections:
   1. Custom Cursor
   2. Nav: scroll class + hamburger mobile drawer
   3. Parallax hex layers
   4. Counter animations
   5. Scroll reveal (general + hex cells)
   6. Floating hex particles
   7. Form: real-time validation + submission (EmailJS / mailto fallback)
═══════════════════════════════════════════════════════ */

/* ─────────────────────── 1. CUSTOM CURSOR ─────────────────────── */
(function initCursor() {
  const dot = document.getElementById("cur-dot");
  const ring = document.getElementById("cur-ring");
  if (!dot || !ring) return;

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  (function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(trackRing);
  })();

  const hoverTargets =
    "a, button, .hx, .insight-card, .expertise-step, .pillar, .perf-card, select";
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });
})();

/* ─────────────────────── 2. NAV ─────────────────────── */
(function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("navHamburger");
  const drawer = document.getElementById("navDrawer");
  const drawerLinks = drawer ? drawer.querySelectorAll("a, button") : [];

  // Scroll class
  const onScroll = () =>
    nav && nav.classList.toggle("scrolled", window.scrollY > 55);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && drawer) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      drawer.classList.toggle("open", isOpen);
      // Prevent body scroll when drawer open
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on drawer link click
    drawerLinks.forEach((el) => {
      el.addEventListener("click", () => {
        hamburger.classList.remove("open");
        drawer.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    // Close on outside click (escape key)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        hamburger.classList.remove("open");
        drawer.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }
})();

/* ─────────────────────── Smooth scroll helper ─────────────────────── */
function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────── 3. PARALLAX HEX LAYERS ─────────────────────── */
(function initParallax() {
  const l1 = document.getElementById("hlyr1");
  const l2 = document.getElementById("hlyr2");
  const l3 = document.getElementById("hlyr3");
  if (!l1 && !l2 && !l3) return;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY * 0.018;
      if (l1) l1.style.transform = `translateY(${-y * 0.5}px)`;
      if (l2) l2.style.transform = `scale(1.06) translateY(${4 - y}px)`;
      if (l3) l3.style.transform = `scale(1.18) translateY(${8 - y * 1.6}px)`;
    },
    { passive: true },
  );
})();

/* ─────────────────────── 4. COUNTER ANIMATIONS ─────────────────────── */
(function initCounters() {
  function animCount(el, target, suffix, decimals, delay) {
    if (!el) return;
    setTimeout(() => {
      const dur = 1900;
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = ease * target;
        el.textContent = (decimals ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      tick();
    }, delay);
  }

  // Stat nums (hero section, if visible)
  const st1 = document.getElementById("st1");
  const st2 = document.getElementById("st2");
  const st3 = document.getElementById("st3");
  if (st1) animCount(st1, 3.2, "×", 1, 700);
  if (st2) animCount(st2, 180, "+", 0, 850);
  if (st3) animCount(st3, 94, "%", 0, 1000);

  // Fallback for .stat-num class
  const statNums = document.querySelectorAll(".stat-num");
  if (!st1 && statNums[0]) animCount(statNums[0], 3.2, "×", 1, 700);
  if (!st2 && statNums[1]) animCount(statNums[1], 180, "+", 0, 850);
  if (!st3 && statNums[2]) animCount(statNums[2], 94, "%", 0, 1000);
})();

/* ─────────────────────── 5. SCROLL REVEAL ─────────────────────── */
(function initReveal() {
  const revEls = document.querySelectorAll(".reveal");
  const hxEls = document.querySelectorAll(".hx");

  // Apply data-delay as CSS transition-delay for hex cells
  hxEls.forEach((el) => {
    const d = parseFloat(el.dataset.delay || 0);
    el.style.transitionDelay = d + "s";
  });

  const revObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -36px 0px" },
  );

  revEls.forEach((el) => revObs.observe(el));

  const hxObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          hxObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
  );

  hxEls.forEach((el) => hxObs.observe(el));
})();

/* ─────────────────────── 6. FLOATING HEX PARTICLES ─────────────────────── */
(function initParticles() {
  const containers = [
    document.getElementById("hex-bg"),
    document.querySelector(".hex-bg"),
  ];

  containers.forEach((bg) => {
    if (!bg) return;
    // Avoid duplicate injection
    if (bg.dataset.particles) return;
    bg.dataset.particles = "1";

    for (let i = 0; i < 12; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const s = 5 + Math.random() * 11;
      p.style.cssText = [
        `width:${s}px`,
        `height:${s}px`,
        `left:${Math.random() * 55}%`,
        `bottom:${Math.random() * 55}%`,
        `animation-duration:${7 + Math.random() * 9}s`,
        `animation-delay:${-Math.random() * 9}s`,
      ].join(";");
      bg.appendChild(p);
    }
  });
})();

/* ─────────────────────── 7. FORM VALIDATION & SUBMISSION ─────────────────────── */
(function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submit-btn");
  const submitLabel = document.getElementById("submit-label");
  const toast = document.getElementById("formSuccessToast");

  /* ── Validation rules ── */
  const RULES = {
    "f-name": {
      validate: (v) => v.trim().length >= 3,
      msg: "Please enter your full name (at least 3 characters)",
    },
    "f-contact": {
      // Indian mobile: starts with 6, 7, 8, or 9 — exactly 10 digits
      validate: (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s+\-()]/g, "")),
      msg: "Enter a valid Indian mobile number",
    },
    "f-email": {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      msg: "Please enter a valid email address",
    },
    "f-company": {
      validate: (v) => v.trim().length >= 2,
      msg: "Please enter your company name",
    },
    "f-enquiry": {
      validate: (v) => v !== "",
      msg: "Please select a service type",
    },
    // "f-message": {
    //   validate: (v) => v.trim().length >= 20,
    //   msg: "Please tell us a bit more (at least 20 characters)",
    // },
  };

  /* ── Phone input: only allow digits, +, spaces, dashes, parens ── */
  const phoneInput = document.getElementById("f-contact");
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      // Strip anything that isn't a digit, +, space, -, ()
      phoneInput.value = phoneInput.value.replace(/[^0-9+\s\-()\s]/g, "");
    });
    phoneInput.setAttribute("maxlength", "10");
    phoneInput.setAttribute("inputmode", "tel");
  }

  /* ── Helper: show/clear error ── */
  function getErrEl(fieldId) {
    return document.getElementById(fieldId + "-err");
  }

  function setError(fieldId, msg) {
    const input = document.getElementById(fieldId);
    const errEl = getErrEl(fieldId);
    if (!input) return;
    input.classList.remove("valid");
    input.classList.add("invalid");
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add("show");
    }
  }

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const errEl = getErrEl(fieldId);
    if (!input) return;
    input.classList.remove("invalid");
    input.classList.add("valid");
    if (errEl) {
      errEl.classList.remove("show");
    }
  }

  /* ── Real-time validation on blur/input ── */
  Object.keys(RULES).forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    if (!input) return;

    const validateField = () => {
      const val = input.value;
      if (RULES[fieldId].validate(val)) {
        clearError(fieldId);
      } else if (val.trim() !== "") {
        setError(fieldId, RULES[fieldId].msg);
      }
    };

    input.addEventListener("blur", validateField);
    // input.addEventListener("input", validateField);
    input.addEventListener("change", validateField);
  });

  /* ── Full validation before submit ── */
  function validateAll() {
    let valid = true;
    Object.keys(RULES).forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (!input) return;
      if (!RULES[fieldId].validate(input.value)) {
        setError(fieldId, RULES[fieldId].msg);
        valid = false;
      } else {
        clearError(fieldId);
      }
    });
    return valid;
  }

  /* ── Submission handler ── */
  window.handleForm = function (e) {
    e.preventDefault();

    if (!validateAll()) {
      // Scroll to first invalid field
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid)
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Collect data
    const data = {
      name: document.getElementById("f-name")?.value.trim() || "",
      contact: document.getElementById("f-contact")?.value.trim() || "",
      email: document.getElementById("f-email")?.value.trim() || "",
      company: document.getElementById("f-company")?.value.trim() || "",
      enquiry: document.getElementById("f-enquiry")?.value || "",
      message: document.getElementById("f-message")?.value.trim() || "",
    };

    // Disable button, show loading
    if (submitBtn) submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = "Sending…";

    /* ── Send via EmailJS (if loaded) ── */
    if (typeof emailjs !== "undefined") {
      emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
          from_name: data.name,
          from_email: data.email,
          phone: data.contact,
          company: data.company,
          enquiry_type: data.enquiry,
          message: data.message,
          // to_email: "hello@foragemedia.in",
        })
        .then(onSuccess, onError);
    } else {
      /* ── Fallback: mailto composed link ── */
      // Open a mailto link as a side-effect, then show success
      const subject = encodeURIComponent(
        `Enquiry from ${data.name} (${data.company})`,
      );
      const body = encodeURIComponent(
        `Name: ${data.name}\nPhone: ${data.contact}\nEmail: ${data.email}\nCompany: ${data.company}\nService: ${data.enquiry}\n\n${data.message}`,
      );
      // window.location.href = `mailto:hello@foragemedia.in?subject=${subject}&body=${body}`;
      setTimeout(onSuccess, 900);
    }
  };

  function onSuccess() {
    if (submitBtn) submitBtn.disabled = false;
    if (submitLabel) submitLabel.textContent = "Send Message";

    // Show toast
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 8000);
    }

    // Reset & clear states
    form.reset();
    Object.keys(RULES).forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (input) {
        input.classList.remove("valid", "invalid");
      }
      const errEl = getErrEl(fieldId);
      if (errEl) errEl.classList.remove("show");
    });
  }

  function onError(err) {
    console.error("Form submission error:", err);
    if (submitBtn) submitBtn.disabled = false;
    if (submitLabel) submitLabel.textContent = "Send Message";
    alert(
      "Something went wrong. Please email us directly at hello@foragemedia.in",
    );
  }
})();

/* ============================================================
   MAXIMUS CLOSETS — main.js
   Sections: S0 announce dismiss · S1 header state + mobile menu
   · S2 hero slideshow
   Vanilla only. No dependencies.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- S1: Header — transparent over hero, solid on scroll ---------- */
  var header = $("#header");
  var ticking = false;

  function setHeaderState() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("header--solid");
    } else {
      header.classList.remove("header--solid");
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(setHeaderState);
      ticking = true;
    }
  }, { passive: true });
  setHeaderState();

  /* ---------- S1: Mobile menu ---------- */
  var burger = $("#burger");
  var menu = $("#mobileMenu");
  var mobileMenuClose = $("#mobileMenuClose");

  function closeMenu() {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    menu.hidden = true;
    document.body.classList.remove("menu-open");
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Close menu");
        menu.hidden = false;
        document.body.classList.add("menu-open");
      }
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        closeMenu();
        burger.focus();
      }
    });

    if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMenu);
  }

  /* ---------- S2: Hero background slideshow ---------- */
  var slides = $$(".hero__slide");
  var dots = $$(".hero__dot");
  var current = 0;
  var timer = null;
  var INTERVAL = 6500;

  function goTo(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  function startShow() {
    if (reducedMotion || slides.length < 2) return; /* respect user setting */
    timer = window.setInterval(function () { goTo(current + 1); }, INTERVAL);
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      if (timer) window.clearInterval(timer);
      goTo(parseInt(dot.getAttribute("data-slide"), 10));
      startShow();
    });
  });

  if (slides.length) startShow();

  /* ---------- Scroll reveal for sections below the hero ---------- */
  var srEls = $$(".sr");

  function runCounters(scope) {
    $$("[data-count]").forEach(function (el) {
      if (scope && !scope.contains(el)) return;
      if (el.dataset.done) return;
      el.dataset.done = "1";
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (reducedMotion) { el.textContent = target; return; }
      var start = null;
      var DUR = 1200;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / DUR, 1);
        /* ease-out */
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  }

  /* ---------- S5: Services card slider — arrow controls ---------- */
  var svcList = $(".svc-list");
  var svcPrev = $("#svcPrev");
  var svcNext = $("#svcNext");

  function svcScroll(dir) {
    if (!svcList) return;
    var card = svcList.querySelector(".svc-row");
    var step = card ? card.getBoundingClientRect().width + 16 : 320;
    svcList.scrollBy({ left: dir * step, behavior: reducedMotion ? "auto" : "smooth" });
  }

  if (svcPrev && svcNext) {
    svcPrev.addEventListener("click", function () { svcScroll(-1); });
    svcNext.addEventListener("click", function () { svcScroll(1); });
  }

  /* mouse drag-to-swipe on desktop — pointer capture + snap on release */
  if (svcList) {
    var dragActive = false;
    var dragMoved = false;
    var dragStartX = 0;
    var dragStartScroll = 0;

    function cardStep() {
      var c = svcList.querySelector(".svc-row");
      return c ? c.getBoundingClientRect().width + 16 : 320;
    }

    /* after release: glide to the nearest card like native mobile snapping */
    function snapToNearest() {
      var step = cardStep();
      var max = svcList.scrollWidth - svcList.clientWidth;
      var target = Math.max(0, Math.min(max, Math.round(svcList.scrollLeft / step) * step));
      var from = svcList.scrollLeft;
      var delta = target - from;
      if (Math.abs(delta) < 2 || reducedMotion) {
        svcList.scrollLeft = target;
        svcList.classList.remove("is-dragging");
        return;
      }
      var t0 = null;
      var DUR = 300;
      function glide(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / DUR, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        svcList.scrollLeft = from + delta * eased;
        if (p < 1) { window.requestAnimationFrame(glide); }
        else { svcList.classList.remove("is-dragging"); }
      }
      window.requestAnimationFrame(glide);
    }

    svcList.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return; /* touch scrolls natively */
      dragActive = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartScroll = svcList.scrollLeft;
      svcList.classList.add("is-dragging");
      svcList.setPointerCapture(e.pointerId);
      e.preventDefault(); /* stops the browser's native link-drag */
    });
    svcList.addEventListener("pointermove", function (e) {
      if (!dragActive) return;
      var dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 6) dragMoved = true;
      svcList.scrollLeft = dragStartScroll - dx;
    });
    function endDrag() {
      if (!dragActive) return;
      dragActive = false;
      snapToNearest();
    }
    svcList.addEventListener("pointerup", endDrag);
    svcList.addEventListener("pointercancel", endDrag);
    /* a drag must never count as a click on a card link */
    svcList.addEventListener("click", function (e) {
      if (dragMoved) {
        e.preventDefault();
        dragMoved = false;
      }
    }, true);
  }

  /* ---------- S13: Contact form (front-end only until a backend/CRM is wired up) ---------- */
  var contactForm = $("#contactForm");
  var contactSuccess = $("#contactSuccess");

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var valid = true;
      contactForm.querySelectorAll("[required]").forEach(function (el) {
        if (!el.value) {
          el.style.borderColor = "#C0392B";
          valid = false;
        } else {
          el.style.borderColor = "";
        }
      });
      if (!valid) return;

      /* TODO at launch: POST to the real form endpoint / CRM webhook here */
      contactForm.hidden = true;
      contactSuccess.hidden = false;
      contactSuccess.setAttribute("tabindex", "-1");
      contactSuccess.focus();
    });
  }

  /* ---------- S11: Testimonials card slider — same mechanics as S5 ---------- */
  var testiList = $(".testi__list");
  var testiPrev = $("#testiPrev");
  var testiNext = $("#testiNext");

  function testiScroll(dir) {
    if (!testiList) return;
    var card = testiList.querySelector(".testi__card");
    var step = card ? card.getBoundingClientRect().width + 16 : 320;
    testiList.scrollBy({ left: dir * step, behavior: reducedMotion ? "auto" : "smooth" });
  }

  if (testiPrev && testiNext) {
    testiPrev.addEventListener("click", function () { testiScroll(-1); });
    testiNext.addEventListener("click", function () { testiScroll(1); });
  }

  if (testiList) {
    var tDragActive = false;
    var tDragMoved = false;
    var tDragStartX = 0;
    var tDragStartScroll = 0;

    function testiSnapToNearest() {
      var card = testiList.querySelector(".testi__card");
      var step = card ? card.getBoundingClientRect().width + 16 : 320;
      var max = testiList.scrollWidth - testiList.clientWidth;
      var target = Math.max(0, Math.min(max, Math.round(testiList.scrollLeft / step) * step));
      var from = testiList.scrollLeft;
      var delta = target - from;
      if (Math.abs(delta) < 2 || reducedMotion) {
        testiList.scrollLeft = target;
        testiList.classList.remove("is-dragging");
        return;
      }
      var t0 = null;
      var DUR = 300;
      function glide(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / DUR, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        testiList.scrollLeft = from + delta * eased;
        if (p < 1) { window.requestAnimationFrame(glide); }
        else { testiList.classList.remove("is-dragging"); }
      }
      window.requestAnimationFrame(glide);
    }

    testiList.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      tDragActive = true;
      tDragMoved = false;
      tDragStartX = e.clientX;
      tDragStartScroll = testiList.scrollLeft;
      testiList.classList.add("is-dragging");
      testiList.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    testiList.addEventListener("pointermove", function (e) {
      if (!tDragActive) return;
      var dx = e.clientX - tDragStartX;
      if (Math.abs(dx) > 6) tDragMoved = true;
      testiList.scrollLeft = tDragStartScroll - dx;
    });
    function testiEndDrag() {
      if (!tDragActive) return;
      tDragActive = false;
      testiSnapToNearest();
    }
    testiList.addEventListener("pointerup", testiEndDrag);
    testiList.addEventListener("pointercancel", testiEndDrag);
    testiList.addEventListener("click", function (e) {
      if (tDragMoved) {
        e.preventDefault();
        tDragMoved = false;
      }
    }, true);
  }

  /* ---------- S6: Before/After drag slider ---------- */
  var baFrame = $("#baFrame");
  var baHandle = $("#baHandle");
  var baBeforeWrap = $("#baBeforeWrap");
  var baHint = $("#baHint");
  var baAfterImg = $("#baAfterImg");
  var baBeforeImg = $("#baBeforeImg");
  var baCount = $("#baCount");
  var baProjTitle = $("#baProjTitle");
  var baProjNav = $("#baProjNav");
  var baPrev = $("#baPrev");
  var baNext = $("#baNext");

  /* The projects shown in the slider. To add a third, add one more object
     below and drop its two photos in images/ — the counter, prev/next
     arrows, and title update themselves automatically. w/h must be the
     real pixel size of the photos (prevents layout shift). */
  var baProjects = [
    {
      title: "Custom Wardrobe Design",
      before: "images/BEFORE1.png", beforeAlt: "Bedroom before Maximus Closets wardrobe installation",
      after: "images/AFTER1.png", afterAlt: "Custom built-in wardrobe by Maximus Closets",
      w: 1920, h: 1106
    },
    {
      title: "Murphy Bed & Home Office",
      before: "images/BEFORE2.png", beforeAlt: "Home office before Maximus Closets redesign",
      after: "images/AFTER2.png", afterAlt: "Custom Murphy bed and home office by Maximus Closets",
      w: 1920, h: 1106
    }
  ];
  var baIndex = 0;

  var baTagBefore = $(".ba__tag--before");
  var baTagAfter = $(".ba__tag--after");

  if (baFrame && baHandle && baBeforeWrap) {
    var baDragging = false;

    var setPos = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      baFrame.style.setProperty("--pos", pct + "%");
      baHandle.setAttribute("aria-valuenow", Math.round(pct));
      /* only one tag shows at a time — whichever side currently dominates */
      if (baTagBefore && baTagAfter) {
        baTagBefore.classList.toggle("is-shown", pct >= 50);
        baTagAfter.classList.toggle("is-shown", pct < 50);
      }
    };

    var pctFromEvent = function (e) {
      var rect = baFrame.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    };

    var hideHint = function () {
      if (baHint) baHint.classList.add("is-hidden");
    };

    baFrame.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".ba__projnav")) return; /* let the nav buttons receive their own click */
      baDragging = true;
      baFrame.setPointerCapture(e.pointerId);
      setPos(pctFromEvent(e));
      hideHint();
    });
    baFrame.addEventListener("pointermove", function (e) {
      if (!baDragging) return;
      setPos(pctFromEvent(e));
    });
    ["pointerup", "pointercancel"].forEach(function (evt) {
      baFrame.addEventListener(evt, function () { baDragging = false; });
    });

    /* keyboard access on the handle itself */
    baHandle.addEventListener("keydown", function (e) {
      var current = parseFloat(baHandle.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") { setPos(current - 4); hideHint(); e.preventDefault(); }
      else if (e.key === "ArrowRight") { setPos(current + 4); hideHint(); e.preventDefault(); }
      else if (e.key === "Home") { setPos(0); hideHint(); e.preventDefault(); }
      else if (e.key === "End") { setPos(100); hideHint(); e.preventDefault(); }
    });

    /* render whichever project is active: swap photos, counter, title */
    var renderProject = function (i) {
      var p = baProjects[i];
      if (baBeforeImg) {
        baBeforeImg.src = p.before;
        baBeforeImg.width = p.w;
        baBeforeImg.height = p.h;
        baBeforeImg.alt = p.beforeAlt;
      }
      if (baAfterImg) {
        baAfterImg.src = p.after;
        baAfterImg.width = p.w;
        baAfterImg.height = p.h;
        baAfterImg.alt = p.afterAlt;
      }
      if (baCount) baCount.textContent = (i + 1) + " / " + baProjects.length;
      if (baProjTitle) baProjTitle.textContent = p.title;
      setPos(50);
      hideHint();
    };

    if (baProjNav) {
      if (baProjects.length < 2) {
        baProjNav.style.display = "none"; /* nothing to page through yet */
      } else {
        if (baPrev) baPrev.addEventListener("click", function () {
          baIndex = (baIndex - 1 + baProjects.length) % baProjects.length;
          renderProject(baIndex);
        });
        if (baNext) baNext.addEventListener("click", function () {
          baIndex = (baIndex + 1) % baProjects.length;
          renderProject(baIndex);
        });
      }
    }

    renderProject(0); /* keeps the DOM in sync with the array on load */
  }

  /* ---------- S8: Process tab strip ---------- */
  var processTabs = $$(".process__tab");
  var processIndicator = $("#processIndicator");
  var processPanel = $("#processPanel");
  var processPanelTitle = $("#processPanelTitle");
  var processPanelText = $("#processPanelText");

  var processSteps = [
    { title: "Book a Consultation", text: "We visit your home, talk through your goals, and take precise measurements of your space." },
    { title: "Approve the 3D Design", text: "See your exact closet in photorealistic 3D before anything is built — adjust it until it’s right." },
    { title: "We Build It Locally", text: "Our own craftsmen cut, finish, and prepare every panel using premium materials — never outsourced." },
    { title: "Professional Installation", text: "Our own installation team fits everything precisely in your home, in weeks, not months." }
  ];

  if (processTabs.length && processIndicator && processPanel) {
    processTabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        processTabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        processIndicator.style.transform = "translateX(" + (i * 100) + "%)";

        var step = processSteps[i];
        var swap = function () {
          if (processPanelTitle) processPanelTitle.textContent = step.title;
          if (processPanelText) processPanelText.textContent = step.text;
          processPanel.classList.remove("is-fading");
        };
        if (reducedMotion) {
          swap();
        } else {
          processPanel.classList.add("is-fading");
          window.setTimeout(swap, 180);
        }
      });
    });
  }

  /* ---------- S10: Gallery — lightbox ---------- */
  var galleryGrid = $("#galleryGrid");
  var galleryItems = galleryGrid ? $$(".gallery__item") : [];

  var lightbox = $("#lightbox");
  var lightboxImg = $("#lightboxImg");
  var lightboxCount = $("#lightboxCount");
  var lightboxClose = $("#lightboxClose");
  var lightboxPrev = $("#lightboxPrev");
  var lightboxNext = $("#lightboxNext");

  if (lightbox && lightboxImg && galleryItems.length) {
    var lbIndex = 0;

    var openLightbox = function (index) {
      lbIndex = (index + galleryItems.length) % galleryItems.length;
      var img = galleryItems[lbIndex].querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCount) lightboxCount.textContent = (lbIndex + 1) + " / " + galleryItems.length;
      lightbox.hidden = false;
      document.body.classList.add("menu-open"); /* reuses the existing scroll-lock rule */
    };

    var closeLightbox = function () {
      lightbox.hidden = true;
      document.body.classList.remove("menu-open");
    };

    galleryItems.forEach(function (item, i) {
      item.addEventListener("click", function () { openLightbox(i); });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", function () { openLightbox(lbIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener("click", function () { openLightbox(lbIndex + 1); });

    /* click the dark backdrop (not the image itself) to close */
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
      else if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
    });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          runCounters(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    srEls.forEach(function (el) { io.observe(el); });
  } else {
    srEls.forEach(function (el) { el.classList.add("in-view"); });
    runCounters(null);
  }
})();

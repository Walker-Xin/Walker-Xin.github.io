(function () {
  "use strict";

  function isSameOrigin(url) {
    return url.origin === window.location.origin;
  }

  function isNavigationEligible(link, url) {
    if (!link || !url) {
      return false;
    }

    if (link.target && link.target.toLowerCase() !== "_self") {
      return false;
    }

    if (link.hasAttribute("download") || link.hasAttribute("data-no-persist-nav")) {
      return false;
    }

    if (!isSameOrigin(url)) {
      return false;
    }

    var protocol = url.protocol;
    if (protocol !== "http:" && protocol !== "https:") {
      return false;
    }

    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
      return false;
    }

    return true;
  }

  function getSwappableMainChildren(mainElement) {
    return Array.prototype.filter.call(mainElement.children, function (child) {
      return !child.classList.contains("sidebar");
    });
  }

  function replaceMainContent(nextDocument) {
    var currentMain = document.querySelector("#main");
    var nextMain = nextDocument.querySelector("#main");

    if (!currentMain || !nextMain) {
      return false;
    }

    var currentSwappable = getSwappableMainChildren(currentMain);
    var nextSwappable = getSwappableMainChildren(nextMain);

    currentSwappable.forEach(function (node) {
      node.remove();
    });

    nextSwappable.forEach(function (node) {
      currentMain.appendChild(node.cloneNode(true));
    });

    return true;
  }

  function normalizePath(pathname) {
    var path = (pathname || "/").replace(/index\.html$/i, "");

    if (path.length > 1 && path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }

    return path || "/";
  }

  function updateMastheadActiveState() {
    var nav = document.querySelector("#site-nav");
    if (!nav) {
      return;
    }

    var menuItems = Array.prototype.slice.call(nav.querySelectorAll(".masthead__menu-item"));
    var links = menuItems
      .map(function (item) {
        return {
          item: item,
          link: item.querySelector("a[href]")
        };
      })
      .filter(function (entry) {
        return !!entry.link;
      });

    links.forEach(function (entry) {
      entry.item.classList.remove("masthead__menu-item--active");
      entry.link.removeAttribute("aria-current");
    });

    var currentPath = normalizePath(window.location.pathname);
    var bestMatch = null;
    var bestScore = -1;

    links.forEach(function (entry) {
      var targetUrl;
      try {
        targetUrl = new URL(entry.link.getAttribute("href"), window.location.href);
      } catch (error) {
        return;
      }

      if (targetUrl.origin !== window.location.origin) {
        return;
      }

      var targetPath = normalizePath(targetUrl.pathname);
      var isActive = false;

      if (targetPath === "/") {
        isActive = currentPath === "/";
      } else {
        isActive = currentPath === targetPath || currentPath.indexOf(targetPath + "/") === 0;
      }

      if (!isActive) {
        return;
      }

      var score = targetPath.length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    if (bestMatch) {
      bestMatch.item.classList.add("masthead__menu-item--active");
      bestMatch.link.setAttribute("aria-current", "page");
    }
  }

  function refreshDynamicEnhancements() {
    if (typeof window.normalizeLinkTargets === "function") {
      window.normalizeLinkTargets();
    }

    updateMastheadActiveState();

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.smoothScroll) {
      window.jQuery("a").smoothScroll({ offset: -65 });
    }

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.magnificPopup) {
      window.jQuery("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']")
        .addClass("image-popup")
        .magnificPopup({
          type: "image",
          tLoading: "Loading image #%curr%...",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
          },
          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
          },
          removalDelay: 500,
          mainClass: "mfp-zoom-in"
        });
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function parseDocument(htmlText) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlText, "text/html");
  }

  function navigate(url, pushToHistory) {
    return fetch(url.toString(), {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Navigation request failed");
        }
        return response.text();
      })
      .then(function (htmlText) {
        var nextDocument = parseDocument(htmlText);
        var didReplace = replaceMainContent(nextDocument);

        if (!didReplace) {
          window.location.href = url.toString();
          return;
        }

        document.title = nextDocument.title || document.title;

        if (pushToHistory) {
          window.history.pushState({ url: url.toString() }, "", url.toString());
        }

        refreshDynamicEnhancements();
      })
      .catch(function () {
        window.location.href = url.toString();
      });
  }

  function onDocumentClick(event) {
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    var link = event.target.closest("a[href]");
    if (!link) {
      return;
    }

    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.toLowerCase().indexOf("javascript:") === 0) {
      return;
    }

    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    if (!isNavigationEligible(link, url)) {
      return;
    }

    event.preventDefault();
    navigate(url, true);
  }

  function onPopState() {
    navigate(new URL(window.location.href), false);
  }

  document.addEventListener("click", onDocumentClick);
  window.addEventListener("popstate", onPopState);
  updateMastheadActiveState();
})();

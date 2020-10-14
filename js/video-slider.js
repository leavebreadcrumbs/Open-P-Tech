function isMobileBreakpoint() {
    return !window.matchMedia("(min-width: 767px)").matches
}

function isElementInViewport(e, t) {
    t = "number" == typeof t ? t : 0;
    var n = e.getBoundingClientRect(),
        i = window.innerHeight || document.documentElement.clientHeight,
        o = window.innerWidth || document.documentElement.clientWidth,
        r = n.top + t <= i && n.top + n.height >= 0 + t,
        a = n.left <= o && 0 <= n.left + n.width;
    return r && a
}

function safeFactory(i, m, c) {
    var v, h;
    if (function() {
            var e, t = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            for (e in h = i.lazySizesConfig || i.lazysizesConfig || {}, t) e in h || (h[e] = t[e])
        }(), !m || !m.getElementsByClassName) return {
        init: function() {},
        cfg: h,
        noSupport: !0
    };
    var n, o, t, r, a, s, e, g, y, u, w, l, p, E, b, L, _, A, S, d, f, C, z, q, k, x, T, $, N, M, D, I, B, W, F, R, P, H, V, O, X, j, U, Y, Q, G = m.documentElement,
        J = i.HTMLPictureElement,
        K = "addEventListener",
        Z = "getAttribute",
        ee = i[K].bind(i),
        te = i.setTimeout,
        ne = i.requestAnimationFrame || te,
        ie = i.requestIdleCallback,
        oe = /^picture$/i,
        re = ["load", "error", "lazyincluded", "_lazyloaded"],
        ae = {},
        ce = Array.prototype.forEach,
        se = function(e, t) {
            return ae[t] || (ae[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), ae[t].test(e[Z]("class") || "") && ae[t]
        },
        le = function(e, t) {
            se(e, t) || e.setAttribute("class", (e[Z]("class") || "").trim() + " " + t)
        },
        de = function(e, t) {
            var n;
            (n = se(e, t)) && e.setAttribute("class", (e[Z]("class") || "").replace(n, " "))
        },
        ue = function(t, n, e) {
            var i = e ? K : "removeEventListener";
            e && ue(t, n), re.forEach(function(e) {
                t[i](e, n)
            })
        },
        fe = function(e, t, n, i, o) {
            var r = m.createEvent("Event");
            return n || (n = {}), n.instance = v, r.initEvent(t, !i, !o), r.detail = n, e.dispatchEvent(r), r
        },
        me = function(e, t) {
            var n;
            !J && (n = i.picturefill || h.pf) ? (t && t.src && !e[Z]("srcset") && e.setAttribute("srcset", t.src), n({
                reevaluate: !0,
                elements: [e]
            })) : t && t.src && (e.src = t.src)
        },
        ve = function(e, t) {
            return (getComputedStyle(e, null) || {})[t]
        },
        he = function(e, t, n) {
            for (n = n || e.offsetWidth; n < h.minSize && t && !e._lazysizesWidth;) n = t.offsetWidth, t = t.parentNode;
            return n
        },
        ge = (r = [], a = t = [], s = function() {
            var e = a;
            for (a = t.length ? r : t, o = !(n = !0); e.length;) e.shift()();
            n = !1
        }, (e = function(e, t) {
            n && !t ? e.apply(this, arguments) : (a.push(e), o || (o = !0, (m.hidden ? te : ne)(s)))
        })._lsFlush = s, e),
        ye = function(n, e) {
            return e ? function() {
                ge(n)
            } : function() {
                var e = this,
                    t = arguments;
                ge(function() {
                    n.apply(e, t)
                })
            }
        },
        we = function(e) {
            var n, i = 0,
                o = h.throttleDelay,
                r = h.ricTimeout,
                t = function() {
                    n = !1, i = c.now(), e()
                },
                a = ie && 49 < r ? function() {
                    ie(t, {
                        timeout: r
                    }), r !== h.ricTimeout && (r = h.ricTimeout)
                } : ye(function() {
                    te(t)
                }, !0);
            return function(e) {
                var t;
                (e = !0 === e) && (r = 33), n || (n = !0, (t = o - (c.now() - i)) < 0 && (t = 0), e || t < 9 ? a() : te(a, t))
            }
        },
        pe = function(e) {
            var t, n, i = 99,
                o = function() {
                    t = null, e()
                },
                r = function() {
                    var e = c.now() - n;
                    e < i ? te(r, i - e) : (ie || o)(o)
                };
            return function() {
                n = c.now(), t || (t = te(r, i))
            }
        },
        Ee = (d = /^img$/i, f = /^iframe$/i, C = "onscroll" in i && !/(gle|ing)bot/.test(navigator.userAgent), k = q = z = 0, x = -1, T = function(e) {
            k--, (!e || k < 0 || !e.target) && (k = 0)
        }, $ = function(e) {
            return null == S && (S = "hidden" == ve(m.body, "visibility")), S || !("hidden" == ve(e.parentNode, "visibility") && "hidden" == ve(e, "visibility"))
        }, N = function(e, t) {
            var n, i = e,
                o = $(e);
            for (b -= t, A += t, L -= t, _ += t; o && (i = i.offsetParent) && i != m.body && i != G;)(o = 0 < (ve(i, "opacity") || 1)) && "visible" != ve(i, "overflow") && (n = i.getBoundingClientRect(), o = _ > n.left && L < n.right && A > n.top - 1 && b < n.bottom + 1);
            return o
        }, D = we(M = function() {
            var e, t, n, i, o, r, a, c, s, l, d, u, f = v.elements;
            if ((w = h.loadMode) && k < 8 && (e = f.length)) {
                for (t = 0, x++; t < e; t++)
                    if (f[t] && !f[t]._lazyRace)
                        if (!C || v.prematureUnveil && v.prematureUnveil(f[t])) H(f[t]);
                        else if ((c = f[t][Z]("data-expand")) && (r = 1 * c) || (r = q), l || (l = !h.expand || h.expand < 1 ? 500 < G.clientHeight && 500 < G.clientWidth ? 500 : 370 : h.expand, d = (v._defEx = l) * h.expFactor, u = h.hFac, S = null, q < d && k < 1 && 2 < x && 2 < w && !m.hidden ? (q = d, x = 0) : q = 1 < w && 1 < x && k < 6 ? l : z), s !== r && (p = innerWidth + r * u, E = innerHeight + r, a = -1 * r, s = r), n = f[t].getBoundingClientRect(), (A = n.bottom) >= a && (b = n.top) <= E && (_ = n.right) >= a * u && (L = n.left) <= p && (A || _ || L || b) && (h.loadHidden || $(f[t])) && (y && k < 3 && !c && (w < 3 || x < 4) || N(f[t], r))) {
                    if (H(f[t]), o = !0, 9 < k) break
                } else !o && y && !i && k < 4 && x < 4 && 2 < w && (g[0] || h.preloadAfterLoad) && (g[0] || !c && (A || _ || L || b || "auto" != f[t][Z](h.sizesAttr))) && (i = g[0] || f[t]);
                i && !o && H(i)
            }
        }), B = ye(I = function(e) {
            var t = e.target;
            t._lazyCache ? delete t._lazyCache : (T(e), le(t, h.loadedClass), de(t, h.loadingClass), ue(t, W), fe(t, "lazyloaded"))
        }), W = function(e) {
            B({
                target: e.target
            })
        }, F = function(e, t) {
            try {
                e.contentWindow.location.replace(t)
            } catch (n) {
                e.src = t
            }
        }, R = function(e) {
            var t, n = e[Z](h.srcsetAttr);
            (t = h.customMedia[e[Z]("data-media") || e[Z]("media")]) && e.setAttribute("media", t), n && e.setAttribute("srcset", n)
        }, P = ye(function(t, e, n, i, o) {
            var r, a, c, s, l, d;
            (l = fe(t, "lazybeforeunveil", e)).defaultPrevented || (i && (n ? le(t, h.autosizesClass) : t.setAttribute("sizes", i)), a = t[Z](h.srcsetAttr), r = t[Z](h.srcAttr), o && (s = (c = t.parentNode) && oe.test(c.nodeName || "")), d = e.firesLoad || "src" in t && (a || r || s), l = {
                target: t
            }, le(t, h.loadingClass), d && (clearTimeout(u), u = te(T, 2500), ue(t, W, !0)), s && ce.call(c.getElementsByTagName("source"), R), a ? t.setAttribute("srcset", a) : r && !s && (f.test(t.nodeName) ? F(t, r) : t.src = r), o && (a || s) && me(t, {
                src: r
            })), t._lazyRace && delete t._lazyRace, de(t, h.lazyClass), ge(function() {
                var e = t.complete && 1 < t.naturalWidth;
                d && !e || (e && le(t, "ls-is-cached"), I(l), t._lazyCache = !0, te(function() {
                    "_lazyCache" in t && delete t._lazyCache
                }, 9)), "lazy" == t.loading && k--
            }, !0)
        }), H = function(e) {
            if (!e._lazyRace) {
                var t, n = d.test(e.nodeName),
                    i = n && (e[Z](h.sizesAttr) || e[Z]("sizes")),
                    o = "auto" == i;
                (!o && y || !n || !e[Z]("src") && !e.srcset || e.complete || se(e, h.errorClass) || !se(e, h.lazyClass)) && (t = fe(e, "lazyunveilread").detail, o && be.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, k++, P(e, t, o, i, n))
            }
        }, V = pe(function() {
            h.loadMode = 3, D()
        }), X = function() {
            y || (c.now() - l < 999 ? te(X, 999) : (y = !0, h.loadMode = 3, D(), ee("scroll", O, !0)))
        }, {
            _: function() {
                l = c.now(), v.elements = m.getElementsByClassName(h.lazyClass), g = m.getElementsByClassName(h.lazyClass + " " + h.preloadClass), ee("scroll", D, !0), ee("resize", D, !0), ee("pageshow", function(e) {
                    if (e.persisted) {
                        var t = m.querySelectorAll("." + h.loadingClass);
                        t.length && t.forEach && ne(function() {
                            t.forEach(function(e) {
                                e.complete && H(e)
                            })
                        })
                    }
                }), i.MutationObserver ? new MutationObserver(D).observe(G, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0
                }) : (G[K]("DOMNodeInserted", D, !0), G[K]("DOMAttrModified", D, !0), setInterval(D, 999)), ee("hashchange", D, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                    m[K](e, D, !0)
                }), /d$|^c/.test(m.readyState) ? X() : (ee("load", X), m[K]("DOMContentLoaded", D), te(X, 2e4)), v.elements.length ? (M(), ge._lsFlush()) : D()
            },
            checkElems: D,
            unveil: H,
            _aLSL: O = function() {
                3 == h.loadMode && (h.loadMode = 2), V()
            }
        }),
        be = (U = ye(function(e, t, n, i) {
            var o, r, a;
            if (e._lazysizesWidth = i, i += "px", e.setAttribute("sizes", i), oe.test(t.nodeName || ""))
                for (r = 0, a = (o = t.getElementsByTagName("source")).length; r < a; r++) o[r].setAttribute("sizes", i);
            n.detail.dataAttr || me(e, n.detail)
        }), Y = function(e, t, n) {
            var i, o = e.parentNode;
            o && (n = he(e, o, n), (i = fe(e, "lazybeforesizes", {
                width: n,
                dataAttr: !!t
            })).defaultPrevented || (n = i.detail.width) && n !== e._lazysizesWidth && U(e, o, i, n))
        }, {
            _: function() {
                j = m.getElementsByClassName(h.autosizesClass), ee("resize", Q)
            },
            checkElems: Q = pe(function() {
                var e, t = j.length;
                if (t)
                    for (e = 0; e < t; e++) Y(j[e])
            }),
            updateElem: Y
        }),
        Le = function() {
            !Le.i && m.getElementsByClassName && (Le.i = !0, be._(), Ee._())
        };
    return te(function() {
        h.init && Le()
    }), v = {
        cfg: h,
        autoSizer: be,
        loader: Ee,
        init: Le,
        uP: me,
        aC: le,
        rC: de,
        hC: se,
        fire: fe,
        gW: he,
        rAF: ge
    }
}

$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e) {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash);
            (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length && (e.preventDefault(), $("html, body").animate({
                scrollTop: t.offset().top - 90
            }, 600, function() {
                var e = $(t);
                if (e.focus(), e.is(":focus")) return !1;
                e.attr("tabindex", "-1"), e.focus()
            }))
        }
    },
    /*!
     * jQuery throttle / debounce - v1.1 - 3/7/2010
     * http://benalman.com/projects/jquery-throttle-debounce-plugin/
     * 
     * Copyright (c) 2010 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */
    function(e, u) {
        var i, t = e.jQuery || e.Cowboy || (e.Cowboy = {});
        t.throttle = i = function(r, a, c, s) {
            function e() {
                function e() {
                    d = +new Date, c.apply(n, o)
                }

                function t() {
                    l = u
                }
                var n = this,
                    i = +new Date - d,
                    o = arguments;
                s && !l && e(), l && clearTimeout(l), s === u && r < i ? e() : !0 !== a && (l = setTimeout(s ? t : e, s === u ? r - i : r))
            }
            var l, d = 0;
            return "boolean" != typeof a && (s = c, c = a, a = u), t.guid && (e.guid = c.guid = c.guid || t.guid++), e
        }, t.debounce = function(e, t, n) {
            return n === u ? i(e, t, !1) : i(e, n, !1 !== t)
        }
    }(this),
    function() {
        function e() {
            t.forEach(function(e) {
                var t = e.getAttribute("on-enter");
                isElementInViewport(e, 100) && (e.classList.contains(t) || setTimeout(function() {
                    e.classList.add(t)
                }, e.getAttribute("animate-delay") || 0))
            })
        }
        var t = document.querySelectorAll(".animate-on-enter");
        window.addEventListener("scroll", function() {
            e()
        }), e()
    }());
/*! lazysizes - v5.2.0 */
var safeWindow = "undefined" != typeof window ? window : {};
! function(e) {
    var t = safeFactory(e, e.document, Date);
    e.lazySizes = t, "object" == typeof module && module.exports && (module.exports = t)
}(safeWindow), $("[accordion-target]").on("click", function() {
        var e = $(this).attr("accordion-target"),
            t = $("#" + e);
        t && (t.toggleClass("active"), $(this).toggleClass("active"))
    }),
    function() {
        var e = $(".architecture-switcher__btn"),
            t = $(".architecture-switcher__image"),
            n = $(".architecture-switcher__image__btn");
        e.on("click", function() {
            e.toggleClass("active"), t.toggleClass("active"), e.hasClass("active") ? e.text("Yikes! Take me back") : e.text("See life without Panoply")
        }), n.on("click", function() {
            $(this).toggleClass("active")
        })
    }(),
    function() {
        function t(e) {
            var t = $(a[e]),
                n = t.find(".testimonial-slider__content__image img").attr("src");
            t ? (d = l.clone().addClass("entering").insertBefore(l).css("background-image", "url(" + n + ")"), r(s, function() {
                i(), o(t)
            })) : console.log("No slide #" + e)
        }

        function n() {
            window.clearTimeout(f), window.clearTimeout(m), window.clearTimeout(e), d && l !== d && (l.removeClass("exiting").addClass("entering"), d.remove()), console.log(l)
        }

        function i() {
            l.addClass("exiting"), e = window.setTimeout(function() {
                l.remove(), l = d
            }, u)
        }

        function o(e, t) {
            e.removeClass("exiting exited"), e.addClass("entering"), f = window.setTimeout(function() {
                e.addClass("entered"), t && t()
            }, u), s = e
        }

        function r(e, t) {
            e.removeClass("entering entered"), e.addClass("exiting"), m = window.setTimeout(function() {
                e.addClass("exited"), t && t()
            }, u)
        }
        var a = $(".testimonial-slider__content"),
            c = $(".testimonial-slider__switcher"),
            s = $(".testimonial-slider__content.entered"),
            l = $(".testimonial-slider__bg"),
            d = null,
            u = 300,
            f = null,
            m = null,
            e = null;
        c.on("click", function() {
            var e = $(this).data("slide");
            c.removeClass("active"), $(this).addClass("active"), n(), t(e)
        })
    }(), $(document).ready(function() {
        function e() {
            var e = new Date(r.attr("data-show-from")),
                t = new Date(r.attr("data-show-until")),
                n = new Date(Date.now());
            try {
                var i = localStorage.getItem("panoply-notification-bar-url");
                return console.log("from: " + e, "until: " + t, "now: " + n), e < n && n < t && i !== a
            } catch (o) {
                return e < n && n < t
            }
        }

        function t() {
            r.slideUp("fast");
            try {
                localStorage.setItem("panoply-notification-bar-url", a)
            } catch (e) {
                console.log("Could not set notification-bar state in localStorage")
            }
        }
        var r = $("#notification-bar"),
            n = $("#hide-notification-bar"),
            a = $("#notification-bar").find(".notification-bar__link").attr("href");
        r.length && (e() && r.slideDown("fast"), n.on("click", t))
    }),
    function() {
        var e = document.querySelector("#how-it-works-1"),
            t = document.querySelector("#how-it-works-2"),
            n = document.querySelector("#how-it-works-3");
        e && e.addEventListener("load", function() {
            window.addEventListener("scroll", function() {
                isElementInViewport(e, window.innerHeight / 3) && (console.log("IN"), e.contentDocument.querySelector("svg").classList.add("active"))
            }), isElementInViewport(e) && e.contentDocument.querySelector("svg").classList.add("active")
        }, !1), t && t.addEventListener("load", function() {
            window.addEventListener("scroll", function() {
                isElementInViewport(t, window.innerHeight / 2) && (console.log("IN 2"), t.contentDocument.querySelector("svg").classList.add("active"))
            }), isElementInViewport(t) && t.contentDocument.querySelector("svg").classList.add("active")
        }, !1), n && n.addEventListener("load", function() {
            window.addEventListener("scroll", function() {
                isElementInViewport(n, window.innerHeight / 2) && (console.log("IN 3"), n.contentDocument.querySelector("svg").classList.add("active"))
            }), isElementInViewport(n) && n.contentDocument.querySelector("svg").classList.add("active")
        }, !1)
    }(),
    function() {
        function e() {
            window.video = s, window.addEventListener("scroll", function() {
                isElementInViewport(c) ? !a() && 3 < s.readyState && (console.log("Playing video"), s.play()) : a() && (console.log("Pausing video"), s.pause())
            }), l.forEach(function(e) {
                e.addEventListener("click", t)
            }), s.oncanplay = function() {
                console.log("Video can play"), s.play()
            }, s.onended = function() {
                var e = [].slice.call(l),
                    t = e.indexOf(d);
                n(t + 1 < e.length ? l[t + 1] : l[0])
            }, r()
        }

        function t(e) {
            n(e.currentTarget)
        }

        function n(e) {
            var t = e.getAttribute("webm-video"),
                n = e.getAttribute("mp4-video");
            d = e, u.style.width = "0%", u = e.querySelector(".video-slides__card__indicator__fill"), o(e), i(t, n)
        }

        function i(e, t) {
            a() && s.pause();
            var n = '<source id="video-slides-webm-src" src="' + e + '" type="video/webm">',
                i = '<source id="video-slides-mp4-src" src="' + t + '" type="video/mp4">';
            $(s).html(i + " " + n), s.load()
        }

        function o(e) {
            var t = e.getAttribute("video-title");
            f.innerHTML = t, l.forEach(function(e) {
                e.classList.remove("active")
            }), e.classList.add("active")
        }

        function r() {
            window.setInterval(function() {
                var e = (s.currentTime / s.duration * 100).toFixed(5);
                u.style.width = e + "%"
            }, 200)
        }

        function a() {
            return !!(0 < s.currentTime && !s.paused && !s.ended && 2 < s.readyState)
        }
        var c = document.querySelector("#video-slides-container"),
            s = document.querySelector("#video-slides-player"),
            l = document.querySelectorAll(".video-slides__card"),
            d = l[0],
            u = d && d.querySelector(".video-slides__card__indicator__fill"),
            f = document.querySelector("#video-overlay-label");
        c && s && d && u && e()
    }(), 
    function() {
        function n(e) {
            var t = e.currentTarget.closest(".modal.active");
            t.classList.remove("active"), i(t)
        }

        function i(e) {
            var t = e.querySelector("iframe"),
                n = t.src;
            t.src = "", t.src = n
        }
        window.attachModalTriggers = function() {
            var e = document.querySelectorAll(".modal-trigger"),
                t = document.querySelectorAll(".modal__body__close, .modal-close");
            e.forEach(function(t) {
                t.addEventListener("click", function() {
                    var e = t.getAttribute("target-modal") || t.getAttribute("data-target-modal");
                    document.querySelector("#" + e).classList.add("active")
                })
            }), t.forEach(function(e) {
                e.addEventListener("click", n)
            })
        }, document.addEventListener("click", function(e) {
            if (e.target.classList.contains("modal__overlay")) {
                var t = e.target.closest(".modal.active");
                t.classList.remove("active"), i(t)
            }
        }, !1), window.attachModalTriggers()
    }(),
    function() {
        function n(e, t) {
            t.classList.add("active"), t.focus(), e.stopPropagation()
        }

        function i() {
            e.forEach(function(e) {
                e.classList.remove("active"), e.blur()
            })
        }
        var e = document.querySelectorAll(".dropdown");
        e.forEach(function(t) {
            t.addEventListener("click", function(e) {
                t.classList.contains("active") ? i() : (i(), n(e, t)), e.stopPropagation()
            })
        }), document.body.addEventListener("click", i)
    }(),
    function() {
        function n() {
            if (w) return window.requestAnimationFrame(n);
            document.querySelectorAll(".scrolling-testimonials__card");
            v.style.transform || (v.style.transform = "translateX(0px)"), i();
            var e = v.style.transform.replace(")", "").split("(")[1].replace("px", ""),
                t = Number(e) - 1;
            v.style.transition = "none", v.style.transform = "translateX(" + t + "px)", window.requestAnimationFrame(n)
        }

        function e(e, t) {
            for (var n = t[0], i = 0, o = Math.abs(e - n), r = 0; r < t.length; r++) {
                var a = Math.abs(e - t[r]);
                a < o && (o = a, n = t[r], i = r)
            }
            return i
        }

        function i() {
            E.getBoundingClientRect().left <= L && (v.style.transition = "none", v.style.transform = "translateX(0px)")
        }

        function o() {
            return e(0, Array.from(h).map(function(e) {
                return e.getBoundingClientRect().left
            }))
        }

        function r() {
            v.style.transition = "none", v.style.transform = "translateX(0px)"
        }

        function t() {
            v.style.transition = "none", v.style.transform = "translateX(-1660px)"
        }

        function a() {
            var e = o(),
                t = e > h.length / 2 - 1 ? e - h.length - 1 : e;
            return e !== t && r(), h[t + 1] ? h[t + 1] : h[1]
        }

        function c() {
            var e = o();
            return 0 == e ? (t(), h[h.length / 2 - 1]) : h[e - 1]
        }

        function s(e) {
            window.setTimeout(function() {
                $(v).css({
                    transition: "transform 0.5s",
                    transform: "translateX(-" + (e.offsetLeft - 37) + "px)"
                })
            }, 0), p = !0, window.setTimeout(function() {
                p = !1
            }, 500)
        }

        function l() {
            p || s(a())
        }

        function d() {
            p || s(c())
        }

        function u() {
            w = !0, m.classList.add("active")
        }

        function f() {
            w = !1, m.classList.remove("active")
        }
        var m = document.querySelector(".scrolling-testimonials__container"),
            v = document.querySelector("#scrolling-testimonials-scroller"),
            h = document.querySelectorAll(".scrolling-testimonials__card"),
            g = document.querySelector("#prev-testimonial"),
            y = document.querySelector("#next-testimonial"),
            w = !1,
            p = !1,
            E = document.querySelector("#repeat-start");
        if (m && v && h) {
            var b = m.getBoundingClientRect(),
                L = b.left;
            window.addEventListener("resize", function() {
                b = m.getBoundingClientRect(), L = b.left
            }), y.addEventListener("click", l), g.addEventListener("click", d), m.addEventListener("mouseenter", u), m.addEventListener("click", u), m.addEventListener("mouseleave", f), window.requestAnimationFrame(n)
        }
    }(),
    function() {
        var t = document.querySelectorAll(".video-testimonials"),
            e = document.querySelectorAll(".video-testimonials-next"),
            n = document.querySelectorAll(".video-testimonials-prev"),
            i = document.querySelectorAll(".video-testimonials__thumbnails__thumbnail");
        t[0];
        if (t.length && e && n) {
            var o = function(e) {
                    var t = e.currentTarget.getAttribute("next-slide-index");
                    a(t)
                },
                r = function(e) {
                    var t = e.currentTarget.getAttribute("prev-slide-index");
                    a(t)
                },
                a = function(e) {
                    t.forEach(function(e) {
                        e.classList.remove("active")
                    }), t[e], t[e].classList.add("active"), i.forEach(function(e) {
                        e.classList.remove("active")
                    }), i[e].classList.add("active")
                };
            e.forEach(function(e) {
                e.addEventListener("click", o)
            }), n.forEach(function(e) {
                e.addEventListener("click", r)
            }), i.forEach(function(e) {
                e.addEventListener("click", function() {
                    a(e.getAttribute("slide"))
                })
            })
        } else console.log("Video testimonial slideshow not running: required elements not present")
    }(),
    function() {
        function e() {
            function e(e, t) {
                var n = e.getAttribute("data-" + t);
                n && e.setAttribute(t, n)
            }
            for (var t = document.querySelectorAll(".deferred"), n = 0; n < t.length; n++) e(t[n], "src"), e(t[n], "srcset"), e(t[n], "sizes"), e(t[n], "data")
        }
        window.onload = e
    }();
/*!
 * CoreUI Pro  v3.0.0-beta.0 (https://coreui.io)
 * Copyright 2019 Łukasz Holeczek
 * License (https://coreui.io/pro/license/)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).coreui = e()
}(this, (function() {
    "use strict";

    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function e(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
    }

    function n(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function i(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e && (i = i.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function r(t) {
        for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2 ? i(r, !0).forEach((function(e) {
                n(t, e, r[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : i(r).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
            }))
        }
        return t
    }
    var o, s, a, l = "transitionend",
        c = window.jQuery,
        u = function(t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        },
        f = function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        h = function(t) {
            if (!t) return 0;
            var e = window.getComputedStyle(t),
                n = e.transitionDuration,
                i = e.transitionDelay,
                r = parseFloat(n),
                o = parseFloat(i);
            return r || o ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
        },
        d = function(t) {
            var e = document.createEvent("HTMLEvents");
            e.initEvent(l, !0, !0), t.dispatchEvent(e)
        },
        p = function(t) {
            return (t[0] || t).nodeType
        },
        g = function(t, e) {
            var n = !1,
                i = e + 5;
            t.addEventListener(l, (function e() {
                n = !0, t.removeEventListener(l, e)
            })), setTimeout((function() {
                n || d(t)
            }), i)
        },
        m = function(t, e, n) {
            Object.keys(n).forEach((function(i) {
                var r, o = n[i],
                    s = e[i],
                    a = s && p(s) ? "element" : (r = s, {}.toString.call(r).match(/\s([a-z]+)/i)[1].toLowerCase());
                if (!new RegExp(o).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + o + '".')
            }))
        },
        _ = function(t) {
            return t ? [].slice.call(t) : []
        },
        v = function(t) {
            return !!t && (!!(t.style && t.parentNode && t.parentNode.style) && ("none" !== t.style.display && "none" !== t.parentNode.style.display && "hidden" !== t.style.visibility))
        },
        b = function() {
            return function() {}
        },
        E = function(t) {
            return t.offsetHeight
        },
        y = (o = {}, s = 1, {
            set: function(t, e, n) {
                if (t) {
                    "undefined" == typeof t.key && (t.key = {
                        key: e,
                        id: s
                    }, s++), o[t.key.id] = n
                }
            },
            get: function(t, e) {
                if (!t || "undefined" == typeof t.key) return null;
                var n = t.key;
                return n.key === e ? o[n.id] : null
            },
            delete: function(t, e) {
                if ("undefined" != typeof t.key) {
                    var n = t.key;
                    n.key === e && (delete o[n.id], delete t.key)
                }
            }
        }),
        A = {
            setData: function(t, e, n) {
                y.set(t, e, n)
            },
            getData: function(t, e) {
                return y.get(t, e)
            },
            removeData: function(t, e) {
                y.delete(t, e)
            }
        },
        w = Element.prototype,
        T = w.matches,
        D = w.closest,
        I = Element.prototype.querySelectorAll,
        S = Element.prototype.querySelector,
        O = function(t, e) {
            return new CustomEvent(t, e)
        };
    if ("function" != typeof window.CustomEvent && (O = function(t, e) {
        e = e || {
            bubbles: !1,
            cancelable: !1,
            detail: null
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
    }), !((a = document.createEvent("CustomEvent")).initEvent("Bootstrap", !0, !0), a.preventDefault(), a.defaultPrevented)) {
        var L = Event.prototype.preventDefault;
        Event.prototype.preventDefault = function() {
            this.cancelable && (L.call(this), Object.defineProperty(this, "defaultPrevented", {
                get: function() {
                    return !0
                },
                configurable: !0
            }))
        }
    }
    var C = function() {
        var t = O("Bootstrap", {
                cancelable: !0
            }),
            e = document.createElement("div");
        return e.addEventListener("Bootstrap", (function() {
            return null
        })), t.preventDefault(), e.dispatchEvent(t), t.defaultPrevented
    }();
    T || (T = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), D || (D = function(t) {
        var e = this;
        do {
            if (T.call(e, t)) return e;
            e = e.parentElement || e.parentNode
        } while (null !== e && 1 === e.nodeType);
        return null
    });
    var N = /:scope\b/;
    (function() {
        var t = document.createElement("div");
        try {
            t.querySelectorAll(":scope *")
        } catch (t) {
            return !1
        }
        return !0
    })() || (I = function(t) {
        if (!N.test(t)) return this.querySelectorAll(t);
        var e = Boolean(this.id);
        e || (this.id = u("scope"));
        var n = null;
        try {
            t = t.replace(N, "#" + this.id), n = this.querySelectorAll(t)
        } finally {
            e || this.removeAttribute("id")
        }
        return n
    }, S = function(t) {
        if (!N.test(t)) return this.querySelector(t);
        var e = I.call(this, t);
        return "undefined" != typeof e[0] ? e[0] : null
    });
    var P = /[^.]*(?=\..*)\.|.*/,
        R = /\..*/,
        H = /^key/,
        W = /::\d+$/,
        k = {},
        x = 1,
        M = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        U = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

    function V(t, e) {
        return e && e + "::" + x++ || t.uidEvent || x++
    }

    function Y(t) {
        var e = V(t);
        return t.uidEvent = e, k[e] = k[e] || {}, k[e]
    }

    function j(t, e) {
        null === t.which && H.test(t.type) && (t.which = null === t.charCode ? t.keyCode : t.charCode), t.delegateTarget = e
    }

    function B(t, e, n) {
        void 0 === n && (n = null);
        for (var i = Object.keys(t), r = 0, o = i.length; r < o; r++) {
            var s = t[i[r]];
            if (s.originalHandler === e && s.delegationSelector === n) return s
        }
        return null
    }

    function X(t, e, n) {
        var i = "string" == typeof e,
            r = i ? n : e,
            o = t.replace(R, ""),
            s = M[o];
        return s && (o = s), U.indexOf(o) > -1 || (o = t), [i, r, o]
    }

    function G(t, e, n, i, r) {
        if ("string" == typeof e && t) {
            n || (n = i, i = null);
            var o = X(e, n, i),
                s = o[0],
                a = o[1],
                l = o[2],
                c = Y(t),
                u = c[l] || (c[l] = {}),
                f = B(u, a, s ? n : null);
            if (f) f.oneOff = f.oneOff && r;
            else {
                var h = V(a, e.replace(P, "")),
                    d = s ? function(t, e, n) {
                        return function i(r) {
                            for (var o = t.querySelectorAll(e), s = r.target; s && s !== this; s = s.parentNode)
                                for (var a = o.length; a--;)
                                    if (o[a] === s) return j(r, s), i.oneOff && K.off(t, r.type, n), n.apply(s, [r]);
                            return null
                        }
                    }(t, n, i) : function(t, e) {
                        return function n(i) {
                            return j(i, t), n.oneOff && K.off(t, i.type, e), e.apply(t, [i])
                        }
                    }(t, n);
                d.delegationSelector = s ? n : null, d.originalHandler = a, d.oneOff = r, d.uidEvent = h, u[h] = d, t.addEventListener(l, d, s)
            }
        }
    }

    function F(t, e, n, i, r) {
        var o = B(e[n], i, r);
        o && (t.removeEventListener(n, o, Boolean(r)), delete e[n][o.uidEvent])
    }
    var K = {
            on: function(t, e, n, i) {
                G(t, e, n, i, !1)
            },
            one: function(t, e, n, i) {
                G(t, e, n, i, !0)
            },
            off: function(t, e, n, i) {
                if ("string" == typeof e && t) {
                    var r = X(e, n, i),
                        o = r[0],
                        s = r[1],
                        a = r[2],
                        l = a !== e,
                        c = Y(t),
                        u = "." === e.charAt(0);
                    if ("undefined" == typeof s) {
                        u && Object.keys(c).forEach((function(n) {
                            ! function(t, e, n, i) {
                                var r = e[n] || {};
                                Object.keys(r).forEach((function(o) {
                                    if (o.indexOf(i) > -1) {
                                        var s = r[o];
                                        F(t, e, n, s.originalHandler, s.delegationSelector)
                                    }
                                }))
                            }(t, c, n, e.substr(1))
                        }));
                        var f = c[a] || {};
                        Object.keys(f).forEach((function(n) {
                            var i = n.replace(W, "");
                            if (!l || e.indexOf(i) > -1) {
                                var r = f[n];
                                F(t, c, a, r.originalHandler, r.delegationSelector)
                            }
                        }))
                    } else {
                        if (!c || !c[a]) return;
                        F(t, c, a, s, o ? n : null)
                    }
                }
            },
            trigger: function(t, e, n) {
                if ("string" != typeof e || !t) return null;
                var i, r = e.replace(R, ""),
                    o = e !== r,
                    s = U.indexOf(r) > -1,
                    a = !0,
                    l = !0,
                    u = !1,
                    f = null;
                return o && "undefined" != typeof c && (i = c.Event(e, n), c(t).trigger(i), a = !i.isPropagationStopped(), l = !i.isImmediatePropagationStopped(), u = i.isDefaultPrevented()), s ? (f = document.createEvent("HTMLEvents")).initEvent(r, a, !0) : f = O(e, {
                    bubbles: a,
                    cancelable: !0
                }), "undefined" != typeof n && Object.keys(n).forEach((function(t) {
                    Object.defineProperty(f, t, {
                        get: function() {
                            return n[t]
                        }
                    })
                })), u && (f.preventDefault(), C || Object.defineProperty(f, "defaultPrevented", {
                    get: function() {
                        return !0
                    }
                })), l && t.dispatchEvent(f), f.defaultPrevented && "undefined" != typeof i && i.preventDefault(), f
            }
        },
        Q = "asyncLoad",
        q = window.CoreUIDefaults && window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : "c-",
        z = {
            ACTIVE: q + "active",
            NAV_DROPDOWN_TOGGLE: q + "sidebar-nav-dropdown-toggle",
            SHOW: q + "show",
            VIEW_SCRIPT: "view-script"
        },
        Z = {
            CLICK_DATA_API: "click.coreui.asyncLoad.data-api",
            XHR_STATUS: "xhr"
        },
        $ = {
            NAV_DROPDOWN: "." + q + "sidebar-nav-dropdown",
            NAV_LINK: "." + q + "xhr-link, ." + q + "sidebar-nav-link",
            NAV_ITEM: "." + q + "sidebar-nav-item",
            VIEW_SCRIPT: ".view-script"
        },
        J = {
            defaultPage: "main.html",
            errorPage: "404.html",
            subpagesDirectory: "views/"
        },
        tt = function() {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t;
                var n = location.hash.replace(/^#/, "");

                //custom
                // "" !== n ? this._setUpUrl(n) : this._setUpUrl(this._config.defaultPage), this._addEventListeners()

            }
            var n = t.prototype;
            return n._getConfig = function(t) {
                //custom
                // return t = r({}, J, {}, t)
            }, n._loadPage = function(t) {
                var e = this,
                    n = this._element,
                    i = this._config,
                    r = new XMLHttpRequest;
                r.open("GET", i.subpagesDirectory + t);
                var o = new CustomEvent(Z.XHR_STATUS, {
                    detail: {
                        url: t,
                        status: r.status
                    }
                });
                n.dispatchEvent(o), r.onload = function(s) {
                    if (200 === r.status) {
                        o = new CustomEvent(Z.XHR_STATUS, {
                            detail: {
                                url: t,
                                status: r.status
                            }
                        }), n.dispatchEvent(o);
                        var a = document.createElement("div");
                        a.innerHTML = s.target.response;
                        var l = Array.from(a.querySelectorAll("script")).map((function(t) {
                            return t.attributes.getNamedItem("src").nodeValue
                        }));
                        a.querySelectorAll("script").forEach((function(t) {
                            return t.remove(t)
                        })), window.scrollTo(0, 0), n.innerHTML = "", n.appendChild(a), (c = document.querySelectorAll($.VIEW_SCRIPT)).length && c.forEach((function(t) {
                            t.remove()
                        })), l.length && function t(n, i) {
                            void 0 === i && (i = 0);
                            var r = document.createElement("script");
                            r.type = "text/javascript", r.src = n[i], r.className = z.VIEW_SCRIPT, r.onload = r.onreadystatechange = function() {
                                e.readyState && "complete" !== e.readyState || n.length > i + 1 && t(n, i + 1)
                            }, document.getElementsByTagName("body")[0].appendChild(r)
                        }(l), window.location.hash = t
                    } else window.location.href = i.errorPage;
                    var c
                }, r.send()
            }, n._setUpUrl = function(t) {
                t = t.replace(/^\//, "").split("?")[0], Array.from(document.querySelectorAll($.NAV_LINK)).forEach((function(t) {
                    t.classList.remove(z.ACTIVE)
                })), Array.from(document.querySelectorAll($.NAV_LINK)).forEach((function(t) {
                    t.classList.remove(z.ACTIVE)
                })), Array.from(document.querySelectorAll($.NAV_DROPDOWN)).forEach((function(t) {
                    t.classList.remove(z.SHOW)
                })), Array.from(document.querySelectorAll($.NAV_DROPDOWN)).forEach((function(e) {
                    Array.from(e.querySelectorAll('a[href*="' + t + '"]')).length > 0 && e.classList.add(z.SHOW)
                })), Array.from(document.querySelectorAll($.NAV_ITEM + ' a[href*="' + t + '"]')).forEach((function(t) {
                    t.classList.add(z.ACTIVE)
                })), this._loadPage(t)
            }, n._loadBlank = function(t) {
                window.open(t)
            }, n._loadTop = function(t) {
                window.location = t
            }, n._update = function(t) {
                "#" !== t.href && ("undefined" != typeof t.dataset.toggle && "null" !== t.dataset.toggle || ("_top" === t.target ? this._loadTop(t.href) : "_blank" === t.target ? this._loadBlank(t.href) : this._setUpUrl(t.getAttribute("href"))))
            }, n._addEventListeners = function() {
                var t = this;
                K.on(document, Z.CLICK_DATA_API, $.NAV_LINK, (function(e) {
                    e.preventDefault();
                    var n = e.target;
                    n.classList.contains(z.NAV_LINK) || (n = n.closest($.NAV_LINK)), n.classList.contains(z.NAV_DROPDOWN_TOGGLE) || "#" === n.getAttribute("href") || t._update(n)
                }))
            }, t._asyncLoadInterface = function(e, n) {
                var i = A.getData(e, "coreui.asyncLoad");
                if (i || (i = new t(e, "object" == typeof n && n)), "string" == typeof n) {
                    if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    t._asyncLoadInterface(this, e)
                }))
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return J
                }
            }]), t
        }();
    if ("undefined" != typeof c) {
        var et = c.fn[Q];
        c.fn[Q] = tt._jQueryInterface, c.fn[Q].Constructor = tt, c.fn[Q].noConflict = function() {
            return c.fn[Q] = et, tt._jQueryInterface
        }
    }
    var nt = {
            matches: function(t, e) {
                return T.call(t, e)
            },
            find: function(t, e) {
                return void 0 === e && (e = document.documentElement), "string" != typeof t ? null : I.call(e, t)
            },
            findOne: function(t, e) {
                return void 0 === e && (e = document.documentElement), "string" != typeof t ? null : S.call(e, t)
            },
            children: function(t, e) {
                var n = this;
                if ("string" != typeof e) return null;

                //custom
                return null;

                var i = _(t.children);
                return i.filter((function(t) {
                    return n.matches(t, e)
                }))
            },
            parents: function(t, e) {
                if ("string" != typeof e) return null;
                for (var n = [], i = t.parentNode; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) this.matches(i, e) && n.push(i), i = i.parentNode;
                return n
            },
            closest: function(t, e) {
                // return "string" != typeof e ? null : D.call(t, e)
                return null
            },
            prev: function(t, e) {
                if ("string" != typeof e) return null;
                for (var n = [], i = t.previousSibling; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) this.matches(i, e) && n.push(i), i = i.previousSibling;
                return n
            }
        },
        it = "coreui.alert",
        rt = "." + it,
        ot = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        st = {
            DISMISS: '[data-dismiss="' + ot + 'alert"]'
        },
        at = {
            CLOSE: "close" + rt,
            CLOSED: "closed" + rt,
            CLICK_DATA_API: "click" + rt + ".data-api"
        },
        lt = {
            ALERT: ot + "alert",
            FADE: ot + "fade",
            SHOW: ot + "show"
        },
        ct = function() {
            function t(t) {
                this._element = t, this._element && A.setData(t, it, this)
            }
            var n = t.prototype;
            return n.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t));
                var n = this._triggerCloseEvent(e);
                null === n || n.defaultPrevented || this._removeElement(e)
            }, n.dispose = function() {
                A.removeData(this._element, it), this._element = null
            }, n._getRootElement = function(t) {
                var e = f(t),
                    n = !1;
                return e && (n = nt.findOne(e)), n || (n = nt.closest(t, "." + lt.ALERT)), n
            }, n._triggerCloseEvent = function(t) {
                return K.trigger(t, at.CLOSE)
            }, n._removeElement = function(t) {
                var e = this;
                if (t.classList.remove(lt.SHOW), t.classList.contains(lt.FADE)) {
                    var n = h(t);
                    K.one(t, l, (function(n) {
                        return e._destroyElement(t, n)
                    })), g(t, n)
                } else this._destroyElement(t)
            }, n._destroyElement = function(t) {
                t.parentNode && t.parentNode.removeChild(t), K.trigger(t, at.CLOSED)
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    var n = A.getData(this, it);
                    n || (n = new t(this)), "close" === e && n[e](this)
                }))
            }, t._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, t._getInstance = function(t) {
                return A.getData(t, it)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }]), t
        }();
    if (K.on(document, at.CLICK_DATA_API, st.DISMISS, ct._handleDismiss(new ct)), "undefined" != typeof c) {
        var ut = c.fn.alert;
        c.fn.alert = ct._jQueryInterface, c.fn.alert.Constructor = ct, c.fn.alert.noConflict = function() {
            return c.fn.alert = ut, ct._jQueryInterface
        }
    }
    var ft = "coreui.button",
        ht = "." + ft,
        dt = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        pt = {
            ACTIVE: dt + "active",
            BUTTON: dt + "btn",
            FOCUS: "focus"
        },
        gt = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: 'input:not([type="hidden"])',
            ACTIVE: "." + dt + "active",
            BUTTON: "." + dt + "btn"
        },
        mt = {
            CLICK_DATA_API: "click" + ht + ".data-api",
            FOCUS_DATA_API: "focus" + ht + ".data-api",
            BLUR_DATA_API: "blur" + ht + ".data-api"
        },
        _t = function() {
            function t(t) {
                this._element = t, A.setData(t, ft, this)
            }
            var n = t.prototype;
            return n.toggle = function() {
                var t = !0,
                    e = !0,
                    n = nt.closest(this._element, gt.DATA_TOGGLE);
                if (n) {
                    var i = nt.findOne(gt.INPUT, this._element);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(pt.ACTIVE)) t = !1;
                            else {
                                var r = nt.findOne(gt.ACTIVE, n);
                                r && r.classList.remove(pt.ACTIVE)
                            } if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(pt.ACTIVE), K.trigger(i, "change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(pt.ACTIVE)), t && this._element.classList.toggle(pt.ACTIVE)
            }, n.dispose = function() {
                A.removeData(this._element, ft), this._element = null
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    var n = A.getData(this, ft);
                    n || (n = new t(this)), "toggle" === e && n[e]()
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, ft)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }]), t
        }();
    if (K.on(document, mt.CLICK_DATA_API, gt.DATA_TOGGLE_CARROT, (function(t) {
        t.preventDefault();
        var e = t.target;
        e.classList.contains(pt.BUTTON) || (e = nt.closest(e, gt.BUTTON));
        var n = A.getData(e, ft);
        n || (n = new _t(e), A.setData(e, ft, n)), n.toggle()
    })), K.on(document, mt.FOCUS_DATA_API, gt.DATA_TOGGLE_CARROT, (function(t) {
        var e = nt.closest(t.target, gt.BUTTON);
        e && e.classList.add(pt.FOCUS)
    })), K.on(document, mt.BLUR_DATA_API, gt.DATA_TOGGLE_CARROT, (function(t) {
        var e = nt.closest(t.target, gt.BUTTON);
        e && e.classList.remove(pt.FOCUS)
    })), "undefined" != typeof c) {
        var vt = c.fn.button;
        c.fn.button = _t._jQueryInterface, c.fn.button.Constructor = _t, c.fn.button.noConflict = function() {
            return c.fn.button = vt, _t._jQueryInterface
        }
    }

    function bt(t) {
        return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t)
    }

    function Et(t) {
        return t.replace(/[A-Z]/g, (function(t) {
            return t.toLowerCase()
        }))
    }
    var yt = {
            setDataAttribute: function(t, e, n) {
                t.setAttribute("data-" + Et(e), n)
            },
            removeDataAttribute: function(t, e) {
                t.removeAttribute("data-" + Et(e))
            },
            getDataAttributes: function(t) {
                if (!t) return {};
                var e = r({}, t.dataset);
                return Object.keys(e).forEach((function(t) {
                    e[t] = bt(e[t])
                })), e
            },
            getDataAttribute: function(t, e) {
                return bt(t.getAttribute("data-" + Et(e)))
            },
            offset: function(t) {
                var e = t.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft
                }
            },
            position: function(t) {
                return {
                    top: t.offsetTop,
                    left: t.offsetLeft
                }
            },
            toggleClass: function(t, e) {
                t && (t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e))
            }
        },
        At = "carousel",
        wt = "coreui.carousel",
        Tt = "." + wt,
        Dt = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        It = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        St = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        Ot = "next",
        Lt = "prev",
        Ct = "left",
        Nt = "right",
        Pt = {
            SLIDE: "slide" + Tt,
            SLID: "slid" + Tt,
            KEYDOWN: "keydown" + Tt,
            MOUSEENTER: "mouseenter" + Tt,
            MOUSELEAVE: "mouseleave" + Tt,
            TOUCHSTART: "touchstart" + Tt,
            TOUCHMOVE: "touchmove" + Tt,
            TOUCHEND: "touchend" + Tt,
            POINTERDOWN: "pointerdown" + Tt,
            POINTERUP: "pointerup" + Tt,
            DRAG_START: "dragstart" + Tt,
            LOAD_DATA_API: "load" + Tt + ".data-api",
            CLICK_DATA_API: "click" + Tt + ".data-api"
        },
        Rt = {
            CAROUSEL: Dt + "carousel",
            ACTIVE: Dt + "active",
            SLIDE: "slide",
            RIGHT: Dt + "carousel-item-right",
            LEFT: Dt + "carousel-item-left",
            NEXT: Dt + "carousel-item-next",
            PREV: Dt + "carousel-item-prev",
            ITEM: Dt + "carousel-item",
            POINTER_EVENT: Dt + "pointer-event"
        },
        Ht = {
            ACTIVE: "." + Dt + "active",
            ACTIVE_ITEM: "." + Dt + "active." + Dt + "carousel-item",
            ITEM: "." + Dt + "carousel-item",
            ITEM_IMG: "." + Dt + "carousel-item img",
            NEXT_PREV: "." + Dt + "carousel-item-next, ." + Dt + "carousel-item-prev",
            INDICATORS: "." + Dt + "carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        },
        Wt = {
            TOUCH: "touch",
            PEN: "pen"
        },
        kt = function() {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = nt.findOne(Ht.INDICATORS, this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners(), A.setData(t, wt, this)
            }
            var n = t.prototype;
            return n.next = function() {
                this._isSliding || this._slide(Ot)
            }, n.nextWhenVisible = function() {
                !document.hidden && v(this._element) && this.next()
            }, n.prev = function() {
                this._isSliding || this._slide(Lt)
            }, n.pause = function(t) {
                t || (this._isPaused = !0), nt.findOne(Ht.NEXT_PREV, this._element) && (d(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, n.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function(t) {
                var e = this;
                this._activeElement = nt.findOne(Ht.ACTIVE_ITEM, this._element);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) K.one(this._element, Pt.SLID, (function() {
                        return e.to(t)
                    }));
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = t > n ? Ot : Lt;
                        this._slide(i, this._items[t])
                    }
            }, n.dispose = function() {
                K.off(this._element, Tt), A.removeData(this._element, wt), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function(t) {
                return t = r({}, It, {}, t), m(At, t, St), t
            }, n._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function() {
                var t = this;
                this._config.keyboard && K.on(this._element, Pt.KEYDOWN, (function(e) {
                    return t._keydown(e)
                })), "hover" === this._config.pause && (K.on(this._element, Pt.MOUSEENTER, (function(e) {
                    return t.pause(e)
                })), K.on(this._element, Pt.MOUSELEAVE, (function(e) {
                    return t.cycle(e)
                }))), this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function() {
                var t = this;
                if (this._touchSupported) {
                    var e = function(e) {
                            t._pointerEvent && Wt[e.pointerType.toUpperCase()] ? t.touchStartX = e.clientX : t._pointerEvent || (t.touchStartX = e.touches[0].clientX)
                        },
                        n = function(e) {
                            t._pointerEvent && Wt[e.pointerType.toUpperCase()] && (t.touchDeltaX = e.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout((function(e) {
                                return t.cycle(e)
                            }), 500 + t._config.interval))
                        };
                    _(nt.find(Ht.ITEM_IMG, this._element)).forEach((function(t) {
                        K.on(t, Pt.DRAG_START, (function(t) {
                            return t.preventDefault()
                        }))
                    })), this._pointerEvent ? (K.on(this._element, Pt.POINTERDOWN, (function(t) {
                        return e(t)
                    })), K.on(this._element, Pt.POINTERUP, (function(t) {
                        return n(t)
                    })), this._element.classList.add(Rt.POINTER_EVENT)) : (K.on(this._element, Pt.TOUCHSTART, (function(t) {
                        return e(t)
                    })), K.on(this._element, Pt.TOUCHMOVE, (function(e) {
                        return function(e) {
                            e.touches && e.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.touches[0].clientX - t.touchStartX
                        }(e)
                    })), K.on(this._element, Pt.TOUCHEND, (function(t) {
                        return n(t)
                    })))
                }
            }, n._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? _(nt.find(Ht.ITEM, t.parentNode)) : [], this._items.indexOf(t)
            }, n._getItemByDirection = function(t, e) {
                var n = t === Ot,
                    i = t === Lt,
                    r = this._getItemIndex(e),
                    o = this._items.length - 1;
                if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
                var s = (r + (t === Lt ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, n._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(nt.findOne(Ht.ACTIVE_ITEM, this._element));
                return K.trigger(this._element, Pt.SLIDE, {
                    relatedTarget: t,
                    direction: e,
                    from: i,
                    to: n
                })
            }, n._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    for (var e = nt.find(Ht.ACTIVE, this._indicatorsElement), n = 0; n < e.length; n++) e[n].classList.remove(Rt.ACTIVE);
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && i.classList.add(Rt.ACTIVE)
                }
            }, n._slide = function(t, e) {
                var n, i, r, o = this,
                    s = nt.findOne(Ht.ACTIVE_ITEM, this._element),
                    a = this._getItemIndex(s),
                    c = e || s && this._getItemByDirection(t, s),
                    u = this._getItemIndex(c),
                    f = Boolean(this._interval);
                if (t === Ot ? (n = Rt.LEFT, i = Rt.NEXT, r = Ct) : (n = Rt.RIGHT, i = Rt.PREV, r = Nt), c && c.classList.contains(Rt.ACTIVE)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(c, r).defaultPrevented && s && c) {
                    if (this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(c), this._element.classList.contains(Rt.SLIDE)) {
                        c.classList.add(i), E(c), s.classList.add(n), c.classList.add(n);
                        var d = parseInt(c.getAttribute("data-interval"), 10);
                        d ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = d) : this._config.interval = this._config.defaultInterval || this._config.interval;
                        var p = h(s);
                        K.one(s, l, (function() {
                            c.classList.remove(n), c.classList.remove(i), c.classList.add(Rt.ACTIVE), s.classList.remove(Rt.ACTIVE), s.classList.remove(i), s.classList.remove(n), o._isSliding = !1, setTimeout((function() {
                                K.trigger(o._element, Pt.SLID, {
                                    relatedTarget: c,
                                    direction: r,
                                    from: a,
                                    to: u
                                })
                            }), 0)
                        })), g(s, p)
                    } else s.classList.remove(Rt.ACTIVE), c.classList.add(Rt.ACTIVE), this._isSliding = !1, K.trigger(this._element, Pt.SLID, {
                        relatedTarget: c,
                        direction: r,
                        from: a,
                        to: u
                    });
                    f && this.cycle()
                }
            }, t._carouselInterface = function(e, n) {
                var i = A.getData(e, wt),
                    o = r({}, It, {}, yt.getDataAttributes(e));
                "object" == typeof n && (o = r({}, o, {}, n));
                var s = "string" == typeof n ? n : o.slide;
                if (i || (i = new t(e, o)), "number" == typeof n) i.to(n);
                else if ("string" == typeof s) {
                    if ("undefined" == typeof i[s]) throw new TypeError('No method named "' + s + '"');
                    i[s]()
                } else o.interval && o.ride && (i.pause(), i.cycle())
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    t._carouselInterface(this, e)
                }))
            }, t._dataApiClickHandler = function(e) {
                var n = f(this);
                if (n) {
                    var i = nt.findOne(n);
                    if (i && i.classList.contains(Rt.CAROUSEL)) {
                        var o = r({}, yt.getDataAttributes(i), {}, yt.getDataAttributes(this)),
                            s = this.getAttribute("data-slide-to");
                        s && (o.interval = !1), t._carouselInterface(i, o), s && A.getData(i, wt).to(s), e.preventDefault()
                    }
                }
            }, t._getInstance = function(t) {
                return A.getData(t, wt)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return It
                }
            }]), t
        }();
    if (K.on(document, Pt.CLICK_DATA_API, Ht.DATA_SLIDE, kt._dataApiClickHandler), K.on(window, Pt.LOAD_DATA_API, (function() {
        for (var t = _(nt.find(Ht.DATA_RIDE)), e = 0, n = t.length; e < n; e++) kt._carouselInterface(t[e], A.getData(t[e], wt))
    })), "undefined" != typeof c) {
        var xt = c.fn[At];
        c.fn[At] = kt._jQueryInterface, c.fn[At].Constructor = kt, c.fn[At].noConflict = function() {
            return c.fn[At] = xt, kt._jQueryInterface
        }
    }
    var Mt = "class-toggler",
        Ut = window.CoreUIDefaults && window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : "c-",
        Vt = "-sm,-md,-lg,-xl",
        Yt = "-show",
        jt = !1,
        Bt = "body",
        Xt = {
            CLASS_TOGGLER: Ut + "class-toggler"
        },
        Gt = {
            CLASS_TOGGLE: "classtoggle",
            CLICK_DATA_API: "click.coreui.class-toggler.data-api"
        },
        Ft = {
            CLASS_TOGGLER: "." + Ut + "class-toggler"
        },
        Kt = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.toggle = function() {
                var t = this;
                this._getElementDataAttributes(this._element).forEach((function(e) {
                    var n, i = e.target,
                        r = e.toggle;
                    n = "_parent" === i || "parent" === i ? t._element.parentNode : document.querySelector(i), r.forEach((function(e) {
                        var r = e.className,
                            o = e.responsive,
                            s = e.postfix,
                            a = "undefined" == typeof e.breakpoints || null === e.breakpoints ? null : t._arrayFromString(e.breakpoints);
                        if (o) {
                            var l;
                            a.forEach((function(t) {
                                r.includes(t) && (l = t)
                            }));
                            var c = [];
                            "undefined" == typeof l ? c.push(r) : (c.push(r.replace("" + l + s, s)), a.splice(0, a.indexOf(l) + 1).forEach((function(t) {
                                c.push(r.replace("" + l + s, "" + t + s))
                            })));
                            var u = !1;
                            if (c.forEach((function(t) {
                                n.classList.contains(t) && (u = !0)
                            })), u) c.forEach((function(t) {
                                n.classList.remove(t);
                                var e = new CustomEvent(Gt.CLASS_TOGGLE, {
                                    detail: {
                                        target: i,
                                        className: t
                                    }
                                });
                                n.dispatchEvent(e)
                            }));
                            else {
                                n.classList.add(r);
                                var f = new CustomEvent(Gt.CLASS_TOGGLE, {
                                    detail: {
                                        target: i,
                                        className: r
                                    }
                                });
                                n.dispatchEvent(f)
                            }
                        } else {
                            n.classList.toggle(r);
                            var h = new CustomEvent(Gt.CLASS_TOGGLE, {
                                detail: {
                                    target: i,
                                    className: r
                                }
                            });
                            n.dispatchEvent(h)
                        }
                    }))
                }))
            }, n._arrayFromString = function(t) {
                return t.replace(/ /g, "").split(",")
            }, n._isArray = function(t) {
                try {
                    return JSON.parse(t.replace(/'/g, '"')), !0
                } catch (t) {
                    return !1
                }
            }, n._convertToArray = function(t) {
                return JSON.parse(t.replace(/'/g, '"'))
            }, n._getDataAttributes = function(t, e) {
                var n = t[e];
                return this._isArray(n) ? this._convertToArray(n) : n
            }, n._getToggleDetails = function(t, e, n, i) {
                var r = function(t, e, n, i) {
                        void 0 === e && (e = jt), this.className = t, this.responsive = e, this.breakpoints = n, this.postfix = i
                    },
                    o = [];
                return Array.isArray(t) ? t.forEach((function(t, s) {
                    e = Array.isArray(e) ? e[s] : e, n = e ? Array.isArray(n) ? n[s] : n : null, i = e ? Array.isArray(i) ? i[s] : i : null, o.push(new r(t, e, n, i))
                })) : (n = e ? n : null, i = e ? i : null, o.push(new r(t, e, n, i))), o
            }, n._ifArray = function(t, e) {
                return Array.isArray(t) ? t[e] : t
            }, n._getElementDataAttributes = function(t) {
                var e = this,
                    n = t.dataset,
                    i = "undefined" == typeof n.target ? Bt : this._getDataAttributes(n, "target"),
                    r = "undefined" == typeof n.class ? "undefined" : this._getDataAttributes(n, "class"),
                    o = "undefined" == typeof n.responsive ? jt : this._getDataAttributes(n, "responsive"),
                    s = "undefined" == typeof n.breakpoints ? Vt : this._getDataAttributes(n, "breakpoints"),
                    a = "undefined" == typeof n.postfix ? Yt : this._getDataAttributes(n, "postfix"),
                    l = [],
                    c = function(t, e) {
                        this.target = t, this.toggle = e
                    };
                return Array.isArray(i) ? i.forEach((function(t, n) {
                    l.push(new c(t, e._getToggleDetails(e._ifArray(r, n), e._ifArray(o, n), e._ifArray(s, n), e._ifArray(a, n))))
                })) : l.push(new c(i, this._getToggleDetails(r, o, s, a))), l
            }, t._classTogglerInterface = function(e, n) {
                var i = A.getData(e, "coreui.class-toggler");
                if (i || (i = new t(e, "object" == typeof n && n)), "string" == typeof n) {
                    if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    t._classTogglerInterface(this, e)
                }))
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }]), t
        }();
    if (K.on(document, Gt.CLICK_DATA_API, Ft.CLASS_TOGGLER, (function(t) {
        t.preventDefault();
        var e = t.target;
        e.classList.contains(Xt.CLASS_TOGGLER) || (e = e.closest(Ft.CLASS_TOGGLER)), Kt._classTogglerInterface(e, "toggle")
    })), "undefined" != typeof c) {
        var Qt = c.fn[Mt];
        c.fn[Mt] = Kt._jQueryInterface, c.fn[Mt].Constructor = Kt, c.fn[Mt].noConflict = function() {
            return c.fn[Mt] = Qt, Kt._jQueryInterface
        }
    }
    var qt = "collapse",
        zt = "coreui.collapse",
        Zt = "." + zt,
        $t = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        Jt = {
            toggle: !0,
            parent: ""
        },
        te = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        ee = {
            SHOW: "show" + Zt,
            SHOWN: "shown" + Zt,
            HIDE: "hide" + Zt,
            HIDDEN: "hidden" + Zt,
            CLICK_DATA_API: "click" + Zt + ".data-api"
        },
        ne = {
            SHOW: $t + "show",
            COLLAPSE: $t + "collapse",
            COLLAPSING: $t + "collapsing",
            COLLAPSED: $t + "collapsed"
        },
        ie = "width",
        re = "height",
        oe = {
            ACTIVES: "." + $t + "show, ." + $t + "collapsing",
            DATA_TOGGLE: '[data-toggle="' + $t + 'collapse"]'
        },
        se = function() {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = _(nt.find('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = _(nt.find(oe.DATA_TOGGLE)), i = 0, r = n.length; i < r; i++) {
                    var o = n[i],
                        s = f(o),
                        a = _(nt.find(s)).filter((function(e) {
                            return e === t
                        }));
                    null !== s && a.length && (this._selector = s, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), A.setData(t, zt, this)
            }
            var n = t.prototype;
            return n.toggle = function() {
                this._element.classList.contains(ne.SHOW) ? this.hide() : this.show()
            }, n.show = function() {
                var e = this;
                if (!this._isTransitioning && !this._element.classList.contains(ne.SHOW)) {
                    var n, i;
                    this._parent && 0 === (n = _(nt.find(oe.ACTIVES, this._parent)).filter((function(t) {
                        return "string" == typeof e._config.parent ? t.getAttribute("data-parent") === e._config.parent : t.classList.contains(ne.COLLAPSE)
                    }))).length && (n = null);
                    var r = nt.findOne(this._selector);
                    if (n) {
                        var o = n.filter((function(t) {
                            return r !== t
                        }));
                        if ((i = o[0] ? A.getData(o[0], zt) : null) && i._isTransitioning) return
                    }
                    if (!K.trigger(this._element, ee.SHOW).defaultPrevented) {
                        n && n.forEach((function(e) {
                            r !== e && t._collapseInterface(e, "hide"), i || A.setData(e, zt, null)
                        }));
                        var s = this._getDimension();
                        this._element.classList.remove(ne.COLLAPSE), this._element.classList.add(ne.COLLAPSING), this._element.style[s] = 0, this._triggerArray.length && this._triggerArray.forEach((function(t) {
                            t.classList.remove(ne.COLLAPSED), t.setAttribute("aria-expanded", !0)
                        })), this.setTransitioning(!0);
                        var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                            c = h(this._element);
                        K.one(this._element, l, (function() {
                            e._element.classList.remove(ne.COLLAPSING), e._element.classList.add(ne.COLLAPSE), e._element.classList.add(ne.SHOW), e._element.style[s] = "", e.setTransitioning(!1), K.trigger(e._element, ee.SHOWN)
                        })), g(this._element, c), this._element.style[s] = this._element[a] + "px"
                    }
                }
            }, n.hide = function() {
                var t = this;
                if (!this._isTransitioning && this._element.classList.contains(ne.SHOW) && !K.trigger(this._element, ee.HIDE).defaultPrevented) {
                    var e = this._getDimension();
                    this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", E(this._element), this._element.classList.add(ne.COLLAPSING), this._element.classList.remove(ne.COLLAPSE), this._element.classList.remove(ne.SHOW);
                    var n = this._triggerArray.length;
                    if (n > 0)
                        for (var i = 0; i < n; i++) {
                            var r = this._triggerArray[i],
                                o = f(r);
                            if (null !== o) nt.findOne(o).classList.contains(ne.SHOW) || (r.classList.add(ne.COLLAPSED), r.setAttribute("aria-expanded", !1))
                        }
                    this.setTransitioning(!0);
                    this._element.style[e] = "";
                    var s = h(this._element);
                    K.one(this._element, l, (function() {
                        t.setTransitioning(!1), t._element.classList.remove(ne.COLLAPSING), t._element.classList.add(ne.COLLAPSE), K.trigger(t._element, ee.HIDDEN)
                    })), g(this._element, s)
                }
            }, n.setTransitioning = function(t) {
                this._isTransitioning = t
            }, n.dispose = function() {
                A.removeData(this._element, zt), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function(t) {
                return (t = r({}, Jt, {}, t)).toggle = Boolean(t.toggle), m(qt, t, te), t
            }, n._getDimension = function() {
                return this._element.classList.contains(ie) ? ie : re
            }, n._getParent = function() {
                var e = this,
                    n = this._config.parent;
                p(n) ? "undefined" == typeof n.jquery && "undefined" == typeof n[0] || (n = n[0]) : n = nt.findOne(n);
                var i = '[data-toggle="collapse"][data-parent="' + n + '"]';
                return _(nt.find(i, n)).forEach((function(n) {
                    e._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                })), n
            }, n._addAriaAndCollapsedClass = function(t, e) {
                if (t) {
                    var n = t.classList.contains(ne.SHOW);
                    e.length && e.forEach((function(t) {
                        n ? t.classList.remove(ne.COLLAPSED) : t.classList.add(ne.COLLAPSED), t.setAttribute("aria-expanded", n)
                    }))
                }
            }, t._getTargetFromElement = function(t) {
                var e = f(t);
                return e ? nt.findOne(e) : null
            }, t._collapseInterface = function(e, n) {
                var i = A.getData(e, zt),
                    o = r({}, Jt, {}, yt.getDataAttributes(e), {}, "object" == typeof n && n ? n : {});
                if (!i && o.toggle && /show|hide/.test(n) && (o.toggle = !1), i || (i = new t(e, o)), "string" == typeof n) {
                    if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    t._collapseInterface(this, e)
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, zt)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Jt
                }
            }]), t
        }();
    if (K.on(document, ee.CLICK_DATA_API, oe.DATA_TOGGLE, (function(t) {
        "A" === t.target.tagName && t.preventDefault();
        var e = yt.getDataAttributes(this),
            n = f(this);
        _(nt.find(n)).forEach((function(t) {
            var n, i = A.getData(t, zt);
            i ? (null === i._parent && "string" == typeof e.parent && (i._config.parent = e.parent, i._parent = i._getParent()), n = "toggle") : n = e, se._collapseInterface(t, n)
        }))
    })), "undefined" != typeof c) {
        var ae = c.fn[qt];
        c.fn[qt] = se._jQueryInterface, c.fn[qt].Constructor = se, c.fn[qt].noConflict = function() {
            return c.fn[qt] = ae, se._jQueryInterface
        }
    }
    var le = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        ce = function() {
            for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
                if (le && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
            return 0
        }();
    var ue = le && window.Promise ? function(t) {
        var e = !1;
        return function() {
            e || (e = !0, window.Promise.resolve().then((function() {
                e = !1, t()
            })))
        }
    } : function(t) {
        var e = !1;
        return function() {
            e || (e = !0, setTimeout((function() {
                e = !1, t()
            }), ce))
        }
    };

    function fe(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function he(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function de(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function pe(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var e = he(t),
            n = e.overflow,
            i = e.overflowX,
            r = e.overflowY;
        return /(auto|scroll|overlay)/.test(n + r + i) ? t : pe(de(t))
    }

    function ge(t) {
        return t && t.referenceNode ? t.referenceNode : t
    }
    var me = le && !(!window.MSInputMethodContext || !document.documentMode),
        _e = le && /MSIE 10/.test(navigator.userAgent);

    function ve(t) {
        return 11 === t ? me : 10 === t ? _e : me || _e
    }

    function be(t) {
        if (!t) return document.documentElement;
        for (var e = ve(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === he(n, "position") ? be(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function Ee(t) {
        return null !== t.parentNode ? Ee(t.parentNode) : t
    }

    function ye(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            r = n ? e : t,
            o = document.createRange();
        o.setStart(i, 0), o.setEnd(r, 0);
        var s, a, l = o.commonAncestorContainer;
        if (t !== l && e !== l || i.contains(r)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && be(s.firstElementChild) !== s ? be(l) : l;
        var c = Ee(t);
        return c.host ? ye(c.host, e) : ye(t, Ee(e).host)
    }

    function Ae(t) {
        var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = t.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || i)[e]
        }
        return t[e]
    }

    function we(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function Te(t, e, n, i) {
        return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], ve(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function De(t) {
        var e = t.body,
            n = t.documentElement,
            i = ve(10) && getComputedStyle(n);
        return {
            height: Te("Height", e, n, i),
            width: Te("Width", e, n, i)
        }
    }
    var Ie = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        Se = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        Oe = function(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        },
        Le = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        };

    function Ce(t) {
        return Le({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function Ne(t) {
        var e = {};
        try {
            if (ve(10)) {
                e = t.getBoundingClientRect();
                var n = Ae(t, "top"),
                    i = Ae(t, "left");
                e.top += n, e.left += i, e.bottom += n, e.right += i
            } else e = t.getBoundingClientRect()
        } catch (t) {}
        var r = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top
            },
            o = "HTML" === t.nodeName ? De(t.ownerDocument) : {},
            s = o.width || t.clientWidth || r.width,
            a = o.height || t.clientHeight || r.height,
            l = t.offsetWidth - s,
            c = t.offsetHeight - a;
        if (l || c) {
            var u = he(t);
            l -= we(u, "x"), c -= we(u, "y"), r.width -= l, r.height -= c
        }
        return Ce(r)
    }

    function Pe(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = ve(10),
            r = "HTML" === e.nodeName,
            o = Ne(t),
            s = Ne(e),
            a = pe(t),
            l = he(e),
            c = parseFloat(l.borderTopWidth, 10),
            u = parseFloat(l.borderLeftWidth, 10);
        n && r && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
        var f = Ce({
            top: o.top - s.top - c,
            left: o.left - s.left - u,
            width: o.width,
            height: o.height
        });
        if (f.marginTop = 0, f.marginLeft = 0, !i && r) {
            var h = parseFloat(l.marginTop, 10),
                d = parseFloat(l.marginLeft, 10);
            f.top -= c - h, f.bottom -= c - h, f.left -= u - d, f.right -= u - d, f.marginTop = h, f.marginLeft = d
        }
        return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (f = function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                i = Ae(e, "top"),
                r = Ae(e, "left"),
                o = n ? -1 : 1;
            return t.top += i * o, t.bottom += i * o, t.left += r * o, t.right += r * o, t
        }(f, e)), f
    }

    function Re(t) {
        if (!t || !t.parentElement || ve()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === he(e, "transform");) e = e.parentElement;
        return e || document.documentElement
    }

    function He(t, e, n, i) {
        var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            o = {
                top: 0,
                left: 0
            },
            s = r ? Re(t) : ye(t, ge(e));
        if ("viewport" === i) o = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = t.ownerDocument.documentElement,
                i = Pe(t, n),
                r = Math.max(n.clientWidth, window.innerWidth || 0),
                o = Math.max(n.clientHeight, window.innerHeight || 0),
                s = e ? 0 : Ae(n),
                a = e ? 0 : Ae(n, "left");
            return Ce({
                top: s - i.top + i.marginTop,
                left: a - i.left + i.marginLeft,
                width: r,
                height: o
            })
        }(s, r);
        else {
            var a = void 0;
            "scrollParent" === i ? "BODY" === (a = pe(de(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
            var l = Pe(a, s, r);
            if ("HTML" !== a.nodeName || function t(e) {
                var n = e.nodeName;
                if ("BODY" === n || "HTML" === n) return !1;
                if ("fixed" === he(e, "position")) return !0;
                var i = de(e);
                return !!i && t(i)
            }(s)) o = l;
            else {
                var c = De(t.ownerDocument),
                    u = c.height,
                    f = c.width;
                o.top += l.top - l.marginTop, o.bottom = u + l.top, o.left += l.left - l.marginLeft, o.right = f + l.left
            }
        }
        var h = "number" == typeof(n = n || 0);
        return o.left += h ? n : n.left || 0, o.top += h ? n : n.top || 0, o.right -= h ? n : n.right || 0, o.bottom -= h ? n : n.bottom || 0, o
    }

    function We(t, e, n, i, r) {
        var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var s = He(n, i, o, r),
            a = {
                top: {
                    width: s.width,
                    height: e.top - s.top
                },
                right: {
                    width: s.right - e.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - e.bottom
                },
                left: {
                    width: e.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map((function(t) {
                return Le({
                    key: t
                }, a[t], {
                    area: (e = a[t], e.width * e.height)
                });
                var e
            })).sort((function(t, e) {
                return e.area - t.area
            })),
            c = l.filter((function(t) {
                var e = t.width,
                    i = t.height;
                return e >= n.clientWidth && i >= n.clientHeight
            })),
            u = c.length > 0 ? c[0].key : l[0].key,
            f = t.split("-")[1];
        return u + (f ? "-" + f : "")
    }

    function ke(t, e, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        return Pe(n, i ? Re(e) : ye(e, ge(n)), i)
    }

    function xe(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function Me(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, (function(t) {
            return e[t]
        }))
    }

    function Ue(t, e, n) {
        n = n.split("-")[0];
        var i = xe(t),
            r = {
                width: i.width,
                height: i.height
            },
            o = -1 !== ["right", "left"].indexOf(n),
            s = o ? "top" : "left",
            a = o ? "left" : "top",
            l = o ? "height" : "width",
            c = o ? "width" : "height";
        return r[s] = e[s] + e[l] / 2 - i[l] / 2, r[a] = n === a ? e[a] - i[c] : e[Me(a)], r
    }

    function Ve(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function Ye(t, e, n) {
        return (void 0 === n ? t : t.slice(0, function(t, e, n) {
            if (Array.prototype.findIndex) return t.findIndex((function(t) {
                return t[e] === n
            }));
            var i = Ve(t, (function(t) {
                return t[e] === n
            }));
            return t.indexOf(i)
        }(t, "name", n))).forEach((function(t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && fe(n) && (e.offsets.popper = Ce(e.offsets.popper), e.offsets.reference = Ce(e.offsets.reference), e = n(e, t))
        })), e
    }

    function je() {
        if (!this.state.isDestroyed) {
            var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            t.offsets.reference = ke(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = We(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = Ue(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = Ye(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
        }
    }

    function Be(t, e) {
        return t.some((function(t) {
            var n = t.name;
            return t.enabled && n === e
        }))
    }

    function Xe(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
            var r = e[i],
                o = r ? "" + r + n : t;
            if ("undefined" != typeof document.body.style[o]) return o
        }
        return null
    }

    function Ge() {
        return this.state.isDestroyed = !0, Be(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[Xe("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function Fe(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function Ke(t, e, n, i) {
        n.updateBound = i, Fe(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var r = pe(t);
        return function t(e, n, i, r) {
            var o = "BODY" === e.nodeName,
                s = o ? e.ownerDocument.defaultView : e;
            s.addEventListener(n, i, {
                passive: !0
            }), o || t(pe(s.parentNode), n, i, r), r.push(s)
        }(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
    }

    function Qe() {
        this.state.eventsEnabled || (this.state = Ke(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function qe() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, Fe(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach((function(t) {
            t.removeEventListener("scroll", e.updateBound)
        })), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function ze(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function Ze(t, e) {
        Object.keys(e).forEach((function(n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && ze(e[n]) && (i = "px"), t.style[n] = e[n] + i
        }))
    }
    var $e = le && /Firefox/i.test(navigator.userAgent);

    function Je(t, e, n) {
        var i = Ve(t, (function(t) {
                return t.name === e
            })),
            r = !!i && t.some((function(t) {
                return t.name === n && t.enabled && t.order < i.order
            }));
        if (!r) {
            var o = "`" + e + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return r
    }
    var tn = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        en = tn.slice(3);

    function nn(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = en.indexOf(t),
            i = en.slice(n + 1).concat(en.slice(0, n));
        return e ? i.reverse() : i
    }
    var rn = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise"
    };

    function on(t, e, n, i) {
        var r = [0, 0],
            o = -1 !== ["right", "left"].indexOf(i),
            s = t.split(/(\+|\-)/).map((function(t) {
                return t.trim()
            })),
            a = s.indexOf(Ve(s, (function(t) {
                return -1 !== t.search(/,|\s/)
            })));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
        return (c = c.map((function(t, i) {
            var r = (1 === i ? !o : o) ? "height" : "width",
                s = !1;
            return t.reduce((function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
            }), []).map((function(t) {
                return function(t, e, n, i) {
                    var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +r[1],
                        s = r[2];
                    if (!o) return t;
                    if (0 === s.indexOf("%")) {
                        var a = void 0;
                        switch (s) {
                            case "%p":
                                a = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = i
                        }
                        return Ce(a)[e] / 100 * o
                    }
                    if ("vh" === s || "vw" === s) {
                        return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o
                    }
                    return o
                }(t, r, e, n)
            }))
        }))).forEach((function(t, e) {
            t.forEach((function(n, i) {
                ze(n) && (r[e] += n * ("-" === t[i - 1] ? -1 : 1))
            }))
        })), r
    }
    var sn = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = e.split("-")[1];
                        if (i) {
                            var r = t.offsets,
                                o = r.reference,
                                s = r.popper,
                                a = -1 !== ["bottom", "top"].indexOf(n),
                                l = a ? "left" : "top",
                                c = a ? "width" : "height",
                                u = {
                                    start: Oe({}, l, o[l]),
                                    end: Oe({}, l, o[l] + o[c] - s[c])
                                };
                            t.offsets.popper = Le({}, s, u[i])
                        }
                        return t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.offset,
                            i = t.placement,
                            r = t.offsets,
                            o = r.popper,
                            s = r.reference,
                            a = i.split("-")[0],
                            l = void 0;
                        return l = ze(+n) ? [+n, 0] : on(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), t.popper = o, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.boundariesElement || be(t.instance.popper);
                        t.instance.reference === n && (n = be(n));
                        var i = Xe("transform"),
                            r = t.instance.popper.style,
                            o = r.top,
                            s = r.left,
                            a = r[i];
                        r.top = "", r.left = "", r[i] = "";
                        var l = He(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
                        r.top = o, r.left = s, r[i] = a, e.boundaries = l;
                        var c = e.priority,
                            u = t.offsets.popper,
                            f = {
                                primary: function(t) {
                                    var n = u[t];
                                    return u[t] < l[t] && !e.escapeWithReference && (n = Math.max(u[t], l[t])), Oe({}, t, n)
                                },
                                secondary: function(t) {
                                    var n = "right" === t ? "left" : "top",
                                        i = u[n];
                                    return u[t] > l[t] && !e.escapeWithReference && (i = Math.min(u[n], l[t] - ("right" === t ? u.width : u.height))), Oe({}, n, i)
                                }
                            };
                        return c.forEach((function(t) {
                            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                            u = Le({}, u, f[e](t))
                        })), t.offsets.popper = u, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.offsets,
                            n = e.popper,
                            i = e.reference,
                            r = t.placement.split("-")[0],
                            o = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(r),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < o(i[l]) && (t.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[a]) && (t.offsets.popper[l] = o(i[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(t, e) {
                        var n;
                        if (!Je(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                        var r = t.placement.split("-")[0],
                            o = t.offsets,
                            s = o.popper,
                            a = o.reference,
                            l = -1 !== ["left", "right"].indexOf(r),
                            c = l ? "height" : "width",
                            u = l ? "Top" : "Left",
                            f = u.toLowerCase(),
                            h = l ? "left" : "top",
                            d = l ? "bottom" : "right",
                            p = xe(i)[c];
                        a[d] - p < s[f] && (t.offsets.popper[f] -= s[f] - (a[d] - p)), a[f] + p > s[d] && (t.offsets.popper[f] += a[f] + p - s[d]), t.offsets.popper = Ce(t.offsets.popper);
                        var g = a[f] + a[c] / 2 - p / 2,
                            m = he(t.instance.popper),
                            _ = parseFloat(m["margin" + u], 10),
                            v = parseFloat(m["border" + u + "Width"], 10),
                            b = g - t.offsets.popper[f] - _ - v;
                        return b = Math.max(Math.min(s[c] - p, b), 0), t.arrowElement = i, t.offsets.arrow = (Oe(n = {}, f, Math.round(b)), Oe(n, h, ""), n), t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(t, e) {
                        if (Be(t.instance.modifiers, "inner")) return t;
                        if (t.flipped && t.placement === t.originalPlacement) return t;
                        var n = He(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                            i = t.placement.split("-")[0],
                            r = Me(i),
                            o = t.placement.split("-")[1] || "",
                            s = [];
                        switch (e.behavior) {
                            case rn.FLIP:
                                s = [i, r];
                                break;
                            case rn.CLOCKWISE:
                                s = nn(i);
                                break;
                            case rn.COUNTERCLOCKWISE:
                                s = nn(i, !0);
                                break;
                            default:
                                s = e.behavior
                        }
                        return s.forEach((function(a, l) {
                            if (i !== a || s.length === l + 1) return t;
                            i = t.placement.split("-")[0], r = Me(i);
                            var c = t.offsets.popper,
                                u = t.offsets.reference,
                                f = Math.floor,
                                h = "left" === i && f(c.right) > f(u.left) || "right" === i && f(c.left) < f(u.right) || "top" === i && f(c.bottom) > f(u.top) || "bottom" === i && f(c.top) < f(u.bottom),
                                d = f(c.left) < f(n.left),
                                p = f(c.right) > f(n.right),
                                g = f(c.top) < f(n.top),
                                m = f(c.bottom) > f(n.bottom),
                                _ = "left" === i && d || "right" === i && p || "top" === i && g || "bottom" === i && m,
                                v = -1 !== ["top", "bottom"].indexOf(i),
                                b = !!e.flipVariations && (v && "start" === o && d || v && "end" === o && p || !v && "start" === o && g || !v && "end" === o && m),
                                E = !!e.flipVariationsByContent && (v && "start" === o && p || v && "end" === o && d || !v && "start" === o && m || !v && "end" === o && g),
                                y = b || E;
                            (h || _ || y) && (t.flipped = !0, (h || _) && (i = s[l + 1]), y && (o = function(t) {
                                return "end" === t ? "start" : "start" === t ? "end" : t
                            }(o)), t.placement = i + (o ? "-" + o : ""), t.offsets.popper = Le({}, t.offsets.popper, Ue(t.instance.popper, t.offsets.reference, t.placement)), t = Ye(t.instance.modifiers, t, "flip"))
                        })), t
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = t.offsets,
                            r = i.popper,
                            o = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), t.placement = Me(e), t.offsets.popper = Ce(r), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(t) {
                        if (!Je(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            n = Ve(t.instance.modifiers, (function(t) {
                                return "preventOverflow" === t.name
                            })).boundaries;
                        if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.x,
                            i = e.y,
                            r = t.offsets.popper,
                            o = Ve(t.instance.modifiers, (function(t) {
                                return "applyStyle" === t.name
                            })).gpuAcceleration;
                        void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s = void 0 !== o ? o : e.gpuAcceleration,
                            a = be(t.instance.popper),
                            l = Ne(a),
                            c = {
                                position: r.position
                            },
                            u = function(t, e) {
                                var n = t.offsets,
                                    i = n.popper,
                                    r = n.reference,
                                    o = Math.round,
                                    s = Math.floor,
                                    a = function(t) {
                                        return t
                                    },
                                    l = o(r.width),
                                    c = o(i.width),
                                    u = -1 !== ["left", "right"].indexOf(t.placement),
                                    f = -1 !== t.placement.indexOf("-"),
                                    h = e ? u || f || l % 2 == c % 2 ? o : s : a,
                                    d = e ? o : a;
                                return {
                                    left: h(l % 2 == 1 && c % 2 == 1 && !f && e ? i.left - 1 : i.left),
                                    top: d(i.top),
                                    bottom: d(i.bottom),
                                    right: h(i.right)
                                }
                            }(t, window.devicePixelRatio < 2 || !$e),
                            f = "bottom" === n ? "top" : "bottom",
                            h = "right" === i ? "left" : "right",
                            d = Xe("transform"),
                            p = void 0,
                            g = void 0;
                        if (g = "bottom" === f ? "HTML" === a.nodeName ? -a.clientHeight + u.bottom : -l.height + u.bottom : u.top, p = "right" === h ? "HTML" === a.nodeName ? -a.clientWidth + u.right : -l.width + u.right : u.left, s && d) c[d] = "translate3d(" + p + "px, " + g + "px, 0)", c[f] = 0, c[h] = 0, c.willChange = "transform";
                        else {
                            var m = "bottom" === f ? -1 : 1,
                                _ = "right" === h ? -1 : 1;
                            c[f] = g * m, c[h] = p * _, c.willChange = f + ", " + h
                        }
                        var v = {
                            "x-placement": t.placement
                        };
                        return t.attributes = Le({}, v, t.attributes), t.styles = Le({}, c, t.styles), t.arrowStyles = Le({}, t.offsets.arrow, t.arrowStyles), t
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(t) {
                        var e, n;
                        return Ze(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach((function(t) {
                            !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                        })), t.arrowElement && Object.keys(t.arrowStyles).length && Ze(t.arrowElement, t.arrowStyles), t
                    },
                    onLoad: function(t, e, n, i, r) {
                        var o = ke(r, e, t, n.positionFixed),
                            s = We(n.placement, o, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return e.setAttribute("x-placement", s), Ze(e, {
                            position: n.positionFixed ? "fixed" : "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        an = function() {
            function t(e, n) {
                var i = this,
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Ie(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = ue(this.update.bind(this)), this.options = Le({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Le({}, t.Defaults.modifiers, r.modifiers)).forEach((function(e) {
                    i.options.modifiers[e] = Le({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                })), this.modifiers = Object.keys(this.options.modifiers).map((function(t) {
                    return Le({
                        name: t
                    }, i.options.modifiers[t])
                })).sort((function(t, e) {
                    return t.order - e.order
                })), this.modifiers.forEach((function(t) {
                    t.enabled && fe(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                })), this.update();
                var o = this.options.eventsEnabled;
                o && this.enableEventListeners(), this.state.eventsEnabled = o
            }
            return Se(t, [{
                key: "update",
                value: function() {
                    return je.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return Ge.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return Qe.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return qe.call(this)
                }
            }]), t
        }();
    an.Utils = ("undefined" != typeof window ? window : global).PopperUtils, an.placements = tn, an.Defaults = sn;
    var ln = "dropdown",
        cn = "coreui.dropdown",
        un = "." + cn,
        fn = new RegExp("38|40|27"),
        hn = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        dn = window.CoreUIDefaults && window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : "c-",
        pn = {
            HIDE: "hide" + un,
            HIDDEN: "hidden" + un,
            SHOW: "show" + un,
            SHOWN: "shown" + un,
            CLICK: "click" + un,
            CLICK_DATA_API: "click" + un + ".data-api",
            KEYDOWN_DATA_API: "keydown" + un + ".data-api",
            KEYUP_DATA_API: "keyup" + un + ".data-api"
        },
        gn = {
            DISABLED: "disabled",
            SHOW: hn + "show",
            DROPUP: hn + "dropup",
            DROPRIGHT: hn + "dropright",
            DROPLEFT: hn + "dropleft",
            MENURIGHT: hn + "dropdown-menu-right",
            POSITION_STATIC: "position-static"
        },
        mn = {
            DATA_TOGGLE: '[data-toggle="' + hn + 'dropdown"]',
            FORM_CHILD: "." + hn + "dropdown form",
            MENU: "." + hn + "dropdown-menu",
            NAVBAR_NAV: "." + hn + "navbar-nav",
            HEADER_NAV: "." + dn + "header-nav",
            VISIBLE_ITEMS: "." + hn + "dropdown-menu ." + hn + "dropdown-item:not(.disabled):not(:disabled)"
        },
        _n = "top-start",
        vn = "top-end",
        bn = "bottom-start",
        En = "bottom-end",
        yn = "right-start",
        An = "left-start",
        wn = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Tn = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        Dn = function() {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._inHeader = this._detectHeader(), this._addEventListeners(), A.setData(t, cn, this)
            }
            var n = t.prototype;
            return n.toggle = function() {
                if (!this._element.disabled && !this._element.classList.contains(gn.DISABLED)) {
                    var e = t._getParentFromElement(this._element),
                        n = this._menu.classList.contains(gn.SHOW);
                    if (t._clearMenus(), !n) {
                        var i = {
                            relatedTarget: this._element
                        };
                        if (!K.trigger(e, pn.SHOW, i).defaultPrevented) {
                            if (!this._inNavbar && !this._inHeader) {
                                if ("undefined" == typeof an) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
                                var r = this._element;
                                "parent" === this._config.reference ? r = e : p(this._config.reference) && (r = this._config.reference, "undefined" != typeof this._config.reference.jquery && (r = this._config.reference[0])), "scrollParent" !== this._config.boundary && e.classList.add(gn.POSITION_STATIC), this._popper = new an(r, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && !_(nt.closest(e, mn.NAVBAR_NAV)).length && _(document.body.children).forEach((function(t) {
                                return K.on(t, "mouseover", null, (function() {}))
                            })), "ontouchstart" in document.documentElement && !_(nt.closest(e, mn.HEADER_NAV)).length && _(document.body.children).forEach((function(t) {
                                return K.on(t, "mouseover", null, (function() {}))
                            })), this._element.focus(), this._element.setAttribute("aria-expanded", !0), yt.toggleClass(this._menu, gn.SHOW), yt.toggleClass(e, gn.SHOW), K.trigger(e, pn.SHOWN, i)
                        }
                    }
                }
            }, n.show = function() {
                if (!(this._element.disabled || this._element.classList.contains(gn.DISABLED) || this._menu.classList.contains(gn.SHOW))) {
                    var e = t._getParentFromElement(this._element),
                        n = {
                            relatedTarget: this._element
                        };
                    K.trigger(e, pn.SHOW, n).defaultPrevented || (yt.toggleClass(this._menu, gn.SHOW), yt.toggleClass(e, gn.SHOW), K.trigger(e, pn.SHOWN, n))
                }
            }, n.hide = function() {
                if (!this._element.disabled && !this._element.classList.contains(gn.DISABLED) && this._menu.classList.contains(gn.SHOW)) {
                    var e = t._getParentFromElement(this._element),
                        n = {
                            relatedTarget: this._element
                        };
                    K.trigger(e, pn.HIDE, n).defaultPrevented || (yt.toggleClass(this._menu, gn.SHOW), yt.toggleClass(e, gn.SHOW), K.trigger(e, pn.HIDDEN, n))
                }
            }, n.dispose = function() {
                A.removeData(this._element, cn), K.off(this._element, un), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
            }, n.update = function() {
                this._inNavbar = this._detectNavbar(), this._inHeader = this._detectHeader(), null !== this._popper && this._popper.scheduleUpdate()
            }, n._addEventListeners = function() {
                var t = this;
                K.on(this._element, pn.CLICK, (function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                }))
            }, n._getConfig = function(t) {
                return t = r({}, this.constructor.Default, {}, yt.getDataAttributes(this._element), {}, t), m(ln, t, this.constructor.DefaultType), t
            }, n._getMenuElement = function() {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    e && (this._menu = nt.findOne(mn.MENU, e))
                }
                return this._menu
            }, n._getPlacement = function() {
                var t = this._element.parentNode,
                    e = bn;
                return t.classList.contains(gn.DROPUP) ? (e = _n, this._menu.classList.contains(gn.MENURIGHT) && (e = vn)) : t.classList.contains(gn.DROPRIGHT) ? e = yn : t.classList.contains(gn.DROPLEFT) ? e = An : this._menu.classList.contains(gn.MENURIGHT) && (e = En), e
            }, n._detectNavbar = function() {
                return Boolean(nt.closest(this._element, "." + hn + "navbar"))
            }, n._detectHeader = function() {
                return Boolean(nt.closest(this._element, "." + dn + "header"))
            }, n._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function(e) {
                    return e.offsets = r({}, e.offsets, {}, t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, n._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), t
            }, t._dropdownInterface = function(e, n) {
                var i = A.getData(e, cn);
                if (i || (i = new t(e, "object" == typeof n ? n : null)), "string" == typeof n) {
                    if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    t._dropdownInterface(this, e)
                }))
            }, t._clearMenus = function(e) {
                if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                    for (var n = _(nt.find(mn.DATA_TOGGLE)), i = 0, r = n.length; i < r; i++) {
                        var o = t._getParentFromElement(n[i]),
                            s = A.getData(n[i], cn),
                            a = {
                                relatedTarget: n[i]
                            };
                        if (e && "click" === e.type && (a.clickEvent = e), s) {
                            var l = s._menu;
                            if (o.classList.contains(gn.SHOW))
                                if (!(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && o.contains(e.target))) K.trigger(o, pn.HIDE, a).defaultPrevented || ("ontouchstart" in document.documentElement && _(document.body.children).forEach((function(t) {
                                    return K.off(t, "mouseover", null, (function() {}))
                                })), n[i].setAttribute("aria-expanded", "false"), l.classList.remove(gn.SHOW), o.classList.remove(gn.SHOW), K.trigger(o, pn.HIDDEN, a))
                        }
                    }
            }, t._getParentFromElement = function(t) {
                var e, n = f(t);
                return n && (e = nt.findOne(n)), e || t.parentNode
            }, t._dataApiKeydownHandler = function(e) {
                if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || nt.closest(e.target, mn.MENU))) : fn.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !this.classList.contains(gn.DISABLED))) {
                    var n = t._getParentFromElement(this),
                        i = n.classList.contains(gn.SHOW);
                    if (!i || i && (27 === e.which || 32 === e.which)) return 27 === e.which && K.trigger(nt.findOne(mn.DATA_TOGGLE, n), "focus"), void t._clearMenus();
                    var r = _(nt.find(mn.VISIBLE_ITEMS, n));
                    if (r.length) {
                        var o = r.indexOf(e.target);
                        38 === e.which && o > 0 && o--, 40 === e.which && o < r.length - 1 && o++, o < 0 && (o = 0), r[o].focus()
                    }
                }
            }, t._getInstance = function(t) {
                return A.getData(t, cn)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return wn
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Tn
                }
            }]), t
        }();
    if (K.on(document, pn.KEYDOWN_DATA_API, mn.DATA_TOGGLE, Dn._dataApiKeydownHandler), K.on(document, pn.KEYDOWN_DATA_API, mn.MENU, Dn._dataApiKeydownHandler), K.on(document, pn.CLICK_DATA_API, Dn._clearMenus), K.on(document, pn.KEYUP_DATA_API, Dn._clearMenus), K.on(document, pn.CLICK_DATA_API, mn.DATA_TOGGLE, (function(t) {
        t.preventDefault(), t.stopPropagation(), Dn._dropdownInterface(this, "toggle")
    })), K.on(document, pn.CLICK_DATA_API, mn.FORM_CHILD, (function(t) {
        return t.stopPropagation()
    })), "undefined" != typeof c) {
        var In = c.fn[ln];
        c.fn[ln] = Dn._jQueryInterface, c.fn[ln].Constructor = Dn, c.fn[ln].noConflict = function() {
            return c.fn[ln] = In, Dn._jQueryInterface
        }
    }
    var Sn = "coreui.modal",
        On = "." + Sn,
        Ln = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        Cn = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        Nn = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        Pn = {
            HIDE: "hide" + On,
            HIDDEN: "hidden" + On,
            SHOW: "show" + On,
            SHOWN: "shown" + On,
            FOCUSIN: "focusin" + On,
            RESIZE: "resize" + On,
            CLICK_DISMISS: "click.dismiss" + On,
            KEYDOWN_DISMISS: "keydown.dismiss" + On,
            MOUSEUP_DISMISS: "mouseup.dismiss" + On,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + On,
            CLICK_DATA_API: "click" + On + ".data-api"
        },
        Rn = {
            SCROLLABLE: Ln + "modal-dialog-scrollable",
            SCROLLBAR_MEASURER: Ln + "modal-scrollbar-measure",
            BACKDROP: Ln + "modal-backdrop",
            OPEN: Ln + "modal-open",
            FADE: Ln + "fade",
            SHOW: Ln + "show"
        },
        Hn = {
            DIALOG: "." + Ln + "modal-dialog",
            MODAL_BODY: "." + Ln + "modal-body",
            DATA_TOGGLE: '[data-toggle="' + Ln + 'modal"]',
            DATA_DISMISS: '[data-dismiss="' + Ln + 'modal"]',
            FIXED_CONTENT: "." + Ln + "fixed-top, ." + Ln + "fixed-bottom, ." + Ln + "is-fixed, ." + Ln + "sticky-top",
            STICKY_CONTENT: "." + Ln + "sticky-top"
        },
        Wn = function() {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = nt.findOne(Hn.DIALOG, t), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0, A.setData(t, Sn, this)
            }
            var n = t.prototype;
            return n.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function(t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    this._element.classList.contains(Rn.FADE) && (this._isTransitioning = !0);
                    var n = K.trigger(this._element, Pn.SHOW, {
                        relatedTarget: t
                    });
                    this._isShown || n.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), K.on(this._element, Pn.CLICK_DISMISS, Hn.DATA_DISMISS, (function(t) {
                        return e.hide(t)
                    })), K.on(this._dialog, Pn.MOUSEDOWN_DISMISS, (function() {
                        K.one(e._element, Pn.MOUSEUP_DISMISS, (function(t) {
                            t.target === e._element && (e._ignoreBackdropClick = !0)
                        }))
                    })), this._showBackdrop((function() {
                        return e._showElement(t)
                    })))
                }
            }, n.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = K.trigger(this._element, Pn.HIDE);
                    if (this._isShown && !n.defaultPrevented) {
                        this._isShown = !1;
                        var i = this._element.classList.contains(Rn.FADE);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), K.off(document, Pn.FOCUSIN), this._element.classList.remove(Rn.SHOW), K.off(this._element, Pn.CLICK_DISMISS), K.off(this._dialog, Pn.MOUSEDOWN_DISMISS), i) {
                            var r = h(this._element);
                            K.one(this._element, l, (function(t) {
                                return e._hideModal(t)
                            })), g(this._element, r)
                        } else this._hideModal()
                    }
                }
            }, n.dispose = function() {
                [window, this._element, this._dialog].forEach((function(t) {
                    return K.off(t, On)
                })), K.off(document, Pn.FOCUSIN), A.removeData(this._element, Sn), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function() {
                this._adjustDialog()
            }, n._getConfig = function(t) {
                return t = r({}, Cn, {}, t), m("modal", t, Nn), t
            }, n._showElement = function(t) {
                var e = this,
                    n = this._element.classList.contains(Rn.FADE);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._dialog.classList.contains(Rn.SCROLLABLE) ? nt.findOne(Hn.MODAL_BODY, this._dialog).scrollTop = 0 : this._element.scrollTop = 0, n && E(this._element), this._element.classList.add(Rn.SHOW), this._config.focus && this._enforceFocus();
                var i = function() {
                    e._config.focus && e._element.focus(), e._isTransitioning = !1, K.trigger(e._element, Pn.SHOWN, {
                        relatedTarget: t
                    })
                };
                if (n) {
                    var r = h(this._dialog);
                    K.one(this._dialog, l, i), g(this._dialog, r)
                } else i()
            }, n._enforceFocus = function() {
                var t = this;
                K.off(document, Pn.FOCUSIN), K.on(document, Pn.FOCUSIN, (function(e) {
                    document === e.target || t._element === e.target || t._element.contains(e.target) || t._element.focus()
                }))
            }, n._setEscapeEvent = function() {
                var t = this;
                this._isShown && this._config.keyboard ? K.on(this._element, Pn.KEYDOWN_DISMISS, (function(e) {
                    27 === e.which && (e.preventDefault(), t.hide())
                })) : this._isShown || K.off(this._element, Pn.KEYDOWN_DISMISS)
            }, n._setResizeEvent = function() {
                var t = this;
                this._isShown ? K.on(window, Pn.RESIZE, (function(e) {
                    return t.handleUpdate(e)
                })) : K.off(window, Pn.RESIZE)
            }, n._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop((function() {
                    document.body.classList.remove(Rn.OPEN), t._resetAdjustments(), t._resetScrollbar(), K.trigger(t._element, Pn.HIDDEN)
                }))
            }, n._removeBackdrop = function() {
                this._backdrop && (this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null)
            }, n._showBackdrop = function(t) {
                var e = this,
                    n = this._element.classList.contains(Rn.FADE) ? Rn.FADE : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = Rn.BACKDROP, n && this._backdrop.classList.add(n), document.body.appendChild(this._backdrop), K.on(this._element, Pn.CLICK_DISMISS, (function(t) {
                        e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                    })), n && E(this._backdrop), this._backdrop.classList.add(Rn.SHOW), !t) return;
                    if (!n) return void t();
                    var i = h(this._backdrop);
                    K.one(this._backdrop, l, t), g(this._backdrop, i)
                } else if (!this._isShown && this._backdrop) {
                    this._backdrop.classList.remove(Rn.SHOW);
                    var r = function() {
                        e._removeBackdrop(), t && t()
                    };
                    if (this._element.classList.contains(Rn.FADE)) {
                        var o = h(this._backdrop);
                        K.one(this._backdrop, l, r), g(this._backdrop, o)
                    } else r()
                } else t && t()
            }, n._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function() {
                var t = this;
                if (this._isBodyOverflowing) {
                    _(nt.find(Hn.FIXED_CONTENT)).forEach((function(e) {
                        var n = e.style.paddingRight,
                            i = window.getComputedStyle(e)["padding-right"];
                        yt.setDataAttribute(e, "padding-right", n), e.style.paddingRight = parseFloat(i) + t._scrollbarWidth + "px"
                    })), _(nt.find(Hn.STICKY_CONTENT)).forEach((function(e) {
                        var n = e.style.marginRight,
                            i = window.getComputedStyle(e)["margin-right"];
                        yt.setDataAttribute(e, "margin-right", n), e.style.marginRight = parseFloat(i) - t._scrollbarWidth + "px"
                    }));
                    var e = document.body.style.paddingRight,
                        n = window.getComputedStyle(document.body)["padding-right"];
                    yt.setDataAttribute(document.body, "padding-right", e), document.body.style.paddingRight = parseFloat(n) + this._scrollbarWidth + "px"
                }
                document.body.classList.add(Rn.OPEN)
            }, n._resetScrollbar = function() {
                _(nt.find(Hn.FIXED_CONTENT)).forEach((function(t) {
                    var e = yt.getDataAttribute(t, "padding-right");
                    "undefined" != typeof e && (yt.removeDataAttribute(t, "padding-right"), t.style.paddingRight = e)
                })), _(nt.find("" + Hn.STICKY_CONTENT)).forEach((function(t) {
                    var e = yt.getDataAttribute(t, "margin-right");
                    "undefined" != typeof e && (yt.removeDataAttribute(t, "margin-right"), t.style.marginRight = e)
                }));
                var t = yt.getDataAttribute(document.body, "padding-right");
                "undefined" == typeof t ? document.body.style.paddingRight = "" : (yt.removeDataAttribute(document.body, "padding-right"), document.body.style.paddingRight = t)
            }, n._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = Rn.SCROLLBAR_MEASURER, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function(e, n) {
                return this.each((function() {
                    var i = A.getData(this, Sn),
                        o = r({}, Cn, {}, yt.getDataAttributes(this), {}, "object" == typeof e && e ? e : {});
                    if (i || (i = new t(this, o)), "string" == typeof e) {
                        if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e](n)
                    } else o.show && i.show(n)
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, Sn)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Cn
                }
            }]), t
        }();
    if (K.on(document, Pn.CLICK_DATA_API, Hn.DATA_TOGGLE, (function(t) {
        var e, n = this,
            i = f(this);
        i && (e = nt.findOne(i));
        var o = A.getData(e, Sn) ? "toggle" : r({}, yt.getDataAttributes(e), {}, yt.getDataAttributes(this));
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault(), K.one(e, Pn.SHOW, (function(t) {
            t.defaultPrevented || K.one(e, Pn.HIDDEN, (function() {
                v(n) && n.focus()
            }))
        }));
        var s = A.getData(e, Sn);
        s || (s = new Wn(e, o)), s.show(this)
    })), "undefined" != typeof c) {
        var kn = c.fn.modal;
        c.fn.modal = Wn._jQueryInterface, c.fn.modal.Constructor = Wn, c.fn.modal.noConflict = function() {
            return c.fn.modal = kn, Wn._jQueryInterface
        }
    }
    var xn = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Mn = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Un = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i,
        Vn = function(t, e) {
            var n = t.nodeName.toLowerCase();
            if (-1 !== e.indexOf(n)) return -1 === xn.indexOf(n) || Boolean(t.nodeValue.match(Mn) || t.nodeValue.match(Un));
            for (var i = e.filter((function(t) {
                return t instanceof RegExp
            })), r = 0, o = i.length; r < o; r++)
                if (n.match(i[r])) return !0;
            return !1
        },
        Yn = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        };

    function jn(t, e, n) {
        if (!t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var i = (new window.DOMParser).parseFromString(t, "text/html"), r = Object.keys(e), o = _(i.body.querySelectorAll("*")), s = function(t, n) {
            var i = o[t],
                s = i.nodeName.toLowerCase();
            if (-1 === r.indexOf(s)) return i.parentNode.removeChild(i), "continue";
            var a = _(i.attributes),
                l = [].concat(e["*"] || [], e[s] || []);
            a.forEach((function(t) {
                Vn(t, l) || i.removeAttribute(t.nodeName)
            }))
        }, a = 0, l = o.length; a < l; a++) s(a);
        return i.body.innerHTML
    }
    var Bn = "tooltip",
        Xn = ".coreui.tooltip",
        Gn = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        Fn = Gn + "bs-tooltip",
        Kn = new RegExp("(^|\\s)" + Fn + "\\S+", "g"),
        Qn = ["sanitize", "whiteList", "sanitizeFn"],
        qn = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        zn = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Zn = {
            animation: !0,
            template: '<div class="' + Gn + 'tooltip" role="tooltip">\n               <div class="' + Gn + 'tooltip-arrow"></div>\n               <div class="' + Gn + 'tooltip-inner"></div>\n             </div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Yn
        },
        $n = "show",
        Jn = "out",
        ti = {
            HIDE: "hide" + Xn,
            HIDDEN: "hidden" + Xn,
            SHOW: "show" + Xn,
            SHOWN: "shown" + Xn,
            INSERTED: "inserted" + Xn,
            CLICK: "click" + Xn,
            FOCUSIN: "focusin" + Xn,
            FOCUSOUT: "focusout" + Xn,
            MOUSEENTER: "mouseenter" + Xn,
            MOUSELEAVE: "mouseleave" + Xn
        },
        ei = {
            FADE: Gn + "fade",
            SHOW: Gn + "show"
        },
        ni = {
            TOOLTIP_INNER: "." + Gn + "tooltip-inner",
            TOOLTIP_ARROW: "." + Gn + "tooltip-arrow"
        },
        ii = "hover",
        ri = "focus",
        oi = "click",
        si = "manual",
        ai = function() {
            function t(t, e) {
                if ("undefined" == typeof an) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners(), A.setData(t, this.constructor.DATA_KEY, this)
            }
            var n = t.prototype;
            return n.enable = function() {
                this._isEnabled = !0
            }, n.disable = function() {
                this._isEnabled = !1
            }, n.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, n.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = A.getData(t.delegateTarget, e);
                        n || (n = new this.constructor(t.delegateTarget, this._getDelegateConfig()), A.setData(t.delegateTarget, e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (this.getTipElement().classList.contains(ei.SHOW)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, n.dispose = function() {
                clearTimeout(this._timeout), A.removeData(this.element, this.constructor.DATA_KEY), K.off(this.element, this.constructor.EVENT_KEY), K.off(nt.closest(this.element, ".modal"), "hide.bs.modal"), this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, n.show = function() {
                var t = this;
                if ("none" === this.element.style.display) throw new Error("Please use show on visible elements");
                if (this.isWithContent() && this._isEnabled) {
                    var e = K.trigger(this.element, this.constructor.Event.SHOW),
                        n = function t(e) {
                            if (!document.documentElement.attachShadow) return null;
                            if ("function" == typeof e.getRootNode) {
                                var n = e.getRootNode();
                                return n instanceof ShadowRoot ? n : null
                            }
                            return e instanceof ShadowRoot ? e : e.parentNode ? t(e.parentNode) : null
                        }(this.element),
                        i = null === n ? this.element.ownerDocument.documentElement.contains(this.element) : n.contains(this.element);
                    if (e.defaultPrevented || !i) return;
                    var r = this.getTipElement(),
                        o = u(this.constructor.NAME);
                    r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && r.classList.add(ei.FADE);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var c = this._getContainer();
                    A.setData(r, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || c.appendChild(r), K.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new an(this.element, r, {
                        placement: a,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: ni.TOOLTIP_ARROW
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(e) {
                            e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                        },
                        onUpdate: function(e) {
                            return t._handlePopperPlacementChange(e)
                        }
                    }), r.classList.add(ei.SHOW), "ontouchstart" in document.documentElement && _(document.body.children).forEach((function(t) {
                        K.on(t, "mouseover", (function() {}))
                    }));
                    var f = function() {
                        t.config.animation && t._fixTransition();
                        var e = t._hoverState;
                        t._hoverState = null, K.trigger(t.element, t.constructor.Event.SHOWN), e === Jn && t._leave(null, t)
                    };
                    if (this.tip.classList.contains(ei.FADE)) {
                        var d = h(this.tip);
                        K.one(this.tip, l, f), g(this.tip, d)
                    } else f()
                }
            }, n.hide = function(t) {
                var e = this,
                    n = this.getTipElement(),
                    i = function() {
                        e._hoverState !== $n && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), K.trigger(e.element, e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                    };
                if (!K.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
                    if (n.classList.remove(ei.SHOW), "ontouchstart" in document.documentElement && _(document.body.children).forEach((function(t) {
                        return K.off(t, "mouseover", b)
                    })), this._activeTrigger[oi] = !1, this._activeTrigger[ri] = !1, this._activeTrigger[ii] = !1, this.tip.classList.contains(ei.FADE)) {
                        var r = h(n);
                        K.one(n, l, i), g(n, r)
                    } else i();
                    this._hoverState = ""
                }
            }, n.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, n.isWithContent = function() {
                return Boolean(this.getTitle())
            }, n.addAttachmentClass = function(t) {
                this.getTipElement().classList.add(Fn + "-" + t)
            }, n.getTipElement = function() {
                if (this.tip) return this.tip;
                var t = document.createElement("div");
                return t.innerHTML = this.config.template, this.tip = t.children[0], this.tip
            }, n.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(nt.findOne(ni.TOOLTIP_INNER, t), this.getTitle()), t.classList.remove(ei.FADE), t.classList.remove(ei.SHOW)
            }, n.setElementContent = function(t, e) {
                if (null !== t) return "object" == typeof e && (e.nodeType || e.jquery) ? (e.jquery && (e = e[0]), void(this.config.html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.innerText = e.textContent)) : void(this.config.html ? (this.config.sanitize && (e = jn(e, this.config.whiteList, this.config.sanitizeFn)), t.innerHTML = e) : t.innerText = e)
            }, n.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, n._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function(e) {
                    return e.offsets = r({}, e.offsets, {}, t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, n._getContainer = function() {
                return !1 === this.config.container ? document.body : p(this.config.container) ? this.config.container : nt.findOne(this.config.container)
            }, n._getAttachment = function(t) {
                return zn[t.toUpperCase()]
            }, n._setListeners = function() {
                var t = this;
                this.config.trigger.split(" ").forEach((function(e) {
                    if ("click" === e) K.on(t.element, t.constructor.Event.CLICK, t.config.selector, (function(e) {
                        return t.toggle(e)
                    }));
                    else if (e !== si) {
                        var n = e === ii ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            i = e === ii ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        K.on(t.element, n, t.config.selector, (function(e) {
                            return t._enter(e)
                        })), K.on(t.element, i, t.config.selector, (function(e) {
                            return t._leave(e)
                        }))
                    }
                })), K.on(nt.closest(this.element, ".modal"), "hide.bs.modal", (function() {
                    t.element && t.hide()
                })), this.config.selector ? this.config = r({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, n._fixTitle = function() {
                if (this.element) {
                    var t = typeof this.element.getAttribute("data-original-title");
                    (this.element.getAttribute("title") || "string" !== t) && (this.element.dataset.originalTitle = this.element.getAttribute("title") || "", this.element.setAttribute("title", ""))
                }
            }, n._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || A.getData(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), A.setData(t.delegateTarget, n, e)), t && (e._activeTrigger["focusin" === t.type ? ri : ii] = !0), e.getTipElement().classList.contains(ei.SHOW) || e._hoverState === $n ? e._hoverState = $n : (clearTimeout(e._timeout), e._hoverState = $n, e.config.delay && e.config.delay.show ? e._timeout = setTimeout((function() {
                    e._hoverState === $n && e.show()
                }), e.config.delay.show) : e.show())
            }, n._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || A.getData(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), A.setData(t.delegateTarget, n, e)), t && (e._activeTrigger["focusout" === t.type ? ri : ii] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = Jn, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout((function() {
                    e._hoverState === Jn && e.hide()
                }), e.config.delay.hide) : e.hide())
            }, n._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, n._getConfig = function(t) {
                var e = yt.getDataAttributes(this.element);
                return Object.keys(e).forEach((function(t) {
                    -1 !== Qn.indexOf(t) && delete e[t]
                })), t && "object" == typeof t.container && t.container.jquery && (t.container = t.container[0]), "number" == typeof(t = r({}, this.constructor.Default, {}, e, {}, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), m(Bn, t, this.constructor.DefaultType), t.sanitize && (t.template = jn(t.template, t.whiteList, t.sanitizeFn)), t
            }, n._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, n._cleanTipClass = function() {
                var t = this.getTipElement(),
                    e = t.getAttribute("class").match(Kn);
                null !== e && e.length && e.map((function(t) {
                    return t.trim()
                })).forEach((function(e) {
                    return t.classList.remove(e)
                }))
            }, n._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, n._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (t.classList.remove(ei.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    var n = A.getData(this, "coreui.tooltip"),
                        i = "object" == typeof e && e;
                    if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i)), "string" == typeof e)) {
                        if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, "coreui.tooltip")
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Zn
                }
            }, {
                key: "NAME",
                get: function() {
                    return Bn
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return "coreui.tooltip"
                }
            }, {
                key: "Event",
                get: function() {
                    return ti
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Xn
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return qn
                }
            }]), t
        }();
    if ("undefined" != typeof c) {
        var li = c.fn.tooltip;
        c.fn.tooltip = ai._jQueryInterface, c.fn.tooltip.Constructor = ai, c.fn.tooltip.noConflict = function() {
            return c.fn.tooltip = li, ai._jQueryInterface
        }
    }
    var ci = "popover",
        ui = "coreui.popover",
        fi = "." + ui,
        hi = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        di = hi + "bs-popover",
        pi = new RegExp("(^|\\s)" + di + "\\S+", "g"),
        gi = r({}, ai.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="' + hi + 'popover" role="tooltip">\n               <div class="' + hi + 'popover-arrow"></div>\n               <h3 class="' + hi + 'popover-header"></h3>\n               <div class="' + hi + 'popover-body"></div>\n             </div>'
        }),
        mi = r({}, ai.DefaultType, {
            content: "(string|element|function)"
        }),
        _i = {
            FADE: hi + "fade",
            SHOW: hi + "show"
        },
        vi = {
            TITLE: "." + hi + "popover-header",
            CONTENT: "." + hi + "popover-body"
        },
        bi = {
            HIDE: "hide" + fi,
            HIDDEN: "hidden" + fi,
            SHOW: "show" + fi,
            SHOWN: "shown" + fi,
            INSERTED: "inserted" + fi,
            CLICK: "click" + fi,
            FOCUSIN: "focusin" + fi,
            FOCUSOUT: "focusout" + fi,
            MOUSEENTER: "mouseenter" + fi,
            MOUSELEAVE: "mouseleave" + fi
        },
        Ei = function(t) {
            var n, i;

            function r() {
                return t.apply(this, arguments) || this
            }
            i = t, (n = r).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
            var o = r.prototype;
            return o.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function(t) {
                this.getTipElement().classList.add(di + "-" + t)
            }, o.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(nt.findOne(vi.TITLE, t), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(nt.findOne(vi.CONTENT, t), e), t.classList.remove(_i.FADE), t.classList.remove(_i.SHOW)
            }, o._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function() {
                var t = this.getTipElement(),
                    e = t.getAttribute("class").match(pi);
                null !== e && e.length > 0 && e.map((function(t) {
                    return t.trim()
                })).forEach((function(e) {
                    return t.classList.remove(e)
                }))
            }, r._jQueryInterface = function(t) {
                return this.each((function() {
                    var e = A.getData(this, ui),
                        n = "object" == typeof t ? t : null;
                    if ((e || !/dispose|hide/.test(t)) && (e || (e = new r(this, n), A.setData(this, ui, e)), "string" == typeof t)) {
                        if ("undefined" == typeof e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                }))
            }, r._getInstance = function(t) {
                return A.getData(t, ui)
            }, e(r, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return gi
                }
            }, {
                key: "NAME",
                get: function() {
                    return ci
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return ui
                }
            }, {
                key: "Event",
                get: function() {
                    return bi
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return fi
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return mi
                }
            }]), r
        }(ai);
    if ("undefined" != typeof c) {
        var yi = c.fn.popover;
        c.fn.popover = Ei._jQueryInterface, c.fn.popover.Constructor = Ei, c.fn.popover.noConflict = function() {
            return c.fn.popover = yi, Ei._jQueryInterface
        }
    }
    var Ai = "scrollspy",
        wi = "coreui.scrollspy",
        Ti = "." + wi,
        Di = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        Ii = {
            offset: 10,
            method: "auto",
            target: ""
        },
        Si = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        Oi = {
            ACTIVATE: "activate" + Ti,
            SCROLL: "scroll" + Ti,
            LOAD_DATA_API: "load" + Ti + ".data-api"
        },
        Li = {
            DROPDOWN_ITEM: Di + "dropdown-item",
            ACTIVE: Di + "active"
        },
        Ci = {
            DATA_SPY: '[data-spy="' + Di + 'scroll"]',
            NAV_LIST_GROUP: "." + Di + "nav, ." + Di + "list-group",
            NAV_LINKS: "." + Di + "nav-link",
            NAV_ITEMS: "." + Di + "nav-item",
            LIST_ITEMS: "." + Di + "list-group-item",
            DROPDOWN: "." + Di + "dropdown",
            DROPDOWN_TOGGLE: "." + Di + "dropdown-toggle"
        },
        Ni = "offset",
        Pi = "position",
        Ri = function() {
            function t(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + Ci.NAV_LINKS + "," + this._config.target + " " + Ci.LIST_ITEMS + "," + this._config.target + " ." + Li.DROPDOWN_ITEM, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, K.on(this._scrollElement, Oi.SCROLL, (function(t) {
                    return n._process(t)
                })), this.refresh(), this._process(), A.setData(t, wi, this)
            }
            var n = t.prototype;
            return n.refresh = function() {
                var t = this,
                    e = this._scrollElement === this._scrollElement.window ? Ni : Pi,
                    n = "auto" === this._config.method ? e : this._config.method,
                    i = n === Pi ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), _(nt.find(this._selector)).map((function(t) {
                    var e, r = f(t);
                    if (r && (e = nt.findOne(r)), e) {
                        var o = e.getBoundingClientRect();
                        if (o.width || o.height) return [yt[n](e).top + i, r]
                    }
                    return null
                })).filter((function(t) {
                    return t
                })).sort((function(t, e) {
                    return t[0] - e[0]
                })).forEach((function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                }))
            }, n.dispose = function() {
                A.removeData(this._element, wi), K.off(this._scrollElement, Ti), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function(t) {
                if ("string" != typeof(t = r({}, Ii, {}, "object" == typeof t && t ? t : {})).target) {
                    var e = t.target.id;
                    e || (e = u(Ai), t.target.id = e), t.target = "#" + e
                }
                return m(Ai, t, Si), t
            }, n._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), t >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (var r = this._offsets.length; r--;) {
                        this._activeTarget !== this._targets[r] && t >= this._offsets[r] && ("undefined" == typeof this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                    }
                }
            }, n._activate = function(t) {
                this._activeTarget = t, this._clear();
                var e = this._selector.split(",").map((function(e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    })),
                    n = nt.findOne(e.join(","));
                n.classList.contains(Li.DROPDOWN_ITEM) ? (nt.findOne(Ci.DROPDOWN_TOGGLE, nt.closest(n, Ci.DROPDOWN)).classList.add(Li.ACTIVE), n.classList.add(Li.ACTIVE)) : (n.classList.add(Li.ACTIVE), nt.parents(n, Ci.NAV_LIST_GROUP).forEach((function(t) {
                    nt.prev(t, Ci.NAV_LINKS + ", " + Ci.LIST_ITEMS).forEach((function(t) {
                        return t.classList.add(Li.ACTIVE)
                    })), nt.prev(t, Ci.NAV_ITEMS).forEach((function(t) {
                        nt.children(t, Ci.NAV_LINKS).forEach((function(t) {
                            return t.classList.add(Li.ACTIVE)
                        }))
                    }))
                }))), K.trigger(this._scrollElement, Oi.ACTIVATE, {
                    relatedTarget: t
                })
            }, n._clear = function() {
                _(nt.find(this._selector)).filter((function(t) {
                    return t.classList.contains(Li.ACTIVE)
                })).forEach((function(t) {
                    return t.classList.remove(Li.ACTIVE)
                }))
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    var n = A.getData(this, wi);
                    if (n || (n = new t(this, "object" == typeof e && e)), "string" == typeof e) {
                        if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, wi)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ii
                }
            }]), t
        }();
    if (K.on(window, Oi.LOAD_DATA_API, (function() {
        _(nt.find(Ci.DATA_SPY)).forEach((function(t) {
            return new Ri(t, yt.getDataAttributes(t))
        }))
    })), "undefined" != typeof c) {
        var Hi = c.fn[Ai];
        c.fn[Ai] = Ri._jQueryInterface, c.fn[Ai].Constructor = Ri, c.fn[Ai].noConflict = function() {
            return c.fn[Ai] = Hi, Ri._jQueryInterface
        }
    }
    /*!
     * perfect-scrollbar v1.4.0
     * (c) 2018 Hyunje Jun
     * @license MIT
     */
    function Wi(t) {
        return getComputedStyle(t)
    }

    function ki(t, e) {
        for (var n in e) {
            var i = e[n];
            "number" == typeof i && (i += "px"), t.style[n] = i
        }
        return t
    }

    function xi(t) {
        var e = document.createElement("div");
        return e.className = t, e
    }
    var Mi = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);

    function Ui(t, e) {
        if (!Mi) throw new Error("No element matching method supported");
        return Mi.call(t, e)
    }

    function Vi(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
    }

    function Yi(t, e) {
        return Array.prototype.filter.call(t.children, (function(t) {
            return Ui(t, e)
        }))
    }
    var ji = {
            main: "ps",
            element: {
                thumb: function(t) {
                    return "ps__thumb-" + t
                },
                rail: function(t) {
                    return "ps__rail-" + t
                },
                consuming: "ps__child--consume"
            },
            state: {
                focus: "ps--focus",
                clicking: "ps--clicking",
                active: function(t) {
                    return "ps--active-" + t
                },
                scrolling: function(t) {
                    return "ps--scrolling-" + t
                }
            }
        },
        Bi = {
            x: null,
            y: null
        };

    function Xi(t, e) {
        var n = t.element.classList,
            i = ji.state.scrolling(e);
        n.contains(i) ? clearTimeout(Bi[e]) : n.add(i)
    }

    function Gi(t, e) {
        Bi[e] = setTimeout((function() {
            return t.isAlive && t.element.classList.remove(ji.state.scrolling(e))
        }), t.settings.scrollingThreshold)
    }
    var Fi = function(t) {
            this.element = t, this.handlers = {}
        },
        Ki = {
            isEmpty: {
                configurable: !0
            }
        };
    Fi.prototype.bind = function(t, e) {
        "undefined" == typeof this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, !1)
    }, Fi.prototype.unbind = function(t, e) {
        var n = this;
        this.handlers[t] = this.handlers[t].filter((function(i) {
            return !(!e || i === e) || (n.element.removeEventListener(t, i, !1), !1)
        }))
    }, Fi.prototype.unbindAll = function() {
        for (var t in this.handlers) this.unbind(t)
    }, Ki.isEmpty.get = function() {
        var t = this;
        return Object.keys(this.handlers).every((function(e) {
            return 0 === t.handlers[e].length
        }))
    }, Object.defineProperties(Fi.prototype, Ki);
    var Qi = function() {
        this.eventElements = []
    };

    function qi(t) {
        if ("function" == typeof window.CustomEvent) return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0), e
    }
    Qi.prototype.eventElement = function(t) {
        var e = this.eventElements.filter((function(e) {
            return e.element === t
        }))[0];
        return e || (e = new Fi(t), this.eventElements.push(e)), e
    }, Qi.prototype.bind = function(t, e, n) {
        this.eventElement(t).bind(e, n)
    }, Qi.prototype.unbind = function(t, e, n) {
        var i = this.eventElement(t);
        i.unbind(e, n), i.isEmpty && this.eventElements.splice(this.eventElements.indexOf(i), 1)
    }, Qi.prototype.unbindAll = function() {
        this.eventElements.forEach((function(t) {
            return t.unbindAll()
        })), this.eventElements = []
    }, Qi.prototype.once = function(t, e, n) {
        var i = this.eventElement(t),
            r = function(t) {
                i.unbind(e, r), n(t)
            };
        i.bind(e, r)
    };
    var zi = function(t, e, n, i, r) {
        var o;
        if (void 0 === i && (i = !0), void 0 === r && (r = !1), "top" === e) o = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
        else {
            if ("left" !== e) throw new Error("A proper axis should be provided");
            o = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
        }! function(t, e, n, i, r) {
            var o = n[0],
                s = n[1],
                a = n[2],
                l = n[3],
                c = n[4],
                u = n[5];
            void 0 === i && (i = !0);
            void 0 === r && (r = !1);
            var f = t.element;
            t.reach[l] = null, f[a] < 1 && (t.reach[l] = "start");
            f[a] > t[o] - t[s] - 1 && (t.reach[l] = "end");
            e && (f.dispatchEvent(qi("ps-scroll-" + l)), e < 0 ? f.dispatchEvent(qi("ps-scroll-" + c)) : e > 0 && f.dispatchEvent(qi("ps-scroll-" + u)), i && function(t, e) {
                Xi(t, e), Gi(t, e)
            }(t, l));
            t.reach[l] && (e || r) && f.dispatchEvent(qi("ps-" + l + "-reach-" + t.reach[l]))
        }(t, n, o, i, r)
    };

    function Zi(t) {
        return parseInt(t, 10) || 0
    }
    var $i = {
            isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
            isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
        },
        Ji = function(t) {
            var e = t.element,
                n = Math.floor(e.scrollTop);
            t.containerWidth = e.clientWidth, t.containerHeight = e.clientHeight, t.contentWidth = e.scrollWidth, t.contentHeight = e.scrollHeight, e.contains(t.scrollbarXRail) || (Yi(e, ji.element.rail("x")).forEach((function(t) {
                return Vi(t)
            })), e.appendChild(t.scrollbarXRail)), e.contains(t.scrollbarYRail) || (Yi(e, ji.element.rail("y")).forEach((function(t) {
                return Vi(t)
            })), e.appendChild(t.scrollbarYRail)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.railXRatio = t.containerWidth / t.railXWidth, t.scrollbarXWidth = tr(t, Zi(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = Zi((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.railYRatio = t.containerHeight / t.railYHeight, t.scrollbarYHeight = tr(t, Zi(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = Zi(n * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1, t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
                function(t, e) {
                    var n = {
                            width: e.railXWidth
                        },
                        i = Math.floor(t.scrollTop);
                    e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft;
                    e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - i : n.top = e.scrollbarXTop + i;
                    ki(e.scrollbarXRail, n);
                    var r = {
                        top: i,
                        height: e.railYHeight
                    };
                    e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft;
                    ki(e.scrollbarYRail, r), ki(e.scrollbarX, {
                        left: e.scrollbarXLeft,
                        width: e.scrollbarXWidth - e.railBorderXWidth
                    }), ki(e.scrollbarY, {
                        top: e.scrollbarYTop,
                        height: e.scrollbarYHeight - e.railBorderYWidth
                    })
                }(e, t), t.scrollbarXActive ? e.classList.add(ji.state.active("x")) : (e.classList.remove(ji.state.active("x")), t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, e.scrollLeft = 0), t.scrollbarYActive ? e.classList.add(ji.state.active("y")) : (e.classList.remove(ji.state.active("y")), t.scrollbarYHeight = 0, t.scrollbarYTop = 0, e.scrollTop = 0)
        };

    function tr(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
    }

    function er(t, e) {
        var n = e[0],
            i = e[1],
            r = e[2],
            o = e[3],
            s = e[4],
            a = e[5],
            l = e[6],
            c = e[7],
            u = e[8],
            f = t.element,
            h = null,
            d = null,
            p = null;

        function g(e) {
            f[l] = h + p * (e[r] - d), Xi(t, c), Ji(t), e.stopPropagation(), e.preventDefault()
        }

        function m() {
            Gi(t, c), t[u].classList.remove(ji.state.clicking), t.event.unbind(t.ownerDocument, "mousemove", g)
        }
        t.event.bind(t[s], "mousedown", (function(e) {
            h = f[l], d = e[r], p = (t[i] - t[n]) / (t[o] - t[a]), t.event.bind(t.ownerDocument, "mousemove", g), t.event.once(t.ownerDocument, "mouseup", m), t[u].classList.add(ji.state.clicking), e.stopPropagation(), e.preventDefault()
        }))
    }
    var nr = {
            "click-rail": function(t) {
                t.event.bind(t.scrollbarY, "mousedown", (function(t) {
                    return t.stopPropagation()
                })), t.event.bind(t.scrollbarYRail, "mousedown", (function(e) {
                    var n = e.pageY - window.pageYOffset - t.scrollbarYRail.getBoundingClientRect().top > t.scrollbarYTop ? 1 : -1;
                    t.element.scrollTop += n * t.containerHeight, Ji(t), e.stopPropagation()
                })), t.event.bind(t.scrollbarX, "mousedown", (function(t) {
                    return t.stopPropagation()
                })), t.event.bind(t.scrollbarXRail, "mousedown", (function(e) {
                    var n = e.pageX - window.pageXOffset - t.scrollbarXRail.getBoundingClientRect().left > t.scrollbarXLeft ? 1 : -1;
                    t.element.scrollLeft += n * t.containerWidth, Ji(t), e.stopPropagation()
                }))
            },
            "drag-thumb": function(t) {
                er(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]), er(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"])
            },
            keyboard: function(t) {
                var e = t.element;
                t.event.bind(t.ownerDocument, "keydown", (function(n) {
                    if (!(n.isDefaultPrevented && n.isDefaultPrevented() || n.defaultPrevented) && (Ui(e, ":hover") || Ui(t.scrollbarX, ":focus") || Ui(t.scrollbarY, ":focus"))) {
                        var i, r = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                        if (r) {
                            if ("IFRAME" === r.tagName) r = r.contentDocument.activeElement;
                            else
                                for (; r.shadowRoot;) r = r.shadowRoot.activeElement;
                            if (Ui(i = r, "input,[contenteditable]") || Ui(i, "select,[contenteditable]") || Ui(i, "textarea,[contenteditable]") || Ui(i, "button,[contenteditable]")) return
                        }
                        var o = 0,
                            s = 0;
                        switch (n.which) {
                            case 37:
                                o = n.metaKey ? -t.contentWidth : n.altKey ? -t.containerWidth : -30;
                                break;
                            case 38:
                                s = n.metaKey ? t.contentHeight : n.altKey ? t.containerHeight : 30;
                                break;
                            case 39:
                                o = n.metaKey ? t.contentWidth : n.altKey ? t.containerWidth : 30;
                                break;
                            case 40:
                                s = n.metaKey ? -t.contentHeight : n.altKey ? -t.containerHeight : -30;
                                break;
                            case 32:
                                s = n.shiftKey ? t.containerHeight : -t.containerHeight;
                                break;
                            case 33:
                                s = t.containerHeight;
                                break;
                            case 34:
                                s = -t.containerHeight;
                                break;
                            case 36:
                                s = t.contentHeight;
                                break;
                            case 35:
                                s = -t.contentHeight;
                                break;
                            default:
                                return
                        }
                        t.settings.suppressScrollX && 0 !== o || t.settings.suppressScrollY && 0 !== s || (e.scrollTop -= s, e.scrollLeft += o, Ji(t), function(n, i) {
                            var r = Math.floor(e.scrollTop);
                            if (0 === n) {
                                if (!t.scrollbarYActive) return !1;
                                if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && i < 0) return !t.settings.wheelPropagation
                            }
                            var o = e.scrollLeft;
                            if (0 === i) {
                                if (!t.scrollbarXActive) return !1;
                                if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                            }
                            return !0
                        }(o, s) && n.preventDefault())
                    }
                }))
            },
            wheel: function(t) {
                var e = t.element;

                function n(n) {
                    var i = function(t) {
                            var e = t.deltaX,
                                n = -1 * t.deltaY;
                            return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e != e && n != n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n]
                        }(n),
                        r = i[0],
                        o = i[1];
                    if (! function(t, n, i) {
                        if (!$i.isWebKit && e.querySelector("select:focus")) return !0;
                        if (!e.contains(t)) return !1;
                        for (var r = t; r && r !== e;) {
                            if (r.classList.contains(ji.element.consuming)) return !0;
                            var o = Wi(r);
                            if ([o.overflow, o.overflowX, o.overflowY].join("").match(/(scroll|auto)/)) {
                                var s = r.scrollHeight - r.clientHeight;
                                if (s > 0 && !(0 === r.scrollTop && i > 0 || r.scrollTop === s && i < 0)) return !0;
                                var a = r.scrollWidth - r.clientWidth;
                                if (a > 0 && !(0 === r.scrollLeft && n < 0 || r.scrollLeft === a && n > 0)) return !0
                            }
                            r = r.parentNode
                        }
                        return !1
                    }(n.target, r, o)) {
                        var s = !1;
                        t.settings.useBothWheelAxes ? t.scrollbarYActive && !t.scrollbarXActive ? (o ? e.scrollTop -= o * t.settings.wheelSpeed : e.scrollTop += r * t.settings.wheelSpeed, s = !0) : t.scrollbarXActive && !t.scrollbarYActive && (r ? e.scrollLeft += r * t.settings.wheelSpeed : e.scrollLeft -= o * t.settings.wheelSpeed, s = !0) : (e.scrollTop -= o * t.settings.wheelSpeed, e.scrollLeft += r * t.settings.wheelSpeed), Ji(t), (s = s || function(n, i) {
                            var r = Math.floor(e.scrollTop),
                                o = 0 === e.scrollTop,
                                s = r + e.offsetHeight === e.scrollHeight,
                                a = 0 === e.scrollLeft,
                                l = e.scrollLeft + e.offsetWidth === e.scrollWidth;
                            return !(Math.abs(i) > Math.abs(n) ? o || s : a || l) || !t.settings.wheelPropagation
                        }(r, o)) && !n.ctrlKey && (n.stopPropagation(), n.preventDefault())
                    }
                }
                "undefined" != typeof window.onwheel ? t.event.bind(e, "wheel", n) : "undefined" != typeof window.onmousewheel && t.event.bind(e, "mousewheel", n)
            },
            touch: function(t) {
                if ($i.supportsTouch || $i.supportsIePointer) {
                    var e = t.element,
                        n = {},
                        i = 0,
                        r = {},
                        o = null;
                    $i.supportsTouch ? (t.event.bind(e, "touchstart", c), t.event.bind(e, "touchmove", u), t.event.bind(e, "touchend", f)) : $i.supportsIePointer && (window.PointerEvent ? (t.event.bind(e, "pointerdown", c), t.event.bind(e, "pointermove", u), t.event.bind(e, "pointerup", f)) : window.MSPointerEvent && (t.event.bind(e, "MSPointerDown", c), t.event.bind(e, "MSPointerMove", u), t.event.bind(e, "MSPointerUp", f)))
                }

                function s(n, i) {
                    e.scrollTop -= i, e.scrollLeft -= n, Ji(t)
                }

                function a(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }

                function l(t) {
                    return (!t.pointerType || "pen" !== t.pointerType || 0 !== t.buttons) && (!(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
                }

                function c(t) {
                    if (l(t)) {
                        var e = a(t);
                        n.pageX = e.pageX, n.pageY = e.pageY, i = (new Date).getTime(), null !== o && clearInterval(o)
                    }
                }

                function u(o) {
                    if (l(o)) {
                        var c = a(o),
                            u = {
                                pageX: c.pageX,
                                pageY: c.pageY
                            },
                            f = u.pageX - n.pageX,
                            h = u.pageY - n.pageY;
                        if (function(t, n, i) {
                            if (!e.contains(t)) return !1;
                            for (var r = t; r && r !== e;) {
                                if (r.classList.contains(ji.element.consuming)) return !0;
                                var o = Wi(r);
                                if ([o.overflow, o.overflowX, o.overflowY].join("").match(/(scroll|auto)/)) {
                                    var s = r.scrollHeight - r.clientHeight;
                                    if (s > 0 && !(0 === r.scrollTop && i > 0 || r.scrollTop === s && i < 0)) return !0;
                                    var a = r.scrollLeft - r.clientWidth;
                                    if (a > 0 && !(0 === r.scrollLeft && n < 0 || r.scrollLeft === a && n > 0)) return !0
                                }
                                r = r.parentNode
                            }
                            return !1
                        }(o.target, f, h)) return;
                        s(f, h), n = u;
                        var d = (new Date).getTime(),
                            p = d - i;
                        p > 0 && (r.x = f / p, r.y = h / p, i = d),
                        function(n, i) {
                            var r = Math.floor(e.scrollTop),
                                o = e.scrollLeft,
                                s = Math.abs(n),
                                a = Math.abs(i);
                            if (a > s) {
                                if (i < 0 && r === t.contentHeight - t.containerHeight || i > 0 && 0 === r) return 0 === window.scrollY && i > 0 && $i.isChrome
                            } else if (s > a && (n < 0 && o === t.contentWidth - t.containerWidth || n > 0 && 0 === o)) return !0;
                            return !0
                        }(f, h) && o.preventDefault()
                    }
                }

                function f() {
                    t.settings.swipeEasing && (clearInterval(o), o = setInterval((function() {
                        t.isInitialized ? clearInterval(o) : r.x || r.y ? Math.abs(r.x) < .01 && Math.abs(r.y) < .01 ? clearInterval(o) : (s(30 * r.x, 30 * r.y), r.x *= .8, r.y *= .8) : clearInterval(o)
                    }), 10))
                }
            }
        },
        ir = function(t, e) {
            var n = this;
            if (void 0 === e && (e = {}), "string" == typeof t && (t = document.querySelector(t)), !t || !t.nodeName) throw new Error("no element is specified to initialize PerfectScrollbar");
            for (var i in this.element = t, t.classList.add(ji.main), this.settings = {
                handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollingThreshold: 1e3,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipeEasing: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !0,
                wheelSpeed: 1
            }, e) n.settings[i] = e[i];
            this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
            var r, o, s = function() {
                    return t.classList.add(ji.state.focus)
                },
                a = function() {
                    return t.classList.remove(ji.state.focus)
                };
            this.isRtl = "rtl" === Wi(t).direction, this.isNegativeScroll = (o = t.scrollLeft, t.scrollLeft = -1, r = t.scrollLeft < 0, t.scrollLeft = o, r), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new Qi, this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = xi(ji.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = xi(ji.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", s), this.event.bind(this.scrollbarX, "blur", a), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
            var l = Wi(this.scrollbarXRail);
            this.scrollbarXBottom = parseInt(l.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = Zi(l.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = Zi(l.borderLeftWidth) + Zi(l.borderRightWidth), ki(this.scrollbarXRail, {
                display: "block"
            }), this.railXMarginWidth = Zi(l.marginLeft) + Zi(l.marginRight), ki(this.scrollbarXRail, {
                display: ""
            }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = xi(ji.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = xi(ji.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", s), this.event.bind(this.scrollbarY, "blur", a), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
            var c = Wi(this.scrollbarYRail);
            this.scrollbarYRight = parseInt(c.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = Zi(c.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? function(t) {
                var e = Wi(t);
                return Zi(e.width) + Zi(e.paddingLeft) + Zi(e.paddingRight) + Zi(e.borderLeftWidth) + Zi(e.borderRightWidth)
            }(this.scrollbarY) : null, this.railBorderYWidth = Zi(c.borderTopWidth) + Zi(c.borderBottomWidth), ki(this.scrollbarYRail, {
                display: "block"
            }), this.railYMarginHeight = Zi(c.marginTop) + Zi(c.marginBottom), ki(this.scrollbarYRail, {
                display: ""
            }), this.railYHeight = null, this.railYRatio = null, this.reach = {
                x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
                y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
            }, this.isAlive = !0, this.settings.handlers.forEach((function(t) {
                return nr[t](n)
            })), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", (function(t) {
                return n.onScroll(t)
            })), Ji(this)
        };
    ir.prototype.update = function() {
        this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, ki(this.scrollbarXRail, {
            display: "block"
        }), ki(this.scrollbarYRail, {
            display: "block"
        }), this.railXMarginWidth = Zi(Wi(this.scrollbarXRail).marginLeft) + Zi(Wi(this.scrollbarXRail).marginRight), this.railYMarginHeight = Zi(Wi(this.scrollbarYRail).marginTop) + Zi(Wi(this.scrollbarYRail).marginBottom), ki(this.scrollbarXRail, {
            display: "none"
        }), ki(this.scrollbarYRail, {
            display: "none"
        }), Ji(this), zi(this, "top", 0, !1, !0), zi(this, "left", 0, !1, !0), ki(this.scrollbarXRail, {
            display: ""
        }), ki(this.scrollbarYRail, {
            display: ""
        }))
    }, ir.prototype.onScroll = function(t) {
        this.isAlive && (Ji(this), zi(this, "top", this.element.scrollTop - this.lastScrollTop), zi(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft)
    }, ir.prototype.destroy = function() {
        this.isAlive && (this.event.unbindAll(), Vi(this.scrollbarX), Vi(this.scrollbarY), Vi(this.scrollbarXRail), Vi(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1)
    }, ir.prototype.removePsClasses = function() {
        this.element.className = this.element.className.split(" ").filter((function(t) {
            return !t.match(/^ps([-_].+|)$/)
        })).join(" ")
    };
    var rr = function(t, e) {
            var n;
            (void 0 === e && (e = document.body), function(t) {
                return t.match(/^--.*/i)
            }(t) && Boolean(document.documentMode) && document.documentMode >= 10) ? n = function() {
                for (var t = {}, e = document.styleSheets, n = "", i = e.length - 1; i > -1; i--) {
                    for (var r = e[i].cssRules, o = r.length - 1; o > -1; o--)
                        if (".ie-custom-properties" === r[o].selectorText) {
                            n = r[o].cssText;
                            break
                        } if (n) break
                }
                return (n = n.substring(n.lastIndexOf("{") + 1, n.lastIndexOf("}"))).split(";").forEach((function(e) {
                    if (e) {
                        var n = e.split(": ")[0],
                            i = e.split(": ")[1];
                        n && i && (t["--" + n.trim()] = i.trim())
                    }
                })), t
            }()[t]: n = window.getComputedStyle(e, null).getPropertyValue(t).replace(/^\s/, "");
            return n
        },
        or = window.CoreUIDefaults && window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : "c-",
        sr = {
            dropdownAccordion: "boolean"
        },
        ar = 400,
        lr = {
            ACTIVE: or + "active",
            NAV_DROPDOWN: or + "sidebar-nav-dropdown",
            NAV_DROPDOWN_TOGGLE: or + "sidebar-nav-dropdown-toggle",
            SHOW: or + "show",
            SIDEBAR_MINIMIZED: or + "sidebar-minimized",
            SIDEBAR_OVERLAID: or + "sidebar-overlaid",
            SIDEBAR_SHOW: or + "sidebar-show"
        },
        cr = {
            CLASS_TOGGLE: "classtoggle",
            CLICK: "click",
            CLICK_DATA_API: "click.coreui.sidebar.data-api",
            DESTROY: "destroy",
            INIT: "init",
            LOAD_DATA_API: "load.coreui.sidebar.data-api",
            TOGGLE: "toggle",
            UPDATE: "update"
        },
        ur = {
            NAV_DROPDOWN_TOGGLE: "." + or + "sidebar-nav-dropdown-toggle",
            NAV_DROPDOWN: "." + or + "sidebar-nav-dropdown",
            NAV_LINK: "." + or + "sidebar-nav-link",
            NAVIGATION_CONTAINER: "." + or + "sidebar-nav",
            SIDEBAR: "." + or + "sidebar"
        },
        fr = function() {
            function t(t) {
                this._element = t, this.mobile = !1, this.ps = null, this._perfectScrollbar(cr.INIT), this._setActiveLink(), this._breakpointTest = this._breakpointTest.bind(this), this._toggleClickOut(), this._clickOutListener = this._clickOutListener.bind(this), this._addEventListeners(), this._addMediaQuery()
            }
            var n = t.prototype;
            return n._getAllSiblings = function(t, e) {
                var n = [];
                t = t.parentNode.firstChild;
                do {
                    3 !== t.nodeType && (e && !e(t) || n.push(t))
                } while (t = t.nextSibling);
                return n
            }, n._toggleDropdown = function(t) {
                var e = t.target;
                e.classList.contains(lr.NAV_DROPDOWN_TOGGLE) || (e = e.closest(ur.NAV_DROPDOWN_TOGGLE)), e.closest(ur.NAVIGATION_CONTAINER).dataset.drodpownAccordion && this._getAllSiblings(e.parentElement).forEach((function(t) {
                    t !== e.parentNode && t.classList.contains(lr.NAV_DROPDOWN) && t.classList.remove(lr.SHOW)
                })), e.parentNode.classList.toggle(lr.SHOW), this._perfectScrollbar(cr.UPDATE)
            }, n._closeSidebar = function(t) {
                var e = t.target;
                e.classList.contains(lr.NAV_LINK) || (e = e.closest(ur.NAV_LINK)), this.mobile && !e.classList.contains(lr.NAV_DROPDOWN_TOGGLE) && (this._removeClickOut(), this._element.classList.remove(lr.SIDEBAR_SHOW))
            }, n._perfectScrollbar = function(t) {
                var e = this;
                "undefined" != typeof ir && (t !== cr.INIT || this._element.classList.contains(lr.SIDEBAR_MINIMIZED) || (this.ps = this._makeScrollbar()), t === cr.DESTROY && this._destroyScrollbar(), t === cr.TOGGLE && (this._element.classList.contains(lr.SIDEBAR_MINIMIZED) ? this._destroyScrollbar() : (this._destroyScrollbar(), this.ps = this._makeScrollbar())), t !== cr.UPDATE || this._element.classList.contains(lr.SIDEBAR_MINIMIZED) || setTimeout((function() {
                    e._destroyScrollbar(), e.ps = e._makeScrollbar()
                }), ar))
            }, n._makeScrollbar = function(t) {
                if (void 0 === t && (t = ur.NAVIGATION_CONTAINER), this._element.querySelector(t)) return new ir(this._element.querySelector(t), {
                    suppressScrollX: !0
                })
            }, n._destroyScrollbar = function() {
                this.ps && (this.ps.destroy(), this.ps = null)
            }, n._getParents = function(t, e) {
                for (var n = []; t && t !== document; t = t.parentNode) e ? t.matches(e) && n.push(t) : n.push(t);
                return n
            }, n._setActiveLink = function() {
                var t = this;
                Array.from(this._element.querySelectorAll(ur.NAV_LINK)).forEach((function(e) {
                    var n, i = new RegExp("\\?.*="),
                        r = new RegExp("\\?."),
                        o = new RegExp("#.");
                    "#" === (n = i.test(String(window.location)) || r.test(String(window.location)) ? String(window.location).split("?")[0] : o.test(String(window.location)) ? String(window.location).split("#")[0] : String(window.location)).substr(n.length - 1) && (n = n.slice(0, -1)), e.href === n && (e.classList.add(lr.ACTIVE), Array.from(t._getParents(e, ur.NAV_DROPDOWN)).forEach((function(t) {
                        t.classList.add(lr.SHOW)
                    })))
                }))
            }, n._addMediaQuery = function() {
                var t = rr("--breakpoint-sm");
                if (t) {
                    var e = parseInt(t, 10) - 1,
                        n = window.matchMedia("(max-width: " + e + "px)");
                    this._breakpointTest(n), n.addListener(this._breakpointTest)
                }
            }, n._breakpointTest = function(t) {
                this.mobile = Boolean(t.matches)
            }, n._clickOutListener = function(t) {
                this._element.contains(t.target) || (t.preventDefault(), t.stopPropagation(), this._removeClickOut(), this._element.classList.remove(lr.SIDEBAR_SHOW))
            }, n._addClickOut = function() {
                document.addEventListener(cr.CLICK, this._clickOutListener, !0)
            }, n._removeClickOut = function() {
                document.removeEventListener(cr.CLICK, this._clickOutListener, !0)
            }, n._toggleClickOut = function() {
                this.mobile && this._element.classList.contains(lr.SIDEBAR_SHOW) ? this._addClickOut() : this._element.classList.contains(lr.SIDEBAR_OVERLAID) && this._element.classList.contains(lr.SIDEBAR_SHOW) ? this._addClickOut() : this._removeClickOut()
            }, n._addEventListeners = function() {
                var t = this;
                K.on(this._element, cr.CLASS_TOGGLE, (function(e) {
                    e.detail.className === lr.SIDEBAR_MINIMIZED && t._perfectScrollbar(cr.TOGGLE), e.detail.className === lr.SIDEBAR_SHOW && t._toggleClickOut()
                })), K.on(this._element, cr.CLICK_DATA_API, ur.NAV_DROPDOWN_TOGGLE, (function(e) {
                    e.preventDefault(), t._toggleDropdown(e)
                })), K.on(this._element, cr.CLICK_DATA_API, ur.NAV_LINK, (function(e) {
                    t._closeSidebar(e)
                }))
            }, t._sidebarInterface = function(e, n) {
                var i = A.getData(e, "coreui.sidebar");
                if (i || (i = new t(e, "object" == typeof n && n)), "string" == typeof n) {
                    if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    t._sidebarInterface(this, e)
                }))
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return sr
                }
            }]), t
        }();
    if (K.on(window, cr.LOAD_DATA_API, (function() {
        Array.from(document.querySelectorAll(ur.SIDEBAR)).forEach((function(t) {
            fr._sidebarInterface(t)
        }))
    })), "undefined" != typeof c) {
        var hr = c.fn.sidebar;
        c.fn.sidebar = fr._jQueryInterface, c.fn.sidebar.Constructor = fr, c.fn.sidebar.noConflict = function() {
            return c.fn.sidebar = hr, fr._jQueryInterface
        }
    }
    var dr = "coreui.tab",
        pr = "." + dr,
        gr = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        mr = {
            HIDE: "hide" + pr,
            HIDDEN: "hidden" + pr,
            SHOW: "show" + pr,
            SHOWN: "shown" + pr,
            CLICK_DATA_API: "click" + pr + ".data-api"
        },
        _r = {
            DROPDOWN_MENU: gr + "dropdown-menu",
            ACTIVE: gr + "active",
            DISABLED: "disabled",
            FADE: gr + "fade",
            SHOW: gr + "show"
        },
        vr = {
            DROPDOWN: "." + gr + "dropdown",
            NAV_LIST_GROUP: "." + gr + "nav, ." + gr + "list-group",
            ACTIVE: "." + gr + "active",
            ACTIVE_UL: ":scope > li > ." + gr + "active",
            DATA_TOGGLE: '[data-toggle="' + gr + 'tab"], [data-toggle="' + gr + 'pill"], [data-toggle="' + gr + 'list"]',
            DROPDOWN_TOGGLE: "." + gr + "dropdown-toggle",
            DROPDOWN_ACTIVE_CHILD: ":scope > ." + gr + "dropdown-menu ." + gr + "active"
        },
        br = function() {
            function t(t) {
                this._element = t, A.setData(this._element, dr, this)
            }
            var n = t.prototype;
            return n.show = function() {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(_r.ACTIVE) || this._element.classList.contains(_r.DISABLED))) {
                    var e, n, i = nt.closest(this._element, vr.NAV_LIST_GROUP),
                        r = f(this._element);
                    if (i) {
                        var o = "UL" === i.nodeName || "OL" === i.nodeName ? vr.ACTIVE_UL : vr.ACTIVE;
                        n = (n = _(nt.find(o, i)))[n.length - 1]
                    }
                    var s = null;
                    if (n && (s = K.trigger(n, mr.HIDE, {
                        relatedTarget: this._element
                    })), !(K.trigger(this._element, mr.SHOW, {
                        relatedTarget: n
                    }).defaultPrevented || null !== s && s.defaultPrevented)) {
                        r && (e = nt.findOne(r)), this._activate(this._element, i);
                        var a = function() {
                            K.trigger(n, mr.HIDDEN, {
                                relatedTarget: t._element
                            }), K.trigger(t._element, mr.SHOWN, {
                                relatedTarget: n
                            })
                        };
                        e ? this._activate(e, e.parentNode, a) : a()
                    }
                }
            }, n.dispose = function() {
                A.removeData(this._element, dr), this._element = null
            }, n._activate = function(t, e, n) {
                var i = this,
                    r = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? nt.children(e, vr.ACTIVE) : nt.find(vr.ACTIVE_UL, e))[0],
                    o = n && r && r.classList.contains(_r.FADE),
                    s = function() {
                        return i._transitionComplete(t, r, n)
                    };
                if (r && o) {
                    var a = h(r);
                    r.classList.remove(_r.SHOW), K.one(r, l, s), g(r, a)
                } else s()
            }, n._transitionComplete = function(t, e, n) {
                if (e) {
                    e.classList.remove(_r.ACTIVE);
                    var i = nt.findOne(vr.DROPDOWN_ACTIVE_CHILD, e.parentNode);
                    i && i.classList.remove(_r.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }(t.classList.add(_r.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), E(t), t.classList.contains(_r.FADE) && t.classList.add(_r.SHOW), t.parentNode && t.parentNode.classList.contains(_r.DROPDOWN_MENU)) && (nt.closest(t, vr.DROPDOWN) && _(nt.find(vr.DROPDOWN_TOGGLE)).forEach((function(t) {
                    return t.classList.add(_r.ACTIVE)
                })), t.setAttribute("aria-expanded", !0));
                n && n()
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    var n = A.getData(this, dr) || new t(this);
                    if ("string" == typeof e) {
                        if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, dr)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }]), t
        }();
    if (K.on(document, mr.CLICK_DATA_API, vr.DATA_TOGGLE, (function(t) {
        t.preventDefault(), (A.getData(this, dr) || new br(this)).show()
    })), "undefined" != typeof c) {
        var Er = c.fn.tab;
        c.fn.tab = br._jQueryInterface, c.fn.tab.Constructor = br, c.fn.tab.noConflict = function() {
            return c.fn.tab = Er, br._jQueryInterface
        }
    }
    var yr = "coreui.toast",
        Ar = "." + yr,
        wr = window.CoreUIDefaults && window.CoreUIDefaults.bsPrefix ? window.CoreUIDefaults.bsPrefix : "",
        Tr = {
            CLICK_DISMISS: "click.dismiss" + Ar,
            HIDE: "hide" + Ar,
            HIDDEN: "hidden" + Ar,
            SHOW: "show" + Ar,
            SHOWN: "shown" + Ar
        },
        Dr = {
            FADE: wr + "fade",
            HIDE: wr + "hide",
            SHOW: wr + "show",
            SHOWING: wr + "showing"
        },
        Ir = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Sr = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Or = {
            DATA_DISMISS: '[data-dismiss="' + wr + 'toast"]'
        },
        Lr = function() {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners(), A.setData(t, yr, this)
            }
            var n = t.prototype;
            return n.show = function() {
                var t = this;
                K.trigger(this._element, Tr.SHOW), this._config.animation && this._element.classList.add(Dr.FADE);
                var e = function() {
                    t._element.classList.remove(Dr.SHOWING), t._element.classList.add(Dr.SHOW), K.trigger(t._element, Tr.SHOWN), t._config.autohide && t.hide()
                };
                if (this._element.classList.remove(Dr.HIDE), this._element.classList.add(Dr.SHOWING), this._config.animation) {
                    var n = h(this._element);
                    K.one(this._element, l, e), g(this._element, n)
                } else e()
            }, n.hide = function(t) {
                var e = this;
                this._element.classList.contains(Dr.SHOW) && (K.trigger(this._element, Tr.HIDE), t ? this._close() : this._timeout = setTimeout((function() {
                    e._close()
                }), this._config.delay))
            }, n.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Dr.SHOW) && this._element.classList.remove(Dr.SHOW), K.off(this._element, Tr.CLICK_DISMISS), A.removeData(this._element, yr), this._element = null, this._config = null
            }, n._getConfig = function(t) {
                return t = r({}, Sr, {}, yt.getDataAttributes(this._element), {}, "object" == typeof t && t ? t : {}), m("toast", t, this.constructor.DefaultType), t
            }, n._setListeners = function() {
                var t = this;
                K.on(this._element, Tr.CLICK_DISMISS, Or.DATA_DISMISS, (function() {
                    return t.hide(!0)
                }))
            }, n._close = function() {
                var t = this,
                    e = function() {
                        t._element.classList.add(Dr.HIDE), K.trigger(t._element, Tr.HIDDEN)
                    };
                if (this._element.classList.remove(Dr.SHOW), this._config.animation) {
                    var n = h(this._element);
                    K.one(this._element, l, e), g(this._element, n)
                } else e()
            }, t._jQueryInterface = function(e) {
                return this.each((function() {
                    var n = A.getData(this, yr);
                    if (n || (n = new t(this, "object" == typeof e && e)), "string" == typeof e) {
                        if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e](this)
                    }
                }))
            }, t._getInstance = function(t) {
                return A.getData(t, yr)
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "3.0.0-beta.0"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Ir
                }
            }, {
                key: "Default",
                get: function() {
                    return Sr
                }
            }]), t
        }();
    if ("undefined" != typeof c) {
        var Cr = c.fn.toast;
        c.fn.toast = Lr._jQueryInterface, c.fn.toast.Constructor = Lr, c.fn.toast.noConflict = function() {
            return c.fn.toast = Cr, Lr._jQueryInterface
        }
    }
    var Nr = {
        AsyncLoad: tt,
        Alert: ct,
        Button: _t,
        Carousel: kt,
        ClassToggler: Kt,
        Collapse: se,
        Dropdown: Dn,
        Modal: Wn,
        Popover: Ei,
        Scrollspy: Ri,
        Sidebar: fr,
        Tab: br,
        Toast: Lr,
        Tooltip: ai
    };
    return window.getStyle = rr, window.hexToRgb = function(t) {
        if ("undefined" == typeof t) throw new TypeError("Hex color is not defined");
        var e, n, i;
        if (!t.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) throw new Error(t + " is not a valid hex color");
        return 7 === t.length ? (e = parseInt(t.substring(1, 3), 16), n = parseInt(t.substring(3, 5), 16), i = parseInt(t.substring(5, 7), 16)) : (e = parseInt(t.substring(1, 2), 16), n = parseInt(t.substring(2, 3), 16), i = parseInt(t.substring(3, 5), 16)), "rgba(" + e + ", " + n + ", " + i + ")"
    }, window.hexToRgba = function(t, e) {
        if (void 0 === e && (e = 100), "undefined" == typeof t) throw new TypeError("Hex color is not defined");
        var n, i, r;
        if (!t.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) throw new Error(t + " is not a valid hex color");
        return 7 === t.length ? (n = parseInt(t.substring(1, 3), 16), i = parseInt(t.substring(3, 5), 16), r = parseInt(t.substring(5, 7), 16)) : (n = parseInt(t.substring(1, 2), 16), i = parseInt(t.substring(2, 3), 16), r = parseInt(t.substring(3, 5), 16)), "rgba(" + n + ", " + i + ", " + r + ", " + e / 100 + ")"
    }, window.rgbToHex = function(t) {
        if ("undefined" == typeof t) throw new TypeError("Hex color is not defined");
        if ("transparent" === t) return "#00000000";
        var e = t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        if (!e) throw new Error(t + " is not a valid rgb color");
        var n = "0" + parseInt(e[1], 10).toString(16),
            i = "0" + parseInt(e[2], 10).toString(16),
            r = "0" + parseInt(e[3], 10).toString(16);
        return "#" + n.slice(-2) + i.slice(-2) + r.slice(-2)
    }, Nr
}));
//# sourceMappingURL=coreui.bundle.min.js.map

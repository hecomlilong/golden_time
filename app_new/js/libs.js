!
    function(a) {
        "use strict";

        function b(a, b, c) {
            for (var d in b) c ? a[d] = b[d] : a[d] = void 0 !== a[d] ? a[d] : b[d]
        }
        function c(a, c) {
            if ("undefined" == typeof WebViewJavascriptBridge) return console.log("WebViewJavascriptBridge未定义，请在钉钉app打开该页面");
            var d = c || {},
                e = function(b) {
                    console.log("默认成功回调", a, b)
                },
                f = function(b) {
                    console.log("默认失败回调", a, b)
                },
                g = function() {};
            d.onSuccess && (e = d.onSuccess, delete d.onSuccess), d.onFail && (f = d.onFail, delete d.onFail), d.onCancel && (g = d.onCancel, delete d.onCancel);
            var h = function(a) {
                    var b = a || {},
                        c = b.errorCode,
                        d = b.result;
                    "0" === c ? e && e.call(null, d) : "-1" === c ? g && g.call(null, d) : f && f.call(null, d, c)
                },
                i = !1;
            switch (a) {
                case "device.notification.alert":
                    b(d, {
                        title: "",
                        buttonName: "确定"
                    });
                    break;
                case "device.notification.confirm":
                case "device.notification.prompt":
                    b(d, {
                        title: "",
                        buttonLabels: ["确定", "取消"]
                    });
                    break;
                case "device.notification.vibrate":
                    b(d, {
                        duration: 300
                    });
                    break;
                case "device.accelerometer.watchShake":
                    o.ios && (i = !0, d.sensitivity = 3.2);
                    break;
                case "biz.util.openLink":
                    b(d, {
                        credible: !0,
                        showMenuBar: !0
                    });
                    break;
                case "biz.contact.choose":
                    b(d, {
                        multiple: !0,
                        startWithDepartmentId: 0,
                        users: [],
                        corpId: k && k.corpId || ""
                    });
                    break;
                case "biz.contact.complexChoose":
                    b(d, {
                        startWithDepartmentId: 0,
                        selectedUsers: [],
                        selectedDepartments: [],
                        corpId: k && k.corpId || ""
                    });
                    break;
                case "biz.navigation.setLeft":
                case "biz.navigation.setRight":
                    o.ios && (i = !0), b(d, {
                        show: !0,
                        control: !1,
                        showIcon: !0,
                        text: ""
                    });
                    break;
                case "ui.pullToRefresh.enable":
                    o.ios && (i = !0);
                    break;
                case "device.notification.toast":
                    b(d, {
                        text: "toast",
                        duration: o.android ? (o.duration - 3 > 0) + 0 : 3,
                        delay: 0
                    });
                    break;
                case "device.notification.showPreloader":
                    b(d, {
                        text: "加载中...",
                        showIcon: !0
                    });
                    break;
                case "biz.util.uploadImage":
                    b(d, {
                        multiple: !1
                    });
                    break;
                case "biz.util.scan":
                    b(d, {
                        type: "qrCode"
                    });
                    break;
                case "biz.map.search":
                    b(d, {
                        scope: 500
                    });
                    break;
                case "biz.util.ut":
                    var j = d.value,
                        l = [];
                    if (j && "Object" == o.type(j) && window.JSON) {
                        if (o.ios) j = JSON.stringify(j);
                        else if (o.android) {
                            for (var m in j) l.push(m + "=" + j[m]);
                            j = l.join(",")
                        }
                    } else window.JSON || (j = "");
                    b(d, {
                        value: j
                    }, !0);
                    break;
                case "internal.util.encryData":
                    var n = d.data,
                        l = [];
                    if ("Object" == o.type(n)) {
                        for (var m in n) l.push(m + "=" + n[m]);
                        n = l.join("&")
                    }
                    b(d, {
                        data: n
                    }, !0);
                    break;
                case "internal.request.lwp":
                    var n = d.body;
                    n = JSON.stringify(n), b(d, {
                        body: n
                    }, !0);
                    break;
                case "biz.navigation.setIcon":
                    o.ios && (i = !0), b(d, {
                        showIcon: !0,
                        iconIndex: "1"
                    });
                    break;
                case "biz.customContact.multipleChoose":
                case "biz.customContact.choose":
                    b(d, {
                        isShowCompanyName: !1
                    })
            }
            if (o.android) {
                var p = a.split("."),
                    q = p.pop(),
                    r = p.join(".");
                WebViewJavascriptBridgeAndroid(e, f, r, q, d)
            } else o.ios && (i ? (WebViewJavascriptBridge.registerHandler(a, function(a, b) {
                h({
                    errorCode: "0",
                    errorMessage: "成功",
                    result: a
                }), b && b({
                    errorCode: "0",
                    errorMessage: "成功"
                })
            }), WebViewJavascriptBridge.callHandler(a, d)) : WebViewJavascriptBridge.callHandler(a, d, h))
        }
        var d = ["backbutton", "online", "offline", "pause", "resume", "swipeRefresh"],
            e = ["device.notification.alert", "device.notification.confirm", "device.notification.prompt", "device.notification.vibrate", "device.accelerometer.watchShake", "device.accelerometer.clearShake", "biz.util.open", "biz.util.openLink", "biz.util.share", "biz.util.ut", "biz.util.datepicker", "biz.util.timepicker", "biz.user.get", "biz.navigation.setLeft", "biz.navigation.setRight", "biz.navigation.setTitle", "biz.navigation.back", "device.notification.toast", "device.notification.showPreloader", "device.notification.hidePreloader", "device.geolocation.get", "biz.util.uploadImage", "biz.util.previewImage", "ui.input.plain", "device.notification.actionSheet", "biz.util.qrcode", "device.connection.getNetworkType", "runtime.info", "biz.ding.post", "biz.telephone.call", "biz.chat.chooseConversation", "biz.contact.createGroup", "biz.util.datetimepicker", "biz.util.chosen", "device.base.getUUID", "device.base.getInterface", "device.launcher.checkInstalledApps", "device.launcher.launchApp", "ui.progressBar.setColors", "runtime.permission.requestAuthCode", "runtime.permission.requestJsApis", "ui.pullToRefresh.enable", "ui.pullToRefresh.stop", "ui.pullToRefresh.disable", "ui.webViewBounce.enable", "ui.webViewBounce.disable", "biz.chat.getConversationInfo", "biz.map.search", "biz.map.locate", "biz.util.scan", "biz.contact.choose", "biz.contact.complexChoose", "util.localStorage.getItem", "util.localStorage.setItem", "util.localStorage.removeItem", "biz.navigation.createEditor", "biz.navigation.finishEditor", "biz.chat.pickConversation", "device.notification.modal", "biz.navigation.setIcon", "biz.navigation.close", "biz.util.uploadImageFromCamera", "internal.lwp.call", "device.geolocation.openGps", "biz.util.test", "internal.microapp.checkInstalled", "internal.user.getRole", "device.notification.extendModal", "internal.request.lwp", "biz.user.secretID", "internal.util.encryData", "biz.customContact.choose", "biz.customContact.multipleChoose", "biz.util.pageClick"],
            f = "0.6.0",
            g = a.navigator.userAgent,
            h = g.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);
        null === h && (h = g.match(/DingTalk\/([a-zA-Z0-9.-]+)/));
        var i = h && h[1],
            j = !1,
            k = null,
            l = "runtime.permission.requestJsApis",
            m = null,
            n = !1,
            o = {
                ios: /iPhone|iPad|iPod/i.test(g),
                android: /Android/i.test(g),
                version: i,
                support: "1.2.2" === i || "1.3.2" === i,
                ability: "",
                config: function(a) {
                    a && (k = {
                        corpId: a.corpId,
                        appId: a.appId || -1,
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        signature: a.signature,
                        jsApiList: a.jsApiList
                    }, a.agentId && (k.agentId = a.agentId))
                },
                error: function(a) {
                    m = a
                },
                ready: function(b) {
                    var c = function(a) {
                        if (!a) return console.log("bridge初始化失败");
                        if (null !== k && k.signature) {
                            if (o.ios) a.callHandler(l, k, function(c) {
                                var d = c || {},
                                    e = d.errorCode,
                                    f = d.errorMessage || "";
                                d.result;
                                "0" === e ? b(a) : setTimeout(function() {
                                    m && m({
                                        message: "权限校验失败 " + f,
                                        errorCode: 3
                                    })
                                })
                            });
                            else if (o.android) {
                                var c = l.split("."),
                                    e = c.pop(),
                                    g = c.join(".");
                                a(function() {
                                    b(a)
                                }, function(a) {
                                    setTimeout(function() {
                                        var b = a && a.errorMessage || "";
                                        m && m({
                                            message: "权限校验失败 " + b,
                                            errorCode: 3
                                        })
                                    })
                                }, g, e, k)
                            }
                        } else b(a);
                        if (j === !1 && (j = !0, d.forEach(function(b) {
                                o.ios && a.registerHandler(b, function(a, c) {
                                    var d = document.createEvent("HTMLEvents");
                                    d.data = a, d.initEvent(b), document.dispatchEvent(d), c && c({
                                        errorCode: "0",
                                        errorMessage: "成功"
                                    })
                                })
                            }), null === k)) {
                            var h = {
                                url: encodeURIComponent(window.location.href),
                                js: f,
                                cid: k && k.corpId || ""
                            };
                            o.biz.util.ut({
                                key: "dd_open_js_monitor",
                                value: JSON.stringify(h),
                                onSuccess: function(a) {}
                            })
                        }
                    };
                    if (o.ios && a.WebViewJavascriptBridge) {
                        try {
                            WebViewJavascriptBridge.init(function(a, b) {})
                        } catch (e) {
                            console.log(e.message)
                        }
                        return c(WebViewJavascriptBridge)
                    }
                    if (o.android && a.WebViewJavascriptBridgeAndroid) return c(WebViewJavascriptBridgeAndroid);
                    if (o.ios) document.addEventListener("WebViewJavascriptBridgeReady", function() {
                        if ("undefined" == typeof WebViewJavascriptBridge) return console.log("WebViewJavascriptBridge 未定义");
                        try {
                            WebViewJavascriptBridge.init(function(a, b) {})
                        } catch (a) {
                            console.log(a.message)
                        }
                        n = !0, c(WebViewJavascriptBridge)
                    }, !1);
                    else {
                        if (!o.android) return console.log("很抱歉，尚未支持您所持设备");
                        var g = function() {
                            try {
                                a.WebViewJavascriptBridgeAndroid = a.nuva.require(), n = !0, c(WebViewJavascriptBridgeAndroid)
                            } catch (b) {
                                console.log("window.nuva.require出错", b.message), c(null)
                            }
                        };
                        a.nuva ? g() : document.addEventListener("runtimeready", function() {
                            g()
                        }, !1)
                    }
                },
                type: function(a) {
                    return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]
                },
                compareVersion: function(a, b, c) {
                    if ("string" != typeof a || "string" != typeof b) return !1;
                    for (var d, e, f = a.split("."), g = b.split("."); d === e && g.length > 0;) d = f.shift(), e = g.shift();
                    return c ? (0 | e) >= (0 | d) : (0 | e) > (0 | d)
                }
            },
            p = function(a, b) {
                for (var c = a.split("."), d = o, e = 0, f = c.length; f > e; e++) e === f - 1 && (d[c[e]] = b), "undefined" == typeof d[c[e]] && (d[c[e]] = {}), d = d[c[e]]
            };
        e.forEach(function(a) {
            p(a, function(b) {
                c(a, b)
            })
        }), o.__ns = p, o.biz.util.pageClick = function(a) {
            var b = "open_micro_log_record_client",
                c = +new Date,
                d = a.corpId,
                e = a.agentId;
            d || (d = k && k.corpId || ""), e || (e = k && k.agentId || "");
            var f = {
                visitTime: c,
                clickType: 2,
                clickButton: a.clickButton || "",
                url: location.href,
                corpId: d,
                agentId: e
            };
            o.biz.util.ut({
                key: b,
                value: f
            })
        }, a.dd = o, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = o : "function" == typeof define && (define.amd || define.cmd) && define(function() {
            return o
        })
    }(this);
var Lawnchair = function(t, r) {
    if (!(this instanceof Lawnchair)) return new Lawnchair(t, r);
    if (!JSON) throw "JSON unavailable! Include http://www.json.org/json2.js to fix.";
    if (!(arguments.length <= 2)) throw "Incorrect # of ctor args!";
    r = "function" == typeof arguments[0] ? arguments[0] : arguments[1], t = "function" == typeof arguments[0] ? {} : arguments[0] || {}, this.record = t.record || "record", this.name = t.name || "records";
    var n;
    if (t.adapter) {
        "string" == typeof t.adapter && (t.adapter = [t.adapter]);
        for (var i = 0, e = t.adapter.length; e > i; i++) {
            for (var a = Lawnchair.adapters.length - 1; a >= 0 && (Lawnchair.adapters[a].adapter !== t.adapter[i] || !(n = Lawnchair.adapters[a].valid() ? Lawnchair.adapters[a] : void 0)); a--);
            if (n) break
        }
    } else for (var a = 0, s = Lawnchair.adapters.length; s > a && !(n = Lawnchair.adapters[a].valid() ? Lawnchair.adapters[a] : void 0); a++);
    if (!n) throw "No valid adapter.";
    for (var i in n) this[i] = n[i];
    for (var a = 0, s = Lawnchair.plugins.length; s > a; a++) Lawnchair.plugins[a].call(this);
    this.init(t, r)
};
Lawnchair.adapters = [], Lawnchair.adapter = function(t, r) {
    r.adapter = t;
    var n = "adapter valid init keys save batch get exists all remove nuke".split(" "),
        i = this.prototype.indexOf;
    for (var e in r) if (-1 === i(n, e)) throw "Invalid adapter! Nonstandard method: " + e;
    Lawnchair.adapters.splice(0, 0, r)
}, Lawnchair.plugins = [], Lawnchair.plugin = function(t) {
    for (var r in t)"init" === r ? Lawnchair.plugins.push(t[r]) : this.prototype[r] = t[r]
}, Lawnchair.prototype = {
    isArray: Array.isArray ||
    function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    },
    indexOf: function(t, r, n, i) {
        if (t.indexOf) return t.indexOf(r);
        for (n = 0, i = t.length; i > n; n++) if (t[n] === r) return n;
        return -1
    },
    lambda: function(t) {
        return this.fn(this.record, t)
    },
    fn: function(t, r) {
        return "string" == typeof r ? new Function(t, r) : r
    },
    uuid: function() {
        var t = function() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        };
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
    },
    each: function(t) {
        var r = this.lambda(t);
        if (this.__results) for (var n = 0, i = this.__results.length; i > n; n++) r.call(this, this.__results[n], n);
        else this.all(function(t) {
            for (var n = 0, i = t.length; i > n; n++) r.call(this, t[n], n)
        });
        return this
    }
}, "undefined" != typeof module && module.exports && (module.exports = Lawnchair), Lawnchair.adapter("dom", function() {
    var t = window.localStorage,
        r = function(r) {
            return {
                key: r + "._index_",
                all: function() {
                    var r = t.getItem(JSON.stringify(this.key));
                    return r && (r = JSON.parse(r)), null === r && t.setItem(JSON.stringify(this.key), JSON.stringify([])), JSON.parse(t.getItem(JSON.stringify(this.key)))
                },
                add: function(r) {
                    var n = this.all();
                    n.push(r), t.setItem(JSON.stringify(this.key), JSON.stringify(n))
                },
                del: function(r) {
                    for (var n = this.all(), i = [], e = 0, a = n.length; a > e; e++) n[e] != r && i.push(n[e]);
                    t.setItem(JSON.stringify(this.key), JSON.stringify(i))
                },
                find: function(t) {
                    for (var r = this.all(), n = 0, i = r.length; i > n; n++) if (t === r[n]) return n;
                    return !1
                }
            }
        };
    return {
        valid: function() {
            return !!t &&
                function() {
                    var r = !0,
                        n = Math.random();
                    try {
                        t.setItem(n, n)
                    } catch (i) {
                        r = !1
                    }
                    return t.removeItem(n), r
                }()
        },
        init: function(t, n) {
            this.indexer = r(this.name), n && this.fn(this.name, n).call(this, this)
        },
        save: function(r, n) {
            var i = r.key ? this.name + "." + r.key : this.name + "." + this.uuid();
            return delete r.key, t.setItem(i, JSON.stringify(r)), this.indexer.find(i) === !1 && this.indexer.add(i), r.key = i.slice(this.name.length + 1), n && this.lambda(n).call(this, r), this
        },
        batch: function(t, r) {
            for (var n = [], i = 0, e = t.length; e > i; i++) this.save(t[i], function(t) {
                n.push(t)
            });
            return r && this.lambda(r).call(this, n), this
        },
        keys: function(t) {
            if (t) {
                var r = this.name,
                    n = this.indexer.all(),
                    i = [];
                if (Array.prototype.map) i = n.map(function(t) {
                    return t.replace(r + ".", "")
                });
                else for (var e in n) i.push(e.replace(r + ".", ""));
                this.fn("keys", t).call(this, i)
            }
            return this
        },
        get: function(r, n) {
            if (this.isArray(r)) {
                for (var i = [], e = 0, a = r.length; a > e; e++) {
                    var s = this.name + "." + r[e],
                        h = t.getItem(s);
                    h && (h = JSON.parse(h), h.key = r[e]), i.push(h)
                }
                n && this.lambda(n).call(this, i)
            } else {
                var s = this.name + "." + r,
                    h = t.getItem(s);
                h && (h = JSON.parse(h), h.key = r), n && this.lambda(n).call(this, h)
            }
            return this
        },
        exists: function(t, r) {
            var n = this.indexer.find(this.name + "." + t) === !1 ? !1 : !0;
            return this.lambda(r).call(this, n), this
        },
        all: function(r) {
            for (var n, i, e = this.indexer.all(), a = [], s = 0, h = e.length; h > s; s++) i = e[s], n = JSON.parse(t.getItem(i)), n.key = i.replace(this.name + ".", ""), a.push(n);
            return r && this.fn(this.name, r).call(this, a), this
        },
        remove: function(r, n) {
            var i = this;
            if (this.isArray(r)) {
                var e, a = r.length,
                    s = function(t) {
                        i.remove(r[t], function() {
                            --a > 0 || n && i.lambda(n).call(i)
                        })
                    };
                for (e = 0; e < r.length; e++) s(e);
                return this
            }
            var h = this.name + "." + (r.key ? r.key : r);
            return this.indexer.del(h), t.removeItem(h), n && this.lambda(n).call(this), this
        },
        nuke: function(t) {
            return this.all(function(r) {
                for (var n = 0, i = r.length; i > n; n++) this.remove(r[n]);
                t && this.lambda(t).call(this)
            }), this
        }
    }
}()), Lawnchair.plugin(function() {
    var t = function(t, r) {
            for (var n = t.split("?").filter(function(t) {
                return "" != t
            }), i = "", e = 0, a = n.length; a > e; e++) i += n[e] + r[e];
            return i
        },
        r = function(t) {
            return function(r, n) {
                return r[t] < n[t] ? -1 : r[t] > n[t] ? 1 : 0
            }
        };
    return {
        where: function() {
            var r = [].slice.call(arguments),
                n = r.shift(),
                i = r[r.length - 1],
                e = n.match(/\?/g),
                a = e && e.length > 0 ? t(n, r.slice(0, e.length)) : n,
                s = new Function(this.record, "return !!(" + a + ")"),
                h = [];
            return this.all(function(t) {
                for (var n = 0, e = t.length; e > n; n++) s.call(t[n], t[n]) && h.push(t[n]);
                this.__results = h, 1 === r.length && this.fn(this.name, i).call(this, this.__results)
            }), this
        },
        asc: function(t, n) {
            return this.fn(this.name, n).call(this, this.__results.sort(r(t))), this
        },
        desc: function(t, n) {
            return this.fn(this.name, n).call(this, this.__results.sort(r(t)).reverse()), this
        }
    }
}()); /* Zepto v1.1.4-86-g0616279 - zepto event ajax form ie detect assets data deferred callbacks touch - zeptojs.com/license */
var Zepto = function() {
    function D(t) {
        return null == t ? String(t) : S[C.call(t)] || "object"
    }
    function k(t) {
        return "function" == D(t)
    }
    function Z(t) {
        return null != t && t == t.window
    }
    function L(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }
    function F(t) {
        return "object" == D(t)
    }
    function R(t) {
        return F(t) && !Z(t) && Object.getPrototypeOf(t) == Object.prototype
    }
    function $(t) {
        return "number" == typeof t.length
    }
    function _(t) {
        return a.call(t, function(t) {
            return null != t
        })
    }
    function W(t) {
        return t.length > 0 ? n.fn.concat.apply([], t) : t
    }
    function z(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function B(t) {
        return t in c ? c[t] : c[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }
    function I(t, e) {
        return "number" != typeof e || l[z(t)] ? e : e + "px"
    }
    function q(t) {
        var e, n;
        return f[t] || (e = u.createElement(t), u.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), f[t] = n), f[t]
    }
    function V(t) {
        return "children" in t ? s.call(t.children) : n.map(t.childNodes, function(t) {
            return 1 == t.nodeType ? t : void 0
        })
    }
    function H(t, e) {
        var n, i = t ? t.length : 0;
        for (n = 0; i > n; n++) this[n] = t[n];
        this.length = i, this.selector = e || ""
    }
    function U(n, i, r) {
        for (e in i) r && (R(i[e]) || M(i[e])) ? (R(i[e]) && !R(n[e]) && (n[e] = {}), M(i[e]) && !M(n[e]) && (n[e] = []), U(n[e], i[e], r)) : i[e] !== t && (n[e] = i[e])
    }
    function X(t, e) {
        return null == e ? n(t) : n(t).filter(e)
    }
    function Y(t, e, n, i) {
        return k(e) ? e.call(t, n, i) : e
    }
    function G(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }
    function J(e, n) {
        var i = e.className || "",
            r = i && i.baseVal !== t;
        return n === t ? r ? i.baseVal : i : void(r ? i.baseVal = n : e.className = n)
    }
    function K(t) {
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? n.parseJSON(t) : t) : t
        } catch (e) {
            return t
        }
    }
    function Q(t, e) {
        e(t);
        for (var n = 0, i = t.childNodes.length; i > n; n++) Q(t.childNodes[n], e)
    }
    var t, e, n, i, A, P, r = [],
        o = r.concat,
        a = r.filter,
        s = r.slice,
        u = window.document,
        f = {},
        c = {},
        l = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        h = /^\s*<(\w+|!)[^>]*>/,
        p = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        d = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        m = /^(?:body|html)$/i,
        g = /([A-Z])/g,
        v = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        y = ["after", "prepend", "before", "append"],
        b = u.createElement("table"),
        w = u.createElement("tr"),
        x = {
            tr: u.createElement("tbody"),
            tbody: b,
            thead: b,
            tfoot: b,
            td: w,
            th: w,
            "*": u.createElement("div")
        },
        T = /complete|loaded|interactive/,
        E = /^[\w-]*$/,
        S = {},
        C = S.toString,
        j = {},
        O = u.createElement("div"),
        N = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        M = Array.isArray ||
            function(t) {
                return t instanceof Array
            };
    return j.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) return n.call(t, e);
        var i, r = t.parentNode,
            o = !r;
        return o && (r = O).appendChild(t), i = ~j.qsa(r, e).indexOf(t), o && O.removeChild(t), i
    }, A = function(t) {
        return t.replace(/-+(.)?/g, function(t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, P = function(t) {
        return a.call(t, function(e, n) {
            return t.indexOf(e) == n
        })
    }, j.fragment = function(e, i, r) {
        var o, a, f;
        return p.test(e) && (o = n(u.createElement(RegExp.$1))), o || (e.replace && (e = e.replace(d, "<$1></$2>")), i === t && (i = h.test(e) && RegExp.$1), i in x || (i = "*"), f = x[i], f.innerHTML = "" + e, o = n.each(s.call(f.childNodes), function() {
            f.removeChild(this)
        })), R(r) && (a = n(o), n.each(r, function(t, e) {
            v.indexOf(t) > -1 ? a[t](e) : a.attr(t, e)
        })), o
    }, j.Z = function(t, e) {
        return new H(t, e)
    }, j.isZ = function(t) {
        return t instanceof j.Z
    }, j.init = function(e, i) {
        var r;
        if (!e) return j.Z();
        if ("string" == typeof e) if (e = e.trim(), "<" == e[0] && h.test(e)) r = j.fragment(e, RegExp.$1, i), e = null;
        else {
            if (i !== t) return n(i).find(e);
            r = j.qsa(u, e)
        } else {
            if (k(e)) return n(u).ready(e);
            if (j.isZ(e)) return e;
            if (M(e)) r = _(e);
            else if (F(e)) r = [e], e = null;
            else if (h.test(e)) r = j.fragment(e.trim(), RegExp.$1, i), e = null;
            else {
                if (i !== t) return n(i).find(e);
                r = j.qsa(u, e)
            }
        }
        return j.Z(r, e)
    }, n = function(t, e) {
        return j.init(t, e)
    }, n.extend = function(t) {
        var e, n = s.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
            U(t, n, e)
        }), t
    }, j.qsa = function(t, e) {
        var n, i = "#" == e[0],
            r = !i && "." == e[0],
            o = i || r ? e.slice(1) : e,
            a = E.test(o);
        return t.getElementById && a && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : s.call(a && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, n.contains = u.documentElement.contains ?
        function(t, e) {
            return t !== e && t.contains(e)
        } : function(t, e) {
        for (; e && (e = e.parentNode);) if (e === t) return !0;
        return !1
    }, n.type = D, n.isFunction = k, n.isWindow = Z, n.isArray = M, n.isPlainObject = R, n.isEmptyObject = function(t) {
        var e;
        for (e in t) return !1;
        return !0
    }, n.inArray = function(t, e, n) {
        return r.indexOf.call(e, t, n)
    }, n.camelCase = A, n.trim = function(t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, n.uuid = 0, n.support = {}, n.expr = {}, n.noop = function() {}, n.map = function(t, e) {
        var n, r, o, i = [];
        if ($(t)) for (r = 0; r < t.length; r++) n = e(t[r], r), null != n && i.push(n);
        else for (o in t) n = e(t[o], o), null != n && i.push(n);
        return W(i)
    }, n.each = function(t, e) {
        var n, i;
        if ($(t)) {
            for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t
        } else for (i in t) if (e.call(t[i], i, t[i]) === !1) return t;
        return t
    }, n.grep = function(t, e) {
        return a.call(t, e)
    }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        S["[object " + e + "]"] = e.toLowerCase()
    }), n.fn = {
        constructor: j.Z,
        length: 0,
        forEach: r.forEach,
        reduce: r.reduce,
        push: r.push,
        sort: r.sort,
        splice: r.splice,
        indexOf: r.indexOf,
        concat: function() {
            var t, e, n = [];
            for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = j.isZ(e) ? e.toArray() : e;
            return o.apply(j.isZ(this) ? this.toArray() : this, n)
        },
        map: function(t) {
            return n(n.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return n(s.apply(this, arguments))
        },
        ready: function(t) {
            return T.test(u.readyState) && u.body ? t(n) : u.addEventListener("DOMContentLoaded", function() {
                t(n)
            }, !1), this
        },
        get: function(e) {
            return e === t ? s.call(this) : this[e >= 0 ? e : e + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(t) {
            return r.every.call(this, function(e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function(t) {
            return k(t) ? this.not(this.not(t)) : n(a.call(this, function(e) {
                return j.matches(e, t)
            }))
        },
        add: function(t, e) {
            return n(P(this.concat(n(t, e))))
        },
        is: function(t) {
            return this.length > 0 && j.matches(this[0], t)
        },
        not: function(e) {
            var i = [];
            if (k(e) && e.call !== t) this.each(function(t) {
                e.call(this, t) || i.push(this)
            });
            else {
                var r = "string" == typeof e ? this.filter(e) : $(e) && k(e.item) ? s.call(e) : n(e);
                this.forEach(function(t) {
                    r.indexOf(t) < 0 && i.push(t)
                })
            }
            return n(i)
        },
        has: function(t) {
            return this.filter(function() {
                return F(t) ? n.contains(this, t) : n(this).find(t).size()
            })
        },
        eq: function(t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function() {
            var t = this[0];
            return t && !F(t) ? t : n(t)
        },
        last: function() {
            var t = this[this.length - 1];
            return t && !F(t) ? t : n(t)
        },
        find: function(t) {
            var e, i = this;
            return e = t ? "object" == typeof t ? n(t).filter(function() {
                var t = this;
                return r.some.call(i, function(e) {
                    return n.contains(e, t)
                })
            }) : 1 == this.length ? n(j.qsa(this[0], t)) : this.map(function() {
                return j.qsa(this, t)
            }) : n()
        },
        closest: function(t, e) {
            var i = this[0],
                r = !1;
            for ("object" == typeof t && (r = n(t)); i && !(r ? r.indexOf(i) >= 0 : j.matches(i, t));) i = i !== e && !L(i) && i.parentNode;
            return n(i)
        },
        parents: function(t) {
            for (var e = [], i = this; i.length > 0;) i = n.map(i, function(t) {
                return (t = t.parentNode) && !L(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return X(e, t)
        },
        parent: function(t) {
            return X(P(this.pluck("parentNode")), t)
        },
        children: function(t) {
            return X(this.map(function() {
                return V(this)
            }), t)
        },
        contents: function() {
            return this.map(function() {
                return this.contentDocument || s.call(this.childNodes)
            })
        },
        siblings: function(t) {
            return X(this.map(function(t, e) {
                return a.call(V(e.parentNode), function(t) {
                    return t !== e
                })
            }), t)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(t) {
            return n.map(this, function(e) {
                return e[t]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = q(this.nodeName))
            })
        },
        replaceWith: function(t) {
            return this.before(t).remove()
        },
        wrap: function(t) {
            var e = k(t);
            if (this[0] && !e) var i = n(t).get(0),
                r = i.parentNode || this.length > 1;
            return this.each(function(o) {
                n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(!0) : i)
            })
        },
        wrapAll: function(t) {
            if (this[0]) {
                n(this[0]).before(t = n(t));
                for (var e;
                     (e = t.children()).length;) t = e.first();
                n(t).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            var e = k(t);
            return this.each(function(i) {
                var r = n(this),
                    o = r.contents(),
                    a = e ? t.call(this, i) : t;
                o.length ? o.wrapAll(a) : r.append(a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                n(this).replaceWith(n(this).children())
            }), this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(e) {
            return this.each(function() {
                var i = n(this);
                (e === t ? "none" == i.css("display") : e) ? i.show() : i.hide()
            })
        },
        prev: function(t) {
            return n(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function(t) {
            return n(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function(t) {
            return 0 in arguments ? this.each(function(e) {
                var i = this.innerHTML;
                n(this).empty().append(Y(this, t, e, i))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(t) {
            return 0 in arguments ? this.each(function(e) {
                var n = Y(this, t, e, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function(n, i) {
            var r;
            return "string" != typeof n || 1 in arguments ? this.each(function(t) {
                if (1 === this.nodeType) if (F(n)) for (e in n) G(this, e, n[e]);
                else G(this, n, Y(this, i, t, this.getAttribute(n)))
            }) : this.length && 1 === this[0].nodeType ? !(r = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : r : t
        },
        removeAttr: function(t) {
            return this.each(function() {
                1 === this.nodeType && t.split(" ").forEach(function(t) {
                    G(this, t)
                }, this)
            })
        },
        prop: function(t, e) {
            return t = N[t] || t, 1 in arguments ? this.each(function(n) {
                this[t] = Y(this, e, n, this[t])
            }) : this[0] && this[0][t]
        },
        data: function(e, n) {
            var i = "data-" + e.replace(g, "-$1").toLowerCase(),
                r = 1 in arguments ? this.attr(i, n) : this.attr(i);
            return null !== r ? K(r) : t
        },
        val: function(t) {
            return 0 in arguments ? this.each(function(e) {
                this.value = Y(this, t, e, this.value)
            }) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function(t) {
            if (t) return this.each(function(e) {
                var i = n(this),
                    r = Y(this, t, e, i.offset()),
                    o = i.offsetParent().offset(),
                    a = {
                        top: r.top - o.top,
                        left: r.left - o.left
                    };
                "static" == i.css("position") && (a.position = "relative"), i.css(a)
            });
            if (!this.length) return null;
            if (!n.contains(u.documentElement, this[0])) return {
                top: 0,
                left: 0
            };
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function(t, i) {
            if (arguments.length < 2) {
                var r, o = this[0];
                if (!o) return;
                if (r = getComputedStyle(o, ""), "string" == typeof t) return o.style[A(t)] || r.getPropertyValue(t);
                if (M(t)) {
                    var a = {};
                    return n.each(t, function(t, e) {
                        a[e] = o.style[A(e)] || r.getPropertyValue(e)
                    }), a
                }
            }
            var s = "";
            if ("string" == D(t)) i || 0 === i ? s = z(t) + ":" + I(t, i) : this.each(function() {
                this.style.removeProperty(z(t))
            });
            else for (e in t) t[e] || 0 === t[e] ? s += z(e) + ":" + I(e, t[e]) + ";" : this.each(function() {
                this.style.removeProperty(z(e))
            });
            return this.each(function() {
                this.style.cssText += ";" + s
            })
        },
        index: function(t) {
            return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(t) {
            return t ? r.some.call(this, function(t) {
                return this.test(J(t))
            }, B(t)) : !1
        },
        addClass: function(t) {
            return t ? this.each(function(e) {
                if ("className" in this) {
                    i = [];
                    var r = J(this),
                        o = Y(this, t, e, r);
                    o.split(/\s+/g).forEach(function(t) {
                        n(this).hasClass(t) || i.push(t)
                    }, this), i.length && J(this, r + (r ? " " : "") + i.join(" "))
                }
            }) : this
        },
        removeClass: function(e) {
            return this.each(function(n) {
                if ("className" in this) {
                    if (e === t) return J(this, "");
                    i = J(this), Y(this, e, n, i).split(/\s+/g).forEach(function(t) {
                        i = i.replace(B(t), " ")
                    }), J(this, i.trim())
                }
            })
        },
        toggleClass: function(e, i) {
            return e ? this.each(function(r) {
                var o = n(this),
                    a = Y(this, e, r, J(this));
                a.split(/\s+/g).forEach(function(e) {
                    (i === t ? !o.hasClass(e) : i) ? o.addClass(e) : o.removeClass(e)
                })
            }) : this
        },
        scrollTop: function(e) {
            if (this.length) {
                var n = "scrollTop" in this[0];
                return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ?
                    function() {
                        this.scrollTop = e
                    } : function() {
                    this.scrollTo(this.scrollX, e)
                })
            }
        },
        scrollLeft: function(e) {
            if (this.length) {
                var n = "scrollLeft" in this[0];
                return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ?
                    function() {
                        this.scrollLeft = e
                    } : function() {
                    this.scrollTo(e, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var t = this[0],
                    e = this.offsetParent(),
                    i = this.offset(),
                    r = m.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                return i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, {
                    top: i.top - r.top,
                    left: i.left - r.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || u.body; t && !m.test(t.nodeName) && "static" == n(t).css("position");) t = t.offsetParent;
                return t
            })
        }
    }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function(e) {
        var i = e.replace(/./, function(t) {
            return t[0].toUpperCase()
        });
        n.fn[e] = function(r) {
            var o, a = this[0];
            return r === t ? Z(a) ? a["inner" + i] : L(a) ? a.documentElement["scroll" + i] : (o = this.offset()) && o[e] : this.each(function(t) {
                a = n(this), a.css(e, Y(this, r, t, a[e]()))
            })
        }
    }), y.forEach(function(t, e) {
        var i = e % 2;
        n.fn[t] = function() {
            var t, o, r = n.map(arguments, function(e) {
                    return t = D(e), "object" == t || "array" == t || null == e ? e : j.fragment(e)
                }),
                a = this.length > 1;
            return r.length < 1 ? this : this.each(function(t, s) {
                o = i ? s : s.parentNode, s = 0 == e ? s.nextSibling : 1 == e ? s.firstChild : 2 == e ? s : null;
                var f = n.contains(u.documentElement, o);
                r.forEach(function(t) {
                    if (a) t = t.cloneNode(!0);
                    else if (!o) return n(t).remove();
                    o.insertBefore(t, s), f && Q(t, function(t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, n.fn[i ? t + "To" : "insert" + (e ? "Before" : "After")] = function(e) {
            return n(e)[t](this), this
        }
    }), j.Z.prototype = H.prototype = n.fn, j.uniq = P, j.deserializeValue = K, n.zepto = j, n
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function(t) {
    function l(t) {
        return t._zid || (t._zid = e++)
    }
    function h(t, e, n, i) {
        if (e = p(e), e.ns) var r = d(e.ns);
        return (a[l(t)] || []).filter(function(t) {
            return t && (!e.e || t.e == e.e) && (!e.ns || r.test(t.ns)) && (!n || l(t.fn) === l(n)) && (!i || t.sel == i)
        })
    }
    function p(t) {
        var e = ("" + t).split(".");
        return {
            e: e[0],
            ns: e.slice(1).sort().join(" ")
        }
    }
    function d(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }
    function m(t, e) {
        return t.del && !u && t.e in f || !! e
    }
    function g(t) {
        return c[t] || u && f[t] || t
    }
    function v(e, i, r, o, s, u, f) {
        var h = l(e),
            d = a[h] || (a[h] = []);
        i.split(/\s/).forEach(function(i) {
            if ("ready" == i) return t(document).ready(r);
            var a = p(i);
            a.fn = r, a.sel = s, a.e in c && (r = function(e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? a.fn.apply(this, arguments) : void 0
            }), a.del = u;
            var l = u || r;
            a.proxy = function(t) {
                if (t = E(t), !t.isImmediatePropagationStopped()) {
                    t.data = o;
                    var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));
                    return i === !1 && (t.preventDefault(), t.stopPropagation()), i
                }
            }, a.i = d.length, d.push(a), "addEventListener" in e && e.addEventListener(g(a.e), a.proxy, m(a, f))
        })
    }
    function y(t, e, n, i, r) {
        var o = l(t);
        (e || "").split(/\s/).forEach(function(e) {
            h(t, e, n, i).forEach(function(e) {
                delete a[o][e.i], "removeEventListener" in t && t.removeEventListener(g(e.e), e.proxy, m(e, r))
            })
        })
    }
    function E(e, i) {
        return (i || !e.isDefaultPrevented) && (i || (i = e), t.each(T, function(t, n) {
            var r = i[t];
            e[t] = function() {
                return this[n] = b, r && r.apply(i, arguments)
            }, e[n] = w
        }), (i.defaultPrevented !== n ? i.defaultPrevented : "returnValue" in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = b)), e
    }
    function S(t) {
        var e, i = {
            originalEvent: t
        };
        for (e in t) x.test(e) || t[e] === n || (i[e] = t[e]);
        return E(i, t)
    }
    var n, e = 1,
        i = Array.prototype.slice,
        r = t.isFunction,
        o = function(t) {
            return "string" == typeof t
        },
        a = {},
        s = {},
        u = "onfocusin" in window,
        f = {
            focus: "focusin",
            blur: "focusout"
        },
        c = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    s.click = s.mousedown = s.mouseup = s.mousemove = "MouseEvents", t.event = {
        add: v,
        remove: y
    }, t.proxy = function(e, n) {
        var a = 2 in arguments && i.call(arguments, 2);
        if (r(e)) {
            var s = function() {
                return e.apply(n, a ? a.concat(i.call(arguments)) : arguments)
            };
            return s._zid = l(e), s
        }
        if (o(n)) return a ? (a.unshift(e[n], e), t.proxy.apply(null, a)) : t.proxy(e[n], e);
        throw new TypeError("expected function")
    }, t.fn.bind = function(t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function(t, e) {
        return this.off(t, e)
    }, t.fn.one = function(t, e, n, i) {
        return this.on(t, e, n, i, 1)
    };
    var b = function() {
            return !0
        },
        w = function() {
            return !1
        },
        x = /^([A-Z]|returnValue$|layer[XY]$)/,
        T = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    t.fn.delegate = function(t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function(t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function(e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function(e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function(e, a, s, u, f) {
        var c, l, h = this;
        return e && !o(e) ? (t.each(e, function(t, e) {
            h.on(t, a, s, e, f)
        }), h) : (o(a) || r(u) || u === !1 || (u = s, s = a, a = n), (u === n || s === !1) && (u = s, s = n), u === !1 && (u = w), h.each(function(n, r) {
            f && (c = function(t) {
                return y(r, t.type, u), u.apply(this, arguments)
            }), a && (l = function(e) {
                var n, o = t(e.target).closest(a, r).get(0);
                return o && o !== r ? (n = t.extend(S(e), {
                    currentTarget: o,
                    liveFired: r
                }), (c || u).apply(o, [n].concat(i.call(arguments, 1)))) : void 0
            }), v(r, e, u, s, a, l || c)
        }))
    }, t.fn.off = function(e, i, a) {
        var s = this;
        return e && !o(e) ? (t.each(e, function(t, e) {
            s.off(t, i, e)
        }), s) : (o(i) || r(a) || a === !1 || (a = i, i = n), a === !1 && (a = w), s.each(function() {
            y(this, e, a, i)
        }))
    }, t.fn.trigger = function(e, n) {
        return e = o(e) || t.isPlainObject(e) ? t.Event(e) : E(e), e._args = n, this.each(function() {
            e.type in f && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function(e, n) {
        var i, r;
        return this.each(function(a, s) {
            i = S(o(e) ? t.Event(e) : e), i._args = n, i.target = s, t.each(h(s, e.type || e), function(t, e) {
                return r = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), r
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
        t.fn[e] = function(t) {
            return 0 in arguments ? this.bind(e, t) : this.trigger(e)
        }
    }), t.Event = function(t, e) {
        o(t) || (e = t, t = e.type);
        var n = document.createEvent(s[t] || "Events"),
            i = !0;
        if (e) for (var r in e)"bubbles" == r ? i = !! e[r] : n[r] = e[r];
        return n.initEvent(t, i, !0), E(n)
    }
}(Zepto), function(t) {
    function h(e, n, i) {
        var r = t.Event(n);
        return t(e).trigger(r, i), !r.isDefaultPrevented()
    }
    function p(t, e, i, r) {
        return t.global ? h(e || n, i, r) : void 0
    }
    function d(e) {
        e.global && 0 === t.active++ && p(e, null, "ajaxStart")
    }
    function m(e) {
        e.global && !--t.active && p(e, null, "ajaxStop")
    }
    function g(t, e) {
        var n = e.context;
        return e.beforeSend.call(n, t, e) === !1 || p(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void p(e, n, "ajaxSend", [t, e])
    }
    function v(t, e, n, i) {
        var r = n.context,
            o = "success";
        n.success.call(r, t, o, e), i && i.resolveWith(r, [t, o, e]), p(n, r, "ajaxSuccess", [e, n, t]), b(o, e, n)
    }
    function y(t, e, n, i, r) {
        var o = i.context;
        i.error.call(o, n, e, t), r && r.rejectWith(o, [n, e, t]), p(i, o, "ajaxError", [n, i, t || e]), b(e, n, i)
    }
    function b(t, e, n) {
        var i = n.context;
        n.complete.call(i, e, t), p(n, i, "ajaxComplete", [e, n]), m(n)
    }
    function w() {}
    function x(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == f ? "html" : t == u ? "json" : a.test(t) ? "script" : s.test(t) && "xml") || "text"
    }
    function T(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }
    function E(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = T(e.url, e.data), e.data = void 0)
    }
    function S(e, n, i, r) {
        return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), {
            url: e,
            data: n,
            success: i,
            dataType: r
        }
    }
    function j(e, n, i, r) {
        var o, a = t.isArray(n),
            s = t.isPlainObject(n);
        t.each(n, function(n, u) {
            o = t.type(u), r && (n = i ? r : r + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !r && a ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? j(e, u, i, n) : e.add(n, u)
        })
    }
    var i, r, e = 0,
        n = window.document,
        o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        a = /^(?:text|application)\/javascript/i,
        s = /^(?:text|application)\/xml/i,
        u = "application/json",
        f = "text/html",
        c = /^\s*$/,
        l = n.createElement("a");
    l.href = window.location.href, t.active = 0, t.ajaxJSONP = function(i, r) {
        if (!("type" in i)) return t.ajax(i);
        var f, h, o = i.jsonpCallback,
            a = (t.isFunction(o) ? o() : o) || "jsonp" + ++e,
            s = n.createElement("script"),
            u = window[a],
            c = function(e) {
                t(s).triggerHandler("error", e || "abort")
            },
            l = {
                abort: c
            };
        return r && r.promise(l), t(s).on("load error", function(e, n) {
            clearTimeout(h), t(s).off().remove(), "error" != e.type && f ? v(f[0], l, i, r) : y(null, n || "error", l, i, r), window[a] = u, f && t.isFunction(u) && u(f[0]), u = f = void 0
        }), g(l, i) === !1 ? (c("abort"), l) : (window[a] = function() {
            f = arguments
        }, s.src = i.url.replace(/\?(.+)=\?/, "?$1=" + a), n.head.appendChild(s), i.timeout > 0 && (h = setTimeout(function() {
            c("timeout")
        }, i.timeout)), l)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: w,
        success: w,
        error: w,
        complete: w,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: u,
            xml: "application/xml, text/xml",
            html: f,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function(e) {
        var s, u, o = t.extend({}, e || {}),
            a = t.Deferred && t.Deferred();
        for (i in t.ajaxSettings) void 0 === o[i] && (o[i] = t.ajaxSettings[i]);
        d(o), o.crossDomain || (s = n.createElement("a"), s.href = o.url, s.href = s.href, o.crossDomain = l.protocol + "//" + l.host != s.protocol + "//" + s.host), o.url || (o.url = window.location.toString()), (u = o.url.indexOf("#")) > -1 && (o.url = o.url.slice(0, u)), E(o);
        var f = o.dataType,
            h = /\?.+=\?/.test(o.url);
        if (h && (f = "jsonp"), o.cache !== !1 && (e && e.cache === !0 || "script" != f && "jsonp" != f) || (o.url = T(o.url, "_=" + Date.now())), "jsonp" == f) return h || (o.url = T(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(o, a);
        var A, p = o.accepts[f],
            m = {},
            b = function(t, e) {
                m[t.toLowerCase()] = [t, e]
            },
            S = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol,
            C = o.xhr(),
            j = C.setRequestHeader;
        if (a && a.promise(C), o.crossDomain || b("X-Requested-With", "XMLHttpRequest"), b("Accept", p || "*/*"), (p = o.mimeType || p) && (p.indexOf(",") > -1 && (p = p.split(",", 2)[0]), C.overrideMimeType && C.overrideMimeType(p)), (o.contentType || o.contentType !== !1 && o.data && "GET" != o.type.toUpperCase()) && b("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers) for (r in o.headers) b(r, o.headers[r]);
        if (C.setRequestHeader = b, C.onreadystatechange = function() {
                if (4 == C.readyState) {
                    C.onreadystatechange = w, clearTimeout(A);
                    var e, n = !1;
                    if (C.status >= 200 && C.status < 300 || 304 == C.status || 0 == C.status && "file:" == S) {
                        f = f || x(o.mimeType || C.getResponseHeader("content-type")), e = C.responseText;
                        try {
                            "script" == f ? (1, eval)(e) : "xml" == f ? e = C.responseXML : "json" == f && (e = c.test(e) ? null : t.parseJSON(e))
                        } catch (i) {
                            n = i
                        }
                        n ? y(n, "parsererror", C, o, a) : v(e, C, o, a)
                    } else y(C.statusText || null, C.status ? "error" : "abort", C, o, a)
                }
            }, g(C, o) === !1) return C.abort(), y(null, "abort", C, o, a), C;
        if (o.xhrFields) for (r in o.xhrFields) C[r] = o.xhrFields[r];
        var P = "async" in o ? o.async : !0;
        C.open(o.type, o.url, P, o.username, o.password);
        for (r in m) j.apply(C, m[r]);
       /* return o.timeout > 0 && (A = setTimeout(function() {
            C.onreadystatechange = w, C.abort(), y(null, "timeout", C, o, a)
        }, o.timeout)), C.send(o.data ? o.data : null), C*/
    }, t.get = function() {
        return t.ajax(S.apply(null, arguments))
    }, t.post = function() {
        var e = S.apply(null, arguments);
        //return e.type = "POST", t.ajax(e)
    }, t.getJSON = function() {
        var e = S.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function(e, n, i) {
        if (!this.length) return this;
        var s, r = this,
            a = e.split(/\s/),
            u = S(e, n, i),
            f = u.success;
        return a.length > 1 && (u.url = a[0], s = a[1]), u.success = function(e) {
            r.html(s ? t("<div>").html(e.replace(o, "")).find(s) : e), f && f.apply(r, arguments)
        }, t.ajax(u), this
    };
    var C = encodeURIComponent;
    t.param = function(e, n) {
        var i = [];
        return i.add = function(e, n) {
            t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(C(e) + "=" + C(n))
        }, j(i, e, n), i.join("&").replace(/%20/g, "+")
    }
}(Zepto), function(t) {
    t.fn.serializeArray = function() {
        var e, n, i = [],
            r = function(t) {
                return t.forEach ? t.forEach(r) : void i.push({
                    name: e,
                    value: t
                })
            };
        return this[0] && t.each(this[0].elements, function(i, o) {
            n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && r(t(o).val())
        }), i
    }, t.fn.serialize = function() {
        var t = [];
        return this.serializeArray().forEach(function(e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function(e) {
        if (0 in arguments) this.bind("submit", e);
        else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function() {
    try {
        getComputedStyle(void 0)
    } catch (t) {
        var e = getComputedStyle;
        window.getComputedStyle = function(t) {
            try {
                return e(t)
            } catch (n) {
                return null
            }
        }
    }
}(), function(t) {
    function e(t, e) {
        var n = this.os = {},
            i = this.browser = {},
            r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
            o = t.match(/(Android);?[\s\/]+([\d.]+)?/),
            a = !! t.match(/\(Macintosh\; Intel /),
            s = t.match(/(iPad).*OS\s([\d_]+)/),
            u = t.match(/(iPod)(.*OS\s([\d_]+))?/),
            f = !s && t.match(/(iPhone\sOS)\s([\d_]+)/),
            c = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            l = /Win\d{2}|Windows/.test(e),
            h = t.match(/Windows Phone ([\d.]+)/),
            p = c && t.match(/TouchPad/),
            d = t.match(/Kindle\/([\d.]+)/),
            m = t.match(/Silk\/([\d._]+)/),
            g = t.match(/(BlackBerry).*Version\/([\d.]+)/),
            v = t.match(/(BB10).*Version\/([\d.]+)/),
            y = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            b = t.match(/PlayBook/),
            w = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
            x = t.match(/Firefox\/([\d.]+)/),
            T = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
            E = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
            S = !w && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
            C = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
        (i.webkit = !! r) && (i.version = r[1]), o && (n.android = !0, n.version = o[2]), f && !u && (n.ios = n.iphone = !0, n.version = f[2].replace(/_/g, ".")), s && (n.ios = n.ipad = !0, n.version = s[2].replace(/_/g, ".")), u && (n.ios = n.ipod = !0, n.version = u[3] ? u[3].replace(/_/g, ".") : null), h && (n.wp = !0, n.version = h[1]), c && (n.webos = !0, n.version = c[2]), p && (n.touchpad = !0), g && (n.blackberry = !0, n.version = g[2]), v && (n.bb10 = !0, n.version = v[2]), y && (n.rimtabletos = !0, n.version = y[2]), b && (i.playbook = !0), d && (n.kindle = !0, n.version = d[1]), m && (i.silk = !0, i.version = m[1]), !m && n.android && t.match(/Kindle Fire/) && (i.silk = !0), w && (i.chrome = !0, i.version = w[1]), x && (i.firefox = !0, i.version = x[1]), T && (n.firefoxos = !0, n.version = T[1]), E && (i.ie = !0, i.version = E[1]), C && (a || n.ios || l) && (i.safari = !0, n.ios || (i.version = C[1])), S && (i.webview = !0), n.tablet = !! (s || b || o && !t.match(/Mobile/) || x && t.match(/Tablet/) || E && !t.match(/Phone/) && t.match(/Touch/)), n.phone = !(n.tablet || n.ipod || !(o || f || c || g || v || w && t.match(/Android/) || w && t.match(/CriOS\/([\d.]+)/) || x && t.match(/Mobile/) || E && t.match(/Touch/)))
    }
    e.call(t, navigator.userAgent, navigator.platform), t.__detect = e
}(Zepto), function(t) {
    var n, e = [];
    t.fn.remove = function() {
        return this.each(function() {
            this.parentNode && ("IMG" === this.tagName && (e.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", n && clearTimeout(n), n = setTimeout(function() {
                e = []
            }, 6e4)), this.parentNode.removeChild(this))
        })
    }
}(Zepto), function(t) {
    function a(o, a) {
        var u = o[r],
            f = u && e[u];
        if (void 0 === a) return f || s(o);
        if (f) {
            if (a in f) return f[a];
            var c = i(a);
            if (c in f) return f[c]
        }
        return n.call(t(o), a)
    }
    function s(n, o, a) {
        var s = n[r] || (n[r] = ++t.uuid),
            f = e[s] || (e[s] = u(n));
        return void 0 !== o && (f[i(o)] = a), f
    }
    function u(e) {
        var n = {};
        return t.each(e.attributes || o, function(e, r) {
            0 == r.name.indexOf("data-") && (n[i(r.name.replace("data-", ""))] = t.zepto.deserializeValue(r.value))
        }), n
    }
    var e = {},
        n = t.fn.data,
        i = t.camelCase,
        r = t.expando = "Zepto" + +new Date,
        o = [];
    t.fn.data = function(e, n) {
        return void 0 === n ? t.isPlainObject(e) ? this.each(function(n, i) {
            t.each(e, function(t, e) {
                s(i, t, e)
            })
        }) : 0 in this ? a(this[0], e) : void 0 : this.each(function() {
            s(this, e, n)
        })
    }, t.fn.removeData = function(n) {
        return "string" == typeof n && (n = n.split(/\s+/)), this.each(function() {
            var o = this[r],
                a = o && e[o];
            a && t.each(n || a, function(t) {
                delete a[n ? i(this) : t]
            })
        })
    }, ["remove", "empty"].forEach(function(e) {
        var n = t.fn[e];
        t.fn[e] = function() {
            var t = this.find("*");
            return "remove" === e && (t = t.add(this)), t.removeData(), n.call(this)
        }
    })
}(Zepto), function(t) {
    function n(e) {
        var i = [
                ["resolve", "done", t.Callbacks({
                    once: 1,
                    memory: 1
                }), "resolved"],
                ["reject", "fail", t.Callbacks({
                    once: 1,
                    memory: 1
                }), "rejected"],
                ["notify", "progress", t.Callbacks({
                    memory: 1
                })]
            ],
            r = "pending",
            o = {
                state: function() {
                    return r
                },
                always: function() {
                    return a.done(arguments).fail(arguments), this
                },
                then: function() {
                    var e = arguments;
                    return n(function(n) {
                        t.each(i, function(i, r) {
                            var s = t.isFunction(e[i]) && e[i];
                            a[r[1]](function() {
                                var e = s && s.apply(this, arguments);
                                if (e && t.isFunction(e.promise)) e.promise().done(n.resolve).fail(n.reject).progress(n.notify);
                                else {
                                    var i = this === o ? n.promise() : this,
                                        a = s ? [e] : arguments;
                                    n[r[0] + "With"](i, a)
                                }
                            })
                        }), e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? t.extend(e, o) : o
                }
            },
            a = {};
        return t.each(i, function(t, e) {
            var n = e[2],
                s = e[3];
            o[e[1]] = n.add, s && n.add(function() {
                r = s
            }, i[1 ^ t][2].disable, i[2][2].lock), a[e[0]] = function() {
                return a[e[0] + "With"](this === a ? o : this, arguments), this
            }, a[e[0] + "With"] = n.fireWith
        }), o.promise(a), e && e.call(a, a), a
    }
    var e = Array.prototype.slice;
    t.when = function(i) {
        var f, c, l, r = e.call(arguments),
            o = r.length,
            a = 0,
            s = 1 !== o || i && t.isFunction(i.promise) ? o : 0,
            u = 1 === s ? i : n(),
            h = function(t, n, i) {
                return function(r) {
                    n[t] = this, i[t] = arguments.length > 1 ? e.call(arguments) : r, i === f ? u.notifyWith(n, i) : --s || u.resolveWith(n, i)
                }
            };
        if (o > 1) for (f = new Array(o), c = new Array(o), l = new Array(o); o > a; ++a) r[a] && t.isFunction(r[a].promise) ? r[a].promise().done(h(a, l, r)).fail(u.reject).progress(h(a, c, f)) : --s;
        return s || u.resolveWith(l, r), u.promise()
    }, t.Deferred = n
}(Zepto), function(t) {
    t.Callbacks = function(e) {
        e = t.extend({}, e);
        var n, i, r, o, a, s, u = [],
            f = !e.once && [],
            c = function(t) {
                for (n = e.memory && t, i = !0, s = o || 0, o = 0, a = u.length, r = !0; u && a > s; ++s) if (u[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                    n = !1;
                    break
                }
                r = !1, u && (f ? f.length && c(f.shift()) : n ? u.length = 0 : l.disable())
            },
            l = {
                add: function() {
                    if (u) {
                        var i = u.length,
                            s = function(n) {
                                t.each(n, function(t, n) {
                                    "function" == typeof n ? e.unique && l.has(n) || u.push(n) : n && n.length && "string" != typeof n && s(n)
                                })
                            };
                        s(arguments), r ? a = u.length : n && (o = i, c(n))
                    }
                    return this
                },
                remove: function() {
                    return u && t.each(arguments, function(e, n) {
                        for (var i;
                             (i = t.inArray(n, u, i)) > -1;) u.splice(i, 1), r && (a >= i && --a, s >= i && --s)
                    }), this
                },
                has: function(e) {
                    return !(!u || !(e ? t.inArray(e, u) > -1 : u.length))
                },
                empty: function() {
                    return a = u.length = 0, this
                },
                disable: function() {
                    return u = f = n = void 0, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return f = void 0, n || l.disable(), this
                },
                locked: function() {
                    return !f
                },
                fireWith: function(t, e) {
                    return !u || i && !f || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? f.push(e) : c(e)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments)
                },
                fired: function() {
                    return !!i
                }
            };
        return l
    }
}(Zepto), function(t) {
    function u(t, e, n, i) {
        return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
    }
    function f() {
        o = null, e.last && (e.el.trigger("longTap"), e = {})
    }
    function c() {
        o && clearTimeout(o), o = null
    }
    function l() {
        n && clearTimeout(n), i && clearTimeout(i), r && clearTimeout(r), o && clearTimeout(o), n = i = r = o = null, e = {}
    }
    function h(t) {
        return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
    }
    function p(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
    }
    var n, i, r, o, s, e = {},
        a = 750;
    t(document).ready(function() {
        var d, m, y, b, g = 0,
            v = 0;
        "MSGesture" in window && (s = new MSGesture, s.target = document.body), t(document).bind("MSGestureEnd", function(t) {
            var n = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
            n && (e.el.trigger("swipe"), e.el.trigger("swipe" + n))
        }).on("touchstart MSPointerDown pointerdown", function(i) {
            (!(b = p(i, "down")) || h(i)) && (y = b ? i : i.touches[0], i.touches && 1 === i.touches.length && e.x2 && (e.x2 = void 0, e.y2 = void 0), d = Date.now(), m = d - (e.last || d), e.el = t("tagName" in y.target ? y.target : y.target.parentNode), n && clearTimeout(n), e.x1 = y.pageX, e.y1 = y.pageY, m > 0 && 250 >= m && (e.isDoubleTap = !0), e.last = d, o = setTimeout(f, a), s && b && s.addPointer(i.pointerId))
        }).on("touchmove MSPointerMove pointermove", function(t) {
            (!(b = p(t, "move")) || h(t)) && (y = b ? t : t.touches[0], c(), e.x2 = y.pageX, e.y2 = y.pageY, g += Math.abs(e.x1 - e.x2), v += Math.abs(e.y1 - e.y2))
        }).on("touchend MSPointerUp pointerup", function(o) {
            (!(b = p(o, "up")) || h(o)) && (c(), e.x2 && Math.abs(e.x1 - e.x2) > 30 || e.y2 && Math.abs(e.y1 - e.y2) > 30 ? r = setTimeout(function() {
                e.el.trigger("swipe"), e.el.trigger("swipe" + u(e.x1, e.x2, e.y1, e.y2)), e = {}
            }, 0) : "last" in e && (30 > g && 30 > v ? i = setTimeout(function() {
                var i = t.Event("tap");
                i.cancelTouch = l, e.el.trigger(i), e.isDoubleTap ? (e.el && e.el.trigger("doubleTap"), e = {}) : n = setTimeout(function() {
                    n = null, e.el && e.el.trigger("singleTap"), e = {}
                }, 250)
            }, 0) : e = {}), g = v = 0)
        }).on("touchcancel MSPointerCancel pointercancel", l), t(window).on("scroll", l)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
        t.fn[e] = function(t) {
            return this.on(e, t)
        }
    })
}(Zepto);
!
    function(a) {
        var b = {};
        b.cache = {}, a.tpl = function(a, c, d) {
            var e = /[^\w\-\.:]/.test(a) ?
                function(a, b) {
                    var c, d = [],
                        f = [];
                    for (c in a) d.push(c), f.push(a[c]);
                    return new Function(d, e.code).apply(b || a, f)
                } : b.cache[a] = b.cache[a] || this.get(document.getElementById(a).innerHTML);
            return e.code = e.code || "var $parts=[]; $parts.push('" + a.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/(^|%>)[^\t]*/g, function(a) {
                    return a.replace(/'/g, "\\'")
                }).replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("$parts.push('") + "'); return $parts.join('');", c ? e(c, d) : e
        }, a.adaptObject = function(b, c, d, e, f, g) {
            var h = b;
            if ("string" != typeof d) {
                var i = a.extend({}, c, "object" == typeof d && d),
                    j = !1;
                a.isArray(h) && h.length && "script" == a(h)[0].nodeName.toLowerCase() ? (h = a(a.tpl(h[0].innerHTML, i)).appendTo("body"), j = !0) : a.isArray(h) && h.length && "" == h.selector ? (h = a(a.tpl(h[0].outerHTML, i)).appendTo("body"), j = !0) : a.isArray(h) || (h = a(a.tpl(e, i)).appendTo("body"), j = !0)
            }
            return h.each(function() {
                var b = a(this),
                    e = b.data("fz." + g);
                e || b.data("fz." + g, e = new f(this, a.extend({}, c, "object" == typeof d && d), j)), "string" == typeof d && e[d]()
            })
        }
    }(window.Zepto), !
    function(a) {
        function b() {}
        function c(b) {
            return a.adaptObject(this, e, b, d, f, "chosen")
        }
        var d = '<div class="ui-dialog ui-dialog-top"><ul class="ui-list ui-list-text ui-list-active ui-list-cover ui-border-tb"><% for (var i = 0; i < source.length; i++) { %><% if (source[i]["value"] === select) { %><li class="ui-border-t active" data-role="button" data-index="<%=i%>"><p><%=source[i]["key"]%></p></li><% } else { %><li class="ui-border-t" data-role="button" data-index="<%=i%>"><p><%=source[i]["key"]%></p></li><% } %><% } %></ul></div>',
            e = {
                title: "",
                source: [{
                    key: "请选择",
                    value: "0"
                }],
                select: "",
                multiple: !1,
                allowScroll: !1,
                callback: function() {}
            },
            f = function(b, c, d) {
                this.option = a.extend(e, c), this.element = a(b), this._isFromTpl = d, this.button = a(b).find('[data-role="button"]'), this._bindEvent(), this.toggle()
            };
        f.prototype = {
            _bindEvent: function() {
                var b = this;
                b.button.on("touchend", function(a) {
                    a.preventDefault()
                }), b.button.on("tap", function(c) {
                    var d = a(this).data("index"),
                        c = a.Event("chosen:action");
                    c.index = d, b.element.trigger(c), b.option.multiple || b.hide.apply(b)
                })
            },
            toggle: function() {
                this.element.hasClass("show") ? this.hide() : this.show()
            },
            show: function() {
                var c = this;
                c.element.trigger(a.Event("chosen:show")), c.element.addClass("show"), !this.option.allowScroll && c.element.on("touchmove", b)
            },
            hide: function() {
                var c = this;
                c.element.trigger(a.Event("chosen:hide")), c.element.off("touchmove", b), c.element.removeClass("show"), c._isFromTpl && c.element.remove()
            }
        }, a.fn.chosen = a.chosen = c
    }(window.Zepto), !
    function(a) {
        function b() {
            return !1
        }
        function c(b) {
            return a.adaptObject(this, e, b, d, f, "dialog")
        }
        var d = '<div class="ui-dialog"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><div><h4><%=title%></h4><div><%=content%></div></div></div><div class="ui-dialog-ft ui-btn-group"><% for (var i = 0; i < button.length; i++) { %><% if (i == select) { %><button type="button" data-role="button"  class="select" id="dialogButton<%=i%>"><%=button[i]%></button><% } else { %><button type="button" data-role="button" id="dialogButton<%=i%>"><%=button[i]%></div><% } %><% } %></div></div></div>',
            e = {
                title: "",
                content: "",
                button: ["确认"],
                select: 0,
                allowScroll: !1,
                callback: function() {}
            },
            f = function(b, c, d) {
                this.option = a.extend(e, c), this.element = a(b), this._isFromTpl = d, this.button = a(b).find('[data-role="button"]'), this._bindEvent(), this.toggle()
            };
        f.prototype = {
            _bindEvent: function() {
                var b = this;
                b.button.on("touchend", function(a) {
                    a.preventDefault()
                }), b.button.on("tap", function(c) {
                    var d = a(b.button).index(a(this)),
                        c = a.Event("dialog:action");
                    c.index = d, b.element.trigger(c), b.hide.apply(b)
                })
            },
            toggle: function() {
                this.element.hasClass("show") ? this.hide() : this.show()
            },
            show: function() {
                var c = this;
                c.element.trigger(a.Event("dialog:show")), c.element.addClass("show"), !this.option.allowScroll && c.element.on("touchmove", b)
            },
            hide: function() {
                var c = this;
                c.element.trigger(a.Event("dialog:hide")), c.element.off("touchmove", b), c.element.removeClass("show"), c._isFromTpl && c.element.remove()
            }
        }, a.fn.dialog = a.dialog = c
    }(window.Zepto), !
    function(a) {
        function b(b) {
            return a.adaptObject(this, d, b, c, e, "loading")
        }
        var c = '<div class="ui-loading-block show"><div class="ui-loading-cnt"><i class="ui-loading-bright"></i><p><%=content%></p></div></div>',
            d = {
                content: "加载中..."
            },
            e = function(b, c, e) {
                this.element = a(b), this._isFromTpl = e, this.option = a.extend(d, c), this.show()
            };
        e.prototype = {
            show: function() {
                var b = a.Event("loading:show");
                this.element.trigger(b), this.element.show()
            },
            hide: function() {
                var b = a.Event("loading:hide");
                this.element.trigger(b), this.element.remove()
            }
        }, a.fn.loading = a.loading = b
    }(window.Zepto), function(a) {
    function b(b, c) {
        this.wrapper = "string" == typeof b ? a(b)[0] : b, this.options = {
            startX: 0,
            startY: 0,
            scrollY: !0,
            scrollX: !1,
            directionLockThreshold: 5,
            momentum: !0,
            duration: 300,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            eventPassthrough: !0,
            freeScroll: !1,
            bindToWrapper: !0,
            resizePolling: 60,
            disableMouse: !1,
            disableTouch: !1,
            disablePointer: !1,
            tap: !0,
            click: !1,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0
        };
        for (var e in c) this.options[e] = c[e];
        if (this.options.role || this.options.scrollX !== !1 || (this.options.eventPassthrough = "horizontal"), "slider" === this.options.role) {
            if (this.options.scrollX = !0, this.options.scrollY = !1, this.options.momentum = !1, this.scroller = a(".ui-slider-content", this.wrapper)[0], a(this.scroller.children[0]).addClass("current"), this.currentPage = 0, this.count = this.scroller.children.length, this.scroller.style.width = this.count + "00%", this.itemWidth = this.scroller.children[0].clientWidth, this.scrollWidth = this.itemWidth * this.count, this.options.indicator) {
                for (var f = '<ul class="ui-slider-indicators">', e = 1; e <= this.count; e++) f += 1 === e ? '<li class="current">' + e + "</li>" : "<li>" + e + "</li>";
                f += "</ul>", a(this.wrapper).append(f), this.indicator = a(".ui-slider-indicators", this.wrapper)[0]
            }
        } else "tab" === this.options.role ? (this.options.scrollX = !0, this.options.scrollY = !1, this.options.momentum = !1, this.scroller = a(".ui-tab-content", this.wrapper)[0], this.nav = a(".ui-tab-nav", this.wrapper)[0], a(this.scroller.children[0]).addClass("current"), a(this.nav.children[0]).addClass("current"), this.currentPage = 0, this.count = this.scroller.children.length, this.scroller.style.width = this.count + "00%", this.itemWidth = this.scroller.children[0].clientWidth, this.scrollWidth = this.itemWidth * this.count) : this.scroller = this.wrapper.children[0];
        if (this.scrollerStyle = this.scroller.style, this.translateZ = d.hasPerspective && this.options.HWCompositing ? " translateZ(0)" : "", this.options.useTransition = d.hasTransition && this.options.useTransition, this.options.useTransform = d.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? d.ease[this.options.bounceEasing] || d.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.options.useTransform === !1 && (this.scroller.style.position = "relative"), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable(), this.options.autoplay) {
            var g = this;
            this.options.interval = this.options.interval || 2e3, this.options.flag = setTimeout(function() {
                g._autoplay.apply(g)
            }, g.options.interval)
        }
    }
    var c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(a) {
            window.setTimeout(a, 1e3 / 60)
        }, d = function() {
        function a(a) {
            return d === !1 ? !1 : "" === d ? a : d + a.charAt(0).toUpperCase() + a.substr(1)
        }
        var b = {},
            c = document.createElement("div").style,
            d = function() {
                for (var a, b = ["t", "webkitT", "MozT", "msT", "OT"], d = 0, e = b.length; e > d; d++) if (a = b[d] + "ransform", a in c) return b[d].substr(0, b[d].length - 1);
                return !1
            }();
        b.getTime = Date.now ||
            function() {
                return (new Date).getTime()
            }, b.extend = function(a, b) {
            for (var c in b) a[c] = b[c]
        }, b.addEvent = function(a, b, c, d) {
            a.addEventListener(b, c, !! d)
        }, b.removeEvent = function(a, b, c, d) {
            a.removeEventListener(b, c, !! d)
        }, b.prefixPointerEvent = function(a) {
            return window.MSPointerEvent ? "MSPointer" + a.charAt(9).toUpperCase() + a.substr(10) : a
        }, b.momentum = function(a, b, c, d, e, f) {
            var g, h, i = a - b,
                j = Math.abs(i) / c;
            return f = void 0 === f ? 6e-4 : f, g = a + j * j / (2 * f) * (0 > i ? -1 : 1), h = j / f, d > g ? (g = e ? d - e / 2.5 * (j / 8) : d, i = Math.abs(g - a), h = i / j) : g > 0 && (g = e ? e / 2.5 * (j / 8) : 0, i = Math.abs(a) + g, h = i / j), {
                destination: Math.round(g),
                duration: h
            }
        };
        var e = a("transform");
        return b.extend(b, {
            hasTransform: e !== !1,
            hasPerspective: a("perspective") in c,
            hasTouch: "ontouchstart" in window,
            hasPointer: window.PointerEvent || window.MSPointerEvent,
            hasTransition: a("transition") in c
        }), b.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion), b.extend(b.style = {}, {
            transform: e,
            transitionTimingFunction: a("transitionTimingFunction"),
            transitionDuration: a("transitionDuration"),
            transitionDelay: a("transitionDelay"),
            transformOrigin: a("transformOrigin"),
            transitionProperty: a("transitionProperty")
        }), b.offset = function(a) {
            for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
            return {
                left: b,
                top: c
            }
        }, b.preventDefaultException = function(a, b) {
            for (var c in b) if (b[c].test(a[c])) return !0;
            return !1
        }, b.extend(b.eventType = {}, {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,
            mousedown: 2,
            mousemove: 2,
            mouseup: 2,
            pointerdown: 3,
            pointermove: 3,
            pointerup: 3,
            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        }), b.extend(b.ease = {}, {
            quadratic: {
                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fn: function(a) {
                    return a * (2 - a)
                }
            },
            circular: {
                style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                fn: function(a) {
                    return Math.sqrt(1 - --a * a)
                }
            },
            back: {
                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                fn: function(a) {
                    var b = 4;
                    return (a -= 1) * a * ((b + 1) * a + b) + 1
                }
            },
            bounce: {
                style: "",
                fn: function(a) {
                    return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }
            },
            elastic: {
                style: "",
                fn: function(a) {
                    var b = .22,
                        c = .4;
                    return 0 === a ? 0 : 1 == a ? 1 : c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b / 4) * Math.PI / b) + 1
                }
            }
        }), b.tap = function(a, b) {
            var c = document.createEvent("Event");
            c.initEvent(b, !0, !0), c.pageX = a.pageX, c.pageY = a.pageY, a.target.dispatchEvent(c)
        }, b.click = function(a) {
            var b, c = a.target;
            /(SELECT|INPUT|TEXTAREA)/i.test(c.tagName) || (b = document.createEvent("MouseEvents"), b.initMouseEvent("click", !0, !0, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), b._constructed = !0, c.dispatchEvent(b))
        }, b
    }();
    b.prototype = {
        _init: function() {
            this._initEvents()
        },
        _initEvents: function(a) {
            var b = a ? d.removeEvent : d.addEvent,
                c = this.options.bindToWrapper ? this.wrapper : window;
            b(window, "orientationchange", this), b(window, "resize", this), this.options.click && b(this.wrapper, "click", this, !0), this.options.disableMouse || (b(this.wrapper, "mousedown", this), b(c, "mousemove", this), b(c, "mousecancel", this), b(c, "mouseup", this)), d.hasPointer && !this.options.disablePointer && (b(this.wrapper, d.prefixPointerEvent("pointerdown"), this), b(c, d.prefixPointerEvent("pointermove"), this), b(c, d.prefixPointerEvent("pointercancel"), this), b(c, d.prefixPointerEvent("pointerup"), this)), d.hasTouch && !this.options.disableTouch && (b(this.wrapper, "touchstart", this), b(c, "touchmove", this), b(c, "touchcancel", this), b(c, "touchend", this)), b(this.scroller, "transitionend", this), b(this.scroller, "webkitTransitionEnd", this), b(this.scroller, "oTransitionEnd", this), b(this.scroller, "MSTransitionEnd", this), "tab" === this.options.role && (b(this.nav, "touchend", this), b(this.nav, "mouseup", this), b(this.nav, "pointerup", this))
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight;
            var a = window.getComputedStyle(this.wrapper, null),
                b = a["padding-top"].replace(/[^-\d.]/g, ""),
                c = a["padding-bottom"].replace(/[^-\d.]/g, ""),
                e = a["padding-left"].replace(/[^-\d.]/g, ""),
                f = a["padding-right"].replace(/[^-\d.]/g, ""),
                g = window.getComputedStyle(this.scroller, null),
                h = g["margin-top"].replace(/[^-\d.]/g, ""),
                i = g["margin-bottom"].replace(/[^-\d.]/g, ""),
                j = g["margin-left"].replace(/[^-\d.]/g, ""),
                k = g["margin-right"].replace(/[^-\d.]/g, "");
            this.scrollerWidth = this.scroller.offsetWidth + parseInt(e) + parseInt(f) + parseInt(j) + parseInt(k), this.scrollerHeight = this.scroller.offsetHeight + parseInt(b) + parseInt(c) + parseInt(h) + parseInt(i), ("slider" === this.options.role || "tab" === this.options.role) && (this.itemWidth = this.scroller.children[0].clientWidth, this.scrollWidth = this.itemWidth * this.count, this.scrollerWidth = this.scrollWidth), this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = d.offset(this.wrapper), this.resetPosition()
        },
        handleEvent: function(a) {
            switch (a.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(a);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(a);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(a);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(a);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(a);
                    break;
                case "keydown":
                    this._key(a);
                    break;
                case "click":
                    a._constructed || (a.preventDefault(), a.stopPropagation())
            }
        },
        _start: function(a) {
            if (!(1 != d.eventType[a.type] && 0 !== a.button || !this.enabled || this.initiated && d.eventType[a.type] !== this.initiated)) {
                !this.options.preventDefault || d.isBadAndroid || d.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
                var b, c = a.touches ? a.touches[0] : a;
                if (this.initiated = d.eventType[a.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = d.getTime(), this.options.useTransition && this.isInTransition && "slider" !== this.options.role && "tab" !== this.options.role ? (this.isInTransition = !1, b = this.getComputedPosition(), this._translate(Math.round(b.x), Math.round(b.y))) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = c.pageX, this.pointY = c.pageY, this.options.autoplay) {
                    var e = this;
                    clearTimeout(this.options.flag), this.options.flag = setTimeout(function() {
                        e._autoplay.apply(e)
                    }, e.options.interval)
                }
                event.stopPropagation()
            }
        },
        _move: function(b) {
            if (this.enabled && d.eventType[b.type] === this.initiated) {
                this.options.preventDefault && b.preventDefault();
                var c, e, f, g, h = b.touches ? b.touches[0] : b,
                    i = h.pageX - this.pointX,
                    j = h.pageY - this.pointY,
                    k = d.getTime();
                if (this.pointX = h.pageX, this.pointY = h.pageY, this.distX += i, this.distY += j, f = Math.abs(this.distX), g = Math.abs(this.distY), !(k - this.endTime > 300 && 10 > f && 10 > g)) {
                    if (this.directionLocked || this.options.freeScroll || (this.directionLocked = f > g + this.options.directionLockThreshold ? "h" : g >= f + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
                        if ("tab" === this.options.role && a(this.scroller).children("li").height("auto"), "vertical" == this.options.eventPassthrough) b.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                        j = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough) b.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                        i = 0
                    }
                    i = this.hasHorizontalScroll ? i : 0, j = this.hasVerticalScroll ? j : 0, c = this.x + i, e = this.y + j, (c > 0 || c < this.maxScrollX) && (c = this.options.bounce ? this.x + i / 3 : c > 0 ? 0 : this.maxScrollX), (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + j / 3 : e > 0 ? 0 : this.maxScrollY), this.directionX = i > 0 ? -1 : 0 > i ? 1 : 0, this.directionY = j > 0 ? -1 : 0 > j ? 1 : 0, this.moved = !0, this._translate(c, e), k - this.startTime > 300 && (this.startTime = k, this.startX = this.x, this.startY = this.y)
                }
            }
        },
        _end: function(b) {
            if (this.enabled && d.eventType[b.type] === this.initiated) {
                this.options.preventDefault && !d.preventDefaultException(b.target, this.options.preventDefaultException) && b.preventDefault();
                var c, e, f = (b.changedTouches ? b.changedTouches[0] : b, d.getTime() - this.startTime),
                    g = Math.round(this.x),
                    h = Math.round(this.y),
                    i = Math.abs(g - this.startX),
                    j = (Math.abs(h - this.startY), 0),
                    k = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = d.getTime(), this.resetPosition(this.options.bounceTime)) return void("tab" === this.options.role && a(this.scroller.children[this.currentPage]).siblings("li").height(0));
                if (this.scrollTo(g, h), this.moved || (this.options.tap && 1 === d.eventType[b.type] && d.tap(b, this.options.tap), this.options.click && d.click(b)), this.options.momentum && 300 > f && (c = this.hasHorizontalScroll ? d.momentum(this.x, this.startX, f, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                        destination: g,
                        duration: 0
                    }, e = this.hasVerticalScroll ? d.momentum(this.y, this.startY, f, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                        destination: h,
                        duration: 0
                    }, g = c.destination, h = e.destination, j = Math.max(c.duration, e.duration), this.isInTransition = 1), g != this.x || h != this.y) return (g > 0 || g < this.maxScrollX || h > 0 || h < this.maxScrollY) && (k = d.ease.quadratic), void this.scrollTo(g, h, j, k);
                if ("tab" === this.options.role && a(event.target).closest("ul").hasClass("ui-tab-nav")) {
                    a(this.nav).children().removeClass("current"), a(event.target).addClass("current");
                    var l = this.currentPage;
                    this.currentPage = a(event.target).index(), a(this.scroller).children().height("auto"), this._execEvent("beforeScrollStart", l, this.currentPage)
                }("slider" === this.options.role || "tab" === this.options.role) && (30 > i ? this.scrollTo(-this.itemWidth * this.currentPage, 0, this.options.bounceTime, this.options.bounceEasing) : g - this.startX < 0 ? (this._execEvent("beforeScrollStart", this.currentPage, this.currentPage + 1), this.scrollTo(-this.itemWidth * ++this.currentPage, 0, this.options.bounceTime, this.options.bounceEasing)) : g - this.startX >= 0 && (this._execEvent("beforeScrollStart", this.currentPage, this.currentPage - 1), this.scrollTo(-this.itemWidth * --this.currentPage, 0, this.options.bounceTime, this.options.bounceEasing)), "tab" === this.options.role && a(this.scroller.children[this.currentPage]).siblings("li").height(0), this.indicator && i >= 30 ? (a(this.indicator).children().removeClass("current"), a(this.indicator.children[this.currentPage]).addClass("current")) : this.nav && i >= 30 && (a(this.nav).children().removeClass("current"), a(this.nav.children[this.currentPage]).addClass("current")), a(this.scroller).children().removeClass("current"), a(this.scroller.children[this.currentPage]).addClass("current"))
            }
        },
        _resize: function() {
            var a = this;
            clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                a.refresh()
            }, this.options.resizePolling)
        },
        _transitionEnd: function(a) {
            a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd", this.currentPage)))
        },
        destroy: function() {
            this._initEvents(!0)
        },
        resetPosition: function(a) {
            var b = this.x,
                c = this.y;
            return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), b == this.x && c == this.y ? !1 : (this.scrollTo(b, c, a, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        on: function(a, b) {
            this._events[a] || (this._events[a] = []), this._events[a].push(b)
        },
        off: function(a, b) {
            if (this._events[a]) {
                var c = this._events[a].indexOf(b);
                c > -1 && this._events[a].splice(c, 1)
            }
        },
        _execEvent: function(a) {
            if (this._events[a]) {
                var b = 0,
                    c = this._events[a].length;
                if (c) for (; c > b; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollTo: function(a, b, c, e) {
            e = e || d.ease.circular, this.isInTransition = this.options.useTransition && c > 0, !c || this.options.useTransition && e.style ? (("slider" === this.options.role || "tab" === this.options.role) && (c = this.options.duration, this.scrollerStyle[d.style.transitionProperty] = d.style.transform), this.scrollerStyle[d.style.transitionTimingFunction] = e.style, this._transitionTime(c), this._translate(a, b)) : this._animate(a, b, c, e.fn)
        },
        scrollToElement: function(a, b, c, e, f) {
            if (a = a.nodeType ? a : this.scroller.querySelector(a)) {
                var g = d.offset(a);
                g.left -= this.wrapperOffset.left, g.top -= this.wrapperOffset.top, c === !0 && (c = Math.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), e === !0 && (e = Math.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), g.left -= c || 0, g.top -= e || 0, g.left = g.left > 0 ? 0 : g.left < this.maxScrollX ? this.maxScrollX : g.left, g.top = g.top > 0 ? 0 : g.top < this.maxScrollY ? this.maxScrollY : g.top, b = void 0 === b || null === b || "auto" === b ? Math.max(Math.abs(this.x - g.left), Math.abs(this.y - g.top)) : b, this.scrollTo(g.left, g.top, b, f)
            }
        },
        _transitionTime: function(a) {
            a = a || 0, this.scrollerStyle[d.style.transitionDuration] = a + "ms", !a && d.isBadAndroid && (this.scrollerStyle[d.style.transitionDuration] = "0.001s")
        },
        _translate: function(a, b) {
            this.options.useTransform ? this.scrollerStyle[d.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = Math.round(a), b = Math.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px"), this.x = a, this.y = b
        },
        getComputedPosition: function() {
            var a, b, c = window.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (c = c[d.style.transform].split(")")[0].split(", "), a = +(c[12] || c[4]), b = +(c[13] || c[5])) : (a = +c.left.replace(/[^-\d.]/g, ""), b = +c.top.replace(/[^-\d.]/g, "")), {
                x: a,
                y: b
            }
        },
        _animate: function(a, b, e, f) {
            function g() {
                var m, n, o, p = d.getTime();
                return p >= l ? (h.isAnimating = !1, h._translate(a, b), void(h.resetPosition(h.options.bounceTime) || h._execEvent("scrollEnd", this.currentPage))) : (p = (p - k) / e, o = f(p), m = (a - i) * o + i, n = (b - j) * o + j, h._translate(m, n), void(h.isAnimating && c(g)))
            }
            var h = this,
                i = this.x,
                j = this.y,
                k = d.getTime(),
                l = k + e;
            this.isAnimating = !0, g()
        },
        _autoplay: function() {
            var b = this,
                c = b.currentPage;
            b.currentPage = b.currentPage >= b.count - 1 ? 0 : ++b.currentPage, b._execEvent("beforeScrollStart", c, b.currentPage), "tab" === this.options.role && (a(this.scroller).children().height("auto"), document.body.scrollTop = 0), b.scrollTo(-b.itemWidth * b.currentPage, 0, b.options.bounceTime, b.options.bounceEasing), b.indicator ? (a(b.indicator).children().removeClass("current"), a(b.indicator.children[b.currentPage]).addClass("current"), a(b.scroller).children().removeClass("current"), a(b.scroller.children[b.currentPage]).addClass("current")) : b.nav && (a(b.nav).children().removeClass("current"), a(b.nav.children[b.currentPage]).addClass("current"), a(b.scroller).children().removeClass("current"), a(b.scroller.children[b.currentPage]).addClass("current")), b.options.flag = setTimeout(function() {
                b._autoplay.apply(b)
            }, b.options.interval)
        }
    }, window.fz = window.fz || {}, window.frozen = window.frozen || {}, window.fz.Scroll = window.frozen.Scroll = b, "function" == typeof define && define(function(a, c, d) {
        d.exports = b
    })
}(window.Zepto), !
    function(a) {
        function b(b) {
            return a.adaptObject(this, d, b, c, e, "tips")
        }
        var c = '<div class="ui-poptips ui-poptips-<%=type%>"><div class="ui-poptips-cnt"><i></i><%=content%></div></div>',
            d = {
                content: "",
                stayTime: 1e3,
                type: "info",
                callback: function() {}
            },
            e = function(b, c, e) {
                var f = this;
                this.element = a(b), this._isFromTpl = e, this.elementHeight = a(b).height(), this.option = a.extend(d, c), a(b).css({
                    "-webkit-transform": "translateY(-" + this.elementHeight + "px)"
                }), setTimeout(function() {
                    a(b).css({
                        "-webkit-transition": "all .5s"
                    }), f.show()
                }, 20)
            };
        e.prototype = {
            show: function() {
                var b = this;
                b.element.trigger(a.Event("tips:show")), this.element.css({
                    "-webkit-transform": "translateY(0px)"
                }), b.option.stayTime > 0 && setTimeout(function() {
                    b.hide()
                }, b.option.stayTime)
            },
            hide: function() {
                var b = this;
                b.element.trigger(a.Event("tips:hide")), this.element.css({
                    "-webkit-transform": "translateY(-" + this.elementHeight + "px)"
                }), setTimeout(function() {
                    b._isFromTpl && b.element.remove()
                }, 500)
            }
        }, a.fn.tips = a.tips = b
    }(window.Zepto);
!
    function() {
        "use strict";

        function t(e, o) {
            function i(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            }
            var r;
            if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
                for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);
                n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                    var i = Node.prototype.removeEventListener;
                    "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
                }, e.addEventListener = function(t, n, o) {
                    var i = Node.prototype.addEventListener;
                    "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                            t.propagationStopped || n(t)
                        }), o) : i.call(e, t, n, o)
                }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                    r(t)
                }, !1), e.onclick = null)
            }
        }
        var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
            n = navigator.userAgent.indexOf("Android") > 0 && !e,
            o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
            i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            r = o && /OS [6-7]_\d/.test(navigator.userAgent),
            a = navigator.userAgent.indexOf("BB10") > 0;
        t.prototype.needsClick = function(t) {
            switch (t.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (t.disabled) return !0;
                    break;
                case "input":
                    if (o && "file" === t.type || t.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(t.className)
        }, t.prototype.needsFocus = function(t) {
            switch (t.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !n;
                case "input":
                    switch (t.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !t.disabled && !t.readOnly;
                default:
                    return /\bneedsfocus\b/.test(t.className)
            }
        }, t.prototype.sendClick = function(t, e) {
            var n, o;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
        }, t.prototype.determineEventType = function(t) {
            return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
        }, t.prototype.focus = function(t) {
            var e;
            o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
        }, t.prototype.updateScrollParent = function(t) {
            var e, n;
            if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
                n = t;
                do {
                    if (n.scrollHeight > n.offsetHeight) {
                        e = n, t.fastClickScrollParent = n;
                        break
                    }
                    n = n.parentElement
                } while (n)
            }
            e && (e.fastClickLastScrollTop = e.scrollTop)
        }, t.prototype.getTargetElementFromEventTarget = function(t) {
            return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
        }, t.prototype.onTouchStart = function(t) {
            var e, n, r;
            if (t.targetTouches.length > 1) return !0;
            if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
                if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
                if (!i) {
                    if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                    this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
        }, t.prototype.touchHasMoved = function(t) {
            var e = t.changedTouches[0],
                n = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
        }, t.prototype.onTouchMove = function(t) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
        }, t.prototype.findControl = function(t) {
            return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, t.prototype.onTouchEnd = function(t) {
            var e, a, c, s, u, l = this.targetElement;
            if (!this.trackingClick) return !0;
            if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
                if (e = this.findControl(l)) {
                    if (this.focus(l), n) return !1;
                    l = e
                }
            } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
            return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
        }, t.prototype.onTouchCancel = function() {
            this.trackingClick = !1, this.targetElement = null
        }, t.prototype.onMouse = function(t) {
            return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
        }, t.prototype.onClick = function(t) {
            var e;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
        }, t.prototype.destroy = function() {
            var t = this.layer;
            n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, t.notNeeded = function(t) {
            var e, o, i, r;
            if ("undefined" == typeof window.ontouchstart) return !0;
            if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!n) return !0;
                if (e = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                    if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }
            if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
            return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
        }, t.attach = function(e, n) {
            return new t(e, n)
        }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return t
        }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
    }();
/*! For license information please see prebid.js.LICENSE.txt */
(() => {
    var __webpack_modules__ = {
            72: (e, t) => {
                "use strict";
                var n;
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e) {
                        null !== e && this.fromHexString(e)
                    }
                    return e.prototype.toHexString = function() {
                        if (this.s < 0) return "-" + this.negate().toHexString();
                        var e, t = !1,
                            n = "",
                            r = this.t,
                            i = this.DB - r * this.DB % 4;
                        if (r-- > 0)
                            for (i < this.DB && (e = this[r] >> i) > 0 && (t = !0, n = u(e)); r >= 0;) i < 4 ? (e = (this[r] & (1 << i) - 1) << 4 - i, e |= this[--r] >> (i += this.DB - 4)) : (e = this[r] >> (i -= 4) & 15, i <= 0 && (i += this.DB, --r)), e > 0 && (t = !0), t && (n += u(e));
                        return t ? n : "0"
                    }, e.prototype.fromHexString = function(t) {
                        if (null !== t) {
                            this.t = 0, this.s = 0;
                            for (var n = t.length, r = !1, i = 0; --n >= 0;) {
                                var o = c(t, n);
                                o < 0 ? "-" == t.charAt(n) && (r = !0) : (r = !1, 0 == i ? this[this.t++] = o : i + 4 > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - i) - 1) << i, this[this.t++] = o >> this.DB - i) : this[this.t - 1] |= o << i, (i += 4) >= this.DB && (i -= this.DB))
                            }
                            this.clamp(), r && e.ZERO.subTo(this, this)
                        }
                    }, e.prototype.negate = function() {
                        var t = i();
                        return e.ZERO.subTo(this, t), t
                    }, e.prototype.abs = function() {
                        return this.s < 0 ? this.negate() : this
                    }, e.prototype.mod = function(t) {
                        var n = i();
                        return this.abs().divRemTo(t, null, n), this.s < 0 && n.compareTo(e.ZERO) > 0 && t.subTo(n, n), n
                    }, e.prototype.copyTo = function(e) {
                        for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
                        e.t = this.t, e.s = this.s
                    }, e.prototype.lShiftTo = function(e, t) {
                        for (var n = e % this.DB, r = this.DB - n, i = (1 << r) - 1, o = Math.floor(e / this.DB), s = this.s << n & this.DM, a = this.t - 1; a >= 0; --a) t[a + o + 1] = this[a] >> r | s, s = (this[a] & i) << n;
                        for (a = o - 1; a >= 0; --a) t[a] = 0;
                        t[o] = s, t.t = this.t + o + 1, t.s = this.s, t.clamp()
                    }, e.prototype.invDigit = function() {
                        if (this.t < 1) return 0;
                        var e = this[0];
                        if (!(1 & e)) return 0;
                        var t = 3 & e;
                        return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
                    }, e.prototype.dlShiftTo = function(e, t) {
                        var n;
                        for (n = this.t - 1; n >= 0; --n) t[n + e] = this[n];
                        for (n = e - 1; n >= 0; --n) t[n] = 0;
                        t.t = this.t + e, t.s = this.s
                    }, e.prototype.squareTo = function(e) {
                        for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0;) e[n] = 0;
                        for (n = 0; n < t.t - 1; ++n) {
                            var r = t.am(n, t[n], e, 2 * n, 0, 1);
                            (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV, e[n + t.t + 1] = 1)
                        }
                        e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)), e.s = 0, e.clamp()
                    }, e.prototype.multiplyTo = function(t, n) {
                        var r = this.abs(),
                            i = t.abs(),
                            o = r.t;
                        for (n.t = o + i.t; --o >= 0;) n[o] = 0;
                        for (o = 0; o < i.t; ++o) n[o + r.t] = r.am(0, i[o], n, o, 0, r.t);
                        n.s = 0, n.clamp(), this.s != t.s && e.ZERO.subTo(n, n)
                    }, e.prototype.divRemTo = function(t, n, r) {
                        var s = t.abs();
                        if (!(s.t <= 0)) {
                            var a = this.abs();
                            if (a.t < s.t) return null != n && n.fromHexString("0"), void(null != r && this.copyTo(r));
                            null == r && (r = i());
                            var d = i(),
                                c = this.s,
                                l = t.s,
                                u = this.DB - o(s[s.t - 1]);
                            u > 0 ? (s.lShiftTo(u, d), a.lShiftTo(u, r)) : (s.copyTo(d), a.copyTo(r));
                            var p = d.t,
                                f = d[p - 1];
                            if (0 != f) {
                                var m = f * (1 << this.F1) + (p > 1 ? d[p - 2] >> this.F2 : 0),
                                    g = this.FV / m,
                                    b = (1 << this.F1) / m,
                                    h = 1 << this.F2,
                                    v = r.t,
                                    y = v - p,
                                    _ = null == n ? i() : n;
                                for (d.dlShiftTo(y, _), r.compareTo(_) >= 0 && (r[r.t++] = 1, r.subTo(_, r)), e.ONE.dlShiftTo(p, _), _.subTo(d, d); d.t < p;) d[d.t++] = 0;
                                for (; --y >= 0;) {
                                    var I = r[--v] == f ? this.DM : Math.floor(r[v] * g + (r[v - 1] + h) * b);
                                    if ((r[v] += d.am(0, I, r, y, 0, p)) < I)
                                        for (d.dlShiftTo(y, _), r.subTo(_, r); r[v] < --I;) r.subTo(_, r)
                                }
                                null != n && (r.drShiftTo(p, n), c != l && e.ZERO.subTo(n, n)), r.t = p, r.clamp(), u > 0 && r.rShiftTo(u, r), c < 0 && e.ZERO.subTo(r, r)
                            }
                        }
                    }, e.prototype.rShiftTo = function(e, t) {
                        t.s = this.s;
                        var n = Math.floor(e / this.DB);
                        if (n >= this.t) t.t = 0;
                        else {
                            var r = e % this.DB,
                                i = this.DB - r,
                                o = (1 << r) - 1;
                            t[0] = this[n] >> r;
                            for (var s = n + 1; s < this.t; ++s) t[s - n - 1] |= (this[s] & o) << i, t[s - n] = this[s] >> r;
                            r > 0 && (t[this.t - n - 1] |= (this.s & o) << i), t.t = this.t - n, t.clamp()
                        }
                    }, e.prototype.drShiftTo = function(e, t) {
                        for (var n = e; n < this.t; ++n) t[n - e] = this[n];
                        t.t = Math.max(this.t - e, 0), t.s = this.s
                    }, e.prototype.subTo = function(e, t) {
                        for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i;) r += this[n] - e[n], t[n++] = r & this.DM, r >>= this.DB;
                        if (e.t < this.t) {
                            for (r -= e.s; n < this.t;) r += this[n], t[n++] = r & this.DM, r >>= this.DB;
                            r += this.s
                        } else {
                            for (r += this.s; n < e.t;) r -= e[n], t[n++] = r & this.DM, r >>= this.DB;
                            r -= e.s
                        }
                        t.s = r < 0 ? -1 : 0, r < -1 ? t[n++] = this.DV + r : r > 0 && (t[n++] = r), t.t = n, t.clamp()
                    }, e.prototype.clamp = function() {
                        for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;) --this.t
                    }, e.prototype.modPowInt = function(e, t) {
                        var n;
                        return n = e < 256 || t.isEven() ? new p(t) : new f(t), this.exp(e, n)
                    }, e.prototype.exp = function(t, n) {
                        if (t > 4294967295 || t < 1) return e.ONE;
                        var r = i(),
                            s = i(),
                            a = n.convert(this),
                            d = o(t) - 1;
                        for (a.copyTo(r); --d >= 0;)
                            if (n.sqrTo(r, s), (t & 1 << d) > 0) n.mulTo(s, a, r);
                            else {
                                var c = r;
                                r = s, s = c
                            }
                        return n.revert(r)
                    }, e.prototype.isEven = function() {
                        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                    }, e.prototype.compareTo = function(e) {
                        var t = this.s - e.s;
                        if (0 != t) return t;
                        var n = this.t;
                        if (0 != (t = n - e.t)) return this.s < 0 ? -t : t;
                        for (; --n >= 0;)
                            if (0 != (t = this[n] - e[n])) return t;
                        return 0
                    }, e.prototype.am1 = function(e, t, n, r, i, o) {
                        for (; --o >= 0;) {
                            var s = t * this[e++] + n[r] + i;
                            i = Math.floor(s / 67108864), n[r++] = 67108863 & s
                        }
                        return i
                    }, e.prototype.am2 = function(e, t, n, r, i, o) {
                        for (var s = 32767 & t, a = t >> 15; --o >= 0;) {
                            var d = 32767 & this[e],
                                c = this[e++] >> 15,
                                l = a * d + c * s;
                            i = ((d = s * d + ((32767 & l) << 15) + n[r] + (1073741823 & i)) >>> 30) + (l >>> 15) + a * c + (i >>> 30), n[r++] = 1073741823 & d
                        }
                        return i
                    }, e.prototype.am3 = function(e, t, n, r, i, o) {
                        for (var s = 16383 & t, a = t >> 14; --o >= 0;) {
                            var d = 16383 & this[e],
                                c = this[e++] >> 14,
                                l = a * d + c * s;
                            i = ((d = s * d + ((16383 & l) << 14) + n[r] + i) >> 28) + (l >> 14) + a * c, n[r++] = 268435455 & d
                        }
                        return i
                    }, e
                }();

                function i() {
                    return new r(null)
                }

                function o(e) {
                    var t, n = 1;
                    return 0 != (t = e >>> 16) && (e = t, n += 16), 0 != (t = e >> 8) && (e = t, n += 8), 0 != (t = e >> 4) && (e = t, n += 4), 0 != (t = e >> 2) && (e = t, n += 2), 0 != (t = e >> 1) && (e = t, n += 1), n
                }
                t.BigInteger = r, t.nbi = i, t.nbits = o;
                var s, a, d = [];
                for (s = "0".charCodeAt(0), a = 0; a <= 9; ++a) d[s++] = a;
                for (s = "a".charCodeAt(0), a = 10; a < 36; ++a) d[s++] = a;
                for (s = "A".charCodeAt(0), a = 10; a < 36; ++a) d[s++] = a;

                function c(e, t) {
                    var n = d[e.charCodeAt(t)];
                    return null == n ? -1 : n
                }
                t.intAt = c;
                var l = "0123456789abcdefghijklmnopqrstuvwxyz";

                function u(e) {
                    return l.charAt(e)
                }
                t.int2char = u, t.b64toHex = function(e) {
                    var t, n = "",
                        r = 0,
                        i = 0;
                    for (t = 0; t < e.length && "=" != e.charAt(t); ++t) {
                        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(t));
                        o < 0 || (0 == r ? (n += u(o >> 2), i = 3 & o, r = 1) : 1 == r ? (n += u(i << 2 | o >> 4), i = 15 & o, r = 2) : 2 == r ? (n += u(i), n += u(o >> 2), i = 3 & o, r = 3) : (n += u(i << 2 | o >> 4), n += u(15 & o), r = 0))
                    }
                    return 1 == r && (n += u(i << 2)), n
                }, t.removeExtraSymbols = function(e) {
                    return e.replace(/^1f+00/, "").replace("3031300d060960864801650304020105000420", "")
                };
                var p = function() {
                        function e(e) {
                            this.m = e
                        }
                        return e.prototype.convert = function(e) {
                            return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
                        }, e.prototype.revert = function(e) {
                            return e
                        }, e.prototype.reduce = function(e) {
                            e.divRemTo(this.m, null, e)
                        }, e.prototype.mulTo = function(e, t, n) {
                            e.multiplyTo(t, n), this.reduce(n)
                        }, e.prototype.sqrTo = function(e, t) {
                            e.squareTo(t), this.reduce(t)
                        }, e
                    }(),
                    f = function() {
                        function e(e) {
                            this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
                        }
                        return e.prototype.convert = function(e) {
                            var t = i();
                            return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(r.ZERO) > 0 && this.m.subTo(t, t), t
                        }, e.prototype.revert = function(e) {
                            var t = i();
                            return e.copyTo(t), this.reduce(t), t
                        }, e.prototype.reduce = function(e) {
                            for (; e.t <= this.mt2;) e[e.t++] = 0;
                            for (var t = 0; t < this.m.t; ++t) {
                                var n = 32767 & e[t],
                                    r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                                for (e[n = t + this.m.t] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV;) e[n] -= e.DV, e[++n]++
                            }
                            e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
                        }, e.prototype.mulTo = function(e, t, n) {
                            e.multiplyTo(t, n), this.reduce(n)
                        }, e.prototype.sqrTo = function(e, t) {
                            e.squareTo(t), this.reduce(t)
                        }, e
                    }();

                function m(e) {
                    var t = i();
                    return t.fromHexString(e.toString()), t
                }
                t.nbv = m, r.ZERO = m(0), r.ONE = m(1), "Microsoft Internet Explorer" == navigator.appName ? (r.prototype.am = r.prototype.am2, n = 30) : "Netscape" != navigator.appName ? (r.prototype.am = r.prototype.am1, n = 26) : (r.prototype.am = r.prototype.am3, n = 28), r.prototype.DB = n, r.prototype.DM = (1 << n) - 1, r.prototype.DV = 1 << n, r.prototype.FV = Math.pow(2, 52), r.prototype.F1 = 52 - n, r.prototype.F2 = 2 * n - 52
            },
            160: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = function() {
                    function e() {}
                    return e.hash = function(t) {
                        t = e.utf8Encode(t || "");
                        for (var n = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], r = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], i = (t += String.fromCharCode(128)).length / 4 + 2, o = Math.ceil(i / 16), s = new Array(o), a = 0; a < o; a++) {
                            s[a] = new Array(16);
                            for (var d = 0; d < 16; d++) s[a][d] = t.charCodeAt(64 * a + 4 * d) << 24 | t.charCodeAt(64 * a + 4 * d + 1) << 16 | t.charCodeAt(64 * a + 4 * d + 2) << 8 | t.charCodeAt(64 * a + 4 * d + 3)
                        }
                        var c = 8 * (t.length - 1) / Math.pow(2, 32),
                            l = 8 * (t.length - 1) >>> 0;
                        for (s[o - 1][14] = Math.floor(c), s[o - 1][15] = l, a = 0; a < o; a++) {
                            for (var u = new Array(64), p = 0; p < 16; p++) u[p] = s[a][p];
                            for (p = 16; p < 64; p++) u[p] = e.q1(u[p - 2]) + u[p - 7] + e.q0(u[p - 15]) + u[p - 16] >>> 0;
                            var f = r[0],
                                m = r[1],
                                g = r[2],
                                b = r[3],
                                h = r[4],
                                v = r[5],
                                y = r[6],
                                _ = r[7];
                            for (p = 0; p < 64; p++) {
                                var I = _ + e.z1(h) + e.Ch(h, v, y) + n[p] + u[p],
                                    E = e.z0(f) + e.Maj(f, m, g);
                                _ = y, y = v, v = h, h = b + I >>> 0, b = g, g = m, m = f, f = I + E >>> 0
                            }
                            r[0] = r[0] + f >>> 0, r[1] = r[1] + m >>> 0, r[2] = r[2] + g >>> 0, r[3] = r[3] + b >>> 0, r[4] = r[4] + h >>> 0, r[5] = r[5] + v >>> 0, r[6] = r[6] + y >>> 0, r[7] = r[7] + _ >>> 0
                        }
                        var A = new Array(r.length);
                        for (_ = 0; _ < r.length; _++) A[_] = ("00000000" + r[_].toString(16)).slice(-8);
                        return A.join("")
                    }, e.utf8Encode = function(e) {
                        try {
                            return (new TextEncoder).encode(e).reduce((function(e, t) {
                                return e + String.fromCharCode(t)
                            }), "")
                        } catch (t) {
                            return unescape(encodeURIComponent(e))
                        }
                    }, e.ROTR = function(e, t) {
                        return t >>> e | t << 32 - e
                    }, e.z0 = function(t) {
                        return e.ROTR(2, t) ^ e.ROTR(13, t) ^ e.ROTR(22, t)
                    }, e.z1 = function(t) {
                        return e.ROTR(6, t) ^ e.ROTR(11, t) ^ e.ROTR(25, t)
                    }, e.q0 = function(t) {
                        return e.ROTR(7, t) ^ e.ROTR(18, t) ^ t >>> 3
                    }, e.q1 = function(t) {
                        return e.ROTR(17, t) ^ e.ROTR(19, t) ^ t >>> 10
                    }, e.Ch = function(e, t, n) {
                        return e & t ^ ~e & n
                    }, e.Maj = function(e, t, n) {
                        return e & t ^ e & n ^ t & n
                    }, e
                }();
                t.Sha256 = n
            },
            146: (e, t, n) => {
                "use strict";
                var r = n(72),
                    i = n(160);
                t.M = function(e, t, n, o) {
                    var s = new r.BigInteger(r.b64toHex(t)),
                        a = new r.BigInteger(r.b64toHex(n)),
                        d = s.modPowInt(o, a);
                    return r.removeExtraSymbols(d.toHexString()) === i.Sha256.hash(e)
                }
            },
            384: (e, t, n) => {
                "use strict";

                function r(e, t, n, r, i) {
                    for (t = t.split ? t.split(".") : t, r = 0; r < t.length; r++) e = e ? e[t[r]] : i;
                    return e === i ? n : e
                }
                n.d(t, {
                    A: () => r
                })
            },
            505: e => {
                a.SYNC = 1, a.ASYNC = 2, a.QUEUE = 4;
                var t = "fun-hooks",
                    n = Object.freeze({
                        useProxy: !0,
                        ready: 0
                    }),
                    r = new WeakMap,
                    i = "2,1,0" === [1].reduce((function(e, t, n) {
                        return [e, t, n]
                    }), 2).toString() ? Array.prototype.reduce : function(e, t) {
                        var n, r = Object(this),
                            i = r.length >>> 0,
                            o = 0;
                        if (t) n = t;
                        else {
                            for (; o < i && !(o in r);) o++;
                            n = r[o++]
                        }
                        for (; o < i;) o in r && (n = e(n, r[o], o, r)), o++;
                        return n
                    };

                function o(e, t) {
                    return Array.prototype.slice.call(e, t)
                }
                var s = Object.assign || function(e) {
                    return i.call(o(arguments, 1), (function(e, t) {
                        return t && Object.keys(t).forEach((function(n) {
                            e[n] = t[n]
                        })), e
                    }), e)
                };

                function a(e) {
                    var d, c = {},
                        l = [];

                    function u(e, t) {
                        return "function" == typeof e ? g.call(null, "sync", e, t) : "string" == typeof e && "function" == typeof t ? g.apply(null, arguments) : "object" == typeof e ? p.apply(null, arguments) : void 0
                    }

                    function p(e, t, n) {
                        var r = !0;
                        void 0 === t && (t = Object.getOwnPropertyNames(e), r = !1);
                        var i = {},
                            o = ["constructor"];
                        do {
                            (t = t.filter((function(t) {
                                return !("function" != typeof e[t] || -1 !== o.indexOf(t) || t.match(/^_/))
                            }))).forEach((function(t) {
                                var r = t.split(":"),
                                    o = r[0],
                                    s = r[1] || "sync";
                                if (!i[o]) {
                                    var a = e[o];
                                    i[o] = e[o] = g(s, a, n ? [n, o] : void 0)
                                }
                            })), e = Object.getPrototypeOf(e)
                        } while (r && e);
                        return i
                    }

                    function f(e) {
                        var n = Array.isArray(e) ? e : e.split(".");
                        return i.call(n, (function(r, i, o) {
                            var s = r[i],
                                a = !1;
                            return s || (o === n.length - 1 ? (d || l.push((function() {
                                a || console.warn(t + ": referenced '" + e + "' but it was never created")
                            })), r[i] = m((function(e) {
                                r[i] = e, a = !0
                            }))) : r[i] = {})
                        }), c)
                    }

                    function m(e) {
                        var t = [],
                            n = [],
                            i = function() {},
                            o = {
                                before: function(e, n) {
                                    return d.call(this, t, "before", e, n)
                                },
                                after: function(e, t) {
                                    return d.call(this, n, "after", e, t)
                                },
                                getHooks: function(e) {
                                    var r = t.concat(n);
                                    "object" == typeof e && (r = r.filter((function(t) {
                                        return Object.keys(e).every((function(n) {
                                            return t[n] === e[n]
                                        }))
                                    })));
                                    try {
                                        s(r, {
                                            remove: function() {
                                                return r.forEach((function(e) {
                                                    e.remove()
                                                })), this
                                            }
                                        })
                                    } catch (e) {
                                        console.error("error adding `remove` to array, did you modify Array.prototype?")
                                    }
                                    return r
                                },
                                removeAll: function() {
                                    return this.getHooks().remove()
                                }
                            },
                            a = {
                                install: function(r, o, s) {
                                    this.type = r, i = s, s(t, n), e && e(o)
                                }
                            };
                        return r.set(o.after, a), o;

                        function d(e, r, o, s) {
                            var a = {
                                hook: o,
                                type: r,
                                priority: s || 10,
                                remove: function() {
                                    var r = e.indexOf(a); - 1 !== r && (e.splice(r, 1), i(t, n))
                                }
                            };
                            return e.push(a), e.sort((function(e, t) {
                                return t.priority - e.priority
                            })), i(t, n), this
                        }
                    }

                    function g(n, i, c) {
                        var u = i.after && r.get(i.after);
                        if (u) {
                            if (u.type !== n) throw t + ": recreated hookable with different type";
                            return i
                        }
                        var p, g, b = c ? f(c) : m(),
                            h = {
                                get: function(e, t) {
                                    return b[t] || Reflect.get.apply(Reflect, arguments)
                                }
                            };
                        return d || l.push(v), e.useProxy && "function" == typeof Proxy && Proxy.revocable ? g = new Proxy(i, h) : (g = function() {
                            return h.apply ? h.apply(i, this, o(arguments)) : i.apply(this, arguments)
                        }, s(g, b)), r.get(g.after).install(n, g, (function(e, t) {
                            var r, i = [];

                            function s(e) {
                                i.push(e.hook)
                            }
                            e.length || t.length ? (e.forEach(s), r = i.push(void 0) - 1, t.forEach(s), p = function(e, t, s) {
                                var a, d = 0,
                                    c = "async" === n && "function" == typeof s[s.length - 1] && s.pop();

                                function l(e) {
                                    "sync" === n ? a = e : c && c.apply(null, arguments)
                                }

                                function u(e) {
                                    if (i[d]) {
                                        var r = o(arguments);
                                        return u.bail = l, r.unshift(u), i[d++].apply(t, r)
                                    }
                                    "sync" === n ? a = e : c && c.apply(null, arguments)
                                }
                                return i[r] = function() {
                                    var r = o(arguments, 1);
                                    "async" === n && c && (delete u.bail, r.push(u));
                                    var i = e.apply(t, r);
                                    "sync" === n && u(i)
                                }, u.apply(null, s), a
                            }) : p = void 0, v()
                        })), g;

                        function v() {
                            !d && ("sync" !== n || e.ready & a.SYNC) && ("async" !== n || e.ready & a.ASYNC) ? "sync" !== n && e.ready & a.QUEUE ? h.apply = function() {
                                var e = arguments;
                                l.push((function() {
                                    g.apply(e[1], e[2])
                                }))
                            } : h.apply = function() {
                                throw t + ": hooked function not ready"
                            } : h.apply = p
                        }
                    }
                    return (e = s({}, n, e)).ready ? u.ready = function() {
                        d = !0,
                            function(e) {
                                for (var t; t = e.shift();) t()
                            }(l)
                    } : d = !0, u.get = f, u
                }
                e.exports = a
            },
            511: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                "use strict";
                var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(504),
                    _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(831),
                    _src_utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(686),
                    _src_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(384),
                    _src_adloader_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(286),
                    _src_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(678),
                    _src_config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(718),
                    _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(233),
                    criteo_direct_rsa_validate_build_verify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(146),
                    _src_storageManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(128),
                    _src_refererDetection_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(556),
                    _src_utils_gpdr_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(607),
                    _src_Renderer_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(487),
                    _src_video_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(781),
                    _src_ajax_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(330);

                function ownKeys(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t && (r = r.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), n.push.apply(n, r)
                    }
                    return n
                }

                function _objectSpread(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? ownKeys(Object(n), !0).forEach((function(t) {
                            (0, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.A)(e, t, n[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }))
                    }
                    return e
                }
                const GVLID = 91,
                    ADAPTER_VERSION = 36,
                    BIDDER_CODE = "criteo",
                    CDB_ENDPOINT = "https://bidder.criteo.com/cdb",
                    PROFILE_ID_INLINE = 207,
                    PROFILE_ID_PUBLISHERTAG = 185,
                    storage = (0, _src_storageManager_js__WEBPACK_IMPORTED_MODULE_2__.vM)({
                        bidderCode: BIDDER_CODE
                    }),
                    LOG_PREFIX = "Criteo: ",
                    FAST_BID_VERSION_PLACEHOLDER = "%FAST_BID_VERSION%",
                    FAST_BID_VERSION_CURRENT = 144,
                    FAST_BID_VERSION_LATEST = "latest",
                    FAST_BID_VERSION_NONE = "none",
                    PUBLISHER_TAG_URL_TEMPLATE = "https://static.criteo.net/js/ld/publishertag.prebid" + FAST_BID_VERSION_PLACEHOLDER + ".js",
                    PUBLISHER_TAG_OUTSTREAM_SRC = "https://static.criteo.net/js/ld/publishertag.renderer.js",
                    FAST_BID_PUBKEY_E = 65537,
                    FAST_BID_PUBKEY_N = "ztQYwCE5BU7T9CDM5he6rKoabstXRmkzx54zFPZkWbK530dwtLBDeaWBMxHBUT55CYyboR/EZ4efghPi3CoNGfGWezpjko9P6p2EwGArtHEeS4slhu/SpSIFMjG6fdrpRoNuIAMhq1Z+Pr/+HOd1pThFKeGFr2/NhtAg+TXAzaU=",
                    OPTOUT_COOKIE_NAME = "cto_optout",
                    BUNDLE_COOKIE_NAME = "cto_bundle",
                    GUID_RETENTION_TIME_HOUR = 9360,
                    OPTOUT_RETENTION_TIME_HOUR = 43200,
                    spec = {
                        code: BIDDER_CODE,
                        gvlid: GVLID,
                        supportedMediaTypes: [_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.D4, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.G_, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.s6],
                        getUserSyncs: function(e, t, n, r) {
                            let i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                                {
                                    gppString: o = "",
                                    applicableSections: s = []
                                } = i;
                            if (e.iframeEnabled && (0, _src_utils_gpdr_js__WEBPACK_IMPORTED_MODULE_4__.C)(n)) {
                                if (canFastBid(_src_config_js__WEBPACK_IMPORTED_MODULE_5__.$W.getConfig("criteo.fastBidVersion"))) return [];
                                const e = (0, _src_refererDetection_js__WEBPACK_IMPORTED_MODULE_6__.EN)(),
                                    t = "criteoPrebidAdapter",
                                    i = [];
                                if (i.push(`origin=${t}`), i.push(`topUrl=${e.domain}`), n && (n.gdprApplies && i.push("gdpr=" + (1 == n.gdprApplies ? 1 : 0)), n.consentString && i.push(`gdpr_consent=${n.consentString}`)), r && i.push(`us_privacy=${r}`), i.push(`gpp=${o}`), Array.isArray(s))
                                    for (const e of s) i.push(`gpp_sid=${e}`);
                                const a = Math.random().toString(),
                                    d = {
                                        bundle: readFromAllStorages(BUNDLE_COOKIE_NAME),
                                        cw: storage.cookiesAreEnabled(),
                                        lsw: storage.localStorageIsEnabled(),
                                        optoutCookie: readFromAllStorages(OPTOUT_COOKIE_NAME),
                                        origin: t,
                                        requestId: a,
                                        tld: e.domain,
                                        topUrl: e.domain,
                                        version: "8.51.0".replace(/\./g, "_")
                                    };
                                window.addEventListener("message", (function e(t) {
                                    if (!t.data || "https://gum.criteo.com" != t.origin) return;
                                    if (t.data.requestId !== a) return;
                                    this.removeEventListener("message", e), t.stopImmediatePropagation();
                                    const n = t.data;
                                    n.optout ? (deleteFromAllStorages(BUNDLE_COOKIE_NAME), saveOnAllStorages(OPTOUT_COOKIE_NAME, !0, OPTOUT_RETENTION_TIME_HOUR)) : n.bundle && saveOnAllStorages(BUNDLE_COOKIE_NAME, n.bundle, GUID_RETENTION_TIME_HOUR)
                                }), !0);
                                const c = JSON.stringify(d).replace(/"/g, "%22");
                                return [{
                                    type: "iframe",
                                    url: `https://gum.criteo.com/syncframe?${i.join("&")}#${c}`
                                }]
                            }
                            if (e.pixelEnabled && (0, _src_utils_gpdr_js__WEBPACK_IMPORTED_MODULE_4__.C)(n)) {
                                const e = [];
                                if (e.push("profile=207"), n && (!0 === n.gdprApplies && e.push("gdprapplies=true"), n.consentString && e.push(`gdpr=${n.consentString}`)), r && e.push(`ccpa=${r}`), e.push(`gpp=${o}`), Array.isArray(s))
                                    for (const t of s) e.push(`gpp_sid=${t}`);
                                return [{
                                    type: "image",
                                    url: `https://ssp-sync.criteo.com/user-sync/redirect?${e.join("&")}`
                                }]
                            }
                            return []
                        },
                        isBidRequestValid: e => !(!e || !e.params || !e.params.zoneId && !e.params.networkId || hasVideoMediaType(e) && !hasValidVideoMediaType(e)),
                        buildRequests: (e, t) => {
                            var n, r;
                            let i, o, s = t.ortb2 || {};
                            Object.assign(t, {
                                publisherExt: null === (n = s.site) || void 0 === n ? void 0 : n.ext,
                                userExt: null === (r = s.user) || void 0 === r ? void 0 : r.ext,
                                ceh: _src_config_js__WEBPACK_IMPORTED_MODULE_5__.$W.getConfig("criteo.ceh"),
                                coppa: _src_config_js__WEBPACK_IMPORTED_MODULE_5__.$W.getConfig("coppa")
                            });
                            const a = _src_config_js__WEBPACK_IMPORTED_MODULE_5__.$W.getConfig("criteo.fastBidVersion"),
                                d = canFastBid(a);
                            if (!publisherTagAvailable() && d) {
                                window.Criteo = window.Criteo || {}, window.Criteo.usePrebidEvents = !1, tryGetCriteoFastBid();
                                const e = getFastBidUrl(a);
                                setTimeout((() => {
                                    (0, _src_adloader_js__WEBPACK_IMPORTED_MODULE_7__.R)(e, BIDDER_CODE)
                                }), t.timeout)
                            }
                            if (publisherTagAvailable()) {
                                const n = new Criteo.PubTag.Adapters.Prebid(PROFILE_ID_PUBLISHERTAG, ADAPTER_VERSION, e, t, "8.51.0", {
                                    createOutstreamVideoRenderer
                                });
                                i = n.buildCdbUrl(), o = n.buildCdbRequest()
                            } else {
                                const n = buildContext(e, t);
                                i = buildCdbUrl(n), o = buildCdbRequest(n, e, t)
                            }
                            if (o) return {
                                method: "POST",
                                url: i,
                                data: o,
                                bidRequests: e
                            }
                        },
                        interpretResponse: (e, t) => {
                            var n;
                            const r = e.body || e;
                            if (publisherTagAvailable()) {
                                const e = Criteo.PubTag.Adapters.Prebid.GetAdapter(t);
                                if (e) return e.interpretResponse(r, t)
                            }
                            const i = [],
                                o = [];
                            return r && r.slots && (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.cy)(r.slots) && r.slots.forEach((n => {
                                const o = getAssociatedBidRequest(t.bidRequests, n);
                                if (o) {
                                    var s, a, d, c;
                                    const t = o.bidId,
                                        l = {
                                            requestId: t,
                                            cpm: n.cpm,
                                            currency: n.currency,
                                            netRevenue: !0,
                                            ttl: n.ttl || 60,
                                            creativeId: n.creativecode,
                                            width: n.width,
                                            height: n.height,
                                            dealId: n.deal
                                        };
                                    if (null !== (s = r.ext) && void 0 !== s && null !== (s = s.paf) && void 0 !== s && s.transmission && null !== (a = n.ext) && void 0 !== a && null !== (a = a.paf) && void 0 !== a && a.content_id) {
                                        const t = {
                                            content_id: n.ext.paf.content_id,
                                            transmission: e.ext.paf.transmission
                                        };
                                        l.meta = Object.assign({}, l.meta, {
                                            paf: t
                                        })
                                    }
                                    n.adomain && (l.meta = Object.assign({}, l.meta, {
                                        advertiserDomains: [n.adomain].flat()
                                    })), null !== (d = n.ext) && void 0 !== d && null !== (d = d.meta) && void 0 !== d && d.networkName && (l.meta = Object.assign({}, l.meta, {
                                        networkName: n.ext.meta.networkName
                                    })), null !== (c = n.ext) && void 0 !== c && c.dsa && (l.meta = Object.assign({}, l.meta, {
                                        dsa: n.ext.dsa
                                    })), n.native ? o.params.nativeCallback ? l.ad = createNativeAd(t, n.native, o.params.nativeCallback) : (l.native = createPrebidNativeAd(n.native), l.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.s6) : n.video ? (l.vastUrl = n.displayurl, l.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.G_, (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(o, "mediaTypes.video.context") === _src_video_js__WEBPACK_IMPORTED_MODULE_10__.H6 && (l.renderer = createOutstreamVideoRenderer(n))) : l.ad = n.creative, i.push(l)
                                }
                            })), (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.cy)(null === (n = r.ext) || void 0 === n ? void 0 : n.igi) && r.ext.igi.forEach((e => {
                                (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.cy)(null == e ? void 0 : e.igs) && e.igs.forEach((e => {
                                    o.push(e)
                                }))
                            })), o.length ? {
                                bids: i,
                                fledgeAuctionConfigs: o
                            } : i
                        },
                        onTimeout: e => {
                            if (publisherTagAvailable() && Array.isArray(e)) {
                                var t = [];
                                e.forEach((e => {
                                    -1 === t.indexOf(e.auctionId) && (t.push(e.auctionId), Criteo.PubTag.Adapters.Prebid.GetAdapter(e.auctionId).handleBidTimeout())
                                }))
                            }
                        },
                        onBidWon: e => {
                            publisherTagAvailable() && e && Criteo.PubTag.Adapters.Prebid.GetAdapter(e.auctionId).handleBidWon(e)
                        },
                        onSetTargeting: e => {
                            publisherTagAvailable() && Criteo.PubTag.Adapters.Prebid.GetAdapter(e.auctionId).handleSetTargeting(e)
                        },
                        onDataDeletionRequest: e => {
                            const t = readFromAllStorages(BUNDLE_COOKIE_NAME);
                            t && (deleteFromAllStorages(BUNDLE_COOKIE_NAME), (0, _src_ajax_js__WEBPACK_IMPORTED_MODULE_11__.RD)("https://privacy.criteo.com/api/privacy/datadeletionrequest", null, JSON.stringify({
                                publisherUserId: t
                            }), {
                                contentType: "application/json",
                                method: "POST"
                            }))
                        }
                    };

                function readFromAllStorages(e) {
                    const t = storage.getCookie(e),
                        n = storage.getDataFromLocalStorage(e);
                    return t || n || void 0
                }

                function saveOnAllStorages(e, t, n) {
                    const r = new Date;
                    r.setTime(r.getTime() + 60 * n * 60 * 1e3);
                    const i = `expires=${r.toUTCString()}`;
                    storage.setCookie(e, t, i), storage.setDataInLocalStorage(e, t)
                }

                function deleteFromAllStorages(e) {
                    storage.setCookie(e, "", 0), storage.removeDataFromLocalStorage(e)
                }

                function publisherTagAvailable() {
                    return "undefined" != typeof Criteo && Criteo.PubTag && Criteo.PubTag.Adapters && Criteo.PubTag.Adapters.Prebid
                }

                function buildContext(e, t) {
                    var n;
                    let r = "";
                    t && t.refererInfo && (r = t.refererInfo.page);
                    const i = (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.Dl)(null == t || null === (n = t.refererInfo) || void 0 === n ? void 0 : n.topmostLocation).search,
                        o = {
                            url: r,
                            debug: "1" === i.pbt_debug,
                            noLog: "1" === i.pbt_nolog,
                            amp: !1
                        };
                    return e.forEach((e => {
                        "amp" === e.params.integrationMode && (o.amp = !0)
                    })), o
                }

                function buildCdbUrl(e) {
                    let t = CDB_ENDPOINT;
                    t += "?profileId=" + PROFILE_ID_INLINE, t += "&av=" + String(ADAPTER_VERSION), t += "&wv=" + encodeURIComponent("8.51.0"), t += "&cb=" + String(Math.floor(99999999999 * Math.random())), storage.localStorageIsEnabled() ? t += "&lsavail=1" : t += "&lsavail=0", e.amp && (t += "&im=1"), e.debug && (t += "&debug=1"), e.noLog && (t += "&nolog=1");
                    const n = readFromAllStorages(BUNDLE_COOKIE_NAME);
                    return n && (t += `&bundle=${n}`), readFromAllStorages(OPTOUT_COOKIE_NAME) && (t += "&optout=1"), t
                }

                function checkNativeSendId(e) {
                    return !(e.nativeParams && (e.nativeParams.image && (!0 !== e.nativeParams.image.sendId || !0 === e.nativeParams.image.sendTargetingKeys) || e.nativeParams.icon && (!0 !== e.nativeParams.icon.sendId || !0 === e.nativeParams.icon.sendTargetingKeys) || e.nativeParams.clickUrl && (!0 !== e.nativeParams.clickUrl.sendId || !0 === e.nativeParams.clickUrl.sendTargetingKeys) || e.nativeParams.displayUrl && (!0 !== e.nativeParams.displayUrl.sendId || !0 === e.nativeParams.displayUrl.sendTargetingKeys) || e.nativeParams.privacyLink && (!0 !== e.nativeParams.privacyLink.sendId || !0 === e.nativeParams.privacyLink.sendTargetingKeys) || e.nativeParams.privacyIcon && (!0 !== e.nativeParams.privacyIcon.sendId || !0 === e.nativeParams.privacyIcon.sendTargetingKeys)))
                }

                function buildCdbRequest(e, t, n) {
                    var r, i, o, s, a, d, c, l, u, p;
                    let f, m, g, b, h = Object.assign({}, {
                        coppa: !0 === n.coppa ? 1 : !1 === n.coppa ? 0 : void 0
                    }, null === (r = n.ortb2) || void 0 === r ? void 0 : r.regs);
                    const v = {
                        id: (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.lk)(),
                        publisher: {
                            url: e.url,
                            ext: n.publisherExt
                        },
                        regs: h,
                        slots: t.map((e => {
                            var t, r, i;
                            b || (b = e.userIdAsEids), f = e.params.networkId || f, m = e.params.pubid || m, g = e.schain || g;
                            const o = {
                                slotid: e.bidId,
                                impid: e.adUnitCode,
                                transactionid: null === (t = e.ortb2Imp) || void 0 === t || null === (t = t.ext) || void 0 === t ? void 0 : t.tid
                            };
                            if (e.params.zoneId && (o.zoneid = e.params.zoneId), (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "ortb2Imp.ext") && (o.ext = e.ortb2Imp.ext), (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "ortb2Imp.rwdd") && (o.rwdd = e.ortb2Imp.rwdd), e.params.ext && (o.ext = Object.assign({}, o.ext, e.params.ext)), null !== (r = e.nativeOrtbRequest) && void 0 !== r && r.assets && (o.ext = Object.assign({}, o.ext, {
                                    assets: e.nativeOrtbRequest.assets
                                })), e.params.uid && (o.ext = Object.assign({}, o.ext, {
                                    bidder: {
                                        uid: e.params.uid
                                    }
                                })), e.params.publisherSubId && (o.publishersubid = e.params.publisherSubId), (e.params.nativeCallback || hasNativeMediaType(e)) && (o.native = !0, checkNativeSendId(e) || (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.JE)(LOG_PREFIX + "all native assets containing URL should be sent as placeholders with sendId(icon, image, clickUrl, displayUrl, privacyLink, privacyIcon)")), hasBannerMediaType(e) ? o.sizes = parseSizes((0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "mediaTypes.banner.sizes"), parseSize) : o.sizes = [], hasVideoMediaType(e)) {
                                const t = {
                                        context: e.mediaTypes.video.context,
                                        playersizes: parseSizes((0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "mediaTypes.video.playerSize"), parseSize),
                                        mimes: e.mediaTypes.video.mimes,
                                        protocols: e.mediaTypes.video.protocols,
                                        maxduration: e.mediaTypes.video.maxduration,
                                        api: e.mediaTypes.video.api,
                                        skip: e.mediaTypes.video.skip,
                                        placement: e.mediaTypes.video.placement,
                                        minduration: e.mediaTypes.video.minduration,
                                        playbackmethod: e.mediaTypes.video.playbackmethod,
                                        startdelay: e.mediaTypes.video.startdelay,
                                        plcmt: e.mediaTypes.video.plcmt,
                                        w: e.mediaTypes.video.w,
                                        h: e.mediaTypes.video.h,
                                        linearity: e.mediaTypes.video.linearity,
                                        skipmin: e.mediaTypes.video.skipmin,
                                        skipafter: e.mediaTypes.video.skipafter,
                                        minbitrate: e.mediaTypes.video.minbitrate,
                                        maxbitrate: e.mediaTypes.video.maxbitrate,
                                        delivery: e.mediaTypes.video.delivery,
                                        pos: e.mediaTypes.video.pos,
                                        playbackend: e.mediaTypes.video.playbackend,
                                        adPodDurationSec: e.mediaTypes.video.adPodDurationSec,
                                        durationRangeSec: e.mediaTypes.video.durationRangeSec
                                    },
                                    n = e.params.video;
                                void 0 !== n && (t.skip = t.skip || n.skip || 0, t.placement = t.placement || n.placement, t.minduration = t.minduration || n.minduration, t.playbackmethod = t.playbackmethod || n.playbackmethod, t.startdelay = t.startdelay || n.startdelay || 0), o.video = t
                            }
                            return enrichSlotWithFloors(o, e), !n.fledgeEnabled && null !== (i = o.ext) && void 0 !== i && i.ae && delete o.ext.ae, o
                        }))
                    };
                    var y;
                    return f && (v.publisher.networkid = f), v.source = {
                        tid: null === (i = n.ortb2) || void 0 === i || null === (i = i.source) || void 0 === i ? void 0 : i.tid
                    }, g && (v.source.ext = {
                        schain: g
                    }), v.user = (null === (o = n.ortb2) || void 0 === o ? void 0 : o.user) || {}, v.site = (null === (s = n.ortb2) || void 0 === s ? void 0 : s.site) || {}, v.app = (null === (a = n.ortb2) || void 0 === a ? void 0 : a.app) || {}, m && (v.site.publisher = _objectSpread(_objectSpread({}, v.site.publisher), {
                        id: m
                    }), v.app.publisher = _objectSpread(_objectSpread({}, v.app.publisher), {
                        id: m
                    })), v.device = (null === (d = n.ortb2) || void 0 === d ? void 0 : d.device) || {}, n && n.ceh && (v.user.ceh = n.ceh), n && n.gdprConsent && (v.gdprConsent = {}, void 0 !== n.gdprConsent.gdprApplies && (v.gdprConsent.gdprApplies = !!n.gdprConsent.gdprApplies), v.gdprConsent.version = n.gdprConsent.apiVersion, void 0 !== n.gdprConsent.consentString && (v.gdprConsent.consentData = n.gdprConsent.consentString)), n && n.uspConsent && (v.user.uspIab = n.uspConsent), n && null !== (c = n.ortb2) && void 0 !== c && null !== (c = c.device) && void 0 !== c && c.sua && (v.user.ext = v.user.ext || {}, v.user.ext.sua = (null === (y = n.ortb2) || void 0 === y || null === (y = y.device) || void 0 === y ? void 0 : y.sua) || {}), b && (v.user.ext = v.user.ext || {}, v.user.ext.eids = [...b]), n && null !== (l = n.ortb2) && void 0 !== l && l.bcat && (v.bcat = n.ortb2.bcat), n && null !== (u = n.ortb2) && void 0 !== u && u.badv && (v.badv = n.ortb2.badv), n && null !== (p = n.ortb2) && void 0 !== p && p.bapp && (v.bapp = n.ortb2.bapp), v.tmax = n.timeout, v
                }

                function parseSizes(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e => e;
                    return null == e ? [] : Array.isArray(e[0]) ? e.map((e => t(e))) : [t(e)]
                }

                function parseSize(e) {
                    return e[0] + "x" + e[1]
                }

                function hasVideoMediaType(e) {
                    return void 0 !== (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "mediaTypes.video")
                }

                function hasBannerMediaType(e) {
                    return void 0 !== (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "mediaTypes.banner")
                }

                function hasNativeMediaType(e) {
                    return void 0 !== (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "mediaTypes.native")
                }

                function hasValidVideoMediaType(e) {
                    let t = !0;
                    return ["mimes", "playerSize", "maxduration", "protocols", "api", "skip", "placement", "playbackmethod"].forEach((function(n) {
                        void 0 === (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "mediaTypes.video." + n) && void 0 === (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(e, "params.video." + n) && (t = !1, (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.vV)("Criteo Bid Adapter: mediaTypes.video." + n + " is required"))
                    })), t
                }

                function createPrebidNativeAd(e) {
                    return {
                        sendTargetingKeys: !1,
                        title: e.products[0].title,
                        body: e.products[0].description,
                        sponsoredBy: e.advertiser.description,
                        icon: e.advertiser.logo,
                        image: e.products[0].image,
                        clickUrl: e.products[0].click_url,
                        privacyLink: e.privacy.optout_click_url,
                        privacyIcon: e.privacy.optout_image_url,
                        cta: e.products[0].call_to_action,
                        price: e.products[0].price,
                        impressionTrackers: e.impression_pixels.map((e => e.url))
                    }
                }

                function createNativeAd(e, t, n) {
                    var r = "criteo_prebid_native_slots";
                    return window[r] = window[r] || {}, window[r][e] = {
                        callback: n,
                        payload: t
                    }, `\n<script type="text/javascript">\nfor (var i = 0; i < 10; ++i) {\n var slots = window.parent.${r};\n  if(!slots){continue;}\n  var responseSlot = slots["${e}"];\n  responseSlot.callback(responseSlot.payload);\n  break;\n}\n<\/script>`
                }

                function pickAvailableGetFloorFunc(e) {
                    if (e.getFloor) return e.getFloor;
                    if (e.params.bidFloor && e.params.bidFloorCur) try {
                        const t = parseFloat(e.params.bidFloor);
                        return () => ({
                            currency: e.params.bidFloorCur,
                            floor: t
                        })
                    } catch {}
                }

                function enrichSlotWithFloors(e, t) {
                    try {
                        const o = {},
                            s = pickAvailableGetFloorFunc(t);
                        var n, r, i;
                        s && (null !== (n = t.mediaTypes) && void 0 !== n && n.banner && (o.banner = {}, parseSizes((0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(t, "mediaTypes.banner.sizes")).forEach((e => o.banner[parseSize(e).toString()] = s.call(t, {
                            size: e,
                            mediaType: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.D4
                        })))), null !== (r = t.mediaTypes) && void 0 !== r && r.video && (o.video = {}, parseSizes((0, _src_utils_js__WEBPACK_IMPORTED_MODULE_9__.A)(t, "mediaTypes.video.playerSize")).forEach((e => o.video[parseSize(e).toString()] = s.call(t, {
                            size: e,
                            mediaType: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.G_
                        })))), null !== (i = t.mediaTypes) && void 0 !== i && i.native && (o.native = {}, o.native["*"] = s.call(t, {
                            size: "*",
                            mediaType: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.s6
                        })), Object.keys(o).length > 0 && (e.ext || (e.ext = {}), Object.assign(e.ext, {
                            floors: o
                        })))
                    } catch (e) {
                        (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.vV)("Could not parse floors from Prebid: " + e)
                    }
                }

                function canFastBid(e) {
                    return e !== FAST_BID_VERSION_NONE
                }

                function getFastBidUrl(e) {
                    let t;
                    return e === FAST_BID_VERSION_LATEST ? t = "" : e ? (String(e).split(".")[0] < 102 && (0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.JE)("Specifying a Fastbid version which is not supporting version selection."), t = "." + e) : t = "." + FAST_BID_VERSION_CURRENT, PUBLISHER_TAG_URL_TEMPLATE.replace(FAST_BID_VERSION_PLACEHOLDER, t)
                }

                function createOutstreamVideoRenderer(e) {
                    if (void 0 === e.ext.videoPlayerConfig || void 0 === e.ext.videoPlayerType) return;
                    const t = _src_Renderer_js__WEBPACK_IMPORTED_MODULE_12__.A4.install({
                        url: PUBLISHER_TAG_OUTSTREAM_SRC,
                        config: {
                            documentResolver: (e, t, n) => n ? ? t
                        }
                    });
                    return t.setRender(((t, n) => {
                        let r = {
                                slotid: e.impid,
                                vastUrl: e.displayurl,
                                vastXml: e.creative,
                                documentContext: n
                            },
                            i = e.ext.videoPlayerConfig;
                        window.CriteoOutStream[e.ext.videoPlayerType].play(r, i)
                    })), t
                }

                function getAssociatedBidRequest(e, t) {
                    for (const o of e)
                        if (o.adUnitCode === t.impid) {
                            var n, r;
                            if (o.params.zoneId && parseInt(o.params.zoneId) === t.zoneid) return o;
                            if (t.native) {
                                if (null !== (r = o.mediaTypes) && void 0 !== r && r.native || o.nativeParams) return o
                            } else if (t.video) {
                                var i;
                                if (null !== (i = o.mediaTypes) && void 0 !== i && i.video) return o
                            } else if (null !== (n = o.mediaTypes) && void 0 !== n && n.banner || o.sizes) return o
                        }
                }

                function tryGetCriteoFastBid() {
                    try {
                        const fastBidStorageKey = "criteo_fast_bid",
                            hashPrefix = "// Hash: ",
                            fastBidFromStorage = storage.getDataFromLocalStorage(fastBidStorageKey);
                        if (null !== fastBidFromStorage) {
                            const firstLineEndPosition = fastBidFromStorage.indexOf("\n"),
                                firstLine = fastBidFromStorage.substr(0, firstLineEndPosition).trim();
                            if (firstLine.substr(0, hashPrefix.length) !== hashPrefix)(0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.JE)("No hash found in FastBid"), storage.removeDataFromLocalStorage(fastBidStorageKey);
                            else {
                                const publisherTagHash = firstLine.substr(hashPrefix.length),
                                    publisherTag = fastBidFromStorage.substr(firstLineEndPosition + 1);
                                (0, criteo_direct_rsa_validate_build_verify_js__WEBPACK_IMPORTED_MODULE_1__.M)(publisherTag, publisherTagHash, FAST_BID_PUBKEY_N, FAST_BID_PUBKEY_E) ? ((0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.fH)("Using Criteo FastBid"), eval(publisherTag)) : ((0, _src_utils_js__WEBPACK_IMPORTED_MODULE_8__.JE)("Invalid Criteo FastBid found"), storage.removeDataFromLocalStorage(fastBidStorageKey))
                            }
                        }
                    } catch (e) {}
                }(0, _src_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_13__.a$)(spec), (0, _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_14__.E)("criteoBidAdapter")
            },
            487: (e, t, n) => {
                "use strict";
                n.d(t, {
                    A4: () => c,
                    J7: () => l,
                    Pg: () => u
                });
                var r = n(286),
                    i = n(686),
                    o = n(384),
                    s = n(455);
                const a = (0, n(831).m)(),
                    d = "outstream";

                function c(e) {
                    const {
                        url: t,
                        config: n,
                        id: c,
                        callback: l,
                        loaded: u,
                        adUnitCode: p,
                        renderNow: f
                    } = e;
                    this.url = t, this.config = n, this.handlers = {}, this.id = c, this.renderNow = f, this.loaded = u, this.cmd = [], this.push = e => {
                        "function" == typeof e ? this.loaded ? e.call() : this.cmd.push(e) : (0, i.vV)("Commands given to Renderer.push must be wrapped in a function")
                    }, this.callback = l || (() => {
                        this.loaded = !0, this.process()
                    }), this.render = function() {
                        const e = arguments,
                            n = () => {
                                this._render ? this._render.apply(this, e) : (0, i.JE)("No render function was provided, please use .setRender on the renderer")
                            };
                        ! function(e) {
                            const t = a.adUnits,
                                n = (0, s.I6)(t, (t => t.code === e));
                            if (!n) return !1;
                            const r = (0, o.A)(n, "renderer"),
                                i = !!(r && r.url && r.render),
                                d = (0, o.A)(n, "mediaTypes.video.renderer"),
                                c = !!(d && d.url && d.render);
                            return !!(i && !0 !== r.backupOnly || c && !0 !== d.backupOnly)
                        }(p) ? f ? n() : (this.cmd.unshift(n), (0, r.R)(t, d, this.callback, this.documentContext)): ((0, i.JE)(`External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ${p}`), n())
                    }.bind(this)
                }

                function l(e) {
                    return !(!e || !e.url && !e.renderNow)
                }

                function u(e, t, n) {
                    let r = null;
                    e.config && e.config.documentResolver && (r = e.config.documentResolver(t, document, n)), r || (r = document), e.documentContext = r, e.render(t, e.documentContext)
                }
                c.install = function(e) {
                    let {
                        url: t,
                        config: n,
                        id: r,
                        callback: i,
                        loaded: o,
                        adUnitCode: s,
                        renderNow: a
                    } = e;
                    return new c({
                        url: t,
                        config: n,
                        id: r,
                        callback: i,
                        loaded: o,
                        adUnitCode: s,
                        renderNow: a
                    })
                }, c.prototype.getConfig = function() {
                    return this.config
                }, c.prototype.setRender = function(e) {
                    this._render = e
                }, c.prototype.setEventHandlers = function(e) {
                    this.handlers = e
                }, c.prototype.handleVideoEvent = function(e) {
                    let {
                        id: t,
                        eventName: n
                    } = e;
                    "function" == typeof this.handlers[n] && this.handlers[n](), (0, i.OG)(`Prebid Renderer event for id ${t} type ${n}`)
                }, c.prototype.process = function() {
                    for (; this.cmd.length > 0;) try {
                        this.cmd.shift().call()
                    } catch (e) {
                        (0, i.vV)("Error processing Renderer command: ", e)
                    }
                }
            },
            973: (e, t, n) => {
                "use strict";
                n.d(t, {
                    DL: () => l,
                    Ml: () => i,
                    Ue: () => r,
                    VJ: () => p,
                    hE: () => u,
                    hq: () => c,
                    mo: () => d,
                    qX: () => o,
                    uc: () => a,
                    yl: () => s
                });
                const r = "accessDevice",
                    i = "syncUser",
                    o = "enrichUfpd",
                    s = "enrichEids",
                    a = "fetchBids",
                    d = "reportAnalytics",
                    c = "transmitEids",
                    l = "transmitUfpd",
                    u = "transmitPreciseGeo",
                    p = "transmitTid"
            },
            575: (e, t, n) => {
                "use strict";
                n.d(t, {
                    s: () => i
                });
                var r = n(807);
                const i = (0, n(642).ZI)((e => r.Ay.resolveAlias(e)))
            },
            883: (e, t, n) => {
                "use strict";
                n.d(t, {
                    Tn: () => a,
                    fW: () => o,
                    tW: () => i,
                    tp: () => r,
                    zu: () => s
                });
                const r = "prebid",
                    i = "bidder",
                    o = "userId",
                    s = "rtd",
                    a = "analytics"
            },
            642: (e, t, n) => {
                "use strict";
                n.d(t, {
                    Dk: () => s,
                    Ii: () => o,
                    TQ: () => f,
                    XG: () => l,
                    ZI: () => m,
                    Zw: () => c,
                    bt: () => u,
                    e3: () => p,
                    iK: () => a,
                    q7: () => d
                });
                var r = n(883),
                    i = n(439);
                const o = "component",
                    s = o + "Type",
                    a = o + "Name",
                    d = "adapterCode",
                    c = "storageType",
                    l = "configName",
                    u = "syncType",
                    p = "syncUrl",
                    f = "_config";

                function m(e) {
                    return function(t, n, i) {
                        const c = {
                            [s]: t,
                            [a]: n,
                            [o]: `${t}.${n}`
                        };
                        return t === r.tW && (c[d] = e(n)), g(Object.assign(c, i))
                    }
                }
                const g = (0, i.A_)("sync", (e => e))
            },
            253: (e, t, n) => {
                "use strict";
                n.d(t, {
                    io: () => s,
                    qB: () => o
                });
                var r = n(686),
                    i = n(642);
                const [o, s] = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, r.h0)("Activity control:");
                    const t = {};

                    function n(e) {
                        return t[e] = t[e] || []
                    }

                    function o(t, n, r, o) {
                        let s;
                        try {
                            s = r(o)
                        } catch (r) {
                            e.logError(`Exception in rule ${n} for '${t}'`, r), s = {
                                allow: !1,
                                reason: r
                            }
                        }
                        return s && Object.assign({
                            activity: t,
                            name: n,
                            component: o[i.Ii]
                        }, s)
                    }
                    const s = {};

                    function a(t) {
                        let {
                            activity: n,
                            name: r,
                            allow: i,
                            reason: o,
                            component: a
                        } = t;
                        const d = `${r} ${i?"allowed":"denied"} '${n}' for '${a}'${o?":":""}`,
                            c = s.hasOwnProperty(d);
                        if (c && clearTimeout(s[d]), s[d] = setTimeout((() => delete s[d]), 1e3), !c) {
                            const t = [d];
                            o && t.push(o), (i ? e.logInfo : e.logWarn).apply(e, t)
                        }
                    }
                    return [function(e, t, r) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10;
                        const o = n(e),
                            s = o.findIndex((e => {
                                let [t] = e;
                                return i < t
                            })),
                            a = [i, t, r];
                        return o.splice(s < 0 ? o.length : s, 0, a),
                            function() {
                                const e = o.indexOf(a);
                                e >= 0 && o.splice(e, 1)
                            }
                    }, function(e, t) {
                        let r, i;
                        for (const [s, d, c] of n(e)) {
                            if (r !== s && i) break;
                            r = s;
                            const n = o(e, d, c, t);
                            if (n) {
                                if (!n.allow) return a(n), !1;
                                i = n
                            }
                        }
                        return i && a(i), !0
                    }]
                }()
            },
            885: (e, t, n) => {
                "use strict";
                n.d(t, {
                    BS: () => T,
                    Uc: () => I,
                    bw: () => x,
                    vW: () => E,
                    vd: () => O
                });
                var r = n(686),
                    i = n(384),
                    o = n(13),
                    s = n(743),
                    a = n(718),
                    d = n(487),
                    c = n(233),
                    l = n(428),
                    u = n(922),
                    p = n(439),
                    f = n(787);
                const {
                    AD_RENDER_FAILED: m,
                    AD_RENDER_SUCCEEDED: g,
                    STALE_RENDER: b,
                    BID_WON: h
                } = s.qY, {
                    EXCEPTION: v
                } = s.as;

                function y(e) {
                    let {
                        reason: t,
                        message: n,
                        bid: i,
                        id: s
                    } = e;
                    const a = {
                        reason: t,
                        message: n
                    };
                    i && (a.bid = i, a.adId = i.adId), s && (a.adId = s), (0, r.vV)(`Error rendering ad (id: ${s}): ${n}`), o.Ic(m, a)
                }

                function _(e) {
                    let {
                        doc: t,
                        bid: n,
                        id: r
                    } = e;
                    const i = {
                        doc: t
                    };
                    n && (i.bid = n), r && (i.adId = r), o.Ic(g, i)
                }

                function I(e, t) {
                    switch (e.event) {
                        case s.qY.AD_RENDER_FAILED:
                            y({
                                bid: t,
                                id: t.adId,
                                reason: e.info.reason,
                                message: e.info.message
                            });
                            break;
                        case s.qY.AD_RENDER_SUCCEEDED:
                            _({
                                doc: null,
                                bid: t,
                                id: t.adId
                            });
                            break;
                        default:
                            (0, r.vV)(`Received event request for unsupported event: '${e.event}' (adId: '${t.adId}')`)
                    }
                }

                function E(e, t, n) {
                    let {
                        resizeFn: r,
                        fireTrackers: i = f.vO
                    } = n;
                    "resizeNativeHeight" === e.action ? r(e.width, e.height) : i(e, t)
                }
                const A = {
                    [s.nl.EVENT]: I
                };
                A[s.nl.NATIVE] = E;
                const O = (0, p.A_)("sync", (function(e, t) {
                        const {
                            ad: n,
                            adUrl: i,
                            cpm: o,
                            originalCpm: s,
                            width: a,
                            height: d
                        } = e, c = {
                            AUCTION_PRICE: s || o,
                            CLICKTHROUGH: (null == t ? void 0 : t.clickUrl) || ""
                        };
                        return {
                            ad: (0, r.gM)(n, c),
                            adUrl: (0, r.gM)(i, c),
                            width: a,
                            height: d
                        }
                    })),
                    w = (0, p.A_)("sync", (function(e) {
                        let {
                            renderFn: t,
                            resizeFn: n,
                            bidResponse: r,
                            options: i
                        } = e;
                        if (r.mediaType === c.G_) return void y({
                            reason: s.as.PREVENT_WRITING_ON_MAIN_DOCUMENT,
                            message: "Cannot render video ad",
                            bid: r,
                            id: r.adId
                        });
                        const o = O(r, i);
                        t(Object.assign({
                            adId: r.adId
                        }, o));
                        const {
                            width: a,
                            height: d
                        } = o;
                        null != (a ? ? d) && n(a, d)
                    }));

                function x(e) {
                    let {
                        renderFn: t,
                        resizeFn: n,
                        adId: d,
                        options: c,
                        bidResponse: u,
                        doc: p
                    } = e;
                    if (null != u) {
                        if (u.status !== s.tl.RENDERED || ((0, r.JE)(`Ad id ${d} has been rendered before`), o.Ic(b, u), !(0, i.A)(a.$W.getConfig("auctionOptions"), "suppressStaleRender"))) {
                            try {
                                w({
                                    renderFn: t,
                                    resizeFn: n,
                                    bidResponse: u,
                                    options: c,
                                    doc: p
                                })
                            } catch (e) {
                                y({
                                    reason: s.as.EXCEPTION,
                                    message: e.message,
                                    id: d,
                                    bid: u
                                })
                            }
                            l.n.addWinningBid(u), o.Ic(h, u)
                        }
                    } else y({
                        reason: s.as.CANNOT_FIND_AD,
                        message: `Cannot find ad '${d}'`,
                        id: d
                    })
                }

                function T(e, t, n) {
                    let i;

                    function o(e, n) {
                        y(Object.assign({
                            id: t,
                            bid: i
                        }, {
                            reason: e,
                            message: n
                        }))
                    }

                    function a(t, n) {
                        e.defaultView && e.defaultView.frameElement && (t && (e.defaultView.frameElement.width = t), n && (e.defaultView.frameElement.height = n))
                    }
                    const d = (c = {
                        resizeFn: a
                    }, function(e, t, n) {
                        A.hasOwnProperty(e) && A[e](t, n, c)
                    });
                    var c;
                    try {
                        t && e ? (i = l.n.findBidByAdId(t), e !== document || (0, r.al)() ? x({
                            renderFn: function(t) {
                                t.ad ? (e.write(t.ad), e.close(), _({
                                    doc: e,
                                    bid: i,
                                    adId: i.adId
                                })) : (0, u.H)(i).then((n => n(t, {
                                    sendMessage: (e, t) => d(e, t, i),
                                    mkFrame: r.hw
                                }, e.defaultView))).then((() => _({
                                    doc: e,
                                    bid: i,
                                    adId: i.adId
                                })), (e => {
                                    o((null == e ? void 0 : e.reason) || s.as.EXCEPTION, null == e ? void 0 : e.message), (null == e ? void 0 : e.stack) && (0, r.vV)(e)
                                }));
                                const n = document.createComment(`Creative ${i.creativeId} served by ${i.bidder} Prebid.js Header Bidding`);
                                (0, r._s)(n, e, "html")
                            },
                            resizeFn: a,
                            adId: t,
                            options: {
                                clickUrl: null == n ? void 0 : n.clickThrough
                            },
                            bidResponse: i,
                            doc: e
                        }) : o(s.as.PREVENT_WRITING_ON_MAIN_DOCUMENT, "renderAd was prevented from writing to the main document.")) : o(s.as.MISSING_DOC_OR_ADID, "missing " + (t ? "doc" : "adId"))
                    } catch (e) {
                        o(v, e.message)
                    }
                }
                w.before((function(e, t) {
                    const {
                        bidResponse: n,
                        doc: r
                    } = t;
                    (0, d.J7)(n.renderer) ? ((0, d.Pg)(n.renderer, n, r), _({
                        doc: r,
                        bid: n,
                        id: n.adId
                    }), e.bail()) : e(t)
                }), 100)
            },
            807: (e, t, n) => {
                "use strict";
                n.d(t, {
                    Ay: () => Z,
                    pX: () => J
                });
                var r = n(504),
                    i = n(686),
                    o = n(384),
                    s = n(787),
                    a = n(678),
                    d = n(330),
                    c = n(718),
                    l = n(439),
                    u = n(455);
                let p = {};

                function f(e, t, n) {
                    let r = function(e, t) {
                        let n = p[e] = p[e] || {
                            bidders: {}
                        };
                        return t ? n.bidders[t] = n.bidders[t] || {} : n
                    }(e, n);
                    return r[t] = (r[t] || 0) + 1, r[t]
                }

                function m(e) {
                    return (0, o.A)(p, `${e}.requestsCounter`) || 0
                }

                function g(e, t) {
                    return (0, o.A)(p, `${e}.bidders.${t}.requestsCounter`) || 0
                }

                function b(e, t) {
                    return (0, o.A)(p, `${e}.bidders.${t}.winsCounter`) || 0
                }
                var h = n(556),
                    v = n(586),
                    y = n(13),
                    _ = n(743),
                    I = n(992),
                    E = n(428),
                    A = n(883),
                    O = n(253),
                    w = n(973),
                    x = n(642);
                const T = ["data", "ext.data", "yob", "gender", "keywords", "kwarray", "id", "buyeruid", "customdata"].map((e => `user.${e}`)).concat("device.ext.cdep"),
                    C = ["user.eids", "user.ext.eids"],
                    S = ["user.geo.lat", "user.geo.lon", "device.geo.lat", "device.geo.lon"];

                function k(e) {
                    return Object.assign({
                        get() {},
                        run(e, t, n, r, i) {
                            const o = n && n[r];
                            if (function(e) {
                                    return null != e && ("object" != typeof e || Object.keys(e).length > 0)
                                }(o) && i()) {
                                const e = this.get(o);
                                void 0 === e ? delete n[r] : n[r] = e
                            }
                        }
                    }, e)
                }

                function D(e) {
                    return e.forEach((e => {
                            e.paths = e.paths.map((e => {
                                const t = e.split("."),
                                    n = t.pop();
                                return [t.length > 0 ? t.join(".") : null, n]
                            }))
                        })),
                        function(t, n) {
                            const r = [];
                            for (var i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), a = 2; a < i; a++) s[a - 2] = arguments[a];
                            const d = function(e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                                return function(t) {
                                    return e.hasOwnProperty(t.name) || (e[t.name] = !!t.applies(...n)), e[t.name]
                                }
                            }(t, ...s);
                            return e.forEach((e => {
                                if (!1 !== t[e.name])
                                    for (const [i, s] of e.paths) {
                                        const a = null == i ? n : (0, o.A)(n, i);
                                        if (r.push(e.run(n, i, a, s, d.bind(null, e))), !1 === t[e.name]) return
                                    }
                            })), r.filter((e => null != e))
                        }
                }

                function R(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : O.io;
                    return function(n) {
                        return !t(e, n)
                    }
                }
                const j = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O.io;
                    const t = D(function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O.io;
                            return [{
                                name: w.DL,
                                paths: T,
                                applies: R(w.DL, e)
                            }, {
                                name: w.hq,
                                paths: C,
                                applies: R(w.hq, e)
                            }, {
                                name: w.hE,
                                paths: S,
                                applies: R(w.hE, e),
                                get: e => Math.round(100 * (e + Number.EPSILON)) / 100
                            }, {
                                name: w.VJ,
                                paths: ["source.tid"],
                                applies: R(w.VJ, e)
                            }].map(k)
                        }(e)),
                        n = D(function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O.io;
                            return [{
                                name: w.hq,
                                paths: ["userId", "userIdAsEids"],
                                applies: R(w.hq, e)
                            }, {
                                name: w.VJ,
                                paths: ["ortb2Imp.ext.tid"],
                                applies: R(w.VJ, e)
                            }].map(k)
                        }(e));
                    return function(e) {
                        const r = {};
                        return {
                            ortb2: n => (t(r, n, e), n),
                            bidRequest: t => (n(r, t, e), t)
                        }
                    }
                }();

                function B(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t && (r = r.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), n.push.apply(n, r)
                    }
                    return n
                }

                function P(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? B(Object(n), !0).forEach((function(t) {
                            (0, r.A)(e, t, n[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : B(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }))
                    }
                    return e
                }(0, O.qB)(w.VJ, "enableTIDs config", (() => {
                    if (!c.$W.getConfig("enableTIDs")) return {
                        allow: !1,
                        reason: "TIDs are disabled"
                    }
                }));
                const U = "pbsBidAdapter",
                    $ = {
                        CLIENT: "client",
                        SERVER: "server"
                    },
                    q = {
                        isAllowed: O.io,
                        redact: j
                    };
                let N = {},
                    M = N.bidderRegistry = {},
                    W = N.aliasRegistry = {},
                    z = [];
                c.$W.getConfig("s2sConfig", (e => {
                    e && e.s2sConfig && (z = (0, i.cy)(e.s2sConfig) ? e.s2sConfig : [e.s2sConfig])
                }));
                var L = {};
                const V = (0, x.ZI)((e => N.resolveAlias(e))),
                    F = (0, l.A_)("sync", (function(e) {
                        let {
                            bidderCode: t,
                            auctionId: n,
                            bidderRequestId: r,
                            adUnits: s,
                            src: a,
                            metrics: d
                        } = e;
                        return s.reduce(((e, s) => {
                            const c = s.bids.filter((e => e.bidder === t));
                            return null == t && 0 === c.length && null != s.s2sBid && c.push({
                                bidder: null
                            }), e.push(c.reduce(((e, c) => {
                                const l = null == (c = Object.assign({}, c, {
                                    ortb2Imp: (0, i.D9)({}, s.ortb2Imp, c.ortb2Imp)
                                }, (0, i.SH)(s, ["nativeParams", "nativeOrtbRequest", "mediaType", "renderer"]))).mediaTypes ? s.mediaTypes : c.mediaTypes;
                                return (0, i.wD)(l) ? c = Object.assign({}, c, {
                                    mediaTypes: l
                                }) : (0, i.vV)(`mediaTypes is not correctly configured for adunit ${s.code}`), "client" === a && function(e, t) {
                                    f(e, "requestsCounter", t)
                                }(s.code, t), e.push(Object.assign({}, c, {
                                    adUnitCode: s.code,
                                    transactionId: s.transactionId,
                                    adUnitId: s.adUnitId,
                                    sizes: (0, o.A)(l, "banner.sizes") || (0, o.A)(l, "video.playerSize") || [],
                                    bidId: c.bid_id || (0, i.s0)(),
                                    bidderRequestId: r,
                                    auctionId: n,
                                    src: a,
                                    metrics: d,
                                    bidRequestsCount: m(s.code),
                                    bidderRequestsCount: g(s.code, c.bidder),
                                    bidderWinsCount: b(s.code, c.bidder)
                                })), e
                            }), [])), e
                        }), []).reduce(i.Bq, []).filter((e => "" !== e))
                    }), "getBids"),
                    G = (0, l.A_)("sync", (function(e, t) {
                        let {
                            getS2SBidders: n = J
                        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if (null == t) return e; {
                            const r = n(t);
                            return e.filter((e => r.has(e.bidder)))
                        }
                    }), "filterBidsForAdUnit"),
                    H = (0, l.A_)("sync", ((e, t) => e), "setupAdUnitMediaTypes");

                function J(e) {
                    (0, i.cy)(e) || (e = [e]);
                    const t = new Set([null]);
                    return e.filter((e => e && e.enabled)).flatMap((e => e.bidders)).forEach((e => t.add(e))), t
                }
                const K = (0, l.A_)("sync", (function(e, t) {
                    let {
                        getS2SBidders: n = J
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    const r = n(t);
                    return (0, i.ZA)(e).reduce(((e, t) => (e[r.has(t) ? $.SERVER : $.CLIENT].push(t), e)), {
                        [$.CLIENT]: [],
                        [$.SERVER]: []
                    })
                }), "partitionBidders");

                function Q(e, t) {
                    const n = M[e],
                        r = (null == n ? void 0 : n.getSpec) && n.getSpec();
                    if (r && r[t] && "function" == typeof r[t]) return [r, r[t]]
                }

                function X(e, t, n, r) {
                    try {
                        (0, i.fH)(`Invoking ${e}.${t}`);
                        for (var o = arguments.length, s = new Array(o > 4 ? o - 4 : 0), a = 4; a < o; a++) s[a - 4] = arguments[a];
                        c.$W.runWithBidder(e, r.bind(n, ...s))
                    } catch (n) {
                        (0, i.JE)(`Error calling ${t} of ${e}`)
                    }
                }

                function Y(e, t, n) {
                    if ((null == n ? void 0 : n.src) !== _.RW.SRC) {
                        const r = Q(e, t);
                        null != r && X(e, t, ...r, n)
                    }
                }
                N.makeBidRequests = (0, l.A_)("sync", (function(e, t, n, r, o) {
                    let a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
                        d = arguments.length > 6 ? arguments[6] : void 0;
                    d = (0, I.BO)(d), y.Ic(_.qY.BEFORE_REQUEST_BIDS, e), (0, s.nk)(e), e.forEach((e => {
                        (0, i.Qd)(e.mediaTypes) || (e.mediaTypes = {}), e.bids = e.bids.filter((e => !e.bidder || q.isAllowed(w.uc, V(A.tW, e.bidder)))), f(e.code, "requestsCounter")
                    })), e = H(e, o);
                    let {
                        [$.CLIENT]: l, [$.SERVER]: p
                    } = K(e, z);
                    c.$W.getConfig("bidderSequence") === c.Ov && (l = (0, i.k4)(l));
                    const m = (0, h.EN)();
                    let g = [];
                    const b = a.global || {},
                        E = a.bidder || {};

                    function O(e, t) {
                        const r = q.redact(null != t ? t : V(A.tW, e.bidderCode)),
                            o = Object.freeze(r.ortb2((0, i.D9)({
                                source: {
                                    tid: n
                                }
                            }, b, E[e.bidderCode])));
                        return e.ortb2 = o, e.bids = e.bids.map((e => (e.ortb2 = o, r.bidRequest(e)))), e
                    }
                    z.forEach((r => {
                        const o = function(e) {
                            return V(A.tp, U, {
                                [x.XG]: e.configName
                            })
                        }(r);
                        if (r && r.enabled && q.isAllowed(w.uc, o)) {
                            let {
                                adUnits: s,
                                hasModuleBids: a
                            } = function(e, t) {
                                let n = (0, i.Go)(e),
                                    r = !1;
                                return n.forEach((e => {
                                    const n = e.bids.filter((e => {
                                        var n;
                                        return e.module === U && (null === (n = e.params) || void 0 === n ? void 0 : n.configName) === t.configName
                                    }));
                                    1 === n.length ? (e.s2sBid = n[0], r = !0, e.ortb2Imp = (0, i.D9)({}, e.s2sBid.ortb2Imp, e.ortb2Imp)) : n.length > 1 && (0, i.JE)('Multiple "module" bids for the same s2s configuration; all will be ignored', n), e.bids = G(e.bids, t).map((e => (e.bid_id = (0, i.s0)(), e)))
                                })), n = n.filter((e => 0 !== e.bids.length || null != e.s2sBid)), {
                                    adUnits: n,
                                    hasModuleBids: r
                                }
                            }(e, r), c = (0, i.lk)();
                            (0 === p.length && a ? [null] : p).forEach((e => {
                                const a = (0, i.s0)(),
                                    l = d.fork(),
                                    u = O({
                                        bidderCode: e,
                                        auctionId: n,
                                        bidderRequestId: a,
                                        uniquePbsTid: c,
                                        bids: F({
                                            bidderCode: e,
                                            auctionId: n,
                                            bidderRequestId: a,
                                            adUnits: (0, i.Go)(s),
                                            src: _.RW.SRC,
                                            metrics: l
                                        }),
                                        auctionStart: t,
                                        timeout: r.timeout,
                                        src: _.RW.SRC,
                                        refererInfo: m,
                                        metrics: l
                                    }, o);
                                0 !== u.bids.length && g.push(u)
                            })), s.forEach((e => {
                                let t = e.bids.filter((e => (0, u.I6)(g, (t => (0, u.I6)(t.bids, (t => t.bidId === e.bid_id))))));
                                e.bids = t
                            })), g.forEach((e => {
                                void 0 === e.adUnitsS2SCopy && (e.adUnitsS2SCopy = s.filter((e => e.bids.length > 0 || null != e.s2sBid)))
                            }))
                        }
                    }));
                    let T = function(e) {
                        let t = (0, i.Go)(e);
                        return t.forEach((e => {
                            e.bids = G(e.bids, null)
                        })), t = t.filter((e => 0 !== e.bids.length)), t
                    }(e);
                    return l.forEach((e => {
                        const s = (0, i.s0)(),
                            a = d.fork(),
                            c = O({
                                bidderCode: e,
                                auctionId: n,
                                bidderRequestId: s,
                                bids: F({
                                    bidderCode: e,
                                    auctionId: n,
                                    bidderRequestId: s,
                                    adUnits: (0, i.Go)(T),
                                    labels: o,
                                    src: "client",
                                    metrics: a
                                }),
                                auctionStart: t,
                                timeout: r,
                                refererInfo: m,
                                metrics: a
                            }),
                            l = M[e];
                        l || (0, i.vV)(`Trying to make a request for bidder that does not exist: ${e}`), l && c.bids && 0 !== c.bids.length && g.push(c)
                    })), g.forEach((e => {
                        v.mW.getConsentData() && (e.gdprConsent = v.mW.getConsentData()), v.t6.getConsentData() && (e.uspConsent = v.t6.getConsentData()), v.ad.getConsentData() && (e.gppConsent = v.ad.getConsentData())
                    })), g
                }), "makeBidRequests"), N.callBids = function(e, t, n, r, o, s, a) {
                    let l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {};
                    if (!t.length) return void(0, i.JE)("callBids executed with no bidRequests.  Were they filtered by labels or sizing?");
                    let [u, p] = t.reduce(((e, t) => (e[Number(void 0 !== t.src && t.src === _.RW.SRC)].push(t), e)), [
                        [],
                        []
                    ]);
                    var f = [];
                    p.forEach((e => {
                        for (var t = -1, n = 0; n < f.length; ++n)
                            if (e.uniquePbsTid === f[n].uniquePbsTid) {
                                t = n;
                                break
                            }
                        t <= -1 && f.push(e)
                    }));
                    let m = 0;
                    z.forEach((e => {
                        if (e && f[m] && J(e).has(f[m].bidderCode)) {
                            const t = (0, d.g4)(s, o ? {
                                request: o.request.bind(null, "s2s"),
                                done: o.done
                            } : void 0);
                            let c = e.bidders;
                            const u = M[e.adapter];
                            let g = f[m].uniquePbsTid,
                                b = f[m].adUnitsS2SCopy,
                                h = p.filter((e => e.uniquePbsTid === g));
                            if (u) {
                                let o = {
                                    ad_units: b,
                                    s2sConfig: e,
                                    ortb2Fragments: l
                                };
                                if (o.ad_units.length) {
                                    let e = h.map((e => (e.start = (0, i.vE)(), function(t) {
                                        t || a(e.bidderRequestId), r.apply(e, arguments)
                                    })));
                                    const s = (0, i.ZA)(o.ad_units).filter((e => c.includes(e)));
                                    (0, i.OG)(`CALLING S2S HEADER BIDDERS ==== ${s.length>0?s.join(", "):'No bidder specified, using "ortb2Imp" definition(s) only'}`), h.forEach((e => {
                                        y.Ic(_.qY.BID_REQUESTED, P(P({}, e), {}, {
                                            tid: e.auctionId
                                        }))
                                    })), u.callBids(o, p, n, (t => e.forEach((e => e(t)))), t)
                                }
                            } else(0, i.vV)("missing " + e.adapter);
                            m++
                        }
                    })), u.forEach((e => {
                        e.start = (0, i.vE)();
                        const t = M[e.bidderCode];
                        c.$W.runWithBidder(e.bidderCode, (() => {
                            (0, i.OG)("CALLING BIDDER"), y.Ic(_.qY.BID_REQUESTED, e)
                        }));
                        let l = (0, d.g4)(s, o ? {
                            request: o.request.bind(null, e.bidderCode),
                            done: o.done
                        } : void 0);
                        const u = r.bind(e);
                        try {
                            c.$W.runWithBidder(e.bidderCode, t.callBids.bind(t, e, n, u, l, (() => a(e.bidderRequestId)), c.$W.callbackWithBidder(e.bidderCode)))
                        } catch (t) {
                            (0, i.vV)(`${e.bidderCode} Bid Adapter emitted an uncaught error when parsing their bidRequest`, {
                                e: t,
                                bidRequest: e
                            }), u()
                        }
                    }))
                }, N.videoAdapters = [], N.registerBidAdapter = function(e, t) {
                    let {
                        supportedMediaTypes: n = []
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    var r;
                    e && t ? "function" == typeof e.callBids ? (M[t] = e, v.o2.register(A.tW, t, null === (r = e.getSpec) || void 0 === r ? void 0 : r.call(e).gvlid), (0, u.mK)(n, "video") && N.videoAdapters.push(t), (0, u.mK)(n, "native") && s.mT.push(t)) : (0, i.vV)("Bidder adaptor error for bidder code: " + t + "bidder must implement a callBids() function") : (0, i.vV)("bidAdapter or bidderCode not specified")
                }, N.aliasBidAdapter = function(e, t, n) {
                    if (void 0 === M[t]) {
                        let r = M[e];
                        if (void 0 === r) {
                            const n = [];
                            z.forEach((r => {
                                if (r.bidders && r.bidders.length) {
                                    const i = r && r.bidders;
                                    r && (0, u.mK)(i, t) ? W[t] = e : n.push(e)
                                }
                            })), n.forEach((e => {
                                (0, i.vV)('bidderCode "' + e + '" is not an existing bidder.', "adapterManager.aliasBidAdapter")
                            }))
                        } else try {
                            let o, d = function(e) {
                                let t = [];
                                return (0, u.mK)(N.videoAdapters, e) && t.push("video"), (0, u.mK)(s.mT, e) && t.push("native"), t
                            }(e);
                            if (r.constructor.prototype != Object.prototype) o = new r.constructor, o.setBidderCode(t);
                            else {
                                let s = r.getSpec(),
                                    d = n && n.gvlid;
                                null != s.gvlid && null == d && (0, i.JE)(`Alias '${t}' will NOT re-use the GVL ID of the original adapter ('${s.code}', gvlid: ${s.gvlid}). Functionality that requires TCF consent may not work as expected.`);
                                let c = n && n.skipPbsAliasing;
                                o = (0, a.xb)(Object.assign({}, s, {
                                    code: t,
                                    gvlid: d,
                                    skipPbsAliasing: c
                                })), W[t] = e
                            }
                            N.registerBidAdapter(o, t, {
                                supportedMediaTypes: d
                            })
                        } catch (t) {
                            (0, i.vV)(e + " bidder does not currently support aliasing.", "adapterManager.aliasBidAdapter")
                        }
                    } else(0, i.OG)('alias name "' + t + '" has been already specified.')
                }, N.resolveAlias = function(e) {
                    let t, n = e;
                    for (; W[n] && (!t || !t.has(n));) n = W[n], (t = t || new Set).add(n);
                    return n
                }, N.registerAnalyticsAdapter = function(e) {
                    let {
                        adapter: t,
                        code: n,
                        gvlid: r
                    } = e;
                    t && n ? "function" == typeof t.enableAnalytics ? (t.code = n, L[n] = {
                        adapter: t,
                        gvlid: r
                    }, v.o2.register(A.Tn, n, r)) : (0, i.vV)(`Prebid Error: Analytics adaptor error for analytics "${n}"\n        analytics adapter must implement an enableAnalytics() function`) : (0, i.vV)("Prebid Error: analyticsAdapter or analyticsCode not specified")
                }, N.enableAnalytics = function(e) {
                    (0, i.cy)(e) || (e = [e]), e.forEach((e => {
                        const t = L[e.provider];
                        t && t.adapter ? q.isAllowed(w.mo, V(A.Tn, e.provider, {
                            [x.TQ]: e
                        })) && t.adapter.enableAnalytics(e) : (0, i.vV)(`Prebid Error: no analytics adapter found in registry for '${e.provider}'.`)
                    }))
                }, N.getBidAdapter = function(e) {
                    return M[e]
                }, N.getAnalyticsAdapter = function(e) {
                    return L[e]
                }, N.callTimedOutBidders = function(e, t, n) {
                    t = t.map((t => (t.params = (0, i.SB)(e, t.adUnitCode, t.bidder), t.timeout = n, t))), t = (0, i.$z)(t, "bidder"), Object.keys(t).forEach((e => {
                        Y(e, "onTimeout", t[e])
                    }))
                }, N.callBidWonBidder = function(e, t, n) {
                    t.params = (0, i.SB)(n, t.adUnitCode, t.bidder), f(t.adUnitCode, "winsCounter", t.bidder), Y(e, "onBidWon", t)
                }, N.callBidBillableBidder = function(e) {
                    Y(e.bidder, "onBidBillable", e)
                }, N.callSetTargetingBidder = function(e, t) {
                    Y(e, "onSetTargeting", t)
                }, N.callBidViewableBidder = function(e, t) {
                    Y(e, "onBidViewable", t)
                }, N.callBidderError = function(e, t, n) {
                    Y(e, "onBidderError", {
                        error: t,
                        bidderRequest: n
                    })
                }, N.callDataDeletionRequest = (0, l.A_)("sync", (function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const r = "onDataDeletionRequest";
                    Object.keys(M).filter((e => !W.hasOwnProperty(e))).forEach((e => {
                        const n = Q(e, r);
                        if (null != n) {
                            const i = E.n.getBidsRequested().filter((t => function(e) {
                                const t = new Set;
                                for (; W.hasOwnProperty(e) && !t.has(e);) t.add(e), e = W[e];
                                return e
                            }(t.bidderCode) === e));
                            X(e, r, ...n, i, ...t)
                        }
                    })), Object.entries(L).forEach((e => {
                        var n;
                        let [o, s] = e;
                        const a = null == s || null === (n = s.adapter) || void 0 === n ? void 0 : n[r];
                        if ("function" == typeof a) try {
                            a.apply(s.adapter, t)
                        } catch (e) {
                            (0, i.vV)(`error calling ${r} of ${o}`, e)
                        }
                    }))
                }));
                const Z = N
            },
            678: (e, t, n) => {
                "use strict";

                function r(e) {
                    var t = e;
                    return {
                        callBids: function() {},
                        setBidderCode: function(e) {
                            t = e
                        },
                        getBidderCode: function() {
                            return t
                        }
                    }
                }
                n.d(t, {
                    xb: () => w,
                    a$: () => O
                });
                var i = n(807),
                    o = n(718),
                    s = n(651),
                    a = n(588),
                    d = n(787),
                    c = n(781),
                    l = n(743),
                    u = n(13),
                    p = n(455),
                    f = n(686),
                    m = n(439),
                    g = n(428),
                    b = n(447),
                    h = n(992),
                    v = n(253),
                    y = n(575),
                    _ = n(883),
                    I = n(973);
                const E = ["cpm", "ttl", "creativeId", "netRevenue", "currency"],
                    A = ["auctionId", "transactionId"];

                function O(e) {
                    const t = Array.isArray(e.supportedMediaTypes) ? {
                        supportedMediaTypes: e.supportedMediaTypes
                    } : void 0;

                    function n(e) {
                        const n = w(e);
                        i.Ay.registerBidAdapter(n, e.code, t)
                    }
                    n(e), Array.isArray(e.aliases) && e.aliases.forEach((t => {
                        let r, o, s = t;
                        (0, f.Qd)(t) && (s = t.code, r = t.gvlid, o = t.skipPbsAliasing), i.Ay.aliasRegistry[s] = e.code, n(Object.assign({}, e, {
                            code: s,
                            gvlid: r,
                            skipPbsAliasing: o
                        }))
                    }))
                }

                function w(e) {
                    return Object.assign(new r(e.code), {
                        getSpec: function() {
                            return Object.freeze(Object.assign({}, e))
                        },
                        registerSyncs: t,
                        callBids: function(n, r, a, m, O, w) {
                            if (!Array.isArray(n.bids)) return;
                            const x = function(e) {
                                    if ((0, v.io)(I.VJ, (0, y.s)(_.tW, e))) return {
                                        bidRequest: e => e,
                                        bidderRequest: e => e
                                    };

                                    function t(e, t, n) {
                                        return A.includes(t) ? null : Reflect.get(e, t, n)
                                    }

                                    function n(e, t) {
                                        const n = new Proxy(e, t);
                                        return Object.entries(e).filter((e => {
                                            let [t, n] = e;
                                            return "function" == typeof n
                                        })).forEach((t => {
                                            let [r, i] = t;
                                            return n[r] = i.bind(e)
                                        })), n
                                    }
                                    const r = (0, f.Bj)((e => n(e, {
                                        get: t
                                    })), (e => e.bidId));
                                    return {
                                        bidRequest: r,
                                        bidderRequest: e => n(e, {
                                            get: (n, i, o) => "bids" === i ? e.bids.map(r) : t(n, i, o)
                                        })
                                    }
                                }(n.bidderCode),
                                T = {},
                                S = [];

                            function R() {
                                a(), o.$W.runWithBidder(e.code, (() => {
                                    u.Ic(l.qY.BIDDER_DONE, n), t(S, n.gdprConsent, n.uspConsent, n.gppConsent)
                                }))
                            }
                            const j = D(n).measureTime("validate", (() => n.bids.filter((t => {
                                return n = x.bidRequest(t), !!e.isBidRequestValid(n) || ((0, f.JE)(`Invalid bid sent to bidder ${e.code}: ${JSON.stringify(n)}`), !1);
                                var n
                            }))));
                            if (0 === j.length) return void R();
                            const B = {};
                            j.forEach((e => {
                                B[e.bidId] = e, e.adUnitCode || (e.adUnitCode = e.placementCode)
                            })), C(e, j.map(x.bidRequest), x.bidderRequest(n), m, w, {
                                onRequest: e => u.Ic(l.qY.BEFORE_BIDDER_HTTP, n, e),
                                onResponse: t => {
                                    O(e.code), S.push(t)
                                },
                                onPaapi: e => {
                                    const t = B[e.bidId];
                                    t ? k(t, e.config) : (0, f.JE)("Received fledge auction configuration for an unknown bidId", e)
                                },
                                onError: (t, r) => {
                                    r.timedOut || O(e.code), i.Ay.callBidderError(e.code, r, n), u.Ic(l.qY.BIDDER_ERROR, {
                                        error: r,
                                        bidderRequest: n
                                    }), (0, f.vV)(`Server call for ${e.code} failed: ${t} ${r.status}. Continuing without bids.`)
                                },
                                onBid: t => {
                                    const n = B[t.requestId];
                                    if (n) {
                                        if (t.adapterCode = n.bidder, function(e, t) {
                                                let n = b.u.get(t, "allowAlternateBidderCodes") || !1,
                                                    r = b.u.get(t, "allowedAlternateBidderCodes");
                                                return !!(e && t && t !== e && (r = (0, f.cy)(r) ? r.map((e => e.trim().toLowerCase())).filter((e => !!e)).filter(f.hj) : r, !n || (0, f.cy)(r) && "*" !== r[0] && !r.includes(e)))
                                            }(t.bidderCode, n.bidder)) return (0, f.JE)(`${t.bidderCode} is not a registered partner or known bidder of ${n.bidder}, hence continuing without bid. If you wish to support this bidder, please mark allowAlternateBidderCodes as true in bidderSettings.`), void r.reject(n.adUnitCode, t, l.Tf.BIDDER_DISALLOWED);
                                        t.originalCpm = t.cpm, t.originalCurrency = t.currency, t.meta = t.meta || Object.assign({}, t[n.bidder]);
                                        const e = Object.assign((0, s.O)(l.XQ.GOOD, n), t, (0, f.Up)(n, A));
                                        ! function(e, t) {
                                            const n = (0, h.BO)(t.metrics);
                                            n.checkpoint("addBidResponse"), T[e] = !0, n.measureTime("addBidResponse.validate", (() => function(e, t) {
                                                let {
                                                    index: n = g.n.index
                                                } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};

                                                function r(e) {
                                                    return `Invalid bid from ${t.bidderCode}. Ignoring bid: ${e}`
                                                }
                                                return e ? t ? function() {
                                                    let e = Object.keys(t);
                                                    return E.every((n => (0, p.mK)(e, n) && !(0, p.mK)([void 0, null], t[n])))
                                                }() ? "native" !== t.mediaType || (0, d.Bm)(t, {
                                                    index: n
                                                }) ? "video" !== t.mediaType || (0, c.vk)(t, {
                                                    index: n
                                                }) ? !("banner" === t.mediaType && ! function(e, t) {
                                                    let {
                                                        index: n = g.n.index
                                                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                                    if ((t.width || 0 === parseInt(t.width, 10)) && (t.height || 0 === parseInt(t.height, 10))) return t.width = parseInt(t.width, 10), t.height = parseInt(t.height, 10), !0;
                                                    const r = n.getBidRequest(t),
                                                        i = n.getMediaTypes(t),
                                                        o = r && r.sizes || i && i.banner && i.banner.sizes,
                                                        s = (0, f.kK)(o);
                                                    if (1 === s.length) {
                                                        const [e, n] = s[0].split("x");
                                                        return t.width = parseInt(e, 10), t.height = parseInt(n, 10), !0
                                                    }
                                                    return !1
                                                }(e, t, {
                                                    index: n
                                                }) && ((0, f.vV)(r("Banner bids require a width and height")), 1)) : ((0, f.vV)(r("Video bid does not have required vastUrl or renderer property")), !1) : ((0, f.vV)(r("Native bid missing some required properties.")), !1) : ((0, f.vV)(r(`Bidder ${t.bidderCode} is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params.`)), !1) : ((0, f.JE)(`Some adapter tried to add an undefined bid for ${e}.`), !1) : ((0, f.JE)("No adUnitCode was supplied to addBidResponse."), !1)
                                            }(e, t))) ? r(e, t) : r.reject(e, t, l.Tf.INVALID)
                                        }(n.adUnitCode, e)
                                    } else(0, f.JE)(`Bidder ${e.code} made bid for unknown request ID: ${t.requestId}. Ignoring.`), r.reject(null, t, l.Tf.INVALID_REQUEST_ID)
                                },
                                onCompletion: R
                            })
                        }
                    });

                    function t(t, n, r, i) {
                        S(e, t, n, r, i)
                    }
                }
                const x = ["paapiAuctionConfigs", "fledgeAuctionConfigs"],
                    T = ["bids"].concat(x),
                    C = (0, m.A_)("sync", (function(e, t, n, r, i, o) {
                        let {
                            onRequest: s,
                            onResponse: a,
                            onPaapi: d,
                            onError: c,
                            onBid: l,
                            onCompletion: u
                        } = o;
                        const p = D(n);
                        u = p.startTiming("total").stopBefore(u);
                        let m = p.measureTime("buildRequests", (() => e.buildRequests(t, n)));
                        if (!m || 0 === m.length) return void u();
                        Array.isArray(m) || (m = [m]);
                        const g = (0, f.U6)(u, m.length);
                        m.forEach((t => {
                            const n = p.fork();

                            function o(e) {
                                null != e && (e.metrics = n.fork().renameWith()), l(e)
                            }
                            const u = i((function(r, i) {
                                    h();
                                    try {
                                        r = JSON.parse(r)
                                    } catch (e) {}
                                    r = {
                                        body: r,
                                        headers: {
                                            get: i.getResponseHeader.bind(i)
                                        }
                                    }, a(r);
                                    try {
                                        r = n.measureTime("interpretResponse", (() => e.interpretResponse(r, t)))
                                    } catch (t) {
                                        return (0, f.vV)(`Bidder ${e.code} failed to interpret the server's response. Continuing without bids`, null, t), void g()
                                    }
                                    let s, c;
                                    r && !Object.keys(r).some((e => !T.includes(e))) ? (s = r.bids, c = function(e) {
                                        const [t, n] = x.map((t => e[t]));
                                        if (null != t && null != n) throw new Error(`Adapter response should use ${x[0]} over ${x[1]}, not both`);
                                        return t ? ? n
                                    }(r)) : s = r, (0, f.cy)(c) && c.forEach(d), s && ((0, f.cy)(s) ? s.forEach(o) : o(s)), g()
                                })),
                                m = i((function(e, t) {
                                    h(), c(e, t), g()
                                }));
                            s(t);
                            const h = n.startTiming("net");

                            function E(n) {
                                const r = t.options;
                                return Object.assign(n, r, {
                                    browsingTopics: !(null != r && r.hasOwnProperty("browsingTopics") && !r.browsingTopics) && (b.u.get(e.code, "topicsHeader") ? ? !0) && (0, v.io)(I.DL, (0, y.s)(_.tW, e.code))
                                })
                            }
                            switch (t.method) {
                                case "GET":
                                    r(`${t.url}${A=t.data,A?`?${"object"==typeof A?(0,f.bL)(A):A}`:""}`, {
                                        success: u,
                                        error: m
                                    }, void 0, E({
                                        method: "GET",
                                        withCredentials: !0
                                    }));
                                    break;
                                case "POST":
                                    r(t.url, {
                                        success: u,
                                        error: m
                                    }, "string" == typeof t.data ? t.data : JSON.stringify(t.data), E({
                                        method: "POST",
                                        contentType: "text/plain",
                                        withCredentials: !0
                                    }));
                                    break;
                                default:
                                    (0, f.JE)(`Skipping invalid request from ${e.code}. Request type ${t.type} must be GET or POST`), g()
                            }
                            var A
                        }))
                    }), "processBidderRequests"),
                    S = (0, m.A_)("async", (function(e, t, n, r, s) {
                        const d = o.$W.getConfig("userSync.aliasSyncEnabled");
                        if (e.getUserSyncs && (d || !i.Ay.aliasRegistry[e.code])) {
                            let i = o.$W.getConfig("userSync.filterSettings"),
                                d = e.getUserSyncs({
                                    iframeEnabled: !(!i || !i.iframe && !i.all),
                                    pixelEnabled: !(!i || !i.image && !i.all)
                                }, t, n, r, s);
                            d && (Array.isArray(d) || (d = [d]), d.forEach((t => {
                                a.zt.registerSync(t.type, e.code, t.url)
                            })), a.zt.bidderDone(e.code))
                        }
                    }), "registerSyncs"),
                    k = (0, m.A_)("sync", ((e, t) => {}), "addComponentAuction");

                function D(e) {
                    return (0, h.BO)(e.metrics).renameWith((t => [`adapter.client.${t}`, `adapters.client.${e.bidderCode}.${t}`]))
                }
            },
            286: (e, t, n) => {
                "use strict";
                n.d(t, {
                    R: () => a
                });
                var r = n(455),
                    i = n(686);
                const o = new WeakMap,
                    s = ["debugging", "adloox", "criteo", "outstream", "adagio", "spotx", "browsi", "brandmetrics", "justtag", "tncId", "akamaidap", "ftrackId", "inskin", "hadron", "medianet", "improvedigital", "azerionedge", "aaxBlockmeter", "confiant", "arcspan", "airgrid", "clean.io", "a1Media", "geoedge", "mediafilter", "qortex", "dynamicAdBoost", "contxtful", "id5", "51Degrees"];

                function a(e, t, n, a, d) {
                    if (!t || !e) return void(0, i.vV)("cannot load external script without url and moduleCode");
                    if (!(0, r.mK)(s, t)) return void(0, i.vV)(`${t} not whitelisted for loading external JavaScript`);
                    a || (a = document);
                    const c = p(a, e);
                    if (c) return n && "function" == typeof n && (c.loaded ? n() : c.callbacks.push(n)), c.tag;
                    const l = o.get(a) || {},
                        u = {
                            loaded: !1,
                            tag: null,
                            callbacks: []
                        };
                    return l[e] = u, o.set(a, l), n && "function" == typeof n && u.callbacks.push(n), (0, i.JE)(`module ${t} is loading external JavaScript`),
                        function(t, n, r, o) {
                            r || (r = document);
                            var s = r.createElement("script");
                            s.type = "text/javascript", s.async = !0;
                            const a = p(r, e);
                            return a && (a.tag = s), s.readyState ? s.onreadystatechange = function() {
                                "loaded" !== s.readyState && "complete" !== s.readyState || (s.onreadystatechange = null, n())
                            } : s.onload = function() {
                                n()
                            }, s.src = t, o && (0, i.Bg)(s, o), (0, i._s)(s, r), s
                        }(e, (function() {
                            u.loaded = !0;
                            try {
                                for (let e = 0; e < u.callbacks.length; e++) u.callbacks[e]()
                            } catch (e) {
                                (0, i.vV)("Error executing callback", "adloader.js:loadExternalScript", e)
                            }
                        }), a, d);

                    function p(e, t) {
                        const n = o.get(e);
                        return n && n[t] ? n[t] : null
                    }
                }
            },
            330: (e, t, n) => {
                "use strict";
                n.d(t, {
                    RD: () => p,
                    g4: () => u,
                    hd: () => f
                });
                var r = n(718),
                    i = n(686);
                const o = {
                        fetch: window.fetch.bind(window),
                        makeRequest: (e, t) => new Request(e, t),
                        timeout(e, t) {
                            const n = new AbortController;
                            let r = setTimeout((() => {
                                n.abort(), (0, i.vV)(`Request timeout after ${e}ms`, t), r = null
                            }), e);
                            return {
                                signal: n.signal,
                                done() {
                                    r && clearTimeout(r)
                                }
                            }
                        }
                    },
                    s = "GET",
                    a = "POST",
                    d = "Content-Type";

                function c() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3,
                        {
                            request: t,
                            done: n
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = (t, n) => {
                            var i, s;
                            let a;
                            null == e || null != (null === (i = n) || void 0 === i ? void 0 : i.signal) || r.$W.getConfig("disableAjaxTimeout") || (a = o.timeout(e, t), n = Object.assign({
                                signal: a.signal
                            }, n));
                            let d = o.fetch(t, n);
                            return null != (null === (s = a) || void 0 === s ? void 0 : s.done) && (d = d.finally(a.done)), d
                        };
                    return null == t && null == n || (i = (e => function(r, i) {
                        const o = new URL(null == (null == r ? void 0 : r.url) ? r : r.url, document.location).origin;
                        let s = e(r, i);
                        return t && t(o), n && (s = s.finally((() => n(o)))), s
                    })(i)), i
                }

                function l(e, t) {
                    let {
                        status: n,
                        statusText: r = "",
                        headers: o,
                        url: s
                    } = e, a = 0;

                    function c(e) {
                        if (0 === a) try {
                            var n;
                            a = (new DOMParser).parseFromString(t, null == o || null === (n = o.get(d)) || void 0 === n || null === (n = n.split(";")) || void 0 === n ? void 0 : n[0])
                        } catch (t) {
                            a = null, e && e(t)
                        }
                        return a
                    }
                    return {
                        readyState: XMLHttpRequest.DONE,
                        status: n,
                        statusText: r,
                        responseText: t,
                        response: t,
                        responseType: "",
                        responseURL: s,
                        get responseXML() {
                            return c(i.vV)
                        },
                        getResponseHeader: e => null != o && o.has(e) ? o.get(e) : null,
                        toJSON() {
                            return Object.assign({
                                responseXML: c()
                            }, this)
                        },
                        timedOut: !1
                    }
                }

                function u() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3,
                        {
                            request: t,
                            done: n
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const r = c(e, {
                        request: t,
                        done: n
                    });
                    return function(e, t, n) {
                        ! function(e, t) {
                            const {
                                success: n,
                                error: r
                            } = "object" == typeof t && null != t ? t : {
                                success: "function" == typeof t ? t : () => null,
                                error: (e, t) => (0, i.vV)("Network error", e, t)
                            };
                            e.then((e => e.text().then((t => [e, t])))).then((e => {
                                let [t, i] = e;
                                const o = l(t, i);
                                t.ok || 304 === t.status ? n(i, o) : r(t.statusText, o)
                            }), (e => r("", Object.assign(l({
                                status: 0
                            }, ""), {
                                reason: e,
                                timedOut: "AbortError" === (null == e ? void 0 : e.name)
                            }))))
                        }(r(function(e, t) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            const r = n.method || (t ? a : s);
                            if (r === s && t) {
                                const r = (0, i.Dl)(e, n);
                                Object.assign(r.search, t), e = (0, i.c$)(r)
                            }
                            const c = new Headers(n.customHeaders);
                            c.set(d, n.contentType || "text/plain");
                            const l = {
                                method: r,
                                headers: c
                            };
                            return r !== s && t && (l.body = t), n.withCredentials && (l.credentials = "include"), n.browsingTopics && isSecureContext && (l.browsingTopics = !0), o.makeRequest(e, l)
                        }(e, n, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {})), t)
                    }
                }
                const p = u(),
                    f = c()
            },
            428: (e, t, n) => {
                "use strict";
                n.d(t, {
                    n: () => ee
                });
                var r = n(686),
                    i = n(384),
                    o = n(127),
                    s = n(787),
                    a = n(330),
                    d = n(718);

                function c(e) {
                    let {
                        index: t = ee.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const n = e.vastXml ? e.vastXml : `<VAST version="3.0">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA[${e.vastUrl}]]></VASTAdTagURI>\n        ${(r=(r=e.vastImpUrl)&&(Array.isArray(r)?r:[r]))?r.map((e=>`<Impression><![CDATA[${e}]]></Impression>`)).join(""):""}\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>`;
                    var r;
                    const i = t.getAuction(e);
                    let o = {
                        type: "xml",
                        value: n,
                        ttlseconds: Number(e.ttl) + 15
                    };
                    return d.$W.getConfig("cache.vasttrack") && (o.bidder = e.bidder, o.bidid = e.requestId, o.aid = e.auctionId), null != i && (o.timestamp = i.getAuctionStart()), "string" == typeof e.customCacheKey && "" !== e.customCacheKey && (o.key = e.customCacheKey), o
                }
                var l = n(487),
                    u = n(588),
                    p = n(439),
                    f = n(455),
                    m = n(781),
                    g = n(233),
                    b = n(447),
                    h = n(13),
                    v = n(807),
                    y = n(743),
                    _ = n(469),
                    I = n(992),
                    E = n(831);
                const {
                    syncUsers: A
                } = u.zt, O = "completed";
                h.on(y.qY.BID_ADJUSTMENT, (function(e) {
                    ! function(e) {
                        let t = function(e, t, n) {
                            var i;
                            let {
                                index: o = ee.index,
                                bs: s = b.u
                            } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                            n = n || o.getBidRequest(t);
                            const a = null == t ? void 0 : t.adapterCode,
                                d = (null == t ? void 0 : t.bidderCode) || (null === (i = n) || void 0 === i ? void 0 : i.bidder),
                                c = s.get(null == t ? void 0 : t.adapterCode, "adjustAlternateBids"),
                                l = s.getOwn(d, "bidCpmAdjustment") || s.get(c ? a : d, "bidCpmAdjustment");
                            if (l && "function" == typeof l) try {
                                return l(e, Object.assign({}, t), n)
                            } catch (e) {
                                (0, r.vV)("Error during bid adjustment", e)
                            }
                            return e
                        }(e.cpm, e);
                        t >= 0 && (e.cpm = t)
                    }(e)
                }));
                const w = {},
                    x = {},
                    T = [],
                    C = (0, E.m)();

                function S(e) {
                    let {
                        adUnits: t,
                        adUnitCodes: n,
                        callback: a,
                        cbTimeout: c,
                        labels: u,
                        auctionId: p,
                        ortb2Fragments: b,
                        metrics: E
                    } = e;
                    E = (0, I.BO)(E);
                    const S = t,
                        P = u,
                        U = n,
                        $ = p || (0, r.lk)(),
                        q = c,
                        W = new Set,
                        z = (0, _.v)();
                    let L, V, F, G, H = [],
                        J = a,
                        Q = [],
                        X = [],
                        Y = [],
                        Z = [],
                        te = [];

                    function ne() {
                        return {
                            auctionId: $,
                            timestamp: L,
                            auctionEnd: V,
                            auctionStatus: G,
                            adUnits: S,
                            adUnitCodes: U,
                            labels: P,
                            bidderRequests: Q,
                            noBids: Y,
                            bidsReceived: X,
                            bidsRejected: H,
                            winningBids: Z,
                            timeout: q,
                            metrics: E,
                            seatNonBids: te
                        }
                    }

                    function re(e) {
                        if (e ? h.Ic(y.qY.AUCTION_TIMEOUT, ne()) : clearTimeout(F), void 0 === V) {
                            let n = [];
                            e && ((0, r.OG)(`Auction ${$} timedOut`), n = Q.filter((e => !W.has(e.bidderRequestId))).flatMap((e => e.bids)), n.length && h.Ic(y.qY.BID_TIMEOUT, n)), G = O, V = Date.now(), E.checkpoint("auctionEnd"), E.timeBetween("requestBids", "auctionEnd", "requestBids.total"), E.timeBetween("callBids", "auctionEnd", "requestBids.callBids"), z.resolve(), h.Ic(y.qY.AUCTION_END, ne()), j(S, (function() {
                                try {
                                    if (null != J) {
                                        const t = X.filter((e => U.includes(e.adUnitCode))).reduce(K, {});
                                        J.apply(C, [t, e, $]), J = null
                                    }
                                } catch (e) {
                                    (0, r.vV)("Error executing bidsBackHandler", null, e)
                                } finally {
                                    n.length && v.Ay.callTimedOutBidders(t, n, q);
                                    let e = d.$W.getConfig("userSync") || {};
                                    e.enableOverride || A(e.syncDelay)
                                }
                            }))
                        }
                    }

                    function ie() {
                        d.$W.resetBidder(), (0, r.fH)(`Bids Received for Auction with id: ${$}`, X), G = O, re(!1)
                    }

                    function oe(e) {
                        W.add(e)
                    }

                    function se(e) {
                        e.forEach((e => {
                            var t;
                            t = e, Q = Q.concat(t)
                        }));
                        let t = {},
                            n = {
                                bidRequests: e,
                                run: () => {
                                    F = setTimeout((() => re(!0)), q), G = "inProgress", h.Ic(y.qY.AUCTION_INIT, ne());
                                    let n = function(e, t) {
                                        let {
                                            index: n = ee.index
                                        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = 0, c = !1, u = new Set, p = {};

                                        function b() {
                                            a--, c && 0 === a && e()
                                        }

                                        function v(e, t, n) {
                                            return p[t.requestId] = !0,
                                                function(e, t) {
                                                    let {
                                                        index: n = ee.index
                                                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                                    const i = n.getBidderRequest(e),
                                                        o = n.getAdUnit(e),
                                                        s = i && i.start || e.requestTimestamp;
                                                    Object.assign(e, {
                                                        responseTimestamp: e.responseTimestamp || (0, r.vE)(),
                                                        requestTimestamp: e.requestTimestamp || s,
                                                        cpm: parseFloat(e.cpm) || 0,
                                                        bidder: e.bidder || e.bidderCode,
                                                        adUnitCode: t
                                                    }), null != (null == o ? void 0 : o.ttlBuffer) && (e.ttlBuffer = o.ttlBuffer), e.timeToRespond = e.responseTimestamp - e.requestTimestamp
                                                }(t, e), a++, n(b)
                                        }

                                        function I(e, a) {
                                            v(e, a, (e => {
                                                let c = function(e) {
                                                    var t;
                                                    let {
                                                        index: n = ee.index
                                                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                                    h.Ic(y.qY.BID_ADJUSTMENT, e);
                                                    const r = (null === (t = n.getBidRequest(e)) || void 0 === t ? void 0 : t.renderer) || n.getAdUnit(e).renderer,
                                                        i = e.mediaType,
                                                        s = n.getMediaTypes(e),
                                                        a = s && s[i];
                                                    var c = a && a.renderer,
                                                        u = null;
                                                    c && c.url && c.render && (!0 !== c.backupOnly || !e.renderer) ? u = c : r && r.url && r.render && (!0 !== r.backupOnly || !e.renderer) && (u = r), u && (e.renderer = l.A4.install({
                                                        url: u.url,
                                                        config: u.options
                                                    }), e.renderer.setRender(u.render));
                                                    const p = M(e.mediaType, s, d.$W.getConfig("mediaTypePriceGranularity")),
                                                        f = (0, o.j)(e.cpm, "object" == typeof p ? p : d.$W.getConfig("customPriceBucket"), d.$W.getConfig("currency.granularityMultiplier"));
                                                    return e.pbLg = f.low, e.pbMg = f.med, e.pbHg = f.high, e.pbAg = f.auto, e.pbDg = f.dense, e.pbCg = f.custom, e
                                                }(a);
                                                h.Ic(y.qY.BID_ACCEPTED, c), c.mediaType === g.G_ ? function(e, t, n) {
                                                    let {
                                                        index: o = ee.index
                                                    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, s = !0;
                                                    const a = (0, i.A)(o.getMediaTypes({
                                                            requestId: t.originalRequestId || t.requestId,
                                                            adUnitId: t.adUnitId
                                                        }), "video"),
                                                        c = a && (0, i.A)(a, "context"),
                                                        l = a && (0, i.A)(a, "useCacheKey");
                                                    d.$W.getConfig("cache.url") && (l || c !== m.H6) && (!t.videoCacheKey || d.$W.getConfig("cache.ignoreBidderCacheKey") ? (s = !1, N(e, t, n, a)) : t.vastUrl || ((0, r.vV)("videoCacheKey specified but not required vastUrl for video bid"), s = !1)), s && (B(e, t), n())
                                                }(t, c, e) : ((0, s.l6)(c) && (0, s.gs)(c, n.getAdUnit(c)), B(t, c), e())
                                            }))
                                        }

                                        function E(e, n, i) {
                                            return v(e, n, (e => {
                                                n.rejectionReason = i, (0, r.JE)(`Bid from ${n.bidder||"unknown bidder"} was rejected: ${i}`, n), h.Ic(y.qY.BID_REJECTED, n), t.addBidRejected(n), e()
                                            }))
                                        }

                                        function A() {
                                            let n = t.getBidRequests();
                                            const i = d.$W.getConfig("auctionOptions");
                                            if (u.add(this), i && !(0, r.Im)(i)) {
                                                const e = i.secondaryBidders;
                                                e && !n.every((t => (0, f.mK)(e, t.bidderCode))) && (n = n.filter((t => !(0, f.mK)(e, t.bidderCode))))
                                            }
                                            c = n.every((e => u.has(e))), this.bids.forEach((e => {
                                                p[e.bidId] || (t.addNoBid(e), h.Ic(y.qY.NO_BID, e))
                                            })), c && 0 === a && e()
                                        }
                                        return {
                                            addBidResponse: function() {
                                                function e(e, t) {
                                                    k.call({
                                                        dispatch: I
                                                    }, e, t, (() => {
                                                        let n = !1;
                                                        return r => {
                                                            n || (E(e, t, r), n = !0)
                                                        }
                                                    })())
                                                }
                                                return e.reject = E, e
                                            }(),
                                            adapterDone: function() {
                                                D(_.k.resolve()).finally((() => A.call(this)))
                                            }
                                        }
                                    }(ie, this);
                                    v.Ay.callBids(S, e, n.addBidResponse, n.adapterDone, {
                                        request(e, n) {
                                            c(w, n), c(t, e), x[e] || (x[e] = {
                                                SRA: !0,
                                                origin: n
                                            }), t[e] > 1 && (x[e].SRA = !1)
                                        },
                                        done(e) {
                                            w[e]--, T[0] && a(T[0]) && T.shift()
                                        }
                                    }, q, oe, b)
                                }
                            };

                        function a(e) {
                            let t = !0,
                                n = d.$W.getConfig("maxRequestsPerOrigin") || 4;
                            return e.bidRequests.some((e => {
                                let r = 1,
                                    i = void 0 !== e.src && e.src === y.RW.SRC ? "s2s" : e.bidderCode;
                                return x[i] && (!1 === x[i].SRA && (r = Math.min(e.bids.length, n)), w[x[i].origin] + r > n && (t = !1)), !t
                            })), t && e.run(), t
                        }

                        function c(e, t) {
                            void 0 === e[t] ? e[t] = 1 : e[t]++
                        }
                        a(n) || ((0, r.JE)("queueing auction due to limited endpoint capacity"), T.push(n))
                    }
                    return h.on(y.qY.SEAT_NON_BID, (e => {
                        var t;
                        e.auctionId === $ && (t = e.seatnonbid, te = te.concat(t))
                    })), {
                        addBidReceived: function(e) {
                            X = X.concat(e)
                        },
                        addBidRejected: function(e) {
                            H = H.concat(e)
                        },
                        addNoBid: function(e) {
                            Y = Y.concat(e)
                        },
                        callBids: function() {
                            G = "started", L = Date.now();
                            let e = E.measureTime("requestBids.makeRequests", (() => v.Ay.makeBidRequests(S, L, $, q, P, b, E)));
                            (0, r.fH)(`Bids Requested for Auction with id: ${$}`, e), E.checkpoint("callBids"), e.length < 1 ? ((0, r.JE)("No valid bid requests returned for auction"), ie()) : R.call({
                                dispatch: se,
                                context: this
                            }, e)
                        },
                        addWinningBid: function(e) {
                            const n = t.find((t => t.adUnitId === e.adUnitId));
                            Z = Z.concat(e), (0, r.Wz)(e), v.Ay.callBidWonBidder(e.adapterCode || e.bidder, e, t), n && !n.deferBilling && v.Ay.callBidBillableBidder(e)
                        },
                        setBidTargeting: function(e) {
                            v.Ay.callSetTargetingBidder(e.adapterCode || e.bidder, e)
                        },
                        getWinningBids: () => Z,
                        getAuctionStart: () => L,
                        getAuctionEnd: () => V,
                        getTimeout: () => q,
                        getAuctionId: () => $,
                        getAuctionStatus: () => G,
                        getAdUnits: () => S,
                        getAdUnitCodes: () => U,
                        getBidRequests: () => Q,
                        getBidsReceived: () => X,
                        getNoBids: () => Y,
                        getNonBids: () => te,
                        getFPD: () => b,
                        getMetrics: () => E,
                        end: z.promise
                    }
                }
                const k = (0, p.A_)("sync", (function(e, t, n) {
                        ! function(e) {
                            const t = d.$W.getConfig("maxBid");
                            return !t || !e.cpm || t >= Number(e.cpm)
                        }(t) ? n(y.Tf.PRICE_TOO_HIGH): this.dispatch.call(null, e, t)
                    }), "addBidResponse"),
                    D = (0, p.A_)("sync", (e => e), "responsesReady"),
                    R = (0, p.A_)("sync", (function(e) {
                        this.dispatch.call(this.context, e)
                    }), "addBidderRequests"),
                    j = (0, p.A_)("async", (function(e, t) {
                        t && t()
                    }), "bidsBackCallback");

                function B(e, t) {
                    ! function(e) {
                        let t;
                        const n = !0 === b.u.get(e.bidderCode, "allowZeroCpmBids") ? e.cpm >= 0 : e.cpm > 0;
                        e.bidderCode && (n || e.dealId) && (t = function(e, t) {
                            let {
                                index: n = ee.index
                            } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            if (!t) return {};
                            const r = n.getBidRequest(t);
                            var i = {};
                            return J(i, H(t.mediaType, e), t, r), e && b.u.getOwn(e, y.iD.ADSERVER_TARGETING) && (J(i, b.u.ownSettingsFor(e), t, r), t.sendStandardTargeting = b.u.get(e, "sendStandardTargeting")), t.native && (i = Object.assign({}, i, (0, s.Zj)(t))), i
                        }(e.bidderCode, e)), e.adserverTargeting = Object.assign(e.adserverTargeting || {}, t)
                    }(t), (0, I.BO)(t.metrics).timeSince("addBidResponse", "addBidResponse.total"), e.addBidReceived(t), h.Ic(y.qY.BID_RESPONSE, t)
                }
                const P = e => {
                    ! function(e, t) {
                        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a.g4;
                        const r = {
                            puts: e.map(c)
                        };
                        n(d.$W.getConfig("cache.timeout"))(d.$W.getConfig("cache.url"), function(e) {
                            return {
                                success: function(t) {
                                    let n;
                                    try {
                                        n = JSON.parse(t).responses
                                    } catch (t) {
                                        return void e(t, [])
                                    }
                                    n ? e(null, n) : e(new Error("The cache server didn't respond with a responses property."), [])
                                },
                                error: function(t, n) {
                                    e(new Error(`Error storing video ad in the cache: ${t}: ${JSON.stringify(n)}`), [])
                                }
                            }
                        }(t), JSON.stringify(r), {
                            contentType: "text/plain",
                            withCredentials: !0
                        })
                    }(e.map((e => e.bidResponse)), (function(t, n) {
                        n.forEach(((n, i) => {
                            const {
                                auctionInstance: o,
                                bidResponse: s,
                                afterBidAdded: a
                            } = e[i];
                            var c;
                            t ? (0, r.JE)(`Failed to save to the video cache: ${t}. Video bid must be discarded.`) : "" === n.uuid ? (0, r.JE)("Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded.") : (s.videoCacheKey = n.uuid, s.vastUrl || (s.vastUrl = (c = s.videoCacheKey, `${d.$W.getConfig("cache.url")}?uuid=${c}`)), B(o, s), a())
                        }))
                    }))
                };
                let U, $;
                d.$W.getConfig("cache", (e => {
                    U = "number" == typeof e.cache.batchSize && e.cache.batchSize > 0 ? e.cache.batchSize : 1, $ = "number" == typeof e.cache.batchTimeout && e.cache.batchTimeout > 0 ? e.cache.batchTimeout : 0
                }));
                const q = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : setTimeout,
                            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : P,
                            n = [
                                []
                            ],
                            r = !1;
                        const i = e => e();
                        return function(o, s, a) {
                            const d = $ > 0 ? e : i;
                            n[n.length - 1].length >= U && n.push([]), n[n.length - 1].push({
                                auctionInstance: o,
                                bidResponse: s,
                                afterBidAdded: a
                            }), r || (r = !0, d((() => {
                                n.forEach(t), n = [
                                    []
                                ], r = !1
                            }), $))
                        }
                    }(),
                    N = (0, p.A_)("async", (function(e, t, n, r) {
                        q(e, t, n)
                    }), "callPrebidCache");

                function M(e, t, n) {
                    if (e && n) {
                        if (e === g.G_) {
                            const e = (0, i.A)(t, `${g.G_}.context`, "instream");
                            if (n[`${g.G_}-${e}`]) return n[`${g.G_}-${e}`]
                        }
                        return n[e]
                    }
                }
                const W = e => t => {
                        const n = e || function(e) {
                            let {
                                index: t = ee.index
                            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            const n = M(e.mediaType, t.getMediaTypes(e), d.$W.getConfig("mediaTypePriceGranularity"));
                            return "string" == typeof e.mediaType && n ? "string" == typeof n ? n : "custom" : d.$W.getConfig("priceGranularity")
                        }(t);
                        return n === y.UE.AUTO ? t.pbAg : n === y.UE.DENSE ? t.pbDg : n === y.UE.LOW ? t.pbLg : n === y.UE.MEDIUM ? t.pbMg : n === y.UE.HIGH ? t.pbHg : n === y.UE.CUSTOM ? t.pbCg : void 0
                    },
                    z = () => e => e.creativeId ? e.creativeId : "",
                    L = () => e => e.meta && e.meta.advertiserDomains && e.meta.advertiserDomains.length > 0 ? [e.meta.advertiserDomains].flat()[0] : "",
                    V = () => e => e.meta && (e.meta.networkId || e.meta.networkName) ? (0, i.A)(e, "meta.networkName") || (0, i.A)(e, "meta.networkId") : "",
                    F = () => e => e.meta && e.meta.primaryCatId ? e.meta.primaryCatId : "";

                function G(e, t) {
                    return {
                        key: e,
                        val: "function" == typeof t ? function(e, n) {
                            return t(e, n)
                        } : function(e) {
                            return (0, r._W)(e, t)
                        }
                    }
                }

                function H(e, t) {
                    const n = Object.assign({}, b.u.settingsFor(null));
                    if (n[y.iD.ADSERVER_TARGETING] || (n[y.iD.ADSERVER_TARGETING] = [G(y.xS.BIDDER, "bidderCode"), G(y.xS.AD_ID, "adId"), G(y.xS.PRICE_BUCKET, W()), G(y.xS.SIZE, "size"), G(y.xS.DEAL, "dealId"), G(y.xS.SOURCE, "source"), G(y.xS.FORMAT, "mediaType"), G(y.xS.ADOMAIN, L()), G(y.xS.ACAT, F()), G(y.xS.DSP, V()), G(y.xS.CRID, z())]), "video" === e) {
                        const e = n[y.iD.ADSERVER_TARGETING].slice();
                        if (n[y.iD.ADSERVER_TARGETING] = e, [y.xS.UUID, y.xS.CACHE_ID].forEach((t => {
                                void 0 === (0, f.I6)(e, (e => e.key === t)) && e.push(G(t, "videoCacheKey"))
                            })), d.$W.getConfig("cache.url") && (!t || !1 !== b.u.get(t, "sendStandardTargeting"))) {
                            const t = (0, r.Dl)(d.$W.getConfig("cache.url"));
                            void 0 === (0, f.I6)(e, (e => e.key === y.xS.CACHE_HOST)) && e.push(G(y.xS.CACHE_HOST, (function(e) {
                                return (0, i.A)(e, `adserverTargeting.${y.xS.CACHE_HOST}`) ? e.adserverTargeting[y.xS.CACHE_HOST] : t.hostname
                            })))
                        }
                    }
                    return n
                }

                function J(e, t, n, i) {
                    var o = t[y.iD.ADSERVER_TARGETING];
                    return n.size = n.getSize(), (o || []).forEach((function(o) {
                        var s = o.key,
                            a = o.val;
                        if (e[s] && (0, r.JE)("The key: " + s + " is being overwritten"), (0, r.fp)(a)) try {
                            a = a(n, i)
                        } catch (e) {
                            (0, r.vV)("bidmanager", "ERROR", e)
                        }(void 0 === t.suppressEmptyKeys || !0 !== t.suppressEmptyKeys) && s !== y.xS.DEAL && s !== y.xS.ACAT && s !== y.xS.DSP && s !== y.xS.CRID || !(0, r.xQ)(a) && null != a ? e[s] = a : (0, r.fH)("suppressing empty key '" + s + "' from adserver targeting")
                    })), e
                }

                function K(e, t) {
                    return e[t.adUnitCode] || (e[t.adUnitCode] = {
                        bids: []
                    }), e[t.adUnitCode].bids.push(t), e
                }

                function Q(e) {
                    Object.assign(this, {
                        getAuction(t) {
                            let {
                                auctionId: n
                            } = t;
                            if (null != n) return e().find((e => e.getAuctionId() === n))
                        },
                        getAdUnit(t) {
                            let {
                                adUnitId: n
                            } = t;
                            if (null != n) return e().flatMap((e => e.getAdUnits())).find((e => e.adUnitId === n))
                        },
                        getMediaTypes(e) {
                            let {
                                adUnitId: t,
                                requestId: n
                            } = e;
                            if (null != n) {
                                const e = this.getBidRequest({
                                    requestId: n
                                });
                                if (null != e && (null == t || e.adUnitId === t)) return e.mediaTypes
                            } else if (null != t) {
                                const e = this.getAdUnit({
                                    adUnitId: t
                                });
                                if (null != e) return e.mediaTypes
                            }
                        },
                        getBidderRequest(t) {
                            let {
                                requestId: n,
                                bidderRequestId: r
                            } = t;
                            if (null != n || null != r) {
                                let t = e().flatMap((e => e.getBidRequests()));
                                return null != r && (t = t.filter((e => e.bidderRequestId === r))), null == n ? t[0] : t.find((e => e.bids && null != e.bids.find((e => e.bidId === n))))
                            }
                        },
                        getBidRequest(t) {
                            let {
                                requestId: n
                            } = t;
                            if (null != n) return e().flatMap((e => e.getBidRequests())).flatMap((e => e.bids)).find((e => e && e.bidId === n))
                        }
                    })
                }
                var X = n(280),
                    Y = n(389);
                const Z = "minBidCacheTTL",
                    ee = function() {
                        let e = null;
                        const t = (0, X.H)({
                            startTime: e => e.end.then((() => e.getAuctionEnd())),
                            ttl: t => null == e ? null : t.end.then((() => 1e3 * Math.max(e, ...t.getBidsReceived().map(Y.L))))
                        });
                        (0, Y.u)((() => {
                            null != e && t.refresh()
                        })), d.$W.getConfig(Z, (n => {
                            const r = e;
                            e = null == n ? void 0 : n[Z], e = "number" == typeof e ? e : null, r !== e && t.refresh()
                        }));
                        const n = {
                            onExpiry: t.onExpiry
                        };

                        function i(e) {
                            for (const n of t)
                                if (n.getAuctionId() === e) return n
                        }

                        function o() {
                            return t.toArray().flatMap((e => e.getBidsReceived()))
                        }
                        return n.addWinningBid = function(e) {
                            const t = (0, I.BO)(e.metrics);
                            t.checkpoint("bidWon"), t.timeBetween("auctionEnd", "bidWon", "render.pending"), t.timeBetween("requestBids", "bidWon", "render.e2e");
                            const n = i(e.auctionId);
                            n ? (e.status = y.tl.RENDERED, n.addWinningBid(e)) : (0, r.JE)("Auction not found when adding winning bid")
                        }, Object.entries({
                            getAllWinningBids: {
                                name: "getWinningBids"
                            },
                            getBidsRequested: {
                                name: "getBidRequests"
                            },
                            getNoBids: {},
                            getAdUnits: {},
                            getBidsReceived: {
                                pre: e => e.getAuctionStatus() === O
                            },
                            getAdUnitCodes: {
                                post: r.hj
                            }
                        }).forEach((e => {
                            let [r, {
                                name: i = r,
                                pre: o,
                                post: s
                            }] = e;
                            const a = null == o ? e => e[i]() : e => o(e) ? e[i]() : [],
                                d = null == s ? e => e : e => e.filter(s);
                            n[r] = () => d(t.toArray().flatMap(a))
                        })), n.getAllBidsForAdUnitCode = function(e) {
                            return o().filter((t => t && t.adUnitCode === e))
                        }, n.createAuction = function(e) {
                            const n = S(e);
                            return function(e) {
                                t.add(e)
                            }(n), n
                        }, n.findBidByAdId = function(e) {
                            return o().find((t => t.adId === e))
                        }, n.getStandardBidderAdServerTargeting = function() {
                            return H()[y.iD.ADSERVER_TARGETING]
                        }, n.setStatusForBids = function(e, t) {
                            let r = n.findBidByAdId(e);
                            if (r && (r.status = t), r && t === y.tl.BID_TARGETING_SET) {
                                const e = i(r.auctionId);
                                e && e.setBidTargeting(r)
                            }
                        }, n.getLastAuctionId = function() {
                            const e = t.toArray();
                            return e.length && e[e.length - 1].getAuctionId()
                        }, n.clearAllAuctions = function() {
                            t.clear()
                        }, n.index = new Q((() => t.toArray())), n
                    }()
            },
            389: (e, t, n) => {
                "use strict";
                n.d(t, {
                    L: () => a,
                    u: () => d
                });
                var r = n(718),
                    i = n(686);
                let o = 1;
                const s = [];

                function a(e) {
                    return e.ttl - (e.hasOwnProperty("ttlBuffer") ? e.ttlBuffer : o)
                }

                function d(e) {
                    s.push(e)
                }
                r.$W.getConfig("ttlBuffer", (e => {
                    if ("number" == typeof e.ttlBuffer) {
                        const t = o;
                        o = e.ttlBuffer, t !== o && s.forEach((e => e(o)))
                    } else(0, i.vV)("Invalid value for ttlBuffer", e.ttlBuffer)
                }))
            },
            447: (e, t, n) => {
                "use strict";
                n.d(t, {
                    u: () => l
                });
                var r = n(384),
                    i = n(686),
                    o = n(831),
                    s = n(743);

                function a(e, t, n) {
                    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
                    throw new TypeError("Private element is not present on this object")
                }
                var d = new WeakSet;

                function c(e) {
                    return null == e ? this.defaultScope : e
                }
                const l = new class {
                    constructor(e, t) {
                        var n;
                        (function(e, t) {
                            if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                        })(this, n = d), n.add(this), this.getSettings = e, this.defaultScope = t
                    }
                    get(e, t) {
                        let n = this.getOwn(e, t);
                        return void 0 === n && (n = this.getOwn(null, t)), n
                    }
                    getOwn(e, t) {
                        return e = a(d, this, c).call(this, e), (0, r.A)(this.getSettings(), `${e}.${t}`)
                    }
                    getScopes() {
                        return Object.keys(this.getSettings()).filter((e => e !== this.defaultScope))
                    }
                    settingsFor(e) {
                        return (0, i.D9)({}, this.ownSettingsFor(null), this.ownSettingsFor(e))
                    }
                    ownSettingsFor(e) {
                        return e = a(d, this, c).call(this, e), this.getSettings()[e] || {}
                    }
                }((() => (0, o.m)().bidderSettings || {}), s.iD.BD_SETTING_STANDARD)
            },
            651: (e, t, n) => {
                "use strict";
                n.d(t, {
                    O: () => o
                });
                var r = n(686);

                function i(e) {
                    let {
                        src: t = "client",
                        bidder: n = "",
                        bidId: i,
                        transactionId: o,
                        adUnitId: s,
                        auctionId: a
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    var d = t,
                        c = e || 0;
                    Object.assign(this, {
                        bidderCode: n,
                        width: 0,
                        height: 0,
                        statusMessage: function() {
                            switch (c) {
                                case 0:
                                    return "Pending";
                                case 1:
                                    return "Bid available";
                                case 2:
                                    return "Bid returned empty or error response";
                                case 3:
                                    return "Bid timed out"
                            }
                        }(),
                        adId: (0, r.s0)(),
                        requestId: i,
                        transactionId: o,
                        adUnitId: s,
                        auctionId: a,
                        mediaType: "banner",
                        source: d
                    }), this.getStatusCode = function() {
                        return c
                    }, this.getSize = function() {
                        return this.width + "x" + this.height
                    }, this.getIdentifiers = function() {
                        return {
                            src: this.source,
                            bidder: this.bidderCode,
                            bidId: this.requestId,
                            transactionId: this.transactionId,
                            adUnitId: this.adUnitId,
                            auctionId: this.auctionId
                        }
                    }
                }

                function o(e, t) {
                    return new i(e, t)
                }
            },
            718: (e, t, n) => {
                "use strict";
                n.d(t, {
                    $W: () => g,
                    Ov: () => u
                });
                var r = n(504),
                    i = n(127),
                    o = n(455),
                    s = n(686),
                    a = n(384),
                    d = n(743);

                function c(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t && (r = r.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), n.push.apply(n, r)
                    }
                    return n
                }
                const l = "TRUE" === (0, s.Ez)(d.M).toUpperCase(),
                    u = "random",
                    p = {};
                p[u] = !0, p.fixed = !0;
                const f = u,
                    m = {
                        LOW: "low",
                        MEDIUM: "medium",
                        HIGH: "high",
                        AUTO: "auto",
                        DENSE: "dense",
                        CUSTOM: "custom"
                    },
                    g = function() {
                        let e, t, n, d = [],
                            u = null;

                        function g() {
                            function r(e) {
                                return d[e].val
                            }

                            function a(e, t) {
                                d[e].val = t
                            }
                            e = {};
                            const d = {
                                publisherDomain: {
                                    set(e) {
                                        null != e && (0, s.JE)("publisherDomain is deprecated and has no effect since v7 - use pageUrl instead"), a("publisherDomain", e)
                                    }
                                },
                                priceGranularity: {
                                    val: m.MEDIUM,
                                    set(e) {
                                        g(e) && ("string" == typeof e ? a("priceGranularity", u(e) ? e : m.MEDIUM) : (0, s.Qd)(e) && (a("customPriceBucket", e), a("priceGranularity", m.CUSTOM), (0, s.OG)("Using custom price granularity")))
                                    }
                                },
                                customPriceBucket: {
                                    val: {},
                                    set() {}
                                },
                                mediaTypePriceGranularity: {
                                    val: {},
                                    set(e) {
                                        null != e && a("mediaTypePriceGranularity", Object.keys(e).reduce(((t, n) => (g(e[n]) ? "string" == typeof e ? t[n] = u(e[n]) ? e[n] : r("priceGranularity") : (0, s.Qd)(e) && (t[n] = e[n], (0, s.OG)(`Using custom price granularity for ${n}`)) : (0, s.JE)(`Invalid price granularity for media type: ${n}`), t)), {}))
                                    }
                                },
                                bidderSequence: {
                                    val: f,
                                    set(e) {
                                        p[e] ? a("bidderSequence", e) : (0, s.JE)(`Invalid order: ${e}. Bidder Sequence was not set.`)
                                    }
                                },
                                auctionOptions: {
                                    val: {},
                                    set(e) {
                                        (function(e) {
                                            if (!(0, s.Qd)(e)) return (0, s.JE)("Auction Options must be an object"), !1;
                                            for (let t of Object.keys(e)) {
                                                if ("secondaryBidders" !== t && "suppressStaleRender" !== t) return (0, s.JE)(`Auction Options given an incorrect param: ${t}`), !1;
                                                if ("secondaryBidders" === t) {
                                                    if (!(0, s.cy)(e[t])) return (0, s.JE)(`Auction Options ${t} must be of type Array`), !1;
                                                    if (!e[t].every(s.O8)) return (0, s.JE)(`Auction Options ${t} must be only string`), !1
                                                } else if ("suppressStaleRender" === t && !(0, s.Lm)(e[t])) return (0, s.JE)(`Auction Options ${t} must be of type boolean`), !1
                                            }
                                            return !0
                                        })(e) && a("auctionOptions", e)
                                    }
                                }
                            };
                            let c = {
                                debug: l,
                                bidderTimeout: 3e3,
                                enableSendAllBids: !0,
                                useBidCache: !1,
                                deviceAccess: !0,
                                timeoutBuffer: 400,
                                disableAjaxTimeout: !1,
                                maxNestedIframes: 10,
                                maxBid: 5e3
                            };

                            function u(e) {
                                return (0, o.I6)(Object.keys(m), (t => e === m[t]))
                            }

                            function g(e) {
                                if (!e) return (0, s.vV)("Prebid Error: no value passed to `setPriceGranularity()`"), !1;
                                if ("string" == typeof e) u(e) || (0, s.JE)("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.");
                                else if ((0, s.Qd)(e) && !(0, i.q)(e)) return (0, s.vV)("Invalid custom price value passed to `setPriceGranularity()`"), !1;
                                return !0
                            }
                            Object.defineProperties(c, Object.fromEntries(Object.entries(d).map((e => {
                                let [t, n] = e;
                                return [t, Object.assign({
                                    get: r.bind(null, t),
                                    set: a.bind(null, t),
                                    enumerable: !0
                                }, n)]
                            })))), t && E(Object.keys(t).reduce(((e, n) => (t[n] !== c[n] && (e[n] = c[n] || {}), e)), {})), t = c, n = {}
                        }

                        function b() {
                            if (u && n && (0, s.Qd)(n[u])) {
                                let e = n[u];
                                const r = new Set(Object.keys(t).concat(Object.keys(e)));
                                return (0, o.A6)(r).reduce(((n, r) => (void 0 === e[r] ? n[r] = t[r] : void 0 === t[r] ? n[r] = e[r] : (0, s.Qd)(e[r]) ? n[r] = (0, s.D9)({}, t[r], e[r]) : n[r] = e[r], n)), {})
                            }
                            return Object.assign({}, t)
                        }
                        const [h, v] = [b, function() {
                            const e = b();
                            return Object.defineProperty(e, "ortb2", {
                                get: function() {
                                    throw new Error("invalid access to 'orbt2' config - use request parameters instead")
                                }
                            }), e
                        }].map((e => function() {
                            if (arguments.length <= 1 && "function" != typeof(arguments.length <= 0 ? void 0 : arguments[0])) {
                                const t = arguments.length <= 0 ? void 0 : arguments[0];
                                return t ? (0, a.A)(e(), t) : b()
                            }
                            return function(e, t) {
                                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                    r = t;
                                if ("string" != typeof e && (r = e, e = "*", n = t || {}), "function" != typeof r) return void(0, s.vV)("listener must be a function");
                                const i = {
                                    topic: e,
                                    callback: r
                                };
                                return d.push(i), n.init && r("*" === e ? v() : {
                                        [e]: v(e)
                                    }),
                                    function() {
                                        d.splice(d.indexOf(i), 1)
                                    }
                            }(...arguments)
                        })), [y, _] = [v, h].map((e => function() {
                            let t = e(...arguments);
                            return t && "object" == typeof t && (t = (0, s.Go)(t)), t
                        }));

                        function I(n) {
                            if (!(0, s.Qd)(n)) return void(0, s.vV)("setConfig options must be an object");
                            let r = Object.keys(n),
                                i = {};
                            r.forEach((r => {
                                let o = n[r];
                                (0, s.Qd)(e[r]) && (0, s.Qd)(o) && (o = Object.assign({}, e[r], o));
                                try {
                                    i[r] = t[r] = o
                                } catch (e) {
                                    (0, s.JE)(`Cannot set config for property ${r} : `, e)
                                }
                            })), E(i)
                        }

                        function E(e) {
                            const t = Object.keys(e);
                            d.filter((e => (0, o.mK)(t, e.topic))).forEach((t => {
                                t.callback({
                                    [t.topic]: e[t.topic]
                                })
                            })), d.filter((e => "*" === e.topic)).forEach((t => t.callback(e)))
                        }

                        function A(e) {
                            let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            try {
                                ! function(e) {
                                    if (!(0, s.Qd)(e)) throw "setBidderConfig bidder options must be an object";
                                    if (!Array.isArray(e.bidders) || !e.bidders.length) throw "setBidderConfig bidder options must contain a bidders list with at least 1 bidder";
                                    if (!(0, s.Qd)(e.config)) throw "setBidderConfig bidder options must contain a config object"
                                }(e), e.bidders.forEach((r => {
                                    n[r] || (n[r] = {}), Object.keys(e.config).forEach((i => {
                                        let o = e.config[i];
                                        if ((0, s.Qd)(o)) {
                                            const e = t ? s.D9 : Object.assign;
                                            n[r][i] = e({}, n[r][i] || {}, o)
                                        } else n[r][i] = o
                                    }))
                                }))
                            } catch (e) {
                                (0, s.vV)(e)
                            }
                        }

                        function O(e, t) {
                            u = e;
                            try {
                                return t()
                            } finally {
                                w()
                            }
                        }

                        function w() {
                            u = null
                        }
                        return g(), {
                            getCurrentBidder: function() {
                                return u
                            },
                            resetBidder: w,
                            getConfig: v,
                            getAnyConfig: h,
                            readConfig: y,
                            readAnyConfig: _,
                            setConfig: I,
                            mergeConfig: function(e) {
                                if (!(0, s.Qd)(e)) return void(0, s.vV)("mergeConfig input must be an object");
                                const t = (0, s.D9)(b(), e);
                                return I(function(e) {
                                    for (var t = 1; t < arguments.length; t++) {
                                        var n = null != arguments[t] ? arguments[t] : {};
                                        t % 2 ? c(Object(n), !0).forEach((function(t) {
                                            (0, r.A)(e, t, n[t])
                                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach((function(t) {
                                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                                        }))
                                    }
                                    return e
                                }({}, t)), t
                            },
                            setDefaults: function(n) {
                                (0, s.Qd)(e) ? (Object.assign(e, n), Object.assign(t, n)) : (0, s.vV)("defaults must be an object")
                            },
                            resetConfig: g,
                            runWithBidder: O,
                            callbackWithBidder: function(e) {
                                return function(t) {
                                    return function() {
                                        if ("function" == typeof t) {
                                            for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                                            return O(e, t.bind(this, ...r))
                                        }(0, s.JE)("config.callbackWithBidder callback is not a function")
                                    }
                                }
                            },
                            setBidderConfig: A,
                            getBidderConfig: function() {
                                return n
                            },
                            mergeBidderConfig: function(e) {
                                return A(e, !0)
                            }
                        }
                    }()
            },
            586: (e, t, n) => {
                "use strict";
                n.d(t, {
                    B1: () => p,
                    SL: () => S,
                    ZH: () => f,
                    ad: () => w,
                    et: () => x,
                    mW: () => A,
                    o2: () => T,
                    t6: () => O
                });
                var r = n(504),
                    i = n(686),
                    o = n(469),
                    s = n(718);

                function a(e, t, n) {
                    d(e, t), t.set(e, n)
                }

                function d(e, t) {
                    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                }

                function c(e, t) {
                    return e.get(u(e, t))
                }

                function l(e, t, n) {
                    return e.set(u(e, t), n), n
                }

                function u(e, t, n) {
                    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
                    throw new TypeError("Private element is not present on this object")
                }
                const p = Object.freeze({}),
                    f = Object.freeze({});
                var m = new WeakMap,
                    g = new WeakMap,
                    b = new WeakMap,
                    h = new WeakMap,
                    v = new WeakMap,
                    y = new WeakMap,
                    _ = new WeakSet;
                class I {
                    constructor() {
                        var e;
                        d(this, e = _), e.add(this), a(this, m, void 0), a(this, g, void 0), a(this, b, void 0), a(this, h, void 0), a(this, v, !0), a(this, y, void 0), (0, r.A)(this, "generatedTime", void 0), (0, r.A)(this, "hashFields", void 0), this.reset()
                    }
                    reset() {
                        l(b, this, (0, o.v)()), l(m, this, !1), l(g, this, null), l(h, this, !1), this.generatedTime = null
                    }
                    enable() {
                        l(m, this, !0)
                    }
                    get enabled() {
                        return c(m, this)
                    }
                    get ready() {
                        return c(h, this)
                    }
                    get promise() {
                        return c(h, this) ? o.k.resolve(c(g, this)) : (c(m, this) || u(_, this, E).call(this, null), c(b, this).promise)
                    }
                    setConsentData(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : (0, i.vE)();
                        this.generatedTime = t, l(v, this, !0), u(_, this, E).call(this, e)
                    }
                    getConsentData() {
                        return c(g, this)
                    }
                    get hash() {
                        return c(v, this) && (l(y, this, (0, i.PB)(JSON.stringify(c(g, this) && this.hashFields ? this.hashFields.map((e => c(g, this)[e])) : c(g, this)))), l(v, this, !1)), c(y, this)
                    }
                }

                function E(e) {
                    l(h, this, !0), l(g, this, e), c(b, this).resolve(e)
                }
                const A = new class extends I {
                        constructor() {
                            super(...arguments), (0, r.A)(this, "hashFields", ["gdprApplies", "consentString"])
                        }
                        getConsentMeta() {
                            const e = this.getConsentData();
                            if (e && e.vendorData && this.generatedTime) return {
                                gdprApplies: e.gdprApplies,
                                consentStringSize: (0, i.O8)(e.vendorData.tcString) ? e.vendorData.tcString.length : 0,
                                generatedAt: this.generatedTime,
                                apiVersion: e.apiVersion
                            }
                        }
                    },
                    O = new class extends I {
                        getConsentMeta() {
                            const e = this.getConsentData();
                            if (e && this.generatedTime) return {
                                usp: e,
                                generatedAt: this.generatedTime
                            }
                        }
                    },
                    w = new class extends I {
                        constructor() {
                            super(...arguments), (0, r.A)(this, "hashFields", ["applicableSections", "gppString"])
                        }
                        getConsentMeta() {
                            if (this.getConsentData() && this.generatedTime) return {
                                generatedAt: this.generatedTime
                            }
                        }
                    },
                    x = (() => {
                        function e() {
                            return !!s.$W.getConfig("coppa")
                        }
                        return {
                            getCoppa: e,
                            getConsentData: e,
                            getConsentMeta: e,
                            reset() {},
                            get promise() {
                                return o.k.resolve(e())
                            },
                            get hash() {
                                return e() ? "1" : "0"
                            }
                        }
                    })(),
                    T = function() {
                        const e = {},
                            t = {},
                            n = {};
                        return {
                            register(r, i, o) {
                                o && ((e[i] = e[i] || {})[r] = o, t.hasOwnProperty(i) ? t[i] !== o && (t[i] = n) : t[i] = o)
                            },
                            get(r) {
                                const i = {
                                    modules: e[r] || {}
                                };
                                return t.hasOwnProperty(r) && t[r] !== n && (i.gvlid = t[r]), i
                            }
                        }
                    }(),
                    C = {
                        gdpr: A,
                        usp: O,
                        gpp: w,
                        coppa: x
                    },
                    S = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : C;
                        return e = Object.entries(e), Object.assign({
                            get promise() {
                                return o.k.all(e.map((e => {
                                    let [t, n] = e;
                                    return n.promise.then((e => [t, e]))
                                }))).then((e => Object.fromEntries(e)))
                            },
                            get hash() {
                                return (0, i.PB)(e.map((e => {
                                    let [t, n] = e;
                                    return n.hash
                                })).join(":"))
                            }
                        }, Object.fromEntries(["getConsentData", "getConsentMeta", "reset"].map((t => {
                            return [t, (n = t, function() {
                                return Object.fromEntries(e.map((e => {
                                    let [t, r] = e;
                                    return [t, r[n]()]
                                })))
                            })];
                            var n
                        }))))
                    }()
            },
            743: (e, t, n) => {
                "use strict";
                n.d(t, {
                    M: () => i,
                    RW: () => f,
                    Tf: () => g,
                    UE: () => c,
                    XQ: () => o,
                    Zh: () => u,
                    _B: () => y,
                    as: () => a,
                    cA: () => d,
                    h0: () => b,
                    iD: () => r,
                    jO: () => h,
                    nl: () => _,
                    oA: () => v,
                    qY: () => s,
                    tl: () => m,
                    x5: () => p,
                    xS: () => l
                });
                const r = {
                        PL_CODE: "code",
                        PL_SIZE: "sizes",
                        PL_BIDS: "bids",
                        BD_BIDDER: "bidder",
                        BD_ID: "paramsd",
                        BD_PL_ID: "placementId",
                        ADSERVER_TARGETING: "adserverTargeting",
                        BD_SETTING_STANDARD: "standard"
                    },
                    i = "pbjs_debug",
                    o = {
                        GOOD: 1
                    },
                    s = {
                        AUCTION_INIT: "auctionInit",
                        AUCTION_TIMEOUT: "auctionTimeout",
                        AUCTION_END: "auctionEnd",
                        BID_ADJUSTMENT: "bidAdjustment",
                        BID_TIMEOUT: "bidTimeout",
                        BID_REQUESTED: "bidRequested",
                        BID_RESPONSE: "bidResponse",
                        BID_REJECTED: "bidRejected",
                        NO_BID: "noBid",
                        SEAT_NON_BID: "seatNonBid",
                        BID_WON: "bidWon",
                        BIDDER_DONE: "bidderDone",
                        BIDDER_ERROR: "bidderError",
                        SET_TARGETING: "setTargeting",
                        BEFORE_REQUEST_BIDS: "beforeRequestBids",
                        BEFORE_BIDDER_HTTP: "beforeBidderHttp",
                        REQUEST_BIDS: "requestBids",
                        ADD_AD_UNITS: "addAdUnits",
                        AD_RENDER_FAILED: "adRenderFailed",
                        AD_RENDER_SUCCEEDED: "adRenderSucceeded",
                        TCF2_ENFORCEMENT: "tcf2Enforcement",
                        AUCTION_DEBUG: "auctionDebug",
                        BID_VIEWABLE: "bidViewable",
                        STALE_RENDER: "staleRender",
                        BILLABLE_EVENT: "billableEvent",
                        BID_ACCEPTED: "bidAccepted"
                    },
                    a = {
                        PREVENT_WRITING_ON_MAIN_DOCUMENT: "preventWritingOnMainDocument",
                        NO_AD: "noAd",
                        EXCEPTION: "exception",
                        CANNOT_FIND_AD: "cannotFindAd",
                        MISSING_DOC_OR_ADID: "missingDocOrAdid"
                    },
                    d = {
                        bidWon: "adUnitCode"
                    },
                    c = {
                        LOW: "low",
                        MEDIUM: "medium",
                        HIGH: "high",
                        AUTO: "auto",
                        DENSE: "dense",
                        CUSTOM: "custom"
                    },
                    l = {
                        BIDDER: "hb_bidder",
                        AD_ID: "hb_adid",
                        PRICE_BUCKET: "hb_pb",
                        SIZE: "hb_size",
                        DEAL: "hb_deal",
                        SOURCE: "hb_source",
                        FORMAT: "hb_format",
                        UUID: "hb_uuid",
                        CACHE_ID: "hb_cache_id",
                        CACHE_HOST: "hb_cache_host",
                        ADOMAIN: "hb_adomain",
                        ACAT: "hb_acat",
                        CRID: "hb_crid",
                        DSP: "hb_dsp"
                    },
                    u = {
                        BIDDER: "hb_bidder",
                        AD_ID: "hb_adid",
                        PRICE_BUCKET: "hb_pb",
                        SIZE: "hb_size",
                        DEAL: "hb_deal",
                        FORMAT: "hb_format",
                        UUID: "hb_uuid",
                        CACHE_HOST: "hb_cache_host"
                    },
                    p = {
                        title: "hb_native_title",
                        body: "hb_native_body",
                        body2: "hb_native_body2",
                        privacyLink: "hb_native_privacy",
                        privacyIcon: "hb_native_privicon",
                        sponsoredBy: "hb_native_brand",
                        image: "hb_native_image",
                        icon: "hb_native_icon",
                        clickUrl: "hb_native_linkurl",
                        displayUrl: "hb_native_displayurl",
                        cta: "hb_native_cta",
                        rating: "hb_native_rating",
                        address: "hb_native_address",
                        downloads: "hb_native_downloads",
                        likes: "hb_native_likes",
                        phone: "hb_native_phone",
                        price: "hb_native_price",
                        salePrice: "hb_native_saleprice",
                        rendererUrl: "hb_renderer_url",
                        adTemplate: "hb_adTemplate"
                    },
                    f = {
                        SRC: "s2s",
                        DEFAULT_ENDPOINT: "https://prebid.adnxs.com/pbs/v1/openrtb2/auction",
                        SYNCED_BIDDERS_KEY: "pbjsSyncs"
                    },
                    m = {
                        BID_TARGETING_SET: "targetingSet",
                        RENDERED: "rendered",
                        BID_REJECTED: "bidRejected"
                    },
                    g = {
                        INVALID: "Bid has missing or invalid properties",
                        INVALID_REQUEST_ID: "Invalid request ID",
                        BIDDER_DISALLOWED: "Bidder code is not allowed by allowedAlternateBidderCodes / allowUnknownBidderCodes",
                        FLOOR_NOT_MET: "Bid does not meet price floor",
                        CANNOT_CONVERT_CURRENCY: "Unable to convert currency",
                        DSA_REQUIRED: "Bid does not provide required DSA transparency info",
                        DSA_MISMATCH: "Bid indicates inappropriate DSA rendering method",
                        PRICE_TOO_HIGH: "Bid price exceeds maximum value"
                    },
                    b = {
                        body: "desc",
                        body2: "desc2",
                        sponsoredBy: "sponsored",
                        cta: "ctatext",
                        rating: "rating",
                        address: "address",
                        downloads: "downloads",
                        likes: "likes",
                        phone: "phone",
                        price: "price",
                        salePrice: "saleprice",
                        displayUrl: "displayurl"
                    },
                    h = {
                        sponsored: 1,
                        desc: 2,
                        rating: 3,
                        likes: 4,
                        downloads: 5,
                        price: 6,
                        saleprice: 7,
                        phone: 8,
                        address: 9,
                        desc2: 10,
                        displayurl: 11,
                        ctatext: 12
                    },
                    v = {
                        ICON: 1,
                        MAIN: 3
                    },
                    y = ["privacyIcon", "clickUrl", "sendTargetingKeys", "adTemplate", "rendererUrl", "type"],
                    _ = {
                        REQUEST: "Prebid Request",
                        RESPONSE: "Prebid Response",
                        NATIVE: "Prebid Native",
                        EVENT: "Prebid Event"
                    }
            },
            127: (e, t, n) => {
                "use strict";
                n.d(t, {
                    j: () => p,
                    q: () => m
                });
                var r = n(455),
                    i = n(686),
                    o = n(718);
                const s = 2,
                    a = {
                        buckets: [{
                            max: 5,
                            increment: .5
                        }]
                    },
                    d = {
                        buckets: [{
                            max: 20,
                            increment: .1
                        }]
                    },
                    c = {
                        buckets: [{
                            max: 20,
                            increment: .01
                        }]
                    },
                    l = {
                        buckets: [{
                            max: 3,
                            increment: .01
                        }, {
                            max: 8,
                            increment: .05
                        }, {
                            max: 20,
                            increment: .5
                        }]
                    },
                    u = {
                        buckets: [{
                            max: 5,
                            increment: .05
                        }, {
                            max: 10,
                            increment: .1
                        }, {
                            max: 20,
                            increment: .5
                        }]
                    };

                function p(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                        r = parseFloat(e);
                    return isNaN(r) && (r = ""), {
                        low: "" === r ? "" : f(e, a, n),
                        med: "" === r ? "" : f(e, d, n),
                        high: "" === r ? "" : f(e, c, n),
                        auto: "" === r ? "" : f(e, u, n),
                        dense: "" === r ? "" : f(e, l, n),
                        custom: "" === r ? "" : f(e, t, n)
                    }
                }

                function f(e, t, n) {
                    let a = "";
                    if (!m(t)) return a;
                    const d = t.buckets.reduce(((e, t) => e.max > t.max ? e : t), {
                        max: 0
                    });
                    let c = 0,
                        l = (0, r.I6)(t.buckets, (t => {
                            if (e > d.max * n) {
                                let e = t.precision;
                                void 0 === e && (e = s), a = (t.max * n).toFixed(e)
                            } else {
                                if (e <= t.max * n && e >= c * n) return t.min = c, t;
                                c = t.max
                            }
                        }));
                    return l && (a = function(e, t, n) {
                        const r = void 0 !== t.precision ? t.precision : s,
                            a = t.increment * n,
                            d = t.min * n;
                        let c = Math.floor,
                            l = o.$W.getConfig("cpmRoundingFunction");
                        "function" == typeof l && (c = l);
                        let u, p, f = Math.pow(10, r + 2),
                            m = (e * f - d * f) / (a * f);
                        try {
                            u = c(m) * a + d
                        } catch (e) {
                            p = !0
                        }
                        return (p || "number" != typeof u) && ((0, i.JE)("Invalid rounding function passed in config"), u = Math.floor(m) * a + d), u = Number(u.toFixed(10)), u.toFixed(r)
                    }(e, l, n)), a
                }

                function m(e) {
                    if ((0, i.Im)(e) || !e.buckets || !Array.isArray(e.buckets)) return !1;
                    let t = !0;
                    return e.buckets.forEach((e => {
                        e.max && e.increment || (t = !1)
                    })), t
                }
            },
            922: (e, t, n) => {
                "use strict";
                n.d(t, {
                    H: () => s,
                    k: () => o
                });
                var r = n(469),
                    i = n(686);
                const o = (0, n(439).A_)("sync", (function(e) {
                        return '!function(){"use strict";window.render=function({ad:d,adUrl:i,width:n,height:e},{mkFrame:o},r){if(!d&&!i)throw{reason:"noAd",message:"Missing ad markup or URL"};{const t=r.document,s={width:n,height:e};i&&!d?s.src=i:s.srcdoc=d,t.body.appendChild(o(t,s))}}}();'
                    })),
                    s = function() {
                        const e = {};
                        return function(t) {
                            const n = o(t);
                            return e.hasOwnProperty(n) || (e[n] = new r.k((e => {
                                const t = (0, i.CA)();
                                t.srcdoc = `<script>${n}<\/script>`, t.onload = () => e(t.contentWindow.render), document.body.appendChild(t)
                            }))), e[n]
                        }
                    }()
            },
            13: (e, t, n) => {
                "use strict";
                n.d(t, {
                    AU: () => b,
                    Ic: () => y,
                    kQ: () => v,
                    on: () => g
                });
                var r = n(686),
                    i = n(743),
                    o = n(280),
                    s = n(718);
                const a = "eventHistoryTTL";
                let d = null;
                const c = (0, o.H)({
                    monotonic: !0,
                    ttl: () => d
                });
                s.$W.getConfig(a, (e => {
                    var t;
                    const n = d;
                    e = null === (t = e) || void 0 === t ? void 0 : t[a], d = "number" == typeof e ? 1e3 * e : null, n !== d && c.refresh()
                }));
                let l = Array.prototype.slice,
                    u = Array.prototype.push,
                    p = Object.values(i.qY);
                const f = i.cA,
                    m = function() {
                        let e = {},
                            t = {};

                        function n(e) {
                            return p.includes(e)
                        }
                        return t.has = n, t.on = function(t, i, o) {
                            if (n(t)) {
                                let n = e[t] || {
                                    que: []
                                };
                                o ? (n[o] = n[o] || {
                                    que: []
                                }, n[o].que.push(i)) : n.que.push(i), e[t] = n
                            } else r.vV("Wrong event name : " + t + " Valid event names :" + p)
                        }, t.emit = function(t) {
                            ! function(t, n) {
                                r.OG("Emitting event for: " + t);
                                let i = n[0] || {},
                                    o = i[f[t]],
                                    s = e[t] || {
                                        que: []
                                    };
                                var a = Object.keys(s);
                                let d = [];
                                c.add({
                                    eventType: t,
                                    args: i,
                                    id: o,
                                    elapsedTime: r.V()
                                }), o && a.includes(o) && u.apply(d, s[o].que), u.apply(d, s.que), (d || []).forEach((function(e) {
                                    if (e) try {
                                        e.apply(null, n)
                                    } catch (e) {
                                        r.vV("Error executing handler:", "events.js", e, t)
                                    }
                                }))
                            }(t, l.call(arguments, 1))
                        }, t.off = function(t, n, i) {
                            let o = e[t];
                            r.Im(o) || r.Im(o.que) && r.Im(o[i]) || i && (r.Im(o[i]) || r.Im(o[i].que)) || (i ? (o[i].que || []).forEach((function(e) {
                                let t = o[i].que;
                                e === n && t.splice(t.indexOf(e), 1)
                            })) : (o.que || []).forEach((function(e) {
                                let t = o.que;
                                e === n && t.splice(t.indexOf(e), 1)
                            })), e[t] = o)
                        }, t.get = function() {
                            return e
                        }, t.addEvents = function(e) {
                            p = p.concat(e)
                        }, t.getEvents = function() {
                            return c.toArray().map((e => Object.assign({}, e)))
                        }, t
                    }();
                r.cD(m.emit.bind(m));
                const {
                    on: g,
                    off: b,
                    get: h,
                    getEvents: v,
                    emit: y,
                    addEvents: _,
                    has: I
                } = m
            },
            439: (e, t, n) => {
                "use strict";
                n.d(t, {
                    A_: () => s,
                    Gc: () => d,
                    Y6: () => f,
                    Yn: () => c,
                    bz: () => p,
                    xG: () => u
                });
                var r = n(505),
                    i = n.n(r),
                    o = n(469);
                let s = i()({
                    ready: i().SYNC | i().ASYNC | i().QUEUE
                });
                const a = (0, o.v)();
                s.ready = (() => {
                    const e = s.ready;
                    return function() {
                        try {
                            return e.apply(s, arguments)
                        } finally {
                            a.resolve()
                        }
                    }
                })();
                const d = a.promise,
                    c = s.get,
                    l = {};

                function u(e, t) {
                    let {
                        postInstallAllowed: n = !1
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    s("async", (function(r) {
                        r.forEach((e => t(...e))), n && (l[e] = t)
                    }), e)([])
                }

                function p(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    const i = l[e];
                    if (i) return i(...n);
                    c(e).before(((e, t) => {
                        t.push(n), e(t)
                    }))
                }

                function f(e, t) {
                    return Object.defineProperties(t, Object.fromEntries(["before", "after", "getHooks", "removeAll"].map((t => [t, {
                        get: () => e[t]
                    }])))), t
                }
            },
            233: (e, t, n) => {
                "use strict";
                n.d(t, {
                    D4: () => o,
                    G_: () => i,
                    LM: () => s,
                    s6: () => r
                });
                const r = "native",
                    i = "video",
                    o = "banner",
                    s = "adpod"
            },
            787: (e, t, n) => {
                "use strict";
                n.d(t, {
                    Bm: () => w,
                    IX: () => R,
                    Nh: () => g,
                    Xj: () => $,
                    Zj: () => C,
                    gs: () => T,
                    l6: () => I,
                    mT: () => m,
                    nk: () => A,
                    vO: () => x,
                    yl: () => j
                });
                var r = n(504),
                    i = n(384),
                    o = n(686),
                    s = n(455),
                    a = n(428),
                    d = n(743),
                    c = n(233),
                    l = n(885),
                    u = n(922);

                function p(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t && (r = r.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), n.push.apply(n, r)
                    }
                    return n
                }

                function f(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? p(Object(n), !0).forEach((function(t) {
                            (0, r.A)(e, t, n[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }))
                    }
                    return e
                }
                const m = [],
                    g = Object.keys(d.x5).map((e => d.x5[e])),
                    b = {
                        image: {
                            ortb: {
                                ver: "1.2",
                                assets: [{
                                    required: 1,
                                    id: 1,
                                    img: {
                                        type: 3,
                                        wmin: 100,
                                        hmin: 100
                                    }
                                }, {
                                    required: 1,
                                    id: 2,
                                    title: {
                                        len: 140
                                    }
                                }, {
                                    required: 1,
                                    id: 3,
                                    data: {
                                        type: 1
                                    }
                                }, {
                                    required: 0,
                                    id: 4,
                                    data: {
                                        type: 2
                                    }
                                }, {
                                    required: 0,
                                    id: 5,
                                    img: {
                                        type: 1,
                                        wmin: 20,
                                        hmin: 20
                                    }
                                }]
                            },
                            image: {
                                required: !0
                            },
                            title: {
                                required: !0
                            },
                            sponsoredBy: {
                                required: !0
                            },
                            clickUrl: {
                                required: !0
                            },
                            body: {
                                required: !1
                            },
                            icon: {
                                required: !1
                            }
                        }
                    },
                    h = M(d.h0),
                    v = M(d.jO),
                    y = {
                        img: 1,
                        js: 2,
                        1: "img",
                        2: "js"
                    },
                    _ = {
                        impression: 1,
                        "viewable-mrc50": 2,
                        "viewable-mrc100": 3,
                        "viewable-video50": 4
                    };

                function I(e) {
                    return e.native && "object" == typeof e.native
                }

                function E(e) {
                    if (e && e.type && (!(!(t = e.type) || !(0, s.mK)(Object.keys(b), t)) || ((0, o.vV)(`${t} nativeParam is not supported`), !1)) && (e = b[e.type]), !e || !e.ortb || O(e.ortb)) return e;
                    var t
                }

                function A(e) {
                    e.forEach((e => {
                        const t = e.nativeParams || (0, i.A)(e, "mediaTypes.native");
                        t && (e.nativeParams = E(t)), e.nativeParams && (e.nativeOrtbRequest = e.nativeParams.ortb || function(e) {
                            if (!e && !(0, o.Qd)(e)) return void(0, o.vV)("Native assets object is empty or not an object: ", e);
                            const t = {
                                ver: "1.2",
                                assets: []
                            };
                            for (let n in e) {
                                if (d._B.includes(n)) continue;
                                if (!d.x5.hasOwnProperty(n)) {
                                    (0, o.vV)(`Unrecognized native asset code: ${n}. Asset will be ignored.`);
                                    continue
                                }
                                if ("privacyLink" === n) {
                                    t.privacy = 1;
                                    continue
                                }
                                const r = e[n];
                                let i = 0;
                                r.required && (0, o.Lm)(r.required) && (i = Number(r.required));
                                const s = {
                                    id: t.assets.length,
                                    required: i
                                };
                                if (n in d.h0) s.data = {
                                    type: d.jO[d.h0[n]]
                                }, r.len && (s.data.len = r.len);
                                else if ("icon" === n || "image" === n) {
                                    if (s.img = {
                                            type: "icon" === n ? d.oA.ICON : d.oA.MAIN
                                        }, r.aspect_ratios)
                                        if ((0, o.cy)(r.aspect_ratios))
                                            if (r.aspect_ratios.length) {
                                                const {
                                                    min_width: e,
                                                    min_height: t
                                                } = r.aspect_ratios[0];
                                                (0, o.Fq)(e) && (0, o.Fq)(t) ? (s.img.wmin = e, s.img.hmin = t) : (0, o.vV)("image.aspect_ratios min_width or min_height are invalid: ", e, t);
                                                const n = r.aspect_ratios.filter((e => e.ratio_width && e.ratio_height)).map((e => `${e.ratio_width}:${e.ratio_height}`));
                                                n.length > 0 && (s.img.ext = {
                                                    aspectratios: n
                                                })
                                            } else(0, o.vV)("image.aspect_ratios was passed, but it's empty:", r.aspect_ratios);
                                    else(0, o.vV)("image.aspect_ratios was passed, but it's not a an array:", r.aspect_ratios);
                                    r.sizes && (2 === r.sizes.length && (0, o.Fq)(r.sizes[0]) && (0, o.Fq)(r.sizes[1]) ? (s.img.w = r.sizes[0], s.img.h = r.sizes[1], delete s.img.hmin, delete s.img.wmin) : (0, o.vV)("image.sizes was passed, but its value is not an array of integers:", r.sizes))
                                } else "title" === n ? s.title = {
                                    len: r.len || 140
                                } : "ext" === n && (s.ext = r, delete s.required);
                                t.assets.push(s)
                            }
                            return t
                        }(e.nativeParams))
                    }))
                }

                function O(e) {
                    const t = e.assets;
                    if (!Array.isArray(t) || 0 === t.length) return (0, o.vV)("assets in mediaTypes.native.ortb is not an array, or it's empty. Assets: ", t), !1;
                    const n = t.map((e => e.id));
                    return t.length !== new Set(n).size || n.some((e => e !== parseInt(e, 10))) ? ((0, o.vV)("each asset object must have 'id' property, it must be unique and it must be an integer"), !1) : e.hasOwnProperty("eventtrackers") && !Array.isArray(e.eventtrackers) ? ((0, o.vV)("ortb.eventtrackers is not an array. Eventtrackers: ", e.eventtrackers), !1) : t.every((e => function(e) {
                        if (!(0, o.Qd)(e)) return (0, o.vV)("asset must be an object. Provided asset: ", e), !1;
                        if (e.img) {
                            if (!(0, o.Et)(e.img.w) && !(0, o.Et)(e.img.wmin)) return (0, o.vV)("for img asset there must be 'w' or 'wmin' property"), !1;
                            if (!(0, o.Et)(e.img.h) && !(0, o.Et)(e.img.hmin)) return (0, o.vV)("for img asset there must be 'h' or 'hmin' property"), !1
                        } else if (e.title) {
                            if (!(0, o.Et)(e.title.len)) return (0, o.vV)("for title asset there must be 'len' property defined"), !1
                        } else if (e.data) {
                            if (!(0, o.Et)(e.data.type)) return (0, o.vV)("for data asset 'type' property must be a number"), !1
                        } else if (e.video && !(Array.isArray(e.video.mimes) && Array.isArray(e.video.protocols) && (0, o.Et)(e.video.minduration) && (0, o.Et)(e.video.maxduration))) return (0, o.vV)("video asset is not properly configured"), !1;
                        return !0
                    }(e)))
                }

                function w(e) {
                    var t;
                    let {
                        index: n = a.n.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const r = n.getAdUnit(e);
                    if (!r) return !1;
                    let d = r.nativeOrtbRequest;
                    return function(e, t) {
                        if (!(0, i.A)(e, "link.url")) return (0, o.vV)("native response doesn't have 'link' property. Ortb response: ", e), !1;
                        let n = t.assets.filter((e => 1 === e.required)).map((e => e.id)),
                            r = e.assets.map((e => e.id));
                        const a = n.every((e => (0, s.mK)(r, e)));
                        return a || (0, o.vV)(`didn't receive a bid with all required assets. Required ids: ${n}, but received ids in response: ${r}`), a
                    }((null === (t = e.native) || void 0 === t ? void 0 : t.ortb) || N(e.native, d), d)
                }

                function x(e, t) {
                    const n = t.native.ortb || q(t.native);
                    return "click" === e.action ? function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                            {
                                fetchURL: n = o.z$
                            } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if (t) {
                            var r;
                            const i = (e.assets || []).filter((e => e.link)).reduce(((e, t) => (e[t.id] = t.link, e)), {}),
                                o = (null === (r = e.link) || void 0 === r ? void 0 : r.clicktrackers) || [];
                            let s = i[t],
                                a = o;
                            s && (a = s.clicktrackers || []), a.forEach((e => n(e)))
                        } else {
                            var i;
                            ((null === (i = e.link) || void 0 === i ? void 0 : i.clicktrackers) || []).forEach((e => n(e)))
                        }
                    }(n, null == e ? void 0 : e.assetId) : function(e) {
                        let {
                            runMarkup: t = (e => (0, o.ro)(e)),
                            fetchURL: n = o.z$
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const r = (e.eventtrackers || []).filter((e => e.event === _.impression));
                        let {
                            img: i,
                            js: s
                        } = r.reduce(((e, t) => (y.hasOwnProperty(t.method) && e[y[t.method]].push(t.url), e)), {
                            img: [],
                            js: []
                        });
                        e.imptrackers && (i = i.concat(e.imptrackers)), i.forEach((e => n(e))), s = s.map((e => `<script async src="${e}"><\/script>`)), e.jstracker && (s = s.concat([e.jstracker])), s.length && t(s.join("\n"))
                    }(n), e.action
                }

                function T(e, t) {
                    var n;
                    const r = null == t ? void 0 : t.nativeOrtbRequest,
                        i = null === (n = e.native) || void 0 === n ? void 0 : n.ortb;
                    if (r && i) {
                        const t = function(e, t) {
                            const n = {},
                                r = (null == t ? void 0 : t.assets) || [];
                            n.clickUrl = e.link.url, n.privacyLink = e.privacy;
                            for (const t of (null == e ? void 0 : e.assets) || []) {
                                const e = r.find((e => t.id === e.id));
                                t.title ? n.title = t.title.text : t.img ? n[e.img.type === d.oA.MAIN ? "image" : "icon"] = {
                                    url: t.img.url,
                                    width: t.img.w,
                                    height: t.img.h
                                } : t.data && (n[h[v[e.data.type]]] = t.data.value)
                            }
                            n.impressionTrackers = [];
                            let i = [];
                            e.imptrackers && n.impressionTrackers.push(...e.imptrackers);
                            for (const t of (null == e ? void 0 : e.eventtrackers) || []) t.event === _.impression && t.method === y.img && n.impressionTrackers.push(t.url), t.event === _.impression && t.method === y.js && i.push(t.url);
                            return i = i.map((e => `<script async src="${e}"><\/script>`)), null != e && e.jstracker && i.push(e.jstracker), i.length && (n.javascriptTrackers = i.join("\n")), n
                        }(i, r);
                        Object.assign(e.native, t)
                    }["rendererUrl", "adTemplate"].forEach((n => {
                        var r;
                        const i = null == t || null === (r = t.nativeParams) || void 0 === r ? void 0 : r[n];
                        i && (e.native[n] = B(i))
                    }))
                }

                function C(e) {
                    let {
                        index: t = a.n.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = {};
                    const r = t.getAdUnit(e),
                        o = !1 !== (0, i.A)(r, "nativeParams.sendTargetingKeys"),
                        s = function(e) {
                            const t = {};
                            return (0, i.A)(e, "nativeParams.ext") && Object.keys(e.nativeParams.ext).forEach((e => {
                                t[e] = `hb_native_${e}`
                            })), f(f({}, d.x5), t)
                        }(r),
                        c = f(f({}, e.native), e.native.ext);
                    return delete c.ext, Object.keys(c).forEach((t => {
                        const a = s[t];
                        let d = B(e.native[t]) || B((0, i.A)(e, `native.ext.${t}`));
                        if ("adTemplate" === t || !a || !d) return;
                        let c = (0, i.A)(r, `nativeParams.${t}.sendId`);
                        "boolean" != typeof c && (c = (0, i.A)(r, `nativeParams.ext.${t}.sendId`)), c && (d = `${a}:${e.adId}`);
                        let l = (0, i.A)(r, `nativeParams.${t}.sendTargetingKeys`);
                        "boolean" != typeof l && (l = (0, i.A)(r, `nativeParams.ext.${t}.sendTargetingKeys`)), ("boolean" == typeof l ? l : o) && (n[a] = d)
                    })), n
                }

                function S(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        r = [];
                    return Object.entries(e).filter((e => {
                        let [r, i] = e;
                        return i && (!1 === n && "ext" === r || null == t || t.includes(r))
                    })).forEach((e => {
                        let [i, o] = e;
                        !1 === n && "ext" === i ? r.push(...S(o, t, !0)) : (n || d.x5.hasOwnProperty(i)) && r.push({
                            key: i,
                            value: B(o)
                        })
                    })), r
                }

                function k(e, t, n) {
                    let {
                        index: r = a.n.index
                    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    const i = {
                        message: "assetResponse",
                        adId: e.adId
                    };
                    let s = (0, l.vd)(t).native;
                    return s ? (i.native = Object.assign({}, s), i.renderer = (0, u.k)(t), null != n && (s.assets = s.assets.filter((e => {
                        let {
                            key: t
                        } = e;
                        return n.includes(t)
                    })))) : s = function(e, t, n) {
                        var r;
                        const i = f(f({}, (0, o.SH)(e.native, ["rendererUrl", "adTemplate"])), {}, {
                            assets: S(e.native, n),
                            nativeKeys: d.x5
                        });
                        return e.native.ortb ? i.ortb = e.native.ortb : null !== (r = t.mediaTypes) && void 0 !== r && null !== (r = r.native) && void 0 !== r && r.ortb && (i.ortb = N(e.native, t.nativeOrtbRequest)), i
                    }(t, r.getAdUnit(t), n), Object.assign(i, s)
                }
                const D = Object.fromEntries(Object.entries(d.x5).map((e => {
                    let [t, n] = e;
                    return [n, t]
                })));

                function R(e, t) {
                    const n = e.assets.map((e => D[e]));
                    return k(e, t, n)
                }

                function j(e, t) {
                    return k(e, t, null)
                }

                function B(e) {
                    return (null == e ? void 0 : e.url) || e
                }

                function P(e, t) {
                    for (; e && t && e !== t;) e > t ? e -= t : t -= e;
                    return e || t
                }

                function U(e) {
                    if (!O(e)) return;
                    const t = {};
                    for (const n of e.assets) {
                        if (n.title) {
                            const e = {
                                required: !!n.required && Boolean(n.required),
                                len: n.title.len
                            };
                            t.title = e
                        } else if (n.img) {
                            const e = {
                                required: !!n.required && Boolean(n.required)
                            };
                            if (n.img.w && n.img.h) e.sizes = [n.img.w, n.img.h];
                            else if (n.img.wmin && n.img.hmin) {
                                const t = P(n.img.wmin, n.img.hmin);
                                e.aspect_ratios = [{
                                    min_width: n.img.wmin,
                                    min_height: n.img.hmin,
                                    ratio_width: n.img.wmin / t,
                                    ratio_height: n.img.hmin / t
                                }]
                            }
                            n.img.type === d.oA.MAIN ? t.image = e : t.icon = e
                        } else if (n.data) {
                            let e = Object.keys(d.jO).find((e => d.jO[e] === n.data.type)),
                                r = Object.keys(d.h0).find((t => d.h0[t] === e));
                            t[r] = {
                                required: !!n.required && Boolean(n.required)
                            }, n.data.len && (t[r].len = n.data.len)
                        }
                        e.privacy && (t.privacyLink = {
                            required: !1
                        })
                    }
                    return t
                }

                function $(e) {
                    {
                        if (!e || !(0, o.cy)(e)) return e;
                        if (!e.some((e => {
                                var t;
                                return null === (t = ((null == e ? void 0 : e.mediaTypes) || {})[c.s6]) || void 0 === t ? void 0 : t.ortb
                            }))) return e;
                        let t = (0, o.Go)(e);
                        for (const e of t) e.mediaTypes && e.mediaTypes[c.s6] && e.mediaTypes[c.s6].ortb && (e.mediaTypes[c.s6] = Object.assign((0, o.Up)(e.mediaTypes[c.s6], d._B), U(e.mediaTypes[c.s6].ortb)), e.nativeParams = E(e.mediaTypes[c.s6]));
                        return t
                    }
                }

                function q(e) {
                    const t = {
                        link: {},
                        eventtrackers: []
                    };
                    return Object.entries(e).forEach((e => {
                        let [n, r] = e;
                        switch (n) {
                            case "clickUrl":
                                t.link.url = r;
                                break;
                            case "clickTrackers":
                                t.link.clicktrackers = Array.isArray(r) ? r : [r];
                                break;
                            case "impressionTrackers":
                                (Array.isArray(r) ? r : [r]).forEach((e => {
                                    t.eventtrackers.push({
                                        event: _.impression,
                                        method: y.img,
                                        url: e
                                    })
                                }));
                                break;
                            case "javascriptTrackers":
                                t.jstracker = Array.isArray(r) ? r.join("") : r;
                                break;
                            case "privacyLink":
                                t.privacy = r
                        }
                    })), t
                }

                function N(e, t) {
                    const n = f(f({}, q(e)), {}, {
                        assets: []
                    });

                    function r(e, r) {
                        let i = t.assets.find(e);
                        null != i && (i = (0, o.Go)(i), r(i), n.assets.push(i))
                    }
                    return Object.keys(e).filter((t => !!e[t])).forEach((t => {
                        const n = B(e[t]);
                        switch (t) {
                            case "title":
                                r((e => null != e.title), (e => {
                                    e.title = {
                                        text: n
                                    }
                                }));
                                break;
                            case "image":
                            case "icon":
                                const e = "image" === t ? d.oA.MAIN : d.oA.ICON;
                                r((t => null != t.img && t.img.type === e), (e => {
                                    e.img = {
                                        url: n
                                    }
                                }));
                                break;
                            default:
                                t in d.h0 && r((e => null != e.data && e.data.type === d.jO[d.h0[t]]), (e => {
                                    e.data = {
                                        value: n
                                    }
                                }))
                        }
                    })), n
                }

                function M(e) {
                    var t = {};
                    for (var n in e) t[e[n]] = n;
                    return t
                }
            },
            455: (e, t, n) => {
                "use strict";

                function r(e, t, n) {
                    return e && e.includes(t, n) || !1
                }

                function i() {
                    return Array.from.apply(Array, arguments)
                }

                function o(e, t, n) {
                    return e && e.find(t, n)
                }
                n.d(t, {
                    A6: () => i,
                    I6: () => o,
                    mK: () => r
                })
            },
            831: (e, t, n) => {
                "use strict";
                n.d(t, {
                    E: () => s,
                    m: () => o
                });
                const r = window,
                    i = r.pbjs = r.pbjs || {};

                function o() {
                    return i
                }

                function s(e) {
                    i.installedModules.push(e)
                }
                i.cmd = i.cmd || [], i.que = i.que || [], r === window && (r._pbjsGlobals = r._pbjsGlobals || [], r._pbjsGlobals.push("pbjs"))
            },
            556: (e, t, n) => {
                "use strict";
                n.d(t, {
                    EN: () => d,
                    gR: () => s
                });
                var r = n(718),
                    i = n(686);

                function o(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                    if (!e) return e;
                    if (/\w+:\/\//.exec(e)) return e;
                    let n = t.location.protocol;
                    try {
                        n = t.top.location.protocol
                    } catch (e) {}
                    return /^\/\//.exec(e) ? n + e : `${n}//${e}`
                }

                function s(e) {
                    let {
                        noLeadingWww: t = !1,
                        noPort: n = !1
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    try {
                        e = new URL(o(e))
                    } catch (e) {
                        return
                    }
                    return e = n ? e.hostname : e.host, t && e.startsWith("www.") && (e = e.substring(4)), e
                }

                function a(e) {
                    try {
                        const t = e.querySelector("link[rel='canonical']");
                        if (null !== t) return t.href
                    } catch (e) {}
                    return null
                }
                const d = function(e) {
                    let t, n, r, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                    return i.top !== i ? e : function() {
                        const o = a(i.document),
                            s = i.location.href;
                        return t === o && s === n || (t = o, n = s, r = e()), r
                    }
                }((c = window, function() {
                    const e = [],
                        t = function(e) {
                            try {
                                if (!e.location.ancestorOrigins) return;
                                return e.location.ancestorOrigins
                            } catch (e) {}
                        }(c),
                        n = r.$W.getConfig("maxNestedIframes");
                    let d, l, u, p, f = !1,
                        m = 0,
                        g = !1,
                        b = !1,
                        h = !1;
                    do {
                        const n = d,
                            r = b;
                        let o, s = !1,
                            p = null;
                        b = !1, d = d ? d.parent : c;
                        try {
                            o = d.location.href || null
                        } catch (e) {
                            s = !0
                        }
                        if (s)
                            if (r) {
                                const t = n.context;
                                try {
                                    p = t.sourceUrl, l = p, h = !0, g = !0, d === c.top && (f = !0), t.canonicalUrl && (u = t.canonicalUrl)
                                } catch (e) {}
                            } else {
                                (0, i.JE)("Trying to access cross domain iframe. Continuing without referrer and location");
                                try {
                                    const e = n.document.referrer;
                                    e && (p = e, d === c.top && (f = !0))
                                } catch (e) {}!p && t && t[m - 1] && (p = t[m - 1], d === c.top && (h = !0)), p && !g && (l = p)
                            }
                        else {
                            if (o && (p = o, l = p, g = !1, d === c.top)) {
                                f = !0;
                                const e = a(d.document);
                                e && (u = e)
                            }
                            d.context && d.context.sourceUrl && (b = !0)
                        }
                        e.push(p), m++
                    } while (d !== c.top && m < n);
                    e.reverse();
                    try {
                        p = c.top.document.referrer
                    } catch (e) {}
                    const v = f || h ? l : null,
                        y = r.$W.getConfig("pageUrl") || u || null;
                    let _ = r.$W.getConfig("pageUrl") || v || o(y, c);
                    return v && v.indexOf("?") > -1 && -1 === _.indexOf("?") && (_ = `${_}${v.substring(v.indexOf("?"))}`), {
                        reachedTop: f,
                        isAmp: g,
                        numIframes: m - 1,
                        stack: e,
                        topmostLocation: l || null,
                        location: v,
                        canonicalUrl: y,
                        page: _,
                        domain: s(_) || null,
                        ref: p || null,
                        legacy: {
                            reachedTop: f,
                            isAmp: g,
                            numIframes: m - 1,
                            stack: e,
                            referer: l || null,
                            canonicalUrl: y
                        }
                    }
                }));
                var c
            },
            128: (e, t, n) => {
                "use strict";
                n.d(t, {
                    CK: () => h,
                    X0: () => f,
                    qk: () => p,
                    s0: () => m,
                    vM: () => b
                });
                var r = n(686),
                    i = n(447),
                    o = n(883),
                    s = n(253),
                    a = n(642),
                    d = n(973),
                    c = n(718),
                    l = n(807),
                    u = n(575);
                const p = "html5",
                    f = "cookie";
                let m = [];

                function g() {
                    let {
                        moduleName: e,
                        moduleType: t
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, {
                        isAllowed: n = s.io
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};

                    function i(r, i) {
                        let s = e;
                        const p = c.$W.getCurrentBidder();
                        return p && t === o.tW && l.Ay.aliasRegistry[p] === e && (s = p), r({
                            valid: n(d.Ue, (0, u.s)(t, s, {
                                [a.Zw]: i
                            }))
                        })
                    }

                    function g(e, t, n) {
                        if (!n || "function" != typeof n) return i(e, t);
                        m.push((function() {
                            let r = i(e, t);
                            n(r)
                        }))
                    }
                    const b = function(e) {
                        return g((function(e) {
                            if (e && e.valid) try {
                                return !!window.localStorage
                            } catch (e) {
                                (0, r.vV)("Local storage api disabled")
                            }
                            return !1
                        }), p, e)
                    };
                    return {
                        setCookie: function(e, t, n, r, i, o) {
                            return g((function(o) {
                                if (o && o.valid) {
                                    const o = i && "" !== i ? ` ;domain=${encodeURIComponent(i)}` : "",
                                        s = n && "" !== n ? ` ;expires=${n}` : "",
                                        a = null != r && "none" == r.toLowerCase() ? "; Secure" : "";
                                    document.cookie = `${e}=${encodeURIComponent(t)}${s}; path=/${o}${r?`; SameSite=${r}`:""}${a}`
                                }
                            }), f, o)
                        },
                        getCookie: function(e, t) {
                            return g((function(t) {
                                if (t && t.valid) {
                                    let t = window.document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]*)\\s*(;|$)");
                                    return t ? decodeURIComponent(t[2]) : null
                                }
                                return null
                            }), f, t)
                        },
                        localStorageIsEnabled: function(e) {
                            return g((function(e) {
                                if (e && e.valid) try {
                                    return localStorage.setItem("prebid.cookieTest", "1"), "1" === localStorage.getItem("prebid.cookieTest")
                                } catch (e) {} finally {
                                    try {
                                        localStorage.removeItem("prebid.cookieTest")
                                    } catch (e) {}
                                }
                                return !1
                            }), p, e)
                        },
                        cookiesAreEnabled: function(e) {
                            return g((function(e) {
                                return !(!e || !e.valid) && (0, r.GE)()
                            }), f, e)
                        },
                        setDataInLocalStorage: function(e, t, n) {
                            return g((function(n) {
                                n && n.valid && b() && window.localStorage.setItem(e, t)
                            }), p, n)
                        },
                        getDataFromLocalStorage: function(e, t) {
                            return g((function(t) {
                                return t && t.valid && b() ? window.localStorage.getItem(e) : null
                            }), p, t)
                        },
                        removeDataFromLocalStorage: function(e, t) {
                            return g((function(t) {
                                t && t.valid && b() && window.localStorage.removeItem(e)
                            }), p, t)
                        },
                        hasLocalStorage: b,
                        findSimilarCookies: function(e, t) {
                            return g((function(t) {
                                if (t && t.valid) {
                                    const t = [];
                                    if ((0, r.N9)()) {
                                        const n = document.cookie.split(";");
                                        for (; n.length;) {
                                            const r = n.pop();
                                            let i = r.indexOf("=");
                                            i = i < 0 ? r.length : i, decodeURIComponent(r.slice(0, i).replace(/^\s+/, "")).indexOf(e) >= 0 && t.push(decodeURIComponent(r.slice(i + 1)))
                                        }
                                    }
                                    return t
                                }
                            }), f, t)
                        }
                    }
                }

                function b() {
                    let {
                        moduleType: e,
                        moduleName: t,
                        bidderCode: n
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

                    function r() {
                        throw new Error("Invalid invocation for getStorageManager: must set either bidderCode, or moduleType + moduleName")
                    }
                    return n ? ((e && e !== o.tW || t) && r(), e = o.tW, t = n) : t && e || r(), g({
                        moduleType: e,
                        moduleName: t
                    })
                }

                function h(e) {
                    return g({
                        moduleName: e,
                        moduleType: o.tp
                    })
                }(0, s.qB)(d.Ue, "deviceAccess config", (function() {
                    if (!(0, r.N9)()) return {
                        allow: !1
                    }
                })), (0, s.qB)(d.Ue, "bidderSettings.*.storageAllowed", (function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.u;
                    if (e[a.Dk] !== o.tW) return;
                    let n = t.get(e[a.q7], "storageAllowed");
                    if (n && !0 !== n) {
                        const t = e[a.Zw];
                        n = Array.isArray(n) ? n.some((e => e === t)) : n === t
                    } else n = !!n;
                    return n ? void 0 : {
                        allow: n
                    }
                }))
            },
            588: (e, t, n) => {
                "use strict";
                n.d(t, {
                    zt: () => f
                });
                var r = n(686),
                    i = n(718),
                    o = n(455),
                    s = n(128),
                    a = n(253),
                    d = n(973),
                    c = n(642),
                    l = n(883),
                    u = n(575);
                i.$W.setDefaults({
                    userSync: (0, r.Go)({
                        syncEnabled: !0,
                        filterSettings: {
                            image: {
                                bidders: "*",
                                filter: "include"
                            }
                        },
                        syncsPerBidder: 5,
                        syncDelay: 3e3,
                        auctionDelay: 0
                    })
                });
                const p = (0, s.CK)("usersync"),
                    f = function(e) {
                        let t = {},
                            n = {
                                image: [],
                                iframe: []
                            },
                            s = new Set,
                            a = {},
                            p = {
                                image: !0,
                                iframe: !1
                            },
                            f = e.config;

                        function m() {
                            if (f.syncEnabled && e.browserSupportsCookies) {
                                try {
                                    p.iframe && g(n.iframe, (e => {
                                        let [t, i] = e;
                                        (0, r.OG)(`Invoking iframe user sync for bidder: ${t}`), (0, r.SG)(i),
                                        function(e, t) {
                                            e.image = e.image.filter((e => e[0] !== t))
                                        }(n, t)
                                    })), p.image && g(n.image, (e => {
                                        let [t, n] = e;
                                        (0, r.OG)(`Invoking image pixel user sync for bidder: ${t}`), (0, r.z$)(n)
                                    }))
                                } catch (e) {
                                    return (0, r.vV)("Error firing user syncs", e)
                                }
                                n = {
                                    image: [],
                                    iframe: []
                                }
                            }
                        }

                        function g(e, t) {
                            (0, r.k4)(e).forEach(t)
                        }
                        return i.$W.getConfig("userSync", (e => {
                            if (e.userSync) {
                                let t = e.userSync.filterSettings;
                                (0, r.Qd)(t) && (t.image || t.all || (e.userSync.filterSettings.image = {
                                    bidders: "*",
                                    filter: "include"
                                }))
                            }
                            f = Object.assign(f, e.userSync)
                        })), e.regRule(d.Ml, "userSync config", (e => {
                            if (!f.syncEnabled) return {
                                allow: !1,
                                reason: "syncs are disabled"
                            };
                            if (e[c.Dk] === l.tW) {
                                const n = e[c.bt],
                                    r = e[c.iK];
                                if (!t.canBidderRegisterSync(n, r)) return {
                                    allow: !1,
                                    reason: `${n} syncs are not enabled for ${r}`
                                }
                            }
                        })), t.registerSync = (t, i, o) => s.has(i) ? (0, r.OG)(`already fired syncs for "${i}", ignoring registerSync call`) : f.syncEnabled && (0, r.cy)(n[t]) ? i ? 0 !== f.syncsPerBidder && Number(a[i]) >= f.syncsPerBidder ? (0, r.JE)(`Number of user syncs exceeded for "${i}"`) : void(e.isAllowed(d.Ml, (0, u.s)(l.tW, i, {
                            [c.bt]: t,
                            [c.e3]: o
                        })) && (n[t].push([i, o]), a = function(e, t) {
                            return e[t] ? e[t] += 1 : e[t] = 1, e
                        }(a, i))) : (0, r.JE)("Bidder is required for registering sync") : (0, r.JE)(`User sync type "${t}" not supported`), t.bidderDone = s.add.bind(s), t.syncUsers = function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            if (e) return setTimeout(m, Number(e));
                            m()
                        }, t.triggerUserSyncs = () => {
                            f.enableOverride && t.syncUsers()
                        }, t.canBidderRegisterSync = (e, t) => !f.filterSettings || ! function(e, t) {
                            let n = f.filterSettings;
                            if (function(e, t) {
                                    if (e.all && e[t]) return (0, r.JE)(`Detected presence of the "filterSettings.all" and "filterSettings.${t}" in userSync config.  You cannot mix "all" with "iframe/image" configs; they are mutually exclusive.`), !1;
                                    let n = e.all ? e.all : e[t],
                                        i = e.all ? "all" : t;
                                    if (!n) return !1;
                                    let o = n.filter,
                                        s = n.bidders;
                                    return o && "include" !== o && "exclude" !== o ? ((0, r.JE)(`UserSync "filterSettings.${i}.filter" setting '${o}' is not a valid option; use either 'include' or 'exclude'.`), !1) : !!("*" === s || Array.isArray(s) && s.length > 0 && s.every((e => (0, r.O8)(e) && "*" !== e))) || ((0, r.JE)(`Detected an invalid setup in userSync "filterSettings.${i}.bidders"; use either '*' (to represent all bidders) or an array of bidders.`), !1)
                                }(n, e)) {
                                p[e] = !0;
                                let r = n.all ? n.all : n[e],
                                    i = "*" === r.bidders ? [t] : r.bidders;
                                const s = {
                                    include: (e, t) => !(0, o.mK)(e, t),
                                    exclude: (e, t) => (0, o.mK)(e, t)
                                };
                                return s[r.filter || "include"](i, t)
                            }
                            return !p[e]
                        }(e, t), t
                    }(Object.defineProperties({
                        config: i.$W.getConfig("userSync"),
                        isAllowed: a.io,
                        regRule: a.qB
                    }, {
                        browserSupportsCookies: {
                            get: function() {
                                return !(0, r.Vt)() && p.cookiesAreEnabled()
                            }
                        }
                    }))
            },
            686: (e, t, n) => {
                "use strict";
                n.d(t, {
                    bu: () => ie,
                    cD: () => E,
                    El: () => Ye,
                    c$: () => Fe,
                    Wz: () => ce,
                    GE: () => Se,
                    sC: () => Ue,
                    gR: () => oe,
                    hw: () => G,
                    CA: () => H,
                    Tz: () => pe,
                    PB: () => Je,
                    Go: () => Ee,
                    U6: () => ke,
                    Bk: () => fe,
                    Bq: () => ge,
                    eP: () => Le,
                    lk: () => k,
                    u5: () => D,
                    D4: () => be,
                    ZA: () => ve,
                    l9: () => Pe,
                    SH: () => Re,
                    Ez: () => J,
                    V: () => Te,
                    YI: () => x,
                    s0: () => S,
                    SB: () => Be,
                    _W: () => he,
                    l4: () => $,
                    mb: () => U,
                    $z: () => De,
                    N9: () => Ce,
                    al: () => Ae,
                    _s: () => se,
                    ro: () => le,
                    SG: () => ue,
                    iC: () => $e,
                    t1: () => _e,
                    cy: () => Y,
                    Uu: () => We,
                    Lm: () => te,
                    Im: () => ne,
                    xQ: () => re,
                    fp: () => Q,
                    II: () => ye,
                    Fq: () => Ne,
                    Et: () => Z,
                    Qd: () => ee,
                    Vt: () => Oe,
                    O8: () => X,
                    wD: () => je,
                    vV: () => z,
                    fH: () => M,
                    OG: () => N,
                    JE: () => W,
                    Bj: () => Qe,
                    D9: () => He,
                    bL: () => R,
                    kK: () => B,
                    Dl: () => Ve,
                    Up: () => Me,
                    h0: () => L,
                    gM: () => we,
                    $l: () => Ke,
                    Bg: () => Xe,
                    k4: () => Ie,
                    vE: () => xe,
                    $D: () => j,
                    z$: () => de,
                    hj: () => me,
                    bz: () => qe
                });
                var r = n(718);

                function i(e) {
                    var t, n, r;
                    if (Array.isArray(e)) {
                        for (n = Array(t = e.length); t--;) n[t] = (r = e[t]) && "object" == typeof r ? i(r) : r;
                        return n
                    }
                    if ("[object Object]" === Object.prototype.toString.call(e)) {
                        for (t in n = {}, e) "__proto__" === t ? Object.defineProperty(n, t, {
                            value: i(e[t]),
                            configurable: !0,
                            enumerable: !0,
                            writable: !0
                        }) : n[t] = (r = e[t]) && "object" == typeof r ? i(r) : r;
                        return n
                    }
                    return e
                }
                var o = n(455),
                    s = n(743),
                    a = n(469),
                    d = n(831),
                    c = "String",
                    l = "Function",
                    u = "Number",
                    p = "Object",
                    f = "Boolean",
                    m = Object.prototype.toString;
                let g, b = Boolean(window.console),
                    h = Boolean(b && window.console.log),
                    v = Boolean(b && window.console.info),
                    y = Boolean(b && window.console.warn),
                    _ = Boolean(b && window.console.error);
                const I = (0, d.m)();

                function E(e) {
                    g = e
                }

                function A() {
                    null != g && g(...arguments)
                }
                const O = {
                    checkCookieSupport: Se,
                    createTrackPixelIframeHtml: function(e) {
                        let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                        return e ? ((!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && (e = encodeURI(e)), t && (t = `sandbox="${t}"`), `<iframe ${t} id="${S()}"\n      frameborder="0"\n      allowtransparency="true"\n      marginheight="0" marginwidth="0"\n      width="0" hspace="0" vspace="0" height="0"\n      style="height:0px;width:0px;display:none;"\n      scrolling="no"\n      src="${e}">\n    </iframe>`) : ""
                    },
                    getWindowSelf: $,
                    getWindowTop: U,
                    canAccessWindowTop: function() {
                        try {
                            if (O.getWindowTop().location.href) return !0
                        } catch (e) {
                            return !1
                        }
                    },
                    getWindowLocation: q,
                    insertUserSyncIframe: ue,
                    insertElement: se,
                    isFn: Q,
                    triggerPixel: de,
                    logError: z,
                    logWarn: W,
                    logMessage: N,
                    logInfo: M,
                    parseQS: ze,
                    formatQS: Le,
                    deepEqual: Ge
                };
                let w = {};

                function x() {
                    return w
                }
                var T, C = (T = 0, function() {
                    return ++T
                });

                function S() {
                    return C() + Math.random().toString(16).substr(2)
                }

                function k(e) {
                    return e ? (e ^ (window && window.crypto && window.crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] % 16 : 16 * Math.random()) >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, k)
                }

                function D(e, t) {
                    return (null == t ? void 0 : t[e]) || ""
                }

                function R(e) {
                    let t = "";
                    for (var n in e) e.hasOwnProperty(n) && (t += n + "=" + encodeURIComponent(e[n]) + "&");
                    return t = t.replace(/&$/, ""), t
                }

                function j(e) {
                    return e && Object.getOwnPropertyNames(e).length > 0 ? Object.keys(e).map((t => `${t}=${encodeURIComponent(e[t])}`)).join("&") : ""
                }

                function B(e) {
                    return "string" == typeof e ? e.split(",").filter((e => e.match(/^(\d)+x(\d)+$/i))) : "object" == typeof e ? 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1] ? [P(e)] : e.map(P) : []
                }

                function P(e) {
                    if (function(e) {
                            return Y(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1])
                        }(e)) return e[0] + "x" + e[1]
                }

                function U() {
                    return window.top
                }

                function $() {
                    return window.self
                }

                function q() {
                    return window.location
                }

                function N() {
                    F() && h && console.log.apply(console, V(arguments, "MESSAGE:"))
                }

                function M() {
                    F() && v && console.info.apply(console, V(arguments, "INFO:"))
                }

                function W() {
                    F() && y && console.warn.apply(console, V(arguments, "WARNING:")), A(s.qY.AUCTION_DEBUG, {
                        type: "WARNING",
                        arguments
                    })
                }

                function z() {
                    F() && _ && console.error.apply(console, V(arguments, "ERROR:")), A(s.qY.AUCTION_DEBUG, {
                        type: "ERROR",
                        arguments
                    })
                }

                function L(e) {
                    function t(t) {
                        return function() {
                            for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                            t(e, ...r)
                        }
                    }
                    return {
                        logError: t(z),
                        logWarn: t(W),
                        logMessage: t(N),
                        logInfo: t(M)
                    }
                }

                function V(e, t) {
                    e = [].slice.call(e);
                    let n = r.$W.getCurrentBidder();
                    return t && e.unshift(t), n && e.unshift(i("#aaa")), e.unshift(i("#3b88c3")), e.unshift("%cPrebid" + (n ? `%c${n}` : "")), e;

                    function i(e) {
                        return `display: inline-block; color: #fff; background: ${e}; padding: 1px 4px; border-radius: 3px;`
                    }
                }

                function F() {
                    return !!r.$W.getConfig("debug")
                }
                const G = (() => {
                    const e = {
                        border: "0px",
                        hspace: "0",
                        vspace: "0",
                        marginWidth: "0",
                        marginHeight: "0",
                        scrolling: "no",
                        frameBorder: "0",
                        allowtransparency: "true"
                    };
                    return function(t, n) {
                        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        const i = t.createElement("iframe");
                        return Object.assign(i, Object.assign({}, e, n)), Object.assign(i.style, r), i
                    }
                })();

                function H() {
                    return G(document, {
                        id: S(),
                        width: 0,
                        height: 0,
                        src: "about:blank"
                    }, {
                        display: "none",
                        height: "0px",
                        width: "0px",
                        border: "0px"
                    })
                }

                function J(e) {
                    return ze(q().search)[e] || ""
                }

                function K(e, t) {
                    return m.call(e) === "[object " + t + "]"
                }

                function Q(e) {
                    return K(e, l)
                }

                function X(e) {
                    return K(e, c)
                }
                const Y = Array.isArray.bind(Array);

                function Z(e) {
                    return K(e, u)
                }

                function ee(e) {
                    return K(e, p)
                }

                function te(e) {
                    return K(e, f)
                }

                function ne(e) {
                    return !e || (Y(e) || X(e) ? !(e.length > 0) : Object.keys(e).length <= 0)
                }

                function re(e) {
                    return X(e) && (!e || 0 === e.length)
                }

                function ie(e, t) {
                    if (Q(null == e ? void 0 : e.forEach)) return e.forEach(t, this);
                    Object.entries(e || {}).forEach((e => {
                        let [n, r] = e;
                        return t.call(this, r, n)
                    }))
                }

                function oe(e, t) {
                    return Q(null == e ? void 0 : e.includes) && e.includes(t)
                }

                function se(e, t, n, r) {
                    let i;
                    t = t || document, i = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");
                    try {
                        if (i = i.length ? i : t.getElementsByTagName("body"), i.length) {
                            i = i[0];
                            let t = r ? null : i.firstChild;
                            return i.insertBefore(e, t)
                        }
                    } catch (e) {}
                }

                function ae(e, t) {
                    let n = null;
                    return new a.k((r => {
                        const i = function() {
                            e.removeEventListener("load", i), e.removeEventListener("error", i), null != n && window.clearTimeout(n), r()
                        };
                        e.addEventListener("load", i), e.addEventListener("error", i), null != t && (n = window.setTimeout(i, t))
                    }))
                }

                function de(e, t, n) {
                    const r = new Image;
                    t && O.isFn(t) && ae(r, n).then(t), r.src = e
                }

                function ce(e) {
                    let {
                        source: t,
                        burl: n
                    } = e;
                    t === s.RW.SRC && n && O.triggerPixel(n)
                }

                function le(e) {
                    if (!e) return;
                    const t = H();
                    var n;
                    O.insertElement(t, document, "body"), (n = t.contentWindow.document).open(), n.write(e), n.close()
                }

                function ue(e, t, n) {
                    let r = O.createTrackPixelIframeHtml(e, !1, "allow-scripts allow-same-origin"),
                        i = document.createElement("div");
                    i.innerHTML = r;
                    let o = i.firstChild;
                    t && O.isFn(t) && ae(o, n).then(t), O.insertElement(o, document, "html", !0)
                }

                function pe(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : encodeURI;
                    if (!e) return "";
                    let n = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
                    return n += '<img src="' + t(e) + '"></div>', n
                }

                function fe(e) {
                    return Array.from(e.matchAll(/\$({[^}]+})/g)).map((e => e[1])).reduce(((e, t) => e.replace("$" + encodeURIComponent(t), "$" + t)), encodeURI(e))
                }

                function me(e, t, n) {
                    return n.indexOf(e) === t
                }

                function ge(e, t) {
                    return e.concat(t)
                }

                function be(e, t) {
                    if (e) return t.flatMap((e => e.bids)).find((t => ["bidId", "adId", "bid_id"].some((n => t[n] === e))))
                }

                function he(e, t) {
                    return e[t]
                }

                function ve() {
                    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : I.adUnits).map((e => e.bids.map((e => e.bidder)).reduce(ge, []))).reduce(ge, []).filter((e => void 0 !== e)).filter(me)
                }

                function ye() {
                    if (window.googletag && Q(window.googletag.pubads) && Q(window.googletag.pubads().getSlots)) return !0
                }

                function _e() {
                    if (window.apntag && Q(window.apntag.getTag)) return !0
                }

                function Ie(e) {
                    let t = e.length;
                    for (; t > 0;) {
                        let n = Math.floor(Math.random() * t);
                        t--;
                        let r = e[t];
                        e[t] = e[n], e[n] = r
                    }
                    return e
                }

                function Ee(e) {
                    return i(e) || {}
                }

                function Ae() {
                    try {
                        return O.getWindowSelf() !== O.getWindowTop()
                    } catch (e) {
                        return !0
                    }
                }

                function Oe() {
                    return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
                }

                function we(e, t) {
                    if (e) return Object.entries(t).reduce(((e, t) => {
                        let [n, r] = t;
                        return e.replace(new RegExp("\\$\\{" + n + "\\}", "g"), r || "")
                    }), e)
                }

                function xe() {
                    return (new Date).getTime()
                }

                function Te() {
                    return window.performance && window.performance.now && window.performance.now() || 0
                }

                function Ce() {
                    return !1 !== r.$W.getConfig("deviceAccess")
                }

                function Se() {
                    if (window.navigator.cookieEnabled || document.cookie.length) return !0
                }

                function ke(e, t) {
                    if (t < 1) throw new Error(`numRequiredCalls must be a positive number. Got ${t}`);
                    let n = 0;
                    return function() {
                        n++, n === t && e.apply(this, arguments)
                    }
                }

                function De(e, t) {
                    return e.reduce((function(e, n) {
                        return (e[n[t]] = e[n[t]] || []).push(n), e
                    }), {})
                }

                function Re(e, t) {
                    return t.filter((t => e[t])).reduce(((t, n) => Object.assign(t, {
                        [n]: e[n]
                    })), {})
                }

                function je(e) {
                    const t = ["banner", "native", "video"];
                    return !!Object.keys(e).every((e => (0, o.mK)(t, e))) && (!e.video || !e.video.context || (0, o.mK)(["instream", "outstream", "adpod"], e.video.context))
                }

                function Be(e, t, n) {
                    return e.filter((e => e.code === t)).flatMap((e => e.bids)).filter((e => e.bidder === n)).map((e => e.params || {}))
                }

                function Pe() {
                    return "1" === navigator.doNotTrack || "1" === window.doNotTrack || "1" === navigator.msDoNotTrack || "yes" === navigator.doNotTrack
                }
                const Ue = (e, t) => e.getAdUnitPath() === t || e.getSlotElementId() === t;

                function $e(e) {
                    return t => Ue(e, t)
                }

                function qe(e, t) {
                    const n = Object.keys(e.mediaTypes || {
                        banner: "banner"
                    }).join(", ");
                    return `\n    ${e.code} is a ${n} ad unit\n    containing bidders that don't support ${n}: ${t}.\n    This bidder won't fetch demand.\n  `
                }
                const Ne = Number.isInteger.bind(Number);

                function Me(e, t) {
                    return "object" != typeof e ? {} : t.reduce(((n, r, i) => {
                        if ("function" == typeof r) return n;
                        let o = r,
                            s = r.match(/^(.+?)\sas\s(.+?)$/i);
                        s && (r = s[1], o = s[2]);
                        let a = e[r];
                        return "function" == typeof t[i + 1] && (a = t[i + 1](a, n)), void 0 !== a && (n[o] = a), n
                    }), {})
                }

                function We(e, t) {
                    return Y(e) && (!t || e.length === t) && e.every((e => Ne(e)))
                }

                function ze(e) {
                    return e ? e.replace(/^\?/, "").split("&").reduce(((e, t) => {
                        let [n, r] = t.split("=");
                        return /\[\]$/.test(n) ? (n = n.replace("[]", ""), e[n] = e[n] || [], e[n].push(r)) : e[n] = r || "", e
                    }), {}) : {}
                }

                function Le(e) {
                    return Object.keys(e).map((t => Array.isArray(e[t]) ? e[t].map((e => `${t}[]=${e}`)).join("&") : `${t}=${e[t]}`)).join("&")
                }

                function Ve(e, t) {
                    let n = document.createElement("a");
                    t && "noDecodeWholeURL" in t && t.noDecodeWholeURL ? n.href = e : n.href = decodeURIComponent(e);
                    let r = t && "decodeSearchAsString" in t && t.decodeSearchAsString;
                    return {
                        href: n.href,
                        protocol: (n.protocol || "").replace(/:$/, ""),
                        hostname: n.hostname,
                        port: +n.port,
                        pathname: n.pathname.replace(/^(?!\/)/, "/"),
                        search: r ? n.search : O.parseQS(n.search || ""),
                        hash: (n.hash || "").replace(/^#/, ""),
                        host: n.host || window.location.host
                    }
                }

                function Fe(e) {
                    return (e.protocol || "http") + "://" + (e.host || e.hostname + (e.port ? `:${e.port}` : "")) + (e.pathname || "") + (e.search ? `?${O.formatQS(e.search||"")}` : "") + (e.hash ? `#${e.hash}` : "")
                }

                function Ge(e, t) {
                    let {
                        checkTypes: n = !1
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (e === t) return !0;
                    if ("object" != typeof e || null === e || "object" != typeof t || null === t || n && e.constructor !== t.constructor) return !1; {
                        const r = Object.keys(e);
                        if (r.length !== Object.keys(t).length) return !1;
                        for (let i of r) {
                            if (!t.hasOwnProperty(i)) return !1;
                            if (!Ge(e[i], t[i], {
                                    checkTypes: n
                                })) return !1
                        }
                        return !0
                    }
                }

                function He(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    if (!n.length) return e;
                    const i = n.shift();
                    if (ee(e) && ee(i))
                        for (const t in i) ee(i[t]) ? (e[t] || Object.assign(e, {
                            [t]: {}
                        }), He(e[t], i[t])) : Y(i[t]) ? e[t] ? Y(e[t]) && i[t].forEach((n => {
                            let r = 1;
                            for (let i = 0; i < e[t].length; i++)
                                if (Ge(e[t][i], n)) {
                                    r = 0;
                                    break
                                }
                            r && e[t].push(n)
                        })) : Object.assign(e, {
                            [t]: [...i[t]]
                        }) : Object.assign(e, {
                            [t]: i[t]
                        });
                    return He(e, ...n)
                }

                function Je(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        n = function(e, t) {
                            if (Q(Math.imul)) return Math.imul(e, t);
                            var n = (4194303 & e) * (t |= 0);
                            return 4290772992 & e && (n += (4290772992 & e) * t | 0), 0 | n
                        },
                        r = 3735928559 ^ t,
                        i = 1103547991 ^ t;
                    for (let t, o = 0; o < e.length; o++) t = e.charCodeAt(o), r = n(r ^ t, 2654435761), i = n(i ^ t, 1597334677);
                    return r = n(r ^ r >>> 16, 2246822507) ^ n(i ^ i >>> 13, 3266489909), i = n(i ^ i >>> 16, 2246822507) ^ n(r ^ r >>> 13, 3266489909), (4294967296 * (2097151 & i) + (r >>> 0)).toString()
                }

                function Ke(e) {
                    try {
                        return JSON.parse(e)
                    } catch (e) {}
                }

                function Qe(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e) {
                        return e
                    };
                    const n = new Map,
                        r = function() {
                            const r = t.apply(this, arguments);
                            return n.has(r) || n.set(r, e.apply(this, arguments)), n.get(r)
                        };
                    return r.clear = n.clear.bind(n), r
                }

                function Xe(e, t) {
                    Object.entries(t).forEach((t => {
                        let [n, r] = t;
                        return e.setAttribute(n, r)
                    }))
                }

                function Ye(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e => e,
                        r = 0,
                        i = e.length && e.length - 1;
                    const o = n(t);
                    for (; i - r > 1;) {
                        const t = r + Math.round((i - r) / 2);
                        o > n(e[t]) ? r = t : i = t
                    }
                    for (; e.length > r && o > n(e[r]);) r++;
                    return r
                }
            },
            607: (e, t, n) => {
                "use strict";
                n.d(t, {
                    C: () => i
                });
                var r = n(384);

                function i(e) {
                    return null == e || !e.gdprApplies || !0 === (0, r.A)(e, "vendorData.purpose.consents.1")
                }
            },
            992: (e, t, n) => {
                "use strict";
                n.d(t, {
                    Ak: () => b,
                    BO: () => f,
                    K7: () => m
                });
                var r = n(718);
                const i = "performanceMetrics",
                    o = window.performance && window.performance.now ? () => window.performance.now() : () => Date.now(),
                    s = new WeakMap;

                function a() {
                    let {
                        now: e = o,
                        mkNode: t = l,
                        mkTimer: n = c,
                        mkRenamer: r = (e => e),
                        nodes: i = s
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return function() {
                        return function o(s) {
                            let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e => ({
                                forEach(t) {
                                    t(e)
                                }
                            });
                            a = r(a);
                            const d = function(e) {
                                return s.dfWalk({
                                    visit(t, n) {
                                        const r = n.timestamps;
                                        if (r.hasOwnProperty(e)) return r[e]
                                    }
                                })
                            };

                            function c(e, t) {
                                const n = a(e);
                                s.dfWalk({
                                    follow: (e, t) => t.propagate && (!e || !e.stopPropagation),
                                    visit(e, r) {
                                        n.forEach((n => {
                                            null == e ? r.metrics[n] = t : (r.groups.hasOwnProperty(n) || (r.groups[n] = []), r.groups[n].push(t))
                                        }))
                                    }
                                })
                            }

                            function l(t) {
                                return n(e, (e => c(t, e)))
                            }

                            function u() {
                                let e = {};
                                return s.dfWalk({
                                    visit(t, n) {
                                        e = Object.assign({}, !t || t.includeGroups ? n.groups : null, n.metrics, e)
                                    }
                                }), e
                            }
                            const p = {
                                startTiming: l,
                                measureTime: function(e, t) {
                                    return l(e).stopAfter(t)()
                                },
                                measureHookTime: function(e, t, n) {
                                    const r = l(e);
                                    return n(function(e) {
                                        const t = r.stopBefore(e);
                                        return t.bail = e.bail && r.stopBefore(e.bail), t.stopTiming = r, t.untimed = e, t
                                    }(t))
                                },
                                checkpoint: function(t) {
                                    s.timestamps[t] = e()
                                },
                                timeSince: function(t, n) {
                                    const r = d(t),
                                        i = null != r ? e() - r : null;
                                    return null != n && c(n, i), i
                                },
                                timeBetween: function(e, t, n) {
                                    const r = d(e),
                                        i = d(t),
                                        o = null != r && null != i ? i - r : null;
                                    return null != n && c(n, o), o
                                },
                                setMetric: c,
                                getMetrics: u,
                                fork: function() {
                                    let {
                                        propagate: e = !0,
                                        stopPropagation: n = !1,
                                        includeGroups: r = !1
                                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    return o(t([
                                        [s, {
                                            propagate: e,
                                            stopPropagation: n,
                                            includeGroups: r
                                        }]
                                    ]), a)
                                },
                                join: function(e) {
                                    let {
                                        propagate: t = !0,
                                        stopPropagation: n = !1,
                                        includeGroups: r = !1
                                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                    const o = i.get(e);
                                    null != o && o.addParent(s, {
                                        propagate: t,
                                        stopPropagation: n,
                                        includeGroups: r
                                    })
                                },
                                newMetrics: function() {
                                    return o(s.newSibling(), a)
                                },
                                renameWith: function(e) {
                                    return o(s, e)
                                },
                                toJSON: () => u()
                            };
                            return i.set(p, s), p
                        }(t([]))
                    }
                }

                function d(e, t, n) {
                    return function() {
                        t && t();
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            n && n()
                        }
                    }
                }

                function c(e, t) {
                    const n = e();
                    let r = !1;

                    function i() {
                        r || (t(e() - n), r = !0)
                    }
                    return i.stopBefore = e => d(e, i), i.stopAfter = e => d(e, null, i), i
                }

                function l(e) {
                    return {
                        metrics: {},
                        timestamps: {},
                        groups: {},
                        addParent(t, n) {
                            e.push([t, n])
                        },
                        newSibling: () => l(e.slice()),
                        dfWalk() {
                            let t, {
                                visit: n,
                                follow: r = (() => !0),
                                visited: i = new Set,
                                inEdge: o
                            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            if (!i.has(this)) {
                                if (i.add(this), t = n(o, this), null != t) return t;
                                for (const [s, a] of e)
                                    if (r(o, a) && (t = s.dfWalk({
                                            visit: n,
                                            follow: r,
                                            visited: i,
                                            inEdge: a
                                        }), null != t)) return t
                            }
                        }
                    }
                }
                const u = (() => {
                    const e = function() {},
                        t = () => ({}),
                        n = {
                            forEach: e
                        },
                        r = () => null;
                    r.stopBefore = e => e, r.stopAfter = e => e;
                    const i = Object.defineProperties({
                        dfWalk: e,
                        newSibling: () => i,
                        addParent: e
                    }, Object.fromEntries(["metrics", "timestamps", "groups"].map((e => [e, {
                        get: t
                    }]))));
                    return a({
                        now: () => 0,
                        mkNode: () => i,
                        mkRenamer: () => () => n,
                        mkTimer: () => r,
                        nodes: {
                            get: e,
                            set: e
                        }
                    })()
                })();
                let p = !0;

                function f(e) {
                    return p && e || u
                }
                r.$W.getConfig(i, (e => {
                    p = !!e[i]
                }));
                const m = (() => {
                    const e = a();
                    return function() {
                        return p ? e() : u
                    }
                })();

                function g(e, t) {
                    return function(n, r) {
                        return function(i) {
                            for (var o = arguments.length, s = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) s[a - 1] = arguments[a];
                            const d = this;
                            return f(t.apply(d, s)).measureHookTime(e + n, i, (function(e) {
                                return r.call(d, e, ...s)
                            }))
                        }
                    }
                }
                const b = g("requestBids.", (e => e.metrics));
                g("addBidResponse.", ((e, t) => t.metrics))
            },
            469: (e, t, n) => {
                "use strict";

                function r(e, t, n) {
                    (function(e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    })(e, t), t.set(e, n)
                }

                function i(e, t) {
                    return e.get(s(e, t))
                }

                function o(e, t, n) {
                    return e.set(s(e, t), n), n
                }

                function s(e, t, n) {
                    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
                    throw new TypeError("Private element is not present on this object")
                }
                n.d(t, {
                    k: () => u,
                    v: () => f
                });
                const a = 0,
                    d = 1;
                var c = new WeakMap,
                    l = new WeakMap;
                class u {
                    static timeout() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                        return new u((t => {
                            0 === e ? t() : setTimeout(t, e)
                        }))
                    }
                    constructor(e) {
                        if (r(this, c, void 0), r(this, l, void 0), "function" != typeof e) throw new Error("resolver not a function");
                        const t = [],
                            n = [];
                        let [i, s] = [a, d].map((e => function(r) {
                            if (e === a && "function" == typeof(null == r ? void 0 : r.then)) r.then(i, s);
                            else if (!t.length)
                                for (t.push(e, r); n.length;) n.shift()()
                        }));
                        try {
                            e(i, s)
                        } catch (e) {
                            s(e)
                        }
                        o(c, this, t), o(l, this, n)
                    }
                    then(e, t) {
                        const n = i(c, this);
                        return new this.constructor(((r, o) => {
                            const s = () => {
                                let i = n[1],
                                    [s, d] = n[0] === a ? [e, r] : [t, o];
                                if ("function" == typeof s) {
                                    try {
                                        i = s(i)
                                    } catch (e) {
                                        return void o(e)
                                    }
                                    d = r
                                }
                                d(i)
                            };
                            n.length ? s() : i(l, this).push(s)
                        }))
                    } catch (e) {
                        return this.then(null, e)
                    } finally(e) {
                        let t;
                        return this.then((n => (t = n, e())), (n => (t = this.constructor.reject(n), e()))).then((() => t))
                    }
                    static race(e) {
                        return new this(((t, n) => {
                            s(u, this, p).call(this, e, ((e, r) => e ? t(r) : n(r)))
                        }))
                    }
                    static all(e) {
                        return new this(((t, n) => {
                            let r = [];
                            s(u, this, p).call(this, e, ((e, t, i) => e ? r[i] = t : n(t)), (() => t(r)))
                        }))
                    }
                    static allSettled(e) {
                        return new this((t => {
                            let n = [];
                            s(u, this, p).call(this, e, ((e, t, r) => n[r] = e ? {
                                status: "fulfilled",
                                value: t
                            } : {
                                status: "rejected",
                                reason: t
                            }), (() => t(n)))
                        }))
                    }
                    static resolve(e) {
                        return new this((t => t(e)))
                    }
                    static reject(e) {
                        return new this(((t, n) => n(e)))
                    }
                }

                function p(e, t, n) {
                    let r = e.length;

                    function i() {
                        t.apply(this, arguments), --r <= 0 && n && n()
                    }
                    0 === e.length && n ? n() : e.forEach(((e, t) => this.resolve(e).then((e => i(!0, e, t)), (e => i(!1, e, t)))))
                }

                function f() {
                    let e, t, {
                        promiseFactory: n = (e => new u(e))
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

                    function r(e) {
                        return t => e(t)
                    }
                    return {
                        promise: n(((n, r) => {
                            e = n, t = r
                        })),
                        resolve: r(e),
                        reject: r(t)
                    }
                }
            },
            280: (e, t, n) => {
                "use strict";
                n.d(t, {
                    H: () => o
                });
                var r = n(469),
                    i = n(686);

                function o() {
                    let {
                        startTime: e = i.vE,
                        ttl: t = (() => null),
                        monotonic: n = !1,
                        slack: o = 5e3
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const s = new Map,
                        a = [],
                        d = [],
                        c = n ? e => d.push(e) : e => d.splice((0, i.El)(d, e, (e => e.expiry)), 0, e);
                    let l, u;

                    function p() {
                        if (u && clearTimeout(u), d.length > 0) {
                            const e = (0, i.vE)();
                            l = Math.max(e, d[0].expiry + o), u = setTimeout((() => {
                                const e = (0, i.vE)();
                                let t = 0;
                                for (const n of d) {
                                    if (n.expiry > e) break;
                                    a.forEach((e => {
                                        try {
                                            e(n.item)
                                        } catch (e) {
                                            (0, i.vV)(e)
                                        }
                                    })), s.delete(n.item), t++
                                }
                                d.splice(0, t), u = null, p()
                            }), l - e)
                        } else u = null
                    }
                    let f = {};
                    return {
                        [Symbol.iterator]: () => s.keys(),
                        add(n) {
                            !s.has(n) && s.set(n, function(n) {
                                const i = {},
                                    s = f;
                                let a;
                                const [d, m] = Object.entries({
                                    start: e,
                                    delta: t
                                }).map((e => {
                                    let t, [d, m] = e;
                                    return function() {
                                        const e = t = {};
                                        r.k.resolve(m(n)).then((n => {
                                            e === t && (i[d] = n, s === f && null != i.start && null != i.delta && (a = i.start + i.delta, c(g), (null == u || l > a + o) && p()))
                                        }))
                                    }
                                })), g = {
                                    item: n,
                                    refresh: m,
                                    get expiry() {
                                        return a
                                    }
                                };
                                return d(), m(), g
                            }(n))
                        },
                        clear() {
                            d.length = 0, p(), s.clear(), f = {}
                        },
                        toArray: () => Array.from(s.keys()),
                        refresh() {
                            d.length = 0, p();
                            for (const e of s.values()) e.refresh()
                        },
                        onExpiry: e => (a.push(e), () => {
                            const t = a.indexOf(e);
                            t >= 0 && a.splice(t, 1)
                        })
                    }
                }
            },
            781: (e, t, n) => {
                "use strict";
                n.d(t, {
                    H6: () => d,
                    V0: () => l,
                    mn: () => c,
                    vk: () => u
                });
                var r = n(384),
                    i = n(686),
                    o = n(718),
                    s = n(439),
                    a = n(428);
                const d = "outstream",
                    c = "instream";

                function l(e) {
                    var t;
                    const n = null == e || null === (t = e.mediaTypes) || void 0 === t ? void 0 : t.video;
                    null != n && null == n.plcmt && (n.context === d || [2, 3, 4].includes(n.placement) ? n.plcmt = 4 : n.context !== d && [2, 6].includes(n.playbackmethod) && (n.plcmt = 2))
                }

                function u(e) {
                    let {
                        index: t = a.n.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const n = (0, r.A)(t.getMediaTypes(e), "video"),
                        i = n && (0, r.A)(n, "context"),
                        o = n && (0, r.A)(n, "useCacheKey"),
                        s = t.getAdUnit(e);
                    return p(e, s, n, i, o)
                }
                const p = (0, s.A_)("sync", (function(e, t, n, r, s) {
                    return n && (s || r !== d) ? o.$W.getConfig("cache.url") || !e.vastXml || e.vastUrl ? !(!e.vastUrl && !e.vastXml) : ((0, i.vV)('\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: "..."} });\n      '), !1) : !(r === d && !s && !(e.renderer || t && t.renderer || n.renderer))
                }), "checkVideoBidSetup")
            },
            504: (e, t, n) => {
                "use strict";

                function r(e) {
                    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, r(e)
                }

                function i(e, t, n) {
                    return (t = function(e) {
                        var t = function(e) {
                            if ("object" != r(e) || !e) return e;
                            var t = e[Symbol.toPrimitive];
                            if (void 0 !== t) {
                                var n = t.call(e, "string");
                                if ("object" != r(n)) return n;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == r(t) ? t : t + ""
                    }(t)) in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                }
                n.d(t, {
                    A: () => i
                })
            }
        },
        __webpack_module_cache__ = {};

    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (void 0 !== t) return t.exports;
        var n = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e](n, n.exports, __webpack_require__), n.exports
    }
    __webpack_require__.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return __webpack_require__.d(t, {
            a: t
        }), t
    }, __webpack_require__.d = (e, t) => {
        for (var n in t) __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var e = __webpack_require__(831),
            t = __webpack_require__(686),
            n = __webpack_require__(384);

        function r(e, t, n) {
            t.split && (t = t.split("."));
            for (var r, i, o = 0, s = t.length, a = e; o < s && "__proto__" !== (i = t[o++]) && "constructor" !== i && "prototype" !== i;) a = a[i] = o === s ? n : typeof(r = a[i]) == typeof t ? r : 0 * t[o] != 0 || ~("" + t[o]).indexOf(".") ? {} : []
        }
        var i = __webpack_require__(504),
            o = __webpack_require__(13),
            s = __webpack_require__(787),
            a = __webpack_require__(743),
            d = __webpack_require__(428),
            c = __webpack_require__(455),
            l = __webpack_require__(885),
            u = __webpack_require__(922);

        function p(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function f(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? p(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }
        const {
            REQUEST: m,
            RESPONSE: g,
            NATIVE: b,
            EVENT: h
        } = a.nl, v = a.qY.BID_WON, y = {
            [m]: function(e, t, n) {
                (0, l.bw)({
                    renderFn(t) {
                        e(Object.assign({
                            message: g,
                            renderer: (0, u.k)(n)
                        }, t))
                    },
                    resizeFn: I(n),
                    options: t.options,
                    adId: t.adId,
                    bidResponse: n
                })
            },
            [h]: function(e, n, r) {
                if (null != r) {
                    if (r.status === a.tl.RENDERED) return (0, l.Uc)(n, r);
                    (0, t.JE)(`Received x-origin event request without corresponding render request for ad '${r.adId}'`)
                } else(0, t.vV)(`Cannot find ad '${n.adId}' for x-origin event request`)
            }
        };

        function _(e) {
            var n = e.message ? "message" : "data",
                r = {};
            try {
                r = JSON.parse(e[n])
            } catch (e) {
                return
            }
            if (r && r.adId && r.message) {
                const n = (0, c.I6)(d.n.getBidsReceived(), (function(e) {
                    return e.adId === r.adId
                }));
                y.hasOwnProperty(r.message) && y[r.message](function(e) {
                    return null == e.origin && 0 === e.ports.length ? function() {
                        const e = "Cannot post message to a frame with null origin. Please update creatives to use MessageChannel, see https://github.com/prebid/Prebid.js/issues/7870";
                        throw (0, t.vV)(e), new Error(e)
                    } : e.ports.length > 0 ? function(t) {
                        e.ports[0].postMessage(JSON.stringify(t))
                    } : function(t) {
                        e.source.postMessage(JSON.stringify(t), e.origin)
                    }
                }(e), r, n)
            }
        }

        function I(e) {
            return function(n, r) {
                ! function(e) {
                    let {
                        adId: n,
                        adUnitCode: r,
                        width: i,
                        height: o
                    } = e;

                    function s(e) {
                        return e ? e + "px" : "100%"
                    }

                    function a(e) {
                        let i = function(e, n) {
                                return (0, t.II)() ? function(e) {
                                    const t = (0, c.I6)(window.googletag.pubads().getSlots(), (t => (0, c.I6)(t.getTargetingKeys(), (n => (0, c.mK)(t.getTargeting(n), e)))));
                                    return t ? t.getSlotElementId() : null
                                }(e) : (0, t.t1)() ? function(e) {
                                    let t = window.apntag.getTag(e);
                                    return t && t.targetId
                                }(n) : n
                            }(n, r),
                            o = document.getElementById(i);
                        return o && o.querySelector(e)
                    }["div", "iframe"].forEach((e => {
                        let n = a(e + ':not([style*="display: none"])');
                        if (n) {
                            let e = n.style;
                            e.width = s(i), e.height = s(o)
                        } else(0, t.JE)(`Unable to locate matching page element for adUnitCode ${r}.  Can't resize it to ad's dimensions.  Please review setup.`)
                    }))
                }(f(f({}, e), {}, {
                    width: n,
                    height: r
                }))
            }
        }
        Object.assign(y, {
            [b]: function(e, n, r) {
                if (null != r) switch (r.status !== a.tl.RENDERED && (d.n.addWinningBid(r), o.Ic(v, r)), n.action) {
                    case "assetRequest":
                        e((0, s.IX)(n, r));
                        break;
                    case "allAssetRequest":
                        e((0, s.yl)(n, r));
                        break;
                    default:
                        (0, l.vW)(n, r, {
                            resizeFn: I(r)
                        })
                } else(0, t.vV)(`Cannot find ad for x-origin event request: '${n.adId}'`)
            }
        });
        var E = __webpack_require__(588),
            A = __webpack_require__(718),
            O = __webpack_require__(233),
            w = __webpack_require__(439),
            x = __webpack_require__(447);

        function T(e, t) {
            return e === t ? 0 : e < t ? -1 : 1
        }

        function C() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e => e;
            return (t, n) => T(e(t), e(n))
        }

        function S() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T;
            return (t, n) => -e(t, n) || 0
        }

        function k() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return function(e, n) {
                for (const r of t) {
                    const t = r(e, n);
                    if (0 !== t) return t
                }
                return 0
            }
        }

        function D() {
            return function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T;
                return (t, n) => e(n, t) < 0 ? n : t
            }(S(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T))
        }
        const R = C((e => e.cpm)),
            j = C((e => e.responseTimestamp)),
            B = D(k(R, S(C((e => e.timeToRespond))))),
            P = D(k(R, S(j)));
        D(k(R, j));
        var U = __webpack_require__(389),
            $ = [];
        const q = "targetingControls.allowTargetingKeys",
            N = "targetingControls.addTargetingKeys",
            M = `Only one of "${q}" or "${N}" can be set`,
            W = Object.keys(a.xS).map((e => a.xS[e]));
        let z = {
            isActualBid: e => e.getStatusCode() === a.XQ.GOOD,
            isBidNotExpired: e => e.responseTimestamp + 1e3 * (0, U.L)(e) > (0, t.vE)(),
            isUnusedBid: e => e && (e.status && !(0, c.mK)([a.tl.RENDERED], e.status) || !e.status)
        };

        function L(e) {
            return !Object.values(z).some((t => !t(e)))
        }
        const V = (0, w.A_)("sync", (function(e, n) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            if (!(arguments.length > 3 && void 0 !== arguments[3] && arguments[3])) {
                const i = [],
                    o = A.$W.getConfig("sendBidsControl.dealPrioritization");
                let s = (0, t.$z)(e, "adUnitCode");
                return Object.keys(s).forEach((e => {
                    let a = [],
                        d = (0, t.$z)(s[e], "bidderCode");
                    Object.keys(d).forEach((e => a.push(d[e].reduce(n)))), r > 0 ? (a = o ? a.sort(F(!0)) : a.sort(((e, t) => t.cpm - e.cpm)), i.push(...a.slice(0, r))) : i.push(...a)
                })), i
            }
            return e
        }));

        function F() {
            let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return function(t, n) {
                return void 0 !== t.adserverTargeting.hb_deal && void 0 === n.adserverTargeting.hb_deal ? -1 : void 0 === t.adserverTargeting.hb_deal && void 0 !== n.adserverTargeting.hb_deal ? 1 : e ? n.cpm - t.cpm : n.adserverTargeting.hb_pb - t.adserverTargeting.hb_pb
            }
        }
        const G = function(e) {
            let r = {},
                i = {};

            function o(e, n) {
                return e.adserverTargeting && n && ((0, t.cy)(n) && (0, c.mK)(n, e.adUnitCode) || "string" == typeof n && e.adUnitCode === n)
            }

            function d(n) {
                return "string" == typeof n ? [n] : (0, t.cy)(n) ? n : e.getAdUnitCodes() || []
            }

            function l() {
                let t = e.getBidsReceived();
                if (A.$W.getConfig("useBidCache")) {
                    const e = A.$W.getConfig("bidCacheFilterFunction");
                    "function" == typeof e && (t = t.filter((t => i[t.adUnitCode] === t.auctionId || !!e(t))))
                } else t = t.filter((e => i[e.adUnitCode] === e.auctionId));
                return t = t.filter((e => (0, n.A)(e, "video.context") !== O.LM)).filter(L), t.forEach((e => (e.latestTargetedAuctionId = i[e.adUnitCode], e))), V(t, P)
            }

            function u(e, t) {
                let n = r.getWinningBids(e, t),
                    i = p();
                return n = n.map((e => ({
                    [e.adUnitCode]: Object.keys(e.adserverTargeting).filter((t => void 0 === e.sendStandardTargeting || e.sendStandardTargeting || -1 === i.indexOf(t))).reduce(((t, n) => {
                        const r = [e.adserverTargeting[n]],
                            i = {
                                [n.substring(0, 20)]: r
                            };
                        if (n === a.xS.DEAL) {
                            const o = {
                                [`${n}_${e.bidderCode}`.substring(0, 20)]: r
                            };
                            return [...t, i, o]
                        }
                        return [...t, i]
                    }), [])
                }))), n
            }

            function p() {
                return e.getStandardBidderAdServerTargeting().map((e => e.key)).concat(W).filter(t.hj)
            }

            function f(e, n, r, i) {
                return Object.keys(n.adserverTargeting).filter(m()).forEach((r => {
                    e.length && e.filter(function(e) {
                        return function(t) {
                            return t.adUnitCode === n.adUnitCode && t.adserverTargeting[e]
                        }
                    }(r)).forEach(function(e) {
                        return function(r) {
                            (0, t.cy)(r.adserverTargeting[e]) || (r.adserverTargeting[e] = [r.adserverTargeting[e]]), r.adserverTargeting[e] = r.adserverTargeting[e].concat(n.adserverTargeting[e]).filter(t.hj), delete n.adserverTargeting[e]
                        }
                    }(r))
                })), e.push(n), e
            }

            function m() {
                let e = p();
                return e = e.concat(s.Nh),
                    function(t) {
                        return -1 === e.indexOf(t)
                    }
            }

            function g(e) {
                return {
                    [e.adUnitCode]: Object.keys(e.adserverTargeting).filter(m()).map((t => ({
                        [t.substring(0, 20)]: [e.adserverTargeting[t]]
                    })))
                }
            }

            function b(e, t) {
                return t.map((t => ({
                    [`${t}_${e.bidderCode}`.substring(0, 20)]: [e.adserverTargeting[t]]
                })))
            }
            return r.setLatestAuctionForAdUnit = function(e, t) {
                i[e] = t
            }, r.resetPresetTargeting = function(n, r) {
                if ((0, t.II)()) {
                    const i = d(n),
                        o = e.getAdUnits().filter((e => (0, c.mK)(i, e.code)));
                    let s = $.reduce(((e, t) => (e[t] = null, e)), {});
                    window.googletag.pubads().getSlots().forEach((e => {
                        let n = (0, t.fp)(r) && r(e);
                        o.forEach((r => {
                            (r.code === e.getAdUnitPath() || r.code === e.getSlotElementId() || (0, t.fp)(n) && n(r.code)) && e.updateTargetingFromMap(s)
                        }))
                    }))
                }
            }, r.resetPresetTargetingAST = function(e) {
                d(e).forEach((function(e) {
                    const t = window.apntag.getTag(e);
                    if (t && t.keywords) {
                        const n = Object.keys(t.keywords),
                            r = {};
                        n.forEach((e => {
                            (0, c.mK)($, e.toLowerCase()) || (r[e] = t.keywords[e])
                        })), window.apntag.modifyTag(e, {
                            keywords: r
                        })
                    }
                }))
            }, r.getAllTargeting = function(r) {
                let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l();
                const p = d(r);
                var m = u(p, i).concat(function(e, t) {
                    return t.filter((t => (0, c.mK)(e, t.adUnitCode))).map((e => Object.assign({}, e))).reduce(f, []).map(g).filter((e => e))
                }(p, i)).concat(A.$W.getConfig("enableSendAllBids") ? function(e, t) {
                    const n = W.concat(s.Nh),
                        r = A.$W.getConfig("sendBidsControl.bidLimit"),
                        i = V(t, B, r),
                        d = A.$W.getConfig("targetingControls.allowSendAllBidsTargetingKeys"),
                        c = d ? d.map((e => a.xS[e])) : n;
                    return i.map((t => {
                        if (o(t, e)) return {
                            [t.adUnitCode]: b(t, n.filter((e => void 0 !== t.adserverTargeting[e] && -1 !== c.indexOf(e))))
                        }
                    })).filter((e => e))
                }(p, i) : function(e, t) {
                    if (!0 === A.$W.getConfig("targetingControls.alwaysIncludeDeals")) {
                        const n = W.concat(s.Nh);
                        return V(t, B).map((t => {
                            if (t.dealId && o(t, e)) return {
                                [t.adUnitCode]: b(t, n.filter((e => void 0 !== t.adserverTargeting[e])))
                            }
                        })).filter((e => e))
                    }
                    return []
                }(p, i)).concat(function(r) {
                    function i(e) {
                        return (0, n.A)(e, a.iD.ADSERVER_TARGETING)
                    }

                    function o(e) {
                        const n = i(e);
                        return Object.keys(n).map((function(e) {
                            return (0, t.O8)(n[e]) && (n[e] = n[e].split(",").map((e => e.trim()))), (0, t.cy)(n[e]) || (n[e] = [n[e]]), {
                                [e]: n[e]
                            }
                        }))
                    }
                    return e.getAdUnits().filter((e => (0, c.mK)(r, e.code) && i(e))).map((e => ({
                        [e.code]: o(e)
                    })))
                }(p));
                m.map((e => {
                    Object.keys(e).map((t => {
                        e[t].map((e => {
                            -1 === $.indexOf(Object.keys(e)[0]) && ($ = Object.keys(e).concat($))
                        }))
                    }))
                }));
                const h = Object.keys(Object.assign({}, a.Zh, a.x5));
                let v = A.$W.getConfig(q);
                const y = A.$W.getConfig(N);
                if (null != y && null != v) throw new Error(M);
                v = null != y ? h.concat(y) : v || h, Array.isArray(v) && v.length > 0 && (m = function(e, n) {
                    const r = Object.assign({}, a.xS, a.x5),
                        i = Object.keys(r),
                        o = {};
                    (0, t.fH)(`allowTargetingKeys - allowed keys [ ${n.map((e=>r[e])).join(", ")} ]`), e.map((e => {
                        const t = Object.keys(e)[0],
                            s = e[t].filter((e => {
                                const t = Object.keys(e)[0],
                                    s = 0 === i.filter((e => 0 === t.indexOf(r[e]))).length || (0, c.I6)(n, (e => {
                                        const n = r[e];
                                        return 0 === t.indexOf(n)
                                    }));
                                return o[t] = !s, s
                            }));
                        e[t] = s
                    }));
                    const s = Object.keys(o).filter((e => o[e]));
                    return (0, t.fH)(`allowTargetingKeys - removed keys [ ${s.join(", ")} ]`), e.filter((e => e[Object.keys(e)[0]].length > 0))
                }(m, v)), m = function(e) {
                    let t = e.map((e => ({
                        [Object.keys(e)[0]]: e[Object.keys(e)[0]].map((e => ({
                            [Object.keys(e)[0]]: e[Object.keys(e)[0]].join(",")
                        }))).reduce(((e, t) => Object.assign(t, e)), {})
                    }))).reduce((function(e, t) {
                        var n = Object.keys(t)[0];
                        return e[n] = Object.assign({}, e[n], t[n]), e
                    }), {});
                    return t
                }(m);
                const _ = A.$W.getConfig("targetingControls.auctionKeyMaxChars");
                return _ && ((0, t.fH)(`Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ${_} characters.  Running checks on auction keys...`), m = function(e, n) {
                    let r = (0, t.Go)(e),
                        i = Object.keys(r).map((e => ({
                            adUnitCode: e,
                            adserverTargeting: r[e]
                        }))).sort(F());
                    return i.reduce((function(e, i, o, s) {
                        let a = (d = i.adserverTargeting, Object.keys(d).reduce((function(e, t) {
                            return e + `${t}%3d${encodeURIComponent(d[t])}%26`
                        }), ""));
                        var d;
                        o + 1 === s.length && (a = a.slice(0, -3));
                        let c = i.adUnitCode,
                            l = a.length;
                        return l <= n ? (n -= l, (0, t.fH)(`AdUnit '${c}' auction keys comprised of ${l} characters.  Deducted from running threshold; new limit is ${n}`, r[c]), e[c] = r[c]) : (0, t.JE)(`The following keys for adUnitCode '${c}' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ${l}, the current allotted amount was ${n}.\n`, r[c]), o + 1 === s.length && 0 === Object.keys(e).length && (0, t.vV)("No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting."), e
                    }), {})
                }(m, _)), p.forEach((e => {
                    m[e] || (m[e] = {})
                })), m
            }, A.$W.getConfig("targetingControls", (function(e) {
                null != (0, n.A)(e, q) && null != (0, n.A)(e, N) && (0, t.vV)(M)
            })), r.setTargetingForGPT = function(e, n) {
                window.googletag.pubads().getSlots().forEach((r => {
                    Object.keys(e).filter(n ? n(r) : (0, t.iC)(r)).forEach((n => {
                        Object.keys(e[n]).forEach((t => {
                            let r = e[n][t];
                            "string" == typeof r && -1 !== r.indexOf(",") && (r = r.split(",")), e[n][t] = r
                        })), (0, t.OG)(`Attempting to set targeting-map for slot: ${r.getSlotElementId()} with targeting-map:`, e[n]), r.updateTargetingFromMap(e[n])
                    }))
                }))
            }, r.getWinningBids = function(e) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l();
                const r = d(e);
                return n.filter((e => (0, c.mK)(r, e.adUnitCode))).filter((e => !0 === x.u.get(e.bidderCode, "allowZeroCpmBids") ? e.cpm >= 0 : e.cpm > 0)).map((e => e.adUnitCode)).filter(t.hj).map((e => n.filter((t => t.adUnitCode === e ? t : null)).reduce(B)))
            }, r.setTargetingForAst = function(e) {
                let n = r.getAllTargeting(e);
                try {
                    r.resetPresetTargetingAST(e)
                } catch (e) {
                    (0, t.vV)("unable to reset targeting for AST" + e)
                }
                Object.keys(n).forEach((e => Object.keys(n[e]).forEach((r => {
                    if ((0, t.OG)(`Attempting to set targeting for targetId: ${e} key: ${r} value: ${n[e][r]}`), (0, t.O8)(n[e][r]) || (0, t.cy)(n[e][r])) {
                        let t = {},
                            i = /pt[0-9]/;
                        r.search(i) < 0 ? t[r.toUpperCase()] = n[e][r] : t[r] = n[e][r], window.apntag.setKeywords(e, t, {
                            overrideKeyValue: !0
                        })
                    }
                }))))
            }, r.isApntagDefined = function() {
                if (window.apntag && (0, t.fp)(window.apntag.setKeywords)) return !0
            }, r
        }(d.n);
        var H = __webpack_require__(651),
            J = __webpack_require__(286),
            K = __webpack_require__(469);
        const Q = "__pbjs_debugging__";

        function X() {
            return (0, e.m)().installedModules.includes("debugging")
        }

        function Y(e) {
            return new K.k((t => {
                (0, J.R)(e, "debugging", t)
            }))
        }

        function Z() {
            let {
                alreadyInstalled: n = X,
                script: r = Y
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = null;
            return function() {
                return null == i && (i = new K.k(((i, o) => {
                    setTimeout((() => {
                        if (n()) i();
                        else {
                            const n = "https://cdn.jsdelivr.net/npm/prebid.js@8.51.0/dist/debugging-standalone.js";
                            (0, t.OG)(`Debugging module not installed, loading it from "${n}"...`), (0, e.m)()._installDebugging = !0, r(n).then((() => {
                                (0, e.m)()._installDebugging({
                                    DEBUG_KEY: Q,
                                    hook: w.A_,
                                    config: A.$W,
                                    createBid: H.O,
                                    logger: (0, t.h0)("DEBUG:")
                                })
                            })).then(i, o)
                        }
                    }))
                }))), i
            }
        }
        const ee = function() {
            let {
                load: e = Z(),
                hook: t = (0, w.Yn)("requestBids")
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = null, r = !1;

            function i(e) {
                for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                return (n || K.k.resolve()).then((() => e.apply(this, r)))
            }

            function o() {
                t.getHooks({
                    hook: i
                }).remove(), r = !1
            }
            return {
                enable: function() {
                    r || (n = e(), t.before(i, 99), r = !0)
                },
                disable: o,
                reset: function() {
                    n = null, o()
                }
            }
        }();
        ee.reset, A.$W.getConfig("debugging", (function(e) {
            let {
                debugging: t
            } = e;
            null != t && t.enabled ? ee.enable() : ee.disable()
        }));
        var te = __webpack_require__(128),
            ne = __webpack_require__(807),
            re = __webpack_require__(992),
            ie = __webpack_require__(556);
        const oe = (0, te.CK)("fpdEnrichment"),
            se = (0, t.Bj)((function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.host;
                if (!oe.cookiesAreEnabled()) return e;
                const n = e.split(".");
                if (2 === n.length) return e;
                let r, i, o = -2;
                const s = `_rdc${Date.now()}`,
                    a = "writeable";
                do {
                    r = n.slice(o).join(".");
                    let e = new Date((0, t.vE)() + 1e4).toUTCString();
                    oe.setCookie(s, a, e, "Lax", r, void 0), oe.getCookie(s, void 0) === a ? (i = !1, oe.setCookie(s, "", "Thu, 01 Jan 1970 00:00:01 GMT", void 0, r, void 0)) : (o += -1, i = Math.abs(o) <= n.length)
                } while (i);
                return r
            })),
            ae = ["architecture", "bitness", "model", "platformVersion", "fullVersionList"],
            de = ["brands", "mobile", "platform"],
            ce = function() {
                var e;
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null === (e = window.navigator) || void 0 === e ? void 0 : e.userAgentData;
                const n = t && de.some((e => void 0 !== t[e])) ? Object.freeze(ue(1, t)) : null;
                return function() {
                    return n
                }
            }(),
            le = function() {
                var e;
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null === (e = window.navigator) || void 0 === e ? void 0 : e.userAgentData;
                const r = {},
                    i = new WeakMap;
                return function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ae;
                    if (!i.has(e)) {
                        const t = Array.from(e);
                        t.sort(), i.set(e, t.join("|"))
                    }
                    const o = i.get(e);
                    if (!r.hasOwnProperty(o)) try {
                        r[o] = n.getHighEntropyValues(e).then((e => (0, t.Im)(e) ? null : Object.freeze(ue(2, e)))).catch((() => null))
                    } catch (e) {
                        r[o] = K.k.resolve(null)
                    }
                    return r[o]
                }
            }();

        function ue(e, n) {
            function r(e, n) {
                const r = {
                    brand: e
                };
                return (0, t.O8)(n) && !(0, t.xQ)(n) && (r.version = n.split(".")), r
            }
            const i = {
                source: e
            };
            return n.platform && (i.platform = r(n.platform, n.platformVersion)), (n.fullVersionList || n.brands) && (i.browsers = (n.fullVersionList || n.brands).map((e => {
                let {
                    brand: t,
                    version: n
                } = e;
                return r(t, n)
            }))), void 0 !== n.mobile && (i.mobile = n.mobile ? 1 : 0), ["model", "bitness", "architecture"].forEach((e => {
                const r = n[e];
                (0, t.O8)(r) && (i[e] = r)
            })), i
        }
        const pe = ["dooh", "app", "site"];

        function fe(e) {
            return function(n) {
                return pe.reduce(((r, i) => (me(n, i) && (null != r ? ((0, t.JE)(`${e} specifies both '${r}' and '${i}'; dropping the latter.`), delete n[i]) : r = i), r)), null), n
            }
        }

        function me(e, t) {
            return null != e[t] && Object.keys(e[t]).length > 0
        }
        var ge = __webpack_require__(253),
            be = __webpack_require__(575),
            he = __webpack_require__(973),
            ve = __webpack_require__(883);
        const ye = {
                getRefererInfo: ie.EN,
                findRootDomain: se,
                getWindowTop: t.mb,
                getWindowSelf: t.l4,
                getHighEntropySUA: le,
                getLowEntropySUA: ce
            },
            _e = fe("FPD"),
            Ie = (0, w.A_)("sync", (e => {
                const n = [e, Ae().catch((() => null)), K.k.resolve("cookieDeprecationLabel" in navigator && (0, ge.io)(he.Ue, (0, be.s)(ve.tp, "cdep")) && navigator.cookieDeprecationLabel.getValue()).catch((() => null))];
                return K.k.all(n).then((e => {
                    let [n, i, o] = e;
                    const s = ye.getRefererInfo();
                    if (function(e) {
                            ["app", "site", "device"].forEach((n => {
                                const r = A.$W.getConfig(n);
                                null != r && (e[n] = (0, t.D9)({}, r, e[n]))
                            }))
                        }(n), Object.entries(we).forEach((e => {
                            let [r, i] = e;
                            const o = i(n, s);
                            o && Object.keys(o).length > 0 && (n[r] = (0, t.D9)({}, o, n[r]))
                        })), i && r(n, "device.sua", Object.assign({}, i, n.device.sua)), o) {
                        const e = {
                            cdep: o
                        };
                        r(n, "device.ext", Object.assign({}, e, n.device.ext))
                    }
                    n = _e(n);
                    for (let e of pe)
                        if (me(n, e)) {
                            n[e] = (0, t.D9)({}, xe(0, s), n[e]);
                            break
                        }
                    return n
                }))
            }));

        function Ee(e) {
            try {
                return e(ye.getWindowTop())
            } catch (t) {
                return e(ye.getWindowSelf())
            }
        }

        function Ae() {
            const e = A.$W.getConfig("firstPartyData.uaHints");
            return Array.isArray(e) && 0 !== e.length ? ye.getHighEntropySUA(e) : K.k.resolve(ye.getLowEntropySUA())
        }

        function Oe(e) {
            return (0, t.SH)(e, Object.keys(e))
        }
        const we = {
            site(e, t) {
                if (!pe.filter((e => "site" !== e)).some(me.bind(null, e))) return Oe({
                    page: t.page,
                    ref: t.ref
                })
            },
            device: () => Ee((e => {
                var n;
                const i = {
                    w: e.innerWidth || e.document.documentElement.clientWidth || e.document.body.clientWidth,
                    h: e.innerHeight || e.document.documentElement.clientHeight || e.document.body.clientHeight,
                    dnt: (0, t.l9)() ? 1 : 0,
                    ua: e.navigator.userAgent,
                    language: e.navigator.language.split("-").shift()
                };
                return null !== (n = e.navigator) && void 0 !== n && n.webdriver && r(i, "ext.webdriver", !0), i
            })),
            regs() {
                const e = {};
                Ee((e => e.navigator.globalPrivacyControl)) && r(e, "ext.gpc", 1);
                const t = A.$W.getConfig("coppa");
                return "boolean" == typeof t && (e.coppa = t ? 1 : 0), e
            }
        };

        function xe(e, t) {
            var n, r;
            const i = (0, ie.gR)(t.page, {
                noLeadingWww: !0
            });
            return Oe({
                domain: i,
                keywords: null === (n = Ee((e => e.document.querySelector("meta[name='keywords']")))) || void 0 === n || null === (n = n.content) || void 0 === n || null === (r = n.replace) || void 0 === r ? void 0 : r.call(n, /\s/g, ""),
                publisher: Oe({
                    domain: ye.findRootDomain(i)
                })
            })
        }
        var Te = __webpack_require__(586),
            Ce = __webpack_require__(781);
        const Se = (0, e.m)(),
            {
                triggerUserSyncs: ke
            } = E.zt,
            {
                ADD_AD_UNITS: De,
                REQUEST_BIDS: Re,
                SET_TARGETING: je
            } = a.qY,
            Be = {
                bidWon: function(e) {
                    if (d.n.getBidsRequested().map((e => e.bids.map((e => e.adUnitCode)))).reduce(t.Bq).filter(t.hj).includes(e)) return !0;
                    (0, t.vV)('The "' + e + '" placement is not defined.')
                }
            };

        function Pe(e, n) {
            let r = [];
            return (0, t.cy)(e) && (n ? e.length === n : e.length > 0) && (e.every((e => (0, t.Uu)(e, 2))) ? r = e : (0, t.Uu)(e, 2) && r.push(e)), r
        }

        function Ue(e) {
            const n = (0, t.Go)(e),
                r = n.mediaTypes.banner,
                i = Pe(r.sizes);
            return i.length > 0 ? (r.sizes = i, n.sizes = i) : ((0, t.vV)("Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request."), delete n.mediaTypes.banner), n
        }

        function $e(e) {
            const n = (0, t.Go)(e),
                r = n.mediaTypes.video;
            if (r.playerSize) {
                let e = "number" == typeof r.playerSize[0] ? 2 : 1;
                const i = Pe(r.playerSize, e);
                i.length > 0 ? (2 === e && (0, t.fH)("Transforming video.playerSize from [640,480] to [[640,480]] so it's in the proper format."), r.playerSize = i, n.sizes = i) : ((0, t.vV)("Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request."), delete n.mediaTypes.video.playerSize)
            }
            return n
        }

        function qe(e) {
            const n = (0, t.Go)(e),
                r = n.mediaTypes.native;
            if (r.ortb) {
                const e = Object.keys(a.x5).filter((e => a.x5[e].includes("hb_native_"))),
                    i = Object.keys(r).filter((t => e.includes(t)));
                i.length > 0 && ((0, t.vV)(`when using native OpenRTB format, you cannot use legacy native properties. Deleting ${i} keys from request.`), i.forEach((e => delete n.mediaTypes.native[e])))
            }
            return r.image && r.image.sizes && !Array.isArray(r.image.sizes) && ((0, t.vV)("Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request."), delete n.mediaTypes.native.image.sizes), r.image && r.image.aspect_ratios && !Array.isArray(r.image.aspect_ratios) && ((0, t.vV)("Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request."), delete n.mediaTypes.native.image.aspect_ratios), r.icon && r.icon.sizes && !Array.isArray(r.icon.sizes) && ((0, t.vV)("Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request."), delete n.mediaTypes.native.icon.sizes), n
        }

        function Ne(e, r) {
            let i = (0, n.A)(e, `mediaTypes.${r}.pos`);
            if (!(0, t.Et)(i) || isNaN(i) || !isFinite(i)) {
                let n = `Value of property 'pos' on ad unit ${e.code} should be of type: Number`;
                (0, t.JE)(n), o.Ic(a.qY.AUCTION_DEBUG, {
                    type: "WARNING",
                    arguments: n
                }), delete e.mediaTypes[r].pos
            }
            return e
        }

        function Me(e) {
            const n = t => `adUnit.code '${e.code}' ${t}`,
                r = e.mediaTypes,
                i = e.bids;
            return null == i || (0, t.cy)(i) ? null == i && null == e.ortb2Imp ? ((0, t.vV)(n("has no 'adUnit.bids' and no 'adUnit.ortb2Imp'. Removing adUnit from auction")), null) : r && 0 !== Object.keys(r).length ? (null == e.ortb2Imp || null != i && 0 !== i.length || (e.bids = [{
                bidder: null
            }], (0, t.OG)(n("defines 'adUnit.ortb2Imp' with no 'adUnit.bids'; it will be seen only by S2S adapters"))), e) : ((0, t.vV)(n("does not define a 'mediaTypes' object.  This is a required field for the auction, so this adUnit has been removed.")), null) : ((0, t.vV)(n("defines 'adUnit.bids' that is not an array. Removing adUnit from auction")), null)
        }! function() {
            let e = null;
            try {
                e = window.sessionStorage
            } catch (e) {}
            if (null !== e) {
                let t = ee,
                    n = null;
                try {
                    n = e.getItem(Q)
                } catch (e) {}
                null !== n && t.enable()
            }
        }(), Se.bidderSettings = Se.bidderSettings || {}, Se.libLoaded = !0, Se.version = "v8.51.0", (0, t.fH)("Prebid.js v8.51.0 loaded"), Se.installedModules = Se.installedModules || [], Se.adUnits = Se.adUnits || [], Se.triggerUserSyncs = ke;
        const We = {
            validateAdUnit: Me,
            validateBannerMediaType: Ue,
            validateSizes: Pe
        };
        Object.assign(We, {
            validateNativeMediaType: qe
        }), Object.assign(We, {
            validateVideoMediaType: $e
        });
        const ze = (0, w.A_)("sync", (function(e) {
            const t = [];
            return e.forEach((e => {
                if (null == (e = Me(e))) return;
                const n = e.mediaTypes;
                let r, i, o;
                n.banner && (r = Ue(e), n.banner.hasOwnProperty("pos") && (r = Ne(r, "banner"))), n.video && (i = $e(r || e), n.video.hasOwnProperty("pos") && (i = Ne(i, "video"))), n.native && (o = qe(i || r || e));
                const s = Object.assign({}, r, i, o);
                t.push(s)
            })), t
        }), "checkAdUnitSetup");

        function Le(e) {
            const n = d.n[e]().filter((e => d.n.getAdUnitCodes().includes(e.adUnitCode))),
                r = d.n.getLastAuctionId();
            return n.map((e => e.adUnitCode)).filter(t.hj).map((e => n.filter((t => t.auctionId === r && t.adUnitCode === e)))).filter((e => e && e[0] && e[0].adUnitCode)).map((e => ({
                [e[0].adUnitCode]: {
                    bids: e
                }
            }))).reduce(((e, t) => Object.assign(e, t)), {})
        }
        Se.getAdserverTargetingForAdUnitCodeStr = function(e) {
            if ((0, t.fH)("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments), e) {
                var n = Se.getAdserverTargetingForAdUnitCode(e);
                return (0, t.$D)(n)
            }(0, t.OG)("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode")
        }, Se.getHighestUnusedBidResponseForAdUnitCode = function(e) {
            if (e) {
                const t = d.n.getAllBidsForAdUnitCode(e).filter(L);
                return t.length ? t.reduce(B) : {}
            }(0, t.OG)("Need to call getHighestUnusedBidResponseForAdUnitCode with adunitCode")
        }, Se.getAdserverTargetingForAdUnitCode = function(e) {
            return Se.getAdserverTargeting(e)[e]
        }, Se.getAdserverTargeting = function(e) {
            return (0, t.fH)("Invoking pbjs.getAdserverTargeting", arguments), G.getAllTargeting(e)
        }, Se.getConsentMetadata = function() {
            return (0, t.fH)("Invoking pbjs.getConsentMetadata"), Te.SL.getConsentMeta()
        }, Se.getNoBids = function() {
            return (0, t.fH)("Invoking pbjs.getNoBids", arguments), Le("getNoBids")
        }, Se.getNoBidsForAdUnitCode = function(e) {
            return {
                bids: d.n.getNoBids().filter((t => t.adUnitCode === e))
            }
        }, Se.getBidResponses = function() {
            return (0, t.fH)("Invoking pbjs.getBidResponses", arguments), Le("getBidsReceived")
        }, Se.getBidResponsesForAdUnitCode = function(e) {
            return {
                bids: d.n.getBidsReceived().filter((t => t.adUnitCode === e))
            }
        }, Se.setTargetingForGPTAsync = function(e, n) {
            if ((0, t.fH)("Invoking pbjs.setTargetingForGPTAsync", arguments), !(0, t.II)()) return void(0, t.vV)("window.googletag is not defined on the page");
            let r = G.getAllTargeting(e);
            G.resetPresetTargeting(e, n), G.setTargetingForGPT(r, n), Object.keys(r).forEach((e => {
                Object.keys(r[e]).forEach((t => {
                    "hb_adid" === t && d.n.setStatusForBids(r[e][t], a.tl.BID_TARGETING_SET)
                }))
            })), o.Ic(je, r)
        }, Se.setTargetingForAst = function(e) {
            (0, t.fH)("Invoking pbjs.setTargetingForAn", arguments), G.isApntagDefined() ? (G.setTargetingForAst(e), o.Ic(je, G.getAllTargeting())) : (0, t.vV)("window.apntag is not defined on the page")
        }, Se.renderAd = (0, w.A_)("async", (function(e, n, r) {
            (0, t.fH)("Invoking pbjs.renderAd", arguments), (0, t.OG)("Calling renderAd with adId :" + n), (0, l.BS)(e, n, r)
        })), Se.removeAdUnit = function(e) {
            if ((0, t.fH)("Invoking pbjs.removeAdUnit", arguments), !e) return void(Se.adUnits = []);
            let n;
            n = (0, t.cy)(e) ? e : [e], n.forEach((e => {
                for (let t = Se.adUnits.length - 1; t >= 0; t--) Se.adUnits[t].code === e && Se.adUnits.splice(t, 1)
            }))
        }, Se.requestBids = function() {
            const e = (0, w.A_)("async", (function() {
                let {
                    bidsBackHandler: e,
                    timeout: n,
                    adUnits: r,
                    adUnitCodes: i,
                    labels: s,
                    auctionId: a,
                    ttlBuffer: d,
                    ortb2: l,
                    metrics: u,
                    defer: p
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                o.Ic(Re);
                const f = n || A.$W.getConfig("bidderTimeout");
                (0, t.fH)("Invoking pbjs.requestBids", arguments), i && i.length ? r = r.filter((e => (0, c.mK)(i, e.code))) : i = r && r.map((e => e.code));
                const m = {
                    global: (0, t.D9)({}, A.$W.getAnyConfig("ortb2") || {}, l || {}),
                    bidder: Object.fromEntries(Object.entries(A.$W.getBidderConfig()).map((e => {
                        let [t, n] = e;
                        return [t, n.ortb2]
                    })).filter((e => {
                        let [t, n] = e;
                        return null != n
                    })))
                };
                return Ie(K.k.resolve(m.global)).then((t => (m.global = t, Ve({
                    bidsBackHandler: e,
                    timeout: f,
                    adUnits: r,
                    adUnitCodes: i,
                    labels: s,
                    auctionId: a,
                    ttlBuffer: d,
                    ortb2Fragments: m,
                    metrics: u,
                    defer: p
                }))))
            }), "requestBids");
            return (0, w.Y6)(e, (function() {
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    r = n.adUnits || Se.adUnits;
                return n.adUnits = (0, t.cy)(r) ? r.slice() : [r], n.metrics = (0, re.K7)(), n.metrics.checkpoint("requestBids"), n.defer = (0, K.v)({
                    promiseFactory: e => new Promise(e)
                }), e.call(this, n), n.defer.promise
            }))
        }();
        const Ve = (0, w.A_)("async", (function() {
            let {
                bidsBackHandler: e,
                timeout: n,
                adUnits: i,
                ttlBuffer: o,
                adUnitCodes: s,
                labels: a,
                auctionId: l,
                ortb2Fragments: u,
                metrics: p,
                defer: f
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const m = (0, ne.pX)(A.$W.getConfig("s2sConfig") || []);

            function g(n, r, i) {
                if ("function" == typeof e) try {
                    e(n, r, i)
                } catch (e) {
                    (0, t.vV)("Error executing bidsBackHandler", null, e)
                }
                f.resolve({
                    bids: n,
                    timedOut: r,
                    auctionId: i
                })
            }! function(e) {
                e.forEach((e => (0, Ce.V0)(e)))
            }(i), i = (0, re.BO)(p).measureTime("requestBids.validate", (() => ze(i)));
            const b = {};
            if (i.forEach((e => {
                    var n;
                    const r = Object.keys(e.mediaTypes || {
                            banner: "banner"
                        }),
                        i = e.bids.map((e => e.bidder)),
                        s = ne.Ay.bidderRegistry,
                        a = i.filter((e => !m.has(e)));
                    e.adUnitId = (0, t.lk)();
                    const d = null === (n = e.ortb2Imp) || void 0 === n || null === (n = n.ext) || void 0 === n ? void 0 : n.tid;
                    d && (b.hasOwnProperty(e.code) ? (0, t.JE)(`Multiple distinct ortb2Imp.ext.tid were provided for twin ad units '${e.code}'`) : b[e.code] = d), null == o || e.hasOwnProperty("ttlBuffer") || (e.ttlBuffer = o), a.forEach((n => {
                        const i = s[n],
                            o = i && i.getSpec && i.getSpec(),
                            a = o && o.supportedMediaTypes || ["banner"];
                        r.some((e => (0, c.mK)(a, e))) || ((0, t.JE)((0, t.bz)(e, n)), e.bids = e.bids.filter((e => e.bidder !== n)))
                    }))
                })), i && 0 !== i.length) {
                i.forEach((e => {
                    var n;
                    const i = (null === (n = e.ortb2Imp) || void 0 === n || null === (n = n.ext) || void 0 === n ? void 0 : n.tid) || b[e.code] || (0, t.lk)();
                    b.hasOwnProperty(e.code) || (b[e.code] = i), e.transactionId = i, r(e, "ortb2Imp.ext.tid", i)
                }));
                const e = d.n.createAuction({
                    adUnits: i,
                    adUnitCodes: s,
                    callback: g,
                    cbTimeout: n,
                    labels: a,
                    auctionId: l,
                    ortb2Fragments: u,
                    metrics: p
                });
                let o = i.length;
                o > 15 && (0, t.fH)(`Current auction ${e.getAuctionId()} contains ${o} adUnits.`, i), s.forEach((t => G.setLatestAuctionForAdUnit(t, e.getAuctionId()))), e.callBids()
            } else(0, t.OG)("No adUnits configured. No bids requested."), g()
        }), "startAuction");
        Se.requestBids.before((function(e, t) {
            function n(e) {
                for (var t; t = e.shift();) t()
            }
            n(te.s0), n(Fe), e.call(this, t)
        }), 49), Se.addAdUnits = function(e) {
            (0, t.fH)("Invoking pbjs.addAdUnits", arguments), Se.adUnits.push.apply(Se.adUnits, (0, t.cy)(e) ? e : [e]), o.Ic(De)
        }, Se.onEvent = function(e, n, r) {
            (0, t.fH)("Invoking pbjs.onEvent", arguments), (0, t.fp)(n) ? !r || Be[e].call(null, r) ? o.on(e, n, r) : (0, t.vV)('The id provided is not valid for event "' + e + '" and no handler was set.'): (0, t.vV)('The event handler provided is not a function and was not set on event "' + e + '".')
        }, Se.offEvent = function(e, n, r) {
            (0, t.fH)("Invoking pbjs.offEvent", arguments), r && !Be[e].call(null, r) || o.AU(e, n, r)
        }, Se.getEvents = function() {
            return (0, t.fH)("Invoking pbjs.getEvents"), o.kQ()
        }, Se.registerBidAdapter = function(e, n) {
            (0, t.fH)("Invoking pbjs.registerBidAdapter", arguments);
            try {
                ne.Ay.registerBidAdapter(e(), n)
            } catch (e) {
                (0, t.vV)("Error registering bidder adapter : " + e.message)
            }
        }, Se.registerAnalyticsAdapter = function(e) {
            (0, t.fH)("Invoking pbjs.registerAnalyticsAdapter", arguments);
            try {
                ne.Ay.registerAnalyticsAdapter(e)
            } catch (e) {
                (0, t.vV)("Error registering analytics adapter : " + e.message)
            }
        }, Se.createBid = function(e) {
            return (0, t.fH)("Invoking pbjs.createBid", arguments), (0, H.O)(e)
        };
        const Fe = [],
            Ge = (0, w.A_)("async", (function(e) {
                e && !(0, t.Im)(e) ? ((0, t.fH)("Invoking pbjs.enableAnalytics for: ", e), ne.Ay.enableAnalytics(e)) : (0, t.vV)("pbjs.enableAnalytics should be called with option {}")
            }), "enableAnalyticsCb");
        Se.enableAnalytics = function(e) {
            Fe.push(Ge.bind(this, e))
        }, Se.aliasBidder = function(e, n, r) {
            (0, t.fH)("Invoking pbjs.aliasBidder", arguments), e && n ? ne.Ay.aliasBidAdapter(e, n, r) : (0, t.vV)("bidderCode and alias must be passed as arguments", "pbjs.aliasBidder")
        }, Se.aliasRegistry = ne.Ay.aliasRegistry, A.$W.getConfig("aliasRegistry", (e => {
            "private" === e.aliasRegistry && delete Se.aliasRegistry
        })), Se.getAllWinningBids = function() {
            return d.n.getAllWinningBids()
        }, Se.getAllPrebidWinningBids = function() {
            return d.n.getBidsReceived().filter((e => e.status === a.tl.BID_TARGETING_SET))
        }, Se.getHighestCpmBids = function(e) {
            return G.getWinningBids(e)
        }, Se.markWinningBidAsUsed = function(e) {
            const t = He(e, "Improper use of markWinningBidAsUsed. It needs an adUnitCode or an adId to function.");
            t.length > 0 && d.n.addWinningBid(t[0])
        };
        const He = (e, n) => {
            let r = [];
            return e.adUnitCode && e.adId ? r = d.n.getBidsReceived().filter((t => t.adId === e.adId && t.adUnitCode === e.adUnitCode)) : e.adUnitCode ? r = G.getWinningBids(e.adUnitCode) : e.adId ? r = d.n.getBidsReceived().filter((t => t.adId === e.adId)) : (0, t.JE)(n), r
        };

        function Je(e) {
            e.forEach((function(e) {
                if (void 0 === e.called) try {
                    e.call(), e.called = !0
                } catch (e) {
                    (0, t.vV)("Error processing command :", "prebid.js", e)
                }
            }))
        }
        Se.getConfig = A.$W.getAnyConfig, Se.readConfig = A.$W.readAnyConfig, Se.mergeConfig = A.$W.mergeConfig, Se.mergeBidderConfig = A.$W.mergeBidderConfig, Se.setConfig = A.$W.setConfig, Se.setBidderConfig = A.$W.setBidderConfig, Se.que.push((() => {
            window.addEventListener("message", _, !1)
        })), Se.cmd.push = function(e) {
            if ("function" == typeof e) try {
                e.call()
            } catch (e) {
                (0, t.vV)("Error processing command :", e.message, e.stack)
            } else(0, t.vV)("Commands written into pbjs.cmd.push must be wrapped in a function")
        }, Se.que.push = Se.cmd.push, Se.processQueue = function() {
            w.A_.ready(), Je(Se.que), Je(Se.cmd)
        }, Se.triggerBilling = e => {
            const n = He(e, "Improper use of triggerBilling. It requires a bid with at least an adUnitCode or an adId to function."),
                r = n.find((t => t.requestId === e.requestId)) || n[0];
            if (n.length > 0 && r) try {
                ne.Ay.callBidBillableBidder(r)
            } catch (e) {
                (0, t.vV)("Error when triggering billing :", e)
            } else(0, t.JE)("The bid provided to triggerBilling did not match any bids received.")
        };
        const Ke = Se,
            Qe = ["request", "imp", "bidResponse", "response"],
            [Xe, Ye, Ze, et] = Qe,
            [tt, nt] = ["default", "pbs"],
            rt = new Set(Qe),
            {
                registerOrtbProcessor: it,
                getProcessors: ot
            } = function() {
                const e = {};
                return {
                    registerOrtbProcessor(t) {
                        let {
                            type: n,
                            name: r,
                            fn: i,
                            priority: o = 0,
                            dialects: s = [tt]
                        } = t;
                        if (!rt.has(n)) throw new Error(`ORTB processor type must be one of: ${Qe.join(", ")}`);
                        s.forEach((t => {
                            e.hasOwnProperty(t) || (e[t] = {}), e[t].hasOwnProperty(n) || (e[t][n] = {}), e[t][n][r] = {
                                priority: o,
                                fn: i
                            }
                        }))
                    },
                    getProcessors: t => e[t] || {}
                }
            }();

        function st(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function at(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? st(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : st(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }
        const dt = 0,
            ct = 2;
        let lt, ut, pt, ft, mt, gt, bt = !1;
        const ht = {
            iab: function(e) {
                let {
                    onSuccess: n,
                    onError: r,
                    onEvent: i
                } = e;
                const o = function(e) {
                    let {
                        apiName: t,
                        apiVersion: n,
                        apiArgs: r = ["command", "callback", "parameter", "version"],
                        callbackArgs: i = ["returnValue", "success"],
                        mode: o = dt
                    } = e, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                    const a = {},
                        d = `${t}Call`,
                        c = `${t}Return`;

                    function l(e) {
                        var t;
                        const n = "string" == typeof e.data && e.data.includes(c) ? JSON.parse(e.data) : e.data;
                        if (null != n && null !== (t = n[c]) && void 0 !== t && t.callId) {
                            const e = n[c];
                            a.hasOwnProperty(e.callId) && a[e.callId](...i.map((t => e[t])))
                        }
                    }
                    const [u, p] = function() {
                        let e, n = s,
                            r = !1;
                        for (; null != n;) {
                            try {
                                if ("function" == typeof n[t]) {
                                    e = n, r = !0;
                                    break
                                }
                            } catch (e) {}
                            try {
                                if (n.frames[`${t}Locator`]) {
                                    e = n;
                                    break
                                }
                            } catch (e) {}
                            if (n === s.top) break;
                            n = n.parent
                        }
                        return [e, r]
                    }();
                    if (!u) return;

                    function f(e) {
                        return e = Object.assign({
                            version: n
                        }, e), r.map((t => [t, e[t]]))
                    }

                    function m(e, t, n, r) {
                        const i = "function" == typeof e;
                        return function(s, a) {
                            r && r(), 1 !== o && (null == a || a ? t : n)(i ? void 0 : s), i && e.apply(this, arguments)
                        }
                    }
                    let g;
                    return p ? g = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return new K.k(((n, r) => {
                            const i = u[t](...f(at(at({}, e), {}, {
                                callback: e.callback || 2 === o ? m(e.callback, n, r) : void 0
                            })).map((e => {
                                let [t, n] = e;
                                return n
                            })));
                            (1 === o || null == e.callback && o === dt) && n(i)
                        }))
                    } : (s.addEventListener("message", l, !1), g = function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        return new K.k(((n, r) => {
                            const i = Math.random().toString(),
                                s = {
                                    [d]: at(at({}, Object.fromEntries(f(e).filter((e => {
                                        let [t] = e;
                                        return "callback" !== t
                                    })))), {}, {
                                        callId: i
                                    })
                                };
                            a[i] = m(null == e ? void 0 : e.callback, n, r, (t || null == (null == e ? void 0 : e.callback)) && (() => {
                                delete a[i]
                            })), u.postMessage(s, "*"), 1 === o && n()
                        }))
                    }), Object.assign(g, {
                        isDirect: p,
                        close() {
                            !p && s.removeEventListener("message", l)
                        }
                    })
                }({
                    apiName: "__tcfapi",
                    apiVersion: ct,
                    apiArgs: ["command", "version", "callback", "parameter"]
                });
                if (!o) return r("TCF2 CMP not found.");
                o.isDirect ? (0, t.fH)("Detected CMP API is directly accessible, calling it now...") : (0, t.fH)("Detected CMP is outside the current iframe where Prebid.js is located, calling it now..."), o({
                    command: "addEventListener",
                    callback: function(e, o) {
                        (0, t.fH)("Received a response from CMP", e), o ? (i(e), !1 !== e.gdprApplies && "tcloaded" !== e.eventStatus && "useractioncomplete" !== e.eventStatus || _t(e, {
                            onSuccess: n,
                            onError: r
                        })) : r("CMP unable to register callback function.  Please check CMP setup.")
                    }
                })
            },
            static: function(e) {
                let {
                    onSuccess: t,
                    onError: n
                } = e;
                _t(ft, {
                    onSuccess: t,
                    onError: n
                })
            }
        };

        function vt(e) {
            let t, n, r = !1,
                i = null,
                o = !1;

            function s(e) {
                null != i && clearTimeout(i), r || null == e || (0 === e ? t() : i = setTimeout(t, e))
            }

            function a(t, n, i) {
                if (s(null), r = !0, Te.mW.setConsentData(t), "function" == typeof e) {
                    for (var o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), d = 3; d < o; d++) a[d - 3] = arguments[d];
                    e(n, i, ...a)
                }
            }
            if (!(0, c.mK)(Object.keys(ht), lt)) return void a(null, !1, `CMP framework (${lt}) is not a supported framework.  Aborting consentManagement module and resuming auction.`);
            const d = {
                onSuccess: e => a(e, !1),
                onError: function(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    a(null, !0, e, ...n)
                },
                onEvent: function(e) {
                    n = e, o || (o = !0, null != mt && s(mt))
                }
            };
            t = () => {
                const e = e => {
                    a(e, !1, (o ? "Timeout waiting for user action on CMP" : "CMP did not load") + ", continuing auction...")
                };
                _t(n, {
                    onSuccess: e,
                    onError: () => e(It(void 0))
                })
            }, ht[lt](d), null != mt && o || s(ut)
        }
        const yt = (0, re.Ak)("gdpr", (function(e, n) {
            var r;
            r = function(r, i) {
                if (i) {
                    let e = t.JE;
                    r && (e = t.vV, i = `${i} Canceling auction as per consentManagement config.`);
                    for (var o = arguments.length, s = new Array(o > 2 ? o - 2 : 0), a = 2; a < o; a++) s[a - 2] = arguments[a];
                    e(i, ...s)
                }
                r ? (e.stopTiming(), "function" == typeof n.bidsBackHandler ? n.bidsBackHandler() : (0, t.vV)("Error executing bidsBackHandler")) : e.call(this, n)
            }, gt ? ((0, t.fH)("User consent information already known.  Pulling internally stored information..."), r(!1)) : vt(r)
        }));

        function _t(e, n) {
            let {
                onSuccess: r,
                onError: i
            } = n;
            ! function() {
                const n = e && "boolean" == typeof e.gdprApplies ? e.gdprApplies : pt,
                    r = e && e.tcString;
                return !("boolean" == typeof n && (!0 !== n || r && (0, t.O8)(r)))
            }() ? r(It(e)): i("CMP returned unexpected value during lookup process.", e)
        }

        function It(e) {
            return gt = {
                consentString: e ? e.tcString : void 0,
                vendorData: e || void 0,
                gdprApplies: e && "boolean" == typeof e.gdprApplies ? e.gdprApplies : pt
            }, e && e.addtlConsent && (0, t.O8)(e.addtlConsent) && (gt.addtlConsent = e.addtlConsent), gt.apiVersion = ct, gt
        }
        A.$W.getConfig("consentManagement", (n => function(n) {
            var r;
            (n = n && (n.gdpr || n.usp || n.gpp ? n.gdpr : n)) && "object" == typeof n ? ((0, t.O8)(n.cmpApi) ? lt = n.cmpApi : (lt = "iab", (0, t.fH)("consentManagement config did not specify cmp.  Using system default setting (iab).")), (0, t.Et)(n.timeout) ? ut = n.timeout : (ut = 1e4, (0, t.fH)("consentManagement config did not specify timeout.  Using system default setting (10000).")), mt = (0, t.Et)(n.actionTimeout) ? n.actionTimeout : null, pt = !0 === n.defaultGdprScope, (0, t.fH)("consentManagement module has been activated..."), "static" === lt && ((0, t.Qd)(n.consentData) ? (ft = n.consentData, null != (null === (r = ft) || void 0 === r ? void 0 : r.getTCData) && (ft = ft.getTCData), ut = 0) : (0, t.vV)("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.")), bt || (0, e.m)().requestBids.before(yt, 50), bt = !0, Te.mW.enable(), vt()) : (0, t.JE)("consentManagement (gdpr) config not defined, exiting consent manager")
        }(n.consentManagement))), Ie.before((function(e, t) {
            return e(t.then((e => {
                const t = Te.mW.getConsentData();
                return t && ("boolean" == typeof t.gdprApplies && r(e, "regs.ext.gdpr", t.gdprApplies ? 1 : 0), r(e, "user.ext.consent", t.consentString)), e
            })))
        })), it({
            type: Xe,
            name: "gdprAddtlConsent",
            fn: function(e, t) {
                var n;
                const i = null === (n = t.gdprConsent) || void 0 === n ? void 0 : n.addtlConsent;
                i && "string" == typeof i && r(e, "user.ext.ConsentedProvidersSettings.consented_providers", i)
            }
        }), (0, e.E)("consentManagement");
        var Et = __webpack_require__(642);
        const At = {
                purpose: {},
                feature: {}
            },
            Ot = {
                purpose: "purpose.consents",
                feature: "specialFeatureOptins"
            },
            wt = {
                storage: {
                    type: "purpose",
                    default: {
                        purpose: "storage",
                        enforcePurpose: !0,
                        enforceVendor: !0,
                        vendorExceptions: []
                    },
                    id: 1
                },
                basicAds: {
                    type: "purpose",
                    id: 2,
                    default: {
                        purpose: "basicAds",
                        enforcePurpose: !0,
                        enforceVendor: !0,
                        vendorExceptions: []
                    }
                },
                personalizedAds: {
                    type: "purpose",
                    id: 4
                },
                measurement: {
                    type: "purpose",
                    id: 7
                },
                transmitPreciseGeo: {
                    type: "feature",
                    id: 1
                }
            },
            xt = new Set,
            Tt = new Set,
            Ct = new Set,
            St = new Set,
            kt = new Set,
            Dt = new Set;
        let Rt = !1,
            jt = !1;
        const Bt = [ve.tW, ve.fW, ve.Tn, ve.zu],
            Pt = "TCF2",
            Ut = [],
            $t = [2];

        function qt(e, t, r, i) {
            let o = !!(0, n.A)(e, `vendorData.${Ot[t]}.${r}`),
                s = !!(0, n.A)(e, `vendorData.vendor.consents.${i}`);
            return "purpose" === t && $t.includes(r) && (o || (o = !!(0, n.A)(e, `vendorData.purpose.legitimateInterests.${r}`)), s || (s = !!(0, n.A)(e, `vendorData.vendor.legitimateInterests.${i}`))), {
                purpose: o,
                vendor: s
            }
        }

        function Nt(e, t, r, i) {
            const o = wt[e.purpose];
            if ((e.vendorExceptions || []).includes(r)) return !0;
            const s = e.enforceVendor && !(i === Te.B1 || (e.softVendorExceptions || []).includes(r)),
                {
                    purpose: a,
                    vendor: d
                } = qt(t, o.type, o.id, i);
            let c = (!e.enforcePurpose || a) && (!s || d);
            return i === Te.ZH && (c = !e.enforcePurpose || !!(0, n.A)(t, `vendorData.publisher.consents.${o.id}`)), c
        }

        function Mt(e, n) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : () => null;
            return function(o) {
                const s = Te.mW.getConsentData(),
                    a = o[Et.iK];
                if (function(e, n, r) {
                        return null == e && Te.mW.enabled ? ((0, t.JE)(`Attempting operation that requires purpose ${n} consent while consent data is not available${r?` (module: ${r})`:""}. Assuming no consent was given.`), !0) : e && e.gdprApplies
                    }(s, e, a)) {
                    const e = function(e, n, r) {
                        if (n) {
                            const i = A.$W.getConfig("gvlMapping");
                            if (i && i[n]) return i[n];
                            if (e === ve.tp) return "cdep" === n ? Te.ZH : Te.B1; {
                                let {
                                    gvlid: i,
                                    modules: o
                                } = Te.o2.get(n);
                                if (null == i && Object.keys(o).length > 0)
                                    for (const r of Bt)
                                        if (o.hasOwnProperty(r)) {
                                            i = o[r], r !== e && (0, t.JE)(`Multiple GVL IDs found for module '${n}'; using the ${r} module's ID (${i}) instead of the ${e}'s ID (${o[e]})`);
                                            break
                                        }
                                return null == i && r && (i = r()), i || null
                            }
                        }
                        return null
                    }(o[Et.Dk], a, i(o));
                    let d = !!n(s, a, e);
                    if (!d) return r && r.add(a), {
                        allow: d
                    }
                }
            }
        }

        function Wt(e) {
            return Mt(e, ((t, n, r) => !!Nt(At.purpose[e], t, n, r)), arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => null)
        }

        function zt(e) {
            return function(t) {
                if (t[Et.Dk] !== ve.tp) return e(t)
            }
        }
        const Lt = (Vt = Wt(1, xt), function(e) {
            if (e[Et.Dk] !== ve.tp || jt) return Vt(e)
        });
        var Vt;
        const Ft = Wt(1, xt),
            Gt = Wt(1, xt),
            Ht = zt(Wt(2, Tt)),
            Jt = Wt(7, Ct, (e => function(e, n) {
                var r;
                const i = ne.Ay.getAnalyticsAdapter(e);
                return (r => {
                    if ("function" != typeof r) return r;
                    try {
                        return r.call(i.adapter, n)
                    } catch (n) {
                        (0, t.vV)(`Error invoking ${e} adapter.gvlid()`, n)
                    }
                })(null == i || null === (r = i.adapter) || void 0 === r ? void 0 : r.gvlid)
            }(e[Et.iK], e[Et.TQ]))),
            Kt = Wt(4, St),
            Qt = zt((() => {
                const e = Mt("2-10", (function(e, t, n) {
                        for (let o = 2; o <= 10; o++) {
                            var r, i;
                            if (null !== (r = At.purpose[o]) && void 0 !== r && null !== (r = r.vendorExceptions) && void 0 !== r && r.includes(t)) return !0;
                            const {
                                purpose: s,
                                vendor: a
                            } = qt(e, "purpose", o, n);
                            if (s && (a || null !== (i = At.purpose[o]) && void 0 !== i && null !== (i = i.softVendorExceptions) && void 0 !== i && i.includes(t))) return !0
                        }
                        return !1
                    }), kt),
                    t = Wt(4, kt);
                return function() {
                    var n;
                    return (null !== (n = At.purpose[4]) && void 0 !== n && n.eidsRequireP4Consent ? t : e).apply(this, arguments)
                }
            })()),
            Xt = Mt("Special Feature 1", ((e, t, n) => Nt(At.feature[1], e, t, n)), Dt);
        o.on(a.qY.AUCTION_END, (function() {
            const e = function(e) {
                    return Array.from(e.keys()).filter((e => null != e))
                },
                t = {
                    storageBlocked: e(xt),
                    biddersBlocked: e(Tt),
                    analyticsBlocked: e(Ct),
                    ufpdBlocked: e(St),
                    eidsBlocked: e(kt),
                    geoBlocked: e(Dt)
                };
            o.Ic(a.qY.TCF2_ENFORCEMENT, t), [xt, Tt, Ct, St, kt, Dt].forEach((e => e.clear()))
        })), A.$W.getConfig("consentManagement", (e => function(e) {
            let r = (0, n.A)(e, "gdpr.rules");
            r || (0, t.JE)("TCF2: enforcing P1 and P2 by default"), r = Object.fromEntries((r || []).map((e => [e.purpose, e]))), jt = !!(0, n.A)(e, "strictStorageEnforcement"), Object.entries(wt).forEach((e => {
                let [t, n] = e;
                At[n.type][n.id] = r[t] ? ? n.default
            })), Rt || (null != At.purpose[1] && (Rt = !0, Ut.push((0, ge.qB)(he.Ue, Pt, Lt)), Ut.push((0, ge.qB)(he.Ml, Pt, Ft)), Ut.push((0, ge.qB)(he.yl, Pt, Gt))), null != At.purpose[2] && Ut.push((0, ge.qB)(he.uc, Pt, Ht)), null != At.purpose[4] && Ut.push((0, ge.qB)(he.DL, Pt, Kt), (0, ge.qB)(he.qX, Pt, Kt)), null != At.purpose[7] && Ut.push((0, ge.qB)(he.mo, Pt, Jt)), null != At.feature[1] && Ut.push((0, ge.qB)(he.hE, Pt, Xt)), Ut.push((0, ge.qB)(he.hq, Pt, Qt)))
        }(e.consentManagement))), (0, e.E)("gdprEnforcement");
        var Yt = __webpack_require__(487),
            Zt = __webpack_require__(678),
            en = __webpack_require__(607);
        const tn = {
                1: "IAB20-3",
                2: "IAB18-5",
                3: "IAB10-1",
                4: "IAB2-3",
                5: "IAB19-8",
                6: "IAB22-1",
                7: "IAB18-1",
                8: "IAB12-3",
                9: "IAB5-1",
                10: "IAB4-5",
                11: "IAB13-4",
                12: "IAB8-7",
                13: "IAB9-7",
                14: "IAB7-1",
                15: "IAB20-18",
                16: "IAB10-7",
                17: "IAB19-18",
                18: "IAB13-6",
                19: "IAB18-4",
                20: "IAB1-5",
                21: "IAB1-6",
                22: "IAB3-4",
                23: "IAB19-13",
                24: "IAB22-2",
                25: "IAB3-9",
                26: "IAB17-18",
                27: "IAB19-6",
                28: "IAB1-7",
                29: "IAB9-30",
                30: "IAB20-7",
                31: "IAB20-17",
                32: "IAB7-32",
                33: "IAB16-5",
                34: "IAB19-34",
                35: "IAB11-5",
                36: "IAB12-3",
                37: "IAB11-4",
                38: "IAB12-3",
                39: "IAB9-30",
                41: "IAB7-44",
                42: "IAB7-1",
                43: "IAB7-30",
                50: "IAB19-30",
                51: "IAB17-12",
                52: "IAB19-30",
                53: "IAB3-1",
                55: "IAB13-2",
                56: "IAB19-30",
                57: "IAB19-30",
                58: "IAB7-39",
                59: "IAB22-1",
                60: "IAB7-39",
                61: "IAB21-3",
                62: "IAB5-1",
                63: "IAB12-3",
                64: "IAB20-18",
                65: "IAB11-2",
                66: "IAB17-18",
                67: "IAB9-9",
                68: "IAB9-5",
                69: "IAB7-44",
                71: "IAB22-3",
                73: "IAB19-30",
                74: "IAB8-5",
                78: "IAB22-1",
                85: "IAB12-2",
                86: "IAB22-3",
                87: "IAB11-3",
                112: "IAB7-32",
                113: "IAB7-32",
                114: "IAB7-32",
                115: "IAB7-32",
                118: "IAB9-5",
                119: "IAB9-5",
                120: "IAB9-5",
                121: "IAB9-5",
                122: "IAB9-5",
                123: "IAB9-5",
                124: "IAB9-5",
                125: "IAB9-5",
                126: "IAB9-5",
                127: "IAB22-1",
                132: "IAB1-2",
                133: "IAB19-30",
                137: "IAB3-9",
                138: "IAB19-3",
                140: "IAB2-3",
                141: "IAB2-1",
                142: "IAB2-3",
                143: "IAB17-13",
                166: "IAB11-4",
                175: "IAB3-1",
                176: "IAB13-4",
                182: "IAB8-9",
                183: "IAB3-5"
            },
            nn = ["user.keywords"].concat(pe.flatMap((e => ["keywords", "content.keywords"].map((t => `${e}.${t}`)))));

        function rn(e) {
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
            return function() {
                const e = new Set;
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return n.filter((e => e)).flatMap((e => Array.isArray(e) ? e : e.split(","))).map((e => e.replace(/^\s*/, "").replace(/\s*$/, ""))).filter((e => e)).forEach((t => e.add(t))), Array.from(e.keys())
            }(...nn.map((t => (0, n.A)(e, t))), ...r)
        }
        const on = {
                526: "1plusX",
                527: "1plusX",
                541: "captify_segments",
                540: "perid"
            },
            sn = ["user.data"].concat(pe.map((e => `${e}.content.data`)));

        function an(e, n, r) {
            return null == n ? r : (0, t.O8)(n) ? n : (0, t.Et)(n) ? n.toString() : void(0, t.JE)("Unsuported type for param: " + e + " required type: String")
        }

        function dn(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "keywords";
            const r = [];
            return (0, t.bu)(e, ((e, i) => {
                if ((0, t.cy)(e)) {
                    let r = [];
                    (0, t.bu)(e, (e => {
                        ((e = an(n + "." + i, e)) || "" === e) && r.push(e)
                    })), e = r
                } else {
                    if (e = an(n + "." + i, e), !(0, t.O8)(e)) return;
                    e = [e]
                }
                e = e.filter((e => "" !== e));
                const o = {
                    key: i
                };
                e.length > 0 && (o.value = e), r.push(o)
            })), r
        }

        function cn(e) {
            const t = {};
            return e.forEach((e => {
                if (-1 !== e.indexOf("=")) {
                    let n = e.split("="),
                        r = n[0],
                        i = n[1];
                    t.hasOwnProperty(r) ? t[r].push(i) : t[r] = [i]
                } else t.hasOwnProperty(e) || (t[e] = [])
            })), t
        }

        function ln() {
            for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
            return dn((0, t.D9)(...n.map((e => Object.fromEntries(Object.entries(e || {}).map((e => {
                let [n, r] = e;
                return [n, (0, t.Et)(r) || (0, t.O8)(r) ? [r] : r]
            })))))))
        }

        function un(e) {
            return e.replace(/(?:^|\.?)([A-Z])/g, (function(e, t) {
                return "_" + t.toLowerCase()
            })).replace(/^_/, "")
        }

        function pn(e, n) {
            return Object.keys(e).forEach((r => {
                var i, o;
                n[r] && ((0, t.fp)(e[r]) ? n[r] = e[r](n[r]) : n[r] = (i = e[r], o = n[r], "string" === i ? o && o.toString() : "number" === i ? Number(o) : o), isNaN(n[r]) && delete n.key)
            })), n
        }

        function fn(e, t) {
            let n = [];
            for (let r = 0; r < Math.ceil(e.length / t); r++) {
                let i = r * t,
                    o = i + t;
                n.push(e.slice(i, o))
            }
            return n
        }
        const mn = "appnexus",
            gn = ["id", "minduration", "maxduration", "skippable", "playback_method", "frameworks", "context", "skipoffset"],
            bn = ["minduration", "maxduration", "skip", "skipafter", "playbackmethod", "api", "startdelay", "placement", "plcmt"],
            hn = ["age", "externalUid", "external_uid", "segments", "gender", "dnt", "language"],
            vn = ["geo", "device_id"],
            yn = ["enabled", "dongle", "member_id", "debug_timeout"],
            _n = {
                apn_debug_dongle: "dongle",
                apn_debug_member_id: "member_id",
                apn_debug_timeout: "debug_timeout"
            },
            In = {
                playback_method: {
                    unknown: 0,
                    auto_play_sound_on: 1,
                    auto_play_sound_off: 2,
                    click_to_play: 3,
                    mouse_over: 4,
                    auto_play_sound_unknown: 5
                },
                context: {
                    unknown: 0,
                    pre_roll: 1,
                    mid_roll: 2,
                    post_roll: 3,
                    outstream: 4,
                    "in-banner": 5,
                    "in-feed": 6,
                    interstitial: 7,
                    accompanying_content_pre_roll: 8,
                    accompanying_content_mid_roll: 9,
                    accompanying_content_post_roll: 10
                }
            },
            En = {
                body: "description",
                body2: "desc2",
                cta: "ctatext",
                image: {
                    serverName: "main_image",
                    requiredParams: {
                        required: !0
                    }
                },
                icon: {
                    serverName: "icon",
                    requiredParams: {
                        required: !0
                    }
                },
                sponsoredBy: "sponsored_by",
                privacyLink: "privacy_link",
                salePrice: "saleprice",
                displayUrl: "displayurl"
            },
            An = /\/\/cdn\.adnxs\.com\/v|\/\/cdn\.adnxs\-simple\.com\/v/,
            On = (0, te.vM)({
                bidderCode: mn
            }),
            wn = {
                code: mn,
                gvlid: 32,
                aliases: [{
                    code: "appnexusAst",
                    gvlid: 32
                }, {
                    code: "emxdigital",
                    gvlid: 183
                }, {
                    code: "emetriq",
                    gvlid: 213
                }, {
                    code: "pagescience",
                    gvlid: 32
                }, {
                    code: "gourmetads",
                    gvlid: 32
                }, {
                    code: "matomy",
                    gvlid: 32
                }, {
                    code: "featureforward",
                    gvlid: 32
                }, {
                    code: "oftmedia",
                    gvlid: 32
                }, {
                    code: "adasta",
                    gvlid: 32
                }, {
                    code: "beintoo",
                    gvlid: 618
                }, {
                    code: "projectagora",
                    gvlid: 1032
                }, {
                    code: "uol",
                    gvlid: 32
                }, {
                    code: "adzymic",
                    gvlid: 723
                }],
                supportedMediaTypes: [O.D4, O.G_, O.s6],
                isBidRequestValid: function(e) {
                    return !!(e.params.placementId || e.params.placement_id || e.params.member && (e.params.invCode || e.params.inv_code))
                },
                buildRequests: function(e, r) {
                    var i, o;
                    const a = (e = (0, s.Xj)(e)).map(xn),
                        d = (0, c.I6)(e, Cn);
                    let l = {};
                    !0 === A.$W.getConfig("coppa") && (l = {
                        coppa: !0
                    }), d && Object.keys(d.params.user).filter((e => (0, c.mK)(hn, e))).forEach((e => {
                        let n = un(e);
                        if ("segments" === e && (0, t.cy)(d.params.user[e])) {
                            let r = [];
                            d.params.user[e].forEach((e => {
                                (0, t.Et)(e) ? r.push({
                                    id: e
                                }): (0, t.Qd)(e) && r.push(e)
                            })), l[n] = r
                        } else "segments" !== e && (l[n] = d.params.user[e])
                    }));
                    const u = (0, c.I6)(e, kn);
                    let p;
                    u && u.params && u.params.app && (p = {}, Object.keys(u.params.app).filter((e => (0, c.mK)(vn, e))).forEach((e => p[e] = u.params.app[e])));
                    const f = (0, c.I6)(e, Dn);
                    let m;
                    f && f.params && u.params.app && u.params.app.id && (m = {
                        appid: f.params.app.id
                    });
                    let g = {},
                        b = {};
                    const h = On.getCookie("apn_prebid_debug") || null;
                    if (h) try {
                        g = JSON.parse(h)
                    } catch (e) {
                        (0, t.vV)("AppNexus Debug Auction Cookie Error:\n\n" + e)
                    } else {
                        Object.keys(_n).forEach((e => {
                            let n = (0, t.Ez)(e);
                            (0, t.O8)(n) && "" !== n && (g[_n[e]] = n, g.enabled = !0)
                        })), g = pn({
                            member_id: "number",
                            debug_timeout: "number"
                        }, g);
                        const n = (0, c.I6)(e, Rn);
                        n && n.debug && (g = n.debug)
                    }
                    g && g.enabled && Object.keys(g).filter((e => (0, c.mK)(yn, e))).forEach((e => {
                        b[e] = g[e]
                    }));
                    const v = (0, c.I6)(e, Sn),
                        y = v ? parseInt(v.params.member, 10) : 0,
                        _ = e[0].schain,
                        I = (0, c.I6)(e, Bn),
                        E = {
                            tags: [...a],
                            user: l,
                            sdk: {
                                source: "pbjs",
                                version: "8.51.0"
                            },
                            schain: _
                        };
                    I && (E.iab_support = {
                        omidpn: "Appnexus",
                        omidpv: "8.51.0"
                    }), y > 0 && (E.member_id = y), u && (E.device = p), f && (E.app = m);
                    let O = function(e) {
                        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                        return ln(function(e) {
                            return cn(rn(e))
                        }(e), function(e) {
                            let t = {};
                            return sn.forEach((r => {
                                ((0, n.A)(e, r) || []).forEach((e => {
                                    const r = on[(0, n.A)(e, "ext.segtax")];
                                    r && e.segment.forEach((e => {
                                        t[r] ? t[r].push(e.id) : t[r] = [e.id]
                                    }))
                                }))
                            })), t
                        }(e), ...r)
                    }((0, t.Go)(r && r.ortb2), (0, t.Go)(A.$W.getConfig("appnexusAuctionKeywords")) || {});
                    if (O.length > 0 && (E.keywords = O), A.$W.getConfig("adpod.brandCategoryExclusion") && (E.brand_category_uniqueness = !0), b.enabled && (E.debug = b, (0, t.fH)("AppNexus Debug Auction Settings:\n\n" + JSON.stringify(b, null, 4))), r && r.gdprConsent && (E.gdpr_consent = {
                            consent_string: r.gdprConsent.consentString,
                            consent_required: r.gdprConsent.gdprApplies
                        }, r.gdprConsent.addtlConsent && -1 !== r.gdprConsent.addtlConsent.indexOf("~"))) {
                        let e = r.gdprConsent.addtlConsent,
                            t = e.substring(e.indexOf("~") + 1);
                        E.gdpr_consent.addtl_consent = t.split(".").map((e => parseInt(e, 10)))
                    }
                    if (r && r.uspConsent && (E.us_privacy = r.uspConsent), null != r && r.gppConsent ? E.privacy = {
                            gpp: r.gppConsent.gppString,
                            gpp_sid: r.gppConsent.applicableSections
                        } : null != r && null !== (i = r.ortb2) && void 0 !== i && null !== (i = i.regs) && void 0 !== i && i.gpp && (E.privacy = {
                            gpp: r.ortb2.regs.gpp,
                            gpp_sid: r.ortb2.regs.gpp_sid
                        }), r && r.refererInfo) {
                        let e = {
                                rd_ref: encodeURIComponent(r.refererInfo.topmostLocation),
                                rd_top: r.refererInfo.reachedTop,
                                rd_ifs: r.refererInfo.numIframes,
                                rd_stk: r.refererInfo.stack.map((e => encodeURIComponent(e))).join(",")
                            },
                            n = r.refererInfo.canonicalUrl;
                        (0, t.O8)(n) && "" !== n && (e.rd_can = n), E.referrer_detection = e
                    }
                    if ((0, c.I6)(e, jn) && e.filter(jn).forEach((e => {
                            const n = function(e, n) {
                                    const {
                                        durationRangeSec: r,
                                        requireExactDuration: i
                                    } = n.mediaTypes.video, o = function(e) {
                                        const {
                                            adPodDurationSec: t,
                                            durationRangeSec: n,
                                            requireExactDuration: r
                                        } = e, i = Math.min(...n), o = Math.floor(t / i);
                                        return r ? Math.max(o, n.length) : o
                                    }(n.mediaTypes.video), s = Math.max(...r);
                                    let a = function(e, n) {
                                        let r = [];
                                        for (let i = 0; i < n; i++) {
                                            let n = (0, t.Qd)(e) ? (0, t.Go)(e) : e;
                                            r.push(n)
                                        }
                                        return r
                                    }(...e.filter((e => e.uuid === n.bidId)), o);
                                    if (i) {
                                        const e = fn(a, Math.ceil(o / r.length));
                                        r.forEach(((t, n) => {
                                            e[n].map((e => {
                                                Pn(e, "minduration", t), Pn(e, "maxduration", t)
                                            }))
                                        }))
                                    } else a.map((e => Pn(e, "maxduration", s)));
                                    return a
                                }(a, e),
                                r = E.tags.filter((t => t.uuid !== e.bidId));
                            E.tags = [...r, ...n]
                        })), e[0].userId) {
                        let t = [];
                        e[0].userIdAsEids.forEach((e => {
                            !e || !e.uids || e.uids.length < 1 || e.uids.forEach((n => {
                                let r = {
                                    source: e.source,
                                    id: n.id
                                };
                                "adserver.org" == e.source ? r.rti_partner = "TDID" : "uidapi.com" == e.source && (r.rti_partner = "UID2"), t.push(r)
                            }))
                        })), t.length && (E.eids = t)
                    }
                    if (null != r && null !== (o = r.ortb2) && void 0 !== o && null !== (o = o.regs) && void 0 !== o && null !== (o = o.ext) && void 0 !== o && o.dsa) {
                        const e = r.ortb2.regs.ext.dsa,
                            n = {};
                        if (["dsarequired", "pubrender", "datatopub"].forEach((r => {
                                (0, t.Et)(e[r]) && (n[r] = e[r])
                            })), (0, t.cy)(e.transparency) && e.transparency.every((e => (0, t.Qd)(e)))) {
                            const r = [];
                            e.transparency.forEach((e => {
                                (0, t.O8)(e.domain) && "" != e.domain && (0, t.cy)(e.dsaparams) && e.dsaparams.every((e => (0, t.Et)(e))) && r.push(e)
                            })), r.length > 0 && (n.transparency = r)
                        }(0, t.Im)(n) || (E.dsa = n)
                    }
                    a[0].publisher_id && (E.publisher_id = a[0].publisher_id);
                    const w = function(e, n) {
                        let r = [],
                            i = {
                                withCredentials: !0
                            },
                            o = "https://ib.adnxs.com/ut/v3/prebid";
                        if ((0, en.C)(null == n ? void 0 : n.gdprConsent) || (o = "https://ib.adnxs-simple.com/ut/v3/prebid"), "TRUE" !== (0, t.Ez)("apn_test").toUpperCase() && !0 !== A.$W.getConfig("apn_test") || (i.customHeaders = {
                                "X-Is-Test": 1
                            }), e.tags.length > 15) {
                            const s = (0, t.Go)(e);
                            fn(e.tags, 15).forEach((e => {
                                s.tags = e;
                                const t = JSON.stringify(s);
                                r.push({
                                    method: "POST",
                                    url: o,
                                    data: t,
                                    bidderRequest: n,
                                    options: i
                                })
                            }))
                        } else {
                            const t = JSON.stringify(e);
                            r = {
                                method: "POST",
                                url: o,
                                data: t,
                                bidderRequest: n,
                                options: i
                            }
                        }
                        return r
                    }(E, r);
                    return w
                },
                interpretResponse: function(e, r) {
                    let {
                        bidderRequest: i
                    } = r;
                    e = e.body;
                    const o = [];
                    if (!e || e.error) {
                        let n = `in response for ${i.bidderCode} adapter`;
                        return e && e.error && (n += `: ${e.error}`), (0, t.vV)(n), o
                    }
                    if (e.tags && e.tags.forEach((e => {
                            const r = (s = e) && s.ads && s.ads.length && (0, c.I6)(s.ads, (e => e.rtb));
                            var s;
                            if (r && (!0 === x.u.get(i.bidderCode, "allowZeroCpmBids") ? r.cpm >= 0 : r.cpm > 0) && (0, c.mK)(this.supportedMediaTypes, r.ad_type)) {
                                const s = function(e, r, i) {
                                    const o = (0, t.D4)(e.uuid, [i]),
                                        s = (0, t.s0)(),
                                        a = {
                                            adId: s,
                                            requestId: e.uuid,
                                            cpm: r.cpm,
                                            creativeId: r.creative_id,
                                            dealId: r.deal_id,
                                            currency: r.publisher_currency_codename || "USD",
                                            netRevenue: !0,
                                            ttl: 300,
                                            adUnitCode: o.adUnitCode,
                                            appnexus: {
                                                buyerMemberId: r.buyer_member_id,
                                                dealPriority: r.deal_priority,
                                                dealCode: r.deal_code
                                            }
                                        };
                                    if (r.adomain && (a.meta = Object.assign({}, a.meta, {
                                            advertiserDomains: [r.adomain]
                                        })), r.advertiser_id && (a.meta = Object.assign({}, a.meta, {
                                            advertiserId: r.advertiser_id
                                        })), r.dsa && (a.meta = Object.assign({}, a.meta, {
                                            dsa: r.dsa
                                        })), r.buyer_member_id && (a.meta = Object.assign({}, a.meta, {
                                            dchain: function(e) {
                                                return {
                                                    ver: "1.0",
                                                    complete: 0,
                                                    nodes: [{
                                                        bsid: e.buyer_member_id.toString()
                                                    }]
                                                }
                                            }(r)
                                        })), r.brand_id && (a.meta = Object.assign({}, a.meta, {
                                            brandId: r.brand_id
                                        })), r.rtb.video) switch (Object.assign(a, {
                                        width: r.rtb.video.player_width,
                                        height: r.rtb.video.player_height,
                                        vastImpUrl: r.notify_url,
                                        ttl: 3600
                                    }), (0, n.A)(o, "mediaTypes.video.context")) {
                                        case O.LM:
                                            const o = tn[r.brand_category_id] ? tn[r.brand_category_id] : null;
                                            a.meta = Object.assign({}, a.meta, {
                                                primaryCatId: o
                                            });
                                            const s = r.deal_priority;
                                            a.video = {
                                                context: O.LM,
                                                durationSeconds: Math.floor(r.rtb.video.duration_ms / 1e3),
                                                dealTier: s
                                            }, a.vastUrl = r.rtb.video.asset_url;
                                            break;
                                        case Ce.H6:
                                            if (a.adResponse = e, a.adResponse.ad = a.adResponse.ads[0], a.adResponse.ad.video = a.adResponse.ad.rtb.video, a.vastXml = r.rtb.video.content, r.renderer_url) {
                                                const o = (0, c.I6)(i.bids, (t => t.bidId === e.uuid));
                                                let s = (0, n.A)(o, "mediaTypes.video.renderer.options");
                                                s || (s = (0, n.A)(o, "renderer.options")), a.renderer = function(e, n) {
                                                    let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                                    const i = Yt.A4.install({
                                                        id: n.renderer_id,
                                                        url: n.renderer_url,
                                                        config: r,
                                                        loaded: !1,
                                                        adUnitCode: e
                                                    });
                                                    try {
                                                        i.setRender(Un)
                                                    } catch (e) {
                                                        (0, t.JE)("Prebid Error calling setRender on renderer", e)
                                                    }
                                                    return i.setEventHandlers({
                                                        impression: () => (0, t.OG)("AppNexus outstream video impression event"),
                                                        loaded: () => (0, t.OG)("AppNexus outstream video loaded event"),
                                                        ended: () => {
                                                            (0, t.OG)("AppNexus outstream renderer video event"), document.querySelector(`#${e}`).style.display = "none"
                                                        }
                                                    }), i
                                                }(a.adUnitCode, r, s)
                                            }
                                            break;
                                        case Ce.mn:
                                            a.vastUrl = r.notify_url + "&redir=" + encodeURIComponent(r.rtb.video.asset_url)
                                    } else if (r.rtb[O.s6]) {
                                        const e = r.rtb[O.s6];
                                        let n;
                                        if (function(e) {
                                                if (!e || "" === e) return !1;
                                                let t = e.match(An),
                                                    n = null != t && t.length >= 1,
                                                    r = e.match("trk.js"),
                                                    i = null != r && r.length >= 1;
                                                return e.startsWith("<script") && i && n
                                            }(r.viewability.config)) {
                                            let e = "pbjs_adid=" + s + ";pbjs_auc=" + o.adUnitCode;
                                            n = r.viewability.config.replace("dom_id=%native_dom_id%", e)
                                        }
                                        let i = e.javascript_trackers;
                                        null == i ? i = n : (0, t.O8)(i) ? i = [i, n] : i.push(n), a[O.s6] = {
                                            title: e.title,
                                            body: e.desc,
                                            body2: e.desc2,
                                            cta: e.ctatext,
                                            rating: e.rating,
                                            sponsoredBy: e.sponsored,
                                            privacyLink: e.privacy_link,
                                            address: e.address,
                                            downloads: e.downloads,
                                            likes: e.likes,
                                            phone: e.phone,
                                            price: e.price,
                                            salePrice: e.saleprice,
                                            clickUrl: e.link.url,
                                            displayUrl: e.displayurl,
                                            clickTrackers: e.link.click_trackers,
                                            impressionTrackers: e.impression_trackers,
                                            video: e.video,
                                            javascriptTrackers: i
                                        }, e.main_img && (a.native.image = {
                                            url: e.main_img.url,
                                            height: e.main_img.height,
                                            width: e.main_img.width
                                        }), e.icon && (a.native.icon = {
                                            url: e.icon.url,
                                            height: e.icon.height,
                                            width: e.icon.width
                                        })
                                    } else {
                                        Object.assign(a, {
                                            width: r.rtb.banner.width,
                                            height: r.rtb.banner.height,
                                            ad: r.rtb.banner.content
                                        });
                                        try {
                                            if (r.rtb.trackers)
                                                for (let e = 0; e < r.rtb.trackers[0].impression_urls.length; e++) {
                                                    const n = r.rtb.trackers[0].impression_urls[e],
                                                        i = (0, t.Tz)(n);
                                                    a.ad += i
                                                }
                                        } catch (e) {
                                            (0, t.vV)("Error appending tracking pixel", e)
                                        }
                                    }
                                    return a
                                }(e, r, i);
                                s.mediaType = function(e) {
                                    const t = e.ad_type;
                                    return t === O.G_ ? O.G_ : t === O.s6 ? O.s6 : O.D4
                                }(r), o.push(s)
                            }
                        })), e.debug && e.debug.debug_info) {
                        let n = "AppNexus Debug Auction for Prebid\n\n" + e.debug.debug_info;
                        n = n.replace(/(<td>|<th>)/gm, "\t").replace(/(<\/td>|<\/th>)/gm, "\n").replace(/^<br>/gm, "").replace(/(<br>\n|<br>)/gm, "\n").replace(/<h1>(.*)<\/h1>/gm, "\n\n===== $1 =====\n\n").replace(/<h[2-6]>(.*)<\/h[2-6]>/gm, "\n\n*** $1 ***\n\n").replace(/(<([^>]+)>)/gim, ""), (0, t.OG)("https://console.appnexus.com/docs/understanding-the-debug-auction"), (0, t.OG)(n)
                    }
                    return o
                },
                getUserSyncs: function(e, t, n, r, i) {
                    if (e.iframeEnabled && (0, en.C)(n)) return [{
                        type: "iframe",
                        url: "https://acdn.adnxs.com/dmp/async_usersync.html"
                    }]
                },
                transformBidParams: function(e, r, i, o) {
                    let s = dn;
                    if (!0 === r) {
                        let e = null,
                            r = A.$W.getConfig("s2sConfig");
                        (0, t.Qd)(r) ? e = (0, n.A)(r, "endpoint.p1Consent"): (0, t.cy)(r) && r.forEach((t => {
                            (0, c.mK)(t.bidders, i.bids[0].bidder) && (e = (0, n.A)(t, "endpoint.p1Consent"))
                        })), e && e.match("/openrtb2/prebid") && (s = qn)
                    }
                    return e = pn({
                        member: "string",
                        invCode: "string",
                        placementId: "number",
                        keywords: s,
                        publisherId: "number"
                    }, e), r && (Object.keys(e).forEach((t => {
                        let n = un(t);
                        n !== t && (e[n] = e[t], delete e[t])
                    })), e.use_pmt_rule = "boolean" == typeof e.use_payment_rule && e.use_payment_rule, e.use_payment_rule && delete e.use_payment_rule), e
                }
            };

        function xn(e) {
            var r;
            const i = {};
            Object.keys(e.params).forEach((t => {
                let n = un(t);
                n !== t && (e.params[n] = e.params[t], delete e.params[t])
            })), i.sizes = Tn(e.sizes), i.primary_size = i.sizes[0], i.ad_types = [], i.uuid = e.bidId, e.params.placement_id ? i.id = parseInt(e.params.placement_id, 10) : i.code = e.params.inv_code;
            const o = (0, t.Ez)("ast_override_div");
            if ((0, t.O8)(o) && "" !== o) {
                const t = o.split(",").find((t => t.startsWith(`${e.adUnitCode}:`)));
                if (t) {
                    const e = t.split(":")[1];
                    e && (i.force_creative_id = parseInt(e, 10))
                }
            }
            i.allow_smaller_sizes = e.params.allow_smaller_sizes || !1, i.use_pmt_rule = "boolean" == typeof e.params.use_payment_rule ? e.params.use_payment_rule : "boolean" == typeof e.params.use_pmt_rule && e.params.use_pmt_rule, i.prebid = !0, i.disable_psa = !0;
            let s = function(e) {
                if (!(0, t.fp)(e.getFloor)) return e.params.reserve ? e.params.reserve : null;
                let n = e.getFloor({
                    currency: "USD",
                    mediaType: "*",
                    size: "*"
                });
                return (0, t.Qd)(n) && !isNaN(n.floor) && "USD" === n.currency ? n.floor : null
            }(e);
            if (s && (i.reserve = s), e.params.position) i.position = {
                above: 1,
                below: 2
            }[e.params.position] || 0;
            else {
                let t = (0, n.A)(e, "mediaTypes.banner.pos") || (0, n.A)(e, "mediaTypes.video.pos");
                0 !== t && 1 !== t && 3 !== t || (i.position = 3 === t ? 2 : t)
            }
            e.params.traffic_source_code && (i.traffic_source_code = e.params.traffic_source_code), e.params.private_sizes && (i.private_sizes = Tn(e.params.private_sizes)), e.params.supply_type && (i.supply_type = e.params.supply_type), e.params.pub_click && (i.pubclick = e.params.pub_click), e.params.ext_inv_code && (i.ext_inv_code = e.params.ext_inv_code), e.params.publisher_id && (i.publisher_id = parseInt(e.params.publisher_id, 10)), e.params.external_imp_id && (i.external_imp_id = e.params.external_imp_id);
            const a = ln((d = (0, n.A)(e, "ortb2Imp.ext.data.keywords"), (0, t.O8)(d) && "" !== d ? cn(d.split(/\s*(?:,)\s*/)) : {}), null === (r = e.params) || void 0 === r ? void 0 : r.keywords);
            var d;
            a.length > 0 && (i.keywords = a);
            let l = (0, n.A)(e, "ortb2Imp.ext.gpid") || (0, n.A)(e, "ortb2Imp.ext.data.pbadslot");
            if (l && (i.gpid = l), (e.mediaType === O.s6 || (0, n.A)(e, `mediaTypes.${O.s6}`)) && (i.ad_types.push(O.s6), 0 === i.sizes.length && (i.sizes = Tn([1, 1])), e.nativeParams)) {
                const n = function(e) {
                    const n = {};
                    return Object.keys(e).forEach((r => {
                        const i = En[r] && En[r].serverName || En[r] || r,
                            o = En[r] && En[r].requiredParams;
                        if (n[i] = Object.assign({}, o, e[r]), (i === En.image.serverName || i === En.icon.serverName) && n[i].sizes) {
                            let e = n[i].sizes;
                            ((0, t.Uu)(e) || (0, t.cy)(e) && e.length > 0 && e.every((e => (0, t.Uu)(e)))) && (n[i].sizes = Tn(n[i].sizes))
                        }
                        i === En.privacyLink && (n.privacy_supported = !0)
                    })), n
                }(e.nativeParams);
                i[O.s6] = {
                    layouts: [n]
                }
            } {
                const r = (0, n.A)(e, `mediaTypes.${O.G_}`),
                    o = (0, n.A)(e, "mediaTypes.video.context");
                i.hb_source = r && "adpod" === o ? 7 : 1, (e.mediaType === O.G_ || r) && i.ad_types.push(O.G_), (e.mediaType === O.G_ || r && "outstream" !== o) && (i.require_asset_url = !0), e.params.video && (i.video = {}, Object.keys(e.params.video).filter((e => (0, c.mK)(gn, e))).forEach((n => {
                    switch (n) {
                        case "context":
                        case "playback_method":
                            let r = e.params.video[n];
                            r = (0, t.cy)(r) ? r[0] : r, i.video[n] = In[n][r];
                            break;
                        case "frameworks":
                            break;
                        default:
                            i.video[n] = e.params.video[n]
                    }
                })), e.params.video.frameworks && (0, t.cy)(e.params.video.frameworks) && (i.video_frameworks = e.params.video.frameworks)), r && (i.video = i.video || {}, Object.keys(r).filter((e => (0, c.mK)(bn, e))).forEach((e => {
                    switch (e) {
                        case "minduration":
                        case "maxduration":
                            "number" != typeof i.video[e] && (i.video[e] = r[e]);
                            break;
                        case "skip":
                            "boolean" != typeof i.video.skippable && (i.video.skippable = 1 === r[e]);
                            break;
                        case "skipafter":
                            "number" != typeof i.video.skipoffset && (i.video.skippoffset = r[e]);
                            break;
                        case "playbackmethod":
                            if ("number" != typeof i.video.playback_method) {
                                let n = r[e];
                                n = (0, t.cy)(n) ? n[0] : n, n >= 1 && n <= 4 && (i.video.playback_method = n)
                            }
                            break;
                        case "api":
                            if (!i.video_frameworks && (0, t.cy)(r[e])) {
                                let t = r[e].map((e => {
                                    let t = 4 === e ? 5 : 5 === e ? 4 : e;
                                    if (t >= 1 && t <= 5) return t
                                })).filter((e => e));
                                i.video_frameworks = t
                            }
                            break;
                        case "startdelay":
                        case "plcmt":
                        case "placement":
                            if ("number" != typeof i.video.context) {
                                const e = r.plcmt,
                                    t = r.placement,
                                    n = r.startdelay,
                                    o = function(e, t) {
                                        if (e)
                                            if (2 === e) {
                                                if (void 0 === t) return;
                                                if (0 === t) return "accompanying_content_pre_roll";
                                                if (-1 === t) return "accompanying_content_mid_roll";
                                                if (-2 === t) return "accompanying_content_post_roll"
                                            } else {
                                                if (3 === e) return "interstitial";
                                                if (4 === e) return "outstream"
                                            }
                                    }(e, n) || function(e) {
                                        if (e) return 2 === e ? "in-banner" : 3 === e ? "outstream" : 4 === e ? "in-feed" : 5 === e ? "intersitial" : void 0
                                    }(t) || function(e) {
                                        if (e) return 0 === e ? "pre_roll" : -1 === e ? "mid_roll" : -2 === e ? "post_roll" : void 0
                                    }(n);
                                i.video.context = In.context[o]
                            }
                    }
                }))), e.renderer && (i.video = Object.assign({}, i.video, {
                    custom_renderer_present: !0
                }))
            }
            return e.params.frameworks && (0, t.cy)(e.params.frameworks) && (i.banner_frameworks = e.params.frameworks), (0, n.A)(e, `mediaTypes.${O.D4}`) && i.ad_types.push(O.D4), 0 === i.ad_types.length && delete i.ad_types, i
        }

        function Tn(e) {
            let n = [],
                r = {};
            if ((0, t.cy)(e) && 2 === e.length && !(0, t.cy)(e[0])) r.width = parseInt(e[0], 10), r.height = parseInt(e[1], 10), n.push(r);
            else if ("object" == typeof e)
                for (let t = 0; t < e.length; t++) {
                    let i = e[t];
                    r = {}, r.width = parseInt(i[0], 10), r.height = parseInt(i[1], 10), n.push(r)
                }
            return n
        }

        function Cn(e) {
            return !!e.params.user
        }

        function Sn(e) {
            return !!parseInt(e.params.member, 10)
        }

        function kn(e) {
            if (e.params) return !!e.params.app
        }

        function Dn(e) {
            return e.params && e.params.app ? !!e.params.app.id : !!e.params.app
        }

        function Rn(e) {
            return !!e.debug
        }

        function jn(e) {
            return e.mediaTypes && e.mediaTypes.video && e.mediaTypes.video.context === O.LM
        }

        function Bn(e) {
            let n = !1;
            const r = e.params,
                i = e.params.video;
            return r.frameworks && (0, t.cy)(r.frameworks) && (n = (0, c.mK)(e.params.frameworks, 6)), !n && i && i.frameworks && (0, t.cy)(i.frameworks) && (n = (0, c.mK)(e.params.video.frameworks, 6)), n
        }

        function Pn(e, n, r) {
            (0, t.Im)(e.video) && (e.video = {}), e.video[n] = r
        }

        function Un(e, t) {
            ! function(e) {
                try {
                    const t = document.getElementById(e).querySelectorAll("div[id^='google_ads']");
                    t[0] && t[0].style.setProperty("display", "none")
                } catch (e) {}
            }(e.adUnitCode),
            function(e) {
                try {
                    const t = document.getElementById(e).querySelectorAll("script[id^='sas_script']");
                    t[0].nextSibling && "iframe" === t[0].nextSibling.localName && t[0].nextSibling.style.setProperty("display", "none")
                } catch (e) {}
            }(e.adUnitCode), e.renderer.push((() => {
                ((null == t ? void 0 : t.defaultView) || window).ANOutstreamVideo.renderAd({
                    tagId: e.adResponse.tag_id,
                    sizes: [e.getSize().split("x")],
                    targetId: e.adUnitCode,
                    uuid: e.adResponse.uuid,
                    adResponse: e.adResponse,
                    rendererOptions: e.renderer.getConfig()
                }, $n.bind(null, e))
            }))
        }

        function $n(e, t, n) {
            e.renderer.handleVideoEvent({
                id: t,
                eventName: n
            })
        }

        function qn(e) {
            let n = "";
            return Object.keys(e).forEach((r => {
                (0, t.O8)(e[r]) ? "" !== e[r] ? n += `${r}=${e[r]},` : n += `${r},`: (0, t.cy)(e[r]) && ("" === e[r][0] ? n += `${r},` : e[r].forEach((e => {
                    n += `${r}=${e},`
                })))
            })), n = n.substring(0, n.length - 1), n
        }(0, Zt.a$)(wn), (0, e.E)("appnexusBidAdapter");
        const Nn = new WeakMap;

        function Mn(e) {
            return (e = (0, t.kK)(e)).map((e => {
                const [t, n] = e.split("x");
                return {
                    w: parseInt(t, 10),
                    h: parseInt(n, 10)
                }
            }))
        }
        const Wn = new Set(["pos", "placement", "plcmt", "api", "mimes", "protocols", "playbackmethod", "minduration", "maxduration", "w", "h", "startdelay", "placement", "linearity", "skip", "skipmin", "skipafter", "minbitrate", "maxbitrate", "delivery", "playbackend"]),
            zn = {
                instream: 1
            },
            Ln = {
                1: O.D4,
                2: O.G_,
                4: O.s6
            },
            Vn = {
                [Xe]: {
                    fpd: {
                        priority: 99,
                        fn(e, n) {
                            (0, t.D9)(e, n.ortb2)
                        }
                    },
                    onlyOneClient: {
                        priority: -99,
                        fn: fe("ORTB request")
                    },
                    props: {
                        fn(e, n) {
                            Object.assign(e, {
                                id: e.id || (0, t.lk)(),
                                test: e.test || 0
                            });
                            const r = parseInt(n.timeout, 10);
                            isNaN(r) || (e.tmax = r)
                        }
                    }
                },
                [Ye]: {
                    fpd: {
                        priority: 99,
                        fn(e, n) {
                            (0, t.D9)(e, n.ortb2Imp)
                        }
                    },
                    id: {
                        fn(e, t) {
                            e.id = t.bidId
                        }
                    },
                    banner: {
                        fn: function(e, r, i) {
                            if (i.mediaType && i.mediaType !== O.D4) return;
                            const o = (0, n.A)(r, "mediaTypes.banner");
                            if (o) {
                                const n = {
                                    topframe: !0 === (0, t.al)() ? 0 : 1
                                };
                                o.sizes && (n.format = Mn(o.sizes)), o.hasOwnProperty("pos") && (n.pos = o.pos), e.banner = (0, t.D9)(n, e.banner)
                            }
                        }
                    },
                    pbadslot: {
                        fn(e) {
                            var t;
                            const n = null === (t = e.ext) || void 0 === t || null === (t = t.data) || void 0 === t ? void 0 : t.pbadslot;
                            var r;
                            n && "string" == typeof n || null === (r = e.ext) || void 0 === r || null === (r = r.data) || void 0 === r || delete r.pbadslot
                        }
                    }
                },
                [Ze]: {
                    mediaType: {
                        priority: 99,
                        fn: function(e, t, n) {
                            if (e.mediaType) return;
                            const r = n.mediaType;
                            if (!r && !Ln.hasOwnProperty(t.mtype)) throw new Error("Cannot determine mediaType for response");
                            e.mediaType = r || Ln[t.mtype]
                        }
                    },
                    banner: {
                        fn: function() {
                            let {
                                createPixel: e = (e => (0, t.Tz)(decodeURIComponent(e), t.Bk))
                            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return function(t, n) {
                                t.mediaType === O.D4 && (n.adm && n.nurl ? (t.ad = n.adm, t.ad += e(n.nurl)) : n.adm ? t.ad = n.adm : n.nurl && (t.adUrl = n.nurl))
                            }
                        }()
                    },
                    props: {
                        fn(e, t, n) {
                            var r, i;
                            Object.entries({
                                requestId: null === (r = n.bidRequest) || void 0 === r ? void 0 : r.bidId,
                                seatBidId: t.id,
                                cpm: t.price,
                                currency: n.ortbResponse.cur || n.currency,
                                width: t.w,
                                height: t.h,
                                dealId: t.dealid,
                                creative_id: t.crid,
                                creativeId: t.crid,
                                burl: t.burl,
                                ttl: t.exp || n.ttl,
                                netRevenue: n.netRevenue
                            }).filter((e => {
                                let [t, n] = e;
                                return void 0 !== n
                            })).forEach((t => {
                                let [n, r] = t;
                                return e[n] = r
                            })), e.meta || (e.meta = {}), t.adomain && (e.meta.advertiserDomains = t.adomain), null !== (i = t.ext) && void 0 !== i && i.dsa && (e.meta.dsa = t.ext.dsa)
                        }
                    }
                }
            };

        function Fn() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            const r = t.shift(),
                i = t.length > 1 ? Fn(...t) : t[0];
            return Object.fromEntries(Qe.map((e => [e, Object.assign({}, r[e], i[e])])))
        }

        function Gn() {
            let {
                context: e = {},
                processors: n = Hn,
                overrides: r = {},
                imp: i,
                request: o,
                bidResponse: s,
                response: a
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const d = new WeakMap;

            function c(e, t, i, o) {
                let s;
                return function() {
                    return null == s && (s = function() {
                        let s = i.bind(this, function(e) {
                            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (!Nn.has(e)) {
                                const t = Object.entries(e);
                                t.sort(((e, t) => (e = e[1].priority || 0) === (t = t[1].priority || 0) ? 0 : e > t ? -1 : 1)), Nn.set(e, t.map((e => {
                                    let [t, n] = e;
                                    return [t, n.fn]
                                })))
                            }
                            const n = Nn.get(e).filter((e => {
                                let [n] = e;
                                return !t.hasOwnProperty(n) || t[n]
                            })).map((function(e) {
                                let [n, r] = e;
                                return t.hasOwnProperty(n) ? t[n].bind(this, r) : r
                            }));
                            return function() {
                                const e = Array.from(arguments);
                                n.forEach((t => {
                                    t.apply(this, e)
                                }))
                            }
                        }(n()[e] || {}, r[e] || {}));
                        return t && (s = t.bind(this, s)),
                            function() {
                                try {
                                    return s.apply(this, arguments)
                                } catch (e) {
                                    o.call(this, e, ...arguments)
                                }
                            }
                    }()), s.apply(this, arguments)
                }
            }
            const l = c(Ye, i, (function(e, t, n) {
                    const r = {};
                    return e(r, t, n), r
                }), (function(e, n, r) {
                    (0, t.vV)("Error while converting bidRequest to ORTB imp; request skipped.", {
                        error: e,
                        bidRequest: n,
                        context: r
                    })
                })),
                u = c(Xe, o, (function(e, t, n, r) {
                    const i = {
                        imp: t
                    };
                    return e(i, n, r), i
                }), (function(e, n, r, i) {
                    throw (0, t.vV)("Error while converting to ORTB request", {
                        error: e,
                        imps: n,
                        bidderRequest: r,
                        context: i
                    }), e
                })),
                p = c(Ze, s, (function(e, t, n) {
                    const r = {};
                    return e(r, t, n), r
                }), (function(e, n, r) {
                    (0, t.vV)("Error while converting ORTB seatbid.bid to bidResponse; bid skipped.", {
                        error: e,
                        bid: n,
                        context: r
                    })
                })),
                f = c(et, a, (function(e, t, n, r) {
                    const i = {
                        bids: t
                    };
                    return e(i, n, r), i
                }), (function(e, n, r, i) {
                    throw (0, t.vV)("Error while converting from ORTB response", {
                        error: e,
                        bidResponses: n,
                        ortbResponse: r,
                        context: i
                    }), e
                }));
            return {
                toORTB(n) {
                    let {
                        bidderRequest: r,
                        bidRequests: i,
                        context: o = {}
                    } = n;
                    i = i || r.bids;
                    const s = {
                        req: Object.assign({
                            bidRequests: i
                        }, e, o),
                        imp: {}
                    };
                    s.req.impContext = s.imp;
                    const a = i.map((n => {
                            const i = Object.assign({
                                    bidderRequest: r,
                                    reqContext: s.req
                                }, e, o),
                                a = l(n, i);
                            if (null != a) {
                                if (a.hasOwnProperty("id")) return Object.assign(i, {
                                    bidRequest: n,
                                    imp: a
                                }), s.imp[a.id] = i, a;
                                (0, t.vV)("Converted ORTB imp does not specify an id, ignoring bid request", n, a)
                            }
                        })).filter(Boolean),
                        c = u(a, r, s.req);
                    return s.req.bidderRequest = r, null != c && d.set(c, s), c
                },
                fromORTB(e) {
                    let {
                        request: n,
                        response: r
                    } = e;
                    const i = d.get(n);
                    if (null == i) throw new Error("ortbRequest passed to `fromORTB` must be the same object returned by `toORTB`");

                    function o(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return Object.assign(e, {
                            ortbRequest: n
                        }, t, e)
                    }
                    const s = Object.fromEntries((n.imp || []).map((e => [e.id, e]))),
                        a = (r.seatbid || []).flatMap((e => (e.bid || []).map((n => {
                            if (s.hasOwnProperty(n.impid) && i.imp.hasOwnProperty(n.impid)) return p(n, o(i.imp[n.impid], {
                                imp: s[n.impid],
                                seatbid: e,
                                ortbResponse: r
                            }));
                            (0, t.vV)("ORTB response seatbid[].bid[].impid does not match any imp in request; ignoring bid", n)
                        })))).filter(Boolean);
                    return f(a, r, o(i.req))
                }
            }
        }
        Vn[Ye].native = {
            fn: function(e, n, r) {
                if (r.mediaType && r.mediaType !== O.s6) return;
                let i = n.nativeOrtbRequest;
                var o;
                i && (i = Object.assign({}, r.nativeRequest, i), null !== (o = i.assets) && void 0 !== o && o.length ? e.native = (0, t.D9)({}, {
                    request: JSON.stringify(i),
                    ver: i.ver
                }, e.native) : (0, t.JE)("mediaTypes.native is set, but no assets were specified. Native request skipped.", n))
            }
        }, Vn[Ze].native = {
            fn: function(e, n) {
                if (e.mediaType === O.s6) {
                    let r;
                    if (r = "string" == typeof n.adm ? JSON.parse(n.adm) : n.adm, !(0, t.Qd)(r) || !Array.isArray(r.assets)) throw new Error("ORTB native response contained no assets");
                    e.native = {
                        ortb: r
                    }
                }
            }
        }, Vn[Ye].video = {
            fn: function(e, r, i) {
                if (i.mediaType && i.mediaType !== O.G_) return;
                const o = (0, n.A)(r, "mediaTypes.video");
                if (!(0, t.Im)(o)) {
                    const n = Object.fromEntries(Object.entries(o).filter((e => {
                        let [t] = e;
                        return Wn.has(t)
                    })));
                    if (o.playerSize) {
                        const e = Mn(o.playerSize);
                        e.length > 1 && (0, t.JE)("video request specifies more than one playerSize; all but the first will be ignored"), Object.assign(n, e[0])
                    }
                    const r = zn[o.context];
                    null != r && (n.placement = r), e.video = (0, t.D9)(n, e.video)
                }
            }
        }, Vn[Ze].video = {
            fn: function(e, t, r) {
                e.mediaType === O.G_ && ((0, n.A)(r.imp, "video.w") && (0, n.A)(r.imp, "video.h") && ([e.playerWidth, e.playerHeight] = [r.imp.video.w, r.imp.video.h]), t.adm && (e.vastXml = t.adm), t.nurl && (e.vastUrl = t.nurl))
            }
        };
        const Hn = (0, t.Bj)((() => Fn(Vn, ot(tt))));

        function Jn(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function Kn(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Jn(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Jn(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }
        const Qn = {
            code: "openx",
            gvlid: 69,
            supportedMediaTypes: [O.D4, O.G_],
            isBidRequestValid: function(e) {
                const t = e.params.delDomain || e.params.platform;
                return n.A(e, "mediaTypes.banner") && t ? !!e.params.unit || n.A(e, "mediaTypes.banner.sizes.length") > 0 : !(!e.params.unit || !t)
            },
            buildRequests: function(e, t) {
                let r = e.filter((e => Zn(e))),
                    i = e.filter((e => function(e) {
                        return n.A(e, "mediaTypes.banner") || !Zn(e)
                    }(e))),
                    o = i.length ? [Yn(i, t, O.D4)] : [];
                return r.forEach((e => {
                    o.push(Yn([e], t, O.G_))
                })), o
            },
            interpretResponse: function(e, t) {
                return e.body || (e.body = {
                    nbr: 0
                }), Xn.fromORTB({
                    request: t.data,
                    response: e.body
                })
            },
            getUserSyncs: function(e, t, n, r) {
                if (e.iframeEnabled || e.pixelEnabled) {
                    let i = e.iframeEnabled ? "iframe" : "image",
                        o = [],
                        s = "https://u.openx.net/w/1.0/pd";
                    if (n && (o.push("gdpr=" + (n.gdprApplies ? 1 : 0)), o.push("gdpr_consent=" + encodeURIComponent(n.consentString || ""))), r && o.push("us_privacy=" + encodeURIComponent(r)), t.length > 0 && t[0].body && t[0].body.ext) {
                        const e = t[0].body.ext;
                        e.delDomain ? s = `https://${e.delDomain}/w/1.0/pd` : e.platform && o.push("ph=" + e.platform)
                    } else o.push("ph=2d1251ae-7f3a-47cf-bd2a-2f288854a0ba");
                    return [{
                        type: i,
                        url: `${s}${o.length>0?"?"+o.join("&"):""}`
                    }]
                }
            },
            transformBidParams: function(e, t) {
                return pn({
                    unit: "string",
                    customFloor: "number"
                }, e)
            }
        };
        (0, Zt.a$)(Qn);
        const Xn = Gn({
            context: {
                netRevenue: !0,
                ttl: 300
            },
            imp(e, n, i) {
                const o = e(n, i);
                return (0, t.D9)(o, {
                    tagid: n.params.unit,
                    ext: {
                        divid: n.adUnitCode
                    }
                }), n.params.customParams && r(o, "ext.customParams", n.params.customParams), n.params.customFloor && !o.bidfloor && (o.bidfloor = n.params.customFloor), o
            },
            request(e, n, i, o) {
                const s = e(n, i, o);
                (0, t.D9)(s, {
                    at: 1,
                    ext: {
                        bc: "hb_pb_ortb_2.0",
                        pv: "8.51.0"
                    }
                });
                const a = o.bidRequests[0];
                return a.params.coppa && r(s, "regs.coppa", 1), a.params.doNotTrack && r(s, "device.dnt", 1), a.params.platform && r(s, "ext.platform", a.params.platform), a.params.delDomain && r(s, "ext.delDomain", a.params.delDomain), a.params.response_template_name && r(s, "ext.response_template_name", a.params.response_template_name), a.params.test && (s.test = 1), s
            },
            bidResponse(e, t, r) {
                const i = e(t, r);
                t.ext && (i.meta.networkId = t.ext.dsp_id, i.meta.advertiserId = t.ext.buyer_id, i.meta.brandId = t.ext.brand_id);
                const {
                    ortbResponse: o
                } = r;
                return o.ext && o.ext.paf && (i.meta.paf = Object.assign({}, o.ext.paf), i.meta.paf.content_id = n.A(t, "ext.paf.content_id")), i
            },
            response(e, i, o, s) {
                const {
                    ortbRequest: a
                } = s;
                a.ext && (a.ext.delDomain && r(o, "ext.delDomain", a.ext.delDomain), a.ext.platform && r(o, "ext.platform", a.ext.platform));
                const d = e(i, o, s);
                let c = n.A(o, "ext.fledge_auction_configs");
                return c ? (c = Object.entries(c).map((e => {
                    var n;
                    let [r, i] = e;
                    return {
                        bidId: r,
                        config: (0, t.D9)(Object.assign({}, i), {
                            auctionSignals: {
                                ortb2Imp: null === (n = s.impContext[r]) || void 0 === n ? void 0 : n.imp
                            }
                        })
                    }
                })), {
                    bids: d.bids,
                    fledgeAuctionConfigs: c
                }) : d.bids
            },
            overrides: {
                imp: {
                    bidfloor(e, t, n, r) {
                        const i = {};
                        e(i, n, Kn(Kn({}, r), {}, {
                            currency: "USD"
                        })), "USD" === i.bidfloorcur && Object.assign(t, i)
                    },
                    video(e, t, n, r) {
                        {
                            let i = n.mediaTypes[O.G_];
                            i && (i = Object.assign({}, i, n.params.video), n = Kn(Kn({}, n), {}, {
                                mediaTypes: {
                                    [O.G_]: i
                                }
                            })), e(t, n, r)
                        }
                    }
                }
            }
        });

        function Yn(e, t, n) {
            return {
                method: "POST",
                url: A.$W.getConfig("openxOrtbUrl") || "https://rtb.openx.net/openrtbb/prebidjs",
                data: Xn.toORTB({
                    bidRequests: e,
                    bidderRequest: t,
                    context: {
                        mediaType: n
                    }
                })
            }
        }

        function Zn(e) {
            return n.A(e, "mediaTypes.video")
        }(0, e.E)("openxBidAdapter");
        const er = {
                [O.D4]: "banner",
                [O.s6]: "native",
                [O.G_]: "video"
            },
            tr = {
                [Xe]: {
                    extPrebid: {
                        fn: function(e, n) {
                            var i;
                            r(e, "ext.prebid", (0, t.D9)({
                                auctiontimestamp: n.auctionStart,
                                targeting: {
                                    includewinners: !0,
                                    includebidderkeys: !1
                                }
                            }, null === (i = e.ext) || void 0 === i ? void 0 : i.prebid)), A.$W.getConfig("debug") && (e.ext.prebid.debug = !0)
                        }
                    },
                    extPrebidChannel: {
                        fn: function(t) {
                            var n;
                            r(t, "ext.prebid.channel", Object.assign({
                                name: "pbjs",
                                version: (0, e.m)().version
                            }, null === (n = t.ext) || void 0 === n || null === (n = n.prebid) || void 0 === n ? void 0 : n.channel))
                        }
                    },
                    extPrebidAliases: {
                        fn: function(e, t, n) {
                            let {
                                am: i = ne.Ay
                            } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                            if (i.aliasRegistry[t.bidderCode]) {
                                const n = i.bidderRegistry[t.bidderCode];
                                n && n.getSpec().skipPbsAliasing || r(e, `ext.prebid.aliases.${t.bidderCode}`, i.aliasRegistry[t.bidderCode])
                            }
                        }
                    }
                },
                [Ye]: {
                    params: {
                        fn: function(e, t, n) {
                            let {
                                adUnit: i,
                                bidderRequests: o,
                                index: s = d.n.index,
                                bidderRegistry: a = ne.Ay.bidderRegistry
                            } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, c = t.params;
                            const l = a[t.bidder];
                            l && l.getSpec().transformBidParams && (i = i || s.getAdUnit(t), o = o || [n.bidderRequest], c = l.getSpec().transformBidParams(c, !0, i, o)), c && r(e, `ext.prebid.bidder.${t.bidder}`, c)
                        }
                    },
                    adUnitCode: {
                        fn: function(e, t) {
                            const n = t.adUnitCode;
                            n && r(e, "ext.prebid.adunitcode", n)
                        }
                    }
                },
                [Ze]: {
                    mediaType: {
                        fn: function(e, t, n) {
                            let r = n.mediaType;
                            var i;
                            r || (r = Ln.hasOwnProperty(t.mtype) ? Ln[t.mtype] : null === (i = t.ext) || void 0 === i || null === (i = i.prebid) || void 0 === i ? void 0 : i.type, er.hasOwnProperty(r) || (r = O.D4)), e.mediaType = r
                        },
                        priority: 99
                    },
                    videoCache: {
                        fn: function(e, t) {
                            if (e.mediaType === O.G_) {
                                let {
                                    cacheId: r,
                                    url: i
                                } = (0, n.A)(t, "ext.prebid.cache.vastXml") || {};
                                if (!r || !i) {
                                    const {
                                        hb_uuid: e,
                                        hb_cache_host: o,
                                        hb_cache_path: s
                                    } = (0, n.A)(t, "ext.prebid.targeting") || {};
                                    e && o && s && (r = e, i = `https://${o}${s}?uuid=${e}`)
                                }
                                r && i && Object.assign(e, {
                                    videoCacheKey: r,
                                    vastUrl: i
                                })
                            }
                        },
                        priority: -10
                    },
                    bidderCode: {
                        fn(e, t, r) {
                            var i;
                            e.bidderCode = r.seatbid.seat, e.adapterCode = (0, n.A)(t, "ext.prebid.meta.adaptercode") || (null === (i = r.bidRequest) || void 0 === i ? void 0 : i.bidder) || e.bidderCode
                        }
                    },
                    pbsBidId: {
                        fn(e, r) {
                            const i = (0, n.A)(r, "ext.prebid.bidid");
                            (0, t.O8)(i) && (e.pbsBidId = i)
                        }
                    },
                    adserverTargeting: {
                        fn(e, r) {
                            const i = (0, n.A)(r, "ext.prebid.targeting");
                            (0, t.Qd)(i) && (e.adserverTargeting = i)
                        }
                    },
                    extPrebidMeta: {
                        fn(e, r) {
                            e.meta = (0, t.D9)({}, (0, n.A)(r, "ext.prebid.meta"), e.meta)
                        }
                    },
                    pbsWurl: {
                        fn(e, r) {
                            const i = (0, n.A)(r, "ext.prebid.events.win");
                            (0, t.O8)(i) && (e.pbsWurl = i)
                        }
                    }
                },
                [et]: {
                    serverSideStats: {
                        fn(e, t, r) {
                            Object.entries({
                                errors: "serverErrors",
                                responsetimemillis: "serverResponseTimeMs"
                            }).forEach((e => {
                                let [i, o] = e;
                                const s = (0, n.A)(t, `ext.${i}.${r.bidderRequest.bidderCode}`);
                                s && (r.bidderRequest[o] = s, r.bidRequests.forEach((e => e[o] = s)))
                            }))
                        }
                    }
                }
            },
            nr = (0, t.Bj)((() => Fn(Hn(), tr, ot(nt))));

        function rr(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function ir(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? rr(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : rr(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }
        let or = A.$W.getConfig("rubicon") || {};
        A.$W.getConfig("rubicon", (e => {
            (0, t.D9)(or, e.rubicon)
        }));
        var sr = {
            1: "468x60",
            2: "728x90",
            5: "120x90",
            7: "125x125",
            8: "120x600",
            9: "160x600",
            10: "300x600",
            13: "200x200",
            14: "250x250",
            15: "300x250",
            16: "336x280",
            17: "240x400",
            19: "300x100",
            31: "980x120",
            32: "250x360",
            33: "180x500",
            35: "980x150",
            37: "468x400",
            38: "930x180",
            39: "750x100",
            40: "750x200",
            41: "750x300",
            42: "2x4",
            43: "320x50",
            44: "300x50",
            48: "300x300",
            53: "1024x768",
            54: "300x1050",
            55: "970x90",
            57: "970x250",
            58: "1000x90",
            59: "320x80",
            60: "320x150",
            61: "1000x1000",
            64: "580x500",
            65: "640x480",
            66: "930x600",
            67: "320x480",
            68: "1800x1000",
            72: "320x320",
            73: "320x160",
            78: "980x240",
            79: "980x300",
            80: "980x400",
            83: "480x300",
            85: "300x120",
            90: "548x150",
            94: "970x310",
            95: "970x100",
            96: "970x210",
            101: "480x320",
            102: "768x1024",
            103: "480x280",
            105: "250x800",
            108: "320x240",
            113: "1000x300",
            117: "320x100",
            125: "800x250",
            126: "200x600",
            144: "980x600",
            145: "980x150",
            152: "1000x250",
            156: "640x320",
            159: "320x250",
            179: "250x600",
            195: "600x300",
            198: "640x360",
            199: "640x200",
            213: "1030x590",
            214: "980x360",
            221: "1x1",
            229: "320x180",
            230: "2000x1400",
            232: "580x400",
            234: "6x6",
            251: "2x2",
            256: "480x820",
            257: "400x600",
            258: "500x200",
            259: "998x200",
            261: "480x480",
            264: "970x1000",
            265: "1920x1080",
            274: "1800x200",
            278: "320x500",
            282: "320x400",
            288: "640x380",
            484: "720x1280",
            524: "1x2",
            548: "500x1000",
            550: "980x480",
            552: "300x200",
            558: "640x640",
            562: "300x431",
            564: "320x431",
            566: "320x300",
            568: "300x150",
            570: "300x125",
            572: "250x350",
            574: "620x891",
            576: "610x877",
            578: "980x552",
            580: "505x656",
            622: "192x160",
            632: "1200x450",
            634: "340x450"
        };
        (0, t.bu)(sr, ((e, t) => sr[e] = t));
        const ar = Gn({
                request(n, i, o, s) {
                    var a;
                    const {
                        bidRequests: d
                    } = s, c = n(i, o, s);
                    c.cur = ["USD"], c.test = A.$W.getConfig("debug") ? 1 : 0, r(c, "ext.prebid.cache", {
                        vastxml: {
                            returnCreative: !0 === or.returnVast
                        }
                    }), r(c, "ext.prebid.bidders", {
                        rubicon: {
                            integration: or.int_type || "pbjs"
                        }
                    }), r(c, "ext.prebid.targeting.pricegranularity", function(e) {
                        return {
                            ranges: {
                                low: [{
                                    max: 5,
                                    increment: .5
                                }],
                                medium: [{
                                    max: 20,
                                    increment: .1
                                }],
                                high: [{
                                    max: 20,
                                    increment: .01
                                }],
                                auto: [{
                                    max: 5,
                                    increment: .05
                                }, {
                                    min: 5,
                                    max: 10,
                                    increment: .1
                                }, {
                                    min: 10,
                                    max: 20,
                                    increment: .5
                                }],
                                dense: [{
                                    max: 3,
                                    increment: .01
                                }, {
                                    min: 3,
                                    max: 8,
                                    increment: .05
                                }, {
                                    min: 8,
                                    max: 20,
                                    increment: .5
                                }],
                                custom: e.getConfig("customPriceBucket") && e.getConfig("customPriceBucket").buckets
                            }[e.getConfig("priceGranularity")]
                        }
                    }(A.$W));
                    let l = (0, e.m)().installedModules;
                    return !l || l.length && -1 === l.indexOf("rubiconAnalyticsAdapter") || r(c, "ext.prebid.analytics", {
                            rubicon: {
                                "client-analytics": !0
                            }
                        }),
                        function(e, n, i) {
                            var o;
                            let s = {};
                            const a = rn(i, ...n.map((e => e.params.keywords)));
                            n.forEach((n => {
                                const r = {
                                        user: {
                                            ext: {
                                                data: ir({}, n.params.visitor)
                                            }
                                        },
                                        site: {
                                            ext: {
                                                data: ir({}, n.params.inventory)
                                            }
                                        }
                                    },
                                    i = e.imp.find((e => {
                                        var t;
                                        return null === (t = e.ext) || void 0 === t || null === (t = t.prebid) || void 0 === t || null === (t = t.bidder) || void 0 === t || null === (t = t.rubicon) || void 0 === t || null === (t = t.video) || void 0 === t ? void 0 : t.language
                                    }));
                                var o;
                                i && (r.site.content = {
                                    language: null === (o = i.ext) || void 0 === o || null === (o = o.prebid) || void 0 === o || null === (o = o.bidder) || void 0 === o || null === (o = o.rubicon) || void 0 === o || null === (o = o.video) || void 0 === o ? void 0 : o.language
                                }), s = (0, t.D9)(s, n.ortb2 || {}, r);
                                const a = A.$W.getConfig("user.id");
                                s.user.id = s.user.id || a
                            })), (0, t.D9)(e, s), a && a.length && r(e, "site.keywords", a.join(",")), null == e || null === (o = e.ext) || void 0 === o || null === (o = o.prebid) || void 0 === o || delete o.storedrequest
                        }(c, d, o.ortb2), null == c || null === (a = c.ext) || void 0 === a || null === (a = a.prebid) || void 0 === a || delete a.storedrequest, !0 === or.disableFloors && delete c.ext.prebid.floors, d.filter((e => "object" == typeof e.floorData)).length > 0 && (c.ext.prebid.floors = {
                            enabled: !1
                        }), c
                },
                imp(e, t, i) {
                    var o;
                    const s = mr(t);
                    if (s.includes(O.D4) && 1 == s.length) return;
                    const a = e(t, i);
                    return a.id = t.adUnitCode, delete a.banner, "atf" === t.params.position && a.video && (a.video.pos = 1), "btf" === t.params.position && a.video && (a.video.pos = 3), null === (o = a.ext) || void 0 === o || null === (o = o.prebid) || void 0 === o || delete o.storedrequest, !0 === t.params.bidonmultiformat && s.length > 1 && r(a, "ext.prebid.bidder.rubicon.formats", s),
                        function(e, t) {
                            if ("USD" != t.bidfloorcur && (delete t.bidfloor, delete t.bidfloorcur), !t.bidfloor) {
                                let r = parseFloat((0, n.A)(e, "params.floor"));
                                isNaN(r) || (t.bidfloor = r, t.bidfloorcur = "USD")
                            }
                        }(t, a), a
                },
                bidResponse(e, i, o) {
                    var s;
                    const a = e(i, o);
                    a.meta.mediaType = (0, n.A)(i, "ext.prebid.type");
                    const {
                        bidRequest: d
                    } = o;
                    let [c, l] = "outstream" === (null === (s = d.mediaTypes.video) || void 0 === s ? void 0 : s.context) ? ur(d, O.G_): [void 0, void 0];
                    return a.width = i.w || c || a.playerWidth, a.height = i.h || l || a.playerHeight, a.mediaType === O.G_ && "outstream" === d.mediaTypes.video.context && (a.renderer = function(e) {
                        const n = Yt.A4.install({
                            id: e.adId,
                            url: or.rendererUrl || "https://video-outstream.rubiconproject.com/apex-2.2.1.js",
                            config: or.rendererConfig || {},
                            loaded: !1,
                            adUnitCode: e.adUnitCode
                        });
                        try {
                            n.setRender(lr)
                        } catch (e) {
                            (0, t.JE)("Prebid Error calling setRender on renderer", e)
                        }
                        return n
                    }(a)), (0, n.A)(i, "ext.bidder.rp.advid") && r(a, "meta.advertiserId", i.ext.bidder.rp.advid), a
                },
                context: {
                    netRevenue: !1 !== or.netRevenue,
                    ttl: 360
                },
                processors: nr
            }),
            dr = {
                code: "rubicon",
                gvlid: 52,
                supportedMediaTypes: [O.D4, O.G_, O.s6],
                isBidRequestValid: function(e) {
                    let r = !0;
                    if ("object" != typeof e.params) return !1;
                    for (let n = 0, r = ["accountId", "siteId", "zoneId"]; n < r.length; n++)
                        if (e.params[r[n]] = parseInt(e.params[r[n]]), isNaN(e.params[r[n]])) return (0, t.vV)("Rubicon: wrong format of accountId or siteId or zoneId."), !1;
                    let i = mr(e, !0);
                    if (!i.length) return !1;
                    i.includes(O.G_) && (r = function(e) {
                        let r = !0,
                            i = Object.prototype.toString.call([]);
                        var o = {
                            mimes: i,
                            protocols: i,
                            linearity: Object.prototype.toString.call(0)
                        };
                        return Object.keys(o).forEach((function(i) {
                            Object.prototype.toString.call((0, n.A)(e, "mediaTypes.video." + i)) !== o[i] && (r = !1, (0, t.vV)("Rubicon: mediaTypes.video." + i + " is required and must be of type: " + o[i]))
                        })), r
                    }(e));
                    const o = [O.D4, O.s6].filter((e => i.includes(e))).length > 0;
                    return o ? r && o : r
                },
                buildRequests: function(e, n) {
                    let r, i = [],
                        o = [];
                    if (r = e.filter((e => {
                            const t = mr(e) || [],
                                {
                                    length: n
                                } = t,
                                {
                                    bidonmultiformat: r,
                                    video: i
                                } = e.params || {};
                            return 1 === n && (t.includes(O.G_) || t.includes(O.s6)) || 2 === n && !t.includes(O.D4) || i && t.includes(O.G_) || r && (t.includes(O.G_) || t.includes(O.s6))
                        })), r && r.length) {
                        const e = ar.toORTB({
                            bidRequests: r,
                            bidderRequest: n
                        });
                        o.push({
                            method: "POST",
                            url: `https://${or.videoHost||"prebid-server"}.rubiconproject.com/openrtb2/auction`,
                            data: e,
                            bidRequest: r
                        })
                    }
                    const s = e.filter((e => {
                        const t = mr(e) || [],
                            {
                                bidonmultiformat: n,
                                video: r
                            } = e.params || {};
                        return t.includes(O.D4) && (1 === t.length || n || !n && !r || !n && r && !t.includes(O.G_))
                    }));
                    if (!0 !== or.singleRequest) i = o.concat(s.map((e => {
                        const r = dr.createSlotParams(e, n);
                        return {
                            method: "GET",
                            url: `https://${or.bannerHost||"fastlane"}.rubiconproject.com/a/api/fastlane.json`,
                            data: dr.getOrderedParams(r).reduce(((e, n) => {
                                const i = r[n];
                                return (0, t.O8)(i) && "" !== i || (0, t.Et)(i) ? `${e}${br(n,i)}&` : e
                            }), "") + `slots=1&rand=${Math.random()}`,
                            bidRequest: e
                        }
                    })));
                    else {
                        const e = s.reduce(((e, t) => ((e[t.params.siteId] = e[t.params.siteId] || []).push(t), e)), {}),
                            r = 10;
                        i = o.concat(Object.keys(e).reduce(((i, o) => {
                            var s, a;
                            return (s = e[o], a = r, s.map(((e, t) => t % a == 0 ? s.slice(t, t + a) : null)).filter((e => e))).forEach((e => {
                                const r = dr.combineSlotUrlParams(e.map((e => dr.createSlotParams(e, n))));
                                i.push({
                                    method: "GET",
                                    url: `https://${or.bannerHost||"fastlane"}.rubiconproject.com/a/api/fastlane.json`,
                                    data: dr.getOrderedParams(r).reduce(((e, n) => {
                                        const i = r[n];
                                        return (0, t.O8)(i) && "" !== i || (0, t.Et)(i) ? `${e}${br(n,i)}&` : e
                                    }), "") + `slots=${e.length}&rand=${Math.random()}`,
                                    bidRequest: e
                                })
                            })), i
                        }), []))
                    }
                    return i
                },
                getOrderedParams: function(e) {
                    const t = /^tg_v/,
                        n = /^tg_i/,
                        r = /^eid_|^tpid_/,
                        i = ["account_id", "site_id", "zone_id", "size_id", "alt_size_ids", "p_pos", "gdpr", "gdpr_consent", "us_privacy", "gpp", "gpp_sid", "rp_schain"].concat(Object.keys(e).filter((e => r.test(e)))).concat(["x_liverampidl", "ppuid", "rf", "p_geo.latitude", "p_geo.longitude", "kw"]).concat(Object.keys(e).filter((e => t.test(e)))).concat(Object.keys(e).filter((e => n.test(e)))).concat(["tk_flint", "x_source.tid", "l_pb_bid_id", "p_screen_res", "o_ae", "o_cdep", "rp_floor", "rp_secure", "tk_user_key"]);
                    return i.concat(Object.keys(e).filter((e => -1 === i.indexOf(e))))
                },
                combineSlotUrlParams: function(e) {
                    if (1 === e.length) return e[0];
                    const t = e.reduce((function(t, n, r) {
                            return Object.keys(n).forEach((function(i) {
                                t.hasOwnProperty(i) || (t[i] = new Array(e.length)), t[i].splice(r, 1, n[i])
                            })), t
                        }), {}),
                        n = new RegExp("^([^;]*)(;\\1)+$");
                    return Object.keys(t).forEach((function(e) {
                        const r = t[e].join(";"),
                            i = r.match(n);
                        t[e] = i ? i[1] : r
                    })), t
                },
                createSlotParams: function(e, r) {
                    var i, o, s, a, d;
                    e.startTime = (new Date).getTime();
                    const l = e.params,
                        u = ur(e, "banner"),
                        [p, f] = l.latLong || [],
                        m = {
                            account_id: l.accountId,
                            site_id: l.siteId,
                            zone_id: l.zoneId,
                            size_id: u[0],
                            alt_size_ids: u.slice(1).join(",") || void 0,
                            rp_floor: (l.floor = parseFloat(l.floor)) >= .01 ? l.floor : void 0,
                            rp_secure: "1",
                            tk_flint: `${or.int_type||"pbjs_lite"}_v8.51.0`,
                            "x_source.tid": null === (i = r.ortb2) || void 0 === i || null === (i = i.source) || void 0 === i ? void 0 : i.tid,
                            "x_imp.ext.tid": null === (o = e.ortb2Imp) || void 0 === o || null === (o = o.ext) || void 0 === o ? void 0 : o.tid,
                            l_pb_bid_id: e.bidId,
                            o_cdep: null === (s = e.ortb2) || void 0 === s || null === (s = s.device) || void 0 === s || null === (s = s.ext) || void 0 === s ? void 0 : s.cdep,
                            p_screen_res: [window.screen.width, window.screen.height].join("x"),
                            tk_user_key: l.userId,
                            "p_geo.latitude": isNaN(parseFloat(p)) ? void 0 : parseFloat(p).toFixed(4),
                            "p_geo.longitude": isNaN(parseFloat(f)) ? void 0 : parseFloat(f).toFixed(4),
                            "tg_fl.eid": e.code,
                            rf: cr(e, r)
                        };
                    if ("function" == typeof e.getFloor && !or.disableFloors) {
                        let n;
                        try {
                            n = e.getFloor({
                                currency: "USD",
                                mediaType: "banner",
                                size: "*"
                            })
                        } catch (e) {
                            (0, t.vV)("Rubicon: getFloor threw an error: ", e)
                        }
                        m.rp_hard_floor = "object" != typeof n || "USD" !== n.currency || isNaN(parseInt(n.floor)) ? void 0 : n.floor
                    }!0 === l.bidonmultiformat && (0, n.A)(e, "mediaTypes") && Object.keys(e.mediaTypes).length > 1 && (m.p_formats = Object.keys(e.mediaTypes).join(","));
                    let g = {
                        1: "atf",
                        3: "btf"
                    }[(0, n.A)(e, "mediaTypes.banner.pos")] || "";
                    m.p_pos = "atf" === l.position || "btf" === l.position ? l.position : g;
                    const b = A.$W.getConfig("user.id");
                    var h;
                    return b && (m.ppuid = b), null != e && null !== (a = e.ortb2Imp) && void 0 !== a && null !== (a = a.ext) && void 0 !== a && a.ae && (m.o_ae = 1),
                        function(e, t) {
                            var n, r, i, o;
                            if (!1 === or.readTopics) return;
                            let s = [1, 2, 5, 6, 7, 507].concat((null === (n = or.sendSiteSegtax) || void 0 === n ? void 0 : n.map((e => Number(e)))) || []),
                                a = [4, 508].concat((null === (r = or.sendUserSegtax) || void 0 === r ? void 0 : r.map((e => Number(e)))) || []),
                                d = (null === (i = e.ortb2) || void 0 === i || null === (i = i.user) || void 0 === i ? void 0 : i.data) || [],
                                c = (null === (o = e.ortb2) || void 0 === o || null === (o = o.site) || void 0 === o || null === (o = o.content) || void 0 === o ? void 0 : o.data) || [];
                            d.forEach(pr(t, "v", a)), c.forEach(pr(t, "i", s))
                        }(r, m), e.userIdAsEids && e.userIdAsEids.forEach((e => {
                            try {
                                if ("adserver.org" === e.source) m.tpid_tdid = e.uids[0].id, m["eid_adserver.org"] = e.uids[0].id;
                                else if ("liveintent.com" === e.source) m["tpid_liveintent.com"] = e.uids[0].id, m["eid_liveintent.com"] = e.uids[0].id, e.ext && Array.isArray(e.ext.segments) && e.ext.segments.length && (m["tg_v.LIseg"] = e.ext.segments.join(","));
                                else if ("liveramp.com" === e.source) m.x_liverampidl = e.uids[0].id;
                                else if ("id5-sync.com" === e.source) m["eid_id5-sync.com"] = `${e.uids[0].id}^${e.uids[0].atype}^${e.uids[0].ext&&e.uids[0].ext.linkType||""}`;
                                else {
                                    const t = "rubiconproject.com" === e.source ? e.uids[0].id : `${e.uids[0].id}^${e.uids[0].atype||""}`;
                                    m[`eid_${e.source}`] = t
                                }
                                if (!m.ppuid) {
                                    const t = (0, c.I6)(e.uids, (e => e.ext && "ppuid" === e.ext.stype));
                                    t && t.id && (m.ppuid = t.id)
                                }
                            } catch (n) {
                                (0, t.JE)("Rubicon: error reading eid:", e, n)
                            }
                        })), r.gdprConsent && ("boolean" == typeof r.gdprConsent.gdprApplies && (m.gdpr = Number(r.gdprConsent.gdprApplies)), m.gdpr_consent = r.gdprConsent.consentString), r.uspConsent && (m.us_privacy = encodeURIComponent(r.uspConsent)), null !== (d = r.gppConsent) && void 0 !== d && d.gppString && (m.gpp = r.gppConsent.gppString, m.gpp_sid = null === (h = r.gppConsent) || void 0 === h || null === (h = h.applicableSections) || void 0 === h ? void 0 : h.toString()), m.rp_maxbids = r.bidLimit || 1,
                        function(e, r, i) {
                            const o = {
                                user: {
                                    ext: {
                                        data: ir({}, e.params.visitor)
                                    }
                                },
                                site: {
                                    ext: {
                                        data: ir({}, e.params.inventory)
                                    }
                                }
                            };
                            e.params.keywords && (o.site.keywords = (0, t.cy)(e.params.keywords) ? e.params.keywords.join(",") : e.params.keywords);
                            let s = (0, t.D9)({}, e.ortb2 || {}, o),
                                a = (0, n.A)(e.ortb2Imp, "ext") || {},
                                d = (0, n.A)(e.ortb2Imp, "ext.data") || {};
                            const c = (0, n.A)(e, "ortb2Imp.ext.gpid"),
                                l = (0, n.A)(s, "regs.ext.dsa"),
                                u = {
                                    user: [4],
                                    site: [1, 2, 5, 6]
                                },
                                p = {
                                    user: "tg_v.",
                                    site: "tg_i.",
                                    adserver: "tg_i.dfp_ad_unit_code",
                                    pbadslot: "tg_i.pbadslot",
                                    keywords: "kw"
                                },
                                f = function(e, r, o) {
                                    let s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                                        a = function(e, r, i) {
                                            return "data" === r && Array.isArray(e) ? e.filter((e => e.segment && (0, n.A)(e, "ext.segtax") && u[i] && -1 !== u[i].indexOf((0, n.A)(e, "ext.segtax")))).map((e => {
                                                let t = e.segment.filter((e => e.id)).reduce(((e, t) => (e.push(t.id), e)), []);
                                                if (t.length > 0) return t.toString()
                                            })).toString() : "object" == typeof e && !Array.isArray(e) || void 0 === e ? void 0 : Array.isArray(e) ? e.filter((e => {
                                                if ("object" != typeof e && void 0 !== e) return e.toString();
                                                (0, t.JE)("Rubicon: Filtered value: ", e, "for key", r, ": Expected value to be string, integer, or an array of strings/ints")
                                            })).toString() : e.toString()
                                        }(e, o, r),
                                        d = p[o] && s ? `${p[o]}` : "data" === o ? `${p[r]}iab` : `${p[r]}${o}`;
                                    i[d] = i[d] ? i[d].concat(",", a) : a
                                };
                            if (r === O.D4) {
                                ["site", "user"].forEach((e => {
                                    Object.keys(s[e]).forEach((t => {
                                        "site" === e && "content" === t && s[e][t].data ? f(s[e][t].data, e, "data") : "ext" !== t ? f(s[e][t], e, t) : s[e][t].data && Object.keys(s[e].ext.data).forEach((t => {
                                            f(s[e].ext.data[t], e, t, !1)
                                        }))
                                    }))
                                })), Object.keys(d).forEach((e => {
                                    "adserver" !== e ? f(d[e], "site", e) : "gam" === d[e].name && f(d[e].adslot, name, e)
                                })), c && (i.p_gpid = c), l && Object.keys(l).length && (0, t.Up)(l, ["dsainfo", e => i.dsainfo = e, "dsarequired", e => i.dsarequired = e, "pubrender", e => i.dsapubrender = e, "datatopub", e => i.dsadatatopubs = e, "transparency", e => {
                                    Array.isArray(e) && e.length && (i.dsatransparency = e.reduce(((e, t) => {
                                        const n = t.domain || "";
                                        if (!n) return e;
                                        const r = t.dsaparams || t.params;
                                        return Array.isArray(r) && 0 !== r.length ? (e && (e += "~~"), e + `${n}~${r.join("_")}`) : e
                                    }), ""))
                                }]), i["tg_i.pbadslot"] && delete i["tg_i.dfp_ad_unit_code"];
                                const e = (0, n.A)(s, "device.sua");
                                e && !1 !== or.chEnabled && (0, t.Up)(e, ["architecture", e => i.m_ch_arch = e, "bitness", e => i.m_ch_bitness = e, "browsers", e => {
                                    var t, n;
                                    if (!Array.isArray(e)) return;
                                    const [r, o] = e.reduce(((e, t) => {
                                        var n, r, i;
                                        return e[0].push(`"${null==t?void 0:t.brand}"|v="${null==t||null===(n=t.version)||void 0===n?void 0:n[0]}"`), e[1].push(`"${null==t?void 0:t.brand}"|v="${null==t||null===(r=t.version)||void 0===r||null===(i=r.join)||void 0===i?void 0:i.call(r,".")}"`), e
                                    }), [
                                        [],
                                        []
                                    ]);
                                    i.m_ch_ua = null == r || null === (t = r.join) || void 0 === t ? void 0 : t.call(r, ","), i.m_ch_full_ver = null == o || null === (n = o.join) || void 0 === n ? void 0 : n.call(o, ",")
                                }, "mobile", e => i.m_ch_mobile = `?${e}`, "model", e => i.m_ch_model = e, "platform", e => {
                                    var t, n;
                                    i.m_ch_platform = null == e ? void 0 : e.brand, i.m_ch_platform_ver = null == e || null === (t = e.version) || void 0 === t || null === (n = t.join) || void 0 === n ? void 0 : n.call(t, ".")
                                }])
                            } else Object.keys(a).length && (0, t.D9)(i.imp[0].ext, a), c && (i.imp[0].ext.gpid = c), (0, t.D9)(i, s)
                        }(e, O.D4, m), !0 === A.$W.getConfig("coppa") && (m.coppa = 1), e.schain && gr(e.schain) && (m.rp_schain = dr.serializeSupplyChain(e.schain)), m
                },
                serializeSupplyChain: function(e) {
                    if (!gr(e)) return "";
                    const {
                        ver: t,
                        complete: n,
                        nodes: r
                    } = e;
                    return `${t},${n}!${dr.serializeSupplyChainNodes(r)}`
                },
                serializeSupplyChainNodes: function(e) {
                    const t = ["asi", "sid", "hp", "rid", "name", "domain"];
                    return e.map((e => t.map((t => encodeURIComponent(e[t] || ""))).join(","))).join("!")
                },
                interpretResponse: function(e, r) {
                    var i;
                    e = e.body;
                    const {
                        data: o
                    } = r;
                    if (!e || "object" != typeof e) return [];
                    if (e.seatbid) {
                        const r = (0, n.A)(e, "ext.errors.rubicon");
                        return Array.isArray(r) && r.length > 0 && (0, t.JE)("Rubicon: Error in video response"), ar.fromORTB({
                            request: o,
                            response: e
                        }).bids
                    }
                    let s, a = e.ads,
                        d = 0;
                    const {
                        bidRequest: c
                    } = r;
                    if ("object" == typeof c && !Array.isArray(c) && mr(c).includes(O.G_) && "object" == typeof a && (a = a[c.adUnitCode]), !Array.isArray(a) || a.length < 1) return [];
                    let l = a.reduce(((n, r, i) => {
                            if (r.impression_id && s === r.impression_id ? d++ : s = r.impression_id, "ok" !== r.status) return n;
                            const o = Array.isArray(c) ? c[i - d] : c;
                            if (o && "object" == typeof o) {
                                let e = {
                                    requestId: o.bidId,
                                    currency: "USD",
                                    creativeId: r.creative_id || `${r.network||""}-${r.advertiser||""}`,
                                    cpm: r.cpm || 0,
                                    dealId: r.deal,
                                    ttl: 360,
                                    netRevenue: !1 !== or.netRevenue,
                                    rubicon: {
                                        advertiserId: r.advertiser,
                                        networkId: r.network
                                    },
                                    meta: {
                                        advertiserId: r.advertiser,
                                        networkId: r.network,
                                        mediaType: O.D4
                                    }
                                };
                                r.creative_type && (e.mediaType = r.creative_type), r.dsa && Object.keys(r.dsa).length && (e.meta.dsa = r.dsa), r.adomain && (e.meta.advertiserDomains = Array.isArray(r.adomain) ? r.adomain : [r.adomain]), r.creative_type === O.G_ ? (e.width = o.params.video.playerWidth, e.height = o.params.video.playerHeight, e.vastUrl = r.creative_depot_url, e.impression_id = r.impression_id, e.videoCacheKey = r.impression_id) : (e.ad = (a = r.script, `<html>\n<head><script type='text/javascript'>inDapIF=true;<\/script></head>\n<body style='margin : 0; padding: 0;'>\n\x3c!-- Rubicon Project Ad Tag --\x3e\n<div data-rp-impression-id='${r.impression_id}'>\n<script type='text/javascript'>${a}<\/script>\n</div>\n</body>\n</html>`), [e.width, e.height] = sr[r.size_id].split("x").map((e => Number(e)))), e.rubiconTargeting = (Array.isArray(r.targeting) ? r.targeting : []).reduce(((e, t) => (e[t.key] = t.values[0], e)), {
                                    rpfl_elemid: o.adUnitCode
                                }), n.push(e)
                            } else(0, t.vV)(`Rubicon: bidRequest undefined at index position:${i}`, c, e);
                            var a;
                            return n
                        }), []).sort(((e, t) => (t.cpm || 0) - (e.cpm || 0))),
                        u = null === (i = e.component_auction_config) || void 0 === i ? void 0 : i.map((e => ({
                            config: e,
                            bidId: e.bidId
                        })));
                    return u ? {
                        bids: l,
                        fledgeAuctionConfigs: u
                    } : l
                },
                getUserSyncs: function(e, n, r, i, o) {
                    if (!hr && e.iframeEnabled) {
                        let e = {};
                        var s;
                        return r && ("boolean" == typeof r.gdprApplies && (e.gdpr = Number(r.gdprApplies)), "string" == typeof r.consentString && (e.gdpr_consent = r.consentString)), i && (e.us_privacy = encodeURIComponent(i)), null != o && o.gppString && (e.gpp = o.gppString, e.gpp_sid = null === (s = o.applicableSections) || void 0 === s ? void 0 : s.toString()), e = Object.keys(e).length ? `?${(0,t.eP)(e)}` : "", hr = !0, {
                            type: "iframe",
                            url: `https://${or.syncHost||"eus"}.rubiconproject.com/usync.html` + e
                        }
                    }
                }
            };

        function cr(e, t) {
            let n;
            return n = e.params.referrer ? e.params.referrer : t.refererInfo.page, e.params.secure ? n.replace(/^http:/i, "https:") : n
        }

        function lr(e) {
            const t = document.getElementById(e.adUnitCode);
            ! function(e) {
                const t = e.querySelector("div[id^='google_ads']");
                t && t.style.setProperty("display", "none")
            }(t),
            function(e) {
                const t = e.querySelector("script[id^='sas_script']"),
                    n = t && t.nextSibling;
                n && "iframe" === n.localName && n.style.setProperty("display", "none")
            }(t);
            const n = ir(ir({}, {
                align: "center",
                position: "append",
                closeButton: !1,
                label: void 0,
                collapse: !0
            }), e.renderer.getConfig());
            e.renderer.push((() => {
                window.MagniteApex.renderAd({
                    width: e.width,
                    height: e.height,
                    vastUrl: e.vastUrl,
                    placement: {
                        attachTo: t,
                        align: n.align,
                        position: n.position
                    },
                    closeButton: n.closeButton,
                    label: n.label,
                    collapse: n.collapse
                })
            }))
        }

        function ur(e, r) {
            let i = e.params;
            if (r === O.G_) {
                let t = [];
                return i.video && i.video.playerWidth && i.video.playerHeight ? t = [i.video.playerWidth, i.video.playerHeight] : Array.isArray((0, n.A)(e, "mediaTypes.video.playerSize")) && 1 === e.mediaTypes.video.playerSize.length ? t = e.mediaTypes.video.playerSize[0] : Array.isArray(e.sizes) && e.sizes.length > 0 && Array.isArray(e.sizes[0]) && e.sizes[0].length > 1 && (t = e.sizes[0]), t
            }
            let o = [];
            return Array.isArray(i.sizes) ? o = i.sizes : void 0 !== (0, n.A)(e, "mediaTypes.banner.sizes") ? o = fr(e.mediaTypes.banner.sizes) : Array.isArray(e.sizes) && e.sizes.length > 0 ? o = fr(e.sizes) : (0, t.JE)("Rubicon: no sizes are setup or found"),
                function(e) {
                    const t = [15, 2, 9];
                    return e.sort(((e, n) => {
                        const r = t.indexOf(e),
                            i = t.indexOf(n);
                        return r > -1 || i > -1 ? -1 === r ? 1 : -1 === i ? -1 : r - i : e - n
                    }))
                }(o)
        }

        function pr(e, t, n) {
            return r => {
                var i;
                const o = Number(null === (i = r.ext) || void 0 === i ? void 0 : i.segtax);
                var s;
                n.includes(o) && (e[`tg_${t}.tax${o}`] = null === (s = r.segment) || void 0 === s ? void 0 : s.map((e => e.id)).join(","))
            }
        }

        function fr(e) {
            return (0, t.kK)(e).reduce(((e, t) => {
                let n = parseInt(sr[t], 10);
                return n && e.push(n), e
            }), [])
        }

        function mr(e) {
            let i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                o = [];
            if (function(e) {
                    let t = void 0 !== (0, n.A)(e, `mediaTypes.${O.G_}`),
                        i = void 0 !== (0, n.A)(e, `mediaTypes.${O.D4}`),
                        o = void 0 !== (0, n.A)(e, "params.bidonmultiformat"),
                        s = "object" != typeof(0, n.A)(e, "params.video");
                    return !(!t || !o) || (i && s && (t = !1), t && s && r(e, "params.video", {}), t)
                }(e)) {
                if (-1 === ["outstream", "instream"].indexOf((0, n.A)(e, `mediaTypes.${O.G_}.context`))) return i && (0, t.vV)("Rubicon: mediaTypes.video.context must be outstream or instream"), o;
                if (ur(e, O.G_).length < 2) return i && (0, t.vV)("Rubicon: could not determine the playerSize of the video"), o;
                i && (0, t.OG)("Rubicon: making video request for adUnit", e.adUnitCode), o.push(O.G_)
            }
            if (void 0 !== (0, n.A)(e, `mediaTypes.${O.s6}`) && o.push(O.s6), void 0 !== (0, n.A)(e, `mediaTypes.${O.D4}`)) {
                if (0 === ur(e, O.D4).length) return i && (0, t.vV)("Rubicon: could not determine the sizes for banner request"), o;
                i && (0, t.OG)("Rubicon: making banner request for adUnit", e.adUnitCode), o.push(O.D4)
            }
            return o
        }

        function gr(e) {
            let n = !1;
            const r = ["asi", "sid", "hp"];
            return e.nodes ? (n = e.nodes.reduce(((e, t) => e ? r.every((e => t.hasOwnProperty(e))) : e), !0), n || (0, t.vV)("Rubicon: required schain params missing"), n) : n
        }

        function br(e, t) {
            return "rp_schain" === e ? `rp_schain=${t}` : `${e}=${encodeURIComponent(t)}`
        }
        var hr = !1;

        function vr(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function yr(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? vr(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vr(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, Zt.a$)(dr), (0, e.E)("rubiconBidAdapter");
        const _r = "pubmatic",
            Ir = "PubMatic: ",
            Er = "USD",
            Ar = void 0,
            Or = "https://pubmatic.bbvms.com/r/".concat("$RENDERER", ".js"),
            wr = {
                kadpageurl: "",
                gender: "",
                yob: "",
                lat: "",
                lon: "",
                wiid: "",
                profId: "",
                verId: ""
            },
            xr = {
                NUMBER: "number",
                STRING: "string",
                BOOLEAN: "boolean",
                ARRAY: "array",
                OBJECT: "object"
            },
            Tr = {
                mimes: xr.ARRAY,
                minduration: xr.NUMBER,
                maxduration: xr.NUMBER,
                startdelay: xr.NUMBER,
                playbackmethod: xr.ARRAY,
                api: xr.ARRAY,
                protocols: xr.ARRAY,
                w: xr.NUMBER,
                h: xr.NUMBER,
                battr: xr.ARRAY,
                linearity: xr.NUMBER,
                placement: xr.NUMBER,
                plcmt: xr.NUMBER,
                minbitrate: xr.NUMBER,
                maxbitrate: xr.NUMBER,
                skip: xr.NUMBER
            },
            Cr = {
                1: "PMP",
                5: "PREF",
                6: "PMPG"
            },
            Sr = {
                bootstrapPlayer: function(e) {
                    const n = {
                        code: e.adUnitCode
                    };
                    if (e.vastXml ? n.vastXml = e.vastXml : e.vastUrl && (n.vastUrl = e.vastUrl), !e.vastXml && !e.vastUrl) return void(0, t.JE)(`${Ir}: No vastXml or vastUrl on bid, bailing...`);
                    const r = Sr.getRendererId("pubmatic", e.rendererCode),
                        i = document.getElementById(e.adUnitCode);
                    let o;
                    for (let e = 0; e < window.bluebillywig.renderers.length; e++)
                        if (window.bluebillywig.renderers[e]._id === r) {
                            o = window.bluebillywig.renderers[e];
                            break
                        }
                    o ? o.bootstrap(n, i) : (0, t.JE)(`${Ir}: Couldn't find a renderer with ${r}`)
                },
                newRenderer: function(e, n) {
                    var r = Or.replace("$RENDERER", e);
                    const i = Yt.A4.install({
                        url: r,
                        loaded: !1,
                        adUnitCode: n
                    });
                    try {
                        i.setRender(Sr.outstreamRender)
                    } catch (e) {
                        (0, t.JE)(`${Ir}: Error tying to setRender on renderer`, e)
                    }
                    return i
                },
                outstreamRender: function(e) {
                    e.renderer.push((function() {
                        Sr.bootstrapPlayer(e)
                    }))
                },
                getRendererId: function(e, t) {
                    return `${e}-${t}`
                }
            },
            kr = [O.D4, O.G_, O.s6];
        let Dr = 0,
            Rr = !1,
            jr = ["pubmatic"];
        const Br = ["all"];

        function Pr(e, n) {
            if (!(0, t.O8)(n)) return n && (0, t.JE)(Ir + "Ignoring param key: " + e + ", expects string-value, found " + typeof n), Ar;
            switch (e) {
                case "pmzoneid":
                    return n.split(",").slice(0, 50).map((e => e.trim())).join();
                case "kadfloor":
                case "lat":
                case "lon":
                    return parseFloat(n) || Ar;
                case "yob":
                    return parseInt(n) || Ar;
                default:
                    return n
            }
        }

        function Ur() {
            let e = window.navigator && (window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection);
            switch (null == e ? void 0 : e.effectiveType) {
                case "ethernet":
                    return 1;
                case "wifi":
                    return 2;
                case "slow-2g":
                case "2g":
                    return 4;
                case "3g":
                    return 5;
                case "4g":
                    return 6;
                default:
                    return 0
            }
        }

        function $r(e, n, r) {
            var i, o = "Ignoring param key: " + e + ", expects " + r + ", found " + typeof n;
            switch (r) {
                case xr.BOOLEAN:
                    i = t.Lm;
                    break;
                case xr.NUMBER:
                    i = t.Et;
                    break;
                case xr.STRING:
                    i = t.O8;
                    break;
                case xr.ARRAY:
                    i = t.cy
            }
            return i(n) ? n : ((0, t.JE)(Ir + o), Ar)
        }
        const qr = {
                desc: "desc",
                desc2: "desc2",
                body: "desc",
                body2: "desc2",
                sponsoredBy: "sponsored",
                cta: "ctatext",
                rating: "rating",
                address: "address",
                downloads: "downloads",
                likes: "likes",
                phone: "phone",
                price: "price",
                salePrice: "saleprice",
                displayUrl: "displayurl",
                saleprice: "saleprice",
                displayurl: "displayurl"
            },
            Nr = Object.values(qr);

        function Mr(e) {
            var n;
            if (e.ortb) {
                e = e.ortb, n = yr(yr({
                    ver: "1.2"
                }, e), {}, {
                    assets: []
                });
                const {
                    assets: r
                } = e, i = e => e.title || e.img || e.data || e.video;
                if (r.length < 1 || !r.some((e => i(e)))) return (0, t.JE)(`${Ir}: Native assets object is empty or contains some invalid object`), Rr = !0, n;
                r.forEach((e => {
                    var t = e;
                    t.img && (3 == t.img.type ? (t.w = t.w || t.width || (t.sizes ? t.sizes[0] : Ar), t.h = t.h || t.height || (t.sizes ? t.sizes[1] : Ar), t.wmin = t.wmin || t.minimumWidth || (t.minsizes ? t.minsizes[0] : Ar), t.hmin = t.hmin || t.minimumHeight || (t.minsizes ? t.minsizes[1] : Ar)) : 1 == t.img.type && (t.w = t.w || t.width || (t.sizes ? t.sizes[0] : Ar), t.h = t.h || t.height || (t.sizes ? t.sizes[1] : Ar))), t && void 0 !== t.id && i(t) && n.assets.push(t)
                }))
            } else n = function(e) {
                if (!e && !(0, t.Qd)(e)) return (0, t.JE)(`${Ir}: Native assets object is empty or not an object: ${e}`), void(Rr = !0);
                const n = {
                    ver: "1.2",
                    assets: []
                };
                for (let r in e) {
                    if (a._B.includes(r)) continue;
                    if (!a.x5.hasOwnProperty(r) && !Nr.includes(r)) {
                        (0, t.JE)(`${Ir}: Unrecognized native asset code: ${r}. Asset will be ignored.`);
                        continue
                    }
                    const i = e[r];
                    let o = 0;
                    i.required && (0, t.Lm)(i.required) && (o = Number(i.required));
                    const s = {
                        id: n.assets.length,
                        required: o
                    };
                    if (r in qr) s.data = {
                        type: a.jO[qr[r]]
                    }, (i.len || i.length) && (s.data.len = i.len || i.length), i.ext && (s.data.ext = i.ext);
                    else if ("icon" === r || "image" === r) {
                        if (s.img = {
                                type: "icon" === r ? a.oA.ICON : a.oA.MAIN
                            }, i.aspect_ratios)
                            if ((0, t.cy)(i.aspect_ratios))
                                if (i.aspect_ratios.length) {
                                    const {
                                        min_width: e,
                                        min_height: n
                                    } = i.aspect_ratios[0];
                                    (0, t.Fq)(e) && (0, t.Fq)(n) ? (s.img.wmin = e, s.img.hmin = n) : (0, t.JE)(`${Ir}: image.aspect_ratios min_width or min_height are invalid: ${e}, ${n}`);
                                    const r = i.aspect_ratios.filter((e => e.ratio_width && e.ratio_height)).map((e => `${e.ratio_width}:${e.ratio_height}`));
                                    r.length > 0 && (s.img.ext = {
                                        aspectratios: r
                                    })
                                } else(0, t.JE)(`${Ir}: image.aspect_ratios was passed, but it's empty: ${i.aspect_ratios}`);
                        else(0, t.JE)(`${Ir}: image.aspect_ratios was passed, but it's not a an array: ${i.aspect_ratios}`);
                        s.img.w = i.w || i.width, s.img.h = i.h || i.height, s.img.wmin = i.wmin || i.minimumWidth || (i.minsizes ? i.minsizes[0] : Ar), s.img.hmin = i.hmin || i.minimumHeight || (i.minsizes ? i.minsizes[1] : Ar), i.sizes && (2 === i.sizes.length && (0, t.Fq)(i.sizes[0]) && (0, t.Fq)(i.sizes[1]) ? ((0, t.fH)(`${Ir}: if asset.sizes exist, by OpenRTB spec we should remove wmin and hmin`), s.img.w = i.sizes[0], s.img.h = i.sizes[1], delete s.img.hmin, delete s.img.wmin) : (0, t.JE)(`${Ir}: image.sizes was passed, but its value is not an array of integers: ${i.sizes}`)), i.ext && (s.img.ext = i.ext), i.mimes && (s.img.mimes = i.mimes)
                    } else "title" === r ? (s.title = {
                        len: i.len || i.length || 140
                    }, i.ext && (s.title.ext = i.ext)) : "ext" === r && (s.ext = i, delete s.required);
                    n.assets.push(s)
                }
                return n.assets.length < 1 ? ((0, t.JE)(`${Ir}: Could not find any valid asset`), void(Rr = !0)) : n
            }(e);
            return n
        }

        function Wr(e) {
            var n, r = e.mediaTypes.banner.sizes,
                i = [];
            if (r !== Ar && (0, t.cy)(r)) {
                if (n = {}, e.params.width || e.params.height) n.w = e.params.width, n.h = e.params.height;
                else {
                    if (0 === r.length) return n = Ar, (0, t.JE)(Ir + "Error: mediaTypes.banner.size missing for adunit: " + e.params.adUnit + ". Ignoring the banner impression in the adunit."), n;
                    n.w = parseInt(r[0][0], 10), n.h = parseInt(r[0][1], 10), r = r.splice(1, r.length - 1)
                }
                r.length > 0 && (i = [], r.forEach((function(e) {
                    e.length > 1 && i.push({
                        w: e[0],
                        h: e[1]
                    })
                })), i.length > 0 && (n.format = i)), n.pos = 0, n.topframe = (0, t.al)() ? 0 : 1
            } else(0, t.JE)(Ir + "Error: mediaTypes.banner.size missing for adunit: " + e.params.adUnit + ". Ignoring the banner impression in the adunit."), n = Ar;
            return n
        }

        function zr(e) {
            var r, i = (0, t.D9)((0, n.A)(e.mediaTypes, "video"), e.params.video);
            if (i !== Ar) {
                for (var o in r = {},
                        function(e, r) {
                            (0, n.A)(e, "plcmt") || (0, t.JE)("Video.plcmt param missing for " + r)
                        }(i, e.adUnitCode), Tr) i.hasOwnProperty(o) && (r[o] = $r(o, i[o], Tr[o]));
                (0, t.cy)(e.mediaTypes.video.playerSize[0]) ? (r.w = parseInt(e.mediaTypes.video.playerSize[0][0], 10), r.h = parseInt(e.mediaTypes.video.playerSize[0][1], 10)) : (0, t.Et)(e.mediaTypes.video.playerSize[0]) && (r.w = parseInt(e.mediaTypes.video.playerSize[0], 10), r.h = parseInt(e.mediaTypes.video.playerSize[1], 10))
            } else r = Ar, (0, t.JE)(Ir + "Error: Video config params missing for adunit: " + e.params.adUnit + " with mediaType set as video. Ignoring video impression in the adunit.");
            return r
        }

        function Lr(e, n) {
            (n = n.filter((function(e) {
                return "string" == typeof e || ((0, t.JE)(Ir + "acat: Each category should be a string, ignoring category: " + e), !1)
            })).map((e => e.trim())).filter(((e, t, n) => n.indexOf(e) === t))).length > 0 && ((0, t.JE)(Ir + "acat: Selected: ", n), e.ext.acat = n)
        }

        function Vr(e) {
            return !0 === (0, t.cy)(e) && e.length > 0
        }
        const Fr = {
            code: _r,
            gvlid: 76,
            supportedMediaTypes: [O.D4, O.G_, O.s6],
            isBidRequestValid: e => {
                if (e && e.params) {
                    if (!(0, t.O8)(e.params.publisherId)) return (0, t.JE)(Ir + "Error: publisherId is mandatory and cannot be numeric (wrap it in quotes in your config). Call to OpenBid will not be sent for ad unit: " + JSON.stringify(e)), !1;
                    if (e.hasOwnProperty("mediaTypes") && e.mediaTypes.hasOwnProperty(O.G_)) {
                        let r = (0, n.A)(e.mediaTypes, "video.mimes"),
                            i = (0, n.A)(e, "params.video.mimes");
                        if (!1 === Vr(r) && !1 === Vr(i)) return (0, t.JE)(Ir + "Error: For video ads, bid.mediaTypes.video.mimes OR bid.params.video.mimes should be present and must be a non-empty array. Call to OpenBid will not be sent for ad unit:" + JSON.stringify(e)), !1;
                        if (!e.mediaTypes[O.G_].hasOwnProperty("context")) return (0, t.vV)(`${Ir}: no context specified in bid. Rejecting bid: `, e), !1;
                        if ("outstream" === e.mediaTypes[O.G_].context && !(0, t.O8)(e.params.outstreamAU) && !e.hasOwnProperty("renderer") && !e.mediaTypes[O.G_].hasOwnProperty("renderer")) return e.mediaTypes.hasOwnProperty(O.D4) || e.mediaTypes.hasOwnProperty(O.s6) ? (delete e.mediaTypes[O.G_], (0, t.JE)(`${Ir}: for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting mediatype Video of bid: `, e), !0) : ((0, t.vV)(`${Ir}: for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting bid: `, e), !1)
                    }
                    return !0
                }
                return !1
            },
            buildRequests: (e, i) => {
                var o, s, a, d, c, l, u;
                i && i.refererInfo && (u = i.refererInfo);
                var p, f = function(e) {
                        return {
                            pageURL: (null == e ? void 0 : e.page) || window.location.href,
                            refURL: (null == e ? void 0 : e.ref) || window.document.referrer
                        }
                    }(u),
                    m = function(e) {
                        return {
                            id: "" + (new Date).getTime(),
                            at: 1,
                            cur: [Er],
                            imp: [],
                            site: {
                                page: e.pageURL,
                                ref: e.refURL,
                                publisher: {}
                            },
                            device: {
                                ua: navigator.userAgent,
                                js: 1,
                                dnt: "yes" == navigator.doNotTrack || "1" == navigator.doNotTrack || "1" == navigator.msDoNotTrack ? 1 : 0,
                                h: screen.height,
                                w: screen.width,
                                language: navigator.language,
                                connectiontype: Ur()
                            },
                            user: {},
                            ext: {}
                        }
                    }(f),
                    g = "",
                    b = [],
                    h = [],
                    v = [],
                    y = (0, t.lk)();
                if (e.forEach((e => {
                        var o;
                        if (e.params.wiid = e.params.wiid || i.auctionId || y, (p = (0, t.Go)(e)).params.adSlot = p.params.adSlot || "", function(e) {
                                var n;
                                e.params.adUnit = "", e.params.adUnitIndex = "0", e.params.width = 0, e.params.height = 0, e.params.adSlot = (n = e.params.adSlot, (0, t.O8)(n) ? n.replace(/^\s+/g, "").replace(/\s+$/g, "") : (n && (0, t.JE)(_r + ": adSlot must be a string. Ignoring adSlot"), ""));
                                var r = e.params.adSlot,
                                    i = r.split(":");
                                if (r = i[0], 2 == i.length && (e.params.adUnitIndex = i[1]), i = r.split("@"), e.params.adUnit = i[0], i.length > 1) {
                                    if (2 != (i = i[1].split("x")).length) return void(0, t.JE)(Ir + "AdSlot Error: adSlot not in required format");
                                    e.params.width = parseInt(i[0], 10), e.params.height = parseInt(i[1], 10)
                                } else if (e.hasOwnProperty("mediaTypes") && e.mediaTypes.hasOwnProperty(O.D4) && e.mediaTypes.banner.hasOwnProperty("sizes")) {
                                    for (var o = 0, s = []; o < e.mediaTypes.banner.sizes.length; o++) 2 === e.mediaTypes.banner.sizes[o].length && s.push(e.mediaTypes.banner.sizes[o]);
                                    e.mediaTypes.banner.sizes = s, e.mediaTypes.banner.sizes.length >= 1 && (e.params.width = e.mediaTypes.banner.sizes[0][0], e.params.height = e.mediaTypes.banner.sizes[0][1], e.mediaTypes.banner.sizes = e.mediaTypes.banner.sizes.splice(1, e.mediaTypes.banner.sizes.length - 1))
                                }
                            }(p), p.mediaTypes && p.mediaTypes.hasOwnProperty("video") || p.params.hasOwnProperty("video"));
                        else if (!(p.hasOwnProperty("mediaTypes") && p.mediaTypes.hasOwnProperty(O.s6) || 0 !== p.params.width || 0 !== p.params.height)) return void(0, t.JE)(Ir + "Skipping the non-standard adslot: ", p.params.adSlot, JSON.stringify(p));
                        f.pubId = f.pubId || p.params.publisherId, (f = function(e, n) {
                            var r, i, o;
                            for (r in n.kadpageurl || (n.kadpageurl = n.pageURL), wr) wr.hasOwnProperty(r) && (i = e[r]) && ("object" == typeof(o = wr[r]) && (i = o.f(i, n)), (0, t.O8)(i) ? n[r] = i : (0, t.JE)(Ir + "Ignoring param : " + r + " with value : " + wr[r] + ", expects string-value, found " + typeof i));
                            return n
                        }(p.params, f)).transactionId = null === (o = p.ortb2Imp) || void 0 === o || null === (o = o.ext) || void 0 === o ? void 0 : o.tid, "" === g ? g = p.params.currency || Ar : p.params.hasOwnProperty("currency") && g !== p.params.currency && (0, t.JE)(Ir + "Currency specifier ignored. Only one currency permitted."), p.params.currency = g, p.params.hasOwnProperty("dctr") && (0, t.O8)(p.params.dctr) && b.push(p.params.dctr), p.params.hasOwnProperty("bcat") && (0, t.cy)(p.params.bcat) && (h = h.concat(p.params.bcat)), p.params.hasOwnProperty("acat") && (0, t.cy)(p.params.acat) && (v = v.concat(p.params.acat));
                        var s = function(e, i) {
                            var o, s, a = {},
                                d = {},
                                c = e.hasOwnProperty("sizes") ? e.sizes : [],
                                l = "",
                                u = [],
                                p = null == i ? void 0 : i.fledgeEnabled;
                            if (function(e, n) {
                                    n.params.deals && ((0, t.cy)(n.params.deals) ? n.params.deals.forEach((function(n) {
                                        (0, t.O8)(n) && n.length > 3 ? (e.pmp || (e.pmp = {
                                            private_auction: 0,
                                            deals: []
                                        }), e.pmp.deals.push({
                                            id: n
                                        })) : (0, t.JE)(Ir + "Error: deal-id present in array bid.params.deals should be a strings with more than 3 charaters length, deal-id ignored: " + n)
                                    })) : (0, t.JE)(Ir + "Error: bid.params.deals should be an array of strings."))
                                }(a = {
                                    id: e.bidId,
                                    tagid: e.params.adUnit || void 0,
                                    bidfloor: Pr("kadfloor", e.params.kadfloor),
                                    secure: 1,
                                    ext: {
                                        pmZoneId: Pr("pmzoneid", e.params.pmzoneid)
                                    },
                                    bidfloorcur: e.params.currency ? Pr("currency", e.params.currency) : Er,
                                    displaymanager: "Prebid.js",
                                    displaymanagerver: "8.51.0"
                                }, e), function(e, n) {
                                    var r, i = "";
                                    if (n.params.dctr)
                                        if (i = n.params.dctr, (0, t.O8)(i) && i.length > 0) {
                                            var o = i.split("|");
                                            i = "", o.forEach((e => {
                                                i += e.length > 0 ? e.trim() + "|" : ""
                                            })), r = i.length, "|" === i.substring(r, r - 1) && (i = i.substring(0, r - 1)), e.ext.key_val = i.trim()
                                        } else(0, t.JE)(Ir + "Ignoring param : dctr with value : " + i + ", expects string-value, found empty or non-string value")
                                }(a, e), function(e, t) {
                                    var n = t.rtd && t.rtd.jwplayer && t.rtd.jwplayer.targeting || void 0,
                                        r = "";
                                    if (void 0 !== n && "" !== n && n.hasOwnProperty("segments")) {
                                        var i, o = n.segments.length;
                                        r += "jw-id=" + n.content.id;
                                        for (var s = 0; s < o; s++) r += "|jw-" + n.segments[s] + "=1";
                                        (i = e.ext) && void 0 === i.key_val ? i.key_val = r : i.key_val += "|" + r
                                    }
                                }(a, e), e.hasOwnProperty("mediaTypes"))
                                for (l in e.mediaTypes) switch (l) {
                                    case O.D4:
                                        (o = Wr(e)) !== Ar && (a.banner = o);
                                        break;
                                    case O.s6:
                                        d.request = JSON.stringify(Mr(e.nativeParams)), Rr ? ((0, t.JE)(Ir + "Error: Error in Native adunit " + e.params.adUnit + ". Ignoring the adunit. Refer to http://prebid.org/dev-docs/show-native-ads.html for more details."), Rr = !1) : a.native = d;
                                        break;
                                    case O.G_:
                                        (s = zr(e)) !== Ar && (a.video = s)
                                } else o = {
                                    pos: 0,
                                    w: e.params.width,
                                    h: e.params.height,
                                    topframe: (0, t.al)() ? 0 : 1
                                }, (0, t.cy)(c) && c.length > 1 && ((c = c.splice(1, c.length - 1)).forEach((e => {
                                    u.push({
                                        w: e[0],
                                        h: e[1]
                                    })
                                })), o.format = u), a.banner = o;
                            return function(e, t) {
                                    const i = yr({}, (0, n.A)(t, "ortb2Imp.ext.data"));
                                    Object.keys(i).forEach((t => {
                                        "pbadslot" === t ? "string" == typeof i[t] && i[t] && r(e, "ext.data.pbadslot", i[t]) : "adserver" === t ? ["name", "adslot"].forEach((t => {
                                            const o = (0, n.A)(i, `adserver.${t}`);
                                            "string" == typeof o && o && (r(e, `ext.data.adserver.${t.toLowerCase()}`, o), "adslot" === t && r(e, "ext.dfp_ad_unit_code", o))
                                        })) : r(e, `ext.data.${t}`, i[t])
                                    }));
                                    const o = (0, n.A)(t, "ortb2Imp.ext.gpid");
                                    o && r(e, "ext.gpid", o)
                                }(a, e),
                                function(e, n) {
                                    let r = -1;
                                    "function" != typeof n.getFloor || A.$W.getConfig("pubmatic.disableFloors") || [O.D4, O.G_, O.s6].forEach((i => {
                                        if (e.hasOwnProperty(i)) {
                                            let o = [];
                                            "banner" === i && (e[i].w && e[i].h && o.push([e[i].w, e[i].h]), (0, t.cy)(e[i].format) && e[i].format.forEach((e => o.push([e.w, e.h])))), 0 === o.length && o.push("*"), o.forEach((o => {
                                                let s = n.getFloor({
                                                    currency: e.bidfloorcur,
                                                    mediaType: i,
                                                    size: o
                                                });
                                                if ((0, t.fH)(Ir, "floor from floor module returned for mediatype:", i, " and size:", o, " is: currency", s.currency, "floor", s.floor), "object" == typeof s && s.currency === e.bidfloorcur && !isNaN(parseInt(s.floor))) {
                                                    let e = parseFloat(s.floor);
                                                    (0, t.fH)(Ir, "floor from floor module:", e, "previous floor value", r, "Min:", Math.min(e, r)), r = -1 === r ? e : Math.min(e, r), (0, t.fH)(Ir, "new floor value:", r)
                                                }
                                            }))
                                        }
                                    })), e.bidfloor && ((0, t.fH)(Ir, "floor from floor module:", r, "impObj.bidfloor", e.bidfloor, "Max:", Math.max(r, e.bidfloor)), r = Math.max(r, e.bidfloor)), e.bidfloor = !isNaN(r) && r > 0 ? r : Ar, (0, t.fH)(Ir, "new impObj.bidfloor value:", e.bidfloor)
                                }(a, e),
                                function(e, t, n) {
                                    var r, i;
                                    n ? (e.ext = e.ext || {}, void 0 !== (null == t || null === (r = t.ortb2Imp) || void 0 === r || null === (r = r.ext) || void 0 === r ? void 0 : r.ae) && (e.ext.ae = t.ortb2Imp.ext.ae)) : null !== (i = e.ext) && void 0 !== i && i.ae && delete e.ext.ae
                                }(a, e, p), a.hasOwnProperty(O.D4) || a.hasOwnProperty(O.s6) || a.hasOwnProperty(O.G_) ? a : Ar
                        }(p, i);
                        s && m.imp.push(s)
                    })), 0 == m.imp.length) return;
                m.site.publisher.id = f.pubId.trim(), Dr = f.pubId.trim(), m.ext.wrapper = {}, m.ext.wrapper.profile = parseInt(f.profId) || Ar, m.ext.wrapper.version = parseInt(f.verId) || Ar, m.ext.wrapper.wiid = f.wiid || i.auctionId, m.ext.wrapper.wv = "prebid_prebid_8.51.0", m.ext.wrapper.transactionId = f.transactionId, m.ext.wrapper.wp = "pbjs";
                const _ = i ? x.u.get(i.bidderCode, "allowAlternateBidderCodes") : void 0;
                if (void 0 !== _) {
                    if (m.ext.marketplace = {}, i && 1 == _) {
                        let e = x.u.get(i.bidderCode, "allowedAlternateBidderCodes");
                        (0, t.cy)(e) ? (e = e.map((e => e.trim().toLowerCase())).filter((e => !!e)).filter(t.hj), jr = e.includes("*") ? Br : [...jr, ...e]) : jr = Br
                    }
                    m.ext.marketplace.allowedbidders = jr.filter(t.hj)
                }
                m.user.gender = f.gender ? f.gender.trim() : Ar, m.user.geo = {}, m.user.yob = Pr("yob", f.yob), m.site.page = f.kadpageurl.trim() || m.site.page.trim(), m.site.domain = function(e) {
                        let t = document.createElement("a");
                        return t.href = e, t.hostname
                    }(m.site.page), "object" == typeof A.$W.getConfig("content") && (m.site.content = A.$W.getConfig("content")), "object" == typeof A.$W.getConfig("device") && (m.device = Object.assign(m.device, A.$W.getConfig("device"))), m.device.language = m.device.language && m.device.language.split("-")[0], r(m, "source.tid", null == i || null === (o = i.ortb2) || void 0 === o || null === (o = o.source) || void 0 === o ? void 0 : o.tid), -1 !== window.location.href.indexOf("pubmaticTest=true") && (m.test = 1), e[0].schain && r(m, "source.ext.schain", e[0].schain), i && i.gdprConsent && (r(m, "user.ext.consent", i.gdprConsent.consentString), r(m, "regs.ext.gdpr", i.gdprConsent.gdprApplies ? 1 : 0)), i && i.uspConsent && r(m, "regs.ext.us_privacy", i.uspConsent), null != i && null !== (s = i.gppConsent) && void 0 !== s && s.gppString ? (r(m, "regs.gpp", i.gppConsent.gppString), r(m, "regs.gpp_sid", i.gppConsent.applicableSections)) : null != i && null !== (a = i.ortb2) && void 0 !== a && null !== (a = a.regs) && void 0 !== a && a.gpp && (r(m, "regs.gpp", i.ortb2.regs.gpp), r(m, "regs.gpp_sid", i.ortb2.regs.gpp_sid)), !0 === A.$W.getConfig("coppa") && r(m, "regs.coppa", 1), null != i && null !== (d = i.ortb2) && void 0 !== d && null !== (d = d.regs) && void 0 !== d && null !== (d = d.ext) && void 0 !== d && d.dsa && r(m, "regs.ext.dsa", i.ortb2.regs.ext.dsa),
                    function(e, i) {
                        let o = (0, n.A)(i, "0.userIdAsEids");
                        (0, t.cy)(o) && o.length > 0 && r(e, "user.eids", o)
                    }(m, e);
                const I = i && i.ortb2 || {},
                    {
                        user: E,
                        device: w,
                        site: T,
                        bcat: C,
                        badv: S
                    } = I;
                if (T) {
                    const {
                        page: e,
                        domain: n,
                        ref: r
                    } = m.site;
                    (0, t.D9)(m, {
                        site: T
                    }), m.site.page = e, m.site.domain = n, m.site.ref = r
                }
                if (E && (0, t.D9)(m, {
                        user: E
                    }), S && (0, t.D9)(m, {
                        badv: S
                    }), C && (h = h.concat(C)), null != w && w.sua && (m.device.sua = null == w ? void 0 : w.sua), null != w && null !== (c = w.ext) && void 0 !== c && c.cdep && r(m, "device.ext.cdep", w.ext.cdep), null != E && E.geo && null != w && w.geo ? (m.device.geo = yr(yr({}, m.device.geo), w.geo), m.user.geo = yr(yr({}, m.user.geo), E.geo)) : (null != E && E.geo || null != w && w.geo) && (m.user.geo = m.device.geo = null != E && E.geo ? yr(yr({}, m.user.geo), E.geo) : yr(yr({}, m.user.geo), w.geo)), null !== (l = I.ext) && void 0 !== l && null !== (l = l.prebid) && void 0 !== l && null !== (l = l.bidderparams) && void 0 !== l && null !== (l = l[i.bidderCode]) && void 0 !== l && l.acat) {
                    const e = I.ext.prebid.bidderparams[i.bidderCode].acat;
                    Lr(m, e)
                } else v.length && Lr(m, v);
                var k;
                return function(e, n) {
                    (n = n.filter((function(e) {
                        return "string" == typeof e || ((0, t.JE)(Ir + "bcat: Each category should be a string, ignoring category: " + e), !1)
                    })).map((e => e.trim())).filter((function(e, n, r) {
                        if (e.length > 3) return r.indexOf(e) === n;
                        (0, t.JE)(Ir + "bcat: Each category should have a value of a length of more than 3 characters, ignoring category: " + e)
                    }))).length > 0 && ((0, t.JE)(Ir + "bcat: Selected: ", n), e.bcat = n)
                }(m, h), null != i && i.timeout ? m.tmax = i.timeout : m.tmax = null === (k = window) || void 0 === k || null === (k = k.PWT) || void 0 === k || null === (k = k.versionDetails) || void 0 === k ? void 0 : k.timeout, m.ext.epoch = (new Date).getTime(), "object" == typeof A.$W.getConfig("app") && (m.app = A.$W.getConfig("app"), m.app.publisher = m.site.publisher, m.app.ext = m.site.ext || Ar, "object" != typeof m.app.content && (m.app.content = m.site.content || Ar), delete m.site), {
                    method: "POST",
                    url: "https://hbopenbid.pubmatic.com/translator?source=prebid-client",
                    data: JSON.stringify(m),
                    bidderRequest: i
                }
            },
            interpretResponse: (e, r) => {
                const i = [];
                var o = Er;
                let s = JSON.parse(r.data),
                    a = s.site && s.site.ref ? s.site.ref : "";
                try {
                    e.body && e.body.seatbid && (0, t.cy)(e.body.seatbid) && (o = e.body.cur || o, e.body.seatbid.forEach((e => {
                        e.bid && (0, t.cy)(e.bid) && e.bid.forEach((d => {
                            let c = {
                                requestId: d.impid,
                                cpm: parseFloat((d.price || 0).toFixed(2)),
                                width: d.w,
                                height: d.h,
                                creativeId: d.crid || d.id,
                                dealId: d.dealid,
                                currency: o,
                                netRevenue: !0,
                                ttl: 300,
                                referrer: a,
                                ad: d.adm,
                                pm_seat: e.seat || null,
                                pm_dspid: d.ext && d.ext.dspid ? d.ext.dspid : null,
                                partnerImpId: d.id || ""
                            };
                            s.imp && s.imp.length > 0 && s.imp.forEach((e => {
                                    if (d.impid === e.id) switch (function(e, n) {
                                        if (e.ext && null != e.ext.bidtype) n.mediaType = kr[e.ext.bidtype];
                                        else {
                                            (0, t.fH)(Ir + "bid.ext.bidtype does not exist, checking alternatively for mediaType");
                                            var r = e.adm,
                                                i = "",
                                                o = new RegExp(/VAST\s+version/);
                                            if (r.indexOf('span class="PubAPIAd"') >= 0) n.mediaType = O.D4;
                                            else if (o.test(r)) n.mediaType = O.G_;
                                            else try {
                                                (i = JSON.parse(r.replace(/\\/g, ""))) && i.native && (n.mediaType = O.s6)
                                            } catch (e) {
                                                (0, t.JE)(Ir + "Error: Cannot parse native reponse for ad response: " + r)
                                            }
                                        }
                                    }(d, c), c.mediaType) {
                                        case O.D4:
                                            break;
                                        case O.G_:
                                            c.width = d.hasOwnProperty("w") ? d.w : e.video.w, c.height = d.hasOwnProperty("h") ? d.h : e.video.h, c.vastXml = d.adm,
                                                function(e, t) {
                                                    let n, r, i;
                                                    if (t.bidderRequest && t.bidderRequest.bids) {
                                                        for (let o = 0; o < t.bidderRequest.bids.length; o++) t.bidderRequest.bids[o].bidId === e.requestId && (n = t.bidderRequest.bids[o].params, r = t.bidderRequest.bids[o].mediaTypes[O.G_].context, i = t.bidderRequest.bids[o].adUnitCode);
                                                        r && "outstream" === r && n && n.outstreamAU && i && (e.rendererCode = n.outstreamAU, e.renderer = Sr.newRenderer(e.rendererCode, i))
                                                    }
                                                }(c, r),
                                                function(e, r, i) {
                                                    var o, s;
                                                    if (null == r || null === (o = r.ext) || void 0 === o || !o.prebiddealpriority) return;
                                                    const a = (0, t.D4)(e.requestId, [i.bidderRequest]),
                                                        d = (0, n.A)(a, "mediaTypes.video");
                                                    if ((null == d ? void 0 : d.context) != O.LM) return;
                                                    const c = (null == r || null === (s = r.ext) || void 0 === s || null === (s = s.video) || void 0 === s ? void 0 : s.duration) || (null == d ? void 0 : d.maxduration);
                                                    e.video = {
                                                        context: O.LM,
                                                        durationSeconds: c,
                                                        dealTier: r.ext.prebiddealpriority
                                                    }
                                                }(c, d, r);
                                            break;
                                        case O.s6:
                                            ! function(e, n) {
                                                if (e.hasOwnProperty("adm")) {
                                                    var r = "";
                                                    try {
                                                        r = JSON.parse(e.adm.replace(/\\/g, ""))
                                                    } catch (e) {
                                                        return void(0, t.JE)(Ir + "Error: Cannot parse native reponse for ad response: " + n.adm)
                                                    }
                                                    n.native = {
                                                        ortb: yr({}, r.native)
                                                    }, n.mediaType = O.s6, n.width || (n.width = 0), n.height || (n.height = 0)
                                                }
                                            }(d, c)
                                    }
                                })), d.ext && d.ext.deal_channel && (c.dealChannel = Cr[d.ext.deal_channel] || null),
                                function(e, t, n) {
                                    e.meta = {}, t.ext && t.ext.dspid && (e.meta.networkId = t.ext.dspid, e.meta.demandSource = t.ext.dspid), t.ext && t.ext.dchain && (e.meta.dchain = t.ext.dchain);
                                    const r = n || t.ext && t.ext.advid;
                                    r && (e.meta.advertiserId = r, e.meta.agencyId = r, e.meta.buyerId = r), t.adomain && Vr(t.adomain) && (e.meta.advertiserDomains = t.adomain, e.meta.clickUrl = t.adomain[0], e.meta.brandId = t.adomain[0]), t.cat && Vr(t.cat) && (e.meta.secondaryCatIds = t.cat, e.meta.primaryCatId = t.cat[0]), t.ext && t.ext.dsa && Object.keys(t.ext.dsa).length && (e.meta.dsa = t.ext.dsa)
                                }(c, d, e.seat), e.ext && e.ext.buyid && (c.adserverTargeting = {
                                    hb_buyid_pubmatic: e.ext.buyid
                                }), d.ext && d.ext.marketplace && (c.bidderCode = d.ext.marketplace), i.push(c)
                        }))
                    })));
                    let d = (0, n.A)(e.body, "ext.fledge_auction_configs");
                    if (d) return d = Object.entries(d).map((e => {
                        let [t, n] = e;
                        return {
                            bidId: t,
                            config: Object.assign({
                                auctionSignals: {}
                            }, n)
                        }
                    })), {
                        bids: i,
                        fledgeAuctionConfigs: d
                    }
                } catch (e) {
                    (0, t.vV)(e)
                }
                return i
            },
            getUserSyncs: (e, t, n, r, i) => {
                var o;
                let s = "" + Dr;
                var a;
                return n && (s += "&gdpr=" + (n.gdprApplies ? 1 : 0), s += "&gdpr_consent=" + encodeURIComponent(n.consentString || "")), r && (s += "&us_privacy=" + encodeURIComponent(r)), null != i && i.gppString && null != i && null !== (o = i.applicableSections) && void 0 !== o && o.length && (s += "&gpp=" + encodeURIComponent(i.gppString), s += "&gpp_sid=" + encodeURIComponent(null == i || null === (a = i.applicableSections) || void 0 === a ? void 0 : a.join(","))), !0 === A.$W.getConfig("coppa") && (s += "&coppa=1"), e.iframeEnabled ? [{
                    type: "iframe",
                    url: "https://ads.pubmatic.com/AdServer/js/user_sync.html?kdntuid=1&p=" + s
                }] : [{
                    type: "image",
                    url: "https://image8.pubmatic.com/AdServer/ImgSync?p=" + s
                }]
            }
        };

        function Gr(e) {
            const n = function(e) {
                let n;
                return (0, t.II)() && (n = (0, c.I6)(window.googletag.pubads().getSlots(), function(e) {
                    return n => (0, t.sC)(n, e)
                }(e))), n
            }(e);
            return n ? {
                gptSlot: n.getAdUnitPath(),
                divId: n.getSlotElementId()
            } : {}
        }

        function Hr(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function Jr(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Hr(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hr(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, Zt.a$)(Fr), (0, e.E)("pubmaticBidAdapter");
        const Kr = "ix",
            Qr = "roundel",
            Xr = [O.D4, O.G_, O.s6],
            Yr = [144, 144],
            Zr = {
                JPY: 1
            },
            ei = {
                PBJS: "p",
                IX: "x"
            },
            ti = {
                SITE: ["id", "name", "domain", "cat", "sectioncat", "pagecat", "page", "ref", "search", "mobile", "privacypolicy", "publisher", "content", "keywords", "ext"],
                USER: ["id", "buyeruid", "yob", "gender", "keywords", "customdata", "geo", "data", "ext"]
            },
            ni = {
                "liveramp.com": "idl",
                "netid.de": "NETID",
                "neustar.biz": "fabrickId",
                "zeotap.com": "zeotapIdPlus",
                "uidapi.com": "UID2",
                "adserver.org": "TDID",
                "id5-sync.com": "",
                "crwdcntrl.net": "",
                "epsilon.com": "",
                "audigent.com": "",
                "pubcid.org": "",
                "utiq.com": "",
                "criteo.com": "",
                "euid.eu": "",
                "intimatemerger.com": "",
                "33across.com": "",
                "liveintent.indexexchange.com": "",
                "google.com": ""
            },
            ri = ["britepoolid", "lipbid", "criteoId", "merkleId", "parrableId", "connectid", "tapadId", "quantcastId", "pubProvidedId", "pairId"],
            ii = ["mimes", "minduration", "maxduration"],
            oi = ["mimes", "minduration", "maxduration", "protocols", "protocol", "startdelay", "placement", "linearity", "skip", "skipmin", "skipafter", "sequence", "battr", "maxextended", "minbitrate", "maxbitrate", "boxingallowed", "playbackmethod", "playbackend", "delivery", "pos", "companionad", "api", "companiontype", "ext", "playerSize", "w", "h", "plcmt"],
            si = `${Kr}_features`,
            ai = (0, te.vM)({
                bidderCode: Kr
            }),
            di = {
                REQUESTED_FEATURE_TOGGLES: ["pbjs_enable_multiformat", "pbjs_allow_all_eids"],
                featureToggles: {},
                isFeatureEnabled: function(e) {
                    return (0, n.A)(this.featureToggles, `features.${e}.activated`, !1)
                },
                getFeatureToggles: function() {
                    if (ai.localStorageIsEnabled()) {
                        const e = (0, t.$l)(ai.getDataFromLocalStorage(si));
                        (0, n.A)(e, "expiry") && e.expiry >= (new Date).getTime() ? this.featureToggles = e : this.clearFeatureToggles()
                    }
                },
                setFeatureToggles: function(e) {
                    const t = e.body,
                        r = new Date,
                        i = (0, n.A)(t, "ext.features");
                    i && (this.featureToggles = {
                        expiry: r.setHours(r.getHours() + 1),
                        features: i
                    }, ai.localStorageIsEnabled() && ai.setDataInLocalStorage(si, JSON.stringify(this.featureToggles)))
                },
                clearFeatureToggles: function() {
                    this.featureToggles = {}, ai.localStorageIsEnabled() && ai.removeDataFromLocalStorage(si)
                }
            };
        let ci = 0,
            li = "",
            ui = "",
            pi = !1;

        function fi(e) {
            const i = mi(e, O.G_),
                o = (0, n.A)(e, "mediaTypes.video"),
                s = (0, n.A)(e, "params.video");
            if (yi(o, s).length) return {};
            i.video = s ? (0, t.Go)(e.params.video) : {};
            let a = (0, n.A)(e, "ortb2Imp.ext.tid");
            a && r(i, "ext.tid", a),
                function(e, t) {
                    if ((0, n.A)(t, "mediaTypes.video.context") === Ce.H6) {
                        let r = (0, n.A)(t, "mediaTypes.video.renderer");
                        if (r || (r = (0, n.A)(t, "renderer")), (0, n.A)(t, "schain", !1)) e.displaymanager = "pbjs_wrapper";
                        else if (r && "object" == typeof r) {
                            if (void 0 !== r.url) {
                                let t = "";
                                try {
                                    t = new URL(r.url).hostname
                                } catch {
                                    return
                                }
                                t.includes("js-sec.indexww") ? e.displaymanager = "ix" : e.displaymanager = r.url
                            }
                        } else e.displaymanager = "ix"
                    }
                }(i, e), xi(i, e);
            for (const e in o) - 1 === oi.indexOf(e) || i.video.hasOwnProperty(e) || (i.video[e] = o[e]);
            if (i.video.minduration > i.video.maxduration) return (0, t.vV)(`IX Bid Adapter: video minduration [${i.video.minduration}] cannot be greater than video maxduration [${i.video.maxduration}]`), {};
            const d = s && s.context || o && o.context;
            if (function(e) {
                    e.video.hasOwnProperty("plcmt") && (!(0, t.Fq)(e.video.plcmt) || e.video.plcmt < 1 || e.video.plcmt > 4) && ((0, t.JE)(`IX Bid Adapter: video.plcmt [${e.video.plcmt}] must be an integer between 1-4 inclusive`), delete e.video.plcmt)
                }(i), d && !i.video.hasOwnProperty("placement") && (d === Ce.mn ? i.video.placement = 1 : d === Ce.H6 ? (0, n.A)(s, "playerConfig.floatOnScroll") ? i.video.placement = 5 : (i.video.placement = 3, pi = !0) : (0, t.JE)(`IX Bid Adapter: Video context '${d}' is not supported`)), !i.video.w || !i.video.h) {
                const r = _i((0, n.A)(i, "video.playerSize")) || _i((0, n.A)(e, "params.size"));
                if (!r) return (0, t.JE)("IX Bid Adapter: Video size is missing in [mediaTypes.video]"), {};
                i.video.w = r[0], i.video.h = r[1]
            }
            return gi(e, i, O.G_), i
        }

        function mi(e, t) {
            const i = {};
            if (i.id = e.bidId, $i() && (0, n.A)(e, "params.externalId") && r(i, "ext.externalID", e.params.externalId), (0, n.A)(e, `params.${t}.siteId`) && !isNaN(Number(e.params[t].siteId))) switch (t) {
                case O.D4:
                    r(i, "ext.siteID", e.params.banner.siteId.toString());
                    break;
                case O.G_:
                    r(i, "ext.siteID", e.params.video.siteId.toString());
                    break;
                case O.s6:
                    r(i, "ext.siteID", e.params.native.siteId.toString())
            } else e.params.siteId && r(i, "ext.siteID", e.params.siteId.toString());
            return !e.params.hasOwnProperty("id") || "string" != typeof e.params.id && "number" != typeof e.params.id || r(i, "ext.sid", String(e.params.id)), i
        }

        function gi(e, n, i) {
            let o = null,
                s = null;
            if (e.params.bidFloor && e.params.bidFloorCur && (o = {
                    floor: e.params.bidFloor,
                    currency: e.params.bidFloorCur
                }), (0, t.fp)(e.getFloor)) {
                let r = "*",
                    o = "*";
                if (i && (0, t.gR)(Xr, i)) {
                    const {
                        w: e,
                        h: t
                    } = n[i];
                    r = i, o = [e, t]
                }
                try {
                    s = e.getFloor({
                        mediaType: r,
                        size: o
                    })
                } catch (e) {
                    (0, t.JE)("priceFloors module call getFloor failed, error : ", e)
                }
            }
            let a = !1;
            s ? (n.bidfloor = s.floor, n.bidfloorcur = s.currency, r(n, "ext.fl", ei.PBJS), a = !0) : o && (n.bidfloor = o.floor, n.bidfloorcur = o.currency, r(n, "ext.fl", ei.IX), a = !0), a && (i == O.D4 ? (r(n, "banner.ext.bidfloor", n.bidfloor), r(n, "banner.ext.fl", n.ext.fl)) : i == O.G_ ? (r(n, "video.ext.bidfloor", n.bidfloor), r(n, "video.ext.fl", n.ext.fl)) : (r(n, "native.ext.bidfloor", n.bidfloor), r(n, "native.ext.fl", n.ext.fl)))
        }

        function bi(e, r, i) {
            var o;
            const s = {},
                a = !(!(0, n.A)(e, "exp") || !(0, t.Fq)(e.exp)),
                d = (0, n.A)(e, "dealid") || (0, n.A)(e, "ext.dealid");
            Zr.hasOwnProperty(r) ? s.cpm = e.price / Zr[r] : s.cpm = e.price / 100, s.requestId = e.impid, d && (s.dealId = d), s.netRevenue = !0, s.currency = r, s.creativeId = e.hasOwnProperty("crid") ? e.crid : "-", 2 != e.mtype || (!e.ext || e.ext.vasturl) && e.ext ? e.ext && e.ext.vasturl && (s.vastUrl = e.ext.vasturl) : s.vastXml = e.adm;
            let c = null;
            if ("string" == typeof e.adm && "{" === e.adm[0] && "}" === e.adm[e.adm.length - 1]) try {
                c = JSON.parse(e.adm)
            } catch (e) {
                (0, t.JE)("adm looks like JSON but failed to parse: ", e)
            }
            return e.ext && e.ext.vasturl || 2 == e.mtype ? (s.width = i.video.w, s.height = i.video.h, s.mediaType = O.G_, s.mediaTypes = i.mediaTypes, s.ttl = a ? e.exp : 3600) : c && c.native ? (s.native = {
                ortb: c.native
            }, s.width = e.w ? e.w : 1, s.height = e.h ? e.h : 1, s.mediaType = O.s6, s.ttl = a ? e.exp : 3600) : (s.ad = e.adm, s.width = e.w, s.height = e.h, s.mediaType = O.D4, s.ttl = a ? e.exp : 300), s.meta = {}, s.meta.networkId = (0, n.A)(e, "ext.dspid"), s.meta.brandId = (0, n.A)(e, "ext.advbrandid"), s.meta.brandName = (0, n.A)(e, "ext.advbrand"), e.adomain && e.adomain.length > 0 && (s.meta.advertiserDomains = e.adomain), null !== (o = e.ext) && void 0 !== o && o.dsa && (s.meta.dsa = e.ext.dsa), s
        }

        function hi(e) {
            return Array.isArray(e) && 2 === e.length && (0, t.Fq)(e[0]) && (0, t.Fq)(e[1])
        }

        function vi() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if (hi(e)) return e[0] === t[0] && e[1] === t[1];
            for (let n = 0; n < e.length; n++)
                if (e[n][0] === t[0] && e[n][1] === t[1]) return !0;
            return !1
        }

        function yi(e, n) {
            const r = [];
            e || (0, t.JE)("IX Bid Adapter: mediaTypes.video is the preferred location for video params in ad unit");
            for (let t of ii) {
                const i = e && e.hasOwnProperty(t),
                    o = n && n.hasOwnProperty(t);
                i || o || r.push(`IX Bid Adapter: ${t} is not included in either the adunit or params level`)
            }
            const i = e && e.hasOwnProperty("protocol"),
                o = e && e.hasOwnProperty("protocols"),
                s = n && n.hasOwnProperty("protocol"),
                a = n && n.hasOwnProperty("protocols");
            return i || o || s || a || r.push("IX Bid Adapter: protocol/protcols is not included in either the adunit or params level"), r
        }

        function _i() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return hi(e) ? e : !!hi(e[0]) && e[0]
        }

        function Ii(e, t, n) {
            if (e) return Jr(Jr({}, (0, c.I6)(n, (t => t.bidId === e))), (0, c.I6)(t, (t => t.id === e)))
        }

        function Ei(e, i, o, s) {
            let a = function(e) {
                    let r = [],
                        i = {};
                    if ((0, t.cy)(e))
                        for (const t of e) {
                            const e = ni.hasOwnProperty(t.source),
                                o = di.isFeatureEnabled("pbjs_allow_all_eids"),
                                s = (0, n.A)(t, "uids.0");
                            if ((e || o) && s && (i[t.source] = !0, e && "" !== ni[t.source] && (t.uids[0].ext = {
                                    rtiPartner: ni[t.source]
                                }), delete t.uids[0].atype, r.push(t), r.length >= 50)) break
                        }
                    return {
                        toSend: r,
                        seenSources: i
                    }
                }((0, n.A)(e, "0.userIdAsEids")),
                d = a.toSend;
            if (window.headertag && "function" == typeof window.headertag.getIdentityInfo && function(e, t) {
                    let n = window.headertag.getIdentityInfo();
                    if (n && "object" == typeof n)
                        for (const r in n) {
                            if (e.length >= 50) return;
                            if (n.hasOwnProperty(r)) {
                                let i = n[r];
                                !i.responsePending && i.data && "object" == typeof i.data && Object.keys(i.data).length && !t.seenSources[i.data.source] && e.push(i.data)
                            }
                        }
                }(d, a), i && i.bidderCode === Qr && !a.seenSources["liveramp.com"]) return [];
            const c = [];
            let l = function(e) {
                const t = {};
                return t.id = e[0].bidderRequestId.toString(), t.site = {}, t.ext = {}, t.ext.source = "prebid", t.ext.ixdiag = {}, t.ext.ixdiag.ls = ai.localStorageIsEnabled(), t.imp = [], t.at = 1, t
            }(e);
            l = function(e, t) {
                return t.length > 0 && (e.ext.features = {}, t.forEach((t => {
                    e.ext.features[t] = {
                        activated: di.isFeatureEnabled(t)
                    }
                }))), e
            }(l, di.REQUESTED_FEATURE_TOGGLES);
            let u = function(e, t) {
                var r = e.map((e => e.adUnitCode)).filter(((e, t, n) => n.indexOf(e) === t));
                let i = (0, n.A)(e, "0.userIdAsEids", []),
                    o = {
                        mfu: 0,
                        bu: 0,
                        iu: 0,
                        nu: 0,
                        ou: 0,
                        allu: 0,
                        ren: !1,
                        version: "8.51.0",
                        userIds: Ci(e[0]),
                        url: window.location.href.split("?")[0],
                        vpd: pi,
                        ae: t,
                        eidLength: i.length
                    };
                for (let t of r) {
                    let r = e.filter((e => e.adUnitCode === t))[0];
                    (0, n.A)(r, "mediaTypes") && (Object.keys(r.mediaTypes).length > 1 && o.mfu++, (0, n.A)(r, "mediaTypes.native") && o.nu++, (0, n.A)(r, "mediaTypes.banner") && o.bu++, "outstream" === (0, n.A)(r, "mediaTypes.video.context") && (o.ou++, Ui(r) && (o.ren = !0)), "instream" === (0, n.A)(r, "mediaTypes.video.context") && o.iu++, o.allu++)
                }
                return o
            }(e, (0, n.A)(i, "fledgeEnabled"));
            for (let e in u) l.ext.ixdiag[e] = u[e];
            l = function(e, t, r, i, o) {
                var s;
                const a = (0, n.A)(t, "timeout");
                return a && (e.ext.ixdiag.tmax = a), A.$W.getConfig("userSync") && (e.ext.ixdiag.syncsPerBidder = A.$W.getConfig("userSync").syncsPerBidder), e.ext.ixdiag.imps = Object.keys(r).length, e.source = {
                    tid: null == t || null === (s = t.ortb2) || void 0 === s || null === (s = s.source) || void 0 === s ? void 0 : s.tid
                }, i[0].schain && (e.source.ext = {}, e.source.ext.schain = i[0].schain), o.length > 0 && (e.user = {}, e.user.eids = o), document.referrer && "" !== document.referrer && (e.site.ref = document.referrer), e
            }(l, i, o, e, d), l = function(e, t) {
                if (t) {
                    t.gdprConsent && (li = t.gdprConsent, li.hasOwnProperty("gdprApplies") && (e.regs = {
                        ext: {
                            gdpr: li.gdprApplies ? 1 : 0
                        }
                    }), li.hasOwnProperty("consentString") && (e.user = e.user || {}, e.user.ext = {
                        consent: li.consentString || ""
                    }, li.hasOwnProperty("addtlConsent") && li.addtlConsent && (e.user.ext.consented_providers_settings = {
                        addtl_consent: li.addtlConsent
                    }))), t.uspConsent && (r(e, "regs.ext.us_privacy", t.uspConsent), ui = t.uspConsent);
                    const i = (0, n.A)(t, "refererInfo.page");
                    i && (e.site.page = i), t.gppConsent && (r(e, "regs.gpp", t.gppConsent.gppString), r(e, "regs.gpp_sid", t.gppConsent.applicableSections))
                }
                return A.$W.getConfig("coppa") && r(e, "regs.coppa", 1), e
            }(l, i), e[0].params.siteId && (ci = e[0].params.siteId);
            const p = Object.keys(o);
            let f = !1;
            for (let r = 0; r < p.length && !(c.length >= 4); r++) {
                l = Ai(o, p, l, r);
                const s = (0, n.A)(i, "ortb2") || {},
                    a = Jr({}, s.site || s.context);
                a.page = Oi(i);
                const d = Jr({}, s.user);
                (0, t.Im)(s) || f || (l = wi(i, l, s, a, d), l.site = (0, t.D9)({}, l.site, a), l.user = (0, t.D9)({}, l.user, d), f = !0), l = Ti(o, l, p, r);
                const u = r === p.length - 1;
                if (l = Li(l), l = Mi(l), l = Wi(l), u) {
                    let n = "https://htlb.casalemedia.com/openrtb/pbjs?";
                    0 !== ci && (n += `s=${ci}`), $i() && (n += 0 !== ci ? "&" : "", n += `p=${A.$W.getConfig("exchangeId")}`), c.push({
                        method: "POST",
                        url: n,
                        data: (0, t.Go)(l),
                        option: {
                            contentType: "text/plain"
                        },
                        validBidRequests: e
                    }), l.imp = [], f = !1
                }
            }
            return c
        }

        function Ai(e, i, o, s) {
            const a = e[i[s]],
                {
                    missingImps: d = [],
                    ixImps: c = []
                } = a,
                l = {
                    ixImps: c,
                    missingBannerImpressions: d
                },
                u = Object.keys(l).map((e => l[e])).filter((e => Array.isArray(e))).reduce(((e, t) => e.concat(...t)), []),
                p = e[i[s]].gpid,
                f = e[i[s]].dfp_ad_unit_code,
                m = e[i[s]].tid,
                g = e[i[s]].sid,
                b = e[i[s]].ae,
                h = u.filter((e => O.D4 in e)),
                v = u.filter((e => !(O.D4 in e)));
            if (h.length > 0) {
                const a = h.reduce(((e, t) => (e[t.adunitCode] || (e[t.adunitCode] = []), e[t.adunitCode].push(t), e)), {});
                for (const d in a) {
                    const c = a[d],
                        {
                            id: l,
                            banner: {
                                topframe: u
                            }
                        } = c[0];
                    let h = (0, n.A)(c[0], "ext.externalID");
                    const v = {
                        id: l,
                        banner: {
                            topframe: u,
                            format: c.map((e => {
                                let {
                                    banner: {
                                        w: t,
                                        h: n
                                    },
                                    ext: r
                                } = e;
                                return {
                                    w: t,
                                    h: n,
                                    ext: r
                                }
                            }))
                        }
                    };
                    for (let e = 0; e < v.banner.format.length; e++) null != v.banner.format[e].ext && (null != v.banner.format[e].ext.sid && delete v.banner.format[e].ext.sid, null != v.banner.format[e].ext.externalID && delete v.banner.format[e].ext.externalID), "bidfloor" in c[e] && (v.banner.format[e].ext.bidfloor = c[e].bidfloor), "{}" === JSON.stringify(v.banner.format[e].ext) && delete v.banner.format[e].ext;
                    const y = e[i[s]].pos;
                    (0, t.Fq)(y) && (v.banner.pos = y), (f || p || m || g || b || h) && (v.ext = {}, v.ext.dfp_ad_unit_code = f, v.ext.gpid = p, v.ext.tid = m, v.ext.sid = g, v.ext.externalID = h, 1 == b && (v.ext.ae = 1)), "bidfloor" in c[0] && (v.bidfloor = c[0].bidfloor), "bidfloorcur" in c[0] && (v.bidfloorcur = c[0].bidfloorcur);
                    const _ = e[i[s]].adUnitFPD;
                    _ && r(v, "ext.data", _), o.imp.push(v)
                }
            }
            return v.length > 0 && v.forEach((e => {
                if (p && r(e, "ext.gpid", p), o.imp.length > 0) {
                    let t = !1;
                    o.imp.forEach(((i, s) => {
                        e.id === i.id && O.G_ in e ? (i.video = e.video, i.video.ext = Object.assign({}, e.video.ext, e.ext), (0, n.A)(i, "video.ext.bidfloor", !1) && (0, n.A)(i, "bidfloor", !1) && i.video.ext.bidfloor < i.bidfloor && (i.bidfloor = i.video.ext.bidfloor), !(0, n.A)(i, "ext.siteID", !1) && (0, n.A)(e, "video.ext.siteID") && (r(i, "ext.siteID", e.video.ext.siteID), r(o, "ext.ixdiag.usid", !0)), t = !0) : e.id === i.id && O.s6 in e && (i.native = e.native, i.native.ext = Object.assign({}, e.native.ext, e.ext), (0, n.A)(i, "native.ext.bidfloor", !1) && (0, n.A)(i, "bidfloor", !1) && i.native.ext.bidfloor < i.bidfloor && (i.bidfloor = i.native.ext.bidfloor), !(0, n.A)(i, "ext.siteID", !1) && (0, n.A)(e, "native.ext.siteID", !1) && (r(i, "ext.siteID", e.native.ext.siteID), r(o, "ext.ixdiag.usid", !0)), t = !0)
                    })), t || o.imp.push(e)
                } else o.imp.push(e)
            })), o
        }

        function Oi(e) {
            const r = e && e.bidderCode || "ix",
                i = A.$W.getConfig(r);
            let o = "";
            return o = (0, n.A)(e, "ortb2.site.page") ? e.ortb2.site.page : (0, n.A)(e, "refererInfo.page"), i && "object" == typeof i.firstPartyData ? function(e, r, i) {
                let o;
                try {
                    o = new URL(r)
                } catch (i) {
                    (0, t.JE)(`IX Bid Adapter: Invalid URL set in ortb2.site.page: ${r}. Using referer URL instead.`), o = new URL((0, n.A)(e, "refererInfo.page"))
                }
                const s = new URLSearchParams(o.search);
                for (const [e, t] of Object.entries(i)) s.has(e) || s.append(e, t);
                return o.search = s.toString(), o.toString()
            }(e, o, i.firstPartyData) : o
        }

        function wi(e, n, i, o, s) {
            if (n.ext.ixdiag.fpd = !0, Object.keys(o).forEach((e => {
                    -1 === ti.SITE.indexOf(e) && delete o[e]
                })), Object.keys(s).forEach((e => {
                    -1 === ti.USER.indexOf(e) && delete s[e]
                })), i.device) {
                const e = Jr({}, i.device.sua);
                (0, t.Im)(e) || r(n, "device.sua", e)
            }
            var a;
            if (i.hasOwnProperty("regs") && !e.gppConsent && (i.regs.hasOwnProperty("gpp") && "string" == typeof i.regs.gpp && r(n, "regs.gpp", i.regs.gpp), i.regs.hasOwnProperty("gpp_sid") && Array.isArray(i.regs.gpp_sid) && r(n, "regs.gpp_sid", i.regs.gpp_sid), null !== (a = i.regs.ext) && void 0 !== a && a.dsa)) {
                const e = i.regs.ext.dsa,
                    o = {};
                if (["dsarequired", "pubrender", "datatopub"].forEach((n => {
                        (0, t.Et)(e[n]) && (o[n] = e[n])
                    })), (0, t.cy)(e.transparency)) {
                    const n = [];
                    e.transparency.forEach((e => {
                        (0, t.Qd)(e) && (0, t.O8)(e.domain) && "" != e.domain && (0, t.cy)(e.dsaparams) && e.dsaparams.every((e => (0, t.Et)(e))) && n.push(e)
                    })), n.length > 0 && (o.transparency = n)
                }(0, t.Im)(o) || r(n, "regs.ext.dsa", o)
            }
            return n
        }

        function xi(e, t) {
            const i = (0, n.A)(t, "ortb2Imp.ext.data");
            i && r(e, "ext.data", i)
        }

        function Ti(e, t, n, r, i, o) {
            const s = e[n[r]].pbadslot,
                a = e[n[r]].tagId,
                d = e[n[r]].adUnitCode,
                c = e[n[r]].divId;
            return (s || a || d || c) && (t.ext.ixdiag.pbadslot = s, t.ext.ixdiag.tagid = a, t.ext.ixdiag.adunitcode = d, t.ext.ixdiag.divId = c), t
        }

        function Ci(e) {
            const t = e.userId || {};
            return ri.filter((e => t[e]))
        }

        function Si(e, t) {
            if (t)
                for (let n = 0; n < e.length; n++) {
                    const r = e[n];
                    if (t[0] === r[0] && t[1] === r[1]) {
                        e.splice(n, 1);
                        break
                    }
                }
        }

        function ki(e, t) {
            const i = function(e) {
                const t = mi(e, O.s6),
                    i = e.nativeOrtbRequest;
                i.eventtrackers = [{
                    event: 1,
                    methods: [1, 2]
                }], i.privacy = 1, t.native = {
                    request: JSON.stringify(i),
                    ver: "1.2"
                };
                let o = (0, n.A)(e, "ortb2Imp.ext.tid");
                return o && r(t, "ext.tid", o), xi(t, e), gi(e, t, O.s6), t
            }(e);
            if (0 != Object.keys(i).length) {
                t[e.adUnitCode] = {}, t[e.adUnitCode].ixImps = [], t[e.adUnitCode].ixImps.push(i), t[e.adUnitCode].gpid = (0, n.A)(e, "ortb2Imp.ext.gpid"), t[e.adUnitCode].dfp_ad_unit_code = (0, n.A)(e, "ortb2Imp.ext.data.adserver.adslot"), t[e.adUnitCode].pbadslot = (0, n.A)(e, "ortb2Imp.ext.data.pbadslot"), t[e.adUnitCode].tagId = (0, n.A)(e, "params.tagId");
                const r = e.adUnitCode,
                    o = document.getElementById(r) ? r : Gr(r).divId;
                t[e.adUnitCode].adUnitCode = r, t[e.adUnitCode].divId = o
            }
        }

        function Di(e, t) {
            const r = fi(e);
            if (0 != Object.keys(r).length) {
                t[e.adUnitCode] = {}, t[e.adUnitCode].ixImps = [], t[e.adUnitCode].ixImps.push(r), t[e.adUnitCode].gpid = (0, n.A)(e, "ortb2Imp.ext.gpid"), t[e.adUnitCode].dfp_ad_unit_code = (0, n.A)(e, "ortb2Imp.ext.data.adserver.adslot"), t[e.adUnitCode].pbadslot = (0, n.A)(e, "ortb2Imp.ext.data.pbadslot"), t[e.adUnitCode].tagId = (0, n.A)(e, "params.tagId");
                const i = e.adUnitCode,
                    o = document.getElementById(i) ? i : Gr(i).divId;
                t[e.adUnitCode].adUnitCode = i, t[e.adUnitCode].divId = o
            }
        }

        function Ri(e, r, i, o) {
            let s = function(e) {
                const r = mi(e, O.D4);
                r.banner = {}, r.adunitCode = e.adUnitCode;
                const i = (0, n.A)(e, "params.size");
                return i && (r.banner.w = i[0], r.banner.h = i[1]), r.banner.topframe = (0, t.al)() ? 0 : 1, gi(e, r, O.D4), r
            }(e);
            const a = vi((0, n.A)(e, "mediaTypes.banner.sizes"), (0, n.A)(e, "params.size"));
            if (i.hasOwnProperty(e.adUnitCode) || (i[e.adUnitCode] = {}), i[e.adUnitCode].gpid = (0, n.A)(e, "ortb2Imp.ext.gpid"), i[e.adUnitCode].dfp_ad_unit_code = (0, n.A)(e, "ortb2Imp.ext.data.adserver.adslot"), i[e.adUnitCode].tid = (0, n.A)(e, "ortb2Imp.ext.tid"), i[e.adUnitCode].pbadslot = (0, n.A)(e, "ortb2Imp.ext.data.pbadslot"), i[e.adUnitCode].tagId = (0, n.A)(e, "params.tagId"), i[e.adUnitCode].pos = (0, n.A)(e, "mediaTypes.banner.pos"), (0, n.A)(o, "fledgeEnabled")) {
                const r = (0, n.A)(e, "ortb2Imp.ext.ae");
                r ? (0, t.Fq)(r) ? i[e.adUnitCode].ae = r : (0, t.JE)("error setting auction environment flag - must be an integer") : 1 == (0, n.A)(o, "defaultForSlots") && (i[e.adUnitCode].ae = 1)
            }
            const d = (0, n.A)(e, "ortb2Imp.ext.data");
            d && (i[e.adUnitCode].adUnitFPD = d);
            const c = (0, n.A)(e, "params.id");
            !c || "string" != typeof c && "number" != typeof c || (i[e.adUnitCode].sid = String(c));
            const l = e.adUnitCode,
                u = document.getElementById(l) ? l : Gr(l).divId;
            i[e.adUnitCode].adUnitCode = l, i[e.adUnitCode].divId = u, a && (i[e.adUnitCode].hasOwnProperty("ixImps") || (i[e.adUnitCode].ixImps = []), i[e.adUnitCode].ixImps.push(s)),
                function(e, r, i) {
                    if (r.hasOwnProperty(e.adUnitCode)) {
                        let t = [];
                        r[e.adUnitCode].hasOwnProperty("missingSizes") && (t = r[e.adUnitCode].missingSizes), Si(t, e.params.size), r[e.adUnitCode].missingSizes = t
                    } else if ((0, n.A)(e, "mediaTypes.banner.sizes")) {
                        let n = (0, t.Go)(e.mediaTypes.banner.sizes);
                        Si(n, e.params.size);
                        let o = {
                            missingSizes: n,
                            impression: i
                        };
                        r[e.adUnitCode] = o
                    }
                }(e, r, s)
        }

        function ji(e, n, r) {
            const i = (0, t.Go)(n);
            return i.banner.w = r[0], i.banner.h = r[1], gi(e, i, O.D4), i
        }

        function Bi(e) {
            e.renderer.push((function() {
                const n = e.adUnitCode,
                    r = document.getElementById(n) ? n : Gr(n).divId;
                r ? window.createIXPlayer(r, e) : (0, t.JE)(`IX Bid Adapter: adUnitCode: ${r} not found on page.`)
            }))
        }

        function Pi(e, n) {
            const r = Yt.A4.install({
                id: e,
                url: n,
                loaded: !1
            });
            try {
                r.setRender(Bi)
            } catch (e) {
                return (0, t.JE)("Prebid Error calling setRender on renderer", e), null
            }
            return n ? r : ((0, t.JE)("Outstream renderer URL not found"), null)
        }

        function Ui(e) {
            if ("outstream" !== (0, n.A)(e, "mediaTypes.video.context")) return !1;
            let t = (0, n.A)(e, "mediaTypes.video.renderer");
            return t || (t = (0, n.A)(e, "renderer")), !("object" == typeof t && t.url && t.render) || t.backupOnly
        }

        function $i() {
            let e = A.$W.getConfig("exchangeId");
            return !("number" != typeof e || !isFinite(e)) || !("string" != typeof e || "" === e.trim() || !isFinite(Number(e)))
        }
        const qi = {
            code: Kr,
            gvlid: 10,
            aliases: [{
                code: Qr,
                gvlid: 10,
                skipPbsAliasing: !1
            }],
            supportedMediaTypes: Xr,
            isBidRequestValid: function(e) {
                const r = (0, n.A)(e, "params.video"),
                    i = (0, n.A)(e, "params.size"),
                    o = (0, n.A)(e, "mediaTypes.banner.sizes"),
                    s = (0, n.A)(e, "mediaTypes.video"),
                    a = (0, n.A)(e, "mediaTypes.video.playerSize"),
                    d = e.params.hasOwnProperty("bidFloor"),
                    c = e.params.hasOwnProperty("bidFloorCur");
                if (e.hasOwnProperty("mediaType") && !(0, t.gR)(Xr, e.mediaType)) return (0, t.JE)("IX Bid Adapter: media type is not supported."), !1;
                if ((0, n.A)(e, "mediaTypes.banner") && !o) return !1;
                if (i) {
                    const n = _i(i);
                    if (!n) return (0, t.vV)("IX Bid Adapter: size has invalid format."), !1;
                    if (!vi(e.sizes, n) && !vi(a, n) && !vi(o, n)) return (0, t.vV)("IX Bid Adapter: bid size is not included in ad unit sizes or player size."), !1
                }
                if (!$i() && null == e.params.siteId) return (0, t.vV)("IX Bid Adapter: Invalid configuration - either siteId or exchangeId must be configured."), !1;
                if (void 0 !== e.params.siteId) {
                    if ("string" != typeof e.params.siteId && "number" != typeof e.params.siteId) return (0, t.vV)("IX Bid Adapter: siteId must be string or number type."), !1;
                    if ("string" != typeof e.params.siteId && isNaN(Number(e.params.siteId))) return (0, t.vV)("IX Bid Adapter: siteId must valid value"), !1
                }
                if ((d || c) && !(d && c && (l = e.params.bidFloor, u = e.params.bidFloorCur, Boolean("number" == typeof l && "string" == typeof u && u.match(/^[A-Z]{3}$/))))) return (0, t.vV)("IX Bid Adapter: bidFloor / bidFloorCur parameter has invalid format."), !1;
                var l, u;
                if (s && r) {
                    const i = fi(e).video,
                        o = yi(s, r);
                    if ((0, n.A)(e, "mediaTypes.video.context") === Ce.H6 && Ui(e) && i) {
                        const e = [(0, n.A)(i, "w"), (0, n.A)(i, "h")];
                        if (!(e[0] >= Yr[0] && e[1] >= Yr[1])) return (0, t.vV)(`IX Bid Adapter: ${e} is an invalid size for IX outstream renderer`), !1
                    }
                    if (o.length) return o.forEach((e => {
                        (0, t.vV)(e)
                    })), !1
                }
                return function(e) {
                    return void 0 === (0, n.A)(e, "mediaTypes.native") || e.nativeOrtbRequest && Array.isArray(e.nativeOrtbRequest.assets) && e.nativeOrtbRequest.assets.length > 0
                }(e)
            },
            resetSiteID: function() {
                ci = 0
            },
            buildRequests: function(e, r) {
                const i = [],
                    o = {},
                    s = {},
                    a = {},
                    d = {};
                di.getFeatureToggles(), e.forEach((e => {
                    const i = Object.keys((0, n.A)(e, "mediaTypes", {}));
                    for (const n in i) switch (i[n]) {
                        case O.D4:
                            Ri(e, d, o, r);
                            break;
                        case O.G_:
                            Di(e, s);
                            break;
                        case O.s6:
                            ki(e, a);
                            break;
                        default:
                            (0, t.JE)(`IX Bid Adapter: ad unit mediaTypes ${n} is not supported`)
                    }
                }));
                for (let t in d)
                    if (d.hasOwnProperty(t)) {
                        let n = d[t].missingSizes;
                        o.hasOwnProperty(t) || (o[t] = {}), o[t].hasOwnProperty("missingImps") || (o[t].missingImps = [], o[t].missingCount = 0);
                        let r = d[t].impression;
                        for (let i = 0; i < n.length; i++) {
                            let s = ji(e[0], r, n[i]);
                            o[t].missingImps.push(s), o[t].missingCount++
                        }
                    }
                let c = [];
                return Object.keys(o).length > 0 && c.push(o), Object.keys(s).length > 0 && c.push(s), Object.keys(a).length > 0 && c.push(a), di.isFeatureEnabled("pbjs_enable_multiformat") ? i.push(...Ei(e, r, function(e) {
                    const t = {};
                    return e.forEach((e => {
                        Object.keys(e).forEach((n => {
                            Object.keys(t).includes(n) ? t[n].hasOwnProperty("ixImps") && e[n].hasOwnProperty("ixImps") ? t[n].ixImps = [...t[n].ixImps, ...e[n].ixImps] : t[n].hasOwnProperty("missingImps") && e[n].hasOwnProperty("missingImps") ? t[n].missingImps = [...t[n].missingImps, ...e[n].missingImps] : e[n].hasOwnProperty("ixImps") ? t[n].ixImps = e[n].ixImps : e[n].hasOwnProperty("missingImps") && (t[n].missingImps = e[n].missingImps) : t[n] = e[n]
                        }))
                    })), t
                }(c))) : (Object.keys(o).length > 0 && i.push(...Ei(e, r, o)), Object.keys(s).length > 0 && i.push(...Ei(e, r, s)), Object.keys(a).length > 0 && i.push(...Ei(e, r, a))), i
            },
            interpretResponse: function(e, r) {
                const i = [];
                let o = null,
                    s = (0, n.A)(e, "body.ext.protectedAudienceAuctionConfigs") || [];
                if (di.setFeatureToggles(e), !e.hasOwnProperty("body")) return i;
                const a = e.body,
                    d = a.seatbid || [];
                for (let s = 0; s < d.length; s++) {
                    if (!d[s].hasOwnProperty("bid")) continue;
                    const c = d[s].bid,
                        l = r.data;
                    for (let e = 0; e < c.length; e++) {
                        const t = Ii(c[e].impid, l.imp, r.validBidRequests);
                        if (o = bi(c[e], a.cur, t), o.mediaType === O.G_ && Ui(t)) {
                            const t = (0, n.A)(a, "ext.videoplayerurl");
                            if (o.renderer = Pi(c[e].bidId, t), !o.renderer) continue
                        }
                        i.push(o)
                    }
                    if ((0, n.A)(l, "ext.ixdiag.err") && ai.localStorageIsEnabled()) try {
                        ai.removeDataFromLocalStorage("ixdiag")
                    } catch (e) {
                        (0, t.vV)("ix can not clear ixdiag from localStorage.")
                    }
                }
                if (!(Array.isArray(s) && s.length > 0)) return i;
                s = s.filter((e => !! function(e) {
                    return "object" == typeof e && null !== e
                }(e) || ((0, t.JE)("Malformed auction config detected:", e), !1)));
                try {
                    return {
                        bids: i,
                        fledgeAuctionConfigs: s
                    }
                } catch (e) {
                    return (0, t.JE)("Error attaching AuctionConfigs", e), i
                }
            },
            getUserSyncs: function(e, t) {
                const r = [];
                let i = null;
                if (t.length > 0 && (i = (0, n.A)(t[0], "body.ext.publishersyncsperbidderoverride")), void 0 !== i && 0 == i) return [];
                if (e.iframeEnabled) r.push({
                    type: "iframe",
                    url: "https://js-sec.indexww.com/um/ixmatch.html"
                });
                else {
                    let e = null;
                    A.$W.getConfig("userSync") && (e = A.$W.getConfig("userSync").syncsPerBidder), 0 === e && (e = i), e = i && (0 === e || e) ? i > e ? e : i : 1;
                    for (let t = 0; t < e; t++) r.push({
                        type: "image",
                        url: Ni(e, t)
                    })
                }
                return r
            }
        };

        function Ni(e, t) {
            let n = "",
                r = "0";
            return li && li.hasOwnProperty("gdprApplies") && (r = li.gdprApplies ? "1" : "0"), li && li.hasOwnProperty("consentString") && (n = li.consentString || ""), "https://dsum.casalemedia.com/pbusermatch?origin=prebid" + (0 !== ci ? "&site_id=" + ci.toString() : "") + "&p=" + e.toString() + "&i=" + t.toString() + "&gdpr=" + r + "&gdpr_consent=" + n + "&us_privacy=" + (ui || "")
        }

        function Mi(e) {
            return e.imp.forEach(((t, n) => {
                const r = t.ext;
                if (null == r) return e;
                zi(t) < 2 || Object.keys(r).forEach((i => {
                    if (O.D4 in t) {
                        const o = t.banner.ext;
                        if (void 0 !== o && void 0 !== o[i] && o[i] == r[i] && delete e.imp[n].banner.ext[i], void 0 !== t.banner.format)
                            for (let o = 0; o < t.banner.format.length; o++) null != t.banner.format[o].ext && null != t.banner.format[o].ext[i] && t.banner.format[o].ext[i] == r[i] && delete e.imp[n].banner.format[o].ext[i]
                    }
                    if (O.G_ in t) {
                        const o = t.video.ext;
                        void 0 !== o && void 0 !== o[i] && o[i] == r[i] && delete e.imp[n].video.ext[i]
                    }
                    if (O.s6 in t) {
                        const o = t.native.ext;
                        void 0 !== o && void 0 !== o[i] && o[i] == r[i] && delete e.imp[n].native.ext[i]
                    }
                }))
            })), e
        }

        function Wi(e) {
            return e.imp.forEach(((t, n) => {
                if (null == t.ext) return e;
                if (!(zi(t) < 2)) {
                    if (O.D4 in t) {
                        const i = t.banner.ext;
                        if (void 0 !== i && void 0 !== i.siteID && delete e.imp[n].banner.ext.siteID, void 0 !== t.banner.format)
                            for (let i = 0; i < t.banner.format.length; i++) void 0 !== t.banner.format[i].ext && void 0 !== t.banner.format[i].ext.siteID && (r(e.imp[n], "ext.siteID", t.banner.format[i].ext.siteID), r(e, "ext.ixdiag.usid", !0), delete e.imp[n].banner.format[i].ext.siteID)
                    }
                    if (O.G_ in t) {
                        const r = t.video.ext;
                        void 0 !== r && void 0 !== r.siteID && delete e.imp[n].video.ext.siteID
                    }
                    if (O.s6 in t) {
                        const r = t.native.ext;
                        void 0 !== r && void 0 !== r.siteID && delete e.imp[n].native.ext.siteID
                    }
                }
            })), e
        }

        function zi(e) {
            let t = 0;
            return void 0 !== e.banner && (t += 1), void 0 !== e.video && (t += 1), void 0 !== e.native && (t += 1), t
        }

        function Li(e) {
            return null == e.device && (e.device = {}), e.device.h = window.screen.height, e.device.w = window.screen.width, e
        }

        function Vi(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function Fi(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Vi(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vi(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, Zt.a$)(qi), (0, e.E)("ixBidAdapter"), __webpack_require__(511);
        const Gi = (0, te.vM)({
                bidderCode: "orbidder"
            }),
            Hi = {
                code: "orbidder",
                gvlid: 559,
                hostname: "https://orbidder.otto.de",
                supportedMediaTypes: [O.D4, O.s6],
                getHostname() {
                    let e = this.hostname;
                    try {
                        e = Gi.getDataFromLocalStorage("ov_orbidder_host") || e
                    } catch (e) {}
                    return e
                },
                isBidRequestValid: e => !(!(e.sizes && e.bidId && e.params && e.params.accountId && "string" == typeof e.params.accountId && e.params.placementId && "string" == typeof e.params.placementId) || void 0 !== e.params.keyValues && "object" != typeof e.params.keyValues),
                buildRequests(n, r) {
                    n = (0, s.Xj)(n);
                    const i = this.getHostname();
                    return n.map((n => {
                        let o = "";
                        r && r.refererInfo && (o = r.refererInfo.page || ""), n.params.bidfloor = function(e) {
                            if (!(0, t.fp)(e.getFloor)) return e.params.bidfloor;
                            const n = e.getFloor({
                                currency: "EUR",
                                mediaType: "*",
                                size: "*"
                            });
                            return (0, t.Qd)(n) && !isNaN(n.floor) && "EUR" === n.currency ? n.floor : void 0
                        }(n);
                        let s = {
                            url: `${i}/bid`,
                            method: "POST",
                            options: {
                                withCredentials: !0
                            },
                            data: Fi({
                                v: (0, e.m)().version,
                                pageUrl: o
                            }, n)
                        };
                        return r && r.gdprConsent && (s.data.gdprConsent = {
                            consentString: r.gdprConsent.consentString,
                            consentRequired: "boolean" == typeof r.gdprConsent.gdprApplies && r.gdprConsent.gdprApplies
                        }), s
                    }))
                },
                interpretResponse(e) {
                    const t = [];
                    return (e = e.body) && e.length > 0 && e.forEach((e => {
                        (function(e) {
                            let t = ["requestId", "cpm", "ttl", "creativeId", "netRevenue", "currency"];
                            switch (e.mediaType) {
                                case O.D4:
                                    t = t.concat(["width", "height", "ad"]);
                                    break;
                                case O.s6:
                                    if (!e.native.hasOwnProperty("impressionTrackers")) return !1;
                                    break;
                                default:
                                    return !1
                            }
                            for (const n of t)
                                if (!e.hasOwnProperty(n)) return !1;
                            return !0
                        })(e) && (Array.isArray(e.advertiserDomains) && (e.meta = {
                            advertiserDomains: e.advertiserDomains
                        }), t.push(e))
                    })), t
                }
            };

        function Ji(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function Ki(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Ji(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ji(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, Zt.a$)(Hi), (0, e.E)("orbidderBidAdapter");
        const Qi = "improvedigital",
            Xi = {
                DEFAULT_MIMES: ["video/mp4"],
                PLACEMENT_TYPE: {
                    INSTREAM: 1,
                    OUTSTREAM: 3
                }
            },
            Yi = {
                code: Qi,
                gvlid: 253,
                aliases: ["id"],
                supportedMediaTypes: [O.D4, O.s6, O.G_],
                syncStore: {
                    extendMode: !1,
                    placementId: null
                },
                isBidRequestValid: e => !!(e && e.params && (e.params.placementId || e.params.placementKey && e.params.publisherId)),
                buildRequests(e, t) {
                    return this.syncStore.placementId = this.syncStore.placementId || e[0].params.placementId, eo.buildServerRequests(e, t)
                },
                interpretResponse(e, t) {
                    let {
                        ortbRequest: n
                    } = t;
                    return Zi.fromORTB({
                        request: n,
                        response: e.body
                    }).bids
                },
                getUserSyncs(e, t, r, i) {
                    if (!0 === A.$W.getConfig("coppa") || !(0, en.C)(r)) return [];
                    const o = [];
                    if (!this.syncStore.extendMode && e.pixelEnabled || !e.iframeEnabled) e.pixelEnabled && t.forEach((e => {
                        (0, n.A)(e, `body.ext.${Qi}.sync`, []).forEach((e => {
                            o.some((t => t.url === e)) || o.push({
                                type: "image",
                                url: e
                            })
                        }))
                    }));
                    else {
                        const {
                            gdprApplies: e,
                            consentString: n
                        } = r || {}, s = new Set;
                        this.syncStore.extendMode && t && t.forEach((e => {
                            var t;
                            null != e && null !== (t = e.body) && void 0 !== t && null !== (t = t.ext) && void 0 !== t && t.responsetimemillis && Object.keys(e.body.ext.responsetimemillis).forEach((e => s.add(e)))
                        })), o.push({
                            type: "iframe",
                            url: `https://hb.360yield.com/prebid-universal-creative/load-cookie.html?placement_id=${this.syncStore.placementId}` + (this.syncStore.extendMode ? "&pbs=1" : "") + ("boolean" == typeof e ? `&gdpr=${Number(e)}` : "") + (n ? `&gdpr_consent=${n}` : "") + (i ? `&us_privacy=${encodeURIComponent(i)}` : "") + (s.size ? `&bidders=${[...s].join(",")}` : "")
                        })
                    }
                    return o
                }
            };
        (0, Zt.a$)(Yi);
        const Zi = Gn({
                context: {
                    ttl: 300,
                    nativeRequest: {
                        eventtrackers: [{
                            event: 1,
                            methods: [1, 2]
                        }]
                    }
                },
                imp(e, n, i) {
                    const o = e(n, i);
                    o.secure = Number("https:" === window.location.protocol), !o.bidfloor && n.params.bidFloor && (o.bidfloor = n.params.bidFloor, o.bidfloorcur = (0, t.u5)("bidFloorCur", n.params).toUpperCase() || "USD");
                    const s = i.extendMode ? "ext.prebid.bidder.improvedigital" : "ext.bidder",
                        a = n.params.placementId;
                    return a ? (r(o, `${s}.placementId`, a), i.extendMode && r(o, "ext.prebid.storedrequest.id", "" + a)) : (r(o, `${s}.publisherId`, (0, t.u5)("publisherId", n.params)), r(o, `${s}.placementKey`, (0, t.u5)("placementKey", n.params))), r(o, `${s}.keyValues`, (0, t.u5)("keyValues", n.params) || void 0), o
                },
                request(e, n, r, i) {
                    const o = e(n, r, i);
                    return (0, t.D9)(o, {
                        id: (0, t.s0)(),
                        source: {},
                        ext: {
                            improvedigital: {
                                sdk: {
                                    name: "pbjs",
                                    version: "8.51.0"
                                }
                            }
                        }
                    }), o
                },
                bidResponse(e, t, r) {
                    if (!t.adm || !t.price || t.hasOwnProperty("errorCode")) return;
                    const {
                        bidRequest: i
                    } = r;
                    r.mediaType = (() => {
                        const e = Object.keys(i.mediaTypes);
                        return 1 === e.length ? e[0] : -1 !== t.adm.search(/^(<\?xml|<vast)/i) ? O.G_ : "{" === t.adm[0] ? O.s6 : O.D4
                    })();
                    const o = e(t, r),
                        s = (0, n.A)(t, `ext.${Qi}`, {});
                    return 1 === s.pg && (o.adserverTargeting = {
                        hb_deal_type_improve: "pg"
                    }), Object.assign(o, {
                        dealId: "string" == typeof s.buying_type && "rtb" !== s.buying_type ? s.line_item_id : void 0,
                        netRevenue: s.is_net || !1
                    }), o.mediaType === O.G_ && eo.isOutstreamVideo(i) && Object.assign(o, {
                        adResponse: {
                            content: o.vastXml
                        },
                        renderer: to.createRenderer(i)
                    }), no.forwardBid({
                        bidRequest: i,
                        bid: o
                    }), o
                },
                overrides: {
                    imp: {
                        banner(e, t, n, r) {
                            if (n.mediaTypes[O.D4]) {
                                if (!0 !== A.$W.getConfig("improvedigital.usePrebidSizes")) {
                                    const e = Object.assign({}, n.mediaTypes[O.D4], {
                                        sizes: null
                                    });
                                    n = Ki(Ki({}, n), {}, {
                                        mediaTypes: {
                                            [O.D4]: e
                                        }
                                    })
                                }
                                e(t, n, r)
                            }
                        },
                        video(e, t, i, o) {
                            var s;
                            if (!i.mediaTypes[O.G_]) return;
                            const a = Object.assign({
                                mimes: Xi.DEFAULT_MIMES
                            }, i.mediaTypes[O.G_], null === (s = i.params) || void 0 === s ? void 0 : s.video);
                            e(t, Ki(Ki({}, i), {}, {
                                mediaTypes: {
                                    [O.G_]: a
                                }
                            }), o), r(t, "ext.is_rewarded_inventory", 1 === a.rewarded || 1 === (0, n.A)(a, "ext.rewarded") || void 0), !t.video.placement && eo.isOutstreamVideo(i) && (t.video.placement = Xi.PLACEMENT_TYPE.OUTSTREAM)
                        }
                    }
                }
            }),
            eo = {
                buildServerRequests(e, t) {
                    const n = !0 === A.$W.getConfig("improvedigital.extend"),
                        r = [],
                        i = !0 === A.$W.getConfig("improvedigital.singleRequest"),
                        o = [],
                        s = [];

                    function a(e, n) {
                        if (e) return "https://pbs.360yield.com/openrtb2/auction";
                        const r = [];
                        return r.push((0, en.C)(null == t ? void 0 : t.gdprConsent) ? "https://ad.360yield.com" : "https://ad.360yield-basic.com"), n && r.push(n), r.push("pb"), r.join("/")
                    }

                    function d(e, n, r) {
                        const i = Zi.toORTB({
                            bidRequests: e,
                            bidderRequest: t,
                            context: {
                                extendMode: r
                            }
                        });
                        return {
                            method: "POST",
                            url: a(r, n),
                            data: JSON.stringify(i),
                            ortbRequest: i,
                            bidderRequest: t
                        }
                    }
                    let c = null;
                    return e.map((e => {
                        const t = e.params.publisherId,
                            a = this.isExtendModeEnabled(n, e.params);
                        if (i) {
                            if (c) {
                                if (t && c !== t) throw new Error("All Improve Digital placements in a single call must have the same publisherId. Please check your 'params.publisherId' or turn off the single request mode.")
                            } else c = t;
                            a ? o.push(e) : s.push(e)
                        } else r.push(d([e], t, a))
                    })), i ? (o.length && r.push(d(o, c, !0)), s.length && r.push(d(s, c, !1)), r) : r
                },
                isExtendModeEnabled(e, t) {
                    const n = "boolean" == typeof t.extend ? t.extend : e;
                    return n && !Yi.syncStore.extendMode && (Yi.syncStore.extendMode = !0), n
                },
                isOutstreamVideo: e => "outstream" === (0, n.A)(e, "mediaTypes.video.context")
            },
            to = {
                RENDERER_URL: "https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js",
                createRenderer(e) {
                    const r = Yt.A4.install({
                        id: e.adUnitCode,
                        url: this.RENDERER_URL,
                        config: (0, n.A)(e, "renderer.options"),
                        adUnitCode: e.adUnitCode
                    });
                    try {
                        r.setRender(this.render)
                    } catch (e) {
                        (0, t.JE)("Prebid Error calling setRender on renderer", e)
                    }
                    return r
                },
                render(e) {
                    e.renderer.push((() => {
                        window.ANOutstreamVideo.renderAd({
                            sizes: [e.width, e.height],
                            targetId: e.adUnitCode,
                            adResponse: e.adResponse,
                            rendererOptions: e.renderer.getConfig()
                        }, to.handleRendererEvents.bind(null, e))
                    }))
                },
                handleRendererEvents(e, t, n) {
                    e.renderer.handleVideoEvent({
                        id: t,
                        eventName: n
                    })
                }
            },
            no = {
                RENDERER_URL: "https://cdn.360yield.com/razr/tag.js",
                forwardBid(e) {
                    let {
                        bidRequest: t,
                        bid: n
                    } = e;
                    if (n.mediaType !== O.D4) return;
                    const r = {
                            prebid: {
                                bidRequest: t,
                                bid: n
                            }
                        },
                        i = `<script>window.__razr_config = ${JSON.stringify(r).replace(/<\/script>/gi,"\\x3C/script>")};<\/script>`;
                    n.ad = i + n.ad, this.installListener()
                },
                installListener() {
                    this._listenerInstalled || (window.addEventListener("message", (function(e) {
                        var t;
                        const n = null === (t = e.data) || void 0 === t || null === (t = t.razr) || void 0 === t ? void 0 : t.load;
                        if (!n) return;
                        e.source && (n.source = e.source, n.id && e.source.postMessage({
                            razr: {
                                id: n.id
                            }
                        }, "*"));
                        const r = window.razr = window.razr || {};
                        r.q = r.q || [], r.q.push(n), r.loaded || (0, J.R)(no.RENDERER_URL, Qi)
                    })), this._listenerInstalled = !0)
                }
            };

        function ro(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function io(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ro(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ro(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, e.E)("improvedigitalBidAdapter");
        const oo = "https://ad.yieldlab.net",
            so = "EUR",
            ao = {
                code: "yieldlab",
                gvlid: 70,
                supportedMediaTypes: [O.G_, O.D4, O.s6],
                isBidRequestValid: e => !!(e && e.params && e.params.adslotId && e.params.supplyId),
                buildRequests(e, r) {
                    e = (0, s.Xj)(e);
                    const i = [],
                        o = [],
                        a = [],
                        d = {
                            ts: Date.now(),
                            json: !0
                        };
                    if ((0, t.bu)(e, (function(e) {
                            i.push(e.params.adslotId);
                            const r = function(e) {
                                const {
                                    mediaTypes: n
                                } = e, r = [];
                                if ((0, t.Qd)(n)) {
                                    const {
                                        [O.D4]: e
                                    } = n;
                                    e && (0, t.cy)(e.sizes) && ((0, t.cy)(e.sizes[0]) ? r.push(e.sizes) : r.push([e.sizes]))
                                } else(0, t.cy)(e.sizes) && ((0, t.cy)(e.sizes[0]) ? r.push(e.sizes) : r.push([e.sizes]));
                                const i = new Set(r.flat().map((e => {
                                    let [t, n] = e;
                                    return t + "x" + n
                                })));
                                return Array.from(i)
                            }(e);
                            if (r.length > 0 && o.push(e.params.adslotId + ":" + r.join("|")), e.params.extId && (d.id = e.params.extId), e.params.targeting && (d.t = function(e) {
                                    const t = [];
                                    for (const n in e)
                                        if (e.hasOwnProperty(n)) {
                                            const r = n,
                                                i = e[n];
                                            t.push(r + "=" + i)
                                        }
                                    return t.join("&")
                                }(e.params.targeting)), e.userIdAsEids && Array.isArray(e.userIdAsEids) && (d.ids = function(e) {
                                    const t = [];
                                    for (let n = 0; n < e.length; n++) t.push(e[n].source + ":" + e[n].uids[0].id);
                                    return t.join(",")
                                }(e.userIdAsEids), d.atypes = function(e) {
                                    const t = [];
                                    for (let n = 0; n < e.length; n++) e[n].uids[0].atype && t.push(e[n].source + ":" + e[n].uids[0].atype);
                                    return t.join(",")
                                }(e.userIdAsEids)), e.params.customParams && (0, t.Qd)(e.params.customParams))
                                for (const t in e.params.customParams) d[t] = e.params.customParams[t];
                            e.schain && (0, t.Qd)(e.schain) && Array.isArray(e.schain.nodes) && (d.schain = function(e) {
                                const t = e.ver || "",
                                    n = 1 === e.complete || 0 === e.complete ? e.complete : "",
                                    r = ["asi", "sid", "hp", "rid", "name", "domain", "ext"];
                                return `${t},${n}${e.nodes.reduce(((e,t)=>e+`!${r.map((e=>{return t[e]?(n=t[e],encodeURIComponent(n).replace(/!/g,"%21")):"";var n})).join(",")}`),"")}`
                            }(e.schain));
                            const s = function(e) {
                                if (e.params.iabContent && (0, t.Qd)(e.params.iabContent)) return e.params.iabContent;
                                const r = (0, n.A)(e, "ortb2.site") ? (0, n.A)(e, "ortb2.site.content") : (0, n.A)(e, "ortb2.app.content");
                                return r && (0, t.Qd)(r) ? r : void 0
                            }(e);
                            s && (d.iab_content = function(e) {
                                const t = ["keywords", "cat"],
                                    n = [],
                                    r = function() {
                                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                                        for (const o in e) - 1 !== t.indexOf(o) && Array.isArray(e[o]) ? n.push("".concat(o, ":", e[o].map((e => encodeURIComponent(e))).join("|"))) : "object" != typeof e[o] ? n.push("".concat(i + o, ":", encodeURIComponent(e[o]))) : r(e[o], "".concat(i, o, "."));
                                        return n.join(",")
                                    };
                                return encodeURIComponent(r(e))
                            }(s));
                            const c = function(e, r) {
                                if (!(0, t.fp)(e.getFloor)) return;
                                const i = (0, n.A)(e, "mediaTypes"),
                                    o = void 0 !== i ? Object.keys(i)[0].toLowerCase() : void 0,
                                    s = e.getFloor({
                                        currency: so,
                                        mediaType: void 0 !== o && ao.supportedMediaTypes.includes(o) ? o : "*",
                                        size: 1 !== r.length ? "*" : r[0].split("x")
                                    });
                                return s.currency === so ? (100 * s.floor).toFixed(0) : void 0
                            }(e, r);
                            c && a.push(e.params.adslotId + ":" + c)
                        })), r) {
                        var c;
                        if (r.refererInfo && r.refererInfo.page && (d.pubref = r.refererInfo.page), r.gdprConsent && (d.gdpr = "boolean" != typeof r.gdprConsent.gdprApplies || r.gdprConsent.gdprApplies, d.gdpr && (d.consent = r.gdprConsent.consentString)), void 0 !== (null === (c = r.ortb2) || void 0 === c || null === (c = c.regs) || void 0 === c || null === (c = c.ext) || void 0 === c ? void 0 : c.dsa)) {
                            const e = r.ortb2.regs.ext.dsa;
                            if (fo(d, "dsarequired", e.dsarequired), fo(d, "dsapubrender", e.pubrender), fo(d, "dsadatatopub", e.datatopub), Array.isArray(e.transparency)) {
                                const t = e.transparency.filter((e => {
                                    let {
                                        domain: t,
                                        dsaparams: n
                                    } = e;
                                    return t && !t.includes("~") && Array.isArray(n) && n.length > 0 && n.every((e => "number" == typeof e))
                                }));
                                if (1 === t.length) {
                                    const {
                                        domain: e,
                                        dsaparams: n
                                    } = t[0];
                                    fo(d, "dsadomain", e), fo(d, "dsaparams", n.join(","))
                                } else if (t.length > 1) {
                                    const e = t.map((e => {
                                        let {
                                            domain: t,
                                            dsaparams: n
                                        } = e;
                                        return `${t}~${n.join("_")}`
                                    })).join("~~");
                                    e && (d.dsatransparency = e)
                                }
                            }
                        }
                        const e = function(e) {
                            const r = ((0, n.A)(e, "ortb2.user.data") || []).filter((e => e.segment && (0, t.cy)(e.segment) && e.segment.length > 0 && e.segment.every((e => e.id && !(0, t.xQ)(e.id) && isFinite(e.id)))))[0];
                            var i, o;
                            return r ? {
                                segtax: null === (i = r.ext) || void 0 === i ? void 0 : i.segtax,
                                segclass: null === (o = r.ext) || void 0 === o ? void 0 : o.segclass,
                                segments: r.segment.map((e => Number(e.id))).join(",")
                            } : void 0
                        }(r);
                        e && (fo(d, "segtax", e.segtax), fo(d, "segclass", e.segclass), fo(d, "segments", e.segments))
                    }
                    const l = i.join(",");
                    o.length > 0 && (d.sizes = o.join(",")), a.length > 0 && (d.floor = a.join(","));
                    const u = function(e) {
                        const t = [];
                        for (const n in e)
                            if (e.hasOwnProperty(n)) {
                                const r = e[n];
                                "schain" !== n && "iab_content" !== n ? t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r)) : t.push(n + "=" + r)
                            }
                        return t.join("&")
                    }(d);
                    return {
                        method: "GET",
                        url: `${oo}/yp/${l}?${u}`,
                        validBidRequests: e,
                        queryParams: d
                    }
                },
                interpretResponse(e, r) {
                    const i = [],
                        o = Date.now(),
                        s = r.queryParams;
                    return r.validBidRequests.forEach((function(r) {
                        if (!e.body) return;
                        const a = (0, c.I6)(e.body, (function(e) {
                            return r.params.adslotId == e.id
                        }));
                        if (a) {
                            const e = 2 !== r.sizes.length || (0, t.cy)(r.sizes[0]) ? r.sizes[0] : r.sizes,
                                u = void 0 !== r.params.adSize ? co(r.params.adSize) : void 0 !== a.adsize ? co(a.adsize) : e,
                                p = void 0 !== r.params.extId ? "&id=" + r.params.extId : "",
                                f = void 0 !== a.adtype ? a.adtype : "",
                                m = s.gdpr ? "&gdpr=" + s.gdpr : "",
                                g = s.consent ? "&consent=" + s.consent : "",
                                b = void 0 !== a.pvid ? "&pvid=" + a.pvid : "",
                                h = s.iab_content ? "&iab_content=" + s.iab_content : "",
                                v = {
                                    requestId: r.bidId,
                                    cpm: a.price / 100,
                                    width: u[0],
                                    height: u[1],
                                    creativeId: "" + a.id,
                                    dealId: a["c.dealid"] ? a["c.dealid"] : a.pid,
                                    currency: so,
                                    netRevenue: !1,
                                    ttl: 300,
                                    referrer: "",
                                    ad: `<script src="${oo}/d/${a.id}/${r.params.supplyId}/?ts=${o}${p}${m}${g}${b}${h}"><\/script>`,
                                    meta: {
                                        advertiserDomains: a.advertiser ? a.advertiser : "n/a"
                                    }
                                },
                                y = function(e) {
                                    if (e.dsa) {
                                        const {
                                            behalf: t,
                                            paid: n,
                                            transparency: r,
                                            adrender: i
                                        } = e.dsa;
                                        return io(io(io(io({}, void 0 !== t && {
                                            behalf: t
                                        }), void 0 !== n && {
                                            paid: n
                                        }), void 0 !== r && {
                                            transparency: r
                                        }), void 0 !== i && {
                                            adrender: i
                                        })
                                    }
                                }(a);
                            if (void 0 !== y && (v.meta = io(io({}, v.meta), {}, {
                                    dsa: y
                                })), d = r, l = f, (0, n.A)(d, "mediaTypes.video") && "video" === l.toLowerCase()) {
                                const e = function(e) {
                                    const r = (0, n.A)(e, "mediaTypes.video.playerSize");
                                    return r && (0, t.cy)(r[0]) ? r[0] : r
                                }(r);
                                if (e && (v.width = e[0], v.height = e[1]), v.mediaType = O.G_, v.vastUrl = `${oo}/d/${a.id}/${r.params.supplyId}/?ts=${o}${p}${m}${g}${b}${h}`, function(e) {
                                        return "outstream" === (0, n.A)(e, "mediaTypes.video.context")
                                    }(r)) {
                                    const e = Yt.A4.install({
                                        id: r.bidId,
                                        url: "https://ad.adition.com/dynamic.ad?a=o193092&ma_loadEvent=ma-start-event",
                                        loaded: !1
                                    });
                                    e.setRender(lo), v.renderer = e
                                }
                            }
                            if (function(e, t) {
                                    return (0, n.A)(e, "mediaTypes.native") && "native" === t.toLowerCase()
                                }(r, f)) {
                                const {
                                    native: e
                                } = a, {
                                    assets: t
                                } = e;
                                v.adUrl = `${oo}/d/${a.id}/${r.params.supplyId}/?ts=${o}${p}${m}${g}${b}`, v.mediaType = O.s6;
                                const n = (0, c.I6)(t, po(1)),
                                    i = (0, c.I6)(t, po(3)),
                                    s = i ? i.img : {
                                        url: "",
                                        w: 0,
                                        h: 0
                                    },
                                    d = (0, c.I6)(t, (e => uo(e, "title"))),
                                    l = (0, c.I6)(t, (e => uo(e, "data")));
                                v.native = io(io({
                                    title: d ? d.title.text : "",
                                    body: l ? l.data.value : ""
                                }, (null == n ? void 0 : n.img) && {
                                    icon: {
                                        url: n.img.url,
                                        width: n.img.w,
                                        height: n.img.h
                                    }
                                }), {}, {
                                    image: {
                                        url: s.url,
                                        width: s.w,
                                        height: s.h
                                    },
                                    clickUrl: e.link.url,
                                    impressionTrackers: e.imptrackers,
                                    assets: t
                                })
                            }
                            i.push(v)
                        }
                        var d, l
                    })), i
                },
                getUserSyncs(e, n, r, i) {
                    const o = [];
                    if (e.iframeEnabled) {
                        const e = [];
                        e.push(`ts=${(0,t.vE)()}`), e.push("type=h"), r && "boolean" == typeof r.gdprApplies && e.push(`gdpr=${Number(r.gdprApplies)}`), r && "string" == typeof r.consentString && e.push(`gdpr_consent=${r.consentString}`), o.push({
                            type: "iframe",
                            url: `${oo}/d/6846326/766/2x2?${e.join("&")}`
                        })
                    }
                    return o
                }
            };

        function co(e) {
            return e.split("x").map(Number)
        }

        function lo(e) {
            e.renderer.push((() => {
                window.ma_width = e.width, window.ma_height = e.height, window.ma_vastUrl = e.vastUrl, window.ma_container = e.adUnitCode, window.document.dispatchEvent(new Event("ma-start-event"))
            }))
        }

        function uo(e, t) {
            return e.hasOwnProperty(t) && null != e[t]
        }

        function po(e) {
            return t => {
                var n;
                return (null == t || null === (n = t.img) || void 0 === n ? void 0 : n.type) === e
            }
        }

        function fo(e, t, n) {
            void 0 !== n && (e[t] = n)
        }

        function mo(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function go(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? mo(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mo(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, Zt.a$)(ao), (0, e.E)("yieldlabBidAdapter");
        const bo = "stroeerCore",
            ho = "hb.adscale.de",
            vo = "/dsh",
            yo = "",
            _o = {
                code: bo,
                gvlid: 136,
                supportedMediaTypes: [O.D4, O.G_],
                isBidRequestValid: function() {
                    const e = [],
                        n = (e, n) => r => !!e(r) || ((0, t.JE)(`${bo}: Bid setup for ${r.adUnitCode} is invalid: ${n}`), !1);
                    return e.push(n((e => (e => xo(e) || To(e))(e)), "the media type is invalid")), e.push(n((e => "object" == typeof e.params), "the custom params does not exist")), e.push(n((e => (0, t.O8)(e.params.sid)), "the sid field must be a string")),
                        function(t) {
                            return e.every((e => e(t)))
                        }
                }(),
                buildRequests: function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                        i = arguments.length > 1 ? arguments[1] : void 0;
                    const o = i.bids[0],
                        s = i.refererInfo,
                        a = {
                            id: (0, t.lk)(),
                            ref: s.ref,
                            ssl: Io(),
                            mpa: Eo(),
                            timeout: i.timeout - (Date.now() - i.auctionStart),
                            url: s.page,
                            schain: o.schain
                        },
                        d = o.userId;
                    (0, t.Im)(d) || (a.user = {
                        euids: d
                    });
                    const c = i.gdprConsent;
                    c && (a.gdpr = {
                        consent: c.consentString,
                        applies: c.gdprApplies
                    }), ["regs.ext.dsa", "device.ext.cdep"].forEach((e => {
                        const t = (0, n.A)(i.ortb2, e);
                        void 0 !== t && r(a, `ortb2.${e}`, t)
                    }));
                    const l = e.filter(xo).map(So),
                        u = e.filter(To).map(ko);
                    return {
                        method: "POST",
                        url: Oo(o.params),
                        data: go(go({}, a), {}, {
                            bids: [...l, ...u]
                        })
                    }
                },
                interpretResponse: function(e) {
                    const t = [];
                    return e.body && "object" == typeof e.body && e.body.bids.forEach((e => {
                        const n = null != e.vastXml ? O.G_ : O.D4,
                            r = {
                                requestId: e.bidId,
                                cpm: e.cpm || 0,
                                width: e.width || 0,
                                height: e.height || 0,
                                ttl: 300,
                                currency: "EUR",
                                netRevenue: !0,
                                creativeId: "",
                                meta: {
                                    advertiserDomains: e.adomain,
                                    dsa: e.dsa
                                },
                                mediaType: n
                            };
                        n === O.G_ ? r.vastXml = e.vastXml : r.ad = e.ad, t.push(r)
                    })), t
                },
                getUserSyncs: function(e, t, n) {
                    return t.length > 0 && e.iframeEnabled ? [{
                        type: "iframe",
                        url: "https://js.adscale.de/pbsync.html" + wo(n)
                    }] : []
                }
            },
            Io = () => "https:" === (0, t.l4)().location.protocol,
            Eo = () => {
                try {
                    return !!(0, t.mb)().location.href
                } catch (e) {
                    return !1
                }
            },
            Ao = e => {
                const n = (e, t) => {
                    const r = e.getBoundingClientRect(),
                        i = r.top + r.height >= 0 && r.top <= t.innerHeight;
                    return t !== t.parent ? i && n(t.frameElement, t.parent) : i
                };
                try {
                    return n((r = e, (0, t.l4)().document.getElementById(r)), (0, t.l4)())
                } catch (e) {}
                var r
            },
            Oo = e => {
                let {
                    host: n = ho,
                    port: r = yo,
                    securePort: i,
                    path: o = vo
                } = e;
                return i && (r = i), (0, t.c$)({
                    protocol: "https",
                    hostname: n,
                    port: r,
                    pathname: o
                })
            },
            wo = e => {
                if (e) {
                    const t = encodeURIComponent(e.consentString || "");
                    return `?gdpr=${e.gdprApplies?1:0}&gdpr_consent=${t}`
                }
                return ""
            },
            xo = e => !e.mediaTypes && !e.mediaType || e.mediaTypes && e.mediaTypes.banner || e.mediaType === O.D4,
            To = e => {
                const t = e.mediaTypes;
                return t && t.video && ["instream", "outstream"].indexOf(t.video.context) > -1
            },
            Co = e => ({
                bid: e.bidId,
                sid: e.params.sid,
                viz: Ao(e.adUnitCode)
            }),
            So = e => {
                const t = (0, n.A)(e, "mediaTypes.banner.sizes") || [];
                return go({
                    ban: {
                        siz: t,
                        fp: Do(O.D4, t, e)
                    }
                }, Co(e))
            },
            ko = e => {
                const t = (0, n.A)(e, "mediaTypes.video") || {};
                return go({
                    vid: {
                        ctx: t.context,
                        siz: t.playerSize,
                        mim: t.mimes,
                        fp: Do(O.G_, [t.playerSize], e)
                    }
                }, Co(e))
            },
            Do = (e, t, n) => {
                if (!n.getFloor) return;
                const r = n.getFloor({
                        currency: "EUR",
                        mediaType: e,
                        size: "*"
                    }),
                    i = t.map((t => go(go({}, n.getFloor({
                        currency: "EUR",
                        mediaType: e,
                        size: [t[0], t[1]]
                    })), {}, {
                        size: t
                    }))),
                    o = (0, c.I6)([r].concat(i), (e => e.currency));
                if (!o) return;
                const s = o.currency,
                    a = r.currency === s ? r.floor : void 0;
                return {
                    def: a,
                    cur: s,
                    siz: i.filter((e => e.currency === s)).filter((e => e.floor !== a)).map((e => ({
                        w: e.size[0],
                        h: e.size[1],
                        p: e.floor
                    })))
                }
            };

        function Ro(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }(0, Zt.a$)(_o), (0, e.E)("stroeerCoreBidAdapter");
        const jo = "8.51.0",
            Bo = "USD",
            Po = ["admixer.net", "adserver.org", "adtelligent.com", "akamai.com", "amxdt.net", "audigent.com", "britepool.com", "criteo.com", "crwdcntrl.net", "deepintent.com", "epsilon.com", "hcn.health", "id5-sync.com", "idx.lat", "intentiq.com", "intimatemerger.com", "liveintent.com", "liveramp.com", "mediawallahscript.com", "merkleinc.com", "netid.de", "neustar.biz", "nextroll.com", "novatiq.com", "parrable.com", "pubcid.org", "quantcast.com", "tapad.com", "uidapi.com", "yahoo.com", "zeotap.com"];

        function Uo(e, t) {
            const n = e.bidder || e.bidderCode;
            return A.$W.getConfig(`${n}.${t}`)
        }

        function $o(e) {
            return {
                w: parseInt(e[0]),
                h: parseInt(e[1])
            }
        }

        function qo(e) {
            return (0, t.cy)(e) && 2 === e.length && !(0, t.cy)(e[0]) ? [$o(e)] : e.map($o)
        }

        function No(e) {
            return (0, t.cy)((0, n.A)(e, "userIdAsEids")) ? e.userIdAsEids.filter((e => -1 !== Po.indexOf(e.source))) : []
        }

        function Mo(e) {
            return (0, n.A)(e, "params.bidOverride.imp.secure") || "https:" === document.location.protocol ? 1 : 0
        }

        function Wo(e) {
            let t;
            return (0, n.A)(e, "params.pubId") ? t = !0 : (0, n.A)(e, "params.dcn") && (0, n.A)(e, "params.pos") && (t = !1), t
        }

        function zo(e) {
            let t = Uo(e, "mode");
            return t = t ? t.toLowerCase() : void 0, void 0 === t || t === O.D4 ? O.D4 : t === O.G_ ? O.G_ : "all" === t ? "*" : void 0
        }

        function Lo(e) {
            const r = zo(e),
                i = {
                    currency: (0, n.A)(e, "params.bidOverride.cur") || Bo,
                    mediaType: r,
                    size: "*"
                };
            return !!(0, t.fp)(e.getFloor) && e.getFloor(i)
        }

        function Vo(e, n, r, o) {
            const s = function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ro(Object(n), !0).forEach((function(t) {
                        (0, i.A)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ro(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }({}, o);
            for (const i in r) switch (e) {
                case "string":
                    -1 !== n.indexOf(i) && (0, t.O8)(r[i]) && (s[i] = r[i]);
                    break;
                case "number":
                    -1 !== n.indexOf(i) && (0, t.Et)(r[i]) && (s[i] = r[i]);
                    break;
                case "array":
                    -1 !== n.indexOf(i) && (0, t.cy)(r[i]) && (s[i] = r[i]);
                    break;
                case "object":
                    -1 !== n.indexOf(i) && (0, t.Qd)(r[i]) && (s[i] = r[i]);
                    break;
                case "objectAllKeys":
                    (0, t.Qd)(r) && (s[i] = r[i])
            }
            return s
        }

        function Fo(e) {
            return r = Uo(e, "ttl") || (0, n.A)(e, "params.ttl"), (0, t.Et)(r) && r > 0 && r < 3600 ? r : 300;
            var r
        }

        function Go(e) {
            return (0, t.O8)(e) && e.length > 0
        }

        function Ho(e, r) {
            if (e) {
                var i;
                let o = {
                    id: (0, t.lk)(),
                    cur: [Lo(e).currency || (0, n.A)(r, "params.bidOverride.cur") || Bo],
                    imp: [],
                    site: {
                        page: (0, n.A)(e, "refererInfo.page")
                    },
                    device: {
                        dnt: 0,
                        ua: navigator.userAgent,
                        ip: (0, n.A)(r, "params.bidOverride.device.ip") || (0, n.A)(r, "params.ext.ip") || void 0,
                        w: window.screen.width,
                        h: window.screen.height
                    },
                    regs: {
                        ext: {
                            us_privacy: e.uspConsent ? e.uspConsent : "",
                            gdpr: e.gdprConsent && e.gdprConsent.gdprApplies ? 1 : 0,
                            gpp: e.gppConsent ? e.gppConsent.gppString : "",
                            gpp_sid: e.gppConsent ? e.gppConsent.applicableSections : []
                        }
                    },
                    source: {
                        ext: {
                            hb: 1,
                            adapterver: "1.1.0",
                            prebidver: jo,
                            integration: {
                                name: "prebid.js",
                                ver: jo
                            }
                        },
                        fd: 1
                    },
                    user: {
                        ext: {
                            consent: e.gdprConsent && e.gdprConsent.gdprApplies ? e.gdprConsent.consentString : "",
                            eids: No(r)
                        }
                    }
                };
                !0 === Wo(r) ? (o.site.publisher = {
                    id: r.params.pubId
                }, ((0, n.A)(r, "params.bidOverride.site.id") || (0, n.A)(r, "params.siteId")) && (o.site.id = (0, n.A)(r, "params.bidOverride.site.id") || r.params.siteId)) : o.site.id = r.params.dcn, null !== (i = e.ortb2) && void 0 !== i && null !== (i = i.regs) && void 0 !== i && i.gpp && (o.regs.ext.gpp = e.ortb2.regs.gpp, o.regs.ext.gpp_sid = e.ortb2.regs.gpp_sid), e.ortb2 && (o = function(e, r) {
                    const i = r.ortb2,
                        o = (0, n.A)(i, "site") || void 0,
                        s = (0, n.A)(o, "content") || void 0,
                        a = (0, n.A)(o, "publisher") || void 0,
                        d = (0, n.A)(o, "content.data") || void 0,
                        c = (0, n.A)(i, "app.content") || void 0,
                        l = (0, n.A)(i, "app.content.data") || void 0,
                        u = (0, n.A)(i, "user") || void 0;
                    if (o && (0, t.Qd)(o)) {
                        const t = ["name", "domain", "page", "ref", "keywords", "search"],
                            n = ["cat", "sectioncat", "pagecat"],
                            r = ["ext"];
                        e.site = Vo("string", t, o, e.site), e.site = Vo("array", n, o, e.site), e.site = Vo("object", r, o, e.site)
                    }
                    if (a && (0, t.Qd)(a)) {
                        const t = ["ext"];
                        e.site.publisher = Vo("object", t, a, e.site.publisher)
                    }
                    if (s && (0, t.Qd)(s)) {
                        const n = ["id", "title", "series", "season", "genre", "contentrating", "language"],
                            r = ["episode", "prodq", "context", "livestream", "len"],
                            i = ["cat"],
                            o = ["ext"];
                        e.site.content = Vo("string", n, s, e.site.content), e.site.content = Vo("number", r, s, e.site.content), e.site.content = Vo("array", i, s, e.site.content), e.site.content = Vo("object", o, s, e.site.content), d && (0, t.cy)(d) && d.every((t => {
                            let n = {};
                            n = Vo("string", ["id", "name"], t, n), n = Vo("array", ["segment"], t, n), n = Vo("object", ["ext"], t, n), e.site.content.data = [], e.site.content.data.push(n)
                        }))
                    }
                    if (c && (0, t.Qd)(c) && l && (0, t.cy)(l) && l.every((t => {
                            let n = {};
                            n = Vo("string", ["id", "name"], t, n), n = Vo("array", ["segment"], t, n), n = Vo("object", ["ext"], t, n), e.app = {
                                content: {
                                    data: []
                                }
                            }, e.app.content.data.push(n)
                        })), u && (0, t.Qd)(u)) {
                        const t = ["id", "buyeruid", "gender", "keywords", "customdata"],
                            n = ["yob"],
                            r = ["data"],
                            i = ["ext"];
                        e.user = Vo("string", t, u, e.user), e.user = Vo("number", n, u, e.user), e.user = Vo("array", r, u, e.user), e.user.ext = Vo("object", i, u, e.user.ext)
                    }
                    return e
                }(o, r));
                const s = (0, n.A)(r, "schain.nodes");
                return (0, t.cy)(s) && s.length > 0 && (o.source.ext.schain = r.schain, o.source.ext.schain.nodes[0].rid = o.id), o
            }
        }

        function Jo(e, r) {
            const i = zo(e);
            if (r && e) {
                const o = {
                    id: e.bidId,
                    secure: Mo(e),
                    bidfloor: Lo(e).floor || (0, n.A)(e, "params.bidOverride.imp.bidfloor")
                };
                if (!e.mediaTypes.banner || void 0 !== i && i !== O.D4 && "*" !== i || (o.banner = {
                        mimes: e.mediaTypes.banner.mimes || ["text/html", "text/javascript", "application/javascript", "image/jpg"],
                        format: qo(e.sizes)
                    }, e.mediaTypes.banner.pos && (o.banner.pos = e.mediaTypes.banner.pos)), e.mediaTypes.video && (i === O.G_ || "*" === i)) {
                    const t = qo(e.mediaTypes.video.playerSize);
                    o.video = {
                        mimes: (0, n.A)(e, "params.bidOverride.imp.video.mimes") || e.mediaTypes.video.mimes || ["video/mp4", "application/javascript"],
                        w: (0, n.A)(e, "params.bidOverride.imp.video.w") || t[0].w,
                        h: (0, n.A)(e, "params.bidOverride.imp.video.h") || t[0].h,
                        maxbitrate: (0, n.A)(e, "params.bidOverride.imp.video.maxbitrate") || e.mediaTypes.video.maxbitrate || void 0,
                        maxduration: (0, n.A)(e, "params.bidOverride.imp.video.maxduration") || e.mediaTypes.video.maxduration || void 0,
                        minduration: (0, n.A)(e, "params.bidOverride.imp.video.minduration") || e.mediaTypes.video.minduration || void 0,
                        api: (0, n.A)(e, "params.bidOverride.imp.video.api") || e.mediaTypes.video.api || [2],
                        delivery: (0, n.A)(e, "params.bidOverride.imp.video.delivery") || e.mediaTypes.video.delivery || void 0,
                        pos: (0, n.A)(e, "params.bidOverride.imp.video.pos") || e.mediaTypes.video.pos || void 0,
                        playbackmethod: (0, n.A)(e, "params.bidOverride.imp.video.playbackmethod") || e.mediaTypes.video.playbackmethod || void 0,
                        placement: (0, n.A)(e, "params.bidOverride.imp.video.placement") || e.mediaTypes.video.placement || void 0,
                        linearity: (0, n.A)(e, "params.bidOverride.imp.video.linearity") || e.mediaTypes.video.linearity || 1,
                        protocols: (0, n.A)(e, "params.bidOverride.imp.video.protocols") || e.mediaTypes.video.protocols || [2, 5],
                        startdelay: (0, n.A)(e, "params.bidOverride.imp.video.startdelay") || e.mediaTypes.video.startdelay || 0,
                        rewarded: (0, n.A)(e, "params.bidOverride.imp.video.rewarded") || void 0
                    }
                }
                if (o.ext = {
                        dfp_ad_unit_code: e.adUnitCode
                    }, (0, n.A)(e, "params.kvp") && (0, t.Qd)(e.params.kvp)) {
                    o.ext.kvs = {};
                    for (const n in e.params.kvp)
                        if ((0, t.O8)(e.params.kvp[n]) || (0, t.Et)(e.params.kvp[n])) o.ext.kvs[n] = e.params.kvp[n];
                        else if ((0, t.cy)(e.params.kvp[n])) {
                        const r = e.params.kvp[n];
                        (r.every((e => (0, t.O8)(e))) || r.every((e => (0, t.Et)(e)))) && (o.ext.kvs[n] = e.params.kvp[n])
                    }
                }(0, n.A)(e, "ortb2Imp.ext.data") && (0, t.Qd)(e.ortb2Imp.ext.data) && (o.ext.data = e.ortb2Imp.ext.data), (0, n.A)(e, "ortb2Imp.instl") && (0, t.Et)(e.ortb2Imp.instl) && 1 === e.ortb2Imp.instl && (o.instl = e.ortb2Imp.instl), !1 === Wo(e) ? (o.tagid = e.params.pos, o.ext.pos = e.params.pos) : (0, n.A)(e, "params.placementId") && (o.tagid = e.params.placementId), r.imp.push(o)
            }
        }

        function Ko(e) {
            let {
                payload: r,
                requestOptions: i,
                bidderRequest: o
            } = e;
            const s = Wo(o),
                a = Uo(o, "endpoint");
            let d = a || "https://c2shb.pubgw.yahoo.com/bidRequest";
            if (!0 === s && (d = a || "https://c2shb.pubgw.yahoo.com/admax/bid/partners/PBJS"), !0 === (0, n.A)(o, "params.testing.e2etest"))
                if ((0, t.fH)("Adapter e2etest mode is active"), i.withCredentials = !1, !0 === s) r.site.id = "1234567";
                else {
                    const e = zo(o);
                    r.site.id = "8a969516017a7a396ec539d97f540011", r.imp.forEach((n => {
                        if (n.ext.e2eTestMode = !0, e === O.D4) n.tagid = "8a969978017a7aaabab4ab0bc01a0009";
                        else if (e === O.G_) n.tagid = "8a96958a017a7a57ac375d50c0c700cc";
                        else {
                            const e = o.bidderCode;
                            (0, t.JE)(`e2etest mode does not support ${e}.mode="all". \n Please specify either "banner" or "video"`), (0, t.JE)(`Adapter e2etest mode: Please make sure your adUnit matches the ${e}.mode video or banner`)
                        }
                    }))
                }
            return {
                url: d,
                method: "POST",
                data: r,
                options: i,
                bidderRequest: o
            }
        }
        const Qo = {
            code: "yahooAds",
            gvlid: 25,
            aliases: ["yahoossp", "yahooAdvertising"],
            supportedMediaTypes: [O.D4, O.G_],
            isBidRequestValid: function(e) {
                const r = e.params;
                return !0 === (0, n.A)(r, "testing.e2etest") || !(!(0, t.Qd)(r) || !(Go(r.pubId) || Go(r.dcn) && Go(r.pos))) || ((0, t.JE)("Bidder params missing or incorrect, please pass object with either: dcn & pos OR pubId"), !1)
            },
            buildRequests: function(e, n) {
                if ((0, t.Im)(e) || (0, t.Im)(n)) return void(0, t.JE)('buildRequests called with either empty "validBidRequests" or "bidderRequest"');
                const r = {
                    contentType: "application/json",
                    customHeaders: {
                        "x-openrtb-version": "2.5"
                    }
                };
                r.withCredentials = (0, en.C)(n.gdprConsent);
                const i = function(e) {
                    const t = zo(e[0]);
                    let n = [];
                    return t === O.D4 ? n = e.filter((e => Object.keys(e.mediaTypes).some((e => e === O.D4)))) : t === O.G_ ? n = e.filter((e => Object.keys(e.mediaTypes).some((e => e === O.G_)))) : "*" === t && (n = e.filter((e => Object.keys(e.mediaTypes).some((e => e === O.D4 || e === O.G_))))), n
                }(e);
                if (!0 === Uo(n, "singleRequestMode")) {
                    const e = Ho(n, i[0]);
                    return i.forEach((t => {
                        Jo(t, e)
                    })), [Ko({
                        payload: e,
                        requestOptions: r,
                        bidderRequest: n
                    })]
                }
                return i.map((e => {
                    const t = Ho(n, e);
                    return Jo(e, t), Ko({
                        payload: t,
                        requestOptions: r,
                        bidderRequest: e
                    })
                }))
            },
            interpretResponse: function(e, r) {
                let {
                    bidderRequest: i
                } = r;
                const o = [];
                return e.body && Array.isArray(e.body.seatbid) ? (e.body.seatbid.forEach((e => {
                    let r;
                    try {
                        r = e.bid[0]
                    } catch (e) {
                        return o
                    }
                    let s = r.ext && r.ext.encp ? r.ext.encp : r.price,
                        a = {
                            adId: (0, n.A)(r, "adId") ? r.adId : r.impid || r.crid,
                            requestId: r.impid,
                            cpm: s,
                            width: r.w,
                            height: r.h,
                            creativeId: r.crid || 0,
                            currency: r.cur || Bo,
                            dealId: r.dealid ? r.dealid : null,
                            netRevenue: !0,
                            ttl: Fo(i),
                            meta: {
                                advertiserDomains: r.adomain
                            }
                        };
                    const d = function(e) {
                        const t = e.adm;
                        return -1 !== t.indexOf("o2playerSettings") || -1 !== t.indexOf("YAHOO.VideoPlatform.VideoPlayer") || -1 !== t.indexOf("AdPlacement") ? O.D4 : -1 !== t.indexOf("VAST") ? O.G_ : void 0
                    }(r);
                    d === O.D4 ? (a.mediaType = O.D4, a.ad = r.adm, a.meta.mediaType = O.D4) : d === O.G_ && (a.mediaType = O.G_, a.meta.mediaType = O.G_, a.vastXml = r.adm, r.nurl && (a.vastUrl = r.nurl)), "outstream" !== (0, n.A)(i, "mediaTypes.video.context") || i.renderer || (a.renderer = function(e) {
                        const r = Yt.A4.install({
                            url: "https://s.yimg.com/kp/prebid-outstream-renderer/renderer.js",
                            loaded: !1,
                            adUnitCode: e.adUnitCode
                        });
                        try {
                            r.setRender((function(t) {
                                setTimeout((function() {
                                    o2PlayerRender(t)
                                }), (0, n.A)(e, "params.testing.renderer.setTimeout") || 700)
                            }))
                        } catch (e) {
                            (0, t.JE)("Renderer error: setRender() failed", e)
                        }
                        return r
                    }(i) || void 0), o.push(a)
                })), o) : o
            },
            getUserSyncs: function(e, n, r, i, o) {
                const s = !(0, t.Im)(n) && n[0].body;
                if (s && s.ext && s.ext.pixels) {
                    const t = function(e, t) {
                        let n = /(img|iframe)[\s\S]*?src\s*=\s*("|')(.*?)\2/gi,
                            r = /\w*(?=\s)/,
                            i = /src=("|')(.*?)\1/,
                            o = [];
                        if (t) {
                            let s = t.match(n);
                            s && s.forEach((t => {
                                let n = t.match(r)[0],
                                    s = t.match(i)[2];
                                if (n && s) {
                                    let t = "img" === n.toLowerCase() ? "image" : "iframe";
                                    if (!e.iframeEnabled && "iframe" === t || !e.pixelEnabled && "image" === t) return;
                                    o.push({
                                        type: t,
                                        url: s
                                    })
                                }
                            }))
                        }
                        return o
                    }(e, s.ext.pixels);
                    return t.forEach((e => {
                        e.url = function(e, t) {
                            const n = {
                                    gdpr_consent: t.gdpr ? t.gdpr.consentString : "",
                                    gdpr: t.gdpr && t.gdpr.gdprApplies ? "1" : "0",
                                    us_privacy: t.uspConsent ? t.uspConsent : "",
                                    gpp: t.gpp ? t.gpp.gppString : "",
                                    gpp_sid: t.gpp && Array.isArray(t.gpp.applicableSections) ? t.gpp.applicableSections.join(",") : ""
                                },
                                r = new URL(e),
                                i = r.searchParams;
                            for (const [e, t] of Object.entries(n)) i.set(e, t);
                            return r.search = i.toString(), r.toString()
                        }(e.url, {
                            gpp: o,
                            gdpr: r,
                            uspConsent: i
                        })
                    })), t
                }
                return []
            }
        };

        function Xo(e, t, n) {
            return n ? e + t + "=" + encodeURIComponent(n) + "&" : e
        }

        function Yo(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function Zo(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Yo(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yo(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }(0, Zt.a$)(Qo), (0, e.E)("yahoosspBidAdapter");
        const es = "triplelift";
        let ts = null,
            ns = null;
        const rs = (0, te.vM)({
                bidderCode: es
            }),
            is = {
                gvlid: 28,
                code: es,
                supportedMediaTypes: [O.D4, O.G_],
                isBidRequestValid: function(e) {
                    return void 0 !== e.params.inventoryCode
                },
                buildRequests: function(e, r) {
                    let i = "https://tlx.3lift.com/header/auction?",
                        o = function(e, r) {
                            var i;
                            let o = {},
                                {
                                    schain: s
                                } = e[0];
                            const a = function(e) {
                                const n = {},
                                    r = {},
                                    i = {},
                                    o = e.ortb2 || {},
                                    s = function() {
                                        const e = rs.getDataFromLocalStorage("opecloud_ctx");
                                        if (!e) return null;
                                        try {
                                            return JSON.parse(e)
                                        } catch (e) {
                                            return (0, t.vV)("Triplelift: error parsing JSON: ", e), null
                                        }
                                    }(),
                                    a = Object.assign({}, o.site),
                                    d = Object.assign({}, o.user);
                                if (s) {
                                    d.data = d.data || [];
                                    try {
                                        d.data.push({
                                            name: "www.1plusx.com",
                                            ext: s
                                        })
                                    } catch (e) {
                                        (0, t.vV)("Triplelift: error adding 1plusX segments: ", e)
                                    }
                                }
                                return cs(r, a), cs(i, d), (0, t.Im)(r) || (n.context = r), (0, t.Im)(i) || (n.user = i), n
                            }(r);
                            o.imp = e.map((function(e, n) {
                                let r = {
                                    id: n,
                                    tagid: e.params.inventoryCode,
                                    floor: ds(e)
                                };
                                return os(e) && (r.video = function(e) {
                                    let n = Zo(Zo({}, e.params.video), e.mediaTypes.video);
                                    try {
                                        n.w || (n.w = n.playerSize[0][0]), n.h || (n.h = n.playerSize[0][1])
                                    } catch (e) {
                                        (0, t.JE)("Video size not defined", e)
                                    }
                                    return "instream" === n.context && (n.placement || (n.placement = 1)), "outstream" === n.context && (n.placement ? -1 === [3, 4, 5].indexOf(n.placement) && ((0, t.OG)(`video.placement value of ${n.placement} is invalid for outstream context. Setting placement to 3`), n.placement = 3) : n.placement = 3), n.playbackmethod && Number.isInteger(n.playbackmethod) && (n.playbackmethod = Array.from(String(n.playbackmethod), Number)), delete n.playerSize, n
                                }(e)), e.mediaTypes.banner && !ss(e) && (r.banner = {
                                    format: (i = e.sizes, i.filter(ls).map((function(e) {
                                        return {
                                            w: e[0],
                                            h: e[1]
                                        }
                                    })))
                                }), (0, t.Im)(e.ortb2Imp) || (r.fpd = function(e) {
                                    const n = {},
                                        r = {};
                                    return cs(r, e.ext), (0, t.Im)(r) || (n.context = r), n
                                }(e.ortb2Imp), (0, t.Im)(e.ortb2Imp.ext) || (r.ext = Zo({}, e.ortb2Imp.ext))), r;
                                var i
                            }));
                            let d = [];
                            e[0].userIdAsEids && (d = n.A(e[0], "userIdAsEids"), o.user = {
                                ext: {
                                    eids: d
                                }
                            });
                            let c = function(e, n) {
                                let r = {};
                                return (0, t.Im)(e) || (r.schain = Zo({}, e)), (0, t.Im)(n) || (r.fpd = Zo({}, n)), r
                            }(s, a);
                            return (0, t.Im)(c) || (o.ext = c), null != r && null !== (i = r.ortb2) && void 0 !== i && null !== (i = i.regs) && void 0 !== i && i.gpp && (o.regs = Object.assign({}, r.ortb2.regs)), null != r && r.ortb2 && (o.ext.ortb2 = Object.assign({}, r.ortb2)), o
                        }(e, r);
                    return i = Xo(i, "lib", "prebid"), i = Xo(i, "v", "8.51.0"), r && r.refererInfo && (i = Xo(i, "referrer", r.refererInfo.page)), r && r.timeout && (i = Xo(i, "tmax", r.timeout)), r && r.gdprConsent && (ts = void 0 === r.gdprConsent.gdprApplies || r.gdprConsent.gdprApplies, i = Xo(i, "gdpr", ts.toString()), void 0 !== r.gdprConsent.consentString && (ns = r.gdprConsent.consentString, i = Xo(i, "cmp_cs", ns))), r && r.uspConsent && (i = Xo(i, "us_privacy", r.uspConsent)), r && r.fledgeEnabled && (i = Xo(i, "fledge", r.fledgeEnabled)), !0 === A.$W.getConfig("coppa") && (i = Xo(i, "coppa", !0)), i.lastIndexOf("&") === i.length - 1 && (i = i.substring(0, i.length - 1)), (0, t.OG)("tlCall request built: " + i), {
                        method: "POST",
                        url: i,
                        data: o,
                        bidderRequest: r
                    }
                },
                interpretResponse: function(e, n) {
                    let {
                        bidderRequest: r
                    } = n, i = e.body.bids || [];
                    const o = e.body.paapi || [];
                    if (i = i.map((e => function(e, t) {
                            let n = {},
                                r = t.width || 1,
                                i = t.height || 1,
                                o = t.deal_id || "",
                                s = t.crid || "",
                                a = e.bids[t.imp_id];
                            return 0 != t.cpm && t.ad && (n = {
                                requestId: a.bidId,
                                cpm: t.cpm,
                                width: r,
                                height: i,
                                netRevenue: !0,
                                ad: t.ad,
                                creativeId: s,
                                dealId: o,
                                currency: "USD",
                                ttl: 300,
                                tl_source: t.tl_source,
                                meta: {}
                            }, os(a) && "video" === t.media_type && (n.vastXml = t.ad, n.mediaType = "video", n.ttl = 3600), t.advertiser_name && (n.meta.advertiserName = t.advertiser_name), t.adomain && t.adomain.length && (n.meta.advertiserDomains = t.adomain), t.tl_source && "hdx" == t.tl_source && (os(a) && "video" === t.media_type ? n.meta.mediaType = "video" : n.meta.mediaType = "banner"), t.tl_source && "tlx" == t.tl_source && (n.meta.mediaType = "native"), s && (n.meta.networkId = s.slice(0, s.indexOf("_")))), n
                        }(r, e))), o.length > 0) {
                        const e = o.map((e => ({
                            bidId: r.bids[e.imp_id].bidId,
                            config: e.auctionConfig
                        })));
                        return (0, t.OG)("Response with FLEDGE:", {
                            bids: i,
                            fledgeAuctionConfigs: e
                        }), {
                            bids: i,
                            fledgeAuctionConfigs: e
                        }
                    }
                    return i
                },
                getUserSyncs: function(e, t, n, r, i) {
                    let o = function(e) {
                        if (e) return e.iframeEnabled ? "iframe" : e.pixelEnabled ? "image" : void 0
                    }(e);
                    if (!o) return;
                    let s = "https://eb2.3lift.com/sync?";
                    return "image" === o && (s = Xo(s, "px", 1), s = Xo(s, "src", "prebid")), (null !== ns || ts) && (s = Xo(s, "gdpr", ts), s = Xo(s, "cmp_cs", ns)), r && (s = Xo(s, "us_privacy", r)), i && (i.gppString && (s = Xo(s, "gpp", i.gppString)), i.applicableSections && 0 !== i.applicableSections.length && (s = Xo(s, "gpp_sid", i.applicableSections.filter((e => Number.isInteger(e))).join(",")))), [{
                        type: o,
                        url: s
                    }]
                }
            };

        function os(e) {
            return as(e) && (ss(e) || function(e) {
                return as(e) && "outstream" === e.mediaTypes.video.context.toLowerCase()
            }(e))
        }

        function ss(e) {
            return as(e) && "instream" === e.mediaTypes.video.context.toLowerCase()
        }

        function as(e) {
            return e.mediaTypes.video && e.mediaTypes.video.context
        }

        function ds(e) {
            let n = null;
            if ("function" == typeof e.getFloor) try {
                const t = e.getFloor({
                    currency: "USD",
                    mediaType: os(e) ? "video" : "banner",
                    size: "*"
                });
                "object" != typeof t || "USD" !== t.currency || isNaN(parseFloat(t.floor)) || (n = parseFloat(t.floor))
            } catch (e) {
                (0, t.vV)("Triplelift: getFloor threw an error: ", e)
            }
            return null !== n ? n : e.params.floor
        }

        function cs(e, n) {
            (0, t.Im)(n) || Object.keys(n).forEach((t => {
                null != n[t] && (e[t] = n[t])
            }))
        }

        function ls(e) {
            return 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1]
        }(0, Zt.a$)(is), (0, e.E)("tripleliftBidAdapter");
        const us = new Map;

        function ps(e) {
            const n = {};

            function r(e) {
                var t;
                const r = JSON.stringify([null === (t = e.source) || void 0 === t ? void 0 : t.toLowerCase(), e.ext]);
                n.hasOwnProperty(r) ? n[r].uids.push(...e.uids) : n[r] = e
            }
            return Object.entries(e).forEach((e => {
                let [n, i] = e;
                i = Array.isArray(i) ? i : [i], ("pubProvidedId" === n ? (0, t.Go)(i) : i.map((e => function(e, n) {
                    const r = us.get(n);
                    if (r && e) {
                        let n = {};
                        n.source = (0, t.fp)(r.getSource) ? r.getSource(e) : r.source;
                        const i = (0, t.fp)(r.getValue) ? r.getValue(e) : e;
                        if ((0, t.O8)(i)) {
                            const o = {
                                id: i,
                                atype: r.atype
                            };
                            if ((0, t.fp)(r.getUidExt)) {
                                const t = r.getUidExt(e);
                                t && (o.ext = t)
                            }
                            if (n.uids = [o], (0, t.fp)(r.getEidExt)) {
                                const t = r.getEidExt(e);
                                t && (n.ext = t)
                            }
                            return n
                        }
                    }
                    return null
                }(e, n)))).filter((e => null != e)).forEach(r)
            })), Object.values(n)
        }
        const fs = (0, w.A_)("sync", (() => {})),
            ms = "User ID",
            gs = te.X0,
            bs = te.qk,
            hs = "_pbjs_id_optout",
            vs = (0, te.CK)("userId"),
            ys = {
                isAllowed: ge.io
            };
        let _s, Is, Es, As, Os, ws = !1,
            xs = [],
            Ts = [],
            Cs = {},
            Ss = [];
        const ks = (() => {
            let e;
            return () => (null == e && (e = (0, re.K7)()), e)
        })();

        function Ds(e) {
            return ks().fork().renameWith((t => [`userId.mod.${t}`, `userId.mods.${e}.${t}`]))
        }

        function Rs(e, t) {
            t = t || e.storageMgr;
            const n = "function" == typeof e.submodule.domainOverride ? e.submodule.domainOverride() : null,
                r = e.config.storage.name;
            return function(e, i, o) {
                t.setCookie(r + (e || ""), i, o, "Lax", n)
            }
        }

        function js(e, n) {
            const r = e.config.storage;
            try {
                const i = new Date(Date.now() + 864e5 * r.expires).toUTCString(),
                    o = (0, t.Qd)(n) ? JSON.stringify(n) : n;
                e.enabledStorageTypes.forEach((t => {
                    switch (t) {
                        case gs:
                            ! function(e, t, n) {
                                const r = e.config.storage,
                                    i = Rs(e);
                                i(null, t, n), i("_cst", Xs(), n), "number" == typeof r.refreshInSeconds && i("_last", (new Date).toUTCString(), n)
                            }(e, o, i);
                            break;
                        case bs:
                            ! function(e, t, n) {
                                const r = e.config.storage,
                                    i = e.storageMgr;
                                i.setDataInLocalStorage(`${r.name}_exp`, n), i.setDataInLocalStorage(`${r.name}_cst`, Xs()), i.setDataInLocalStorage(r.name, encodeURIComponent(t)), "number" == typeof r.refreshInSeconds && i.setDataInLocalStorage(`${r.name}_last`, (new Date).toUTCString())
                            }(e, o, i)
                    }
                }))
            } catch (e) {
                (0, t.vV)(e)
            }
        }

        function Bs(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
            const r = e.config.storage,
                i = n ? `${r.name}_${n}` : r.name;
            let o;
            try {
                e.enabledStorageTypes.find((t => {
                    switch (t) {
                        case gs:
                            o = function(e, t) {
                                return e.storageMgr.getCookie(t)
                            }(e, i);
                            break;
                        case bs:
                            o = function(e, t) {
                                const n = e.storageMgr,
                                    r = e.config.storage,
                                    i = n.getDataFromLocalStorage(`${r.name}_exp`);
                                return "" === i ? n.getDataFromLocalStorage(t) : i && new Date(i).getTime() - Date.now() > 0 ? decodeURIComponent(n.getDataFromLocalStorage(t)) : void 0
                            }(e, i)
                    }
                    return !!o
                })), "string" == typeof o && "{" === o.trim().charAt(0) && (o = JSON.parse(o))
            } catch (e) {
                (0, t.vV)(e)
            }
            return o
        }

        function Ps(e, n, r) {
            n = ks().fork().startTiming("userId.callbacks.total").stopBefore(n);
            const i = (0, t.U6)((() => {
                clearTimeout(void 0), n()
            }), e.length);
            e.forEach((function(e) {
                const n = Ds(e.submodule.name).startTiming("callback").stopBefore(i);
                try {
                    e.callback((function(i) {
                        i ? (e.config.storage && js(e, i), e.idObj = e.submodule.decode(i, e.config), Ys(Us(r))) : (0, t.fH)(`${ms}: ${e.submodule.name} - request id responded with an empty value`), n()
                    }), Bs.bind(null, e))
                } catch (r) {
                    (0, t.vV)(`Error in userID module '${e.submodule.name}':`, r), n()
                }
                e.callback = void 0
            }))
        }

        function Us(e) {
            return Array.isArray(e) && e.length ? qs(e) : {}
        }

        function $s(e, n, r) {
            return Object.fromEntries(Object.entries(e.reduce(((e, i) => {
                const o = n(i);
                return o && Object.keys(o).forEach((n => {
                    var s;
                    const a = null === (s = Cs[n]) || void 0 === s ? void 0 : s.indexOf(r(i)),
                        d = {
                            priority: (0, t.Et)(a) ? a : -1,
                            value: o[n]
                        };
                    if (e[n]) {
                        const t = d.priority > e[n].priority ? d : e[n];
                        e[n] = t
                    } else e[n] = d
                })), e
            }), {})).map((e => {
                let [t, n] = e;
                return [t, n.value]
            })))
        }

        function qs(e) {
            return $s(e.filter((e => (0, t.Qd)(e.idObj) && Object.keys(e.idObj).length)), (e => e.idObj), (e => e.submodule.name))
        }
        const Ns = {};
        let Ms;

        function Ws() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Vs() || [];
            const r = As && e.find((e => e.source === As));
            if (r && "string" == typeof(0, n.A)(r, "uids.0.id")) {
                const e = r.uids[0].id.replace(/[\W_]/g, "");
                if (e.length >= 32 && e.length <= 150) return e;
                (0, t.JE)(`User ID - Googletag Publisher Provided ID for ${As} is not between 32 and 150 characters - ${e}`)
            }
        }
        const zs = (0, re.Ak)("userId", (function(n, r) {
            let {
                delay: i = K.k.timeout,
                getIds: o = Qs
            } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            K.k.race([o().catch((() => null)), i(Es)]).then((() => {
                (function(e, n) {
                    [e].some((e => !Array.isArray(e) || !e.length)) || e.forEach((e => {
                        e.bids && (0, t.cy)(e.bids) && e.bids.forEach((e => {
                            const r = function(e, n) {
                                return Array.isArray(e) && e.length && n ? qs(e.filter((e => !e.config.bidders || !(0, t.cy)(e.config.bidders) || (0, c.mK)(e.config.bidders, n)))) : {}
                            }(n, e.bidder);
                            Object.keys(r).length && (e.userId = r, e.userIdAsEids = ps(r))
                        }))
                    }))
                })(r.adUnits || (0, e.m)().adUnits, _s), ks().join((0, re.BO)(r.metrics), {
                    propagate: !1,
                    includeGroups: !0
                }), n.call(this, r)
            }))
        }));

        function Ls() {
            return Us(_s)
        }

        function Vs() {
            return ps(Ls())
        }

        function Fs(e) {
            return ps(function(e, n) {
                if (!Array.isArray(e) || !e.length) return {};
                const r = qs(e),
                    i = Object.keys(r).find((e => {
                        const r = us.get(e);
                        return (null == r ? void 0 : r.source) === n || (0, t.fp)(null == r ? void 0 : r.getSource) && r.getSource() === n
                    }));
                return i ? {
                    [i]: r[i]
                } : []
            }(_s, e))[0]
        }

        function Gs(e, n, r) {
            return Ms().then((() => {
                let i = {};
                if ((0, t.fp)(r)) {
                    (0, t.fH)(`${ms} - Getting encrypted signal from custom function : ${r.name} & source : ${e} `);
                    const n = r(e);
                    i[e] = n ? Hs(n) : null
                } else {
                    const r = Fs(e);
                    (0, t.fH)(`${ms} - Getting encrypted signal for eids :${JSON.stringify(r)}`), (0, t.Im)(r) || (i[r.source] = !0 === n ? Hs(r) : r.uids[0].id)
                }
                return (0, t.fH)(`${ms} - Fetching encrypted eids: ${i[e]}`), i[e]
            }))
        }

        function Hs(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                n = "";
            return 1 === t && (n = "object" == typeof e ? window.btoa(JSON.stringify(e)) : window.btoa(e)), `${t}||${n}`
        }

        function Js() {
            if (!(0, t.II)()) return;
            window.googletag.secureSignalProviders = window.googletag.secureSignalProviders || [];
            const e = A.$W.getConfig("userSync.encryptedSignalSources");
            if (e) {
                const t = e.registerDelay || 0;
                setTimeout((() => {
                    e.sources && e.sources.forEach((e => {
                        let {
                            source: t,
                            encrypt: n,
                            customFunc: r
                        } = e;
                        t.forEach((e => {
                            window.googletag.secureSignalProviders.push({
                                id: e,
                                collectorFunction: () => Gs(e, n, r)
                            })
                        }))
                    }))
                }), t)
            } else(0, t.JE)(`${ms} - ESP : encryptedSignalSources config not defined under userSync Object`)
        }

        function Ks() {
            let {
                submoduleNames: e
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
            return Ms({
                refresh: !0,
                submoduleNames: e
            }).then((() => (n && (0, t.fp)(n) && n(), Ls())))
        }

        function Qs() {
            return Ms().then((() => Ls()), (e => e === Ns ? Promise.resolve().then(Qs) : ((0, t.vV)("Error initializing userId", e), K.k.reject(e))))
        }

        function Xs() {
            let e = Number(Te.SL.hash);
            const t = [];
            for (; e > 0;) t.push(String.fromCharCode(255 & e)), e >>>= 8;
            return btoa(t.join())
        }

        function Ys() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ls();
            if (e && As) {
                const n = Ws(ps(e));
                n && ((0, t.II)() ? window.googletag.pubads().setPublisherProvidedId(n) : (window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push((function() {
                    window.googletag.pubads().setPublisherProvidedId(n)
                }))))
            }
        }

        function Zs(e, r) {
            let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return ks().fork().measureTime("userId.init.modules", (function() {
                if (!r.length) return [];
                if (r.forEach((e => ra(e))), !(r = r.filter((e => (!e.config.storage || !!e.enabledStorageTypes.length) && ys.isAllowed(he.yl, (0, be.s)(ve.fW, e.config.name))))).length) return (0, t.JE)(`${ms} - no ID module configured`), [];
                const o = r.reduce(((e, n) => Ds(n.submodule.name).measureTime("init", (() => {
                    try {
                        (function(e, n, r) {
                            const i = Te.mW.getConsentData();
                            if (e.config.storage) {
                                let r, o = Bs(e),
                                    s = !1;
                                if ("number" == typeof e.config.storage.refreshInSeconds) {
                                    const t = new Date(Bs(e, "last"));
                                    s = t && Date.now() - t.getTime() > 1e3 * e.config.storage.refreshInSeconds
                                }
                                if (!o || s || n || function(e) {
                                        const t = Bs(e, "cst");
                                        return !t || t !== Xs()
                                    }(e)) {
                                    const t = Object.assign({
                                        enabledStorageTypes: e.enabledStorageTypes
                                    }, e.config);
                                    r = e.submodule.getId(t, i, o)
                                } else "function" == typeof e.submodule.extendId && (r = e.submodule.extendId(e.config, i, o));
                                (0, t.Qd)(r) && (r.id && (js(e, r.id), o = r.id), "function" == typeof r.callback && (e.callback = r.callback)), o && (e.idObj = e.submodule.decode(o, e.config))
                            } else if (e.config.value) e.idObj = e.config.value;
                            else {
                                const n = e.submodule.getId(e.config, i, void 0);
                                (0, t.Qd)(n) && ("function" == typeof n.callback && (e.callback = n.callback), n.id && (e.idObj = e.submodule.decode(n.id, e.config)))
                            }
                            Ys(Us(r))
                        })(n, i, r), e.push(n)
                    } catch (e) {
                        (0, t.vV)(`Error in userID module '${n.submodule.name}':`, e)
                    }
                    return e
                }))), []);
                return o.length && function(e) {
                    let r = (0, t.YI)().setEidPermissions;
                    "function" == typeof r && (0, t.cy)(e) && r(function(e) {
                        let r = [];
                        return e.filter((e => (0, t.Qd)(e.idObj) && Object.keys(e.idObj).length)).forEach((e => {
                            Object.keys(e.idObj).forEach((t => {
                                const i = us.get(t) || {};
                                (0, n.A)(e, "config.bidders") && Array.isArray(e.config.bidders) && i.source && r.push({
                                    source: i.source,
                                    bidders: e.config.bidders
                                })
                            }))
                        })), r
                    }(e))
                }(o), o.forEach(ea.bind(null, e)), o
            }))
        }

        function ea(e, t) {
            let n = !1;
            for (let r = 0; r < e.length; r++)
                if (t.config.name.toLowerCase() === e[r].config.name.toLowerCase()) {
                    n = !0, e[r] = t;
                    break
                }
            n || e.push(t)
        }

        function ta(e) {
            var t;
            return (null == e || null === (t = e.storage) || void 0 === t || null === (t = t.type) || void 0 === t ? void 0 : t.trim().split(/\s*&\s*/)) || []
        }
        const na = new Set([bs, gs]);

        function ra(e) {
            if (e.enabledStorageTypes) return;
            const n = ta(e.config);
            e.enabledStorageTypes = n.filter((n => {
                switch (n) {
                    case bs:
                        return function(e) {
                            return !(!e.storageMgr.localStorageIsEnabled() || vs.getDataFromLocalStorage(hs) && ((0, t.fH)(`${ms} - opt-out localStorage found, storage disabled`), 1))
                        }(e);
                    case gs:
                        return function(e) {
                            return !(!e.storageMgr.cookiesAreEnabled() || vs.getCookie(hs) && ((0, t.fH)(`${ms} - opt-out cookie found, storage disabled`), 1))
                        }(e)
                }
                return !1
            }))
        }

        function ia() {
            ! function(e) {
                us.clear(), Object.entries($s(e, (e => e.eids), (e => e.name))).forEach((e => {
                    let [t, n] = e;
                    return us.set(t, n)
                }))
            }(Ss);
            const n = function(e) {
                return Array.isArray(e) ? e.reduce(((e, n) => (!n || (0, t.xQ)(n.name) || (n.storage && !(0, t.xQ)(n.storage.type) && !(0, t.xQ)(n.storage.name) && function(e) {
                    return ta(e).every((e => na.has(e)))
                }(n) || (0, t.Qd)(n.value) ? e.push(n) : n.storage || n.value || e.push(n)), e)), []) : []
            }(Ts);
            if (!n.length) return;
            const r = Ss.filter((e => !(0, c.I6)(xs, (t => t.name === e.name))));
            xs.splice(0, xs.length), r.map((e => {
                const t = (0, c.I6)(n, (t => t.name && (t.name.toLowerCase() === e.name.toLowerCase() || e.aliasName && t.name.toLowerCase() === e.aliasName.toLowerCase())));
                return t && e.name !== t.name && (t.name = e.name), e.findRootDomain = se, t ? {
                    submodule: e,
                    config: t,
                    callback: void 0,
                    idObj: void 0,
                    storageMgr: (0, te.vM)({
                        moduleType: ve.fW,
                        moduleName: t.name
                    })
                } : null
            })).filter((e => null !== e)).forEach((e => xs.push(e))), !ws && xs.length && ((0, e.m)().requestBids.before(zs, 40), ne.Ay.callDataDeletionRequest.before(oa), fs.after((e => e(Ws()))), (0, t.fH)(`${ms} - usersync config updated for ${xs.length} submodules: `, xs.map((e => e.submodule.name))), ws = !0)
        }

        function oa(e) {
            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
            (0, t.fH)("UserID: received data deletion request; deleting all stored IDs..."), xs.forEach((e => {
                if ("function" == typeof e.submodule.onDataDeletionRequest) try {
                    e.submodule.onDataDeletionRequest(e.config, e.idObj, ...r)
                } catch (n) {
                    (0, t.vV)(`Error calling onDataDeletionRequest for ID submodule ${e.submodule.name}`, n)
                }! function(e) {
                    ra(e), e.enabledStorageTypes.forEach((n => {
                        switch (n) {
                            case gs:
                                ! function(e) {
                                    const n = Rs(e, vs),
                                        r = new Date(Date.now() - 864e5).toUTCString();
                                    ["", "_last", "_cst"].forEach((e => {
                                        try {
                                            n(e, "", r)
                                        } catch (e) {
                                            (0, t.vV)(e)
                                        }
                                    }))
                                }(e);
                                break;
                            case bs:
                                ! function(e) {
                                    ["", "_last", "_exp", "_cst"].forEach((n => {
                                        try {
                                            vs.removeDataFromLocalStorage(e.config.storage.name + n)
                                        } catch (e) {
                                            (0, t.vV)(e)
                                        }
                                    }))
                                }(e)
                        }
                    }))
                }(e)
            })), e.apply(this, r)
        }

        function sa(e) {
            return function() {
                return Promise.resolve(e.apply(this, arguments))
            }
        }! function(n) {
            let {
                delay: r = K.k.timeout
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            As = void 0, xs = [], Ts = [], ws = !1, _s = [], Ms = function() {
                let {
                    delay: e = K.k.timeout
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const n = (0, K.v)(),
                    r = (0, K.v)();
                let i, s, d = !1;

                function c(e) {
                    return s = ks().fork(), null != i && i.reject(Ns), i = (0, K.v)(), K.k.race([e, i.promise]).finally(s.startTiming("userId.total"))
                }
                let l = _s,
                    u = xs;

                function p(e) {
                    return function() {
                        if (l === _s && u === xs) return e(...arguments)
                    }
                }

                function f() {
                    return Te.SL.promise.finally(s.startTiming("userId.init.consent"))
                }
                let m = c(K.k.all([w.Gc, n.promise]).then(f).then(p((() => {
                    Zs(l, u)
                }))).then((() => r.promise.finally(s.startTiming("userId.callbacks.pending")))).then(p((() => {
                    const e = l.filter((e => (0, t.fp)(e.callback)));
                    if (e.length) return new K.k((t => Ps(e, t, l)))
                }))));
                return function() {
                    let {
                        refresh: t = !1,
                        submoduleNames: i = null,
                        ready: s = !1
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return s && !d && (d = !0, n.resolve(), Es > 0 ? r.resolve() : o.on(a.qY.AUCTION_END, (function t() {
                        o.AU(a.qY.AUCTION_END, t), e(Is).then(r.resolve)
                    }))), t && d && (m = c(m.catch((() => null)).then(f).then(p((() => {
                        const e = Zs(l, u.filter((e => null == i || i.includes(e.submodule.name))), !0).filter((e => null != e.callback));
                        if (e.length) return new K.k((t => Ps(e, t, l)))
                    }))))), m
                }
            }({
                delay: r
            }), null != Os && Os(), Ss = [], Os = n.getConfig("userSync", (e => {
                const n = e.userSync;
                n && (As = n.ppid, n.userIds && (Ts = n.userIds, Is = (0, t.Et)(n.syncDelay) ? n.syncDelay : 500, Es = (0, t.Et)(n.auctionDelay) ? n.auctionDelay : 0, ia(), function(e, n) {
                    if (e) {
                        const r = {},
                            i = new Map(n.map((e => e.submodule.aliasName ? [e.submodule.aliasName, e.submodule.name] : [])));
                        Object.keys(e).forEach((n => {
                            const o = (0, t.cy)(e[n]) ? [...e[n]].reverse() : [];
                            r[n] = o.map((e => i.has(e) ? i.get(e) : e))
                        })), Cs = r
                    } else Cs = {}
                }(n.idPriority, xs), Ms({
                    ready: !0
                })))
            })), (0, e.m)().getUserIds = Ls, (0, e.m)().getUserIdsAsEids = Vs, (0, e.m)().getEncryptedEidsForSource = sa(Gs), (0, e.m)().registerSignalSources = Js, (0, e.m)().refreshUserIds = sa(Ks), (0, e.m)().getUserIdsAsync = sa(Qs), (0, e.m)().getUserIdsAsEidBySource = Fs
        }(A.$W), (0, w.xG)("userId", (function(e) {
            (0, c.I6)(Ss, (t => t.name === e.name)) || (Ss.push(e), Te.o2.register(ve.fW, e.name, e.gvlid), ia(), Ms({
                refresh: !0,
                submoduleNames: [e.name]
            }))
        }), {
            postInstallAllowed: !0
        }), it({
            type: Xe,
            name: "userExtEids",
            fn: function(e, t, i) {
                const o = (0, n.A)(i, "bidRequests.0.userIdAsEids");
                o && Object.keys(o).length > 0 && r(e, "user.ext.eids", o)
            }
        }), (0, e.E)("userId");
        const aa = (0, te.vM)({
                moduleType: ve.fW,
                moduleName: "sharedId"
            }),
            da = "cookie",
            ca = "html5",
            la = "_pubcid_optout",
            ua = "PublisherCommonId";

        function pa(e, t) {
            if (t === da) return aa.getCookie(e);
            if (t === ca && aa.hasLocalStorage()) {
                const t = aa.getDataFromLocalStorage(`${e}_exp`);
                if (!t) return aa.getDataFromLocalStorage(e);
                if (new Date(t).getTime() - Date.now() > 0) return aa.getDataFromLocalStorage(e)
            }
        }

        function fa(e, t) {
            return function(n, r) {
                t ? ma(t, e, (() => {
                    n(r() || e)
                }))() : n(e)
            }
        }

        function ma(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                r = arguments.length > 2 ? arguments[2] : void 0;
            if (!e) return;
            const i = (0, t.Dl)(e);
            i.search.id = encodeURIComponent("pubcid:" + n);
            const o = (0, t.c$)(i);
            return function() {
                (0, t.z$)(o, r)
            }
        }

        function ga() {
            return !!(aa.cookiesAreEnabled() && pa(la, da) || aa.hasLocalStorage() && pa(la, ca))
        }
        const ba = {
            name: "sharedId",
            aliasName: "pubCommonId",
            gvlid: Te.B1,
            decode(e, n) {
                if (!ga()) return (0, t.fH)(" Decoded value PubCommonId " + e), {
                    pubcid: e
                };
                (0, t.fH)("PubCommonId decode: Has opted-out")
            },
            getId: function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = arguments.length > 2 ? arguments[2] : void 0;
                if (ga()) return void(0, t.fH)("PubCommonId: Has opted-out");
                if (Te.et.getCoppa()) return void(0, t.fH)("PubCommonId: IDs not provided for coppa requests, exiting PubCommonId");
                const {
                    params: {
                        create: r = !0,
                        pixelUrl: i
                    } = {}
                } = e;
                let o = n;
                if (!o) {
                    try {
                        "object" == typeof window[ua] && (o = window[ua].getId())
                    } catch (e) {}
                    o || (o = r && (0, t.N9)() ? (0, t.lk)() : void 0)
                }
                return {
                    id: o,
                    callback: fa(o, i)
                }
            },
            extendId: function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = arguments.length > 2 ? arguments[2] : void 0;
                if (ga()) return (0, t.fH)("PubCommonId: Has opted-out"), {
                    id: void 0
                };
                if (Te.et.getCoppa()) return void(0, t.fH)("PubCommonId: IDs not provided for coppa requests, exiting PubCommonId");
                const {
                    params: {
                        extend: r = !1,
                        pixelUrl: i
                    } = {}
                } = e;
                return r ? i ? {
                    callback: ma(i, n)
                } : {
                    id: n
                } : void 0
            },
            domainOverride: function(e) {
                return function() {
                    const t = document.domain.split("."),
                        n = `_gd${Date.now()}_sharedId`;
                    for (let r, i, o = 0; o < t.length; o++) {
                        const s = t.slice(o).join(".");
                        if (e.setCookie(n, "1", void 0, void 0, s), i = e.getCookie(n), e.setCookie(n, "", "Thu, 01 Jan 1970 00:00:01 GMT", void 0, s), "1" !== i) return r;
                        r = s
                    }
                }
            }(aa),
            eids: {
                pubcid: {
                    source: "pubcid.org",
                    atype: 1
                }
            }
        };
        (0, w.bz)("userId", ba), (0, e.E)("sharedIdSystem");
        var ha = __webpack_require__(330);

        function va(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function ya(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? va(Object(n), !0).forEach((function(t) {
                    (0, i.A)(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : va(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }

        function _a(e, t, n) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
            throw new TypeError("Private element is not present on this object")
        }
        const Ia = 30,
            Ea = "id5id",
            Aa = `${Ea}_privacy`,
            Oa = "html5",
            wa = "User ID - ID5 submodule: ",
            xa = "id5-sync.com",
            Ta = ["pbjs-id5id", "id5id.1st", "id5id"],
            Ca = (0, te.vM)({
                moduleType: ve.fW,
                moduleName: "id5Id"
            }),
            Sa = {
                name: "id5Id",
                gvlid: 131,
                decode(e, i) {
                    let o, s = {};
                    if (!e || "string" != typeof e.universal_uid) return;
                    o = e.universal_uid, s = e.ext || s;
                    let a = {
                        id5id: {
                            uid: o,
                            ext: s
                        }
                    };
                    switch ((0, t.Qd)(s.euid) && (a.euid = {
                        uid: s.euid.uids[0].id,
                        source: s.euid.source,
                        ext: {
                            provider: xa
                        }
                    }), (0, n.A)(e, "ab_testing.result")) {
                        case "control":
                            (0, t.fH)(wa + "A/B Testing - user is in the Control Group: ID5 ID is NOT exposed"), r(a, "id5id.ext.abTestingControlGroup", !0);
                            break;
                        case "error":
                            (0, t.vV)(wa + "A/B Testing ERROR! controlGroupPct must be a number >= 0 and <= 1");
                            break;
                        case "normal":
                            (0, t.fH)(wa + "A/B Testing - user is NOT in the Control Group"), r(a, "id5id.ext.abTestingControlGroup", !1)
                    }
                    return (0, t.fH)(wa + "Decoded ID", a), a
                },
                getId(e, n, r) {
                    if (Wa(e)) {
                        if (Ga(n)) return {
                            callback: function(i) {
                                new Da(e, n, r, Te.t6.getConsentData(), Te.ad.getConsentData()).execute().then((e => {
                                    i(e)
                                })).catch((e => {
                                    (0, t.vV)(wa + "getId fetch encountered an error", e), i()
                                }))
                            }
                        };
                        (0, t.fH)(wa + "Skipping ID5 local storage write because no consent given.")
                    }
                },
                extendId: (e, n, r) => Ga(n) ? (Va(Wa(e) ? e.params.partner : 0), (0, t.fH)(wa + "using cached ID", r), r) : ((0, t.fH)(wa + "No consent given for ID5 local storage writing, skipping nb increment."), r),
                eids: {
                    id5id: {
                        getValue: function(e) {
                            return e.uid
                        },
                        source: xa,
                        atype: 1,
                        getUidExt: function(e) {
                            if (e.ext) return e.ext
                        }
                    },
                    euid: {
                        getValue: function(e) {
                            return e.uid
                        },
                        getSource: function(e) {
                            return e.source
                        },
                        atype: 3,
                        getUidExt: function(e) {
                            if (e.ext) return e.ext
                        }
                    }
                }
            };
        var ka = new WeakSet;
        class Da {
            constructor(e, t, n, r, i) {
                var o;
                (function(e, t) {
                    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                })(this, o = ka), o.add(this), this.submoduleConfig = e, this.gdprConsentData = t, this.cacheIdObj = n, this.usPrivacyData = r, this.gppData = i
            }
            async execute() {
                const e = _a(ka, this, Ua).call(this);
                if (!_a(ka, this, Ra).call(this)) return _a(ka, this, Pa).call(this, e);
                try {
                    return await _a(ka, this, ja).call(this, e)
                } catch (n) {
                    return (0, t.vV)(wa + "Error while performing ID5 external module flow. Continuing with regular flow.", n), _a(ka, this, Pa).call(this, e)
                }
            }
        }

        function Ra() {
            return "string" == typeof this.submoduleConfig.params.externalModuleUrl
        }
        async function ja(e) {
            await async function(e) {
                return new K.k(((t, n) => {
                    if (window.id5Prebid) t();
                    else try {
                        (0, J.R)(e, "id5", t)
                    } catch (e) {
                        n(e)
                    }
                }))
            }(this.submoduleConfig.params.externalModuleUrl);
            const t = await e;
            return _a(ka, this, Ba).call(this).fetchId5Id(t, this.submoduleConfig.params, (0, ie.EN)(), this.gdprConsentData, this.usPrivacyData, this.gppData)
        }

        function Ba() {
            return window.id5Prebid && window.id5Prebid.integration
        }
        async function Pa(e) {
            const t = await e,
                n = await _a(ka, this, $a).call(this, t.extensionsCall),
                r = await _a(ka, this, qa).call(this, t.fetchCall, n);
            return _a(ka, this, Ma).call(this, r)
        }
        async function Ua() {
            let e = this.submoduleConfig.params.configUrl || "https://id5-sync.com/api/config/prebid";
            const n = await (0, ha.hd)(e, {
                method: "POST",
                body: JSON.stringify(ya(ya({}, this.submoduleConfig), {}, {
                    bounce: !0
                })),
                credentials: "include"
            });
            if (!n.ok) throw new Error("Error while calling config endpoint: ", n);
            const r = await n.json();
            return (0, t.fH)(wa + "config response received from the server", r), r
        }
        async function $a(e) {
            if (void 0 === e) return;
            const n = e.url,
                r = e.method || "GET",
                i = "GET" === r ? void 0 : JSON.stringify(e.body || {}),
                o = await (0, ha.hd)(n, {
                    method: r,
                    body: i
                });
            if (!o.ok) throw new Error("Error while calling extensions endpoint: ", o);
            const s = await o.json();
            return (0, t.fH)(wa + "extensions response received from the server", s), s
        }
        async function qa(e, n) {
            const r = e.url,
                i = e.overrides || {},
                o = JSON.stringify(ya(ya(ya({}, _a(ka, this, Na).call(this)), i), {}, {
                    extensions: n
                })),
                s = await (0, ha.hd)(r, {
                    method: "POST",
                    body: o,
                    credentials: "include"
                });
            if (!s.ok) throw new Error("Error while calling fetch endpoint: ", s);
            const a = await s.json();
            return (0, t.fH)(wa + "fetch response received from the server", a), a
        }

        function Na() {
            const e = this.submoduleConfig.params,
                n = this.gdprConsentData && "boolean" == typeof this.gdprConsentData.gdprApplies && this.gdprConsentData.gdprApplies ? 1 : 0,
                r = (0, ie.EN)(),
                i = this.cacheIdObj && this.cacheIdObj.signature ? this.cacheIdObj.signature : function() {
                    let e;
                    return Ta.forEach((function(n) {
                        Ca.getCookie(n) && (e = (0, t.$l)(Ca.getCookie(n)) || e)
                    })), e && e.signature || ""
                }(),
                o = function(e) {
                    const t = Va(e);
                    return La(e, 0), t
                }(e.partner),
                s = {
                    partner: e.partner,
                    gdpr: n,
                    nbPage: o,
                    o: "pbjs",
                    tml: r.topmostLocation,
                    ref: r.ref,
                    cu: r.canonicalUrl,
                    top: r.reachedTop ? 1 : 0,
                    u: r.stack[0] || window.location.href,
                    v: "8.51.0",
                    storage: this.submoduleConfig.storage,
                    localStorage: Ca.localStorageIsEnabled() ? 1 : 0
                };
            !n || void 0 === this.gdprConsentData.consentString || (0, t.Im)(this.gdprConsentData.consentString) || (0, t.xQ)(this.gdprConsentData.consentString) || (s.gdpr_consent = this.gdprConsentData.consentString), void 0 === this.usPrivacyData || (0, t.Im)(this.usPrivacyData) || (0, t.xQ)(this.usPrivacyData) || (s.us_privacy = this.usPrivacyData), this.gppData && (s.gpp_string = this.gppData.gppString, s.gpp_sid = this.gppData.applicableSections), void 0 === i || (0, t.xQ)(i) || (s.s = i), void 0 === e.pd || (0, t.xQ)(e.pd) || (s.pd = e.pd), void 0 === e.provider || (0, t.xQ)(e.provider) || (s.provider = e.provider);
            const a = e.abTesting || {
                enabled: !1
            };
            return a.enabled && (s.ab_testing = {
                enabled: !0,
                control_group_pct: a.controlGroupPct
            }), s
        }

        function Ma(e) {
            try {
                e.privacy && Fa(Aa, JSON.stringify(e.privacy), Ia)
            } catch (e) {
                (0, t.vV)(wa + "Error while writing privacy info into local storage.", e)
            }
            return e
        }

        function Wa(e) {
            if (!e || !e.params || !e.params.partner) return (0, t.vV)(wa + "partner required to be defined"), !1;
            const n = e.params.partner;
            if ("string" == typeof n || n instanceof String) {
                let r = parseInt(n);
                if (isNaN(r) || r < 0) return (0, t.vV)(wa + "partner required to be a number or a String parsable to a positive integer"), !1;
                e.params.partner = r
            } else if ("number" != typeof n) return (0, t.vV)(wa + "partner required to be a number or a String parsable to a positive integer"), !1;
            return e.storage && e.storage.type && e.storage.name ? (e.storage.type !== Oa && (0, t.JE)(wa + `storage type recommended to be '${Oa}'. In a future release this may become a strict requirement`), e.storage.name !== Ea && (0, t.JE)(wa + `storage name recommended to be '${Ea}'. In a future release this may become a strict requirement`), !0) : ((0, t.vV)(wa + "storage required to be set"), !1)
        }

        function za(e) {
            return `${Ea}_${e}_nb`
        }

        function La(e, t) {
            Fa(za(e), t, Ia)
        }

        function Va(e) {
            const t = function(e) {
                let t = function(e) {
                    const t = Ca.getDataFromLocalStorage(`${e}_exp`);
                    return "" === t || t && new Date(t).getTime() - Date.now() > 0 ? Ca.getDataFromLocalStorage(e) : (Ca.removeDataFromLocalStorage(e), null)
                }(za(e));
                return t ? parseInt(t) : 0
            }(e) + 1;
            return La(e, t), t
        }

        function Fa(e, t, n) {
            Ca.setDataInLocalStorage(`${e}_exp`, function(e) {
                return new Date(Date.now() + 864e5 * e).toUTCString()
            }(n)), Ca.setDataInLocalStorage(`${e}`, t)
        }

        function Ga(e) {
            const t = e && "boolean" == typeof e.gdprApplies && e.gdprApplies,
                r = (0, n.A)(e, "vendorData.purpose.consents.1"),
                i = (0, n.A)(e, `vendorData.vendor.consents.${131..toString()}`);
            return !!(!t || r && i)
        }(0, w.bz)("userId", Sa), (0, e.E)("id5IdSystem");
        const Ha = "identityLink",
            Ja = (0, te.vM)({
                moduleType: ve.fW,
                moduleName: Ha
            }),
            Ka = "_lr_env",
            Qa = {
                name: Ha,
                gvlid: 97,
                decode: e => ({
                    idl_env: e
                }),
                getId(e, n) {
                    const r = e && e.params || {};
                    if (!r || "string" != typeof r.pid) return void t.vV("identityLink: requires partner id to be defined");
                    const i = n && "boolean" == typeof n.gdprApplies && n.gdprApplies ? 1 : 0,
                        o = i ? n.consentString : "";
                    if (i && (!o || "" === o)) return void t.fH("identityLink: Consent string is required to call envelope API.");
                    const s = Te.ad.getConsentData(),
                        a = !(!s || !s.gppString) && s.gppString,
                        d = !!(s && s.gppString && s.applicableSections.length > 0 && -1 !== s.applicableSections[0]) && s.applicableSections[0],
                        c = a && d,
                        l = `https://api.rlcdn.com/api/identity/envelope?pid=${r.pid}${i?"&ct=4&cv="+o:""}${c?"&gpp="+a+"&gpp_sid="+d:""}`;
                    let u;
                    return u = function(e) {
                        if (window.ats && window.ats.retrieveEnvelope) t.fH("identityLink: ATS exists!"), window.ats.retrieveEnvelope((function(n) {
                            n ? (t.fH("identityLink: An envelope can be retrieved from ATS!"), Ya(!0), e(JSON.parse(n).envelope)) : Xa(l, e, r)
                        }));
                        else {
                            let n = function() {
                                let e = Ja.getCookie(Ka) || Ja.getDataFromLocalStorage(Ka);
                                return e ? window.atob(e) : void 0
                            }();
                            n ? (t.fH("identityLink: LiveRamp envelope successfully retrieved from storage!"), e(JSON.parse(n).envelope)) : Xa(l, e, r)
                        }
                    }, {
                        callback: u
                    }
                },
                eids: {
                    idl_env: {
                        source: "liveramp.com",
                        atype: 3
                    }
                }
            };

        function Xa(e, n, r) {
            const i = {
                success: e => {
                    let r;
                    if (e) try {
                        r = JSON.parse(e)
                    } catch (e) {
                        t.fH(e)
                    }
                    n(r && r.envelope ? r.envelope : "")
                },
                error: e => {
                    t.fH("identityLink: identityLink: ID fetch encountered an error", e), n()
                }
            };
            r.notUse3P || Ja.getCookie("_lr_retry_request") || (function() {
                let e = new Date;
                e.setTime(e.getTime() + 36e5), Ja.setCookie("_lr_retry_request", "true", e.toUTCString())
            }(), t.fH("identityLink: A 3P retrieval is attempted!"), Ya(!1), (0, ha.RD)(e, i, void 0, {
                method: "GET",
                withCredentials: !0
            }))
        }

        function Ya(e) {
            let t = new Date;
            t.setTime(t.getTime() + 2592e6), Ja.setCookie("_lr_env_src_ats", e, t.toUTCString())
        }(0, w.bz)("userId", Qa), (0, e.E)("identityLinkIdSystem");
        const Za = {
                code: "connectad",
                gvlid: 138,
                aliases: ["connectadrealtime"],
                supportedMediaTypes: [O.D4],
                isBidRequestValid: function(e) {
                    return !(!e.params.networkId || !e.params.siteId)
                },
                buildRequests: function(e, t) {
                    var n, i, o;
                    let s = {
                        method: "POST",
                        url: "",
                        data: "",
                        bidRequest: []
                    };
                    if (e.length < 1) return s;
                    const a = Object.assign({
                        placements: [],
                        time: Date.now(),
                        user: {},
                        url: (null === (n = t.refererInfo) || void 0 === n ? void 0 : n.page) || window.location.href,
                        referrer: null === (i = t.refererInfo) || void 0 === i ? void 0 : i.ref,
                        referrer_info: null === (o = t.refererInfo) || void 0 === o ? void 0 : o.legacy,
                        screensize: [window.screen.width, window.screen.height].join("x"),
                        dnt: "yes" == navigator.doNotTrack || "1" == navigator.doNotTrack || "1" == navigator.msDoNotTrack ? 1 : 0,
                        language: navigator.language,
                        ua: navigator.userAgent,
                        pversion: "8.51.0"
                    });
                    if (!0 === A.$W.getConfig("coppa") && r(a, "user.coppa", 1), e[0].schain && r(a, "source.ext.schain", e[0].schain), t.gdprConsent) {
                        let e;
                        "boolean" == typeof t.gdprConsent.gdprApplies && (e = t.gdprConsent.gdprApplies ? 1 : 0), r(a, "user.ext.gdpr", e), r(a, "user.ext.consent", t.gdprConsent.consentString)
                    }
                    return t.uspConsent && r(a, "user.ext.us_privacy", t.uspConsent), e[0].userIdAsEids && r(a, "user.ext.eids", e[0].userIdAsEids), e.map((e => {
                        const t = Object.assign({
                            id: e.transactionId,
                            divName: e.bidId,
                            pisze: e.mediaTypes.banner.sizes[0] || e.sizes[0],
                            sizes: e.mediaTypes.banner.sizes,
                            adTypes: nd(e.mediaTypes.banner.sizes || e.sizes),
                            bidfloor: td(e),
                            siteId: e.params.siteId,
                            networkId: e.params.networkId
                        });
                        t.networkId && t.siteId && a.placements.push(t)
                    })), s.data = JSON.stringify(a), s.bidRequest = e, s.url = "https://i.connectad.io/api/v2", s
                },
                interpretResponse: function(e, t, n) {
                    let r, i, o, s, a = [];
                    i = t.bidRequest, e = (e || {}).body;
                    for (let t = 0; t < i.length; t++)
                        if (r = {}, s = i[t], o = s.bidId, e) {
                            const t = e.decisions && e.decisions[o],
                                n = t && t.pricing && t.pricing.clearPrice;
                            t && n && (r.requestId = o, r.cpm = n, r.width = t.width, r.height = t.height, r.dealid = t.dealid || null, r.meta = {
                                advertiserDomains: t && t.adomain ? t.adomain : []
                            }, r.ad = rd(t), r.currency = "USD", r.creativeId = t.adId, r.ttl = 360, r.netRevenue = !0, a.push(r))
                        }
                    return a
                },
                transformBidParams: function(e, t) {
                    return pn({
                        siteId: "number",
                        networkId: "number"
                    }, e)
                },
                getUserSyncs: function(e, n, r, i) {
                    let o = "https://cdn.connectad.io/connectmyusers.php?";
                    if (r && (o = Xo(o, "gdpr", r.gdprApplies ? 1 : 0)), r && "string" == typeof r.consentString && (o = Xo(o, "gdpr_consent", r.consentString)), i && (o = Xo(o, "us_privacy", i)), !0 === A.$W.getConfig("coppa") && (o = Xo(o, "coppa", 1)), e.iframeEnabled) return [{
                        type: "iframe",
                        url: o
                    }];
                    (0, t.JE)("Bidder ConnectAd: Please activate iFrame Sync")
                }
            },
            ed = [null, "120x90", "200x200", "468x60", "728x90", "300x250", "160x600", "120x600", "300x100", "180x150", "336x280", "240x400", "234x60", "88x31", "120x60", "120x240", "125x125", "220x250", "250x250", "250x90", "0x0", "200x90", "300x50", "320x50", "320x480", "185x185", "620x45", "300x125", "800x250", "980x120", "980x150", "320x150", "300x300", "200x600", "320x500", "320x320"];

        function td(e) {
            let t = {};
            return "function" == typeof e.getFloor && (t = e.getFloor({
                currency: "USD",
                mediaType: "banner",
                size: "*"
            })), t.floor || e.params.bidfloor || e.params.floorprice || 0
        }

        function nd(e) {
            const t = [];
            return e.forEach((function(e) {
                const n = ed.indexOf(e[0] + "x" + e[1]);
                n >= 0 && t.push(n)
            })), t
        }

        function rd(e) {
            return e.contents && e.contents[0] && e.contents[0].body
        }
        ed[77] = "970x90", ed[123] = "970x250", ed[43] = "300x600", ed[286] = "970x66", ed[3230] = "970x280", ed[429] = "486x60", ed[374] = "700x500", ed[934] = "300x1050", ed[1578] = "320x100", ed[331] = "320x250", ed[3301] = "320x267", ed[2730] = "728x250", (0, Zt.a$)(Za), (0, e.E)("connectadBidAdapter"), Ke.processQueue()
    })()
})();
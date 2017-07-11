/*

 handlebars v3.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function(a, b) {
  if (typeof define === "function" && define.amd) { define([], b) } else {
    if (typeof exports === "object") { module.exports = b() } else { a.Handlebars = b() } } }(this, function() {
  var n = (function() {
    var B = {};
    var C = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" };
    var q = /[&<>"'`]/g;
    var u = /[&<>"'`]/;

    function D(E) {
      return C[E] }

    function z(G) {
      for (var F = 1; F < arguments.length; F++) {
        for (var E in arguments[F]) {
          if (Object.prototype.hasOwnProperty.call(arguments[F], E)) { G[E] = arguments[F][E] } } }
      return G }
    B.extend = z;
    var s = Object.prototype.toString;
    B.toString = s;
    var r = function(E) {
      return typeof E === "function" };
    if (r(/x/)) { r = function(E) {
        return typeof E === "function" && s.call(E) === "[object Function]" } }
    var r;
    B.isFunction = r;
    var x = Array.isArray || function(E) {
      return (E && typeof E === "object") ? s.call(E) === "[object Array]" : false };
    B.isArray = x;

    function A(H, G) {
      for (var F = 0, E = H.length; F < E; F++) {
        if (H[F] === G) {
          return F } }
      return -1 }
    B.indexOf = A;

    function w(E) {
      if (E && E.toHTML) {
        return E.toHTML() } else {
        if (E == null) {
          return "" } else {
          if (!E) {
            return E + "" } } }
      E = "" + E;
      if (!u.test(E)) {
        return E }
      return E.replace(q, D) }
    B.escapeExpression = w;

    function v(E) {
      if (!E && E !== 0) {
        return true } else {
        if (x(E) && E.length === 0) {
          return true } else {
          return false } } }
    B.isEmpty = v;

    function y(F, E) { F.path = E;
      return F }
    B.blockParams = y;

    function t(E, F) {
      return (E ? E + "." : "") + F }
    B.appendContextPath = t;
    return B })();
  var a = (function() {
    var r;
    var s = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

    function q(y, x) {
      var z = x && x.loc,
        u, w;
      if (z) { u = z.start.line;
        w = z.start.column;
        y += " - " + u + ":" + w }
      var v = Error.prototype.constructor.call(this, y);
      for (var t = 0; t < s.length; t++) { this[s[t]] = v[s[t]] }
      if (z) { this.lineNumber = u;
        this.column = w } }
    q.prototype = new Error();
    r = q;
    return r })();
  var k = (function(B, E) {
    var D = {};
    var z = B;
    var x = E;
    var G = "3.0.0";
    D.VERSION = G;
    var r = 6;
    D.COMPILER_REVISION = r;
    var u = { 1: "<= 1.0.rc.2", 2: "== 1.0.0-rc.3", 3: "== 1.0.0-rc.4", 4: "== 1.x.x", 5: "== 2.0.0-alpha.x", 6: ">= 2.0.0-beta.1" };
    D.REVISION_CHANGES = u;
    var y = z.isArray,
      t = z.isFunction,
      s = z.toString,
      q = "[object Object]";

    function w(I, H) { this.helpers = I || {};
      this.partials = H || {};
      A(this) }
    D.HandlebarsEnvironment = w;
    w.prototype = { constructor: w, logger: C, log: v, registerHelper: function(H, I) {
        if (s.call(H) === q) {
          if (I) {
            throw new x("Arg not supported with multiple helpers") }
          z.extend(this.helpers, H) } else { this.helpers[H] = I } }, unregisterHelper: function(H) { delete this.helpers[H] }, registerPartial: function(I, H) {
        if (s.call(I) === q) { z.extend(this.partials, I) } else {
          if (typeof H === "undefined") {
            throw new x("Attempting to register a partial as undefined") }
          this.partials[I] = H } }, unregisterPartial: function(H) { delete this.partials[H] } };

    function A(H) { H.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return undefined } else {
          throw new x("Missing helper: '" + arguments[arguments.length - 1].name + "'") } });
      H.registerHelper("blockHelperMissing", function(K, J) {
        var I = J.inverse,
          L = J.fn;
        if (K === true) {
          return L(this) } else {
          if (K === false || K == null) {
            return I(this) } else {
            if (y(K)) {
              if (K.length > 0) {
                if (J.ids) { J.ids = [J.name] }
                return H.helpers.each(K, J) } else {
                return I(this) } } else {
              if (J.data && J.ids) {
                var M = F(J.data);
                M.contextPath = z.appendContextPath(J.data.contextPath, J.name);
                J = { data: M } }
              return L(K, J) } } } });
      H.registerHelper("each", function(I, T) {
        if (!T) {
          throw new x("Must pass iterator to #each") }
        var R = T.fn,
          M = T.inverse;
        var O = 0,
          Q = "",
          N;
        var J;
        if (T.data && T.ids) { J = z.appendContextPath(T.data.contextPath, T.ids[0]) + "." }
        if (t(I)) { I = I.call(this) }
        if (T.data) { N = F(T.data) }

        function K(V, U, W) {
          if (N) { N.key = V;
            N.index = U;
            N.first = U === 0;
            N.last = !!W;
            if (J) { N.contextPath = J + V } }
          Q = Q + R(I[V], { data: N, blockParams: z.blockParams([I[V], V], [J + V, null]) }) }
        if (I && typeof I === "object") {
          if (y(I)) {
            for (var L = I.length; O < L; O++) { K(O, O, O === I.length - 1) } } else {
            var P;
            for (var S in I) {
              if (I.hasOwnProperty(S)) {
                if (P) { K(P, O - 1) }
                P = S;
                O++ } }
            if (P) { K(P, O - 1, true) } } }
        if (O === 0) { Q = M(this) }
        return Q });
      H.registerHelper("if", function(J, I) {
        if (t(J)) { J = J.call(this) }
        if ((!I.hash.includeZero && !J) || z.isEmpty(J)) {
          return I.inverse(this) } else {
          return I.fn(this) } });
      H.registerHelper("unless", function(J, I) {
        return H.helpers["if"].call(this, J, { fn: I.inverse, inverse: I.fn, hash: I.hash }) });
      H.registerHelper("with", function(J, I) {
        if (t(J)) { J = J.call(this) }
        var K = I.fn;
        if (!z.isEmpty(J)) {
          if (I.data && I.ids) {
            var L = F(I.data);
            L.contextPath = z.appendContextPath(I.data.contextPath, I.ids[0]);
            I = { data: L } }
          return K(J, I) } else {
          return I.inverse(this) } });
      H.registerHelper("log", function(J, I) {
        var K = I.data && I.data.level != null ? parseInt(I.data.level, 10) : 1;
        H.log(K, J) });
      H.registerHelper("lookup", function(J, I) {
        return J && J[I] }) }
    var C = { methodMap: { 0: "debug", 1: "info", 2: "warn", 3: "error" }, DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 1, log: function(J, H) {
        if (typeof console !== "undefined" && C.level <= J) {
          var I = C.methodMap[J];
          (console[I] || console.log).call(console, H) } } };
    D.logger = C;
    var v = C.log;
    D.log = v;
    var F = function(H) {
      var I = z.extend({}, H);
      I._parent = H;
      return I };
    D.createFrame = F;
    return D })(n, a);
  var e = (function() {
    var q;

    function r(s) { this.string = s }
    r.prototype.toString = r.prototype.toHTML = function() {
      return "" + this.string };
    q = r;
    return q })();
  var i = (function(z, E, t) {
    var C = {};
    var y = z;
    var w = E;
    var s = t.COMPILER_REVISION;
    var v = t.REVISION_CHANGES;
    var F = t.createFrame;

    function r(I) {
      var H = I && I[0] || 1,
        K = s;
      if (H !== K) {
        if (H < K) {
          var G = v[K],
            J = v[H];
          throw new w("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + G + ") or downgrade your runtime to an older version (" + J + ").") } else {
          throw new w("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + I[1] + ").") } } }
    C.checkRevision = r;

    function B(G, K) {
      if (!K) {
        throw new w("No environment passed to template") }
      if (!G || !G.main) {
        throw new w("Unknown template object: " + typeof G) }
      K.VM.checkRevision(G.compiler);
      var J = function(O, R, P) {
        if (P.hash) { R = y.extend({}, R, P.hash) }
        O = K.VM.resolvePartial.call(this, O, R, P);
        var L = K.VM.invokePartial.call(this, O, R, P);
        if (L == null && K.compile) { P.partials[P.name] = K.compile(O, G.compilerOptions, K);
          L = P.partials[P.name](R, P) }
        if (L != null) {
          if (P.indent) {
            var N = L.split("\n");
            for (var Q = 0, M = N.length; Q < M; Q++) {
              if (!N[Q] && Q + 1 === M) {
                break }
              N[Q] = P.indent + N[Q] }
            L = N.join("\n") }
          return L } else {
          throw new w("The partial " + P.name + " could not be compiled when running in runtime-only mode") } };
      var H = { strict: function(M, L) {
          if (!(L in M)) {
            throw new w('"' + L + '" not defined in ' + M) }
          return M[L] }, lookup: function(O, M) {
          var L = O.length;
          for (var N = 0; N < L; N++) {
            if (O[N] && O[N][M] != null) {
              return O[N][M] } } }, lambda: function(M, L) {
          return typeof M === "function" ? M.call(L) : M }, escapeExpression: y.escapeExpression, invokePartial: J, fn: function(L) {
          return G[L] }, programs: [], program: function(N, Q, M, P, R) {
          var L = this.programs[N],
            O = this.fn(N);
          if (Q || R || P || M) { L = x(this, N, O, Q, M, P, R) } else {
            if (!L) { L = this.programs[N] = x(this, N, O) } }
          return L }, data: function(L, M) {
          while (L && M--) { L = L._parent }
          return L }, merge: function(N, M) {
          var L = N || M;
          if (N && M && (N !== M)) { L = y.extend({}, M, N) }
          return L }, noop: K.VM.noop, compilerInfo: G.compiler };
      var I = function(M, L) { L = L || {};
        var O = L.data;
        I._setup(L);
        if (!L.partial && G.useData) { O = A(M, O) }
        var P, N = G.useBlockParams ? [] : undefined;
        if (G.useDepths) { P = L.depths ? [M].concat(L.depths) : [M] }
        return G.main.call(H, M, H.helpers, H.partials, O, N, P) };
      I.isTop = true;
      I._setup = function(L) {
        if (!L.partial) { H.helpers = H.merge(L.helpers, K.helpers);
          if (G.usePartial) { H.partials = H.merge(L.partials, K.partials) } } else { H.helpers = L.helpers;
          H.partials = L.partials } };
      I._child = function(L, N, M, O) {
        if (G.useBlockParams && !M) {
          throw new w("must pass block params") }
        if (G.useDepths && !O) {
          throw new w("must pass parent depths") }
        return x(H, L, G[L], N, 0, M, O) };
      return I }
    C.template = B;

    function x(G, I, J, L, H, K, N) {
      var M = function(P, O) { O = O || {};
        return J.call(G, P, G.helpers, G.partials, O.data || L, K && [O.blockParams].concat(K), N && [P].concat(N)) };
      M.program = I;
      M.depth = N ? N.length : 0;
      M.blockParams = H || 0;
      return M }
    C.program = x;

    function u(G, I, H) {
      if (!G) { G = H.partials[H.name] } else {
        if (!G.call && !H.name) { H.name = G;
          G = H.partials[G] } }
      return G }
    C.resolvePartial = u;

    function q(G, I, H) { H.partial = true;
      if (G === undefined) {
        throw new w("The partial " + H.name + " could not be found") } else {
        if (G instanceof Function) {
          return G(I, H) } } }
    C.invokePartial = q;

    function D() {
      return "" }
    C.noop = D;

    function A(G, H) {
      if (!H || !("root" in H)) { H = H ? F(H) : {};
        H.root = G }
      return H }
    return C })(n, a, k);
  var h = (function(B, E, s, w, z) {
    var D;
    var q = B;
    var t = E;
    var v = s;
    var y = w;
    var u = z;
    var x = function() {
      var F = new q.HandlebarsEnvironment();
      y.extend(F, q);
      F.SafeString = t;
      F.Exception = v;
      F.Utils = y;
      F.escapeExpression = y.escapeExpression;
      F.VM = u;
      F.template = function(G) {
        return u.template(G, F) };
      return F };
    var r = x();
    r.create = x;
    var A = typeof global !== "undefined" ? global : window,
      C = A.Handlebars;
    r.noConflict = function() {
      if (A.Handlebars === r) { A.Handlebars = C } };
    r["default"] = r;
    D = r;
    return D })(k, e, a, n, i);
  var l = (function() {
    var q;
    var r = { Program: function(s, v, u, t) { this.loc = t;
        this.type = "Program";
        this.body = s;
        this.blockParams = v;
        this.strip = u }, MustacheStatement: function(w, x, v, u, t, s) { this.loc = s;
        this.type = "MustacheStatement";
        this.path = w;
        this.params = x || [];
        this.hash = v;
        this.escaped = u;
        this.strip = t }, BlockStatement: function(A, u, w, x, v, t, s, z, y) { this.loc = y;
        this.type = "BlockStatement";
        this.path = A;
        this.params = u || [];
        this.hash = w;
        this.program = x;
        this.inverse = v;
        this.openStrip = t;
        this.inverseStrip = s;
        this.closeStrip = z }, PartialStatement: function(s, w, v, u, t) { this.loc = t;
        this.type = "PartialStatement";
        this.name = s;
        this.params = w || [];
        this.hash = v;
        this.indent = "";
        this.strip = u }, ContentStatement: function(s, t) { this.loc = t;
        this.type = "ContentStatement";
        this.original = this.value = s }, CommentStatement: function(u, t, s) { this.loc = s;
        this.type = "CommentStatement";
        this.value = u;
        this.strip = t }, SubExpression: function(u, v, t, s) { this.loc = s;
        this.type = "SubExpression";
        this.path = u;
        this.params = v || [];
        this.hash = t }, PathExpression: function(u, w, v, t, s) { this.loc = s;
        this.type = "PathExpression";
        this.data = u;
        this.original = t;
        this.parts = v;
        this.depth = w }, StringLiteral: function(s, t) { this.loc = t;
        this.type = "StringLiteral";
        this.original = this.value = s }, NumberLiteral: function(t, s) { this.loc = s;
        this.type = "NumberLiteral";
        this.original = this.value = Number(t) }, BooleanLiteral: function(s, t) { this.loc = t;
        this.type = "BooleanLiteral";
        this.original = this.value = s === "true" }, Hash: function(t, s) { this.loc = s;
        this.type = "Hash";
        this.pairs = t }, HashPair: function(t, u, s) { this.loc = s;
        this.type = "HashPair";
        this.key = t;
        this.value = u }, helpers: { helperExpression: function(s) {
          return !!(s.type === "SubExpression" || s.params.length || s.hash) }, scopedId: function(s) {
          return (/^\.|this\b/).test(s.original) }, simpleId: function(s) {
          return s.parts.length === 1 && !r.helpers.scopedId(s) && !s.depth } } };
    q = r;
    return q })();
  var b = (function() {
    var r;
    var q = (function() {
      var y = { trace: function u() {}, yy: {}, symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, content: 12, COMMENT: 13, CONTENT: 14, openRawBlock: 15, END_RAW_BLOCK: 16, OPEN_RAW_BLOCK: 17, helperName: 18, openRawBlock_repetition0: 19, openRawBlock_option0: 20, CLOSE_RAW_BLOCK: 21, openBlock: 22, block_option0: 23, closeBlock: 24, openInverse: 25, block_option1: 26, OPEN_BLOCK: 27, openBlock_repetition0: 28, openBlock_option0: 29, openBlock_option1: 30, CLOSE: 31, OPEN_INVERSE: 32, openInverse_repetition0: 33, openInverse_option0: 34, openInverse_option1: 35, openInverseChain: 36, OPEN_INVERSE_CHAIN: 37, openInverseChain_repetition0: 38, openInverseChain_option0: 39, openInverseChain_option1: 40, inverseAndProgram: 41, INVERSE: 42, inverseChain: 43, inverseChain_option0: 44, OPEN_ENDBLOCK: 45, OPEN: 46, mustache_repetition0: 47, mustache_option0: 48, OPEN_UNESCAPED: 49, mustache_repetition1: 50, mustache_option1: 51, CLOSE_UNESCAPED: 52, OPEN_PARTIAL: 53, partialName: 54, partial_repetition0: 55, partial_option0: 56, param: 57, sexpr: 58, OPEN_SEXPR: 59, sexpr_repetition0: 60, sexpr_option0: 61, CLOSE_SEXPR: 62, hash: 63, hash_repetition_plus0: 64, hashSegment: 65, ID: 66, EQUALS: 67, blockParams: 68, OPEN_BLOCK_PARAMS: 69, blockParams_repetition_plus0: 70, CLOSE_BLOCK_PARAMS: 71, path: 72, dataName: 73, STRING: 74, NUMBER: 75, BOOLEAN: 76, DATA: 77, pathSegments: 78, SEP: 79, "$accept": 0, "$end": 1 }, terminals_: { 2: "error", 5: "EOF", 13: "COMMENT", 14: "CONTENT", 16: "END_RAW_BLOCK", 17: "OPEN_RAW_BLOCK", 21: "CLOSE_RAW_BLOCK", 27: "OPEN_BLOCK", 31: "CLOSE", 32: "OPEN_INVERSE", 37: "OPEN_INVERSE_CHAIN", 42: "INVERSE", 45: "OPEN_ENDBLOCK", 46: "OPEN", 49: "OPEN_UNESCAPED", 52: "CLOSE_UNESCAPED", 53: "OPEN_PARTIAL", 59: "OPEN_SEXPR", 62: "CLOSE_SEXPR", 66: "ID", 67: "EQUALS", 69: "OPEN_BLOCK_PARAMS", 71: "CLOSE_BLOCK_PARAMS", 74: "STRING", 75: "NUMBER", 76: "BOOLEAN", 77: "DATA", 79: "SEP" }, productions_: [0, [3, 2],
          [4, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [12, 1],
          [10, 3],
          [15, 5],
          [9, 4],
          [9, 4],
          [22, 6],
          [25, 6],
          [36, 6],
          [41, 2],
          [43, 3],
          [43, 1],
          [24, 3],
          [8, 5],
          [8, 5],
          [11, 5],
          [57, 1],
          [57, 1],
          [58, 5],
          [63, 1],
          [65, 3],
          [68, 3],
          [18, 1],
          [18, 1],
          [18, 1],
          [18, 1],
          [18, 1],
          [54, 1],
          [54, 1],
          [73, 2],
          [72, 1],
          [78, 3],
          [78, 1],
          [6, 0],
          [6, 2],
          [19, 0],
          [19, 2],
          [20, 0],
          [20, 1],
          [23, 0],
          [23, 1],
          [26, 0],
          [26, 1],
          [28, 0],
          [28, 2],
          [29, 0],
          [29, 1],
          [30, 0],
          [30, 1],
          [33, 0],
          [33, 2],
          [34, 0],
          [34, 1],
          [35, 0],
          [35, 1],
          [38, 0],
          [38, 2],
          [39, 0],
          [39, 1],
          [40, 0],
          [40, 1],
          [44, 0],
          [44, 1],
          [47, 0],
          [47, 2],
          [48, 0],
          [48, 1],
          [50, 0],
          [50, 2],
          [51, 0],
          [51, 1],
          [55, 0],
          [55, 2],
          [56, 0],
          [56, 1],
          [60, 0],
          [60, 2],
          [61, 0],
          [61, 1],
          [64, 1],
          [64, 2],
          [70, 1],
          [70, 2]
        ], performAction: function t(E, F, z, G, H, I, B) {
          var C = I.length - 1;
          switch (H) {
            case 1:
              return I[C - 1];
              break;
            case 2:
              this.$ = new G.Program(I[C], null, {}, G.locInfo(this._$));
              break;
            case 3:
              this.$ = I[C];
              break;
            case 4:
              this.$ = I[C];
              break;
            case 5:
              this.$ = I[C];
              break;
            case 6:
              this.$ = I[C];
              break;
            case 7:
              this.$ = I[C];
              break;
            case 8:
              this.$ = new G.CommentStatement(G.stripComment(I[C]), G.stripFlags(I[C], I[C]), G.locInfo(this._$));
              break;
            case 9:
              this.$ = new G.ContentStatement(I[C], G.locInfo(this._$));
              break;
            case 10:
              this.$ = G.prepareRawBlock(I[C - 2], I[C - 1], I[C], this._$);
              break;
            case 11:
              this.$ = { path: I[C - 3], params: I[C - 2], hash: I[C - 1] };
              break;
            case 12:
              this.$ = G.prepareBlock(I[C - 3], I[C - 2], I[C - 1], I[C], false, this._$);
              break;
            case 13:
              this.$ = G.prepareBlock(I[C - 3], I[C - 2], I[C - 1], I[C], true, this._$);
              break;
            case 14:
              this.$ = { path: I[C - 4], params: I[C - 3], hash: I[C - 2], blockParams: I[C - 1], strip: G.stripFlags(I[C - 5], I[C]) };
              break;
            case 15:
              this.$ = { path: I[C - 4], params: I[C - 3], hash: I[C - 2], blockParams: I[C - 1], strip: G.stripFlags(I[C - 5], I[C]) };
              break;
            case 16:
              this.$ = { path: I[C - 4], params: I[C - 3], hash: I[C - 2], blockParams: I[C - 1], strip: G.stripFlags(I[C - 5], I[C]) };
              break;
            case 17:
              this.$ = { strip: G.stripFlags(I[C - 1], I[C - 1]), program: I[C] };
              break;
            case 18:
              var A = G.prepareBlock(I[C - 2], I[C - 1], I[C], I[C], false, this._$),
                D = new G.Program([A], null, {}, G.locInfo(this._$));
              D.chained = true;
              this.$ = { strip: I[C - 2].strip, program: D, chain: true };
              break;
            case 19:
              this.$ = I[C];
              break;
            case 20:
              this.$ = { path: I[C - 1], strip: G.stripFlags(I[C - 2], I[C]) };
              break;
            case 21:
              this.$ = G.prepareMustache(I[C - 3], I[C - 2], I[C - 1], I[C - 4], G.stripFlags(I[C - 4], I[C]), this._$);
              break;
            case 22:
              this.$ = G.prepareMustache(I[C - 3], I[C - 2], I[C - 1], I[C - 4], G.stripFlags(I[C - 4], I[C]), this._$);
              break;
            case 23:
              this.$ = new G.PartialStatement(I[C - 3], I[C - 2], I[C - 1], G.stripFlags(I[C - 4], I[C]), G.locInfo(this._$));
              break;
            case 24:
              this.$ = I[C];
              break;
            case 25:
              this.$ = I[C];
              break;
            case 26:
              this.$ = new G.SubExpression(I[C - 3], I[C - 2], I[C - 1], G.locInfo(this._$));
              break;
            case 27:
              this.$ = new G.Hash(I[C], G.locInfo(this._$));
              break;
            case 28:
              this.$ = new G.HashPair(I[C - 2], I[C], G.locInfo(this._$));
              break;
            case 29:
              this.$ = I[C - 1];
              break;
            case 30:
              this.$ = I[C];
              break;
            case 31:
              this.$ = I[C];
              break;
            case 32:
              this.$ = new G.StringLiteral(I[C], G.locInfo(this._$));
              break;
            case 33:
              this.$ = new G.NumberLiteral(I[C], G.locInfo(this._$));
              break;
            case 34:
              this.$ = new G.BooleanLiteral(I[C], G.locInfo(this._$));
              break;
            case 35:
              this.$ = I[C];
              break;
            case 36:
              this.$ = I[C];
              break;
            case 37:
              this.$ = G.preparePath(true, I[C], this._$);
              break;
            case 38:
              this.$ = G.preparePath(false, I[C], this._$);
              break;
            case 39:
              I[C - 2].push({ part: I[C], separator: I[C - 1] });
              this.$ = I[C - 2];
              break;
            case 40:
              this.$ = [{ part: I[C] }];
              break;
            case 41:
              this.$ = [];
              break;
            case 42:
              I[C - 1].push(I[C]);
              break;
            case 43:
              this.$ = [];
              break;
            case 44:
              I[C - 1].push(I[C]);
              break;
            case 51:
              this.$ = [];
              break;
            case 52:
              I[C - 1].push(I[C]);
              break;
            case 57:
              this.$ = [];
              break;
            case 58:
              I[C - 1].push(I[C]);
              break;
            case 63:
              this.$ = [];
              break;
            case 64:
              I[C - 1].push(I[C]);
              break;
            case 71:
              this.$ = [];
              break;
            case 72:
              I[C - 1].push(I[C]);
              break;
            case 75:
              this.$ = [];
              break;
            case 76:
              I[C - 1].push(I[C]);
              break;
            case 79:
              this.$ = [];
              break;
            case 80:
              I[C - 1].push(I[C]);
              break;
            case 83:
              this.$ = [];
              break;
            case 84:
              I[C - 1].push(I[C]);
              break;
            case 87:
              this.$ = [I[C]];
              break;
            case 88:
              I[C - 1].push(I[C]);
              break;
            case 89:
              this.$ = [I[C]];
              break;
            case 90:
              I[C - 1].push(I[C]);
              break } }, table: [{ 3: 1, 4: 2, 5: [2, 41], 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: [1, 11], 14: [1, 18], 15: 16, 17: [1, 21], 22: 14, 25: 15, 27: [1, 19], 32: [1, 20], 37: [2, 2], 42: [2, 2], 45: [2, 2], 46: [1, 12], 49: [1, 13], 53: [1, 17] }, { 1: [2, 1] }, { 5: [2, 42], 13: [2, 42], 14: [2, 42], 17: [2, 42], 27: [2, 42], 32: [2, 42], 37: [2, 42], 42: [2, 42], 45: [2, 42], 46: [2, 42], 49: [2, 42], 53: [2, 42] }, { 5: [2, 3], 13: [2, 3], 14: [2, 3], 17: [2, 3], 27: [2, 3], 32: [2, 3], 37: [2, 3], 42: [2, 3], 45: [2, 3], 46: [2, 3], 49: [2, 3], 53: [2, 3] }, { 5: [2, 4], 13: [2, 4], 14: [2, 4], 17: [2, 4], 27: [2, 4], 32: [2, 4], 37: [2, 4], 42: [2, 4], 45: [2, 4], 46: [2, 4], 49: [2, 4], 53: [2, 4] }, { 5: [2, 5], 13: [2, 5], 14: [2, 5], 17: [2, 5], 27: [2, 5], 32: [2, 5], 37: [2, 5], 42: [2, 5], 45: [2, 5], 46: [2, 5], 49: [2, 5], 53: [2, 5] }, { 5: [2, 6], 13: [2, 6], 14: [2, 6], 17: [2, 6], 27: [2, 6], 32: [2, 6], 37: [2, 6], 42: [2, 6], 45: [2, 6], 46: [2, 6], 49: [2, 6], 53: [2, 6] }, { 5: [2, 7], 13: [2, 7], 14: [2, 7], 17: [2, 7], 27: [2, 7], 32: [2, 7], 37: [2, 7], 42: [2, 7], 45: [2, 7], 46: [2, 7], 49: [2, 7], 53: [2, 7] }, { 5: [2, 8], 13: [2, 8], 14: [2, 8], 17: [2, 8], 27: [2, 8], 32: [2, 8], 37: [2, 8], 42: [2, 8], 45: [2, 8], 46: [2, 8], 49: [2, 8], 53: [2, 8] }, { 18: 22, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 18: 31, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 4: 32, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 37: [2, 41], 42: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] }, { 4: 33, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 42: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] }, { 12: 34, 14: [1, 18] }, { 18: 36, 54: 35, 58: 37, 59: [1, 38], 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 5: [2, 9], 13: [2, 9], 14: [2, 9], 16: [2, 9], 17: [2, 9], 27: [2, 9], 32: [2, 9], 37: [2, 9], 42: [2, 9], 45: [2, 9], 46: [2, 9], 49: [2, 9], 53: [2, 9] }, { 18: 39, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 18: 40, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 18: 41, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 31: [2, 71], 47: 42, 59: [2, 71], 66: [2, 71], 74: [2, 71], 75: [2, 71], 76: [2, 71], 77: [2, 71] }, { 21: [2, 30], 31: [2, 30], 52: [2, 30], 59: [2, 30], 62: [2, 30], 66: [2, 30], 69: [2, 30], 74: [2, 30], 75: [2, 30], 76: [2, 30], 77: [2, 30] }, { 21: [2, 31], 31: [2, 31], 52: [2, 31], 59: [2, 31], 62: [2, 31], 66: [2, 31], 69: [2, 31], 74: [2, 31], 75: [2, 31], 76: [2, 31], 77: [2, 31] }, { 21: [2, 32], 31: [2, 32], 52: [2, 32], 59: [2, 32], 62: [2, 32], 66: [2, 32], 69: [2, 32], 74: [2, 32], 75: [2, 32], 76: [2, 32], 77: [2, 32] }, { 21: [2, 33], 31: [2, 33], 52: [2, 33], 59: [2, 33], 62: [2, 33], 66: [2, 33], 69: [2, 33], 74: [2, 33], 75: [2, 33], 76: [2, 33], 77: [2, 33] }, { 21: [2, 34], 31: [2, 34], 52: [2, 34], 59: [2, 34], 62: [2, 34], 66: [2, 34], 69: [2, 34], 74: [2, 34], 75: [2, 34], 76: [2, 34], 77: [2, 34] }, { 21: [2, 38], 31: [2, 38], 52: [2, 38], 59: [2, 38], 62: [2, 38], 66: [2, 38], 69: [2, 38], 74: [2, 38], 75: [2, 38], 76: [2, 38], 77: [2, 38], 79: [1, 43] }, { 66: [1, 30], 78: 44 }, { 21: [2, 40], 31: [2, 40], 52: [2, 40], 59: [2, 40], 62: [2, 40], 66: [2, 40], 69: [2, 40], 74: [2, 40], 75: [2, 40], 76: [2, 40], 77: [2, 40], 79: [2, 40] }, { 50: 45, 52: [2, 75], 59: [2, 75], 66: [2, 75], 74: [2, 75], 75: [2, 75], 76: [2, 75], 77: [2, 75] }, { 23: 46, 36: 48, 37: [1, 50], 41: 49, 42: [1, 51], 43: 47, 45: [2, 47] }, { 26: 52, 41: 53, 42: [1, 51], 45: [2, 49] }, { 16: [1, 54] }, { 31: [2, 79], 55: 55, 59: [2, 79], 66: [2, 79], 74: [2, 79], 75: [2, 79], 76: [2, 79], 77: [2, 79] }, { 31: [2, 35], 59: [2, 35], 66: [2, 35], 74: [2, 35], 75: [2, 35], 76: [2, 35], 77: [2, 35] }, { 31: [2, 36], 59: [2, 36], 66: [2, 36], 74: [2, 36], 75: [2, 36], 76: [2, 36], 77: [2, 36] }, { 18: 56, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 28: 57, 31: [2, 51], 59: [2, 51], 66: [2, 51], 69: [2, 51], 74: [2, 51], 75: [2, 51], 76: [2, 51], 77: [2, 51] }, { 31: [2, 57], 33: 58, 59: [2, 57], 66: [2, 57], 69: [2, 57], 74: [2, 57], 75: [2, 57], 76: [2, 57], 77: [2, 57] }, { 19: 59, 21: [2, 43], 59: [2, 43], 66: [2, 43], 74: [2, 43], 75: [2, 43], 76: [2, 43], 77: [2, 43] }, { 18: 63, 31: [2, 73], 48: 60, 57: 61, 58: 64, 59: [1, 38], 63: 62, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 66: [1, 68] }, { 21: [2, 37], 31: [2, 37], 52: [2, 37], 59: [2, 37], 62: [2, 37], 66: [2, 37], 69: [2, 37], 74: [2, 37], 75: [2, 37], 76: [2, 37], 77: [2, 37], 79: [1, 43] }, { 18: 63, 51: 69, 52: [2, 77], 57: 70, 58: 64, 59: [1, 38], 63: 71, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 24: 72, 45: [1, 73] }, { 45: [2, 48] }, { 4: 74, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 37: [2, 41], 42: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] }, { 45: [2, 19] }, { 18: 75, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 4: 76, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] }, { 24: 77, 45: [1, 73] }, { 45: [2, 50] }, { 5: [2, 10], 13: [2, 10], 14: [2, 10], 17: [2, 10], 27: [2, 10], 32: [2, 10], 37: [2, 10], 42: [2, 10], 45: [2, 10], 46: [2, 10], 49: [2, 10], 53: [2, 10] }, { 18: 63, 31: [2, 81], 56: 78, 57: 79, 58: 64, 59: [1, 38], 63: 80, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 59: [2, 83], 60: 81, 62: [2, 83], 66: [2, 83], 74: [2, 83], 75: [2, 83], 76: [2, 83], 77: [2, 83] }, { 18: 63, 29: 82, 31: [2, 53], 57: 83, 58: 64, 59: [1, 38], 63: 84, 64: 65, 65: 66, 66: [1, 67], 69: [2, 53], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 18: 63, 31: [2, 59], 34: 85, 57: 86, 58: 64, 59: [1, 38], 63: 87, 64: 65, 65: 66, 66: [1, 67], 69: [2, 59], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 18: 63, 20: 88, 21: [2, 45], 57: 89, 58: 64, 59: [1, 38], 63: 90, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 31: [1, 91] }, { 31: [2, 72], 59: [2, 72], 66: [2, 72], 74: [2, 72], 75: [2, 72], 76: [2, 72], 77: [2, 72] }, { 31: [2, 74] }, { 21: [2, 24], 31: [2, 24], 52: [2, 24], 59: [2, 24], 62: [2, 24], 66: [2, 24], 69: [2, 24], 74: [2, 24], 75: [2, 24], 76: [2, 24], 77: [2, 24] }, { 21: [2, 25], 31: [2, 25], 52: [2, 25], 59: [2, 25], 62: [2, 25], 66: [2, 25], 69: [2, 25], 74: [2, 25], 75: [2, 25], 76: [2, 25], 77: [2, 25] }, { 21: [2, 27], 31: [2, 27], 52: [2, 27], 62: [2, 27], 65: 92, 66: [1, 93], 69: [2, 27] }, { 21: [2, 87], 31: [2, 87], 52: [2, 87], 62: [2, 87], 66: [2, 87], 69: [2, 87] }, { 21: [2, 40], 31: [2, 40], 52: [2, 40], 59: [2, 40], 62: [2, 40], 66: [2, 40], 67: [1, 94], 69: [2, 40], 74: [2, 40], 75: [2, 40], 76: [2, 40], 77: [2, 40], 79: [2, 40] }, { 21: [2, 39], 31: [2, 39], 52: [2, 39], 59: [2, 39], 62: [2, 39], 66: [2, 39], 69: [2, 39], 74: [2, 39], 75: [2, 39], 76: [2, 39], 77: [2, 39], 79: [2, 39] }, { 52: [1, 95] }, { 52: [2, 76], 59: [2, 76], 66: [2, 76], 74: [2, 76], 75: [2, 76], 76: [2, 76], 77: [2, 76] }, { 52: [2, 78] }, { 5: [2, 12], 13: [2, 12], 14: [2, 12], 17: [2, 12], 27: [2, 12], 32: [2, 12], 37: [2, 12], 42: [2, 12], 45: [2, 12], 46: [2, 12], 49: [2, 12], 53: [2, 12] }, { 18: 96, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 36: 48, 37: [1, 50], 41: 49, 42: [1, 51], 43: 98, 44: 97, 45: [2, 69] }, { 31: [2, 63], 38: 99, 59: [2, 63], 66: [2, 63], 69: [2, 63], 74: [2, 63], 75: [2, 63], 76: [2, 63], 77: [2, 63] }, { 45: [2, 17] }, { 5: [2, 13], 13: [2, 13], 14: [2, 13], 17: [2, 13], 27: [2, 13], 32: [2, 13], 37: [2, 13], 42: [2, 13], 45: [2, 13], 46: [2, 13], 49: [2, 13], 53: [2, 13] }, { 31: [1, 100] }, { 31: [2, 80], 59: [2, 80], 66: [2, 80], 74: [2, 80], 75: [2, 80], 76: [2, 80], 77: [2, 80] }, { 31: [2, 82] }, { 18: 63, 57: 102, 58: 64, 59: [1, 38], 61: 101, 62: [2, 85], 63: 103, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 30: 104, 31: [2, 55], 68: 105, 69: [1, 106] }, { 31: [2, 52], 59: [2, 52], 66: [2, 52], 69: [2, 52], 74: [2, 52], 75: [2, 52], 76: [2, 52], 77: [2, 52] }, { 31: [2, 54], 69: [2, 54] }, { 31: [2, 61], 35: 107, 68: 108, 69: [1, 106] }, { 31: [2, 58], 59: [2, 58], 66: [2, 58], 69: [2, 58], 74: [2, 58], 75: [2, 58], 76: [2, 58], 77: [2, 58] }, { 31: [2, 60], 69: [2, 60] }, { 21: [1, 109] }, { 21: [2, 44], 59: [2, 44], 66: [2, 44], 74: [2, 44], 75: [2, 44], 76: [2, 44], 77: [2, 44] }, { 21: [2, 46] }, { 5: [2, 21], 13: [2, 21], 14: [2, 21], 17: [2, 21], 27: [2, 21], 32: [2, 21], 37: [2, 21], 42: [2, 21], 45: [2, 21], 46: [2, 21], 49: [2, 21], 53: [2, 21] }, { 21: [2, 88], 31: [2, 88], 52: [2, 88], 62: [2, 88], 66: [2, 88], 69: [2, 88] }, { 67: [1, 94] }, { 18: 63, 57: 110, 58: 64, 59: [1, 38], 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 5: [2, 22], 13: [2, 22], 14: [2, 22], 17: [2, 22], 27: [2, 22], 32: [2, 22], 37: [2, 22], 42: [2, 22], 45: [2, 22], 46: [2, 22], 49: [2, 22], 53: [2, 22] }, { 31: [1, 111] }, { 45: [2, 18] }, { 45: [2, 70] }, { 18: 63, 31: [2, 65], 39: 112, 57: 113, 58: 64, 59: [1, 38], 63: 114, 64: 65, 65: 66, 66: [1, 67], 69: [2, 65], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 }, { 5: [2, 23], 13: [2, 23], 14: [2, 23], 17: [2, 23], 27: [2, 23], 32: [2, 23], 37: [2, 23], 42: [2, 23], 45: [2, 23], 46: [2, 23], 49: [2, 23], 53: [2, 23] }, { 62: [1, 115] }, { 59: [2, 84], 62: [2, 84], 66: [2, 84], 74: [2, 84], 75: [2, 84], 76: [2, 84], 77: [2, 84] }, { 62: [2, 86] }, { 31: [1, 116] }, { 31: [2, 56] }, { 66: [1, 118], 70: 117 }, { 31: [1, 119] }, { 31: [2, 62] }, { 14: [2, 11] }, { 21: [2, 28], 31: [2, 28], 52: [2, 28], 62: [2, 28], 66: [2, 28], 69: [2, 28] }, { 5: [2, 20], 13: [2, 20], 14: [2, 20], 17: [2, 20], 27: [2, 20], 32: [2, 20], 37: [2, 20], 42: [2, 20], 45: [2, 20], 46: [2, 20], 49: [2, 20], 53: [2, 20] }, { 31: [2, 67], 40: 120, 68: 121, 69: [1, 106] }, { 31: [2, 64], 59: [2, 64], 66: [2, 64], 69: [2, 64], 74: [2, 64], 75: [2, 64], 76: [2, 64], 77: [2, 64] }, { 31: [2, 66], 69: [2, 66] }, { 21: [2, 26], 31: [2, 26], 52: [2, 26], 59: [2, 26], 62: [2, 26], 66: [2, 26], 69: [2, 26], 74: [2, 26], 75: [2, 26], 76: [2, 26], 77: [2, 26] }, { 13: [2, 14], 14: [2, 14], 17: [2, 14], 27: [2, 14], 32: [2, 14], 37: [2, 14], 42: [2, 14], 45: [2, 14], 46: [2, 14], 49: [2, 14], 53: [2, 14] }, { 66: [1, 123], 71: [1, 122] }, { 66: [2, 89], 71: [2, 89] }, { 13: [2, 15], 14: [2, 15], 17: [2, 15], 27: [2, 15], 32: [2, 15], 42: [2, 15], 45: [2, 15], 46: [2, 15], 49: [2, 15], 53: [2, 15] }, { 31: [1, 124] }, { 31: [2, 68] }, { 31: [2, 29] }, { 66: [2, 90], 71: [2, 90] }, { 13: [2, 16], 14: [2, 16], 17: [2, 16], 27: [2, 16], 32: [2, 16], 37: [2, 16], 42: [2, 16], 45: [2, 16], 46: [2, 16], 49: [2, 16], 53: [2, 16] }], defaultActions: { 4: [2, 1], 47: [2, 48], 49: [2, 19], 53: [2, 50], 62: [2, 74], 71: [2, 78], 76: [2, 17], 80: [2, 82], 90: [2, 46], 97: [2, 18], 98: [2, 70], 103: [2, 86], 105: [2, 56], 108: [2, 62], 109: [2, 11], 121: [2, 68], 122: [2, 29] }, parseError: function v(A, z) {
          throw new Error(A) }, parse: function x(I) {
          var P = this,
            F = [0],
            Y = [null],
            K = [],
            Z = this.table,
            A = "",
            J = 0,
            W = 0,
            C = 0,
            H = 2,
            M = 1;
          this.lexer.setInput(I);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined") { this.lexer.yylloc = {} }
          var B = this.lexer.yylloc;
          K.push(B);
          var D = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function") { this.parseError = this.yy.parseError }

          function O(ab) { F.length = F.length - 2 * ab;
            Y.length = Y.length - ab;
            K.length = K.length - ab }

          function N() {
            var ab;
            ab = P.lexer.lex() || 1;
            if (typeof ab !== "number") { ab = P.symbols_[ab] || ab }
            return ab }
          var V, R, E, U, aa, L, T = {},
            Q, X, z, G;
          while (true) { E = F[F.length - 1];
            if (this.defaultActions[E]) { U = this.defaultActions[E] } else {
              if (V === null || typeof V == "undefined") { V = N() }
              U = Z[E] && Z[E][V] }
            if (typeof U === "undefined" || !U.length || !U[0]) {
              var S = "";
              if (!C) { G = [];
                for (Q in Z[E]) {
                  if (this.terminals_[Q] && Q > 2) { G.push("'" + this.terminals_[Q] + "'") } }
                if (this.lexer.showPosition) { S = "Parse error on line " + (J + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + G.join(", ") + ", got '" + (this.terminals_[V] || V) + "'" } else { S = "Parse error on line " + (J + 1) + ": Unexpected " + (V == 1 ? "end of input" : "'" + (this.terminals_[V] || V) + "'") }
                this.parseError(S, { text: this.lexer.match, token: this.terminals_[V] || V, line: this.lexer.yylineno, loc: B, expected: G }) } }
            if (U[0] instanceof Array && U.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + E + ", token: " + V) }
            switch (U[0]) {
              case 1:
                F.push(V);
                Y.push(this.lexer.yytext);
                K.push(this.lexer.yylloc);
                F.push(U[1]);
                V = null;
                if (!R) { W = this.lexer.yyleng;
                  A = this.lexer.yytext;
                  J = this.lexer.yylineno;
                  B = this.lexer.yylloc;
                  if (C > 0) { C-- } } else { V = R;
                  R = null }
                break;
              case 2:
                X = this.productions_[U[1]][1];
                T.$ = Y[Y.length - X];
                T._$ = { first_line: K[K.length - (X || 1)].first_line, last_line: K[K.length - 1].last_line, first_column: K[K.length - (X || 1)].first_column, last_column: K[K.length - 1].last_column };
                if (D) { T._$.range = [K[K.length - (X || 1)].range[0], K[K.length - 1].range[1]] }
                L = this.performAction.call(T, A, W, J, this.yy, U[1], Y, K);
                if (typeof L !== "undefined") {
                  return L }
                if (X) { F = F.slice(0, -1 * X * 2);
                  Y = Y.slice(0, -1 * X);
                  K = K.slice(0, -1 * X) }
                F.push(this.productions_[U[1]][0]);
                Y.push(T.$);
                K.push(T._$);
                z = Z[F[F.length - 2]][F[F.length - 1]];
                F.push(z);
                break;
              case 3:
                return true } }
          return true } };
      var s = (function() {
        var C = ({ EOF: 1, parseError: function E(H, G) {
            if (this.yy.parser) { this.yy.parser.parseError(H, G) } else {
              throw new Error(H) } }, setInput: function(G) { this._input = G;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
            if (this.options.ranges) { this.yylloc.range = [0, 0] }
            this.offset = 0;
            return this }, input: function() {
            var H = this._input[0];
            this.yytext += H;
            this.yyleng++;
            this.offset++;
            this.match += H;
            this.matched += H;
            var G = H.match(/(?:\r\n?|\n).*/g);
            if (G) { this.yylineno++;
              this.yylloc.last_line++ } else { this.yylloc.last_column++ }
            if (this.options.ranges) { this.yylloc.range[1]++ }
            this._input = this._input.slice(1);
            return H }, unput: function(I) {
            var G = I.length;
            var H = I.split(/(?:\r\n?|\n)/g);
            this._input = I + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - G - 1);
            this.offset -= G;
            var K = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (H.length - 1) { this.yylineno -= H.length - 1 }
            var J = this.yylloc.range;
            this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: H ? (H.length === K.length ? this.yylloc.first_column : 0) + K[K.length - H.length].length - H[0].length : this.yylloc.first_column - G };
            if (this.options.ranges) { this.yylloc.range = [J[0], J[0] + this.yyleng - G] }
            return this }, more: function() { this._more = true;
            return this }, less: function(G) { this.unput(this.match.slice(G)) }, pastInput: function() {
            var G = this.matched.substr(0, this.matched.length - this.match.length);
            return (G.length > 20 ? "..." : "") + G.substr(-20).replace(/\n/g, "") }, upcomingInput: function() {
            var G = this.match;
            if (G.length < 20) { G += this._input.substr(0, 20 - G.length) }
            return (G.substr(0, 20) + (G.length > 20 ? "..." : "")).replace(/\n/g, "") }, showPosition: function() {
            var G = this.pastInput();
            var H = new Array(G.length + 1).join("-");
            return G + this.upcomingInput() + "\n" + H + "^" }, next: function() {
            if (this.done) {
              return this.EOF }
            if (!this._input) { this.done = true }
            var M, K, H, J, I, G;
            if (!this._more) { this.yytext = "";
              this.match = "" }
            var N = this._currentRules();
            for (var L = 0; L < N.length; L++) { H = this._input.match(this.rules[N[L]]);
              if (H && (!K || H[0].length > K[0].length)) { K = H;
                J = L;
                if (!this.options.flex) {
                  break } } }
            if (K) { G = K[0].match(/(?:\r\n?|\n).*/g);
              if (G) { this.yylineno += G.length }
              this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: G ? G[G.length - 1].length - G[G.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + K[0].length };
              this.yytext += K[0];
              this.match += K[0];
              this.matches = K;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) { this.yylloc.range = [this.offset, this.offset += this.yyleng] }
              this._more = false;
              this._input = this._input.slice(K[0].length);
              this.matched += K[0];
              M = this.performAction.call(this, this.yy, this, N[J], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input) { this.done = false }
              if (M) {
                return M } else {
                return } }
            if (this._input === "") {
              return this.EOF } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno }) } }, lex: function z() {
            var G = this.next();
            if (typeof G !== "undefined") {
              return G } else {
              return this.lex() } }, begin: function A(G) { this.conditionStack.push(G) }, popState: function F() {
            return this.conditionStack.pop() }, _currentRules: function D() {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules }, topState: function() {
            return this.conditionStack[this.conditionStack.length - 2] }, pushState: function A(G) { this.begin(G) } });
        C.options = {};
        C.performAction = function B(L, H, K, G) {
          function I(N, M) {
            return H.yytext = H.yytext.substr(N, H.yyleng - M) }
          var J = G;
          switch (K) {
            case 0:
              if (H.yytext.slice(-2) === "\\\\") { I(0, 1);
                this.begin("mu") } else {
                if (H.yytext.slice(-1) === "\\") { I(0, 1);
                  this.begin("emu") } else { this.begin("mu") } }
              if (H.yytext) {
                return 14 }
              break;
            case 1:
              return 14;
              break;
            case 2:
              this.popState();
              return 14;
              break;
            case 3:
              H.yytext = H.yytext.substr(5, H.yyleng - 9);
              this.popState();
              return 16;
              break;
            case 4:
              return 14;
              break;
            case 5:
              this.popState();
              return 13;
              break;
            case 6:
              return 59;
              break;
            case 7:
              return 62;
              break;
            case 8:
              return 17;
              break;
            case 9:
              this.popState();
              this.begin("raw");
              return 21;
              break;
            case 10:
              return 53;
              break;
            case 11:
              return 27;
              break;
            case 12:
              return 45;
              break;
            case 13:
              this.popState();
              return 42;
              break;
            case 14:
              this.popState();
              return 42;
              break;
            case 15:
              return 32;
              break;
            case 16:
              return 37;
              break;
            case 17:
              return 49;
              break;
            case 18:
              return 46;
              break;
            case 19:
              this.unput(H.yytext);
              this.popState();
              this.begin("com");
              break;
            case 20:
              this.popState();
              return 13;
              break;
            case 21:
              return 46;
              break;
            case 22:
              return 67;
              break;
            case 23:
              return 66;
              break;
            case 24:
              return 66;
              break;
            case 25:
              return 79;
              break;
            case 26:
              break;
            case 27:
              this.popState();
              return 52;
              break;
            case 28:
              this.popState();
              return 31;
              break;
            case 29:
              H.yytext = I(1, 2).replace(/\\"/g, '"');
              return 74;
              break;
            case 30:
              H.yytext = I(1, 2).replace(/\\'/g, "'");
              return 74;
              break;
            case 31:
              return 77;
              break;
            case 32:
              return 76;
              break;
            case 33:
              return 76;
              break;
            case 34:
              return 75;
              break;
            case 35:
              return 69;
              break;
            case 36:
              return 71;
              break;
            case 37:
              return 66;
              break;
            case 38:
              H.yytext = I(1, 2);
              return 66;
              break;
            case 39:
              return "INVALID";
              break;
            case 40:
              return 5;
              break } };
        C.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
        C.conditions = { mu: { rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], inclusive: false }, emu: { rules: [2], inclusive: false }, com: { rules: [5], inclusive: false }, raw: { rules: [3, 4], inclusive: false }, INITIAL: { rules: [0, 1, 40], inclusive: true } };
        return C })();
      y.lexer = s;

      function w() { this.yy = {} }
      w.prototype = y;
      y.Parser = w;
      return new w })();
    r = q;
    return r })();
  var j = (function(v, s) {
    var t;
    var r = v;
    var u = s;

    function q() { this.parents = [] }
    q.prototype = { constructor: q, mutating: false, acceptKey: function(x, w) {
        var y = this.accept(x[w]);
        if (this.mutating) {
          if (y && (!y.type || !u[y.type])) {
            throw new r('Unexpected node type "' + y.type + '" found when accepting ' + w + " on " + x.type) }
          x[w] = y } }, acceptRequired: function(x, w) { this.acceptKey(x, w);
        if (!x[w]) {
          throw new r(x.type + " requires " + w) } }, acceptArray: function(y) {
        for (var x = 0, w = y.length; x < w; x++) { this.acceptKey(y, x);
          if (!y[x]) { y.splice(x, 1);
            x--;
            w-- } } }, accept: function(x) {
        if (!x) {
          return }
        if (this.current) { this.parents.unshift(this.current) }
        this.current = x;
        var w = this[x.type](x);
        this.current = this.parents.shift();
        if (!this.mutating || w) {
          return w } else {
          if (w !== false) {
            return x } } }, Program: function(w) { this.acceptArray(w.body) }, MustacheStatement: function(w) { this.acceptRequired(w, "path");
        this.acceptArray(w.params);
        this.acceptKey(w, "hash") }, BlockStatement: function(w) { this.acceptRequired(w, "path");
        this.acceptArray(w.params);
        this.acceptKey(w, "hash");
        this.acceptKey(w, "program");
        this.acceptKey(w, "inverse") }, PartialStatement: function(w) { this.acceptRequired(w, "name");
        this.acceptArray(w.params);
        this.acceptKey(w, "hash") }, ContentStatement: function() {}, CommentStatement: function() {}, SubExpression: function(w) { this.acceptRequired(w, "path");
        this.acceptArray(w.params);
        this.acceptKey(w, "hash") }, PartialExpression: function(w) { this.acceptRequired(w, "name");
        this.acceptArray(w.params);
        this.acceptKey(w, "hash") }, PathExpression: function() {}, StringLiteral: function() {}, NumberLiteral: function() {}, BooleanLiteral: function() {}, Hash: function(w) { this.acceptArray(w.pairs) }, HashPair: function(w) { this.acceptRequired(w, "value") } };
    t = q;
    return t })(a, l);
  var f = (function(w) {
    var u;
    var r = w;

    function v() {}
    v.prototype = new r();
    v.prototype.Program = function(F) {
      var B = !this.isRootSeen;
      this.isRootSeen = true;
      var G = F.body;
      for (var E = 0, C = G.length; E < C; E++) {
        var H = G[E],
          y = this.accept(H);
        if (!y) {
          continue }
        var A = x(G, E, B),
          D = t(G, E, B),
          z = y.openStandalone && A,
          J = y.closeStandalone && D,
          I = y.inlineStandalone && A && D;
        if (y.close) { q(G, E, true) }
        if (y.open) { s(G, E, true) }
        if (I) { q(G, E);
          if (s(G, E)) {
            if (H.type === "PartialStatement") { H.indent = (/([ \t]+$)/).exec(G[E - 1].original)[1] } } }
        if (z) { q((H.program || H.inverse).body);
          s(G, E) }
        if (J) { q(G, E);
          s((H.inverse || H.program).body) } }
      return F };
    v.prototype.BlockStatement = function(E) { this.accept(E.program);
      this.accept(E.inverse);
      var A = E.program || E.inverse,
        y = E.program && E.inverse,
        z = y,
        D = y;
      if (y && y.chained) { z = y.body[0].program;
        while (D.chained) { D = D.body[D.body.length - 1].program } }
      var B = { open: E.openStrip.open, close: E.closeStrip.close, openStandalone: t(A.body), closeStandalone: x((z || A).body) };
      if (E.openStrip.close) { q(A.body, null, true) }
      if (y) {
        var C = E.inverseStrip;
        if (C.open) { s(A.body, null, true) }
        if (C.close) { q(z.body, null, true) }
        if (E.closeStrip.open) { s(D.body, null, true) }
        if (x(A.body) && t(z.body)) { s(A.body);
          q(z.body) } } else {
        if (E.closeStrip.open) { s(A.body, null, true) } }
      return B };
    v.prototype.MustacheStatement = function(y) {
      return y.strip };
    v.prototype.PartialStatement = v.prototype.CommentStatement = function(z) {
      var y = z.strip || {};
      return { inlineStandalone: true, open: y.open, close: y.close } };

    function x(y, A, z) {
      if (A === undefined) { A = y.length }
      var C = y[A - 1],
        B = y[A - 2];
      if (!C) {
        return z }
      if (C.type === "ContentStatement") {
        return (B || !z ? (/\r?\n\s*?$/) : (/(^|\r?\n)\s*?$/)).test(C.original) } }

    function t(y, A, z) {
      if (A === undefined) { A = -1 }
      var C = y[A + 1],
        B = y[A + 2];
      if (!C) {
        return z }
      if (C.type === "ContentStatement") {
        return (B || !z ? (/^\s*?\r?\n/) : (/^\s*?(\r?\n|$)/)).test(C.original) } }

    function q(z, B, y) {
      var C = z[B == null ? 0 : B + 1];
      if (!C || C.type !== "ContentStatement" || (!y && C.rightStripped)) {
        return }
      var A = C.value;
      C.value = C.value.replace(y ? (/^\s+/) : (/^[ \t]*\r?\n?/), "");
      C.rightStripped = C.value !== A }

    function s(z, B, y) {
      var C = z[B == null ? z.length - 1 : B - 1];
      if (!C || C.type !== "ContentStatement" || (!y && C.leftStripped)) {
        return }
      var A = C.value;
      C.value = C.value.replace(y ? (/\s+$/) : (/[ \t]+$/), "");
      C.leftStripped = C.value !== A;
      return C.leftStripped }
    u = v;
    return u })(j);
  var m = (function(v) {
    var z = {};
    var s = v;

    function t(B, A) { this.source = B;
      this.start = { line: A.first_line, column: A.first_column };
      this.end = { line: A.last_line, column: A.last_column } }
    z.SourceLocation = t;

    function r(A, B) {
      return { open: A.charAt(2) === "~", close: B.charAt(B.length - 3) === "~" } }
    z.stripFlags = r;

    function x(A) {
      return A.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "") }
    z.stripComment = x;

    function q(G, E, I) { I = this.locInfo(I);
      var C = G ? "@" : "",
        J = [],
        F = 0,
        B = "";
      for (var H = 0, D = E.length; H < D; H++) {
        var A = E[H].part;
        C += (E[H].separator || "") + A;
        if (A === ".." || A === "." || A === "this") {
          if (J.length > 0) {
            throw new s("Invalid path: " + C, { loc: I }) } else {
            if (A === "..") { F++;
              B += "../" } } } else { J.push(A) } }
      return new this.PathExpression(G, F, J, C, I) }
    z.preparePath = q;

    function u(G, H, F, A, C, B) {
      var E = A.charAt(3) || A.charAt(2),
        D = E !== "{" && E !== "&";
      return new this.MustacheStatement(G, H, F, D, C, this.locInfo(B)) }
    z.prepareMustache = u;

    function w(A, D, F, C) {
      if (A.path.original !== F) {
        var E = { loc: A.path.loc };
        throw new s(A.path.original + " doesn't match " + F, E) }
      C = this.locInfo(C);
      var B = new this.Program([D], null, {}, C);
      return new this.BlockStatement(A.path, A.params, A.hash, B, undefined, {}, {}, {}, C) }
    z.prepareRawBlock = w;

    function y(E, D, F, I, B, G) {
      if (I && I.path && E.path.original !== I.path.original) {
        var H = { loc: E.path.loc };
        throw new s(E.path.original + " doesn't match " + I.path.original, H) }
      D.blockParams = E.blockParams;
      var C, A;
      if (F) {
        if (F.chain) { F.program.body[0].closeStrip = I.strip }
        A = F.strip;
        C = F.program }
      if (B) { B = C;
        C = D;
        D = B }
      return new this.BlockStatement(E.path, E.params, E.hash, D, C, E.strip, A, I && I.strip, this.locInfo(G)) }
    z.prepareBlock = y;
    return z })(a);
  var o = (function(z, C, r, t, w) {
    var B = {};
    var q = z;
    var v = C;
    var u = r;
    var A = t;
    var y = w.extend;
    B.parser = q;
    var x = {};
    y(x, A, v);

    function s(D, E) {
      if (D.type === "Program") {
        return D }
      q.yy = x;
      x.locInfo = function(G) {
        return new x.SourceLocation(E && E.srcName, G) };
      var F = new u();
      return F.accept(q.parse(D)) }
    B.parse = s;
    return B })(b, l, f, m, n);
  var p = (function(x, D, q) {
    var B = {};
    var t = x;
    var u = D.isArray;
    var y = D.indexOf;
    var v = q;
    var A = [].slice;

    function z() {}
    B.Compiler = z;
    z.prototype = { compiler: z, equals: function(F) {
        var E = this.opcodes.length;
        if (F.opcodes.length !== E) {
          return false }
        for (var H = 0; H < E; H++) {
          var I = this.opcodes[H],
            G = F.opcodes[H];
          if (I.opcode !== G.opcode || !w(I.args, G.args)) {
            return false } }
        E = this.children.length;
        for (H = 0; H < E; H++) {
          if (!this.children[H].equals(F.children[H])) {
            return false } }
        return true }, guid: 0, 
        compile: function(E, G) { 
          this.sourceNode = [];
          this.opcodes = [];
          this.children = [];
          this.options = G;
          this.stringParams = G.stringParams;
          this.trackIds = G.trackIds;
          G.blockParams = G.blockParams || [];
          var H = G.knownHelpers;
          G.knownHelpers = { 
            helperMissing: true, blockHelperMissing: true, each: true, "if": true, unless: true, "with": true, log: true, lookup: true 
          };
          if (H) {
            for (var F in H) { 
              G.knownHelpers[F] = H[F] 
            } 
          }
          return this.accept(E) 
        }, 
        compileProgram: function(F) {
        var E = new this.compiler().compile(F, this.options);
        var G = this.guid++;
        this.usePartial = this.usePartial || E.usePartial;
        this.children[G] = E;
        this.useDepths = this.useDepths || E.useDepths;
        return G }, 
        accept: function(F) { 
          this.sourceNode.unshift(F);
          var E = this[F.type](F);
          this.sourceNode.shift();
          return E 
        }, 
        Program: function(G) { this.options.blockParams.unshift(G.blockParams);
        var E = G.body;
        for (var H = 0, F = E.length; H < F; H++) { this.accept(E[H]) }
        this.options.blockParams.shift();
        this.isSimple = F === 1;
        this.blockParams = G.blockParams ? G.blockParams.length : 0;
        return this }, BlockStatement: function(H) { r(H);
        var F = H.program,
          E = H.inverse;
        F = F && this.compileProgram(F);
        E = E && this.compileProgram(E);
        var G = this.classifySexpr(H);
        if (G === "helper") { this.helperSexpr(H, F, E) } else {
          if (G === "simple") { this.simpleSexpr(H);
            this.opcode("pushProgram", F);
            this.opcode("pushProgram", E);
            this.opcode("emptyHash");
            this.opcode("blockValue", H.path.original) } else { this.ambiguousSexpr(H, F, E);
            this.opcode("pushProgram", F);
            this.opcode("pushProgram", E);
            this.opcode("emptyHash");
            this.opcode("ambiguousBlockValue") } }
        this.opcode("append") }, PartialStatement: function(G) { this.usePartial = true;
        var I = G.params;
        if (I.length > 1) {
          throw new t("Unsupported number of partial arguments: " + I.length, G) } else {
          if (!I.length) { I.push({ type: "PathExpression", parts: [], depth: 0 }) } }
        var H = G.name.original,
          F = G.name.type === "SubExpression";
        if (F) { this.accept(G.name) }
        this.setupFullMustacheParams(G, undefined, undefined, true);
        var E = G.indent || "";
        if (this.options.preventIndent && E) { this.opcode("appendContent", E);
          E = "" }
        this.opcode("invokePartial", F, H, E);
        this.opcode("append") }, MustacheStatement: function(E) { this.SubExpression(E);
        if (E.escaped && !this.options.noEscape) { this.opcode("appendEscaped") } else { this.opcode("append") } }, ContentStatement: function(E) {
        if (E.value) { this.opcode("appendContent", E.value) } }, CommentStatement: function() {}, SubExpression: function(F) { r(F);
        var E = this.classifySexpr(F);
        if (E === "simple") { this.simpleSexpr(F) } else {
          if (E === "helper") { this.helperSexpr(F) } else { this.ambiguousSexpr(F) } } }, ambiguousSexpr: function(I, G, F) {
        var J = I.path,
          H = J.parts[0],
          E = G != null || F != null;
        this.opcode("getContext", J.depth);
        this.opcode("pushProgram", G);
        this.opcode("pushProgram", F);
        this.accept(J);
        this.opcode("invokeAmbiguous", H, E) }, simpleSexpr: function(E) { this.accept(E.path);
        this.opcode("resolvePossibleLambda") }, helperSexpr: function(H, F, E) {
        var J = this.setupFullMustacheParams(H, F, E),
          I = H.path,
          G = I.parts[0];
        if (this.options.knownHelpers[G]) { this.opcode("invokeKnownHelper", J.length, G) } else {
          if (this.options.knownHelpersOnly) {
            throw new t("You specified knownHelpersOnly, but used the unknown helper " + G, H) } else { I.falsy = true;
            this.accept(I);
            this.opcode("invokeHelper", J.length, I.original, v.helpers.simpleId(I)) } } }, PathExpression: function(F) { this.addDepth(F.depth);
        this.opcode("getContext", F.depth);
        var E = F.parts[0],
          H = v.helpers.scopedId(F),
          G = !F.depth && !H && this.blockParamIndex(E);
        if (G) { this.opcode("lookupBlockParam", G, F.parts) } else {
          if (!E) { this.opcode("pushContext") } else {
            if (F.data) { this.options.data = true;
              this.opcode("lookupData", F.depth, F.parts) } else { this.opcode("lookupOnContext", F.parts, F.falsy, H) } } } }, StringLiteral: function(E) { this.opcode("pushString", E.value) }, NumberLiteral: function(E) { this.opcode("pushLiteral", E.value) }, BooleanLiteral: function(E) { this.opcode("pushLiteral", E.value) }, Hash: function(H) {
        var G = H.pairs,
          F, E;
        this.opcode("pushHash");
        for (F = 0, E = G.length; F < E; F++) { this.pushParam(G[F].value) }
        while (F--) { this.opcode("assignToHash", G[F].key) }
        this.opcode("popHash") }, opcode: function(E) { this.opcodes.push({ opcode: E, args: A.call(arguments, 1), loc: this.sourceNode[0].loc }) }, addDepth: function(E) {
        if (!E) {
          return }
        this.useDepths = true }, classifySexpr: function(H) {
        var I = v.helpers.simpleId(H.path);
        var J = I && !!this.blockParamIndex(H.path.parts[0]);
        var G = !J && v.helpers.helperExpression(H);
        var K = !J && (G || I);
        var F = this.options;
        if (K && !G) {
          var E = H.path.parts[0];
          if (F.knownHelpers[E]) { G = true } else {
            if (F.knownHelpersOnly) { K = false } } }
        if (G) {
          return "helper" } else {
          if (K) {
            return "ambiguous" } else {
            return "simple" } } }, pushParams: function(G) {
        for (var F = 0, E = G.length; F < E; F++) { this.pushParam(G[F]) } }, pushParam: function(H) {
        var G = H.value != null ? H.value : H.original || "";
        if (this.stringParams) {
          if (G.replace) { G = G.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".") }
          if (H.depth) { this.addDepth(H.depth) }
          this.opcode("getContext", H.depth || 0);
          this.opcode("pushStringParam", G, H.type);
          if (H.type === "SubExpression") { this.accept(H) } } else {
          if (this.trackIds) {
            var F;
            if (H.parts && !v.helpers.scopedId(H) && !H.depth) { F = this.blockParamIndex(H.parts[0]) }
            if (F) {
              var E = H.parts.slice(1).join(".");
              this.opcode("pushId", "BlockParam", F, E) } else { G = H.original || G;
              if (G.replace) { G = G.replace(/^\.\//g, "").replace(/^\.$/g, "") }
              this.opcode("pushId", H.type, G) } }
          this.accept(H) } }, setupFullMustacheParams: function(H, F, E, G) {
        var I = H.params;
        this.pushParams(I);
        this.opcode("pushProgram", F);
        this.opcode("pushProgram", E);
        if (H.hash) { this.accept(H.hash) } else { this.opcode("emptyHash", G) }
        return I }, blockParamIndex: function(F) {
        for (var I = 0, E = this.options.blockParams.length; I < E; I++) {
          var G = this.options.blockParams[I],
            H = G && y(G, F);
          if (G && H >= 0) {
            return [I, H] } } } };

    function s(G, H, I) {
      if (G == null || (typeof G !== "string" && G.type !== "Program")) {
        throw new t("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + G) }
      H = H || {};
      if (!("data" in H)) { H.data = true }
      if (H.compat) { H.useDepths = true }
      var F = I.parse(G, H);
      var E = new I.Compiler().compile(F, H);
      return new I.JavaScriptCompiler().compile(E, H) }
    B.precompile = s;

    function C(E, G, H) {
      if (E == null || (typeof E !== "string" && E.type !== "Program")) {
        throw new t("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + E) }
      G = G || {};
      if (!("data" in G)) { G.data = true }
      if (G.compat) { G.useDepths = true }
      var J;

      function I() {
        var M = H.parse(E, G);
        var L = new H.Compiler().compile(M, G);
        var K = new H.JavaScriptCompiler().compile(L, G, undefined, true);
        return H.template(K) }
      var F = function(L, K) {
        if (!J) { J = I() }
        return J.call(this, L, K) };
      F._setup = function(K) {
        if (!J) { J = I() }
        return J._setup(K) };
      F._child = function(K, M, L, N) {
        if (!J) { J = I() }
        return J._child(K, M, L, N) };
      return F }
    B.compile = C;

    function w(F, E) {
      if (F === E) {
        return true }
      if (u(F) && u(E) && F.length === E.length) {
        for (var G = 0; G < F.length; G++) {
          if (!w(F[G], E[G])) {
            return false } }
        return true } }

    function r(F) {
      if (!F.path.parts) {
        var E = F.path;
        F.path = new v.PathExpression(false, 0, [E.original + ""], E.original + "", E.log) } }
    return B })(a, n, l);
  var g = (function(x) {
    var u;
    var r = x.isArray;
    try {
      var w = require("source-map"),
        q = w.SourceNode } catch (t) { q = function(y, z, A, B) { this.src = "";
        if (B) { this.add(B) } };
      q.prototype = { add: function(y) {
          if (r(y)) { y = y.join("") }
          this.src += y }, prepend: function(y) {
          if (r(y)) { y = y.join("") }
          this.src = y + this.src }, toStringWithSourceMap: function() {
          return { code: this.toString() } }, toString: function() {
          return this.src } } }

    function s(B, z, D) {
      if (r(B)) {
        var A = [];
        for (var C = 0, y = B.length; C < y; C++) { A.push(z.wrap(B[C], D)) }
        return A } else {
        if (typeof B === "boolean" || typeof B === "number") {
          return B + "" } }
      return B }

    function v(y) { this.srcFile = y;
      this.source = [] }
    v.prototype = { prepend: function(y, z) { this.source.unshift(this.wrap(y, z)) }, push: function(y, z) { this.source.push(this.wrap(y, z)) }, merge: function() {
        var y = this.empty();
        this.each(function(z) { y.add(["  ", z, "\n"]) });
        return y }, each: function(z) {
        for (var A = 0, y = this.source.length; A < y; A++) { z(this.source[A]) } }, empty: function(y) { y = y || this.currentLocation || { start: {} };
        return new q(y.start.line, y.start.column, this.srcFile) }, wrap: function(y, z) {
        if (y instanceof q) {
          return y }
        z = z || this.currentLocation || { start: {} };
        y = s(y, this, z);
        return new q(z.start.line, z.start.column, this.srcFile, y) }, functionCall: function(z, y, A) { A = this.generateList(A);
        return this.wrap([z, y ? "." + y + "(" : "(", A, ")"]) }, quotedString: function(y) {
        return '"' + (y + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"' }, objectLiteral: function(C) {
        var B = [];
        for (var z in C) {
          if (C.hasOwnProperty(z)) {
            var A = s(C[z], this);
            if (A !== "undefined") { B.push([this.quotedString(z), ":", A]) } } }
        var y = this.generateList(B);
        y.prepend("{");
        y.add("}");
        return y }, generateList: function(z, C) {
        var A = this.empty(C);
        for (var B = 0, y = z.length; B < y; B++) {
          if (B) { A.add(",") }
          A.add(s(z[B], this, C)) }
        return A }, generateArray: function(y, A) {
        var z = this.generateList(y, A);
        z.prepend("[");
        z.add("]");
        return z } };
    u = v;
    return u })(n);
  var d = (function(B, F, r, x) {
    var D;
    var q = B.COMPILER_REVISION;
    var w = B.REVISION_CHANGES;
    var y = F;
    var A = r.isArray;
    var E = x;

    function u(H) { this.value = H }

    function G() {}
    G.prototype = { nameLookup: function(I, H) {
        if (G.isValidJavaScriptVariableName(H)) {
          return [I, ".", H] } else {
          return [I, "['", H, "']"] } }, depthedLookup: function(H) {
        return [this.aliasable("this.lookup"), '(depths, "', H, '")'] }, compilerInfo: function() {
        var I = q,
          H = w[I];
        return [I, H] }, appendToBuffer: function(J, H, I) {
        if (!A(J)) { J = [J] }
        J = this.source.wrap(J, H);
        if (this.environment.isSimple) {
          return ["return ", J, ";"] } else {
          if (I) {
            return ["buffer += ", J, ";"] } else { J.appendToBuffer = true;
            return J } } }, initializeBuffer: function() {
        return this.quotedString("") }, 
        compile: function(K, S, H, N) {
          this.environment = K;
          this.options = S;
          this.stringParams = this.options.stringParams;
          this.trackIds = this.options.trackIds;
          this.precompile = !N;
          this.name = this.environment.name;
          this.isChild = !!H;
          this.context = H || { programs: [], environments: [] };
          this.preamble();
          this.stackSlot = 0;
          this.stackVars = [];
          this.aliases = {};
          this.registers = { list: [] };
          this.hashes = [];
          this.compileStack = [];
          this.inlineStack = [];
          this.blockParams = [];
          this.compileChildren(K, S);
          this.useDepths = this.useDepths || K.useDepths || this.options.compat;
          this.useBlockParams = this.useBlockParams || K.useBlockParams;
          var P = K.opcodes,
            L, R, M, J;
          for (M = 0, J = P.length; M < J; M++) { L = P[M];
            this.source.currentLocation = L.loc;
            R = R || L.loc;
            this[L.opcode].apply(this, L.args) }
          this.source.currentLocation = R;
          this.pushSource("");
          if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
            throw new y("Compile completed with content left on stack") }
          var Q = this.createFunctionContext(N);
          if (!this.isChild) {
            var O = { compiler: this.compilerInfo(), main: Q };
            var I = this.context.programs;
            for (M = 0, J = I.length; M < J; M++) {
              if (I[M]) { O[M] = I[M] } }
            if (this.environment.usePartial) { O.usePartial = true }
            if (this.options.data) { O.useData = true }
            if (this.useDepths) { O.useDepths = true }
            if (this.useBlockParams) { O.useBlockParams = true }
            if (this.options.compat) { O.compat = true }
            if (!N) { O.compiler = JSON.stringify(O.compiler);
              this.source.currentLocation = { start: { line: 1, column: 0 } };
              O = this.objectLiteral(O);
              if (S.srcName) { O = O.toStringWithSourceMap({ file: S.destName });
                O.map = O.map && O.map.toString() } else { O = O.toString() } } else { O.compilerOptions = this.options }
            return O } else {
            return Q } 
        }, 
        preamble: function() { this.lastContext = 0;
        this.source = new E(this.options.srcName) }, 
        createFunctionContext: function(I) {
          var N = "";
          var M = this.stackVars.concat(this.registers.list);
          if (M.length > 0) { N += ", " + M.join(", ") }
          var L = 0;
          for (var H in this.aliases) {
            var J = this.aliases[H];
            if (this.aliases.hasOwnProperty(H) && J.children && J.referenceCount > 1) { N += ", alias" + (++L) + "=" + H;
              J.children[0] = "alias" + L } }
          var O = ["depth0", "helpers", "partials", "data"];
          if (this.useBlockParams || this.useDepths) { O.push("blockParams") }
          if (this.useDepths) { O.push("depths") }
          var K = this.mergeSource(N);
          if (I) {
            O.push(K);
            return Function.apply(this, O) 
          } else {
            return this.source.wrap(["function(", O.join(","), ") {\n  ", K, "}"]) } 
        }, 
        mergeSource: function(M) {
        var K = this.environment.isSimple,
          J = !this.forceBuffer,
          H, I, L, N;
        this.source.each(function(O) {
          if (O.appendToBuffer) {
            if (L) { O.prepend("  + ") } else { L = O }
            N = O } else {
            if (L) {
              if (!I) { H = true } else { L.prepend("buffer += ") }
              N.add(";");
              L = N = undefined }
            I = true;
            if (!K) { J = false } } });
        if (J) {
          if (L) { L.prepend("return ");
            N.add(";") } else {
            if (!I) { this.source.push('return "";') } } } else { M += ", buffer = " + (H ? "" : this.initializeBuffer());
          if (L) { L.prepend("return buffer + ");
            N.add(";") } else { this.source.push("return buffer;") } }
        if (M) { this.source.prepend("var " + M.substring(2) + (H ? "" : ";\n")) }
        return this.source.merge() }, blockValue: function(I) {
        var J = this.aliasable("helpers.blockHelperMissing"),
          K = [this.contextName(0)];
        this.setupHelperArgs(I, 0, K);
        var H = this.popStack();
        K.splice(1, 0, H);
        this.push(this.source.functionCall(J, "call", K)) }, ambiguousBlockValue: function() {
        var H = this.aliasable("helpers.blockHelperMissing"),
          J = [this.contextName(0)];
        this.setupHelperArgs("", 0, J, true);
        this.flushInline();
        var I = this.topStack();
        J.splice(1, 0, I);
        this.pushSource(["if (!", this.lastHelper, ") { ", I, " = ", this.source.functionCall(H, "call", J), "}"]) }, appendContent: function(H) {
        if (this.pendingContent) { H = this.pendingContent + H } else { this.pendingLocation = this.source.currentLocation }
        this.pendingContent = H }, append: function() {
        if (this.isInline()) { this.replaceStack(function(I) {
            return [" != null ? ", I, ' : ""'] });
          this.pushSource(this.appendToBuffer(this.popStack())) } else {
          var H = this.popStack();
          this.pushSource(["if (", H, " != null) { ", this.appendToBuffer(H, undefined, true), " }"]);
          if (this.environment.isSimple) { this.pushSource(["else { ", this.appendToBuffer("''", undefined, true), " }"]) } } }, appendEscaped: function() { this.pushSource(this.appendToBuffer([this.aliasable("this.escapeExpression"), "(", this.popStack(), ")"])) }, getContext: function(H) { this.lastContext = H }, pushContext: function() { this.pushStackLiteral(this.contextName(this.lastContext)) }, lookupOnContext: function(J, I, K) {
        var H = 0;
        if (!K && this.options.compat && !this.lastContext) { this.push(this.depthedLookup(J[H++])) } else { this.pushContext() }
        this.resolvePath("context", J, H, I) }, lookupBlockParam: function(I, H) { this.useBlockParams = true;
        this.push(["blockParams[", I[0], "][", I[1], "]"]);
        this.resolvePath("context", H, 1) }, lookupData: function(I, H) {
        if (!I) { this.pushStackLiteral("data") } else { this.pushStackLiteral("this.data(data, " + I + ")") }
        this.resolvePath("data", H, 0, true) }, resolvePath: function(J, L, I, K) {
        if (this.options.strict || this.options.assumeObjects) { this.push(t(this.options.strict, this, L, J));
          return }
        var H = L.length;
        for (; I < H; I++) { this.replaceStack(function(N) {
            var M = this.nameLookup(N, L[I], J);
            if (!K) {
              return [" != null ? ", M, " : ", N] } else {
              return [" && ", M] } }) } }, resolvePossibleLambda: function() { this.push([this.aliasable("this.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]) }, pushStringParam: function(H, I) { this.pushContext();
        this.pushString(I);
        if (I !== "SubExpression") {
          if (typeof H === "string") { this.pushString(H) } else { this.pushStackLiteral(H) } } }, emptyHash: function(H) {
        if (this.trackIds) { this.push("{}") }
        if (this.stringParams) { this.push("{}");
          this.push("{}") }
        this.pushStackLiteral(H ? "undefined" : "{}") }, pushHash: function() {
        if (this.hash) { this.hashes.push(this.hash) }
        this.hash = { values: [], types: [], contexts: [], ids: [] } }, popHash: function() {
        var H = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) { this.push(this.objectLiteral(H.ids)) }
        if (this.stringParams) { this.push(this.objectLiteral(H.contexts));
          this.push(this.objectLiteral(H.types)) }
        this.push(this.objectLiteral(H.values)) }, pushString: function(H) { this.pushStackLiteral(this.quotedString(H)) }, pushLiteral: function(H) { this.pushStackLiteral(H) }, pushProgram: function(H) {
        if (H != null) { this.pushStackLiteral(this.programExpression(H)) } else { this.pushStackLiteral(null) } }, invokeHelper: function(L, H, J) {
        var N = this.popStack();
        var I = this.setupHelper(L, H);
        var M = J ? [I.name, " || "] : "";
        var K = ["("].concat(M, N);
        if (!this.options.strict) { K.push(" || ", this.aliasable("helpers.helperMissing")) }
        K.push(")");
        this.push(this.source.functionCall(K, "call", I.callParams)) }, invokeKnownHelper: function(J, H) {
        var I = this.setupHelper(J, H);
        this.push(this.source.functionCall(I.name, "call", I.callParams)) }, invokeAmbiguous: function(H, L) { this.useRegister("helper");
        var M = this.popStack();
        this.emptyHash();
        var I = this.setupHelper(0, H, L);
        var J = this.lastHelper = this.nameLookup("helpers", H, "helper");
        var K = ["(", "(helper = ", J, " || ", M, ")"];
        if (!this.options.strict) { K[0] = "(helper = ";
          K.push(" != null ? helper : ", this.aliasable("helpers.helperMissing")) }
        this.push(["(", K, (I.paramsInit ? ["),(", I.paramsInit] : []), "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", I.callParams), " : helper))"]) }, invokePartial: function(I, K, H) {
        var L = [],
          J = this.setupParams(K, 1, L, false);
        if (I) { K = this.popStack();
          delete J.name }
        if (H) { J.indent = JSON.stringify(H) }
        J.helpers = "helpers";
        J.partials = "partials";
        if (!I) { L.unshift(this.nameLookup("partials", K, "partial")) } else { L.unshift(K) }
        if (this.options.compat) { J.depths = "depths" }
        J = this.objectLiteral(J);
        L.push(J);
        this.push(this.source.functionCall("this.invokePartial", "", L)) }, assignToHash: function(I) {
        var K = this.popStack(),
          H, J, M;
        if (this.trackIds) { M = this.popStack() }
        if (this.stringParams) { J = this.popStack();
          H = this.popStack() }
        var L = this.hash;
        if (H) { L.contexts[I] = H }
        if (J) { L.types[I] = J }
        if (M) { L.ids[I] = M }
        L.values[I] = K }, pushId: function(I, H, J) {
        if (I === "BlockParam") { this.pushStackLiteral("blockParams[" + H[0] + "].path[" + H[1] + "]" + (J ? " + " + JSON.stringify("." + J) : "")) } else {
          if (I === "PathExpression") { this.pushString(H) } else {
            if (I === "SubExpression") { this.pushStackLiteral("true") } else { this.pushStackLiteral("null") } } } }, compiler: G, compileChildren: function(H, K) {
        var M = H.children,
          O, N;
        for (var L = 0, I = M.length; L < I; L++) { O = M[L];
          N = new this.compiler();
          var J = this.matchExistingProgram(O);
          if (J == null) { this.context.programs.push("");
            J = this.context.programs.length;
            O.index = J;
            O.name = "program" + J;
            this.context.programs[J] = N.compile(O, K, this.context, !this.precompile);
            this.context.environments[J] = O;
            this.useDepths = this.useDepths || N.useDepths;
            this.useBlockParams = this.useBlockParams || N.useBlockParams } else { O.index = J;
            O.name = "program" + J;
            this.useDepths = this.useDepths || O.useDepths;
            this.useBlockParams = this.useBlockParams || O.useBlockParams } } }, matchExistingProgram: function(K) {
        for (var J = 0, I = this.context.environments.length; J < I; J++) {
          var H = this.context.environments[J];
          if (H && H.equals(K)) {
            return J } } }, programExpression: function(H) {
        var J = this.environment.children[H],
          I = [J.index, "data", J.blockParams];
        if (this.useBlockParams || this.useDepths) { I.push("blockParams") }
        if (this.useDepths) { I.push("depths") }
        return "this.program(" + I.join(", ") + ")" }, useRegister: function(H) {
        if (!this.registers[H]) { this.registers[H] = true;
          this.registers.list.push(H) } }, push: function(H) {
        if (!(H instanceof u)) { H = this.source.wrap(H) }
        this.inlineStack.push(H);
        return H }, pushStackLiteral: function(H) { this.push(new u(H)) }, pushSource: function(H) {
        if (this.pendingContent) { this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = undefined }
        if (H) { this.source.push(H) } }, replaceStack: function(O) {
        var M = ["("],
          H, L, J;
        if (!this.isInline()) {
          throw new y("replaceStack on non-inline") }
        var N = this.popStack(true);
        if (N instanceof u) { H = [N.value];
          M = ["(", H];
          J = true } else { L = true;
          var I = this.incrStack();
          M = ["((", this.push(I), " = ", N, ")"];
          H = this.topStack() }
        var K = O.call(this, H);
        if (!J) { this.popStack() }
        if (L) { this.stackSlot-- }
        this.push(M.concat(K, ")")) }, incrStack: function() { this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot) }
        return this.topStackName() }, topStackName: function() {
        return "stack" + this.stackSlot }, flushInline: function() {
        var K = this.inlineStack;
        this.inlineStack = [];
        for (var J = 0, I = K.length; J < I; J++) {
          var L = K[J];
          if (L instanceof u) { this.compileStack.push(L) } else {
            var H = this.incrStack();
            this.pushSource([H, " = ", L, ";"]);
            this.compileStack.push(H) } } }, isInline: function() {
        return this.inlineStack.length }, popStack: function(H) {
        var J = this.isInline(),
          I = (J ? this.inlineStack : this.compileStack).pop();
        if (!H && (I instanceof u)) {
          return I.value } else {
          if (!J) {
            if (!this.stackSlot) {
              throw new y("Invalid stack pop") }
            this.stackSlot-- }
          return I } }, topStack: function() {
        var H = (this.isInline() ? this.inlineStack : this.compileStack),
          I = H[H.length - 1];
        if (I instanceof u) {
          return I.value } else {
          return I } }, contextName: function(H) {
        if (this.useDepths && H) {
          return "depths[" + H + "]" } else {
          return "depth" + H } }, quotedString: function(H) {
        return this.source.quotedString(H) }, objectLiteral: function(H) {
        return this.source.objectLiteral(H) }, aliasable: function(I) {
        var H = this.aliases[I];
        if (H) { H.referenceCount++;
          return H }
        H = this.aliases[I] = this.source.wrap(I);
        H.aliasable = true;
        H.referenceCount = 1;
        return H }, setupHelper: function(L, J, I) {
        var K = [],
          M = this.setupHelperArgs(J, L, K, I);
        var H = this.nameLookup("helpers", J, "helper");
        return { params: K, paramsInit: M, name: H, callParams: [this.contextName(0)].concat(K) } }, setupParams: function(I, M, K) {
        var R = {},
          P = [],
          Q = [],
          H = [],
          J;
        R.name = this.quotedString(I);
        R.hash = this.popStack();
        if (this.trackIds) { R.hashIds = this.popStack() }
        if (this.stringParams) { R.hashTypes = this.popStack();
          R.hashContexts = this.popStack() }
        var L = this.popStack(),
          O = this.popStack();
        if (O || L) { R.fn = O || "this.noop";
          R.inverse = L || "this.noop" }
        var N = M;
        while (N--) { J = this.popStack();
          K[N] = J;
          if (this.trackIds) { H[N] = this.popStack() }
          if (this.stringParams) { Q[N] = this.popStack();
            P[N] = this.popStack() } }
        if (this.trackIds) { R.ids = this.source.generateArray(H) }
        if (this.stringParams) { R.types = this.source.generateArray(Q);
          R.contexts = this.source.generateArray(P) }
        if (this.options.data) { R.data = "data" }
        if (this.useBlockParams) { R.blockParams = "blockParams" }
        return R }, setupHelperArgs: function(J, L, K, I) {
        var H = this.setupParams(J, L, K, true);
        H = this.objectLiteral(H);
        if (I) { this.useRegister("options");
          K.push("options");
          return ["options=", H] } else { K.push(H);
          return "" } } };
    var s = ("break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false").split(" ");
    var C = G.RESERVED_WORDS = {};
    for (var z = 0, v = s.length; z < v; z++) { C[s[z]] = true }
    G.isValidJavaScriptVariableName = function(H) {
      return !G.RESERVED_WORDS[H] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(H) };

    function t(N, L, M, K) {
      var I = L.popStack();
      var J = 0,
        H = M.length;
      if (N) { H-- }
      for (; J < H; J++) { I = L.nameLookup(I, M[J], K) }
      if (N) {
        return [L.aliasable("this.strict"), "(", I, ", ", L.quotedString(M[J]), ")"] } else {
        return I } }
    D = G;
    return D })(k, a, n, g);
  var c = (function(z, q, A, t, E) {
    var s;
    var u = z;
    var x = q;
    var r = A.parser;
    var C = A.parse;
    var B = t.Compiler;
    var v = t.compile;
    var H = t.precompile;
    var w = E;
    var G = u.create;
    var y = function() {
      var I = G();
      I.compile = function(J, K) {
        return v(J, K, I) };
      I.precompile = function(J, K) {
        return H(J, K, I) };
      I.AST = x;
      I.Compiler = B;
      I.JavaScriptCompiler = w;
      I.Parser = r;
      I.parse = C;
      return I };
    u = y();
    u.create = y;
    var D = typeof global !== "undefined" ? global : window,
      F = D.Handlebars;
    u.noConflict = function() {
      if (D.Handlebars === u) { D.Handlebars = F } };
    u["default"] = u;
    s = u;
    return s })(h, l, o, p, d);
  return c }));

// Generated by LiveScript 1.3.1
(function(){
  "First take - like a shader, a function is called once for each point. \nThe three values at the top of the stack become r g b.\n\nBuiltins: x y t (time) */+- sqrt exp dup drop\n";
  var isFunc, isNum, writePng, Parser, Canvas, canvas, ctx, render, nums, vocab, R, pick, randomProg, layers, sectioned;
  isFunc = function(it){
    return 'function' === typeof it;
  };
  isNum = function(it){
    return !isNaN(it);
  };
  writePng = function(canvas, fname){
    var fs, out, stream;
    fs = require('fs');
    fname = fname || __dirname + '/images/dupdupdraw.' + new Date().toISOString() + '.png';
    out = fs.createWriteStream(fname);
    stream = canvas.pngStream();
    stream.on('data', function(it){
      return out.write(it);
    });
    return stream.on('end', function(){
      return console.log('saved png to ' + fname);
    });
  };
  Parser = (function(){
    Parser.displayName = 'Parser';
    var prototype = Parser.prototype, constructor = Parser;
    function Parser(x, y, t){
      var this$ = this instanceof ctor$ ? this : new ctor$;
      this$.x = x != null ? x : 0;
      this$.y = y != null ? y : 0;
      this$.t = t != null ? t : 0;
      this$.parse = bind$(this$, 'parse', prototype);
      this$.rgba = bind$(this$, 'rgba', prototype);
      this$.rgb = bind$(this$, 'rgb', prototype);
      this$.e = bind$(this$, 'e', prototype);
      this$.r = bind$(this$, 'r', prototype);
      this$.ish = bind$(this$, 'ish', prototype);
      this$.sinh = bind$(this$, 'sinh', prototype);
      this$.sin = bind$(this$, 'sin', prototype);
      this$.yg = bind$(this$, 'yg', prototype);
      this$.yl = bind$(this$, 'yl', prototype);
      this$.xg = bind$(this$, 'xg', prototype);
      this$.xl = bind$(this$, 'xl', prototype);
      this$.max = bind$(this$, 'max', prototype);
      this$.dist = bind$(this$, 'dist', prototype);
      this$.less = bind$(this$, 'less', prototype);
      this$.greater = bind$(this$, 'greater', prototype);
      this$.swap = bind$(this$, 'swap', prototype);
      this$.exp = bind$(this$, 'exp', prototype);
      this$.mod = bind$(this$, 'mod', prototype);
      this$.equal = bind$(this$, 'equal', prototype);
      this$.floordiv = bind$(this$, 'floordiv', prototype);
      this$.div = bind$(this$, 'div', prototype);
      this$.mult = bind$(this$, 'mult', prototype);
      this$.minus = bind$(this$, 'minus', prototype);
      this$.plus = bind$(this$, 'plus', prototype);
      this$.sqrt = bind$(this$, 'sqrt', prototype);
      this$.dot = bind$(this$, 'dot', prototype);
      this$.dup = bind$(this$, 'dup', prototype);
      this$.pop = bind$(this$, 'pop', prototype);
      this$.push = bind$(this$, 'push', prototype);
      this$.l = bind$(this$, 'l', prototype);
      this$.s = [];
      this$.mapping = {
        "+": 'plus',
        "-": 'minus',
        "*": 'mult',
        "/": 'div',
        "//": 'floordiv',
        "=": 'equal',
        "%": 'mod',
        "^": 'exp',
        ">": 'greater',
        "&gt;": 'greater',
        "<": 'less',
        "&lt;": 'less',
        "sr": 'sqrt',
        "di": 'dist'
      };
      return this$;
    } function ctor$(){} ctor$.prototype = prototype;
    prototype.l = function(){
      var ref$;
      return (ref$ = this.s)[ref$.length - 1];
    };
    prototype.push = function(it){
      if (isNum(it)) {
        return this.s.push(it);
      } else {
        return this.s.push(0);
      }
    };
    prototype.pop = function(){
      return this.s.pop();
    };
    prototype.dup = function(){
      return this.push(this.l());
    };
    prototype.dot = function(){
      return this.pop();
    };
    prototype.sqrt = function(){
      return this.push(Math.sqrt(this.pop()));
    };
    prototype.plus = function(){
      return this.push(this.pop() + this.pop());
    };
    prototype.minus = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(b - a);
    };
    prototype.mult = function(){
      return this.push(this.pop() * this.pop());
    };
    prototype.div = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(b / a);
    };
    prototype.floordiv = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(~~(b / a));
    };
    prototype.equal = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(~~(b === a));
    };
    prototype.mod = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(b % a);
    };
    prototype.exp = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(Math.pow(b, a));
    };
    prototype.swap = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      this.push(a);
      return this.push(b);
    };
    prototype.greater = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(~~(b > a));
    };
    prototype.less = function(){
      var a, b;
      a = this.pop();
      b = this.pop();
      return this.push(~~(b < a));
    };
    prototype.dist = function(){
      var yy, xx;
      yy = this.pop();
      xx = this.pop();
      return this.push(~~Math.sqrt(Math.pow(this.x - xx, 2) + Math.pow(this.y - yy, 2)));
    };
    prototype.max = function(){
      return this.push(Math.max(this.pop(), this.pop()));
    };
    prototype.xl = function(){
      if (this.x < this.pop()) {
        return 'ok';
      } else {
        this.pop();
        return this.push(0);
      }
    };
    prototype.xg = function(){
      if (this.x > this.pop()) {
        return 'ok';
      } else {
        this.pop();
        return this.push(0);
      }
    };
    prototype.yl = function(){
      if (this.y < this.pop()) {
        return 'ok';
      } else {
        this.pop();
        return this.push(0);
      }
    };
    prototype.yg = function(){
      if (this.y > this.pop()) {
        return 'ok';
      } else {
        this.pop();
        return this.push(0);
      }
    };
    prototype.sin = function(){
      return this.push(~~(256 * Math.sin((this.pop() / 256) * (Math.PI / 2))));
    };
    prototype.sinh = function(){
      var a;
      a = this.pop();
      return this.push((Math.pow(Math.E, a) - Math.pow(Math.E, -a)) / 2);
    };
    prototype.ish = function(){
      var a;
      a = this.pop() / 256;
      return this.push(64 / ((Math.pow(Math.E, a) - Math.pow(Math.E, -a)) / 2));
    };
    prototype.r = function(){
      return this.push(~~(255 * Math.random()));
    };
    prototype.e = function(){
      return this.push(Math.E);
    };
    prototype.rgb = function(){
      var b, g, r;
      b = ~~this.pop() || 0;
      g = ~~this.pop() || 0;
      r = ~~this.pop() || 0;
      return [r, g, b];
    };
    prototype.rgba = function(){
      var a, b, g, r;
      a = this.pop() || 0;
      b = this.pop() || 0;
      g = this.pop() || 0;
      r = this.pop() || 0;
      return [r, g, b, a];
    };
    prototype.parse = function(code){
      var words, i$, len$, word;
      words = code.split(' ');
      for (i$ = 0, len$ = words.length; i$ < len$; ++i$) {
        word = words[i$];
        if (word === '') {
          continue;
        }
        if (this.mapping[word]) {
          word = this.mapping[word];
        }
        if (this[word] || this[word] === 0) {
          if (isFunc(this[word])) {
            this[word]();
          } else {
            this.push(this[word]);
          }
        } else if (isNum(word)) {
          this.push(+word);
        } else {
          this.mapping[word] = ~~(255 * Math.random());
          this.push(this.mapping[word]);
        }
      }
      return this.s;
    };
    return Parser;
  }());
  Parser = Parser;
  Canvas = require('canvas-browserify');
  canvas = new Canvas(512, 512);
  ctx = canvas.getContext('2d');
  render = function(it){
    var p, width, height, i$, xx, lresult$, j$, yy, ref$, r, g, b, results$ = [];
    p = new Parser;
    width = canvas.width;
    height = canvas.height;
    for (i$ = 0; i$ < width; ++i$) {
      xx = i$;
      lresult$ = [];
      for (j$ = 0; j$ < height; ++j$) {
        yy = j$;
        p.x = xx;
        p.y = yy;
        p.parse(it);
        ref$ = p.rgb(), r = ref$[0], g = ref$[1], b = ref$[2];
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        ctx.fillRect(xx, yy, 1, 1);
        lresult$.push(p.s = []);
      }
      results$.push(lresult$);
    }
    return results$;
  };
  nums = ['0', '16', '64', '128', '256', '512', '?'];
  vocab = ['0', '2', '256', 'x', 'y', '+', '-', '*', '%', 'sr', 'di', 'max', '?', '@', 'xg', 'xl', 'yg', 'yl', 'sin'];
  R = function(it){
    return ~~(it * Math.random());
  };
  pick = function(it){
    return it[R(it.length)];
  };
  randomProg = function(cap){
    var prog, i$, ii;
    prog = '';
    for (i$ = 0; i$ < 5; ++i$) {
      ii = i$;
      prog += ' ' + pick(nums);
    }
    while (prog.length < cap) {
      prog += ' ' + pick(vocab);
    }
    console.log(prog);
    return prog;
  };
  layers = function(){
    var i$, ii, results$ = [];
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.2;
    for (i$ = 0; i$ < 5; ++i$) {
      ii = i$;
      results$.push(render(randomProg()));
    }
    return results$;
  };
  sectioned = function(){
    var prog, i$, ii;
    prog = '';
    for (i$ = 0; i$ < 10; ++i$) {
      ii = i$;
      prog += ' ' + pick(nums);
    }
    for (i$ = 0; i$ < 10; ++i$) {
      ii = i$;
      prog += ' ' + pick(vocab);
    }
    prog += '256 x < *';
    for (i$ = 0; i$ < 10; ++i$) {
      ii = i$;
      prog += ' ' + pick(vocab);
    }
    prog += '256 x > *';
    console.log(prog);
    return prog;
  };
  if (process.argv[2] && process.argv[2].length > 0) {
    code = process.argv[2];
  } else {
    code = randomProg(100);
  }
  render(code);
  if (!deepEq$(process.title, 'browser', '===')) {
    writePng(canvas, process.argv[3]);
  } else {
    setTimeout(function(){
      return document.body.appendChild(canvas);
    });
  }
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);

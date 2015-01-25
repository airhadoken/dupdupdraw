// Generated by LiveScript 1.2.0
(function(){
  "First take - like a shader, a function is called once for each point. \nThe three values at the top of the stack become r g b.\n\nBuiltins: x y t (time) */+- sqrt exp dup drop\n";
  var isFunc, isNum, Parser, canvas, ctx, nums, vocab, R, pick;
  isFunc = function(it){
    return 'function' === typeof it;
  };
  isNum = function(it){
    return !isNaN(it);
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
        "%": 'mod',
        "^": 'exp',
        ">": 'greater',
        "<": 'less',
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
        return this.pop() && this.push(0);
      }
    };
    prototype.xg = function(){
      if (this.x > this.pop()) {
        return 'ok';
      } else {
        return this.pop() && this.push(0);
      }
    };
    prototype.yl = function(){
      if (this.y < this.pop()) {
        return 'ok';
      } else {
        return this.pop() && this.push(0);
      }
    };
    prototype.yg = function(){
      if (this.y > this.pop()) {
        return 'ok';
      } else {
        return this.pop() && this.push(0);
      }
    };
    prototype.sin = function(){
      return this.push(~~(256 * Math.sin((this.pop() / 256) * (Math.PI / 2))));
    };
    prototype.rgb = function(){
      var b, g, r;
      b = this.pop() || 0;
      g = this.pop() || 0;
      r = this.pop() || 0;
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
          this.mapping[word] = ~(255 * Math.random());
          this.push(this.mapping[word]);
        }
      }
      return this.s;
    };
    return Parser;
  }());
  window.Parser = Parser;
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  window.render = function(it){
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
  vocab = ['0', '2', '4', '6', '256', '512', 'x', 'y', '+', '-', '*', '/', '%', 'sr', 'di', 'max', '?', '@', 'xg', 'xl', 'sin'];
  R = function(it){
    return ~~(it * Math.random());
  };
  pick = function(it){
    return it[R(it.length)];
  };
  window.randomProg = function(cap){
    var prog, i$, ii;
    prog = '';
    for (i$ = 0; i$ < 10; ++i$) {
      ii = i$;
      prog += ' ' + pick(nums);
    }
    while (prog.length < cap) {
      prog += ' ' + pick(vocab);
    }
    console.log(prog);
    return prog;
  };
  window.layers = function(){
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
  window.sectioned = function(){
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
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);

/* worryshredder engine: the words that come after letting a worry go, the text layout for the paper,
   and a check for worries that need a real person rather than an animation.
   Works in the browser and in Node (for tests). */
(function (root) {
  'use strict';

  var RITUALS = {
    shred: { label: 'Shred it', done: 'Shredded.' },
    burn: { label: 'Burn it', done: 'Burnt to ash.' },
    float: { label: 'Float it away', done: 'Gone with the wind.' }
  };

  // Short, kind, and never a promise that everything will be fine.
  var LINES = [
    "You named it and you set it down. That counts.",
    "Most worries are lighter once they're out of your head.",
    "You've handled hard days before. This one will pass too.",
    "Breathe out slowly. You don't have to solve it tonight.",
    "It's allowed to matter and still not be yours to carry right now.",
    "If it comes back, that's OK. You can let it go again.",
    "One thing at a time. Right now, the thing is a slow breath.",
    "You're doing better than your worries say you are.",
    "Put your shoulders down. Unclench your jaw. There you go.",
    "Some worries need a plan, some need sleep. This one can wait for morning.",
    "Be as kind to yourself as you'd be to a friend with the same worry.",
    "Small steps still move you forward."
  ];

  // Some worries should not just be shredded. These words bring up a gentle note with a helpline.
  var HEAVY = /\b(suicid\w*|kill (my ?self|me)|end (it all|my life)|want to die|wanna die|don'?t want to (live|be alive|exist)|self[- ]?harm\w*|hurt(ing)? myself|cut(ting)? myself|no reason to live|better off dead|better off without me)\b/i;

  function isHeavy(text) { return HEAVY.test(String(text || '')); }

  // A line that changes each time but doesn't repeat the last one.
  function pickLine(count, last) {
    var i = Math.abs(count * 7 + 3) % LINES.length;
    if (LINES[i] === last) i = (i + 1) % LINES.length;
    return LINES[i];
  }

  // Wrap text into lines that fit `maxWidth`, using `measure(str) -> width`.
  // Long words are broken so nothing overflows the paper. At most `maxLines` lines; the last ends with "...".
  function wrap(text, measure, maxWidth, maxLines) {
    var out = [];
    String(text || '').replace(/\r/g, '').split('\n').forEach(function (para) {
      var words = para.split(/\s+/).filter(Boolean);
      var line = '';
      words.forEach(function (w) {
        while (measure(w) > maxWidth && w.length > 1) {
          var cut = w.length - 1;
          while (cut > 1 && measure(w.slice(0, cut)) > maxWidth) cut--;
          if (line) { out.push(line); line = ''; }
          out.push(w.slice(0, cut));
          w = w.slice(cut);
        }
        var test = line ? line + ' ' + w : w;
        if (measure(test) <= maxWidth) line = test;
        else { out.push(line); line = w; }
      });
      if (line) out.push(line);
      else if (!words.length) out.push('');
    });
    while (out.length && out[out.length - 1] === '') out.pop();
    if (maxLines && out.length > maxLines) {
      out = out.slice(0, maxLines);
      out[maxLines - 1] = out[maxLines - 1].replace(/\s*\S{0,3}$/, '') + '...';
    }
    return out;
  }

  var api = { RITUALS: RITUALS, LINES: LINES, isHeavy: isHeavy, pickLine: pickLine, wrap: wrap };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WorryShredder = api;
})(this);

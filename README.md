# worryshredder

Write down what's worrying you, then let it go: shred it, burn it, or float it away on a balloon.
A small ritual for getting a worry out of your head.

Live: https://mridulsaravanan.com/worryshredder/

- Three animations, drawn on a canvas, with a short fade instead when the device asks for reduced motion.
- After each one, a short kind line and a count of worries let go.
- The words are not kept. Only the count is remembered on the device.
- If a worry mentions self-harm or not wanting to live, the reply is gentle and plain and shows the
  Tele-MANAS helpline (14416, India, free, 24 hours) and the emergency number 112.

`engine.js` holds the kind lines, the text wrapping and the check for heavy worries. `index.html` is the page.
Font: Pixelify Sans (SIL Open Font License, `assets/OFL-PixelifySans.txt`).

Testing: 92 engine checks, and 63 browser checks on desktop and a 390 px phone, including a check that the
worry text never reaches storage.

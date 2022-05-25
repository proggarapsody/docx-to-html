# DOCX⇝HTML

This project is easy and fast way to convert your `docx` files to `html`

---

## ❗ Only for Windows because this method use Powershell script ❗

## 🔥 SETUP !!!ONLY ONCE!!!

### Ⅰ Clone this repository in any folder on your PC

### Ⅱ MS Word setup

1. Firstly you should to open `word` - `file` - `setting` - `additional`.
2. Find the `web-document-settings` or something like this.
3. Open the `encoding` point
4. In the bottom input box select unicode. Check mark - always use default encoding should turn off.
5. Exit menu.
6. Exit word document and `approve saving`.

### NodeJS installation

I choose `NodeJS` because i 💚 it. NO MORE REASON...

1. If you not have installed `NODE` on your PC go on [official site](https://nodejs.org/en/)
2. If you install Node - all ready!

# Usage

## 🔥 Add files

Add all files what you want to convert in `docs/` folder

## 🔥 Run script

Run `index.js` script

There are many ways to run script. You can use cmd, terminal inside IDE or other
To run script print in terminal `node <<relative-path-to-script>>`
For examples

```Node
node .\docs\index.js
node .\index.js
```

Or if you are in the same folder with index.js - `src/` folser

```Node
node index.js
```

## ❗ NOTE ❗

1. DONT DELETE file `html/styles.css`!!!
2. if you still deleted this file, and you hate the result - create new styles.css in `html/` folder and paste this code inside:

```CSS
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

img {
  margin-bottom: 20px;
  transition: 0.4s ease-out;
}

img:hover {
  transform: scale(1.06);
  transition: 0.2s ease-out;
}

a {
  all: unset;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
h2 {
  transition: all 0.2s linear;
}
h2:hover {
  display: inline;
  text-decoration: underline;
  transition: all 0.2s linear;
}

.WordSection1 {
  width: 60vw;
  margin: 50px auto;
  min-width: 315px;
}

```

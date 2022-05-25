const path = require('path');
const fs = require('fs/promises');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const docxPath = path.join(__dirname, 'docs');
const sciptPath = path.join(docxPath, 'script.ps1');
const htmlPath = path.resolve(__dirname, 'html');
const regex = /^page-.+$/;

async function deleteDirectories() {
  await fs.readdir(htmlPath).then((files) =>
    files
      .filter((file) => file.match(regex))
      .forEach((file) => {
        fs.rm(path.resolve(htmlPath, file), { recursive: true, force: true });
      })
  );
}

async function createHtml() {
  try {
    await exec(`Powershell.exe -File ${sciptPath}`);
  } catch (error) {}
}

async function editHtml() {
  const styles = `<link rel="stylesheet" href="styles.css"></head>`;

  return await fs
    .readdir(docxPath)
    .then((files) => files.filter((el) => path.extname(el) === '.html'))
    .then((files) => {
      return Promise.all(
        files.map(async (file) => {
          await fs
            .readFile(path.resolve(docxPath, file), { encoding: 'utf-8' })
            .then((text) => {
              return text.replace('</head>', styles);
            })
            .then((newText) => {
              fs.writeFile(path.resolve(docxPath, file), newText, { encoding: null });
            });
        })
      );
    });
}

async function moveHtml() {
  await fs
    .readdir(docxPath)
    .then((res) => res.filter((el) => el.match(regex)))
    .then((res) =>
      res.forEach(async (file) => {
        try {
          await fs.rename(path.resolve(docxPath, file), path.resolve(htmlPath, file));
        } catch (error) {
          if (error.code === 'EXDEV') {
            await fs.copyFile(path.resolve(docxPath, file), path.resolve(htmlPath, file));
            await fs.unlink(path.resolve(docxPath, file));
          } else {
            throw error;
          }
        }
      })
    );
}

deleteDirectories()
  .then(() => createHtml())
  .then(() => editHtml())
  .then(() => moveHtml());

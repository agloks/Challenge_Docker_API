function log(text, path = ".") {
  const time = new Date();
  const fs = require("fs");
  const process = require("process");

  let started = false;
  try { process.chdir(path); } catch(e) { started = true; }

  const day = time.toLocaleString().split("");
  const dayFormated = day.slice(0,9).join("").replace(/\//g,"-");
  
  const stream = fs.createWriteStream(`log-${dayFormated}.txt`, {flags: "a+"});
  stream.once("open", () => {

    if(!started) {
      const FIXED = 
      `
  ------------------------------------------------------------------------------------------------
        ${day.slice(0, day.length).join("")}\n
      `
      stream.write(FIXED);
    }

    stream.write(text);
    stream.end();
  })
}

module.exports = log;
const qs = require("querystring");

module.exports = new class GetList {
  
  constructor() {}

  async parseBodyCallback(req, res, callback) {
    let body = "";
    req.on("data", (data) => {
      body += data;
      if (body.length > 1e6) req.connection.destroy();
    })
    req.on("end", () => {
      body = qs.parse(body);
      callback(req, res , body);
    })
  }
}()
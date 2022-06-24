const jwt = require("jsonwebtoken");

const mid1 = async function (req, res, next) {
  try {
    let token = req.headers["X-Api-Key"];
    if (!token) {
      token = req.headers["x-api-key"];
    }

    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "please fill token field" });
    }

    decodeToken = jwt.verify(token, "functionUpgroupnumber12");

    if (!decodeToken) {
      return res.status().send({ status: false, msg: "Token is not Valid." });
    }

    req.headers.authorId = decodeToken.authorId;

    next();
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

module.exports.mid1 = mid1;
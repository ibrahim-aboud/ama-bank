const crypto = require("crypto");

export default function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password + process.env.PASSWORD_SECRET);
  const hashedPassword = hash.digest("hex");

  return hashedPassword;
}

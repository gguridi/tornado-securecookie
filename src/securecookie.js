const crypto = require("crypto");

const ExpirationDays = 31;

const Now = () => {
  return Math.floor(Date.now() / 1000);
};

const IsExpired = timestamp => {
  return parseInt(timestamp, 10) < Now() - ExpirationDays * 86400;
};

const IsFromFuture = timestamp => {
  return parseInt(timestamp, 10) > Now() + ExpirationDays * 86400;
};

const IsTampered = timestamp => {
  return timestamp.indexOf("0") === 0;
};

const IsEmpty = value => {
  return value == "";
};

const Sign = (secret, ...parts) => {
  let hash = crypto.createHmac("sha1", secret);
  parts.map(part => {
    hash.update(part);
  });
  return hash.digest("hex");
};

const DecodeCookie = (secret, name, signedValue) => {
  let [value, timestamp, signature] = signedValue.split("|");
  if (
    IsEmpty(signedValue) ||
    IsExpired(timestamp) ||
    IsFromFuture(timestamp) ||
    IsTampered(timestamp)
  ) {
    return "";
  }
  if (signature != Sign(secret, name, value, timestamp)) {
    return "";
  }

  return Buffer.from(value, "base64").toString();
};

const SecureCookie = (secret, name, value) => {
  let timestamp = Now().toString();
  let encodedValue = Buffer.from(value).toString("base64");
  let signature = Sign(secret, name, encodedValue, timestamp);
  return [encodedValue, timestamp, signature].join("|");
};

module.exports = {
  SecureCookie,
  DecodeCookie
};

const sc = require("../src/securecookie");

describe("tornado securecookie behaviour", () => {
  const testSecret = "test-secret";
  const testName = "test-cookie-name";
  const testValue = "test-value";

  describe("securing a cookie", () => {
    it("applies a encoding + signature", () => {
      const signedValue = sc.SecureCookie(testSecret, testName, testValue);
      expect(signedValue).toMatch(/\w*\|\d{16}|\w*/);
    });
  });

  describe("decoding a secure cookie", () => {
    let realDateNow;
    beforeEach(() => {
      realDateNow = Date.now.bind(global.Date);
    });

    var getSecureValueWithTime = days => {
      global.Date.now = jest.fn(() => realDateNow + days * 86400 * 1000);
      const signedValue = sc.SecureCookie(testSecret, testName, testValue);
      global.Date.now = realDateNow;
      return signedValue;
    };

    it("returns empty if the value is empty", () => {
      expect(sc.DecodeCookie(testSecret, "", "")).toBe("");
    });

    it("returns empty if the timestamp is expired (31 days old)", () => {
      const signedValue = getSecureValueWithTime(-32);
      expect(sc.DecodeCookie(testSecret, "", signedValue)).toBe("");
    });

    it("returns empty if the timestamp is in the future", () => {
      const signedValue = getSecureValueWithTime(32);
      expect(sc.DecodeCookie(testSecret, "", signedValue)).toBe("");
    });

    it("returns empty if the cookie name doesn't match", () => {
      const signedValue = sc.SecureCookie(testSecret, testName, testValue);
      expect(sc.DecodeCookie(testSecret, "unknown", signedValue)).toBe("");
    });

    it("decodes successfully a valid secured cookie", () => {
      const signedValue = sc.SecureCookie(testSecret, testName, testValue);
      const decoded = sc.DecodeCookie(testSecret, testName, signedValue);
      expect(decoded).toBe(testValue);
    });
  });
});

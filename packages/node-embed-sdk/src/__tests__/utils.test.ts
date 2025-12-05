import {
  PBKDF2_HMAC_SHA256_KEY_DERIVATION,
  AES_256_GCM_ENCRYPTION,
  asEncodedPassphraseEncryptionOutput,
} from "../encryption_utils";

describe("oauth token encryption", () => {
  function toEncodedString(
    salt: string,
    iv: string,
    tag: string,
    ciphertext: string,
  ): string {
    return `${salt}.${iv}.${tag}.${ciphertext}`;
  }

  it("only throws error when reading an incorrectly encoded string", () => {
    // Throws for invalid format.
    expect(() => {
      asEncodedPassphraseEncryptionOutput("hello, world!");
    }).toThrow();

    // Throws for valid format, but with non-base64 components.
    expect(() => {
      asEncodedPassphraseEncryptionOutput(
        toEncodedString("(salt)", "(iv)", "(tag)", "(ciphertext)"),
      );
    }).toThrow();

    // Throws for valid format with base64 components of invalid length.
    expect(() => {
      asEncodedPassphraseEncryptionOutput(
        toEncodedString("YQ==", "Yg==", "Yw==", "ZA=="),
      );
    }).toThrow();

    // Does not throw for valid format with base64 components of valid length.
    const salt = Buffer.from(
      "s".repeat(PBKDF2_HMAC_SHA256_KEY_DERIVATION.SALT_LENGTH_BYTES),
    ).toString("base64");
    const iv = Buffer.from(
      "i".repeat(AES_256_GCM_ENCRYPTION.IV_LENGTH_BYTES),
    ).toString("base64");
    const tag = Buffer.from(
      "t".repeat(AES_256_GCM_ENCRYPTION.TAG_LENGTH_BYTES),
    ).toString("base64");
    const ciphertext = Buffer.from(
      "c".repeat(10 /* arbitrary length */),
    ).toString("base64");
    expect(() => {
      asEncodedPassphraseEncryptionOutput(
        toEncodedString(salt, iv, tag, ciphertext),
      );
    }).not.toThrow();
  });
});

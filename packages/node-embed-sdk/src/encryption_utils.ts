import crypto from "node:crypto";

export function encodeEncryptionOutput(
  encryptionOutput: PassphraseEncryptionOutput_t,
): EncodedPassphraseEncryptionOutput_t {
  return asEncodedPassphraseEncryptionOutput(
    encodeEncryptedToken(
      encryptionOutput.salt,
      encryptionOutput.iv,
      encryptionOutput.tag,
      encryptionOutput.ciphertext,
    ),
  );
}

export function decodeEncryptionOutput(
  encodedOutput: EncodedPassphraseEncryptionOutput_t,
): PassphraseEncryptionOutput_t {
  return asPassphraseEncryptionOutput(decodeEncryptedToken(encodedOutput));
} /*
 * Encoding and Decoding Functions
 */

export function encodeEncryptedToken(
  salt: Salt_t,
  iv: IV_t,
  tag: Tag_t,
  ciphertext: Ciphertext_t,
): string {
  const encodedSalt = salt.toString("base64");
  const encodedIV = iv.toString("base64");
  const encodedTag = tag.toString("base64");
  const encodedCiphertext = ciphertext.toString("base64");
  return `${encodedSalt}.${encodedIV}.${encodedTag}.${encodedCiphertext}`;
}

export function decodeEncryptedToken(
  encodedToken: EncodedPassphraseEncryptionOutput_t,
): PassphraseEncryptionOutput_t {
  const parts = encodedToken.split(".");
  if (parts.length !== 4) {
    throw new Error("Expected 4 components in encoded token.");
  }
  const [encodedSalt, encodedIV, encodedTag, encodedCiphertext] = parts;
  const salt = asSalt(Buffer.from(encodedSalt, "base64"));
  const iv = asIV(Buffer.from(encodedIV, "base64"));
  const tag = asTag(Buffer.from(encodedTag, "base64"));
  const ciphertext = asCiphertext(Buffer.from(encodedCiphertext, "base64"));
  return { salt, iv, tag, ciphertext };
}
export function encryptWithKey(
  key: SymmetricKey_t,
  plaintext: Plaintext_t,
): KeyEncryptionOutput_t {
  const iv = generateIV();
  const cipher = crypto.createCipheriv(
    AES_256_GCM_ENCRYPTION.ALGORITHM,
    key,
    iv,
    {
      authTagLength: AES_256_GCM_ENCRYPTION.TAG_LENGTH_BYTES,
    },
  );
  const ciphertext = asCiphertext(
    Buffer.concat([cipher.update(plaintext), cipher.final()]),
  );
  const tag = asTag(cipher.getAuthTag());
  return {
    tag,
    iv,
    ciphertext,
  };
}

export function decryptWithKey(
  key: SymmetricKey_t,
  iv: IV_t,
  tag: Tag_t,
  ciphertext: Ciphertext_t,
): KeyDecryptionOutput_t {
  const decipher = crypto.createDecipheriv(
    AES_256_GCM_ENCRYPTION.ALGORITHM,
    key,
    iv,
    {
      authTagLength: tag.length,
    },
  );
  decipher.setAuthTag(tag);
  const plaintext = asPlaintext(
    Buffer.concat([decipher.update(ciphertext), decipher.final()]),
  );
  return { plaintext };
} /*
 * Type Conversion Functions
 */

export function asPassphrase(value: unknown): Passphrase_t {
  if (!isPassphrase(value)) {
    throw new Error("Invalid passphrase.");
  }
  return value;
}

export function asSalt(value: unknown): Salt_t {
  if (!isSalt(value)) {
    throw new Error("Invalid salt.");
  }
  return value;
}

export function asTag(value: unknown): Tag_t {
  if (!isTag(value)) {
    throw new Error("Invalid tag.");
  }
  return value;
}

export function asIV(value: unknown): IV_t {
  if (!isIV(value)) {
    throw new Error("Invalid IV.");
  }
  return value;
}

export function asCiphertext(value: unknown): Ciphertext_t {
  if (!isCiphertext(value)) {
    throw new Error("Invalid ciphertext.");
  }
  return value;
}

export function asPlaintext(value: unknown): Plaintext_t {
  if (!isPlaintext(value)) {
    throw new Error("Invalid plaintext.");
  }
  return value;
}

export function asSymmetricKey(value: unknown): SymmetricKey_t {
  if (!isSymmetricKey(value)) {
    throw new Error("Invalid symmetric key.");
  }
  return value;
}

export function asPassphraseEncryptionOutput(
  value: unknown,
): PassphraseEncryptionOutput_t {
  if (!isPassphraseEncryptionOutput(value)) {
    throw new Error("Invalid encryption output.");
  }
  return value;
}
/**
 * Validates and brands a given value as a properly-encoded encryption output.
 *
 * @param value the value to validate and brand
 * @returns the branded value
 */

export function asEncodedPassphraseEncryptionOutput(
  value: unknown,
): EncodedPassphraseEncryptionOutput_t {
  if (!isEncodedPassphraseEncryptionOutput(value)) {
    throw new Error("Invalid encoded encryption output.");
  }
  return value;
}
/*
 * Utility Functions for Generating Cryptographic Values
 */

export function generateIV(): IV_t {
  return asIV(crypto.randomBytes(AES_256_GCM_ENCRYPTION.IV_LENGTH_BYTES));
}

export function generateSalt(): Salt_t {
  return asSalt(
    crypto.randomBytes(PBKDF2_HMAC_SHA256_KEY_DERIVATION.SALT_LENGTH_BYTES),
  );
} /*
 * Configuration Constants
 */
/**
 * Constants for PBKDF2-HMAC-SHA256 key derivation.
 *
 * We are using PBKDF2 with SHA-256, 600000 iterations, and a 128-bit salt in accordance with
 * {@link https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf NIST}
 * and
 * {@link https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2 OWASP}
 * recommendations.
 *
 * The key length is 256 bits since we are using AES-256-GCM.
 */

export const PBKDF2_HMAC_SHA256_KEY_DERIVATION = {
  DIGEST: "sha256",
  ITERATIONS: 600000,
  KEY_LENGTH_BYTES: 32, // 256 bits
  SALT_LENGTH_BYTES: 16, // 128 bits
} as const;
/**
 * Constants for AES-256-GCM encryption.
 *
 * We are using a 96-bit IV and a 128-bit tag in accordance with
 * {@link https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf NIST}
 * recommendations.
 */

export const AES_256_GCM_ENCRYPTION = {
  ALGORITHM: "aes-256-gcm",
  IV_LENGTH_BYTES: 12, // 96 bits
  TAG_LENGTH_BYTES: 16, // 128 bits
} as const;
/*
 * Branded Types for Cryptographic Buffers
 */
interface PassphraseBrand {
  readonly Passphrase: unique symbol;
}
export type Passphrase_t = Buffer & PassphraseBrand;
interface SaltBrand {
  readonly Salt: unique symbol;
}
export type Salt_t = Buffer & SaltBrand;
interface TagBrand {
  readonly Tag: unique symbol;
}
export type Tag_t = Buffer & TagBrand;
interface IVBrand {
  readonly IV: unique symbol;
}
export type IV_t = Buffer & IVBrand;
interface CiphertextBrand {
  readonly Ciphertext: unique symbol;
}
export type Ciphertext_t = Buffer & CiphertextBrand;
interface PlaintextBrand {
  readonly Plaintext: unique symbol;
}
export type Plaintext_t = Buffer & PlaintextBrand;
interface SymmetricKeyBrand {
  readonly SymmetricKey: unique symbol;
}
export type SymmetricKey_t = Buffer & SymmetricKeyBrand;
/*
 * Interface Definitions for Cryptographic Operations
 */

export interface KeyDerivationOutput_t {
  key: SymmetricKey_t;
}

export interface KeyEncryptionOutput_t {
  tag: Tag_t;
  iv: IV_t;
  ciphertext: Ciphertext_t;
}

export interface KeyDecryptionOutput_t {
  plaintext: Plaintext_t;
}

export type PassphraseEncryptionOutput_t = KeyEncryptionOutput_t & {
  salt: Salt_t;
};

export type PassphraseDecryptionOutput_t = KeyDecryptionOutput_t;
interface EncodedPassphraseEncryptionOutputBrand {
  readonly EncodedPassphraseEncryptionOutput: unique symbol;
}

export type EncodedPassphraseEncryptionOutput_t = string &
  EncodedPassphraseEncryptionOutputBrand;
/*
 * Type Validation Functions
 */

export function isPassphrase(value: unknown): value is Passphrase_t {
  if (!Buffer.isBuffer(value)) return false;
  // The passphrase can be any length, so we don't have anything else to check.
  return true;
}

export function isSalt(value: unknown): value is Salt_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== PBKDF2_HMAC_SHA256_KEY_DERIVATION.SALT_LENGTH_BYTES)
    return false;
  return true;
}

export function isTag(value: unknown): value is Tag_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== AES_256_GCM_ENCRYPTION.TAG_LENGTH_BYTES) return false;
  return true;
}

export function isIV(value: unknown): value is IV_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== AES_256_GCM_ENCRYPTION.IV_LENGTH_BYTES) return false;
  return true;
}

export function isCiphertext(value: unknown): value is Ciphertext_t {
  if (!Buffer.isBuffer(value)) return false;
  // The ciphertext can be any length, so we don't have anything else to check.
  return true;
}

export function isPlaintext(value: unknown): value is Plaintext_t {
  if (!Buffer.isBuffer(value)) return false;
  // The plaintext can be any length, so we don't have anything else to check.
  return true;
}

export function isSymmetricKey(value: unknown): value is SymmetricKey_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== PBKDF2_HMAC_SHA256_KEY_DERIVATION.KEY_LENGTH_BYTES)
    return false;
  return true;
}

export function isPassphraseEncryptionOutput(
  value: unknown,
): value is PassphraseEncryptionOutput_t {
  // The input should be a non-null object
  if (!(value && typeof value === "object")) return false;
  // The object should have these properties
  if (!("salt" in value)) return false;
  if (!("iv" in value)) return false;
  if (!("tag" in value)) return false;
  if (!("ciphertext" in value)) return false;
  // The properties should be the correct type
  if (!isSalt(value.salt)) return false;
  if (!isIV(value.iv)) return false;
  if (!isTag(value.tag)) return false;
  if (!isCiphertext(value.ciphertext)) return false;
  return true;
}

export function isEncodedPassphraseEncryptionOutput(
  value: unknown,
): value is EncodedPassphraseEncryptionOutput_t {
  if (typeof value !== "string") return false;
  const parts = value.split(".");
  if (parts.length !== 4) return false;
  const [salt, iv, tag, ciphertext] = parts;
  if (!isSalt(Buffer.from(salt, "base64"))) return false;
  if (!isIV(Buffer.from(iv, "base64"))) return false;
  if (!isTag(Buffer.from(tag, "base64"))) return false;
  if (!isCiphertext(Buffer.from(ciphertext, "base64"))) return false;
  return true;
}

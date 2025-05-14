import crypto from 'node:crypto';

/*
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
const PBKDF2_HMAC_SHA256_KEY_DERIVATION = {
  DIGEST: 'sha256',
  ITERATIONS: 600_000,
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
const AES_256_GCM_ENCRYPTION = {
  ALGORITHM: 'aes-256-gcm',
  IV_LENGTH_BYTES: 12, // 96 bits
  TAG_LENGTH_BYTES: 16, // 128 bits
} as const;

/*
 * Branded Types for Cryptographic Buffers
 */

interface PassphraseBrand {
  readonly Passphrase: unique symbol;
}
type Passphrase_t = Buffer & PassphraseBrand;

interface SaltBrand {
  readonly Salt: unique symbol;
}
type Salt_t = Buffer & SaltBrand;

interface TagBrand {
  readonly Tag: unique symbol;
}
type Tag_t = Buffer & TagBrand;

interface IVBrand {
  readonly IV: unique symbol;
}
type IV_t = Buffer & IVBrand;

interface CiphertextBrand {
  readonly Ciphertext: unique symbol;
}
type Ciphertext_t = Buffer & CiphertextBrand;

interface PlaintextBrand {
  readonly Plaintext: unique symbol;
}
type Plaintext_t = Buffer & PlaintextBrand;

interface SymmetricKeyBrand {
  readonly SymmetricKey: unique symbol;
}
type SymmetricKey_t = Buffer & SymmetricKeyBrand;

/*
 * Interface Definitions for Cryptographic Operations
 */

interface KeyDerivationOutput_t {
  key: SymmetricKey_t;
}

interface KeyEncryptionOutput_t {
  tag: Tag_t;
  iv: IV_t;
  ciphertext: Ciphertext_t;
}

interface KeyDecryptionOutput_t {
  plaintext: Plaintext_t;
}

type PassphraseEncryptionOutput_t = KeyEncryptionOutput_t & {
  salt: Salt_t;
};

type PassphraseDecryptionOutput_t = KeyDecryptionOutput_t;

interface EncodedPassphraseEncryptionOutputBrand {
  readonly EncodedPassphraseEncryptionOutput: unique symbol;
}

type EncodedPassphraseEncryptionOutput_t = string &
  EncodedPassphraseEncryptionOutputBrand;

/*
 * Type Validation Functions
 */

function isPassphrase(value: unknown): value is Passphrase_t {
  if (!Buffer.isBuffer(value)) return false;
  // The passphrase can be any length, so we don't have anything else to check.
  return true;
}

function isSalt(value: unknown): value is Salt_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== PBKDF2_HMAC_SHA256_KEY_DERIVATION.SALT_LENGTH_BYTES)
    return false;
  return true;
}

function isTag(value: unknown): value is Tag_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== AES_256_GCM_ENCRYPTION.TAG_LENGTH_BYTES) return false;
  return true;
}

function isIV(value: unknown): value is IV_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== AES_256_GCM_ENCRYPTION.IV_LENGTH_BYTES) return false;
  return true;
}

function isCiphertext(value: unknown): value is Ciphertext_t {
  if (!Buffer.isBuffer(value)) return false;
  // The ciphertext can be any length, so we don't have anything else to check.
  return true;
}

function isPlaintext(value: unknown): value is Plaintext_t {
  if (!Buffer.isBuffer(value)) return false;
  // The plaintext can be any length, so we don't have anything else to check.
  return true;
}

function isSymmetricKey(value: unknown): value is SymmetricKey_t {
  if (!Buffer.isBuffer(value)) return false;
  if (value.length !== PBKDF2_HMAC_SHA256_KEY_DERIVATION.KEY_LENGTH_BYTES)
    return false;
  return true;
}

function isPassphraseEncryptionOutput(
  value: unknown,
): value is PassphraseEncryptionOutput_t {
  // The input should be a non-null object
  if (!(value && typeof value === 'object')) return false;
  // The object should have these properties
  if (!('salt' in value)) return false;
  if (!('iv' in value)) return false;
  if (!('tag' in value)) return false;
  if (!('ciphertext' in value)) return false;
  // The properties should be the correct type
  if (!isSalt(value.salt)) return false;
  if (!isIV(value.iv)) return false;
  if (!isTag(value.tag)) return false;
  if (!isCiphertext(value.ciphertext)) return false;
  return true;
}

function isEncodedPassphraseEncryptionOutput(
  value: unknown,
): value is EncodedPassphraseEncryptionOutput_t {
  if (typeof value !== 'string') return false;
  const parts = value.split('.');
  if (parts.length !== 4) return false;
  const [salt, iv, tag, ciphertext] = parts;
  if (!isSalt(Buffer.from(salt, 'base64'))) return false;
  if (!isIV(Buffer.from(iv, 'base64'))) return false;
  if (!isTag(Buffer.from(tag, 'base64'))) return false;
  if (!isCiphertext(Buffer.from(ciphertext, 'base64'))) return false;
  return true;
}

/*
 * Type Conversion Functions
 */

function asPassphrase(value: unknown): Passphrase_t {
  if (!isPassphrase(value)) {
    throw new Error('Invalid passphrase.');
  }
  return value;
}

function asSalt(value: unknown): Salt_t {
  if (!isSalt(value)) {
    throw new Error('Invalid salt.');
  }
  return value;
}

function asTag(value: unknown): Tag_t {
  if (!isTag(value)) {
    throw new Error('Invalid tag.');
  }
  return value;
}

function asIV(value: unknown): IV_t {
  if (!isIV(value)) {
    throw new Error('Invalid IV.');
  }
  return value;
}

function asCiphertext(value: unknown): Ciphertext_t {
  if (!isCiphertext(value)) {
    throw new Error('Invalid ciphertext.');
  }
  return value;
}

function asPlaintext(value: unknown): Plaintext_t {
  if (!isPlaintext(value)) {
    throw new Error('Invalid plaintext.');
  }
  return value;
}

function asSymmetricKey(value: unknown): SymmetricKey_t {
  if (!isSymmetricKey(value)) {
    throw new Error('Invalid symmetric key.');
  }
  return value;
}

function asPassphraseEncryptionOutput(
  value: unknown,
): PassphraseEncryptionOutput_t {
  if (!isPassphraseEncryptionOutput(value)) {
    throw new Error('Invalid encryption output.');
  }
  return value;
}

/**
 * Validates and brands a given value as a properly-encoded encryption output.
 *
 * @param value the value to validate and brand
 * @returns the branded value
 */
function asEncodedPassphraseEncryptionOutput(
  value: unknown,
): EncodedPassphraseEncryptionOutput_t {
  if (!isEncodedPassphraseEncryptionOutput(value)) {
    throw new Error('Invalid encoded encryption output.');
  }
  return value;
}

/*
 * Utility Functions for Generating Cryptographic Values
 */

function generateIV(): IV_t {
  return asIV(crypto.randomBytes(AES_256_GCM_ENCRYPTION.IV_LENGTH_BYTES));
}

function generateSalt(): Salt_t {
  return asSalt(
    crypto.randomBytes(PBKDF2_HMAC_SHA256_KEY_DERIVATION.SALT_LENGTH_BYTES),
  );
}

/*
 * Core Cryptographic Functions
 */

function deriveKeyFromPassphrase(
  passphrase: Passphrase_t,
  salt: Salt_t,
): KeyDerivationOutput_t {
  return {
    key: asSymmetricKey(
      crypto.pbkdf2Sync(
        passphrase,
        salt,
        PBKDF2_HMAC_SHA256_KEY_DERIVATION.ITERATIONS,
        PBKDF2_HMAC_SHA256_KEY_DERIVATION.KEY_LENGTH_BYTES,
        PBKDF2_HMAC_SHA256_KEY_DERIVATION.DIGEST,
      ),
    ),
  };
}

function encryptWithKey(
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

function decryptWithKey(
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
}

function encryptWithPassphrase(
  passphrase: Passphrase_t,
  plaintext: Plaintext_t,
): PassphraseEncryptionOutput_t {
  const salt = generateSalt();
  const { key } = deriveKeyFromPassphrase(passphrase, salt);
  const { tag, iv, ciphertext } = encryptWithKey(key, plaintext);
  return { salt, iv, tag, ciphertext };
}

function decryptWithPassphrase(
  passphrase: Passphrase_t,
  salt: Salt_t,
  iv: IV_t,
  tag: Tag_t,
  ciphertext: Ciphertext_t,
): PassphraseDecryptionOutput_t {
  const { key } = deriveKeyFromPassphrase(passphrase, salt);
  return decryptWithKey(key, iv, tag, ciphertext);
}

/*
 * Encoding and Decoding Functions
 */

function encodeEncryptedToken(
  salt: Salt_t,
  iv: IV_t,
  tag: Tag_t,
  ciphertext: Ciphertext_t,
): string {
  const encodedSalt = salt.toString('base64');
  const encodedIV = iv.toString('base64');
  const encodedTag = tag.toString('base64');
  const encodedCiphertext = ciphertext.toString('base64');
  return `${encodedSalt}.${encodedIV}.${encodedTag}.${encodedCiphertext}`;
}

function decodeEncryptedToken(
  encodedToken: EncodedPassphraseEncryptionOutput_t,
): PassphraseEncryptionOutput_t {
  const parts = encodedToken.split('.');
  if (parts.length !== 4) {
    throw new Error('Expected 4 components in encoded token.');
  }
  const [encodedSalt, encodedIV, encodedTag, encodedCiphertext] = parts;
  const salt = asSalt(Buffer.from(encodedSalt, 'base64'));
  const iv = asIV(Buffer.from(encodedIV, 'base64'));
  const tag = asTag(Buffer.from(encodedTag, 'base64'));
  const ciphertext = asCiphertext(Buffer.from(encodedCiphertext, 'base64'));
  return { salt, iv, tag, ciphertext };
}

function encodeEncryptionOutput(
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

function decodeEncryptionOutput(
  encodedOutput: EncodedPassphraseEncryptionOutput_t,
): PassphraseEncryptionOutput_t {
  return asPassphraseEncryptionOutput(decodeEncryptedToken(encodedOutput));
}

/*
 * API for encrypting and decrypting OAuth tokens
 */

/**
 * Encrypt the OAuth token using the embed secret.
 *
 * @param param0
 * @param param0.embedSecret the embed secret to use for encryption
 * @param param0.oauthToken the OAuth token to encrypt
 * @returns the encrypted token, encoded as a string
 */
export function encrypt({
  embedSecret,
  oauthToken,
}: {
  embedSecret: string;
  oauthToken: string;
}): string {
  const passphrase = asPassphrase(Buffer.from(embedSecret, 'utf8'));
  const plaintext = asPlaintext(Buffer.from(oauthToken, 'utf8'));
  const encryptionOutput = encryptWithPassphrase(passphrase, plaintext);
  return encodeEncryptionOutput(encryptionOutput);
}

/**
 * Decrypt the OAuth token using the embed secret.
 *
 * @param param0
 * @param param0.embedSecret the embed secret to use for decryption
 * @param param0.encryptedToken the encrypted OAuth token to decrypt
 * @returns the decrypted token
 */
export function decrypt({
  embedSecret,
  encryptedToken,
}: {
  embedSecret: string;
  encryptedToken: string;
}): string {
  const passphrase = asPassphrase(Buffer.from(embedSecret, 'utf8'));
  const encryptionOutput = decodeEncryptionOutput(
    asEncodedPassphraseEncryptionOutput(encryptedToken),
  );
  const { plaintext } = decryptWithPassphrase(
    passphrase,
    encryptionOutput.salt,
    encryptionOutput.iv,
    encryptionOutput.tag,
    encryptionOutput.ciphertext,
  );
  return plaintext.toString('utf8');
}

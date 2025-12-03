import crypto from "node:crypto";
import {
  encodeEncryptionOutput,
  decodeEncryptionOutput,
  decryptWithKey,
  encryptWithKey,
  asEncodedPassphraseEncryptionOutput,
  asPassphrase,
  asPlaintext,
  asSymmetricKey,
  generateSalt,
  Ciphertext_t,
  IV_t,
  KeyDerivationOutput_t,
  Passphrase_t,
  PassphraseDecryptionOutput_t,
  PassphraseEncryptionOutput_t,
  PBKDF2_HMAC_SHA256_KEY_DERIVATION,
  Plaintext_t,
  Salt_t,
  Tag_t,
} from "./encryption_utils";

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
 * API for encrypting and decrypting OAuth tokens
 */

/**
 * Encrypt the OAuth token using the embed secret.
 *
 * @param embedSecret the embed secret to use for encryption
 * @param oauthToken the OAuth token to encrypt
 * @returns the encrypted token, encoded as a string
 */
export function encrypt(embedSecret: string, oauthToken: string): string {
  const passphrase = asPassphrase(Buffer.from(embedSecret, "utf8"));
  const plaintext = asPlaintext(Buffer.from(oauthToken, "utf8"));
  const encryptionOutput = encryptWithPassphrase(passphrase, plaintext);
  return encodeEncryptionOutput(encryptionOutput);
}

/**
 * Decrypt the OAuth token using the embed secret.
 *
 * @param embedSecret the embed secret to use for decryption
 * @param encryptedToken the encrypted OAuth token to decrypt
 * @returns the decrypted token
 */
export function decrypt(embedSecret: string, encryptedToken: string): string {
  const passphrase = asPassphrase(Buffer.from(embedSecret, "utf8"));
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
  return plaintext.toString("utf8");
}

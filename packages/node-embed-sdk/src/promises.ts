import crypto from "node:crypto";
import { promisify } from "node:util";
import {
  Passphrase_t,
  Salt_t,
  KeyDerivationOutput_t,
  PBKDF2_HMAC_SHA256_KEY_DERIVATION,
  Plaintext_t,
  PassphraseEncryptionOutput_t,
  IV_t,
  Tag_t,
  Ciphertext_t,
  PassphraseDecryptionOutput_t,
  asSymmetricKey,
  generateSalt,
  asPassphrase,
  asPlaintext,
  asEncodedPassphraseEncryptionOutput,
  encryptWithKey,
  decryptWithKey,
  encodeEncryptionOutput,
  decodeEncryptionOutput,
} from "./encryption_utils";

const pbkdf2 = promisify(crypto.pbkdf2);

async function deriveKeyFromPassphraseAsync(
  passphrase: Passphrase_t,
  salt: Salt_t,
): Promise<KeyDerivationOutput_t> {
  return {
    key: asSymmetricKey(
      await pbkdf2(
        passphrase,
        salt,
        PBKDF2_HMAC_SHA256_KEY_DERIVATION.ITERATIONS,
        PBKDF2_HMAC_SHA256_KEY_DERIVATION.KEY_LENGTH_BYTES,
        PBKDF2_HMAC_SHA256_KEY_DERIVATION.DIGEST,
      ),
    ),
  };
}

async function encryptWithPassphraseAsync(
  passphrase: Passphrase_t,
  plaintext: Plaintext_t,
): Promise<PassphraseEncryptionOutput_t> {
  const salt = generateSalt();
  const { key } = await deriveKeyFromPassphraseAsync(passphrase, salt);
  const { tag, iv, ciphertext } = encryptWithKey(key, plaintext);
  return { salt, iv, tag, ciphertext };
}

async function decryptWithPassphraseAsync(
  passphrase: Passphrase_t,
  salt: Salt_t,
  iv: IV_t,
  tag: Tag_t,
  ciphertext: Ciphertext_t,
): Promise<PassphraseDecryptionOutput_t> {
  const { key } = await deriveKeyFromPassphraseAsync(passphrase, salt);
  return decryptWithKey(key, iv, tag, ciphertext);
}

export async function encrypt(
  embedSecret: string,
  oauthToken: string,
): Promise<string> {
  const passphrase = asPassphrase(Buffer.from(embedSecret, "utf8"));
  const plaintext = asPlaintext(Buffer.from(oauthToken, "utf8"));
  const encryptionOutput = await encryptWithPassphraseAsync(
    passphrase,
    plaintext,
  );
  return encodeEncryptionOutput(encryptionOutput);
}

export async function decrypt(
  embedSecret: string,
  encryptedToken: string,
): Promise<string> {
  const passphrase = asPassphrase(Buffer.from(embedSecret, "utf8"));
  const encryptionOutput = decodeEncryptionOutput(
    asEncodedPassphraseEncryptionOutput(encryptedToken),
  );
  const { plaintext } = await decryptWithPassphraseAsync(
    passphrase,
    encryptionOutput.salt,
    encryptionOutput.iv,
    encryptionOutput.tag,
    encryptionOutput.ciphertext,
  );
  return plaintext.toString("utf8");
}

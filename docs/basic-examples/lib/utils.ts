/* utils.tx */
/* contains utility functions that facilitate the embedding of Sigma dashboards into a web application by generating signed URLs */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";

/**
 * Merges Tailwind CSS classes conditionally.
 * @param inputs - An array of class values to conditionally merge.
 * @returns A string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an ArrayBuffer to a hex string.
 * - Converts the buffer to a byte array.
 * - Maps each byte to a two-character hex string.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 */
export function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Uses the Web Crypto API to create a SHA256 HMAC hex string.
 * @param key - The key used for signing.
 * @param data - The data to be signed.
 * @returns An object containing the hex string of the HMAC signature.
 */
async function simpleHmac({ key, data }: { key: string; data: string }) {
  const encoder = new TextEncoder();
  const encodedKey = encoder.encode(key);
  const encodedData = encoder.encode(data);

  // Import the key for HMAC signing
  const hmacKey = await crypto.subtle.importKey(
    "raw",
    encodedKey,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );

  // Sign the data using the imported key
  const signature = await crypto.subtle.sign("HMAC", hmacKey, encodedData);

  // Convert the signature to a hex string
  const hex = bufferToHex(signature);

  return { hex };
}

/**
 * Signs a Sigma embed URL with a cryptographic signature.
 * @param dashboard - The base URL of the Sigma dashboard or visualization.
 * @returns A signed URL with appended query parameters.
 */
export async function signEmbedUrl(dashboard: string): Promise<string> {
  const { EMBED_SECRET, EMBED_CLIENT_ID } = process.env;
  if (!EMBED_SECRET || !EMBED_CLIENT_ID) {
    throw new Error("SIGMA_EMBED_SECRET is not set");
  }

  // Sigma Embed Parameters (normally, these are generated programmatically)
  const searchParamsObject = {
    ":mode": "userbacked", // mode for secure embedding
    ":email": "embed-sdk@sigmacomputing.com", // Email associated with the embedded session
    ":external_user_team": "Embed-SDK-Team", // External team associated with the user
    //":external_user_team": "Sales_People", // External team associated from my Sigma instance
    ":account_type": "viewer", // Account type, e.g., viewer or editor
    ":nonce": uuid(), // Unique identifier for the session to prevent replay attacks
    ":time": `${Math.floor(new Date().getTime() / 1000)}`, // Current timestamp in seconds
    ":session_length": "36000", // Session length in seconds (10 hours)
    ":client_id": EMBED_CLIENT_ID, // Client ID for authentication
    ":external_user_id": "123", // External user ID for tracking purposes
  };

  const searchParams = new URLSearchParams(searchParamsObject);

  // Append search parameters to the base dashboard URL
  const urlWithSearchParams = `${dashboard}?${searchParams.toString()}`;

  // Create a cryptographic signature using the embed secret
  const SIGNATURE = await simpleHmac({
    key: EMBED_SECRET,
    data: urlWithSearchParams,
  });

  // Append the signature to the query parameters
  searchParams.append(":signature", SIGNATURE.hex);

  // Construct the final signed URL
  const signedUrl = `${dashboard}?${searchParams.toString()}`;

  return signedUrl;
}
export class CryptographyModule {
  private key: CryptoKey;

  constructor(key: CryptoKey) {
    this.key = key;
  }

  public async encrypt(message: ArrayBuffer): Promise<ArrayBuffer> {
    return await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: window.crypto.getRandomValues(new Uint8Array(12)), // create a random initialization vector
      },
      this.key,
      message
    );
  }

  public async decrypt(encrypted: ArrayBuffer): Promise<ArrayBuffer> {
    return await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: window.crypto.getRandomValues(new Uint8Array(12)), // create a random initialization vector
      },
      this.key,
      encrypted
    );
  }
  public static async importKey(key: string): Promise<CryptoKey> {
    return await window.crypto.subtle.importKey(
      "raw", // the key is a raw string
      new TextEncoder().encode(key), // the key in string format
      {
        name: "AES-GCM",
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] // can be used for both encryption and decryption
    );
  }
}

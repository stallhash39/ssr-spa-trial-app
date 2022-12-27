import { CryptographyModule } from "./cryptography";

const testEncryption = async (message:Uint8Array, keyString:string) => {
  // const message = new TextEncoder().encode("Hello World!");
  // const keyString = "12345678901234567890123456789012"; // 32 bytes

  CryptographyModule.importKey(keyString).then(async (key) => {
    // Create an instance of the CryptographyModule using a user-provided key string
    const cryptographyModule = new CryptographyModule(key);
    // Encrypt the message
    const encrypted:ArrayBuffer = await cryptographyModule.encrypt(message);
    console.log("Encrypted message:", encrypted);
  });
}
const testDecryption = async (encrypted:ArrayBuffer, keyString:string) => {
  // const keyString = "12345678901234567890123456789012"; // 32 bytes
  CryptographyModule.importKey(keyString).then(async (key) => {
    // Create an instance of the CryptographyModule using a user-provided key string
    const cryptographyModule = new CryptographyModule(key);
    // Decrypt the message
    const decrypted:ArrayBuffer = await cryptographyModule.decrypt(encrypted);
    console.log("Decrypted message:", new TextDecoder().decode(decrypted));
  });
}

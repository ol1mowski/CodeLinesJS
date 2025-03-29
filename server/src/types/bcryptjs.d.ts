declare module 'bcryptjs' {
  /**
   * Synchronously generates a hash for the given string.
   * @param s The string to hash
   * @param salt The salt length to generate or the salt to use
   */
  export function hashSync(s: string, salt: string | number): string;

  /**
   * Synchronously tests a string against a hash.
   * @param s The string to compare
   * @param hash The hash to test against
   */
  export function compareSync(s: string, hash: string): boolean;

  /**
   * Generates a hash for the given string.
   * @param s The string to hash
   * @param salt The salt length to generate or the salt to use
   * @param callback Callback receiving the error, if any, and the resulting hash
   */
  export function hash(s: string, salt: string | number, callback?: (err: Error, hash: string) => void): Promise<string>;

  /**
   * Tests a string against a hash.
   * @param s The string to compare
   * @param hash The hash to test against
   * @param callback Callback receiving the error, if any, and the result
   */
  export function compare(s: string, hash: string, callback?: (err: Error, success: boolean) => void): Promise<boolean>;

  /**
   * Generates a salt with the specified number of rounds.
   * @param rounds Number of rounds to use (defaults to 10)
   * @param callback Callback receiving the error, if any, and the resulting salt
   */
  export function genSalt(rounds?: number, callback?: (err: Error, salt: string) => void): Promise<string>;

  /**
   * Gets the number of rounds used to encrypt the specified hash.
   * @param hash Hash to extract the used number of rounds from
   */
  export function getRounds(hash: string): number;

  /**
   * Gets the salt portion from a hash.
   * @param hash Hash to extract the salt from
   */
  export function getSalt(hash: string): string;

  /**
   * Default amount of rounds used when generating a salt
   */
  export const ROUNDS_DEFAULT: number;
  
  export default {
    hash,
    hashSync,
    compare,
    compareSync,
    genSalt,
    getRounds,
    getSalt
  };
} 
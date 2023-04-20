import { CreateMomentInput, CreateMomentResponse } from './Types';

/**
 * Provides methods for interacting with a moments API.
 * @interface MomentsApiProvider
 */
export interface MomentsApiProvider {
  /**
   * Retrieves the file URL for uploading a moment to the API.
   * @async
   * @function
   * @name MomentsApiProvider#getSignedUrl
   * @returns {Promise<{ url: string; key: string }>} A Promise that resolves with the file URL and media key from the API.
   */
  getSignedUrl(): Promise<{ url: string; key: string }>;

  /**
   * Creates a new moment on the API.
   * @async
   * @function
   * @name MomentsApiProvider#createMoment
   * @param {CreateMomentInput} input - The input data for creating the moment.
   * @returns {Promise<CreateMomentResponse>} A Promise that resolves with the response from the API.
   */
  createMoment(input: CreateMomentInput): Promise<CreateMomentResponse>;

  /**
   * Upload a file using the signed URL.
   * @async
   * @function
   * @name MomentsApiProvider#uploadFile
   * @param {Buffer} file - The file to be uploaded as a Buffer
   * @param {string} signedUrl - The signed URL for uploading the file
   * @returns {Promise<void>} A Promise that resolves when the file has been uploaded
   */
  uploadFile(file: Buffer, signedUrl: string): Promise<void>;

  /**
   * Wait for the media to finish processing.
   * @async
   * @function
   * @name MomentsApiProvider#waitForMediaProcessing
   * @param {string} mediaKey - The key for the media file
   * @returns {Promise<void>} A Promise that resolves when the media processing is complete
   */
  waitForMediaProcessing(mediaKey: string): Promise<void>;
}

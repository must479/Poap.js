/**
 * Provides a request method for executing GraphQL queries.
 *
 * @interface CompassProvider
 */
export interface CompassProvider {
  /**
   * Executes a GraphQL query with the provided query string and variables.
   *
   * @function
   * @name CompassProvider#request
   * @param {string} query - The query string to execute.
   * @param {null | undefined | { readonly [variable: string]: unknown }} [variables] - The variables to pass with the query.
   * @param {AbortSignal} signal - When given, the request can be aborted with its controller.
   * @returns {Promise<{ data: D }>} A Promise that resolves with the result of the query.
   * @template D - The type of the result's data.
   */
  request<D, V = { readonly [variable: string]: unknown }>(
    query: string,
    variables?: null | undefined | V,
    signal?: AbortSignal,
  ): Promise<{ data: D }>;
}

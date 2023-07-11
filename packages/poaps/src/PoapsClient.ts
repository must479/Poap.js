import { CompassProvider } from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
import { PaginatedPoapsResponse, PAGINATED_POAPS_QUERY } from './queries';
import {
  createBetweenFilter,
  creatEqFilter,
  createInFilter,
  creatUndefinedOrder,
  creatAddressFilter,
} from './queries/utils';
import { FetchPoapsInput } from './types';
import { PaginatedResult, nextCursor } from '@poap-xyz/utils';

/**
 * Represents a client for working with POAP drops.
 *
 * @class DropsClient
 */
export class PoapsClient {
  /**
   * Creates a new DropsClient object.
   *
   * @constructor
   * @param {CompassProvider} CompassProvider - The provider for the POAP compass API.
   */
  constructor(private CompassProvider: CompassProvider) {}

  /**
   * Fetches drops based on the specified input.
   *
   * @async
   * @method
   * @param {FetchPoapsInput} input - The input for fetching drops.
   * @returns {Promise<PaginatedResult<Drop>>} A paginated result of drops.
   */
  async fetch(input: FetchPoapsInput): Promise<PaginatedResult<POAP>> {
    const {
      limit,
      offset,
      chain,
      collector_address,
      minted_date_from,
      minted_date_to,
      ids,
      drop_id,
      sort_field,
      sort_dir,
      filter_by_zero_address = true,
    } = input;

    const variables = {
      limit,
      offset,
      orderBy: creatUndefinedOrder(sort_field, sort_dir),
      where: {
        ...creatAddressFilter(
          'collector_address',
          filter_by_zero_address,
          collector_address,
        ),
        ...creatEqFilter('chain', chain),
        ...creatEqFilter('drop_id', drop_id),
        ...createBetweenFilter('minted_on', minted_date_from, minted_date_to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.CompassProvider.request<PaginatedPoapsResponse>(
      PAGINATED_POAPS_QUERY,
      variables,
    );
    const poaps = data.poaps.map((poap) => {
      const { drop } = poap;
      const minted_on = new Date(0);
      minted_on.setUTCSeconds(poap.minted_on);
      return new POAP({
        ...poap,
        ...drop,
        id: Number(poap.id),
        minted_on,
        drop_id: Number(poap.drop_id),
        start_date: new Date(drop.start_date),
        end_date: new Date(drop.end_date),
      });
    });

    return new PaginatedResult<POAP>(
      poaps,
      nextCursor(poaps.length, limit, offset),
    );
  }
}

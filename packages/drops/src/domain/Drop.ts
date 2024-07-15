import { DropResponse as ProviderDropResponse } from '@poap-xyz/providers';
import { DropResponse } from '../types/DropResponse';

export class Drop {
  id: number;
  fancyId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  locationType: string;
  dropUrl: string;
  imageUrl: string;
  originalImageUrl: string;
  animationUrl: string;
  year: number;
  timezone: string;
  private: boolean;
  startDate: Date;
  createdDate: Date;
  expiryDate: Date;
  endDate: Date;
  poapCount: number;
  transferCount: number;
  emailReservationCount: number;

  public static fromCompass(response: DropResponse): Drop {
    const images: { crop: string; original: string } =
      response.drop_image.gateways.reduce(
        (images, gateway) => ({
          ...images,
          [gateway.type.toLowerCase()]: gateway.url,
        }),
        {
          crop: response.image_url,
          original: response.image_url,
        },
      );

    return new Drop({
      id: Number(response.id),
      fancyId: response.fancy_id,
      name: response.name,
      description: response.description,
      city: response.city,
      country: response.country,
      channel: response.channel,
      platform: response.platform,
      locationType: response.location_type,
      dropUrl: response.drop_url,
      imageUrl: images.crop,
      originalImageUrl: images.original,
      animationUrl: response.animation_url,
      year: Number(response.year),
      startDate: new Date(response.start_date),
      timezone: response.timezone,
      private: response.private,
      createdDate: new Date(response.created_date),
      expiryDate: new Date(response.expiry_date),
      endDate: new Date(response.end_date),
      poapCount: Number(
        response.stats_by_chain_aggregate.aggregate.sum.poap_count,
      ),
      transferCount: Number(
        response.stats_by_chain_aggregate.aggregate.sum.transfer_count,
      ),
      emailReservationCount: Number(response.email_claims_stats?.reserved) || 0,
    });
  }

  public static fromProvider(response: ProviderDropResponse): Drop {
    return new Drop({
      id: response.id,
      fancyId: response.fancy_id,
      name: response.name,
      description: response.description,
      city: response.city,
      country: response.country,
      channel: response.channel,
      platform: response.platform,
      locationType: response.location_type,
      dropUrl: response.event_url,
      imageUrl: response.image_url,
      originalImageUrl: response.image_url,
      animationUrl: response.animation_url,
      year: response.year,
      startDate: new Date(response.start_date),
      timezone: response.timezone,
      private: response.private_event,
      createdDate: new Date(response.created_date),
      expiryDate: new Date(response.expiry_date),
      endDate: new Date(response.end_date),
      transferCount: 0,
      poapCount: 0,
      emailReservationCount: 0,
    });
  }

  // eslint-disable-next-line max-statements
  constructor(properties: DropProperties) {
    this.id = properties.id;
    this.fancyId = properties.fancyId;
    this.name = properties.name;
    this.description = properties.description;
    this.city = properties.city;
    this.country = properties.country;
    this.channel = properties.channel;
    this.platform = properties.platform;
    this.locationType = properties.locationType;
    this.dropUrl = properties.dropUrl;
    this.imageUrl = properties.imageUrl;
    this.originalImageUrl = properties.originalImageUrl;
    this.animationUrl = properties.animationUrl;
    this.year = properties.year;
    this.startDate = properties.startDate;
    this.timezone = properties.timezone;
    this.private = properties.private;
    this.createdDate = properties.createdDate;
    this.poapCount = properties.poapCount;
    this.transferCount = properties.transferCount;
    this.emailReservationCount = properties.emailReservationCount;
    this.expiryDate = properties.expiryDate;
    this.endDate = properties.endDate;
  }

  public getTotalMinted(): number {
    return this.poapCount + this.emailReservationCount;
  }

  public toSerializableObject(): SerializableDrop {
    return {
      id: this.id,
      fancyId: this.fancyId,
      name: this.name,
      description: this.description,
      city: this.city,
      country: this.country,
      channel: this.channel,
      platform: this.platform,
      locationType: this.locationType,
      dropUrl: this.dropUrl,
      imageUrl: this.imageUrl,
      originalImageUrl: this.originalImageUrl,
      animationUrl: this.animationUrl,
      year: this.year,
      timezone: this.timezone,
      private: this.private,
      startDate: this.startDate.toISOString(),
      createdDate: this.createdDate.toISOString(),
      expiryDate: this.expiryDate.toISOString(),
      endDate: this.endDate.toISOString(),
      poapCount: this.poapCount,
      transferCount: this.transferCount,
      emailReservationCount: this.emailReservationCount,
    };
  }
}

interface SerializableDrop {
  id: number;
  fancyId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  locationType: string;
  dropUrl: string;
  imageUrl: string;
  originalImageUrl: string;
  animationUrl: string;
  year: number;
  timezone: string;
  private: boolean;
  startDate: string; // ISO String representation of Date
  createdDate: string; // ISO String representation of Date
  expiryDate: string; // ISO String representation of Date
  endDate: string; // ISO String representation of Date
  poapCount: number;
  transferCount: number;
  emailReservationCount: number;
}

interface DropProperties {
  id: number;
  fancyId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  locationType: string;
  dropUrl: string;
  imageUrl: string;
  originalImageUrl: string;
  animationUrl: string;
  year: number;
  timezone: string;
  private: boolean;
  createdDate: Date;
  startDate: Date;
  expiryDate: Date;
  endDate: Date;
  poapCount: number;
  transferCount: number;
  emailReservationCount: number;
}

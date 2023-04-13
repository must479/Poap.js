/**
 * The input data for creating a drop.
 *
 * @interface CreateDropInput
 */
export interface CreateDropInput {
  name: string;
  description: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  expiry_date: string;
  event_url: string;
  virtual_event: boolean;
  image: Buffer;
  filename: string;
  contentType: string;
  secret_code: string;
  event_template_id?: number | null;
  email: string;
  requested_codes?: number;
  private_event?: boolean;
}

/**
 * The input data for updating a drop.
 *
 * @interface UpdateDropInput
 */
export interface UpdateDropInput {
  name: string;
  description: string;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  expiry_date: string;
  event_url: string;
  virtual_event: boolean;
  private_event?: boolean;
  event_template_id?: number | null;
  secret_code: string;
}

import { MintingStatus } from '@poap-xyz/utils';

export interface GetMintCodeResponse {
  id: number;
  qr_hash: string;
  tx_hash: string;
  event_id: number;
  beneficiary: string;
  user_input: string;
  signer: string;
  claimed: boolean;
  claimed_date: string;
  created_date: string;
  is_active: boolean;
  secret: string;
  event: Drop;
  tx_status: string;
  result: {
    token: number;
  };
}

export interface PostMintCodeResponse {
  id: number;
  qr_hash: string;
  queue_uid: string;
  event_id: number;
  beneficiary: string;
  user_input: string;
  signer: string;
  claimed: boolean;
  claimed_date: string;
  created_date: string;
  is_active: boolean;
  event: Drop;
}

export interface MintStatusResponse {
  uid: number;
  operation: string;
  status: MintingStatus;
  result: {
    tx_hash: string;
    error: string;
  } | null;
}

interface Drop {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  event_url: string;
  image_url: string;
  animation_url: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  from_admin: boolean;
  virtual_event: boolean;
  event_template_id?: number | null;
  private_event: boolean;
}

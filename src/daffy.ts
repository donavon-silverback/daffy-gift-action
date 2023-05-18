import axios from 'axios';
import type { Gift } from './types';

// Learn more at https://docs.daffy.org
const apiBaseUrl = 'https://public.daffy.org/public/api/v1';

type SendGift = {
  /** The name of the user to send the gift to. */
  name: string;
  /** The amount of the gift. */
  amount: number;
  /** The email address of the user to send the gift to. (optional) */
  email?: string;
  /** The message to include with the gift. */
  message: string;
};

export class DaffyClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /** Send a Daffy gift to a user by name. */
  async sendGift(props: SendGift): Promise<Gift> {
    try {
      const response = await axios.post<Gift>(`${apiBaseUrl}/gifts`, props, {
        headers: { 'X-Api-Key': this.apiKey },
      });

      const gift = response.data;
      return gift;
    } catch (exception) {
      const message = exception instanceof Error ? exception.message : 'unknown error';
      throw new Error(`Error sending Daffy gift: ${message}`);
    }
  }
}

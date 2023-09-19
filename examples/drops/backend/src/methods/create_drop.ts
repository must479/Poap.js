import { DropsClient } from '@poap-xyz/drops';
import { CreateDropsInput } from '@poap-xyz/drops/dist/cjs/types';
import fs from 'fs';

const today = new Date();
const oneMonthFromToday = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate(),
);
const twoMonthsFromToday = new Date(
  today.getFullYear(),
  today.getMonth() + 2,
  today.getDate(),
);

const toPOAPdate = (date: Date): string => {
  return date
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');
};

export const create_drop = async (client: DropsClient): Promise<void> => {
  const createDrop: CreateDropsInput = {
    name: 'Test ' + toPOAPdate(today),
    description: 'Description',
    city: 'Buenos Aires',
    country: 'Argentina',
    startDate: toPOAPdate(today),
    endDate: toPOAPdate(oneMonthFromToday),
    expiryDate: toPOAPdate(twoMonthsFromToday),
    eventUrl: 'https://poap.xyz/',
    virtualEvent: true,
    secretCode: '123456',
    image: await fs.promises.readFile('src/assets/poap.png'),
    filename: 'file.png',
    contentType: 'image/png',
    eventTemplateId: 1,
    email: 'your_email@poap.io',
    requestedCodes: 10,
    privateEvent: true,
  };

  try {
    const response = await client.create(createDrop);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

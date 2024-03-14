// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Implement your logout logic here, if necessary
  res.status(200).json({ message: 'Logout successful' });
}


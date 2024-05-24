import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';

type Data = {
    document_name: string;
    file_link: string;
    subject_name: string;
  };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject_name } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('myDatabase');
    const collection = db.collection<Data>('myCollection');
    
    const query = subject_name ? { subject_name: String(subject_name) } : {};
    const data = await collection.find(query).toArray();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

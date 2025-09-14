// pages/api/schools.js
import prisma from '../../lib/prisma';

export const config = {
  api: {
    bodyParser: true, // we accept JSON POSTs (image url will be provided by client after uploading to Cloudinary)
    // If you later want to accept multipart directly, you'd need formidable or similar.
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const schools = await prisma.school.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json({ data: schools });
    }

    if (req.method === 'POST') {
      const {
        name,
        address,
        city,
        state,
        contact,
        image, // full image URL (we expect client to upload to Cloudinary and pass back URL)
        email_id,
      } = req.body;

      // basic sanity check
      if (!name || !address || !city || !image || !email_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const school = await prisma.school.create({
        data: {
          name,
          address,
          city,
          state,
          contact,
          image,
          email_id,
        },
      });

      return res.status(201).json({ data: school });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

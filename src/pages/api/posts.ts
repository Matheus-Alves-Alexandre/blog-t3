/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler para a criação e recuperação de posts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Cria um novo post
    const { title, content } = req.body;
    try {
      const newPost = await prisma.post.create({
        data: { title, content },
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else if (req.method === 'GET') {
    // Recupera todos os posts
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

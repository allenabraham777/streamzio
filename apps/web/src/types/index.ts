import { Stream, User } from '@streamzio/db';

export type FullUser = User & { stream: Partial<Stream> | null; _count: { followedBy: number } };

export type ChatMessage = { username: string; message: string };

import { Stream, User } from '@streamzio/db';

export type FullUser = User & { stream: Partial<Stream> | null; _count: { followedBy: number } };

export type FullStream = Partial<Stream> & { user: User };

export type ChatMessage = { username: string; message: string };

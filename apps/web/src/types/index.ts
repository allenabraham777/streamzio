import { Stream, User } from '@streamzio/db';

export type FullUser = User & { stream: Partial<Stream> | null };

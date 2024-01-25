'use server';
import { db } from '@/lib/db';
import { generateStreamKey } from '@/lib/utils/stream-key';
import { getSelf } from '@/services/self';
import { revalidatePath } from 'next/cache';

export const onGenerateKey = async () => {
    const self = await getSelf();
    const streamKey = generateStreamKey();

    const stream = await db.stream.update({
        where: {
            userId: self.id
        },
        data: {
            streamKey
        }
    });
    revalidatePath(`/u/${self.username}/key`);
    return stream;
};

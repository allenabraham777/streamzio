import { db } from '@/lib/db';
import { getSelf } from './self';

export const getBlockedChannels = async () => {
    const self = await getSelf();
    const channels = await db.block.findMany({
        where: {
            blockerId: self.id
        },
        include: {
            blocked: true
        }
    });
    return channels;
};

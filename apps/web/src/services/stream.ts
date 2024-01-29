import { db } from '@/lib/db';
import { getSelf } from './self';

export const getStreamByUserId = async (userId: string) => {
    const stream = await db.stream.findUnique({
        where: { userId }
    });

    return stream;
};

export const getAllStreams = async () => {
    const self = await getSelf();
    const streams = await db.stream.findMany({
        where: {
            userId: { not: self.id },
            user: {
                NOT: {
                    blocking: {
                        some: {
                            blockedId: self.id
                        }
                    }
                }
            }
        },
        select: {
            id: true,
            user: true,
            isLive: true,
            name: true,
            thumbnailUrl: true
        },
        orderBy: [
            {
                isLive: 'desc'
            },
            {
                updatedAt: 'desc'
            }
        ]
    });
    return streams;
};

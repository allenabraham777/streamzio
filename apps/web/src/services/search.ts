import { db } from '@/lib/db';
import { getSelf } from './self';

export const searchStreams = async (term: string) => {
    const self = await getSelf();
    const streams = await db.stream.findMany({
        where: {
            user: {
                NOT: {
                    blocking: {
                        some: {
                            blockedId: self.id
                        }
                    }
                }
            },
            OR: [
                {
                    user: {
                        username: {
                            contains: term
                        }
                    }
                },
                {
                    name: {
                        contains: term
                    }
                }
            ]
        },
        select: {
            user: true,
            id: true,
            name: true,
            isLive: true,
            thumbnailUrl: true,
            updatedAt: true
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

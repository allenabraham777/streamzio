'use server';
import { revalidatePath } from 'next/cache';

import { Stream, User } from '@streamzio/db';

import { db } from '@/lib/db';
import { getSelf } from '@/services/self';

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf();
        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        });

        if (!selfStream) {
            throw new Error('Stream not found');
        }

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
            thumbnailUrl: values.thumbnailUrl
        };

        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            }
        });

        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/u/${self.username}`);
        revalidatePath(`/${self.username}`);

        return stream;
    } catch {
        throw new Error('Internal Error');
    }
};

export const onStreamLoad = (user: User, isDashboard: boolean) => {
    revalidatePath(`/${user.username}`);
    if (isDashboard) {
        revalidatePath(`/u/${user.username}`);
    }
};

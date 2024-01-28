'use server';
import { User } from '@streamzio/db';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { getSelf } from '@/services/self';

export const updateUser = async (values: Partial<User>) => {
    const self = await getSelf();

    const data = {
        bio: values.bio
    };

    const user = await db.user.update({
        where: {
            id: self.id
        },
        data: {
            ...data
        }
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
};

'use server';
import { User } from '@streamzio/db';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { getSelf } from '@/services/self';
import { getRecommended } from '@/services/recomended';
import { getFollowedUsers } from '@/services/follow';

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

export const getRecommendedAction = async () => {
    try {
        const recommended = await getRecommended();
        return recommended ? recommended : [];
    } catch (error) {
        return [];
    }
};

export const getFollowedAction = async () => {
    try {
        const followed = await getFollowedUsers();
        return followed ? followed : [];
    } catch (error) {
        return [];
    }
};

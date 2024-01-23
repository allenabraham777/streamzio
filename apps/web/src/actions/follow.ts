'use server';

import { followUser, unfollowUser } from '@/services/follow';
import { revalidatePath } from 'next/cache';

export const onFollow = async (userId: string) => {
    try {
        const followedUser = await followUser(userId);
        revalidatePath('/');
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }
        return followedUser;
    } catch (error) {
        throw new Error('Something went wrong!');
    }
};

export const onUnfollow = async (userId: string) => {
    try {
        const unfollowedUser = await unfollowUser(userId);
        revalidatePath('/');
        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`);
        }
        return unfollowedUser;
    } catch (error) {
        throw new Error('Something went wrong!');
    }
};

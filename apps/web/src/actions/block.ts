'use server';
import { revalidatePath } from 'next/cache';
import { blockUser, unblockUser } from '@/services/block';
import { getSelf } from '@/services/self';

export const onBlock = async (userId: string) => {
    const blockedUser = await blockUser(userId);
    revalidatePath('/');
    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
};

export const onUnblock = async (userId: string) => {
    const self = await getSelf();
    const unblockedUser = await unblockUser(userId);
    revalidatePath('/');
    if (unblockedUser) {
        revalidatePath(`/u/${self.username}/community`);
    }
    return unblockedUser;
};

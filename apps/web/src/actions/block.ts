'use server';
import { revalidatePath } from 'next/cache';
import { blockUser, unblockUser } from '@/services/block';

export const onBlock = async (userId: string) => {
    const blockedUser = await blockUser(userId);
    revalidatePath('/');
    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
};

export const onUnblock = async (userId: string) => {
    const unblockedUser = await unblockUser(userId);
    revalidatePath('/');
    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`);
    }
    return unblockedUser;
};

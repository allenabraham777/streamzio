import { db } from '@/lib/db';

import { getSelf } from './self';

export const isBlockedByUser = async (userId: string) => {
    try {
        const self = await getSelf();
        if (userId === self.id) {
            return false;
        }
        const blocker = await db.user.findUnique({ where: { id: userId } });
        if (!blocker) {
            throw new Error('No such user');
        }
        const isAlreadyBlocked = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockedId: self.id,
                    blockerId: blocker.id
                }
            }
        });
        return !!isAlreadyBlocked;
    } catch (error) {}
};

export const blockUser = async (userId: string) => {
    try {
        const self = await getSelf();
        if (self.id === userId) {
            throw new Error('Cannot block yourself!');
        }
        const blocked = await db.user.findUnique({ where: { id: userId } });
        if (!blocked) {
            throw new Error('No such user');
        }
        const isAlreadyBlocked = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockedId: self.id,
                    blockerId: blocked.id
                }
            }
        });
        if (isAlreadyBlocked) {
            throw new Error('User already blocked');
        }
        const blockedUser = await db.block.create({
            data: {
                blockedId: blocked.id,
                blockerId: self.id
            },
            include: {
                blocked: true
            }
        });
        return blockedUser;
    } catch (error) {
        throw error;
    }
};

export const unblockUser = async (userId: string) => {
    try {
        const self = await getSelf();
        if (self.id === userId) {
            throw new Error('Cannot block or unblock yourself!');
        }
        const blocked = await db.user.findUnique({ where: { id: userId } });
        if (!blocked) {
            throw new Error('No such user');
        }
        const isAlreadyBlocked = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: self.id,
                    blockedId: blocked.id
                }
            }
        });
        if (!isAlreadyBlocked) {
            throw new Error('User not blocked');
        }
        const unblockedUser = await db.block.delete({
            where: {
                id: isAlreadyBlocked.id
            },
            include: {
                blocked: true
            }
        });
        return unblockedUser;
    } catch (error) {
        throw error;
    }
};

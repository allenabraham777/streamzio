import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { getSelf } from '@/services/self';
import { db } from '@/lib/db';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '4MB' } })
        .middleware(async () => {
            const self = await getSelf();
            return { user: self };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await db.stream.update({
                where: {
                    userId: metadata.user.id
                },
                data: {
                    thumbnailUrl: file.url
                }
            });

            return { fileUrl: file.url };
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

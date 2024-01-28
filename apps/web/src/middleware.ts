import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: ['/signin', '/signup', '/api/webhooks/clerk', '/api/uploadthing']
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)']
};

import { z} from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { getArticle } from '@/utils/mdx/articles';

export const articleRouter = createTRPCRouter({
    articleContent : publicProcedure.input(z.object({
        locale:z.string(),
        slug: z.string()
    }))
    .query(async ({input: {slug, locale}}) => {
        return await getArticle({slug, locale});
    })
})
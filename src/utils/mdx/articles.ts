import fs from "fs";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";

//const articles_path = join(process.cwd(), "src/content/article");
const articles_path_locale = (locale: string) =>
  join(process.cwd(), `src/content/article/${locale}`);

export async function getArticle({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const fullPath = join(articles_path_locale(locale), `${slug}.mdx`);
  console.log(fullPath);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const source = await serialize(fileContent, {parseFrontmatter:true});
  return source;
}

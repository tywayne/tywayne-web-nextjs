import { remark } from 'remark';
import remarkParse from 'remark-parse';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkParse).use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

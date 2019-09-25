import axios from 'axios';
import DailyArticleInterface from '../types/DailyArticleInterface';

export async function getDailyArticle(id: number) {
  const { data } = await axios({
    method: 'get',
    url: `https://daily.pokecommunity.com/wp-json/wp/v2/posts/${id}?_embed`
  });

  const article: DailyArticleInterface = {
    id: data.id,
    title: data.title.rendered,
    link: data.link,
    excerpt: data.excerpt.rendered,
    author: data._embedded.author[0].name,
    authorSlug: data._embedded.author[0].slug,
    content: data.content.rendered,
    date: new Date(data.date),
    status: data.status,
    
    // oof wordpress, don't do me like this
    thumbnail: data._embedded['wp:featuredmedia'][0].media_details
      .sizes.thumbnail.source_url,
  };

  return article;
}
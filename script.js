import { fetchRandomArticle } from './wikipedia.js';
import { displayArticle } from './ui.js';

fetchRandomArticle().then(article => {
    displayArticle(article.title, article.extract, article.content_urls.desktop.page, article.license);
});

document.getElementById('generate-btn').addEventListener('click', async () => {
    const article = await fetchRandomArticle();
    displayArticle(article.title, article.extract_html, article.content_urls.desktop.page, article.license);
});
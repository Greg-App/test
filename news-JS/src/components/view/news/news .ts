import './news.css';
import querySelectSave from '../../controller/helper';
import {cloneNod,InewsObj} from '../../controller/helper';

class News {
    draw(data : InewsObj[]):void {
        const news:InewsObj[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment:DocumentFragment = document.createDocumentFragment();
        const newsItemTemp:HTMLTemplateElement = querySelectSave(document, HTMLTemplateElement, '#newsItemTemp');

        news.forEach((item:InewsObj, idx) => {
            const newsClone:DocumentFragment = cloneNod(newsItemTemp.content);

            if (idx % 2) querySelectSave(newsClone, HTMLTemplateElement, '.news__item').classList.add('alt');
            querySelectSave(newsClone, HTMLTemplateElement, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            querySelectSave(newsClone, HTMLTemplateElement, '.news__meta-author').textContent = item.author || item.source.name;
                querySelectSave(newsClone, HTMLTemplateElement, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            querySelectSave(newsClone, HTMLTemplateElement, '.news__description-title').textContent = item.title;
            querySelectSave(newsClone, HTMLTemplateElement, '.news__description-source').textContent = item.source.name;
            querySelectSave(newsClone, HTMLTemplateElement, '.news__description-content').textContent = item.description;
            querySelectSave(newsClone, HTMLTemplateElement, '.news__read-more a').setAttribute('href', item.url);
            fragment.append(newsClone);
        });
        querySelectSave(document, HTMLElement, '.news').innerHTML = '';
        querySelectSave(document, HTMLElement, '.news').appendChild(fragment);
    }
}

export default News;

import News from './news/news';
import Sources from './sources/sources';
import {InewsObj,IsrcObj,Inews,Isources} from '../../components/controller/helper';

export class AppView  {
  news:News;
  sources:Sources;
    constructor() {
      this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:Inews) {
        const values:InewsObj[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:Isources) {
        const values:IsrcObj[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

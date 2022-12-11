import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data) {
      console.log('News src obj: ',data);
      console.log('artivles is : ',data.articles);
      console.log(typeof data.totalResults);
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data) {
      console.log('Sources src obj: ',data);
      console.log(data.sources);
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

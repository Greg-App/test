import AppLoader from './appLoader';
import {cBack} from './helper';

class AppController extends AppLoader {
    getSources(callback:cBack) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e:Event& { target: Element }, callback:cBack) {
        let target  = e.target;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target!==null&&target.classList.contains('source__item')) {
                const sourceId = target?.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId&&sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                } else {throw new Error ('sourceId is null')}
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;

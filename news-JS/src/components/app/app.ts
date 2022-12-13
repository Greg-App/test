import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import querySelectSave from '../controller/helper';
import {Inews,Isources,cBack} from '../controller/helper';

class App {
  controller: AppController;
  view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
      
      querySelectSave(document,HTMLElement,'.sources')
            .addEventListener('click', (e:Event) => this.controller.getNews(e, (data:Inews) => this.view.drawNews(data)));
        this.controller.getSources((data:Isources) => this.view.drawSources(data));
    }
}

export default App;

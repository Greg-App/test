import './sources.css';
import querySelectSave from '../../controller/helper';
import {cloneNod,IsrcObj} from '../../controller/helper';

class Sources   {
  draw (data: IsrcObj[]):void { 
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp:HTMLTemplateElement = querySelectSave(document,HTMLTemplateElement, '#sourceItemTemp');
    for (let i=0;i<data.length;i++) {
      const sourceClone: DocumentFragment = cloneNod(sourceItemTemp.content);
      querySelectSave(sourceClone, HTMLElement, '.source__item-name').textContent = data[i].name;
      querySelectSave(sourceClone, HTMLElement, '.source__item').setAttribute('data-source-id', data[i].id);
      fragment.append(sourceClone);
      
    }
    querySelectSave(document, HTMLElement, '.sources').append(fragment);
  }
}

export default Sources;

import './sources.css';
import querySelectSave from '../../controller/helper';
import {cloneNod,IitemObj} from '../../controller/helper';

class Sources {
  draw(data: IitemObj[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = querySelectSave(document, HTMLTemplateElement, '#sourceItemTemp');
    
    //data.forEach((item: IitemObj)
    for (let i=0;i<data.length;i++) {
      const sourceClone = cloneNod(sourceItemTemp.content);
      //const sourceClone = sourceItemTemp.content.cloneNode(true);
      querySelectSave(sourceClone, HTMLElement, '.source__item-name').textContent = data[i].name;
      /* sourceClone.querySelector('.source__item-name').textContent = item.name; */
      //sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
      querySelectSave(sourceClone, HTMLElement, '.source__item').setAttribute('data-source-id', data[i].id);
      console.log(sourceClone);
      fragment.append(sourceClone);
      
    }

    //document.querySelector('.sources').append(fragment);
    querySelectSave(document, HTMLElement, '.sources').append(fragment);
  }
}

export default Sources;

import './sources.css';
import queryElement from '../../controller/helper';
interface IitemObj {
  "id": string,
  "name": string,
  "description": string,
  "url": string,
  "category": string,
  "language": string,
  "country": string
}
class Sources {
  draw(data: IitemObj[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = queryElement(document, HTMLTemplateElement, '#sourceItemTemp');
    function cloneNod<HTMLTemplateElement extends Node>(node: HTMLTemplateElement) {
      return <HTMLTemplateElement>node.cloneNode(true);
  }
    //data.forEach((item: IitemObj)
    for (let i=0;i<data.length;i++) {
      const sourceClone = cloneNod(sourceItemTemp.content);
      //const sourceClone = sourceItemTemp.content.cloneNode(true);
      queryElement(sourceClone, HTMLElement, '.source__item-name').textContent = data[i].name;
      /* sourceClone.querySelector('.source__item-name').textContent = item.name; */
      //sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
      queryElement(sourceClone, HTMLElement, '.source__item-name').setAttribute('data-source-id', data[i].id);
      fragment.append(sourceClone);
      
    }

    //document.querySelector('.sources').append(fragment);
    queryElement(document, HTMLElement, '.sources').append(fragment);
  }
}

export default Sources;

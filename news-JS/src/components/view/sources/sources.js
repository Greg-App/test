import './sources.css';

class Sources {
    draw(data) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {
          console.log(item);
          console.log(typeof item);
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            console.log(typeof sourceClone);
            console.log('SourceClone: ');
            console.log(sourceClone);
            console.log('Hey this source',item);

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;

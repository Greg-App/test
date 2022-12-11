
export interface IsrcObj {
  "id": string,
  "name": string,
  "description": string,
  "url": string,
  "category": string,
  "language": string,
  "country": string
}
export interface InewsObj {
  author: string | null,
  content: string, 
  description: string,
  publishedAt: string,
  source: {
     id: string, 
     name: string
     },
  title: string, 
  url: string, 
  urlToImage: string
  }
  export interface Isources {
    status: string, 
    sources: IsrcObj[]
  }
  export interface Inews {
    status: string,
    totalResults: number, 
    articles: InewsObj[]
  }
function checkSelector(
  parent: Element | Document | DocumentFragment, selector: string
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
  
    throw new Error(`Can't find  element with selector name: "${selector}" 
    `);
  }
  return el;
}
function querySelectSave<T extends typeof Element>(
  container: Document | Element | DocumentFragment,
  type: T,
  selector: string,
): InstanceType<T> {
  const el = checkSelector(container, selector);
  if (!(el instanceof type)) { 
        throw new Error(
      `Selector ${selector} of ${el} is not a type ${type}`
    );
  }
  return el as InstanceType<T>;
}
export function cloneNod<HTMLElement extends Node>(node: HTMLElement) {
  return <HTMLElement>node.cloneNode(true);
}

export default querySelectSave;
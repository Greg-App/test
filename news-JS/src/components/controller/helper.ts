
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
  
function querySelectSave<T extends typeof Element>(
  parent: Document | Element | DocumentFragment,
  type: T,
  selector: string
): InstanceType<T> {
  const el = parent.querySelector(selector);
  if (!el||!(el instanceof type)) { 
        throw new Error(
      `Type mismatch or element does not exist`
    );
  }
  return el as InstanceType<T>;
}
export function cloneNod<HTMLElement extends Node>(node: HTMLElement) {
  return <HTMLElement>node.cloneNode(true);
}

export type cBack = <T,Inews,Isources>(data?: T|Inews|Isources) => T|void;


export default querySelectSave;
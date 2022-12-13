import {IsrcObj,InewsObj,cBack} from './helper';
type loaderOptions = {
  apiKey: string,
}

type options = {
  sources?: string,
}
type getRespOpt = {
  endpoint: string,
  options?: options
}
type urlOption = loaderOptions|options;
type respJSON = {
  status: string, 
  sources?:IsrcObj[]|[]
  articles?:InewsObj[]|[],
  totalResults?:number|string
}
abstract class Loader {
    constructor(
        private baseLink : string,
        private loaderOptions: loaderOptions
        
    ) {}
    
    getResp(
        { endpoint, options = {} }:getRespOpt,
        callback = () => {
            console.error('No callback for GET response');
        }
    ):void {

        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Response):Response|never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: options, endpoint:string): string {
        const urlOptions:urlOption = { ...this.loaderOptions, ...options };
        let url= `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach((key,ind,arr) => {
          const opt =arr[ind][1];
          console.log('opt: ', opt);
            url += `${arr[ind][0]}=${opt}&`;
        });
        console.log('URL: = ',url);

        return url.slice(0, -1);
    }

    load(method:string, endpoint: string, callback:cBack, options:options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res:Response): Promise<respJSON> => res.json())
            .then((data:respJSON) => callback(data))
            .catch((err:object) => console.error(err));
    }
}

export default Loader;

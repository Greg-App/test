import {IsrcObj,InewsObj} from './helper';
type cBack = (data: object|undefined) => void|object;
type loaderOptions = {
  apiKey: string,
}
type Resp = Response;
type options = {
  sources?: string,
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
        { endpoint, options = {} }:{endpoint:string,options:options},
        callback = ():void|Resp => {
            console.error('No callback for GET response');
        }
    ):void {

        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Resp):Resp|never {
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
            .then((res:Resp): Promise<respJSON> => res.json())
            .then((data:respJSON) => callback(data))
            .catch((err:object) => console.error(err));
    }
}

export default Loader;

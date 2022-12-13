class Loader {
    constructor(baseLink, loaderOptions) {
        this.baseLink = baseLink;
        this.loaderOptions = loaderOptions;
        
    }

    getResp(
        { endpoint, options = {} },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
      console.log('Endpoint is: ',endpoint);
      console.log(typeof endpoint);
      console.log('options getResp is: ',options);
       let a= this.load('GET', endpoint, callback, options);
       console.log('load result: ', a);
    }

    errorHandler(res) {
      console.log('errorHandler res: ', res);
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options, endpoint) {
        const urlOptions = { ...this.loaderOptions, ...options };
        console.log('make URL urlOptions: ',urlOptions);
        console.log(typeof window.fetch);
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
          console.log('ObjKeys urlOptions: ',urlOptions[key] );
          console.log('ObjKeys urlOptions: ',typeof urlOptions[key] );
          console.log('ObjKeys urlOptions: ',typeof key );
          console.log('ObjKeys key: ',key );
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log('make URL is : !!!',url);

        return url.slice(0, -1);
    }

    load(method, endpoint, callback, options = {}) {
      
      console.log('load endpoint: ', endpoint);
      console.log('load options: ', options);
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) =>{
              console.log('JSON: ',data);
              return callback(data);})
            .catch((err) => console.error(err));
    }
}

export default Loader;

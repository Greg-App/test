import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '05c9e322efa94821b9d592b091332b28', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

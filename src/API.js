export class API {
    constructor(keyword) {
        this.keyword = keyword;
    }

    findWord(){
        return fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${this.keyword}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "3fa0483dacmsh50a322af41ac3c8p11d07fjsn9120101a2a53"
            }
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                else return Promise.reject(res)
            })
            .then(res => {
                if(res.list.length !== 0){
                    return res.list
                }
                else return Promise.reject(res)
            })
    }
}
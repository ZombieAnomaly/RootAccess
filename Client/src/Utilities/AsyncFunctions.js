const functions = {

    async LoginAPICall(data){
        const settings = {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };  
        const response = await fetch('/login', settings);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;       
    },

    async RegisterAPICall(data){
        const settings = {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };  
        const response = await fetch('/register',settings);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;       
    },

    async TestBackendAPI() {
        const response = await fetch('/api');
        const body = await response.json();

        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    },

    async CheckSessionAPI(){
        const response = await fetch('/checksession',{
            credentials: 'include',
        });
        const body = await response.json();

        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    }
}
export default functions;
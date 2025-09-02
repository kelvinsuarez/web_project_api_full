
class Api{
    constructor({ token, address, groupId }){
        this._authorization = token;
        this._address = address;
        this._groupId = groupId
    }

    async _useFetch(url, method, body){
        const headers = {
           "content-type": "application/json"
        };

        const token = localStorage.getItem("jwt");
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const res = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (res.ok){
            return res.json();
        }

        return Promise.reject(`Error ${res.status}`)
    }

    async _useFormDataFetch(url, method, formData) {
        const headers = {};
        const token = localStorage.getItem("jwt");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        
        const res = await fetch(url, {
            method,
            headers,
            body: formData,
        });

        if (res.ok) return res.json();
        return Promise.reject(`Error ${res.status}`);
    }

    async getUserInfoFronServer() {
        try{
            const res = await this._useFetch(`${this._address}/users/me`,
            "GET"
            );
            return res;
        }catch(err) {
            console.log(err);
        }
    }

    async getCards(){
        try{
            const res = await this._useFetch(`${this._address}/cards`,
            "GET"
            );
            return res;
        }catch (err) {
            console.log(err);
        }
    }

    async saveDataToServer(name, description) {
        try{
            const res = await this._useFetch(
                `${this._address}/users/me`,
                "PATCH",
                {
                    name,
                    about: description,
                }
            );
            return res.data ? res.data: res;
        } catch (err) {
            console.log('Error al actualizar los datos del usuario:',err);
        }
    }

    async addNewCardToServer(formData) {
        try {
            const res = await this._useFormDataFetch(
               `${this._address}/cards`,
               "POST", 
               formData
            );
            return res;
        } catch(err) {
            console.log(err);
        }
    }

    async showLikeFromCard(cardId) {
        try {
            const res = await this._useFetch(
                `${this._address}/cards/likes/${cardId}`,
                "PUT"
            );

            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteLikeFromCard(cardId){
        try {
            const res = await this._useFetch(
                `${this._address}/cards/likes/${cardId}`,
                "DELETE"
            );

            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteCardFromServer(cardId){
        try {
            const res = await this._useFetch(
                `${this._address}/cards/${cardId}`,
                "DELETE"
            );

            return res;
        } catch (err) {
            console.log (err);
        }
    }

    async updateImageProfile(formData) {
        try {
            const res = await this._useFormDataFetch(
                `${this._address}/users/me/avatar`,
                "POST",
                formData
            );

            return res.data ? res.data : res;
        } catch (err) {
            console.log("error al actualizar la imagen de perfil:", err);
        }
    }

}

const api = new Api({
    address: 'https://api.p18.ignorelist.com',
    token: localStorage.getItem('jwt') || process.env.TOKEN || '',
});

export default api;
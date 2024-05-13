import api from './axios';

class ServerService{
    async getServerInfoCPU(){
        const response = await api.post('/server/cpu');
        console.log(response);
        return response.data;
    }

}

export default new ServerService();
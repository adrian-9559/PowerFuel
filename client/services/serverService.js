import api from './axios';

class ServerService{

    async getServerInfo(){
        const response = await api.post('/server/info');
        return response.data;
    }

    async getServerInfoCPU(){
        const response = await api.post('/server/cpu');
        return response.data;
    }

    async getServerInfoRAM(){
        const response = await api.post('/server/ram');
        return response.data;
    }

    async getServerInfoDisk(){
        const response = await api.post('/server/disk');
        return response.data;
    }

}

export default new ServerService();
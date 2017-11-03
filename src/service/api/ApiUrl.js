import {HOST_SERVER} from './config'

export default class ApiUrl {

    static loginUrl() {
        return HOST_SERVER + '/api/login/';
    }
}
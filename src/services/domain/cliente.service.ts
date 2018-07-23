import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ClienteService {
    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findByEmail(email : string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;

        return this.http.get(url, {responseType : 'blob'});
    }
}
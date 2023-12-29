import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";


export default class OrderApi {
    static apiURL = API_URL;

    static getListOrder(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${OrderApi.apiURL.HOST}/${this.apiURL.GET_ALL_ORDER}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getDetailOrder(id: string): Observable<any> {
        const api = `${OrderApi.apiURL.HOST}/${this.apiURL.GET_DETAIL_ORDER}/${id}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
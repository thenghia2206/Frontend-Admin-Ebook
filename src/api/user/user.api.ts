import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";


export default class UserApi {
    static apiURL = API_URL;

    static getListUser(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_LIST_USER}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getUserInfor(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_USER_INFO}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


    static blockUser(body: any): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.SET_STATUS_USER}/${body.userId}`;
        return HttpClient.put(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getStatisticUser(): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_STATISTIC_USER}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
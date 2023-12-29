import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";


export default class PublisherApi {
    static apiURL = API_URL;

    static getListPublisher(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${PublisherApi.apiURL.HOST}/${this.apiURL.GET_LIST_PUBLISHER}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static addPublisher(body: any): Observable<any> {
        const api = `${PublisherApi.apiURL.HOST}/${this.apiURL.ADD_PUBLISHER}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getPublisher(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${PublisherApi.apiURL.HOST}/${this.apiURL.GET_PUBLISHER}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static editPublisher(bodyrequest: any): Observable<any> {
        const finalBodyrequest = {
            name : bodyrequest.name
          }
        const api = `${PublisherApi.apiURL.HOST}/${this.apiURL.EDIT_PUBLISHER}/${bodyrequest.id}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deletePublisher(bodyrequest: any): Observable<any> {
        const api = `${PublisherApi.apiURL.HOST}/${this.apiURL.DELETE_PUBLISHER}/${bodyrequest.id}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
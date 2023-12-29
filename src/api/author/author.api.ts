import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";


export default class AuthorApi {
    static apiURL = API_URL;

    static getListAuthor(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${AuthorApi.apiURL.HOST}/${this.apiURL.GET_LIST_AUTHOR}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static addAuthor(body: any): Observable<any> {
        const api = `${AuthorApi.apiURL.HOST}/${this.apiURL.ADD_AUTHOR}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getAuthor(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${AuthorApi.apiURL.HOST}/${this.apiURL.GET_AUTHOR}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static editAuthor(bodyrequest: any): Observable<any> {
        const finalBodyrequest = {
            fullName : bodyrequest.fullName
          }
        const api = `${AuthorApi.apiURL.HOST}/${this.apiURL.EDIT_AUTHOR}/${bodyrequest.id}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteAuthor(bodyrequest: any): Observable<any> {
        const api = `${AuthorApi.apiURL.HOST}/${this.apiURL.DELETE_AUTHOR}/${bodyrequest.id}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
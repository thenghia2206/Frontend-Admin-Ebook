import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";


export default class CategoryApi {
    static apiURL = API_URL;

    static getListCategory(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${CategoryApi.apiURL.HOST}/${this.apiURL.GET_LIST_CATEGORY}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static addCategory(body: any): Observable<any> {
        const api = `${CategoryApi.apiURL.HOST}/${this.apiURL.ADD_CATEGORY}`;
        console.log(body)
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getCategories(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${CategoryApi.apiURL.HOST}/${this.apiURL.GET_CATEGORY}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static editCategory(bodyrequest: any): Observable<any> {
        const finalBodyrequest = {
            name : bodyrequest.name
          }
        console.log(finalBodyrequest)
        const api = `${CategoryApi.apiURL.HOST}/${this.apiURL.EDIT_CATEGORY}/${bodyrequest.id}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteCategory(bodyrequest: any): Observable<any> {
        const api = `${CategoryApi.apiURL.HOST}/${this.apiURL.DELETE_CATEGORY}/${bodyrequest.id}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
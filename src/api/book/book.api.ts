import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";
import { ICreateBookReq, IEditBookReq } from "../../common/book.interface";


export default class BookApi {
    static apiURL = API_URL;

    static getListBook(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_LIST_BOOK}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getDetailBook(id: string): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.DETAIL_BOOK}/${id}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static addBook(body: any): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.CREATE_BOOK}`;
        return HttpClient.upload(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static editBook(bodyrequest: any): Observable<any> {
        const finalBodyrequest = {
            title: bodyrequest?.title,
            price : bodyrequest?.price,
            authorIds : bodyrequest?.authorIds,
            publisherId : bodyrequest?.publisherId,
            description : bodyrequest?.description,
            categoryIds : bodyrequest?.categoryIds,
          }
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.EDIT_BOOK}/${bodyrequest.id}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteBook(bodyrequest: any): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.DELETE_BOOK}/${bodyrequest.id}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getBookBestSeller(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.TOP_BOOK_BESTSELLER}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
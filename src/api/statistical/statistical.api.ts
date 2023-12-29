import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";


export default class StatisticalApi {
    static apiURL = API_URL;

    static getStatisticalOverview(): Observable<any> {
        const api = `${StatisticalApi.apiURL.HOST}/${this.apiURL.GET_STATISTIC_OVERVIEW}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getStatisticDay(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticalApi.apiURL.HOST}/${this.apiURL.GET_STATISTIC_DAY}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getStatisticMonth(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticalApi.apiURL.HOST}/${this.apiURL.GET_STATISTIC_MONTH}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getStatisticYear(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticalApi.apiURL.HOST}/${this.apiURL.GET_STATISTIC_YEAR}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
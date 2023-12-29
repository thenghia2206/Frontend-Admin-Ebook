import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";
import { IStaffChange } from "../../common/staff.interface";


export default class StaffApi {
    static apiURL = API_URL;

    static getListStaff(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StaffApi.apiURL.HOST}/${this.apiURL.GET_LIST_STAFF}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteStaff(bodyrequest: any): Observable<any> {
        const api = `${StaffApi.apiURL.HOST}/${this.apiURL.DELETE_STAFF}/${bodyrequest.id}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static changePassword(bodyrequest: any): Observable<any> {
        const api = `${StaffApi.apiURL.HOST}/${this.apiURL.CHANGE_PASSWORD}`;
        return HttpClient.put(api,bodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static forgotPassword(body: any): Observable<any> {
        const api = `${StaffApi.apiURL.HOST}/${this.apiURL.FORGOT_PASSWORD}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static fgPassword(body: any): Observable<any> {
        const api = `${StaffApi.apiURL.HOST}/${this.apiURL.FG_PASSWORD}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


    static editProfile(bodyrequest: any): Observable<any> {
        const finalBodyrequest : IStaffChange = {
            fullName : bodyrequest?.fullName,
            phoneNumber : bodyrequest?.phoneNumber,
            address : bodyrequest?.address,
            dob : bodyrequest?.dob,
            gender : bodyrequest?.gender
          }
        const api = `${StaffApi.apiURL.HOST}/${this.apiURL.GET_USER_INFO}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
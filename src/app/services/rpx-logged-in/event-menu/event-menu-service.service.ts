import { Injectable } from "@angular/core";
import * as rpxGlobals from "../../../globals";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { handleError } from "../../../helpers/error-helper";
import { catchError, tap } from "rxjs/operators";

const REWARD_API = `${rpxGlobals.API}reward`;

@Injectable({
  providedIn: "root",
})
export class EventMenuServiceService {
  constructor(private http: HttpClient) {}

  public fetchRewards(fetchRewardsReq: any = null): Observable<any> {
    const placeToEatApi = `${REWARD_API}/index`;

    return this.http
      .post<any>(placeToEatApi, fetchRewardsReq)
      .pipe(catchError(handleError("fetchRewards")));
  }
}

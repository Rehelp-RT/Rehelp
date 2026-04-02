import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { HelpResponse, Help } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getPositiveTransaction( idUser = null ) {
    let params = '?posted=true';
    // params += idUser != null ? 'idResponder=' + idUser + '&' : '';
    // if (params !== '') {
    //   params = '?' + params;
    // }
    if(idUser){
      params += '&idResponder=' + idUser;
    }

    return this.http.get<HelpResponse[]>(`${environment.apiUrl}/responses${params}`);
}

getNegativeTransaction( idUser = null ) {
  let params = '?posted=true';
  if(idUser){
    params += '&idCreator=' + idUser;
  }

  return this.http.get<Help[]>(`${environment.apiUrl}/helps${params}`);
}


}

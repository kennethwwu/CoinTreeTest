import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CrytoPriceSeriveService {

  constructor(private _http:HttpClient) { }

  getCoinPrice(coin:string, currency:string):Observable<any>{
    return Observable.interval(30000).startWith(0).switchMap(()=> 
    this._http.get(`https://cors-anywhere.herokuapp.com/https://api.cointree.com.au/v1/price/${coin}/${currency}`)
    );
  }

  getBTCDailyHisto(){
    return Observable.interval(3600*1000).startWith(0).switchMap(()=> 
    this._http.get(`https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=AUD&limit=24&aggregate=1&e=CCCAGG`)
    );
  }

}

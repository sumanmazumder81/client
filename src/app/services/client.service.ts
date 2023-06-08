import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private services: GlobalApiService,
    private http: HttpClient
  ) { }

  // client
  // post method
  public clientSubmitHandeler(data:FormData){
    const url = this.services.getUrl(`ClientEntities`);
    return this.http.post(url, data);
  }
  // client edit get by id
  public clientDataGet(id:number){
    const url = this.services.getUrl(`ClientEntities/${id}`);
    return this.http.get(url);
  }
  // list by search
  public clientListSearch(pageNo:any, pageSize:any, searchString:any){
    const url = this.services.getUrl(`ClientEntities/search?displayCount=${pageSize}&pageNo=${pageNo}&searchValue=${searchString}`);
    return this.http.get(url);
  }
  //delete
  cliendDelete(clientId:number){
    const url = this.services.getUrl(`ClientEntities/${clientId}`);
    return this.http.delete(url);
  }
  // client edit get by id
  clientEditDataGet(clientId:number, formData:any){
    const url = this.services.getUrl(`ClientEntities/${clientId}`);
    return this.http.put(url, formData);
  }

  // wear house
  // post method
  public wearHouseSubmitHandeler(data:FormData){
    const url = this.services.getUrl(`Warehouse`);
    return this.http.post(url, data);
  }
  // list
  public wearHouseList(id:number){
    const url = this.services.getUrl(`Warehouse/all/${id}`);
    return this.http.get(url);
  }

  // delete
  public wearHouseDelete(clientId:number, warehouseId:number){
    const url = this.services.getUrl(`Warehouse/${clientId}/${warehouseId}`);
    return this.http.delete(url);
  }
  // wearhouse get
  public wearHouseGet(id:number){
    const url = this.services.getUrl(`Warehouse/${id}`);
    return this.http.get(url);
  }
  // update Ware house
  public wearHouseUpdate(id:number, data:any){
    // console.log(data)
    const url = this.services.getUrl(`Warehouse/${id}`);
    return this.http.put(url, data);
  }








  //receiver
  // post
  public receiverSubmitHandeler(data:FormData){
    const url = this.services.getUrl(`Receivers`);
    return this.http.post(url, data);
  }
  // get list
  public receiverList(id:number){
    const url = this.services.getUrl(`Receivers/all/${id}`);
    return this.http.get(url);
  }

  // receiver edit get by id
  public receiverDataGet(id:number){
    const url = this.services.getUrl(`Receivers/${id}`);
    return this.http.get(url);
  }
  // update Ware house
  public receiverUpdate(id:number, data:any){
    // console.log(data)
    const url = this.services.getUrl(`Receivers/${id}`);
    return this.http.put(url, data);
  }
  // delete
  public receiverDelete(clientId:number, warehouseId:number){
    const url = this.services.getUrl(`Receivers/${clientId}/${warehouseId}`);
    return this.http.delete(url);
  }
}

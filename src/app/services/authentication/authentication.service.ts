import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Interno } from 'src/app/models/data/interno';
import { UserInfo } from 'src/app/models/user/user-info';
import { HttpService } from '../common/http-client/http.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService extends HttpService {

  private _token: string;
  private usuarioInterno: Interno;

  constructor() {
    super();
  }

  public setUserData(userInfo: UserInfo) {

    this.usuarioInterno = new Interno();

    this.usuarioInterno.curp = userInfo?.employeeNumber;
    this.usuarioInterno.nombre = userInfo?.cn;
    this.usuarioInterno.correo = userInfo?.mail;
    this.usuarioInterno.primerApellido = userInfo?.sn;
    this.usuarioInterno.segundoApellido = userInfo?.givenName;
    this.usuarioInterno.rol = userInfo?.imssperfiles;
    this.usuarioInterno.matricula = userInfo?.imssmatricula;

    return this.usuarioInterno;
  }

  public obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return jwt_decode(accessToken);
    }
    return null;
  }

  public logout(): void {
    this._token = null;
    sessionStorage.clear();
  }

  public get token(): string {
    
    if (this._token != null) {
      return this._token
    } else if (this._token == null && sessionStorage.getItem(btoa('token')) != null) {
      this._token = sessionStorage.getItem(btoa('token'));
      this._token = this._token;
      return this._token;
    }
    return null;
  }

  public set token(token: string) {
    if (!token) return;
    sessionStorage.setItem(btoa('token'), token);
  }

  public get tokenLogin(): any {
    
    if (this._token != null) {
      return this._token
    } else if (this._token == null && sessionStorage.getItem(btoa('token_login')) != null) {
      this._token = sessionStorage.getItem(btoa('token_login'));
      return this._token;
    }
    return null;
  }

  public set tokenLogin(token: any) {
    if (!token) return;
    sessionStorage.setItem(btoa('token_login'), btoa(token));
  }

  public set indBusquedaNSS(indBusquedaNSS: any) {
    if (!indBusquedaNSS) return;
    sessionStorage.setItem(btoa('indBusquedaNSS'), btoa(indBusquedaNSS));
  }

  public get indBusquedaNSS(): any {
    return sessionStorage.getItem(btoa('indBusquedaNSS'));
  }

  public set indBusquedaAvanzada(indBusquedaAvanzada: any) {
    if (!indBusquedaAvanzada) return;
    sessionStorage.setItem(btoa('indBusquedaAvanzada'), btoa(indBusquedaAvanzada));
  }

  public get indBusquedaAvanzada(): any {
    return sessionStorage.getItem(btoa('indBusquedaAvanzada'));
  }

}

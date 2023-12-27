import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBlDto } from '../models/CreateBlDto';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) {}

createBl(idUser: any, createBlDto: CreateBlDto): Observable<any> {
  return this.http.post(`${environment.backendHost}/bl/${idUser}/createbl`, createBlDto);
}
downloadPdf(blId: number): Observable<Blob> {
  return this.http.get(`${environment.backendHost}/bl/${blId}/createpdf`, {
    responseType: 'blob',
  });
}

generatePdf(): void {
  const downloadUrl = `${environment.backendHost}/upload-groupe/download`;
  window.open(downloadUrl, '_blank');
}
}

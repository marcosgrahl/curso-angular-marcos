import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient
  ) { }


    upload(files: Set<File>, url: string) {

      console.log('files recebidos via upload',files);
      const formData = new FormData();
    
      console.log(files.size);
      for (let index = 0; index < files.size; index++) {
        const element = files[index];
        console.log('element',element);
      }

      files.forEach(file => {
        console.log('file',file)
        formData.append('file', file, file.name);
      });
      console.log('formData',formData);

      //const request = new HttpRequest('POST', url, formData)
      //return this.http.request(request); 
      //ou
      return this.http.post(url, formData, {
        observe: 'events',
        reportProgress: true
      });
    }

    download(url: string) {
      return this.http.get(url, {
        responseType: 'blob' as 'json',
        // ,reportProgress: true, // para receber o progresso, o back-end precisa set o tamanho do arquivo
        // pelo content-length
      })
    }

    handleFile(res: any, filename: string) {
      console.log(res);
      const file = new Blob([res], { type: res.type} );
  
      // Para IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file);
        return; // código abaixo não precisa executar se for IE
      }
  
      const blob = window.URL.createObjectURL(file);
  
      const link = document.createElement('a');
      link.href = blob;
      link.download = filename;
      //link.click(); // adaptação para o click funcionar também no firefox
      link.dispatchEvent(new MouseEvent('click',{
        bubbles: true,
        cancelable: true,
        view: window
      }))
  
      // delay para garantir as remoções no firefox
      setTimeout(() => {
        window.URL.revokeObjectURL(blob);
        link.remove();
      }, 250);
    }

}
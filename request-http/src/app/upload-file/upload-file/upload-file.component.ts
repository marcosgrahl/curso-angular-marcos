import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { environment } from '../../../environments/environment';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operator';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  nomeArquivo: string = 'Seleciar arquivo'

  files: Set<File>; // a estrutua Set já faz o tratamento para enviar apenas uma cópia do arquivo

  progress: number = 0;

  constructor(
    private service: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);
    const selecFiles = <FileList>event.srcElement.files;
    console.log(selecFiles[0].name);
    //this.nomeArquivo = selecFiless[0].name;
    //document.getElementById('idArquivoLabel').innerHTML = selecFiles[0].name

    /*
    const fileNames = [];
    this.files = new Set(); // instanciando
    for (let index = 0; index < selecFiles.length; index++) {
      fileNames.push( selecFiles[index].name);
      this.files.add(selecFiles[index]);
    } 
    */

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selecFiles.length; i++) {
      fileNames.push(selecFiles[i].name);
      this.files.add(selecFiles[i]);
    }
   
    document.getElementById('idArquivoLabel').innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  /*
  onUpload() {
    if (this.files &&  this.files.size > 0) {
      //this.service.upload(this.files,'http://localhost:8000/upload')
      this.service.upload(this.files, environment.BASE_URL + '/upload')
      .subscribe((event: HttpEvent<Object>) => {
        console.log('event',event);
        if (event.type == HttpEventType.Response ){
          console.log('upload concluído.');
        } else if (event.type == HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded / event.total) * 100);
          console.log('Progresso',percentDone);
          this.progress = percentDone;
        }
      });
    }
  }
  */
  // refaturando para usar operador rxjs customizado.
  // lembrando que é necessário leventar o servido que esta em ...request-http\server\src> node .\index.js
  onUpload() {
    if (this.files &&  this.files.size > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/upload')
      .pipe(
        uploadProgress(progress => {
          console.log('progress',progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(response => console.log('upload concluído.') );
    }
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe( (res: any) => this.service.handleFile(res, 'report.xlsx'));
  }

  onDownloadPDF() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe( (res: any) => this.service.handleFile(res, 'report.pdf'));
  }


}

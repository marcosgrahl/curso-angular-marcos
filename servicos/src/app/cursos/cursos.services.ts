import { Injectable, EventEmitter } from "@angular/core";

// insetando o log.service dentro deste servico
import { LogService  } from "../shared/log.service" ;

@Injectable()

export class CursosService {

    emitirCursoCriado = new EventEmitter<string>();
    static criouNovoCurso = new EventEmitter<string>();
    
    private cursos: string[] = ['javascript','angular','htlm5','phonegap'];

    constructor(private logService: LogService) {
        console.log('Classe CursosService foi instanciada.')
    }

    getCursos() {
        this.logService.consoleLog('Obtendo a lista de cursos.')
        return this.cursos;
    }

    addCurso(curso: string){
        this.logService.consoleLog(`Adicionando curso: ${curso}`);
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }

}
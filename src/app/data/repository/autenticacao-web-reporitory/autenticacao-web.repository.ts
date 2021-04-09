import { SingleD1000ResponseModel } from '../../../core/utils/single-d1000-response-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, take, toArray } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/services/http/base-http.service';
import { environment } from 'src/environments/environment';
import { AutenticacaoModel } from 'src/app/core/domain/autenticacao.model';
import { AutenticacaoWebEntity } from './autenticacao-web-entity';
import { AutenticacaoWebRepositoryMapper } from './autenticacao-web-repository-mapper';
import { AutenticacaoRepository } from 'src/app/core/repositories/autenticacao.repository';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoWebRepository extends AutenticacaoRepository {
  mapper = new AutenticacaoWebRepositoryMapper();

  constructor(public http: BaseHttpService) {
    super();
  }

  postExpirarSenha(
    param: AutenticacaoModel
  ): Observable<SingleD1000ResponseModel<AutenticacaoModel>> {
    var request = this.http
      .post<SingleD1000ResponseModel<AutenticacaoWebEntity>>(
        `${environment.AUTORIZACAO}Autenticacao/expirar-senha`,
        this.mapper.mapTo(param)
      )
      .pipe(
        map((x) => {
          return this.mapper.responseWebMapFrom(x.data);
        })
      );

    return request;
  }

  postEsquecerSenha(
    param: AutenticacaoModel
  ): Observable<SingleD1000ResponseModel<AutenticacaoModel>> {
    var request = this.http
      .post<SingleD1000ResponseModel<AutenticacaoWebEntity>>(
        `${environment.CONTRATOVERBA}autenticacao/esquecer-senha`,
        this.mapper.mapTo(param)
      )
      .pipe(
        map((x) => {
          return this.mapper.responseWebMapFrom(x.data);
        })
      );

    return request;
  }
}

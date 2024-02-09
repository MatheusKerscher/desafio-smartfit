import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Units } from '../models/units.model';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { GymUnit } from '../models/gym-unit.model';

@Injectable({
  providedIn: 'root',
})
export class SmartfitGymsService {
  private URL =
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private header = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) {}

  getGyms(period: string, closedUnits: boolean): Observable<Units> {
    return this.http.get<Units>(this.URL, { headers: this.header }).pipe(
      map((result) => {
        let locations: GymUnit[] = [];
        result.locations?.forEach((l) =>
          l?.schedules?.forEach((s) => {
            if (this.canUse(period, s.hour)) {
              locations.push(l);
            }
          })
        );

        if (!closedUnits) {
          locations = locations.filter((l) => l.opened);
        }

        result.locations = locations;

        return result;
      })
    );
  }

  emitResult() {}

  private canUse(period: string, hour: string) {
    // Defina os períodos de funcionamento
    const horarios = hour?.split(' às ');
    const horarioAbertura = moment(`${horarios[0]?.split('h')[0]}:00`, 'HH:mm');
    const horarioFechamento = moment(
      `${horarios[1]?.split('h')[0]}:00`,
      'HH:mm'
    );

    // Defina o período de uso que você deseja verificar
    const periodo = period?.split(' às ');
    const periodoDeUsoInicio = moment(periodo[0]?.split('h')[0], 'HH:mm');
    const periodoDeUsoFim = moment(periodo[1]?.split('h')[0], 'HH:mm');

    // Verifique se o período de uso está dentro do período de funcionamento
    if (
      periodoDeUsoInicio.isSameOrAfter(horarioAbertura) &&
      periodoDeUsoInicio.isBefore(horarioFechamento) &&
      periodoDeUsoFim.isSameOrBefore(horarioFechamento)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

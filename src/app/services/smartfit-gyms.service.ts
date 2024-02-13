import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Units } from '../models/units.model';
import { Observable, Subject, map } from 'rxjs';
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

  resultGyms$: Subject<Units | null> = new Subject();

  constructor(private http: HttpClient) {}

  getGyms(period: string, closedUnits: boolean): Observable<Units> {
    return this.http.get<Units>(this.URL, { headers: this.header }).pipe(
      map((result) => {
        let locations: GymUnit[] = [];
        result.locations?.forEach((l) =>
          l?.schedules?.forEach((s) => {
            if (this.canUse(period, s.hour)) {
              if (locations.filter((g) => g.id == l.id).length == 0) {
                locations.push(l);
              }
            }
          })
        );

        if (!closedUnits) {
          locations = locations.filter((l) => l.opened);
        }

        result.locations = locations;

        this.emitResult(result);
        return result;
      })
    );
  }

  clearResults() {
    this.emitResult(null);
  }

  private emitResult(units: Units | null) {
    this.resultGyms$.next(units);
  }

  private canUse(period: string, hour: string) {
    // Defina os períodos de funcionamento
    const hours = hour?.split(' às ');
    const hourOpen = moment(`${hours[0]?.split('h')[0]}:00`, 'HH:mm');
    const hourClosed = moment(`${hours[1]?.split('h')[0]}:00`, 'HH:mm');

    // Defina o período de uso que você deseja verificar
    const periodo = period?.split(' às ');
    const periodoInicio = moment(periodo[0]?.split('h')[0], 'HH:mm');
    const periodoFim = moment(periodo[1]?.split('h')[0], 'HH:mm');

    // Verifique se o período de uso está dentro do período de funcionamento
    if (
      periodoInicio.isSameOrAfter(hourOpen) &&
      periodoInicio.isBefore(hourClosed) &&
      periodoFim.isSameOrBefore(hourClosed)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

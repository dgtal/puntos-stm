import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'distance'})
export class DistancePipe implements PipeTransform {
  transform(value: string, args?: any): number {
    let distance: number = Math.round(parseFloat(value) * 1000);
    return distance;
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: {}, ...args: unknown[]): string[] {
    return Object.keys(value).filter(field => isNaN(field as any));
  }

}

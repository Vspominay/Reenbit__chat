import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filterString: string, property: string): any {
        if (value) {
            if (value.length === 0 || filterString === '') {
                return value;
            }

            const filteredArray = [];

            for (const item of value) {
                if (item[property].match(new RegExp(filterString, 'i'))) {
                    filteredArray.push(item);
                }
            }
            return filteredArray;
        }
    }

}

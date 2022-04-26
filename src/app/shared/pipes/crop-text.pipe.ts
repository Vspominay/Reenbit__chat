import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cropText'
})
export class CropTextPipe implements PipeTransform {

    transform(value: string, limit: number = 20): string {
        const width = window.innerWidth;

        if (width >= 420) {
            limit = 40;
        }

        return value.length > limit ? value.substr(0, limit) + '...' : value;
    }

}

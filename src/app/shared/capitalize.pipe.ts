import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
    transform(text: string): string {
        let capitalized: string[] = [];
        let words = text.toLowerCase().trim().split(/[ -]/);
        
        for (let word of words) {
            if (word) {
                let value = word[0].toUpperCase() + word.slice(1);
                capitalized.push(value);
            }
        }

        return capitalized.join(' ').trim();
    }
}

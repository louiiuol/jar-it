import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleShortener' })
export class TitleShortenerPipe implements PipeTransform {

    transform = (text: string): string => (text.length > 15) ? (text.slice(0, 15)) + '...' : (text);

}

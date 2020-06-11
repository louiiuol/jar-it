import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'descriptionFormatter' })
export class DescriptionFormatterPipe implements PipeTransform {

    transform = (text: string): string => (text.length > 100) ? (text.slice(0, 100)) + ' ...' : (text);

}

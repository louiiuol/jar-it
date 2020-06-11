import { Component, Input } from '@angular/core';
import { JarDetails } from 'src/app/models';
import { JarService } from 'src/app/services/domain/jar/jar.service';

@Component({
    selector: 'app-jar-settings',
    templateUrl: './jar-settings.component.html',
    styleUrls: ['./jar-settings.component.scss']
})

export class JarSettingsComponent {

    @Input() remaining: number;

    @Input() user: number;

    @Input() jar: JarDetails;

    get confessions() { return this.service.countJarConfessions(this.jar); }

    constructor(private service: JarService) { }



}

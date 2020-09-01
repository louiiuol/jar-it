import { Component, Input } from '@angular/core';
import { UserView, JarView } from 'src/app/models';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';
import { JarState } from 'src/app/models/jar/jar-state.model';

@Component({
    selector: 'app-jar-preview',
    templateUrl: './jar-preview.component.html',
    styleUrls: ['./jar-preview.component.scss']
})

export class JarPreviewComponent {

    @Input() jar: JarView;

    get daysLeft(): number { return JarHelperService.remainingDays(this.jar.closingDate); }
    get jarState(): string { return this.jar.state.toString(); }
    get isOpenable(): boolean { return this.jar.additionalInfos.currentUserIsAdmin || this.jar.state.toString() !== 'CREATED'; }

    constructor() {}

}

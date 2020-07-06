import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { JarDetails } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { AuthService, FormFactory } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';

@Component({
    selector: 'app-jar-details',
    templateUrl: './jar-details.component.html',
    styleUrls: ['./jar-details.component.scss'],
    encapsulation: ViewEncapsulation.None // Styles propagate to the entire app
})
export class JarDetailsComponent implements OnInit {

    get remaining(): number { return JarHelperService.remainingDays(this.jar.closingDate); }
    get infos(): any { return { jar: this.jar, user: this.currentUserId }; }
    get isJarLoading(): boolean { return !!this.jar && !!this.jar.members; }
    get jarState(): string { return this.state; }
    get isJarAdmin(): boolean { return !!this.jar.members.find(el => el.userId === this.currentUserId)?.admin; }

    jar: JarDetails;
    private currentUserId: number;
    private state: string;

    constructor(private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
        this.jar = this.route.snapshot.data.jar;
        this.currentUserId = this.authService.currentUser.id;
        this.state = this.jar.state.toString();
    }

    setState(state: string): void {
        this.state = state;
    }

}

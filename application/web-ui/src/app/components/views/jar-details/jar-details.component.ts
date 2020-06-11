import { Component, OnInit } from '@angular/core';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { JarDetails } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-jar-details',
    templateUrl: './jar-details.component.html',
    styleUrls: ['./jar-details.component.scss']
})
export class JarDetailsComponent implements OnInit {

    get remaining(): number { return this.service.remainingDays(this.jar.closingDate); }
    get infos(): any { return { jar: this.jar, user: this.currentUserId }; }
    get isJarLoading(): boolean { return !!this.jar && !!this.jar.members; }
    get isCreated(): boolean { return this.state === 'CREATED'; }
    get isActive(): boolean { return this.state === 'ACTIVE'; }
    get isOver(): boolean { return this.state === 'MAX_AMOUNT_REACHED' || this.state === 'OUT_DATED'; }

    private jar: JarDetails;
    private currentUserId: number;
    private state: string;

    constructor(private route: ActivatedRoute, private service: JarService, private authService: AuthService) { }

    ngOnInit(): void {
        this.jar = this.route.snapshot.data.jar;
        this.currentUserId = this.authService.currentUser.id;
        this.state = this.jar.state.toString();
    }

    setState(state: string): void {
        this.state = state;
    }

}

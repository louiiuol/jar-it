import { Component, OnInit, Input } from '@angular/core';
import { UserView } from 'src/app/models';

@Component({
    selector: 'app-user-board',
    templateUrl: './user-board.component.html',
    styleUrls: ['./user-board.component.scss']
})
export class UserBoardComponent implements OnInit {

    @Input() user: UserView;

    constructor() { }

    ngOnInit(): void {
    }

}

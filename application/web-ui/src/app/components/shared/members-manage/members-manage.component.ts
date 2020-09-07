import { Component, ViewChild, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserView, MemberPreview } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({
    selector: 'app-members-manage',
    templateUrl: './members-manage.component.html',
    styleUrls: ['./members-manage.component.scss']
})
export class MembersManageComponent implements OnInit {

    @Output() membersEvent = new EventEmitter<MemberPreview[]>();

    @Input() currentUserId: number;
    @Input() author: UserView;
    @Input() memberList: MemberPreview[];
    @Input() update: boolean;

    @ViewChild('autoComplete', { static: false }) matAutocomplete: MatAutocomplete;
    @ViewChild('memberInput', {static: false}) memberInput: ElementRef<HTMLInputElement>;

    get isJarAuthor(): boolean { return this.currentUserId === this.author.id; }
    get isJarAdmin(): boolean { return this.memberList.find(current => current.userId === this.currentUserId).admin; }

    allUsers: UserView[];
    memberCtrl = new FormControl();
    filteredMembers: Observable<MemberPreview[]>;
    initialMembers: MemberPreview[];

    constructor(private snackBar: MatSnackBar, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe(data => this.allUsers = data);
        this.initialMembers = Array.from(this.memberList);
        this.filteredMembers = this.memberCtrl.valueChanges.pipe(
            startWith(this.allUsers),
            map((username: string | null) => this.filter(username)));
    }

    selectMember = (value: any): void => {
        let output = '';
        if (value.option) {
            if ((value.option.viewValue || '').trim()) {
                value = value.option.viewValue;
                if (!this.alreadyAdded(value) && this.memberExist(value, this.allUsers)) {
                    const selected: UserView = this.allUsers.find(element => element.username === value);
                    const memberSelected = new MemberPreview(selected.id, selected.username, selected.avatar, false);
                    this.memberList.push(memberSelected);
                    this.memberList.sort((current, next) => current.username.toLowerCase().localeCompare(next.username.toLowerCase()));
                    this.membersEvent.emit(this.memberList);
                    output = value + ' added with success !';
                } else if ( !this.memberExist(value, this.allUsers) ) {
                    output = value + ' doesn\'t exists, try again';
                } else if (this.alreadyAdded(value)) {
                    output = value + ' is already a member ';
                }
            } else {
                output = 'Invalid input, try again';
            }
        }
        if ('' !== output) {
            this.snackBar.open(output, 'close', { duration: 2000 });
        }
        this.memberInput.nativeElement.value = null;
    }

    removeMember(user: MemberPreview): void {
        const index = this.memberList.indexOf(user);
        if (index >= 0) {
            this.memberList.splice(index, 1);
            this.snackBar.open(user.username + ' was removed', 'close', { duration: 2000 });
        }
    }

    isRemovable = (memberChip: MemberPreview): boolean => memberChip.userId !== this.author.id &&
        ((this.wasAddedInSession(memberChip.userId) && this.isJarAdmin) || this.isJarAuthor)

    private wasAddedInSession = (id: number ): boolean => !this.initialMembers.find(current => current .userId === id);

    private filter = (value: string): MemberPreview[] => {
        if (value && value !== '') {
            return this.allUsers.filter(user =>
                user.username.toLowerCase().indexOf(value) === 0)
                    .map((user: UserView) =>
                        new MemberPreview(user.id, user.username, user.avatar, false)
            );
        }
        return this.allUsers.map((user: UserView) =>
            new MemberPreview(user.id, user.username, user.avatar, false)
        );
    }

    private alreadyAdded = (value: string): boolean => this.memberList.some(member => member.username === value);

    private memberExist = (value: string, all: MemberPreview[] | UserView[]): boolean => all.some( member => member.username === value);

}

import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserView } from 'src/app/models/user/view/user-view.model';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MemberDetails } from 'src/app/models';

@Component({
    selector: 'app-members-update',
    templateUrl: './members-update.component.html',
    styleUrls: ['./members-update.component.scss']
})
export class MembersUpdateComponent implements OnInit {

    @Output() membersEvent = new EventEmitter<MemberDetails[]>();

    get startingList(): MemberDetails[] { return this.memberList; }
    get isJarAuthor(): boolean { return this.currentUserId === this.author.id; }

    @Input() currentUserId: number;
    @Input() author: UserView;
    @Input() memberList: MemberDetails[];
    @Input() allUsers: UserView[];

    @ViewChild('memberInput', {static: false}) memberInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

    memberCtrl = new FormControl();
    filteredMembers: Observable<MemberDetails[]>;
    initialMembers: MemberDetails[];
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(private snackBar: MatSnackBar) {
        this.filteredMembers = this.memberCtrl.valueChanges.pipe(
            startWith(this.allUsers),
            map((username: string | null) => this.filter(username)));
    }

    ngOnInit(): void {
        console.log('init')
        this.initialMembers = Array.from(this.memberList);
    }

    removeMember(user: any): void {
        const index = this.memberList.indexOf(user);
        if (index >= 0) {
            this.memberList.splice(index, 1);
        }
    }

    displayAutoComplete(): void {
        this.memberInput.nativeElement.focus();
        this.matAutocomplete.displayWith(this.filteredMembers);
        this.memberCtrl.markAsTouched();
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        console.log(this.memberList)
        this.handleMemberInput(event);
    }

    displayFn(member: any): any {
        return member;
    }

    isRemovable = (memberChip: MemberDetails) =>
        (memberChip.userId !== this.author.id && this.currentUserId === this.author.id) || this.wasAddedInSession(memberChip.id)

    isJarAdmin = (id: number): boolean => this.memberList.find(current => current .userId === id).admin;

    wasAddedInSession = (id: number ): boolean => !this.initialMembers.find(current => current .userId === id);

    private handleMemberInput = (value: any): void => {
        let output = '';
        if (!!value.option) {
            if ((value.option.viewValue || '').trim()) {
                value = value.option.viewValue;
                if (!this.alreadyAdded(value, this.memberList) && this.memberExist(value, this.allUsers)) {
                    const selected: UserView = this.allUsers.find(element => element.username === value);
                    const memberSelected = new MemberDetails(selected.id, selected.username, selected.avatar, false);
                    this.memberList.push(memberSelected);
                    this.sendMembers();
                } else if ( !this.memberExist(value, this.allUsers) ) {
                    output = value + ' doesn\'t exists, try again';
                } else if (this.alreadyAdded(value, this.memberList)) {
                    output = value + ' is already a member ';
                }
            } else {
                output = 'Invalid input, try again';
            }
        }
        if ('' !== output) {this.snackBar.open(output, 'close' , {duration: 5000}); }
        this.memberInput.nativeElement.value = '';
        this.memberCtrl.setValue(null);
    }

    sendMembers(): void {
        this.membersEvent.emit(this.memberList);
    }

    resetMembers = (): MemberDetails[] => this.memberList = Array.from(this.initialMembers);

    updateMembers = () => console.log('coming');

    membersListChanged = (): boolean => {
        let changed = false;
        const lenghtChanged = this.memberList.length !== this.initialMembers.length;
        if (lenghtChanged) {
            return true;
        } else {
            this.memberList.sort((current, next) => current.id - next.id);
            this.initialMembers.sort((current, next) => current.id - next.id);
            for (let member of this.memberList) {
                // const index = member.indexOf()
            }
        }

        return false;
    }

    private filter = (value: string): MemberDetails[] => {
        if (!!value && value !== '') {
            return this.allUsers.filter(user =>
                user.username.toLowerCase().indexOf(value) === 0)
                    .map((user: UserView) =>
                        new MemberDetails(user.id, user.username, user.avatar, false)
            );
        }
        return this.allUsers.map((user: UserView) =>
            new MemberDetails(user.id, user.username, user.avatar, false)
        );
    }

    private alreadyAdded = (value: any, memberList: any[]): boolean => this.memberList.some( member => member.username === value)
        || memberList.some( member => member.username === value)

    private memberExist = (value: any, all: any[]): boolean => all.some( member => member.username === value);

}

import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-avatar-picker',
    templateUrl: './avatar-picker.component.html',
    styleUrls: ['./avatar-picker.component.scss']
})
export class AvatarPickerComponent {

    @Output() readonly picked = new EventEmitter<string>();

    @Input() readonly current: string;
    @Input() readonly size: string;

    get avatarsList() { return this.generateAvatars(); }

    constructor() { }

    select(avatar: string) {
        this.picked.emit(avatar);
    }

    private generateAvatars(): string[] {
        const avatarList: string[] = ['unknown'];
        for (let i = 1; i < 18; i++) { avatarList.push(`m${i}`, `g${i}`); }
        return avatarList;
    }

}

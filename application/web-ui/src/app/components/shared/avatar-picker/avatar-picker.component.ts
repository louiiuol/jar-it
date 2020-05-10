import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss']
})
export class AvatarPickerComponent {

  @Input() readonly current: string;
  @Input() readonly size: string;
  @Output() readonly picked = new EventEmitter<string>();

  get avatarsList() { return this.generateAvatars(); }

  constructor() { }

  select(avatar: string) {
    this.picked.emit(avatar);
  }

  private generateAvatars(): string[] {
    const avatarList: string[] = ['unknown'];
    for (let i = 1; i < 19; i++) { avatarList.push(`m${i}`, `g${i}`); }
    return avatarList;
  }

}

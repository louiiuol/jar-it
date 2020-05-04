import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss']
})
export class AvatarPickerComponent {

  @Input() current: string;
  @Output() picked = new EventEmitter<string>();

  constructor() { }

  get avatarsList() { return this.generateAvatars(); }

  select(avatar: string) {
    this.picked.emit(avatar);
  }

  private generateAvatars(): string[] {
    const avatarList: string[] = [];
    avatarList.push('unknown');
    for (let i = 1; i < 19; i++) { avatarList.push('m' + i, 'g' + i); }
    return avatarList;
  }

}

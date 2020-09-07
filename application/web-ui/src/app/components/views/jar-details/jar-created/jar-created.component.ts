import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ErrorMessages, Patterns } from 'src/app/services/forms/utils';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { FormFactory } from 'src/app/services';
import { AssociationService } from 'src/app/services/domain/association/association.service';
import { JarDetails, MemberDetails, AssociationView, JarUpdate, MemberPreview } from 'src/app/models';
import { JarForm } from 'src/app/services/forms/groups';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';
import { MemberService } from 'src/app/services/domain/jar/member/member.service';

@Component({
    selector: 'app-jar-created',
    templateUrl: './jar-created.component.html',
    styleUrls: ['./jar-created.component.scss']
})
export class JarCreatedComponent implements OnInit {

    get title(): AbstractControl { return this.jarGeneralForm.get('title'); }
    get description(): AbstractControl { return this.jarGeneralForm.get('description'); }
    get maxAmount(): AbstractControl { return this.jarSettingsForm.get('maxAmount'); }
    get referenceCost(): AbstractControl { return this.jarSettingsForm.get('referenceCost'); }
    get closingDate(): AbstractControl { return this.jarSettingsForm.get('closingDate'); }
    get addressee(): AbstractControl { return this.jarSettingsForm.get('addressee'); }
    get isJarMember(): boolean { return !!this.jar.members.find(el => el.userId === this.currentUserId); }
    get isJarAdmin(): boolean { return !!this.jar.members.find(el => el.userId === this.currentUserId)?.admin; }
    get isJarAuthor(): boolean { return this.jar.author.id === this.currentUserId; }

    @Input() infos: any;
    @Output() private readonly activeEvent = new EventEmitter<string>();

    jar: JarDetails;
    currentUserId: number;
    associations: AssociationView[];
    members: MemberPreview[];
    initialMembers: MemberPreview[];

    jarSettingsForm: FormGroup;
    jarGeneralForm: FormGroup;

    readonly errorMessages = ErrorMessages.jar;
    readonly patterns = Patterns;
    private readonly destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once

    constructor(
        private jarService: JarService, private forms: FormFactory,
        private memberService: MemberService, private associationService: AssociationService) { }

    ngOnInit(): void {
        this.associationService.getAll('id', 'asc', 0, 50).pipe(takeUntil(this.destroyed$))
            .subscribe(data => this.associations = data.items);
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.members = this.infos.jar.members;
        this.initialMembers = Array.from(this.members);
        this.buildForms();
    }

    resetSettings() {
        this.jarGeneralForm.reset({ title: this.jar.title, description: this.jar.description });
        this.jarSettingsForm.reset({
            maxAmount: this.jar.maxAmount,
            referenceCost: this.jar.referenceCost,
            addressee: this.jar.addressee.id,
            closingDate: this.jar.closingDate
        });
    }

    membersListChanged = (): boolean => {
        let changed = false;
        if (this.members.length === this.initialMembers.length) {
            this.members.sort((current, next) => current.username.toLowerCase().localeCompare(next.username.toLowerCase()));
            this.initialMembers.sort((current, next) => current.username.toLowerCase().localeCompare(next.username.toLowerCase()));
            for (const member of this.members) {
                const memberToCompare = this.initialMembers[this.members.indexOf(member)];
                if (memberToCompare.username !== member.username) {
                    changed = true;
                }
            }
        } else {
            changed = true;
        }
        return changed;
    }

    setMembers = (event: MemberDetails[]): MemberDetails[] => this.members = event;

    remainingDays = (): number => JarHelperService.remainingDays(this.closingDate.value);

    confessionsAvailables = (): string => Math.abs(this.maxAmount.value / this.referenceCost.value).toFixed(0);

    resetMembers = (): MemberPreview[] => this.members = Array.from(this.initialMembers);

    validForm = (): boolean => (this.jarGeneralForm.valid && this.jarSettingsForm.valid) && this.informationsChanged();

    activateJar(): void {
        this.forms.confirmationStep('Are you sure you want to activate this jar ? \n You won\'t be able to add new members nor changes settings !')
            .subscribe(confirm => {
                if (!!confirm) {
                    this.jarService.activate(this.jar.id).subscribe(() => this.activeEvent.emit('ACTIVE'));
                }
        });
    }

    updateSettings = (): Subscription => this.jarService.update(this.getUpdatedFields())
        .subscribe(() => {
            this.updateFields();
            this.forms.handleSuccessMessages('Jar updated with Success !');
        }, err => this.forms.handleErrorMessages(err))

    updateMembers = (): void => {
        const toUpdate: number[] = this.members.map(member => member.userId);
        this.memberService.updateMembers(this.jar.id, toUpdate)
            .subscribe(() => {
                this.initialMembers = Array.from(this.members);
                this.forms.handleSuccessMessages('Members updated with success !');
            });
    }

    private getUpdatedFields(): JarUpdate {
        const updated = new JarUpdate(this.jar.id);
        if (this.title.value !== this.jar.title) { updated.title = this.title.value; }
        if (this.description.value !== this.jar.description) { updated.description = this.description.value; }
        if (this.maxAmount.value !== this.jar.maxAmount) { updated.maxAmount = this.maxAmount.value; }
        if (this.referenceCost.value !== this.jar.referenceCost) { updated.referenceCost = this.referenceCost.value; }
        if (this.addressee.value !== this.jar.addressee.id) { updated.addressee = this.addressee.value; }
        if (this.closingDate.value !== this.jar.closingDate) {
            const closingDate = this.closingDate.value;
            updated.closingDate = closingDate.getFullYear() + '-'
                + (closingDate.getMonth() + 1).toString().padStart(2, '0') + '-'
                + closingDate.getDate().toString().padStart(2, '0');
        }
        return updated;
    }

    private buildForms(): void {
        this.jarGeneralForm = this.forms.builder().group({
            title: JarForm.title,
            description: JarForm.description
        });
        this.jarSettingsForm = this.forms.builder().group({
            maxAmount: JarForm.maxAmount,
            referenceCost: JarForm.referenceCost,
            addressee: JarForm.addressee,
            closingDate: JarForm.closingDate
        });
        this.resetSettings();
    }

    private informationsChanged = (): boolean => this.title.value !== this.jar.title
        || this.description.value !== this.jar.description || this.maxAmount.value !== this.jar.maxAmount
        || this.referenceCost.value !== this.jar.referenceCost || this.closingDate.value !== this.jar.closingDate
        || this.addressee.value !== this.jar.addressee.id

    private updateFields(): void {
        const updated = this.getUpdatedFields();
        if (!!updated.addressee) {
            this.jar.addressee.id = updated.addressee;
        }
        if (!!updated.title) {
            this.jar.title = updated.title;
        }
        if (!!updated.closingDate) {
            this.jar.closingDate = new Date(updated.closingDate);
        }
        if (!!updated.description) {
            this.jar.description = updated.description;
        }
        if (!!updated.maxAmount) {
            this.jar.maxAmount = updated.maxAmount;
        }
        if (!!updated.referenceCost) {
            this.jar.referenceCost = updated.referenceCost;
        }
        this.resetSettings();
    }

}

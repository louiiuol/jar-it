import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ErrorMessages, Patterns } from 'src/app/services/forms/utils';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { FormFactory, UserService } from 'src/app/services';
import { AssociationService } from 'src/app/services/domain/association/association.service';
import { JarDetails, UserView, MemberDetails, AssociationView, JarUpdate } from 'src/app/models';
import { JarForm } from 'src/app/services/forms/groups';

@Component({
    selector: 'app-jar-created',
    templateUrl: './jar-created.component.html',
    styleUrls: ['./jar-created.component.scss']
})
export class JarCreatedComponent implements OnInit {

    get title() { return this.jarGeneralForm.get('title'); }
    get description() { return this.jarGeneralForm.get('description'); }
    get maxAmount() { return this.jarSettingsForm.get('maxAmount'); }
    get referenceCost() { return this.jarSettingsForm.get('referenceCost'); }
    get closingDate() { return this.jarSettingsForm.get('closingDate'); }
    get addressee() { return this.jarSettingsForm.get('addressee'); }
    get isJarMember(): boolean { return !!this.jar.members.find(el => el.userId === this.currentUserId); }
    get isJarAdmin(): boolean { return !!this.jar.members.find(el => el.userId === this.currentUserId)?.admin; }
    get isJarAuthor(): boolean { return this.jar.author.userId === this.currentUserId; }

    @Input() infos: any;
    @Output() private readonly activeEvent = new EventEmitter<string>();


    jar: JarDetails;
    currentUserId: number;
    associations: AssociationView[];
    members: MemberDetails[];
    startingMembers: MemberDetails[];
    allUsers: UserView[];

    readonly errorMessages = ErrorMessages.jar;
    readonly patterns = Patterns;
    jarSettingsForm: FormGroup;
    jarGeneralForm: FormGroup;
    jarMembersForm: FormGroup;
    memberCtrl = new FormControl();

    private readonly destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once

    constructor(
        private jarService: JarService, private forms: FormFactory, private router: Router,
        private userService: UserService, private associationService: AssociationService) { }

    ngOnInit(): void {
        this.userService.getAllUsers().pipe(takeUntil(this.destroyed$))
            .subscribe(data => this.allUsers = data);
        this.associationService.getAll('id', 'asc', 0, 50).pipe(takeUntil(this.destroyed$))
            .subscribe(data => this.associations = data.items);
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.members = this.infos.jar.members;
        this.startingMembers = this.infos.jar.members;
        this.buildForms();
    }

    reset() {
        this.jarGeneralForm.reset({ title: this.jar.title, description: this.jar.description });
        this.jarSettingsForm.reset({
            maxAmount: this.jar.maxAmount,
            referenceCost: this.jar.referenceCost,
            addressee: this.jar.addressee.id,
            closingDate: this.jar.closingDate
        });
        this.members = this.jar.members;
    }

    setMembers = (event: MemberDetails[]): MemberDetails[] => this.members = event;

    remainingDays = () => this.jarService.remainingDays(this.closingDate.value);

    confessionsAvailables = () => Math.abs(this.maxAmount.value / this.referenceCost.value);

    membersListChanged = (): boolean => this.startingMembers !== this.infos.jar.members;

    updateMembers = () => console.log('coming');

    validForm = (): boolean => (this.jarGeneralForm.valid && this.jarSettingsForm.valid)
        && this.informationsChanged()

    activateJar(): void {
        this.forms.confirmationStep('Are you sure you want to activate this jar ? You won\'t be able to add new members nor changes settings !').pipe(takeUntil(this.destroyed$))
            .subscribe(confirm => {
                if (!!confirm) {
                    this.jarService.activate(this.jar.id).pipe(takeUntil(this.destroyed$))
                        .subscribe(() => this.activeEvent.emit('ACTIVE'));
                }
        });
    }

    updateSettings = () => this.jarService.update(this.getUpdatedFields())
        .subscribe(() => {
            this.updateFields();
            this.forms.handleSuccessMessages('Jar updated with Success !');
        }, err => this.forms.handleErrorMessages(err))

    private getUpdatedFields(): JarUpdate {
        const updated = new JarUpdate(this.jar.id);
        if (this.title.value !== this.jar.title) { updated.title = this.title.value; }
        if (this.description.value !== this.jar.description) { updated.description = this.description.value; }
        if (this.maxAmount.value !== this.jar.maxAmount) { updated.maxAmount = this.maxAmount.value; }
        if (this.referenceCost.value !== this.jar.referenceCost) { updated.referenceCost = this.referenceCost.value; }
        if (this.addressee.value !== this.jar.addressee.id) { updated.addressee = this.addressee.value; }
        if (this.closingDate.value !== this.jar.closingDate) { updated.closingDate = this.closingDate.value; }
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
        this.reset();
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
            this.jar.closingDate = updated.closingDate;
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
        this.reset();
    }

}

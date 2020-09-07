import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { AssociationService } from 'src/app/services/domain/association/association.service';
import { FormFactory } from 'src/app/services';
import { UserView, MemberDetails, JarCreate, MemberCreate } from 'src/app/models';
import { ErrorMessages, Patterns } from 'src/app/services/forms/utils';
import { JarForm } from 'src/app/services/forms/groups';
import { JarCreateData } from 'src/app/models/utils/dialog/jar-create-data.dialog';

@Component({
    selector: 'app-jar-create',
    templateUrl: './jar-create.component.html',
    styleUrls: ['./jar-create.component.scss']
})
export class JarCreateComponent implements OnInit {

    @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

    get title() { return this.jarGeneralForm.get('title'); }
    get description() { return this.jarGeneralForm.get('description'); }
    get maxAmount() { return this.jarSettingsForm.get('maxAmount'); }
    get referenceCost() { return this.jarSettingsForm.get('referenceCost'); }
    get closingDate() { return this.jarSettingsForm.get('closingDate'); }
    get addressee() { return this.jarSettingsForm.get('addressee'); }

    jarGeneralForm: FormGroup;
    jarSettingsForm: FormGroup;
    jarMembersForm: FormGroup;
    memberCtrl = new FormControl();
    confirmCtrl = new FormControl(false, Validators.required);

    readonly errorMessages = ErrorMessages.jar;
    readonly patterns = Patterns;

    author: UserView;
    loading = false;

    members: MemberDetails[] = [];
    associations = [];

    private readonly destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once

    constructor(
        private jarService: JarService, private forms: FormFactory,
        private dialogRef: MatDialogRef<JarCreateComponent>,
        private associationService: AssociationService,
        @Inject(MAT_DIALOG_DATA) private data: JarCreateData) {}

    ngOnInit() {
        this.data.created = false;
        this.author = this.data.author;
        this.associationService.getAll('id', 'asc', 0, 50).pipe(takeUntil(this.destroyed$))
            .subscribe(data => this.associations = data.items);
        this.buildForms();
        this.members.push(new MemberDetails(this.author.id, this.author.username, this.author.avatar, true));
    }

    createJar(): void {
        console.log(this.jarInfos());
        this.jarService.create(this.jarInfos()).pipe(takeUntil(this.destroyed$))
            .subscribe((id) => {
                this.data.id = id;
                this.data.created = true;
                this.forms.handleSuccessMessages('Jar created with Success !');
                this.dialogRef.close(this.data);
            }, err => this.forms.handleErrorMessages(err));
    }

    close(): void {
        this.jarGeneralForm.reset();
        this.jarSettingsForm.reset();
        this.dialogRef.close(false);
    }

    setMembers = (event: MemberDetails[]): MemberDetails[] => this.members = event;

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
    }

    private jarInfos = () => new JarCreate(this.title.value, this.maxAmount.value,
        this.closingDate.value, this.addressee.value.id, this.mapMembers(this.members),
        this.author.id, this.referenceCost.value, this.description.value)

    private mapMembers = (members: MemberDetails[]): MemberCreate[] => {
        const result = [];
        for (const member of members) {
            result.push(new MemberCreate(member.userId, member.admin));
        }
        return result;
    }
}

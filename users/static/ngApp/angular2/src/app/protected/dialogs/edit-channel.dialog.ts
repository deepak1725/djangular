import {
    Component, ViewEncapsulation,
    AfterViewInit, Inject
} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'edit-dialog',
    templateUrl: './edit-channel.dialog.html'
})
export class EditChannelDialog {
    channelName: string;
    isPrivate: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<EditChannelDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
import {
    Component, ViewEncapsulation,
    AfterViewInit, Inject
} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-dialog',
    templateUrl: './add-channel.dialog.html'
})
export class AddChannelDialog {

    constructor(
        public dialogRef: MatDialogRef<AddChannelDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
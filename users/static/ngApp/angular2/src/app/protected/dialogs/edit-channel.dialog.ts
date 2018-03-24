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
    myData:any

    constructor(
        public dialogRef: MatDialogRef<EditChannelDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
        this.myData = data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
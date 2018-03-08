import {Component, Inject, style } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'online-friends-dialog',
    templateUrl: './online-friends.dialog.html',
    styleUrls: ['./online-friends.css']
})
export class OnlineFriendsDialog {

    constructor(
        public dialogRef: MatDialogRef<OnlineFriendsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    // onNoClick(): void {
    //     this.dialogRef.close();
    // }

}
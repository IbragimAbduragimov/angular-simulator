import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Button],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  postEditForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.postEditForm.patchValue(this.dynamicDialogConfig.data.post);
  }

  onSubmit(): void {
    this.ref.close(this.postEditForm.getRawValue());
  }

  close(): void {
    this.ref.close();
  }
}

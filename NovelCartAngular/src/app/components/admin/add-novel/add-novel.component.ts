import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';

@Component({
  selector: 'app-add-novel',
  templateUrl: './add-novel.component.html',
  styleUrl: './add-novel.component.css'
})
export class AddNovelComponent implements OnInit, OnDestroy {
  private formData = new FormData();
  novelForm: FormGroup;
  formTitle = 'Add';
  novelId: any;
  coverFile = '';
  categoryList = this.novelService.categories$;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private novelService: NovelService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.novelForm = this.fb.group({
      novelId: 0,
      title: ['', Validators.required],
      author: ['', Validators.required],
      categoryId: [0, Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      coverFile: ['', Validators.required],
    });
  }

  protected get novelFormControl() {
    return this.novelForm.controls;
  }

  ngOnInit(): void{
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      if (params['id']) {
        this.novelId = +params['id'];
        this.fetchNovelData();
      }
    });
  }

  onFormSubmit(): void{
    if (!this.novelForm.valid) {
      return;
    }
    this.formData.append("novelFormData", JSON.stringify(this.novelForm.value));
    console.log(this.formData.get("novelFormData"));
    if (this.novelId) {
      this.editNovelDetails();
    } else {
      this.saveNovelDetails();
    }
  }

  addImage(event:any){
    this.coverFile = event.target.value;
  }

  navigateToAdminPanel() {
    this.router.navigate(['/adminpanel']);
  }

  private fetchNovelData() {
    this.formTitle = 'Edit';
    this.novelService
      .getNovelById(this.novelId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result: Novel) => {
          // console.log(result);
          this.setNovelFormData(result);
        },
        error: (error) => {
          console.log('Error ocurred while fetching novel data : ', error);
        },
      });
  }

  private editNovelDetails() {
    this.novelService
      .updateNovelDetails(this.formData.get("novelFormData"))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.snackbar.open('The novel data is updated successfully.');
          this.navigateToAdminPanel();
        },
        error: (error) => {
          // console.log(JSON.stringify(Object.fromEntries(this.formData)))
          console.log('Error ocurred while updating novel data : ', error);
        },
      });
  }

  private saveNovelDetails() {
    this.novelService
      .addNovel(this.formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.snackbar.open('The novel data is added successfully.');
          this.navigateToAdminPanel();
        },
        error: (error) => {
          this.snackbar.open('Error ocurred while adding novel data.');
          this.novelForm.reset();
          console.log('Error ocurred while adding novel data : ', error);
        },
      });
  }

  private setNovelFormData(novelFormData: Novel ) {
    this.novelForm.setValue({
      novelId: novelFormData.novelId,
      title: novelFormData.title,
      author: novelFormData.author,
      categoryId: novelFormData.categoryId,
      price: novelFormData.price,
      coverFile: novelFormData.coverFile
    });
    this.coverFile = novelFormData.coverFile;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

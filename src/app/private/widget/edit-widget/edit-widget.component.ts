import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ExpandedAccordion, IWidget } from 'src/app/shared/models';
import * as WidgetActions from '../store/widget.actions';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.scss'],
})
export class EditWidgetComponent implements OnInit, OnChanges, OnDestroy {
  @Input() widget: IWidget | null = null;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<IWidget>();

  form: FormGroup = this.generateEditForm();
  headersFormArray: FormArray = new FormArray([]);
  expandedAccordion: ExpandedAccordion | null = ExpandedAccordion.Data;

  readonly ExpandedAccordion = ExpandedAccordion;

  get controls() {
    return this.form.controls as Record<
      keyof Omit<IWidget, 'headers' | 'author'>,
      FormControl
    >;
  }

  get arrayControls(): FormGroup[] {
    return this.headersFormArray.controls as FormGroup[];
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pushArrayItem();
  }

  ngOnChanges(): void {
    if (this.widget) {
      this.form.patchValue(this.widget);
      this.form.markAsPristine();
    }
  }

  ngOnDestroy() {
    this.store.dispatch(WidgetActions.resetWidget());
  }

  getControls(arrayControl: FormGroup, attribute: string): FormControl {
    return arrayControl.get(attribute) as FormControl;
  }

  onSubmit(): void {
    const widgetData: IWidget = {
      ...this.form.getRawValue(),
      headers: this.getMappedHeaders(),
    };

    this.update.emit(widgetData);
  }

  pushArrayItem(): void {
    this.headersFormArray.push(this.getHeaderArrayItem());
  }

  popArrayItem(index: number): void {
    this.headersFormArray.removeAt(index);
  }

  toggleAccordion(type: ExpandedAccordion) {
    this.expandedAccordion = this.expandedAccordion === type ? null : type;
  }

  private getMappedHeaders(): { [key: string]: string }[] {
    let mappedHeaders: { [key: string]: string }[] = [];
    this.headersFormArray.controls
      .filter(
        (control) =>
          !!this.getControls(control as FormGroup, 'key').value &&
          !!this.getControls(control as FormGroup, 'value').value
      )
      .forEach((control) => {
        mappedHeaders.push({
          [this.getControls(control as FormGroup, 'key').value]:
            this.getControls(control as FormGroup, 'value').value,
        });
      });

    return mappedHeaders;
  }

  private getHeaderArrayItem(): FormGroup {
    return new FormGroup({
      key: new FormControl(null),
      value: new FormControl(null),
    });
  }

  private generateEditForm(): FormGroup {
    const controls: Record<
      keyof Omit<IWidget, 'headers' | 'author'>,
      FormControl
    > = {
      id: new FormControl(null),
      isPublic: new FormControl(true),
      key: new FormControl(null, Validators.required),
      takeFromStart: new FormControl(true),
      url: new FormControl(null, Validators.required),
      method: new FormControl('GET', Validators.required),
      customAttribute: new FormControl(null),
      customValue: new FormControl(null),
      customLabel: new FormControl(null),
      customMin: new FormControl(null),
      customMax: new FormControl(null),
      widgetType: new FormControl('bar'),
      customPrimaryColor: new FormControl(null),
      customSecondaryColor: new FormControl(null),
      customNegativePrimaryColor: new FormControl(null),
      customNegativeSecondaryColor: new FormControl(null),
      markNegativeDifferently: new FormControl(true),
      showLabels: new FormControl(false),
      showPeriods: new FormControl(true),
      customLegend: new FormControl(null),
      showYGrid: new FormControl(false),
      showXGrid: new FormControl(false),
      markFirst: new FormControl(false),
      markLast: new FormControl(true),
      title: new FormControl(null),
      maxItems: new FormControl(null),
    };

    return new FormGroup(controls);
  }
}

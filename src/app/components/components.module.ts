import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { LegendComponent } from './legend/legend.component';
import { ListComponent } from './list/list.component';
import { FooterComponent } from './footer/footer.component';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormComponent,
    LegendComponent,
    ListComponent,
    FooterComponent,
    CardListComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FormComponent,
    LegendComponent,
    ListComponent,
    FooterComponent,
  ],
})
export class ComponentsModule {}

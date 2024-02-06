import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { LegendComponent } from './legend/legend.component';
import { ListComponent } from './list/list.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormComponent,
    LegendComponent,
    ListComponent,
    FooterComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FormComponent,
    LegendComponent,
    ListComponent,
    FooterComponent,
  ],
})
export class ComponentsModule {}

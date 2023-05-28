import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportMainComponent } from './components/report-main/report-main.component';
import { ReportRoutingModule } from './reports-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { ReportSpecificComponent } from './components/report-specific/report-specific.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReportHttpService } from './services/report-http.service';
import { ReportService } from './services/report.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ReportMainComponent,
    ReportCardComponent,
    ReportEditComponent,
    ReportSpecificComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [ReportHttpService, ReportService],
})
export class ReportsModule {}

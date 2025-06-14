import { Component, inject, OnDestroy } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DataService } from '../../core/data/data.service';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, RouterOutlet, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
  dataService = inject(DataService);

  ngOnDestroy() {
    this.dataService.unsub();
  }
}

import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-popular-programs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './popular-programs.component.html',
  styleUrls: ['./popular-programs.component.scss']
})
export class PopularProgramsComponent {
}

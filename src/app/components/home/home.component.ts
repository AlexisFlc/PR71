import {Component, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';
import {HeroComponent} from './hero/hero.component';
import {PartnersComponent} from './partners/partners.component';
import {FeaturesComponent} from './features/features.component';
import {HowItWorksComponent} from './how-it-works/how-it-works.component';
import {PopularProgramsComponent} from './popular-programs/popular-programs.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {BlogComponent} from './blog/blog.component';
import {FAQComponent} from './faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    PartnersComponent,
    FeaturesComponent,
    HowItWorksComponent,
    PopularProgramsComponent,
    TestimonialsComponent,
    CalculatorComponent,
    BlogComponent,
    FAQComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
  }
}

import {Component, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initAccordion();
  }

  initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-header.active');
        const currentContent = currentlyActive?.nextElementSibling as HTMLElement;

        if (currentlyActive && currentlyActive !== header) {
          currentlyActive.classList.remove('active');
          currentContent.classList.remove('open');
        }
        header.classList.toggle('active');
        const content = header.nextElementSibling as HTMLElement;
        content.classList.toggle('open');
      });
    });
  }
}

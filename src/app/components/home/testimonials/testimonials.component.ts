import {Component, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initSlider();
  }

  initSlider() {
    const indicators = document.querySelectorAll('.testimonials-indicators .indicator');
    const slides = document.querySelectorAll('.transformation-slide');

    if (!indicators.length || !slides.length) return;

    let currentSlide = 0;
    const showSlide = (index: number) => {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      currentSlide = index;
    };

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => showSlide(index));
    });

    setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 5000);
  }
}

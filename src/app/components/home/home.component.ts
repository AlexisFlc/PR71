import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Initialiser toutes les fonctionnalités interactives après le chargement du DOM
    this.initAccordion();
    this.initCalculators();
    this.initTestimonialSlider();
    this.initProgramFilters();
  }

  // Initialisation de l'accordéon FAQ
  initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        // Fermer tous les autres accordéons
        const currentlyActive = document.querySelector('.accordion-header.active');
        const currentContent = currentlyActive?.nextElementSibling as HTMLElement;

        if (currentlyActive && currentlyActive !== header) {
          currentlyActive.classList.remove('active');
          currentContent.classList.remove('open');
        }

        // Toggle l'état actuel
        header.classList.toggle('active');
        const content = header.nextElementSibling as HTMLElement;
        content.classList.toggle('open');
      });
    });
  }

  // Initialisation des calculateurs (IMC et macros)
  initCalculators() {
    // Gestion des onglets du calculateur
    const tabBtns = document.querySelectorAll('.tab-btn');
    const calculatorTabs = document.querySelectorAll('.calculator-tab');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Activer le bouton d'onglet
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Afficher l'onglet correspondant
        calculatorTabs.forEach(tab => {
          tab.classList.remove('active');
          if (tab.id === `${targetTab}-calculator`) {
            tab.classList.add('active');
          }
        });
      });
    });

    // Calculateur IMC
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const bmiResult = document.getElementById('bmi-result');

    if (calculateBmiBtn && bmiResult) {
      calculateBmiBtn.addEventListener('click', () => {
        const heightInput = document.getElementById('bmi-height') as HTMLInputElement;
        const weightInput = document.getElementById('bmi-weight') as HTMLInputElement;

        if (!heightInput || !weightInput) return;

        const height = parseFloat(heightInput.value) / 100; // cm to m
        const weight = parseFloat(weightInput.value);

        if (!height || !weight || height <= 0 || weight <= 0) {
          alert('Veuillez entrer des valeurs valides');
          return;
        }

        // Calcul IMC
        const bmi = weight / (height * height);
        const roundedBmi = Math.round(bmi * 10) / 10;

        // Définir la catégorie
        let category = '';
        let position = 0;

        if (bmi < 18.5) {
          category = 'Maigreur';
          position = (bmi / 18.5) * 25; // 0-25% de la barre
        } else if (bmi < 25) {
          category = 'Poids normal';
          position = 25 + ((bmi - 18.5) / 6.5) * 25; // 25-50% de la barre
        } else if (bmi < 30) {
          category = 'Surpoids';
          position = 50 + ((bmi - 25) / 5) * 25; // 50-75% de la barre
        } else {
          category = 'Obésité';
          position = 75 + Math.min(((bmi - 30) / 10) * 25, 25); // 75-100% de la barre, max à 100%
        }

        // Afficher les résultats
        const resultValue = bmiResult.querySelector('.result-value') as HTMLElement;
        const resultCategory = bmiResult.querySelector('.result-category') as HTMLElement;
        const bmiIndicator = bmiResult.querySelector('.bmi-scale-indicator') as HTMLElement;

        if (resultValue) resultValue.textContent = `${roundedBmi}`;
        if (resultCategory) resultCategory.textContent = category;
        if (bmiIndicator) bmiIndicator.style.left = `${position}%`;

        // Afficher les résultats
        bmiResult.style.display = 'block';
      });
    }

    // Calculateur Macros
    const calculateMacrosBtn = document.getElementById('calculate-macros');
    const macrosResult = document.getElementById('macros-result');

    if (calculateMacrosBtn && macrosResult) {
      calculateMacrosBtn.addEventListener('click', () => {
        const ageInput = document.getElementById('macro-age') as HTMLInputElement;
        const genderSelect = document.getElementById('macro-gender') as HTMLSelectElement;
        const heightInput = document.getElementById('macro-height') as HTMLInputElement;
        const weightInput = document.getElementById('macro-weight') as HTMLInputElement;
        const activitySelect = document.getElementById('macro-activity') as HTMLSelectElement;
        const goalSelect = document.getElementById('macro-goal') as HTMLSelectElement;

        if (!ageInput || !genderSelect || !heightInput || !weightInput || !activitySelect || !goalSelect) return;

        const age = parseFloat(ageInput.value);
        const gender = genderSelect.value;
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        const activity = parseFloat(activitySelect.value);
        const goal = goalSelect.value;

        if (!age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) {
          alert('Veuillez remplir tous les champs requis avec des valeurs valides');
          return;
        }

        // Calcul BMR (formule de Mifflin-St Jeor)
        let bmr = 0;

        if (gender === 'male') {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // TDEE (Total Daily Energy Expenditure)
        let tdee = bmr * activity;

        // Ajustement selon l'objectif
        let calories = 0;

        if (goal === 'lose') {
          calories = tdee - 500; // Déficit de 500 kcal par jour
        } else if (goal === 'maintain') {
          calories = tdee;
        } else {
          calories = tdee + 500; // Surplus de 500 kcal par jour
        }

        // Calcul des macros
        let proteinPercentage = 0;
        let carbsPercentage = 0;
        let fatPercentage = 0;

        if (goal === 'lose') {
          proteinPercentage = 35;
          carbsPercentage = 40;
          fatPercentage = 25;
        } else if (goal === 'maintain') {
          proteinPercentage = 30;
          carbsPercentage = 45;
          fatPercentage = 25;
        } else {
          proteinPercentage = 25;
          carbsPercentage = 50;
          fatPercentage = 25;
        }

        const proteinGrams = Math.round(calories * (proteinPercentage / 100) / 4); // 4 kcal par gramme de protéine
        const carbsGrams = Math.round(calories * (carbsPercentage / 100) / 4); // 4 kcal par gramme de glucides
        const fatGrams = Math.round(calories * (fatPercentage / 100) / 9); // 9 kcal par gramme de lipides

        // Afficher les résultats
        const caloriesValue = macrosResult.querySelector('.calories-result .result-value') as HTMLElement;

        const proteinPercentEl = macrosResult.querySelector('.protein .macro-percentage') as HTMLElement;
        const carbsPercentEl = macrosResult.querySelector('.carbs .macro-percentage') as HTMLElement;
        const fatPercentEl = macrosResult.querySelector('.fat .macro-percentage') as HTMLElement;

        const proteinValueEl = macrosResult.querySelector('.macro-item:nth-child(1) .macro-value') as HTMLElement;
        const carbsValueEl = macrosResult.querySelector('.macro-item:nth-child(2) .macro-value') as HTMLElement;
        const fatValueEl = macrosResult.querySelector('.macro-item:nth-child(3) .macro-value') as HTMLElement;

        if (caloriesValue) caloriesValue.textContent = Math.round(calories).toString();

        if (proteinPercentEl) proteinPercentEl.textContent = `${proteinPercentage}%`;
        if (carbsPercentEl) carbsPercentEl.textContent = `${carbsPercentage}%`;
        if (fatPercentEl) fatPercentEl.textContent = `${fatPercentage}%`;

        if (proteinValueEl) proteinValueEl.textContent = `${proteinGrams} g`;
        if (carbsValueEl) carbsValueEl.textContent = `${carbsGrams} g`;
        if (fatValueEl) fatValueEl.textContent = `${fatGrams} g`;

        // Afficher les résultats
        macrosResult.style.display = 'block';
      });
    }
  }
  initTestimonialSlider() {
    const indicators = document.querySelectorAll('.testimonials-indicators .indicator');
    const slides = document.querySelectorAll('.transformation-slide');

    if (indicators.length === 0 || slides.length === 0) {
      return; // Exit if elements don't exist
    }

    let currentSlide = 0;

    // Function to display a specific slide
    const showSlide = (index: number) => {
      // Hide all slides
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });

      // Deactivate all indicators
      indicators.forEach((indicator) => {
        indicator.classList.remove('active');
      });

      // Show the selected slide and activate its indicator
      slides[index].classList.add('active');
      indicators[index].classList.add('active');

      currentSlide = index;
    };

    // Set up click handlers for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
      });
    });

    // Optional: Auto-rotate slides every 5 seconds
    setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 5000);
  }

  // Initialisation des filtres de programme
  initProgramFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    if (filterBtns.length === 0 || programCards.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Activer le bouton de filtre
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtrer les cartes de programme selon la catégorie
        const selectedCategory = btn.textContent?.trim().toLowerCase() || 'tous';

        programCards.forEach(card => {
          const categories = (card.getAttribute('data-categories') || "tous").split(',');

          if (selectedCategory === 'tous' || categories.includes(selectedCategory)) {
            // Afficher la carte
            (card as HTMLElement).style.display = 'flex';
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)';
            }, 50);
          } else {
            // Cacher la carte avec animation
            (card as HTMLElement).style.opacity = '0';
            (card as HTMLElement).style.transform = 'translateY(20px)';
            setTimeout(() => {
              (card as HTMLElement).style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Fonction pour faire défiler la page vers une section (pour les liens de navigation)
  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

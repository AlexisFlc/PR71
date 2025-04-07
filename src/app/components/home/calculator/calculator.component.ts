import {Component, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initCalculators();
  }

  initCalculators() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const calculatorTabs = document.querySelectorAll('.calculator-tab');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        calculatorTabs.forEach(tab => {
          tab.classList.remove('active');
          if (tab.id === `${targetTab}-calculator`) {
            tab.classList.add('active');
          }
        });
      });
    });

    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const bmiResult = document.getElementById('bmi-result');

    if (calculateBmiBtn && bmiResult) {
      calculateBmiBtn.addEventListener('click', () => {
        const heightInput = document.getElementById('bmi-height') as HTMLInputElement;
        const weightInput = document.getElementById('bmi-weight') as HTMLInputElement;
        if (!heightInput || !weightInput) return;
        const height = parseFloat(heightInput.value) / 100;
        const weight = parseFloat(weightInput.value);
        if (!height || !weight || height <= 0 || weight <= 0) {
          alert('Veuillez entrer des valeurs valides');
          return;
        }
        const bmi = weight / (height * height);
        const roundedBmi = Math.round(bmi * 10) / 10;
        let category = '';
        let position = 0;
        if (bmi < 18.5) {
          category = 'Maigreur';
          position = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
          category = 'Poids normal';
          position = 25 + ((bmi - 18.5) / 6.5) * 25;
        } else if (bmi < 30) {
          category = 'Surpoids';
          position = 50 + ((bmi - 25) / 5) * 25;
        } else {
          category = 'Obésité';
          position = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
        }
        const resultValue = bmiResult.querySelector('.result-value') as HTMLElement;
        const resultCategory = bmiResult.querySelector('.result-category') as HTMLElement;
        const bmiIndicator = bmiResult.querySelector('.bmi-scale-indicator') as HTMLElement;
        if (resultValue) resultValue.textContent = `${roundedBmi}`;
        if (resultCategory) resultCategory.textContent = category;
        if (bmiIndicator) bmiIndicator.style.left = `${position}%`;
        bmiResult.style.display = 'block';
      });
    }

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
        let bmr = (gender === 'male')
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;
        const tdee = bmr * activity;
        let calories = 0;
        if (goal === 'lose') {
          calories = tdee - 500;
        } else if (goal === 'maintain') {
          calories = tdee;
        } else {
          calories = tdee + 500;
        }
        let proteinPercentage = 0, carbsPercentage = 0, fatPercentage = 0;
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
        const proteinGrams = Math.round(calories * (proteinPercentage / 100) / 4);
        const carbsGrams = Math.round(calories * (carbsPercentage / 100) / 4);
        const fatGrams = Math.round(calories * (fatPercentage / 100) / 9);
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
        macrosResult.style.display = 'block';
      });
    }
  }
}

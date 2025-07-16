
// Health Assessment Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthForm');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Calculate BMI
            const height = parseFloat(data.height) / 100; // Convert cm to meters
            const weight = parseFloat(data.weight);
            const bmi = (weight / (height * height)).toFixed(1);
            
            // Calculate diabetes risk
            const age = parseInt(data.age);
            const bloodSugar = parseFloat(data.bloodSugar);
            const risk = calculateDiabetesRisk(age, bmi, bloodSugar, data.physicalActivity, data.lifestyle, data.comorbidities, data.familyHistory);
            
            // Show success message
            showMessage(`Health assessment completed! Your BMI is ${bmi}. Diabetes risk level: ${risk.level}%`, 'success');
            
            // Store data for meal plan
            const healthData = {
                ...data,
                bmi: bmi,
                diabetesRisk: risk.level,
                diabetesTypes: risk.types
            };
            
            localStorage.setItem('healthData', JSON.stringify(healthData));
            
            // Show meal plan section after a delay
            setTimeout(() => {
                showMealPlan(healthData);
            }, 2000);
        });
    }
    
    // Smooth scrolling for buttons
    const getStartedBtns = document.querySelectorAll('.btn-primary');
    getStartedBtns.forEach(btn => {
        if (btn.textContent.includes('Start Your Journey') || btn.textContent.includes('Start Your Free Trial')) {
            btn.addEventListener('click', function() {
                scrollToSection('assessment');
            });
        }
    });
});

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    const sections = ['home', 'features', 'assessment', 'meal-plan'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            if (id === sectionId) {
                section.classList.remove('hidden');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                section.classList.add('hidden');
            }
        }
    });
    
    // Show/hide meal plan nav link
    const mealPlanNav = document.getElementById('mealPlanNav');
    if (sectionId === 'meal-plan') {
        mealPlanNav.classList.remove('hidden');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Diabetes risk calculation function
function calculateDiabetesRisk(age, bmi, bloodSugar, physicalActivity, lifestyle, comorbidities, familyHistory) {
    let riskScore = 0;
    
    // Age factor
    if (age > 65) riskScore += 4;
    else if (age > 45) riskScore += 3;
    else if (age > 35) riskScore += 2;
    else if (age > 25) riskScore += 1;
    
    // BMI factor
    if (parseFloat(bmi) > 35) riskScore += 4;
    else if (parseFloat(bmi) > 30) riskScore += 3;
    else if (parseFloat(bmi) > 25) riskScore += 2;
    else if (parseFloat(bmi) > 23) riskScore += 1;
    
    // Blood sugar factor
    if (bloodSugar > 140) riskScore += 4;
    else if (bloodSugar > 125) riskScore += 3;
    else if (bloodSugar > 100) riskScore += 2;
    else if (bloodSugar > 90) riskScore += 1;
    
    // Physical activity factor
    if (physicalActivity === 'sedentary') riskScore += 3;
    else if (physicalActivity === 'light') riskScore += 2;
    else if (physicalActivity === 'moderate') riskScore += 1;
    
    // Lifestyle factor
    if (lifestyle === 'smoker') riskScore += 3;
    else if (lifestyle === 'sedentary') riskScore += 2;
    else if (lifestyle === 'alcohol') riskScore += 2;
    else if (lifestyle === 'moderate') riskScore += 1;
    
    // Comorbidities factor
    if (comorbidities === 'multiple') riskScore += 4;
    else if (comorbidities === 'heart_disease') riskScore += 3;
    else if (comorbidities === 'hypertension') riskScore += 2;
    else if (comorbidities === 'obesity') riskScore += 2;
    else if (comorbidities === 'thyroid') riskScore += 1;
    
    // Family history factor
    if (familyHistory && familyHistory.trim().length > 10) {
        riskScore += 2;
    }
    
    // Calculate percentage risk
    const maxScore = 20;
    const riskPercentage = Math.min(Math.round((riskScore / maxScore) * 100), 95);
    
    // Calculate diabetes type probabilities
    const types = {
        type1: Math.max(5, Math.min(age < 30 ? 25 : 10, riskPercentage * 0.3)),
        type2: Math.max(10, Math.min(riskPercentage * 0.8, 80)),
        prediabetes: Math.max(5, Math.min(riskPercentage * 0.4, 40))
    };
    
    return {
        level: riskPercentage,
        types: types,
        category: riskPercentage >= 70 ? 'High' : 
                 riskPercentage >= 40 ? 'Moderate' : 
                 riskPercentage >= 20 ? 'Low-Moderate' : 'Low'
    };
}

// Meal plan generation
function getMealPlan(bmi, lifestyle, physicalActivity) {
    if (parseFloat(bmi) >= 30) {
        return {
            breakfast: {
                time: "7:00 AM",
                meal: "Egg white omelet with spinach and whole grain toast",
                description: "High protein, low calorie breakfast"
            },
            morningSnack: {
                time: "10:00 AM",
                meal: "Greek yogurt with berries",
                description: "Protein-rich snack with antioxidants"
            },
            lunch: {
                time: "1:00 PM",
                meal: "Grilled chicken salad with olive oil dressing",
                description: "Lean protein with fiber-rich vegetables"
            },
            afternoonSnack: {
                time: "4:00 PM",
                meal: "Apple slices with almond butter",
                description: "Balanced energy boost"
            },
            dinner: {
                time: "7:00 PM",
                meal: "Baked fish with steamed vegetables",
                description: "Low-calorie, high-protein dinner"
            }
        };
    } else if (lifestyle === 'healthy' || physicalActivity === 'active' || physicalActivity === 'very_active') {
        return {
            breakfast: {
                time: "7:00 AM",
                meal: "Oatmeal with nuts, seeds, and protein powder",
                description: "High-energy breakfast for active individuals"
            },
            morningSnack: {
                time: "10:00 AM",
                meal: "Banana with protein shake",
                description: "Quick energy and muscle recovery"
            },
            lunch: {
                time: "1:00 PM",
                meal: "Quinoa bowl with grilled chicken and avocado",
                description: "Complex carbs and healthy fats"
            },
            afternoonSnack: {
                time: "4:00 PM",
                meal: "Trail mix with dried fruits",
                description: "Sustained energy release"
            },
            dinner: {
                time: "7:00 PM",
                meal: "Lean steak with sweet potato and vegetables",
                description: "Protein-rich dinner for recovery"
            }
        };
    } else {
        return {
            breakfast: {
                time: "7:00 AM",
                meal: "Whole grain toast with avocado and eggs",
                description: "Balanced breakfast with healthy fats"
            },
            morningSnack: {
                time: "10:00 AM",
                meal: "Mixed nuts and fruit",
                description: "Healthy snack with natural sugars"
            },
            lunch: {
                time: "1:00 PM",
                meal: "Turkey and hummus wrap with vegetables",
                description: "Lean protein with complex carbs"
            },
            afternoonSnack: {
                time: "4:00 PM",
                meal: "Celery with peanut butter",
                description: "Low-calorie protein snack"
            },
            dinner: {
                time: "7:00 PM",
                meal: "Grilled salmon with quinoa and vegetables",
                description: "Omega-3 rich dinner"
            }
        };
    }
}

// Activity plan generation
function getActivityPlan(physicalActivity, comorbidities) {
    if (comorbidities === 'multiple' || comorbidities === 'heart_disease') {
        return {
            aerobic: {
                frequency: "20 minutes, 3 days/week",
                activities: [
                    "Light walking",
                    "Swimming",
                    "Stationary cycling at low intensity"
                ]
            },
            strength: {
                frequency: "15-20 minutes, 2 days/week",
                activities: [
                    "Light resistance bands",
                    "Chair exercises",
                    "Gentle stretching"
                ]
            }
        };
    } else if (physicalActivity === 'sedentary') {
        return {
            aerobic: {
                frequency: "25 minutes, 4 days/week",
                activities: [
                    "Brisk walking",
                    "Light jogging",
                    "Cycling on flat terrain"
                ]
            },
            strength: {
                frequency: "20 minutes, 2-3 days/week",
                activities: [
                    "Bodyweight exercises",
                    "Light dumbbells",
                    "Resistance bands"
                ]
            }
        };
    } else {
        return {
            aerobic: {
                frequency: "30 minutes, 5 days/week",
                activities: [
                    "Running",
                    "High-intensity cycling",
                    "Swimming laps"
                ]
            },
            strength: {
                frequency: "30-45 minutes, 3 days/week",
                activities: [
                    "Weight training",
                    "Advanced bodyweight exercises",
                    "Circuit training"
                ]
            }
        };
    }
}

// Show meal plan with data
function showMealPlan(healthData) {
    // Update risk display
    const riskPercentage = document.getElementById('riskPercentage');
    const riskCircle = document.getElementById('riskCircle');
    
    if (riskPercentage) {
        riskPercentage.textContent = `${healthData.diabetesRisk}%`;
        
        // Update circle color based on risk level
        if (healthData.diabetesRisk >= 70) {
            riskCircle.style.borderColor = 'hsl(0, 84%, 60%)';
        } else if (healthData.diabetesRisk >= 40) {
            riskCircle.style.borderColor = 'hsl(38, 92%, 50%)';
        } else {
            riskCircle.style.borderColor = 'hsl(142, 76%, 36%)';
        }
    }
    
    // Update metrics summary
    const metricsSummary = document.getElementById('metricsSummary');
    if (metricsSummary) {
        metricsSummary.innerHTML = `
            <div class="metric-item">
                <span>BMI</span>
                <span>${healthData.bmi}</span>
            </div>
            <div class="metric-item">
                <span>Age</span>
                <span>${healthData.age} years</span>
            </div>
            <div class="metric-item">
                <span>Blood Sugar</span>
                <span>${healthData.bloodSugar} mg/dL</span>
            </div>
            <div class="metric-item">
                <span>Activity Level</span>
                <span>${healthData.physicalActivity}</span>
            </div>
        `;
    }
    
    // Generate and display meal plan
    const mealPlan = getMealPlan(healthData.bmi, healthData.lifestyle, healthData.physicalActivity);
    const mealSchedule = document.getElementById('mealSchedule');
    
    if (mealSchedule) {
        mealSchedule.innerHTML = Object.entries(mealPlan).map(([key, meal]) => `
            <div class="meal-item">
                <div class="meal-time">${meal.time} - ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</div>
                <div class="meal-name">${meal.meal}</div>
                <div class="meal-description">${meal.description}</div>
            </div>
        `).join('');
    }
    
    // Generate and display activity plan
    const activityPlan = getActivityPlan(healthData.physicalActivity, healthData.comorbidities);
    const activitySchedule = document.getElementById('activitySchedule');
    
    if (activitySchedule) {
        activitySchedule.innerHTML = `
            <div class="activity-item">
                <div class="activity-type">🏃‍♂️ Aerobic Exercise</div>
                <div class="activity-frequency">${activityPlan.aerobic.frequency}</div>
                <div class="activity-list">
                    ${activityPlan.aerobic.activities.map(activity => `
                        <div class="activity-description">• ${activity}</div>
                    `).join('')}
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-type">💪 Strength Training</div>
                <div class="activity-frequency">${activityPlan.strength.frequency}</div>
                <div class="activity-list">
                    ${activityPlan.strength.activities.map(activity => `
                        <div class="activity-description">• ${activity}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Show meal plan section
    showSection('meal-plan');
    
    // Update navigation
    const mealPlanNav = document.getElementById('mealPlanNav');
    if (mealPlanNav) {
        mealPlanNav.classList.remove('hidden');
    }
}

// Utility function to show messages
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert after form
    const form = document.getElementById('healthForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Form validation enhancement
function validateForm() {
    const form = document.getElementById('healthForm');
    if (!form) return true;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--success)';
        }
    });
    
    return isValid;
}

// Real-time form validation
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        if (e.target.value.trim()) {
            e.target.style.borderColor = 'var(--success)';
        } else if (e.target.hasAttribute('required')) {
            e.target.style.borderColor = 'var(--error)';
        }
    }
});

// Load saved data on page load
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('healthData');
    if (savedData) {
        try {
            const healthData = JSON.parse(savedData);
            // Optionally pre-populate form or show meal plan
            console.log('Saved health data found:', healthData);
        } catch (e) {
            console.error('Error parsing saved health data:', e);
        }
    }
});

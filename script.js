
// Enhanced Health Assessment Form Handler with better UX
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthForm');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Enhanced Navigation functionality
    initializeNavigation();
    
    // Enhanced Form functionality
    if (form) {
        initializeForm();
    }
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize animations
    initializeAnimations();
    
    function initializeNavigation() {
        // Mobile navigation toggle
        if (navToggle && navLinksContainer) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
            });
        }
        
        // Navigation link handlers
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                showSection(targetId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu
                if (navToggle && navLinksContainer) {
                    navToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                }
            });
        });
        
        // Smooth scrolling for buttons
        const ctaButtons = document.querySelectorAll('.btn-primary');
        ctaButtons.forEach(btn => {
            if (btn.textContent.includes('Start Your Journey') || 
                btn.textContent.includes('Start Your Free Trial')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    scrollToSection('assessment');
                });
            }
        });
    }
    
    function initializeForm() {
        // Enhanced form submission with loading states
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            // Simulate processing time for better UX
            setTimeout(() => {
                processFormSubmission();
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
        
        // Real-time form validation with better visual feedback
        const formInputs = form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', validateFieldRealTime);
            input.addEventListener('blur', validateFieldRealTime);
            input.addEventListener('focus', function() {
                this.closest('.form-group').classList.add('focused');
            });
        });
        
        // Progressive form completion indicator
        updateFormProgress();
        formInputs.forEach(input => {
            input.addEventListener('input', updateFormProgress);
        });
    }
    
    function processFormSubmission() {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Calculate enhanced metrics
        const height = parseFloat(data.height) / 100;
        const weight = parseFloat(data.weight);
        const bmi = (weight / (height * height)).toFixed(1);
        
        // Enhanced diabetes risk calculation
        const age = parseInt(data.age);
        const bloodSugar = parseFloat(data.bloodSugar);
        const risk = calculateEnhancedDiabetesRisk(age, bmi, bloodSugar, data.physicalActivity, 
                                                  data.lifestyle, data.comorbidities, data.familyHistory);
        
        // Show enhanced success message
        showEnhancedMessage(`✅ Health assessment completed successfully!<br>
                           <strong>BMI:</strong> ${bmi} | <strong>Risk Level:</strong> ${risk.level}%`, 'success');
        
        // Store comprehensive data
        const healthData = {
            ...data,
            bmi: bmi,
            diabetesRisk: risk.level,
            riskCategory: risk.category,
            diabetesTypes: risk.types,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('healthData', JSON.stringify(healthData));
        
        // Smooth transition to meal plan
        setTimeout(() => {
            showMealPlan(healthData);
        }, 2500);
    }
    
    function validateFieldRealTime(e) {
        const field = e.target;
        const formGroup = field.closest('.form-group');
        
        // Remove previous validation classes
        formGroup.classList.remove('valid', 'invalid');
        
        if (field.value.trim()) {
            if (field.checkValidity()) {
                formGroup.classList.add('valid');
                field.style.borderColor = 'var(--success)';
            } else {
                formGroup.classList.add('invalid');
                field.style.borderColor = 'var(--error)';
            }
        } else if (field.hasAttribute('required')) {
            formGroup.classList.add('invalid');
            field.style.borderColor = 'var(--error)';
        } else {
            field.style.borderColor = 'var(--border)';
        }
    }
    
    function updateFormProgress() {
        const requiredFields = form.querySelectorAll('[required]');
        const filledFields = Array.from(requiredFields).filter(field => field.value.trim());
        const progress = (filledFields.length / requiredFields.length) * 100;
        
        // Update progress indicator if it exists
        let progressBar = document.querySelector('.form-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'form-progress';
            progressBar.innerHTML = '<div class="progress-bar"></div>';
            form.insertBefore(progressBar, form.firstChild);
        }
        
        const progressBarFill = progressBar.querySelector('.progress-bar');
        progressBarFill.style.width = `${progress}%`;
        
        // Add CSS for progress bar
        if (!document.querySelector('#progress-styles')) {
            const style = document.createElement('style');
            style.id = 'progress-styles';
            style.textContent = `
                .form-progress {
                    height: 4px;
                    background: var(--border);
                    border-radius: 2px;
                    margin-bottom: 2rem;
                    overflow: hidden;
                }
                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary), var(--success));
                    transition: width 0.3s ease;
                    border-radius: 2px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function initializeScrollEffects() {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            // Navbar scroll effect
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Parallax effect for hero section
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const heroImage = heroSection.querySelector('.hero-img');
                if (heroImage) {
                    const scrolled = window.pageYOffset;
                    const parallax = scrolled * 0.5;
                    heroImage.style.transform = `translateY(${parallax}px)`;
                }
            }
        });
    }
    
    function initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .chart-card, .meal-plan-card, .activity-plan-card');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    function showSection(sectionId) {
        const sections = ['home', 'features', 'assessment', 'meal-plan'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                if (id === sectionId) {
                    section.classList.remove('hidden');
                    section.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                } else {
                    section.classList.add('hidden');
                }
            }
        });
        
        // Show/hide meal plan nav link
        const mealPlanNav = document.getElementById('mealPlanNav');
        if (mealPlanNav && sectionId === 'meal-plan') {
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
});

// Enhanced diabetes risk calculation with more factors
function calculateEnhancedDiabetesRisk(age, bmi, bloodSugar, physicalActivity, lifestyle, comorbidities, familyHistory) {
    let riskScore = 0;
    
    // Age factor (weighted)
    if (age > 65) riskScore += 5;
    else if (age > 45) riskScore += 4;
    else if (age > 35) riskScore += 3;
    else if (age > 25) riskScore += 2;
    else riskScore += 1;
    
    // BMI factor (weighted)
    const bmiValue = parseFloat(bmi);
    if (bmiValue > 35) riskScore += 5;
    else if (bmiValue > 30) riskScore += 4;
    else if (bmiValue > 25) riskScore += 3;
    else if (bmiValue > 23) riskScore += 2;
    else riskScore += 1;
    
    // Blood sugar factor (most important)
    if (bloodSugar > 140) riskScore += 6;
    else if (bloodSugar > 125) riskScore += 5;
    else if (bloodSugar > 100) riskScore += 3;
    else if (bloodSugar > 90) riskScore += 2;
    else riskScore += 1;
    
    // Physical activity factor
    if (physicalActivity === 'sedentary') riskScore += 4;
    else if (physicalActivity === 'light') riskScore += 3;
    else if (physicalActivity === 'moderate') riskScore += 2;
    else if (physicalActivity === 'active') riskScore += 1;
    
    // Lifestyle factor
    if (lifestyle === 'smoker') riskScore += 4;
    else if (lifestyle === 'sedentary') riskScore += 3;
    else if (lifestyle === 'alcohol') riskScore += 3;
    else if (lifestyle === 'moderate') riskScore += 2;
    else riskScore += 1;
    
    // Comorbidities factor
    if (comorbidities === 'multiple') riskScore += 5;
    else if (comorbidities === 'heart_disease') riskScore += 4;
    else if (comorbidities === 'hypertension') riskScore += 3;
    else if (comorbidities === 'obesity') riskScore += 3;
    else if (comorbidities === 'thyroid') riskScore += 2;
    else riskScore += 1;
    
    // Family history factor
    if (familyHistory && familyHistory.trim().length > 20) {
        riskScore += 3;
    } else if (familyHistory && familyHistory.trim().length > 10) {
        riskScore += 2;
    }
    
    // Calculate percentage risk with better scaling
    const maxScore = 28;
    const riskPercentage = Math.min(Math.round((riskScore / maxScore) * 100), 95);
    
    // Determine risk category
    let category;
    if (riskPercentage >= 75) category = 'Very High';
    else if (riskPercentage >= 60) category = 'High';
    else if (riskPercentage >= 40) category = 'Moderate';
    else if (riskPercentage >= 25) category = 'Low-Moderate';
    else category = 'Low';
    
    // Calculate diabetes type probabilities
    const types = {
        type1: Math.max(5, Math.min(age < 30 ? 30 : 15, riskPercentage * 0.4)),
        type2: Math.max(15, Math.min(riskPercentage * 0.9, 85)),
        prediabetes: Math.max(10, Math.min(riskPercentage * 0.6, 50))
    };
    
    return {
        level: riskPercentage,
        category: category,
        types: types,
        factors: {
            age: age > 45 ? 'High' : age > 35 ? 'Moderate' : 'Low',
            bmi: bmiValue > 30 ? 'High' : bmiValue > 25 ? 'Moderate' : 'Normal',
            bloodSugar: bloodSugar > 125 ? 'High' : bloodSugar > 100 ? 'Elevated' : 'Normal'
        }
    };
}

// Enhanced meal plan generation with more variety
function getEnhancedMealPlan(bmi, lifestyle, physicalActivity, riskLevel) {
    const bmiValue = parseFloat(bmi);
    
    if (riskLevel >= 60 || bmiValue >= 30) {
        // High-risk/High BMI meal plan
        return {
            breakfast: {
                time: "7:00 AM",
                meal: "Steel-cut oats with cinnamon, berries, and Greek yogurt",
                description: "Low glycemic, high fiber breakfast to stabilize blood sugar",
                calories: "320 cal",
                carbs: "45g"
            },
            morningSnack: {
                time: "10:00 AM",
                meal: "Small apple with 1 tbsp almond butter",
                description: "Balanced snack with healthy fats and fiber",
                calories: "150 cal",
                carbs: "18g"
            },
            lunch: {
                time: "1:00 PM",
                meal: "Grilled salmon salad with mixed greens and olive oil",
                description: "Omega-3 rich protein with low-carb vegetables",
                calories: "400 cal",
                carbs: "12g"
            },
            afternoonSnack: {
                time: "4:00 PM",
                meal: "Handful of nuts and seeds",
                description: "Protein and healthy fats for sustained energy",
                calories: "180 cal",
                carbs: "6g"
            },
            dinner: {
                time: "7:00 PM",
                meal: "Grilled chicken with roasted vegetables and quinoa",
                description: "Lean protein with complex carbs and fiber",
                calories: "450 cal",
                carbs: "35g"
            }
        };
    } else if (physicalActivity === 'active' || physicalActivity === 'very_active') {
        // Active lifestyle meal plan
        return {
            breakfast: {
                time: "6:30 AM",
                meal: "Protein smoothie with banana, spinach, and protein powder",
                description: "Quick energy and muscle recovery nutrients",
                calories: "380 cal",
                carbs: "45g"
            },
            morningSnack: {
                time: "9:30 AM",
                meal: "Greek yogurt with granola",
                description: "Protein-rich snack for sustained energy",
                calories: "200 cal",
                carbs: "25g"
            },
            lunch: {
                time: "12:30 PM",
                meal: "Turkey and avocado wrap with sweet potato",
                description: "Balanced macros for active individuals",
                calories: "520 cal",
                carbs: "55g"
            },
            afternoonSnack: {
                time: "3:30 PM",
                meal: "Trail mix with dried fruits",
                description: "Quick energy for afternoon activities",
                calories: "220 cal",
                carbs: "32g"
            },
            dinner: {
                time: "7:30 PM",
                meal: "Lean beef with brown rice and steamed broccoli",
                description: "Protein for muscle recovery with complex carbs",
                calories: "580 cal",
                carbs: "60g"
            }
        };
    } else {
        // Standard balanced meal plan
        return {
            breakfast: {
                time: "7:30 AM",
                meal: "Whole grain toast with avocado and poached egg",
                description: "Balanced breakfast with healthy fats and protein",
                calories: "350 cal",
                carbs: "30g"
            },
            morningSnack: {
                time: "10:30 AM",
                meal: "Mixed berries with cottage cheese",
                description: "Antioxidants and protein for sustained energy",
                calories: "140 cal",
                carbs: "20g"
            },
            lunch: {
                time: "1:30 PM",
                meal: "Mediterranean bowl with chickpeas and vegetables",
                description: "Plant-based protein with fiber and nutrients",
                calories: "420 cal",
                carbs: "50g"
            },
            afternoonSnack: {
                time: "4:30 PM",
                meal: "Hummus with cucumber and bell pepper",
                description: "Light snack with plant protein and fiber",
                calories: "120 cal",
                carbs: "15g"
            },
            dinner: {
                time: "7:30 PM",
                meal: "Baked cod with roasted sweet potato and asparagus",
                description: "Lean protein with nutrient-dense vegetables",
                calories: "420 cal",
                carbs: "40g"
            }
        };
    }
}

// Enhanced activity plan with specific exercises
function getEnhancedActivityPlan(physicalActivity, comorbidities, age, riskLevel) {
    const ageGroup = age > 65 ? 'senior' : age > 45 ? 'middle' : 'young';
    const hasLimitations = ['multiple', 'heart_disease'].includes(comorbidities);
    
    if (hasLimitations || riskLevel >= 70) {
        return {
            cardio: {
                frequency: "20-30 minutes, 4 days/week",
                intensity: "Low to moderate",
                activities: [
                    "🚶‍♂️ Gentle walking on flat surfaces",
                    "🏊‍♀️ Water aerobics or gentle swimming",
                    "🚴‍♀️ Stationary cycling at comfortable pace",
                    "🧘‍♀️ Chair yoga or gentle stretching"
                ]
            },
            strength: {
                frequency: "15-20 minutes, 2 days/week",
                intensity: "Light resistance",
                activities: [
                    "💪 Resistance bands exercises",
                    "🪑 Chair-based strength exercises",
                    "🏋️‍♀️ Light weights (2-5 lbs)",
                    "🤸‍♀️ Bodyweight exercises (modified)"
                ]
            },
            flexibility: {
                frequency: "10-15 minutes daily",
                activities: [
                    "🧘‍♀️ Gentle yoga poses",
                    "🤸‍♂️ Daily stretching routine",
                    "💆‍♀️ Deep breathing exercises"
                ]
            }
        };
    } else if (physicalActivity === 'sedentary' || physicalActivity === 'light') {
        return {
            cardio: {
                frequency: "30 minutes, 5 days/week",
                intensity: "Moderate",
                activities: [
                    "🚶‍♂️ Brisk walking or hiking",
                    "🚴‍♀️ Cycling on varied terrain",
                    "💃 Dancing or aerobics classes",
                    "🏊‍♀️ Swimming laps"
                ]
            },
            strength: {
                frequency: "25-30 minutes, 3 days/week",
                intensity: "Moderate resistance",
                activities: [
                    "🏋️‍♀️ Free weights training",
                    "💪 Resistance band workouts",
                    "🤸‍♀️ Bodyweight circuit training",
                    "🏃‍♂️ Functional movement exercises"
                ]
            },
            flexibility: {
                frequency: "15-20 minutes daily",
                activities: [
                    "🧘‍♀️ Yoga flow sequences",
                    "🤸‍♂️ Dynamic stretching",
                    "🧘‍♀️ Meditation and breathing"
                ]
            }
        };
    } else {
        return {
            cardio: {
                frequency: "45 minutes, 5-6 days/week",
                intensity: "Moderate to high",
                activities: [
                    "🏃‍♂️ Running or jogging",
                    "🚴‍♀️ High-intensity cycling",
                    "🏊‍♀️ Competitive swimming",
                    "⛰️ Hiking or trail running"
                ]
            },
            strength: {
                frequency: "45-60 minutes, 4 days/week",
                intensity: "Moderate to high resistance",
                activities: [
                    "🏋️‍♀️ Progressive weight training",
                    "🤸‍♀️ Advanced bodyweight exercises",
                    "🏃‍♂️ High-intensity circuit training",
                    "💪 Functional fitness workouts"
                ]
            },
            flexibility: {
                frequency: "20-30 minutes daily",
                activities: [
                    "🧘‍♀️ Advanced yoga practices",
                    "🤸‍♂️ Dynamic mobility work",
                    "💆‍♀️ Recovery and relaxation"
                ]
            }
        };
    }
}

// Enhanced meal plan display with animations
function showMealPlan(healthData) {
    // Update risk display with enhanced styling
    updateRiskDisplay(healthData);
    
    // Update metrics summary
    updateMetricsSummary(healthData);
    
    // Generate and display enhanced meal plan
    displayEnhancedMealPlan(healthData);
    
    // Generate and display enhanced activity plan
    displayEnhancedActivityPlan(healthData);
    
    // Show meal plan section with smooth transition
    showSection('meal-plan');
    
    // Update navigation
    const mealPlanNav = document.getElementById('mealPlanNav');
    if (mealPlanNav) {
        mealPlanNav.classList.remove('hidden');
    }
    
    // Add success confetti effect
    createConfettiEffect();
}

function updateRiskDisplay(healthData) {
    const riskPercentage = document.getElementById('riskPercentage');
    const riskCircle = document.getElementById('riskCircle');
    
    if (riskPercentage && riskCircle) {
        // Animate the percentage counter
        animateCounter(riskPercentage, 0, healthData.diabetesRisk, 2000);
        
        // Update circle color and style based on risk level
        const risk = healthData.diabetesRisk;
        if (risk >= 70) {
            riskCircle.style.borderColor = 'var(--error)';
            riskCircle.style.background = 'linear-gradient(135deg, hsl(0, 84%, 95%), hsl(0, 84%, 90%))';
        } else if (risk >= 40) {
            riskCircle.style.borderColor = 'var(--warning)';
            riskCircle.style.background = 'linear-gradient(135deg, hsl(38, 92%, 95%), hsl(38, 92%, 90%))';
        } else {
            riskCircle.style.borderColor = 'var(--success)';
            riskCircle.style.background = 'linear-gradient(135deg, hsl(142, 76%, 95%), hsl(142, 76%, 90%))';
        }
        
        // Add pulsing animation for high risk
        if (risk >= 70) {
            riskCircle.style.animation = 'pulse 2s infinite';
        }
    }
}

function updateMetricsSummary(healthData) {
    const metricsSummary = document.getElementById('metricsSummary');
    if (metricsSummary) {
        metricsSummary.innerHTML = `
            <div class="metric-item">
                <span><strong>BMI</strong></span>
                <span class="metric-value">${healthData.bmi}</span>
            </div>
            <div class="metric-item">
                <span><strong>Age</strong></span>
                <span class="metric-value">${healthData.age} years</span>
            </div>
            <div class="metric-item">
                <span><strong>Blood Sugar</strong></span>
                <span class="metric-value">${healthData.bloodSugar} mg/dL</span>
            </div>
            <div class="metric-item">
                <span><strong>Activity Level</strong></span>
                <span class="metric-value">${healthData.physicalActivity}</span>
            </div>
            <div class="metric-item">
                <span><strong>Risk Category</strong></span>
                <span class="metric-value risk-${healthData.riskCategory.toLowerCase().replace(' ', '-')}">${healthData.riskCategory}</span>
            </div>
        `;
    }
}

function displayEnhancedMealPlan(healthData) {
    const mealPlan = getEnhancedMealPlan(healthData.bmi, healthData.lifestyle, 
                                        healthData.physicalActivity, healthData.diabetesRisk);
    const mealSchedule = document.getElementById('mealSchedule');
    
    if (mealSchedule) {
        mealSchedule.innerHTML = Object.entries(mealPlan).map(([key, meal], index) => `
            <div class="meal-item" style="animation-delay: ${index * 0.1}s">
                <div class="meal-time">${meal.time} - ${formatMealName(key)}</div>
                <div class="meal-name">${meal.meal}</div>
                <div class="meal-description">${meal.description}</div>
                <div class="meal-stats">
                    <span class="meal-calories">${meal.calories}</span>
                    <span class="meal-carbs">Carbs: ${meal.carbs}</span>
                </div>
            </div>
        `).join('');
    }
}

function displayEnhancedActivityPlan(healthData) {
    const activityPlan = getEnhancedActivityPlan(healthData.physicalActivity, 
                                               healthData.comorbidities, 
                                               parseInt(healthData.age), 
                                               healthData.diabetesRisk);
    const activitySchedule = document.getElementById('activitySchedule');
    
    if (activitySchedule) {
        activitySchedule.innerHTML = Object.entries(activityPlan).map(([type, plan], index) => `
            <div class="activity-item" style="animation-delay: ${index * 0.1}s">
                <div class="activity-type">${formatActivityType(type)}</div>
                <div class="activity-frequency">${plan.frequency}</div>
                ${plan.intensity ? `<div class="activity-intensity">Intensity: ${plan.intensity}</div>` : ''}
                <div class="activity-list">
                    ${plan.activities.map(activity => `
                        <div class="activity-description">${activity}</div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

// Utility functions
function formatMealName(key) {
    return key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .trim();
}

function formatActivityType(type) {
    const icons = {
        cardio: '🏃‍♂️ Cardiovascular',
        strength: '💪 Strength Training',
        flexibility: '🧘‍♀️ Flexibility & Recovery'
    };
    return icons[type] || type;
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.round(start + (end - start) * progress);
        element.textContent = `${currentValue}%`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}

function createConfettiEffect() {
    // Simple confetti effect for form completion
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 10000;
                animation: confetti-fall 3s linear forwards;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
    
    // Add confetti animation CSS
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showEnhancedMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create enhanced message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.innerHTML = message;
    
    // Insert after form with animation
    const form = document.getElementById('healthForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease-out forwards';
            setTimeout(() => messageDiv.remove(), 300);
        }, 8000);
    }
}

// Global function for section navigation
window.showSection = function(sectionId) {
    const sections = ['home', 'features', 'assessment', 'meal-plan'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            if (id === sectionId) {
                section.classList.remove('hidden');
                section.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                section.classList.add('hidden');
            }
        }
    });
};

// Load saved data on page load with recovery
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('healthData');
    if (savedData) {
        try {
            const healthData = JSON.parse(savedData);
            console.log('💾 Saved health data found:', healthData);
            
            // Offer to restore previous session
            if (confirm('Would you like to view your previous health assessment results?')) {
                showMealPlan(healthData);
            }
        } catch (e) {
            console.error('❌ Error parsing saved health data:', e);
            localStorage.removeItem('healthData');
        }
    }
});

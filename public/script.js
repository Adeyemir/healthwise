
// Health Assessment Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthForm');
    
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
            
            // Simple diabetes risk calculation
            const age = parseInt(data.age);
            const bloodSugar = parseFloat(data.bloodSugar);
            const risk = calculateDiabetesRisk(age, bmi, bloodSugar, data.physicalActivity, data.lifestyle);
            
            // Show success message
            showMessage(`Health assessment completed! Your BMI is ${bmi}. Diabetes risk level: ${risk}`, 'success');
            
            // Store data in localStorage for potential meal plan page
            localStorage.setItem('healthData', JSON.stringify({
                ...data,
                bmi: bmi,
                diabetesRisk: risk
            }));
            
            // Optionally redirect to meal plan page
            // window.location.href = '/meal-plan.html';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Button click handlers
    const getStartedBtns = document.querySelectorAll('.btn-primary');
    getStartedBtns.forEach(btn => {
        if (btn.textContent.includes('Get Started') || btn.textContent.includes('Start Your Journey')) {
            btn.addEventListener('click', function() {
                const formSection = document.querySelector('.form-section');
                if (formSection) {
                    formSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});

// Diabetes risk calculation function
function calculateDiabetesRisk(age, bmi, bloodSugar, physicalActivity, lifestyle) {
    let riskScore = 0;
    
    // Age factor
    if (age > 45) riskScore += 2;
    else if (age > 35) riskScore += 1;
    
    // BMI factor
    if (parseFloat(bmi) > 30) riskScore += 3;
    else if (parseFloat(bmi) > 25) riskScore += 2;
    else if (parseFloat(bmi) > 23) riskScore += 1;
    
    // Blood sugar factor
    if (bloodSugar > 125) riskScore += 3;
    else if (bloodSugar > 100) riskScore += 2;
    else if (bloodSugar > 90) riskScore += 1;
    
    // Physical activity factor
    if (physicalActivity === 'sedentary') riskScore += 2;
    else if (physicalActivity === 'light') riskScore += 1;
    
    // Lifestyle factor
    if (lifestyle === 'smoker' || lifestyle === 'sedentary') riskScore += 2;
    else if (lifestyle === 'alcohol' || lifestyle === 'moderate') riskScore += 1;
    
    // Determine risk level
    if (riskScore >= 8) return 'High';
    else if (riskScore >= 5) return 'Moderate';
    else if (riskScore >= 3) return 'Low-Moderate';
    else return 'Low';
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
            field.style.borderColor = 'hsl(0, 84%, 60%)';
            isValid = false;
        } else {
            field.style.borderColor = 'hsl(142, 76%, 36%)';
        }
    });
    
    return isValid;
}

// Real-time form validation
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        if (e.target.value.trim()) {
            e.target.style.borderColor = 'hsl(142, 76%, 36%)';
        } else if (e.target.hasAttribute('required')) {
            e.target.style.borderColor = 'hsl(0, 84%, 60%)';
        }
    }
});

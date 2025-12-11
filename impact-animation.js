// Number rollup animation for impact metrics
function animateNumber(element, target, duration = 1000) {
    const start = parseInt(element.textContent) || 0;
    const startValue = Math.max(0, target - 1000);
    const increment = (target - startValue) / (duration / 16);
    let current = startValue;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for impact numbers animation
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -50px 0px'
};

const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const impactNumbers = entry.target.querySelectorAll('.impact-number');
            impactNumbers.forEach(numberEl => {
                const target = parseInt(numberEl.getAttribute('data-target'));
                animateNumber(numberEl, target);
            });
            impactObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing the impact section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
});

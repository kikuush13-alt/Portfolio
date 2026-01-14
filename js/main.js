// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ===================================
// HERO ANIMATION
// ===================================
gsap.from('.hero-title', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

// ===================================
// H2 SCROLL ANIMATIONS
// ===================================
gsap.utils.toArray('h2').forEach(h2 => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(h2, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
                observer.unobserve(h2);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(h2);
});

// ===================================
// WAVE TRANSITIONS WITH SCROLL
// ===================================
// Waves are static in this version, can be enhanced with more complex scroll effects

// ===================================
// MBTI CIRCULAR CHARTS ANIMATION
// ===================================
function animateCircularCharts() {
    const charts = document.querySelectorAll('.chart-progress');
    
    charts.forEach(chart => {
        const percent = parseInt(chart.getAttribute('data-percent'));
        const circumference = 2 * Math.PI * 80;
        const offset = circumference - (percent / 100) * circumference;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(chart, {
                        strokeDashoffset: offset,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                    observer.unobserve(chart);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(chart);
    });
}

// ===================================
// MBTI PROGRESS BARS ANIMATION
// ===================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percent = parseInt(bar.getAttribute('data-percent'));
        const fill = bar.querySelector('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(fill, {
                        width: `${percent}%`,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(bar);
    });
}

// ===================================
// SKILLS BARS ANIMATION
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percent = parseInt(bar.getAttribute('data-percent'));
        const fill = bar.querySelector('.skill-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(fill, {
                        width: `${percent}%`,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(bar);
    });
}

// ===================================
// SKILLS INTERACTION
// ===================================
function setupSkillsInteraction() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillBar = item.querySelector('.skill-bar');
        
        // Click to toggle details and filter projects
        skillBar.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other skill details
            skillItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current skill
            if (!isActive) {
                item.classList.add('active');
                
                // Filter projects by category
                const category = item.getAttribute('data-category');
                filterProjects(category);
                
                // Smooth scroll to projects section
                setTimeout(() => {
                    document.getElementById('projects').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            } else {
                item.classList.remove('active');
                filterProjects('all');
            }
        });
        
        // Desktop hover preview
        if (window.innerWidth > 768) {
            skillBar.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    gsap.to(item, {
                        duration: 0.3,
                        scale: 1.02,
                        ease: 'power2.out'
                    });
                }
            });
            
            skillBar.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        }
    });
}

// ===================================
// PROJECTS FILTERING
// ===================================
function filterProjects(category) {
    const projectItems = document.querySelectorAll('.project-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter and animate projects
    projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all') {
            item.classList.remove('hidden', 'filtered');
            gsap.to(item, {
                duration: 0.4,
                scale: 1,
                opacity: 1,
                ease: 'power2.out'
            });
        } else if (itemCategory === category) {
            item.classList.remove('hidden');
            item.classList.add('filtered');
            gsap.to(item, {
                duration: 0.4,
                scale: 1,
                opacity: 1,
                ease: 'power2.out'
            });
        } else {
            gsap.to(item, {
                duration: 0.4,
                scale: 0.95,
                opacity: 0.3,
                ease: 'power2.out'
            });
        }
    });
}

// ===================================
// FILTER BUTTONS
// ===================================
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
            
            // Remove active state from all skills
            document.querySelectorAll('.skill-item').forEach(item => {
                item.classList.remove('active');
            });
        });
    });
}

// ===================================
// PROJECT HOVER → SKILL HIGHLIGHT
// ===================================
function setupProjectHoverHighlight() {
    const projectItems = document.querySelectorAll('.project-item');
    const skillItems = document.querySelectorAll('.skill-item');
    
    projectItems.forEach(project => {
        project.addEventListener('mouseenter', () => {
            const category = project.getAttribute('data-category');
            
            // Highlight corresponding skill
            skillItems.forEach(skill => {
                if (skill.getAttribute('data-category') === category) {
                    skill.classList.add('highlighted');
                }
            });
        });
        
        project.addEventListener('mouseleave', () => {
            // Remove all highlights
            skillItems.forEach(skill => {
                skill.classList.remove('highlighted');
            });
        });
    });
}

// ===================================
// SECTION ENTRANCE ANIMATIONS
// ===================================
function setupSectionAnimations() {
    const sections = gsap.utils.toArray('section');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.from(section, {
                        y: 30,
                        opacity: 0.5,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.05 });
        
        observer.observe(section);
    });
}

// ===================================
// TIMELINE ANIMATIONS
// ===================================
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        gsap.from(item, {
                            x: -50,
                            opacity: 0,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    }, index * 100);
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
}

// ===================================
// BLOG CARDS ANIMATION
// ===================================
function setupBlogAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        gsap.from(card, {
                            y: 50,
                            opacity: 0,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    }, index * 150);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function setupSmoothScroll() {
    // Smooth scroll for anchor links
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
}

// ===================================
// RESPONSIVE HANDLING
// ===================================
function handleResize() {
    // Refresh on resize
}

// ===================================
// INITIALIZE
// ===================================
function init() {
    // Setup all animations and interactions
    animateCircularCharts();
    animateProgressBars();
    animateSkillBars();
    setupSkillsInteraction();
    setupFilterButtons();
    setupProjectHoverHighlight();
    setupSectionAnimations();
    setupTimelineAnimations();
    setupBlogAnimations();
    setupSmoothScroll();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

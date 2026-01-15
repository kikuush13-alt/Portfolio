// =========================================
// KHADIJA PORTFOLIO - MAIN JS
// Consolidated and optimized
// =========================================

'use strict';

// =========================================
// 1. SMOOTH SCROLLING & ANCHOR LINKS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 64;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Close mobile menu if exists
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    }
  });
});

// =========================================
// 2. STICKY HEADER ON SCROLL
// =========================================
const header = document.querySelector('.site-header');
const toggleHeader = () => {
  if (header) {
    if (window.scrollY > 100) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  }
};
window.addEventListener('scroll', toggleHeader);
window.addEventListener('load', toggleHeader);

// =========================================
// 3. MOBILE MENU TOGGLE
// =========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// =========================================
// 4. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
// =========================================
const reveals = document.querySelectorAll('.section-hero, .about-card, .cluster, .project-card, .blog-card, .contact-form, .contact-info, .timeline, .resume');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => io.observe(el));

// =========================================
// 5. ACCORDION SKILLS - EXPAND/COLLAPSE
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      
      // Close all other accordions
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current accordion
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

// =========================================
// 6. PROJECTS FILTER WITH GSAP
// =========================================
const projectFilterButtons = document.querySelectorAll('.section-projects .filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

// Show all projects on load
projectCards.forEach(card => {
  card.style.display = 'block';
  card.style.opacity = '1';
  card.style.visibility = 'visible';
});

projectFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    projectFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    const hideCards = [];
    const showCards = [];
    
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        showCards.push(card);
      } else {
        hideCards.push(card);
      }
    });
    
    // Use GSAP if available
    if (typeof gsap !== 'undefined') {
      if (hideCards.length > 0) {
        gsap.to(hideCards, {
          opacity: 0,
          scale: 0.85,
          y: -30,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power3.in',
          onComplete: () => {
            hideCards.forEach(card => card.style.display = 'none');
          }
        });
      }
      
      if (showCards.length > 0) {
        showCards.forEach(card => card.style.display = 'block');
        gsap.fromTo(showCards, 
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', delay: 0.25 }
        );
      }
    } else {
      // Fallback without GSAP
      hideCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
      });
      showCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
      });
    }
  });
});

// =========================================
// 7. BLOG FILTER
// =========================================
const blogFilterButtons = document.querySelectorAll('.section-blog .filter-btn');
const blogCards = document.querySelectorAll('#blogGrid .blog-card');

blogFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    const hideCards = [];
    const showCards = [];
    
    blogCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        showCards.push(card);
      } else {
        hideCards.push(card);
      }
    });
    
    if (typeof gsap !== 'undefined') {
      if (hideCards.length > 0) {
        gsap.to(hideCards, {
          opacity: 0,
          scale: 0.85,
          y: -30,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power3.in',
          onComplete: () => {
            hideCards.forEach(card => card.style.display = 'none');
          }
        });
      }
      
      if (showCards.length > 0) {
        showCards.forEach(card => {
          card.style.display = 'grid';
          card.classList.add('is-visible');
        });
        gsap.fromTo(showCards, 
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', delay: 0.25 }
        );
      }
    } else {
      hideCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
      });
      showCards.forEach(card => {
        card.style.display = 'grid';
        card.style.opacity = '1';
      });
    }
  });
});

// =========================================
// 8. BLOG MODALS
// =========================================
const modals = document.querySelectorAll('.modal');
const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
};
const closeModal = (modal) => modal.classList.remove('open');

document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.target));
});

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
      closeModal(modal);
    }
  });
});

// =========================================
// 9. CONTACT FORM
// =========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formNote = document.getElementById('formNote');
    if (formNote) {
      formNote.textContent = 'Nachricht wird gesendet...';
      formNote.style.color = 'green';
      setTimeout(() => {
        formNote.textContent = 'Vielen Dank! Deine Nachricht wurde gesendet.';
        contactForm.reset();
      }, 1500);
    }
  });
}

// =========================================
// 10. SKILL BARS ANIMATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // Linear skill bars
  const skillBars = document.querySelectorAll('.resume .skills-prog .bar');
  skillBars.forEach((bar, i) => {
    const li = bar.closest('li');
    if (li) {
      const percent = li.getAttribute('data-percent') || 0;
      const delay = i * 150;
      setTimeout(() => {
        bar.style.transition = 'width 1s cubic-bezier(0.19, 1, 0.22, 1)';
        bar.style.width = percent + '%';
      }, delay);
    }
  });

  // Circular MBTI skill bars
  const circleBars = document.querySelectorAll('.mbti-item');
  circleBars.forEach((li, i) => {
    const percent = li.getAttribute('data-percent') || 0;
    const progressCircle = li.querySelector('.mbti-progress');
    const percentText = li.querySelector('.mbti-percent');
    const delay = i * 150;

    if (progressCircle) {
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      progressCircle.style.strokeDasharray = circumference;
      progressCircle.style.strokeDashoffset = circumference;

      setTimeout(() => {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }, delay);
    }

    if (percentText) {
      setTimeout(() => {
        percentText.textContent = percent + '%';
        percentText.style.opacity = 1;
      }, delay);
    }
  });
});

// =========================================
// 11. HERO WORD ANIMATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.word');
  if (words.length > 0 && !words[0].dataset._wordAnimated) {
    words.forEach((word, i) => {
      setTimeout(() => {
        word.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, i * 200);
      word.dataset._wordAnimated = '1';
    });
  }
});

// =========================================
// 12. GSAP ANIMATIONS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on hero elements
    gsap.to('.hero-bg-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.hero-cutout-wrapper', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom center',
        scrub: true
      }
    });

    gsap.to('.hero-text-container', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom center',
        scrub: true
      }
    });

    // Project cards parallax
    const projectMedia = document.querySelectorAll('.project-media');
    projectMedia.forEach(media => {
      gsap.to(media, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: media.closest('.project-card'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Blog thumbnails parallax
    const blogThumbs = document.querySelectorAll('.blog-thumb');
    blogThumbs.forEach(thumb => {
      gsap.to(thumb, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: thumb.closest('.blog-card'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Section titles animation
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        y: 60
      });
    });

    // Timeline animations
    const timelineEvents = gsap.utils.toArray('.timeline-event');
    timelineEvents.forEach((event) => {
      const card = event.querySelector('.event-card');
      const dot = event.querySelector('.event-marker');
      const isLeft = !!event.querySelector('.event-content.left');
      const slideX = isLeft ? -20 : 20;

      if (event) {
        gsap.set(event, { opacity: 0, y: 40 });
        if (card) gsap.set(card, { x: slideX, opacity: 0 });
        if (dot) gsap.set(dot, { scale: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: event,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
          }
        });

        tl.to(event, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0);
        if (card) tl.to(card, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.08);
        if (dot) tl.to(dot, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.12);
      }
    });

    // Timeline line reveal
    const spine = document.querySelector('.timeline-line');
    if (spine) {
      gsap.fromTo(spine, 
        { opacity: 0.25 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        }
      );
    }
  }
});

// =========================================
// 13. TIMELINE EVENT TOGGLES
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const eventToggles = document.querySelectorAll('.event-toggle');
  eventToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const card = toggle.closest('.event-card');
      const description = card.querySelector('.event-description');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.textContent = isExpanded ? 'Mehr' : 'Weniger';
      
      if (description) {
        description.style.display = isExpanded ? 'none' : 'block';
      }
    });
  });
});

// =========================================
// 14. MBTI PERSONALITY WIDGET
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const mbtiItems = document.querySelectorAll('.mbti-item');
  const mbtiInfo = document.getElementById('mbti-info');
  const mbtiAspectText = document.getElementById('mbti-aspect-text');
  const mbtiClose = document.querySelector('.mbti-close');

  const aspectDescriptions = {
    'Introvertiert': 'Zieht Energie aus der inneren Welt der Gedanken und Reflexion statt aus sozialen Interaktionen.',
    'Intuitiv': 'Fokussiert auf Muster, Möglichkeiten und zukünftige Potenziale statt auf konkrete Details.',
    'Analytisch': 'Trifft Entscheidungen basierend auf Logik, Objektivität und rationaler Analyse.',
    'Kreativ': 'Erforscht unkonventionelle Ideen und findet innovative Lösungen für komplexe Probleme.'
  };

  mbtiItems.forEach(item => {
    item.addEventListener('click', () => {
      const aspect = item.getAttribute('data-aspect');
      mbtiItems.forEach(i => i.setAttribute('aria-pressed', 'false'));
      item.setAttribute('aria-pressed', 'true');
      
      if (mbtiAspectText && aspect && aspectDescriptions[aspect]) {
        mbtiAspectText.textContent = aspectDescriptions[aspect];
      }
      
      if (mbtiInfo) {
        mbtiInfo.style.display = 'block';
      }
    });
  });

  if (mbtiClose) {
    mbtiClose.addEventListener('click', () => {
      if (mbtiInfo) mbtiInfo.style.display = 'none';
      mbtiItems.forEach(i => i.setAttribute('aria-pressed', 'false'));
      if (mbtiAspectText) {
        mbtiAspectText.textContent = 'Tippe auf einen Kreis, um mehr zu erfahren';
      }
    });
  }
});

// =========================================
// 15. MOUSE PARALLAX EFFECT
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length > 0 && !document.body.dataset._hasMouseParallax) {
    document.addEventListener('mousemove', (e) => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        const x = (e.clientX - window.innerWidth / 2) * (speed / 100);
        const y = (e.clientY - window.innerHeight / 2) * (speed / 100);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
    document.body.dataset._hasMouseParallax = '1';
  }
});

// =========================================
// 16. PRINT SUPPORT
// =========================================
if (window.matchMedia && !window._portfolioPrintBound) {
  window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = 'white';
  });
  window.addEventListener('afterprint', () => {
    document.body.style.backgroundColor = '';
  });
  window._portfolioPrintBound = true;
}

// =========================================
// 17. HERO CIRCLE ELEMENT CLICK
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const circleElement = document.querySelector('.hero-circle-element');
  if (circleElement) {
    circleElement.addEventListener('click', () => {
      const expertiseSection = document.getElementById('expertise');
      if (expertiseSection) {
        const offset = 64;
        const y = expertiseSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  }
});

console.log('✨ Portfolio JS loaded successfully!');

// =========================================
// KHADIJA PORTFOLIO - OPTIMIZED JS
// =========================================

// 1. SMOOTH SCROLLING & ANCHOR LINKS
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
      }
    }
  });
});

// 2. STICKY HEADER ON SCROLL
const header = document.querySelector('.site-header');
const toggleHeader = () => {
  if (header) {
    if (window.scrollY > 100) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  }
};
window.addEventListener('scroll', toggleHeader);
window.addEventListener('load', toggleHeader);

// 3. SKILL ITEMS - EXPAND/COLLAPSE
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  const trigger = item.querySelector('.skill-trigger');
  
  trigger.addEventListener('click', () => {
    skillItems.forEach(other => other.classList.remove('active'));
    item.classList.add('active');
  });
});

// 4. PROJECTS FILTER
const projectFilterButtons = document.querySelectorAll('.section-projects .filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

projectFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    projectFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = 'block';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  });
});

// 5. BLOG FILTER
const blogFilterButtons = document.querySelectorAll('.section-blog .filter-btn');
const blogCards = document.querySelectorAll('#blogGrid .blog-card');

blogFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    blogCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  });
});

// 6. SKILL BARS ANIMATION
document.addEventListener('DOMContentLoaded', () => {
  const skillBars = document.querySelectorAll('.resume .skills-prog .bar');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const li = bar.closest('li');
        const percent = li.getAttribute('data-percent') || 0;
        
        setTimeout(() => {
          bar.style.width = percent + '%';
        }, 100);
        
        observer.unobserve(bar);
      }
    });
  }, observerOptions);
  
  skillBars.forEach(bar => observer.observe(bar));
});

// 7. CIRCULAR SKILL ANIMATION (SVG)
document.addEventListener('DOMContentLoaded', () => {
  const circleSkills = document.querySelectorAll('.skills-soft li');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const li = entry.target;
        const percent = li.getAttribute('data-percent') || 0;
        const circle = li.querySelector('.cbar');
        
        if (circle && circle.r) {
          const radius = circle.r.baseVal.value;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (percent / 100) * circumference;
          
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference;
          
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, 200);
        }
        
        observer.unobserve(li);
      }
    });
  }, observerOptions);
  
  circleSkills.forEach(li => observer.observe(li));
});

// 8. HERO WORD ANIMATION
document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.word');
  words.forEach((word, i) => {
    setTimeout(() => {
      word.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    }, i * 200);
  });
});

// 9. SCROLL REVEAL ANIMATIONS
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('section h2, .resume, .timeline-event, .project-card, .blog-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  elements.forEach(el => observer.observe(el));
});

// 10. PARALLAX EFFECT ON SCROLL
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Project cards parallax
  const projectCards = document.querySelectorAll('.project-media');
  projectCards.forEach(media => {
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
  
  // Blog parallax
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
}

// 11. BLOG MODALS
const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
};

const closeModal = (modal) => modal.classList.remove('open');

document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.target));
});

const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
      closeModal(modal);
    }
  });
});

// 12. CONTACT FORM
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

// 13. ENHANCED SCROLL ANIMATIONS WITH GSAP
if (typeof gsap !== 'undefined') {
  // Smooth scroll title animations
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
}

// 14. MOUSE MOVE PARALLAX (Optional - nur bei Bedarf)
document.addEventListener('mousemove', (e) => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const speed = el.getAttribute('data-parallax');
    const x = (e.clientX * speed) / 100;
    const y = (e.clientY * speed) / 100;
    el.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// 15. PRINT STYLES SUPPORT
window.addEventListener('beforeprint', () => {
  document.body.style.backgroundColor = 'white';
});

window.addEventListener('afterprint', () => {
  document.body.style.backgroundColor = '';
});

console.log('✨ Portfolio JS loaded successfully!');
// =========================================
// Smooth scrolling for anchors
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 64; // header height
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // close mobile menu
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    }
  });
});

// =========================================
// Sticky header on scroll
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
// Mobile menu toggle
// =========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// =========================================
// IntersectionObserver for reveal animations
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
// Projects filter
// =========================================
const projectFilterButtons = document.querySelectorAll('.section-projects .filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

// Zeige alle Projekte beim Laden
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
    
    // Animate cards out first
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
    
    // Hide cards - Clean & Fast
    if (hideCards.length > 0) {
      gsap.to(hideCards, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power3.in',
        onComplete: () => {
          hideCards.forEach(card => {
            card.style.display = 'none';
          });
        }
      });
    }
    
    // Show cards - Clean & Powerful
    if (showCards.length > 0) {
      showCards.forEach(card => {
        card.style.display = 'block';
      });
      
      gsap.fromTo(showCards, 
        {
          opacity: 0,
          scale: 0.85,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.25
        }
      );
    }
  });
});

// =========================================
// Blog filter
// =========================================
const blogFilterButtons = document.querySelectorAll('.section-blog .filter-btn');
const blogCards = document.querySelectorAll('#blogGrid .blog-card');

blogFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    // Animate blog cards
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
    
    // Hide cards - Clean & Fast
    if (hideCards.length > 0) {
      gsap.to(hideCards, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power3.in',
        onComplete: () => {
          hideCards.forEach(card => {
            card.style.display = 'none';
          });
        }
      });
    }
    
    // Show cards - Clean & Powerful
    if (showCards.length > 0) {
      showCards.forEach(card => {
        card.style.display = 'grid';
        card.classList.add('is-visible');
      });
      
      gsap.fromTo(showCards, 
        {
          opacity: 0,
          scale: 0.85,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.25
        }
      );
    }
  });
});

// =========================================
// Blog modals (Read More)
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
// Contact Form Handler
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
// Resume Section - Skills Animation
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // PARALLAX EFFECT ON HERO SECTION
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on Hero Background Image
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

    // Parallax on Cutout Wrapper
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

    // Parallax on Text (subtler effect)
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
  }

  // 1. Linear Skill Bars (Technical Skills)
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

  // 2. Circular Skill Bars (Soft/Adobe Skills)
  const circleBars = document.querySelectorAll('.resume .skills-soft li');
  circleBars.forEach((li, i) => {
      const percent = li.getAttribute('data-percent') || 0;
      const cbar = li.querySelector('.cbar');
      const small = li.querySelector('small');
      const delay = i * 150;

      if (cbar) {
          // Radius is 45 (from HTML), Circumference = 2 * PI * 45 ≈ 282.74
          const radius = 45;
          const circumference = 2 * Math.PI * radius;
          
          // Set initial dasharray
          cbar.style.strokeDasharray = circumference;
          cbar.style.strokeDashoffset = circumference;

          setTimeout(() => {
              const offset = circumference - (percent / 100) * circumference;
              cbar.style.strokeDashoffset = offset;
          }, delay);
      }

      if (small) {
          // Count up animation for text
          setTimeout(() => {
            small.textContent = percent + '%';
            small.style.opacity = 1;
          }, delay);
      }
  });

  // Hover-Effekte auf Resume Funktions-Blöcke
  const funcSections = document.querySelectorAll('.resume .func > div');
  funcSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      const h3 = section.querySelector('h3');
      const icon = section.querySelector('h3 i');
      if (h3) h3.style.letterSpacing = '1.6px';
      if (icon) icon.style.transform = 'scale(1.2)';
    });

    section.addEventListener('mouseleave', () => {
      const h3 = section.querySelector('h3');
      const icon = section.querySelector('h3 i');
      if (h3) h3.style.letterSpacing = '0.65px';
      if (icon) icon.style.transform = 'scale(1)';
    });
  });
  
  // Zusätzliche (nicht-doppelte) Features: Skill-Items, Hero-Wort-Animation, Maus-Parallax, Print-Styles

  // SKILL ITEMS - EXPAND/COLLAPSE (nur hinzufügen, falls vorhanden und noch nicht behandelt)
  (function() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems || skillItems.length === 0) return;
  
    // Schütze vor doppelten Listenern
    if (skillItems[0].dataset._hasSkillTrigger) return;
  
    skillItems.forEach(item => {
      const trigger = item.querySelector('.skill-trigger') || item;
      trigger.addEventListener('click', () => {
        skillItems.forEach(other => other.classList.remove('active'));
        item.classList.add('active');
      });
    });
  
    // Markiere, damit beim erneuten Anhängen nicht doppelt gearbeitet wird
    skillItems.forEach(si => si.dataset._hasSkillTrigger = '1');
  })();
  
  // HERO WORD ANIMATION (sanftes Einblenden, nur wenn .word vorhanden)
  (function() {
    const words = document.querySelectorAll('.word');
    if (!words || words.length === 0) return;
  
    // Verhindere doppelte Animationen
    if (words[0].dataset._wordAnimated) return;
  
    words.forEach((word, i) => {
      setTimeout(() => {
        word.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, i * 200);
    });
  
    words.forEach(w => w.dataset._wordAnimated = '1');
  })();
  
  // MAUS MOVE PARALLAX (Optional - nur hinzufügen, falls data-parallax-Elemente existieren)
  (function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements || parallaxElements.length === 0) return;
  
    // Vermeide mehrfaches Binden
    if (document.body.dataset._hasMouseParallax) return;
  
    document.addEventListener('mousemove', (e) => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        // Nutze Zentrum als Ursprung für gleichmäßigere Bewegungen
        const x = (e.clientX - window.innerWidth / 2) * (speed / 100);
        const y = (e.clientY - window.innerHeight / 2) * (speed / 100);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
  
    document.body.dataset._hasMouseParallax = '1';
  })();
  
  // PRINT STYLES SUPPORT
  (function() {
    if (window.matchMedia) {
      // Verhindere mehrfaches Binden
      if (window._portfolioPrintBound) return;
      window.addEventListener('beforeprint', () => {
        document.body.style.backgroundColor = 'white';
      });
      window.addEventListener('afterprint', () => {
        document.body.style.backgroundColor = '';
      });
      window._portfolioPrintBound = true;
    }
  })();
  
  console.log('✨ Zusätzliche Portfolio JS-Features geladen (Merge ohne Löschungen).');
});
// Stabiler, einfach zu wartender Timeline-Handler
// - Sichtbarkeits-Reveal per GSAP und ScrollTrigger
// - Subtile Animationen für Timeline-Events und zentrale Linie

window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const events = gsap.utils.toArray('.timeline-event');

  events.forEach((event, index) => {
    const card = event.querySelector('.event-card');
    const dot = event.querySelector('.event-marker');
    const label = event.querySelector('.timeline-marker__label');

    // determine left/right by content classes
    const isLeft = !!event.querySelector('.event-content.left');
    const slideX = isLeft ? -20 : 20;

    // guards
    if (!event) return;

    // Set initial states
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

    // Label subtle fade in
    if (label) {
      gsap.set(label, { opacity: 0 });
    }
  });

  // Parallax / subtle reveal for the central line (timeline-line)
  const spine = document.querySelector('.timeline-line');
  if (spine) {
    gsap.fromTo(spine, { opacity: 0.25 }, {
      opacity: 1,
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
  }
});
// =========================================
// Smooth scrolling for anchors
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 64; // header height
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // close mobile menu
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    }
  });
});

// =========================================
// Sticky header on scroll
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
// Mobile menu toggle
// =========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// =========================================
// IntersectionObserver for reveal animations
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
// Projects filter
// =========================================
const projectFilterButtons = document.querySelectorAll('.section-projects .filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

// Zeige alle Projekte beim Laden
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
    
    // Animate cards out first
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
    
    // Hide cards - Clean & Fast
    if (hideCards.length > 0) {
      gsap.to(hideCards, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power3.in',
        onComplete: () => {
          hideCards.forEach(card => {
            card.style.display = 'none';
          });
        }
      });
    }
    
    // Show cards - Clean & Powerful
    if (showCards.length > 0) {
      showCards.forEach(card => {
        card.style.display = 'block';
      });
      
      gsap.fromTo(showCards, 
        {
          opacity: 0,
          scale: 0.85,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.25
        }
      );
    }
  });
});

// =========================================
// Blog filter
// =========================================
const blogFilterButtons = document.querySelectorAll('.section-blog .filter-btn');
const blogCards = document.querySelectorAll('#blogGrid .blog-card');

blogFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    // Animate blog cards
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
    
    // Hide cards - Clean & Fast
    if (hideCards.length > 0) {
      gsap.to(hideCards, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power3.in',
        onComplete: () => {
          hideCards.forEach(card => {
            card.style.display = 'none';
          });
        }
      });
    }
    
    // Show cards - Clean & Powerful
    if (showCards.length > 0) {
      showCards.forEach(card => {
        card.style.display = 'grid';
        card.classList.add('is-visible');
      });
      
      gsap.fromTo(showCards, 
        {
          opacity: 0,
          scale: 0.85,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.25
        }
      );
    }
  });
});

// =========================================
// Blog modals (Read More)
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
// Contact Form Handler
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
// Resume Section - Skills Animation
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // PARALLAX EFFECT ON HERO SECTION
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on Hero Background Image
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

    // Parallax on Cutout Wrapper
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

    // Parallax on Text (subtler effect)
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
  }

  // 1. Linear Skill Bars (Technical Skills)
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

  // 2. Circular Skill Bars (Soft/Adobe Skills)
  const circleBars = document.querySelectorAll('.resume .skills-soft li');
  circleBars.forEach((li, i) => {
      const percent = li.getAttribute('data-percent') || 0;
      const cbar = li.querySelector('.cbar');
      const small = li.querySelector('small');
      const delay = i * 150;

      if (cbar) {
          // Radius is 45 (from HTML), Circumference = 2 * PI * 45 ≈ 282.74
          const radius = 45;
          const circumference = 2 * Math.PI * radius;
          
          // Set initial dasharray
          cbar.style.strokeDasharray = circumference;
          cbar.style.strokeDashoffset = circumference;

          setTimeout(() => {
              const offset = circumference - (percent / 100) * circumference;
              cbar.style.strokeDashoffset = offset;
          }, delay);
      }

      if (small) {
          // Count up animation for text
          setTimeout(() => {
            small.textContent = percent + '%';
            small.style.opacity = 1;
          }, delay);
      }
  });

  // Hover-Effekte auf Resume Funktions-Blöcke
  const funcSections = document.querySelectorAll('.resume .func > div');
  funcSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      const h3 = section.querySelector('h3');
      const icon = section.querySelector('h3 i');
      if (h3) h3.style.letterSpacing = '1.6px';
      if (icon) icon.style.transform = 'scale(1.2)';
    });

    section.addEventListener('mouseleave', () => {
      const h3 = section.querySelector('h3');
      const icon = section.querySelector('h3 i');
      if (h3) h3.style.letterSpacing = '0.65px';
      if (icon) icon.style.transform = 'scale(1)';
    });
  });
  
  // Zusätzliche (nicht-doppelte) Features: Skill-Items, Hero-Wort-Animation, Maus-Parallax, Print-Styles

  // SKILL ITEMS - EXPAND/COLLAPSE (nur hinzufügen, falls vorhanden und noch nicht behandelt)
  (function() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems || skillItems.length === 0) return;
  
    // Schütze vor doppelten Listenern
    if (skillItems[0].dataset._hasSkillTrigger) return;
  
    skillItems.forEach(item => {
      const trigger = item.querySelector('.skill-trigger') || item;
      trigger.addEventListener('click', () => {
        skillItems.forEach(other => other.classList.remove('active'));
        item.classList.add('active');
      });
    });
  
    // Markiere, damit beim erneuten Anhängen nicht doppelt gearbeitet wird
    skillItems.forEach(si => si.dataset._hasSkillTrigger = '1');
  })();
  
  // HERO WORD ANIMATION (sanftes Einblenden, nur wenn .word vorhanden)
  (function() {
    const words = document.querySelectorAll('.word');
    if (!words || words.length === 0) return;
  
    // Verhindere doppelte Animationen
    if (words[0].dataset._wordAnimated) return;
  
    words.forEach((word, i) => {
      setTimeout(() => {
        word.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, i * 200);
    });
  
    words.forEach(w => w.dataset._wordAnimated = '1');
  })();
  
  // MAUS MOVE PARALLAX (Optional - nur hinzufügen, falls data-parallax-Elemente existieren)
  (function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements || parallaxElements.length === 0) return;
  
    // Vermeide mehrfaches Binden
    if (document.body.dataset._hasMouseParallax) return;
  
    document.addEventListener('mousemove', (e) => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        // Nutze Zentrum als Ursprung für gleichmäßigere Bewegungen
        const x = (e.clientX - window.innerWidth / 2) * (speed / 100);
        const y = (e.clientY - window.innerHeight / 2) * (speed / 100);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
  
    document.body.dataset._hasMouseParallax = '1';
  })();
  
  // PRINT STYLES SUPPORT
  (function() {
    if (window.matchMedia) {
      // Verhindere mehrfaches Binden
      if (window._portfolioPrintBound) return;
      window.addEventListener('beforeprint', () => {
        document.body.style.backgroundColor = 'white';
      });
      window.addEventListener('afterprint', () => {
        document.body.style.backgroundColor = '';
      });
      window._portfolioPrintBound = true;
    }
  })();
  
  console.log('✨ Zusätzliche Portfolio JS-Features geladen (Merge ohne Löschungen).');
});
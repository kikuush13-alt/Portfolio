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
// Minimal GSAP-like animation library for offline use
const gsap = {
    plugins: {},
    
    registerPlugin: function(...plugins) {
        plugins.forEach(plugin => {
            if (plugin.name) {
                this.plugins[plugin.name] = plugin;
            }
        });
    },
    
    to: function(target, vars) {
        const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
        const duration = (vars.duration || 0.5) * 1000;
        const delay = (vars.delay || 0) * 1000;
        
        elements.forEach(element => {
            setTimeout(() => {
                if (!element) return;
                
                element.style.transition = `all ${duration}ms ${vars.ease || 'ease'}`;
                
                Object.keys(vars).forEach(prop => {
                    if (['duration', 'delay', 'ease', 'scrollTrigger', 'onComplete'].includes(prop)) return;
                    
                    if (prop === 'x') {
                        element.style.transform = `translateX(${vars[prop]}px)`;
                    } else if (prop === 'y') {
                        element.style.transform = `translateY(${vars[prop]}px)`;
                    } else if (prop === 'scale') {
                        element.style.transform = `scale(${vars[prop]})`;
                    } else if (prop === 'opacity') {
                        element.style.opacity = vars[prop];
                    } else if (prop === 'width') {
                        element.style.width = vars[prop];
                    } else if (prop === 'strokeDashoffset') {
                        element.style.strokeDashoffset = vars[prop];
                    }
                });
                
                if (vars.onComplete) {
                    setTimeout(vars.onComplete, duration);
                }
            }, delay);
        });
        
        return this;
    },
    
    from: function(target, vars) {
        const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
        
        elements.forEach(element => {
            if (!element) return;
            
            const initialStyles = {};
            const transformParts = [];
            
            Object.keys(vars).forEach(prop => {
                if (['duration', 'delay', 'ease', 'scrollTrigger', 'onComplete'].includes(prop)) return;
                
                if (prop === 'x') {
                    transformParts.push(`translateX(${vars[prop]}px)`);
                } else if (prop === 'y') {
                    transformParts.push(`translateY(${vars[prop]}px)`);
                } else if (prop === 'opacity') {
                    initialStyles.opacity = vars[prop];
                }
            });
            
            if (transformParts.length > 0) {
                initialStyles.transform = transformParts.join(' ');
            }
            
            Object.assign(element.style, initialStyles);
            
            requestAnimationFrame(() => {
                const targetVars = { ...vars };
                if (vars.x !== undefined) targetVars.x = 0;
                if (vars.y !== undefined) targetVars.y = 0;
                if (vars.opacity !== undefined) targetVars.opacity = 1;
                
                this.to(element, targetVars);
            });
        });
        
        return this;
    },
    
    utils: {
        toArray: function(selector) {
            if (typeof selector === 'string') {
                return Array.from(document.querySelectorAll(selector));
            }
            return Array.isArray(selector) ? selector : [selector];
        }
    }
};

// ScrollTrigger plugin
const ScrollTrigger = {
    name: 'ScrollTrigger',
    
    create: function(vars) {
        const trigger = typeof vars.trigger === 'string' 
            ? document.querySelector(vars.trigger) 
            : vars.trigger;
        
        if (!trigger) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (vars.onEnter) vars.onEnter();
                    if (vars.once) {
                        observer.unobserve(trigger);
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(trigger);
        
        return {
            kill: () => observer.disconnect()
        };
    },
    
    refresh: function() {
        // Placeholder for refresh functionality
    }
};

// Make gsap and ScrollTrigger available globally
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

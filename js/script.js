// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    /* ===========================
       LOADING SCREEN
       =========================== */
    const loader = document.querySelector('.loader');
    
    // Simulate loading time
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 2500);
    }

    /* ===========================
       SCROLL PROGRESS BAR
       =========================== */
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    /* ===========================
       CUSTOM CURSOR
       =========================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if device supports hover
    if (cursorDot && cursorOutline && window.matchMedia("(any-hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline has a slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Cursor hover effects on links/buttons
        const hoverElements = document.querySelectorAll('a, button, .product-card, .lookbook-item, .bento-item, .ig-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* ===========================
       MAGNETIC BUTTON EFFECT
       =========================== */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    if (window.matchMedia("(any-hover: hover)").matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    /* ===========================
       STICKY NAVBAR
       =========================== */
    const navbar = document.querySelector('.navbar');
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (navbar && announcementBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > announcementBar.offsetHeight) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }

    /* ===========================
       MOBILE MENU
       =========================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    /* ===========================
       HERO SLIDER
       =========================== */
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if(slides.length > 0) {
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 6 seconds
        setInterval(nextSlide, 6000);
    }

    /* ===========================
       HORIZONTAL PRODUCT SLIDER
       =========================== */
    const sliderContainer = document.querySelector('.product-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (sliderContainer && prevBtn && nextBtn) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse Events for drag
        sliderContainer.parentElement.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderContainer.parentElement.classList.add('active');
            startX = e.pageX - sliderContainer.parentElement.offsetLeft;
            scrollLeft = sliderContainer.parentElement.scrollLeft;
        });
        
        sliderContainer.parentElement.addEventListener('mouseleave', () => {
            isDown = false;
            sliderContainer.parentElement.classList.remove('active');
        });
        
        sliderContainer.parentElement.addEventListener('mouseup', () => {
            isDown = false;
            sliderContainer.parentElement.classList.remove('active');
        });
        
        sliderContainer.parentElement.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderContainer.parentElement.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            sliderContainer.parentElement.scrollLeft = scrollLeft - walk;
        });

        // Button events
        
        nextBtn.addEventListener('click', () => {
            const cardElement = document.querySelector('.slide-card');
            if (cardElement) {
                const cardWidth = cardElement.offsetWidth + 40; // width + gap
                sliderContainer.parentElement.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
            }
        });
        
        prevBtn.addEventListener('click', () => {
            const cardElement = document.querySelector('.slide-card');
            if (cardElement) {
                const cardWidth = cardElement.offsetWidth + 40; // width + gap
                sliderContainer.parentElement.scrollBy({
                    left: -cardWidth,
                    behavior: 'smooth'
                });
            }
        });
    }

    /* ===========================
       COUNTDOWN TIMER
       =========================== */
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    
    if(daysEl) {
        // Set target date to 3 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        
        function updateCountdown() {
            const now = new Date();
            const diff = targetDate - now;
            
            if (diff > 0) {
                const d = Math.floor(diff / 1000 / 60 / 60 / 24);
                const h = Math.floor(diff / 1000 / 60 / 60) % 24;
                const m = Math.floor(diff / 1000 / 60) % 60;
                const s = Math.floor(diff / 1000) % 60;
                
                daysEl.innerHTML = d < 10 ? '0' + d : d;
                hoursEl.innerHTML = h < 10 ? '0' + h : h;
                minsEl.innerHTML = m < 10 ? '0' + m : m;
                secsEl.innerHTML = s < 10 ? '0' + s : s;
            }
        }
        
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    /* ===========================
       SCROLL REVEAL ANIMATIONS
       =========================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ===========================
       PARALLAX EFFECTS (Vanilla JS GSAP alternative)
       =========================== */
    const parallaxImages = document.querySelectorAll('.story-img-wrapper, .parallax-item img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxImages.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed * 0.1);
            // check if the element is currently in viewport for better performance
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // If it is story img
                if (el.classList.contains('story-img-wrapper')) {
                    el.style.transform = `translateY(${yPos}px)`;
                } else {
                    el.style.transform = `scale(1.1) translateY(${yPos * 0.5}px)`;
                }
            }
        });
    });

    /* ===========================
       ANIMATED COUNTER
       =========================== */
    const counters = document.querySelectorAll('.counter');
    let animationStarted = false;
    
    const counterOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const duration = 2000; // ms
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            // Format based on decimal presence
                            counter.innerText = Number.isInteger(target) ? Math.ceil(current) : current.toFixed(1);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCounter();
                });
                animationStarted = true;
                observer.disconnect();
            }
        });
    }, counterOptions);
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    /* ===========================
       FAQ ACCORDION
       =========================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Toggle current item
            if(item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Close other open items
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                item.classList.add('active');
            }
        });
    });

    /* ===========================
       BACK TO TOP BUTTON
       =========================== */
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 800) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ===========================
       CART/WISHLIST INTERACTIONS
       =========================== */
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCountDisplay = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            count++;
            if (cartCountDisplay) cartCountDisplay.textContent = count;
            
            // Animation effect on button
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="ph ph-check"></i>';
            btn.style.backgroundColor = 'var(--clr-primary)';
            btn.style.color = 'var(--clr-accent)';
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 1500);
        });
    });
    
    const wishlistBtns = document.querySelectorAll('.action-btn[title="Add to Wishlist"]');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = btn.querySelector('i');
            if (icon && icon.classList.contains('ph-heart')) {
                icon.classList.replace('ph-heart', 'ph-heart-fill');
                icon.style.color = '#ff3333';
            } else if (icon) {
                icon.classList.replace('ph-heart-fill', 'ph-heart');
                icon.style.color = '';
            }
        });
    });
});

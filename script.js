document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. מנגנון שאלות ותשובות (אקורדיון נפתח בלחיצה)
    // ==========================================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');

        if (trigger && content) {
            trigger.addEventListener('click', function() {
                const isOpen = item.classList.contains('active-item');

                // סגירת שאר הפריטים הפתוחים למראה נקי
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active-item');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }
                });

                // פתיחת הפריט הנוכחי
                if (!isOpen) {
                    item.classList.add('active-item');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });


    // ==========================================
    // 2. מנגנון קרוסלת המלצות (משוב אחד בכל פעם)
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
        
        showSlide(currentSlide);
    }


    // ==========================================
    // 3. מנגנון התכהות המלל בגלילה (Scroll Fade-In)
    // ==========================================
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        // מפעיל את האפקט כשהאלמנט נמצא כ-15% מעל תחתית המסך
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.88
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                el.classList.add('is-visible');
            }
        });
    };

    // האזנה לאירוע גלילה
    window.addEventListener('scroll', handleScrollAnimation);

    // הפעלה ראשונית עבור אלמנטים שכבר נמצאים על המסך בטעינה
    setTimeout(handleScrollAnimation, 150);
});
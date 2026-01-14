(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('fixed-top').css('padding', '0 15px'); // Maintain padding on scroll
        } else {
            $('.nav-bar').removeClass('fixed-top').css('padding', '0 15px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Donation progress
    $('.donation-item .donation-progress').waypoint(function () {
        $('.donation-item .progress .progress-bar').each(function () {
            $(this).css("height", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'rotateOutUpRight',
        animateIn: 'rotateInDownLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Modern Animated Counter for Why Us Section
    function animateCounter(element, target, duration) {
        let startTime = null;
        const startValue = 0;

        // Easing function for smooth animation
        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function updateCounter(currentTime) {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Apply easing
            const easedProgress = easeOutExpo(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target; // Ensure final value is exact
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for scroll-triggered animations
    if ('IntersectionObserver' in window) {
        const statNumbers = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // Animate all counters with staggered delay
                    statNumbers.forEach(function (element, index) {
                        const target = parseInt(element.getAttribute('data-target'));
                        const delay = index * 100; // 100ms stagger between each

                        setTimeout(function () {
                            animateCounter(element, target, 2000);
                        }, delay);
                    });

                    // Unobserve after animation to prevent re-triggering
                    statNumbers.forEach(function (el) {
                        observer.unobserve(el);
                    });
                }
            });
        }, observerOptions);

        // Observe all stat numbers
        statNumbers.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        $(window).on('scroll', function () {
            const statSection = $('#why-us-section');
            if (statSection.length) {
                const sectionTop = statSection.offset().top;
                const windowBottom = $(window).scrollTop() + $(window).height();

                if (windowBottom > sectionTop + 200) {
                    $('.stat-number').each(function (index) {
                        const $this = $(this);
                        if (!$this.hasClass('counted')) {
                            $this.addClass('counted');
                            const target = parseInt($this.attr('data-target'));
                            setTimeout(() => {
                                animateCounter(this, target, 2000);
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }


    // Service Modal Functionality
    const serviceData = {
        website: {
            title: 'Website Design & Development',
            content: `
                <div class="service-detail">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-3" style="color: #003399;">Complete Web Development Solutions</h5>
                            <p>Our website development process begins with detailed requirement analysis and wireframing. We design responsive UI/UX interfaces and develop using modern technologies with clean, modular code.</p>
                            
                            <h6 class="mt-4 mb-3" style="color: #FFAC00;">Our Process:</h6>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Requirement Analysis & Planning</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Wireframing & Prototyping</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Responsive UI/UX Design</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Frontend & Backend Development</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Quality Testing & Deployment</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Ongoing Support & Maintenance</li>
                            </ul>
                            
                            <h6 class="mt-4 mb-3" style="color: #FFAC00;">Technologies We Use:</h6>
                            <div class="tech-tags">
                                <span class="badge bg-light text-dark me-2 mb-2">React.js</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Node.js</span>
                                <span class="badge bg-light text-dark me-2 mb-2">MongoDB</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Express.js</span>
                                <span class="badge bg-light text-dark me-2 mb-2">HTML5/CSS3</span>
                                <span class="badge bg-light text-dark me-2 mb-2">JavaScript</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        app: {
            title: 'App Design & Development',
            content: `
                <div class="service-detail">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-3" style="color: #003399;">Mobile Application Development</h5>
                            <p>We design and develop mobile applications with a strong focus on usability and performance. Our team builds native and hybrid apps with secure backend architecture and seamless API integrations.</p>
                            
                            <h6 class="mt-4 mb-3" style="color: #FFAC00;">Our Approach:</h6>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Native & Hybrid App Development</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Cross-Platform Solutions</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Secure Backend Architecture</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Seamless API Integrations</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Performance Optimization</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>App Store Deployment</li>
                            </ul>
                            
                            <h6 class="mt-4 mb-3" style="color: #FFAC00;">Platforms & Technologies:</h6>
                            <div class="tech-tags">
                                <span class="badge bg-light text-dark me-2 mb-2">React Native</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Flutter</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Firebase</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Android</span>
                                <span class="badge bg-light text-dark me-2 mb-2">iOS</span>
                                <span class="badge bg-light text-dark me-2 mb-2">REST APIs</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        uiux: {
            title: 'UI/UX Designing',
            content: `
                <div class="service-detail">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-3" style="color: #003399;">User-Centered Design Solutions</h5>
                            <p>Our UI/UX services focus on creating visually appealing and user-friendly digital experiences. We design intuitive interfaces aligned with business goals to ensure maximum user satisfaction.</p>
                            
                            <h6 class="mt-4 mb-3" style="color: #FFAC00;">Design Process:</h6>
                            <ul class="service-features">
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>User Research & Analysis</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Wireframing & User Flow</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Visual Design & Branding</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Interactive Prototyping</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Usability Testing</li>
                                <li><i class="fas fa-check-circle me-2" style="color: #003399;"></i>Design System Creation</li>
                            </ul>
                            
                            <h6 class="mt-4 mb-3" style="color: #FFAC00;">Design Tools:</h6>
                            <div class="tech-tags">
                                <span class="badge bg-light text-dark me-2 mb-2">Figma</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Adobe XD</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Sketch</span>
                                <span class="badge bg-light text-dark me-2 mb-2">InVision</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Photoshop</span>
                                <span class="badge bg-light text-dark me-2 mb-2">Illustrator</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Handle Read More clicks
    $('.read-more').on('click', function (e) {
        e.preventDefault();
        const serviceType = $(this).data('service');
        const service = serviceData[serviceType];

        if (service) {
            $('#serviceModalLabel').text(service.title);
            $('#serviceModalBody').html(service.content);
            $('#serviceModal').modal('show');
        }
    });


})(jQuery);


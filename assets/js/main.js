/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  // Get the banners
var banner1 = document.querySelector('[data-banner="first"]');
var banner2 = document.querySelector('[data-banner="second"]');


const closeBanner = (banner, activeClass, closeEl) => {
  // Get "close" element and add the event to remove active class 
  let close = banner.querySelector(`.${closeEl}`)
  close.addEventListener('click', () => {
    banner.classList.remove(activeClass);
  });
}

const activeBanner = (banner, activeClass, closeEl) => {
  // Active the banner and call the closeBanner function
  banner.classList.add(activeClass);
  closeBanner(banner, activeClass, closeEl)
}


// Banner one handler
const bannerOneHandler = (banner) => {
  activeBanner(banner, 'open', 'exponea-close');
};
// Banner two handler
const bannerTwoHandler = (banner) => {
  let executionFlag = true;
  const percentToScroll = 0.9;

  window.addEventListener('scroll', () => {
    let windowHeightScroll = window.innerHeight + window.scrollY;
    let targetScroll = document.body.offsetHeight * percentToScroll

    if (windowHeightScroll >= targetScroll && executionFlag) {
      executionFlag = false;
      activeBanner(banner, 'open', 'exponea-close');
    }
  });
};


// Call the functions
bannerOneHandler(banner1)
bannerTwoHandler(banner2)


  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  document.addEventListener("DOMContentLoaded", function(event) {

    document.querySelectorAll("figure.snip1311").forEach((el) => {
  
      // Select all the read more buttons and hidden contents
      const readMoreButtons = el.querySelectorAll(".read-more");
      const hiddenContents = el.querySelectorAll(".hidden");
  
      // Now loop over the read more buttons 
      readMoreButtons.forEach((readMoreButton, index) => {
        // Add onclick event listeners to all of them
        readMoreButton.addEventListener("click", () => {
          // Change content of read more button to read less based on the textContent
          if (readMoreButton.textContent === "Read More") {
            readMoreButton.textContent = "Read Less";
          } else {
            readMoreButton.textContent = "Read More";
          }
  
          readMoreButton.closest(".snip1311").classList.toggle("reading");
          hiddenContents[index].classList.toggle("hidden");
        });
      });
  
      el.addEventListener('mouseenter', e => {
        e.target.classList.add('hover');
      });
  
      el.addEventListener('mouseleave', e => {
        e.target.classList.remove('hover');
        setTimeout(() => {
          readMoreButtons.forEach((readMoreButton, index) => {
            readMoreButton.textContent = "Read More";
            readMoreButton.closest(".snip1311").classList.remove("reading");
            hiddenContents[index].classList.add("hidden");
          });
        }, 100);
      });
    });
  });
  
  

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  //Skills Animation On View
document.addEventListener("DOMContentLoaded", function(event) {

  function callback(observations, observer) {
    observations.forEach(observation => {
      if (observation.isIntersecting) { //IF IT'S IN VIEW
        observation.target.classList.add('animated');
        observation.target.classList.add('animated1');
      }
      else {
        observation.target.classList.remove('animated');
        observation.target.classList.remove('animated1');
      }
    });
  }

  // CREATE AN INTERSECTION OBSERVER
  let options = {
    root: null, //null means it will observe on the viewport
    rootMargin: '0px',
  }

  let observer = new IntersectionObserver(callback, options);

  // NOW PUT THE OBSERVER ON EACH OF THE ELEMENTS WE WANT TO ANIMATE WHEN IT'S IN VIEW
  let spans = document.querySelectorAll('span');
  for (let i = 0; i < spans.length; i++) {
    observer.observe(spans[i]);
  }
  let spans1 = document.querySelectorAll('line');
  for (let a = 0; a < spans1.length; a++) {
    observer.observe(spans1[a]);
  }
});

// Particles Animation (Hero Section)
document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById('nokey'),
    can_w = parseInt(canvas.getAttribute('width')),
    can_h = parseInt(canvas.getAttribute('height')),
    ctx = canvas.getContext('2d');

  // console.log(typeof can_w);

  var ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    alpha: 1,
    phase: 0
  },
    ball_color = {
      r: 207,
      g: 255,
      b: 4
    },
    R = 2,
    balls = [],
    alpha_f = 0.03,
    alpha_phase = 0,

    // Line
    link_line_width = 0.8,
    dis_limit = 260,
    add_mouse_point = true,
    mouse_in = false,
    mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'
    };

  // Random speed
  function getRandomSpeed(pos) {
    var min = -1,
      max = 1;
    switch (pos) {
      case 'top':
        return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
        break;
      case 'right':
        return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
        break;
      case 'bottom':
        return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
        break;
      case 'left':
        return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
        break;
      default:
        return;
        break;
    }
  }
  function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
  }
  console.log(randomNumFrom(0, 10));
  // Random Ball
  function getRandomBall() {
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch (pos) {
      case 'top':
        return {
          x: randomSidePos(can_w),
          y: -R,
          vx: getRandomSpeed('top')[0],
          vy: getRandomSpeed('top')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
        break;
      case 'right':
        return {
          x: can_w + R,
          y: randomSidePos(can_h),
          vx: getRandomSpeed('right')[0],
          vy: getRandomSpeed('right')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
        break;
      case 'bottom':
        return {
          x: randomSidePos(can_w),
          y: can_h + R,
          vx: getRandomSpeed('bottom')[0],
          vy: getRandomSpeed('bottom')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
        break;
      case 'left':
        return {
          x: -R,
          y: randomSidePos(can_h),
          vx: getRandomSpeed('left')[0],
          vy: getRandomSpeed('left')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
        break;
    }
  }
  function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
  }
  

  // Draw Ball
  function renderBalls() {
    Array.prototype.forEach.call(balls, function(b) {
      if (!b.hasOwnProperty('type')) {
        ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';
        ctx.beginPath();
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  // Update balls
  function updateBalls() {
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b) {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x > -(50) && b.x < (can_w + 50) && b.y > -(50) && b.y < (can_h + 50)) {
        new_balls.push(b);
      }

      // alpha change
      b.phase += alpha_f;
      b.alpha = Math.abs(Math.cos(b.phase));
      // console.log(b.alpha);
    });

    balls = new_balls.slice(0);
  }

  // loop alpha
  function loopAlphaInf() {

  }

  // Draw lines
  function renderLines() {
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
      for (var j = i + 1; j < balls.length; j++) {

        fraction = getDisOf(balls[i], balls[j]) / dis_limit;

        if (fraction < 1) {
          alpha = (1 - fraction).toString();

          ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')';
          ctx.lineWidth = link_line_width;

          ctx.beginPath();
          ctx.moveTo(balls[i].x, balls[i].y);
          ctx.lineTo(balls[j].x, balls[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  // calculate distance between two points
  function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
      delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
  }

  // add balls if there a little balls
  function addBallIfy() {
    if (balls.length < 20) {
      balls.push(getRandomBall());
    }
  }

  // Render
  function render() {
    ctx.clearRect(0, 0, can_w, can_h);

    renderBalls();

    renderLines();

    updateBalls();

    addBallIfy();

    window.requestAnimationFrame(render);
  }

  // Init Balls
  function initBalls(num) {
    for (var i = 1; i <= num; i++) {
      balls.push({
        x: randomSidePos(can_w),
        y: randomSidePos(can_h),
        vx: getRandomSpeed('top')[0],
        vy: getRandomSpeed('top')[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      });
    }
  }
  // Init Canvas
  function initCanvas() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    can_w = parseInt(canvas.getAttribute('width'));
    can_h = parseInt(canvas.getAttribute('height'));
  }
  window.addEventListener('resize', function(e) {
    console.log('Window Resize...');
    initCanvas();
  });

  function goMovie() {
    initCanvas();
    initBalls(30);
    window.requestAnimationFrame(render);
  }
  goMovie();

});





  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

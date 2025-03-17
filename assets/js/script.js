var navBarInFlag = false
var fallenFlag = false;


//remove loading screen when done
window.onload = function() {
  const loadingScreen = document.getElementById("loading-screen");

  gsap.to(loadingScreen, {
    opacity: 0,
    duration: 1.0,
    onComplete: () => {
      loadingScreen.style.display = "none";
    }
  });
}
var splitName 
var splitTitle
var projectCards

function animateFall(target) {
    gsap.to(target, {
        y: () => window.innerHeight, // Animate from above the screen
        x: () => gsap.utils.random(-100, 100), // Random x value between -50 and 50
        rotation: () => gsap.utils.random(-80, 80), // Add random rotation
      stagger: {
        each: 0.02,
        from: "random" // Randomize order
      },
      ease: "power1.in", // Bounce effect
      duration: 0.3
    });
}

function animateRise(target) {
    gsap.to(target, {
      y: 0,
      x: 0,
      rotation: 0,
      stagger: {
        each: 0.01,
        from: "random" // Randomize the order of the rise
      },
      ease: "power1.out",
      duration: 0.5
    });
}

function animateIn(target) {
  gsap.from(target, {
      y: () =>  window.innerHeight, // Animate from above the screen
    ease: "power1.in", // Bounce effect
    duration: 0.5
  });
}

ScrollTrigger.create({
    trigger: "#cover-card",
    start: "top center", // When the top of the cover-card reaches the center of the viewport
    onEnter: () => sumaryBoxDrop(), // Trigger the drop animation
  //   markers: true 
  });
  
function sumaryBoxDrop() {
    var tl = gsap.timeline({});
    tl.to("#cover-card", {
        boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.3)",
        rotation: -5,
        scale: 1.01,
        duration:0.2
        });
    tl.to("#cover-card", {
        y: window.innerHeight,
        ease: "power2.in",
        duration:0.5
        });
    console.log("sumBoxDrop return")
}
  
function sumaryBoxHover() {
    gsap.to(".tldr", {
          fontWeight: "normal",
          scale:2,
          duration:0.1
    })
    gsap.to("#cover-card", {
        boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        color: "rgba(255, 255, 255, 1)",
        // scale: 1.01,
        duration:0.1,
    })
      
}
  
function sumaryBoxNormal() {
    gsap.to(".tldr", {
        fontWeight: "lighter",

        scale:1,
        duration:0.1
    })
    gsap.to("#cover-card", {
        boxShadow: "none",
        scale: 1.0,
        duration:0.1,
    })
}

function firstLoad() {
    gsap.to(".fixed-navbar", {delay: 0 ,duration: 0, paddingTop: 20, paddingBottom: 20})
    gsap.to(".fixed-container", { duration: 0.2, height: 72, backgroundColor: "rgba(10, 10, 10, 0.0)",});
    animateImages();

    console.log("firstload return")
}

function navbarFadeIn() {
    gsap.to(".fixed-container", { duration: 0.5, height: 72, backgroundColor: "rgba(1, 1, 1, 1)", });
    gsap.to(".fixed-navbar", {duration: 0.5, paddingTop: 12, paddingBottom: 12})

    console.log("navbarIn return")

}

function navbarFadeOut() {
    gsap.to(".fixed-container", { duration: 0.5, height: 120, backgroundColor: "rgba(10, 10, 10, 0.0)",});
    gsap.to(".fixed-navbar", {delay: 0 ,duration: 0.5, paddingTop: 20, paddingBottom: 20})
    gsap.to(".fixed-container", { delay: 0.4, duration: 0.1, height: 80, backgroundColor: "rgba(10, 10, 10, 0.0)",});
    console.log("navbarOut return")
}


  
document.addEventListener("DOMContentLoaded", function () {
  firstLoad()
  gsap.registerPlugin(ScrollTrigger);
  const arrow = document.getElementById('arrow');

  // Initialize SplitType
  splitName = new SplitType('#name-animation', { types: 'chars' });
  splitTitle = new SplitType('#title-animation', { types: 'chars' });

  const contactButton = document.getElementById("contact-button")
  contactButton.addEventListener("mouseenter", () => {
    gsap.to("#contact-button", {duration: 0.2, scale: 1.1 , })
  })
  contactButton.addEventListener("mouseleave", () => {
    gsap.to("#contact-button", {duration: 0.2, scale: 1, })
  })


  // Function to toggle project details
  function toggleProjectDetails(card) {
    const cardImg = card.querySelector('.card-img');
    const cardBody = card.querySelector('.card-body');
    const cardBtn = card.querySelector(".project-button");

    // Check current state and toggle heights accordingly
    const isExpanded = cardImg.clientHeight === 0;
    const halfWindowHeight = window.innerHeight / 2;

    gsap.to(cardImg, {
      height: isExpanded ? `${halfWindowHeight}px` : '0px', // Toggle height between 500px and 0px
      duration: 0.5, // Duration of the animation
      ease: "power1.inOut" // Easing function for smooth animation
    });

    gsap.to(cardBody, {
      height: isExpanded ? '4rem' : `${halfWindowHeight}px` , // Toggle height between 0px and 500px
      duration: 0.5, // Duration of the animation
      ease: "power1.inOut" // Easing function for smooth animation
    });
    gsap.to(cardBtn, {
      opacity: isExpanded ? 0 : 1, // Toggle height between 0px and 500px
      y: isExpanded ? 200 : 0,
      duration: 0.5, // Duration of the animation
      ease: "power1.inOut" // Easing function for smooth animation
    })
  }

  // Function to add click event listeners to all project cards
  function addCardListeners() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        toggleProjectDetails(card);
      });
    });
  }

  // Call the function to add listeners when the DOM is fully loaded
  addCardListeners();
  animateIcons(".icon")
  animateIcons(".tdt-logo")
  animateIcons(".icon-logo")
  animateSlider(".swiper-slide")


  // GSAP animation function
  function showArrow() {
    gsap.fromTo(arrow, { x: 5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, display: 'block', onComplete: () => {
      gsap.to(arrow, { x: 10, repeat: -1, yoyo: true, duration: 0.3, ease: 'power1.inOut' })
    } });
  }

  function hideArrow() {
    gsap.fromTo(arrow, { x: 0, opacity: 1 }, { x: -20, opacity: 0, duration: 0.5, onComplete: () => arrow.style.display = 'none' });
  }

  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      showArrow();
    } else {
      hideArrow();
    }
  });


});





document.addEventListener("scroll", function() {
    const introBackground = document.getElementById("intro-background");
    const nameText = document.getElementById("name-animation");

    const introDivider = document.getElementById("intro-divider");

    const introDividerTop = introDivider.getBoundingClientRect().top;
    const introBackgroundTop = introBackground.getBoundingClientRect().top;
    const nameTextTop = nameText.getBoundingClientRect().top;
    
    if (nameTextTop <= 0) {
        if (fallenFlag == false) {
            fallenFlag = true
            animateFall(splitName.chars);
            animateFall(splitTitle.chars);
        }
        else {
            console.log("good")
        }
    }
    if (introDividerTop <= 0  ) {
        if (navBarInFlag == false) {
            navbarFadeIn()
            navBarInFlag = true
        }
    }
    if (introBackgroundTop == 0 ) {
        navbarFadeOut()
        navBarInFlag = false
        animateRise(splitName.chars);
        animateRise(splitTitle.chars);
        fallenFlag = false

        //reset contact animation
        unAnimateImages()
        unAnimateContactButton()
        animateImages()
        contactButton()

    }

    const layers = document.querySelectorAll('.parallax__layer');
    const scrollY = window.pageYOffset;

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });

});

document.querySelectorAll('.hover-col').forEach((col) => {
    col.addEventListener('mouseenter', () => {
      gsap.to(col.querySelector('.sumary-icon'), { color: 'rgb(255, 166, 1)', scale: 1.2, duration: 0.2 });
      gsap.to(col.querySelector('.sumary-text'), { color: 'rgb(255, 166, 1)', scale: 1.2,duration: 0.2 });
    });
  
    col.addEventListener('mouseleave', () => {
      gsap.to(col.querySelector('.sumary-icon'), { color: 'white', scale: 1,  duration: 0.2 });
      gsap.to(col.querySelector('.sumary-text'), { color: 'white', scale: 1, duration: 0.2 });
    });
});

document.getElementById('cover-card').addEventListener("mouseenter", sumaryBoxHover)
document.getElementById('cover-card').addEventListener("mouseleave", sumaryBoxNormal)
document.getElementById("cover-card").addEventListener("click", sumaryBoxDrop);





gsap.to("#black-overlay", {
    opacity: 0.3,
    backgroundColor: " rgba(0, 0, 0, 0.3)",
    scrollTrigger: {
    // markers: true ,
        trigger: "#contact",
        start: "60% 80%", // Adjust to appear after the last image animation
        end: "bottom 80%",
        scrub: true
    }
});

function animateIcons(className) {
  gsap.from(className, {
    scrollTrigger: {
      trigger: className, // Trigger animation when the icons come into view
      start: 'top 96%', // Start animation when the top of the icon is 80% from the top of the viewport
      toggleActions: 'play none none none', // Only play the animation once
    },
    y: 50, // Move the icons 50px down initially
    opacity: 0, // Start from opacity 0
    duration: 0.3, // Duration of the animation
    stagger: 0.03, // Stagger the animation of each icon by 0.2 seconds
    ease: 'power1.out', // Easing function for smooth animation
  });
}

function animateSlider(className) {
  gsap.from(className, {
    scrollTrigger: {
      trigger: className, // Trigger animation when the icons come into view
      start: 'top 96%', // Start animation when the top of the icon is 80% from the top of the viewport
      toggleActions: 'play none none none', // Only play the animation once
    },
    scale: 0.5,
    x: 1000, // Move the icons 50px down initially
    opacity: 0, // Start from opacity 0
    duration: 0.3, // Duration of the animation
    stagger: 0.1, // Stagger the animation of each icon by 0.2 seconds
    ease: 'power1.out', // Easing function for smooth animation
  });
}

// Define your image array and animation logic inside a function
function animateImages() {
    const images = ["#img5", "#img4", "#img3", "#img2", "#img1"];
    images.forEach((img, i) => {
      gsap.to(img, {
        width: window.innerWidth + (-i) * (window.innerWidth / 5),
        scrollTrigger: {
          // markers: true,
          trigger: "#contact",
          start: `${i * 15}% 95%`,
          end: "bottom 80%",
          scrub: true,
          once: true,
          // toggleActions: "play none none none",
          // Add a callback to refresh ScrollTrigger on animation update
          onUpdate: ScrollTrigger.refresh
        }
      });
    });
    // Animation for #contact-text
    gsap.fromTo("#contact-text", 
      { x: "100%", opacity: 0 }, // Start off screen to the right
      { 
        x: "0%", 
        opacity: 1, 
        scrollTrigger: {
          trigger: "#contact",
          start: "5% 95%",
          end: "bottom 80%",
          scrub: true,
          once: true,
          // toggleActions: "play none none none",
          onUpdate: ScrollTrigger.refresh
        }
      });
    
}


function unAnimateImages() {
    const images = ["#img5", "#img4", "#img3", "#img2", "#img1"];
    images.forEach((img, i) => {
      gsap.to(img, {
        width: 0, duration: 0
      });
    });
}

function contactButton() {
    var tl = gsap.timeline({
        markers: true,
        scrollTrigger: {
            trigger: "#img5",
            start: "bottom 80%",
            scrub: false,
            // Add a callback to refresh ScrollTrigger on animation update
          }
      });
    tl.fromTo('#contact-button', { zIndex: 100, scale: 10, opacity: 0 }, {scale: 1, opacity: 1 , duration:0.3}) ;
    tl.to(".bo1", {scale: 1.1, opacity: 0, duration: 0.4}, ">-0.2");
    tl.to(".bo2", {scale: 1.1, opacity: 0, duration: 0.4}, ">-0.2");  
    tl.to(".bo3", {scale: 1.1, opacity: 0, duration: 0.4}, ">-0.2");



}

function unAnimateContactButton() {
  var tl = gsap.timeline({
    });
  tl.to('#contact-button', { zIndex: 100, scale: 10, opacity: 0 }) ;
  tl.to(".bo1", {scale: 1, opacity: 1, duration: 0});
  tl.to(".bo2", {scale: 1, opacity: 1, duration: 0});  
  tl.to(".bo3", {scale: 1, opacity: 1, duration: 0});
}
contactButton()

  // Add an event listener to update animations on window resize
  window.addEventListener('resize', () => {
    // Clear existing animations
    gsap.killTweensOf("*");
    // Clear existing ScrollTriggers
    // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();

    // Reinitialize animations
    unAnimateImages();
    animateImages();
  });
  


  // c1fff4 cfeaff bfe2fe addbff f7f7f7 9dd2fe 0d3d63 072a46
var navBarInFlag = false
var fallenFlag = false;

window.onload = firstLoad()
var splitName 
var splitTitle


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
    gsap.registerPlugin(ScrollTrigger);

    // Initialize SplitType
    splitName = new SplitType('#name-animation', { types: 'chars' });
    splitTitle = new SplitType('#title-animation', { types: 'chars' });

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
      gsap.to(col.querySelector('.sumary-icon'), { color: '#FF5733', scale: 1.2, duration: 0.2 });
      gsap.to(col.querySelector('.sumary-text'), { color: '#FF5733', scale: 1.2,duration: 0.2 });
    });
  
    col.addEventListener('mouseleave', () => {
      gsap.to(col.querySelector('.sumary-icon'), { color: 'white', scale: 1,  duration: 0.2 });
      gsap.to(col.querySelector('.sumary-text'), { color: 'white', scale: 1, duration: 0.2 });
    });
});

document.getElementById('cover-card').addEventListener("mouseenter", sumaryBoxHover)
document.getElementById('cover-card').addEventListener("mouseleave", sumaryBoxNormal)
document.getElementById("cover-card").addEventListener("click", sumaryBoxDrop);

const images = ["#img5","#img4", "#img3", "#img2", "#img1"];
images.forEach((img, i) => {
gsap.to(img, {
    width: window.innerWidth + (-i)*(window.innerWidth/5),
    scrollTrigger: {
    // markers: true ,
    trigger: "#contact",
    start: `${i * 20}% 90%`, // Adjust scroll start point for each image
    end: "bottom 80%",
    scrub: true
        }
    });
});

gsap.to("#black-overlay", {
    opacity: 0.3,
    backgroundColor: " rgba(0, 0, 0, 0.3)",
    scrollTrigger: {
    markers: true ,
        trigger: "#contact",
        start: "60% 80%", // Adjust to appear after the last image animation
        end: "bottom 80%",
        scrub: true
    }
});

var navBarInFlag = false
window.onload = firstLoad()

document.addEventListener("scroll", function() {
    const introBackground = document.getElementById("intro-background");
    const introDivider = document.getElementById("intro-divider");

    const introDividerTop = introDivider.getBoundingClientRect().top;
    const introBackgroundTop = introBackground.getBoundingClientRect().top;
    
    if (introDividerTop <= 0  ) {
        if (navBarInFlag == false) {
            navbarFadeIn()
            navBarInFlag = true
        }
    }
    if (introBackgroundTop == 0 ) {
        navbarFadeOut()
        navBarInFlag = false
    }

    const layers = document.querySelectorAll('.parallax__layer');
    const scrollY = window.pageYOffset;

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });

    // const mainContent = document.getElementById('about');
    // const yPos = -(scrollY * 0.5)
    // mainContent.style.transform = `translateY(${yPos}px)`;
});

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
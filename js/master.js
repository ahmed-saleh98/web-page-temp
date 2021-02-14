// Start Functions
    // random change the background photo 
    function randomizeBackground () {
        if (randomeBackgOption === true) {
            
            randomBackgInterval = setInterval(()=>{
                // Select landing page element
                let LandingPage = document.querySelector(".landing-page");
            
                // Get array of images
                let ImagesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
                let randomNumper = Math.floor(Math.random() * ImagesArray.length);
                // console.log(randomNumper)
                
                LandingPage.style.backgroundImage = 'url("images/'+ImagesArray[randomNumper] + '")';  
                
            }, 10000); 
        }
    }; 

    // scroll into secion
    function scrollToSection (elements){

        elements.forEach(elem => {

            
            elem.addEventListener("click", (e)=>{
                e.preventDefault();
                document.querySelector(e.target.dataset.section).scrollIntoView({behavior: "smooth"});
            });
            
        });
    };
    
    // Handle Active Class
    function handleActive(eve){

        // remove active class from all children
        eve.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
            
        });
        
        // add active class to selected children
        eve.target.classList.add("active")
    };

// End Functions

// Start Local Storage
   // get main color from local storage 
    let mainColor = localStorage.getItem("color-option");
    if (mainColor !== null){
        document.documentElement.style.setProperty("--main-color--", localStorage.getItem("color-option"));

    // add active class for main color 
        // first remove active class from all colors
        document.querySelectorAll(".colors-list li").forEach(element => {
            element.classList.remove("active");
            // then add active class 
            if (element.dataset.color === localStorage.getItem("color-option")) {
                element.classList.add("active");         
            } 
    });
    }
    // Random Background Option
    let randomeBackgOption =true;

    // Variable To Control Random Background
    let randomBackgInterval;

    // get back ground option from local storage
    let localBackgoption = localStorage.getItem("background_option");
    if (localBackgoption !== null) {
        document.querySelectorAll(".random-background span").forEach(ele => {
            ele.classList.remove("active");
        });
        if (localBackgoption === "true") {
            randomeBackgOption =true;
            document.querySelector(".random-background .yes").classList.add("active");
        }else{
            randomeBackgOption =false;   
            document.querySelector(".random-background .no").classList.add("active");
        }
    };

    // bullets nav bar 
    let bulletsNavBar = document.querySelector(".nav-bullets");
    // get show bullets option from local storage
    let bulletsLocalItem = localStorage.getItem("bullets_option");
    if (bulletsLocalItem !== null) {

        document.querySelectorAll(".show-bullets span").forEach(ele => {
            ele.classList.remove("active");
        });
        if (bulletsLocalItem === "block") {

            bulletsNavBar.style.display= "block";
            document.querySelector(".show-bullets .yes").classList.add("active");

        } else {

            bulletsNavBar.style.display= "none";
            document.querySelector(".show-bullets .no").classList.add("active");

        }
        
    };
// End local Storage

// Start settings box
    // toggle spin Class on click
    document.querySelector(".toggle-settings").onclick= function(e) {
        document.querySelector(".fa-gear").classList.toggle ("fa-spin");
        document.querySelector(".settings-box").classList.toggle("open");
    };

    // switch colors
        // get list color 
        const colorsList = document.querySelectorAll(".colors-list li");

        // loop on all list items
        colorsList.forEach(li => {
            li.addEventListener("click", (e) =>{
                // set main color in root 
                document.documentElement.style.setProperty("--main-color--", e.target.dataset.color);

                // set main color in local storage
                localStorage.setItem("color-option", e.target.dataset.color);
                handleActive(e);
            });    
        });

    // switch random background option
    const ranBackgrEl = document.querySelectorAll(".random-background span");

        // loop on all span items
        ranBackgrEl.forEach(span => {
            span.addEventListener("click", (e) =>{

                handleActive(e);
                // activate the background option 
                if (e.target.dataset.background === "yes") 
                {
                    randomeBackgOption = true;
                    randomizeBackground();
                    // set the data to local storage  
                    localStorage.setItem("background_option", true)

                } else {
                    randomeBackgOption = false;
                    clearInterval(randomBackgInterval);
                    // set the data to local storage  
                    localStorage.setItem("background_option", false)
                }
            });
        });

    // control show bullets

    let bulletsSpan = document.querySelectorAll(".show-bullets span");
    bulletsSpan.forEach(span => {
        span.addEventListener("click", (e)=>{
            if(e.target.dataset.display === "yes"){
                bulletsNavBar.style.display= "block";
                localStorage.setItem("bullets_option", "block");
            }else{
                bulletsNavBar.style.display= "none";
                localStorage.setItem("bullets_option", "none");
            }
            handleActive(e);
        });
    });
// End Settings box

// Start Our Skiils
    // Select Skills
    let ourSkills = document.querySelector(".skills");

    window.onscroll = function () {

        // Skills Offset Top
        let skillsOffsetTop = ourSkills.offsetTop;

        // Skills Outer Height 
        let skillsOuterHeight = ourSkills.offsetHeight;
        
        // window height 
        let windowHeight = this.innerHeight;

        // window scroll top
        let windowScrollTop = this.pageYOffset;
        // sellect all spans in skill-progress
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        // add progress to span if it was on screen and remove it if not
        if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight -220)) {
            

            allSkills.forEach(skill => {
                
                skill.style.width = skill.dataset.progress;
            });
        }
        else{
            allSkills.forEach(skill => {
                
                skill.style.width = 0;
            });

        }
    }
// End Our Skills

// Start Our Gallery
    // create popup with image
    let ourGallery = document.querySelectorAll(".gallery .images-box img");

    ourGallery.forEach(img => {

        img.addEventListener("click", (e)=>{

            // create overlay element
            let overlay = document.createElement("div");

            // add class to overlay
            overlay.className = "popup-overlay";

            // append overlay to the body
            document.body.appendChild(overlay);

            // create the popup box
            let popubBox = document.createElement("div");

            // add class to the popup box
            popubBox.className = "popub-box";

            // add alt as hidding
            if (img.alt !== null) {
                // create heading
                let imgHeading = document.createElement("h3");
                
                // create heading text 
                let headingText = document.createTextNode(img.alt);

                // add text to heading
                imgHeading.appendChild(headingText);

                // add img heading to popup box
                popubBox.appendChild(imgHeading);
            } 

            // create the img
            let popubImg = document.createElement("img");

            // set img src
            popubImg.src = img.src;

            // append img to popup box
            popubBox.appendChild(popubImg);

            // append popub box to the body
            document.body.appendChild(popubBox);

            // create close button
            let closeButton = document.createElement("span");

            // create the close button text
            let closeButtonText = document.createTextNode("x");

            // append teext to close button
            closeButton.appendChild(closeButtonText);

            // add class to colse button
            closeButton.className = "close-button";

            // append close button to popub box
            popubBox.appendChild(closeButton);
        });
        
    });

    // close popup
    document.addEventListener("click", (e)=>{
        if(e.target.className == "close-button") {
            // remove popub
            e.target.parentNode.remove();

            // remove overlay
            document.querySelector(".popup-overlay").remove();
        }
    })
// End Our Gallery

// nav bullets 
// select bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select header area links
const allLinks = document.querySelectorAll(".links a");

randomizeBackground();
scrollToSection(allBullets);
scrollToSection(allLinks);

// reset Settings
document.querySelector(".settings-box .reset-option").onclick = () => {
    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    window.location.reload();
};

// toggle menu
let toggleButt = document.querySelector(".toogle-menu");
let menuLinks = document.querySelector(".links");
let toggleSettings = document.querySelector(".toggle-settings");
let settingsBox = document.querySelector(".settings-box");
toggleButt.onclick = (e) => {
    e.stopPropagation();
    toggleButt.classList.toggle("menu-active");
    menuLinks.classList.toggle("open");
};
menuLinks.onclick = (e) => {
    e.stopPropagation();
};
settingsBox.onclick = (e) => {
    e.stopPropagation();
};
document.onclick = (e)=>{
    if(e.target!==menuLinks &&e.target!==toggleButt){
        if ( menuLinks.classList.contains("open")) {
            
            toggleButt.classList.toggle("menu-active");
            menuLinks.classList.toggle("open");
        }
    }
    // console.log(e.target);
    if(e.target!==toggleSettings && e.target!==settingsBox){
        if(settingsBox.classList.contains("open")){
            settingsBox.classList.toggle("open")
            document.querySelector(".fa-gear").classList.toggle ("fa-spin");
        };
    };
};

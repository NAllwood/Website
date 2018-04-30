
function update_navbar() {
  navbar = document.getElementById("navbar");
  articles = document.getElementById("articles");
  about = document.getElementById("about");
  projects = document.getElementById("projects");
  fullscreen_image = document.getElementById("fullscreen_image");

  nav_about = document.getElementById("nav_about");
  nav_projects = document.getElementById("nav_projects");
  nav_contact = document.getElementById("nav_contact");

  about_title = document.getElementById("about_title");

  if (window.pageYOffset >= articles.offsetTop-navbar.offsetHeight) {
    navbar.classList.add("sticky")
  } else if (window.pageYOffset <= articles.offsetTop-navbar.offsetHeight) {
    navbar.classList.remove("sticky");
    nav_about.classList.remove("active");
    nav_projects.classList.remove("active");
    nav_contact.classList.remove("active");
  }

  if (window.pageYOffset >= about.offsetTop && window.pageYOffset < projects.offsetTop){
    nav_about.classList.add("active");
    about_title.classList.add("slide_in_left");
    nav_projects.classList.remove("active");
    nav_contact.classList.remove("active");
  }else if (window.pageYOffset >= projects.offsetTop && window.pageYOffset < contact.offsetTop){
    nav_about.classList.remove("active");
    nav_projects.classList.add("active");
    nav_contact.classList.remove("active");
  }else if (window.pageYOffset >= contact.offsetTop && window.pageYOffset < contact.offsetBottom){
    nav_about.classList.remove("active");
    nav_projects.classList.remove("active");
    nav_contact.classList.add("active");
  }

}

function scroll_to(element, duration) {
  elementY = element.offsetTop;
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  console.log("elementY",elementY);
  console.log("startingY",startingY);
  console.log("diff",diff);
  var start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    var time = timestamp - start;
    var percent = Math.min(time / duration, 1);
    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}

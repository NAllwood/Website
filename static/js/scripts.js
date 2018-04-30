
function update_navbar() {
  var navbar = document.getElementById("navbar");
  var articles = document.getElementById("articles");
  var about = document.getElementById("about");
  var projects = document.getElementById("projects");
  var fullscreen_image = document.getElementById("fullscreen_image");

  var nav_about = document.getElementById("nav_about");
  var nav_projects = document.getElementById("nav_projects");
  var nav_contact = document.getElementById("nav_contact");

  var about_title = document.getElementById("about_title");

  var nav_height = navbar.getBoundingClientRect().height

  console.log("window",window.pageYOffset ,"active",)

  /* fix or unfix navbar */
  if (window.pageYOffset >= articles.offsetTop - nav_height) {
    navbar.classList.add("sticky")
  } else if (window.pageYOffset <= articles.offsetTop) {
    navbar.classList.remove("sticky");
    nav_about.classList.remove("active");
    nav_projects.classList.remove("active");
    nav_contact.classList.remove("active");
  }

  /* activate right articles in navbar */
  if (window.pageYOffset >= about.offsetTop -120-nav_height && window.pageYOffset < projects.offsetTop -120-nav_height){
    nav_about.classList.add("active");
    nav_projects.classList.remove("active");
    nav_contact.classList.remove("active");
  }else if (window.pageYOffset >= projects.offsetTop -120-nav_height && window.pageYOffset < contact.offsetTop -120-nav_height){
    nav_about.classList.remove("active");
    nav_projects.classList.add("active");
    nav_contact.classList.remove("active");
  }else if (window.pageYOffset >= contact.offsetTop -120-nav_height && window.pageYOffset < contact.offsetBottom -120-nav_height){
    nav_about.classList.remove("active");
    nav_projects.classList.remove("active");
    nav_contact.classList.add("active");
  }

  if (window.pageYOffset >= about.offsetTop -120-nav_height){
    about_title.classList.add("slide_in_left");
  }
  if (window.pageYOffset >= projects.offsetTop -120-nav_height){
    projects_title.classList.add("slide_in_left");
  }
  if (window.pageYOffset >= contact.offsetTop -120-nav_height){
    contact_title.classList.add("slide_in_left");
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

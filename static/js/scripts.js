
function add_sticky(elements){
  var nav_height = document.getElementById("navbar").getBoundingClientRect().height;
  for (entry in elements){
    element = elements[entry];
    console.log("sticked navbar because:",window.pageYOffset,">=",document.getElementById("navbar_dummy").offsetTop);

    element.classList.add("sticky");
  }
}
function remove_sticky(elements){
  document.getElementById("nav_about").classList.remove("active");

  for (entry in elements){
    element = elements[entry];
    element.classList.remove("sticky");
  }
}
function toggle_active (elements){
  document.getElementById("nav_about").classList.remove("active");
  document.getElementById("nav_projects").classList.remove("active");
  document.getElementById("nav_contact").classList.remove("active");

  for (entry in elements){
    element = elements[entry];
    element.classList.add("active");
  }
}
function add_slide_in_left(elements){
  for (entry in elements){
    element = elements[entry];
    element.classList.add("slide_in_left");
  }
}
function add_slide_in_right(elements){
  for (entry in elements){
    element = elements[entry];
    element.classList.add("slide_in_right");
  }
}
function add_slide_in_left_wait(elements){
  for (entry in elements){
    element = elements[entry];
    element.classList.add("slide_in_left_wait");
  }
}
function add_slide_in_right_wait(elements){
  for (entry in elements){
    element = elements[entry];
    element.classList.add("slide_in_right_wait");
  }
}
function add_fade_in (elements){
  for (entry in elements){
    element = elements[entry];
    element.classList.add("fade_in");
  }
}
function add_fade_in_wait (elements){
  for (entry in elements){
    element = elements[entry];
    element.classList.add("fade_in_wait");
  }
}


function update_view() {
  var window_offset = window.pageYOffset;
  for (e in eventList){
    var animation_event = eventList[e];
    var from = animation_event.from;
    var to = animation_event.to;

    if (from != null && to != null){
      if (window_offset >= from && window_offset < to){
        for (p in animation_event.elements_function_pairs){
          var pair = animation_event.elements_function_pairs[p];
          pair[1](pair[0]);
        }
      }
    }else if (from != null && to == null){
      if (window_offset >= from){
        for (p in animation_event.elements_function_pairs){
          var pair = animation_event.elements_function_pairs[p];
          pair[1](pair[0]);
        }
      }
    } else if (from == null && to != null){
      if (window_offset < to){
        for (p in animation_event.elements_function_pairs){
          var pair = animation_event.elements_function_pairs[p];
          pair[1](pair[0]);
        }
      }
    }
  }//for animation event
}

function scroll_to(element, duration, with_navbar) {
  var elementY = element.offsetTop;
  if (with_navbar == 1){
    var navbar_height = document.getElementById("navbar").getBoundingClientRect().height;
    var elementY = element.offsetTop-navbar_height;
  }
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
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

function submit_contact_info(){
  var first_name = document.getElementById("fname").value;
  var last_name = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var submit_button = document.getElementById("submit_button");


  console.log(first_name,last_name,email,subject);

  submit_button.classList.add("fade_out");
  submit_button.classList.add("disabled");

}

function init_eventlist(){
  var nav_height = document.getElementById("navbar").getBoundingClientRect().height;

  eventList = [
    { //stick navbar
      from: document.getElementById("navbar_dummy").offsetTop,
      to: null,
      elements_function_pairs: [[[document.getElementById("navbar")], this.add_sticky]]
    },
    { //unstick navbar
      from: null,
      to: document.getElementById("navbar_dummy").offsetTop,
      elements_function_pairs: [[[document.getElementById("navbar")],this.remove_sticky]]
    },
    { // activate about, slide in title, fade in content
      from: document.getElementById("about_container").offsetTop -64 -nav_height,
      to: document.getElementById("projects_container").offsetTop -64 -nav_height,
      elements_function_pairs: [ [[document.getElementById("nav_about")],this.toggle_active],
                                 [[document.getElementById("about_section")],this.add_fade_in_wait],
                                 [[document.getElementById("about_title")],this.add_slide_in_left]]

    },
    { // activate projects
      from: document.getElementById("projects_container").offsetTop -64 -nav_height,
      to: document.getElementById("contact_container").offsetTop -64 -nav_height,
      elements_function_pairs: [[[document.getElementById("nav_projects")],this.toggle_active]]
    },
    { // activate contact
      from: document.getElementById("contact_container").offsetTop -64 -nav_height,
      to: null,
      elements_function_pairs: [[[document.getElementById("nav_contact")],this.toggle_active]]
    },
    { // fade in timeline, slide in textboxes
      from: document.getElementById("education_section").offsetTop -64 -nav_height,
      to: null,
      elements_function_pairs: [[[document.getElementById("timeline_container")],this.add_fade_in],
                                [[document.getElementById("school_element")],this.add_slide_in_left_wait],
                                [[document.getElementById("bachelor_element")],this.add_slide_in_right_wait]]
    }
  ];
}

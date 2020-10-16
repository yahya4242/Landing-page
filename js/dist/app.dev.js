"use strict";

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//define all section tags
var sections = document.querySelectorAll('section'); //define the navigation bar with the id navbar__list

var navbar = document.querySelector('#navbar__list'); //create a fragment document

var frag = document.createDocumentFragment();
/**
 * End Global Variables

 * Begin Main Functions
 * 
*/
//**** build the nav****

function addItem() {
  //iterate over each section to add links in navbar for them
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var section = _step.value;
      //create the anchor tag
      var anchor = document.createElement('a'); //set the id for the section as the href for the created anchor tag

      anchor.href = "#".concat(section.getAttribute('id')); //set the text of the anchor tag as the data-nav of each section

      anchor.textContent = section.getAttribute('data-nav'); //add menu__link class to each created anchor tag

      anchor.classList.add('menu__link'); //create a Li tag to contain the anchor tag

      var item = document.createElement('li'); //append the anchor tag to the Li tag

      item.appendChild(anchor); //append the Li tag to the fragment document

      frag.appendChild(item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ; //append the fragment document to the navbar (the DOM)

  navbar.appendChild(frag);
}

; //call the addItem() func to create the previous elements immediately onload

addItem(); // ****Scroll to section on link click****
//select all Nav links

var anchorList = document.querySelectorAll('.menu__link'); //iterate over each links

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = anchorList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var anchor = _step2.value;
    //add event listener
    anchor.addEventListener('click', function (e) {
      //prevent default scroll
      e.preventDefault(); //select the section with the id that matches the href of the link to scroll to

      var sectionToScroll = document.querySelector(e.target.getAttribute('href')); //add the smooth scroll into view

      sectionToScroll.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

; // ****Add class 'active' to section when near top of viewport****
//apply the call back func that's built above when the intersection ratio is 90%

var options = {
  threshold: 0.70
}; // build the intersectionObserver and set the parameters as the callback func above and the defined options

var observer = new IntersectionObserver(function (entries) {
  //iterate over each entry
  entries.forEach(function (entry) {
    //check if the section is intersecting
    if (entry.isIntersecting) {
      //check if there's a current active element -- (this fixes when reloading the page at any point other than the top of the page )
      var t = document.querySelector('.active');

      if (typeof t != 'undefined' && t != null) {
        //remove the current active section class
        t.classList.remove('active');
      }

      ; //add the class active to the targeted section

      entry.target.classList.add('active'); //activate the same nav item for the same targeted section

      var anchor = document.querySelector("[href=\"#".concat(entry.target.getAttribute('id'), "\"]")).classList.add('active');
    } else {
      //deactivate the section when not intersecting
      entry.target.classList.remove('active');
    }
  });
}, options); //iterate and observe the sections

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = sections[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var section = _step3.value;
    observer.observe(section);
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
      _iterator3["return"]();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

; //****hide the nav bar and the upArrow btn when user not scrolling****
//define the arrow button

var arrowBtn = document.querySelector('.fa-arrow-circle-up'); //define a variable to target it when scrolling

var scrolling; //listen to when the user scroll page

window.addEventListener('scroll', function (e) {
  //when scroll clear the time out func so that user can see the navigation bar
  window.clearTimeout(scrolling); //hide nav bar and arrowBtn after the user stops scrolling for 2s

  scrolling = setTimeout(function () {
    document.querySelector('.navbar__menu').style.top = '-200px';
    arrowBtn.style.display = "none";
    arrowBtn.style.opacity = "0";
  }, 2000); //this will show the nav bar and the arrow when the user scrolls

  document.querySelector('.navbar__menu').style.top = '0'; //only show the arrow when the user is 1000px down

  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    arrowBtn.style.display = "block";
    arrowBtn.style.opacity = "0.5";
  }

  ;
}); //scroll to the hidden div at the top of the page when click on the arrow

arrowBtn.addEventListener('click', function () {
  document.querySelector('.scrolltop').scrollIntoView({
    behavior: 'smooth'
  });
});
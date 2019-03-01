<<<<<<< HEAD
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function selectItem() {
  document.getElementById("myBtn").style.color = "black";
  document.getElementById("myDropdown").classList.toggle("show");
=======
function toggleMenu() {
  document.getElementById("myDropdown").classList.toggle("rh-filter-show");
  document.getElementById("dropdownBtn").classList.toggle("rh-filter-active");
}

function selectItem(sel) {
  document.getElementById("dropdownBtn").classList.toggle("rh-filter-active");
  document.getElementById("dropdownBtn").style.color = "black";
  document.getElementById("myDropdown").classList.toggle("rh-filter-show");

  var text = document.getElementById("dropdownBtn").firstChild;
  text.data = sel.innerText;
>>>>>>> bright-factory
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.rh-filter')) {
    var dropdowns = document.getElementsByClassName("rh-filter-menu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
<<<<<<< HEAD
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
=======
      if (openDropdown.classList.contains('rh-filter-show')) {
        openDropdown.classList.remove('rh-filter-show');
      }
    }

    var btn = document.getElementsByClassName("rh-filter");
    var i;
    for (i = 0; i < btn.length; i++) {
      var activeBtn = btn[i];
      if (activeBtn.classList.contains('rh-filter-active')) {
        activeBtn.classList.remove('rh-filter-active');
>>>>>>> bright-factory
      }
    }
  }
}
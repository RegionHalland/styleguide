/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function selectItem() {
  document.getElementById("myBtn").style.color = "black";
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.rh-filter')) {
    var dropdowns = document.getElementsByClassName("rh-filter-menu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
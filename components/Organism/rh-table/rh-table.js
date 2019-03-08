window.onload = function () {
    var table, rows, i, x, y;
    table = document.getElementById("rh-table");
    rows = table.rows;

    for (var i = 1, row; row = rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        x = rows[i].getElementsByTagName("TD")[j];

        console.log(x.innerText);
        if(x.innerText.length > 20) {
          console.log(x.classList[0]);
          x.classList.add('test');
        }
      }  
    }  
}

function sortByName() {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

  table = document.getElementById("rh-table");
  switching = true;
  dir = "asc";

  while (switching) {
      switching = false;
      rows = table.getElementsByTagName("TR");
      for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[1];
          y = rows[i + 1].getElementsByTagName("TD")[1];
          var xContent = (isNaN(x.innerHTML)) 
              ? (x.innerHTML.toLowerCase() === '-')
                    ? 0 : x.innerHTML.toLowerCase()
              : parseFloat(x.innerHTML);
          var yContent = (isNaN(y.innerHTML)) 
              ? (y.innerHTML.toLowerCase() === '-')
                    ? 0 : y.innerHTML.toLowerCase()
              : parseFloat(y.innerHTML);
          if (dir == "asc") {
              if (xContent > yContent) {
                  shouldSwitch= true;
                  break;
              }
          } else if (dir == "desc") {
              if (xContent < yContent) {
                  shouldSwitch= true;
                  break;
              }
          }
      }
      if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++;      
      } else {
          if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
          }
      }
   }
}




const gridContainer = document.getElementById('grid');
if (gridContainer){
  const gridSize = 2500;
  
  for (let i = 0; i < gridSize ; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
  }
  updateGrid();
  
  var gridBound;
  function updateGrid() {
    console.log(Math.abs(window.scrollY - gridBound));
    if(Math.abs(window.scrollY - gridBound)  < 100) return 0;
    gridBound = window.scrollY;
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      if (Math.random() < 0.1) { 
        const randomGray = Math.floor(Math.random() * 44) + 211; 
        item.style.backgroundColor = `rgb(${randomGray}, ${randomGray}, ${randomGray})`;
      } else {
        item.style.backgroundColor = 'white';
      }
    });
  }
  
  window.addEventListener('scroll', updateGrid);
}

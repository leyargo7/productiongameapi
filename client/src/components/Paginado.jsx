import React, {useEffect} from "react";
import style from "./css/Paginado.module.css";

const Paginado = ({ videogamesPerPage, allVideogames, paginado, currentPage, onPrevClick, onNextClick}) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  console.log('currentPage', currentPage)
  console.log('pageNumbers', pageNumbers[pageNumbers.length-1 ]);

  
  
  const handlePrevClick = ()=>{
    onPrevClick();
    
}

const handleNextClick = ()=>{

  onNextClick();
    
}


  useEffect(() => {

    if(currentPage === 1) {
      let prev = document.getElementById('prev');
      prev.style.cursor = 'not-allowed';
      prev.style.color = 'grey';
      prev.style.pointerEvents = 'none';
      
    }else {
      let prev = document.getElementById('prev');
      prev.style.cursor = 'pointer';
      prev.style.color = 'black';
      prev.style.pointerEvents = 'auto';
    }

    if(currentPage === pageNumbers[pageNumbers.length-1]) {
      let next = document.getElementById('next');
      next.style.cursor = 'not-allowed';
      next.style.color = 'grey';
      next.style.pointerEvents = 'none';
    }else{
      let next = document.getElementById('next');
      next.style.cursor = 'pointer';
      next.style.color = 'black';
      next.style.pointerEvents = 'auto';
    }
    
  }, [currentPage, pageNumbers]);

  
  
  return (
    <nav className={style.container}>
      <ul className={style.paginado}>
        <button id="prev" className={style.number} onClick={handlePrevClick} disabled={currentPage === 1}>&#60;&#60; </button>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={style.numberBtn} key={number}>
              <button id="btnPag" onClick={()=>paginado(number)}>{number}</button>
              {
                currentPage === number ? <span className={style.active}>...</span> : null
              }
            </li>
          ))}
        <button id="next" className={style.number} onClick={handleNextClick} disabled={currentPage === pageNumbers[pageNumbers.length-1]}>&#62;&#62;</button>
      </ul>
      
    </nav>
  );
};

export default Paginado;

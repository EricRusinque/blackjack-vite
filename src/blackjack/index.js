import _ from 'underscore';
import { crearDeck, perdirCarta, valorCarta } from "./usecases"




      
  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'];   
  const especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [];

  // Referencias del HTML

  const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');




  // esta funcion inicializa el juego
  const inicializarJuego = ( numJugadores = 2) => {
      deck = crearDeck( tipos, especiales );

      puntosJugadores = [];

      for( let i = 0; i < numJugadores; i++) {
          puntosJugadores.push(0);
      }

      puntosHTML.forEach( elem => elem.innerHTML = 0 );
      divCartasJugadores.forEach(  elem => elem.innerHTML = null);

      btnDetener.disabled = false;
      btnPedir.disabled = false;
  }   
  







  // Turno 0 = primer jugador y el utlimo sera la computadora
  const acumularPuntos = ( carta, turno ) => {

      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
      puntosHTML[turno].innerText = puntosJugadores[turno];

      return puntosJugadores[turno]


  }

  const crearCarta = ( carta, turno ) => {

      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`;
      imgCarta.classList.add('carta');
      divCartasJugadores[turno].append( imgCarta )

  }

  // determinar ganador

  const determinarGanador = () => {
      
      const [puntosMinimos, puntosComputadora] = puntosJugadores;

      setTimeout(() => {
          if( puntosComputadora === puntosMinimos ) {
              alert('Nadie gana :(')
          } else if ( puntosMinimos > 21 ) {
              alert('Computadora gana')
          }else if ( puntosComputadora > 21 ) {
              alert('Jugador Gana')
          } else {
              alert('Computadora Gana')
          }
      }, 10 );

  }

  // turno de la computadora 

  const turnoComputadora = ( puntosMinimos ) => {
      let puntosComputadora = 0

      do {
          const carta= perdirCarta( deck );
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
          
         
          crearCarta( carta, puntosJugadores.length - 1);
      

          if( puntosMinimos > 21 ) {
              break;
          }

      } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21) );

      determinarGanador();
  }


  // Eventos

  btnPedir.addEventListener('click', function() {

      const carta= perdirCarta( deck );
      const puntosJugador = acumularPuntos(carta, 0);

      crearCarta( carta, 0);
            
      if( puntosJugador > 21 ) {
          console.warn('Lo siento muchom, perdiste');
          btnPedir.disabled = true;
          btnDetener.disabled = true;

          turnoComputadora( puntosJugador );
      } else if ( puntosJugador === 21 ) {
          console.warn('21, genial');
          btnPedir.disabled = true;
          btnDetener.disabled = true;

          turnoComputadora( puntosJugador );
      }
      
  });


  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      
      turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', () => {

      inicializarJuego();
    
  })

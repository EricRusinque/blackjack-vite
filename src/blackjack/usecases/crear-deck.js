import _ from 'underscore' 

// 

/**
 * esta funcion crea una nueva baraja
 * @param { Array<string> } tiposDeCarta 
 * @param { Array<string> } tiposEspeciales 
 * @returns { Array<string> } retorna un nuevo deck de cartas
 */


export const crearDeck = ( tiposDeCarta, tiposEspeciales ) => {

    if( !tiposDeCarta || tiposDeCarta.length === 0 ) throw new Error('TiposDeCarta es obligatorio')
    if( !tiposEspeciales || tiposEspeciales.length === 0 ) throw new Error('tiposEspeciales es obligatorio')

    let deck = [];

    for ( let i = 2; i < 10; i++ ) {
        for( let tipo of tiposDeCarta) {
            deck.push( i + tipo)
        }
    }

    for( let tipo of tiposDeCarta ) {
        for( let esp of tiposEspeciales ) {
            deck.push( esp + tipo)
        }
    }

    deck = _.shuffle(deck)

    return deck
}
/**
 * Esta es una funcion permite tomar una carta
 * @param {Array<string>} deck es un arreglo de string
 * @returns {String} retorna la carta del deck 
 */

export const perdirCarta = ( deck ) => {

    if( deck.length === 0) {
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop()

    return carta
}
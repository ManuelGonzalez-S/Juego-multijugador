// Creamos el contenedor
let main = document.getElementsByTagName('main')[0];

// Agrego el numero de filas y de columnas que voy a utilizar
let nFilas = 5;
let nColumnas = 5;

let div, objetivo, j1, j2;

// Agregamos el evento load al documento
document.addEventListener('load', inicio());


let puntuacionJ1;
let puntuacionJ2;
/**
 * Funcion que inicia el tableroy el contenido de la pagina
 * @param --> No
 * @return --> No
 */
function inicio(){

    let tablero;
    tablero = document.getElementById('tablero');

    // Si el tablero no existe, se crea uno
    if(tablero == null){
        tablero = document.createElement('section');
        tablero.setAttribute('id','tablero');

        // De existir, se borra su contenido
    }else{
        tablero.replaceChildren();
    }

    let ganador = document.getElementById('mostrarGanador');

    // Si el mensaje de ganador existe, se borra y se crea de nuevo el tablero
    if(ganador != null){
        main.replaceChildren();
    }

    let section = document.createElement('section');
    section.classList.add('container');

    // Creamos las filas y las columnas y las metemos en el tablero
    for (let i = 0; i < nFilas; i++){

        for(let j = 0; j < nColumnas; j++){
            div = document.createElement('div'); 
            div.setAttribute('class','card');
            div.setAttribute('id', `f${i}c${j}`);
            section.appendChild(div);
        }
    }

    tablero.appendChild(section);

    main.appendChild(tablero);

    // Pintamos las casillas de cada jugador y el objetivo
    pintarCasillas();

    // Creamos el boton de reinicio
    crearBotonReinicio();

    // Creamos el marcador
    crearMarcador();
}

/**
 * Funcion que pinta las casillas objetivo, j1, j2
 */
function pintarCasillas(){

    let nFila;
    let nCol;
    let imagen;

    // Creamos la ficha del objetivo y le metemos la imagen
    nFila = cogerNumeroRandom();
    nCol = cogerNumeroRandom();
    objetivo = document.getElementById(`f${nFila}c${nCol}`);
    objetivo.classList.add('objetivo');
    imagen = document.createElement('img');
    imagen.setAttribute('src','img/gemasInfinito.png');
    objetivo.appendChild(imagen);

    // Creamos la ficha j1 mientras que coincida con la misma ficha del objetivo
    do {

        nFila = cogerNumeroRandom();
        nCol = cogerNumeroRandom();
        j1 = document.getElementById(`f${nFila}c${nCol}`);
        
    } while (j1.id == objetivo.id);

    // Y cuando sea distinto, le metemos la imagen y le asignamos una clase
    imagen = document.createElement('img');
    imagen.setAttribute('src','img/ironMan.png');
    j1.appendChild(imagen);
    j1.classList.add('j1');

    // Se repite lo mismo para el jugador 2, mientras que coincida con el objetivo y el jugador 1
    do {

        nFila = cogerNumeroRandom();
        nCol = cogerNumeroRandom();
        j2 = document.getElementById(`f${nFila}c${nCol}`);
        
    } while (j2.id == objetivo.id || j2.id == j1.id);

    // Y le metemos la imagen
    imagen = document.createElement('img');
    imagen.setAttribute('src','img/thanosSin.png');
    j2.appendChild(imagen);
    j2.classList.add('j2');
    
}

/**
 * Funcion que coge un numero aleatorio
 * @param --> No
 * @returns --> Numero entero
 */
function cogerNumeroRandom(){

    numero = Math.floor(Math.random() * nFilas);

    return numero;
}

/**
 * Funcion que se ejecuta cada vez que se pulsa una tecla
 * @param --> Evento que se pulsa
 * @returnn --> No
 */
function moverFicha(event){

    moverFichaJ1(event.code);

    moverFichaJ2(event.code);
    
}

/**
 * Funcion que mueve la ficha del jugador 1
 * @param --> Evento
 * @return --> No
 */
function moverFichaJ1(eventCode){

    let funciones = botonesJ1();

    // Si el evento se incluye dentro de los botones permitidos, se ejecuta el codigo
    if(funciones.includes(eventCode)){
        let fichaObjetivo;

        let nFila = j1.id.toString().substring(1,2);

        nFila = parseInt(nFila);

        let nCol = j1.id.toString().substring(3,4);

        nCol = parseInt(nCol);
        let imagen;
        let rutaImg = 'img/ironMan.png';

        switch(eventCode){

            case 'ArrowLeft':

            // Quita la clase del jugador
                j1.setAttribute('class', 'card');

                // Y quita la imagen
                j1.replaceChildren();

                // Si no se encuentra en el borde, sigue por aqui
                if(nCol != 0){

                    // Se guardan las clases de proxima ficha a la que quiere ir el jugador
                    fichaObjetivo = document.getElementById(`f${nFila}c${nCol - 1}`).getAttribute('class');
                    
                    // Si no contiene el jugador 2 y el objetivo, sigue por aqui
                    if(fichaObjetivo.indexOf('j2') == -1 && fichaObjetivo.indexOf('objetivo') == -1){

                        // Y cambia la ficha del jugador 1
                        j1 = document.getElementById(`f${nFila}c${nCol - 1}`);

                    // Si no, sigue por aqui
                    }else if(fichaObjetivo.indexOf('objetivo') != -1){

                        // Y si encuentra al objetivo se le da un punto al jugador 1
                        asignarPuntuacion('j1')
                    }

                // Si no, sigue por aqui y sigue el mismo esquema
                }else{

                    fichaObjetivo = document.getElementById(`f${nFila}c4`).getAttribute('class');

                    // Si se encuentra en el borde, el jugador aparece en el otro lado
                    if(fichaObjetivo.indexOf('j2') == -1 && fichaObjetivo.indexOf('objetivo') == -1){
                        j1 = document.getElementById(`f${nFila}c${nColumnas - 1}`);

                    // Si no, se le da un punto al jugador
                    }else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }

                }

                // Se pone la imagen dentro de la ficha nueva
                j1.classList.add('j1');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j1.appendChild(imagen);
                
                break;

            case 'ArrowRight':
                j1.setAttribute('class', 'card');
                j1.replaceChildren();

                // Si no se encuentra en el borde 
                if(nCol != nColumnas - 1){
                    fichaObjetivo = document.getElementById(`f${nFila}c${nCol + 1}`).getAttribute('class');
                    
                    // Si no hay colision, se mueve el jugador
                    if(fichaObjetivo.indexOf('j2') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        
                        j1 = document.getElementById(`f${nFila}c${nCol + 1}`);

                    // Si no se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }
                    
                }else{

                    fichaObjetivo = document.getElementById(`f${nFila}c0`).getAttribute('class');

                    // Si no, aparece por el otro lado en caso de que no este el objetivo
                    if(fichaObjetivo.indexOf('j2') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        
                        j1 = document.getElementById(`f${nFila}c0`);

                    // Y si se encuentra, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }

                }

                // Se pone la imagen dentro de la ficha nueva
                j1.classList.add('j1');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j1.appendChild(imagen);
                break;

            case 'ArrowDown':
                j1.setAttribute('class', 'card');
                j1.replaceChildren();

                // Si no se encuentra en el borde, sigue por aqui
                if(nFila != nFilas - 1){
                    fichaObjetivo = document.getElementById(`f${nFila + 1}c${nCol}`).getAttribute('class');
                    
                    // Si no esta el objetivo, el jugador aparece al otro lado
                    if(fichaObjetivo.indexOf('j2') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        
                        j1 = document.getElementById(`f${nFila + 1}c${nCol}`);

                    // Si no, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }
                    
                }else{

                    fichaObjetivo = document.getElementById(`f0c${nCol}`).getAttribute('class');

                    // Si no se mueve hacia el objetivo, el jugador aparece en el otro lado
                    if(fichaObjetivo.indexOf('j2') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        
                        j1 = document.getElementById(`f0c${nCol}`);

                    // Si no, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }

                }

                // Se añade la imagen a la ficha nueva
                j1.classList.add('j1');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j1.appendChild(imagen);
                break;

            case 'ArrowUp':
                j1.setAttribute('class', 'card');
                j1.replaceChildren();

                // Si no se encuentra en el borde, sigue por aqui
                if(nFila != 0){
                    fichaObjetivo = document.getElementById(`f${nFila - 1}c${nCol}`).getAttribute('class');
                    
                    // Si la ficha esta libre, el jugador se mueve
                    if(fichaObjetivo.indexOf('j2') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        
                        j1 = document.getElementById(`f${nFila - 1}c${nCol}`);

                    //  Si la ficha encuentra al objetivo, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }
                    
                // Si esta al borde, se encuentra por aqui
                }else{

                    fichaObjetivo = document.getElementById(`f${nFilas - 1}c${nCol}`).getAttribute('class');

                    // Si la ficha esta libre, se mueve al otro lado
                    if(fichaObjetivo.indexOf('j2') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        
                        j1 = document.getElementById(`f${nFilas - 1}c${nCol}`);

                    // Si el objetivo se encuentra ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j1')
                    }

                }

                // Se mete la imagen a la ficha nueva
                j1.classList.add('j1');
                imagen = document.createElement('img');
                imagen.setAttribute('src', rutaImg);
                j1.appendChild(imagen);
                break;
        }
    }

}

/**
 * Funcion que devuelve un array con todos los botones posibles del jugador 1
 * @param --> No
 * @return --> Array funciones
 */
function botonesJ1(){

    let funciones = [];

    funciones.push('ArrowLeft')
    funciones.push('ArrowRight')
    funciones.push('ArrowDown')
    funciones.push('ArrowUp')

    return funciones;
}

/**
 * Funcion que mueve la ficha del jugador 2
 * @param --> Evento
 * @return --> No
 */
function moverFichaJ2(eventCode){

    let funciones = botonesJ2();

    if(funciones.includes(eventCode)){
        let fichaObjetivo;

        let nFila = j2.id.toString().substring(1,2);

        nFila = parseInt(nFila);

        let nCol = j2.id.toString().substring(3,4);

        nCol = parseInt(nCol);

        let imagen;
        let rutaImg = 'img/thanosSin.png';

        switch(eventCode){
            case 'KeyA':
                j2.setAttribute('class', 'card');
                j2.replaceChildren();

                // Si el jugador no se encuentra al borde
                if(nCol != 0){
                    fichaObjetivo = document.getElementById(`f${nFila}c${nCol - 1}`).getAttribute('class');
                    
                    // Si la ficha esta libre, el jugador mueve la ficha
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        j2 = document.getElementById(`f${nFila}c${nCol - 1}`);

                    // Si el objetivo se encuentra ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }
                    
                // En caso contrario
                }else{

                    fichaObjetivo = document.getElementById(`f${nFila}c4`).getAttribute('class');

                    // Si la ficha esta libre, se mueve al jugador al otro lado del tablero
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        j2 = document.getElementById(`f${nFila}c${nColumnas - 1}`);

                    // Si el objetivo se encuentra ahi,, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }

                }

                // Se mete la foto a la ficha nueva
                j2.classList.add('j2');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j2.appendChild(imagen);
                break;

            case 'KeyS':
                j2.setAttribute('class', 'card');
                j2.replaceChildren();

                // Si el jugador no esta en el borde
                if(nFila != nFilas - 1){
                    fichaObjetivo = document.getElementById(`f${nFila + 1}c${nCol}`).getAttribute('class');
                    
                    // Si la ficha esta libre, se mueve al jugador
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        j2 = document.getElementById(`f${nFila + 1}c${nCol}`);

                    // Si el objetivo esta ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }
                    
                // En caso contrario
                }else{

                    fichaObjetivo = document.getElementById(`f0c${nCol}`).getAttribute('class');

                    // Si la ficha esta libre, se mueve al jugador al otro borde del tablero
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        j2 = document.getElementById(`f0c${nCol}`);

                    // Si el objetivo se encuentra ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }

                }

                // Se mete la foto dentro de la ficha nueva
                j2.classList.add('j2');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j2.appendChild(imagen);
                break;

            case 'KeyW':
                j2.setAttribute('class', 'card');
                j2.replaceChildren();

                // Si el jugador se encuentra fuera del borde
                if(nFila != 0){
                    fichaObjetivo = document.getElementById(`f${nFila - 1}c${nCol}`).getAttribute('class');
                    
                    // Si la ficha esta libre, se mueve al jugador
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){
                        j2 = document.getElementById(`f${nFila - 1}c${nCol}`);

                        // Si el objetivo se encuentra ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }
                  
                // En caso contrario
                }else{

                    fichaObjetivo = document.getElementById(`f4c${nCol}`).getAttribute('class');

                    // Si la ficha esta vacia, se mueve al jugador
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){

                        j2 = document.getElementById(`f${nFilas - 1}c${nCol}`);

                    // Si el objetivo se encuentra ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }

                }

                // Se añade la foto a la ficha nueva
                j2.classList.add('j2');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j2.appendChild(imagen);
                break;

            case 'KeyD':
                j2.setAttribute('class', 'card');
                j2.replaceChildren();

                // Si el jugador esta fuera del borde
                if(nCol != nColumnas - 1){

                    fichaObjetivo = document.getElementById(`f${nFila}c${nCol + 1}`).getAttribute('class');
                    
                    // Si la ficha esta libre, se mueve al jugador
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){

                        j2 = document.getElementById(`f${nFila}c${nCol + 1}`);

                    // Si la ficha es el objetivo, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }
                   
                // En caso contrario
                }else{

                    fichaObjetivo = document.getElementById(`f${nFila}c0`).getAttribute('class');

                    // Si la ficha esta libre, se mueve al jugador al otro lado del tablero
                    if(fichaObjetivo.indexOf('j1') == -1  && fichaObjetivo.indexOf('objetivo') == -1){

                        j2 = document.getElementById(`f${nFila}c0`);

                    //  Si el objetivo se encuentra ahi, se le da un punto al jugador
                    } else if(fichaObjetivo.indexOf('objetivo') != -1){
                        asignarPuntuacion('j2');
                    }
                    

                }

                // Se añade una foto a la ficha nueva del jugador
                j2.classList.add('j2');
                imagen = document.createElement('img');
                imagen.setAttribute('src',rutaImg);
                j2.appendChild(imagen);
                break;
        }
    }

}

/**
 * Funcion que devuelve un array con todos los botones posibles del jugador 2
 * @param --> No
 * @return --> Array funciones
 */
function botonesJ2(){

    let funciones = [];

    funciones.push('KeyA')
    funciones.push('KeyS')
    funciones.push('KeyW')
    funciones.push('KeyD')

    return funciones;

}

/**
 * Funcion que asigna puntos a cada jugador
 * @param --> jugador
 * @return --> No 
 */
function asignarPuntuacion(ganador){

    let gana;

    puntuacionJ1 = document.getElementById('marcadorJ1');
    puntuacionJ2 = document.getElementById('marcadorJ2');

    // Coge valores para mostrar el ganador

    gana = document.getElementById('mostrarGanador');

    // Si la seccion no existe, se crea una nueva
    if(gana == null){
        gana = document.createElement('div');
        gana.setAttribute('id','mostrarGanador');

    //  Si no, se vacia su contenido
    }else{
        gana.replaceChildren();
    }

    let texto = document.createElement('marquee');
    let imagen = document.createElement('img');
    let gif = document.createElement('img');
    gif.setAttribute('src','img/gameOver.gif');

    // Si el ganador del punto es el jugador 1, se guarda un mensaje y una imagen
    if(ganador == 'j1'){
        texto.innerHTML = 'Iron Man consigue frenar a THANOS!!';
        imagen.setAttribute('src','img/ironManGemas.png');

    // Si no, se guarda otro mensaje y foto
    }else{
        texto.innerHTML = 'Thanos consigue las 6 GEMAS!!';
        imagen.setAttribute('src','img/thanosGemas.png');
    }

    // Si el ganador es el jugador 1
    if(ganador == 'j1'){

        // Se suma 1 punto al jugador
        puntuacionJ1.innerHTML++;

        // Si la puntuacion es 6
        if(puntuacionJ1.innerHTML == 6){

            // Se reinicia el marcador
            puntuacionJ1.innerHTML = 0;

            // Se borra el contenido del main
            main.replaceChildren();

            // Muestra mensaje de victoria con foto
            gana.appendChild(gif);
            gana.appendChild(texto);
            gana.appendChild(imagen);

            // Se crea el boton para reiniciar y crear de nuevo el tablero
            let boton = document.createElement('button');
            boton.setAttribute('type','button');
            boton.innerHTML = 'Empezar nueva partida';

            boton.setAttribute('onclick','inicio()')

            gana.appendChild(boton);

            main.appendChild(gana);

        // Si la puntuacion es menor que 6
        }else{

            // Se reinicia el tablero y se borra la foto para evitar que se dupliquen
            inicio();
            j1.replaceChildren();
        }
       
    // En caso contrario
    }else{
        
        // Se suma 1 punto al jugador
        puntuacionJ2.innerHTML++;

        // Si la puntuacion es 6
        if(puntuacionJ2.innerHTML == 6){

            // Se reinicia el marcador
            puntuacionJ2.innerHTML = 0;

            // Se borra el contenido del main para mostrar el mensaje de victoria
            main.replaceChildren();
            
            // Muestra mensaje de victoria con foto
            gana.appendChild(gif);
            gana.appendChild(texto);
            gana.appendChild(imagen);

            // Crea el boton para reiniciar el tablero
            let boton = document.createElement('button');
            boton.setAttribute('type','button');
            boton.innerHTML = 'Empezar nueva partida';

            boton.setAttribute('onclick','inicio()')

            gana.appendChild(boton);

            main.appendChild(gana);

        // Si la puntuacion es menor que 6
        }else{

            // Se reinicia el tablero
            inicio();

            // Se borra la imagen para evitar que se dupliquen fotos
            j2.replaceChildren();
        }
    }

}

/**
 * Funcion que crea un boton para poder reiniciar el tablero
 * @param --> No
 * @return --> No
 */
function crearBotonReinicio(){
    let button;

    button = document.getElementsByClassName('reinicioTablero')[0];

    // Si el boton no existe, se crea uno nuevo
    if(button == null){
        button = document.createElement('button');
        button.setAttribute('type','button');
        button.setAttribute('class','reinicioTablero');
        button.setAttribute('onclick','inicio()')
        button.innerHTML = 'Reiniciar tablero';
    }
    
    // Y se mete dentro del main
    main.appendChild(button);
}

/**
 * Funcion que crea el marcador
 * @param --> No
 * @return --> No
 */
function crearMarcador(){

    let section;

    section = document.getElementsByClassName('marcador')[0];

    // Si la seccion no existe se crea
    if(section == null){

        section = document.createElement('section');
        section.classList.add('marcador');

        // Creo el marco para cada marcador
        let marcadorJ1 = document.createElement('div');
        marcadorJ1.id.replace('marcadorJ1');
        marcadorJ1.classList.add('marcadores');

        let marcadorJ2 = document.createElement('div');
        marcadorJ2.id.replace('marcadorJ2');
        marcadorJ2.classList.add('marcadores');

        // Pongo el titulo dentro de cada marcador
        let titulo = document.createElement('div');
        titulo.classList.add('titulos');
        titulo.innerHTML = ('Iron Man');
        marcadorJ1.appendChild(titulo);

        titulo = document.createElement('div');
        titulo.classList.add('titulos');
        titulo.innerHTML = ('Thanos');
        marcadorJ2.appendChild(titulo);

        // Pongo la puntuacion dentro de cada marcador
        let puntuacionInicial = 0;
        let p = document.createElement('p');
        p.setAttribute('id','marcadorJ1');
        p.innerHTML = puntuacionInicial;
        marcadorJ1.appendChild(p);

        p = document.createElement('p')
        p.innerHTML = puntuacionInicial;
        p.setAttribute('id' ,'marcadorJ2');
        marcadorJ2.appendChild(p);

        section.appendChild(marcadorJ1);
        section.appendChild(marcadorJ2);

    }

    // Y se mete dentro del main
    main.appendChild(section);

}
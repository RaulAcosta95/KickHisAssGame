//Variables elementos globales html
const JUEGO_html=document.getElementById('JUEGO');
//Variables botones
const BTN_EMPEZAR = document.getElementById('BTN_EMPEZAR');
//Variables colores
const CELESTE = document.getElementById('CELESTE');
const VIOLETA = document.getElementById('VIOLETA');
const NARANJA = document.getElementById('NARANJA');
const VERDE = document.getElementById('VERDE');
//Variables de uso
const ULTIMO_NIVEL = 10;
//Oculta el juego al principio
//Lamentablemente, al quitarlo, le quita las propiedades de centrado...
JUEGO_html.classList.add('hide')

class Juego_class{
    constructor(){
        console.log('Inicia Juego_class');
        //Bind para poder llamar a inicializar al iniciar un nuevo juego
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarsecuencia();
        //Espera un segundo para empezar el nivel
        setTimeout(() => {
            this.siguientenivel();
        }, 1000);
        
    }
    inicializar(){
        console.log('Inicializa los colores y el nivel 1');
        this.siguientenivel = this.siguientenivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        //El toggle es para que haga una cosa u otra dependiendo si está el botón o no
        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            celeste:CELESTE, 
            violeta:VIOLETA, 
            naranja:NARANJA, 
            verde:VERDE
        }
    }
    toggleBtnEmpezar(){
        if (BTN_EMPEZAR.classList.contains('hide')) {
            //Si no está el botón, aparecelo y esconde el juego
            BTN_EMPEZAR.classList.remove('hide');
            BTN_EMPEZAR.classList.add('appear');
            JUEGO_html.classList.remove('appear');
            JUEGO_html.classList.add('hide');
            this.nivel = 1;
        }else{
            //Si si está el boton, escondelo y aparece el juego
            BTN_EMPEZAR.classList.remove('appear');
            BTN_EMPEZAR.classList.add('hide');
            JUEGO_html.classList.remove('hide')
            JUEGO_html.classList.add('appear');
            this.nivel = 1;
        }
    }
    generarsecuencia(){
        console.log('Genera Secuencia');
        //Crea un arreglo random con 10 elementos, contienen numeros del 0 al 3
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
        //Imprime la secuencia
        for (let i = 0; i < this.secuencia.length; i++) {
            console.log(this.secuencia[i]);
        }   
    }
    siguientenivel(){
        console.log('Inicia Nivel ');
        this.subnivel=0;
        this.iluminarsecuencia();
        this.agregarEventosClick();
    }
    transformaNumeroAColor(numero){
        console.log('Transforma el número del array a un color');
        switch(numero){//En iluminarseuencia le pasamos el numero
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformaColorANumero(color){
        console.log('Transforma el color del ev.target.dataset.color a su numero correspondiente');
        switch(color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarsecuencia(){
        console.log('Función iluminar Secuencia');
        console.log(`En el nivel ${this.nivel}`);
        for (let i = 0; i < this.nivel; i++) {
            const COLOR = this.transformaNumeroAColor(this.secuencia[i]);
            //Me faltaba el (numero) en transformaNumeroAColor(numero){
            setTimeout(() => this.iluminarColor(COLOR), 1000 * i);
        }
    }
    iluminarColor(COLOR){
        console.log(`Ilumina el color ${COLOR}`);
        this.colores[COLOR].classList.add('light');
        setTimeout(() => this.apagarColor(COLOR),350);
    }
    apagarColor(COLOR){
        console.log(`Apaga el color ${COLOR}`);
        this.colores[COLOR].classList.remove('light');
    }
    agregarEventosClick(){
        console.log('Agrega los eventos de click');
        this.colores.celeste.addEventListener('click',this.elegirColor);
        this.colores.violeta.addEventListener('click',this.elegirColor);
        this.colores.naranja.addEventListener('click',this.elegirColor);
        this.colores.verde.addEventListener('click',this.elegirColor);
    }
    eliminarEventosClick(){
        console.log('Elimina los eventos de click');
        this.colores.celeste.removeEventListener('click',this.elegirColor);
        this.colores.violeta.removeEventListener('click',this.elegirColor);
        this.colores.naranja.removeEventListener('click',this.elegirColor);
        this.colores.verde.removeEventListener('click',this.elegirColor);
    }
    elegirColor(ev){
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformaColorANumero(nombreColor);
    console.log(`Elige color ${nombreColor} ${numeroColor}`);
    this.iluminarColor(nombreColor);
        //Secuencia para ver en qué nivel está, si gano y todo eso
        if (numeroColor === this.secuencia[this.subnivel]) {
            //Si el numerocolor es igual al numero aleatorio correspondiente a este nivel
            console.log(`Corresponde al iluminado`);
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                //si este subnivel se completó
                console.log(`Pasó de nivel`);
                this.nivel++;
                this.eliminarEventosClick(); //Pendiente
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    //si el nivel actual al que está pasando fue el ultimo nivel
                    //Aqui ganó el usuario
                    setTimeout(() => {
                        console.log(`Ganó!`);
                        this.ganoElJuego();
                    }, 1500);
                }else{
                    //Si no era el ultimo nivel, pasa al siguiente nivel
                    console.log(`Pasa al siguiente nivel`);
                    setTimeout(this.siguientenivel, 1500);
                }
            }
        } else{
            //Aquí pierde
            setTimeout(() => {
                console.log(`Perdió`);
                this.perdioElJuego();
            }, 1000);
        }
    }
    ganoElJuego(){
        //Documentación de sweetAlert
        swal('Simon Dice', 'Felicidades, ganaste!','success')
        .then(() =>{//Al dar OK en la alerta
            //Inicializa el juego de nuevo al ganar
            console.log(`Ganaste, se inicia nuevo juego`);
            this.inicializar();
            this.generarsecuencia();
        })
    }
    perdioElJuego(){
        //Documentación de sweetAlert
        swal('Simon Dice', 'Que mal, perdiste!','error')
        .then(() =>{
            //Inicializa el juego de nuevo al ganar
            console.log(`Perdiste, se inicia nuevo juego`);
            this.eliminarEventosClick();
            this.inicializar();
            this.generarsecuencia();
        })
    }
}
//Se activa con el boton BTN_EMPEZAR
function empezarjuego(){
    // var Juego_class = new Juego();
    console.log('Crea la clase Juego_class');
    window.Juego_class = new Juego_class(); //Para poder mostrar elementos de la clase juego
}

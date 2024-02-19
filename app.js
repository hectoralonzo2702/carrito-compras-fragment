// capturando elementos

// capturamos el carrito...
const carrito = document.getElementById('carrito'); //<ul class="list-group" id="carrito"></ul>
const template = document.getElementById('template');//<template id="template">
const fragment = document.createDocumentFragment();//para evitar el reflow

//capturamos lo q este dentro de la clase .card y que sea de la clase .btn
//es decir todos los (3) botones, esta captura se almacena en el array = btnesBotones[]
const btnesBotones = document.querySelectorAll('.card .btn');

//creo el objeto donde se almacenaran los elementos, los cuales tendran formato de objeto{}
//es decir un objeto que a su vez contendra otro(s) objeto(s)
const carritoObjeto = [];

//funcion que agregara  al carrito segun...esta func se dispara al hacer click
//a cualquiera de los botones
const agregarAlCarrito = (e) => {
    console.log(e.target.dataset.fruta); //con "e.target.dataset.fruta" nos traemos la informacion  
                                        // del btn presionado, usando para ello inf de los buttons del 
                                        //index.html data-fruta="Manzana"/"Banana"/"Frutilla"

    //Objeto que se almacenara en objeto carritoObjeto = {}
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
    };
    //necesitms comprobar si este producto{} ya existe en el array carritoObjeto[]
    const indice = carritoObjeto.findIndex((item) => item.id === producto.id);
    console.log(indice);//pintamos...
    //si no existese entonces con metodo push() empujamos el producto al array carritoObjeto[]
    if (indice === -1) {
        carritoObjeto.push(producto)
    } else {// si ya existise entonce accedemos a indice.cantidad y le sumamos 1
        carritoObjeto[indice].cantidad ++;
    }
    //vemos como carritoArray esta quedando...
    console.log('carritoArrayXahora: ',carritoObjeto);

    //empujemos este objeto producto{} a nuestro objeto carritoObjeto = {}
    

    //Una vez agregado un elemento tenemos que llamar a func  pintarCarrito = ()
    pintarCarrito(carritoObjeto);// le paso el array carritoObjeto[] como argumento

};

//funcion que recorre los botones para detectarlos...
//comprobamos, con forEach() el array = btnesBotones[], que fueron seleccionados (optional) con console
btnesBotones.forEach((btn) => console.log('addssd==>',btn) );
//una vez comprobados... seguimos, le agregamos un escuchador que atendera a lo que 
//func agregarAlCarrito(e) indique hacer
btnesBotones.forEach((btn) => btn.addEventListener('click', agregarAlCarrito));

//func que permitira pintar nto array carritoObjeto[] a traves de nto template
const pintarCarrito = (array) => {//este array de aca es el array carritoObjeto[] q l paso como Arg
                                    //cuando en linea 45 llamo la funcion pintarCarrito(carritoObjeto)
        
    //Se requiere q carrito Ver linea 4 parta vacio
    carrito.textContent = ""; // forzamos a que parta vacio
    
    // Iteramos el array carritoObjeto[] con un forEach()        
    array.forEach(item => {
        //clonamos el template "Ver en linea 5 para recordar"
        const clone = template.content.firstElementChild.cloneNode(true);
        //a traves del clone buscamos los elementos estaticos en el index.html, nos valemos de
        // la class 'lead' del primer span para ubicarlo en index.html
        clone.querySelector('.lead').textContent = item.titulo;
        //hecemos otro clone para el 2do span usamos la class badge para ubicarlo en index.html
        clone.querySelector('.badge').textContent = item.cantidad;
        //una vez obtenido el clone. Para evitar el reflow empleamos el fragment "Ver linea 6"
        fragment.appendChild(clone);
    });//fin del forEach()
        //una vez termina el ciclo.... pintamos carrito "Ver linea 4"
        carrito.appendChild(fragment);

};

console.log('template: ==>>>',template);
console.log(btnesBotones);

// capturando elementos

// capturamos el carrito...
const carrito = document.getElementById('carrito'); //<ul class="list-group" id="carrito"></ul>
const template = document.getElementById('template');//<template id="template">
const footer = document.getElementById('footer');// footer id="footer"
const templateFooter = document.getElementById('templateFooter');//<template id="templateFooter">
const fragment = document.createDocumentFragment();//para evitar el reflow

//DELEGACION DE EVENTOS nos valemos de e.target.matches() devuelv true o false para conocer en que boton 
//estamos haciendo click para ejecutar la accion establecida, en resumen DELEGACION DE EVENTOS
document.addEventListener('click', (e) => {
    // console.log(e.target.matches(".card .btn-outline-primary"));
    if(e.target.matches(".card .btn-outline-primary")) {
        // console.log('ejecutar agregar al carrito');
        agregarAlCarrito(e); //esta (e) es el evento a capturar
    }
    //en linea de abajo verificamos q s haya creado dinamicment el button
    // console.log(e.target.matches(".list-group-item .btn-success"));
    if (e.target.matches("#carrito .list-group-item .btn-success")) {
        btnAumentar(e);
    }
    if (e.target.matches("#carrito .list-group-item .btn-danger")) {
        btnDisminuir(e);
    }

});

//creo el array en una VARIABLE (let), ya q luego necesitaremos sobreescribirlo en este se
//almacenaran los elementos, los cuales tendran formato de objeto{} es decir un array
//que a su vez contendra objeto(s)
let carritoObjeto = [];

//funcion que agregara  al carrito segun...esta func se dispara al hacer click
//a cualquiera de los botones
const agregarAlCarrito = (e) => {
    // console.log(e.target.dataset.fruta); //con "e.target.dataset.fruta" nos traemos la informacion  
                                        // del btn presionado, usando para ello inf de los buttons del 
                                        //index.html data-fruta="Manzana"/"Banana"/"Frutilla"

    //Objeto que se almacenara en objeto carritoObjeto = {}
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };
        // console.log(producto);

    //necesitms comprobar si este producto{} ya existe en el array carritoObjeto[]
    const indice = carritoObjeto.findIndex((item) => item.id === producto.id);
    // console.log(indice);//pintamos...
    //si no existese entonces con metodo push() empujamos el producto al array carritoObjeto[]
    if (indice === -1) {
        carritoObjeto.push(producto)
    } else {// si ya existise entonce accedemos a indice.cantidad y le sumamos 1
        carritoObjeto[indice].cantidad ++;
        // carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio;
    }
    console.log(carritoObjeto);
    // //vemos como carritoArray esta quedando...
    // console.log('carritoArrayXahora: ',carritoObjeto);

    // //empujemos este objeto producto{} a nuestro objeto carritoObjeto = {}
    
    //Una vez agregado un elemento tenemos que llamar a func  pintarCarrito = ()
    pintarCarrito();// ... ... ... ...

};

//func que permitira pintar nto array carritoObjeto[] a traves de nto template
const pintarCarrito = () => {//... ... ... ... ...
                                    
        
    //Se requiere q carrito Ver linea 4 parta vacio
    carrito.textContent = ""; // forzamos a que parta vacio
    
    // Iteramos el array carritoObjeto[] con un forEach()        
    carritoObjeto.forEach(item => {
        //clonamos el template "Ver en linea 5 para recordar"
        const clone = template.content.cloneNode(true);
        //a traves del clone buscamos los elementos estaticos en el index.html, nos valemos de
        // la class .text-white del 1er <li q encontrms en el template,  este <li detro de si
        // posee un span quien es el elemet q necesitms clonar
        clone.querySelector('.text-white .lead').textContent = item.titulo;

        //hacemos otro clone para el 2do span usamos la class badge debido a ser la unica de este tipo
        //en el document, esto para ubicarlo en index.html
        clone.querySelector('.badge').textContent = item.cantidad;

        //otro clone para modf el textContent del span dentro del div de la linea 101 del .html
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;

        //capturando los botones y detectar el evento
        //para ello clonamos el button cuya class es .btn-danger en el template que estamos
        //iterando
        clone.querySelector('.btn-danger').dataset.id = item.id;
        clone.querySelector('.btn-success').dataset.id = item.id;

        //una vez obtenido el clone. Para evitar el reflow empleamos el fragment "Ver linea 6"
        fragment.appendChild(clone);
    });//fin del forEach()

        //una vez termina el ciclo.... pintamos carrito "Ver linea 4"
        carrito.appendChild(fragment);

        //pintamos el footer luego del pintarCarrito() ese de arriba inmediatmnte aca 👆👆👆
        pintarFooter();
};

//func que permitira pintar en el span alojad en <template id="templateFooter">...<footer id="footer">
const pintarFooter = () => {
    console.log('pintar footer');
    //iniciamos el footer.textContent
    footer.textContent='';
    //con metodo reduce(*,0) aplicado al array carritoObjeto y multiplicando ppdd cantidad * precio
    //obtenemos total
    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
    );
    console.log(total);// para verificar lo q devuelve la func
    //clonamos el templateFooter to poder acceder a cualquiera de sus elemts
    const clone = templateFooter.content.cloneNode(true);
    //accedems al span y le agregamos el valor total obtenido con carritoObjeto.reduce(...);
    clone.querySelector('span').textContent = total;
    //le empujamos dentro del footer id="footer"... nuestro clone
    footer.appendChild(clone);
};

// ... ... ...  esperando descripcion
const btnAumentar = (e) => {
    console.log("me diste click ", e.target.dataset.id); //aca obtenems el id
    carritoObjeto = carritoObjeto.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++;
        }
        return item;
    });
    pintarCarrito();
};

// ... ... ...  esperando descripcion
const btnDisminuir = (e) => {
    console.log("me diste click", e.target.dataset.id);
    
    carritoObjeto = carritoObjeto.filter((item) => {
        if(item.id === e.target.dataset.id) {
            if(item.cantidad > 0) {
                item.cantidad --;
                if(item.cantidad === 0) return;
                return item;
            }            
        } else {
            return item;
        }
    });
    pintarCarrito();

};
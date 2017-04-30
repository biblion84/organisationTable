/*


 // enable draggables to be dropped into this
 interact('.dropzone').dropzone({
 // only accept elements matching this CSS selector
 accept: '#yes-drop',
 // Require a 75% element overlap for a drop to be possible
 overlap: 0.75,

 // listen for drop related events:

 ondropactivate: function (event) {
 // add active dropzone feedback
 event.target.classList.add('drop-active');
 },
 ondragenter: function (event) {
 var draggableElement = event.relatedTarget,
 dropzoneElement = event.target;

 // feedback the possibility of a drop
 dropzoneElement.classList.add('drop-target');
 draggableElement.classList.add('can-drop');
 draggableElement.textContent = 'Dragged in';
 },
 ondragleave: function (event) {
 // remove the drop feedback style
 event.target.classList.remove('drop-target');
 event.relatedTarget.classList.remove('can-drop');
 event.relatedTarget.textContent = 'Dragged out';
 },
 ondrop: function (event) {
 event.relatedTarget.textContent = 'Dropped';
 },
 ondropdeactivate: function (event) {
 // remove active dropzone feedback
 event.target.classList.remove('drop-active');
 event.target.classList.remove('drop-target');
 }
 });


 */

var element;
var NB_table = 0;
var numero_element;
var elements = document.getElementsByClassName("grid-snap");
var i;
var coordonnes = new Array(elements.length);
var tables = new Array(elements.length);
for (i = 0; i < elements.length; i++) {
    coordonnes[i] = new Array(2);
    coordonnes[i][0] = 0;
    coordonnes[i][1] = 0;
    elements[i].setAttribute("number", i);
    elements[i].setAttribute("rotated", 0);
    elements[i].innerHTML = i + 1;
}



interact(".grid-snap")
    .draggable({

        snap: {
            targets: [interact.createSnapGrid({x: 5, y: 5})],
            range: Infinity,
            relativePoints: [{x: 0, y: 0}]
        },
        inertia: false,
        restrict: {
            restriction: document.getElementsByClassName("grid-snap").parentNode,
            elementRect: {top: 0, left: 0, bottom: 1, right: 1},
            endOnly: true
        }
    })
    .on('dragmove', function (event) {
        numero_element = event.target.attributes.getNamedItem("number").nodeValue;
        coordonnes[numero_element][0] += event.dx;
        coordonnes[numero_element][1] += event.dy;

        event.target.style.transform = 'translate(' + coordonnes[numero_element][0] + 'px, ' + coordonnes[numero_element][1] + 'px)';
        if (event.target.attributes.getNamedItem("rotated").nodeValue)
            event.target.style.webkitTransform += 'rotate(' + event.target.attributes.getNamedItem("rotated").nodeValue + 'deg)';
    })
    .on('doubletap', function (event) {
        var change;
        console.log(event.target.attributes.getNamedItem("rotated").nodeValue);
        let rotation = ( parseInt(event.target.attributes.getNamedItem("rotated").nodeValue) + 45) % 180;
        event.target.setAttribute("rotated", rotation);

        // numero_element = event.target.attributes.getNamedItem("number").nodeValue;
        event.target.style.webkitTransform += 'rotate(' + 45 + 'deg)';
        console.log(rotation);

    });

function addTable() {
    let grid = document.getElementById("grid");
    let table = document.createElement("div");
    table.setAttribute("class", "grid-snap");
    grid.appendChild(table);
    elements = document.getElementsByClassName("grid-snap");

    coordonnes[elements.length - 1] = new Array(2);
    coordonnes[elements.length - 1][0] = 0;
    coordonnes[elements.length - 1][1] = 0;
    elements[elements.length - 1].setAttribute("number", elements.length - 1);
    elements[elements.length - 1].setAttribute("rotated", 0);
    elements[elements.length - 1].innerHTML = elements.length;

}

/*
 function Table(element) {
 this.element = element;
 this.rotated = false;
 this.x = 0;
 this.y = 0;
 this.nb =NB_table;
 NB_table = NB_table +  1;
 this.rotate = function () {
 if (!this.rotated)
 this.element.style.webkitTransform += 'rotate('+90+'deg)';
 else
 this.element.style.webkitTransform =  'translate(' + x + 'px, ' + y + 'px)';
 this.rotated =! this.rotated;
 }
 this.moving = function () {
 this.element.style.webkitTransform ='translate(' + x + 'px, ' + y + 'px)'
 if (this.rotated)
 this.element.style.webkitTransform +=' rotate('+90+'deg)';
 }
 }*/


































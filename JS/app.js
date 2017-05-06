const MAX_TABLE_ROW = 5;

let numero_element;
let elements = document.getElementsByClassName("grid-snap");
let coordonnes = new Array(elements.length);

interact(".grid-snap") // librairie interact.js
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
        let target = event.target.parentNode;
        let rotation = ( parseInt(target.attributes.getNamedItem("rotated").nodeValue) + 45) % 360;
        target.setAttribute("rotated", rotation);
        target.style.webkitTransform += 'rotate(' + 45 + 'deg)';
    });

function addTable(iteration, tableType) {
    let grid = document.getElementById("table");
    grid = grid.lastElementChild.lastElementChild;


    let table = document.createElement("div");
    table.setAttribute("class", "grid-snap");


    let td = document.createElement("td");
    td.appendChild(table);

    if (grid.childElementCount > MAX_TABLE_ROW) {
        grid = grid.parentNode;
        let tr = document.createElement("tr");
        tr.appendChild(td);
        grid.appendChild(tr);
    } else {
        grid.appendChild(td);
    }

    elements = document.getElementsByClassName("grid-snap");
    let lst_tb = elements.length - 1;
    coordonnes[lst_tb] = [];
    coordonnes[lst_tb][0] = 0;
    coordonnes[lst_tb][1] = 0;
    elements[lst_tb].setAttribute("number", lst_tb);
    elements[lst_tb].setAttribute("rotated", "0");
    //elements[lst_tb].innerHTML = "&nbsp".repeat(5) + elements.length;

    let img = document.createElement("img");
    img.setAttribute("src" , getTableByName(tableType));
    img.setAttribute("class", "table");
    img.setAttribute("alt", "une table  à placer");

    elements[lst_tb].appendChild(img);

    if (iteration > 0) {
        addTable(iteration - 1, tableType);
    }
}

function getTableByName(tableType){
    switch (tableType){
        case "ronde10":
            return "images/Table_ronde_10_personnes.png";
        case "ronde8":
            return "images/Table_ronde_8_personnes.png";
        case "rectangle10":
            return "images/table_rectangulaire_2M.png";
        default:
            return "images/table_rectangulaire_2M.png";
    }


}

function displayInformation (){

}



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
































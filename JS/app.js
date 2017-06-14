const MAX_TABLE_ROW = 5;

let numero_element;
let elements = document.getElementsByClassName("grid-snap");
let coordonnes = new Array(elements.length);

let tableCount = {
    "ronde10" : 3,
    "ronde8" : 10,
    "rectangle10" : 8};


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


// 2 tables de 2m et 2 de 2m50
function addTable(iteration, tableType) {
    if (isNaN(iteration)) // So that you can write addTable("ronde10"), i could have changed the html call
        tableType = iteration; // but i'm lazy

    if (tableCount.hasOwnProperty(tableType) && tableCount[tableType] > 0){
        tableCount[tableType]--;
    } else if (tableCount.hasOwnProperty("rectangle10") && tableCount["rectangle10"] > 0) {
        tableCount["rectangle10"]--;
    } else {
        console.log("nous n'avons plus ce type de table");
        return;
    }
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
    let lastIndice = elements.length - 1;
    table.setAttribute("id", "table" + lastIndice); //apres le lastIndice car besoin de ce dernier
    coordonnes[lastIndice] = [];
    coordonnes[lastIndice][0] = 0;
    coordonnes[lastIndice][1] = 0;
    elements[lastIndice].setAttribute("number", lastIndice);
    elements[lastIndice].setAttribute("rotated", "0");
    elements[lastIndice].getPosition = function (id){
        let position = new cumulativeOffset(document.getElementById(id));
        let matrix = cssToMatrix(id);
        let transformObj = matrixToTransformObj(matrix);
        let toAdd = transformObj.translate.split(",");
        position.top += parseInt(toAdd[1]);
        position.left += parseInt(toAdd[0]);
        return position;
    };
    //elements[lastIndice].innerHTML = "&nbsp".repeat(5) + elements.length;

    let img = document.createElement("img");
    img.setAttribute("src" , getTableByName(tableType));
    img.setAttribute("class", "tables"); //antiBootstrap
    img.setAttribute("alt", "une table  à placer");

    elements[lastIndice].appendChild(img);

    if (iteration > 0) {
        addTable(iteration - 1, tableType);
    }
}

function getTableByName(tableType){
    if (typeof relativePath === 'undefined'){
        relativePath = "./images/";
    }
    switch (tableType){
        case "ronde10":
            return relativePath + "Table_ronde_10_personnes.png";
        case "ronde8":
            return relativePath + "Table_ronde_8_personnes.png";
        case "rectangle10":
            return relativePath + "table_rectangulaire_SC.png";
        default:
            return relativePath + "table_rectangulaire_SC.png";
    }
}

function drawCanvas(id){
    let img = document.getElementById(id);

}

var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};
/**
 * Retrieves element transformation as a matrix
 *
 * Note that this will only take translate and rotate in account,
 * also it always reports px and deg, never % or turn!
 *
 * @param elementId
 * @return string matrix
 */
var cssToMatrix = function(elementId) {
    var element = document.getElementById(elementId),
        style = window.getComputedStyle(element);

    return style.getPropertyValue("-webkit-transform") ||
        style.getPropertyValue("-moz-transform") ||
        style.getPropertyValue("-ms-transform") ||
        style.getPropertyValue("-o-transform") ||
        style.getPropertyValue("transform");
}

/**
 * Transforms matrix into an object
 *
 * @param string matrix
 * @return object
 */
var matrixToTransformObj = function(matrix) {
    // this happens when there was no rotation yet in CSS
    if(matrix === 'none') {
        matrix = 'matrix(0,0,0,0,0)';
    }
    var obj = {},
        values = matrix.match(/([-+]?[\d\.]+)/g);

    obj.rotate = (Math.round(
                Math.atan2(
                    parseFloat(values[1]),
                    parseFloat(values[0])) * (180/Math.PI)) || 0
        ).toString() + 'deg';
    obj.translate = values[5] ? values[4] + 'px, ' + values[5] + 'px' : (values[4] ? values[4] + 'px' : '');

    return obj;
};

var matrix = cssToMatrix('transformed-thingy');
var transformObj = matrixToTransformObj(matrix);
console.log(matrix, transformObj);
//
// function displayInformation (){
//
// }



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
































let gridSize = 0;
let currentColor="Black";
let columnArray=[];
let gridArray = {};
let dragFlag=0;
document.addEventListener('mouseup',(event)=>{
    dragFlag=0;},false)
function addgrid(size){
    gridSize=size;
    const gridArea=document.querySelector(".grid")
    columnArray.forEach(element => {
        gridArea.removeChild(element)
        columnArray=[];
        gridArray = {};
    });    
    for(i=0;i<=size-1;i++){
        columnArray[i]=document.createElement('div');
        columnArray[i].classList.add('gridColumn');
        gridArea.appendChild(columnArray[i])
        gridArray[i] =  new Array(size)
        for(k=0;k<=size-1;k++){
            gridArray[i][k]=document.createElement('div');
            gridArray[i][k].classList.add('gridElement');
            columnArray[i].appendChild(gridArray[i][k]);
            gridArray[i][k].addEventListener('mousedown',gridClicked,false);
            gridArray[i][k].addEventListener('mouseover',drawGrid,false);
        }
    }
}
addgrid(64);

let colorSliders=document.querySelectorAll('.slider')
let colorSquare=document.querySelector(".color-square-square")
let colorSquareDescription=document.querySelector(".color-square-description")

colorSliders.forEach(function(element){
   element.addEventListener('input',colorChange,false)
})

function colorChange(){
    let sliderValues=[];
   colorSliders.forEach(slider => {
        sliderValues.push(slider.value);        
   });
   currentColor=`rgb(${sliderValues[0]},${sliderValues[1]},${sliderValues[2]})`;
   console.log(colorSquare);
   colorSquare.style.background=currentColor;
   colorSquareDescription.textContent=`R:${sliderValues[0]}  G:${sliderValues[1]}  B:${sliderValues[2]}`
};

sizeSlider=document.querySelector(".sizeSlider");
sizeSliderDescription = document.querySelector(".size-slider-description");

sizeSlider.addEventListener('input',sizeChange,false);

function sizeChange(){
    let size=0;
    size=sizeSlider.value;
    console.log(size)
    sizeSliderDescription.textContent=`Grid: ${size} x ${size} `
}
let confirmSize=document.querySelector(".confirm-size");
confirmSize.addEventListener('mousedown',(event)=>{
    if(confirm(`When you change size your grid will be cleared.\nAre you sure?`)){
        addgrid(sizeSlider.value);
    }  
})

function gridClicked(){
    dragFlag=1;
}

function drawGrid(){
    if(dragFlag==1){
        this.style.background=currentColor;
    }; 
};
const clearButton=document.querySelector('.clear-all');
clearButton.addEventListener('click',clearGrid,false);

function clearGrid(){
    console.log('erease')
    for(let i=0;i<gridArray.length;i++){
        for(let k=0;k<gridArray.length;k++){
            gridArray[i][k].style.background="White";
        };
    };
};

colorChange();
sizeChange();

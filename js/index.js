document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.getElementById('start-btn');
    const rndBtn = document.getElementById('rnd-btn');
    const inputContSize = document.getElementById('container-size');
    const inputBoxesCount = document.getElementById('box-count');
    const boxesInputs = document.getElementsByClassName('boxes-inputs')[0];

    let containerSize;

    rndBtn.addEventListener('click', () => {
        randomizeData();
    });

    startBtn.addEventListener('click', () => {
        containerSize = inputContSize.value;
        const boxes = getGeneratedBoxes(inputBoxesCount.value);

        drawBoxes(boxes);
        FF(boxes, containerSize);
        FFS(boxes, containerSize);
        bruteForce(boxes);
    });

    function FFS(boxes, containerSize) {
        boxes.sort((a, b) => a.size > b.size ? -1 : 1);
        FF(boxes, containerSize, 1);
    }

    function FF(boxes, containerSize, algTypes = 0) {
        let containers = new Array();
        for (let i = 0; i < boxes.length; i++) {
            for (let j = 0; j < containers.length; j++) {
                if (containers[j].freePlace - boxes[i].size >= 0) {
                    containers[j].freePlace -= boxes[i].size;
                    containers[j].idBoxes.push(boxes[i].id); 
                    boxes[i].isPutted = true;
                    break;
                }
            }
            if (boxes[i].isPutted === false) {
                let newContainer = {
                    freePlace: containerSize - boxes[i].size,
                    idBoxes: [boxes[i].id],
                }
                boxes[i].isPutted = true;
                containers.push(newContainer);
            }
        }

        drawContainers(containers, algTypes);
        boxes.forEach(element => {
            element.isPutted = false;
        });


        let freeSum = 0;
        for (let i = 0; i < containers.length; i++) {
            freeSum += containers[i].freePlace;
        }

        return freeSum;
    }

    function bruteForce(boxes) {
        let boxCombinations = getAllCombinations(boxes);

        let combMinFreePlace = FF(boxes, containerSize, -1);
        let combBoxesToDraw = boxes;

        boxCombinations.forEach(item => {
            let combFreePlace = FF(item, containerSize, -1);
            if (combFreePlace < combMinFreePlace) {
                combMinFreePlace = combFreePlace;
                combBoxesToDraw = item;
            }
        })
        FF(boxes, containerSize, 2);
    }
    
    function getAllCombinations(arr) {
        let prev, curr, el;
        let len = arr.length;
    
        curr = [[arr[0]]];
    
        for (let i = 1; i < len; i++) {
            el = arr[i];
            prev = curr;
            curr = [];
        
            prev.forEach(function(item) {
                curr = curr.concat(combinate(item, el));
            });
        }
    
        return curr;
    }

    function combinate(arr, el) {
        let len = arr.length;
        let res = [];
    
        for (let i = len; i >= 0; i--) {
            res.push(([]).concat(arr.slice(0, i), [el], arr.slice(i)));
        }
    
        return res;
    }

    function randomizeData() {
        inputContSize.value = getRandomInt(50, 301);
        inputBoxesCount.value = getRandomInt(2, 10);
        drawSubInputs();
        for (let i = 0; i < inputBoxesCount.value; i++) {
            document.getElementById(i + '-box-count').value = getRandomInt(10, inputContSize.value);
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    function getGeneratedBoxes(n) { 
        let boxes = new Array();
        for(let i = 0; i < n; i++) {
            let sizeValue = document.getElementById(i + '-box-count').value;
            let box = {
                id: i,
                size: parseInt(sizeValue),
                isPutted: false,
            }

            boxes.push(box);
        }
        return boxes;
    }
});
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
        boxes.sort((a, b) => a.size > b.size ? -1 : 1); // n*log(n) сортировка слиянием
        FF(boxes, containerSize, 1);
    }

    function FF(boxes, containerSize, algTypes = 0) {
        let containers = new Array(); //C1
        for (let i = 0; i < boxes.length; i++) { //C2 * N

            for (let j = 0; j < containers.length; j++) { //C3 * P * N
                if (containers[j].freePlace - boxes[i].size >= 0) { //C4 * P * N
                    containers[j].freePlace -= boxes[i].size;//C5 * P * N
                    containers[j].idBoxes.push(boxes[i].id); //C6 * P * N
                    boxes[i].isPutted = true;//C8 * P * N
                    break;//C9 * P * N
                }
            }

            if (boxes[i].isPutted === false) { //C10 * N
                let newContainer = { //C11 * N
                    freePlace: containerSize - boxes[i].size, 
                    idBoxes: [boxes[i].id],
                }
                boxes[i].isPutted = true; //C12 * N
                containers.push(newContainer); //C13 * N
            }

        }

        //худший случай P = N;

        //лучший случай P = 1;

        //средний случай P = N/2; 
            // так как вес коробки - случайное число от 1 до М => с вероятностью 1/2 вес коробки будет больше половины контейнера

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
        let len = arr.length;//C14
    
        curr = [[arr[0]]];//C15
        let count = 0;
    
        for (let i = 1; i < len; i++) {//C16 * N
            el = arr[i];//C17 * N
            prev = curr;//C18 * N
            curr = [];//C19 * N

            prev.forEach(function(item) { //C20 * N! * N
                curr = curr.concat(combinate(item, el));//C20 * N! * N
            });
        }
    
        return curr;
    }

    function combinate(arr, el) {
        let len = arr.length; // C22
        let res = []; // C21
    
        //LEN - длина массива
        for (let i = len; i >= 0; i--) { // C21 * LEN
            res.push(([]).concat(arr.slice(0, i), [el], arr.slice(i)));//c22 * LEN^2
            // 
        }
        console.log('res' ,res)
        return res;// C22
    }

    function randomizeData() {
        inputContSize.value = getRandomInt(50, 301);
        inputBoxesCount.value = getRandomInt(2, 10);
        drawSubInputs();
        for (let i = 0; i < inputBoxesCount.value; i++) {
            document.getElementById(i + '-box-count').value = getRandomInt(1, inputContSize.value);
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
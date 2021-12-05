// ф-ии отрисовки в DOM

function drawSubInputs() {
    const inputBoxesCount = document.getElementById('box-count');
    const boxesInputs = document.getElementsByClassName('boxes-inputs')[0];

    while (boxesInputs.firstChild) {// чистим если что-то есть в dom
        boxesInputs.removeChild(boxesInputs.firstChild);
    }

    for (let i = 0; i < inputBoxesCount.value; i++) {
        let boxInput = document.createElement('div');
        boxInput.className = "box-input";
        let p = document.createElement('p');
        p.innerHTML = 'Вес коробки ' + (i + 1) + ':';
        let input = document.createElement('input');
        input.id = i + "-box-count";
        boxInput.append(p);
        boxInput.append(input);
        boxesInputs.append(boxInput);
    }
}

function drawBoxes(boxes) {
    const inputContSize = document.getElementById('container-size');
    const boxesField = document.getElementsByClassName('entry-data-containers')[0];

    containerSize = inputContSize.value;

    while (boxesField.firstChild) {// чистим если что-то есть в dom
        boxesField.removeChild(boxesField.firstChild);
    }

    for (let i = 0; i < boxes.length; i++) {
        let boxhtml = document.createElement('div');
        boxhtml.id = 'box-' + i;
        boxhtml.style.width = boxes[i].size * 100 / containerSize + '%';
        boxhtml.innerHTML = (i + 1) + ' коробка' + ' веса ' + boxes[i].size;
        boxhtml.style.backgroundColor = getRandomColor();
        boxesField.append(boxhtml);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawContainers(containers, algType) {
    if (algType >= 0) {
        let containersField = document.getElementsByClassName('containers')[algType];

        while (containersField.firstChild) {// чистим если что-то есть в dom
            containersField.removeChild(containersField.firstChild);
        }

        let freePlaceSum = 0;
        for (let i = 0; i < containers.length; i++) {

            let conthtml = document.createElement('div');
            conthtml.style.width = 100 + '%';
            conthtml.className = "container";

            let freePlacehtml = document.createElement('p');
            freePlacehtml.className = "containerInfo"
            freePlacehtml.innerHTML = 'осталось места: ' + containers[i].freePlace;
            freePlaceSum += containers[i].freePlace;
            conthtml.append(freePlacehtml);

            let idBoxes = containers[i].idBoxes;
            for (let j = 0; j < idBoxes.length; j++) {
                let boxItem = document.getElementById('box-' + idBoxes[j]).cloneNode(true);
                conthtml.append(boxItem);
            }
            containersField.append(conthtml);
        }
        
        let freePlacehtml = document.createElement('p');
        freePlacehtml.className = "containerInfo containerInfoSum"
        freePlacehtml.innerHTML = 'сумма свободного места: ' + freePlaceSum;
        containersField.append(freePlacehtml);
    }
} 
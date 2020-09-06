window.model = {
    inputValueA: '', // user input W.
    inputValueB: '', // user input w.
    inputValueC: '', // user input angle.
    inputValueD:'', // user input displacement
    metacentricHeight: 0, //total sum that compute by computeSum method.
    width: 1, //width of executing one step.
    //  computeSum: compute total sum of area under cos curve.
    computeSum: function () {
        this.metacentricHeight = this.metacentricHeight + ((this.inputValueB*this.inputValueD)/((this.inputValueA+this.inputValueB)*(Math.tan(this.inputValueC)))) * this.width;
    },
    /* incrementInWidth: compute increment in inputValueA, that represent
    total width of curve from starting point to current point */
    // incrementInWidth: function () {
    //     this.inputValueA = this.inputValueA + this.width;
    // }
}

window.view ={
    metacentricHeight: 0, //  round up the sum(model.sum) value to 2 decimal points.
    canvasContext: '', // canvasContext have many properties and methods for drawing paths, boxes, circles, text, images, and more.
    canvas: new Object(), // Object value of canvas.
    currentSiblingElement: new Object(), //  Object value of current sibling.
    nextSiblingElement: new Object(), //  Object value of next sibling.
    // addClickEvent: add EventListener to other methods.
    addClickEvent: function (id, method) {
        var element = document.getElementById(id);
        element.addEventListener('click', method, false);
    },
    // activateEvents: calls addClickEvent method to add EventListener to other methods.
    activateEvents: function () {
    this.addClickEvent('okBtnId', function() { view.validationInput() });
    this.addClickEvent('startBtnId', function() { view.startExperiment() });
    this.addClickEvent('nextBtnId', function() { view.plotCurveArea() });
    this.addClickEvent('stopBtnId', function() { view.stopExperiment() });
},
    // getValue: return value from element.
    getValue: function (id) {
        var value = document.getElementById(id).value;
        return value;
    },
    // setValue: set given value to a element.
    setValue: function (id, valueToSet) {
        document.getElementById(id).value = valueToSet;
    },
    // getElementByClass: return element by given class name.
    getElementByClass: function (className) {
        var element = document.getElementsByClassName(className);
        return element[0];
    },
    // getNextSiblingElement: return next sibling element.
    getNextSiblingElement: function (element) {
        var nextSiblingElement = element.nextSibling;
        nextSiblingElement = nextSiblingElement.nextSibling;
        return nextSiblingElement;
    },
    // disableElement: makes element disable.
    disableElement: function(Id) {
        document.getElementById(Id).disabled = true;
    },
    // enableElement: makes element enable.
    enableElement: function(Id) {
        document.getElementById(Id).disabled = false;
    },
    // replaceElement: replace one element by another element.
    replaceElement: function (id1, id2) {
        document.getElementById(id1).style.display = 'none';
        document.getElementById(id2).style.display = 'block';
    },
    // changeClass: changes class name of a element.
    changeClass: function(id, className) {
        document.getElementById(id).className = className
    },

    // applyColorClass: adds new color class to a element.
    applyColorClass: function (id, colorClass) {
        document.getElementById(id).classList.add(colorClass);
    },
    // removeColorClass: removes color class from element.
    removeColorClass: function (id, colorClass) {
        document.getElementById(id).classList.remove(colorClass);
    },
    // executionWithColour: shows execution of code by changing color in code Content.
    executionWithColour: function () {
        this.removeColorClass(this.currentSiblingElement.id, 'redClass');
        this.applyColorClass(this.nextSiblingElement.id, 'redClass');
    },
    // changePropertyOfElements: changes property of elemants with enableElement, disableElement and changeClass.
    changePropertyOfElements: function () {
        this.enableElement('startBtnId');
        this.disableElement('okBtnId');
        this.disableElement('valueA');
        this.disableElement('valueB');
        this.changeClass('okBtnId', 'buttonDisable startButton');
        this.changeClass('startBtnId', 'button myStartButton');
    },
    // setInnerHtml: set innerText to a element.
    setInnerHtml: function (id, innerHTML) {
        document.getElementById(id).innerHTML = innerHTML;
    },
    // resetVariables: reset all variables to it's initial state.
    resetVariables: function () {
        model.inputValueA = '';
        model.inputValueB = '';
        model.inputValueC = '';
        model.inputValueD = '';
        // this.xCoordinatesValue = 0;
        // this.yCoordinatesValue = 0;
        model.metacentricHeight = 0;
        this.metacentricHeight = 0;
    },
    // resetTextFieldValue: reset text field to their initial state.
    resetTextFieldValue: function () {
        this.setValue('valueA', '');
        this.setValue('valueB', '');
        this.setValue('valueC', '');
        this.setValue('valueD', '');
    },
    // resetButtonAndTextField: reset button it's initial state and do text field enable.
    resetButtonAndTextField: function () {
        this.replaceElement('stopBtnId', 'startBtnId');
        this.enableElement('valueA');
        this.enableElement('valueB');
        this.enableElement('okBtnId');
        this.disableElement('nextBtnId');
        this.disableElement('stopBtnId');
        this.changeClass('okBtnId', 'button startButton');
        this.changeClass('startBtnId', 'buttonDisable myStartButton');
        this.changeClass('stopBtnId', 'buttonDisable startButton');
        this.changeClass('nextBtnId', 'buttonDisable nextButton');
    },
    // endOfExecution: work at end of code execution and with stop button to reset whole experiment at it's initial state.
    endOfExecution: function () {
        // this.clearOutputValues();
        this.resetVariables();
        this.resetTextFieldValue();
        this.resetButtonAndTextField();
        var idOfRedText = this.getElementByClass('redClass').id;
        this.removeColorClass(idOfRedText, 'redClass');
    },
    // clearOutputValues: clear all output values that displayed during the execution.
    clearOutputValues: function () {
        this.setInnerHtml('vari', '');
        this.setInnerHtml('valuei', '');
        this.setInnerHtml('valuesum', ''); //todo change id if require
        this.setInnerHtml('varsum', '');
        this.setInnerHtml('integrText', '');
        this.setInnerHtml('integrValue', '');
    },
    /* validationInput: check validation of input that is given by user and if input value is valid
    then make text field and ok button disable and make start button enable. */
    validationInput: function () {
        // var valueA1 = this.getValue('valueA');
        // var valueB1 = this.getValue('valueB');
        // var valueC1 = this.getValue('valueC'); //todo for tilt angle
        var valueD1 = this.getValue('valueD');
        // var valueC2 = valueC1 * (180/(Math.PI));
        /* if (valueA1 === '' || valueB1 === '' || valueC1==='') {
            alert('Enter Value of weight of floating object, weight of load and tilt angle');
            return false;
        }
         else if ( isNaN(valueA1) || isNaN(valueB1) || isNaN(valueC1)) {
            alert('Enter numeric value of weight of floating object, weight of load and tilt angle');
            return false;
        }*/
        /*if ((((Math.sign(valueA1)) || (Math.sign(valueB1)))=== (-1||0||-0))) {
            alert('Enter positive numeric value of weight of floating object and weight of load');
            return false;
        }
        else if ((Math.tan(valueC2))=== Infinity){ //todo check condition if required for tilt angle
            alert('Impossible result');
            return false;
        }*/
        // else if ((Math.sign(valueD1))=== -1){
        //     alert('Load is displaced in left direction');
        //     return true;
        // }
        // else if ((Math.sign(valueD1))=== 1) {
        //     alert('Load is displaced in right direction');
        //     return true;
        // }
        model.inputValueA = 1.5;
        model.inputValueB = 0.3056;
            // model.inputValueC = valueC2 ;
        model.inputValueD = valueD1; // todo work for sign change
        this.changePropertyOfElements();
        this.clearOutputValues();
        this.restoreCanvas();
    },
    // restoreCanvas: restor canvas it's initial state after clear previously drawed canvas.
    restoreCanvas: function () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height); // to clear previously drawed canvas.
        this.canvasContext.restore(); // restore canvas it's initial state.
        this.drawCanvas(); // redraw graph on canvas.
    }, //todo change

    // startExperiment: work to start code execution.
    startExperiment: function () {
        this.replaceElement('startBtnId', 'stopBtnId');
        this.enableElement('stopBtnId');
        this.enableElement('nextBtnId');
        this.disableElement('startBtnId');
        this.applyColorClass('NumApproCodeContent1', 'redClass');
        this.changeClass('startBtnId', 'myStartButton button');
        this.changeClass('stopBtnId', 'myStartButton button');
        this.changeClass('nextBtnId', 'nextButton button');
    },
    // stopExperiment: stop code execution at any point.
    stopExperiment: function () {
        this.endOfExecution();
    },
    /* plotCurveArea: fill area under cos curve, show value of i and sum according code execution,
    and at the end of code execution display final result. */
    plotCurveArea: function () {
        this.currentSiblingElement = this.getElementByClass('redClass');
        if (this.currentSiblingElement.id === 'NumApproCodeContent10') {
            this.endOfExecution();
        }
        this.nextSiblingElement = this.getNextSiblingElement(this.currentSiblingElement);
        if (this.nextSiblingElement.id === 'NumApproCodeContent2') {
            this.executionWithColour();
            // this.setInnerHtml('vari', 'i = ');
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent3') {
            this.executionWithColour();
            // this.setInnerHtml('varsum', 'sum = ');
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent4') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent5') {
            this.executionWithColour();
            // this.setInnerHtml('valuei', '0');
            // this.setInnerHtml('valuesum', '0');
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent6') {
            this.executionWithColour();
            // this.calculateXCoordinates();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent7') {
            this.executionWithColour();
            // this.showAreaUnderCurve();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent8') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent9') {
            // this.removeColorClass(this.currentSiblingElement.id, 'redClass');
            // this.applyColorClass('NumApproCodeContent6', 'redClass');
            // else if (model.inputValueA = model.inputValueB) {
            this.executionWithColour();
            //     this.setInnerHtml('integrText', 'INTEGRATION VALUE = ');
            //     this.setInnerHtml('integrValue', this.sum);
            // }
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent10') {
            this.executionWithColour();
        }
    },

    // init: calls methods to draw canvas and activate events.
    init: function () {
        // this.drawCanvas();
        this.activateEvents();
    }
}
// onload function: call init method on window onload.
window.onload = function () {
    view.init();
}


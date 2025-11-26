import { RECT, TestResults, advanceToFrame, canvasStatus, checkBackgroundIsCalledInDraw, checkCanvasSize, coloursMatch, getShapes, simulateKeyboardEvent, testShapesMatchInOrder } from "../../lib/test-utils.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

function checkOddEvenColours(firstShapes) {
    let allMatch = true;
    for (const i in firstShapes) {
        if (i % 2 === 0) {
            if (!coloursMatch(firstShapes[i].fillColour, color(0))) {
                allMatch = false;
                TestResults.addFail(`The shape at index ${i} should be black. Found ${firstShapes[i].fillColour.toString()}`);
            }
        }
        else  {
            if (!coloursMatch(firstShapes[i].fillColour, color(255))) {
                allMatch = false;
                TestResults.addFail(`The shape at index ${i} should be white. Found ${firstShapes[i].fillColour.toString()}`);
            }
        }
    }
    if (allMatch && firstShapes.length > 1) {
        TestResults.addPass(`The shapes at even indices are black and the shapes at odd indices are white.`);
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(600, 600);
    checkBackgroundIsCalledInDraw();
    if (canvasStatus.randomCalls.length >= 400) {
        TestResults.addPass("The <code>random()</code> function has been called at least 400 times (4 properties per rectangle times 100 rectangles).");
    } else {
        TestResults.addFail("If the rectangles are randomly generated, <code>random()</code> should be called at least 400 times (4 properties per rectangle times 100 rectangles).");
    }
    const firstShapes = getShapes();
    const rectCount = firstShapes.filter(s => s.type === RECT).length;
    if (firstShapes.length === 100 && rectCount === 100) {
        TestResults.addPass("There are 100 rectangles.");
    } else {
        TestResults.addFail(`Expected 100 rectangles. Found ${firstShapes.length} shapes, of which ${rectCount} are rectangles.`);
    }
    checkOddEvenColours(firstShapes);
    const hasKeyPressed = window.hasOwnProperty("keyPressed");
    const hasKeyReleased = window.hasOwnProperty("keyReleased");
    if (hasKeyPressed) {
        simulateKeyboardEvent(keyPressed, " ");
    }
    if (hasKeyReleased) {
        simulateKeyboardEvent(keyReleased, " ");
    }
    if (!hasKeyPressed && !hasKeyReleased) {
        TestResults.addFail("The sketch does not implement a keyboard event function.");
    } else {
        advanceToFrame(frameCount + 1);
        const secondShapes = getShapes();
        const rectCount2 = secondShapes.filter(s => s.type === RECT).length;
        if (secondShapes.length === 100 && rectCount2 === 100) {
            TestResults.addPass("When the space bar has been pressed, there are 100 rectangles.");
            if (!testShapesMatchInOrder(firstShapes, secondShapes)) {
                TestResults.addPass("Pressing the space bar generates new random rectangles.");
            } else {
                TestResults.addFail("Pressing the space bar does not appear to generate new rectangles.");
            }
            // Pressing another key
            if (hasKeyPressed) {
                simulateKeyboardEvent(keyPressed, "a");
            }
            if (hasKeyReleased) {
                simulateKeyboardEvent(keyReleased, "a");
            }
            advanceToFrame(frameCount + 1);
            const thirdShapes = getShapes();
            if (testShapesMatchInOrder(secondShapes, thirdShapes)) {
                TestResults.addPass("Pressing a key other than the space bar does not change the rectangles.");
            } else {
                TestResults.addFail(`Pressing the "a" key changes the rectangles. The shapes drawn on the canvas should only change if the space bar is pressed.`);
            }
            
        } else {
            TestResults.addFail(`Expected 100 rectangles after the space bar is pressed. Found ${secondShapes.length} shapes, of which ${rectCount2} are rectangles.`);
        } 
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);

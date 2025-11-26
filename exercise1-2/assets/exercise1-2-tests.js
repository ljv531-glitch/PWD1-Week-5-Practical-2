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

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkBackgroundIsCalledInDraw();
    let ballFound = false;
    try {
        if (ball) {
            ballFound = true;
        }
    } catch {
        TestResults.addFail("The sketch does not appear to contain a global variable called <code>ball</code>. Did you delete or rename it? Unable to run any more tests.");
    }
    if (ballFound) {
        if (ball.hasOwnProperty("diameter")) {
            TestResults.addPass("The ball has a property called <code>diameter</code>.");
            if (ball.diameter === 100) {
                TestResults.addPass("The diameter is initially set to 100.");
            } else {
                TestResults.addFail("The diameter should initially be set to 100.");
            }
            advanceToFrame(102);
            if (ball.speedY < 0) {
                if (ball.diameter === 99) {
                    TestResults.addPass("The ball's diameter shrinks by one when it bounces off the bottom wall.");
                } else {
                    TestResults.addFail(`The ball's diameter should shrink by one when it bounces off the bottom wall. The diameter of the ball is ${ball.diameter}.`)
                }
            } else {
                TestResults.addFail(`By frame 102, the ball should have bounced off the bottom of the canvas and the speed on the y axis should be negative. The speedY of the ball is ${ball.speedY}.`);
            }
            advanceToFrame(169);
            if (ball.speedX < 0) {
                if (ball.diameter === 98) {
                    TestResults.addPass("The ball's diameter shrinks by one when it bounces off the left wall.");
                } else {
                    TestResults.addFail(`The ball's diameter should shrink by one when it bounces off the left wall. The diameter of the ball is ${ball.diameter}.`)
                }
            } else {
                TestResults.addFail(`By frame 169, the ball should have bounced off the left of the canvas and the speed on the x axis should be negative. The speedX of the ball is ${ball.speedX}.`);
            }
        } else {
            TestResults.addFail("The ball does not have a property called <code>diameter</code>. Add this before continuing.");
        }
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);

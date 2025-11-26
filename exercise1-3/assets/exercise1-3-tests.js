import { RECT, SQUARE, TestResults, advanceToFrame, canvasStatus, checkBackgroundIsCalledInDraw, checkCanvasSize, getShapes, simulateKeyboardEvent } from "../../lib/test-utils.js";

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

function obstaclesInitialisedCorrectly() {
    if (player.x === 50 && player.y === 50 && player.size === 50) {
        TestResults.addPass("The <code>player</code> object is initialised correctly.");
    } else {
        TestResults.addFail(`The <code>player</code> object is not initialised correctly. Expected the following properties: <code>x</code> = 50, <code>y</code> = 50, <code>size</code> = 50. Found <code>x</code> = ${player.x}, <code>y</code> = ${player.y}, <code>size</code> = ${player.size}.`)
    }
    if (obstacle.x === 150 && obstacle.y === 100 && obstacle.width === 100 && obstacle.height === 200) {
        TestResults.addPass("The <code>obstacle</code> object is initialised correctly.");
    } else {
        TestResults.addFail(`The <code>obstacle</code> object is not initialised correctly. Expected the following properties: <code>x</code> = 150, <code>y</code> = 100, <code>width</code> = 100, <code>height</code> = 200. Found <code>x</code> = ${obstacle.x}, <code>y</code> = ${obstacle.y}, <code>width</code> = ${obstacle.width}, <code>height</code> = ${obstacle.height}.`)
    }
}



function checkShapesMatchObjects(msgPrefix) {
    const actualShapes = getShapes();
    if (actualShapes.length !== 2) {
        TestResults.addFail(`Expected two shapes, found ${actualShapes.length}.`);
    } else {
        let playerFound = false;
        let obstacleFound = false;
        for (const s of actualShapes) {
            if (s.x === player.x && s.y === player.y && s.w === player.size && s.h === player.size) {
                if (playerFound) {
                    TestResults.addFail(`${msgPrefix}, only one shape should match the location and dimensions of <code>player</code>. An additional matching shape was found.`);
                } else {
                    playerFound = true;
                    TestResults.addPass(`${msgPrefix}, a shape matching the location and dimensions of <code>player</code> was found.`);
                }
            }
            if (s.x === obstacle.x && s.y === obstacle.y && s.w === obstacle.width && s.h === obstacle.height) {
                if (obstacleFound) {
                    TestResults.addFail(`${msgPrefix}, only one shape should match the location and dimensions of <code>obstacle</code>. An additional matching shape was found.`);
                } else {
                    obstacleFound = true;
                    TestResults.addPass(`${msgPrefix}, a shape matching the location and dimensions of <code>obstacle</code> was found.`);
                }
            }
        }
        if (!playerFound) {
            TestResults.addFail(`${msgPrefix}, no shapes matching the <code>player</code> object were found. One was expected.`);
        }
        if (!obstacleFound) {
            TestResults.addFail(`${msgPrefix}, no shapes matching the <code>obstacle</code> object were found. One was expected.`);
        }
    }
}

function movePlayer(wasd) {
    const prevX = player.x;
    const prevY = player.y;
    keyIsPressed = true;
    key = wasd;
    if (window.hasOwnProperty("keyPressed")) {
        simulateKeyboardEvent(keyPressed, wasd);
    }
    if (window.hasOwnProperty("keyReleased")) {
        simulateKeyboardEvent(keyReleased, wasd);
    }
    advanceToFrame(frameCount + 1);
    let xMsg = "";
    if (player.x > prevX) {
        xMsg = "<code>player.x</code> increased";
    } else if (player.x === prevX) {
        xMsg = "<code>player.x</code> stayed the same";
    } else if (player.x < prevX) {
        xMsg = "<code>player.x</code> decreased";
    } else {
        xMsg = `<code>player.x</code> was ${prevX} before the key was pressed and ${player.x} after.`;
    }
    let yMsg = "";
    if (player.y > prevY) {
        yMsg = "<code>player.y</code> increased";
    } else if (player.y === prevY) {
        yMsg = "<code>player.y</code> stayed the same";
    } else if (player.y < prevY) {
        yMsg = "<code>player.y</code> decreased";
    } else {
        yMsg = `<code>player.y</code> was ${prevY} before the key was pressed and ${player.y} after.`;
    }
    if (wasd === "d") {
        if (player.x > prevX && player.y === prevY) {
            TestResults.addPass("When the d key is pressed, the <code>player</code> coordinates are updated as expected.");
        } else {
            TestResults.addFail(`When the d key is pressed, the <code>player.x</code> should increase and <code>player.y</code> should stay the same. Instead, ${xMsg}, and ${yMsg}.`);
        }
    }
    else if (wasd === "a") {
        if (player.x < prevX && player.y === prevY) {
            TestResults.addPass("When the a key is pressed, the <code>player</code> coordinates are updated as expected.");
        } else {
            TestResults.addFail(`When the a key is pressed, the <code>player.x</code> should decrease and <code>player.y</code> should stay the same. Instead, ${xMsg}, and ${yMsg}.`);
        }
    }
    else if (wasd === "w") {
        if (player.x === prevX && player.y < prevY) {
            TestResults.addPass("When the w key is pressed, the <code>player</code> coordinates are updated as expected.");
        } else {
            TestResults.addFail(`When the w key is pressed, the <code>player.x</code> should stay the same and <code>player.y</code> should decrease. Instead, ${xMsg}, and ${yMsg}.`);
        }
    }
    else if (wasd === "s") {
        if (player.x === prevX && player.y > prevY) {
            TestResults.addPass("When the s key is pressed, the <code>player</code> coordinates are updated as expected.");
        } else {
            TestResults.addFail(`When the s key is pressed, the <code>player.x</code> should stay the same and <code>player.y</code> should increase. Instead, ${xMsg}, and ${yMsg}.`);
        }
    }
    keyIsPressed = false;
    advanceToFrame(frameCount + 1);
}

function playerObstacle() {
    // put player on left
    player.x = obstacle.x - player.size;
    player.y = obstacle.y;
    const playerLeftX = player.x;
    keyIsPressed = true;
    key = "d";
    if (window.hasOwnProperty("keyPressed")) {
        simulateKeyboardEvent(keyPressed, "d");
    }
    if (window.hasOwnProperty("keyReleased")) {
        simulateKeyboardEvent(keyReleased, "d");
    }
    advanceToFrame(frameCount + 1);
    if (player.x === playerLeftX) {
        TestResults.addPass("When the player is against the left edge of the obstacle, it cannot move right.");
    } else {
        TestResults.addFail("When the player is against the left edge of the obstacle, it is able to move right.");
    }
    // put player on right
    player.x = obstacle.x + obstacle.width;
    player.y = obstacle.y;
    const playerRightX = player.x;
    key = "w";
    if (window.hasOwnProperty("keyPressed")) {
        simulateKeyboardEvent(keyPressed, "w");
    }
    if (window.hasOwnProperty("keyReleased")) {
        simulateKeyboardEvent(keyReleased, "w");
    }
    advanceToFrame(frameCount + 1);
    if (player.x === playerRightX) {
        TestResults.addPass("When the player is against the right edge of the obstacle, it cannot move left.");
    } else {
        TestResults.addFail("When the player is against the right edge of the obstacle, it is able to move left.");
    }
    // put player on top
    player.x = obstacle.x;
    player.y = obstacle.y - player.size;
    const playerTopY = player.y;
    key = "s";
    if (window.hasOwnProperty("keyPressed")) {
        simulateKeyboardEvent(keyPressed, "s");
    }
    if (window.hasOwnProperty("keyReleased")) {
        simulateKeyboardEvent(keyReleased, "s");
    }
    advanceToFrame(frameCount + 1);
    if (player.y === playerTopY) {
        TestResults.addPass("When the player is against the top edge of the obstacle, it cannot move down.");
    } else {
        TestResults.addFail("When the player is against the top edge of the obstacle, it is able to move down.");
    }
    // put player on bottom
    player.x = obstacle.x;
    player.y = obstacle.y + obstacle.height;
    const playerBottomY = player.y;
    key = "w";
    if (window.hasOwnProperty("keyPressed")) {
        simulateKeyboardEvent(keyPressed, "w");
    }
    if (window.hasOwnProperty("keyReleased")) {
        simulateKeyboardEvent(keyReleased, "w");
    }
    advanceToFrame(frameCount + 1);
    if (player.y === playerBottomY) {
        TestResults.addPass("When the player is against the bottom edge of the obstacle, it cannot move up.");
    } else {
        TestResults.addFail("When the player is against the bottom edge of the obstacle, it is able to move up.");
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(400, 400);
    checkBackgroundIsCalledInDraw();
    let objectsFound = false;
    try {
        if (player && obstacle) {
            objectsFound = true;
        }
    } catch {
        TestResults.addFail("One or both of the expected global objects, <code>player</code> and <code>obstacle</code>. Unable to run any more tests.");
    }
    if (objectsFound) {
        obstaclesInitialisedCorrectly();
        // Shapes are in the same place as the objects
        checkShapesMatchObjects("When the sketch starts");
        // Not using event variable
        if (window.hasOwnProperty("keyPressed") || window.hasOwnProperty("keyReleased")) {
            TestResults.addWarning("A keyboard event function appears to have been implemented. To make the player move smoothly, use the <code>keyIsPressed</code> system variable rather than an event function.");
        }
        // Move left, right, up, down -> object values change, shapes still match objects
        movePlayer("d");
        // checkShapesMatchObjects("When the d key is pressed");
        movePlayer("a");
        movePlayer("w");
        movePlayer("s");
        // Can't pass through the obstacle
        playerObstacle();
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);

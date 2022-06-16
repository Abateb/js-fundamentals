const qutil = {}
const debounceGates = {}
let debugMode = false;

qutil.enableDebugMode = function() {
    debugMode = true;
}

qutil.disableDebugMode = function() {
    debugMode = false;
}

qutil.debugPrint = function(...args) {
    if (debugMode) {
        console.log("[debug]", ...args);
    }
}

qutil.giveDebounce = function(f, delay) {
    const prevRef = debounceGates[f];
    if (prevRef && !prevRef.debounceGate) {
        this.debugPrint("function is debounced");
        return () => {}; // return empty function to prevent error calling a debounced function
    }

    const debRef = {debounceGate: true}
    debounceGates[f] = debRef;

    return function(...args) {
        if (debRef.debounceGate) {
            debRef.debounceGate = false;
            debRef.func = f;
            debRef.func(...args);
            if (delay) {
                debRef.timeout = setTimeout(() => {
                    debRef.debounceGate = true;
                }, delay*1000);
            }
        }
    }
}

qutil.cancelDebounce = function(f) {
    const ref = debounceGates[f];
    if (ref.timeout) clearTimeout(ref.timeout);
    ref.debounceGate = true;
}

qutil.getDebounce = function(f) {
    return debounceGates[f];
}

// fixed bug
// randomInt will now return values from 0-max
qutil.randomInt = function(min, max) {
    if (!max) { max = min; min = 0; }
    let rand = Math.random();
    return min + Math.floor((max - min)*rand + 0.5);
}

qutil.randomizeArray = function(array) {
    for (let i = 0; i < array.length; i++) {
        let randIndex = this.randomInt(i, array.length - 1);
        [array[i], array[randIndex]] = [array[randIndex], array[i]];
    }
    return array;
}

qutil.weakCloneArray = function(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }
    return newArray;
}

qutil.getRandomIndex = function(array) {
    return array[randomInt(array.length - 1)];
}

export default gutil;

const sineButton = document.getElementById("sine");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const attackInput = document.getElementById("attack");
const decayInput = document.getElementById("decay");
const sustainInput = document.getElementById("sustain");
const releaseInput = document.getElementById("release");
const buttonC = document.getElementById("buttonC");
const buttonD = document.getElementById("buttonD");
const buttonE = document.getElementById("buttonE");
const buttonF = document.getElementById("buttonF");
const buttonG = document.getElementById("buttonG");
const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const buttonC2 = document.getElementById("buttonC2");
const frequencyInput = document.getElementById("frequency");
const delayTimeInput = document.getElementById("delayTime");
const depthInput = document.getElementById("depth");

let chorus;
let synth;

window.addEventListener("load", () => {
  // Create Chorus effect and start
  chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
  //Create polySynth
  synth = new Tone.PolySynth().connect(chorus);
  // Set oscilliator to Sine
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
});

sineButton.addEventListener("click", () => {
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
});

attackInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      attack: attackInput.value,
    },
  });
});

decayInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      decay: decayInput.value,
    },
  });
});

sustainInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      sustain: sustainInput.value,
    },
  });
});

releaseInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      release: releaseInput.value,
    },
  });
});

frequencyInput.addEventListener("change", () => {
  chorus.frequency.value = frequencyInput.value;
});

delayTimeInput.addEventListener("change", () => {
  chorus.delayTime = delayTimeInput.value;
});

depthInput.addEventListener("change", () => {
  chorus.depth = depthInput.value;
});

buttonC.addEventListener("click", () => {
  synth.triggerAttackRelease(["C3", "E3"], "4n");
});

buttonD.addEventListener("click", () => {
  synth.triggerAttackRelease(["D3", "F3"], "4n");
});

buttonE.addEventListener("click", () => {
  synth.triggerAttackRelease(["E3", "G3"], "4n");
});

buttonF.addEventListener("click", () => {
  synth.triggerAttackRelease(["F3", "A3"], "4n");
});

buttonG.addEventListener("click", () => {
  synth.triggerAttackRelease(["G3", "B3"], "4n");
});

buttonA.addEventListener("click", () => {
  synth.triggerAttackRelease(["A3", "C4"], "4n");
});

buttonB.addEventListener("click", () => {
  synth.triggerAttackRelease(["B3", "D4"], "4n");
});

buttonC2.addEventListener("click", () => {
  synth.triggerAttackRelease(["C4", "E4"], "4n");
});

window.addEventListener("click", () => {
  Tone.start().then(() => console.log("audio started"));
});

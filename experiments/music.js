//This code is adapted and inspired by https://codepen.io/pixelkind/pen/RwEVVaw

let synth;

//Following one line was adapted from https://chatgpt.com/share/68d51069-73bc-8005-ac1d-0861224e6c6c
const noteArray = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

window.addEventListener("load", () => {
  synth = new Tone.PolySynth().toDestination();
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
  window.addEventListener("click", async () => {
    await Tone.start();
    console.log("started");
  });
  window.addEventListener("click", () => {
    //Following 2 lines was adapted from https://chatgpt.com/share/68d51069-73bc-8005-ac1d-0861224e6c6c
    const randomNote = noteArray[Math.floor(Math.random() * noteArray.length)];
    synth.triggerAttackRelease(randomNote, "4n");
  });
});

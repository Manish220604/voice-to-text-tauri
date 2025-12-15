import { startMicrophone, stopMicrophone } from "./audio.js";
import {
  connectDeepgram,
  sendAudioToDeepgram,
  closeDeepgram
} from "./deepgram.js";

const pttBtn = document.getElementById("ptt");
const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");

let recording = false;

pttBtn.onmousedown = async () => {
  if (recording) return;
  recording = true;

  statusEl.textContent = "Recording…";

  connectDeepgram(
    text => {
      outputEl.value += text + " ";
    },
    err => alert(err)
  );

  // ⏱ Small delay to ensure WS is open
  await new Promise(r => setTimeout(r, 300));

  await startMicrophone(pcm => {
    sendAudioToDeepgram(pcm);
  });
};

pttBtn.onmouseup = () => {
  if (!recording) return;
  recording = false;

  statusEl.textContent = "Idle";
  stopMicrophone();
  closeDeepgram();
};

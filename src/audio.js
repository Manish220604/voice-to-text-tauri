let audioContext;
let processor;
let source;
let stream;

function floatTo16BitPCM(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;

  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let sample = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  return buffer;
}

/**
 * Initialize microphone and start capturing audio
 */
export async function startMicrophone(onAudioData) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContext = new AudioContext({ sampleRate: 16000 });
    source = audioContext.createMediaStreamSource(stream);

    processor = audioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = event => {
      const input = event.inputBuffer.getChannelData(0);
      const pcmBuffer = floatTo16BitPCM(input);
      onAudioData(pcmBuffer);

    };

    source.connect(processor);
    processor.connect(audioContext.destination);
  } catch (err) {
    throw new Error("Microphone permission denied or unavailable");
  }
}

/**
 * Stop microphone capture
 */
export function stopMicrophone() {
  try {
    processor?.disconnect();
    source?.disconnect();
    stream?.getTracks().forEach(track => track.stop());
    if (audioContext?.state !== "closed") {
      audioContext.close();
    }
  } catch (e) {
    console.warn("Audio already stopped");
  }
}



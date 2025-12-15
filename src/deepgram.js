let socket;
let socketReady = false;

export function connectDeepgram(onTranscript, onError) {
  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen" +
      "?model=nova-2" +
      "&encoding=linear16" +
      "&sample_rate=16000" +
      "&channels=1" +
      "&punctuate=true" +
      "&interim_results=true",
    ["token", "YOUR API KEY"]
  );

  socket.onopen = () => {
    socketReady = true;
    console.log("Deepgram connected");
  };

  socket.onmessage = event => {
    const data = JSON.parse(event.data);

    const transcript =
      data.channel?.alternatives?.[0]?.transcript;

    if (transcript && transcript.trim() !== "") {
      onTranscript(transcript);
    }
  };

  socket.onerror = err => {
    onError("Deepgram connection error");
  };
}

export function sendAudioToDeepgram(pcmBuffer) {
  if (socketReady && socket?.readyState === WebSocket.OPEN) {
    socket.send(pcmBuffer);
  }
}

export function closeDeepgram() {
  socketReady = false;
  socket?.close();
  socket = null;
}



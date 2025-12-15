🎙️ Voice-to-Text Desktop App (Tauri + Deepgram)
A lightweight cross-platform push-to-talk voice-to-text desktop application built using Tauri and Deepgram’s real-time speech-to-text API.
The app captures microphone audio, streams it in real time, and displays accurate transcriptions with minimal latency.


✨ Features
🎙️ Push-to-Talk Voice Input
Press and hold to start recording, release to stop.

🎧 Microphone Access & Audio Capture
Uses the Web Audio API to capture high-quality audio with explicit permission handling.

⚡ Real-Time Transcription
Streams raw PCM audio to Deepgram via WebSockets for low-latency transcription.

📝 Live Text Display
Displays transcribed text in real time inside the application.

⏺ Recording State Feedback
Clear visual indication of recording vs idle state.

🚨 Graceful Error Handling
Handles microphone permission issues, network errors, and API failures without crashing.


🧱 Tech Stack
Layer	Technology
Desktop Framework	Tauri (Rust backend + WebView frontend)
Frontend	HTML, CSS, JavaScript
Audio	Web Audio API
Speech-to-Text	Deepgram WebSocket API
Platform	Windows (cross-platform capable)


 Project Structure
voice-to-text-tauri/
├── src/
│   ├── index.html        # UI
│   ├── main.js           # UI logic & push-to-talk
│   ├── audio.js          # Microphone capture & PCM conversion
│   ├── deepgram.js       # Deepgram WebSocket integration
│   └── styles.css
│
├── src-tauri/
│   └── (Rust backend files)
│
├── package.json
└── README.md


🧠 Architecture Overview
The application is intentionally structured with clear separation of concerns:

UI Layer (index.html, main.js)
Handles user interaction, push-to-talk logic, and displaying transcription results.

Audio Layer (audio.js)
Responsible for microphone access, audio capture, and conversion to 16-bit PCM format.

Transcription Layer (deepgram.js)
Manages WebSocket connection, audio streaming, and transcription responses from Deepgram.

This modular design improves maintainability and makes the code easy to review and extend.


🔊 Audio Processing Details
Microphone audio is captured using the Web Audio API

Audio is downsampled to 16 kHz

Converted from Float32 to 16-bit PCM

Streamed in real time to Deepgram over WebSockets

This format is required for accurate, low-latency transcription.


⚙️ Setup & Run Instructions
1️⃣ Prerequisites
Node.js (LTS)

Rust (stable)

Windows with WebView2 installed

2️⃣ Install Dependencies
npm install

3️⃣ Run the App (Development Mode)
npm run tauri dev
The desktop window should open automatically.


🎬 Demo Video
A demo video showcasing:

Push-to-talk voice input

Real-time transcription

End-to-end functionality

📺 Demo Link:
👉 


🚧 Known Limitations
Uses ScriptProcessorNode, which is deprecated (chosen for simplicity and clarity).
In production, this should be replaced with AudioWorkletNode.

No advanced UI styling or animations (intentionally kept minimal).

Transcription language is currently fixed (can be extended easily).


🔮 Possible Enhancements
Keyboard-based push-to-talk hotkey

Language selection (e.g., Hindi, Telugu)

Transcript export (TXT / PDF)

AI summarization of transcribed text

AudioWorklet-based capture for production readiness


🏁 Conclusion
This project demonstrates:

Real-time audio streaming

WebSocket-based speech recognition

Clean architecture and separation of concerns

Practical desktop application development using Tauri

The focus is on functionality, reliability, and clarity, rather than UI polish.


## Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

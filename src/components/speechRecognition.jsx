import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const SpeachRecognition = ({ onTranscriptUpdate, onFinalResult }) => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [finalTranscript, setFinalTranscript] = useState("");
  const [finalResultSent, setFinalResultSent] = useState(false);

  useEffect(() => {
    if (listening) {
      setFinalTranscript(transcript);
    }
  }, [transcript, listening]);

  useEffect(() => {
    if (!listening && transcript) {
      const timer = setTimeout(() => {
        setFinalTranscript(transcript);
        onTranscriptUpdate(transcript);

        // Call onFinalResult only if it's provided
        if (onFinalResult && !finalResultSent) {
          onFinalResult(transcript);
          setFinalResultSent(true);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    listening,
    transcript,
    finalResultSent,
    onTranscriptUpdate,
    onFinalResult,
  ]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition</div>;
  }

  const handleStart = (e) => {
    e.stopPropagation();
    resetTranscript();
    setFinalTranscript("");
    setFinalResultSent(false);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = (e) => {
    e.stopPropagation();
    SpeechRecognition.stopListening();
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={handleStart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={listening ? "blue" : "black"}
          className={`hover:scale-110 ${listening ? "animate-pulse" : ""}`}
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>

      {listening && (
        <div
          className="absolute bottom-0 right-0 z-10 flex h-full w-full flex-col items-center justify-center gap-20 bg-blue-200/90"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="animate-pulse">Listening...</p>
            <p>{finalTranscript}</p>
          </div>
          <button
            type="button"
            onClick={handleStop}
            className="rounded-lg bg-gray-200 px-4 py-2 text-xl font-semibold"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

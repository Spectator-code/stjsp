"use client";
import { useState, useEffect, useRef } from "react";

export default function GlobalLoader() {
  const [phase, setPhase] = useState("start"); // start, fade, done
  const fallbackTimer = useRef(null);

  useEffect(() => {
    // Hide scrollbar while loading screen is active
    document.body.style.overflow = "hidden";
    
    // Safety fallback in case video fails to play or gets stuck
    fallbackTimer.current = setTimeout(() => {
      setPhase("fade");
    }, 6000); 
    
    return () => { 
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      document.body.style.overflow = "unset";
    }
  }, []);

  useEffect(() => {
    if (phase === "fade") {
       // Wait for the fade out transition to finish before unmounting
       const doneTimer = setTimeout(() => {
         setPhase("done");
         document.body.style.overflow = "unset";
       }, 1000); 
       return () => clearTimeout(doneTimer);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 'fade' ? 'opacity-0' : 'opacity-100'}`}>
      <button 
        onClick={() => setPhase("fade")}
        className="absolute top-6 right-6 z-[100000] px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-md transition-colors border border-white/20 cursor-pointer"
      >
        Skip Intro
      </button>
      <video
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onEnded={() => setPhase("fade")}
        onError={() => setPhase("fade")}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      >
        <source src="/assets/video/loading.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

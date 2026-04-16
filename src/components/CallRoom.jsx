
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function CallRoom() {
  const { roomId } = useParams();          
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Zego SDK is loaded via <script> in index.html that  has been already been used
    const { ZegoUIKitPrebuilt } = window;
    if (!ZegoUIKitPrebuilt) {
      console.error("ZEGO SDK not loaded");
      return;
    }

   
    const appID = 192152014; 
    const serverSecret = "763664184756bec169955522c734c64f";

    const finalRoomId = roomId || "1234"; // fallback room ID
    const userID = "user_" + Date.now();
    const userName = "Guest_" + Math.floor(Math.random() * 10000);

    // this code will Generate test kit token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      finalRoomId,
      userID,
      userName
    );

    // Create Zego instance
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // code for Joining room
    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // or ZegoUIKitPrebuilt.OneONoneCall etc.
      },
      showPreJoinView: true,
    });

    // Cleanup on unmount
    return () => {
      zp.destroy();
    };
  }, [roomId]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}




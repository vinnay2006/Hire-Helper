import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
function CallRoom() {
  const {roomId} =useParams();
  const myMeeting=async(element)=>{
const appId=304742255;
const serverSecret="56689c62cfb8a9b817d3e5ad2785aa87";
const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serverSecret,roomId,Date.now().toString(),'vinay');
const zp=ZegoUIKitPrebuilt.create(kitToken)
zp.joinRoom({
  container:element,
  scenario:{
    mode:ZegoUIKitPrebuilt.VideoConference,
  },
})
  }
  return (
    <div className="call-room">
 
    <div ref={myMeeting}/>
    </div>
  )
}

export default CallRoom

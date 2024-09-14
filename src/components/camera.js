import React, { useEffect, useRef } from 'react';

export default function Camera() {
    const videoRef = useRef(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam: ", error);
            }
        };

        startVideo();
    }, []);

    return (
        <div className="fixed right-2 bottom-0 w-[20rem] h-[16rem] ">
            <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full rounded-xl border-2 border-black shadow-md"
            />
            {/* <div className="absolute bottom-2 right-4 w-10 h-10 ">
                <video
                    ref={webcamRef}
                    autoPlay
                    muted
                    className="w-[50px] h-[50px] object-contain border-2 border-white rounded"
                />
            </div> */}
        </div>
    );
}

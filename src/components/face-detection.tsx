import * as posedetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import React, { useEffect, useRef, useState } from 'react';

const FaceDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [detector, setDetector] = useState<posedetection.PoseDetector | null>(null);
  const [instruction, setInstruction] = useState<string>('Hãy đưa tay của bạn lên');

  useEffect(() => {
    const loadModelAndStartVideo = async () => {
      await tf.setBackend('webgl');
      await tf.ready();
      const model = posedetection.SupportedModels.BlazePose;
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'full',
      };
      const detector = await posedetection.createDetector(model, detectorConfig);
      setDetector(detector);

      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        setInterval(async () => {
          if (videoRef.current && canvasRef.current && detector) {
            const poses = await detector.estimatePoses(videoRef.current);
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              // poses.forEach((pose) => {
              //   pose.keypoints.forEach((keypoint) => {
              //     ctx.beginPath();
              //     ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
              //     ctx.fill();
              //   });
              // });

              // Check if the pose matches the "fight" pose (you can define your own criteria)
              if (poses.length > 0 && isFightPose(poses[0])) {
                setInstruction('Quá trình kiểm tra thành công');
                setTimeout(() => {
                  const searchParam = new URLSearchParams(window.location.search);
                  (window as any).location.href =
                    `${searchParam.get('redirect_uri')}&success=true&session_id=${Math.random()}`;
                }, 1000);
              }
              //    else {
              //     setInstruction("Hãy đưa tay của bạn lên");
              //   }
            }
          }
        }, 100);
      }
    };

    loadModelAndStartVideo();
  }, []);

  const isFightPose = (pose: posedetection.Pose) => {
    // Simple example: check if hands are above the shoulders
    const leftShoulder = pose.keypoints.find((k) => k.name === 'left_shoulder');
    const rightShoulder = pose.keypoints.find((k) => k.name === 'right_shoulder');
    const leftWrist = pose.keypoints.find((k) => k.name === 'left_wrist');
    const rightWrist = pose.keypoints.find((k) => k.name === 'right_wrist');

    if (leftShoulder && rightShoulder && leftWrist && rightWrist) {
      return leftWrist.y < leftShoulder.y && rightWrist.y < rightShoulder.y;
    }
    return false;
  };

  return (
    <>
      <h1 className="text-3xl mb-8">{instruction}</h1>
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          width="720"
          height="560"
          // style={{ display: "none" }}
        />
        <canvas
          ref={canvasRef}
          width="720"
          height="560"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </>
  );
};

export default FaceDetection;

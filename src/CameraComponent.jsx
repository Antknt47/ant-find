import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './CameraComponent.css';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  const videoConstraints = {
    facingMode: { exact: 'environment' }
  };

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const detectObjects = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      model
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);

      drawBoundingBoxes(predictions);
    }
  };

  const drawBoundingBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = 'red';
      ctx.font = '24px Arial';
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectObjects();
    }, 20);

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div id="cam">
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={videoConstraints}
        style={{ width: '100vw', height: 'auto' }}
      />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: '56px', left: 0, width: '100vw' }} />
    </div>
  );
};

export default CameraComponent;

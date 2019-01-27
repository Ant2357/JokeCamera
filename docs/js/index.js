
window.onload = () => {
  const video = document.getElementById("video");
  const media = navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });

  media.then(stream => {
    video.srcObject = stream;
  });

  const canvas = document.getElementById("canvas");
  video.addEventListener("loadedmetadata", e => {
    canvas.width = video.width;
    canvas.height = video.height;
    ctx = canvas.getContext("2d");

    setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
          const index = (i * canvas.width + j) * 4;
          data[index] = data[index] % 2 == 0 ? 0 : 255;
          data[index + 1] = data[index + 1] % 2 == 0 ? 0 : 255;
          data[index + 2] = data[index + 2] % 2 == 0 ? 0 : 255;
        }
      }

      ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
    }, 30);
  });
}
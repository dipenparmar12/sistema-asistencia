const imageUpload = document.getElementById('imageUpload')


Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/assets/js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/assets/js/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/js/models')
]).then(start)


async function start() {
  const container = document.getElementById('myImage')
  container.style.position = 'relative'
  // container.style.height = '500px'
  // container.style.width = '500px'
  // document.body.append(container)

  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7)
  let image
  let canvas
  document.body.append('Loaded')
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d =>
      faceMatcher.findBestMatch(d.descriptor)
    )
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString()
      })
      console.log(result._label)

      drawBox.draw(canvas)
    })
  })
}

function loadLabeledImages() {
  const labels = getLebles(students)
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 1; i++) {

        const img = await faceapi.fetchImage(
          `/uploads/${label}/${i}.jpg`
        )

        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor()
        descriptions.push(detections.descriptor)

      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}




function getLebles(students) {
  let labels = []
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    labels.push(student.enrollment_no + '')
  }
  return labels
}

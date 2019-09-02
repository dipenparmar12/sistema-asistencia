


$(document).ready(function () {
  showLoader()
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/js/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/js/models')
  ]).then(start)
  hideLoader()
});


async function start() {

  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7)
  document.getElementById('imageUpload').addEventListener('change', async () => {
    showLoader()
    await processImage(faceMatcher)
  })
}


async function processImage(faceMatcher) {
  let image
  let canvas
  if (image) image.remove()
  if (canvas) canvas.remove()

  image = await faceapi.bufferToImage(imageUpload.files[0])
  //// Main Uploaded Image
  image.setAttribute("id", "loadedImage")
  image.setAttribute("width", "450")
  image.setAttribute("height", "450")
  image.setAttribute("style", "position:absolute;")
  appendElement(image)


  //// Canvas Face LandMarked  Uploaded Image
  canvas = faceapi.createCanvasFromMedia(image)
  canvas.setAttribute("style", "position:absolute;")
  appendElement(canvas)

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

    //// Make Present Row
    $(`td[data-enrollment_no="${result._label}"]`).trigger('click')

    drawBox.draw(canvas)

    //// Show Attendance Table with
    $('#attendance_table').removeClass('d-none')
  })

  //// Remove Image Uploader (so use can reload page)
  $("#imageUpload").remove()
  /// Show Conform Button
  $('#attendance_conform_btn').trigger('click')
  hideLoader()
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


function appendElement(element) {
  document.getElementById('box').appendChild(element)
}
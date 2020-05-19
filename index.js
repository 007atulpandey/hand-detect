
navigator.getUserMedia= navigator.getUserMedia ||
navigator.webkitGetUserMedia || 
navigator.mozGetUserMedia || 
navigator.msGetUserMedia;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.59,    // confidence threshold for predictions.
  }

// fetch all element from the html page ...

const audio = document.querySelector('#audio'),
      video= document.querySelector('#video'),
      canvas = document.querySelector('#canvas');
    
const context = canvas.getContext('2d');
let model ;


handTrack.startVideo(video).
then(status=>{
    if(status){
        navigator.getUserMedia({video:{}},stream=>{
     video.srcObject =stream;
     runDetection();
    //  setInterval(runDetection,1000)
        },
    err=>console.log(err)
        );
    }
})

 ;
handTrack.load(modelParams).
then(lmodel=>{
    model=lmodel;
})

function runDetection(){
    model.detect(video).then(
        prediction=>{
            if(prediction.length>0){
                audio.play();
            }
            requestAnimationFrame(runDetection)
        }
    )
}


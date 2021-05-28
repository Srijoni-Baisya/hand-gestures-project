prediction = "";


Webcam.set({
    width:350,
    height:300,
    img_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version : ",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/CC-P9D0CB/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = prediction;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
    console.log(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(3);

        //prediction = results[0].label;

        //speak();
        
        if(results[0].label=="Best"){
            prediction="All the best";
            document.getElementById("update_emoji").innerHTML="&#128077;";
            speak();
        }
        if(results[0].label=="Call Me"){
            prediction="You can call me now";
            document.getElementById("update_emoji").innerHTML="&#129305;";
            speak();
        }
        if(results[0].label=="Victory"){
            prediction="A marvellous victory";
            document.getElementById("update_emoji").innerHTML="&#x270C;";
            speak();
        }
        if(results[0].label=="Amazing"){
            prediction="This is amazing";
            document.getElementById("update_emoji").innerHTML="&#x1F44C;";
            speak();
        }
        if(results[0].label=="Namaste"){
            prediction="Welcome";
            document.getElementById("update_emoji").innerHTML="&#x1F64F;";
            speak();
        }

       
      
    }
}
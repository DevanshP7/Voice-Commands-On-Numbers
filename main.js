draw_mango = '';
converted_number = '';
screen_width = 0;
screen_height = 0;
mango = '';
speak_data = '';
previous_result = '';

function preload(){
    mango = loadImage('https://cdn-icons-png.flaticon.com/512/765/765525.png');
}

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function(event){
    console.log(event);
    content = event.results[0][0].transcript;
    converted_number = Number(content);
    if(Number.isInteger(converted_number)){
        document.getElementById('status').innerHTML = `The Speech Has Been Recognised As ${converted_number}.`;
        draw_mango = 'set';
    }else{
        document.getElementById('status').innerHTML = `The Speech Has Not Recognised A Number.`;
    }
}

function start(){
    document.getElementById('status').innerHTML = 'Please Speak A Number.';
    recognition.start();
}

function setup(){
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width-20, screen_height-278);
}

function draw(){
    if(draw_mango == 'set' && converted_number != previous_result){
        clear();
        for(var i = 0; i < converted_number; i++){
            x = Math.floor(Math.random()*290);
            y = Math.floor(Math.random()*600);
            image(mango, x, y, 50, 50);
        }
        document.getElementById('status').innerHTML = `${converted_number} Mango/Mangoes Drawn.`;
        speak_data = `${converted_number} Mango Drawn.`;
        previous_result = converted_number;
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    speak_data = '';
}
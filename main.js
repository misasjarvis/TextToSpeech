//init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textform = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  //Loop through voices and create an option for each one
  voices.forEach(voice => {
    //Create option Elements
    const option = document.createElement('option');
    //Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    //Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
  // Check if speaking
  if(synth.speaking) {
    console.error('Wait till I complete speaking.');
    return;
  }
  if(textInput.value !== ''){
    //Get speak TextToSpeech
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
    }

    //Speak error
    speakText.onerror = e => {
      console.error('Something went Wrong');
    }

    //Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //Loop through voices
    voices.forEach(voice =>{
      if(voice.name === selectedVoice)
      {
        speakText.voice = voice;
      }
    });

    //Set Pitch and Rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
    }
};

//Event Listeners

//Text form submit
textform.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice select change
voiceSelect.addEventListener('change', e => speak());

let startButton = document.getElementById("music");


  const buttonClickSound = new Howl({
    src: ['XQGF3US-the-video-game.mp3'],

    volume: 0.5,
    loop: true
  });

  let isMusicPlaying = true;

  startButton.addEventListener("click", function(){
    if(isMusicPlaying){
      buttonClickSound.play();
      startButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      isMusicPlaying = false;
    } else {
      buttonClickSound.pause();
      startButton.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
      isMusicPlaying = true;
    }
    
  });



  

let selectedValue = localStorage.getItem('selectedValue');
let dificultResult = localStorage.getItem('dificultResult');
let inpfieldvalu = localStorage.getItem('inpfieldvalu');

let question_cont = document.getElementById("question_cont");

let grap_title_ques = document.getElementById("question-titled");
let title_question = "";
let choose = "";
let inc = 0;
let grap_total_number  = document.getElementById("total-number");
let grap_current_number = document.getElementById("current-number");
let correct_answes = 0;
let total_number = 0;
let goBckbtn = document.getElementById("goBack");
let btnsbr = document.getElementById("submit-individual-question");
let waitdude = document.querySelector(".wait");
let progresbar = document.getElementById("progress-bar-percentage");
let current_num = 0;





// Νέο URL του API
const newApiUrl = `https://opentdb.com/api.php?amount=${inpfieldvalu}&category=${selectedValue}&difficulty=${dificultResult}&type=multiple`;
 

  

 function loadQuestion(){
   


// Κάνε κλήση στο νέο API χρησιμοποιώντας τη μέθοδο fetch()
fetch(newApiUrl)
  .then(response => {
    // Ελέγχει αν η απάντηση είναι επιτυχής (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Επιστρέφει το JSON της απάντησης
    return response.json();
  })
  .then(data => {
    // Κάνε κάτι με τα νέα δεδομένα που λάβαμε από το νέο API

         if(inc > data.results.length -1){
          endofgame(correct_answes,total_number);
           inc = 0;
         }

       


           console.log(inc)
          total_number = data.results.length;
         grap_total_number.innerText = total_number;
   
          current_num = 1 + inc;
         grap_current_number.innerText = current_num;
         
         title_question = data.results[inc].question;

         
        

         grap_title_ques.innerText =  he.decode(title_question);
        
         let newItem = data.results[inc].correct_answer;
         const randomIndex = Math.floor(Math.random() * data.results[inc].incorrect_answers.length);

// Προσθήκη του στοιχείου 'x' στον πίνακα στον τυχαίο δείκτη
data.results[inc].incorrect_answers.splice(randomIndex, 0, newItem);
 
         data.results[inc].incorrect_answers.forEach(element => {
              
          choose += '<span class="option" id = "option">' + he.decode(element) + '</span>';
          
         });
  
         question_cont.innerHTML = choose;
     
         let whatchooseuser = document.querySelectorAll(".option");
         
        let selectoptionresult = ""; 
        whatchooseuser.forEach(option => {
          
            option.addEventListener("click",function(){
              
              if (option.classList.contains("blue-background")) {
                option.classList.remove("blue-background");
                option.style.background = "#151B24";
                selectoptionresult = "";
                option.classList.remove("clicked");
            } else {
                option.classList.add("blue-background");
                option.style.background = "#004CFF";
                option.classList.add("clicked");
                selectoptionresult = option.textContent;
                
            }
            if(data.results[inc].correct_answer === selectoptionresult){
              correct_answes++;
             }else {
              current_num - 1;
             }
            console.log(selectoptionresult)
            });     
  });


  
    
  })
  .catch(error => {
    // Χειρίζεται τυχόν σφάλματα που προέκυψαν κατά την κλήση του νέου API
    console.error('There was a problem with the fetch operation:', error);

  });
 }

 
 
  loadQuestion();
  disableButton()
 
 document.getElementById("submit-individual-question").addEventListener("click", function () {
  // Αύξηση του μετρητή
  inc++;
  title_question = "";
  choose = "";
  // Κλήση της συνάρτησης για να φορτώσει τη νέα ερώτηση
  loadQuestion();
  disableButton()
  calculatePercentage(current_num,total_number)
})


 function endofgame(correntarespones,total_answers){
   
  Swal.fire({
    title: "Correct!",
    text: correntarespones + "/" + total_answers,
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    confirmButtonText: "Play again",
    imageAlt: "Custom image",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      progresbar.style.width = "0%";
    }
  });
 }
     


goBckbtn.addEventListener("click",function(){
  window.location.replace("index.html");
});




function disableButton() {
  // Κάντε το κουμπί ανενεργό και αλλάξτε τον κέρσορα
  btnsbr.disabled = true;
  waitdude.style.display = "inline";
  waitdude.style.opacity = "1";
  btnsbr.style.cursor = "no-drop";

  // Κάντε το κουμπί ενεργό ξανά μετά από 5 δευτερόλεπτα
  setTimeout(function() {
    btnsbr.disabled = false;
    waitdude.style.opacity = "0";
    btnsbr.style.cursor = "pointer";
  }, 5000);

}









function calculatePercentage(current, total) {
  let result =  (current / total) * 100;
   
  if(result > 100){
    result = 0;
  }else {
    progresbar.style.width =  result + "%";
  }
          
}
























 
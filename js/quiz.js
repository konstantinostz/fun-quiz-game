// URL του API 
let apiUrl = 'https://opentdb.com/api_category.php';

// Κάνει κλήση στο API χρησιμοποιώντας τη μέθοδο fetch()
fetch(apiUrl)
  .then(response => {
    // Ελέγχει αν η απάντηση είναι επιτυχής (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Επιστρέφει το JSON της απάντησης
    return response.json();
  })
  .then(data => {

    let select = document.getElementById("category");
    let option = "";
  
    data.trivia_categories.forEach(element => {
         
    option += "<option value='" + element.id + "'>" + element.name + "</option>";
    }); 
  
     select.innerHTML = option;

     
  })
  .catch(error => {
    // Χειρίζεται τυχόν σφάλματα που προέκυψαν κατά την κλήση του API
    console.error('There was a problem with the fetch operation:', error);
  });

  let selectedValue = "";

// gia tis katigories kani select 
  document.getElementById("category").addEventListener("change", function() {
    // Λαμβάνουμε το επιλεγμένο στοιχείο
    let selectedOption = this.options[this.selectedIndex];
  
    // Λαμβάνουμε την τιμή του επιλεγμένου στοιχείου
    selectedValue  = selectedOption.value;

    console.log(selectedValue);//ektipono to ID!
  });

  



  let dificultResult = "";

  document.getElementById('difiicultly').addEventListener('change', function() {
     dificultResult = this.value;
 
     console.log(dificultResult)//ektipono tin disklia!
  });
    

  document.getElementById("startGame").addEventListener("click", function () {
    // Λαμβάνουμε την τρέχουσα τιμή του πεδίου εισαγωγής
    let inpfieldvalu = document.getElementById("numberOfQuesions").value;
  
    // Καλούμε τη συνάρτηση επικύρωσης
    if (!validateNumberInput() || !diffresult()) {
      // Αν το validation αποτύχει, δεν κάνουμε το redirect
      return;
    }
  
    // Συνεχίζουμε με τα υπόλοιπα
    if (selectedValue === "") {
      selectedValue = "9";
    }
  
    localStorage.setItem("selectedValue", selectedValue);
    localStorage.setItem("dificultResult", dificultResult);
    localStorage.setItem("inpfieldvalu", inpfieldvalu);


    location.replace("quizaenv.html");
  });
  
  function validateNumberInput() {
    // Λαμβάνουμε την τρέχουσα τιμή του πεδίου εισαγωγής
    let inpfieldvalu = document.getElementById("numberOfQuesions").value;
  
    // Εκτελούμε τον έλεγχο εγκυρότητας
    if (inpfieldvalu > 50 || inpfieldvalu < 1 || isNaN(inpfieldvalu)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "must contain a number from 1 to 50!",
      });
      return false; // Επιστρέφουμε false αν το validation αποτύχει
    }
  
    // Επιστρέφουμε true αν το validation είναι επιτυχές
    return true;
  }
  
  function diffresult(){
    if(dificultResult === ""){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select difficulty!",
      });
   
       return false;
    }
    return true;
  }
    









 



  
  

   


  
let qcount;
let typequestions=document.querySelector(".type-questions")
let quizArea = document.querySelector(".quiz-area");
let count = document.querySelector(".count span");
let submitButton = document.querySelector(".submit-answer");
let resultDiv = document.querySelector(".result");
let numerOfq=document.querySelector(".nf-question")
let userAnswers = []; // To store user's answers
let correctAnswers = []; // To store correct answers from JSON
let timerdisplay=document.querySelector(".countdown");
let timeLimit=15*60;
let countdown;
let popup=document.querySelector(".popup");
let yesbtn=document.getElementById("yes-btn");
let nobtn=document.getElementById("no-btn");
let close=document.querySelector(".close")
function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "html_question.json", true);
    myRequest.send();
    myRequest.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            typequestions.innerHTML=questions.quizTitle;
            qcount = questions.questions.length;
            count.innerHTML = qcount;
            numerOfq.innerHTML=qcount;
            // createSpans(qcount);
            createQuestions(questions.questions);
            startTimer(timeLimit);
        }
    });
}

getQuestions();

function createSpans(count) {
    let spans = document.querySelector(".spans");
    for (let i = 0; i < count; i++) {
        let span = document.createElement("span");
        spans.appendChild(span);
    }
}

function createQuestions(questions) {
    questions.forEach((q, index) => {
        // Store correct answer
        correctAnswers.push(q.correctAnswer);
       
        
        let title = document.createElement("h2");
        let titlenumer=document.createElement("span");
      
        
        title.textContent =`${index + 1}- ${q.question}`;
        quizArea.appendChild(title);

        // Create answer options
        q.options.forEach((option, i) => {
            let answerArea = document.createElement("div");
            answerArea.className = "answer-area";

            let answer = document.createElement("div");
            answer.className = "answer";

            let input = document.createElement("input");
            input.type = "radio";
            input.name = `question_${index}`;// for one question have one name for example question one have question_1 and qustion two have question_2 
            input.id = `answer_${index}_${i}`; // for any question have one id for it label
            input.dataset.answer = option;  // it very important for stoy value of input

            input.addEventListener("change", function () {
                userAnswers[index] = this.dataset.answer; // Track user answer
                console.log(userAnswers);
            });

            let label = document.createElement("label");
            label.htmlFor = `answer_${index}_${i}`;
            label.textContent = option;

            answer.appendChild(input);
            answer.appendChild(label);
            answerArea.appendChild(answer);
            quizArea.appendChild(answerArea);
        });
    });
}

function getresult(){
   clearInterval(countdown)
   popup.classList.remove("d-none")
   let userResult=document.querySelector(".user-result")
   let result=0;
    for(let i=0;i<userAnswers.length;i++){
        if(userAnswers[i]===correctAnswers[i]){
            result++
        }
    }
    userResult.innerHTML=result
    
}
submitButton.addEventListener("click",getresult)

function startTimer(duration){
let timer=duration;
let minutes,secends;
countdown=setInterval(()=>{
    minutes=Math.floor(timer / 60);
    secends=timer % 60;
    minutes=minutes < 10 ? "0"+minutes:minutes;
    secends=secends < 10 ? "0"+secends:secends;
    timerdisplay.innerHTML=`${minutes}:${secends}`
    timer-=1
    if(timer < 0){
        clearInterval(countdown)
        submitButton.click(); 
    }
},1000)
}

//remove pop up after submit
nobtn.addEventListener("click",finsh)
function finsh(){
    popup.classList.add("d-none")
    window.location.reload(); 
}
close.addEventListener("click",finsh)
//show result when click the yes button
yesbtn.addEventListener("click",function(){
    resultDiv.classList.remove('d-none')
})
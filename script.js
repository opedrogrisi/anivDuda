const questions = [
    {
        question: "Qual é a sua maior qualidade?",
        answers: [
            { text: "Carinhosa", correct: false },
            { text: "Meiga", correct: false },
            { text: "Linda e Gostosa", correct: false },
            { text: "Todas as alternativas.", correct: true },
        ],
    },
    {
        question: "O que me fez me apaixonar por você?",
        answers: [
            { text: "Sua dedicação", correct: false },
            { text: "Seu jeito de ser", correct: false },
            { text: "Sua beleza", correct: false },
            { text: "Todas as alternativas.", correct: true },
        ],
    },
    {
        question: "O que você mais gosta de fazer comigo?",
        answers: [  
            { text: "Jantar Romântico", correct: false },
            { text: "Um show juntos", correct: false },
            { text: "Fazenda", correct: false },
            { text: "Todas as alternativas.", correct: true },
        ],
    },
    {
        question: "Quantos filhos teremos?",
        answers: [
            { text: "12", correct: false },
            { text: "25", correct: false },
            { text: "3", correct: true },
            { text: "Quantos vierem e fé", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Próxima";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    let selectedButton = event.target;
    let isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextBtn.innerHTML = "Recomeçar";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

(function IIFE() {
    const list = [
      {
        id: 1,
        url:
        "/audio/Justin Timberlake - Mirrors (Official Audio).mp3",
        
        author: "Justin Timberlake",
        title: "Mirrors",
        cover:
          "/assets/MV5BN2E0YjhmMDYtOTkzOC00YTI5LWI5MGMtOThmODJhYTZmMjM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
      },
    ];
     
  
    let currentId = 0;
    let isPlaying = false;
    let isLoop = true;
    let isShuffle = false;
    let currentAudio = "music1";
    let timer = null;
    let loopOne = false;
  
    const currentTimeIndicator = document.querySelector(".music-time__current");
    const leftTimeIndicator = document.querySelector(".music-time__last");
    const progressBar = document.getElementById("length");
    const playBtn = document.querySelector(".play");
    const cover = document.querySelector(".cover");
    const title = document.querySelector(".music-player__title");
    const author = document.querySelector(".music-player__author");
  
    const loopBtn = document.getElementById("loop");
    const shuffleBtn = document.getElementById("shuffle");
    const forwardBtn = document.getElementById("forward");
    const backwardBtn = document.getElementById("backward");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const progressDiv = document.getElementById("progress");
  
    function play(e) {
      if (!isPlaying) {
        // console.log('play');
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/pause.svg";
        e.target.alt = "Pause";
        isPlaying = true;
        document.getElementById(currentAudio).play();
        showTime();
      } else {
        // console.log('pause');
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
        e.target.alt = "Play";
        document.getElementById(currentAudio).pause();
        isPlaying = false;
        clearInterval(timer);
      }
    }
  
    function changeBar() {
      const audio = document.getElementById(currentAudio);
      const percentage = (audio.currentTime / audio.duration).toFixed(3);
      progressBar.style.transition = "";
      // console.log(audio.currentTime);
  
      //set current time
      const minute = Math.floor(audio.currentTime / 60);
      const second = Math.floor(audio.currentTime % 60);
      const leftTime = audio.duration - audio.currentTime;
      currentTimeIndicator.innerHTML =
        ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);
  
      //set left time
      const leftMinute = Math.floor(leftTime / 60);
      const leftSecond = Math.floor(leftTime % 60);
  
      leftTimeIndicator.innerHTML =
        ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
  
      //set time bar
      progressBar.style.width = percentage * 100 + "%";
    }
  
    function showTime() {
      timer = setInterval(() => changeBar(), 500);
    }
  
    function nextMusic(mode) {
      playBtn.src =
        "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
      playBtn.alt = "Play";
      document.getElementById(currentAudio).pause();
      isPlaying = false;
      clearInterval(timer);
  
      if (mode === "next") {
        currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
        init();
      } else {
        currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
        init();
      }
    }
  
    function shuffle(e) {
      isShuffle = !isShuffle;
      if (isShuffle) {
        e.target.parentNode.classList.add("is-loop");
      } else {
        e.target.parentNode.classList.remove("is-loop");
      }
    }
  
    function backward() {
      const audio = document.getElementById(currentAudio);
      audio.currentTime -= 5;
      if (!isPlaying) {
        changeBar();
      }
    }
  
    function forward() {
      const audio = document.getElementById(currentAudio);
      audio.currentTime += 5;
      if (!isPlaying) {
        changeBar();
      }
    }
  
    function stopMusic() {
      playBtn.src =
        "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
      playBtn.alt = "Play";
      isPlaying = false;
    }
  
    function goToNextMusic() {
      let newId = currentId;
      while (isShuffle && !loopOne && newId === currentId) {
        newId = Math.floor(Math.random() * Math.floor(list.length - 1));
      }
  
      if (!isShuffle && !loopOne) {
        currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
      }
      if (!isShuffle && loopOne) {
        currentId = currentId;
      }
  
      if (isShuffle) {
        currentId = newId;
      }
      init();
      document.getElementById(currentAudio).play();
    }
  
    function loop(e) {
      const audio = document.getElementById(currentAudio);
  
      if (!isLoop && !loopOne) {
        isLoop = true;
        loopOne = false;
        // console.log('is loop');
        e.target.parentNode.classList.add("is-loop");
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
        audio.loop = false;
        audio.onended = e => goToNextMusic();
        console.log(isLoop, loopOne);
      } else if (isLoop && !loopOne) {
        // console.log('is loop one');
        isLoop = true;
        loopOne = true;
        e.target.parentNode.classList.add("is-loop");
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loopone.svg";
        audio.loop = true;
        audio.onended = e => goToNextMusic();
        console.log(isLoop, loopOne);
      } else {
        // console.log('not loop');
        isLoop = false;
        loopOne = false;
        e.target.parentNode.classList.remove("is-loop");
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
        audio.loop = false;
        audio.onended = e => stopMusic();
        console.log(isLoop, loopOne);
      }
    }
  
    function progress(e) {
      const audio = document.getElementById(currentAudio);
      //get current position and minus progress bar's x position to get current position in progress bar
      const pos =
        (e.pageX - progressDiv.getClientRects()[0].x) /
        progressDiv.getClientRects()[0].width;
      audio.currentTime = pos * audio.duration;
      changeBar();
    }
  
    function init() {
      //reset music duration and setup audio
      const audio =
        document.getElementById(currentAudio) === null
          ? new Audio()
          : document.getElementById(currentAudio);
      audio.src = list[currentId].url;
      audio.id = currentAudio;
      document.getElementById(currentAudio) === null
        ? document.body.appendChild(audio)
        : "";
  
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      document.getElementById(currentAudio).currentTime = 0;
  
      title.innerHTML = list[currentId].title;
      author.innerHTML = list[currentId].author;
      cover.src = list[currentId].cover;
  
      //set current time
      audio.addEventListener("loadedmetadata", function() {
        const leftMinute = Math.floor(audio.duration / 60);
        const leftSecond = Math.floor(audio.duration % 60);
        currentTimeIndicator.innerHTML = "00:00";
        leftTimeIndicator.innerHTML =
          ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
        progressBar.style.transition = "";
      });
  
      //set loop
      document.getElementById(currentAudio).onended = e => goToNextMusic(e);
    }
  
    playBtn.addEventListener("click", play);
    loopBtn.addEventListener("click", loop);
  
    shuffleBtn.addEventListener("click", shuffle);
    forwardBtn.addEventListener("click", forward);
    backwardBtn.addEventListener("click", backward);
  
    prevBtn.addEventListener("click", e => nextMusic("prev"));
    nextBtn.addEventListener("click", e => nextMusic("next"));
    progressDiv.addEventListener("click", e => {
      progress(e);
    });
  
    init();
  })();
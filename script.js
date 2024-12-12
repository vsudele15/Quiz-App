  let timer;
  let timeLeft = 30;

const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2
    },
    {
      question: "What is 5 + 3?",
      options: ["5", "8", "9", "10"],
      correct: 1
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');
  
  
  function loadQuestion() {
    startTimer();

    const current = questions[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = '';

    nextBtn.classList.add('hidden');
    current.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => selectAnswer(index)); // Allow re-selection
        li.classList.remove('selected'); // Ensure no previous selection
        optionsEl.appendChild(li);
    });
  }
  
  let selectedIndex = -1;
  function selectAnswer(index) {
    const options = document.querySelectorAll('#options li');
    options.forEach(option => option.classList.remove('selected'));

    // Highlight the selected option
    options[index].classList.add('selected');
    selectedIndex = index;
    nextBtn.classList.remove('hidden');
  }
  
  function showResult() {
    clearInterval(timer);
    hideTimer()
    questionEl.textContent = 'Quiz Completed!';
    optionsEl.innerHTML = '';
    nextBtn.classList.add('hidden');
    resultEl.textContent = `You scored ${score} out of ${questions.length}!`;
    resultEl.classList.remove('hidden');

  }
  
  nextBtn.addEventListener('click', () => {
    // Check the selected answer and update the score
    const options = document.querySelectorAll('#options li');
    const selectedOption = Array.from(options).find(option =>
      option.classList.contains('selected')
    );
  
    // Update the score if the selected option is correct
    if (selectedOption) {
      const selectedIndex = Array.from(options).indexOf(selectedOption);
      if (selectedIndex === questions[currentQuestion].correct) {
        score++;
      }
    }
  
    // Move to the next question or show the result
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  // Timer Implementation
  
  function startTimer(){
    // Display the starting time in the timer element
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = timeLeft;

    clearInterval(timer);

    timer = setInterval(function(){
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer
        nextQuestion();
      }
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function nextQuestion() {
      // Reset the timer for the next question
    timeLeft = 30;
    
    const current = questions[currentQuestion];

    // Highlight the correct answer and the user's selection
    const options = document.querySelectorAll('#options li');
    
    // Check if the user's answer was correct
    if (selectedIndex === current.correct) {
      options[selectedIndex].classList.add('correct'); // Highlight the correct answer in green
    } else {
      options[selectedIndex].classList.add('incorrect'); // Highlight the selected wrong answer in red
      options[current.correct].classList.add('correct'); // Highlight the correct answer in green
    }

    // Move to the next question or show results if it's the last one
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(loadNextQuestion, 1000); // Load the next question after 1 second delay (for feedback visibility)
    } else {
      showResults(); // Show results when quiz is complete
    }
  }
  
  function hideTimer() {
    const timerContainer = document.getElementById('timer-container');
    timerContainer.style.display = 'none'; // Hides the timer
  }
  

  // Load the first question
  loadQuestion();



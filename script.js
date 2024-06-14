document.addEventListener('DOMContentLoaded', () => {
    const questions = {
        1: { text: 'hi Linda welcome :) ', options: { 'start': 2 } },
        2: { text: 'Would you prefer to stay in or go out?', options: { 'stay in': 3, 'go out': 4 } },
        3: { text: 'What type of indoor activity?', options: { 'build legos': 5, 'mini canvas painting': 5,'board games': 5 } },
        4: { text: 'What type of outdoor activity?', options: { 'scenic walk/hike': 9, 'rent and bike pgh coast + bridges': 9,'suprise me': 9 } },
        5: { text: 'Lose in a game of pool?', options: { 'yes': 6, 'most definitely': 6 } },
        6: { text: 'What for dinner?', options: { 'cook together': 7, 'order in': 7 } },
        7: { text: 'Post dinner venture', options: { 'sunset stroll': 8, 'dessert trip': 8,'both': 8 } },
        8: { text: 'Watch a movie?', options: { 'in theaters': 13, 'stay in movie': 13,'naw': 13 } },
        9: { text: 'Get acai bowls?', options: { 'yes': 10, 'yea': 10 } },
        10: { text: "What's next?", options: { 'im hungry lets eat': 12, 'more fun!': 11 } },
        11: { text: 'How about bowling?', options: { 'ok': 12, 'no thanks': 12 } },
        12: { text: 'Dinner plans', options: { 'cook together': 13, 'go out to eat': 13 } },
        13: { text: 'Thank you for completing, please leave feedback', options: { 'ui was trash': 'final', 'not enough effort': 'final','ehh so-so': 'final' } }
    };

    const decisions = [];
    let currentQuestion = 1;

    const questionContainer = document.getElementById('question-container');
    const buttonsContainer = document.getElementById('buttons-container');
    const progressBar = document.getElementById('progress-bar');
    const decisionTree = document.getElementById('decision-tree');

    function updateProgress() {
        if (currentQuestion === 'final') {
            progressBar.value = 100;
        } else {
            progressBar.value = (Object.keys(decisions).length / (Object.keys(questions).length - 1)) * 100;
        }
    }

    function renderQuestion() {
        if (currentQuestion === 'final') {
            questionContainer.textContent = 'Well Done!';
            buttonsContainer.innerHTML = '';
        } else {
            const question = questions[currentQuestion];
            questionContainer.textContent = question.text;
            buttonsContainer.innerHTML = '';
            for (const [option, nextQuestion] of Object.entries(question.options)) {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => handleAnswer(option, nextQuestion));
                buttonsContainer.appendChild(button);
            }
        }
        updateProgress();
    }

    function handleAnswer(answer, nextQuestion) {
        decisions.push({ question: questions[currentQuestion].text, answer });
        currentQuestion = nextQuestion;
        renderDecisionTree();
        renderQuestion();
    }

    function renderDecisionTree() {
        decisionTree.innerHTML = decisions.map(d => `<p>${d.question}: ${d.answer}</p>`).join('');
    }

    renderQuestion();
});

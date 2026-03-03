// Python Mastery Quiz Logic - Enhanced & Gamified

document.addEventListener('DOMContentLoaded', () => {
    const quizContainers = document.querySelectorAll('.quiz-section');

    quizContainers.forEach(container => {
        const options = container.querySelectorAll('.quiz-opt');
        const submitBtn = container.querySelector('.quiz-submit-btn');
        const resultBoard = container.querySelector('.quiz-result');
        const lessonId = container.dataset.lesson;
        const quizItems = container.querySelectorAll('.quiz-item');

        // Create Progress Bar if it doesn't exist
        if (!container.querySelector('.quiz-progress-container')) {
            const progress = document.createElement('div');
            progress.className = 'quiz-progress-container';
            progress.innerHTML = '<div class="quiz-progress-fill"></div>';
            container.querySelector('.quiz-header').after(progress);
        }

        const progressFill = container.querySelector('.quiz-progress-fill');

        function updateProgress() {
            const answered = Array.from(quizItems).filter(item => item.querySelector('.quiz-opt.selected')).length;
            const percentage = (answered / quizItems.length) * 100;
            progressFill.style.width = `${percentage}%`;
        }

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const item = opt.closest('.quiz-item');
                const siblings = item.querySelectorAll('.quiz-opt');
                siblings.forEach(s => s.classList.remove('selected'));
                opt.classList.add('selected');
                updateProgress();
            });
        });

        submitBtn.addEventListener('click', () => {
            let score = 0;
            let total = quizItems.length;
            let allAnswered = true;

            quizItems.forEach(item => {
                const selected = item.querySelector('.quiz-opt.selected');
                const correctAnswer = item.dataset.answer;

                if (!selected) {
                    allAnswered = false;
                    return;
                }

                const opts = item.querySelectorAll('.quiz-opt');
                opts.forEach(o => {
                    o.classList.remove('selected');
                    if (o.dataset.value === correctAnswer) {
                        o.classList.add('correct');
                    } else if (o === selected && o.dataset.value !== correctAnswer) {
                        o.classList.add('wrong');
                    }
                });

                if (selected.dataset.value === correctAnswer) {
                    score++;
                    item.classList.add('correct-anim');
                }

                // Show Explanation if it exists
                const expl = item.querySelector('.quiz-explanation');
                if (expl) expl.classList.add('show');
            });

            if (!allAnswered) {
                alert("Ellaa kelvikkum bathil sollu (Please answer all questions)!");
                return;
            }

            // Results UI
            let resultHTML = `
                <div class="result-content">
                    <h3>Quiz Finished!</h3>
                    <p class="score-num">${score} / ${total}</p>
                    <p>${score === total ? 'Brilliant! Appadiyaey ellathaiyum correct-a sollita!' : 'Nalla try! Innum konjam practice pannu.'}</p>
                </div>
            `;

            if (score === total) {
                resultHTML += `
                    <div class="mastery-badge show">
                        <span class="badge-icon">🏆</span>
                        <div class="badge-title">Lesson Mastered!</div>
                        <p>You have successfully completed this concept with flying colors.</p>
                    </div>
                `;
            }

            resultBoard.innerHTML = resultHTML;
            resultBoard.classList.add('show');
            submitBtn.style.display = 'none';

            localStorage.setItem(`quiz_score_${lessonId}`, score);
        });
    });

    // W3Schools style Inline Concept Checks
    const conceptChecks = document.querySelectorAll('.concept-check');
    conceptChecks.forEach(cc => {
        const btn = cc.querySelector('.cc-btn');
        const feedback = cc.querySelector('.cc-fb');
        const inputs = cc.querySelectorAll('.cc-input');

        btn.addEventListener('click', () => {
            let allCorrect = true;
            inputs.forEach(input => {
                const expected = input.dataset.answer;
                const actual = input.value.trim();

                if (actual.toLowerCase() === expected.toLowerCase()) {
                    input.style.borderColor = '#50fa7b';
                } else {
                    input.style.borderColor = '#ff7b72';
                    allCorrect = false;
                }
            });

            feedback.classList.remove('correct', 'wrong');
            if (allCorrect) {
                feedback.textContent = "Sariyaana bathil! (Correct Answer!)";
                feedback.classList.add('correct');
            } else {
                feedback.textContent = "Thavaaraana bathil. Try again! (Wrong answer)";
                feedback.classList.add('wrong');
            }
        });
    });

    // 3D Mascot Injection & Logic
    const localMascotPath = "/C:/Users/Sanjay/.gemini/antigravity/brain/febdaac1-9451-4632-a0d2-5ff685744aef/python_mascot_3d_anime_1772479996296.png";

    const mascotHTML = `
        <div class="mascot-container">
            <div class="speech-bubble" id="mascot-speech">Python mastery-ku ready-ah?</div>
            <img src="${localMascotPath}" class="mascot-img" id="mascot-img" alt="Python Mascot">
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', mascotHTML);

    const mascotSpeech = document.getElementById('mascot-speech');
    const mascotImg = document.getElementById('mascot-img');

    const messages = [
        "Unnala mudiyum! (You can do it!)",
        "Python romba easy thaan, kavalai padaatha!",
        "Intha logic purinjitha? Super!",
        "Oru break yeduthuko, apparam padikalam.",
        "Quiz-la score panna ready-ah?",
        "Code ezhuthu, magic pannu!"
    ];

    function showMessage() {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        mascotSpeech.textContent = msg;
        mascotSpeech.classList.add('show');
        setTimeout(() => {
            mascotSpeech.classList.remove('show');
        }, 4000);
    }

    // Show message every 15 seconds
    setInterval(showMessage, 15000);

    // Show message on click
    mascotImg.addEventListener('click', showMessage);

    // Initial message
    setTimeout(showMessage, 2000);
});

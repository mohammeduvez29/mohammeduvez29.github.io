document.addEventListener('DOMContentLoaded', function() {
    // Matrix effect
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const arabic = 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'

        const alphabet = katakana + latin + nums + arabic;

        const fontSize = 16;
        const columns = canvas.width/fontSize;

        const rainDrops = [];

        for( let x = 0; x < columns; x++ ) {
            rainDrops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
                
                if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        setInterval(draw, 30);
    }

    // Typing effect
    const typingText = document.getElementById("typing-text");
    if (typingText) {
        const textToType = "Hi, I'm MOHAMMED UVEZ KHAN";
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                typingText.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Load skills
    function loadSkills() {
        const skills = [
            { name: "Python", logo: "Images/python.png" },
            { name: "Java", logo: "Images/java.png" },
            { name: "C", logo: "Images/c.png" },
            { name: "Flask", logo: "Images/flask.png" },
            { name: "GitHub", logo: "Images/github.png" },
            { name: "VS Code", logo: "Images/vscode.png" },
            { name: "OpenCV", logo: "Images/opencv.png" },
            { name: "HTML", logo: "Images/html.png" },
            { name: "CSS", logo: "Images/css.png" },
            { name: "JavaScript", logo: "Images/js.png" }
        ];

        const container = document.querySelector('.skills-grid');
        if (container) {
            skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.classList.add('skill');
                skillElement.innerHTML = `
                    <img src="${skill.logo}" alt="${skill.name}" class="skill-logo">
                    <span class="skill-name">${skill.name}</span>
                `;
                container.appendChild(skillElement);
            });
        }
    }

    loadSkills();
    
    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Disable submit button and show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Send form data to server
            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Clear the form
                contactForm.reset();
                // Show a success message
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.style.color = 'green';
            })
            .catch((error) => {
                console.error('Error:', error);
                formStatus.textContent = 'There was an error submitting your message. Please try again later.';
                formStatus.style.color = 'red';
            })
            .finally(() => {
                // Re-enable submit button and restore original text
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
});


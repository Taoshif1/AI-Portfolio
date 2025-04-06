
const myFullName = "Gazi Taoshif";
const myDescription = "Hey there! I'm Taoshif, a passionate and self-driven tech enthusiast who grew up in the heart of Dhaka, surrounded by fancy places that sparked my love for technology early on. I’ve always been curious about how things work—especially in the digital world—and that curiosity turned into a full-blown passion for Computer Science & Engineering. I studied at the best institutions, and now I’m pursuing my B.Sc. in CSE at East West University. Even though university taught me C, Java, Discrete Math, and Data Structures, my real journey began outside the classroom. I’ve taught myself HTML, CSS, Python, C++, Bootstrap 5, Git & GitHub, JavaScript, React, TypeScript, SASS, PHP, Networking, and VS Code—all fueled by my unstoppable hunger to grow. Big shoutout to my mentor Anisul Islam and countless creators on YouTube and tech blogs who guided me virtually! Whether it’s Eid day or the weekend—I code. I don’t just study CSE, I live it. I'm not sticking to one path; I’m exploring all CSE fields—from frontend to backend, networking to automation—so I can build a strong, multi-dimensional skill set for the future. Outside of tech, I love traveling and exploring new places, solving challenging math problems, playing chess, working out at the gym, cooking from time to time, and diving into books that expand my mindset.  I believe in consistent growth, and I'm building my career not just as a coder, but as a future tech entrepreneur. My mission is to create solutions that matter, build products that last, and someday run a company that helps millions.";
const GEMINI_API_KEY = "AIzaSyBMwwE6wZ7H2EoA6eR7pF0lid2YmAzPIeY"; // Replace with your actual API key

const chatBubble = document.querySelector('.chat-bubble');
const chatOverlay = document.querySelector('.chat-overlay');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');
const chatMessages = document.querySelector('.chat-messages');
const themeToggle = document.querySelector('.theme-toggle');
const chatExit = document.querySelector('.chat-exit');
const contactForm = document.getElementById('contactForm');
const clearFormButton = document.getElementById('clearForm');
const backToTopButton = document.querySelector('.back-to-top');

chatBubble.addEventListener('click', () => {
    chatOverlay.style.display = 'flex';
    if (!chatMessages.querySelector('.message')) {
        const initialMessage = document.createElement('div');
        initialMessage.className = 'message received';
        initialMessage.textContent = `Hi, I am ${myFullName}. What do you want to know about me?`;
        chatMessages.appendChild(initialMessage);
    }
});

document.addEventListener('click', (e) => {
    if (!chatOverlay.contains(e.target) && e.target !== chatBubble && chatOverlay.style.display === 'flex') {
        chatOverlay.style.display = 'none';
    }
});

chatExit.addEventListener('click', () => {
    chatOverlay.style.display = 'none';
});

async function sendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    const sentMessage = document.createElement('div');
    sentMessage.className = 'message sent';
    sentMessage.textContent = messageText;
    chatMessages.appendChild(sentMessage);

    chatInput.value = '';

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `User_message:${messageText}. Reply naturally to the user message and if required then answer based on: ${myDescription} or just simply give friendly reply. And reply in a way that John Doe is himself talking. Reply in short sentences`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        chatMessages.removeChild(typingIndicator);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message received';
        aiMessage.textContent = aiResponse;
        chatMessages.appendChild(aiMessage);
    } catch (error) {
        console.error('Error fetching AI response:', error);
        chatMessages.removeChild(typingIndicator);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message received';
        errorMessage.textContent = "Oops! Something went wrong. Let's try that again.";
        chatMessages.appendChild(errorMessage);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted! (This is a demo - no real submission occurs)');
    contactForm.reset();
});

clearFormButton.addEventListener('click', () => {
    contactForm.reset();
});

// Back to Top Button
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

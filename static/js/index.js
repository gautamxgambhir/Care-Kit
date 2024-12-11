function startLoadingBar() {
    loadingBar.style.width = '0%';
    loadingBar.style.transition = 'none';
    setTimeout(() => {
        loadingBar.style.transition = 'width 0.3s ease-out';
        loadingBar.style.width = '100%';
    }, 50);
}

const links = document.querySelectorAll('.feature-card a');
const loadingBar = document.getElementById('loading-bar');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');

        startLoadingBar();

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1000);
    });
});
document.addEventListener('DOMContentLoaded', function (event) {
    var dataText = ["Welcome to Care Kit!", "Mental Health Support.", "Physical Fitness Tips.", "24/7 Assistance.", "Special Chat bot."];
    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        }
        else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function () {
                StartTextAnimation(0);
            }, 2000);
        }
        if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function () {
                StartTextAnimation(i + 1);
            });
        }
    }
    
    StartTextAnimation(0);
});
const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const description = document.getElementById("description");

let currentPerson = 0;

const people = [
    {
        photo: "https://media.istockphoto.com/id/1395880805/photo/indoor-close-up-portrait-of-beauty-asian-indian-serene-young-woman-sitting-near-the-window.jpg?s=612x612&w=0&k=20&c=HFFaDToYEashf-L8YCZh3y6mlTaOVHvkBqDsKN4mro0=",
        name: "Ananya Mehra (Mumbai)",
        review: "Care Kit has been a lifesaver! I’ve learned so much about self-care and mental health. Highly recommend it to anyone looking for support.",
    },
    {
        photo: "https://media.istockphoto.com/id/1488917621/photo/listening-podcast-while-having-a-morning-coffee-at-home-in-la.jpg?s=612x612&w=0&k=20&c=h21YkljVf-Ku0qLsZ1cbvVe-hiq1DCrGjhlw4MjnY3U=",
        name: "Raghav Sharma (Hyderabad)",
        review: "I never knew how important physical well-being is for mental health. The resources on Care Kit have helped me immensely!",
    },
    {
        photo: "https://media.istockphoto.com/id/838354144/photo/thoughtful-woman-looking-through-window.jpg?s=612x612&w=0&k=20&c=UsiDefa5IqjFRHZuBdlwD-OzupMJadpPb7BeDnIoYY0=",
        name: "Aishwarya Reddy (Chennai)",
        review: "The 24/7 support is a great feature. I feel more connected and understood. It’s helped me improve my mental and physical health.",
    },
    {
        photo: "https://media.istockphoto.com/id/1528491760/photo/young-businesswoman-posing-by-window.jpg?s=612x612&w=0&k=20&c=ktJLeST_EBjadjlR4WM9oWGpxZ6Ldh8GuNn-tvhWa78=",
        name: "Kavya Desai (Bangalore)",
        review: "Care Kit has been an absolute game-changer. helped me navigate my emotional health with tailored support, making me feel heard and understood."
    },
    {
        photo: "https://media.istockphoto.com/id/1398271217/photo/portrait-of-a-young-man-at-park-in-the-summer.jpg?s=612x612&w=0&k=20&c=eIescDgyv7u8ap8dzW_rsqEXYUVGWq7dA0S4XFi9OxE=",
        name: "Rohan Sharma (Delhi)",
        review: "This platform has provided me with an immense sense of peace. The advice is practical and gentle, and the 24/7 availability ensures that I always have support whenever I need it."
    },
    {
        photo: "https://media.istockphoto.com/id/2150133163/photo/portrait-of-female-college-student-contemplating-while-reading-a-book.jpg?s=612x612&w=0&k=20&c=rk_QxJkNIlDhMsthngHfCBgZk8u_skWMa3eK7612Gg4=",
        name: "Devika Narayan (Telangana)",
        review: "I never knew a chatbot could be this supportive. Care Kit not only listens but also offers real solutions that help me feel more confident and centered each day."
    }
];

const updateReview = () => {
    reviewWrap.style.opacity = 0;

    setTimeout(() => {
        imgDiv.style.backgroundImage = `url(${people[currentPerson].photo})`;
        personName.textContent = people[currentPerson].name;
        description.textContent = people[currentPerson].review;

        reviewWrap.style.opacity = 1;
    }, 500);
};

leftArrow.addEventListener("click", () => {
    currentPerson = (currentPerson - 1 + people.length) % people.length;
    updateReview();
});

rightArrow.addEventListener("click", () => {
    currentPerson = (currentPerson + 1) % people.length;
    updateReview();
});

updateReview();

document.addEventListener('DOMContentLoaded', () => {
    const togglers = document.querySelectorAll('[data-toggle]');

    togglers.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const selector = e.currentTarget.dataset.toggle
            const block = document.querySelector(`${selector}`);
            if (e.currentTarget.classList.contains('active')) {
                block.style.maxHeight = '';
            } else {
                block.style.maxHeight = block.scrollHeight + 'px';
            }

            e.currentTarget.classList.toggle('active')
        })
    })
})



function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeString = hours + ':' + minutes;
    document.getElementById('clock').textContent = timeString;
}
setInterval(updateTime, 1000);

var running = false;
document.getElementById("chatbot_toggle").onclick = function () {
    if (document.getElementById("chatbot").classList.contains("collapsed")) {
        document.getElementById("chatbot").classList.remove("collapsed")
        document.getElementById("chatbot_toggle").children[0].style.display = "none"
        document.getElementById("chatbot_toggle").children[1].style.display = ""
        setTimeout(addResponseMsg, 1000, "Hi")
    }
    else {
        document.getElementById("chatbot").classList.add("collapsed")
        document.getElementById("chatbot_toggle").children[0].style.display = ""
        document.getElementById("chatbot_toggle").children[1].style.display = "none"
    }
}

const micButton = document.getElementById('micButton');
const micButtonI = document.getElementById('micbuttonI');
const textInput = document.getElementById('textInput');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US'; 
recognition.continuous = true;
recognition.interimResults = true;

let isListening = false;

micButton.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
        micButtonI.style.color = '#2ac25c'; 
    } else {
        recognition.start(); 
        micButtonI.style.color = '#ff5722';
    }
    isListening = !isListening;
});

// Event when speech is recognized
recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    textInput.value = transcript;
};


recognition.onend = function() {
    if (!isListening) {
        micButtonI.style.color = '#2ac25c';
    }
};


const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "static/images/bot.png";
const PERSON_IMG = "static/images/person.png";
const BOT_NAME = "    Care Bot";
const PERSON_NAME = "You";
msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    console.log(msgerInput.value)
    const msgText = msgerInput.value;
    if (!msgText) return;
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";
    botResponse(msgText);
});
function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    const msgHTML = `
<div class="msg ${side}-msg">
<div class="msg-img" style="background-image: url(${img})"></div>
<div class="msg-bubble">
<div class="msg-info">
<div class="msg-info-name">${name}</div>
<div class="msg-info-time">${formatDate(new Date())}</div>
</div>
<div class="msg-text">${text}</div>
</div>
</div>
`;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function botResponse(rawText) {
    // Bot Response
    $.get("/get", { msg: rawText }).done(function (data) {
        console.log(rawText);
        console.log(data);
        const msgText = data;
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    });
}
// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}
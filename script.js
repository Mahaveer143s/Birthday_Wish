const wishes = [
  "🌟 Dear Samridhi Vishwakarma Ji... 🌟",
  "On this special day... ✨",
  "I want to tell you something from my heart...",
  "You bring so much joy to everyone around you! 🎉",
  "Your smile brightens up even the darkest days! 💫",
  "Your kindness makes this world a better place! 💖",
  "Ab Jada bhi mat soch itni bhi khaash nhi hai tu phir bhi",
  "Happy Birthday! 🎂",
  "But before we continue...",
  "I have a special question for you... 🤔"
];
const sisterChat = [
  "Sister? Samridhi🤔",
  "You know what ...",
  "I have something to confess... 💫",
  "Sister toh tu kabhi ho bhi nhi sakti..",
  "I've always felt our bond is different... ✨",
  "The way we understand each other...",
  "The way we share everything...",
  "It feels more like more than best friends! 💫",
  "but, Would you like to be my Best Friend instead? 🌟"
];
const bestFriendMessages = [
  "Yaara teri yaari ko maine toh khuda mana 🌟",
  "Teri dosti ne mujhe jeena sikhaya hai ✨",
  "Tere jaisa yaar kaha, kaha aisa yarana 💖",
  "Dosti ki hai, nibhani to padegi",
  "Koi dhundta hai kisi ko,",
  "Koi kisi ka sahara hai 🌟",
  "You're not just my friend Samridhi,",
  "You're my favorite person to annoy! 😋",
  "Let's be Best Friends Forever! 🤗"
];

function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars";
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 3 + 1}s`);
    starsContainer.appendChild(star);
  }
  document.body.appendChild(starsContainer);
}

function createEmoji() {
  const emojis = ["💖", "⭐", "✨", "🎉", "🎂", "🎈"];
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = "-50px";
  document.body.appendChild(emoji);
  const animation = emoji.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)"
      },
      {
        transform: `translateY(${window.innerHeight + 50}px) rotate(${
          Math.random() * 360
        }deg)`
      }
    ],
    {
      duration: 3000,
      easing: "linear"
    }
  );
  animation.onfinish = () => emoji.remove();
}

function stopAllMusic() {
  const audios = ["bgMusic", "sisterMusic", "bestFriendMusic"];
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.volume = 0.5;
    audio.play().catch((err) => console.log("Audio play failed:", err));
  }
}
let emojiInterval;
async function typeWriter(text) {
  const wishesElement = document.getElementById("wishes");
  wishesElement.style.opacity = 1;
  wishesElement.innerHTML = "";
  wishesElement.className = "wishes neon-text";
  for (let char of text) {
    wishesElement.innerHTML += char;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
let isMuted = false;
const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", () => {
  const audios = ["bgMusic", "sisterMusic", "bestFriendMusic"];
  isMuted = !isMuted;
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.muted = isMuted;
    }
  });
  // Update button text
  muteButton.textContent = isMuted ? "🔇" : "🔊";
});
async function makeChoice(choice) {
  clearInterval(emojiInterval);
  const wishesElement = document.getElementById("wishes");
  document.getElementById("choices").style.display = "none";
  stopAllMusic();
  if (choice === "sister") {
    document.body.classList.add("sad-theme");
    const sisterAudio = document.getElementById("sisterMusic");
    sisterAudio.muted = isMuted;
    try {
      const playPromise = sisterAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed:", err);
    }
    for (let message of sisterChat) {
      await typeWriter(message);
    }
    document.getElementById("choices").innerHTML = `
                    <button class="choice-btn" onclick="makeChoice('bestfriend')">Best Friend</button>
                `;
    document.getElementById("choices").style.display = "block";
    document.querySelector(".choice-btn").style.opacity = 1;
  } else {
    document.body.classList.remove("sad-theme");
    const bestFriendAudio = document.getElementById("bestFriendMusic");
    bestFriendAudio.muted = isMuted;
    try {
      const playPromise = bestFriendAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed:", err);
    }
    emojiInterval = setInterval(createEmoji, 300);
    for (let message of bestFriendMessages) {
      await typeWriter(message);
    }
    setTimeout(() => {
      setTimeout(() => {
        window.open(
          "https://www.instagram.com/direct/t/harshpreet_singh_honey",
          "_blank"
        );
        wishesElement.innerHTML =
          "Check your Instagram, Samridhi! 📱✨<br>💖I am there💖";
      }, 1000);
    }, 2000);
  }
}
document.getElementById("startBtn").addEventListener("click", async () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("wishesContainer").classList.remove("hidden");
  const bgAudio = document.getElementById("bgMusic");
  bgAudio.muted = isMuted;
  try {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  } catch (err) {
    console.log("Audio play failed:", err);
  }
  emojiInterval = setInterval(createEmoji, 300);
  for (let wish of wishes) {
    await typeWriter(wish);
  }
  document.getElementById("choices").classList.remove("hidden");
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.style.opacity = 1;
  });
});
document.addEventListener("click", async function initAudio() {
  const audios = ["bgMusic", "sisterMusic", "bestFriendMusic"];
  for (let id of audios) {
    const audio = document.getElementById(id);
    try {
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
    } catch (err) {
      console.log("Audio initialization failed:", err);
    }
  }
  document.removeEventListener("click", initAudio);
});

createStars();
let honey = document.getElementById("body");
function fullScreen() {
  honey.requestFullscreen();
}

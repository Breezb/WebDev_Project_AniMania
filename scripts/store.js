// script.js

document.addEventListener('DOMContentLoaded', () => {
    const claw = document.getElementById('claw');
    const startButton = document.getElementById('startButton');
    const result = document.getElementById('result');
    const prizes = document.querySelectorAll('.prize');
    let isGrabbing = false;
  
    // Function to move claw down and attempt to grab a prize
    function startClawMachine() {
      if (isGrabbing) return; // Prevent multiple grabs at once
      console.log("Start button clicked, claw moving...");
      
      result.textContent = "Claw is moving...";
      
      // Move the claw down
      claw.style.top = '150px';
  
      // Wait for the claw to reach the prize area
      setTimeout(() => {
        claw.style.top = '80px'; // Move claw back up
        checkCollision();
      }, 1000);
    }
  
    // Function to check if a prize is grabbed
    function checkCollision() {
      let grabbedPrize = null;
      const clawRect = claw.getBoundingClientRect();
  
      prizes.forEach(prize => {
        const prizeRect = prize.getBoundingClientRect();
        
        // Collision check
        if (
          clawRect.left < prizeRect.right &&
          clawRect.right > prizeRect.left &&
          clawRect.bottom > prizeRect.top &&
          clawRect.top < prizeRect.bottom
        ) {
          grabbedPrize = prize;
        }
      });
  
      if (grabbedPrize) {
        result.textContent = "You won a prize!";
        grabbedPrize.style.opacity = 0.5; // Visual cue for won prize
      } else {
        result.textContent = "Try again!";
      }
  
      isGrabbing = false;
    }
  
    // Event listener to start the claw machine
    startButton.addEventListener('click', startClawMachine);
  });
  
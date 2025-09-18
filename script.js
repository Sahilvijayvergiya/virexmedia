// Animated typing effect for the hero section
const words = ["Success", "Creativity", "Growth", "Visibility"];
let i = 0, j = 0, currentWord = "", isDeleting = false, wait = 110;

function loopTyped() {
  let el = document.getElementById("typed");
  if (!el) return;
  if (!isDeleting && j <= words[i].length) {
    currentWord = words[i].substr(0, j++);
    el.textContent = currentWord;
    setTimeout(loopTyped, wait);
  } else if (isDeleting && j >= 0) {
    currentWord = words[i].substr(0, j--);
    el.textContent = currentWord;
    setTimeout(loopTyped, 55);
  } else {
    if (!isDeleting) { 
      isDeleting = true; 
      setTimeout(loopTyped, 900); 
    } else { 
      isDeleting = false; 
      i = (i+1)%words.length; 
      setTimeout(loopTyped, 600);
    }
  }
}

// Initialize typing effect when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  loopTyped();
});

// FAQ toggle show/hide
document.querySelectorAll(".faq-question").forEach(q => {
  q.onclick = function() {
    this.parentElement.classList.toggle("active");
  };
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const submitButton = this.querySelector('button[type="submit"]');
  const formMsg = document.getElementById("formMsg");
  
  // Disable submit button and show loading
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formMsg.textContent = "";
  
  // Submit to Formspree
  fetch(this.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      formMsg.textContent = "Thank you! We will connect with you soon.";
      formMsg.style.color = "#4CAF50";
      this.reset();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    formMsg.textContent = "Sorry, there was an error sending your message. Please try again or contact us directly.";
    formMsg.style.color = "#f44336";
    console.error('Error:', error);
  })
  .finally(() => {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = "Send";
  });
});

// ✅ Firebase Initialization
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCA_fw4JA_kKdQdCPY5ML036dOwvyd5xyU",
    authDomain: "fridah-coffee.firebaseapp.com",
    projectId: "fridah-coffee",
    databaseURL: "https://fridah-coffee-default-rtdb.firebaseio.com",
    storageBucket: "fridah-coffee.firebasestorage.app",
    messagingSenderId: "902844486575",
    appId: "1:902844486575:web:8a9dfd2ada888ddaf1155a",
    measurementId: "G-F8TNSCD2Z4"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // ✅Newsletter Subscription
  const subscribeForm = document.getElementById("subscribeForm");
  if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("subscriberEmail").value;

    const subRef = ref(db, "subscribers");
    const newSubRef = push(subRef);

    set(newSubRef, {
      email,
      timestamp: new Date().toISOString()
    })
      .then(() => {
        alert("✅ Subscription successful!");
        openGmail("subscription", { email }); // 👈 Moved here
        subscribeForm.reset();
      })
      .catch((err) => {
        console.error("❌ Error saving subscription:", err);
        alert("Something went wrong. Check console.");
      });
  });
}



  // ✅ Consultation Form
  const consultForm = document.getElementById("consultationForm");
  if (consultForm) {
  consultForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const consultData = {
      name: document.getElementById("consultName").value,
      email: document.getElementById("consultEmail").value,
      reason: document.getElementById("consultReason").value,
      message: document.getElementById("consultMessage").value,
      timestamp: new Date().toISOString()
    };

    const consultRef = ref(db, "consultations");
    const newConsultRef = push(consultRef);

    set(newConsultRef, consultData)
      .then(() => {
        alert("✅ Consultation submitted successfully!");
        openGmail("consultation", {
          name: consultData.name,
          email: consultData.email,
          service: consultData.reason
        });
        consultForm.reset();
      })
      .catch((err) => {
        console.error("Error saving consultation:", err);
        alert("❌ Failed to submit consultation. Try again.");
      });
  });
}




  // ✅ Training Application Form
  const applicationForm = document.getElementById('applicationForm');

  if (applicationForm) {
  applicationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const message = document.getElementById('message').value;

    try {
      const newAppRef = push(ref(db, "applications"));
      await set(newAppRef, {
        name, email, course, message,
        timestamp: new Date().toISOString()
      });

      alert("✅ Application submitted successfully!");
      openGmail("training", {
        fullName: name,
        email,
        course,
        reason: message
      });
      applicationForm.reset();
    } catch (err) {
      console.error("Error saving application:", err);
      alert("❌ Something went wrong, try again.");
    }
  });
}




  // ✅ Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contactData = {
      name: document.getElementById("contactName").value,
      email: document.getElementById("contactEmail").value,
      message: document.getElementById("contactMessage").value,
      timestamp: new Date().toISOString()
    };

    const contactRef = ref(db, "contacts");
    const newContactRef = push(contactRef);

    set(newContactRef, contactData)
      .then(() => {
        alert("✅ Message sent!");
        openGmail("contact", {
          name: contactData.name,
          email: contactData.email,
          message: contactData.message
        });
        contactForm.reset();
      })
      .catch((err) => {
        console.error("❌ Error saving contact:", err);
      });
  });
}



// Open Gmail with pre-filled details
function openGmail(formType, formData) {
  let subject = "";
  let body = "";

 if (formType === "contact") {
  const recipients = "Fridahcoffee@gmail.com, sarkysalah@gmail.com"; // 👈 multiple recipients  
    subject = "Contact Us Message";
    body = `Hello, 
    ${formData.name} 
    Email: ${formData.email} 
    Message: ${formData.message}`;
  } 
  else if (formType === "training") {
  const recipients = "Fridahcoffee@gmail.com, sarkysalah@gmail.com"; // 👈 multiple recipients
    subject = `Training Application - ${formData.fullName}`;
    body = `Name: ${formData.fullName} 
    Email: ${formData.email} 
    Course: ${formData.course} 
    Reason: ${formData.reason}`;
  } 
  else if (formType === "consultation") {
  const recipients = "Fridahcoffee@gmail.com, sarkysalah@gmail.com"; // 👈 multiple recipients
    subject = `Consultation Request from ${formData.name}`;
    body = `Name: ${formData.name} 
    Email: ${formData.email} 
    Service Interested In: ${formData.service}`;
  } 
  else {
    subject = "General Inquiry";
    body = "Hello, I have a question.";
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@yourcompany.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, "_blank");
}


// ✅ Navbar Hamburger Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function toggleMenu() {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('active');
  document.body.classList.toggle('nav-open');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) toggleMenu();
  });
});

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) toggleMenu();
});

// Close when tapping outside the nav on mobile
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
    toggleMenu();
  }
});

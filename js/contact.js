document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = document.getElementById('contact-submit-btn');
        const errorElement = document.getElementById('contact-error');

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const topic = document.getElementById('contact-topic').value;
        const message = document.getElementById('contact-message').value.trim();

        if (errorElement) errorElement.textContent = '';

        if (!email.endsWith('@my.yorku.ca') && !email.endsWith('@yorku.ca')) {
            if (errorElement) {
                errorElement.textContent = 'Please use a valid @my.yorku.ca or @yorku.ca email address.';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("_subject", `[Club Finder Contact] Topic: ${topic}`);
        formData.append("topic", topic);
        formData.append("message", message);
        formData.append("_captcha", "false");

        fetch('https://formsubmit.co/ajax/srafiee@my.yorku.ca', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                contactForm.style.display = 'none';
                const successMsg = document.getElementById('form-success');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                contactForm.reset();
            })
            .catch(error => {
                console.error('Submission Error:', error);
                if (errorElement) {
                    errorElement.textContent = 'There was an error sending your message. Please try again.';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<img src="assets/send.png" alt="" aria-hidden="true" class="btn-icon"> Send Message`;
                }
            });
    });
});
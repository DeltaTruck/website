var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '18px',
    color: "#495057",
  }
};

// Create an instance of the card Element
var card = elements.create('card', {
  hidePostalCode: true,
  style: style
});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Card errors
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

var form = document.getElementById('payment-form');
var payment_form_button = document.getElementById('payment-form-button');
var payment_form_button_html = payment_form_button.innerHTML;

// Create a token or display an error when the form is submitted.
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Disable form submit button
  payment_form_button.setAttribute('disabled', '');
  payment_form_button.innerText = 'Processing...';

  var cardData = {
    name: document.getElementById('id_name').value,
    address_line1: document.getElementById("id_address_line1").value,
    address_line2: document.getElementById("id_address_line2").value,
    address_city: document.getElementById("id_address_city").value,
    address_state: document.getElementById("id_address_state").value,
    address_zip: document.getElementById("id_address_zip").value
  }

  stripe.createToken(card, cardData).then(function(result) {
    if (result.error) {
      // Enable form submit button
      payment_form_button.removeAttribute('disabled');
      payment_form_button.innerHTML = payment_form_button_html;

      // Inform the customer that there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}

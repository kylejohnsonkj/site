(function() {
    function isRobot() {
        var honeypot = document.getElementById("honeypot").value;
        if (honeypot == "human") {
            console.log("Welcome Human!");
        } else {
            console.log("Robot Detected!");
            return true;
        }
    }

    // get all data in form and return object
    function getFormData() {
        var form = document.getElementById("gform");
        var elements = form.elements;

        var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== "honeypot");
        }).map(function(k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name) {
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        console.log(formData);
        return formData;
    }

    function handleFormSubmit(event) { // handles form submit without any jquery
        event.preventDefault(); // we are submitting via xhr below
        var data = getFormData(); // get the values submitted in the form

        if (isRobot()) { // if form is filled, form will not be submitted
            document.getElementById("gform").style.display = "none"; // hide form
            var honeypotMessage = document.getElementById("honeypot_message");
            if (honeypotMessage) {
                honeypotMessage.style.display = "block";
            }
            return false;
        }

        disableAllButtons(event.target);
        var url = "https://script.google.com/macros/s/AKfycbyrcqSm5KuUpjdGdLG7AqDB333ZlX5eqqPGiL3pP32LL5IEzyK1/exec"
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            console.log(xhr.status, xhr.statusText)
            console.log(xhr.responseText);
            document.getElementById("gform").style.display = "none"; // hide form
            var thankYouMessage = document.getElementById("thankyou_message");
            if (thankYouMessage) {
                thankYouMessage.style.display = "block";
            }
            return;
        };

        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
        }).join('&')
        xhr.send(encoded);
    }

    function loaded() {
        console.log("Contact form submission handler loaded successfully.");
        // bind to the submit event of our form
        var form = document.getElementById("gform");
        form.addEventListener("submit", handleFormSubmit, false);
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();
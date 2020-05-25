document.addEventListener('DOMContentLoaded', submitButton);

function submitButton()
{
	document.getElementById("submitEvent").addEventListener("click", function(event)
	{
		var req = new XMLHttpRequest();
		var URL = "http://httpbin.org/post";
        var payload = {email: null, medidate_minutes: null, experience: null, description: null};
        var success = document.getElementById("successSubmission")

		payload.email = document.getElementById("email").value;
        payload.experience = document.getElementById("experience").value;
        payload.medidate_minutes = document.getElementById("medidate_minutes").value;
        payload.description = document.getElementById("description").value;
        
        
	
		req.open('POST', URL, true);
		req.setRequestHeader('Content-Type', 'application/json'); 

		req.addEventListener("load", function()
		{
			if (req.status >= 200 && req.status < 400)
			{
                var response = JSON.parse(JSON.parse(req.responseText).data);
				document.getElementById("postEmail").textContent = "Email: " + response.email;
                document.getElementById("postExperience").textContent = "Experience: " + response.experience;
                document.getElementById("postMeditation").textContent = "Meditation: " + response.medidate_minutes;
                document.getElementById("postDescription").textContent = "Description " + response.description;
				success.innerHTML="Submission Succesfully Sent";
				success.classList.add("alert-success");
				success.classList.add("alert");
				document.getElementById("submitEvent").disabled= true;
                success.style.color = "green";
			}
			else
			{
                success.textContent="Error, submission not sent";
				success.style.color = "red";
                console.log("Error in network request: " + req.statusText);
			}
		});
		req.send(JSON.stringify(payload));
        event.preventDefault();
    });
    
}
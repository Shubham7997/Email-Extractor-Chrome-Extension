let email_ext = document.getElementById("extract_email");

//Regular Email ID expression to find match.
var regx = "/([a-zA-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi";

email_ext.onclick = function(element) {
	chrome.tabs.query ({ active : true, currentWindow : true} , function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id , 
			{code : 'var mails = document.body.innerHTML.toString().match('+regx+'); if(mails == null){ alert("NO EMAILS FOUND!");} else{ var uniq = [...new Set(mails)]; var bl = new Blob([uniq.join("\\r\\n")],{type: "text/plain" }); var filename = "emails.txt"; var link = document.createElement("a"); link.download = filename; if(window.webkitURL != null){ link.href = window.webkitURL.createObjectURL(bl);}else{ link.href = window.URL.createObjectURL(bl); link.style.display = "none"; document.body.appendChild(link);} link.click(); }'});
		});
};

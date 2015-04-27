// JavaScript for github-api.html (GitHub git API)

var repoHTML = "<input type='text' name='user' value='jgbarah' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='GitHub-API' " +
    "id='repo' size='10' />" +
    "<button type='button'>Grab repo data</button>" +
    "<div id='repodata'/>";

var github;
var myrepo;

// function btoa(data) {
//    return window.btoa(data);
// };

function getToken() {
    var token = $("#token").val();
    console.log (token);

    github = new Github({
	token: token,
	auth: "oauth"
    });

    $("#repoform").html(repoHTML)
    $("div#form button").click(getRepo);
};

function getRepo() {
    var user = $("#user").val();
    var reponame = $("#repo").val();
    myrepo = github.getRepo(user, reponame);
    myrepo.show(showRepo);
};

function showRepo(error, repo) {
    var repodata = $("#repodata");
    if (error) {
	repodata.html("<p>Error code: " + error.error + "</p>");
    } else {
	repodata.html("<p>Repo data:</p>" +
		      "<ul><li>Full name: " + repo.full_name + "</li>" +
		      "<li>Description: " + repo.description + "</li>" +
		      "<li>Created at: " + repo.created_at + "</li>" +
		      "</ul><button type='button' id='write'>" +
		      "Write File!</button>" +
		      "<div id='writefile' />");
	console.log (repo.full_name, repo.description, repo.created_at);
	$("#write").click(writeFile);
    }
};

function writeFile() {
    myrepo.write('master', 'datafile', 
		 new Date().toLocaleString(),
		 "Updating data", function(err) {
		     console.log (err)
		 });
    $("#writefile").html("<button type='button' id='read'>" +
			 "Read File!</button>" +
			 "<div id='readfile' />");
    $("#read").click(readFile);
};

function readFile() {
    myrepo.read('master', 'datafile', function(err, data) {
	console.log (err, data);
	$("#readfile").html("<p>Contents:</p><p>" + data + "</p>");
    });
};

$(document).ready(function() {
    $("div#form button").click(getToken);
    
});

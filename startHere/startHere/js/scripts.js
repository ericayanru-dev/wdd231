const getString = window.location.search;
console.log(getString)

const myinfo = new URLSearchParams(getString);
console.log(myinfo)
document.querySelector("#results").innerHTML = `
<p>Appointmeant ${myinfo.get("first")} ${myinfo.get("last")}</p>`
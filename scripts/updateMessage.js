export const updateMessage = (message, id) => {
    if (!id) id = message._id;
    console.log('Update message on student`s page with id:', id)
    // console.log(document.getElementById(id).childNodes);
    let answerDiv;
    if (document.getElementById(id).childNodes[3].childNodes[1].classList.contains('answer'))
        answerDiv = document.getElementById(id).childNodes[3].childNodes[1];
    else if (document.getElementById(id).childNodes[3].childNodes[4].classList.contains('answer'))
        answerDiv = document.getElementById(id).childNodes[3].childNodes[4];
    console.log(answerDiv, answerDiv.innerHTML);
    if (!answerDiv.innerHTML) { answerDiv.innerHTML = `<b>New answer:</b> ${message}`; answerDiv.style.display = "block" }
    else
        answerDiv.innerHTML = message;
}
const axiosHandler = axios.create({
  baseURL: "http://localhost:3000"
});

function deleteSneaker(evt) {
  const sneakerId = evt.target.dataset.idSneaker;
  axiosHandler
    .delete(`/product-delete/${sneakerId}`)
    .then(res => {
      const deleteRow = document.getElementById(sneakerId);
      deleteRow.parentNode.removeChild(deleteRow);
    })
    .catch(err => console.log("This is the err response :", err));
}

const sneakerBins = document.getElementsByClassName("fa-trash");

for (let element of sneakerBins) {
  element.onclick = deleteSneaker;
}

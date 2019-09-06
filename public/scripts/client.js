console.log("hello");

const axiosHandler = axios.create({
  baseURL: "http://localhost:3000"
});

function handleClick(evt) {
  evt.preventDefault();
  const label = document.getElementById("label").value;
  // console.log(label);
  axiosHandler
    .post("/tag", { label })
    .then(res => {
      console.log(res);
      const tagList = document.getElementById("tags");
      //method 1 : createElement => innerHTML => appendChild
      const newTag = document.createElement("option");
      newTag.nodeValue = res.data._id;
      newTag.innerHTML = res.data.label;
      tagList.appendChild(newTag);
      console.log("appendchild done");
      // method 2 : parentNode.innerHTML
      // tagList.innerHTML += `<option value="${this._id}">${this.label}</option>`;
    })
    .catch(err => console.log(err));
}

document.getElementById("btn_new_tag").onclick = handleClick;

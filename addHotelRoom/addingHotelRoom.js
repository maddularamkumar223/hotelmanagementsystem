let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  console.log(formData.get("roomNo"));
  console.log(formData.get("roomType"));
  console.log(formData.get("price"));
  let image = formData.get("file");

  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    let imageUrl = e.target.result;
    let hotelRoomDetails = {
      roomNo: formData.get("roomNo"),
      roomPrice: formData.get("price"),
      roomType: formData.get("roomType"),
      roomImage: imageUrl,
      roomStatus: "Available",
    };
    addRooms(hotelRoomDetails);
    location.href = "../homePage/index.html";
  };
  fileReader.readAsDataURL(image);
});

let addRooms = async (data) => {
  try {
    await fetch("http://localhost:3000/hotelsRooms", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

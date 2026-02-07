let roomContainer = document.querySelector(".room_container");

let rooms = async () => {
  let response = await fetch("http://localhost:3000/hotelsRooms");
  let roomsData = await response.json();

  roomsData.map((room) => {
    let container = document.createElement("article");
    container.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    let roomNo = document.createElement("p");
    let roomPrice = document.createElement("p");
    let roomImage = document.createElement("img");
    let status = document.createElement("p");
    let roomType = document.createElement("p");
    let bookRoom = document.createElement("button");

    roomNo.innerHTML = `Room No: ${room.roomNo}`;
    roomPrice = `Room Price: ${room.roomPrice}`;
    roomImage.src = room.roomImage;
    bookRoom.innerHTML = "Book The Room";
    roomType.innerHTML = `Room Type : ${room.roomType}`;
    status.innerHTML = `Status: ${room.roomStatus}`;

    if (room.roomStatus === "Available" && localStorage.getItem("id")) {
      status.style.color = "green";
      bookRoom.addEventListener("click", () => {
        popUp("block", room);
      });
    } else {
      status.style.color = "red";
      bookRoom.setAttribute("disabled", "true");
    }

    container.append(roomImage, roomNo, roomPrice, roomType, status, bookRoom);
    roomContainer.append(container);
  });
};
rooms();

// ! Form Popup

let formDisplayDetails = [
  {
    name: "name",
    placeHolder: "Enter The Name",
    type: "text",
  },
  {
    name: "check in",
    type: "date",
  },
  {
    name: "check out",
    type: "date",
  },
];

let popUp = (value, data) => {
  console.log(data);
  let container = document.createElement("div");
  let crossSymbol = document.createElement("p");
  let form = document.createElement("form");
  let submit_buttonBook = document.createElement("button");
  let bookingRoomDetails = document.createElement("div");
  let heading = document.createElement("h1");

  Object.entries(data)
    .filter(
      (value) =>
        value[0] !== "id" &&
        value[0] !== "roomImage" &&
        value[0] !== "roomStatus",
    )
    .map((value) => {
      let para = document.createElement("p");
      para.innerHTML = `<span>${value[0]}: </span> <span>${value[1]}</span>`;
      console.log(para);
      bookingRoomDetails.append(para);
    });

  // ! Assigning the value to the form
  crossSymbol.innerHTML = "X";
  heading.innerHTML = "Booking Conformation";
  formDisplayDetails.map((value) => {
    let label = document.createElement("label");
    let input = document.createElement("input");
    let dataContainer = document.createElement("aside");

    label.innerHTML = value.name;
    input.type = value.type;
    input.name = value.name;
    dataContainer.append(label, input);
    form.append(dataContainer);
  });
  submit_buttonBook.innerHTML = "Submit";

  // ! Display Pop up values
  container.className = "booking_form";
  crossSymbol.className = "crossSymbol";
  container.style.display = value || "block";

  // ! assigning functions to the buttons
  crossSymbol.addEventListener("click", () => {
    container.style.display = "none";
  });

  // ! getting details from the form

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(form);

    let detailsForm = {
      userId: localStorage.getItem("id"),
      roomNo: data.roomNo,
      roomType: data.roomType,
      roomPrice: data.roomPrice,
      name: formData.get("name"),
      checkIn: formData.get("check in"),
      checkOut: formData.get("check out"),
    };
    addBooking(detailsForm);
    updateRoomData(data.id);
    alert("Your Booking is Confirmed");
  });

  // ! Appending the containers to the body
  form.append(submit_buttonBook);
  container.append(crossSymbol, heading, bookingRoomDetails, form);
  document.body.append(container);
};

// ! AddBooking

let addBooking = async (value) => {
  await fetch("http://localhost:3000/bookings", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

let updateRoomData = async (id) => {
  await fetch(`http://localhost:3000/hotelsRooms/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ roomStatus: "Unavailable" }),
  });
};

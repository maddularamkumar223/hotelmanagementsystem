let bookingDetails = document.querySelector(".bookingDetails");
let bookingData = async () => {
  let response = await fetch("http://localhost:3000/bookings");
  let data = await response.json();
  console.log(data);

  let userID = localStorage.getItem("id");

  let filterBooking = data.filter((value) => value.userId === userID);
  console.log(filterBooking);

  if (filterBooking.length > 0) {
    filterBooking.map((book) => {
      let bookingContainer = document.createElement("article");
      let userName = document.createElement("p");
      let checkIn = document.createElement("p");

      userName.innerHTML = `Hi ${book.name}`;
      checkIn.innerHTML = `You booking is confirmed on ${book.checkIn}`;

      bookingContainer.append(userName, checkIn);
      bookingDetails.append(bookingContainer);
    });
  } else {
    let h1 = document.createElement("h1");
    h1.innerHTML = "NO bookings";
    bookingDetails.append(h1);
  }
};
bookingData();

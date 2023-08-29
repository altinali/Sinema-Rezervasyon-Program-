// script baglantısı
// console.log('script baglandı')

const container = document.querySelector(".container");
// console.log(container)
const infoText = document.querySelector(".infoText");
// console.log(infoText)
const movie = document.getElementById("movie");
// console.log(movie)
const seats = document.querySelectorAll(".seat:not(.reserved)");
// console.log(seats)
let movieImg = document.querySelector(".movie-img");
// console.log(movieimg)

//Tarayıcı veritabanından verileri okuma
const getSeatDataFromDatabase = () => {
  // secilen filmin index verisi
  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  // console.log(dbSelectedMovie)

  if (dbSelectedMovie) {
    movie.selectedIndex = dbSelectedMovie;
    // console.log(dbSelectedMovie);
  }
  const dbSelectedSeats = JSON.parse(localStorage.getItem("selectedIndex"));
  // console.log(dbSelectedSeats)

  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

//Veritabanı Kayıt fonksiyonu

const saveToDataBase = (seatIndexData) => {
  localStorage.setItem("selectedIndex", JSON.stringify(seatIndexData));
  localStorage.setItem("movieIndex", JSON.stringify(movie.selectedIndex));
};

getSeatDataFromDatabase();

// Toplam tutar hesaplama ve koltukların index numaralarını bulma fonksiyonu
const calculateTotal = () => {
  // ***Veritabanı işlemleri ***

  // 1- seçilen koltukarın bilgisi
  // 2-tüm koltukların indexi

  const selectedSeats = document.querySelectorAll(".seat.selected");
  // console.log(selectedSeat)

  // seçilen tüm koltuklar için kullanacagım dizi
  const allSeatsArray = [];
  const allSelectedSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  // console.log(allSeatArray)

  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });
  // console.log(allSelectedSeatArray)

  let selectedIndexs = allSelectedSeatsArray.map((allSelectedSeat) => {
    return allSeatsArray.indexOf(allSelectedSeat);
  });
  // console.log(selectedIndexs)

  // ? hesaplama işlemleri

  // console.log(movie.value);
  let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
  // console.log(selectedSeatCount)

  if (selectedSeatCount > 0) {
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }

  let price = movie.value;
  // console.log(price)

  let total = price * selectedSeatCount;
  // console.log(total)

  infoText.innerHTML = `
<span >${selectedSeatCount}</span> Koltuk için toplam ücret <span >${total}</span> TL
`;

  saveToDataBase(selectedIndexs);
};

calculateTotal();

container.addEventListener("click", (e) => {
  // console.log(e.target.offsetParent)
  if (
    e.target.offsetParent.classList.contains("seat") &&
    !e.target.offsetParent.classList.contains("reserved")
  ) {
    // Tıklandıgında seçilen elemana seleced clasını atama
    e.target.offsetParent.classList.toggle("selected");
    calculateTotal();
  }
});

movie.addEventListener("change", () => {
  calculateTotal();
  changeImage();
});

const changeImage = () => {
  let selectedMovie = movie.options[movie.selectedIndex];
  // console.log(selectedMovie.innerHTML)
  if (selectedMovie.innerHTML == "War Craft") {
    movieImg.src = "Warcraft.jpg";
  } else if (selectedMovie.innerHTML == "Yüzüklerin Efendisi") {
    movieImg.src = "Yüzük.jpg";
  } else if (selectedMovie.innerHTML == "Harry Potter") {
    movieImg.src = "HarryPotter.jpg";
  }
};

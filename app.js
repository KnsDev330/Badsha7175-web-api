const phoneContainer = document.getElementById("phone-container");
const loadingSpinner = document.getElementById("loading-spinner");
const noDataMsg = document.getElementById("no-data-msg");
const showAllContainer = document.getElementById("show-all-container");
const searchInput = document.getElementById("search-input");

// ১. নতুন নির্ভরযোগ্য API (DummyJSON) থেকে ফোনের তালিকা লোড করা
const loadPhones = async (searchText = "iphone", isShowAll = false) => {
  toggleLoading(true);
  noDataMsg.classList.add("hidden");
  phoneContainer.innerHTML = "";

  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchText}`,
    );
    const data = await res.json();

    // API-এর ডেটা আমাদের প্রজেক্টের ফরম্যাটে সাজিয়ে নেওয়া
    const phones = data.products.map((item) => ({
      phone_name: item.title,
      brand: item.brand || "Generic",
      image: item.thumbnail,
      id: item.id,
    }));

    displayPhones(phones, isShowAll);
  } catch (error) {
    console.error("Error fetching phones:", error);
    noDataMsg.classList.remove("hidden");
  } finally {
    toggleLoading(false);
  }
};

// ২. প্রাপ্ত ফোনগুলো কার্ড আকারে স্ক্রিনে দেখানো
const displayPhones = (phones, isShowAll) => {
  if (!phones || phones.length === 0) {
    noDataMsg.classList.remove("hidden");
    showAllContainer.classList.add("hidden");
    return;
  }

  // ৬টির বেশি প্রোডাক্ট থাকলে Show All বাটন দেখাবে
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
    phones = phones.slice(0, 6);
  } else {
    showAllContainer.classList.add("hidden");
  }

  phones.forEach((phone) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="${phone.image}" alt="${phone.phone_name}">
            <h3>${phone.phone_name}</h3>
            <p>Brand: <strong>${phone.brand}</strong></p>
            <button onclick="loadPhoneDetails(${phone.id})" class="btn-primary">Show Details</button>
        `;
    phoneContainer.appendChild(card);
  });
};

// ৩. সার্চ বাটন হ্যান্ডলার
const handleSearch = (isShowAll = false) => {
  const searchText = searchInput.value.trim() || "iphone";
  loadPhones(searchText, isShowAll);
};

// Enter কী চাপলেও যেন সার্চ কাজ করে
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// ৪. Show All বাটন হ্যান্ডলার
const handleShowAll = () => {
  handleSearch(true);
};

// ৫. নির্দিষ্ট ফোনের বিস্তারিত তথ্য (Modal) লোড করা
const loadPhoneDetails = async (id) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const phone = await res.json();
    showPhoneModal(phone);
  } catch (error) {
    console.error("Error fetching phone details:", error);
  }
};

// ৬. মোডালে তথ্য দেখানো ও বন্ধ করা
const showPhoneModal = (phone) => {
  const modal = document.getElementById("phone-modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
        <div class="modal-details">
            <img src="${phone.thumbnail}" alt="${phone.title}">
            <h2>${phone.title}</h2>
            <p><strong>Brand:</strong> ${phone.brand || "N/A"}</p>
            <p><strong>Price:</strong> $${phone.price}</p>
            <p><strong>Rating:</strong> ⭐ ${phone.rating} / 5</p>
            <p><strong>Stock:</strong> ${phone.stock} units available</p>
            <p><strong>Description:</strong> ${phone.description}</p>
        </div>
    `;
  modal.classList.remove("hidden");
};

const closeModal = () => {
  document.getElementById("phone-modal").classList.add("hidden");
};

// ৭. লোডিং স্পিনার নিয়ন্ত্রণ
const toggleLoading = (isLoading) => {
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// ৮. Sign Up Modal খোলা ও বন্ধ করা
const signupModal = document.getElementById("signup-modal");
const signupForm = document.getElementById("signup-form");
const signupSuccess = document.getElementById("signup-success");

const openSignUpModal = () => {
  signupForm.classList.remove("hidden");
  signupSuccess.classList.add("hidden");
  signupForm.reset();
  signupModal.classList.remove("hidden");
};

const closeSignUpModal = () => {
  signupModal.classList.add("hidden");
};

// ৯. ফর্ম সাবমিট হ্যান্ডেল করা
const handleSignUp = (event) => {
  event.preventDefault();

  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;

  signupForm.classList.add("hidden");
  signupSuccess.classList.remove("hidden");
  document.getElementById("welcome-msg").innerText =
    `Welcome, ${name}! We have sent a confirmation to ${email}.`;
};

// পেজ লোড হওয়ার সাথে সাথে ডিফল্টভাবে 'iphone' ডেটা লোড হবে
loadPhones();

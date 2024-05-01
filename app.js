const postCardContainer = document.getElementById("post-card-container");
const markedContainer = document.getElementById("marked-container");
const latestPostContainer = document.getElementById("latest-post-container");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const loading = document.getElementById("loading");
let markCount = document.getElementById("mark-count");
let initMarkCount = 0;


// let urlAllPost = `https://openapi.programming-hero.com/api/retro-forum/posts`;

const handleSearch = () => {
  let searchValue = searchField.value;
  
  
  if(searchValue){
    
    allPostDataFunc(searchValue)
  } else{
    alert("Please provide right keyword")
  }
}

const allPostDataFunc = async (searchValue) => {

  // loading.classList.remove("hidden")

  let url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`;

  const res = await fetch(url);
  const data = await res.json();

  const postData = data.posts;

  postCardContainer.innerHTML =''

  postData.forEach((item) => {
    // loading.classList.add("block")
    
    const div = document.createElement("div");
    div.innerHTML = `
        <div>
            <div
            class="bg-white h-16 w-16 flex justify-center items-center rounded-md"
            >
            <img class="rounded-lg" src=${item.image} alt="">
            </div>
            <div class="relative bottom-20 left-12">
            <div class="badge bg-${
              item.isActive ? "green" : "red"
            }-600 badge-sm relative"></div>
            </div>
      </div>

      <div class="w-11/12 rounded-2xl">
        <div
          class="flex gap-4 text-xl text-lightishBlack font-medium font-inter"
        >
          <h2>#<span>${item.category}</span></h2>
          <h2>Author : <span>${item.author.name}</span></h2>
        </div>
        <div>
          <h1 class="text-2xl font-bold font-mulish my-3">
            ${item.title}
          </h1>
        </div>
        <div>
          <p class="text-customGray text-xl font-inter">
          ${item.description}
          </p>
        </div>
        <hr class="border-dashed text-slate-400 my-4 font-inter" />
        <div class="flex justify-between">
          <div class="flex gap-2 md:gap-10 lg:gap-10 text-customGray text-xl">
            <div class="flex items-center gap-3">
              <div><i class="fa-regular fa-comment-dots"></i></div>
              <p>${item.comment_count}</p>
            </div>
            <div class="flex items-center gap-3">
              <div><i class="fa-regular fa-eye"></i></div>
              <p>${item.view_count}</p>
            </div>
            <div class="flex items-center gap-3">
              <div><i class="fa-regular fa-clock"></i></div>
              <p>${item.posted_time}</p>
            </div>
          </div>
          <div id="markAsRead" onclick="markAsRead('${item.title}', '${item.view_count}')"class="cursor-pointer">
            <img src="./assests/email 1.png" alt="email_logo" />
          </div>
        </div>
      </div>
        `;
    div.classList.add(
      "flex",
      "gap-4",
      "text-3xl",
      "bg-gray",
      "px-8",
      "py-10",
      "rounded-xl",
      "mb-6",
      "hover:bg-violet-100",
      "hover:border-2",
      "hover:border-stone-300"
    );
    postCardContainer.appendChild(div);
  });
};




function markAsRead(title, viewCount) {

  initMarkCount += 1;
  setInnerText("mark-count", initMarkCount);
  

  const div = document.createElement("div");
  div.innerHTML = `
    

    <div class="flex bg-white px-3 py-3 rounded-xl mt-4 mb-5 gap-3">
        <h3 class="text-xl font-bold w-11/12">
        ${title}
        </h3>
        <div class="flex gap-3 text-customGray">
        <div><i class="fa-regular fa-eye"></i></div>
        <p class="font-inter">${viewCount}</p>
        </div>
    </div>
    `;
  markedContainer.appendChild(div);
}

const latestPostFunc = async () => {
  const url = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
  const res = await fetch(url);
  const data = await res.json();
  
  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="px-10 bg-base-100 shadow-xl rounded-2xl border-2 border-stone-200">
      <div class="pt-10 w-full">
        <img src=${item.cover_image} alt="card_img" class="rounded-xl min-w-full "/>
      </div>
      <div class="pb-10 h-72">
        <div class="flex gap-3 mt-4">
          <div><i class="fa-regular fa-calendar"></i></div>
          <p class="text-customGray ">${item?.author?.posted_date ? item?.author?.posted_date : "No publish date"}</p>
        </div>
        <h2 class="font-bold text-xl my-4">${item.title}</h2>
        <p class="text-customGray">${item.description}</p>
        <div class="flex gap-4 mt-4">
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img class="" src=${item.profile_image} />
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold">${item?.author?.name}</h3>
            <p class="text-customGray">${item?.author?.designation ? item?.author?.designation : "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
    `
    // div.classList.add();
    latestPostContainer.appendChild(div)
  })
}




allPostDataFunc("Comedy");
latestPostFunc();
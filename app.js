const postCardContainer = document.getElementById("post-card-container");

const postDataFunc = async () => {
  const url = " https://openapi.programming-hero.com/api/retro-forum/posts";
  const res = await fetch(url);
  const data = await res.json();

  const postData = data.posts;
  postData.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div>
        <div
          class="bg-white h-16 w-16 flex justify-center items-center rounded-md"
        >
        <img class="rounded-lg" src=${item.image} alt="">
        </div>
        <div class="relative bottom-20 left-12">
          <div class="badge bg-${item.isActive ? 'green' : 'red'}-600 badge-sm relative"></div>
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
          <div class="flex gap-10 text-customGray text-xl">
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
          <div class="cursor-pointer">
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

postDataFunc();

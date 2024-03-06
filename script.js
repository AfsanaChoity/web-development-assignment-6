const latestPost = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data);
    displayLatestPost(data);
}

const displayLatestPost = data => {
    const latestPostContainer = document.getElementById('latestPost');
    data.forEach(eachData => {
        // console.log(eachData);
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = `card  bg-base-100 border-2 border-gray-300`;
        latestPostCard.innerHTML = `
        <div class=" p-6">
        <figure><img src="${eachData.cover_image
            }" class="rounded-2xl"  alt="Shoes" /></figure>
    </div>
    <div class="card-body">
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-calendar-days"></i>
            <p class="text-gray-500 font-normal text-xs mulish-font " id="date">${eachData.author.posted_date}</p>
        </div>
      <h2 class="card-title mulish-font text-xl font-extrabold">${eachData.title
            }</h2>
      <p class="text-gray-500 font-normal text-xs mulish-font ">${eachData.description} </p>
      <div class="flex items-center gap-3">
        <img src="${eachData.
                profile_image}" alt="profile-picture" class="w-11 h-11 rounded-full">
        <div >
            <h3 class="mulish-font font-bold text-xs">${eachData.author.name}</h3>
            <p id="designation" class="text-gray-500 font-normal text-xs mulish-font ">${eachData.author.designation}</p>
        </div>
      </div>
    </div>`
        const noDate = latestPostCard.querySelector("#date");
        if (!eachData.author.posted_date) {
            noDate.innerHTML = `<p class="text-gray-500 font-normal text-xs mulish-font">No Publish Date</p>`;
        }

        const noDesignation = latestPostCard.querySelector('#designation');
        if (!eachData.author.designation) {
            noDesignation.innerHTML = `<p class="text-gray-500 font-normal text-xs mulish-font">Unknown</p>`;
        }
        latestPostContainer.appendChild(latestPostCard);
    });

}

latestPost();

const allPost = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const post = await res.json();
    const posts = post.posts;
    console.log(posts);
    if (posts.length > 0){
        // console.log("1 er besi");
        document.getElementById("loading").style.display = "none";
    }
    displayAllPost(posts);

}
allPost("");
let btn = [];

const displayAllPost = posts => {
    // console.log(posts);
    let readCount = 0;
    const postContainer = document.getElementById("post-container");
    const titleContainer = document.getElementById("post-container");
    postContainer.textContent= '';
    posts.forEach(post => {
        // console.log(post);

        const postCard = document.createElement('div');
        postCard.classList = `card  bg-base-100 bg-gray-200  mb-5 h-60 lg:56 `;
        postCard.innerHTML = `
    <div class="card-body">
    <div class="flex space-x-5">
      <div class="relative">
        <img src="${post.image}" alt="profile-picture" class="w-20 h-16 rounded-2xl">
        <div id="active"  class="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
    <div>
      <div class="flex text-[#12132D] text-xs font-medium mb-2">
        <p>#<span>${post.category
            }</span></p>
        <p>Author : ${post.author.name}</p>
      </div>

      <h2 class="card-title text-xl font-bold text-[#12132D] mb-2">${post.title}</h2>
      <p class="inter-font text-xs font-normal text-gray-400">${post.
                description}</p>
     <hr class="my-3 border-1 border-gray-500">
      <div class="flex items-center">
        <i class="fa-regular fa-message"></i>
        <p>${post.
                comment_count}</p>
        <i class="fa-regular fa-eye"></i>
        <p>${post.view_count}</p>
        <i class="fa-regular fa-clock"></i>
        <p>${post.
                posted_time} min</p>
        <div class="card-actions justify-end ">
          <button id="" class="btn btn-primary bg-[#10B981] border-none rounded-full email-btn"><i class="fa-solid fa-envelope-open"></i></button>
        </div>
      </div>
      
    </div>
    </div>
    
  
   
  </div>
    `;

        const notActive = postCard.querySelector("#active");
        if (!post.isActive)
        {
            notActive.style.backgroundColor = "red";
        }
            postContainer.appendChild(postCard);

            const emailBtn = postCard.querySelector(".email-btn");
        emailBtn.addEventListener("click", function (e) {
            readCount++;
            // console.log(readCount);
            const read = document.getElementById("read-count");
            // console.log(read);
            document.getElementById("read-count").innerText = readCount;


    });
    });
    
}

const handleSearch = () => {
    const searchField = document.getElementById('search-btn').value;
    
    
    // console.log(searchField);
    allPost(searchField);
};

// const markAsRead = () => {
     
    
//     let readCount = 0;
//     btn.addEventListener("click", function (e){
//         // console.log("click korchi")
//         readCount++;
//         document.getElementById("read-count").innerText = readCount;

//     })
    
    
// }

// markAsRead();
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
        if(!eachData.author.designation){
            noDesignation.innerHTML = `<p class="text-gray-500 font-normal text-xs mulish-font">Unknown</p>`;
        }
        latestPostContainer.appendChild(latestPostCard);
    });

}

latestPost();
 const loadData = async (searchText ) =>{
    const respons = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await respons.json();
    const phone = data.data ;
    displayShow(phone )

 }

 const displayShow = (phones  ) =>{
       const containeCard = document.getElementById('cardContainer');
       containeCard.textContent = ''
       if(phones.length>11){
         const showAllData = document.getElementById('showAllData')
         showAllData.classList.remove('hidden')
       }
       
       phones = phones.slice(0,12)
       phones.forEach( phone => {
            const div = document.createElement('div')

            div.classList = `card  bg-base-100 shadow-xl`;
            div.innerHTML = `
            
            <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
          </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                <button onClick=" showData('${phone.slug}'); " class="btn btn-primary">Show Details</button>
                </div>
          </div>
             `;
              containeCard.appendChild(div)
       }); sppinerLoading(false);
 }

//   handle search button 

const handleData = ()=>{
    sppinerLoading(true)
    const inputFild = document.getElementById('inputFildData');
    const searchText = inputFild.value ;
    if(searchText == ''){
        const notDataFoun = document.getElementById('notDataFound');
        notDataFoun.classList.remove('hidden')
         const img = `https://i.pinimg.com/564x/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.jpg`
         notDataFoun.src = img;
      
        sppinerLoading(false)
    }else{
        loadData(searchText)
        inputFild.value = ''
        const notDataFoun = document.getElementById('notDataFound');
        notDataFoun.classList.add('hidden')
     }
}


const sppinerLoading = (isLoader) =>{
    const loader = document.getElementById('LoadingIcon');
    if(isLoader){
        loader.classList.remove('hidden')
    }else{
        loader.classList.add('hidden')
     }
    
}
//   show all data 

const showAllData = () =>{
     alert('Devlopment Comming Soon')
}

//  show deatils load data 

const showData =async (id) =>{
     const respons = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
     const data = await respons.json();
     const dataShow = data.data;
    //  console.log(data.data)
     modalShow.showModal()
     showModal(dataShow)
}


const showModal = (id)=>{
    
    const showData = document.getElementById('showData');
    showData.innerHTML = `
     <section class="space-y-3">
     <img src="${id.image}"  class="mx-auto">
     <h1 class="font-semibold">
      <span>${id.name}</span> 
      </h1>
      <div class="text-left">
      <p class="font-semibold">Storage :
      <span class="font-normal">${id?.mainFeatures?.storage}</span>
      </p>
     <p class="font-semibold">Display Size : 
     <span class="font-normal">${id?.mainFeatures?.displaySize}</span>
    </p>
     <p class="font-semibold">Chipset : 
     <span class="font-normal">${id?.mainFeatures?.chipSet}</span>
    </p>
     <p class="font-semibold">Memory : 
     <span class="font-normal">${id?.mainFeatures?.memory}</span>
    </p>
     <p class="font-semibold">Slug :
      <span class="font-normal">${id?.slug}</span> 
     </p>
     <p class="font-semibold">Release data :
      <span class="font-normal">${id?.releaseDate}</span>
      </p>
     <p class="font-semibold">Brand :
      <span class="font-normal">${id?.brand}</span> 
     </p>
     <p class="font-semibold">GPS :
      <span class="font-normal">${id?.others?.GPS || "No GPS"}</span>
      </p>
      </div>
      <button class="btn mt-4 bg-gray-400">Close</button>
     </section>
      `
     
}




const axios = require('axios').default;
import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";






const API_KEY = '30268576-7fd9a425996a39e9f84907e22';
const BASE_URL = 'https://pixabay.com/api/'
const QUERY = `${BASE_URL}?key=${API_KEY}`


const refs = {
    inputFieldEl: document.querySelector('.input'),
    buttonEl: document.querySelector('.button'),
    galleryRootEl: document.querySelector('.gallery'),
    searchFormEl: document.querySelector('.search-form'),
    loadMoreEl: document.querySelector('.load-more')

    
}

let incrementPage = 1;

let fetchedImagesSum = null;

let pagePaginationValue = 200;

refs.searchFormEl.addEventListener('submit', onSubmit)

refs.loadMoreEl.addEventListener('click', onClickLoadMore)

async function onClickLoadMore() {
  // incrementIncrease()
  //   try {
  //   const feedMeToMarkUpFunction = await fetchImages(refs.inputFieldEl.value)
  // createMarkUp(feedMeToMarkUpFunction)
  // } catch (error) {
  //   console.lof(error)
  // }
  jsEngine()

}


 async function onSubmit(e) {
    console.log(e)
   e.preventDefault();
   clearTheGallery()
   refs.loadMoreEl.classList.add("is-hidden");
  //  incrementIncrease()
  //  try {
  //     clearTheGallery()
  //       const feedMeToMarkUpFunction = await fetchImages(refs.inputFieldEl.value)
  //       createMarkUp(feedMeToMarkUpFunction)
  //   } catch {
  //       (error)
  //       console.log(error)
  //   }
  //  jsEngine()
   const a = await jsEngine()
   Notiflix.Notify.success(`Hooray! We found ${a}  images.`)
   refs.loadMoreEl.classList.remove("is-hidden");
}

  function createMarkUp(markUpDataArray) {
   
    console.log(markUpDataArray)
 
    refs.galleryRootEl.insertAdjacentHTML('beforeend', markUpDataArray.map(singleCardMarkUp))
     const gallery = new SimpleLightbox('.gallery a', {captionsData:'alt'});
}

function singleCardMarkUp(markUpData) {
    // console.log(markUpData)
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = markUpData
    
 
  const singleCard = `<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="photo-card">
  
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    // console.log(singleCard)

    return singleCard
    
}


function clearTheGallery() {
  refs.galleryRootEl.innerHTML = '';
  
}

function incrementIncrease() {
  incrementPage += 1;
  }



async function fetchImages(queryName) {
    
       
        const imagesDataArray = await axios.get(`${QUERY}&q=${queryName}&page=${incrementPage}&per_page=${pagePaginationValue}&image_type=photo&orientation=horizontal&safesearch=true`)
        if (imagesDataArray.data.hits.length === 0)
        {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return   }
    console.log(imagesDataArray.data)
    const imagesDataforCreateMarkUp = imagesDataArray.data
        return imagesDataforCreateMarkUp
     }



//  { webformatURL, largeImageURL, tags, likes, views, comments, downloads }

console.log('hello');



    
async function jsEngine() {
  
  
   try {
     if (500 - fetchedImagesSum < 200) {
        pagePaginationValue = 500 - fetchedImagesSum
     }
     

     const feedMeToMarkUpFunction = await fetchImages(refs.inputFieldEl.value)
     
      
     
     fetchedImagesSum += feedMeToMarkUpFunction.hits.length
 
     console.log(fetchedImagesSum)
   
     createMarkUp(feedMeToMarkUpFunction.hits)
     if (fetchedImagesSum == 500) {
       refs.loadMoreEl.classList.add("is-hidden");
       Notiflix.Notify.warning('Oops, the end of this collection :(')
       return
     }
     const totalHits = feedMeToMarkUpFunction.totalHits
     return totalHits
    } catch 
        (error)
        {console.log(error)
   }
    incrementIncrease()
}
   

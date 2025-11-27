document.querySelector('.scroll-left').addEventListener('click', ()=>{
    document.querySelector('.no-scrollbar').scrollBy({left: -320, behavior: 'smooth'});
})

document.querySelector('.scroll-right').addEventListener('click', ()=>{
    document.querySelector('.no-scrollbar').scrollBy({left: 320, behavior: 'smooth'});
})

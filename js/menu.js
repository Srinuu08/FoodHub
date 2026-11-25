const foodThumbs = [
 'photo-1565299624946-b28f40a0ae38','photo-1568901346375-23c9450c58cd','photo-1546069901-ba9599a7e63c','photo-1565958011703-44f9829ba187','photo-1567188040759-fb8a883dc6d8','photo-1513104890138-7c749659a591','photo-1555939594-58d7cb561ad1','photo-1563379091339-0324e3d3e9f9','photo-1540189549336-e6e99c3679fe','photo-1604908176997-125f25cc6f3d','photo-1569718212165-3a8278d5f624','photo-1547592180-85f173990554'
];
document.addEventListener('DOMContentLoaded', () => {
 const rows=[...document.querySelectorAll('.menu-row')];
 rows.forEach((row,i)=>{const name=row.querySelector('span')?.textContent.trim()||'Food'; const img=document.createElement('img');img.className='food-thumb';img.alt=name;img.loading='lazy';img.src=`https://images.unsplash.com/${foodThumbs[i%foodThumbs.length]}?auto=format&fit=crop&w=120&q=70`;row.insertBefore(img,row.firstChild);row.dataset.search=name.toLowerCase();});
 const search=document.getElementById('menuSearch'), status=document.getElementById('menuSearchStatus');
 function filter(){const q=search.value.trim().toLowerCase();let visible=0;rows.forEach(r=>{const match=r.dataset.search.includes(q);r.hidden=!match;visible+=match;});document.querySelectorAll('.menu-section').forEach(sec=>{sec.hidden=!sec.querySelector('.menu-row:not([hidden])');});status.textContent=q?`${visible} dish${visible===1?'':'es'} found`:'';}
 search?.addEventListener('input',filter);document.getElementById('clearMenuSearch')?.addEventListener('click',()=>{search.value='';filter();search.focus();});
});
function addtocart(foodName, price, button) {
 let cart;try{cart=JSON.parse(localStorage.getItem('cart')||'[]')}catch{cart=[]}
 const existing=cart.find(item=>item.name===foodName);if(existing)existing.quantity+=1;else cart.push({name:foodName,price:Number(price),quantity:1});
 localStorage.setItem('cart',JSON.stringify(cart));window.dispatchEvent(new Event('foodhub-cart-updated'));
 if(button){const original=button.textContent;button.textContent='✓ Added';button.classList.add('added');setTimeout(()=>{button.textContent=original;button.classList.remove('added')},1200)}
 showCartToast(`${foodName} added to cart!`);
}
function showCartToast(message){let toast=document.getElementById('cartToast');if(!toast){toast=document.createElement('div');toast.id='cartToast';document.body.appendChild(toast)}toast.textContent='🛒 '+message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}

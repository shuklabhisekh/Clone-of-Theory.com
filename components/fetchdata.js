async function getdata(query){
	let res = await fetch(`https://zappos-realtime-data.p.rapidapi.com/search.php?keyword=${query}&page=1`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "zappos-realtime-data.p.rapidapi.com",
			"x-rapidapi-key": "1047ad7af7mshd6d7d9e36e5b7a9p1c04d0jsn1d8ffbb167dd"
		}
	})

	let response = await res.json()
	appendData(response.results)
}

function appendData(items) {
	let maindiv = document.querySelector("#SearchResult")
	console.log(maindiv)
	document.querySelector("#SearchResult").innerHTML = ""
	items.map((item)=>{
		
        let div = document.createElement("div")
		div.style.cursor = "pointer"
		let imgdiv = document.createElement("div")
		imgdiv.setAttribute("class" , "product-img")
		let icon = document.createElement("span")
		icon.innerHTML = `<i class="fa fa-heart-o heart-icon" style="font-size:20px"></i>`
		let img = document.createElement("img")
		img.src = item.thumbnailImageUrl

		//HOVER Add TO CART
		let hoverdiv = document.createElement("div")
		hoverdiv.setAttribute("class" , "hoverCart")
		hoverdiv.innerText = "Quick Add"
		hoverdiv.style.display = "none"

        //HOVER CHANGE IMAGES
		imgdiv.addEventListener("mouseover" , function(){
			hoverdiv.style.display = "block"
		})

		imgdiv.addEventListener("mouseout" , function() {
			hoverdiv.style.display = "none"
		})

        //STRONGING DATA FOR ADD TO CART
		imgdiv.addEventListener("click" , function(){
            addTocart(item)
       })

        let detail_div = document.createElement("div")
		detail_div.setAttribute("class" , "products-name")
		
		let title = document.createElement("p")
		title.innerText = item.productName

		let price = document.createElement("p")
		price.innerText = item.originalPrice

		
		
		if(item.thumbnailImageUrl != null){
            imgdiv.append(img , hoverdiv , icon)
		    detail_div.append(title , price)
		    div.append(imgdiv , detail_div)
		    document.querySelector("#SearchResult").append(div)
		}
		
	})
}

var cart=JSON.parse(localStorage.getItem("cart")) || [];
function addTocart(product){
	console.log(product)
	cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.querySelector(".cart-count").textContent = cart.length
}
export default getdata;
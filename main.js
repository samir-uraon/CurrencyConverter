const BASE_URL =
  "https://api.fastforex.io/fetch-one";
const commonconvert="from=USD&to=INR"
const api_key="api_key=1e7fa303eb-a838390e84-sovrkz"

var amount=document.querySelector(".upperside input")
var select=document.querySelectorAll("select")
var but=document.querySelector("button")
var data=document.querySelector("#showdata")


select.forEach(element => {
          for (element2 in countryList) {
               
                 let newele=document.createElement("option")
                 newele.innerHTML=countryList[element2] 
                 newele.value=element2
                 if(element.name=="from" && element2=="USD"){
                    newele.selected="selected"
                 }  
                 if(element.name=="to" && element2=="INR"){
                    newele.selected="selected"
                 }  
                 element.appendChild(newele)
          }
          element.addEventListener("change",()=>{
                    let country=countryList[element.value]
                    let newimageurl=`https://flagsapi.com/${country}/flat/64.png`
                    element.parentElement.querySelector("img").src=newimageurl
          })


});

window.addEventListener("load",async ()=>{

   let url=`${BASE_URL}?${commonconvert}&${api_key}`
    let response=await fetch(url)
    let data2=await response.json()
    let data3=data2.result["INR"];
    let data4=eval(amount.value * data3)
    data.innerHTML=`${"1"} ${"USD"} = ${data4} ${"INR"}`
    
})

but.addEventListener("click",async (evt)=>
{     
      evt.preventDefault()
      
      let fromselect=document.querySelector("select[name='from']")
      let toselect=document.querySelector("select[name='to']") 
      let convert=`from=${fromselect.value}&to=${toselect.value}`
if(Number(amount.value)<1){
   amount.value=1
}
      let url=`${BASE_URL}?${convert}&${api_key}`
       let response=await fetch(url)
       let data2=await response.json()
       let data3=data2.result[toselect.value];
       let data4=eval(amount.value * data3)
       data.innerHTML=`${amount.value} ${fromselect.value} = ${data4} ${toselect.value}`
       
})
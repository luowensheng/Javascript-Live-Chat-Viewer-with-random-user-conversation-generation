
document.addEventListener("DOMContentLoaded", start)

function randomNumber(max, min=0){
  return Math.floor(Math.random()*(max-min)+min)
}

function start(){

  const container = document.getElementById("phone-screen"); 
  let url = window.location.href+"message"
  
  const fetchMessages = async()=>{
        const data = await getData(url)
        createChatItem(container, data)
        }

  let generate = false
  setInterval(()=>{
        setTimeout(()=>generate = !generate, 
                        randomNumber(20, 5)*1000
                  ) 
        if (generate)
            fetchMessages()
          }, 1000)

}


async function getData(url){

  let response = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    let json = await response.json()
    return json;
} 


function createPhone(parent){

    const phone = createElement('div', parent)
    createElement('div', phone, {class:"top-phone"}, "Conversations")
    const bottom_phone = createElement('div', phone, {class:"bottom-phone"} )
    const phone_input = createElement('div', bottom_phone, {class:"phone-input"} )
    createElement('textarea', phone_input, {class:"phone-input"} )

   return phone

}

function getDate(){
    let date = new Date().toLocaleTimeString().split(":")
    let am_pm = (date[2].includes("AM"))? 'am': 'pm'
    return `${date[0]}:${date[1]}${am_pm}`
}

function createChatItem(parent, data){

    let src=`https://randomuser.me/api/portraits/thumb/${data['gender']}/${data['id']}.jpg`
    let personName = data['first_name'] + " " + data['last_name']
    let message  = data['message']
    let date = getDate()

    const chatItem = createElement('li', parent, {class: "chat-item"})
    createElement('img', chatItem, {class: "person-img", src:src})
    const  chatText = createElement('div', chatItem, {class: "chat-text"})
    createElement('h1', chatText, {class: "person-name"}, personName)
    createElement('p', chatText, {class: "message"}, message)
    createElement('span', chatItem, {class: "message-date"}, date)

    parent.scrollTop = parent.scrollHeight;
    return chatItem
}


function createElement(tag, parent, content=null, textContent=null){
  let el = document.createElement(tag)

  parent.appendChild(el)
  
  if (textContent!=null)
      el.textContent = textContent
      
  if (content!=null){
    for( let key of Object.keys(content)){
      el.setAttribute(key, content[key])
    }

  }
  return el
}



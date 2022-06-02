# Live Chat Viewer




1. *User generation*
    1. Generate a list of users by randomly generating names from a names dataset
    2. Each user has a first and last name, a gender and an ID 
    3. A converstion dataset is used to assign each user to a conversation
    4. the  [random user api](https://randomuser.me/api) is used to assign each user a profile picture

### Usage
```javascript
function getRandomPerson(){
    let person = {}
    if (Math.random()>0.5) {
        COUNTER.male+=1
        person['id'] = COUNTER.male
        person['gender'] = 'men'
        person['first_name'] = randomChoice(names['male_names']).replace("\r", "")

    } else {
        COUNTER.female+=1
        person['id'] = COUNTER.female
        person['gender'] = 'women'
        person['first_name'] = randomChoice(names['female_names']).replace("\r", "")       
    }
    person['last_name'] = randomChoice(names['last_names']).replace("\r", "")

    return person;
}
```

2. *Frontend*
1. Vanilla js used to create all the html components
1. Css is used to animate the background image
1. A request is sent at a random time to the server for a new message
1. Upon receiving the new message, the contents are used to create a chat item which would be placed on the screen
### Usage
```javascript
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
```

3. *Backend*

1. Express js is used
1. Using the generated data, a dataset is constructor
1. A generator is used to generate 1 item for every get request from the frontend client.
2. 
   ``` javascript
   function *getNextMessage(){
    const dataset = generateDataset(100)
    while (true)
        for(let msg of dataset){
            yield msg
        }
    }
   ```

### Usage

``` javascript
const messages = getNextMessage()

const port = 8090

const app = express();
app.use(express.static('public'));


app.get('/', (req, res) =>{
    res.render('index')
})

app.get("/message", (req, res)=>{
    let msg = messages.next().value
    res.json(msg)
})

app.listen(port, ()=>{
    console.log(`server is listening at http://localhost:${port}`)
})
```
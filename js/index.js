let form = document.querySelector('#github-form')
let ul = document.querySelector('#user-list')
form.addEventListener('submit', handleForm)


function handleForm(e){
  e.preventDefault()
  let user = e.target.search.value
  fetch(`https://api.github.com/search/users?q=${user}`)
    .then( resp => resp.json() )
    .then( gitData => gitData.items.forEach( user => renderUsers(user)) )
  form.reset()
}

function renderUsers(user){
  let url = user.login
  let li = document.createElement('li')
  let p = document.createElement('p')
  p.style.display = 'inline'
  p.innerHTML = `${user.login}<br><br>`
  let img = document.createElement('img')
  img.width = '100'
  img.height = '100'
  img.style.marginRight = '20'
  img.style.marginTop = '10'
  img.src = user.avatar_url
  let a = document.createElement('a')
  a.href = user.html_url
  a.target = "_blank"
  a.innerHTML = `This is a link to this user's profile: `
  a.style.marginRight = '10'
  let newlist = document.createElement('ul')
  li.append(img, a, p, newlist) //THIS IS ALL TO SET UP INFORMATIO ABOUT THE USER

  p.addEventListener('click', function(e){ //WE GET THE REPOSITORIES
    let newLi = document.createElement('li')
    e.target.innerHTML = e.target.innerHTML+`This is a list of this user's repositories: <br>`
    fetch(`https://api.github.com/users/${url}/repos`)
    .then(resp => resp.json() )
    .then(repo => {
      repo.forEach( item => {
        let a = document.createElement('a')
        a.href = item.html_url
        a.target = "_blank"
        a.innerHTML = `${item.name}<br>`
        newLi.appendChild(a)
        newlist.appendChild(newLi)
      })
    } )
  }, {once: true})
  ul.appendChild(li)
}


## Tab Result

[lucid chart](https://app.lucidchart.com/documents/edit/b0e2f9bd-8ba5-4529-9c7b-ff945988fe13/gMkxIBQur9CX#?folder_id=home&browser=icon)

ctrl + click to open it in a new browser


<img src="https://github.com/MV88/tab-results/blob/master/public/demo_page.png?raw=true" alt ="demo preview"/>


# TODO

- [x] add new result
  - [x] update frontend after a new result has been added
- [ ] add https support, todo fix err invalid certificate error
- [x] add authentication
  - [x] ADD HEADER
  - [x] [express.jwt](https://www.npmjs.com/package/express-jwt)
    - [ ] store webtoken in a cookie
  - [x] [TO READ](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/) 
  - [x] [EXAMPLE](https://github.com/juffalow/express-jwt-example) 
  - [x] on the right corner
    - [x] login form 
    - [x] login button 
    - [x] register button 
    - [x] register form
    - [ ] if logged --> avatar
    - [x] if logged --> username
    - [x] add registration form
- [x] add logout button
- [ ] store user session with token  <--- wip2
- [x] block non authenticated part of the website
- [x] add user token to requests
  - [x] add a new result request
- [ ] spinner and loading messages, feedbacks
- [x] chart of results
- [ ] filtering
- [ ] pagination
- [ ] searching
- [ ] querying
  - [x] % win, % lose
  - [ ] average day, score
  - [x] pr
- [ ] sorting
- [ ] integrate this with twitch chat
  - [ ] if we use cookie and jwt, we can allow only the broadcaster to use the commands to add data, or update stuff
  - [ ] but the commands to fetch data can be used from everyone
- [x] dark mode
- [ ] integrate SASS <-- wip

### LOW PRIORITY 
- [ ] add runtime error handling
- [ ] add priettier
- [ ] add picture in register form

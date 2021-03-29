
const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        // bring in info
        const db = req.app.get('db');
        const {username, password} = req.body

        // username
        const user = await db.user.find_user_by_username(username)
        if (user[0]) {
            return res.status(400).send('Username already exists')
        }

        // password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.create_user ({ username, hash, profile: `https://robohash.org/${username}.png`})
        

        // session
        req.session.user = newUser[0]

        // send response
        res.status(200).send(req.session.user)

    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body

        const users = await db.user.find_user_by_username(username)

        if (!user){
            return res.status(401).send(`Incorrect username or password!`)
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated){
            return res.status(403).send('Incorrect password!');
        }
        req.session.user = user
        return res.send(req.session.user)

    },

    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send()
    },

    getUser: async (req, res) => {
        req.app.get('db').user.find_user_by_username(req.session.username)
        
        .then(user => res.status(200).send(user[0]))
    }



}
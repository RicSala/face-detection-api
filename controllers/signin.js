const handlesignin = (req, res, db, bcrypt) => {
    // TODO you can use both: send() and json(), but json() comes with some added features, so we will be using that one from now on
       
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json("UNABLE TO LOGIN")
    }
    
    db('users').join('login', 'users.email', '=', 'login.email').where('users.email',email)
    .select('login.hash').then( pwd => {
            const isValid = bcrypt.compareSync( password, pwd[0].hash)
            if (isValid) {
                db.select('*').from('users').where('email', email).
                then( user => {
                    res.json(user[0])
                }).catch(err => res.status(400).json("UNABLE TO GET USER"))
            } else {
                res.status(400).json("ERROR TRYING TO SIGN IN") // Why do we need this? --> because an empty array is not false, and the previous lines would return an empty array if the user doesn't enter proper credetials!
            }    
        }

    ).catch(err => res.status(400).json("ERROR TRYING TO SIGN IN"))
}

export default handlesignin;
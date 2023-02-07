const handleRegister = (req, res, db, bcrypt) => {

    const { name, email, password } = req.body; //destructuring: {var1, var2, var3} = object with properties with the same name

    if (!name || !email || !password) {
        return res.status(400).json("INCORRECT FORM SUBMISSION")
    }

    const hash = bcrypt.hashSync(password);
    // TODO review "transactions"

    db.transaction(trx => {
        trx('login').insert({
            hash: hash,
            email: email,
        }).returning('email')
        .then (loginEmail => {

            trx('users').insert({
                name: name,
                email: loginEmail[0].email,
                joined: new Date() 
            }).returning('*'). //returning tells tells db what it should return when the instruction is complete.
            then(response => {
                res.json(response[0]) // it returns an array of one (we are only registering one user), so we need to select [0]
            });

        })
        .then(trx.commit).catch(trx.rollback);
    }).catch(e => res.status(400).json("UNABLE TO REGISTER"))
}
export default handleRegister;
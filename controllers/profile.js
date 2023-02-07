const handleProfile = (req, res, db) => {
    
    const { id } = req.params;

    db.select('*').from('users').where('id', id).returning('*').
        then(user => {
            if (user.length) {
                res.status(200).json(user[0])
            } else {
                res.status(400).json("UNABLE TO FIND")
            }}
            ).
        catch(e => res.status(400).json("UNABLE TO FIND - ERROR GETTING USER"))

}

export default handleProfile;
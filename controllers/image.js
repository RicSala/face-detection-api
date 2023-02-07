const handleImage = (req, res, db) => {
    
    const id = req.body.id

    db('users').where('id', id).increment('entries', 1).
    returning('entries').
    then(entries => res.json(entries[0].entries)).
    catch(e => res.status(400).json("UNABLE TO INCREASE ENTRIES"))

}

export default handleImage;
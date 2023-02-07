
// const calculatePosition = (data) => {
//     const faces = data.outputs[0].data.regions[0].region_info.bounding_box;
//     const top = faces.top_row * 100 + "%";
//     const left = faces.left_col * 100 + "%"
//     const width = (faces.right_col - faces.left_col) * 100 + "%"
//     const height = (faces.bottom_row - faces.top_row) * 100 + "%"
//     return { top: top, left: left, width: width, height: height }
// }

const handleDetectFaces = (req, res) => {
    
    const url = req.body.input;

    let faceBoxes = {};
        
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    
        //////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    /////////////////////////////////////////////////////////////////////////////////////////
    
    const USER_ID = 'ricsala';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = process.env.CLARIFAI_PAT;
    const APP_ID = 'face-recognition';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": url
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    
        
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          const faces = result.outputs[0].data.regions[0].region_info.bounding_box;
          const top = faces.top_row * 100 + "%";
          const left = faces.left_col * 100 + "%"
          const width = (faces.right_col - faces.left_col) * 100 + "%"
          const height = (faces.bottom_row - faces.top_row) * 100 + "%"
          faceBoxes = { top: top, left: left, width: width, height: height }
        }).then(response => {
            res.json(faceBoxes)
        }) 
        .catch(error => console.log('error', error));
    
    
    }
    
    
export default handleDetectFaces;

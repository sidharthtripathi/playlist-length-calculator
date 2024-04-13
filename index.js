const { getVideoDurationInSeconds } = require('get-video-duration')
const fs = require('fs');
const path = require('path');
let vidFiles = [];

function recursiveVideosFinder(srcFolder){
	const filesAndFolders = fs.readdirSync(srcFolder);
	filesAndFolders.forEach((item)=>{
		let stats = fs.statSync(path.join(srcFolder,item))
		if(stats.isFile()) {
			if(item.slice(-4) === ".mp4")
			vidFiles.push(path.join(srcFolder,item))
		}
		else{
			recursiveVideosFinder(path.join(srcFolder,item))
		}
	})
	

}



async function getPlaylistDuration(){
	let srcFolder = process.argv[2]
	if(!srcFolder) srcFolder = __dirname;
	recursiveVideosFinder(srcFolder)
	let length = 0;
	for(let i = 0 ; i<vidFiles.length ; i++){
		let timeInSeconds = await getVideoDurationInSeconds(vidFiles[i]);
		length = length + timeInSeconds;
	}
	console.log(length / 60);
}

getPlaylistDuration()

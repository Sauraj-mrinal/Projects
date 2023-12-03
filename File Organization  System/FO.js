// ----------------------------------------------------------------
//                                   File System Organizer 
// ----------------------------------------------------------------

// features of the Project
// if u have numbers Files in a folder and they are not properly arranged
// so you can use this tool to arrange them in a specific folder/Directory according to thair extension
// like textfile willl go into text File Folder , .exe file go into exe folder 
// and at the end we have a arranged SET of file in specific folder 



//------------------------------------------------------------------------------------------------------------------
//-----------------------**********************----------------------------------------------------------------
//-----------------------**********************----------------------------------------------------------------

// js me input array ke format me jata hai and this array we can process through-> process.argv




// if u want to take an input through CMD 
// it it will come like Array format


// let input  =  process.argv[2]; // whatever u write in javaScript it 
// javaScript will take an input in process.argv
// and it is like an array

// so it is automatically initialized with 
// argv[0] = node 
// argv[1] = FO.js 
// argv[2] = Mrinal

// if we want to print my name then we need to write it like 
// argv[2] =

//console.log(input);
//---------------------------------------------------------------------------------------------------------------------------

// let input  =  process.argv;
// argv[0] = node (command)
// argv[1] = FO.js 
// argv[2] = orgsnize
//argv[3] = folderPath


const fs = require('fs');
const path = require('path');
const { types } = require('util');

// so we will ise slice--> method of array

console.log('hii this is mrinal');
let input  =  process.argv.slice(2);
let inputArray = input;
console.log(inputArray);// ye zero index and 1 index ko chhor ke baki ko array me de dega as a input variable 

let type ={
    media: ["mp4", "mkv", "mp3","jpeg"], 
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "adt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex"
    ],
    app: ["exe", "dmg" , "pkg", "deb"]
}





let command = inputArray[0];// to take command 

// organize
// [ 'organize' ]
//Organize Implemented
switch(command){
     case 'tree':
        console.log('tree Implemented');
        break;

    case 'organize':
        console.log('Organize Implemented');
        organizeFn(inputArray[1])
        console.log('hii tihs is input area content '+ inputArray[1]);
        break;
    
    case 'help':
        helpFun();
        console.log('Help Implemented');
        break;
}

// Help function will list all the ways by which you can run the commands of this project.
function helpFun(){
    console.log(`list of all the commands->
    
                              1)Tree - node FO.js tree <directory path>
                              2) organize - node FO.js organize <directory path>
                              3) help - node FO.js help <directory path>
    `);
}

// Organize function will organize all your target folder's in a differnt  folder ACCORDING to thair extension

function organizeFn(dirPath){// we need a directory path as a parameter

    //console.log(dirPath);
    let desPath;
//
    if(dirPath==undefined){
        console.log('please enter a directory path');
        return;
    }// check whether directory path is passes or not simple return 

    let doesExist = fs.existsSync(dirPath);// it eill return true if exists or falase if not exists

    // so if my directory esist => true then we have o make a 
    if(doesExist == true){
        destPath = path.join(dirPath, 'Organized_Files')
    //    path.join(dirPath,)
// we created a path for orgnized Files Folder 


// check whether in the given destPath does a folder exist with name and if does not exist then A FOLDER 
        if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath);
            console.log('created successfully');
        }
        else{
            console.log('Folder already exists');
        }
        
    }
    else{
        console.log('please enter a valid path');
    }
    organizeHelper(dirPath , destPath);

}

// Day -11
// when it call my all file will be organized. 
function organizeHelper(src , dest){
    // to get the content of the folder we need to write like .

        let childName  = fs.readdirSync(src);


        // we first identify file and folder separately 
      //  console.log(childName); 

        // output --> it is in the array form 
        // [
        //     'mca.pdf',
        //     'newTxtFile.txt',
        //     'Organized_Files',
        //     'Pi7_Image_WhatsAppImage2023-11-14at11.24.08PM.jpeg',
        //     'Postman-win64-Setup.exe',
        //     'q24-delete-at-specified-index.zip'
        //   ]

        //------------------------------------------------------------------
        //so we can use for loop 

        for(let i=0; i<childName.length; i++) {
           // so we find path first 
           let childAddress = path.join(src, childName[i]);
        //    console.log(childAddress);
        //    console.log('--------------------------------');
           // output
            //E:\pepDev\DummyFolder\mca.pdf
            // E:\pepDev\DummyFolder\newTxtFile.txt
            // E:\pepDev\DummyFolder\Organized_Files
            // E:\pepDev\DummyFolder\Pi7_Image_WhatsAppImage2023-11-14at11.24.08PM.jpeg
            // E:\pepDev\DummyFolder\Postman-win64-Setup.exe
            // E:\pepDev\DummyFolder\q24-delete-at-specified-index.zip

            isFile = fs.lstatSync(childAddress).isFile();

            if(isFile == true) {
               let fileCategory = getCategory(childName[i]);
              // console.log(childName[i]+ '  belongs to ' + fileCategory);
               sendFiles(childAddress ,dest,fileCategory)
            }
        }
}

function getCategory(FileName){
    // we extract the extension name of the target file 
   let ext = path.extname(FileName).slice(1)
   //    console.log(ext);

  for(let key in type) {
    // here we find out categorie type array
       let cTypeArrr = type[key]
       //console.log( cTypeArrr);


       for(let i=0; i<cTypeArrr.length; i++) {
        if(ext == cTypeArrr[i]){
           return key;
        }
     }

    }


   return 'others';


}

function sendFiles(srcFilePath, dest, fileCategory) {
    // we will create path for each category type encountered to create folders of their names
    let catPath = path.join(dest, fileCategory);
  
    //D:\FJP4\test folder\organized_files\media
    //D:\FJP4 \test folder\organized_files\documents
  
    if (fs.existsSync(catPath) == false) {
      fs.mkdirSync(catPath);
    }
  
    let fileName = path.basename(srcFilePath);
  
    // we took out the basename of all the files
  
    let destFilePath = path.join(catPath, fileName);
  
    fs.copyFileSync(srcFilePath, destFilePath);
  
    fs.unlinkSync(srcFilePath);
  
    console.log("Files Organized");
  }
  
 







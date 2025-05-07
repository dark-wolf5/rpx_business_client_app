export var android_i = false;
export var iphone_i = false;

/* Uncomment this for cordova builds
if(device != undefined){
    
    if(device.platform == 'Android'){
        android_i = true;
    } else if(device.platform == 'Iphone'){
        iphone_i = true;
    } else {
        android_i = false;
        iphone_i = false; 
    }

} else {
    android_i = false;
    iphone_i = false;
}

/*
export function callFilePermissionsAndroid(){
    window.JsInter.accessFile("rpxAndroidFilePermissions");
    return;
}

window.rpxAndroidFilePermissions = function(result){
    console.log("File Permissions : ", result);
}

export function accesLocationAndroid(){
    window.JsInter.accessLoc();
}

export function accesCameraAndroid(){
    window.JsInter.accessCam("rpxAccessCameraCallback");
}

window.rpxAccessCameraCallback = function(result){
    console.log("Camera Permissions : ", result);
}

export function accesMicAndroid(){
    window.JsInter.accessLoc();
}


window.rpxSaveToken = function(the_token){
    window.alert("Trying to save token.", the_token);
}

window.rpxLocationAccepted = function(){
    //window.alert("Rpx location accepted.");    
}*/

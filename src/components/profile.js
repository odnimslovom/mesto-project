import {requestUserData} from "./api";
import {updateAvatar, updateProfile,} from "./modal";


export function getUserData(){
  requestUserData()
    .then((data) => {
      updateProfile(data.name, data.about);
      updateAvatar(data.avatar);
    }).catch((error) => console.log(`Error: ${error.message}!!!`));
}





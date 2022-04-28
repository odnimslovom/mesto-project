import {requestUserData} from "./api";
import {updateAvatar, updateProfile,} from "./modal";
import {renderStartCards} from "./cards";

let userId;

export function getUserData(){
  requestUserData()
    .then((data) => {
      userId = data._id;
      updateProfile(data.name, data.about);
      updateAvatar(data.avatar);
      renderStartCards(userId);
    }).catch((error) => console.log(`Error: ${error.message}!!!`));
}





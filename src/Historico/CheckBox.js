import styled from "styled-components";

export default function CheckBox({habitDone}){

    if(habitDone){
        return(
           <ion-icon name="checkmark-sharp"></ion-icon>
        );
    }
    else{
        return(
            <ion-icon name="close-outline"></ion-icon>
        );
    }
}






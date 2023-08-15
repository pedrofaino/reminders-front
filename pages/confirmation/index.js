import Button from "@/components/button";
import allActions from "@/store/actions";
import Link from "next/link";
import { useDispatch } from "react-redux";


const confirmation = () =>{
    const dispatch = useDispatch();
    
    const access = () =>{
        const url = window.location.href;
        const urlObj = new URL(url)
        const searchParams = urlObj.searchParams;
        const email = searchParams.get("email");
        dispatch(allActions.loginActions.confirmation(email))
    }

    return(
        <>
            <div className="pt-20 bg-primary flex items-center justify-center">
                <p className="text-black mr-2">Presione el siguiente boton para confirmar su correo:</p>
                <Link href='/main'>
                    <Button 
                        label="Confirmar"
                        onClick={()=>access()}
                    ></Button>
                </Link>
            </div>
        </>
    )
}

export default confirmation;

import LoginHeader from "../../src/components/LoginPage/LoginHeader";
import FormLogin from "../../src/components/LoginPage/FormLogin";
import ImageForm from "../../src/components/LoginPage/ImageForm";
import { routerPrivate } from "../../src/components/routerConstant/Constant";
import { useRouter } from "next/router";
export default function index() {
    const router = useRouter()
 
    return (

        <>
            <LoginHeader />
            <div className=' absolute left-0 w-full overflow-x-hidden signup-view top-0 bg-purple-1 h-full'>
                <div className='flex mt-[10rem] h-[36rem] rounded-[0.5rem] md:w-fit mx-auto bg-[#fff]'>
                    <FormLogin />
                    <ImageForm />
                </div>
            </div>
        </>
    )
}

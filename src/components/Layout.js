
import Head from "next/head";
import React, { useState } from 'react'
import { useRouter } from "next/router";
import Header from "./Header";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar/SearchBar";
import ModalCreate from "./common/Navbar/ModalCreate";
import HeaderPlayer from "./HeaderPlayer";

export const Layout = ({ children }) => {
    const router = useRouter()
    const [show, setShow] = useState(false)

    // Show modal create
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <Head>

                <meta charset="UTF-8" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,800&amp;display=swap" rel="stylesheet" as="style" />
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
                <title>Quizizz</title>

            </Head>
            <div className="flex w-full h-full">

                {/*Admin */}
                {router.pathname === "/login"
                    || router.pathname === '/'
                    || router.pathname === '/admin/quiz/creator'
                    || router.pathname === '/admin/quiz/creator/createQuestion'
                    || router.pathname === '/signup'
                    || router.pathname === '/join' ? "" : <Navbar showModal={showModal} setShowModal={setShowModal} />}

                {router.pathname === "/login"
                    || router.pathname === '/'
                    || router.pathname === '/admin/quiz/creator'
                    || router.pathname === '/admin/quiz/creator/createQuestion'
                    || router.pathname === '/signup'
                    || router.pathname === '/join' ? "" : <SearchBar show={show} setShow={setShow} />}

                {/*Player */}
               <div className="font-quick">
               {router.pathname === '/join' && <HeaderPlayer />}
               </div>
                {children}


                {show && <div onClick={() => setShow(false)} className='fixed top-0 bottom-0 w-full h-full bg-[#09090980] z-[1000]'></div>}
                {showModal && <ModalCreate showModal={showModal} setShowModal={setShowModal} />}

            </div>
        </div>
    )
}

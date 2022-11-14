import Image from "next/image"

import appPreviewImg from "../assets/app-nlw-copa-preview.png"
import avatars from "../assets/users-avatar-example.png"
import logo from "../assets/logo.svg"
import iconCheckImg from "../assets/icon-check.svg"
import { api } from "../connections/api"
import { FormEvent, useState } from "react"

interface HomeProps {
    pollsCount: number | undefined;
    guessesCount: number | undefined;
    usersCount: number | undefined;
}

export default function Home(props: HomeProps) {
    const [poolsTitle, setPoolsTitle] = useState("")
    async function submitPool(event:FormEvent) {
        event.preventDefault()

        try{
            const res = await api.post("pools",{title:poolsTitle})
            const { code } = res.data

            await navigator.clipboard.writeText(code)

            alert(`Bolão ${poolsTitle} criado com sucesso, o código foi copiado  para a aréa de transferência!`)
            setPoolsTitle("")
        }catch(error){
            console.log(error)
            alert("Falha ao criar o bolão, tente novamente!")
        }
    }

    return (
        <section className="flex w-full h-screen justify-center items-center gap-28">
            <main className="text-white">
                <Image src={logo} alt="logo do COPA" className="mb-16" />

                <h1 className=" max-w-[490px] font-bold text-5xl leading-[3.75rem] text-white">
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </h1>

                <div className="flex w-full my-10 items-center gap-2">
                    <Image src={avatars} alt="Foto das Pessoas que utiliza o COPA" quality={100} />
                    <p className="font-bold text-xl">
                        <span className="text-[#129E57]">{" +"+ props.usersCount! * 133} </span>
                        pessoas já estão usando
                    </p>
                </div>

                <form className="flex max-h-[19rem] w-full gap-2 items-center" onSubmit={submitPool}>
                    <input
                        className="flex-1 py-4 px-6 text-sm bg-[#202024] border border-[#323238] rounded placeholder:text-[#c4c4cc]"
                        type="text"
                        placeholder="Qual nome do seu bolão?"
                        onChange={event => setPoolsTitle(event.target.value)}
                        value={poolsTitle}
                        name="title"
                        id="title"
                     />
                    <button className=" py-4 px-8 rounded bg-[#F7DD43] text-[#09090A] font-bold text-sm" type="submit">CRIAR MEU BOLÃO</button>
                </form>
                <p className="mt-4 text-[#8D8D99] leading-6">
                    Após criar seu bolão, você receberá um código único que <br /> poderá usar para convidar outras pessoas 🚀
                </p>

                <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100 ">
                    <div className="flex items-center gap-6">
                        <Image src={iconCheckImg} alt="" />
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl">+{props.pollsCount! * 13}</span>
                            <span>Bolões criados</span>
                        </div>
                    </div>

                    <div className="w-px h-14 bg-gray-600" />

                    <div className="flex items-center gap-6">
                        <Image src={iconCheckImg} alt="" />
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl">+{props.guessesCount! * 233}</span>
                            <span>Palpites enviados</span>
                        </div>
                    </div>
                </div>

            </main>
            <Image
                src={appPreviewImg}
                alt="Previa do mobile do APP COPA"
                quality={100}
                className="object-contain"
            />
        </section>
    )
}

export const getServerSideProps = async () => {
    try {
        const [pollsCount, guessesCount, usersCount] = await Promise.all([
            api.get("pools/count"),
            api.get("guesses/count"),
            api.get("users/count"),

        ])
        return {
            props: {
                pollsCount: pollsCount.data.count,
                guessesCount: guessesCount.data.count,
                usersCount: usersCount.data.count,
            }
        }
    } catch (error) {
        console.log(error)
    }


}

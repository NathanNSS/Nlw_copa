interface HomeProps{
    count: number | undefined
}

export default function Home(props : HomeProps) {

    return (
        <main>
            <h1>Contagem:{props.count}</h1>
        </main>
    )
}

export const getServerSideProps = async ()=>{
    const res = await  fetch("http://localhost:3333/pools/count")
    const data = await res.json()

    return{
        props:{
            count: data
        }
    }
}

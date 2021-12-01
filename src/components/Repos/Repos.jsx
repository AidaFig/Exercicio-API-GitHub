import { useState, useEffect, } from "react";
import { Title } from "../Title/Title";
import axios from "axios";
import "./ReposStyle.css";

export const Repos = () => {
    const [repos, setRepos] = useState([])
    const [busca, setBusca] = useState('')
    const [filterRepos, setFilterRepos] = useState([])

    useEffect (() => {
        setFilterRepos(
            repos.filter(item => {
                return item.name.includes(busca)
            })
        )
    }, [repos, busca])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.github.com/users/AidaFig/repos')
            const data = await response.data
            setRepos(data)
        }
        fetchData()
    }, [])

    return (
        <div className="card-container">
        <Title>Meus Repositórios</Title>
        <input placeholder="Digite o nome de um repositório" onChange={e => {setBusca(e.target.value)}} className="input"/>
        <ul className="card-box">
            {filterRepos.map(item =>
                <li className="cards" key={item.key}>{item.name}</li>
            )}
        </ul>
        </div>    
    )
}
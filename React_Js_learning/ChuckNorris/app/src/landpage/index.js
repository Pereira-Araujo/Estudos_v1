import axios from 'axios'
import {useState, useEffect} from 'react'

import {Container,Card,Chuck, BlockLeft,BlockRight,Search,ButtonSearch, RandomButtom,TagContainer,Tag,SearchContainer} from './style'

import Chuck_Avatar from '../assets/chuck_image.png'


function Home() {
   let jokeCategory

    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [random, setRandom] = useState('')
    const [filter, setFilter]= useState([])
    const [change, setChange] = useState(false)
     
    const getRandom = ()=>{
        axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((response) => {
          setRandom(response.data.value)
          setChange(false)

        })
    }

    const onChangeFind = (event)=>{
      setSearch(event.target.value)

    }

    const find = (event)=>{
      event.preventDefault();
      axios.get(`https://api.chucknorris.io/jokes/search?query=${search}`).then((response)=>{
        setChange(true)
        setFilter(response.data.result)
        setSearch('')
      })
    }

    const getCategories= ()=>{
        axios.get('https://api.chucknorris.io/jokes/categories').then((response)=>{
          setCategories(response.data)
        })
          }

    const changeCategories = (joke) =>{
     
       jokeCategory = joke

      getJokesByCategories()

    }      

    const  getJokesByCategories = async ()=>{

      const result = await axios.get(`https://api.chucknorris.io/jokes/random?category=${jokeCategory}`)
      setRandom(result.data.value)
      setChange(false)

        }
   

   const categoriesMapped = categories.map((nameCategory)=>{
    return(
        <Tag key={nameCategory} onClick={() => changeCategories(nameCategory)}>{nameCategory}</Tag>
       
    )})

    const searchFiltered = filter.map((item)=>{
      return <p>{item.value}</p>
        
    })

       useEffect(()=>{
           getCategories()
      },[])

    return (
      <Container>
     <BlockLeft>
         <Card>
         <h1>Chuck Norris Jokes</h1>
         <Chuck alt={'Rosto do chuck Norris sorrindo'} src={Chuck_Avatar}/>
         </Card>
        
         <SearchContainer onSubmit={find}>
         <Search placeholder={'search'}onChange={onChangeFind} value={search}/><ButtonSearch type={'submit'}>go</ButtonSearch>
         </SearchContainer>
         <TagContainer>
         {categoriesMapped}
        </TagContainer>
        <RandomButtom onClick={getRandom}>Random</RandomButtom>
     </BlockLeft>

     <BlockRight>
     <div>{change === false ? (<>{random}</>):(<>{searchFiltered}</>) }</div>
    </BlockRight>
      </Container>
    );
  }
  
  export default Home;
  
import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import animeService from '../../../services/animeService'
import { GetAnimePage } from '../../../services/animeService/__generated__/GetAnimePage'
import { useAppDispatch } from '../../hooks'
import { setAnimePage } from './homePageSlice'
import HotAnime from './hotAnime'

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page))
})

const HomePage = (props: IHomePageProps) => {
  const { setAnimePage } = actionDispatch(useAppDispatch())
  const fetchAnimePage = async () => {
    const animePage = await animeService.getAnimePage(0).catch((err) => {
      console.log("Error: ", err)
    })
    
    console.log("Anime page: ", animePage)
    if(animePage){
      setAnimePage(animePage)
    }
  }

  useEffect(() => {
   fetchAnimePage()
  }, [])

  return (
    <Container>
      <h1>Hot Anime</h1>
      <HotAnime/>
    </Container>
  )
}

export default HomePage

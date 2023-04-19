import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import { UserProvider } from './UserContext'
import App from './App'
import { AnimeProvider, CharacterProvider, MangaProvider, PostsProvider } from './DisplayContext'

ReactDOM.render(

  <BrowserRouter>

    <UserProvider>

      <PostsProvider>
        <AnimeProvider>
          <CharacterProvider>
            <MangaProvider>
              <App />
            </MangaProvider>
          </CharacterProvider>
        </AnimeProvider>
      </PostsProvider>

    </UserProvider>

  </BrowserRouter>,

  document.getElementById('root')
)
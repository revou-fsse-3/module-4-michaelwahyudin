import React from 'react'

interface TokenContext {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const TokenContext = React.createContext<TokenContext>({
  token: '',
  setToken: () => {}
})

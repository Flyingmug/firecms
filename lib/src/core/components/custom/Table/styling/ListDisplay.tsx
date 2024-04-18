import { styled } from '@mui/material'
import React from 'react'

const ListDisplayInner = styled('div', {})<any>(({
                                                  
                                                  }) => ({
  borderLeftWidth: 6,
  borderLeftColor: 'red'
}))

const ListDisplay = ({children}: {children: React.ReactNode}) => {
  return (
    <ListDisplayInner>
      {children}
    </ListDisplayInner>
  )
}

export default ListDisplay
import { ThemeProvider } from '@emotion/react'
import { ReactNode } from 'react'
import { theme } from '../../Theme'
import { Menu } from '../Menu';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        className='container'
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Menu/>
        {children}
      </div>
    </ThemeProvider>
  )
}

export default Container
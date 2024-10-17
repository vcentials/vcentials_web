import NavBar from '../NavBar/NavBar.jsx'
import { Container } from 'react-bootstrap'
import styles from '../About/About.module.css'

function About(){
    return(

        <>
            <NavBar />

            <Container className={styles.top_space}>
                <h1>About the VCentials Temperature Recorder</h1>
                <p>
                    You can add any text you'd like here.
                </p>
            </Container>
 
        </>
    )
}

export default About
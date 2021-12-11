import '../css/home.css';
import ViewCompetitions from './ViewCompetitions';
import Header from './headerBar'

function Home(){
    return(
        <div id = 'home'>
                    <Header />
                    <ViewCompetitions />
         </div>
            
        
    );  
}
export default Home;
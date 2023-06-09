import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import './Home.css';
import Seguimiento from "../Seguimiento/Seguimiento";
import Camiones from "../Camiones/Camiones";
import Facturas from "../Facturas/Facturas";

const Home =()=> {
    const indicator = document.querySelector('.nav-indicator');
    const items = document.querySelectorAll('.nav-item');

    function handleIndicator(el) {
        items.forEach(item => {
            item.classList.remove('is-active');
            item.removeAttribute('style');
        });

        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        indicator.style.backgroundColor = el.getAttribute('active-color');

        el.classList.add('is-active');
        el.style.color = el.getAttribute('active-color');
    }


    items.forEach((item, index) => {
        item.addEventListener('click', (e) => { handleIndicator(e.target) });
        item.classList.contains('is-acnpmtive') && handleIndicator(item);
    });

    return (
        <Tabs className="divTab">
            <TabList className="nav">
                <Tab className="nav-item is-active" active-color="#e81e4a">Camiones</Tab>
                <Tab className="nav-item" active-color="#078a85">Seguimiento</Tab>
                <Tab className="nav-item" active-color="#0b1d21">Facturas</Tab>
                <span className="nav-indicator"></span>
            </TabList>
            <TabPanel className="pane">
                <Camiones/>
            </TabPanel>
            <TabPanel>
                <Seguimiento />
            </TabPanel>
            <TabPanel>
                <Facturas />
            </TabPanel>
        </Tabs>
    );
}

export default Home;
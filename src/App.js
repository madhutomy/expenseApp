import React, { Component } from 'react'
import Category from './Category'
import Home from './Home'
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Expenses from './Expenses'
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SidebarComponent from './components/sidebar/SidebarComponent';
import HeaderComponent from './components/header/HeaderComponent';
import ContentComponent from './components/content/ContentComponent';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30
    }
});


class App extends  Component {
    /*state = {}
    render() {
        return (
            <Sidebar/>,
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Home}/>
                     <Route path='/categories' exact={true} component={Category}/>
                     <Route path="/expenses" exact={true} component={Expenses}/>
                </Switch>
             </Router>
        );
    }*/


    state = { selectedItem: 'Tickets' };

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    render() {
        const { selectedItem } = this.state;
        return (
            <Row className={css(styles.container)}>
                <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                <Column flexGrow={1} className={css(styles.mainBlock)}>
                    <HeaderComponent title={selectedItem} />
                    <div className={css(styles.content)}>
                        <ContentComponent />
                    </div>
                </Column>
            </Row>
        );
    }
}

export default App;
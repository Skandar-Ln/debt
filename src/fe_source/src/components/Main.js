import React, { Component } from 'react';
import {WhiteSpace, Toast} from 'antd-mobile';
import axios from 'axios';

import Input from './Input';
import List from './List';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { list: [], isMore: false };
    }

    refresh(isMore = false) {
        axios.post('/api/debt/list', {
            size: isMore ? 999 : 10
        }).then(res => {
            this.setState({
                list: res.data.result || []
            });
            Toast.hide();
        });

        this.setState({isMore});
    }

    componentDidMount() {
        this.refresh();
    }

    handleChange = () => {
        this.refresh();
    }

    handleMore = () => {
        this.refresh(true);
    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg" />
                <div>
                    <Input onChange={this.handleChange} />
                </div>
                <List
                    datasource={this.state.list}
                    onMore={this.handleMore}
                    isMore={this.state.isMore}    
                />
                <WhiteSpace size="xl" />
            </div>
        );
    }
}

export default Main;

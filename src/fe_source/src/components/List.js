import React, { Component } from 'react';
import {Card, WhiteSpace, Button} from 'antd-mobile';
import moment from 'moment';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    handleMore = () => {
        this.props.onMore();
    }

    render() {
        const {datasource: list = [], isMore = false} = this.props;

        return (
            <React.Fragment>
            {
                list.map(item => {
                    return (
                        <div>
                            <Card full key={item.id}>
                                <Card.Header
                                    title={`${item.isAdd ? '+' : '-'} ${item.changed}`}
                                    thumb=""
                                    extra={<span>{item.left}</span>}
                                />
                                <Card.Body>
                                    <div>{item.remark}</div>
                                </Card.Body>
                                <Card.Footer content="footer content" extra={<div>{moment(item.createdAt).calendar()}</div>} />
                            </Card>
                            <WhiteSpace size="lg" />
                        </div>
                    )
                })
            }
            {isMore || <Button onClick={this.handleMore}>加载更多</Button>}
            </React.Fragment>
        );
    }
}

export default List;

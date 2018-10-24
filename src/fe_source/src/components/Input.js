import React, { Component } from 'react';
import { List, InputItem, Flex, Button, WhiteSpace, Toast, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
        this.changedItem.focus();
    }

    submit(isAdd = false) {
        this.props.form.validateFields((error, value) => {
            if (error) {
                return;
            }

            if (parseFloat(value.changed) >= 30 && !value.remark){
                Toast.info('金额大于30必须写备注');
                return;
            }

            axios.post('api/debt/change', {
                ...value,
                isAdd
            }).then(res => {
                this.props.onChange();
            });

            Toast.loading();
            this.props.form.resetFields();
        });
    }

    handleConfirm = v => {
        this.remarkItem.focus();
    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div>
                <InputItem
                    {...getFieldProps('changed', {
                        normalize: (v, prev) => {
                            if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                            if (v === '.') {
                                return '0.';
                            }
                            return prev;
                            }
                            return v;
                        },
                        rules: [{required: true}]
                    })}
                    type="money"
                    placeholder="money format"
                    clear
                    moneyKeyboardAlign="left"
                    extra="￥"
                    ref={el => this.changedItem = el}
                    onVirtualKeyboardConfirm={this.handleConfirm}
                >
                    金额
                </InputItem>
                <InputItem
                    {...getFieldProps('remark')}
                    clear
                    placeholder="备注"
                    ref={el => this.remarkItem = el}
                >备注</InputItem> 
                <List.Item
                    extra={<Switch
                    {...getFieldProps('isHalf', {
                        initialValue: false,
                        valuePropName: 'checked',
                    })}
                    onClick={(checked) => { console.log(checked); }}
                    />}
                >除二</List.Item>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item>
                        <Button onClick={() => this.submit(true)}>加债</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button onClick={() => this.submit(false)} type="primary" >偿还</Button>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
            </div>
        );
    }
}

export default createForm()(Input);
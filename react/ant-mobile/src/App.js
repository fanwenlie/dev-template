import React, { Component } from 'react'

import './styles/App.less'

import {
  Grid, List, TextareaItem, Button, WingBlank, WhiteSpace, 
} from 'antd-mobile'
import { createForm } from 'rc-form'

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}))

class Example extends Component {
  componentDidMount() {}

  render() {
    const { form: { getFieldProps } } = this.props

    return (
      <div>
        <div className="sub-title">Carousel</div>
        <Grid data={data} onClick={_el => console.log(_el)} />

        <List renderHeader={() => 'Auto / Fixed height'}>
          <TextareaItem
            className="text-height-high"
            placeholder="请填写周报"
            {...getFieldProps('note3')}
            autoHeight
            labelNumber={5}
          />
        </List>

        <WhiteSpace size="lg" />
        <WingBlank>
          <Button type="primary">确定</Button>
        </WingBlank>
      </div>
    )
  }
}

const ExampleWrapper = createForm()(Example)

export default ExampleWrapper

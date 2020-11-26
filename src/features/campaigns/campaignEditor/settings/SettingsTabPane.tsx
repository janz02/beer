import {
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TimePicker
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import './CampaignEditor.scss'
import React, { FC } from 'react'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import CheckboxGroup from 'antd/lib/checkbox/Group'

export const SettingsTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return (
    <div className="settings-tab">
      <Col className="campaign-basic-details">
        <Form.Item>
          <label className="control-label">Campaign name</label>
          <Input placeholder="Basic usage" />
        </Form.Item>
        <Form.Item>
          <label className="control-label">Requestor</label>
          <TextArea rows={4} />
        </Form.Item>
      </Col>
      <Divider />

      <Form.Item label="Channel type">
        <Radio.Group defaultValue="email">
          <Radio value="email">Email</Radio>
          <Radio value="sms">SMS</Radio>
          <Radio value="callCenter">Call Center</Radio>
          <Radio value="pushNotification">Push Notification</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />

      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="Product">
            <label className="control-label">Product</label>
            <Select>
              <Select.Option value="1">Ducati monster 600</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Divider type="vertical" className="vertical-splitter" />
        </Col>
        <Col span={7}>
          <Form.Item label="Campaign admins">
            <label className="control-label">Requestor</label>
            <Select>
              <Select.Option value="1">Yanik Silver(Marketing)</Select.Option>
            </Select>
            <label className="control-label"> Approver/Validator</label>
            <Select>
              <Select.Option value="1">Gary Hamel(Manager)</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider />
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="Timing">
            <Row>
              <label className="control-label"> Select timing type</label>
              <Select placeholder="Date interval">
                <Select.Option value="1">Valami timing</Select.Option>
              </Select>
            </Row>
            <Row className="flex-wrap-unset">
              <Col>
                <label className="control-label">Start date</label>
                <DatePicker />
              </Col>
              <Col>
                <label className="control-label">End date</label>
                <DatePicker />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col>
          <Divider type="vertical" className="vertical-splitter" />
        </Col>
        <Col span={7}>
          <Form.Item label="Daily restriction" className="form-controls-display-content">
            <Col>
              <label className="control-label">Start time</label>
              <TimePicker />
            </Col>
            <Col>
              <label className="control-label">End time</label>
              <TimePicker />
            </Col>
          </Form.Item>
        </Col>
        <Col>
          <Divider type="vertical" className="vertical-splitter" />
        </Col>
        <Col span={7}>
          <Form.Item label="Interval Restrictions" className="form-controls-display-grid">
            <label className="control-label">Email delivery date restrictions</label>
            <CheckboxGroup>
              <Checkbox value="weekday">Weekday</Checkbox>
              <Checkbox value="weekend">Weekend</Checkbox>
              <Checkbox value="feast-day">Feast-day</Checkbox>
              <Checkbox value="saturday-working-day">Saturday working day</Checkbox>
            </CheckboxGroup>
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="Email re-call settings" className="form-controls-display-content">
            <Col span={10}>
              <label className="control-label">Maximum recall attempts</label>
              <Input type="number" />
            </Col>
            <Col span={14}>
              <label className="control-label">Recall frequency</label>
              <Select>
                <Select.Option value="1">6 Months</Select.Option>
              </Select>
            </Col>
          </Form.Item>
        </Col>
        <Col>
          <Divider type="vertical" className="vertical-splitter" />
        </Col>
        <Col span={7}>
          <Form.Item label="Email re-sending rules">
            <CheckboxGroup>
              <Checkbox>Rejected email</Checkbox>
              <Checkbox>Temporarily rejected email</Checkbox>
              <Checkbox>Bounced email</Checkbox>
              <Checkbox>Spam</Checkbox>
            </CheckboxGroup>
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

import React, { FC } from 'react'
import moment from 'moment'
import { NotificationData, inspectNotification } from './notificationSlice'
import { useDispatch } from 'hooks/react-redux-hooks'
import { List, Avatar } from 'antd'
import { BellFilled } from '@ant-design/icons'
import { MomentDisplay } from 'components/MomentDisplay'
import { MyCouponVmFromJSON } from 'api/swagger'

interface NotificationItemProps {
  item: NotificationData
  onClick: () => any
}

export const ListItem: FC<NotificationItemProps> = ({ item, onClick }) => {
  const dispatch = useDispatch()

  const inspectItem = (id: string): void => {
    dispatch(inspectNotification(id))
    onClick()
  }

  // console.log({
  //   moment,
  //   locales: moment.locales(),
  //   locdata: moment.localeData(),
  //   dur: moment.duration(1, 'minutes'),
  //   loccc: moment(item.deliveryTime).locale()
  // })

  return (
    <List.Item
      className={`notification-item ${item.read ? '' : 'notification-item--unread'}`}
      onClick={() => inspectItem(item.id)}
      actions={[
        // TODO: Locale translation for moment
        // eslint-disable-next-line react/jsx-key
        <div className="notification-item__date">
          {/* // formNow crashes */}
          <div>
            <MomentDisplay date={moment(item.deliveryTime)} />
          </div>
          {/* <MomentDisplay date={moment(item.deliveryTime)} mode="form now" /> */}
          {/* {item.deliveryTime ? moment(item.deliveryTime).format() : ''} */}
        </div>
      ]}
    >
      <List.Item.Meta
        avatar={item.image ? <Avatar src={item.image} /> : <Avatar icon={<BellFilled />} />}
        title={item.title}
        description={item.description}
      />
    </List.Item>
  )
}

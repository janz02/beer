import { Typography } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ViewSelect, ViewSelectProps } from './models'

export const ViewModeSelect: FC<ViewSelectProps<ViewSelect | ViewSelect[] | any>> = ({
  hasRightToNavigate,
  value,
  type
}) => {
  return (
    <>
      {(!value || (value as ViewSelect[])?.length === 0) && <Typography.Text>N/a</Typography.Text>}
      {type === 'select' && (
        <>
          {hasRightToNavigate ? (
            <Link to={(value as ViewSelect)?.linkTo || ''}>{(value as ViewSelect)?.name}</Link>
          ) : (
            <Typography.Text>{(value as ViewSelect)?.name}</Typography.Text>
          )}
        </>
      )}
      {type === 'multiselect' && (
        <>
          {(value as ViewSelect[])?.map((el, i) =>
            hasRightToNavigate ? (
              <span
                key={`${el.name
                  .toString()
                  .toLowerCase()
                  .replace(' ', '')}__${i}`}
              >
                <Link to={el.linkTo || ''}>{el.name}</Link>
                {i !== (value as ViewSelect[])?.length - 1 && <Typography.Text>, </Typography.Text>}
              </span>
            ) : (
              <span
                key={`${el.name
                  .toString()
                  .toLowerCase()
                  .replace(' ', '')}__${i}`}
              >
                <Typography.Text>{el.name}</Typography.Text>
                {i !== (value as ViewSelect[])?.length - 1 && <Typography.Text>, </Typography.Text>}
              </span>
            )
          )}
        </>
      )}
    </>
  )
}

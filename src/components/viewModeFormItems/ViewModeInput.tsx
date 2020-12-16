import { Typography } from 'antd'
import { DATE_FORMAT } from 'components/MomentDisplay'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ViewModeProps, ViewModeSelect } from './models'
import styles from './ViewModeStyles.module.scss'

export const ViewModeInput: FC<ViewModeProps<
  string | moment.Moment | number | ViewModeSelect[] | ViewModeSelect | any
>> = ({ value, onClick, type = 'text' }) => {
  const hasRightToNavigate = useMemo(() => true, [])
  const isSelectType = useMemo(() => type === 'select' || type === 'multiselect', [type])

  return (
    <>
      {!isSelectType && (
        <span
          className={onClick ? styles.clickableElement : ''}
          onClick={() => {
            onClick?.()
          }}
        >
          {type === 'text' && <Typography.Text>{value}</Typography.Text>}
          {type === 'date' && (
            <Typography.Text>{(value as moment.Moment)?.format(DATE_FORMAT)}</Typography.Text>
          )}
          {type === 'name' && <Typography.Title level={2}>{value}</Typography.Title>}
          {type === 'email' && <Typography.Link href={`mailto:${value}`}>{value}</Typography.Link>}
          {type === 'phone' && <Typography.Link href={`tel:${value}`}>{value}</Typography.Link>}
        </span>
      )}
      {type === 'select' && (
        <>
          {hasRightToNavigate ? (
            <Link to={(value as ViewModeSelect)?.linkTo || ''}>
              {(value as ViewModeSelect)?.name}
            </Link>
          ) : (
            <Typography.Text>{(value as ViewModeSelect)?.name}</Typography.Text>
          )}
        </>
      )}
      {type === 'multiselect' && (
        <>
          {(value as ViewModeSelect[])?.map((el, i) =>
            hasRightToNavigate ? (
              <span
                key={`${el.name
                  .toString()
                  .toLowerCase()
                  .replace(' ', '')}__${i}`}
              >
                <Link to={el.linkTo || ''}>{el.name}</Link>
                {i !== (value as ViewModeSelect[])?.length - 1 && (
                  <Typography.Text>, </Typography.Text>
                )}
              </span>
            ) : (
              <span
                key={`${el.name
                  .toString()
                  .toLowerCase()
                  .replace(' ', '')}__${i}`}
              >
                <Typography.Text>{el.name}</Typography.Text>
                {i !== (value as ViewModeSelect[])?.length - 1 && (
                  <Typography.Text>, </Typography.Text>
                )}
              </span>
            )
          )}
        </>
      )}
    </>
  )
}

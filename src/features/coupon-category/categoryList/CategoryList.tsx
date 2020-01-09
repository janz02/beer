import React, { FC, useState, useMemo } from 'react';
import '../category.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { Table, Button} from 'antd';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from 'hooks';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import { getCategories } from './categoryListSlice';
import { Category } from 'models/category';
import { CategoryDeletePopup } from '../CategoryDeletePopup';


const CategoryListHeader = ({ onCreate = () => {}, error = '' }) => {
  const { t } = useTranslation();

  return (
    <div className="category-list__header">
      <h3>{t('coupon-category.list-title')}</h3>
      <Button onClick={onCreate}>{t('common.create')}</Button>
    </div>
  );
};

interface CategoryListProps {
  onOpenEditor: (id: string, createNew?: boolean) => void;
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { onOpenEditor } = props;
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [categoryToDelete, setCategoryToDelete] = useState<{
    category: Category;
    popupVisible: boolean;
  }>();
  const error = useSelector((state: RootState) => state.categoryList.error);
  const pagination = useSelector(
    (state: RootState) => state.categoryList.pagination
  );

  const categories = useSelector(
    (state: RootState) => state.categoryList.categories
  );


  const errorMsg = () => <div className="list-error">{error}</div>;

  const columnsConfig = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: (value: any, record: Category, index: number) => {
        console.log({ value, record, index });

        return (
          <>
            <Button type="link" onClick={() => onOpenEditor('old')}>
              Edit
            </Button>{' '}
            |{' '}
            <Button
              type="link"
              onClick={() =>
                setCategoryToDelete({ category: record, popupVisible: true })
              }
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const paginationConfig = useMemo(
    (): TablePaginationConfig => ({
      showTotal: (total, range) =>
        `${range[1] - range[0] + +!!range[1]} / ${total}`,
      simple: isMobile,
      pageSize: pagination?.pageSize,
      total: pagination?.size,
      current: pagination?.page,
      pageSizeOptions: ['5', '10', '25', '50'],
      showSizeChanger: !error,
      locale: () => 'khfdkh',
      onShowSizeChange: (current, size) => {
        const newPage = Math.ceil(pagination!.from! / size);
        dispatch(getCategories({ page: newPage, pageSize: size }));
      },
      onChange: (page, c) => {
        dispatch(getCategories({ page }));
      },
    }),
    [isMobile, pagination, error, dispatch]
  );

  console.log(paginationConfig);

  return (
    <>
      <Table
        className="category-list list-card_table"
        title={() => (
          <CategoryListHeader
            onCreate={() => onOpenEditor('', true)}
            error={error}
          />
        )}
        footer={error ? errorMsg : undefined}
        columns={columnsConfig}
        dataSource={categories.map((c, i) => ({ ...c, key: '' + i + c.id }))}
        pagination={paginationConfig}
      />
      <CategoryDeletePopup
        visible={!!categoryToDelete?.popupVisible}
        category={categoryToDelete?.category}
        onExit={() =>
          setCategoryToDelete({ ...categoryToDelete!, popupVisible: false })
        }
        afterClose={() => setCategoryToDelete(undefined)}
      />
    </>
  );
};

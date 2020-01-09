import React, { useState, useEffect, useCallback } from 'react';
import './category.scss';
import { CategoryList } from './categoryList/CategoryList';
import { Card } from 'antd';
import { useIsMobile } from 'hooks';
import { CategoryEditor } from './categoryEditor/CategoryEditor';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { getCategories } from './categoryList/categoryListSlice';

export const CategoryPage = () => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const selectedId: string = useSelector(
    (state: RootState) => (state.router.location as any)?.query?.id
  );

  const [editorVisible, setEditorVisible] = useState(false);

  const openEditor = useCallback((id: string, createNew?: boolean) => {
    if (id || createNew) {
      setEditorVisible(true);
      history.push(`/coupon-categories/?id=${id}`);
    }
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    openEditor(selectedId);
  }, [selectedId, openEditor, dispatch]);

  return (
    <div className={`category-page ${isMobile ? 'category-page--mobile' : ''}`}>
      <Card className={`list-card ${isMobile ? 'list-card--mobile' : ''}`}>
        <CategoryList onOpenEditor={openEditor} />
      </Card>
      <CategoryEditor
        categoryId={selectedId}
        visible={editorVisible}
        onExit={() => setEditorVisible(false)}
        afterExit={() => history.push('/coupon-categories')}
      />
    </div>
  );
};

import React from 'react';
import './category-list.scss';
import { CategoryList } from './CategoryList';
import { Card } from 'antd';
import { useIsMobile } from 'hooks';

export const CategoryListPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`category-page ${isMobile ? 'category-page--mobile' : ''}`}>
      <Card className={`list-card ${isMobile ? 'list-card--mobile' : ''}`}>
        <CategoryList></CategoryList>
      </Card>
    </div>
  );
};

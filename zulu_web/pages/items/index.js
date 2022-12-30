import React from 'react'
import ItemsList from '../../src/components/items/ItemsList'
import MainLayout from '../../src/layouts/MainLayout'
import itemService from '../../src/services/item.service'

export default function ItemsListPage({data}) {
  return (
    <MainLayout title='Mercado Libre' categories={data.map(d => d.category)}>      
      <ItemsList items={data} />
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  const { search } = context.query;
  const data = await itemService.SearchItem(search);
  if (search === '') return {
    redirect: {
      destination: SCREEN_ROUTES.root,
      permanent: false,
    }
  }
  
  return {
    props: { data }
  }
}